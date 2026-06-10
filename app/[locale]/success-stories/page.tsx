import { getTranslations } from "next-intl/server";
import Navbar from "@/components/Navbar";
import ScrollHero from "@/components/ScrollHero";
import LogoScroller from "@/components/home/LogoScroller";
import SuccessStoriesPage from "@/components/success-stories/SuccessStoriesPage";

export default async function SuccessStories() {
  const t = await getTranslations("successHero");
  return (
    <>
      <Navbar />
      <ScrollHero
        bgSrc="/assets/2_Customers_hero.png"
        bgColor="#012a65"
        overlayColor="rgba(6,29,125,0.2)"
        bgObjectPosition="center center"
        accentColor="#191c26"
        lines={[
          [{ text: t("line1"), accent: true }],
          [{ text: t("line2") }],
        ]}
        belowCard={<LogoScroller />}
      />
      <SuccessStoriesPage />
    </>
  );
}
