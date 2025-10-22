import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rawDataPath = path.resolve(__dirname, '../data/shopItems.json');
const cleanDataPath = path.resolve(
  __dirname,
  '../data/processedShopItems.json'
);

interface ProcessedShopItem {
  id: number;
  class_name: string;
  name: string;
  start_trained: boolean;
  image: string;
  image_webp: string;
  sections: ShopItemSection[];
  item_slot_type: 'weapon' | 'vitality' | 'spirit';
}

interface ShopItemSection {
  section_type?: string;
  section_attributes: ShopItemSectionAttribute[];
}

interface ShopItemSectionAttribute {
  loc_string: string;
  properties: ShopItemProperty[];
  elevated_properties?: ShopItemProperty[];
  important_properties?: Array<ShopItemProperty | ImportantPropertyWithIcon>;
  // important_properties_with_icon?: ImportantPropertyWithIcon[];
}

interface ShopItemProperty {
  value?: string;
  label?: string;
  icon?: string;
}

interface RawShopItem extends ProcessedShopItem {
  tooltip_sections: Array<TooltipSection>;
  properties: { [key: string]: ShopItemProperty };
}

interface TooltipSection {
  section_type?: string;
  section_attributes?: TooltipSectionAttribute[];
}

interface TooltipSectionAttribute
  extends Omit<
    ShopItemSectionAttribute,
    | 'properties'
    | 'elevated_properties'
    | 'important_properties'
    | 'important_properties_with_icon'
  > {
  properties: string[];
  elevated_properties?: string[];
  important_properties?: string[];
  important_properties_with_icon?: ImportantPropertyWithIcon[];
}

interface ImportantPropertyWithIcon {
  name: string;
  icon: string;
  localized_name: string;
}

function getPropertyValues(
  propertyString: string,
  propertiesObj: { [key: string]: ShopItemProperty }
) {
  return {
    name: propertyString,
    ...propertiesObj[propertyString],
  };
}

async function processData() {
  try {
    const rawData = await fs.readFile(rawDataPath, 'utf8');
    const records = JSON.parse(rawData);

    const processedShopItems: ProcessedShopItem[] = records.items?.map(
      (item: RawShopItem) => {
        const {
          id,
          class_name,
          name,
          start_trained,
          image,
          image_webp,
          item_slot_type,
        } = item;

        const sections = item.tooltip_sections?.map((tooltipSection) => {
          const section: ShopItemSection = {
            section_attributes: [],
          };
          if (Object.hasOwn(tooltipSection, 'section_type'))
            section.section_type = tooltipSection.section_type;
          else section.section_type = 'standard';
          tooltipSection.section_attributes?.forEach((attr) => {
            section.section_attributes.push({
              loc_string: attr.loc_string,
              properties: attr.properties?.map((propertyString: string) =>
                getPropertyValues(propertyString, item.properties)
              ),
              elevated_properties: attr.elevated_properties?.map(
                (propertyString: string) =>
                  getPropertyValues(propertyString, item.properties)
              ),
              important_properties: attr.important_properties?.map(
                (propertyString: string) => {
                  const importantPropertyWithIcon =
                    attr.important_properties_with_icon?.find(
                      (prop) => prop.name === propertyString
                    );
                  if (importantPropertyWithIcon)
                    return importantPropertyWithIcon;
                  return {
                    ...getPropertyValues(propertyString, item.properties),
                  };
                }
              ),
            });
          });
          return section;
        });

        return {
          id,
          class_name,
          name,
          start_trained,
          image,
          image_webp,
          sections,
          item_slot_type,
        };
      }
    );

    const formattedJson = JSON.stringify(processedShopItems, null, 2);
    await fs.writeFile(cleanDataPath, formattedJson, 'utf8');
  } catch (error) {
    console.error('❌ An error occurred during data processing:', error);
    process.exit(1);
  }
}

processData();
