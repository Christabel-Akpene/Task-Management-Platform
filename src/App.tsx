import { Plus } from 'lucide-react';
import Button from './components/button';
import './index.css'
import { useState } from 'react';
import Modal, { type TaskStatus } from './components/modal';
import TaskList from './components/tasklist';
import { tasks, type Task } from './data';

const task_states = [
  { id: 1, name: 'All' },
  { id: 2, name: 'Pending' },
  { id: 3, name: 'In Progress' },
  { id: 4, name: 'Completed' }
]

function App() {
  const [activeState, setActiveState] = useState("All");
  const [openModal, setOpenModal] = useState(false);
  const [initialTasks, setInitialTasks] = useState(tasks);
  const [editingTask, setEditingTask] = useState<Task | null>(null);


  const handleOpenModal = () => {
    setEditingTask(null);
    setOpenModal(true);
  }

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditingTask(null);
  }

  const handleAddTask = (tasktitle: string, description: string, status: TaskStatus) => {
    const newTask = {
      id: crypto.randomUUID(),
      tasktitle,
      description,
      date: new Date().toISOString().split('T')[0],
      status
    }
    setInitialTasks((prevTasks) => [...prevTasks, newTask]);
    handleCloseModal();
  }

  const handleDeleteTask = (taskId: string) => {
    const updatedTasks = initialTasks.filter((task) => {
      return task.id !== taskId;
    });
    setInitialTasks(updatedTasks);
  }

  const handleEditTask = (taskId: string, newTasktitle: string, newDescription: string, newStatus: TaskStatus, ) => {
    const updatedTasks = initialTasks.map((task) => {
      if (task.id === taskId){
        return {
          ...task,
          tasktitle: newTasktitle,
          description: newDescription,
          date: new Date().toISOString().split('T')[0],
          status: newStatus
        }
      }
      return task;
    })
    setInitialTasks(updatedTasks);
    handleCloseModal();
  }

  const handleOpenEditModal = (task: Task) => {
    setEditingTask(task);
    setOpenModal(true);
  }

  const totalTasks = initialTasks.length;
  const pendingTasks = initialTasks.filter((task) => task.status === "pending").length;
  const inProgressTasks = initialTasks.filter((task) => task.status === "in-progress").length;
  const completedTasks = initialTasks.filter((task) => task.status === "completed").length;

  const taskCounts = {
    "All": totalTasks,
    "Pending": pendingTasks,
    "In Progress": inProgressTasks,
    "Completed": completedTasks
  }

  const filteredTasks = initialTasks.filter((task) => {
    if (activeState === "All"){
      return true;
    }
    if (activeState === "Pending"){
      return task.status === "pending";
    }
    if (activeState === "In Progress"){
      return task.status === "in-progress";
    }
    if (activeState === "Completed"){
      return task.status === "completed";
    }
    return true;
  })

  const handleStatusChange = (taskId: string, newStatus: TaskStatus) => {
    const updatedTasks = initialTasks.map((task) => {
      if (task.id === taskId){
        return {
          ...task,
          status: newStatus
        }
      }
      return task;
    })
    setInitialTasks(updatedTasks);
  }

  return (
    <>
      <section className="min-h-screen p-4 md:p-8 max-w-2xl mx-auto">
        <header className="flex items-center justify-between">
          <h1 className="font-bold text-2xl">Task Manager</h1>
          <Button
            onClick={handleOpenModal}
            className="flex space-x-2 items-center bg-black text-white font-semibold"
          >
            <Plus size={14} /> <span>Add Task</span>
          </Button>
        </header>
        <div className="py-4 flex items-center space-x-2 justify-center">
          {task_states.map((state) => {
            return (
              <Button
                key={state.id}
                onClick={() => setActiveState(state.name)}
                className={
                  activeState === state.name ? "bg-black text-white" : ""
                }
              >
                {state.name} (
                {taskCounts[state.name as keyof typeof taskCounts]})
              </Button>
            );
          })}
        </div>

        <div className="flex flex-col space-y-2">
          {filteredTasks.map((task) => {
            return (
              <TaskList
                key={task.id}
                id={task.id}
                tasktitle={task.tasktitle}
                description={task.description}
                date={task.date}
                status={task.status}
                onDelete={handleDeleteTask}
                onEdit={() => handleOpenEditModal(task)}
                onStatusChange={handleStatusChange}
              />
            );
          })}
        </div>

        {openModal && (
          <Modal
            onClose={handleCloseModal}
            onAdd={handleAddTask}
            onEdit={handleEditTask}
            initialData={editingTask ?? undefined}
          />
        )}
      </section>
    </>
  );
}

export default App
