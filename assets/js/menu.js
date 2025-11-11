// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.querySelector('.nav-menu');
  
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function(e) {
      e.stopPropagation();
      
      // Toggle menu
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.main-nav')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
    
    // Close menu when clicking a link
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }
});