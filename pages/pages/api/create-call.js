export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const apiKey = process.env.DAILY_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: "Missing DAILY_API_KEY" });
    }

    const roomName = `mebot-${Date.now()}`;
    const exp = Math.floor(Date.now() / 1000) + 60 * 60;

    const roomResponse = await fetch("https://api.daily.co/v1/rooms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        name: roomName,
        privacy: "private",
        properties: {
          exp,
          enable_chat: true,
          start_video_off: false,
          start_audio_off: false
        }
      })
    });

    const room = await roomResponse.json();

    if (!roomResponse.ok) {
      return res.status(roomResponse.status).json(room);
    }

    const tokenResponse = await fetch("https://api.daily.co/v1/meeting-tokens", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        properties: {
          room_name: roomName,
          exp,
          is_owner: false,
          user_name: "Guest"
        }
      })
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      return res.status(tokenResponse.status).json(tokenData);
    }

    const joinUrl = `${room.url}?t=${tokenData.token}`;

    return res.status(200).json({
      roomName,
      roomUrl: room.url,
      joinUrl
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
