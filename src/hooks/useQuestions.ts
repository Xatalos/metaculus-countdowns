import { useState, useEffect } from 'react';
import type { MetaculusQuestion } from '../types';

export function useQuestions() {
  const [questions, setQuestions] = useState<MetaculusQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);

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

        setQuestions(cleaned);

        if (data[0]?.updatedAt) {
          setUpdatedAt(data[0].updatedAt);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return { questions, loading, error, updatedAt };
}