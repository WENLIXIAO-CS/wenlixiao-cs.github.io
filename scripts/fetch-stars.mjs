import { writeFileSync } from 'fs';

const repos = [
  'NVlabs/HOVER',
  'LeCAR-Lab/anycar',
  'LeCAR-Lab/SoFTA',
  'LeCAR-Lab/ASAP',
  'LeCAR-Lab/wococo',
  'LeCAR-Lab/human2humanoid',
  'LeCAR-Lab/SafeDPA',
  'LeCAR-Lab/ABS',
];

async function fetchStars() {
  const stars = {};

  for (const repo of repos) {
    try {
      const res = await fetch(`https://api.github.com/repos/${repo}`, {
        headers: process.env.GITHUB_TOKEN
          ? { Authorization: `token ${process.env.GITHUB_TOKEN}` }
          : {},
      });
      if (res.ok) {
        const data = await res.json();
        stars[repo] = data.stargazers_count ?? 0;
      } else {
        console.warn(`Failed to fetch ${repo}: ${res.status}`);
        stars[repo] = 0;
      }
    } catch (err) {
      console.warn(`Error fetching ${repo}:`, err.message);
      stars[repo] = 0;
    }
  }

  writeFileSync('app/data/stars.json', JSON.stringify(stars, null, 2) + '\n');
  console.log('Wrote app/data/stars.json:', stars);
}

fetchStars();
