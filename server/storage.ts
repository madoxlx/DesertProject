import { users, type User, type InsertUser, Destination, InsertDestination, Package, InsertPackage, destinations, packages } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Destination methods
  getAllDestinations(): Promise<Destination[]>;
  getDestination(id: number): Promise<Destination | undefined>;
  getPopularDestinations(): Promise<Destination[]>;
  createDestination(destination: InsertDestination): Promise<Destination>;

  // Package methods
  getAllPackages(): Promise<Package[]>;
  getPackage(id: number): Promise<Package | undefined>;
  getFeaturedPackages(): Promise<Package[]>;
  getPopularPackages(): Promise<Package[]>;
  createPackage(pkg: InsertPackage): Promise<Package>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private destinations: Map<number, Destination>;
  private packages: Map<number, Package>;
  private userCurrentId: number;
  private destinationCurrentId: number;
  private packageCurrentId: number;

  constructor() {
    this.users = new Map();
    this.destinations = new Map();
    this.packages = new Map();
    this.userCurrentId = 1;
    this.destinationCurrentId = 1;
    this.packageCurrentId = 1;

    // Initialize with sample data
    this.initSampleData();
  }

  private initSampleData() {
    // Sample destinations
    const sampleDestinations: InsertDestination[] = [
      {
        name: "Cairo",
        country: "Egypt",
        city: "Cairo",
        description: "Explore the ancient pyramids and rich history",
        imageUrl: "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
        isPopular: true
      },
      {
        name: "Dubai",
        country: "UAE",
        city: "Dubai",
        description: "Experience luxury and modern architecture",
        imageUrl: "https://images.unsplash.com/photo-1518684079-3c830dcef090?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
        isPopular: true
      },
      {
        name: "Petra",
        country: "Jordan",
        city: "Petra",
        description: "Discover the ancient city carved in stone",
        imageUrl: "https://images.unsplash.com/photo-1579033385971-a7bc2c6f8c46?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
        isPopular: true
      },
      {
        name: "Dead Sea",
        country: "Jordan",
        city: "Dead Sea",
        description: "Float in the world-famous salt-rich waters",
        imageUrl: "https://images.unsplash.com/photo-1605833556294-ea5c7a74f57d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
        isPopular: true
      },
      {
        name: "Luxor",
        country: "Egypt",
        city: "Luxor",
        description: "Visit the Valley of Kings and ancient temples",
        imageUrl: "https://images.unsplash.com/photo-1560611588-163f49705216?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
        isPopular: true
      },
      {
        name: "Riyadh",
        country: "Saudi Arabia",
        city: "Riyadh",
        description: "Discover the modern capital and rich culture",
        imageUrl: "https://images.unsplash.com/photo-1590155387686-a4a9c49588bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
        isPopular: true
      }
    ];

    // Sample packages
    const samplePackages: InsertPackage[] = [
      {
        title: "Cairo & Luxor Package",
        description: "Explore the pyramids and ancient temples on this exclusive tour package.",
        country: "Egypt",
        days: 8,
        nights: 7,
        price: 1200,
        discountedPrice: 960,
        discountPercentage: 20,
        imageUrl: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
        rating: 4.5,
        reviewCount: 128,
        isPopular: false,
        isFeatured: true,
        includedServices: ["5-star hotel accommodation", "All meals included", "Private guided tours"],
        type: "BESTSELLER",
        locations: ["Cairo", "Luxor"]
      },
      {
        title: "Dubai City Tour",
        description: "Experience the luxury and glamour of Dubai with this exclusive city tour.",
        country: "UAE",
        days: 5,
        nights: 4,
        price: 1500,
        discountedPrice: 1275,
        discountPercentage: 15,
        imageUrl: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
        rating: 5.0,
        reviewCount: 205,
        isPopular: false,
        isFeatured: true,
        includedServices: ["Luxury hotel", "Desert safari", "Burj Khalifa entry"],
        type: "",
        locations: ["Dubai City", "Palm Jumeirah"]
      },
      {
        title: "Petra Adventure",
        description: "Discover the ancient city of Petra and experience Jordanian hospitality.",
        country: "Jordan",
        days: 4,
        nights: 3,
        price: 850,
        discountedPrice: null,
        discountPercentage: null,
        imageUrl: "https://images.unsplash.com/photo-1579033385971-a7bc2c6f8c46?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
        rating: 4.0,
        reviewCount: 89,
        isPopular: false,
        isFeatured: true,
        includedServices: ["Guided tour", "Authentic meals", "Local transport"],
        type: "NEW",
        locations: ["Petra"]
      },
      {
        title: "Red Sea Resort",
        description: "Relax and enjoy the beautiful beaches of the Red Sea in this all-inclusive resort.",
        country: "Egypt",
        days: 8,
        nights: 7,
        price: 1100,
        discountedPrice: null,
        discountPercentage: null,
        imageUrl: "https://images.unsplash.com/photo-1570213489059-0aac6626d401?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
        rating: 4.5,
        reviewCount: 176,
        isPopular: false,
        isFeatured: true,
        includedServices: ["All-inclusive resort", "Water activities", "Beach access"],
        type: "POPULAR",
        locations: ["Red Sea"]
      },
      {
        title: "Egypt Explorer",
        description: "Experience authentic culture, breathtaking landscapes, and unforgettable adventures.",
        country: "Egypt",
        days: 8,
        nights: 7,
        price: 1299,
        discountedPrice: null,
        discountPercentage: null,
        imageUrl: "https://images.unsplash.com/photo-1581008685504-7a71a2857ce3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
        rating: 4.7,
        reviewCount: 238,
        isPopular: true,
        isFeatured: false,
        includedServices: ["Visit the Great Pyramids & Sphinx", "Nile cruise with full board", "All transfers & guided tours included"],
        type: "BESTSELLER",
        locations: ["Cairo", "Luxor", "Aswan"]
      },
      {
        title: "Dubai Luxury",
        description: "Experience the luxury and glamour of Dubai with this exclusive city tour.",
        country: "UAE",
        days: 6,
        nights: 5,
        price: 1899,
        discountedPrice: null,
        discountPercentage: null,
        imageUrl: "https://images.unsplash.com/photo-1566066507034-8fd771957390?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
        rating: 4.9,
        reviewCount: 182,
        isPopular: true,
        isFeatured: false,
        includedServices: ["Private city tour with Burj Khalifa access", "Desert safari with dinner show", "Yacht tour around Palm Jumeirah"],
        type: "LUXURY",
        locations: ["Dubai City", "Palm Jumeirah"]
      },
      {
        title: "Jordan Discovery",
        description: "Discover the ancient city of Petra and experience Jordanian hospitality.",
        country: "Jordan",
        days: 7,
        nights: 6,
        price: 1499,
        discountedPrice: null,
        discountPercentage: null,
        imageUrl: "https://images.unsplash.com/photo-1607607294965-6d43c473ecaa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
        rating: 4.6,
        reviewCount: 156,
        isPopular: true,
        isFeatured: false,
        includedServices: ["Guided tour of Petra with local expert", "Overnight in Bedouin camp at Wadi Rum", "Float in the Dead Sea"],
        type: "ECO-FRIENDLY",
        locations: ["Amman", "Petra", "Wadi Rum", "Dead Sea"]
      }
    ];

    // Add sample destinations
    sampleDestinations.forEach(destination => {
      this.createDestination(destination);
    });

    // Add sample packages
    samplePackages.forEach(pkg => {
      this.createPackage(pkg);
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Destination methods
  async getAllDestinations(): Promise<Destination[]> {
    return Array.from(this.destinations.values());
  }

  async getDestination(id: number): Promise<Destination | undefined> {
    return this.destinations.get(id);
  }

  async getPopularDestinations(): Promise<Destination[]> {
    return Array.from(this.destinations.values()).filter(
      (destination) => destination.isPopular
    );
  }

  async createDestination(insertDestination: InsertDestination): Promise<Destination> {
    const id = this.destinationCurrentId++;
    const destination: Destination = { ...insertDestination, id };
    this.destinations.set(id, destination);
    return destination;
  }

  // Package methods
  async getAllPackages(): Promise<Package[]> {
    return Array.from(this.packages.values());
  }

  async getPackage(id: number): Promise<Package | undefined> {
    return this.packages.get(id);
  }

  async getFeaturedPackages(): Promise<Package[]> {
    return Array.from(this.packages.values()).filter(
      (pkg) => pkg.isFeatured
    );
  }

  async getPopularPackages(): Promise<Package[]> {
    return Array.from(this.packages.values()).filter(
      (pkg) => pkg.isPopular
    );
  }

  async createPackage(insertPackage: InsertPackage): Promise<Package> {
    const id = this.packageCurrentId++;
    const pkg: Package = { ...insertPackage, id };
    this.packages.set(id, pkg);
    return pkg;
  }
}

export const storage = new MemStorage();
