import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

  const SUPABASE_URL = 'https://taevzmilfbtdbyjlegwh.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRhZXZ6bWlsZmJ0ZGJ5amxlZ3doIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3MjMwMDIsImV4cCI6MjA2NTI5OTAwMn0.LUEnzlKZIW-B1Ih09ypovqA3C1gKnCONCHjk8n8Dmj4';

  const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  const form = document.getElementById('contact-form');
  const responseMsg = document.getElementById('response-msg');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    const { data, error } = await supabase.from('contact_submissions').insert([
      { name, email, message }
    ]);

    if (error) {
      responseMsg.textContent = 'Something went wrong. Try again.';
      console.error(error);
    } else {
      responseMsg.textContent = 'Thanks for your message!';
      form.reset();
    }
  });
