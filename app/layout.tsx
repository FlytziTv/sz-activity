import { ThemeProvider } from "@/components/layout/theme-provider";
import type { Metadata } from "next";
import { Geist, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import NavBar from "@/components/layout/navbar";
import { GlobalDialog } from "@/components/global/global-dialog";
import { GlobalAlertDialog } from "@/components/global/global-alert-dialog";

const geistHeading = Geist({ subsets: ["latin"], variable: "--font-heading" });

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SZ Activity",
  description: "A simple activity tracker for SZ Members",
  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        "font-sans",
        inter.variable,
        geistHeading.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NavBar />
          {children}
          <GlobalDialog />
          <GlobalAlertDialog />
        </ThemeProvider>
      </body>
    </html>
  );
}
