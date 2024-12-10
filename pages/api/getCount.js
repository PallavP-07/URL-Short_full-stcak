import dbConnect from "../../lib/dbconnection";
import { TotalURL } from "../../model/longurls";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const stats = await TotalURL.findOne({});
      console.log(stats.totalURLs);
      res.status(200).json({ totalUrls: stats?.totalURLs || 0 });
    } catch (error) {
      console.error("Error fetching stats:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
