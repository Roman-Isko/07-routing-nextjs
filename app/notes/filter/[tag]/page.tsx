// import { getNotes } from "@/lib/api";
// import NotesClient from "@/components/Notes/Notes.client";

// interface NotesPageProps {
//   params: { slug?: string[] };
// }

// export default async function NotesPage({ params }: NotesPageProps) {
//   const tag = params.slug?.[0]; // якщо /notes/filter → undefined
//   const initialNotes = await getNotes({ page: 1, search: "", tag });

//   return <NotesClient initialNotes={initialNotes} tag={tag} />;
// }

import Notes from "@/components/Notes/Notes.client";

interface FilterPageProps {
  params: { tag: string };
}

export default function FilterPage({ params }: FilterPageProps) {
  const { tag } = params;
  return <Notes tag={decodeURIComponent(tag)} />;
}
