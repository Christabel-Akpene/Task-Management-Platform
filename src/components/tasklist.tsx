import { Pencil, Trash } from "lucide-react";
import type { TaskStatus } from "./modal";
import { useState } from "react";

interface TaskListProps {
    taskname: string;
    status: TaskStatus;
}

interface StatusOptionsProps {
    status: TaskStatus;
    setChangeStatus: React.Dispatch<React.SetStateAction<TaskStatus>>;
}

const statusColors = {
    "pending": "text-yellow-500",
    "in-progress": "text-blue-500",
    "completed": "text-green-500"
}

const options:TaskStatus[] = ["pending", "in-progress", "completed"];

const TaskList = ({ taskname, status }: TaskListProps) => {
    const [changeStatus, setChangeStatus] = useState(status);
    const [showStatusOptions, setShowStatusOptions] = useState(false);

  return (
    <div className="border flex flex-col shadow-sm rounded-md sm:flex-row sm:justify-between sm:items-center p-3">
      <p>{taskname}</p>
      <div className="flex justify-between items-center sm:justify-end space-x-4">
        <div className="relative">
          <p
            onClick={() => setShowStatusOptions(!showStatusOptions)}
            className={`flex items-center cursor-pointer ${statusColors[changeStatus]}`}
          >
            {changeStatus}
            {"\u2304"}
          </p>
            {showStatusOptions && <StatusOptions status={changeStatus} setChangeStatus={setChangeStatus} />}
        </div>

        <div className="flex space-x-3">
          <Pencil size={14} className="cursor-pointer" />
          <Trash size={14} color="red" className="cursor-pointer " />
        </div>
      </div>
    </div>
  );
}


const StatusOptions = ({status, setChangeStatus}: StatusOptionsProps) => {

    return (
        <div className="bg-white w-32 absolute left-0 top-full mt-1 border rounded-md p-2 shadow-md z-10"  id="status">
            {options.map((statusOption) => (
                <p onClick={()=> setChangeStatus(statusOption)} key={statusOption} className={`px-3 py-2 cursor-pointer ${statusColors[statusOption]} ${statusOption === status ? "font-semibold" : "" } `}>{statusOption}</p>
            ))}
        </div>
    )
}

export default TaskList