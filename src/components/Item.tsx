import type { Items } from '../App';

type ItemProps = {
  item: Items[number];
};

const Item = ({ item }: ItemProps) => {
  return (
    <div key={item.id}>
      <img alt={item.name} src={item.shop_image} />
      <p>{item.name}</p>
    </div>
  );
};

export { Item };
