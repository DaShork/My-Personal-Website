const GITHUB_API_BASE = 'https://api.github.com';

/**
 * Fetch all repositories from a GitHub user
 * @param {string} username - GitHub username
 * @returns {Promise<Array>} Array of repositories
 */
async function fetchUserRepos(username) {
  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/users/${username}/repos?per_page=100&sort=updated&type=owner`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching user repos:', error);
    throw error;
  }
}

/**
 * Fetch organizations for a GitHub user
 * @param {string} username - GitHub username
 * @returns {Promise<Array>} Array of organizations
 */
async function fetchUserOrganizations(username) {
  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/users/${username}/orgs?per_page=100`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching organizations:', error);
    throw error;
  }
}

/**
 * Fetch repositories from a GitHub organization
 * @param {string} orgName - Organization name
 * @returns {Promise<Array>} Array of repositories
 */
async function fetchOrgRepos(orgName) {
  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/orgs/${orgName}/repos?per_page=100&sort=updated`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching repos from org ${orgName}:`, error);
    return [];
  }
}

/**
 * Get all repositories from user + organizations
 * @param {string} username - GitHub username
 * @returns {Promise<Array>} Combined and deduplicated repository list
 */
export async function getAllRepos(username) {
  try {
    // Fetch user repos
    const userRepos = await fetchUserRepos(username);

    // Fetch organizations
    const orgs = await fetchUserOrganizations(username);

    // Fetch repos from each organization
    const orgReposPromises = orgs.map(org => fetchOrgRepos(org.login));
    const orgReposArrays = await Promise.all(orgReposPromises);

    // Combine all repos
    const allRepos = [
      ...userRepos,
      ...orgReposArrays.flat(),
    ];

    // Deduplicate by repo id
    const seenIds = new Set();
    const uniqueRepos = allRepos.filter(repo => {
      if (seenIds.has(repo.id)) {
        return false;
      }
      seenIds.add(repo.id);
      return true;
    });

    // Sort by updated_at (descending)
    uniqueRepos.sort((a, b) => {
      const dateA = new Date(a.updated_at).getTime();
      const dateB = new Date(b.updated_at).getTime();
      return dateB - dateA;
    });

    // Filter out forked repos (optional - keep only original/owned repos)
    // Uncomment if needed:
    // const originalRepos = uniqueRepos.filter(repo => !repo.fork);

    return uniqueRepos;
  } catch (error) {
    console.error('Error fetching all repos:', error);
    throw error;
  }
}

/**
 * Format repository data for display
 * @param {Object} repo - Repository object from GitHub API
 * @returns {Object} Formatted repository data
 */
export function formatRepoData(repo) {
  return {
    id: repo.id,
    name: repo.name,
    description: repo.description || 'No description available',
    language: repo.language || 'No language',
    stars: repo.stargazers_count || 0,
    url: repo.html_url,
    updatedAt: repo.updated_at,
    isFork: repo.fork,
    owner: repo.owner?.login || 'Unknown',
  };
}

/**
 * Format stars count for display (e.g., 1000 -> 1K)
 * @param {number} count - Number of stars
 * @returns {string} Formatted string
 */
export function formatStars(count) {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`.replace(/\.0k$/, 'k');
  }
  return count.toString();
}

/**
 * Get color for programming language badge
 * @param {string} language - Programming language name
 * @returns {string} Color hex code
 */
export function getLanguageColor(language) {
  const colors = {
    'JavaScript': '#f1e05a',
    'TypeScript': '#3178c6',
    'Python': '#3572A5',
    'Java': '#b07219',
    'C++': '#f34b7d',
    'C#': '#239120',
    'PHP': '#777bb4',
    'Ruby': '#cc342d',
    'Go': '#00ADD8',
    'Rust': '#ce422b',
    'CSS': '#563d7c',
    'HTML': '#e34c26',
    'Shell': '#89e051',
    'Java': '#b07219',
    'Vue': '#2c3e50',
    'React': '#61dafb',
  };

  return colors[language] || '#858585';
}

/**
 * Format date to relative time (e.g., "2 days ago")
 * @param {string} dateString - ISO date string
 * @returns {string} Relative time format
 */
export function formatRelativeDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 0) {
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  }
  if (diffHours > 0) {
    return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  }
  if (diffMins > 0) {
    return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
  }
  return 'just now';
}
