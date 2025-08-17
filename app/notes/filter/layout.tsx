// export default function NotesFilterLayout({
//   children, // вміст [tag]/page.tsx
//   sidebar, // вміст @sidebar/page.tsx
// }: {
//   children: React.ReactNode;
//   sidebar: React.ReactNode;
// }) {
//   return (
//     <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 20 }}>
//       <aside>{sidebar}</aside>
//       <main>{children}</main>
//     </div>
//   );
// }

import React from "react";

export default function NotesFilterLayout({
  children, // вміст [tag]/page.tsx
  sidebar, // вміст @sidebar/page.tsx
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 20 }}>
      <aside style={{ borderRight: "1px solid #ccc", padding: "10px" }}>
        {sidebar}
      </aside>
      <main style={{ padding: "10px" }}>{children}</main>
    </div>
  );
}
