import { useState, useEffect, ChangeEvent } from 'react';
import { useDebounce } from 'use-debounce';
import Announcement from './Announcement';

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
      <Announcement />
      <h1 className="block text-center p-4 pb-6 text-[2.5rem] special-font">New Note</h1>
      <div className=" w-full lg:w-[70%]  m-auto text-[1.2rem] mb-4 special-font">
        <input value={title} name="title" onChange={(e) => setTitle(e.target.value)} placeholder="title" className="border-b-1 border-[#dcdcdc] w-full outline-none px-5" />
      </div>
      <div className="flex flex-col w-full lg:w-[70%] align-center border border-[#dcdcdc] w-[70%] m-auto p-5">
        <textarea
          className="p-4 text-[1.5rem] w-full outline-none min-h-[300px] resize-y m-auto special-font-regular bg-transparent"
          placeholder="text text text"
          onChange={handleChange}
          value={note}
          style={{ whiteSpace: "pre-wrap" }}
        />
        <div className="items-end">
          <button type="button" className="text-white bg-blue-400 dark:bg-blue-500 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center" disabled>Add Note</button> (unavailable for now)
        </div>
      </div>
    </div>
    
  )
}

export default Editor
