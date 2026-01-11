export default async function handler(req, res) {
    // Enable CORS so your website can talk to this bot
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');

    const { q, id, epId } = req.query;
    
    // We try the most stable mirror first
    const BASE = "https://consumet-api-one.vercel.app/anime/gogoanime";

    try {
        let url = "";
        if (q) url = `${BASE}/${encodeURIComponent(q)}`;
        else if (id) url = `${BASE}/info/${id}`;
        else if (epId) url = `${BASE}/watch/${epId}`;
        else return res.status(400).json({ error: "No query provided" });

        const response = await fetch(url);
        if (!response.ok) throw new Error("Mirror Down");
        
        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        // BACKUP: If the mirror fails, use the official one as a fallback
        try {
            const backupUrl = `https://api.consumet.org/anime/gogoanime/${q || ''}`;
            const backupRes = await fetch(backupUrl);
            const backupData = await backupRes.json();
            return res.status(200).json(backupData);
        } catch (e) {
            return res.status(500).json({ error: "All anime sources are currently busy. Try again in 1 minute." });
        }
    }
}
