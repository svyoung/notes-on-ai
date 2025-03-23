export const fetchAllNotes = async (url: string) => {
    try {
        const notes = await fetch(`${url}/all_notes`)
        return await notes.json()
    } catch(e) {
        console.log("There was an issue fetching all notes.", e)
    } 
}

export const searchSimilaryNotes = async (url: string, query: string) => {
    try {
        const results = await fetch(`${url}/search_notes?query=${query}`)
        return await results.json()
    } catch(e) {
        console.log("There was error performing your search.", e)
    }
}

interface Note {
    title: string,
    text: string
}

export const addNote = async (url: string, note:Note) => {
    try {
        const response = await fetch(`${url}/add_note`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(note)
        })
        return await response.json()
    } catch(e) {
        console.log("There was error adding note.", e)
    } 
}