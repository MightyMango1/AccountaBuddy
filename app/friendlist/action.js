import { useState } from 'react';

export const useFriendlistLogic = () => {
  const [checklists, setChecklists] = useState([
    {
      id: 1,
      tasks: [
        { id: 1, text: 'Task 1', completed: false },
        { id: 2, text: 'Task 2', completed: false },
        { id: 3, text: 'Task 3', completed: false },
      ],
    },
  ]);

  const addChecklist = () => {
    const newChecklist = { id: checklists.length + 1, tasks: [] };
    setChecklists((prev) => [...prev, newChecklist]);
  };

  const removeChecklist = (id) => {
    console.log(`Cleaning up resources for checklist ${id}`);
    setChecklists((prev) => prev.filter((c) => c.id !== id));
  };

  const addTask = (cid) => {
    const name = prompt('Enter the task name:');
    if (!name) return;
    setChecklists((prev) =>
      prev.map((c) =>
        c.id === cid
          ? { ...c, tasks: [...c.tasks, { id: c.tasks.length + 1, text: name, completed: false }] }
          : c
      )
    );
  };

  const toggleTask = (cid, tid) => {
    setChecklists((prev) =>
      prev.map((c) =>
        c.id === cid
          ? {
              ...c,
              tasks: c.tasks.map((t) => (t.id === tid ? { ...t, completed: !t.completed } : t)),
            }
          : c
      )
    );
  };

  const removeTask = (cid, tid) => {
    setChecklists((prev) =>
      prev.map((c) =>
        c.id === cid ? { ...c, tasks: c.tasks.filter((t) => t.id !== tid) } : c
      )
    );
  };

  return {
    checklists,
    addChecklist,
    removeChecklist,
    addTask,
    toggleTask,
    removeTask,
  };
};