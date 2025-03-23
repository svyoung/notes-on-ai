import { useState, useEffect, useCallback } from 'react'
import NotesPanel from './components/NotesPanel'
import SearchNote from './components/SearchNote'
import Editor from './components/Editor'
import Note from './components/notes/Note'
import Announcement from './components/Announcement'
import { addNote, fetchAllNotes, searchSimilaryNotes } from './lib/actions'
import './App.css'

interface Note {
  id?: number;
  title: string;
  text: string;
}

type Notes = Note[]

const fetchUrl = import.meta.env.VITE_SERVICE_API_URL

function App() {
  const [noteSelected, setNoteSelected] = useState<boolean>(false)
  const [selectedNote, setSelectedNote] = useState<Note | undefined>()
  const [notes, setNotes] = useState<Notes>([])
  const [addStatus, setAddStatus] = useState<string>("")
  const [searchFilterOn, setSearchFilterOn] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const resetSearch = async () => {
    const { notes } = await fetchAllNotes(fetchUrl)
    const sortedNotes = notes.sort((a: Note, b: Note) => (b.id ?? 0) - (a.id ?? 0))
    setNotes(sortedNotes);
    setSearchFilterOn(false);
  }

  const addNewNote = useCallback(async (note: Note) => {
      try {
        const { status } = await addNote(fetchUrl, note);
        if(status === "success") {
          setAddStatus("success")
          console.log("Success adding note!")
        }
      } catch (e) {
        console.log("Unable to add your note. Please try again", e)
      }
  }, [])
  
  useEffect(() => {
    let isMounted = true; 
    const fetchNotes = async () => {
      setIsLoading(true);
      try {
        await resetSearch();
      } catch (error) {
        console.error("Error fetching all the notes", error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    fetchNotes();

    return () => {
      isMounted = false;
    };
  }, [addStatus])

  const searchNote = async (query: string) => {
    try {
      const { results } = await searchSimilaryNotes(fetchUrl, query)
      setNotes(results)
      setSearchFilterOn(true)
    } catch (e) {
      console.log("Having trouble searching similar notes. Please try again", e)
    }
  }

  return (
    <>
      <div className="h-[100vh] overflow-hidden main">
        <Announcement />
        <header>
            <div><SearchNote searchNote={searchNote} clearSearch={resetSearch} searchFilterOn={searchFilterOn} /></div>
          </header>
          <main>
            <div className="flex w-full justify-between h-[100vh] border-t-[#cecece]">
              <div className="notes-panel w-full md:w-1/3 p-3 border-r-1 border-[#cecece] overflow-auto">
                {!isLoading &&
                  <NotesPanel notes={notes} selectNote={(note) => {
                      setSelectedNote(note)
                      setNoteSelected(true)
                    }}
                    newNote={() => {
                      setNoteSelected(true)
                      setSelectedNote(undefined)
                    }}
                    searchFilterOn={searchFilterOn}
                    clearSearch={resetSearch}
                  />
                }
                {isLoading && "loading..."}
              </div>
              <div className={`note-panel w-2/3 p-4 px-6 overflow-auto mobile ${noteSelected ? "force-mobile-display" : ""}`}>
                {noteSelected && selectedNote ?
                  <Note note={selectedNote} closeOut={() => setNoteSelected(false)} />
                  :
                  <Editor addNewNote={addNewNote} addStatus={addStatus} closeOut={() => setNoteSelected(false)} />
                }
              </div>
            </div>
          </main>
      </div>
    </>
  )
}

export default App
