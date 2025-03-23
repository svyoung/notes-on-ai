import { useState, useEffect } from 'react'
import NotesPanel from './components/NotesPanel'
import SearchNote from './components/SearchNote'
import Editor from './components/Editor'
import Note from './components/notes/Note'
import { fetchAllNotes, searchSimilaryNotes } from './lib/actions'
import './App.css'

interface Note {
  id: number,
  title: string,
  text: string
}

type Notes = Note[]

const fetchUrl = import.meta.env.VITE_SERVICE_API_URL

function App() {
  const [noteSelected, setNoteSelected] = useState<boolean>(false)
  const [selectedNote, setSelectedNote] = useState<Note>()
  const [notes, setNotes] = useState<Notes>([])
  const [searchFilterOn, setSearchFilterOn] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const resetSearch = async () => {
    const { notes } = await fetchAllNotes(fetchUrl)
    const sortedNotes = notes.sort((a: Note, b: Note) => b.id - a.id)
    setNotes(sortedNotes);
    setSearchFilterOn(false);
  }

  useEffect(() => {
    setIsLoading(true)
    try {
      resetSearch()
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log("error fetching all the notes", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const searchNote = async (query: string) => {
    const { results } = await searchSimilaryNotes(fetchUrl, query)
    setNotes(results)
    setSearchFilterOn(true)
  }

  return (
    <>
      <div className="h-[100vh] overflow-hidden main">
        <header>
            <div><SearchNote searchNote={searchNote} clearSearch={resetSearch} searchFilterOn={searchFilterOn} /></div>
          </header>
          <main>
            <div className="flex w-full justify-between h-[100vh] border-t-[#cecece]">
              <div className="notes-panel w-1/3 p-3 border-r-1 border-[#cecece] overflow-auto">
                {!isLoading &&
                  <NotesPanel notes={notes} selectNote={(note) => {
                      setSelectedNote(note)
                      setNoteSelected(true)
                    }}
                    newNote={() => setNoteSelected(false)}
                    searchFilterOn={searchFilterOn}
                    clearSearch={resetSearch}
                  />
                }
                {isLoading && "loading..."}
              </div>
              <div className="w-2/3 p-4 px-6 overflow-auto">
                {noteSelected ?
                  <Note note={selectedNote} />
                  :
                  <Editor/>
                }
              </div>
            </div>
          </main>
      </div>
    </>
  )
}

export default App
