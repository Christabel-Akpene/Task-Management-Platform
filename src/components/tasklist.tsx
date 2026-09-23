import { Pencil, Trash } from "lucide-react";
import type { TaskStatus } from "../types";
import { useState } from "react";
import type { TaskListProps, StatusOptionsProps } from "../types";

const statusColors = {
    "pending": "text-yellow-500",
    "in-progress": "text-blue-500",
    "completed": "text-green-500"
}

const options:TaskStatus[] = ["pending", "in-progress", "completed"];

const TaskList = ({ id, tasktitle, status, description, date, onDelete, onEdit, onStatusChange }: TaskListProps) => {
    const [showStatusOptions, setShowStatusOptions] = useState(false);

    const handleStatusChange = (newStatus: TaskStatus) => {
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
            className={`flex items-center cursor-pointer ${statusColors[status]}`}
          >
            {status}
            {"\u2304"}
          </p>
          {showStatusOptions && (
            <StatusOptions
              status={status}
              onStatusChange={handleStatusChange}
            />
          )}
        </div>
      </div>
    </div>
  );
}


const StatusOptions = ({status, onStatusChange}: StatusOptionsProps) => {

    return (
        <div className="bg-white w-32 absolute right-0 top-full mt-1 border rounded-md p-2 shadow-md z-10"  id="status">
            {options.map((statusOption) => (
                <p onClick={()=> onStatusChange(statusOption)} key={statusOption} className={`px-3 py-2 cursor-pointer ${statusColors[statusOption]} ${statusOption === status ? "font-semibold" : "" } `}>{statusOption}</p>
            ))}
        </div>
    )
}

export default TaskList