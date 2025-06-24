document.addEventListener('DOMContentLoaded', () => {
  const mobileMenuButton = document.querySelector('.mobile-menu-button');
  const navLinks = document.querySelector('.nav-links');

  mobileMenuButton.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuButton.setAttribute('aria-expanded', 
      mobileMenuButton.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
    );
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar') && navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      mobileMenuButton.setAttribute('aria-expanded', 'false');
    }
  });

  // Close mobile menu when clicking a link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      mobileMenuButton.setAttribute('aria-expanded', 'false');
    });
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
