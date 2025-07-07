import type { Items } from '../types/Item';

const filterItemsByTier = (items: Items, tier: number) => {
  return items.filter((item) => item.item_tier === tier);
};

export { filterItemsByTier };
