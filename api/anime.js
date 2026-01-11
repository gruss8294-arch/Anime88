export default async function handler(req, res) {
    const { q, id, epId } = req.query;
    // We use a high-reliability mirror for your private bot
    const BASE = "https://consumet-api-one.vercel.app/anime/gogoanime";

    try {
        let url = "";
        if (q) url = `${BASE}/${encodeURIComponent(q)}`;
        else if (id) url = `${BASE}/info/${id}`;
        else if (epId) url = `${BASE}/watch/${epId}`;

        const response = await fetch(url);
        const data = await response.json();
        
        // Your private Vercel function sends the data back to your phone
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Private Bot Error" });
    }
}
