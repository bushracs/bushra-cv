// script.js
// Design of Web-Based Systems - Assignment 2
// Adds four interactive features to my CV page:
//   1. Welcome message when the page loads
//   2. Show/Hide buttons for Skills, Projects and Certifications
//   3. Dark mode / light mode button
//   4. Project details that are added to the page when a button is clicked


// ---------- project data ----------
// The details for each project are kept here and added to the page
// only when the user clicks "Show Details".
const projects = {
  kutrah: [
    'Pages: workshop booking, shop for finished pieces, community gallery, artist portfolio, journal and about',
    'Tools: Next.js, TypeScript and Tailwind CSS',
    'Design: warm and minimal, like a ceramic studio and art gallery'
  ],
  cv: [
    'Course: Design of Web-Based Systems',
    'Tools: HTML, CSS and JavaScript',
    'Hosting: GitHub Pages',
    'Features: show/hide sections, dark mode, welcome message and project details'
  ]
};


// ---------- 1. welcome message ----------

// Shows the welcome message at the top of the page.
function showWelcomeMessage() {
  const banner = document.getElementById('welcome-banner');
  const text = document.getElementById('welcome-text');

  // pick a greeting based on the time of day
  const hour = new Date().getHours();
  let greeting = 'Good evening!';

  if (hour < 12) {
    greeting = 'Good morning!';
  } else if (hour < 18) {
    greeting = 'Good afternoon!';
  }

  text.textContent = greeting + ' Welcome to my portfolio page!';
  banner.classList.remove('hidden');
}

// Hides the welcome message when the Close button is clicked.
function closeWelcomeMessage() {
  document.getElementById('welcome-banner').classList.add('hidden');
}


// ---------- 2. show/hide sections ----------

// Shows or hides the section that belongs to the clicked button.
// Each button has data-target (the id of the content to hide)
// and data-name (the word used in the button text).
function toggleSection(event) {
  const button = event.target;
  const content = document.getElementById(button.dataset.target);
  const name = button.dataset.name;

  content.classList.toggle('hidden');

  // change the button text to match
  if (content.classList.contains('hidden')) {
    button.textContent = 'Show ' + name;
  } else {
    button.textContent = 'Hide ' + name;
  }
}


// ---------- 3. dark mode / light mode ----------

// Switches the page between dark mode and light mode.
function toggleTheme() {
  const button = document.getElementById('theme-btn');

  document.body.classList.toggle('dark-mode');

  if (document.body.classList.contains('dark-mode')) {
    button.textContent = 'Light Mode';
  } else {
    button.textContent = 'Dark Mode';
  }
}


// ---------- 4. interactive project section ----------

// Adds the details of a project to the page, or removes them
// if they are already showing. The page does not reload.
function toggleProjectDetails(event) {
  const button = event.target;
  const projectName = button.dataset.project;
  const box = document.getElementById(projectName + '-details');

  // if the details are already there, remove them
  if (box.innerHTML !== '') {
    box.innerHTML = '';
    button.textContent = 'Show Details';
    return;
  }

  // build a list with one item for each detail
  const list = document.createElement('ul');
  const details = projects[projectName];

  for (let i = 0; i < details.length; i++) {
    const item = document.createElement('li');
    item.textContent = details[i];
    list.appendChild(item);
  }

  box.appendChild(list);
  button.textContent = 'Hide Details';
}


// ---------- event listeners ----------

// Runs when the page has finished loading.
document.addEventListener('DOMContentLoaded', function () {
  showWelcomeMessage();

  document.getElementById('welcome-close').addEventListener('click', closeWelcomeMessage);
  document.getElementById('theme-btn').addEventListener('click', toggleTheme);

  // every Show/Hide button
  const toggleButtons = document.querySelectorAll('.toggle-btn');
  for (let i = 0; i < toggleButtons.length; i++) {
    toggleButtons[i].addEventListener('click', toggleSection);
  }

  // every Show Details button
  const detailsButtons = document.querySelectorAll('.details-btn');
  for (let i = 0; i < detailsButtons.length; i++) {
    detailsButtons[i].addEventListener('click', toggleProjectDetails);
  }
});
