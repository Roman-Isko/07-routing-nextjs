"use client";

import Link from "next/link";
import css from "./TagsMenu.module.css";

const tags = ["All", "Todo", "Work", "Personal", "Meeting", "Shopping"];

export default function TagsMenu() {
  return (
    <div className={css.menuContainer}>
      <button className={css.menuButton}>Notes ▾</button>
      <ul className={css.menuList}>
        {tags.map((tag) => (
          <li className={css.menuItem} key={tag}>
            <Link
              href={`/notes/filter/${tag}`}
              className={css.menuLink}
              scroll={false}
            >
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
