import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TaskFlow - Smart Task Management",
  description: "Manage your tasks efficiently with our beautiful task manager",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${inter.className} bg-gradient-to-br from-gray-50 to-gray-100`}
        >
          <Navbar />
          <main className="min-h-screen pt-20">{children}</main>
          <footer className="border-t border-gray-200 py-8">
            <div className="max-w-7xl mx-auto px-4 text-center text-gray-600">
              <p>© 2024 TaskFlow. All rights reserved.</p>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
