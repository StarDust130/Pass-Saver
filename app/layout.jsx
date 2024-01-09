import { Inter } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/provider/redux/ReduxProvider";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pass Saver",
  description: "A simple password manager",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
