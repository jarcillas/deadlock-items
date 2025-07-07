// import { useItems } from './hooks/useItems';

import { items } from './data/shopItems.json';
import { ItemGroup } from './components/ItemGroup';

export type Items = typeof items;

function App() {
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

  console.log('item count: ', items.length);

  return (
    <div className="px-4 min-h-screen h-fit flex flex-col items-center bg-linear-60 from-blue-900 to-cyan-900 text-slate-200">
      <h1 className="py-4 text-4xl font-bold uppercase">Deadlock Items</h1>

      <div className="grid grid-cols-3 gap-x-8 text-xs w-full">
        <ItemGroup items={gunItems} />
        <ItemGroup items={vitalityItems} />
        <ItemGroup items={spiritItems} />
      </div>
    </div>
  );
}

export default App;
