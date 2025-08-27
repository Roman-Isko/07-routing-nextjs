"use client";

import { useQuery } from "@tanstack/react-query";
import { getNoteById } from "../../../../lib/api";
import { useRouter } from "next/navigation";

type Props = { id: string };

export default function NotePreview({ id }: Props) {
  const router = useRouter();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["note", id],
    queryFn: () => getNoteById(id),
  });

  if (isLoading) return <div>Loading note...</div>;
  if (isError || !data) return <div>Failed to load note</div>;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50"
      onClick={() => router.back()}
    >
      <div
        className="bg-white p-4 rounded shadow max-w-lg w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-2">{data.title}</h2>
        <p>{data.content}</p>
        <button
          className="mt-4 px-3 py-1 border rounded"
          onClick={() => router.back()}
        >
          Close
        </button>
      </div>
    </div>
  );
}
