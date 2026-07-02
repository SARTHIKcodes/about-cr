// Theme Toggle Script
const html = document.documentElement;

// Set theme
function setTheme(theme, savePreference = true) {
     if (theme === 'dark') {
          html.setAttribute('data-theme', 'dark');
     } else {
          html.setAttribute('data-theme', 'light');
     }

     if (savePreference) {
          localStorage.setItem('theme', theme);
     }

     const themeToggle = document.getElementById('themeToggle');
     if (themeToggle) {
          themeToggle.setAttribute(
               'aria-label',
               theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
          );
     }
}

// Check for saved theme preference or default to system preference
function initializeTheme() {
     const savedTheme = localStorage.getItem('theme');
     
     if (savedTheme === 'dark') {
          setTheme('dark');
     } else if (savedTheme === 'light') {
          setTheme('light');
     } else {
          // Check system preference
          if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
               setTheme('dark', false);
          } else {
               setTheme('light', false);
          }
     }
}

// Toggle theme on button click
document.addEventListener('DOMContentLoaded', () => {
     const themeToggle = document.getElementById('themeToggle');
     if (themeToggle) {
          themeToggle.addEventListener('click', () => {
               const currentTheme = html.getAttribute('data-theme');
               setTheme(currentTheme === 'dark' ? 'light' : 'dark');
          });
     }
});

// Listen for system theme changes
if (window.matchMedia) {
     window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
          // Only update if user hasn't manually set a preference
          if (!localStorage.getItem('theme')) {
               setTheme(e.matches ? 'dark' : 'light', false);
          }
     });
}

// Initialize theme immediately
initializeTheme();
