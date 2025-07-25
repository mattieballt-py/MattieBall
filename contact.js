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
      .insert([
        {
          name,
          email,
          message,
        }
      ])
      .select();

    if (error) {
      console.error('Insert error:', error);
      status.textContent = 'Failed to send message';
      status.style.color = 'red';
    } else {
      console.log('Message sent:', data);
      status.textContent = 'Message sent!';
      status.style.color = 'green';
      form.reset();
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const subscribeForm = document.getElementById('subscribe-form');

  if (subscribeForm) {
    subscribeForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('email-input');
      const message = document.getElementById('subscribe-message');
      const email = emailInput.value;

      const { data, error } = await supabase
        .from('blog_subscribers')
        .insert([{ email }]);

      if (error) {
        message.textContent = 'Oops! Something went wrong.';
        message.style.color = 'red';
        console.error(error);
      } else {
        message.textContent = 'Thanks for subscribing!';
        message.style.color = 'green';
        emailInput.value = '';
      }
    });
  }
});
