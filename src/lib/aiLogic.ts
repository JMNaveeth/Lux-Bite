import { MenuItem, menuItems, getItemsByMood } from '@/lib/menuData';

interface ConversationContext {
  mood: string | null;
  dietary: string[];
  occasion: string | null;
  lastRecommendations: string[];
}

const greetings = [
  "Good evening. Welcome to LUXE BITE. What brings you to us tonight?",
  "Welcome. I'm your personal food concierge. How may I enhance your dining experience?",
  "Good evening. It's my pleasure to guide you through our menu. What are you in the mood for?",
];

const moodResponses: Record<string, string> = {
  romantic: "For a romantic evening, I have some exquisite suggestions. Our Butter-Poached Lobster with champagne beurre blanc sets the perfect mood, or perhaps the Truffle Burrata to start — both are favorites among couples celebrating love. 💕",
  indulgent: "Ah, you're in the mood to indulge! May I suggest our A5 Wagyu Ribeye? It's pure decadence. For dessert, our Dark Chocolate Soufflé is legendary. ✨",
  light: "For something lighter yet satisfying, our Mediterranean Branzino is a beautiful choice — delicate, fresh, and perfectly seasoned. The Tuna Tartare is also exquisite. 🌿",
  adventurous: "I love your adventurous spirit! Our Omakase Experience will take you on a culinary journey you won't forget. Chef Takeshi prepares each course as a surprise. 🔥",
};

const occasionResponses: Record<string, string> = {
  anniversary: "An anniversary! How wonderful. For such a special milestone, I'd recommend our Seasonal Tasting Menu with wine pairing. Seven courses of pure romance.",
  birthday: "Happy birthday celebrations! We can arrange a personalized dessert with a special touch. Our Chef Sofia creates magic with chocolate.",
  business: "For a business dinner, I suggest dishes that are elegant yet easy to enjoy while conversing. The Wild Mushroom Risotto or Branzino are excellent choices.",
  date: "A date night deserves something memorable. Start with our Oysters Rockefeller — they're said to be an aphrodisiac — followed by dishes you can share.",
};

const pairingWisdom: Record<string, string> = {
  wagyu: "For the Wagyu, I'd suggest an aged Bordeaux. The tannins complement the rich marbling beautifully.",
  lobster: "With the Lobster, a vintage Champagne creates magic. The bubbles cleanse the palate between each buttery bite.",
  risotto: "The Truffle Risotto pairs wonderfully with a Barolo — earthy meets earthy.",
  dessert: "For dessert, consider a Tawny Port with chocolate, or a Moscato d'Asti with our fruit-based options.",
};

