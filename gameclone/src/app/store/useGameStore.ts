import { create } from 'zustand';

export interface Game {
  id: number;
  title: string;
  category: string;
  originalPrice?: number;
  discount?: number;
  image: string;
  isFree?: boolean;
  description?: string;
  freeUntil?: string; 
}

interface GameState {
  heroGames: Game[];
  discountedGames: Game[];
  featuredRow: Game[];
  freeGames: Game[];
  games: Game[];   
  bestSellers: Game[];
  topSellers: Game[];
  topUpcoming: Game[]; 
  filteredGames: Game[];
  selectedHero: Game | null; 
  setSelectedHero: (game: Game) => void;
  searchGames: (query: string) => void;
  filterByCategory: (category: string) => void;
  setInitialGames: () => void;
}

// 1. WE MOVE THE ARRAYS OUTSIDE THE STORE SO 'setInitialGames' CAN SEE THEM
const heroList: Game[] = [
  { id: 1, title: "God of War 4", category: "Action", image: "/god_of_war.png", originalPrice: 2659, isFree: false, description: "Kratos now lives as a man in the realm of Norse Gods..." },
  { id: 2, title: "Farcry 6 Golden Edition", category: "Action", image: "/farcy.jpg", isFree: true, description: "Dive into the gritty world of a modern-day guerrilla revolution..." },
  { id: 3, title: "GTA V", category: "RPG", originalPrice: 2999, discount: 50, image: "/GTA.jpg", isFree: false, description: "Experience the ultimate open-world action game..." },
  { id: 4, title: "Outlast 2", category: "Horror", image: "/outlast.png", isFree: true, description: "A twisted journey into the depths of the human mind..." },
];

const discountList: Game[] = [
  { id: 5, title: "Valorant", category: "Shooter", originalPrice: 900, discount: 10, image: "/valorant.jpg", isFree: false, description: "A 5v5 character-based tactical shooter..." },
  { id: 6, title: "Assassin's Creed", category: "Action", originalPrice: 3499, discount: 10, image: "/game.png", isFree: false, description: "Relive the high-stakes struggle of the Assassins..." },
  { id: 7, title: "Red Dead 2", category: "Action", originalPrice: 3199, discount: 50, image: "/redDead.png", isFree: false, description: "An epic tale of life in America's unforgiving heartland..." },
  { id: 8, title: "Tomb Raider", category: "Action", originalPrice: 2195, discount: 20, image: "/TombRider.png", isFree: false, description: "Join Lara Croft on her first expedition..." },
  { id: 9, title: "Cyberpunk", category: "Action", originalPrice: 4000, discount: 50, image: "/cyberpink.png", isFree: false, description: "An open-world, action-adventure story..." }
];

const featuredList: Game[] = [
  { id: 10, title: "NFS Unbound", category: "Racing", originalPrice: 3499, image: "/car.jpg", isFree: false, description: "Pre-purchase NFS Unbound and get exclusive rewards..." },
  { id: 11, title: "FIFA 23", category: "Sports", originalPrice: 3999, image: "/fifa.jpg", isFree: false, description: "FIFA 23 brings The World’s Game to the pitch..." },
  { id: 12, title: "Uncharted 4", category: "Action", originalPrice: 3299, image: "/uncharted.jpg", isFree: false, description: "A Thief's End. Nathan Drake's greatest adventure yet." },
];

const freeList: Game[] = [
  { id: 13, title: "Darkwood", category: "Horror", image: "/darkwood.jpg", isFree: true, freeUntil: "Free Now - Jul 25", description: "A challenging survival horror..." },
  { id: 14, title: "Assasian's creed Black Flag", category: "Battle", image: "/assasins.jpg", isFree: true, freeUntil: "Free Jul 27 - Aug 5", description: "Become a pirate assassin..." },
  { id: 15, title: "NFS: Shift", category: "Racing", image: "/shift.jpg", isFree: true, freeUntil: "Free Jul 27 - Aug 5", description: "Experience a true driver's experience..." },
  { id: 16, title: "Warface", category: "Battle", image: "/warface.jpg", isFree: true, freeUntil: "Free Jul 27 - Aug 5", description: "A contemporary first-person shooter..." }
];

