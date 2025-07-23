import { useEffect, useState } from "react";

export function useFetch<T>(fetchFn: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const run = async () => {
      try {
        const result = await fetchFn();
        setData(result);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [fetchFn]);

  return { data, loading, error };
}
