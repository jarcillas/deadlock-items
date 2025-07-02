// import { useItems } from './hooks/useItems';

import { items } from './data/shopItems.json';

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

  type ItemsArray = typeof items;

  const filterItemsByTier = (items: ItemsArray, tier: number) => {
    return items.filter((item) => item.item_tier === tier);
  };

  console.log('item count: ', items.length);

  return (
    <div className="w-screen min-h-screen h-fit flex flex-col items-center bg-linear-60 from-blue-900 to-cyan-900 text-slate-200">
      <h1 className="py-4 text-4xl font-bold uppercase">Deadlock Items</h1>

      <div className="grid grid-cols-3 gap-x-8 text-xs">
        <div>
          <h2 className="text-lg">Gun Items</h2>
          <div className="flex flex-col gap-y-6 mt-4">
            <div>
              <h3>Tier 1</h3>
              <div className="pt-4 grid grid-cols-4 gap-2">
                {filterItemsByTier(gunItems, 1).map((item) => (
                  <div key={item.id}>
                    <img src={item.shop_image} />
                    <p>{item.name}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3>Tier 2</h3>
              <div className="pt-4 grid grid-cols-4 gap-2">
                {filterItemsByTier(gunItems, 2).map((item) => (
                  <div key={item.id}>
                    <img src={item.shop_image} />
                    <p>{item.name}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3>Tier 3</h3>
              <div className="pt-4 grid grid-cols-4 gap-2">
                {filterItemsByTier(gunItems, 3).map((item) => (
                  <div key={item.id}>
                    <img src={item.shop_image} />
                    <p>{item.name}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3>Tier 4</h3>
              <div className="pt-4 grid grid-cols-4 gap-2">
                {filterItemsByTier(gunItems, 4).map((item) => (
                  <div key={item.id}>
                    <img src={item.shop_image} />
                    <p>{item.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg">Vitality Items</h2>
          <div className="flex flex-col gap-y-6 mt-4">
            <div>
              <h3>Tier 1</h3>
              <div className="pt-4 grid grid-cols-4 gap-2">
                {filterItemsByTier(vitalityItems, 1).map((item) => (
                  <div key={item.id}>
                    <img src={item.shop_image} />
                    <p>{item.name}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3>Tier 2</h3>
              <div className="pt-4 grid grid-cols-4 gap-2">
                {filterItemsByTier(vitalityItems, 2).map((item) => (
                  <div key={item.id}>
                    <img src={item.shop_image} />
                    <p>{item.name}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3>Tier 3</h3>
              <div className="pt-4 grid grid-cols-4 gap-2">
                {filterItemsByTier(vitalityItems, 3).map((item) => (
                  <div key={item.id}>
                    <img src={item.shop_image} />
                    <p>{item.name}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3>Tier 4</h3>
              <div className="pt-4 grid grid-cols-4 gap-2">
                {filterItemsByTier(vitalityItems, 4).map((item) => (
                  <div key={item.id}>
                    <img src={item.shop_image} />
                    <p>{item.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg">Spirit Items</h2>
          <div className="flex flex-col gap-y-6 mt-4">
            <div>
              <h3>Tier 1</h3>
              <div className="pt-4 grid grid-cols-4 gap-2">
                {filterItemsByTier(spiritItems, 1).map((item) => (
                  <div key={item.id}>
                    <img src={item.shop_image} />
                    <p>{item.name}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3>Tier 2</h3>
              <div className="pt-4 grid grid-cols-4 gap-2">
                {filterItemsByTier(spiritItems, 2).map((item) => (
                  <div key={item.id}>
                    <img src={item.shop_image} />
                    <p>{item.name}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3>Tier 3</h3>
              <div className="pt-4 grid grid-cols-4 gap-2">
                {filterItemsByTier(spiritItems, 3).map((item) => (
                  <div key={item.id}>
                    <img src={item.shop_image} />
                    <p>{item.name}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3>Tier 4</h3>
              <div className="pt-4 grid grid-cols-4 gap-2">
                {filterItemsByTier(spiritItems, 4).map((item) => (
                  <div key={item.id}>
                    <img src={item.shop_image} />
                    <p>{item.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
