import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = 'https://qvdgytlduhvarshngsuq.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2ZGd5dGxkdWh2YXJzaG5nc3VxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwNzQzMTYsImV4cCI6MjA2NTY1MDMxNn0.Cm_jXhiG_pBAHNklGbZtrIBnUw5oICiHO9fuPWEl7Vc';

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactmessages');
  const status = document.getElementById('status');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    const { data, error } = await supabase
      .from('ContactMessages')
      .insert([{ name, email, message }]);

    if (error) {
      console.error('Insert error:', error);
      status.textContent = '❌ Failed to send message';
      status.style.color = 'red';
    } else {
      console.log('Message sent:', data);
      status.textContent = '✅ Message sent successfully!';
      status.style.color = 'green';
      form.reset();
    }
  });
});