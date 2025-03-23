
interface Note {
    id: number,
    title: string,
    text: string
}

interface Props {
    note: Note
}
export default function Note({ note }: Props) {
    if(!note) return;
    return (
        <div className="note-item border border-[#cecece] p-6 my-2 text-[gray] flex flex-col shadow-md mb-[2rem]" style={{ whiteSpace: "pre-line" }}>
            <div className="font-bold border-b-1 border-[#cecece] pb-2 block text-[2rem] special-font-bold">{note.title || "Untitled"}</div>
            <div className="py-3 text-[#929292] text-[1rem]">
                {note.text}
            </div>
        </div>
    )
}