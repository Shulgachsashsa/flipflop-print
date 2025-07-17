import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  subcategoryCount: integer("subcategory_count").notNull().default(0),
});

export const subcategories = pgTable("subcategories", {
  id: serial("id").primaryKey(),
  categoryId: integer("category_id").notNull(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  productCount: integer("product_count").notNull().default(0),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  subcategoryId: integer("subcategory_id").notNull(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: text("price").notNull(),
  badge: text("badge"),
  wbUrl: text("wb_url").notNull(),
  imageUrl: text("image_url").notNull(),
});

export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  company: text("company").notNull(),
  review: text("review").notNull(),
  rating: integer("rating").notNull().default(5),
  initials: text("initials").notNull(),
  imageUrl: text("image_url").notNull(),
});

export const settings = pgTable("settings", {
  id: serial("id").primaryKey(),
  key: text("key").notNull().unique(),
  value: text("value").notNull(),
});

export const insertCategorySchema = createInsertSchema(categories).omit({
  id: true,
  subcategoryCount: true,
});

export const insertSubcategorySchema = createInsertSchema(subcategories).omit({
  id: true,
  productCount: true,
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
});

export const insertTestimonialSchema = createInsertSchema(testimonials).omit({
  id: true,
}).extend({
  rating: z.number().min(1).max(5).default(5),
});

export const insertSettingSchema = createInsertSchema(settings).omit({
  id: true,
});

export type Category = typeof categories.$inferSelect;
export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type Subcategory = typeof subcategories.$inferSelect;
export type InsertSubcategory = z.infer<typeof insertSubcategorySchema>;
export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type Setting = typeof settings.$inferSelect;
export type InsertSetting = z.infer<typeof insertSettingSchema>;
