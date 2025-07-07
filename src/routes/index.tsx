import { createFileRoute } from '@tanstack/react-router';

import { items } from '../data/shopItems.json';
import { ItemGroup } from '../components/ItemGroup';

export type Items = typeof items;

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  // const { items, loading } = useItems(
  //   'https://assets.deadlock-api.com/v2/items',
  //   {
  //     limit: 5,
  //   }
  // );

  // const cleanedItems = items?.filter(
  //   (item) => item.type === 'upgrade' && !item.disabled
  // );

  const gunItems = items.filter((item) => item.item_slot_type === 'weapon');
  const vitalityItems = items.filter(
    (item) => item.item_slot_type === 'vitality'
  );
  const spiritItems = items.filter((item) => item.item_slot_type === 'spirit');

  return (
    <div className="grid grid-cols-3 gap-x-8 text-xs w-full">
      <ItemGroup items={gunItems} />
      <ItemGroup items={vitalityItems} />
      <ItemGroup items={spiritItems} />
    </div>
  );
}
