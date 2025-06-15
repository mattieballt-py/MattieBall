document.addEventListener('DOMContentLoaded', () => {
  // Handle category filtering
  const categoryLinks = document.querySelectorAll('.category-list a');
  categoryLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const category = e.target.getAttribute('href').substring(1);
      
      // Update active state
      categoryLinks.forEach(l => l.classList.remove('active'));
      e.target.classList.add('active');
      
      // Here you would typically filter posts based on category
      // For now, we'll just scroll to the top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // Handle post navigation
  const postLinks = document.querySelectorAll('.post-list a');
  postLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const postId = e.currentTarget.getAttribute('href').substring(1);
      
      // Here you would typically load the post content
      // For now, we'll just scroll to the top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // Add smooth scrolling for all internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
}); 