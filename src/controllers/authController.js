'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signInUser, signUpUser } from '../models/authModel';

export async function handleLogin(formData) {
  const email = formData.get('email');
  const password = formData.get('password');

  const { error } = await signInUser({ email, password });
  if (error) redirect('/error');

  revalidatePath('/', 'layout');
  redirect('/');
}

export async function handleSignup(formData) {
  const email = formData.get('email');
  const password = formData.get('password');

  const { error } = await signUpUser({ email, password });
  if (error) redirect('/error');

  revalidatePath('/', 'layout');
  redirect('/account');
}