import { useState, useEffect, useCallback } from 'react'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import NotesPanel from './components/NotesPanel'
import SearchNote from './components/SearchNote'
import Editor from './components/Editor'
import Note from './components/notes/Note'
import Announcement from './components/Announcement'
import { addNote, fetchAllNotes, searchSimilaryNotes } from './lib/actions'
import { Note as NoteType } from './types/types'
import './App.css'

const fetchUrl = import.meta.env.VITE_SERVICE_API_URL

function App() {
  const [noteSelected, setNoteSelected] = useState<boolean>(false)
  const [selectedNote, setSelectedNote] = useState<NoteType | undefined>()
  const [addStatus, setAddStatus] = useState<string>("")
  const [searchFilterOn, setSearchFilterOn] = useState<boolean>(false)
  const [allNotes, setAllNotes] = useState<NoteType[]>([])
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["notes"],
    queryFn: () => fetchAllNotes(fetchUrl),
    enabled: !searchFilterOn
  });

  const { mutate: mutateSearchNote } = useMutation({
    mutationFn: (data: { fetchUrl: string, query: string }) => searchSimilaryNotes(data.fetchUrl, data.query),
    onSuccess: (searchResults) => {
      queryClient.setQueryData(["notes"], (oldData: NoteType[]) => {
        if (!oldData) return searchResults;
        return searchResults;
      })
    },
    onError: (err) => {
      console.error("Error performing similarity search:", err);
    },
  })

  const { mutate: mutateAddNote, status } = useMutation({
    mutationFn: (data: { url: string; note: NoteType }) => addNote(data.url, data.note),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
    onError: (err) => {
      console.error("Error adding note:", err);
    },
  });

  useEffect(() => {
    if(data?.notes) {
      setAllNotes(data.notes?.sort((a: NoteType, b: NoteType) => (b.id ?? 0) - (a.id ?? 0)))
    } 
    if(data?.results) {
      setAllNotes(data.results?.sort((a: NoteType, b: NoteType) => (b.id ?? 0) - (a.id ?? 0)))
    }
  }, [data])

  const resetSearch = async () => {
    setAllNotes([]);
    setSearchFilterOn(false);
    queryClient.invalidateQueries({ queryKey: ["notes"] }); 
  }

  const addNewNote = useCallback(async (note: NoteType) => {
      try {
        mutateAddNote({ url: fetchUrl, note });
        if(status === "success") {
          setAddStatus("success")
          console.log("Success adding note!")
        }
      } catch (e) {
        console.log("Unable to add your note. Please try again", e)
      }
  }, [status, mutateAddNote])

  const searchNote = async (query: string) => {
    try {
      mutateSearchNote({ fetchUrl, query })
      setSearchFilterOn(true)
    } catch (e) {
      console.log("Having trouble searching similar notes. Please try again", e)
      throw e;
    }
  }

  return (
    <>
      <div className="h-[100vh] main">
        <Announcement />
        <header>
            <div><SearchNote searchNote={searchNote} clearSearch={resetSearch} searchFilterOn={searchFilterOn} /></div>
          </header>
          <main>
            <div className="wrapper flex w-full justify-between h-[100vh] border-t-[#cecece]">
              <div className="notes-panel overflow-auto w-full md:w-1/3 p-3 border-r-1 border-[#cecece]">
                  <NotesPanel notes={allNotes} selectNote={(note) => {
                      setSelectedNote(note)
                      setNoteSelected(true)
                    }}
                    newNote={() => {
                      setNoteSelected(true)
                      setSelectedNote(undefined)
                    }}
                    searchFilterOn={searchFilterOn}
                    clearSearch={resetSearch}
                    isLoading={isLoading}
                  />
              </div>
              <div className={`note-panel overflow-auto bg-white w-2/3 p-4 px-6 mobile ${noteSelected ? "force-mobile-display" : ""}`}>
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
