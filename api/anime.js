// This is your own private server-side bot
export default async function handler(req, res) {
    const { q, id, epId } = req.query;
    const BASE_SCRAPER = "https://api.consumet.org/anime/gogoanime"; // We use the logic, but run it through your Vercel header

    try {
        let targetUrl = "";
        if (q) targetUrl = `${BASE_SCRAPER}/${q}`;
        else if (id) targetUrl = `${BASE_SCRAPER}/info/${id}`;
        else if (epId) targetUrl = `${BASE_SCRAPER}/watch/${epId}`;

        const response = await fetch(targetUrl);
        const data = await response.json();
        
        // This bypasses the "Busy" error by acting as a private proxy
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Private Bot Wake-up Failed" });
    }
}
