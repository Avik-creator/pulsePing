import { AnimateNoti } from "@/components/landing/AnimateNotification";
import { FlickeringGridList } from "@/components/landing/CTA";
import Features from "@/components/landing/Features";
import { Hero } from "@/components/landing/Hero-Section";
import RotatingIcons from "@/components/landing/RotatingIcons";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen text-white">
      <div className="container mx-auto sm:px-6 lg:px-8 flex flex-col min-h-screen">
        <Hero />
        <Features />
        <div className="w-full flex flex-col md:flex-row justify-between items-center">
          <RotatingIcons />
          <AnimateNoti />
        </div>
        <FlickeringGridList />
      </div>
    </div>
  );
}
