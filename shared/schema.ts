import { pgTable, text, serial, integer, boolean, date, real, timestamp, primaryKey } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Base User Schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  isAdmin: boolean("is_admin").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  bookings: many(bookings),
}));

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  firstName: true,
  lastName: true,
  isAdmin: true,
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

export const destinationsRelations = relations(destinations, ({ many }) => ({
  packageDestinations: many(packageDestinations),
}));

export const insertDestinationSchema = createInsertSchema(destinations).pick({
  name: true,
  country: true,
  city: true,
  description: true,
  imageUrl: true,
  isPopular: true,
});

// Hotels Schema
export const hotels = pgTable("hotels", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  address: text("address"),
  city: text("city").notNull(),
  country: text("country").notNull(),
  stars: integer("stars"),
  imageUrl: text("image_url"),
});

export const hotelsRelations = relations(hotels, ({ many }) => ({
  rooms: many(rooms),
  packageHotels: many(packageHotels),
}));

export const insertHotelSchema = createInsertSchema(hotels).pick({
  name: true,
  description: true,
  address: true,
  city: true,
  country: true,
  stars: true,
  imageUrl: true,
});

// Hotel Rooms
export const rooms = pgTable("rooms", {
  id: serial("id").primaryKey(),
  hotelId: integer("hotel_id").notNull().references(() => hotels.id),
  name: text("name").notNull(),
  description: text("description"),
  capacity: integer("capacity").notNull(),
  pricePerNight: real("price_per_night").notNull(),
  imageUrl: text("image_url"),
});

export const roomsRelations = relations(rooms, ({ one }) => ({
  hotel: one(hotels, {
    fields: [rooms.hotelId],
    references: [hotels.id],
  }),
}));

export const insertRoomSchema = createInsertSchema(rooms).pick({
  hotelId: true,
  name: true,
  description: true,
  capacity: true,
  pricePerNight: true,
  imageUrl: true,
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
  galleryImages: text("gallery_images").array(),
  rating: real("rating"),
  reviewCount: integer("review_count"),
  isPopular: boolean("is_popular").default(false),
  isFeatured: boolean("is_featured").default(false),
  includedServices: text("included_services").array(),
  excludedServices: text("excluded_services").array(),
  type: text("type"), // e.g., 'LUXURY', 'BESTSELLER', 'ECO-FRIENDLY'
  locations: text("locations").array(),
});

export const packagesRelations = relations(packages, ({ many }) => ({
  packageDestinations: many(packageDestinations),
  packageHotels: many(packageHotels),
  bookings: many(bookings),
}));

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
  galleryImages: true,
  rating: true,
  reviewCount: true,
  isPopular: true,
  isFeatured: true,
  includedServices: true,
  excludedServices: true,
  type: true,
  locations: true,
});

// Junction table for packages and destinations
export const packageDestinations = pgTable("package_destinations", {
  packageId: integer("package_id").notNull().references(() => packages.id),
  destinationId: integer("destination_id").notNull().references(() => destinations.id),
}, (t) => ({
  pk: primaryKey({ columns: [t.packageId, t.destinationId] }),
}));

export const packageDestinationsRelations = relations(packageDestinations, ({ one }) => ({
  package: one(packages, {
    fields: [packageDestinations.packageId],
    references: [packages.id],
  }),
  destination: one(destinations, {
    fields: [packageDestinations.destinationId],
    references: [destinations.id],
  }),
}));

// Junction table for packages and hotels
export const packageHotels = pgTable("package_hotels", {
  packageId: integer("package_id").notNull().references(() => packages.id),
  hotelId: integer("hotel_id").notNull().references(() => hotels.id),
  roomId: integer("room_id").references(() => rooms.id),
  nights: integer("nights").notNull(),
}, (t) => ({
  pk: primaryKey({ columns: [t.packageId, t.hotelId] }),
}));

export const packageHotelsRelations = relations(packageHotels, ({ one }) => ({
  package: one(packages, {
    fields: [packageHotels.packageId],
    references: [packages.id],
  }),
  hotel: one(hotels, {
    fields: [packageHotels.hotelId],
    references: [hotels.id],
  }),
  room: one(rooms, {
    fields: [packageHotels.roomId],
    references: [rooms.id],
  }),
}));

// Bookings table
export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  packageId: integer("package_id").references(() => packages.id),
  bookingDate: timestamp("booking_date").defaultNow(),
  travelDate: date("travel_date").notNull(),
  numberOfPeople: integer("number_of_people").notNull(),
  totalPrice: real("total_price").notNull(),
  status: text("status").default("pending"),
});

export const bookingsRelations = relations(bookings, ({ one }) => ({
  user: one(users, {
    fields: [bookings.userId],
    references: [users.id],
  }),
  package: one(packages, {
    fields: [bookings.packageId],
    references: [packages.id],
  }),
}));

export const insertBookingSchema = createInsertSchema(bookings).pick({
  userId: true,
  packageId: true,
  travelDate: true,
  numberOfPeople: true,
  totalPrice: true,
  status: true,
});

// Define types from schemas
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertDestination = z.infer<typeof insertDestinationSchema>;
export type Destination = typeof destinations.$inferSelect;

export type InsertHotel = z.infer<typeof insertHotelSchema>;
export type Hotel = typeof hotels.$inferSelect;

export type InsertRoom = z.infer<typeof insertRoomSchema>;
export type Room = typeof rooms.$inferSelect;

export type InsertPackage = z.infer<typeof insertPackageSchema>;
export type Package = typeof packages.$inferSelect;

export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Booking = typeof bookings.$inferSelect;

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
