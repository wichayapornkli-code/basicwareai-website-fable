import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PressRelease3HK from "@/components/press-releases/PressRelease3HK";

export default async function PressRelease3HKRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <>
      <Navbar />
      <main>
        <PressRelease3HK locale={locale} />
      </main>
      <Footer />
    </>
  );
}
