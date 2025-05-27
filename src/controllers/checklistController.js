import { v4 as uuidv4 } from 'uuid'; // If you need to generate UUIDs for user_id or similar
import { deleteTask } from '../models/checklistModel';
export const addTaskToChecklist = (checklists, setChecklists, cid, user_id) => {
  const title = prompt('Enter the task title:');
  if (!title) return;

  const description = prompt('Enter a description (optional):') || 'EMPTY';
  const due_date = new Date().toISOString(); // Or prompt for due date
  const created_at = new Date().toISOString();

  const newTask = {
    id: Date.now(), // Or use a better unique id generator
    user_id: user_id || uuidv4(),
    title,
    description,
    due_date,
    completed: false,
    created_at,
    completed_at: null,
  };

  const updated = checklists.map((c) =>
    c.id === cid ? { ...c, tasks: [...c.tasks, newTask] } : c
  );

  setChecklists(updated);
};

export const toggleTaskInChecklist = (checklists, setChecklists, cid, tid) => {
  const updated = checklists.map((c) =>
    c.id === cid
      ? {
          ...c,
          tasks: c.tasks.map((t) =>
            t.id === tid
              ? {
                  ...t,
                  completed: !t.completed,
                  completed_at: !t.completed ? new Date().toISOString() : null,
                }
              : t
          ),
        }
      : c
  );

  setChecklists(updated);
};

export async function removeTaskFromChecklist(checklists, setChecklists, checklistId, taskId) {
  if (!taskId) {
    alert('Task ID is undefined. Cannot remove this task.');
    return;
  }
  try {
    await deleteTask(taskId);
    setChecklists(
      checklists.map(cl =>
        cl.id === checklistId
          ? { ...cl, tasks: cl.tasks.filter(task => task.id !== taskId) }
          : cl
      )
    );
  } catch (error) {
    console.error('Failed to delete task:', error);
    alert('Failed to delete task: ' + (error.message || JSON.stringify(error)));
  }
}