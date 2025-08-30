"use client";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Mouse as House, LogIn as Logs, Zap } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import type React from "react";
import { useState } from "react";
import { NAVBAR } from "@/constants/contant";
import { cn } from "@/lib/utils";
import { Navlogin } from "./Navlogin";

const NavbarData = [
  {
    label: "Home",
    link: "/",
    icon: <House />,
  },
  {
    label: "GitHub",
    link: "https://github.com/Avik-creator/pulse",
    icon: <GitHubLogoIcon />,
  },
  {
    label: "Dashboard",
    link: "/dashboard",
    icon: <Logs />,
  },
];

export const Navbar = () => {
  return (
    <>
      <DockMobile
        NavbarData={NavbarData}
        mobileClassName="rounded-full z-50 cursor-pointer md:flex items-center pointer-events-auto bg-background border border-gray-200 dark:border-gray-800"
      />
      <nav className="fixed z-[99999] inset-x-0 mt-12 hidden w-full px-24 text-sm md:flex">
        <SlideNavTabs />
      </nav>
    </>
  );
};

const DockMobile = ({ mobileClassName, NavbarData }: any) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex md:hidden fixed bottom-1 right-4 mx-auto origin-bottom h-full max-h-14 z-[999999999]">
      {open && (
        <div className="absolute bottom-full mb-2 inset-x-0 flex flex-col gap-2 items-center z-50">
          {NavbarData.map((item: { label: string; link: string; icon: React.ReactNode }) => (
            <div key={item.label}>
              <DockIcon
                key={item.label}
                link={item.link}
                icon={item.icon}
                className="h-10 w-10 cursor-pointer rounded-full bg-neutral-900 flex items-center justify-center"
              />
            </div>
          ))}
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setOpen(!open);
          }
        }}
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={open}
        className={cn(
          "z-50 flex gap-4 items-end rounded-2xl bg-gray-50 dark:bg-neutral-900 px-4",
          mobileClassName,
        )}
      >
        <span className="flex items-center justify-center">
          <Zap className="text-white transition-all" />
        </span>
      </button>
    </div>
  );
};

type DockIconProps = {
  link?: string;
  icon: React.ReactNode;
  className?: string;
};

const DockIcon = ({ link, icon, className }: DockIconProps) => {
  return (
    <div className={cn(className, "hover:scale-105 transition-transform")}>
      <Link href={link!}>{icon}</Link>
    </div>
  );
};

const SlideNavTabs = () => {
  const { data: session, status } = useSession();

  return (
    <div className="fixed right-0 left-0 top-5 z-30 mx-auto text-white bg-transparent">
      <ul className="flex relative items-center py-3 px-5 mx-auto text-sm text-gray-200 bg-white/5 rounded-full border border-white/10 w-fit backdrop-blur-sm">
        <Tab>
          <Zap className="h-6 w-6 text-gray-500 hover:text-white transition-colors" />
        </Tab>
        {NAVBAR.map((tab: any, index: number) => (
          <Link key={index} href={tab.link}>
            <Tab>{tab.title}</Tab>
          </Link>
        ))}
        <Tab>
          <Link href={"/dashboard"}>
            <Navlogin />
          </Link>
        </Tab>
      </ul>
    </div>
  );
};

const Tab = ({ children }: { children: React.ReactNode }) => {
  return (
    <li className="block font-semibold relative z-10 py-2.5 px-3 text-xs text-gray-200 hover:text-white cursor-pointer md:py-2 md:px-5 md:text-base transition-colors">
      {children}
    </li>
  );
};
