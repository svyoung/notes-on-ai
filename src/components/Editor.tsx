import { useState, useEffect, ChangeEvent } from 'react';
import { useDebounce } from 'use-debounce';

const Editor = () => {
  const [title, setTitle] = useState<string>("")
  const [note, setNote] = useState<string>(sessionStorage.getItem("newNote") || "");
  const [debouncedValue] = useDebounce(note, 1000);

  useEffect(() => {
    sessionStorage.setItem("newNote", debouncedValue)
  }, [debouncedValue, note]);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNote(event.target.value);
    sessionStorage.removeItem("newNote");
  };

  console.log("note", note)
  return (
    <div className="editor-panel flex flex-col align-center new-note mb-6">
      <div className="bg-[#e5f6ff] w-full lg:w-[70%] m-auto p-2 rounded-xl border border-[#94c0d5] text-[0.9rem]">
        📌 Hello! Just a quick note – this editor doesn’t actually save any notes (YET!); it’s purely for the user interface. What you’re seeing is the <strong>Retrieval-Augmented Generation</strong> in action, which retrieves the most relevant matches when you perform a search (via the search bar above). Additional notes on various topics will be added periodically to provide more context to the project.
      </div>
      <h1 className="block text-center p-4 pb-6 text-[3rem] special-font">New Note</h1>
      <div className=" w-full lg:w-[70%]  m-auto text-[1.2rem] mb-4 special-font">
        <input value={title} name="title" onChange={(e) => setTitle(e.target.value)} placeholder="title" className="border-b-1 border-[#dcdcdc] w-full outline-none px-5" />
      </div>
      <div className="flex flex-col w-full lg:w-[70%] align-center border border-[#dcdcdc] w-[70%] m-auto p-5">
        <textarea
          className="bg-white p-4 text-[1.5rem] w-full outline-none min-h-[300px] resize-y m-auto special-font-regular"
          placeholder="text text text"
          onChange={handleChange}
          value={note}
          style={{ whiteSpace: "pre-wrap" }}
        />
      </div>
      
      {/* <button onClick={addNote}>Add Note</button> */}
    </div>
    
  )
}

export default Editor
