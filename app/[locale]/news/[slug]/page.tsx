import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PressRelease3HK from "@/components/press-releases/PressRelease3HK";
import NewsArticleCover from "@/components/news/NewsArticleCover";
import { getNewsArticle } from "@/lib/news";

const DETAIL_COMPONENTS = {
  "3hk-alibaba-basicware-alliance": PressRelease3HK,
} as const;

export default async function NewsArticleRoute({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const article = getNewsArticle(slug);

  if (!article) notFound();

  const DetailComponent = DETAIL_COMPONENTS[article.detail];
  if (!DetailComponent) notFound();

  return (
    <>
      <Navbar />
      <main>
        <NewsArticleCover article={article} locale={locale} />
        <DetailComponent locale={locale} tags={article.tags} />
      </main>
      <Footer />
    </>
  );
}
