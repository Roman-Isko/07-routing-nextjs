import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import TanStackProvider from "../components/TanStackProvider/TanStackProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NoteHub",
  description: "Note taking application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TanStackProvider>
          <Header />
          {children}
          <Footer />
        </TanStackProvider>
        <div id="modal-root" />
      </body>
    </html>
  );
}
