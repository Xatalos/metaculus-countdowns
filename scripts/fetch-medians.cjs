const fs = require('fs');
const path = require('path');

const TOKEN = process.env.METACULUS_TOKEN;
const IDS = [7721, 10217, 3515, 3479, 5121];

async function fetchPost(id) {
  const res = await fetch(`https://www.metaculus.com/api/posts/${id}/`, {
    headers: { Authorization: `Token ${TOKEN}` },
  });
  if (!res.ok) throw new Error(`Post ${id}: ${res.status}`);
  return res.json();
}

function extractMedian(post) {
  try {
    const q = post.question || post.questions?.[0];
    const agg = q?.aggregations?.recency_weighted?.latest
             || q?.aggregations?.unweighted?.latest;
    const center = Array.isArray(agg?.centers) ? agg.centers[0] : agg?.centers;
    if (typeof center === 'number') {
      return new Date(center * 1000).toISOString().slice(0, 10);
    }
    if (typeof center === 'string') return center.slice(0, 10);
    return null;
  } catch {
    return null;
  }
}

(async () => {
  const results = [];
  for (const id of IDS) {
    const data = await fetchPost(id);
    results.push({
      id: data.id,
      title: data.title,
      medianDate: extractMedian(data),
      category: data.projects?.[0]?.name ?? null,
      updatedAt: new Date().toISOString(),
    });
    await new Promise(r => setTimeout(r, 800));
  }

  const out = path.join(__dirname, '..', 'public', 'data.json');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, JSON.stringify(results, null, 2));
})();