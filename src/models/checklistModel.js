import { createClient } from '@supabase/supabase-js';

// *will need to modify so it doesnt use the public supabase key
// *using for testing for now
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

// Fetch all tasks for a user
export async function fetchTasksByUser(user_id) {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('user_id', user_id);

  if (error) throw error;
  return data;
}
// Create a new task
export async function createNewTask({ user_id, title, description, due_date }) {
  const { data, error } = await supabase
    .from('tasks')
    .insert([
      {
        user_id,
        title,
        description,
        due_date,
        completed: false,
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteTask(taskId) {
  const { error } = await supabase.from('tasks').delete().eq('id', taskId);
  if (error) throw error;
}