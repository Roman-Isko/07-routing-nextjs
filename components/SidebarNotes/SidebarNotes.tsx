import css from "./SidebarNotes.module.css";

export default function SidebarNotes() {
  // Тут можна підставити теги або короткі нотатки
  const tags = ["All", "Work", "Personal", "Urgent"];

  return (
    <aside className={css.sidebar}>
      <h3>Теги нотаток</h3>
      <ul>
        {tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    </aside>
  );
}
