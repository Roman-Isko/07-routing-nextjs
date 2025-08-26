import NoteDetailsWrapper from "./NoteDetailsWrapper";

interface NotePageProps {
  params: { id: string };
}

export default function NotePage({ params }: NotePageProps) {
  return <NoteDetailsWrapper noteId={params.id} />;
}
