export const fetchAllNotes = async (url: string) => {
    const notes = await fetch(`${url}/all_notes`)
    return notes.json()
}

export const searchSimilaryNotes = async (url: string, query: string) => {
    // const params = { query }
    const results = await fetch(`${url}/search_notes?query=${query}`)
    return results.json()
}