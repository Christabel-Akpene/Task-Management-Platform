import { Pencil, Trash } from "lucide-react";
import type { TaskStatus } from "./modal";
import { useState } from "react";

interface TaskListProps {
    id: string;
    tasktitle: string;
    description: string;
    status: TaskStatus;
    date: string;
    onDelete: (taskId: string) => void;
    onEdit: () => void;
    onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
}

interface StatusOptionsProps {
    status: TaskStatus;
    setChangeStatus: (newStatus: TaskStatus) => void;
}

const statusColors = {
    "pending": "text-yellow-500",
    "in-progress": "text-blue-500",
    "completed": "text-green-500"
}

const options:TaskStatus[] = ["pending", "in-progress", "completed"];

const TaskList = ({ id, tasktitle, status, description, date, onDelete, onEdit, onStatusChange }: TaskListProps) => {
    const [changeStatus, setChangeStatus] = useState(status);
    const [showStatusOptions, setShowStatusOptions] = useState(false);

    const handleStatusChange = (newStatus: TaskStatus) => {
        setChangeStatus(newStatus);
        onStatusChange(id, newStatus);
        setShowStatusOptions(false);
    }

  return (
    <div className="border flex flex-col shadow-sm rounded-md p-3">
      <div className="flex justify-between items-center">
        <p className="font-semibold">{tasktitle}</p>
        <div className="flex space-x-3">
          <Pencil onClick={onEdit} size={14} className="cursor-pointer" />
          <Trash
            onClick={() => onDelete(id)}
            size={14}
            color="red"
            className="cursor-pointer "
          />
        </div>
      </div>
      <p className="text-gray-600">{description}</p>

      <div className="flex justify-between items-center space-x-4">
        <p className="text-xs">{date}</p>
        <div className="relative">
          <p
            onClick={() => setShowStatusOptions(!showStatusOptions)}
            className={`flex items-center cursor-pointer ${statusColors[changeStatus]}`}
          >
            {changeStatus}
            {"\u2304"}
          </p>
          {showStatusOptions && (
            <StatusOptions
              status={changeStatus}
              setChangeStatus={handleStatusChange}
            />
          )}
        </div>
      </div>
    </div>
  );
}


const StatusOptions = ({status, setChangeStatus}: StatusOptionsProps) => {

    return (
        <div className="bg-white w-32 absolute right-0 top-full mt-1 border rounded-md p-2 shadow-md z-10"  id="status">
            {options.map((statusOption) => (
                <p onClick={()=> setChangeStatus(statusOption)} key={statusOption} className={`px-3 py-2 cursor-pointer ${statusColors[statusOption]} ${statusOption === status ? "font-semibold" : "" } `}>{statusOption}</p>
            ))}
        </div>
    )
}

export default TaskList