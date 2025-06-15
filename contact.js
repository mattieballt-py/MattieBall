import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// Initialize Supabase client
const supabase = createClient(
  'https://taevzmilfbtdbyjlegwh.supabase.co',
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRhZXZ6bWlsZmJ0ZGJ5amxlZ3doIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3MjMwMDIsImV4cCI6MjA2NTI5OTAwMn0.LUEnzlKZIW-B1Ih09ypovqA3C1gKnCONCHjk8n8Dmj4"
);

// Form submission handler
document.getElementById("contact-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;
  const submitButton = form.querySelector('button[type="submit"]');
  const status = document.getElementById("status");

  // Disable form while submitting
  submitButton.disabled = true;
  status.textContent = "Sending...";

  try {
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    // Basic validation
    if (!name || !email || !message) {
      throw new Error("Please fill in all fields");
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Please enter a valid email address");
    }

    const { data, error } = await supabase
      .from("contacts")
      .insert([{ name, email, message }])
      .select();

    if (error) throw error;

    // Success
    status.textContent = "Thanks! We'll be in touch.";
    status.style.color = "#4CAF50";
    form.reset();
  } catch (error) {
    console.error("Error:", error);
    status.textContent = error.message || "Something went wrong. Please try again.";
    status.style.color = "#f44336";
  } finally {
    // Re-enable form
    submitButton.disabled = false;
  }
});
