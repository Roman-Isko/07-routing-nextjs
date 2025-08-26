import { api } from "./axios";
import type { Note, NewNote, NotesResponse } from "@/types/note";

export async function getNotes(params: {
  page: number;
  search?: string;
  tag?: string;
}): Promise<NotesResponse> {
  const { page, search, tag } = params;
  const res = await api.get<NotesResponse>("/notes", {
    params: {
      page,
      ...(search ? { search } : {}),
      ...(tag ? { tag } : {}),
    },
  });
  return res.data;
}

export async function getNoteById(id: string): Promise<Note> {
  const res = await api.get<Note>(`/notes/${id}`);
  return res.data;
}

export async function createNote(payload: NewNote): Promise<Note> {
  const res = await api.post<Note>("/notes", payload);
  return res.data;
}

export async function updateNote(
  id: string,
  patch: Partial<NewNote>,
): Promise<Note> {
  const res = await api.patch<Note>(`/notes/${id}`, patch);
  return res.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const res = await api.delete<Note>(`/notes/${id}`);
  return res.data;
}
