export default async function handler(req, res) {
  try {
    const apiKey = process.env.DAILY_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "Missing DAILY_API_KEY"
      });
    }

    const roomName = `mebot-${Date.now()}`;

    const roomResponse = await fetch(
      "https://api.daily.co/v1/rooms",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: roomName,
          privacy: "private"
        })
      }
    );

    const room = await roomResponse.json();

    if (!roomResponse.ok) {
      return res.status(500).json(room);
    }

    return res.status(200).json({
      success: true,
      joinUrl: room.url
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
}
