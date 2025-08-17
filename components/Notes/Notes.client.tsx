// "use client";

// import { useState, useEffect } from "react";
// import { useQuery, UseQueryResult } from "@tanstack/react-query";
// import { useDebounce } from "@uidotdev/usehooks";
// import { Toaster } from "react-hot-toast";

// import { getNotes } from "../../lib/api";
// import type { Note } from "../../types/note";

// import NoteList from "../../components/NoteList/NoteList";
// import Loader from "../../components/Loader/Loader";
// import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
// import Pagination from "../../components/Pagination/Pagination";
// import SearchBox from "../../components/SearchBox/SearchBox";
// import NoteForm from "../../components/NoteForm/NoteForm";
// import Modal from "../../components/Modal/Modal";

// import css from "./Notes.client.module.css";

// interface NotesData {
//   notes: Note[];
//   totalPages: number;
// }

// interface NotesProps {
//   initialNotes: NotesData;
// }

// export default function NotesClient({ initialNotes }: NotesProps) {
//   const [page, setPage] = useState(1);
//   const [search, setSearch] = useState("");
//   const debouncedSearch = useDebounce(search, 500);
//   const [isOpen, setIsOpen] = useState(false);

//   useEffect(() => {
//     setPage(1);
//   }, [debouncedSearch]);

//   const { data, isLoading, isError }: UseQueryResult<NotesData, Error> =
//     useQuery<NotesData, Error, NotesData, [string, number, string]>({
//       queryKey: ["notes", page, debouncedSearch],
//       queryFn: () => getNotes({ page, search: debouncedSearch }),
//       initialData: initialNotes,
//       placeholderData: (prev) => prev, // ✅ запобігає мерехтінню при пагінації
//     });

//   const handleSearch = (query: string) => setSearch(query);

//   return (
//     <div className={css.container}>
//       <Toaster />
//       <SearchBox onSearch={handleSearch} />

//       <button onClick={() => setIsOpen(true)} className={css.button}>
//         Create note+
//       </button>

//       {isLoading && <Loader />}
//       {isError && <ErrorMessage />}
//       {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
//       {data && data.totalPages > 1 && (
//         <Pagination
//           currentPage={page}
//           totalPages={data.totalPages}
//           onPageChange={(newPage: number) => setPage(newPage)}
//         />
//       )}

//       {isOpen && (
//         <Modal onClose={() => setIsOpen(false)}>
//           <NoteForm onClose={() => setIsOpen(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { getNotes } from "@/lib/api";
import type { Note } from "@/types/note";
import css from "./Notes.client.module.css";

type NotesData = { notes: Note[]; totalPages: number };

export default function Notes({ tag }: { tag: string }) {
  const [data, setData] = useState<NotesData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadNotes() {
      setLoading(true);
      setError(null);

      try {
        const res = await getNotes({ page: 1, search: "", tag });
        if (!cancelled) setData(res);
      } catch (err: any) {
        if (!cancelled) setError(err.response?.data?.message || err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadNotes();

    return () => {
      cancelled = true;
    };
  }, [tag]);

  return (
    <div className={css.container}>
      <h2>Notes: {tag}</h2>

      {loading && <p>Loading…</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {!loading && !error && data && data.notes.length > 0 && (
        <ul>
          {data.notes.map((n) => (
            <li key={n.id}>{n.title}</li>
          ))}
        </ul>
      )}

      {!loading && !error && data && data.notes.length === 0 && (
        <p>No notes found.</p>
      )}
    </div>
  );
}

// "use client";

// import { useState, useEffect } from "react";
// import { useQuery, UseQueryResult } from "@tanstack/react-query";
// import { useDebounce } from "@uidotdev/usehooks";
// import { Toaster } from "react-hot-toast";

// import { getNotes } from "@/lib/api";
// import type { Note } from "@/types/note";

// import NoteList from "@/components/NoteList/NoteList";
// import Loader from "@/components/Loader/Loader";
// import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
// import Pagination from "@/components/Pagination/Pagination";
// import SearchBox from "@/components/SearchBox/SearchBox";
// import NoteForm from "@/components/NoteForm/NoteForm";
// import Modal from "@/components/Modal/Modal";

// import css from "./Notes.client.module.css";

// interface NotesData {
//   notes: Note[];
//   totalPages: number;
// }

// interface NotesProps {
//   initialNotes: NotesData;
//   tag?: string;
// }

// export default function NotesClient({ initialNotes, tag }: NotesProps) {
//   const [page, setPage] = useState(1);
//   const [search, setSearch] = useState("");
//   const debouncedSearch = useDebounce(search, 500);
//   const [isOpen, setIsOpen] = useState(false);

//   useEffect(() => {
//     setPage(1);
//   }, [debouncedSearch, tag]);

//   const { data, isLoading, isError }: UseQueryResult<NotesData, Error> =
//     useQuery<NotesData, Error, NotesData, [string, number, string, string?]>({
//       queryKey: ["notes", page, debouncedSearch, tag],
//       queryFn: () => getNotes({ page, search: debouncedSearch, tag }),
//       initialData: initialNotes,
//       placeholderData: (prev) => prev,
//     });

//   const handleSearch = (query: string) => setSearch(query);

//   return (
//     <div className={css.container}>
//       <Toaster />
//       <SearchBox onSearch={handleSearch} />

//       <button onClick={() => setIsOpen(true)} className={css.button}>
//         Create note+
//       </button>

//       {isLoading && <Loader />}
//       {isError && <ErrorMessage />}
//       {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
//       {data && data.totalPages > 1 && (
//         <Pagination
//           currentPage={page}
//           totalPages={data.totalPages}
//           onPageChange={(newPage: number) => setPage(newPage)}
//         />
//       )}

//       {isOpen && (
//         <Modal onClose={() => setIsOpen(false)}>
//           <NoteForm onClose={() => setIsOpen(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// }
