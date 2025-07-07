import type { Items } from '../types/Item';
import { Item } from './Item';
import { filterItemsByTier } from '../util/filterItemsByTier';

type ItemGroupProps = {
  items: Items;
};

const ItemGroup = ({ items }: ItemGroupProps) => {
  return (
    <div>
      <h2 className="text-lg font-bold">Gun Items</h2>
      <div className="flex flex-col gap-y-6 mt-4">
        <div>
          <h3 className="text-base">Tier 1</h3>
          <div className="pt-4 grid grid-cols-4 gap-2">
            {filterItemsByTier(items, 1).map((item: Items[number]) => (
              <Item item={item} />
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-base">Tier 2</h3>
          <div className="pt-4 grid grid-cols-4 gap-2">
            {filterItemsByTier(items, 2).map((item: Items[number]) => (
              <Item item={item} />
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-base">Tier 3</h3>
          <div className="pt-4 grid grid-cols-4 gap-2">
            {filterItemsByTier(items, 3).map((item: Items[number]) => (
              <Item item={item} />
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-base">Tier 4</h3>
          <div className="pt-4 grid grid-cols-4 gap-2">
            {filterItemsByTier(items, 4).map((item: Items[number]) => (
              <Item item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export { ItemGroup };
