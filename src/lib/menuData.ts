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
    name: 'Rice & Curry',
    description: 'A small plate of fragrant rice served with a flavorful curry of the day, perfect for sharing or as a light starter',
    price: 450,
    category: 'appetizers',
    moods: ['light', 'adventurous'],
    image: 'rice&curry.jpg',
    pairing: 'Lime Juice or light Lager',
    dietary: ['gluten-free','vegetarian'],
  },
  {
    id: 'app-3',
    name: 'Soup',
    description: 'A warm and comforting soup made with seasonal vegetables and aromatic herbs, perfect for a light starter',
    price: 750,
    category: 'appetizers',
    moods: ['indulgent', 'romantic'],
    image: 'soup.avif',
    pairing: 'Ceylon Tea or Ginger Beer',
    dietary: ['gluten-free'],
  },
  {
    id: 'app-4',
    name: 'Burger',
    description: 'Juicy beef patty with melted cheese, fresh lettuce, tomato, and our special sauce, served with crispy fries',
    price: 400,
    category: 'appetizers',
    moods: ['romantic', 'adventurous'],
    image: 'burger.avif',
    pairing: 'Ceylon Tea or Passion Fruit Juice',
    dietary: ['gluten-free'],
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
    name: 'Pizza',
    description: 'Wood-fired pizza with a thin, crispy crust topped with tomato sauce, mozzarella, and your choice of toppings like spicy sausage, caramelized onions, and fresh basil',
    price: 2850,
    category: 'mains',
    moods: ['romantic', 'indulgent'],
    image: 'pizza.avif',
    pairing: 'Coconut Water or Lion Lager',
    dietary: ['gluten-free'],
  },
  {
    id: 'main-3',
    name: 'Thosai',
    description: 'Crispy fermented rice and lentil crepe served with a variety of chutneys and sambar - a South Indian classic with Sri Lankan flair',
    price: 450,
    category: 'mains',
    moods: ['light', 'romantic'],
    image: 'those.avif',
    pairing: 'Fresh Lime Juice or Ginger Beer',
    dietary: ['vegetarian'],
  },
  {
    id: 'main-4',
    name: 'Salad',
    description: 'Fresh mixed greens with seasonal vegetables, topped with a light vinaigrette dressing',
    price: 1650,
    category: 'mains',
    moods: ['adventurous', 'indulgent'],
    image: 'salad.avif',
    pairing: 'Arrack or Ceylon Tea',
        dietary: ['vegetarian'],

  },
  {
    id: 'main-5',
    name: 'Pol Rotti',
    description: 'Traditional Sri Lankan flatbread made with grated coconut and spices, served with spicy fish curry and a tangy sambol',
    price: 150,
    category: 'mains',
    moods: ['light', 'adventurous'],
    image: 'pol rotti.jpg',
    pairing: 'Lime Juice or Woodapple Juice',
    dietary: ['gluten-free'],
  },

  // Desserts
  {
    id: 'des-1',
    name: 'Brownie',
    description: 'Rich and fudgy chocolate brownie with a gooey center, topped with a scoop of vanilla ice cream',
    price: 750,
    category: 'desserts',
    moods: ['indulgent', 'romantic'],
    image: 'brownie.avif',
    pairing: 'Woodapple Juice or Arrack',
    dietary: ['gluten-free'],
    featured: true,
  },
  {
    id: 'des-2',
    name: 'Pancake',
    description: 'Fluffy pancakes served with maple syrup, fresh berries, and a dollop of whipped cream',
    price: 450,
    category: 'desserts',
    moods: ['romantic', 'light'],
    image: 'pancake.avif',
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
    name: 'Sandwich',
    description: 'Gourmet sandwich with layers of marinated grilled chicken, fresh vegetables, and a zesty aioli sauce, served on artisanal bread',
    price: 450,
    category: 'chefs-selection',
    moods: ['indulgent', 'adventurous'],
    image: 'sandwitch.avif',
    pairing: 'Beverage pairing available (+Rs 950)',
    featured: true,
  },
  {
    id: 'chef-2',
    name: 'Coffee',
    description: 'Rich and aromatic coffee brewed from premium Ceylon beans, served with a side of traditional Sri Lankan sweets for the perfect afternoon indulgence',
    price: 250,
    category: 'chefs-selection',
    moods: ['adventurous', 'romantic'],
    image: 'cofee.avif',
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
