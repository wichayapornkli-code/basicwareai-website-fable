import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "../globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import CustomCursor from "@/components/anim/CustomCursor";

export const metadata: Metadata = {
  title: "Basicware — AI Enabling infinite Global Opportunities",
  description:
    "Access the world's top AI models through a single API built for enterprises going global.",
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

  return (
    <html lang={locale} className="h-full" suppressHydrationWarning>
      <head>
        {/* Prevent flash of wrong theme on load */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('bw-theme');if(t==='dark')document.documentElement.classList.add('dark');})();`,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Instrument+Serif:ital@0;1&family=Starting+Lineup:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full antialiased">
        <ThemeProvider>
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
