import Image from "next/image";
import type React from "react";
import { cn } from "@/lib/utils";

interface Item {
  name: string;
  description: string;
  icon: React.ReactElement;
  time: string;
}

const notifications = [
  {
    name: "Server Down",
    description: "PulsePing",
    time: "10m ago",
    icon: (
      <Image src="/assets/gmail.svg" alt="Gmail Icon" width={34} height={34} />
    ),
  },
  {
    name: "Server Down",
    description: "PulsePing",
    time: "5m ago",
    icon: (
      <Image src="/assets/gmail.svg" alt="Gmail Icon" width={34} height={34} />
    ),
  },
  {
    name: "Server Down",
    description: "PulsePing",
    time: "2m ago",
    icon: (
      <Image src="/assets/gmail.svg" alt="Gmail Icon" width={34} height={34} />
    ),
  },
];

const Notification = ({ name, description, icon, time }: Item) => {
  return (
    <div className="relative mx-auto min-h-fit w-full max-w-[400px] rounded-2xl p-4 bg-gray-800 border border-gray-700">
      <div className="flex flex-row items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-2xl">
          <span className="text-lg">{icon}</span>
        </div>
        <div className="flex flex-col overflow-hidden">
          <div className="flex flex-row items-center whitespace-pre text-lg font-medium text-white">
            <span className="text-sm sm:text-lg">{name}</span>
            <span className="mx-1">·</span>
            <span className="text-xs text-gray-500">{time}</span>
          </div>
          <p className="text-sm font-normal text-gray-300">{description}</p>
        </div>
      </div>
    </div>
  );
};

export function AnimateNoti({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col gap-4 p-6 w-full max-w-md", className)}>
      {notifications.map((item, idx) => (
        <Notification {...item} key={`${item.name}-${item.time}-${idx}`} />
      ))}
    </div>
  );
}
