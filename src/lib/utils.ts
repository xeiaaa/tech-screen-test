import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { DateTime } from "luxon";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(isoDate: string): string {
  const updated = DateTime.fromISO(isoDate);
  const now = DateTime.now();
  const diffInSeconds = now.diff(updated, "seconds").seconds;

  if (diffInSeconds < 10) {
    return "just now";
  }

  return updated.toRelative() ?? "a moment ago";
}
