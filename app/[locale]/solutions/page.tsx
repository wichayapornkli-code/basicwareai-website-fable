import { getTranslations } from "next-intl/server";
import Navbar from "@/components/Navbar";
import ScrollHero from "@/components/ScrollHero";
import LogoScroller from "@/components/home/LogoScroller";
import SolutionsPage from "@/components/solutions/SolutionsPage";

export default async function Solutions() {
  const t = await getTranslations("solutionsHero");
  return (
    <>
      <Navbar />
      <ScrollHero
        bgSrc="/assets/2_hero_Product.avif"
        bgColor="#0148ae"
        overlayColor="rgba(6,51,156,0.2)"
        accentColor="#191c26"
        lines={[
          [{ text: t("line1") }, { text: t("line1Accent"), accent: true }],
          [{ text: t("line2") }],
        ]}
        belowCard={<LogoScroller />}
      />
      <SolutionsPage />
    </>
  );
}
