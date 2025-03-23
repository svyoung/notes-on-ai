
interface Note {
    id: number,
    title: string,
    text: string
}

interface Props {
    note: Note
}
export default function NoteItem({ note }: Props) {
    return (
        <li className="note-item border border-[#cecece] p-3 my-2 text-[gray] flex flex-col shadow-md mb-6 cursor-pointer hover:bg-[#f0f0f0] transition delay-50 duration-300 ease-in-out hover:scale-105" style={{ whiteSpace: "pre-line" }}>
            <div className="font-bold border-b-1 border-[#cecece] pb-2 block">{note.title || "Untitled"}</div>
            <div className="py-3 text-[#929292]">
                <div className="line-clamp-2" dangerouslySetInnerHTML={{ __html: note.text || "write something..." }} />
            </div>
        </li>
    )
}