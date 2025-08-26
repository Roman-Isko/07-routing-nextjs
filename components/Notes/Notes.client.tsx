"use client";

import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import { getNotes } from "@/lib/api/notes";
import type { NotesResponse } from "@/types/note";

import NoteList from "@/components/NoteList/NoteList";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import NoteForm from "@/components/NoteForm/NoteForm";
import Modal from "@/components/Modal/Modal";

import css from "./Notes.client.module.css";

interface NotesClientProps {
  initialNotes: NotesResponse;
  initialTag: string;
  initialPage?: number;
  initialSearch?: string;
}

export default function NotesClient({
  initialNotes,
  initialTag,
  initialPage = 1,
  initialSearch = "",
}: NotesClientProps) {
  const [page, setPage] = useState(initialPage);
  const [search, setSearch] = useState(initialSearch);
  const [isOpen, setIsOpen] = useState(false);

  const tag = useMemo(
    () => (initialTag === "All" ? undefined : initialTag),
    [initialTag],
  );

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, tag]);

  const { data, isLoading, isError, error } = useQuery<NotesResponse>({
    queryKey: ["notes", page, debouncedSearch, tag],
    queryFn: () =>
      getNotes({
        page,
        ...(debouncedSearch ? { search: debouncedSearch } : {}),
        ...(tag ? { tag } : {}),
      }),

    initialData: initialNotes,

    placeholderData: (prev) => prev,
  });

  const handleSearch = (query: string) => setSearch(query);

  return (
    <div className={css.container}>
      <SearchBox onSearch={handleSearch} initialValue={initialSearch} />

      <button onClick={() => setIsOpen(true)} className={css.button}>
        Create note+
      </button>

      {isLoading && <Loader />}
      {isError && (
        <ErrorMessage
          message={(error as Error)?.message || "Failed to load notes"}
        />
      )}

      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}

      {data && data.totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={data.totalPages}
          onPageChange={(newPage) => setPage(newPage)}
        />
      )}

      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <NoteForm onClose={() => setIsOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
