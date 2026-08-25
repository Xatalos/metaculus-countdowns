import { useState, useEffect } from 'react';
import type { MetaculusQuestion } from '../types';

export function useQuestions() {
  const [questions, setQuestions] = useState<MetaculusQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/data.json', { cache: 'no-store' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();

        const cleaned: MetaculusQuestion[] = data.map((q: any) => ({
          id: q.id,
          title: q.title,
          medianDate: q.medianDate,
          category: q.category ?? undefined,
        }));

        cleaned.sort((a, b) => a.medianDate.localeCompare(b.medianDate));

        setQuestions(cleaned);

      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return { questions, loading, error };
}