// api.js
// Design of Web-Based Systems - Assignment 3
// Gets live data from two free public APIs (no API key needed):
//   1. GitHub API  - my public repositories, shown in the Projects section
//   2. Quotes API  - a random quote, shown on the home section
// Both use fetch with async/await, show a loading message while waiting,
// and show an error message if the request fails.


// ---------- API addresses ----------

const GITHUB_USER = 'bushracs';
const REPOS_URL = 'https://api.github.com/users/' + GITHUB_USER + '/repos?sort=updated&per_page=20';
const QUOTE_URL = 'https://dummyjson.com/quotes/random';


// ---------- 1. GitHub repositories ----------

// Gets my public repositories from GitHub and shows them as cards.
async function loadRepos() {
  const status = document.getElementById('repo-status');
  const list = document.getElementById('repo-list');

  // loading state
  status.className = 'status-msg';
  status.textContent = 'Loading repositories...';
  list.innerHTML = '';

  try {
    const response = await fetch(REPOS_URL);

    // fetch does not fail on errors like 404 or 403, so check it here
    if (!response.ok) {
      throw new Error('GitHub API returned status ' + response.status);
    }

    const repos = await response.json();

    // keep only my own repositories (not copies of other people's)
    const myRepos = [];
    for (let i = 0; i < repos.length; i++) {
      if (!repos[i].fork) {
        myRepos.push(repos[i]);
      }
    }

    if (myRepos.length === 0) {
      status.textContent = 'No public repositories yet.';
      return;
    }

    // add one card for each repository
    for (let i = 0; i < myRepos.length; i++) {
      list.appendChild(createRepoCard(myRepos[i]));
    }

    status.textContent = 'Showing ' + myRepos.length + ' repositories from github.com/' + GITHUB_USER + '.';
  } catch (error) {
    console.error('Could not load repositories:', error);
    showError(status, 'Sorry, the repositories could not be loaded right now.', loadRepos);
  }
}

// Builds the card for one repository.
function createRepoCard(repo) {
  const card = document.createElement('div');
  card.className = 'repo-card';

  // name (links to the repository on GitHub)
  const title = document.createElement('h4');
  const link = document.createElement('a');
  link.href = repo.html_url;
  link.target = '_blank';
  link.rel = 'noopener';
  link.textContent = repo.name;
  title.appendChild(link);

  // description (some repositories do not have one)
  const description = document.createElement('p');
  description.className = 'repo-desc';
  description.textContent = repo.description || 'No description yet.';

  // language, stars and last update
  const meta = document.createElement('div');
  meta.className = 'repo-meta';

  if (repo.language) {
    const language = document.createElement('span');
    const dot = document.createElement('span');
    dot.className = 'lang-dot';
    language.appendChild(dot);
    language.appendChild(document.createTextNode(repo.language));
    meta.appendChild(language);
  }

  const stars = document.createElement('span');
  stars.textContent = '★ ' + repo.stargazers_count;
  meta.appendChild(stars);

  const updated = document.createElement('span');
  updated.textContent = 'Updated ' + formatDate(repo.updated_at);
  meta.appendChild(updated);

  card.appendChild(title);
  card.appendChild(description);
  card.appendChild(meta);
  return card;
}

// Turns a date like "2026-10-05T14:20:00Z" into "5 Oct 2026".
function formatDate(dateText) {
  const date = new Date(dateText);
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}


// ---------- 2. random quote ----------

// Gets a random quote and shows it on the home section.
async function loadQuote() {
  const quoteText = document.getElementById('quote-text');
  const quoteAuthor = document.getElementById('quote-author');
  const button = document.getElementById('quote-btn');

  // loading state (the button is disabled until the quote arrives)
  quoteText.textContent = 'Loading quote...';
  quoteAuthor.textContent = '';
  button.disabled = true;

  try {
    const response = await fetch(QUOTE_URL);

    if (!response.ok) {
      throw new Error('Quotes API returned status ' + response.status);
    }

    const data = await response.json();
    quoteText.textContent = '"' + data.quote + '"';
    quoteAuthor.textContent = '- ' + data.author;
  } catch (error) {
    console.error('Could not load a quote:', error);
    quoteText.textContent = 'Sorry, a quote could not be loaded right now. Please try again.';
  } finally {
    button.disabled = false;
  }
}


// ---------- shared error message ----------

// Shows an error message with a "Try again" button that runs the request again.
function showError(element, message, retryFunction) {
  element.className = 'error-msg';
  element.textContent = message;

  const retryButton = document.createElement('button');
  retryButton.type = 'button';
  retryButton.textContent = 'Try again';
  retryButton.addEventListener('click', retryFunction);
  element.appendChild(retryButton);
}


// ---------- start ----------

document.addEventListener('DOMContentLoaded', function () {
  loadQuote();
  loadRepos();

  document.getElementById('quote-btn').addEventListener('click', loadQuote);
});
