import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabase = createClient(
  "postgresql://postgres:[YOUR-PASSWORD]@db.taevzmilfbtdbyjlegwh.supabase.co:5432/postgres",
  "YOUR_PUBLIC_ANON_KEY"
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
