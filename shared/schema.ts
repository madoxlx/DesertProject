import { pgTable, text, serial, integer, boolean, date, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Base User Schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull(),
  firstName: text("first_name"),
  lastName: text("last_name"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  firstName: true,
  lastName: true,
});

// Destinations Schema
export const destinations = pgTable("destinations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  country: text("country").notNull(),
  city: text("city").notNull(),
  description: text("description"),
  imageUrl: text("image_url"),
  isPopular: boolean("is_popular").default(false),
});

export const insertDestinationSchema = createInsertSchema(destinations).pick({
  name: true,
  country: true,
  city: true,
  description: true,
  imageUrl: true,
  isPopular: true,
});

// Packages Schema
export const packages = pgTable("packages", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  country: text("country").notNull(),
  days: integer("days").notNull(),
  nights: integer("nights").notNull(),
  price: real("price").notNull(),
  discountedPrice: real("discounted_price"),
  discountPercentage: integer("discount_percentage"),
  imageUrl: text("image_url"),
  rating: real("rating"),
  reviewCount: integer("review_count"),
  isPopular: boolean("is_popular").default(false),
  isFeatured: boolean("is_featured").default(false),
  includedServices: text("included_services").array(),
  type: text("type"), // e.g., 'LUXURY', 'BESTSELLER', 'ECO-FRIENDLY'
  locations: text("locations").array(),
});

export const insertPackageSchema = createInsertSchema(packages).pick({
  title: true,
  description: true,
  country: true,
  days: true,
  nights: true,
  price: true,
  discountedPrice: true,
  discountPercentage: true,
  imageUrl: true,
  rating: true,
  reviewCount: true,
  isPopular: true,
  isFeatured: true,
  includedServices: true,
  type: true,
  locations: true,
});

// Define types from schemas
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertDestination = z.infer<typeof insertDestinationSchema>;
export type Destination = typeof destinations.$inferSelect;

export type InsertPackage = z.infer<typeof insertPackageSchema>;
export type Package = typeof packages.$inferSelect;

// Filter Schemas for data filtering
export const flightFilterSchema = z.object({
  from: z.string().optional(),
  to: z.string().optional(),
  date: z.string().optional(),
  passengers: z.number().min(1).optional(),
  flightClass: z.enum(['economy', 'business', 'first']).optional(),
});

export const hotelFilterSchema = z.object({
  country: z.string().optional(),
  city: z.string().optional(),
  checkInDate: z.string().optional(),
  nights: z.number().min(1).optional(),
  guests: z.number().min(1).optional(),
  stars: z.enum(['any', '3', '4', '5']).optional(),
});

export const visaFilterSchema = z.object({
  country: z.string().optional(),
  duration: z.number().min(1).optional(),
  type: z.enum(['tourist', 'work', 'study']).optional(),
  processingTime: z.enum(['any', 'express', 'standard', 'regular']).optional(),
  priceRange: z.number().min(0).optional(),
});

export const tripFilterSchema = z.object({
  destination: z.string().optional(),
  tripType: z.enum(['safari', 'honeymoon', 'family', 'adventure', 'cultural']).optional(),
  days: z.number().min(1).optional(),
  date: z.string().optional(),
  budget: z.number().min(0).optional(),
});

export const packageFilterSchema = z.object({
  country: z.string().optional(),
  nights: z.number().min(1).optional(),
  type: z.enum(['luxury', 'budget', 'adventure', 'family']).optional(),
  includedServices: z.array(z.string()).optional(),
  priceRange: z.number().min(0).optional(),
});
