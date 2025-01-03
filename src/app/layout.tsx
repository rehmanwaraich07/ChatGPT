import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme-provider";
import Navbar from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "AskGini - Free AI Assistant By ProGini",
  description:
    "AskGini is a next generation AI assistant built by ProGini and trained to be safe, accurate, and secure to help you do your best work. ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased`}
        suppressHydrationWarning={true}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex-1 overflow-y-auto">{children}</div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
