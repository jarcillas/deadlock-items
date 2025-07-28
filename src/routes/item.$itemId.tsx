import { createFileRoute } from '@tanstack/react-router';
import { items } from '../data/shopItems.json';

const fetchItemById = async (
  itemId: string
): Promise<(typeof items)[number] | undefined> => {
  // In a real-world scenario, you might fetch this data from an API
  // For this example, we're directly using the imported JSON
  return items.find((item) => String(item.id) === itemId);
};

export const Route = createFileRoute('/item/$itemId')({
  loader: async ({ params }) => {
    const item = await fetchItemById(params.itemId);
    if (!item) {
      // Handle the case where the item is not found
      // You might want to throw a 404 error or redirect
      throw new Error('Item not found');
    }
    return item;
  },
  component: RouteComponent,
});

function RouteComponent() {
  const item = Route.useLoaderData();
  // const itemProperties = Object.keys(item.properties);

  return (
    <div className="text-deadlock-primary w-[400px] flex flex-col items-stretch gap-y-2">
      <div className="flex items-stretch">
        <img className="size-30 grow-0" alt={item.name} src={item.shop_image} />
        <div className="grow-1 flex flex-col items-center justify-center">
          <div>
            <h2 className="text-[20pt] font-bold">{item.name}</h2>
            <h3 className="text-[14pt] font-semibold">Cost: {item.cost}</h3>
          </div>
        </div>
      </div>
      {/* <p>Item id: {item.id}</p> */}

      {/* {itemProperties.length
        ? itemProperties.map((property) => (
            <div>
              {'label' in
              (item.properties[property as keyof typeof item.properties] ?? {})
                ? (
                    item.properties[
                      property as keyof typeof item.properties
                    ] as { label: string }
                  ).label
                : null}
            </div>
          ))
        : ''} */}
      <div className="flex flex-col gap-y-2">
        {item.tooltip_sections &&
          item.tooltip_sections.map((section) => {
            return (
              <div className="flex flex-col gap-y-1">
                {section?.section_type && (
                  <div className="capitalize font-bold">
                    {section.section_type}
                  </div>
                )}
                {section.section_attributes.map((attribute) => (
                  <div className="flex flex-col">
                    {attribute.loc_string && <div>{attribute.loc_string}</div>}
                    <div className="flex flex-col gap-y-1">
                      {attribute?.elevated_properties?.map((prop) => (
                        <div className="flex gap-x-2 justify-between items-center">
                          <div className="flex items-center gap-x-2">
                            {item.properties[prop]?.icon && (
                              <img
                                className="size-6"
                                src={item.properties[prop].icon}
                              />
                            )}
                            <div>{item.properties[prop]?.label}</div>
                          </div>
                          <div>{item.properties[prop]?.value}</div>
                        </div>
                      ))}
                      <div className="flex flex-row">
                        {attribute?.important_properties?.map((prop) => (
                          <div className="flex flex-col gap-y-2 justify-between items-center">
                            <div className="flex items-center gap-x-2">
                              {item.properties[prop]?.icon && (
                                <img
                                  className="size-6"
                                  src={item.properties[prop].icon}
                                />
                              )}
                              <div>{item.properties[prop]?.label}</div>
                            </div>
                            <div>{item.properties[prop]?.value}</div>
                          </div>
                        ))}
                      </div>
                      {attribute?.properties?.map((prop) => (
                        <div className="flex gap-x-2 justify-between items-center">
                          <div className="flex items-center gap-x-2">
                            {item.properties[prop]?.icon && (
                              <img
                                className="size-6"
                                src={item.properties[prop].icon}
                              />
                            )}
                            <div>{item.properties[prop]?.label}</div>
                          </div>
                          <div>{item.properties[prop]?.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
      </div>
    </div>
  );
}
