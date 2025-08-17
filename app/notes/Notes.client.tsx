"use client";

import { useState, useEffect } from "react";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import { Toaster } from "react-hot-toast";

import { getNotes } from "../../lib/api";
import type { Note } from "../../types/note";

import NoteList from "../../components/NoteList/NoteList";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Pagination from "../../components/Pagination/Pagination";
import SearchBox from "../../components/SearchBox/SearchBox";
import NoteForm from "../../components/NoteForm/NoteForm";
import Modal from "../../components/Modal/Modal";

import css from "./Notes.client.module.css";

interface NotesData {
  notes: Note[];
  totalPages: number;
}

interface NotesProps {
  initialNotes: NotesData;
}

export default function NotesClient({ initialNotes }: NotesProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const { data, isLoading, isError }: UseQueryResult<NotesData, Error> =
    useQuery<NotesData, Error, NotesData, [string, number, string]>({
      queryKey: ["notes", page, debouncedSearch],
      queryFn: () => getNotes({ page, search: debouncedSearch }),
      initialData: initialNotes,
      placeholderData: (prev) => prev, // ✅ запобігає мерехтінню при пагінації
    });

  const handleSearch = (query: string) => setSearch(query);

  return (
    <div className={css.container}>
      <Toaster />
      <SearchBox onSearch={handleSearch} />

      <button onClick={() => setIsOpen(true)} className={css.button}>
        Create note+
      </button>

      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
      {data && data.totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={data.totalPages}
          onPageChange={(newPage: number) => setPage(newPage)}
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
