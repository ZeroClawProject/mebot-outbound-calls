import { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [joinUrl, setJoinUrl] = useState("");
  const [error, setError] = useState("");

  async function startCall() {
    setLoading(true);
    setError("");
    setJoinUrl("");

    try {
      const response = await fetch("/api/create-call");
      const data = await response.json();

      if (!response.ok || !data.joinUrl) {
        throw new Error(data.error || "Could not create call");
      }

      setJoinUrl(data.joinUrl);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function copyLink() {
    await navigator.clipboard.writeText(joinUrl);
    alert("Call link copied");
  }

  return (
    <main style={{
      padding: 40,
      fontFamily: "Arial, sans-serif",
      maxWidth: 720,
      margin: "0 auto"
    }}>
      <h1>Mebot Outbound Calls</h1>

      <p>Create a private video call and send the invite.</p>

      <button
        onClick={startCall}
        disabled={loading}
        style={{
          padding: "12px 20px",
          borderRadius: 8,
          cursor: "pointer",
          fontSize: 16
        }}
      >
        {loading ? "Creating Call..." : "Start Call"}
      </button>

      {joinUrl && (
        <div style={{ marginTop: 30 }}>
          <h2>Invite Link</h2>

          <p style={{ wordBreak: "break-all" }}>
            {joinUrl}
          </p>

          <button
            onClick={copyLink}
            style={{
              padding: "10px 16px",
              borderRadius: 8,
              cursor: "pointer"
            }}
          >
            Copy Link
          </button>

          <p style={{ marginTop: 20 }}>
            Send this link by text, email, iMessage, WhatsApp, or Slack.
          </p>
        </div>
      )}

      {error && (
        <p style={{ color: "red", marginTop: 20 }}>
          {error}
        </p>
      )}
    </main>
  );
}
