"use client";

import { LogOut, Plus } from "lucide-react";
import { signOut } from "next-auth/react";
import React from "react";
import AddTaskForm from "@/components/dashboard/forms/addTask";
import { TaskContainer } from "@/components/dashboard/task/taskContainer";
import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/wrappers/sectionWrapper";
import SheetWrapper from "@/components/wrappers/sheetWrapper";

export default function Dashboard() {
  return (
    <SectionWrapper>
      <div className="flex-grow flex flex-col min-h-screen bg-[#0E0C0A] text-white w-full">
        <div className="container mx-auto flex flex-col min-h-screen w-full">
          <section className="w-full py-2 md:py-24 lg:py-32 xl:py-38 relative select-none flex flex-col gap-2 md:mt-16">
            <div className="flex flex-col items-center text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <DashboardHeader />
              <TaskContainer />
            </div>
          </section>
        </div>
      </div>
    </SectionWrapper>
  );
}

function DashboardHeader() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [_isLoggingOut, setIsLoggingOut] = React.useState(false);
  const _handleLogout = () => {
    setIsLoggingOut(true);
    signOut();
    setIsLoggingOut(false);
  };
  return (
    <div className="w-full md:w-[85%] md:px-4 py-6 md:py-8 lg:px-8 animate-in fade-in slide-in-from-top-4 duration-700">
      <div className="mx-auto max-w-7xl">
        <div className="flex  sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl text-center sm:text-left animate-in fade-in duration-700 delay-200">
            Dashboard
          </h1>
          <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-start">
            <Button
              variant="outline"
              size="icon"
              className="md:hidden flex justify-center items-center"
              onClick={() => setIsOpen(true)}
            >
              <Plus className=" h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="md:hidden bg-red-500"
              onClick={() => signOut()}
            >
              <LogOut className=" h-4 w-4" />
            </Button>

            <div className="hidden md:flex md:gap-3 animate-in fade-in duration-700 delay-500">
              <Button
                variant="destructive"
                onClick={() => signOut()}
                className="flex items-center gap-2 rounded-lg"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden lg:inline">Log Out</span>
              </Button>
              <Button
                variant="default"
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 rounded-lg"
              >
                <Plus className="h-4 w-4" />
                <span className="hidden lg:inline">Add task</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <SheetWrapper
        title="Add Task"
        description="Add a new task to monitor"
        isOpen={isOpen}
        handleClose={() => setIsOpen(false)}
      >
        <AddTaskForm />
      </SheetWrapper>
    </div>
  );
}
