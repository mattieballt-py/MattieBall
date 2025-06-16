import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = 'https://qvdgytlduhvarshngsuq.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2ZGd5dGxkdWh2YXJzaG5nc3VxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwNzQzMTYsImV4cCI6MjA2NTY1MDMxNn0.Cm_jXhiG_pBAHNklGbZtrIBnUw5oICiHO9fuPWEl7Vc';

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactmessages');
  const status = document.getElementById('status');

  if (!form) {
    console.error('Contact form not found');
    return;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(form);
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();
    const message = formData.get('message').trim();

    // Validate inputs
    if (!name || !email || !message) {
      status.textContent = 'Please fill in all fields';
      status.style.color = 'red';
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      status.textContent = 'Please enter a valid email address';
      status.style.color = 'red';
      return;
    }

    try {
      // Show loading state
      status.textContent = 'Sending message...';
      status.style.color = 'inherit';

      // Insert data into Supabase
      const { data, error } = await supabase
        .from('ContactMessages')
        .insert([
          {
            name,
            email,
            message,
            created_at: new Date().toISOString()
          }
        ])
        .select();

        if (error) {
          console.error('Supabase error:', error);
          status.textContent = `Error: ${error.message}`;
          status.style.color = 'red';
          return;
        }
        

      // Success
      status.textContent = 'Message sent successfully!';
      status.style.color = 'green';
      form.reset();

    } catch (error) {
      console.error('Error submitting form:', error);
      status.textContent = 'Failed to send message. Please try again.';
      status.style.color = 'red';
    }
  });
});
