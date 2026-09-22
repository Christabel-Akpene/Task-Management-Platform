import { useState } from "react";
import Button from "./button";

export type TaskStatus = "pending" | "in-progress" | "completed";

interface FormData {
    taskname: string;
    status: TaskStatus;
}

interface ModalProps {
    onClose: () => void;
    onAdd: (taskname: string, status: TaskStatus) => void;
    onEdit: (taskId: string, taskname: string, status: TaskStatus) => void;
    initialData?: {
        id: string;
        taskname: string;
        status: TaskStatus;
    }
}

const formDetails: FormData = {
    taskname: "",
    status: "pending",
};

const Modal = ({onClose, onAdd, onEdit, initialData}: ModalProps) => {

    const [formData, setFormData] = useState(initialData || formDetails);
    const [error, setError] = useState("");

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))
        if (name === "taskname" && value.trim()) {
            setError("");
        }
    }

    const handleFormSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formData.taskname.trim()){
            setError("Task name is required");
            return;
        }
        setError("");
        if (initialData) {
            onEdit(initialData.id, formData.taskname, formData.status);
        } else{
            onAdd(formData.taskname, formData.status);
        }
        setFormData(formDetails);
    }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-100">
      <div className="p-4 bg-white max-w-md w-full m-4 rounded-md">
        <h2 className="font-bold text-2xl ">{initialData ? "Edit Task" : "Add Task"}</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="flex flex-col space-y-2 my-2">
            <label htmlFor="taskname" className="font-semibold">
              Task Name
            </label>
            <input
              type="text"
              placeholder="task name"
              id="taskname"
              name="taskname"
              value={formData.taskname}
              onChange={handleFormChange}
              className="border p-2 rounded-md"
            />
            {error && <p className="text-red-500">{error}</p>}
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="status" className="font-semibold">
              Status
            </label>
            <select
              name="status"
              id="status"
              className="border p-2 rounded-md"
              value={formData.status}
              onChange={handleFormChange}
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className="flex space-x-2 justify-end my-4">
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" className="bg-black text-white font-bold">
              {initialData ? "Update Task" : "Add Task"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal