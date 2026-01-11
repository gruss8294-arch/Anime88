export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const { q, id, epId } = req.query;
    
    // Updated 2026 stable provider
    const BASE = "https://api.amvstr.me/api";

    try {
        let url = "";
        if (q) url = `${BASE}/search?q=${encodeURIComponent(q)}`;
        else if (id) url = `${BASE}/info/${id}`;
        else if (epId) url = `${BASE}/episode/${epId}`;

        const response = await fetch(url);
        const data = await response.json();
        
        // We ensure the search results are always sent back in a 'results' list
        if (q) {
            const results = data.results || data;
            res.status(200).json({ results: Array.isArray(results) ? results : [results] });
        } else {
            res.status(200).json(data);
        }
    } catch (error) {
        res.status(500).json({ error: "Connection to database failed." });
    }
}
