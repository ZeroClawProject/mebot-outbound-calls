import { useState } from "react";

const TROYBOT_VIDEO_URL =
  "https://www.mebot.ai/video-chat/e90104a1-81f6-4023-a86e-07dc1232b5cb?slug=troybot&summarize=false&isAudioChat=false";

export default function Home() {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState(
    "Troy's Mebot is calling you. Tap to answer:"
  );

  function callWithMebot() {
    const body = `${message} ${TROYBOT_VIDEO_URL}`;
    const smsUrl = `sms:${phone}?&body=${encodeURIComponent(body)}`;
    window.location.href = smsUrl;
  }

  return (
    <main style={{
      padding: 40,
      fontFamily: "Arial, sans-serif",
      maxWidth: 720,
      margin: "0 auto"
    }}>
      <h1>Call With Troybot</h1>

      <p>Enter a phone number and send a prefilled text invite.</p>

      <label>Phone Number</label>
      <input
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="+18085551212"
        style={{
          display: "block",
          width: "100%",
          padding: 12,
          marginTop: 8,
          marginBottom: 20,
          fontSize: 16
        }}
      />

      <label>Message</label>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{
          display: "block",
          width: "100%",
          padding: 12,
          marginTop: 8,
          marginBottom: 20,
          fontSize: 16,
          minHeight: 90
        }}
      />

      <button
        onClick={callWithMebot}
        disabled={!phone}
        style={{
          padding: "12px 20px",
          borderRadius: 8,
          cursor: phone ? "pointer" : "not-allowed",
          fontSize: 16
        }}
      >
        Call With Troybot
      </button>
    </main>
  );
}      fontFamily: "Arial, sans-serif",
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
