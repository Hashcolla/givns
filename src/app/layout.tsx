import type { Metadata } from "next";
import { Poppins, Inter, Bokor } from "next/font/google";
import "./globals.css";
import ModalProvider from "@/components/ui/Modal";
import { ThemeProvider } from "@/utils/ThemeProvider";
import { ThemeToggle } from "@/utils/ThemeToggle";
import { Toaster } from "@/components/ui/sonner";
import LoadingPage from "@/components/main/LoadingPage";

const bokor = Bokor({
  subsets: ["latin"],
  weight: "400",
});

const inter = Inter({
  subsets: ["latin"],
  weight: "400",
});

const poppins = Poppins({
  variable: "--font-popppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Givns | Let them help...",
  description: "A platform to help people in need",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn-uicons.flaticon.com/3.0.0/uicons-regular-rounded/css/uicons-regular-rounded.css"
        ></link>
        <link
          rel="stylesheet"
          href="https://cdn-uicons.flaticon.com/3.0.0/uicons-solid-rounded/css/uicons-solid-rounded.css"
        ></link>
        <link
          rel="stylesheet"
          href="https://cdn-uicons.flaticon.com/3.0.0/uicons-thin-rounded/css/uicons-thin-rounded.css"
        ></link>
        <link
          rel="stylesheet"
          href="https://cdn-uicons.flaticon.com/3.0.0/uicons-bold-rounded/css/uicons-bold-rounded.css"
        ></link>
        <link
          rel="stylesheet"
          href="https://cdn-uicons.flaticon.com/3.0.0/uicons-solid-chubby/css/uicons-solid-chubby.css"
        ></link>
        <link
          rel="stylesheet"
          href="https://cdn-uicons.flaticon.com/3.0.0/uicons-thin-straight/css/uicons-thin-straight.css"
        ></link>
        <link
          rel="stylesheet"
          href="https://cdn-uicons.flaticon.com/3.0.0/uicons-solid-straight/css/uicons-solid-straight.css"
        ></link>
      </head>
      <body
        suppressHydrationWarning
        className={`${poppins.className} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ModalProvider>
            <>
              {children}
              <LoadingPage />
            </>
          </ModalProvider>
          <Toaster richColors={true} />
          <div className="fixed top-20 right-10">
            <ThemeToggle />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
