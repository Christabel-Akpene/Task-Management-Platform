import type { TaskStatus } from './components/modal';

interface Task {
    id: string;
    taskname: string;
    status: TaskStatus;
}

export const tasks: Task[] = [
    {
        id: crypto.randomUUID(),
        taskname: "Go to the market",
        status: "pending"
    },
    {
        id: crypto.randomUUID(),
        taskname: "Read a book",
        status: "in-progress"
    },
    {
        id: crypto.randomUUID(),
        taskname: "Draw a bird",
        status: "in-progress"
    }, 
    {
        id: crypto.randomUUID(),
        taskname: "Clean the house",
        status: "completed"
    }
]