import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { cookies } from "next/headers";
import "../globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import CustomCursor from "@/components/anim/CustomCursor";

export const metadata: Metadata = {
  title: "Basicware — AI Enabling infinite Global Opportunities",
  description:
    "Access the world's top AI models through a single API built for enterprises going global.",
  icons: {
    icon: [
      { url: "/assets/favicon_io/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/assets/favicon_io/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/assets/favicon_io/favicon.ico" },
    ],
    apple: "/assets/favicon_io/apple-touch-icon.png",
    other: [
      { rel: "manifest", url: "/assets/favicon_io/site.webmanifest" },
    ],
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();
  const cookieStore = await cookies();
  const initialIsDark = cookieStore.get("bw-theme")?.value === "dark";
  const htmlLang =
    locale === "zh" ? "zh-Hans" : locale === "zh-tw" ? "zh-Hant" : locale;

  return (
    <html
      lang={htmlLang}
      className={`h-full${initialIsDark ? " dark" : ""}`}
      suppressHydrationWarning
      style={{ colorScheme: initialIsDark ? "dark" : "light" }}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Instrument+Serif:ital@0;1&family=Starting+Lineup:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full antialiased">
        <ThemeProvider initialIsDark={initialIsDark}>
          <NextIntlClientProvider messages={messages}>
            {children}
            <CustomCursor />
            <div className="bw-grain" aria-hidden />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
