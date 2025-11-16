// Mobile Menu Toggle - Fixed to check actual visibility
(function() {
  console.log('🍔 Menu script initializing...');
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
  function init() {
    console.log('🚀 Initializing menu...');
    
    const hamburger = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.site-nav');
    const overlay = document.querySelector('.mobile-menu-overlay');
    
    console.log('Hamburger:', hamburger);
    console.log('Nav:', nav);
    console.log('Overlay:', overlay);
    
    if (!hamburger || !nav) {
      console.error('❌ Required elements not found!');
      return;
    }
    
    console.log('✅ All elements found!');
    
    // Toggle menu function
    function toggleMenu() {
      console.log('🔘 Toggle menu called');
      
      // Check ACTUAL computed display value, not just class
      const computedStyle = window.getComputedStyle(nav);
      const isCurrentlyVisible = computedStyle.display !== 'none';
      
      console.log('Current state - Visible:', isCurrentlyVisible);
      console.log('Current display:', computedStyle.display);
      
      if (isCurrentlyVisible) {
        // Close menu
        hamburger.classList.remove('active');
        nav.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
        document.body.classList.remove('menu-open');
        hamburger.setAttribute('aria-expanded', 'false');
        console.log('📴 Menu closed');
      } else {
        // Open menu
        hamburger.classList.add('active');
        nav.classList.add('active');
        if (overlay) overlay.classList.add('active');
        document.body.classList.add('menu-open');
        hamburger.setAttribute('aria-expanded', 'true');
        console.log('📱 Menu opened');
      }
      
      // Force a reflow to ensure styles apply
      void nav.offsetHeight;
      
      const newStyle = window.getComputedStyle(nav);
      console.log('New state - Visible:', newStyle.display !== 'none');
      console.log('New display:', newStyle.display);
    }
    
    // Click hamburger
    hamburger.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      console.log('🔘 Hamburger clicked!');
      toggleMenu();
    });
    
    // Click overlay to close
    if (overlay) {
      overlay.addEventListener('click', function() {
        console.log('🔘 Overlay clicked');
        if (window.getComputedStyle(nav).display !== 'none') {
          toggleMenu();
        }
      });
    }
    
    // Click nav link to close
    const navLinks = nav.querySelectorAll('.nav-link');
    navLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        console.log('🔘 Nav link clicked');
        if (window.getComputedStyle(nav).display !== 'none') {
          toggleMenu();
        }
      });
    });
    
    // Click outside to close
    document.addEventListener('click', function(e) {
      const isVisible = window.getComputedStyle(nav).display !== 'none';
      
      if (isVisible && 
          !e.target.closest('.site-header') &&
          !e.target.closest('.site-nav')) {
        console.log('🔘 Clicked outside, closing menu');
        toggleMenu();
      }
    });
    
    console.log('✅ Menu initialized successfully!');
  }
})();