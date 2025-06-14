import React, { useState } from "react";
import ReactDOM from "react-dom/client";

const PERPLEXITY_SUMMARY_API_URL = "https://your-supabase-function-url/perplexity-summary";

const Popup = () => {
  const [content, setContent] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSummarize = async () => {
    setLoading(true);
    setError("");
    setSummary("");
    try {
      const response = await fetch(PERPLEXITY_SUMMARY_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "Failed to get summary");
      } else {
        const data = await response.json();
        setSummary(data.summary || "No summary returned");
      }
    } catch (err) {
      setError("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 w-full max-w-md">
      <h1 className="text-xl font-bold mb-4">Crumbs Collector</h1>
      <textarea
        className="w-full p-2 border border-gray-300 rounded mb-4"
        rows={6}
        placeholder="Enter text to summarize"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        onClick={handleSummarize}
        disabled={loading || !content.trim()}
      >
        {loading ? "Summarizing..." : "Summarize"}
      </button>
      {error && <p className="text-red-600 mt-4">{error}</p>}
      {summary && (
        <div className="mt-4 p-2 border border-gray-300 rounded bg-gray-50">
          <h2 className="font-semibold mb-2">Summary:</h2>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<Popup />);