export const generateResponse = (
  userMessage: string,
  context: ConversationContext
): { response: string; recommendations: MenuItem[] } => {
  const message = userMessage.toLowerCase();
  let response = "";
  let recommendations: MenuItem[] = [];

  // Check for greetings
  if (message.match(/^(hi|hello|hey|good evening|greetings)/i)) {
    response = greetings[Math.floor(Math.random() * greetings.length)];
    return { response, recommendations };
  }

  // Check for mood keywords
  for (const [mood, moodResponse] of Object.entries(moodResponses)) {
    if (message.includes(mood) || 
        (mood === 'romantic' && (message.includes('romance') || message.includes('love') || message.includes('partner'))) ||
        (mood === 'indulgent' && (message.includes('indulge') || message.includes('treat') || message.includes('splurge'))) ||
        (mood === 'light' && (message.includes('fresh') || message.includes('healthy') || message.includes('light'))) ||
        (mood === 'adventurous' && (message.includes('adventure') || message.includes('surprise') || message.includes('new')))) {
      response = moodResponse;
      recommendations = getItemsByMood(mood).slice(0, 3);
      return { response, recommendations };
    }
  }

  // Check for occasion keywords
  for (const [occasion, occasionResponse] of Object.entries(occasionResponses)) {
    if (message.includes(occasion) || 
        (occasion === 'anniversary' && message.includes('celebrating')) ||
        (occasion === 'birthday' && message.includes('birthday')) ||
        (occasion === 'business' && message.includes('client')) ||
        (occasion === 'date' && message.includes('date'))) {
      response = occasionResponse;
      recommendations = menuItems.filter(item => 
        item.moods.includes('romantic') || item.featured
      ).slice(0, 3);
      return { response, recommendations };
    }
  }

  // Check for dietary restrictions
  if (message.includes('vegetarian') || message.includes('vegan')) {
    response = "We have lovely vegetarian options. Our Wild Mushroom Risotto is sublime — earthy and comforting. The Truffle Burrata is also vegetarian-friendly and absolutely divine.";
    recommendations = menuItems.filter(item => 
      item.dietary?.includes('vegetarian')
    );
    return { response, recommendations };
  }

  if (message.includes('gluten') || message.includes('celiac')) {
    response = "Many of our dishes are naturally gluten-free. I'd recommend the A5 Wagyu, the Butter-Poached Lobster, or our Branzino — all prepared without gluten.";
    recommendations = menuItems.filter(item => 
      item.dietary?.includes('gluten-free')
    ).slice(0, 3);
    return { response, recommendations };
  }

  // Check for pairing questions
  if (message.includes('pair') || message.includes('wine') || message.includes('drink')) {
    for (const [dish, pairing] of Object.entries(pairingWisdom)) {
      if (message.includes(dish)) {
        response = pairing;
        return { response, recommendations };
      }
    }
    response = "Wine pairing is my passion. Tell me which dish you're considering, and I'll suggest the perfect complement.";
    return { response, recommendations };
  }

  // Check for specific dish inquiries
  if (message.includes('recommend') || message.includes('suggest') || message.includes('what should')) {
    response = "Based on what's exceptional today, I'd suggest our A5 Wagyu — it's perfectly marbled — or if seafood speaks to you, the Butter-Poached Lobster with caviar is transcendent.";
    recommendations = menuItems.filter(item => item.featured);
    return { response, recommendations };
  }

  // Check for menu/appetizer/main/dessert requests
  if (message.includes('appetizer') || message.includes('starter')) {
    response = "For starters, our Truffle Burrata is a guest favorite — creamy, aromatic, and absolutely indulgent. The Tuna Tartare offers a lighter, fresher option.";
    recommendations = menuItems.filter(item => item.category === 'appetizers').slice(0, 3);
    return { response, recommendations };
  }

  if (message.includes('main') || message.includes('entrée') || message.includes('entree')) {
    response = "For your main course, the choice often comes down to your mood. Rich and bold? The Wagyu. Elegant and refined? The Lobster. Light and fresh? The Branzino.";
    recommendations = menuItems.filter(item => item.category === 'mains').slice(0, 3);
    return { response, recommendations };
  }

  if (message.includes('dessert') || message.includes('sweet')) {
    response = "Save room for dessert! Our Dark Chocolate Soufflé is legendary — it takes 20 minutes, so we recommend ordering early. The Crème Brûlée is perfect for vanilla lovers.";
    recommendations = menuItems.filter(item => item.category === 'desserts');
    return { response, recommendations };
  }

  // Check for price/budget
  if (message.includes('price') || message.includes('budget') || message.includes('expensive')) {
    response = "Our dishes range from $18 to $225. For an exceptional experience without the top tier, I'd suggest the Duck à l'Orange at $62 or our Wild Mushroom Risotto at $48 — both are extraordinary value.";
    return { response, recommendations };
  }

  // Default response
  response = "I'd love to help you discover the perfect dishes tonight. Are you celebrating something special? In a particular mood? Or perhaps you have dietary preferences I should know about?";
  return { response, recommendations };
};

export const getInitialGreeting = (): string => {
  return greetings[Math.floor(Math.random() * greetings.length)];
};
