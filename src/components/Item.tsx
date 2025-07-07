import type { Items } from '../types/Item';
import { Link } from '@tanstack/react-router';

type ItemProps = {
  item: Items[number];
};

const Item = ({ item }: ItemProps) => {
  return (
    <Link to="/item/$itemId" params={{ itemId: String(item.id) }}>
      <div key={item.id}>
        <img alt={item.name} src={item.shop_image} />
        <p>{item.name}</p>
      </div>
    </Link>
  );
};

export { Item };
