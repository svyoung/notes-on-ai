import CloseIcon from '@mui/icons-material/Close';
import { Note as NoteType } from '../../types/types';

interface Props {
    note: NoteType,
    closeOut: () => void
}
export default function Note({ note, closeOut }: Props) {
    if(!note) return;
    const onCloseOut = () => closeOut()
    return (
        <div className="relative bg-white">
            <div className="absolute right-3 top-3" role="button" onClick={onCloseOut}>
                <CloseIcon sx={{ fontSize: "2rem" }} />
            </div>
            <div className="note-item border border-[#cecece] p-6 my-2 flex flex-col shadow-md mb-[2rem] bg-[#fff5be]" style={{ whiteSpace: "pre-line" }}>
                <div className="font-bold border-b-1 border-[#cecece] pb-2 block text-[1.7rem] special-font-bold leading-[1.7rem]">{note.title || "Untitled"}</div>
                <div className="py-3 text-[1rem]">
                    {note.text}
                </div>
            </div>
        </div>     
    )
}