
interface Note {
    id?: number,
    title: string,
    text: string
}

interface Props {
    note: Note
}
export default function Note({ note }: Props) {
    if(!note) return;
    return (
        <div className="note-item border border-[#cecece] p-6 my-2 flex flex-col shadow-md mb-[2rem] bg-[#fff5be]" style={{ whiteSpace: "pre-line" }}>
            <div className="font-bold border-b-1 border-[#cecece] pb-2 block text-[2rem] special-font-bold">{note.title || "Untitled"}</div>
            <div className="py-3 text-[1rem]">
                {note.text}
            </div>
        </div>
    )
}