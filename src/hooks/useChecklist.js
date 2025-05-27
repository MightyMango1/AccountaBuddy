'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import {
  addTaskToChecklist,
  toggleTaskInChecklist,
  removeTaskFromChecklist,
  //addChecklistToState,
  //removeChecklistFromState
} from '../controllers/checklistController';

// *will need to modify so it doesnt use the public supabase key
// *using for testing for now
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const useChecklist = () => {
  const [checklists, setChecklists] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const { data, error } = await supabase.from('tasks').select('*');
      if (error) {
        console.error('Failed to fetch tasks:', error);
      } else {
        const tasks = (data || []).map(t => ({
          id: t.id,
          title: t.title,
          completed: !!t.completed,
        }));
        setChecklists([{ id: 1, tasks }]);
      }
    };
    fetchTasks();
  }, []);

  return {
    checklists,
    addChecklist: () => addChecklistToState(checklists, setChecklists),
    removeChecklist: (id) => removeChecklistFromState(checklists, setChecklists, id),
    addTask: (cid) => addTaskToChecklist(checklists, setChecklists, cid),
    toggleTask: (cid, tid) => toggleTaskInChecklist(checklists, setChecklists, cid, tid),
    removeTask: async (cid, tid) => await removeTaskFromChecklist(checklists, setChecklists, cid, tid),
  };
};
