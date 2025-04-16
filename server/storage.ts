import {
  users, type User, type InsertUser, 
  Destination, InsertDestination, 
  Package, InsertPackage, 
  destinations, packages,
  Hotel, InsertHotel, hotels,
  Room, InsertRoom, rooms,
  Booking, InsertBooking, bookings,
  packageDestinations, packageHotels
} from "@shared/schema";
import { db } from "./db";
import { eq, and, sql, desc, asc } from "drizzle-orm";
import connectPg from "connect-pg-simple";
import session from "express-session";
import { pool } from "./db";

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

  // Session store
  sessionStore: session.Store;
}

export class DatabaseStorage implements IStorage {
  sessionStore: session.Store;

  constructor() {
    const PostgresSessionStore = connectPg(session);
    this.sessionStore = new PostgresSessionStore({ 
      pool, 
      createTableIfMissing: true 
    });
    
    // Initialize the database with sample data if it's empty
    this.initSampleData();
  }

  private async initSampleData() {
    // Check if we have any destinations
    const existingDestinations = await db.select().from(destinations).limit(1);
    
    if (existingDestinations.length === 0) {
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
          galleryImages: [],
          rating: 4.5,
          reviewCount: 128,
          isPopular: false,
          isFeatured: true,
          includedServices: ["5-star hotel accommodation", "All meals included", "Private guided tours"],
          excludedServices: ["International flights", "Personal expenses", "Travel insurance"],
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
          galleryImages: [],
          rating: 5.0,
          reviewCount: 205,
          isPopular: false,
          isFeatured: true,
          includedServices: ["Luxury hotel", "Desert safari", "Burj Khalifa entry"],
          excludedServices: ["International flights", "Personal expenses", "Travel insurance"],
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
          galleryImages: [],
          rating: 4.0,
          reviewCount: 89,
          isPopular: false,
          isFeatured: true,
          includedServices: ["Guided tour", "Authentic meals", "Local transport"],
          excludedServices: ["International flights", "Personal expenses", "Travel insurance"],
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
          galleryImages: [],
          rating: 4.5,
          reviewCount: 176,
          isPopular: false,
          isFeatured: true,
          includedServices: ["All-inclusive resort", "Water activities", "Beach access"],
          excludedServices: ["International flights", "Personal expenses", "Travel insurance"],
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
          galleryImages: [],
          rating: 4.7,
          reviewCount: 238,
          isPopular: true,
          isFeatured: false,
          includedServices: ["Visit the Great Pyramids & Sphinx", "Nile cruise with full board", "All transfers & guided tours included"],
          excludedServices: ["International flights", "Personal expenses", "Travel insurance"],
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
          galleryImages: [],
          rating: 4.9,
          reviewCount: 182,
          isPopular: true,
          isFeatured: false,
          includedServices: ["Private city tour with Burj Khalifa access", "Desert safari with dinner show", "Yacht tour around Palm Jumeirah"],
          excludedServices: ["International flights", "Personal expenses", "Travel insurance"],
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
          galleryImages: [],
          rating: 4.6,
          reviewCount: 156,
          isPopular: true,
          isFeatured: false,
          includedServices: ["Guided tour of Petra with local expert", "Overnight in Bedouin camp at Wadi Rum", "Float in the Dead Sea"],
          excludedServices: ["International flights", "Personal expenses", "Travel insurance"],
          type: "ECO-FRIENDLY",
          locations: ["Amman", "Petra", "Wadi Rum", "Dead Sea"]
        }
      ];

      // Add sample destinations
      for (const destination of sampleDestinations) {
        await this.createDestination(destination);
      }

      // Add sample packages
      for (const pkg of samplePackages) {
        await this.createPackage(pkg);
      }
    }
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  // Destination methods
  async getAllDestinations(): Promise<Destination[]> {
    return await db.select().from(destinations);
  }

  async getDestination(id: number): Promise<Destination | undefined> {
    const [destination] = await db.select().from(destinations).where(eq(destinations.id, id));
    return destination;
  }

  async getPopularDestinations(): Promise<Destination[]> {
    return await db.select().from(destinations).where(eq(destinations.isPopular, true));
  }

  async createDestination(insertDestination: InsertDestination): Promise<Destination> {
    const [destination] = await db.insert(destinations).values(insertDestination).returning();
    return destination;
  }

  // Package methods
  async getAllPackages(): Promise<Package[]> {
    return await db.select().from(packages);
  }

  async getPackage(id: number): Promise<Package | undefined> {
    const [pkg] = await db.select().from(packages).where(eq(packages.id, id));
    return pkg;
  }

  async getFeaturedPackages(): Promise<Package[]> {
    return await db.select().from(packages).where(eq(packages.isFeatured, true));
  }

  async getPopularPackages(): Promise<Package[]> {
    return await db.select().from(packages).where(eq(packages.isPopular, true));
  }

  async createPackage(insertPackage: InsertPackage): Promise<Package> {
    const [pkg] = await db.insert(packages).values(insertPackage).returning();
    return pkg;
  }
}

export const storage = new DatabaseStorage();
