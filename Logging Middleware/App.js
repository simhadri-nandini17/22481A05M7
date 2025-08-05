import { useState, useEffect } from "react";

function App() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [urlList, setUrlList] = useState([]);

  // Load from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("urls")) || [];
    setUrlList(stored);
  }, []);

  const generateShortCode = () => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  };

  const handleShorten = () => {
    if (!originalUrl.trim()) return;

    const shortCode = generateShortCode();
    const newEntry = {
      id: shortCode,
      original: originalUrl,
      shortUrl: 'https://short.ly/${shortCode}',
    };

    const updated = [newEntry, ...urlList];
    setUrlList(updated);
    localStorage.setItem("urls", JSON.stringify(updated));
    setOriginalUrl("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-xl mx-auto bg-white shadow-lg p-6 rounded-xl">
        <h1 className="text-2xl font-bold mb-4">🔗 URL Shortener</h1>
        
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter long URL"
            className="w-full border rounded px-3 py-2"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleShorten}
          >
            Shorten
          </button>
        </div>

        <ul className="mt-6 space-y-4">
          {urlList.map((item) => (
            <li key={item.id} className="bg-gray-50 p-3 rounded border">
              <p className="text-sm text-gray-700">Original: <a href={item.original} className="text-blue-600 underline" target="_blank">{item.original}</a></p>
              <p className="text-sm mt-1">Short: <span className="font-mono">{item.shortUrl}</span></p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;