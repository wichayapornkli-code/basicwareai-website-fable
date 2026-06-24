import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsPage from "@/components/news/NewsPage";

export default function News() {
  return (
    <>
      <Navbar />
      <main>
        <Suspense>
          <NewsPage />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
