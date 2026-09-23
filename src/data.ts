import type { TaskStatus } from "./types";

export interface Task {
  id: string;
  tasktitle: string;
  status: TaskStatus;
  description: string;
  date: string;
}

export const tasks: Task[] = [
  {
    id: crypto.randomUUID(),
    tasktitle: "Go to the market",
    status: "pending",
    description: "Buy groceries for the week.",
    date: "2026-09-22",
  },
  {
    id: crypto.randomUUID(),
    tasktitle: "Reading",
    status: "in-progress",
    description: "Continue chapter 3 of Roses for Lily.",
    date: "2026-09-22",
  },
  {
    id: crypto.randomUUID(),
    tasktitle: "Drawing",
    status: "in-progress",
    description: "Draw a bird for Yaa",
    date: "2026-09-21",
  },
  {
    id: crypto.randomUUID(),
    tasktitle: "Clean the house",
    status: "completed",
    description: "Clean the kitchen and bedrooms.",
    date: "2026-09-21",
  },
];
