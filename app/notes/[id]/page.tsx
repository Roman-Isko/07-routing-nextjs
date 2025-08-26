import NoteDetailsWrapper from "./NoteDetailsWrapper";

export default function NotePage({ params }: { params: { id: string } }) {
  return <NoteDetailsWrapper noteId={params.id} />;
}
