// "use client";

// import Link from "next/link";
// import css from "./TagsMenu.module.css";

// const tags = ["All notes", "Work", "Personal", "Important"];

// export default function TagsMenu() {
//   return (
//     <div className={css.menuContainer}>
//       <button className={css.menuButton}>Notes ▾</button>
//       <ul className={css.menuList}>
//         {tags.map((tag) => {
//           const href =
//             tag === "All notes" ? "/notes/filter" : `/notes/filter/${tag}`;
//           return (
//             <li key={tag} className={css.menuItem}>
//               <Link href={href} className={css.menuLink}>
//                 {tag}
//               </Link>
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// }

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import css from "./TagsMenu.module.css";

const tags = ["All notes", "Work", "Personal", "Important"];

const slugify = (str: string) => str.toLowerCase().replace(/\s+/g, "-");

export default function TagsMenu() {
  const pathname = usePathname();

  return (
    <div className={css.menuContainer}>
      <button className={css.menuButton}>Notes ▾</button>
      <ul className={css.menuList}>
        {tags.map((tag) => {
          const slug = slugify(tag);
          const href = `/notes/filter/${slug}`;
          const isActive = pathname === href;

          return (
            <li key={tag} className={css.menuItem}>
              <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
                {tag === "All" ? "All notes" : tag}
              </Link>
              {/* <Link
                href={href}
                className={`${css.menuLink} ${isActive ? css.active : ""}`}
              >
                {tag}
              </Link> */}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
