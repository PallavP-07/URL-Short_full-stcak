
import dbConnect from '../../lib/dbconnection';  
import {UrlShortener,TotalURL} from '../../model/longurls';  
import { nanoid } from 'nanoid'
export default async function handler(req, res) {
  if (req.method === 'POST') {
    await dbConnect();

    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }
     
    try {
        let shortUrl=nanoid(8)
      const newUrl = new UrlShortener({ title,shortUrl });
      await newUrl.save();
      const urlCount = await TotalURL.findOneAndUpdate(
        {},
        { $inc: { totalURLs: 1 } },
        { upsert: true, new: true }
      );

      res.status(201).json({ message: "Short URL created!", data: newUrl, urlCount });
    } catch (error) {
      res.status(500).json({ message: 'Error creating URL shortener entry' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
