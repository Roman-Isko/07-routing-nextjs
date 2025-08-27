import NoteDetailsWrapper from "../../../notes/[id]/NoteDetailsWrapper";

interface NotePageProps {
  params: Promise<{ id: string }>;
}

export default async function NotePage({ params }: NotePageProps) {
  const { id } = await params;
  return <NoteDetailsWrapper noteId={id} />;
}
