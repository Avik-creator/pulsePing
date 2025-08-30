import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { PulseTask } from "../types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function GetLastPingTime(task: PulseTask): string {
  if (!task.logs || task.logs.length === 0) {
    return "No pings yet";
  }

  const lastLog = task.logs[task.logs.length - 1];
  return convertTo24HourFormat(lastLog.time);
}

export function convertTo24HourFormat(timestamp: string): string {
  try {
    const date = new Date(timestamp);
    if (Number.isNaN(date.getTime())) {
      return "Invalid time";
    }

    return date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  } catch (_error) {
    return "Invalid time";
  }
}

export function formatTime(timestamp: string): string {
  try {
    const date = new Date(timestamp);
    if (Number.isNaN(date.getTime())) {
      return "Invalid time";
    }

    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch (_error) {
    return "Invalid time";
  }
}
