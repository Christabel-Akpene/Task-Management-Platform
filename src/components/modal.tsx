import { useState } from "react";
import Button from "./button";
import type { FormData, ModalProps } from "../types";

const formDetails: FormData = {
    tasktitle: "",
    description: "",
    date: "",
    status: "pending",
};

const Modal = ({onClose, onAdd, onEdit, initialData}: ModalProps) => {

    const [formData, setFormData] = useState(initialData || formDetails);
    const [errors, setErrors] = useState({
        tasktitle: "",
        description: "",
    });

    const handleFormChange = (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
      if (name === "tasktitle" && value.trim()) {
        setErrors({ tasktitle: "", description: errors.description });
      }
      if (name === "description" && value.trim()) {
        setErrors({ tasktitle: errors.tasktitle, description: "" });
      }
    };

    const handleFormSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const newErrors = {
            tasktitle: "",
            description: ""
        }

        if (!formData.tasktitle.trim()){
            newErrors.tasktitle = "Task name is required";
        }
        if (!formData.description.trim()){
            newErrors.description = "Description is required";
        }

        if (newErrors.tasktitle || newErrors.description){
            setErrors(newErrors);
            return;
        }
        
        setErrors({tasktitle: "", description: ""});

        if (initialData) {
            onEdit(initialData.id, formData.tasktitle, formData.description, formData.status)
        } 
        else{
            onAdd(formData.tasktitle, formData.description, formData.status);
        }
        setFormData(formDetails);
    }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-100">
      <div className="p-4 bg-white max-w-md w-full m-4 rounded-md">
        <h2 className="font-bold text-2xl ">
          {initialData ? "Edit Task" : "Add Task"}
        </h2>
        <form onSubmit={handleFormSubmit}>
          <div className="flex flex-col space-y-2 my-2">
            <label htmlFor="tasktitle" className="font-semibold">
              Task Name
            </label>
            <input
              type="text"
              placeholder="task name"
              id="tasktitle"
              name="tasktitle"
              value={formData.tasktitle}
              onChange={handleFormChange}
              className="border p-2 rounded-md"
            />
            {errors.tasktitle && (
              <p className="text-red-500">{errors.tasktitle}</p>
            )}
          </div>
          <div className="flex flex-col space-y-2 my-2">
            <label htmlFor="description" className="font-semibold">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              value={formData.description}
              onChange={handleFormChange}
              className="border p-2 rounded-md"
            ></textarea>
            {errors.description && (
              <p className="text-red-500">{errors.description}</p>
            )}
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
