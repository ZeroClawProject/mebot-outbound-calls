export default function Home() {
  return (
    <main style={{
      padding: 40,
      fontFamily: "Arial, sans-serif"
    }}>
      <h1>Mebot Outbound Calls</h1>

      <p>Your Mebot can now initiate calls.</p>

      <button style={{
        padding: "12px 20px",
        borderRadius: 8,
        cursor: "pointer"
      }}>
        Start Call
      </button>
    </main>
  );
}
