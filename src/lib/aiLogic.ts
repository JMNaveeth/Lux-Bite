import { MenuItem, menuItems, getItemsByMood } from '@/lib/menuData';

interface ConversationContext {
  mood: string | null;
  dietary: string[];
  occasion: string | null;
  lastRecommendations: string[];
}

const getTimeBasedGreetings = (): string[] => {
  // Get Sri Lankan time (UTC+5:30)
  const now = new Date();
  const sriLankaTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Colombo' }));
  const hour = sriLankaTime.getHours();

  // Morning: 5am - 12pm
  if (hour >= 5 && hour < 12) {
    return [
      "Good morning! Welcome to LUXE BITE. How may I start your day with culinary excellence?",
      "Good morning! I'm your personal food concierge. Ready to plan something special?",
      "A wonderful morning to you! How may I enhance your dining experience today?",
    ];
  }
  
  // Afternoon: 12pm - 3pm
  if (hour >= 12 && hour < 15) {
    return [
      "Good afternoon! Welcome to LUXE BITE. What brings you to us today?",
      "Good afternoon! I'm your personal food concierge. How may I assist you?",
      "A lovely afternoon! Let me guide you through our exceptional menu.",
    ];
  }
  
  // Evening: 3pm onwards
  return [
    "Good evening! Welcome to LUXE BITE. What brings you to us tonight?",
    "Good evening! I'm your personal food concierge. How may I enhance your dining experience?",
    "Good evening! It's my pleasure to guide you through our menu. What are you in the mood for?",
    "Greetings! I'm here to make your LUXE BITE experience exceptional. How may I assist you?",
  ];
};

const moodResponses: Record<string, string> = {
  romantic: "For a romantic evening, I have some exquisite suggestions. Our Butter-Poached Lobster with champagne beurre blanc sets the perfect mood, or perhaps the Truffle Burrata to start — both are favorites among couples celebrating love. 💕",
  indulgent: "Ah, you're in the mood to indulge! May I suggest our A5 Wagyu Ribeye? It's pure decadence. For dessert, our Dark Chocolate Soufflé is legendary. ✨",
  light: "For something lighter yet satisfying, our Mediterranean Branzino is a beautiful choice — delicate, fresh, and perfectly seasoned. The Tuna Tartare is also exquisite. 🌿",
  adventurous: "I love your adventurous spirit! Our Omakase Experience will take you on a culinary journey you won't forget. Chef's surprise courses await. 🔥",
};

const occasionResponses: Record<string, string> = {
  anniversary: "An anniversary! How wonderful. For such a special milestone, I'd recommend our Seasonal Tasting Menu with wine pairing. Seven courses of pure romance. We can also arrange special table decorations and a personalized dessert.",
  birthday: "Happy birthday celebrations! We can arrange a personalized dessert with a special touch. Our pastry chef creates magic with chocolate and custom decorations. Just let us know the celebrant's name!",
  business: "For a business dinner, I suggest dishes that are elegant yet easy to enjoy while conversing. The Wild Mushroom Risotto or Branzino are excellent choices. We also have private dining rooms available for important meetings.",
  date: "A date night deserves something memorable. Start with our Oysters Rockefeller — they're said to be an aphrodisiac — followed by dishes you can share. I recommend a romantic table by the window.",
  celebration: "Celebrating something special? We love to make moments memorable! Tell me more about the occasion and I'll help create the perfect dining experience.",
};

const pairingWisdom: Record<string, string> = {
  wagyu: "For the Wagyu, I'd suggest an aged Bordeaux or Cabernet Sauvignon. The tannins complement the rich marbling beautifully, creating a symphony of flavors.",
  lobster: "With the Lobster, a vintage Champagne or Chardonnay creates magic. The bubbles or buttery notes cleanse the palate between each luxurious bite.",
  risotto: "The Truffle Risotto pairs wonderfully with a Barolo or Pinot Noir — earthy meets earthy in perfect harmony.",
  dessert: "For dessert, consider a Tawny Port with chocolate, or a Moscato d'Asti with our fruit-based options. Our sommelier can guide you through our dessert wine selection.",
  curry: "Sri Lankan curries pair excellently with Riesling or Gewürztraminer — the slight sweetness balances the spices perfectly.",
};

