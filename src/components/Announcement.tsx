export default function Announcement() {
    return (
        <div className="bg-[#e5f6ff] w-full lg:w-[70%] m-auto p-3 rounded-xl border border-[#94c0d5] text-[0.9rem]">
            <p>📌 Hello! Just a quick note – this editor doesn’t actually save any notes (YET!); it’s purely for the user interface. What you’re seeing is the <strong><em>Retrieval-Augmented Generation</em></strong> in action, which retrieves the most relevant matches when you perform a search (via the search bar above). Additional notes on various topics will be added periodically to provide more context to the project. </p>
            <p><strong>Some features to expect:</strong></p>
            <ul>
                <li>- Better similarity comparison with multiple models</li>
                <li>- More data to compare against</li>
                <li>- Infinite scrolling/pagination</li>
                <li>- Notes editing</li>
            </ul>
      </div>
    )
}