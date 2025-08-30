"use client";

import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FlickeringGridList() {
  return (
    <div className="flex justify-center items-center rounded-lg w-full bg-gray-900/50 border border-gray-700 py-16 my-12 max-w-6xl mx-auto">
      <Button
        className="text-lg py-6 bg-white text-black hover:bg-gray-200 transition-colors"
        onClick={() => {
          window.location.href = "/getstarted";
        }}
      >
        <Zap className="h-5 w-5 mr-2" />
        Start Pinging Your Servers
      </Button>
    </div>
  );
}
