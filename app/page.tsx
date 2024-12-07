import dynamic from "next/dynamic";

const TranscriptProcess = dynamic(
  () => import("./components/TranscriptProcess"),
  {
    loading: () => <p>Loading...</p>,
  }
);

export default function Home() {
  return (
    <main className="transcription">
      <TranscriptProcess />
    </main>
  );
}
