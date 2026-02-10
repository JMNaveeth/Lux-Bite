export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'appetizers' | 'mains' | 'desserts' | 'chefs-selection';
  moods: ('romantic' | 'indulgent' | 'light' | 'adventurous')[];
  image: string;
  pairing?: string;
  dietary?: string[];
  featured?: boolean;
}

export const menuItems: MenuItem[] = [
  // Appetizers
  {
    id: 'app-1',
    name: 'Vegetable Samosa',
    description: 'Crispy golden pastry filled with spiced potato, peas, and aromatic herbs, served with mint chutney',
    price: 450,
    category: 'appetizers',
    moods: ['romantic', 'indulgent'],
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80',
    pairing: 'Ginger Lime Punch or Ceylon Black Tea',
    dietary: ['vegetarian'],
    featured: true,
  },
  {
    id: 'app-2',
    name: 'Fish Cutlets',
    description: 'Flaky fish croquettes seasoned with Sri Lankan spices, breadcrumbs, and curry leaves',
    price: 650,
    category: 'appetizers',
    moods: ['light', 'adventurous'],
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&q=80',
    pairing: 'Lime Juice or light Lager',
    dietary: ['gluten-free'],
  },
  {
    id: 'app-3',
    name: 'Isso Wade (Prawn Fritters)',
    description: 'Crispy lentil fritters mixed with juicy prawns, onions, and spiced with chili and curry leaves',
    price: 750,
    category: 'appetizers',
    moods: ['indulgent', 'romantic'],
    image: 'https://images.unsplash.com/photo-1601050690117-94f5f6fa11c5?w=800&q=80',
    pairing: 'Woodapple Juice or Arrack',
  },
  {
    id: 'app-4',
    name: 'Dhal Vada',
    description: 'Crispy lentil fritters with fresh curry leaves, onions, and green chilies served with coconut sambol',
    price: 400,
    category: 'appetizers',
    moods: ['romantic', 'adventurous'],
    image: 'https://images.unsplash.com/photo-1626074353765-517a65eded17?w=800&q=80',
    pairing: 'Ceylon Tea or Passion Fruit Juice',
    dietary: ['gluten-free', 'vegetarian'],
  },

  // Mains
  {
    id: 'main-1',
    name: 'Lamprais',
    description: 'Traditional Dutch Burgher dish with rice, chicken curry, seeni sambol, ash plantain, brinjal moju, wrapped and slow-cooked in banana leaf',
    price: 1850,
    category: 'mains',
    moods: ['indulgent', 'romantic'],
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80',
    pairing: 'Ginger Beer or Ceylon Arrack',
    dietary: ['gluten-free'],
    featured: true,
  },
  {
    id: 'main-2',
    name: 'Jaffna Crab Curry',
    description: 'Fresh mud crabs cooked in roasted Sri Lankan spices with tamarind, coconut milk, and curry leaves',
    price: 2850,
    category: 'mains',
    moods: ['romantic', 'indulgent'],
    image: 'https://images.unsplash.com/photo-1626074353765-517a65eded17?w=800&q=80',
    pairing: 'Coconut Water or Lion Lager',
    dietary: ['gluten-free'],
  },
  {
    id: 'main-3',
    name: 'Kottu Roti',
    description: 'Shredded godamba roti stir-fried with vegetables, egg, spices, and your choice of chicken, beef, or seafood',
    price: 1450,
    category: 'mains',
    moods: ['light', 'romantic'],
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80',
    pairing: 'Fresh Lime Juice or Ginger Beer',
    dietary: ['gluten-free'],
  },
  {
    id: 'main-4',
    name: 'Black Pork Curry',
    description: 'Slow-cooked tender pork in aromatic roasted Sri Lankan spices with tamarind and goraka for that authentic sour tang',
    price: 1650,
    category: 'mains',
    moods: ['adventurous', 'indulgent'],
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80',
    pairing: 'Arrack or Ceylon Tea',
  },
  {
    id: 'main-5',
    name: 'Ambul Thiyal (Sour Fish Curry)',
    description: 'Tuna cooked in goraka, black pepper, cinnamon, and curry leaves - a Southern coastal delicacy',
    price: 1550,
    category: 'mains',
    moods: ['light', 'adventurous'],
    image: 'https://images.unsplash.com/photo-1534766555764-ce878a5e3a2b?w=800&q=80',
    pairing: 'Lime Juice or Woodapple Juice',
    dietary: ['gluten-free'],
  },

  // Desserts
  {
    id: 'des-1',
    name: 'Watalappan',
    description: 'Traditional Sri Lankan coconut custard pudding with jaggery, cardamom, and cashew nuts',
    price: 550,
    category: 'desserts',
    moods: ['romantic', 'indulgent'],
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80',
    pairing: 'Ceylon Black Tea or Cardamom Tea',
    dietary: ['vegetarian', 'gluten-free'],
    featured: true,
  },
  {
    id: 'des-2',
    name: 'Kiri Pani (Milk Toffee)',
    description: 'Creamy sweet made with condensed milk, cashew nuts, and cardamom with a fudge-like texture',
    price: 450,
    category: 'desserts',
    moods: ['romantic', 'light'],
    image: 'https://images.unsplash.com/photo-1571506165871-ee72a35bc9d4?w=800&q=80',
    pairing: 'Ceylon Tea or Faluda',
    dietary: ['vegetarian', 'gluten-free'],
  },
  {
    id: 'des-3',
    name: 'Curd with Kithul Treacle',
    description: 'Buffalo curd topped with sweet palm jaggery syrup and cashew nuts - a traditional Sri Lankan favorite',
    price: 500,
    category: 'desserts',
    moods: ['light', 'adventurous'],
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80',
    pairing: 'Jaggery Tea or King Coconut Water',
    dietary: ['vegetarian', 'gluten-free'],
  },

  // Chef's Selection
  {
    id: 'chef-1',
    name: 'Rice & Curry Feast',
    description: 'Traditional Sri Lankan rice and curry experience with 12 accompaniments including fish, chicken, dhal, vegetables, sambols, and papadams',
    price: 2250,
    category: 'chefs-selection',
    moods: ['indulgent', 'adventurous'],
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80',
    pairing: 'Beverage pairing available (+Rs 950)',
    featured: true,
  },
  {
    id: 'chef-2',
    name: 'Island Heritage Experience',
    description: 'Trust the chef for an unforgettable journey through Sri Lankan coastal and hill country flavors',
    price: 3250,
    category: 'chefs-selection',
    moods: ['adventurous', 'romantic'],
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80',
    pairing: 'Premium Ceylon tea pairing included',
  },
];

export const categories = [
  { id: 'all', name: 'All', icon: '✦' },
  { id: 'appetizers', name: 'Appetizers', icon: '◇' },
  { id: 'mains', name: 'Mains', icon: '◆' },
  { id: 'desserts', name: 'Desserts', icon: '○' },
  { id: 'chefs-selection', name: "Chef's Selection", icon: '★' },
] as const;

export const moods = [
  { id: 'romantic', name: 'Romantic', emoji: '💕' },
  { id: 'indulgent', name: 'Indulgent', emoji: '✨' },
  { id: 'light', name: 'Light & Fresh', emoji: '🌿' },
  { id: 'adventurous', name: 'Adventurous', emoji: '🔥' },
] as const;

export const getFeaturedItems = () => menuItems.filter(item => item.featured);

export const getItemsByCategory = (category: string) => 
  category === 'all' ? menuItems : menuItems.filter(item => item.category === category);

export const getItemsByMood = (mood: string) => 
  menuItems.filter(item => item.moods.includes(mood as any));

export const getItemById = (id: string) => menuItems.find(item => item.id === id);
