// script.js
// Design of Web-Based Systems - Assignments 2 and 3
// Interactive features of my portfolio page:
//   1. Welcome message when the page loads
//   2. Show/Hide buttons for Skills, Projects and Certifications
//   3. Dark mode / light mode button
//   4. Project details that are added to the page when a button is clicked
//   5. Navigation menu (mobile Menu button + highlighting the current section)
// The API features (GitHub repositories and quotes) are in api.js.


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
    'Features: dark mode, show/hide sections, welcome message, project details and live data from the GitHub and quotes APIs'
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


// ---------- 5. navigation menu ----------

// Opens or closes the menu on small screens.
function toggleMenu() {
  const menuButton = document.getElementById('menu-btn');
  const links = document.getElementById('nav-links');

  links.classList.toggle('open');

  if (links.classList.contains('open')) {
    menuButton.textContent = 'Close';
    menuButton.setAttribute('aria-expanded', 'true');
  } else {
    menuButton.textContent = 'Menu';
    menuButton.setAttribute('aria-expanded', 'false');
  }
}

// Closes the menu after a link is clicked (only matters on small screens).
function closeMenu() {
  const links = document.getElementById('nav-links');

  if (links.classList.contains('open')) {
    toggleMenu();
  }
}

// Highlights the menu link of the section that is on the screen.
function highlightCurrentSection() {
  const navLinks = document.querySelectorAll('.nav-link');
  let currentId = 'home';

  // the last section whose top has passed the menu is the current one
  for (let i = 0; i < navLinks.length; i++) {
    const id = navLinks[i].getAttribute('href').substring(1);
    const section = document.getElementById(id);

    if (section.getBoundingClientRect().top <= 120) {
      currentId = id;
    }
  }

  // at the very bottom of the page, the last link (Contact) should be active
  if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 5) {
    currentId = 'contact';
  }

  for (let i = 0; i < navLinks.length; i++) {
    if (navLinks[i].getAttribute('href') === '#' + currentId) {
      navLinks[i].classList.add('active');
    } else {
      navLinks[i].classList.remove('active');
    }
  }
}


// ---------- event listeners ----------

// Runs when the page has finished loading.
document.addEventListener('DOMContentLoaded', function () {
  showWelcomeMessage();
  highlightCurrentSection();

  document.getElementById('welcome-close').addEventListener('click', closeWelcomeMessage);
  document.getElementById('theme-btn').addEventListener('click', toggleTheme);
  document.getElementById('menu-btn').addEventListener('click', toggleMenu);
  window.addEventListener('scroll', highlightCurrentSection);

  // every menu link
  const navLinks = document.querySelectorAll('.nav-link');
  for (let i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener('click', closeMenu);
  }

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
