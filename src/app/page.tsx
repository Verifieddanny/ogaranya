import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import WeaponsSection from '@/components/WeaponsSection';
import PosterSection from '@/components/PosterSection';
import ShowcaseSection from '@/components/ShowcaseSection';
import GlyphsSection from '@/components/GlyphsSection';
import CardGeneratorSection from '@/components/CardGeneratorSection';
import LanguagesSection from '@/components/LanguagesSection';
import SpecimenTesterSection from '@/components/SpecimenTesterSection';
import CardGeneratorSection2 from '@/components/CardGeneratorSection2';
import InteractiveTypeTesterSection from '@/components/InteractiveTypeTesterSection';
import CardGeneratorSection3 from '@/components/CardGeneratorSection3';
import InteractiveTypeTesterSection2 from '@/components/InteractiveTypeTesterSection2';
import TryOgaranyaSection from '@/components/TryOgaranyaSection';
import FooterSection from '@/components/FooterSection';

export default function Home() {
  return (
    <main className="relative min-h-screen w-full bg-[#FAF6EC] text-[#141414]">
      <Navbar />
      <HeroSection />
      <WeaponsSection />
      <PosterSection />
      <ShowcaseSection />
      <GlyphsSection />
      <CardGeneratorSection />
      <SpecimenTesterSection />
      <CardGeneratorSection2 />
      <InteractiveTypeTesterSection />
      <CardGeneratorSection3 />
      <InteractiveTypeTesterSection2 />
      <TryOgaranyaSection />
      <FooterSection />
    </main>
  );
}
