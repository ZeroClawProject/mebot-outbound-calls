export default async function handler(req, res) {
  try {
    const roomName = `mebot-${Date.now()}`;

    return res.status(200).json({
      success: true,
      joinUrl: `https://meet.jit.si/${roomName}`
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
}
