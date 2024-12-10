import dbConnect from "../../../lib/dbconnection";
import {UrlShortener} from "../../../model/longurls"; 

export default async function handler(req, res) {
  await dbConnect(); 
  const { shortUrl } = req.query; 
  if (!shortUrl) {
    return res.status(400).json({ message: "Short URL is required" });
  }
  try {  
    const urlEntry = await UrlShortener.findOne({ shortUrl });
    if (!urlEntry) {
      return res.status(404).json({ message: "Short URL not found" });
    } 
    urlEntry.clicks += 1;
    await urlEntry.save();
    return res.redirect(302, urlEntry.title);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
