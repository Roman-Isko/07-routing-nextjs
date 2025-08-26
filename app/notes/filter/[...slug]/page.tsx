import { getNotes } from "@/lib/api/notes";
import type { NotesResponse } from "@/types/note";
import NotesClient from "@/components/Notes/Notes.client";

interface NotesPageProps {
  params: { slug?: string[] };
  searchParams: { page?: string; q?: string };
}

export default async function NotesPage({
  params,
  searchParams,
}: NotesPageProps) {
  const slug = params.slug;
  const resolvedSearchParams = searchParams;

  const tagParam = slug?.[0] || "All";
  const tag = tagParam === "All" ? undefined : tagParam;

  const page = Number(resolvedSearchParams?.page ?? 1);
  const search = resolvedSearchParams?.q ?? "";

  const initialNotes: NotesResponse = await getNotes({
    page,
    ...(search ? { search } : {}),
    ...(tag ? { tag } : {}),
  });

  return (
    <NotesClient
      initialNotes={initialNotes}
      initialTag={tagParam}
      initialPage={page}
      initialSearch={search}
    />
  );
}
