import { Plus } from 'lucide-react';
import Button from './components/button';
import './index.css'
import { useState } from 'react';
import Modal from './components/modal';
import TaskList from './components/tasklist';
import { tasks } from './data';

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

  const handleOpenModal = () => {
    setOpenModal(true);
  }

  const handleCloseModal = () => {
    setOpenModal(false);
  }


  return (
    <>
      <section className="min-h-screen p-4 md:p-8">
        <header className="flex items-center justify-between">
          <h1 className='font-bold text-2xl'>Task Manager</h1>
          <Button onClick={handleOpenModal} className="flex space-x-2 items-center bg-black text-white font-semibold">
            <Plus  size={14}/> <span>Add Task</span>
          </Button>
        </header>
        <div className='py-4 flex items-center space-x-2 justify-center md:justify-end'>
          {task_states.map((state) => {
            return(
              <Button key={state.id} onClick={() => setActiveState(state.name)} className={activeState === state.name ? 'bg-black text-white': ""}>
                {state.name}
              </Button>
            )
          })}
        </div>

        <div className='flex flex-col space-y-2'>
          {
            initialTasks.map((task) => {
              return <TaskList key={task.id} taskname={task.taskname} status={task.status}/>;
            })
          }

        </div>

        {
          openModal && <Modal onClose={handleCloseModal} />
        }

      </section>
    </>
  );
}

export default App
