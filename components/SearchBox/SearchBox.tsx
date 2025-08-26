// import { useState } from "react";
// import toast from "react-hot-toast";

// import css from "./SearchBox.module.css";

// interface SearchBoxProps {
//   onSearch: (query: string) => void;
// }

// export default function SearchBox({ onSearch }: SearchBoxProps) {
//   const [value, setValue] = useState("");

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter") {
//       const trimmed = value.trim();

//       if (!trimmed) {
//         toast.error("Enter text to search!");
//         return;
//       }

//       onSearch(trimmed);
//       setValue("");
//     }
//   };

//   return (
//     <input
//       className={css.input}
//       type="text"
//       placeholder="Search notes"
//       value={value}
//       onChange={(e) => setValue(e.target.value)}
//       onKeyDown={handleKeyDown}
//     />
//   );
// }

import { useState, useEffect } from "react";
import toast from "react-hot-toast";

import css from "./SearchBox.module.css";

interface SearchBoxProps {
  onSearch: (query: string) => void;
  initialValue?: string; // <- додано
}

export default function SearchBox({
  onSearch,
  initialValue = "",
}: SearchBoxProps) {
  const [value, setValue] = useState(initialValue);

  // Якщо батьківський initialValue зміниться (SSR -> CSR наприклад),
  // ми підхопимо його й оновимо поле вводу.
  useEffect(() => {
    setValue(initialValue ?? "");
  }, [initialValue]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const trimmed = value.trim();

      if (!trimmed) {
        toast.error("Enter text to search!");
        return;
      }

      onSearch(trimmed);
      // очищаємо інпут лише після виклику onSearch
      setValue("");
    }
  };

  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={handleKeyDown}
    />
  );
}