export const generateResponse = (
  userMessage: string,
  context: ConversationContext
): { response: string; recommendations: MenuItem[] } => {
  const message = userMessage.toLowerCase();
  let response = "";
  let recommendations: MenuItem[] = [];

  // === GREETINGS ===
  if (message.match(/^(hi|hello|hey|good evening|greetings|good morning|good afternoon)/i)) {
    const greetings = getTimeBasedGreetings();
    response = greetings[Math.floor(Math.random() * greetings.length)];
    return { response, recommendations };
  }

  // === HELP & GENERAL QUESTIONS ===
  if (message.includes('help') || message.includes('how does') || message.includes('how do i')) {
    if (message.includes('order') || message.includes('place order')) {
      response = "Ordering is simple! Browse our Menu, add items to your cart, and proceed to checkout. For dine-in, you can reserve a table through our Reservations page. For any assistance, I'm here to help!";
    } else if (message.includes('reserve') || message.includes('book')) {
      response = "To reserve a table, visit our Reservations page, select your date, time, and party size. We'll confirm your booking instantly. For special requests, you can add notes during reservation.";
    } else if (message.includes('navigate') || message.includes('find')) {
      response = "I can help you find anything! We have Menu (browse dishes), Reservations (book tables), Our Story (meet our chefs), and Cart (checkout). What would you like to explore?";
    } else {
      response = "I'm here to assist with reservations, menu recommendations, dietary questions, wine pairings, special occasions, and anything else about LUXE BITE. What can I help you with today?";
    }
    return { response, recommendations };
  }

  // === RESERVATIONS ===
  if (message.includes('reserve') || message.includes('book') || message.includes('table') || message.includes('reservation')) {
    if (message.includes('how') || message.includes('cancel') || message.includes('modify')) {
      response = "To make, modify, or cancel a reservation, visit our Reservations page. You can select date, time, party size, and add special requests. For immediate assistance, call us at +94 759560114.";
    } else if (message.includes('time') || message.includes('hour') || message.includes('when open')) {
      response = "We're open Mon-Thu 5:30-10PM, Fri-Sat 5:00-11PM, and Sun 5:00-9PM. Reservations are recommended, especially for weekends and special occasions.";
    } else if (message.includes('how many') || message.includes('party size') || message.includes('large group')) {
      response = "We accommodate parties from 1 to 8+ guests. For groups of 9 or more, we offer private event options with customized menus. Just select '9+ (Private Event)' when booking!";
    } else {
      response = "I'd be delighted to help you reserve a table! Visit our Reservations page to select your preferred date and time. For special occasions, let me know so we can make it memorable!";
    }
    return { response, recommendations };
  }

  // === LOCATION & CONTACT ===
  if (message.includes('location') || message.includes('address') || message.includes('where') || message.includes('how to get')) {
    response = "We're located at OLD BOC LANE, KINNIYA - 04, TRINCOMALEE. Look for the elegant noir and gold facade. Parking is available nearby, and we're accessible via public transport.";
    return { response, recommendations };
  }

  if (message.includes('contact') || message.includes('phone') || message.includes('email') || message.includes('call')) {
    response = "You can reach us at:\n📧 Email: naveethkinniya2001@gmail.com\n📞 Phone: +94 759560114\n\nI'm also here to answer any questions immediately!";
    return { response, recommendations };
  }

  // === HOURS & AVAILABILITY ===
  if (message.includes('hour') || message.includes('open') || message.includes('close') || message.includes('timing')) {
    response = "Our hours:\n🕐 Mon-Thu: 5:30 PM - 10:00 PM\n🕐 Fri-Sat: 5:00 PM - 11:00 PM\n🕐 Sun: 5:00 PM - 9:00 PM\n\nWe recommend reservations for the best experience!";
    return { response, recommendations };
  }

  // === CHEFS & TEAM ===
  if (message.includes('chef') || message.includes('who cook') || message.includes('team')) {
    response = "Meet our exceptional culinary team:\n👨‍🍳 Chef Muhammed Naveeth - Executive Chef (Sri Lankan Cuisine, Rice & Curry)\n👨‍🍳 Chef Reyes - Pastry Chef (Sri Lankan Sweets, Kokis & Kavum)\n👨‍🍳 Chef Takeshi Yamamoto - Sushi Master (Seafood, Kottu Roti, Hoppers)\n👨‍🍳 Chef Dinesh Fernando - Curry Master (Lamprais, Devilled Dishes)\n\nVisit 'Our Story' to learn more about their culinary journeys!";
    return { response, recommendations };
  }

  // === MOOD RESPONSES ===
  for (const [mood, moodResponse] of Object.entries(moodResponses)) {
    if (message.includes(mood) || 
        (mood === 'romantic' && (message.includes('romance') || message.includes('love') || message.includes('partner') || message.includes('couple'))) ||
        (mood === 'indulgent' && (message.includes('indulge') || message.includes('treat') || message.includes('splurge') || message.includes('luxury'))) ||
        (mood === 'light' && (message.includes('fresh') || message.includes('healthy') || message.includes('clean eating'))) ||
        (mood === 'adventurous' && (message.includes('adventure') || message.includes('surprise') || message.includes('new') || message.includes('exotic')))) {
      response = moodResponse;
      recommendations = getItemsByMood(mood).slice(0, 3);
      return { response, recommendations };
    }
  }

  // === OCCASION RESPONSES ===
  for (const [occasion, occasionResponse] of Object.entries(occasionResponses)) {
    if (message.includes(occasion) || 
        (occasion === 'anniversary' && (message.includes('celebrating') || message.includes('milestone'))) ||
        (occasion === 'birthday' && (message.includes('bday') || message.includes('b-day'))) ||
        (occasion === 'business' && (message.includes('client') || message.includes('meeting') || message.includes('corporate'))) ||
        (occasion === 'date' && (message.includes('first date') || message.includes('dinner date')))) {
      response = occasionResponse;
      recommendations = menuItems.filter(item => 
        item.moods.includes('romantic') || item.featured
      ).slice(0, 3);
      return { response, recommendations };
    }
  }

  // === DIETARY RESTRICTIONS ===
  if (message.includes('vegetarian') || message.includes('vegan') || message.includes('no meat')) {
    response = "We have lovely vegetarian options! Our Wild Mushroom Risotto is sublime — earthy and comforting. The Truffle Burrata is vegetarian-friendly and absolutely divine. Many of our appetizers and sides are also vegetarian.";
    recommendations = menuItems.filter(item => 
      item.dietary?.includes('vegetarian')
    );
    return { response, recommendations };
  }

  if (message.includes('gluten') || message.includes('celiac') || message.includes('gluten-free')) {
    response = "Many of our dishes are naturally gluten-free! I'd recommend the A5 Wagyu, the Butter-Poached Lobster, or our Branzino — all prepared without gluten. Let me know your selection and I'll confirm with the kitchen.";
    recommendations = menuItems.filter(item => 
      item.dietary?.includes('gluten-free')
    ).slice(0, 3);
    return { response, recommendations };
  }

  if (message.includes('dairy') || message.includes('lactose') || message.includes('milk')) {
    response = "We can accommodate dairy-free requirements! Many seafood and meat dishes are naturally dairy-free, and our chefs can modify others. The Tuna Tartare and Branzino are excellent dairy-free options.";
    recommendations = menuItems.filter(item => 
      !item.name.toLowerCase().includes('butter') && !item.name.toLowerCase().includes('cheese')
    ).slice(0, 3);
    return { response, recommendations };
  }

  if (message.includes('allerg') || message.includes('intolerance')) {
    response = "Food allergies are serious, and we take them seriously too. Please inform your server about any allergies when ordering, and our kitchen will prepare your meal with extra care. Common allergens we can accommodate include nuts, shellfish, dairy, and gluten.";
    return { response, recommendations };
  }

  if (message.includes('spicy') || message.includes('spice level') || message.includes('hot')) {
    response = "Many of our Sri Lankan dishes have authentic spice levels, but we can adjust to your preference! Our devilled dishes and curries can range from mild to very spicy. Just let us know your comfort level when ordering.";
    recommendations = menuItems.filter(item => 
      item.name.toLowerCase().includes('curry') || item.name.toLowerCase().includes('devilled')
    ).slice(0, 3);
    return { response, recommendations };
  }

  // === WINE & BEVERAGE PAIRING ===
  if (message.includes('pair') || message.includes('wine') || message.includes('drink') || message.includes('beverage')) {
    for (const [dish, pairing] of Object.entries(pairingWisdom)) {
      if (message.includes(dish)) {
        response = pairing;
        return { response, recommendations };
      }
    }
    if (message.includes('recommend wine') || message.includes('which wine')) {
      response = "Wine pairing is my passion! We have:\n🍷 Bold Reds (Bordeaux, Cabernet) - pairs with Wagyu\n🥂 Champagne & Sparklings - perfect with seafood\n🍾 Whites (Chardonnay, Riesling) - complements lighter dishes\n🍷 Rosé - versatile with many courses\n\nTell me which dish you're considering!";
    } else if (message.includes('cocktail') || message.includes('mixed drink')) {
      response = "Our bar crafts signature cocktails that complement our cuisine beautifully. Classic options include Old Fashioneds, Martinis, and seasonal specialties. Would you like recommendations based on your meal?";
    } else if (message.includes('non-alcoholic') || message.includes('mocktail') || message.includes('no alcohol')) {
      response = "We offer elegant non-alcoholic options including artisanal mocktails, premium teas, fresh juices, and sparkling waters. Perfect for pairing with any meal!";
    } else {
      response = "Wine pairing is my passion. Tell me which dish you're considering, and I'll suggest the perfect complement. We also offer cocktails, mocktails, and specialty beverages!";
    }
    return { response, recommendations };
  }

  // === MENU CATEGORIES ===
  if (message.includes('appetizer') || message.includes('starter') || message.includes('first course')) {
    response = "For starters, our Truffle Burrata is a guest favorite — creamy, aromatic, and absolutely indulgent. The Tuna Tartare offers a lighter, fresher option. The Oysters Rockefeller are perfect for special occasions!";
    recommendations = menuItems.filter(item => item.category === 'appetizers').slice(0, 3);
    return { response, recommendations };
  }

  if (message.includes('main') || message.includes('entrée') || message.includes('entree') || message.includes('main course')) {
    response = "For your main course, the choice often comes down to your mood:\n🥩 Rich & Bold? The A5 Wagyu Ribeye\n🦞 Elegant & Refined? The Butter-Poached Lobster\n🐟 Light & Fresh? The Mediterranean Branzino\n🍛 Authentic Sri Lankan? Black Pork Curry or Kottu Roti\n\nWhat appeals to you?";
    recommendations = menuItems.filter(item => item.category === 'mains').slice(0, 4);
    return { response, recommendations };
  }

  if (message.includes('dessert') || message.includes('sweet') || message.includes('after dinner')) {
    response = "Save room for dessert! Our Dark Chocolate Soufflé is legendary — it takes 20 minutes, so order early. The Crème Brûlée is perfect for vanilla lovers. For something lighter, try our seasonal fruit tart!";
    recommendations = menuItems.filter(item => item.category === 'desserts');
    return { response, recommendations };
  }

  if (message.includes('chef') && (message.includes('special') || message.includes('selection'))) {
    response = "Chef's Selection features our most exceptional dishes prepared with the finest ingredients. These change seasonally but always represent the pinnacle of our culinary artistry. Currently featuring the A5 Wagyu, Lobster, and special seasonal preparations!";
    recommendations = menuItems.filter(item => item.category === 'chefs-selection' || item.featured).slice(0, 3);
    return { response, recommendations };
  }

  // === SPECIFIC DISHES ===
  if (message.includes('wagyu') || message.includes('beef') || message.includes('steak')) {
    response = "Our A5 Wagyu Ribeye is extraordinary — imported Japanese beef with perfect marbling. It's served with truffle mashed potatoes and seasonal vegetables. At Rs 3250, it's an indulgence worth every rupee.";
    recommendations = menuItems.filter(item => item.name.toLowerCase().includes('wagyu'));
    return { response, recommendations };
  }

  if (message.includes('lobster') || message.includes('seafood luxury')) {
    response = "The Butter-Poached Lobster Tail with champagne beurre blanc and caviar is pure elegance. Tender, sweet lobster meat in a silky sauce — it's one of our signature dishes. Rs 2800.";
    recommendations = menuItems.filter(item => item.name.toLowerCase().includes('lobster'));
    return { response, recommendations };
  }

  if (message.includes('curry') || message.includes('sri lankan')) {
    response = "Our authentic Sri Lankan curries are exceptional! The Black Pork Curry is a house specialty — slow-cooked with roasted Sri Lankan spices. We also have Kottu Roti, Lamprais, and Hoppers. All prepared by Chef Dinesh Fernando using traditional methods.";
    recommendations = menuItems.filter(item => 
      item.name.toLowerCase().includes('curry') || 
      item.name.toLowerCase().includes('kottu') ||
      item.name.toLowerCase().includes('hopper')
    ).slice(0, 3);
    return { response, recommendations };
  }

  if (message.includes('fish') || message.includes('branzino')) {
    response = "The Mediterranean Branzino is a beautiful choice — delicate, fresh European sea bass with lemon-herb butter, asparagus, and roasted tomatoes. Light yet satisfying. Rs 1850.";
    recommendations = menuItems.filter(item => item.name.toLowerCase().includes('branzino') || item.name.toLowerCase().includes('fish'));
    return { response, recommendations };
  }

  // === RECOMMENDATIONS ===
  if (message.includes('recommend') || message.includes('suggest') || message.includes('what should') || message.includes('best')) {
    if (message.includes('popular') || message.includes('most ordered') || message.includes('favorite')) {
      response = "Our most beloved dishes:\n⭐ A5 Wagyu Ribeye - for meat lovers\n⭐ Butter-Poached Lobster - seafood excellence\n⭐ Black Pork Curry - authentic Sri Lankan\n⭐ Dark Chocolate Soufflé - legendary dessert\n\nAll are extraordinary!";
      recommendations = menuItems.filter(item => item.featured || item.category === 'chefs-selection').slice(0, 4);
    } else if (message.includes('tonight') || message.includes('today')) {
      response = "Based on what's exceptional today, I'd suggest our A5 Wagyu — it's perfectly marbled — or if seafood speaks to you, the Butter-Poached Lobster with caviar is transcendent. For something authentically Sri Lankan, the Black Pork Curry is outstanding.";
      recommendations = menuItems.filter(item => item.featured);
    } else {
      response = "I'd love to recommend something perfect for you! Are you in the mood for:\n🥩 Rich & Indulgent?\n🦞 Light & Elegant?\n🍛 Bold & Spicy (Sri Lankan)?\n🌿 Vegetarian?\n\nOr tell me about the occasion!";
    }
    return { response, recommendations };
  }

  // === PRICE & VALUE ===
  if (message.includes('price') || message.includes('cost') || message.includes('budget') || message.includes('expensive') || message.includes('cheap')) {
    if (message.includes('range') || message.includes('between')) {
      response = "Our dishes range from Rs 400 to Rs 3250:\n💚 Rs 400-800: Appetizers, sides\n💛 Rs 1200-1900: Main courses, curries\n🧡 Rs 2000-2800: Premium seafood\n❤️ Rs 3250: A5 Wagyu (ultimate indulgence)\n\nEvery dish offers exceptional value for its quality!";
    } else {
      response = "For exceptional value, I recommend:\n✨ Black Pork Curry - Rs 1650 (authentic Sri Lankan perfection)\n✨ Kottu Roti - Rs 1450 (traditional favorite)\n✨ Wild Mushroom Risotto - Rs 1550 (vegetarian excellence)\n\nAll offer restaurant-quality execution at fair prices!";
      recommendations = menuItems.filter(item => item.price < 2000).slice(0, 3);
    }
    return { response, recommendations };
  }

  // === DELIVERY & TAKEOUT ===
  if (message.includes('delivery') || message.includes('takeout') || message.includes('take out') || message.includes('take away')) {
    response = "Yes! We offer delivery and takeout. Browse our menu, add items to cart, and select delivery at checkout. Delivery fee is Rs 200 (free over Rs 5000). Our dishes are carefully packaged to maintain quality.";
    return { response, recommendations };
  }

  // === SPECIAL REQUESTS ===
  if (message.includes('private') || message.includes('event') || message.includes('party')) {
    response = "We host private events for groups of 9+! Our private dining room seats up to 20 guests. We offer customized menus, wine pairings, and personalized service. Email naveeth@luxebite.com or call +94 759560114 to discuss your event.";
    return { response, recommendations };
  }

  if (message.includes('gift') || message.includes('voucher') || message.includes('certificate')) {
    response = "Gift cards are perfect for food lovers! Contact us at naveeth@luxebite.com or +94 759560114 to purchase. Available in any denomination. A thoughtful gift for any occasion!";
    return { response, recommendations };
  }

  if (message.includes('dress code') || message.includes('what to wear') || message.includes('attire')) {
    response = "We embrace smart casual to formal attire. Think elegant yet comfortable — you'll feel right at home whether in a cocktail dress or tailored blazer. The ambiance is sophisticated but welcoming!";
    return { response, recommendations };
  }

  // === TASTING MENU ===
  if (message.includes('tasting') || message.includes('course menu') || message.includes('omakase')) {
    response = "Our Seasonal Tasting Menu is a 7-course culinary journey showcasing the best of our kitchen. Each course is carefully paired with wines. It's perfect for special occasions and adventurous diners. Advance reservation required!";
    return { response, recommendations };
  }

  // === PAYMENT ===
  if (message.includes('payment') || message.includes('pay') || message.includes('credit card') || message.includes('cash')) {
    response = "We accept all major payment methods:\n💳 Credit/Debit Cards\n💵 Cash on Delivery\n🏦 Bank Transfer\n\nAll transactions are secure and encrypted!";
    return { response, recommendations };
  }

  // === THANK YOU / FEEDBACK ===
  if (message.includes('thank') || message.includes('appreciate')) {
    response = "It's my absolute pleasure! I'm here whenever you need assistance. Enjoy your exceptional dining experience at LUXE BITE! 🌟";
    return { response, recommendations };
  }

  // === DEFAULT RESPONSE ===
  response = "I'd love to help you discover the perfect experience tonight! I can assist with:\n\n🍽️ Menu recommendations\n📅 Reservations\n🍷 Wine pairings\n🎉 Special occasions\n✨ Dietary preferences\n📍 Location & hours\n\nWhat would you like to know?";
  return { response, recommendations };
};

export const getInitialGreeting = (): string => {
  const greetings = getTimeBasedGreetings();
  return greetings[Math.floor(Math.random() * greetings.length)];
};