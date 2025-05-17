'use client';
import { useState, useEffect } from 'react';
import { createClient } from '../utils/supabase/client';
const supabase = createClient();

export function useChecklistLogic() {
  const [checklists, setChecklists] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get the current user session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUser(session.user);
        fetchChecklists(session.user.id);
      }
    });

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user);
        fetchChecklists(session.user.id);
      } else {
        setUser(null);
        setChecklists([]);
      }
    });

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  const fetchChecklists = async (userId) => {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', userId) 
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching checklists:', error);
      return;
    }

    if (data) {
      setChecklists(data.map(item => ({
        id: item.id,
        tasks: item.tasks || [],
        title: item.title || `Checklist ${item.id}`
      })));
    }
  };

  const updateChecklistInDB = async (checklistId, updatedTasks) => {
    if (!user) return;

    const { error } = await supabase
      .from('tasks')
      .update({ tasks: updatedTasks })
      .eq('task_id', checklistId)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error updating checklist:', error);
    }
  };

  const addChecklist = async () => {
    if (!user) return;

    const newChecklist = {
      user_id: user.id,
      title: `Checklist ${checklists.length + 1}`,
      description: "",
      completed: false,
      created_at: new Date().toISOString(),
      due_date: new Date().toISOString(), // need to update this but for testing purposes keep
    };

    const { data, error } = await supabase
      .from('tasks')
      .insert([newChecklist])
      .select();

  if (error) {
    console.error('Full error:', error);
    alert(`Insert failed: ${error.details || error.message}`);
  }

    if (data && data[0]) {
      setChecklists([...checklists, {
        id: data[0].id,
        tasks: [],
        title: data[0].title
      }]);
    }
  };

  const removeChecklist = async (checklistId) => {
    if (!user) return;

    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('task_', checklistId)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error removing checklist:', error);
      return;
    }

    setChecklists(checklists.filter(c => c.id !== checklistId));
  };

  const addTask = async (checklistId) => {
    if (!user) return;

    const checklist = checklists.find(c => c.id === checklistId);
    if (!checklist) return;

    const newTask = {
      id: Date.now(),
      text: 'New Task',
      completed: false
    };

    const updatedTasks = [...checklist.tasks, newTask];
    
    await updateChecklistInDB(checklistId, updatedTasks);
    setChecklists(checklists.map(c => 
      c.id === checklistId ? { ...c, tasks: updatedTasks } : c
    ));
  };

  const toggleTask = async (checklistId, taskId) => {
    if (!user) return;

    const checklist = checklists.find(c => c.id === checklistId);
    if (!checklist) return;

    const updatedTasks = checklist.tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );

    await updateChecklistInDB(checklistId, updatedTasks);
    setChecklists(checklists.map(c => 
      c.id === checklistId ? { ...c, tasks: updatedTasks } : c
    ));
  };

  const removeTask = async (checklistId, taskId) => {
    if (!user) return;

    const checklist = checklists.find(c => c.id === checklistId);
    if (!checklist) return;

    const updatedTasks = checklist.tasks.filter(task => task.id !== taskId);
    
    await updateChecklistInDB(checklistId, updatedTasks);
    setChecklists(checklists.map(c => 
      c.id === checklistId ? { ...c, tasks: updatedTasks } : c
    ));
  };

  return {
    checklists,
    addChecklist,
    removeChecklist,
    addTask,
    toggleTask,
    removeTask,
    user
  };
}