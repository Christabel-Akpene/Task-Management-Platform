
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export type TaskStatus = "pending" | "in-progress" | "completed";

export interface FormData {
    tasktitle: string;
    description: string;
    date: string;
    status: TaskStatus;
}

export interface ModalProps {
  onClose: () => void;
  onAdd: (
    tasktitle: string,
    description: string,
    status: TaskStatus,
  ) => void;
  onEdit: (
    taskId: string,
    tasktitle: string,
    description: string,
    status: TaskStatus,
  ) => void;
  initialData?: {
    id: string;
    tasktitle: string;
    description: string;
    date: string;
    status: TaskStatus;
  };
}


export interface TaskListProps {
  id: string;
  tasktitle: string;
  description: string;
  status: TaskStatus;
  date: string;
  onDelete: (taskId: string) => void;
  onEdit: () => void;
  onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
}

export interface StatusOptionsProps {
  status: TaskStatus;
  onStatusChange: (newStatus: TaskStatus) => void;
}
