import { useState, useEffect, useRef, useCallback } from 'react';

type UseFetchOptions = {
  page?: number;
  limit?: number;
  refetchInterval?: number | null;
  skip?: boolean;
};

type UseFetchResult<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
};

const cache = new Map<string, unknown>();

export function useFetch<T = unknown>(
  url: string,
  {
    page = 1,
    limit = undefined,
    refetchInterval = null,
    skip = false,
  }: UseFetchOptions = {}
): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(!skip);
  const [error, setError] = useState<string | null>(null);
  const [trigger, setTrigger] = useState<number>(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const buildUrl = useCallback((): string => {
    const urlObj = new URL(
      url,
      typeof window !== 'undefined'
        ? window.location.origin
        : 'http://localhost'
    );
    if (page) urlObj.searchParams.set('page', String(page));
    if (limit !== undefined) urlObj.searchParams.set('limit', String(limit));
    return urlObj.toString();
  }, [url, page, limit]);

  const fetchData = useCallback(async () => {
    const finalUrl = buildUrl();

    if (cache.has(finalUrl)) {
      setData(cache.get(finalUrl) as T);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(finalUrl);
      if (!res.ok) throw new Error(`Error: ${res.status}`);
      const json: T = await res.json();
      cache.set(finalUrl, json);
      setData(json);
      setError(null);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Unknown error');
      }
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [buildUrl]);

  useEffect(() => {
    if (skip || !url) return;
    fetchData();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [fetchData, url, trigger, skip]);

  useEffect(() => {
    if (refetchInterval && !skip) {
      intervalRef.current = setInterval(() => {
        setTrigger((t) => t + 1);
      }, refetchInterval);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [refetchInterval, skip]);

  const refetch = () => setTrigger((t) => t + 1);

  return { data, loading, error, refetch };
}
