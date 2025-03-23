import NoteItem from "./notes/NoteItem"
import AddCircleIcon from '@mui/icons-material/AddCircle';

interface Note {
    id: number,
    title: string,
    text: string
}

interface Props {
    notes: Note[],
    searchFilterOn: boolean,
    selectNote: (note: Note) => void,
    newNote: () => void,
    clearSearch: () => void
}
export default function NotesPanel({ notes, searchFilterOn, selectNote, newNote, clearSearch }:Props) {
    return (
        <div className="p-3 mb-[2rem]">
            <div className="flex flex-row justify-between items-center">
                <h1 className="text-[2rem]">Notes</h1>
                {searchFilterOn && <button onClick={clearSearch}>Clear search</button>}
                <AddCircleIcon className="cursor-pointer transition delay-50 duration-600 ease-in-out hover:scale-150" sx={{ fontSize: "2rem"}} onClick={newNote} />
            </div>
            <ul>
                {notes.map(note => (
                    <div key={note.id} role="button" onClick={() => selectNote(note)}>
                        <NoteItem note={note} />
                    </div>
                ))}
            </ul>            
        </div>
    )
}