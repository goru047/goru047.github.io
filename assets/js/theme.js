// Theme Toggle Functionality
(function() {
  'use strict';
  
  const themeToggle = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;
  
  // Get saved theme or default
  function getSavedTheme() {
    const saved = localStorage.getItem('theme');
    if (saved) {
      return saved;
    }
    
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    return 'light';
  }
  
  // Set theme
  function setTheme(theme) {
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }
  
  // Initialize theme
  const currentTheme = getSavedTheme();
  setTheme(currentTheme);
  
  // Toggle theme
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      const currentTheme = htmlElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    });
  }
  
  // Listen for system theme changes
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
      const newTheme = e.matches ? 'dark' : 'light';
      setTheme(newTheme);
    });
  }
})();