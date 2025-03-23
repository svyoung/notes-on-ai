import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

export default function Announcement() {
    const [isVisible, setIsVisible] = useState<boolean>(true)

    return isVisible &&
        <>
            <div className="absolute top-0 right-0 bg-white opacity-70 overlay h-[100vh] w-full opacity-80"></div>
            <div className="announcement bg-[#e5f6ff] w-[90%] lg:w-[70%] m-auto p-5 pr-6 rounded-xl border border-[#94c0d5] text-[0.9rem] relative shadow-md">
            <div className="absolute right-2 top-1 pointer-cursor" role="button" onClick={() => setIsVisible(false)}>
                <CloseIcon className="pointer-cursor" sx={{ fontSize: "1.5rem"}} />
            </div>
            <div>
                <p>📌 Hello! What you’re seeing is the <strong><em>Retrieval-Augmented Generation</em></strong> in action, which retrieves the most relevant matches when you perform a search (via the search bar above). Additional notes on various topics will be added periodically to provide more context to the project. </p>
                <p><strong>Some features to expect:</strong></p>
                <ul>
                    <li>- Better similarity comparison with multiple models</li>
                    <li>- More data to compare against</li>
                    <li>- More UI/UX refinements (rich text options)</li>
                    <li>- Infinite scrolling/pagination</li>
                    <li>- Notes editing</li>
                </ul>
            </div>
            </div>           
        </>
        
}