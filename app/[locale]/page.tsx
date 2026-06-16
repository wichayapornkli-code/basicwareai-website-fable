import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/home/Hero";
import SuccessStoriesSection from "@/components/home/SuccessStoriesSection";
import WorldwideOperations from "@/components/home/WorldwideOperations";
import PracticeAreas from "@/components/home/PracticeAreas";
import StrategicPartnership from "@/components/home/StrategicPartnership";
import CtaSection from "@/components/home/CtaSection";
import NewsSection from "@/components/home/NewsSection";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SuccessStoriesSection />
        <PracticeAreas />
        <NewsSection />
        <WorldwideOperations />
        <StrategicPartnership />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
