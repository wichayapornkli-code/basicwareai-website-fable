import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import CaseStudyDetailPage from "@/components/success-stories/CaseStudyDetailPage";
import { CASE_STUDIES } from "@/lib/case-studies";

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const study = CASE_STUDIES.find((s) => s.id === Number(id));

  if (!study) notFound();

  return (
    <>
      <Navbar />
      <CaseStudyDetailPage study={study} locale={locale} />
    </>
  );
}
