import NoteItem from "./notes/NoteItem"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Note } from "../types/types";

interface Props {
    notes: Note[],
    searchFilterOn: boolean,
    selectNote: (note: Note) => void,
    newNote: () => void,
    clearSearch: () => void,
    isLoading: boolean
}
export default function NotesPanel({ notes, searchFilterOn, selectNote, newNote, clearSearch, isLoading }:Props) {
    return (
        <div className="p-3 mb-[2rem]">
            <div className="flex flex-row justify-between items-center sticky">
                <h1 className="text-[2rem]">Notes <span className="text-[1.1rem]">({notes?.length})</span></h1>
                {searchFilterOn && <button onClick={clearSearch} className="px-2 border border-[black] rounded-[50px] cursor-pointer text-white bg-black hover:bg-white hover:text-black">Clear search</button>}
                <AddCircleIcon className="cursor-pointer transition delay-50 duration-600 ease-in-out hover:scale-150" sx={{ fontSize: "2rem"}} onClick={newNote} />
            </div>
            {isLoading && <span>Loading...</span>}
            {!isLoading && <ul>
                    {notes?.map(note => (
                        <div key={note.id} role="button" onClick={() => selectNote(note)}>
                            <NoteItem note={note} />
                        </div>
                    ))}
                </ul>
            }           
        </div>
    )
}