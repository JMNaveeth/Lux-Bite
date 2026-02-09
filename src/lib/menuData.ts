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
    name: 'Truffle Burrata',
    description: 'Creamy burrata draped in black truffle honey, served with grilled sourdough and microgreens',
    price: 28,
    category: 'appetizers',
    moods: ['romantic', 'indulgent'],
    image: 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=800&q=80',
    pairing: 'Champagne Brut or a light Pinot Grigio',
    dietary: ['vegetarian'],
    featured: true,
  },
  {
    id: 'app-2',
    name: 'Tuna Tartare',
    description: 'Hand-cut yellowfin tuna with avocado mousse, sesame tuile, and ponzu pearls',
    price: 32,
    category: 'appetizers',
    moods: ['light', 'adventurous'],
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&q=80',
    pairing: 'Dry Riesling or Japanese Sake',
    dietary: ['gluten-free'],
  },
  {
    id: 'app-3',
    name: 'Foie Gras Terrine',
    description: 'Silky duck liver with Sauternes gelée, brioche toast, and fig compote',
    price: 42,
    category: 'appetizers',
    moods: ['indulgent', 'romantic'],
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80',
    pairing: 'Sauternes or late-harvest Gewürztraminer',
  },
  {
    id: 'app-4',
    name: 'Oysters Rockefeller',
    description: 'Six premium oysters baked with spinach, Pernod butter, and Parmesan crust',
    price: 36,
    category: 'appetizers',
    moods: ['romantic', 'adventurous'],
    image: 'https://images.unsplash.com/photo-1606850780554-b55ea4dd0b70?w=800&q=80',
    pairing: 'Muscadet or Chablis',
    dietary: ['gluten-free'],
  },

  // Mains
  {
    id: 'main-1',
    name: 'Wagyu Ribeye',
    description: 'A5 Japanese wagyu with charred shallot purée, bone marrow butter, and truffle jus',
    price: 145,
    category: 'mains',
    moods: ['indulgent', 'romantic'],
    image: 'https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=800&q=80',
    pairing: 'Aged Bordeaux or bold Napa Cabernet',
    dietary: ['gluten-free'],
    featured: true,
  },
  {
    id: 'main-2',
    name: 'Butter-Poached Lobster',
    description: 'Maine lobster tail with saffron risotto, champagne beurre blanc, and oscietra caviar',
    price: 98,
    category: 'mains',
    moods: ['romantic', 'indulgent'],
    image: 'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=800&q=80',
    pairing: 'White Burgundy or vintage Champagne',
    dietary: ['gluten-free'],
  },
  {
    id: 'main-3',
    name: 'Wild Mushroom Risotto',
    description: 'Arborio rice with porcini, chanterelles, aged Parmesan foam, and white truffle oil',
    price: 48,
    category: 'mains',
    moods: ['light', 'romantic'],
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&q=80',
    pairing: 'Barolo or earthy Pinot Noir',
    dietary: ['vegetarian', 'gluten-free'],
  },
  {
    id: 'main-4',
    name: 'Duck à l\'Orange',
    description: 'Crispy Muscovy duck breast with Grand Marnier glaze, roasted endive, and candied kumquats',
    price: 62,
    category: 'mains',
    moods: ['adventurous', 'indulgent'],
    image: 'https://images.unsplash.com/photo-1580554530778-ca36943f7005?w=800&q=80',
    pairing: 'Oregon Pinot Noir or Côtes du Rhône',
  },
  {
    id: 'main-5',
    name: 'Mediterranean Branzino',
    description: 'Whole roasted sea bass with herb crust, artichoke hearts, and lemon caper butter',
    price: 56,
    category: 'mains',
    moods: ['light', 'adventurous'],
    image: 'https://images.unsplash.com/photo-1534766555764-ce878a5e3a2b?w=800&q=80',
    pairing: 'Vermentino or Sancerre',
    dietary: ['gluten-free'],
  },

  // Desserts
  {
    id: 'des-1',
    name: 'Dark Chocolate Soufflé',
    description: 'Valrhona chocolate cloud with crème anglaise and gold leaf',
    price: 24,
    category: 'desserts',
    moods: ['romantic', 'indulgent'],
    image: 'https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?w=800&q=80',
    pairing: 'Tawny Port or espresso',
    dietary: ['vegetarian'],
    featured: true,
  },
  {
    id: 'des-2',
    name: 'Crème Brûlée',
    description: 'Madagascar vanilla custard with caramelized sugar crust and fresh berries',
    price: 18,
    category: 'desserts',
    moods: ['romantic', 'light'],
    image: 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=800&q=80',
    pairing: 'Moscato d\'Asti or dessert wine',
    dietary: ['vegetarian', 'gluten-free'],
  },
  {
    id: 'des-3',
    name: 'Passion Fruit Pavlova',
    description: 'Crisp meringue with tropical fruit, chantilly cream, and coconut tuile',
    price: 20,
    category: 'desserts',
    moods: ['light', 'adventurous'],
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80',
    pairing: 'Prosecco or tropical cocktail',
    dietary: ['vegetarian', 'gluten-free'],
  },

  // Chef's Selection
  {
    id: 'chef-1',
    name: 'Seasonal Tasting Menu',
    description: 'Seven courses of culinary artistry featuring the finest seasonal ingredients',
    price: 185,
    category: 'chefs-selection',
    moods: ['indulgent', 'adventurous'],
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    pairing: 'Wine pairing available (+$95)',
    featured: true,
  },
  {
    id: 'chef-2',
    name: 'Omakase Experience',
    description: 'Trust the chef for an unforgettable journey through flavors and textures',
    price: 225,
    category: 'chefs-selection',
    moods: ['adventurous', 'romantic'],
    image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=800&q=80',
    pairing: 'Premium sake pairing included',
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