const topSellersList: Game[] = [
  { id: 20, title: "Ghostbusters: Spirits Unleashed", category: "Horror", originalPrice: 939, image: "/host.jpg", isFree: false, description: "An asymmetrical multiplayer game..." },
  { id: 21, title: "GTA V : Premier edition", originalPrice: 2499, category:"RPG", image: "/gta.jpg", isFree: false, description: "Includes the complete story experience..." },
  { id: 22, title: "Daysgone", originalPrice: 2699, category:"RPG", image: "/daysgone.jpg", isFree: false, description: "Ride and fight into a deadly, post-pandemic America..." },
  { id: 23, title: "Last of Us", originalPrice: 1499, category:"Action", image: "/last.jpg", isFree: false, description: "In a ravaged civilization..." },
  { id: 24, title: "God of War 4", originalPrice: 2659, category:"RPG", image: "/god_of_war.png", isFree: false, description: "Kratos must adapt to unfamiliar lands..." },
];

const bestSellerList: Game[] = [
  { id: 25, title: "Fortnite", category:"Action", image: "/fort.jpg", isFree: true, description: "The ultimate battle royale experience..." },
  { id: 26, title: "GTA V : Premier edition", originalPrice: 2499, category:"RPG", image: "/gta.jpg", isFree: false, description: "Explore the award-winning world of Los Santos..." },
  { id: 27, title: "IGI 2", originalPrice: 499, category:"Royal Battle", image: "/igi.jpg", isFree: false, description: "A stealth-based first-person shooter..." },
  { id: 28, title: "Tomb Raider", originalPrice: 2499, category:"RPG", image: "/TombRider.png", isFree: false, description: "Discover the origins of Lara Croft..." },
  { id: 29, title: "Uncharted 4", originalPrice: 3499, category:"Action", image: "/uncharted.jpg", isFree: false, description: "Embark on a global journey..." },
];

const topUpcomingList: Game[] = [
  { id: 30, title: "Hogwarts Legacy", originalPrice: 2999, category:"Action", image: "/hog.jpg", isFree: false, description: "Experience Hogwarts in the 1800s..." },
  { id: 31, title: "Uncharted Legacy of Thieves", originalPrice: 4499, category:"RPG", image: "/legacy.jpg", isFree: false, description: "Seek your fortune..." },
  { id: 32, title: "Assasians Creed Mirage", originalPrice: 3499, category:"Battle", image: "/creed.jpg", isFree: false, description: "Experience the story of Basim..." },
  { id: 33, title: "Last of US || ", originalPrice: 3999, category:"RPG", image: "/lastt.jpg", isFree: false, description: "Five years after their perilous journey..." },
  { id: 34, title: "Dead By Daylight", category:"RPG", image: "/dead.jpg", freeUntil: "coming soon", description: "A multiplayer horror game..." },
];

const allGames = [...heroList, ...discountList, ...featuredList, ...freeList, ...topSellersList, ...bestSellerList, ...topUpcomingList];

export const useGameStore = create<GameState>((set) => ({
  heroGames: heroList,
  discountedGames: discountList,
  featuredRow: featuredList,
  freeGames: freeList,
  topSellers: topSellersList,
  bestSellers: bestSellerList,
  topUpcoming: topUpcomingList,
  games: allGames,
  filteredGames: allGames,
  selectedHero: heroList[0],

  setSelectedHero: (game) => set({ selectedHero: game }),

  setInitialGames: () => set({ 
    filteredGames: allGames,
    selectedHero: heroList[0],
    heroGames: heroList,
    discountedGames: discountList,
    freeGames: freeList,
    topSellers: topSellersList,
    bestSellers: bestSellerList,
    topUpcoming: topUpcomingList,
  }),

  searchGames: (query) => set((state) => ({
    filteredGames: state.games.filter(game =>
      game.title.toLowerCase().includes(query.toLowerCase())
    )
  })),

  filterByCategory: (category) => set((state) => ({
    filteredGames: category === 'All'
      ? state.games
      : state.games.filter(game => game.category === category)
  })),
}));