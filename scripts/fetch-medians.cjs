const fs = require('fs');
const path = require('path');

const TOKEN = process.env.METACULUS_TOKEN;
const IDS = [7721, 10217, 3515, 3479, 5121];

async function fetchPost(id) {
  const res = await fetch(`https://www.metaculus.com/api/posts/${id}/`, {
    headers: {
      Authorization: `Token ${TOKEN}`,
      'User-Agent': 'Metaculus-Countdown/1.0',
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Post ${id}: ${res.status} – ${text}`);
  }
  return res.json();
}

(async () => {
  const data = await fetchPost(7721);
  
  console.log(JSON.stringify({
    id: data.id,
    title: data.title,
    question_keys: data.question ? Object.keys(data.question) : null,
    aggregations: data.question?.aggregations ?? null,
    community_prediction: data.question?.community_prediction ?? null,
    prediction: data.question?.prediction ?? null,
  }, null, 2));
  
  const out = path.join(__dirname, '..', 'public', 'data.json');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, JSON.stringify([{ id: data.id, title: data.title, medianDate: null, category: null, updatedAt: new Date().toISOString() }], null, 2));
})();
