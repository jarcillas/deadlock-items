import { useFetch } from './useFetch';

import type { ItemsResponse } from '../types/Item';

type UseItemsOptions = {
  page?: number;
  limit?: number;
  refetchInterval?: number | null;
  skip?: boolean;
};

export function useItems(apiUrl: string, options: UseItemsOptions = {}) {
  const { data, loading, error, refetch } = useFetch<ItemsResponse>(
    apiUrl,
    options
  );

  const items = data ?? [];

  return { items, loading, error, refetch };
}
