export default async function handler(req, res) {
    const { q, id, epId } = req.query;
    
    // We are switching to a much more stable API provider that stays updated
    const BASE = "https://api.amvstr.me/api";

    try {
        let url = "";
        // This new provider uses slightly different paths to stay alive
        if (q) url = `${BASE}/search?q=${encodeURIComponent(q)}`;
        else if (id) url = `${BASE}/info/${id}`;
        else if (epId) url = `${BASE}/episode/${epId}`;

        const response = await fetch(url);
        const data = await response.json();
        
        // If it's a search, we need to make sure the data format matches your website
        if (q && data.results) {
            res.status(200).json(data);
        } else {
            res.status(200).json(data);
        }
    } catch (error) {
        // Fallback: Try one more mirror if the first fails
        try {
            const fallback = `https://api.consumet.org/anime/gogoanime/${q || ''}`;
            const fRes = await fetch(fallback);
            const fData = await fRes.json();
            res.status(200).json(fData);
        } catch (e) {
            res.status(500).json({ error: "The anime database is moving servers. Try again in a minute." });
        }
    }
}
