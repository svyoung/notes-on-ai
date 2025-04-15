import { KeyboardEvent, useState } from "react"
import CloseIcon from '@mui/icons-material/Close';

interface Props {
    searchNote: (note: string) => void,
    searchFilterOn: boolean,
    clearSearch: () => void
}

export default function SearchNote({ searchNote, searchFilterOn, clearSearch }:Props) {
    const [searchText, setSearchText] = useState<string>("")
    const onSearch = (event: KeyboardEvent<HTMLInputElement>) => {
        if(event.key === "Enter" && searchText !== "") {
            searchNote(searchText)
            setSearchText("")
            console.log("Search notes...")
        }
    }

    const onClearSearch = () => {
        clearSearch()
    }

    return (
        <div className="px-4 pt-4">
            <div className="rounded-[40px] border-2 border-[#cecece] p-3 relative">
                <input className="w-full outline-none border-none" placeholder="Search: What did I say about EV cars again?..." value={searchText} onChange={(e) => setSearchText(e.target.value)} onKeyDown={onSearch} />
                {searchFilterOn && <div className="reset-search absolute top-2 right-4 cursor-pointer" role="button" onClick={onClearSearch}>
                    <CloseIcon sx={{ fontSize: "2rem"}} />
                </div>
                }
            </div>
        </div>
       
    )
}