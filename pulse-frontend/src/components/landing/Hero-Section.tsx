"use client";

import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { ArrowRight, Coffee, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 relative flex flex-col gap-20">
      <div className="flex flex-col items-center text-center space-y-8">
        <a
          href="https://github.com/Avik-creator/pulse"
          target="_blank"
          rel="noreferrer"
        >
          <div className="flex items-center justify-center gap-4 rounded-full text-white/80 bg-black/50 border border-gray-700 px-6 py-2 text-sm hover:bg-black/70 transition-colors">
            <GitHubLogoIcon className="h-4 w-4" />
            <span>Star us on Github</span>
          </div>
        </a>

        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none max-w-3xl mx-auto">
            Wake Up Your Sleepy Servers!
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl lg:text-2xl">
            Because even servers need a good poke now and then. We&apos;ll keep
            your cold starts hot and your downtime down.
          </p>
        </div>

        <div className="w-full max-w-md space-y-4">
          <Button
            className="w-full text-lg py-6 bg-white text-black hover:bg-gray-200 transition-colors"
            onClick={() => {
              window.location.href = "/getstarted";
            }}
          >
            <Zap className="h-5 w-5 mr-2" />
            Start Pinging Your Servers
          </Button>
          <p className="text-sm text-center text-gray-300">
            No credit card required. Start keeping your servers awake in
            seconds.
          </p>
        </div>

        <div className="flex items-center justify-center space-x-8 mt-8">
          <div className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-white" />
            <span className="text-sm font-medium">Lightning Fast</span>
          </div>
          <div className="flex items-center space-x-2">
            <Coffee className="h-5 w-5 text-white" />
            <span className="text-sm font-medium">Always Awake</span>
          </div>
          <div className="flex items-center space-x-2">
            <ArrowRight className="h-5 w-5 text-white" />
            <span className="text-sm font-medium">Easy Setup</span>
          </div>
        </div>
      </div>

      <div className="relative">
        <img
          src="/images/landing-hero.jpeg"
          alt="Landing page background"
          width={1512}
          height={1405}
          className="w-full hidden sm:block h-full max-w-[70vw] mx-auto md:w-full px-5 rounded-2xl"
        />
      </div>
    </section>
  );
};
