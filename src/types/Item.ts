type Item = {
  id: number;
  class_name: string;
  name: string;
  start_trained?: boolean;
  image?: string;
  image_webp?: string;
  [key: string]: any;
};

type ItemsResponse = Item[];

export type { Item, ItemsResponse };
