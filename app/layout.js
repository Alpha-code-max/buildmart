import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/utils/providers";
import NavBar from "@/components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "BuildMart",
  description: "A simple CRUD application for managing products",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-gray-900 min-h-screen`}>
        <Providers>
          <NavBar />
          <div className="px-5">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
