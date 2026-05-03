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
}
