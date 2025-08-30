"use client";

import { useQueryClient } from "@tanstack/react-query";
import {
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOffIcon,
  Loader2,
  Menu,
  RotateCcw,
  Trash2,
  Trash2Icon,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
// LoopIcon replaced with RotateCcw from lucide-react
import { deleteTask, reactivateTask } from "@/actions/task";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn, convertTo24HourFormat, GetLastPingTime } from "@/lib/utils";
import type { PulseTask } from "@/types";

export function TaskCard({ Task }: { Task: PulseTask }) {
  const [selectedTask, setSelectedTask] = useState<PulseTask | null>(null);
  const [isReactivating, setIsReactivating] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const toggleTaskDetails = (task: PulseTask) => {
    setSelectedTask(selectedTask && selectedTask.ID === task.ID ? null : task);
  };
  const queryClient = useQueryClient();

  const handleDeleteTask = async (Task: PulseTask) => {
    try {
      setIsDeleting(true);
      const response = await deleteTask({ taskId: Task.ID });

      if (response) {
        toast("Task deleted successfully", {
          description: "Task will now stop pinging",
          duration: 5000,
          position: "bottom-right",
          className: "bg-green-500 text-white",
        });
        await queryClient.invalidateQueries({ queryKey: ["pingTask"] });
      }
    } catch (_err) {
      toast("Failed to delete task", {
        description: "Please try again later",
        duration: 5000,
        position: "bottom-right",
        className: "bg-red-500 text-white",
      });
    } finally {
      setIsDeleting(false);
    }
  };
  const handleReactivateTask = async (Task: PulseTask) => {
    try {
      setIsReactivating(true);
      const response = await reactivateTask({ taskId: Task.ID });

      if (response) {
        toast("Task reactivated successfully", {
          description: "Task will now start pinging",
          duration: 5000,
          position: "bottom-right",
          className: "bg-green-500 text-white",
        });
        await queryClient.invalidateQueries({ queryKey: ["pingTask"] });
      }
    } catch (_err) {
      toast("Failed to reactivate task", {
        description: "Please try again later",
        duration: 5000,
        position: "bottom-right",
        className: "bg-red-500 text-white",
      });
    } finally {
      setIsReactivating(false);
    }
  };
  return (
    <div className="container mx-auto">
      <div className="space-y-4">
        <Card key={Task.ID}>
          <CardContent className="p-4">
            <TaskHeader
              Task={Task}
              selectedTask={selectedTask}
              ReactivateTask={handleReactivateTask}
              isReactivating={isReactivating}
              toggleTaskDetails={toggleTaskDetails}
              DeleteTask={handleDeleteTask}
              isDeleting={isDeleting}
            />
            <TaskLogs Task={Task} selectedTask={selectedTask} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

const TaskHeader = ({
  Task,
  selectedTask,
  ReactivateTask,
  isReactivating,
  toggleTaskDetails,
  DeleteTask,
  isDeleting,
}: {
  Task: PulseTask;
  selectedTask: PulseTask | null;
  ReactivateTask: (task: PulseTask) => void;
  isReactivating: boolean;
  toggleTaskDetails: (task: PulseTask) => void;
  DeleteTask: (task: PulseTask) => void;
  isDeleting: boolean;
}) => {
  return (
    <div
      className="flex justify-between items-center relative"
      onClick={() => toggleTaskDetails(Task)}
    >
      <div className="flex flex-col items-start">
        <h3 className="text-lg font-semibold text-blue-200 text-left ">
          <Link href={Task.url} className="hidden md:inline-block">
            {new URL(Task.url).hostname + new URL(Task.url).pathname}
          </Link>
          <Link href={Task.url} className="md:hidden">
            {new URL(Task.url).hostname.length > 20
              ? `${new URL(Task.url).hostname.substring(0, 20)}...`
              : new URL(Task.url).hostname}
          </Link>
        </h3>
        <p className="text-md text-gray-500">
          Last ping: {GetLastPingTime(Task)}
        </p>
      </div>
      <div className="hidden md:flex space-x-2 items-center">
        <div
          className={`h-3 w-3 rounded-full mr-3 ${
            Task.isActive ? "bg-green-500" : "bg-red-500"
          }`}
        ></div>

        {!Task.isActive && (
          <Button
            variant="default"
            className="hover:bg-green-800"
            onClick={() => ReactivateTask(Task)}
          >
            {isReactivating ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <RotateCcw className="h-4 w-4" />
                Reactivate
              </>
            )}
          </Button>
        )}

        <Button variant="default" onClick={() => toggleTaskDetails(Task)}>
          {selectedTask && selectedTask.ID === Task.ID ? (
            <ChevronUp />
          ) : (
            <ChevronDown />
          )}
        </Button>
        <Button
          variant="default"
          className="hover:bg-red-400"
          onClick={() => DeleteTask(Task)}
        >
          {isDeleting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Trash2 className="h-4 w-4" />
          )}
        </Button>
      </div>
      <div className="flex justify-center items-center md:hidden ">
        <div
          className={`h-3 w-3 rounded-full mr-3 ${
            Task.isActive ? "bg-green-500" : "bg-red-500"
          }`}
        ></div>
        {!Task.isActive && (
          <Button
            variant="default"
            className="hover:bg-green-800 mr-2 md:hidden "
            onClick={() => ReactivateTask(Task)}
          >
            {isReactivating ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RotateCcw className="h-4 w-4" />
            )}
          </Button>
        )}
        <Button
          variant="default"
          className="hover:bg-red-400 md:hidden"
          onClick={() => DeleteTask(Task)}
        >
          {isDeleting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Trash2 className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
};

const TaskLogs = ({
  Task,
  selectedTask,
}: {
  Task: PulseTask;
  selectedTask: PulseTask | null;
}) => {
  return (
    <>
      {selectedTask && selectedTask.ID === Task.ID && (
        <div className="overflow-hidden mt-4 animate-in slide-in-from-top-2 duration-300 ease-out">
          <div className="flex flex-col items-start justify-start">
            <h4 className="font-semibold mb-2">Logs</h4>
            {Task.logs.length === 0 ? (
              <p className="text-sm text-foreground/40">No logs available</p>
            ) : (
              <ul className="space-y-2 bg-black/40 w-full flex flex-col justify-center items-start gap-0 px-2 py-3 rounded-xl">
                {Task.logs.map((log, index) => (
                  <li
                    key={index}
                    className={cn(
                      "text-sm text-foreground/40 text-left",
                      log.isSuccess ? "text-green-500" : "text-red-300",
                    )}
                  >
                    <span className="font-medium">
                      [ {convertTo24HourFormat(log.time)} ]
                    </span>{" "}
                    - {log.logResponse} - {log.respCode}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </>
  );
};

const _MobileMenu = ({
  Task,
  selectedTask,
  ReactivateTask,
  toggleTaskDetails,
  DeleteTask,
}: {
  Task: PulseTask;
  selectedTask: PulseTask | null;
  ReactivateTask: (task: PulseTask) => void;
  toggleTaskDetails: (task: PulseTask) => void;
  DeleteTask: (task: PulseTask) => void;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="bg-transparent md:hidden"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onSelect={() => ReactivateTask(Task)}>
          {!Task.isActive && (
            <>
              <RotateCcw className="mr-2 h-4 w-4" />
              Reactivate
            </>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => toggleTaskDetails(Task)}>
          {selectedTask && selectedTask.ID === Task.ID ? (
            <>
              <EyeOffIcon className="mr-2 h-4 w-4" />
              Close Logs
            </>
          ) : (
            <>
              <Eye className="mr-2 h-4 w-4" />
              View Logs
            </>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => DeleteTask(Task)}>
          <Trash2Icon className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
