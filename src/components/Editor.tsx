import { useState, useEffect, ChangeEvent } from 'react';
import { useDebounce } from 'use-debounce';
import Announcement from './Announcement';

interface Note {
  title: string,
  text: string
}

interface Props {
  addNewNote: (note:Note) => void
  addStatus: string
}

const validPassword = import.meta.env.VITE_ADD_PW

const Editor = ({ addNewNote, addStatus }:Props) => {
  const [title, setTitle] = useState<string>("")
  const [note, setNote] = useState<string>(sessionStorage.getItem("newNote") || "");
  const [password, setPassword] = useState<string>("");
  const [debouncedValue] = useDebounce(note, 1000);
  const [errorMessage, setErrorMessage] = useState<string>("")

  const resetValues = () => {
    setTitle("")
    setNote("")
    setPassword("")
    setErrorMessage("")
  }

  useEffect(() => {
    sessionStorage.setItem("newNote", debouncedValue)
  }, [debouncedValue, note]);

  useEffect(() => {
    if(addStatus === "success") {
      sessionStorage.removeItem("newNote")
      resetValues()
    }
  }, [addStatus])

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNote(event.target.value);
    sessionStorage.removeItem("newNote");
  };

  const onAddNote = () => {
    if(password?.trim() == validPassword.trim()) {
      if (title !== "" && note !== "") {
        const newNote = {
          title,
          text: note
        }
        addNewNote(newNote)
      } else {
        setErrorMessage("Title and note cannot be empty!")
      }
    } else {
      setErrorMessage("Uh oh, wrong password!")     
    }
  }
  return (
    <div className="editor-panel flex flex-col align-center new-note mb-6 pb-[4rem]">
      <Announcement />
      <h1 className="block text-center p-4 pb-6 text-[2.5rem] special-font">New Note</h1>
      <div className=" w-full lg:w-[70%]  m-auto text-[1.2rem] mb-4 special-font">
        <input value={title} name="title" onChange={(e) => setTitle(e.target.value)} placeholder="title" className="border-b-1 border-[#dcdcdc] w-full outline-none px-5" />
      </div>
      <div className="flex flex-col w-full lg:w-[70%] align-center border border-[#dcdcdc] w-[70%] m-auto p-5">
        <textarea
          className="p-4 text-[1.3rem] w-full outline-none min-h-[300px] resize-y m-auto special-font-regular bg-transparent"
          placeholder="text text text"
          onChange={handleChange}
          value={note}
          style={{ whiteSpace: "pre-wrap" }}
        />
        <div className="py-5 flex flex-col">
          <label htmlFor="Password">Password</label>
          <input type="password" value={password} name="password" onChange={(e) => setPassword(e.target.value)} className="border border-[#cecece] outline-none w-1/3 px-3 py-2 my-2" />
        </div>
        <div className="items-end">
          <button
            type="button"
            className="text-white bg-blue-400 dark:bg-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            onClick={onAddNote}
          >
            Add Note
          </button>
          {errorMessage && 
            <div className="text-[#ff0000] py-2">{errorMessage}</div>
          }
        </div>
      </div>
    </div>
  )
}

export default Editor
