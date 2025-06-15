import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabase = createClient(
  'https://taevzmilfbtdbyjlegwh.supabase.co',
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRhZXZ6bWlsZmJ0ZGJ5amxlZ3doIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3MjMwMDIsImV4cCI6MjA2NTI5OTAwMn0.LUEnzlKZIW-B1Ih09ypovqA3C1gKnCONCHjk8n8Dmj4"
);

document.getElementById("contact-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;
  const name = form.name.value;
  const email = form.email.value;
  const message = form.message.value;

  const { error } = await supabase.from("contacts").insert([{ name, email, message }]);

  const status = document.getElementById("status");
  if (error) {
    console.error(error);
    status.textContent = "Something went wrong.";
  } else {
    status.textContent = "Thanks! We'll be in touch.";
    form.reset();
  }
});
