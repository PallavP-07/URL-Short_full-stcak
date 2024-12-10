
import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  shortUrl: { type: String, required: true,unique: true },
  clicks: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});
const TotalCountSchema = new mongoose.Schema({
  totalURLs: { type: Number, default: 0 },
});
 export const UrlShortener = mongoose.models.UrlShortener || mongoose.model('UrlShortener', PostSchema);
 export const TotalURL = mongoose.models.TotalURL || mongoose.model('TotalURL', TotalCountSchema);

