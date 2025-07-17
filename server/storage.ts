import {
  Category,
  InsertCategory,
  Subcategory,
  InsertSubcategory,
  Product,
  InsertProduct,
  Testimonial,
  InsertTestimonial,
  Setting,
  InsertSetting,
} from "@shared/schema";

export interface IStorage {
  // Categories
  getCategories(): Promise<Category[]>;
  getCategoryById(id: number): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  updateCategory(id: number, category: Partial<InsertCategory>): Promise<Category | undefined>;
  deleteCategory(id: number): Promise<boolean>;

  // Subcategories
  getSubcategoriesByCategoryId(categoryId: number): Promise<Subcategory[]>;
  getSubcategoryById(id: number): Promise<Subcategory | undefined>;
  createSubcategory(subcategory: InsertSubcategory): Promise<Subcategory>;
  updateSubcategory(id: number, subcategory: Partial<InsertSubcategory>): Promise<Subcategory | undefined>;
  deleteSubcategory(id: number): Promise<boolean>;

  // Products
  getProductsBySubcategoryId(subcategoryId: number): Promise<Product[]>;
  getProductById(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: number): Promise<boolean>;

  // Testimonials
  getTestimonials(): Promise<Testimonial[]>;
  getTestimonialById(id: number): Promise<Testimonial | undefined>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  updateTestimonial(id: number, testimonial: Partial<InsertTestimonial>): Promise<Testimonial | undefined>;
  deleteTestimonial(id: number): Promise<boolean>;

  // Settings
  getSetting(key: string): Promise<Setting | undefined>;
  setSetting(setting: InsertSetting): Promise<Setting>;
}

export class MemStorage implements IStorage {
  private categories: Map<number, Category>;
  private subcategories: Map<number, Subcategory>;
  private products: Map<number, Product>;
  private testimonials: Map<number, Testimonial>;
  private settings: Map<string, Setting>;
  private currentCategoryId: number;
  private currentSubcategoryId: number;
  private currentProductId: number;
  private currentTestimonialId: number;
  private currentSettingId: number;

  constructor() {
    this.categories = new Map();
    this.subcategories = new Map();
    this.products = new Map();
    this.testimonials = new Map();
    this.settings = new Map();
    this.currentCategoryId = 1;
    this.currentSubcategoryId = 1;
    this.currentProductId = 1;
    this.currentTestimonialId = 1;
    this.currentSettingId = 1;

    // Initialize with sample data
    this.initializeData();
  }

  private async initializeData() {
    // Categories
    const categories = [
      {
        name: "Визитные карточки",
        description: "Премиум качество печати, различные форматы и материалы",
        imageUrl: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        subcategoryCount: 4,
      },
      {
        name: "Брошюры и каталоги",
        description: "Рекламные материалы для презентации вашего бизнеса",
        imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        subcategoryCount: 3,
      },
      {
        name: "Упаковка и коробки",
        description: "Индивидуальная упаковка для товаров любого типа",
        imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        subcategoryCount: 5,
      },
      {
        name: "Баннеры и вывески",
        description: "Широкоформатная печать для наружной рекламы",
        imageUrl: "https://images.unsplash.com/photo-1542744094-3a31f272c490?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        subcategoryCount: 4,
      },
      {
        name: "Этикетки и наклейки",
        description: "Самоклеящиеся этикетки любых форм и размеров",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        subcategoryCount: 6,
      },
      {
        name: "Книги и блокноты",
        description: "Переплетные работы, издание книг и блокнотов",
        imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        subcategoryCount: 3,
      },
    ];

    for (const category of categories) {
      await this.createCategory(category);
    }

    // Subcategories for all categories
    const subcategories = [
      // Визитные карточки (category 1)
      {
        categoryId: 1,
        name: "Стандартные визитки",
        description: "Классические визитки из качественного картона",
        imageUrl: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      },
      {
        categoryId: 1,
        name: "Премиум визитки",
        description: "Элитные визитки с особой отделкой",
        imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      },
      {
        categoryId: 1,
        name: "Дизайнерские визитки",
        description: "Нестандартные форматы и эксклюзивные материалы",
        imageUrl: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      },
      {
        categoryId: 1,
        name: "Пластиковые визитки",
        description: "Долговечные водостойкие визитки",
        imageUrl: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      },
      
      // Брошюры и каталоги (category 2)
      {
        categoryId: 2,
        name: "Листовки",
        description: "Рекламные листовки различных форматов",
        imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      },
      {
        categoryId: 2,
        name: "Брошюры",
        description: "Многостраничные рекламные материалы",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      },
      {
        categoryId: 2,
        name: "Каталоги",
        description: "Презентационные каталоги продукции",
        imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      },
      
      // Упаковка и коробки (category 3)
      {
        categoryId: 3,
        name: "Картонные коробки",
        description: "Индивидуальная упаковка из картона",
        imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      },
      {
        categoryId: 3,
        name: "Подарочные коробки",
        description: "Презентационная упаковка для подарков",
        imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      },
      {
        categoryId: 3,
        name: "Пакеты бумажные",
        description: "Экологичные бумажные пакеты с логотипом",
        imageUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      },
      {
        categoryId: 3,
        name: "Упаковка для еды",
        description: "Специализированная упаковка для пищевых продуктов",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      },
      {
        categoryId: 3,
        name: "Почтовые коробки",
        description: "Прочная упаковка для доставки",
        imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      },
      
      // Баннеры и вывески (category 4)
      {
        categoryId: 4,
        name: "Баннеры",
        description: "Широкоформатные рекламные баннеры",
        imageUrl: "https://images.unsplash.com/photo-1542744094-3a31f272c490?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      },
      {
        categoryId: 4,
        name: "Вывески",
        description: "Информационные и рекламные вывески",
        imageUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      },
      {
        categoryId: 4,
        name: "Таблички",
        description: "Офисные и информационные таблички",
        imageUrl: "https://images.unsplash.com/photo-1494145904049-0dca59b4bbad?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      },
      {
        categoryId: 4,
        name: "Стенды",
        description: "Выставочные и презентационные стенды",
        imageUrl: "https://images.unsplash.com/photo-1540762893-e4c52f57e5b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      },
      
      // Этикетки и наклейки (category 5)
      {
        categoryId: 5,
        name: "Круглые этикетки",
        description: "Самоклеящиеся круглые этикетки",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      },
      {
        categoryId: 5,
        name: "Прямоугольные этикетки",
        description: "Классические прямоугольные этикетки",
        imageUrl: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      },
      {
        categoryId: 5,
        name: "Фигурные этикетки",
        description: "Этикетки нестандартной формы",
        imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      },
      {
        categoryId: 5,
        name: "Защитные этикетки",
        description: "Этикетки с защитой от подделки",
        imageUrl: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      },
      {
        categoryId: 5,
        name: "Термоэтикетки",
        description: "Специальные этикетки для термопечати",
        imageUrl: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      },
      {
        categoryId: 5,
        name: "Виниловые наклейки",
        description: "Долговечные виниловые наклейки",
        imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      },
      
      // Книги и блокноты (category 6)
      {
        categoryId: 6,
        name: "Блокноты",
        description: "Корпоративные блокноты с логотипом",
        imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      },
      {
        categoryId: 6,
        name: "Ежедневники",
        description: "Планировщики и ежедневники",
        imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      },
      {
        categoryId: 6,
        name: "Книги",
        description: "Издание книг малыми тиражами",
        imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      },
    ];

    for (const subcategory of subcategories) {
      await this.createSubcategory(subcategory);
    }

    // Products for all subcategories
    const products = [
      // Стандартные визитки (subcategory 1)
      {
        subcategoryId: 1,
        name: "Глянцевые визитки 300гр",
        description: "300гр/м², глянцевая ламинация, от 100 шт.",
        price: "от 2,50 руб.",
        badge: "Хит продаж",
        wbUrl: "https://wildberries.by/catalog/12345",
        imageUrl: "https://via.placeholder.com/300x200/1e40af/ffffff?text=Глянцевые+визитки",
      },
      {
        subcategoryId: 1,
        name: "Матовые визитки 350гр",
        description: "350гр/м², матовая печать, от 50 шт.",
        price: "от 1,80 руб.",
        badge: null,
        wbUrl: "https://wildberries.by/catalog/12346",
        imageUrl: "https://via.placeholder.com/300x200/2563eb/ffffff?text=Матовые+визитки",
      },
      {
        subcategoryId: 1,
        name: "Шелковые визитки",
        description: "Шелковая ламинация, приятная фактура",
        price: "от 3,20 руб.",
        badge: "Популярное",
        wbUrl: "https://wildberries.by/catalog/12347",
        imageUrl: "https://via.placeholder.com/300x200/3b82f6/ffffff?text=Шелковые+визитки",
      },
      
      // Премиум визитки (subcategory 2)
      {
        subcategoryId: 2,
        name: "Визитки с тиснением золотом",
        description: "Дизайнерский картон, золотая фольга",
        price: "от 5,20 руб.",
        badge: "Премиум",
        wbUrl: "https://wildberries.by/catalog/12348",
        imageUrl: "https://via.placeholder.com/300x200/fbbf24/000000?text=Тиснение+золотом",
      },
      {
        subcategoryId: 2,
        name: "Визитки Soft Touch",
        description: "Бархатистая поверхность, приятные тактильные ощущения",
        price: "от 4,50 руб.",
        badge: null,
        wbUrl: "https://wildberries.by/catalog/12349",
        imageUrl: "https://via.placeholder.com/300x200/6366f1/ffffff?text=Soft+Touch",
      },
      {
        subcategoryId: 2,
        name: "Визитки с выборочным УФ",
        description: "Выборочная УФ-лакировка для акцентов",
        price: "от 4,80 руб.",
        badge: "Эксклюзив",
        wbUrl: "https://wildberries.by/catalog/12350",
        imageUrl: "https://via.placeholder.com/300x200/8b5cf6/ffffff?text=УФ+лак",
      },
      
      // Дизайнерские визитки (subcategory 3)
      {
        subcategoryId: 3,
        name: "Квадратные визитки",
        description: "Нестандартный формат 50x50мм",
        price: "от 3,50 руб.",
        badge: "Дизайн",
        wbUrl: "https://wildberries.by/catalog/12351",
        imageUrl: "https://via.placeholder.com/300x200/ef4444/ffffff?text=Квадратные",
      },
      {
        subcategoryId: 3,
        name: "Фигурные визитки",
        description: "Визитки с фигурной высечкой",
        price: "от 6,20 руб.",
        badge: "Уникально",
        wbUrl: "https://wildberries.by/catalog/12352",
        imageUrl: "https://via.placeholder.com/300x200/f59e0b/ffffff?text=Фигурные",
      },
      
      // Пластиковые визитки (subcategory 4)
      {
        subcategoryId: 4,
        name: "ПВХ визитки прозрачные",
        description: "Прозрачный пластик, влагостойкие",
        price: "от 8,90 руб.",
        badge: "Долговечно",
        wbUrl: "https://wildberries.by/catalog/12353",
        imageUrl: "https://via.placeholder.com/300x200/06b6d4/ffffff?text=ПВХ+прозрачные",
      },
      {
        subcategoryId: 4,
        name: "ПВХ визитки белые",
        description: "Белый пластик, стойкие к износу",
        price: "от 7,50 руб.",
        badge: null,
        wbUrl: "https://wildberries.by/catalog/12354",
        imageUrl: "https://via.placeholder.com/300x200/64748b/ffffff?text=ПВХ+белые",
      },
      
      // Листовки (subcategory 5)
      {
        subcategoryId: 5,
        name: "Листовки А6 односторонние",
        description: "Формат А6, печать 4+0, от 500 шт.",
        price: "от 0,85 руб.",
        badge: "Бюджетно",
        wbUrl: "https://wildberries.by/catalog/12355",
        imageUrl: "https://via.placeholder.com/300x200/10b981/ffffff?text=Листовки+А6",
      },
      {
        subcategoryId: 5,
        name: "Листовки А5 двухсторонние",
        description: "Формат А5, печать 4+4, от 250 шт.",
        price: "от 1,20 руб.",
        badge: "Популярное",
        wbUrl: "https://wildberries.by/catalog/12356",
        imageUrl: "https://via.placeholder.com/300x200/059669/ffffff?text=Листовки+А5",
      },
      {
        subcategoryId: 5,
        name: "Листовки А4 премиум",
        description: "Формат А4, плотная бумага 250гр/м²",
        price: "от 2,80 руб.",
        badge: "Качество",
        wbUrl: "https://wildberries.by/catalog/12357",
        imageUrl: "https://via.placeholder.com/300x200/047857/ffffff?text=Листовки+А4",
      },
      
      // Брошюры (subcategory 6)
      {
        subcategoryId: 6,
        name: "Брошюра 8 полос",
        description: "8 полос, скрепка, глянцевая бумага",
        price: "от 5,50 руб.",
        badge: null,
        wbUrl: "https://wildberries.by/catalog/12358",
        imageUrl: "https://via.placeholder.com/300x200/dc2626/ffffff?text=Брошюра+8+полос",
      },
      {
        subcategoryId: 6,
        name: "Брошюра 16 полос",
        description: "16 полос, скрепка, мелованная бумага",
        price: "от 8,90 руб.",
        badge: "Стандарт",
        wbUrl: "https://wildberries.by/catalog/12359",
        imageUrl: "https://via.placeholder.com/300x200/b91c1c/ffffff?text=Брошюра+16+полос",
      },
      
      // Каталоги (subcategory 7)
      {
        subcategoryId: 7,
        name: "Каталог А4 на скрепке",
        description: "До 32 полос, мелованная бумага",
        price: "от 12,50 руб.",
        badge: "Презентация",
        wbUrl: "https://wildberries.by/catalog/12360",
        imageUrl: "https://via.placeholder.com/300x200/7c3aed/ffffff?text=Каталог+скрепка",
      },
      {
        subcategoryId: 7,
        name: "Каталог А4 на пружине",
        description: "До 50 полос, пластиковая пружина",
        price: "от 18,90 руб.",
        badge: "Удобно",
        wbUrl: "https://wildberries.by/catalog/12361",
        imageUrl: "https://via.placeholder.com/300x200/6d28d9/ffffff?text=Каталог+пружина",
      },
      
      // Картонные коробки (subcategory 8)
      {
        subcategoryId: 8,
        name: "Коробка складная малая",
        description: "150x100x50мм, гофрокартон",
        price: "от 2,20 руб.",
        badge: "Компактно",
        wbUrl: "https://wildberries.by/catalog/12362",
        imageUrl: "https://via.placeholder.com/300x200/d97706/ffffff?text=Коробка+малая",
      },
      {
        subcategoryId: 8,
        name: "Коробка складная средняя",
        description: "250x200x100мм, микрогофра",
        price: "от 4,50 руб.",
        badge: null,
        wbUrl: "https://wildberries.by/catalog/12363",
        imageUrl: "https://via.placeholder.com/300x200/c2410c/ffffff?text=Коробка+средняя",
      },
      
      // Подарочные коробки (subcategory 9)
      {
        subcategoryId: 9,
        name: "Подарочная коробка с лентой",
        description: "Дизайнерский картон, атласная лента",
        price: "от 8,90 руб.",
        badge: "Подарок",
        wbUrl: "https://wildberries.by/catalog/12364",
        imageUrl: "https://via.placeholder.com/300x200/be185d/ffffff?text=Подарочная+коробка",
      },
      
      // Круглые этикетки (subcategory 15)
      {
        subcategoryId: 15,
        name: "Этикетки круглые Ø30мм",
        description: "Самоклеящиеся, от 100 шт.",
        price: "от 0,25 руб.",
        badge: "Малый тираж",
        wbUrl: "https://wildberries.by/catalog/12365",
        imageUrl: "https://via.placeholder.com/300x200/0891b2/ffffff?text=Этикетки+30мм",
      },
      {
        subcategoryId: 15,
        name: "Этикетки круглые Ø50мм",
        description: "Самоклеящиеся, влагостойкие",
        price: "от 0,45 руб.",
        badge: null,
        wbUrl: "https://wildberries.by/catalog/12366",
        imageUrl: "https://via.placeholder.com/300x200/0e7490/ffffff?text=Этикетки+50мм",
      },
      
      // Прямоугольные этикетки (subcategory 16)
      {
        subcategoryId: 16,
        name: "Этикетки 40x20мм",
        description: "Прямоугольные, белая основа",
        price: "от 0,18 руб.",
        badge: "Экономично",
        wbUrl: "https://wildberries.by/catalog/12367",
        imageUrl: "https://via.placeholder.com/300x200/4338ca/ffffff?text=Этикетки+40x20",
      },
      {
        subcategoryId: 16,
        name: "Этикетки 60x40мм",
        description: "Прямоугольные, цветная печать",
        price: "от 0,35 руб.",
        badge: "Популярное",
        wbUrl: "https://wildberries.by/catalog/12368",
        imageUrl: "https://via.placeholder.com/300x200/3730a3/ffffff?text=Этикетки+60x40",
      },
    ];

    for (const product of products) {
      await this.createProduct(product);
    }

    // Testimonials
    const testimonials = [
      {
        name: "Александр Петров",
        company: "ООО \"Стройтехнологии\"",
        review: "Отличное качество печати и быстрое выполнение заказов. Работаем с FlipFlop Print уже третий год и всегда довольны результатом.",
        rating: 5,
        initials: "АП",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=faces",
      },
      {
        name: "Мария Козлова",
        company: "ИП Козлова М.А.",
        review: "Профессиональный подход и индивидуальная работа с каждым клиентом. Цены действительно оптовые, а качество превосходное.",
        rating: 5,
        initials: "МК",
        imageUrl: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop&crop=faces",
      },
      {
        name: "Игорь Смирнов",
        company: "ООО \"БелПродукт\"",
        review: "Заказываем упаковку для нашей продукции. Всегда соблюдают сроки, отличная печать и приятные цены для оптовиков.",
        rating: 5,
        initials: "ИС",
        imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop&crop=faces",
      },
      {
        name: "Елена Васильева",
        company: "ООО \"ДизайнСтудия\"",
        review: "Современное оборудование и высокое качество печати. Рекомендуем всем, кто ищет надежного партнера в полиграфии.",
        rating: 5,
        initials: "ЕВ",
        imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop&crop=faces",
      },
    ];

    for (const testimonial of testimonials) {
      await this.createTestimonial(testimonial);
    }
  }

  // Categories
  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategoryById(id: number): Promise<Category | undefined> {
    return this.categories.get(id);
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = this.currentCategoryId++;
    const category: Category = { ...insertCategory, id, subcategoryCount: 0 };
    this.categories.set(id, category);
    return category;
  }

  async updateCategory(id: number, updateData: Partial<InsertCategory>): Promise<Category | undefined> {
    const category = this.categories.get(id);
    if (!category) return undefined;

    const updatedCategory: Category = { ...category, ...updateData };
    this.categories.set(id, updatedCategory);
    return updatedCategory;
  }

  async deleteCategory(id: number): Promise<boolean> {
    return this.categories.delete(id);
  }

  // Subcategories
  async getSubcategoriesByCategoryId(categoryId: number): Promise<Subcategory[]> {
    return Array.from(this.subcategories.values()).filter(
      (subcategory) => subcategory.categoryId === categoryId,
    );
  }

  async getSubcategoryById(id: number): Promise<Subcategory | undefined> {
    return this.subcategories.get(id);
  }

  async createSubcategory(insertSubcategory: InsertSubcategory): Promise<Subcategory> {
    const id = this.currentSubcategoryId++;
    const subcategory: Subcategory = { ...insertSubcategory, id, productCount: 0 };
    this.subcategories.set(id, subcategory);

    // Update category subcategory count
    const category = this.categories.get(insertSubcategory.categoryId);
    if (category) {
      category.subcategoryCount++;
      this.categories.set(category.id, category);
    }

    return subcategory;
  }

  async updateSubcategory(id: number, updateData: Partial<InsertSubcategory>): Promise<Subcategory | undefined> {
    const subcategory = this.subcategories.get(id);
    if (!subcategory) return undefined;

    const updatedSubcategory: Subcategory = { ...subcategory, ...updateData };
    this.subcategories.set(id, updatedSubcategory);
    return updatedSubcategory;
  }

  async deleteSubcategory(id: number): Promise<boolean> {
    const subcategory = this.subcategories.get(id);
    if (subcategory) {
      // Update category subcategory count
      const category = this.categories.get(subcategory.categoryId);
      if (category && category.subcategoryCount > 0) {
        category.subcategoryCount--;
        this.categories.set(category.id, category);
      }
    }
    return this.subcategories.delete(id);
  }

  // Products
  async getProductsBySubcategoryId(subcategoryId: number): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.subcategoryId === subcategoryId,
    );
  }

  async getProductById(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.currentProductId++;
    const product: Product = { 
      id, 
      subcategoryId: insertProduct.subcategoryId,
      name: insertProduct.name,
      description: insertProduct.description,
      price: insertProduct.price,
      badge: insertProduct.badge || null,
      wbUrl: insertProduct.wbUrl,
      imageUrl: insertProduct.imageUrl || ""
    };
    this.products.set(id, product);

    // Update subcategory product count
    const subcategory = this.subcategories.get(insertProduct.subcategoryId);
    if (subcategory) {
      subcategory.productCount++;
      this.subcategories.set(subcategory.id, subcategory);
    }

    return product;
  }

  async updateProduct(id: number, updateData: Partial<InsertProduct>): Promise<Product | undefined> {
    const product = this.products.get(id);
    if (!product) return undefined;

    const updatedProduct: Product = { ...product, ...updateData };
    this.products.set(id, updatedProduct);
    return updatedProduct;
  }

  async deleteProduct(id: number): Promise<boolean> {
    const product = this.products.get(id);
    if (product) {
      // Update subcategory product count
      const subcategory = this.subcategories.get(product.subcategoryId);
      if (subcategory && subcategory.productCount > 0) {
        subcategory.productCount--;
        this.subcategories.set(subcategory.id, subcategory);
      }
    }
    return this.products.delete(id);
  }

  // Testimonials
  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }

  async getTestimonialById(id: number): Promise<Testimonial | undefined> {
    return this.testimonials.get(id);
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.currentTestimonialId++;
    const testimonial: Testimonial = { 
      id,
      name: insertTestimonial.name,
      company: insertTestimonial.company,
      review: insertTestimonial.review,
      rating: insertTestimonial.rating,
      initials: insertTestimonial.initials,
      imageUrl: insertTestimonial.imageUrl || ""
    };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }

  async updateTestimonial(id: number, updateData: Partial<InsertTestimonial>): Promise<Testimonial | undefined> {
    const testimonial = this.testimonials.get(id);
    if (!testimonial) return undefined;

    const updatedTestimonial: Testimonial = { ...testimonial, ...updateData };
    this.testimonials.set(id, updatedTestimonial);
    return updatedTestimonial;
  }

  async deleteTestimonial(id: number): Promise<boolean> {
    return this.testimonials.delete(id);
  }

  // Settings
  async getSetting(key: string): Promise<Setting | undefined> {
    return this.settings.get(key);
  }

  async setSetting(insertSetting: InsertSetting): Promise<Setting> {
    const existingSetting = this.settings.get(insertSetting.key);
    if (existingSetting) {
      existingSetting.value = insertSetting.value;
      this.settings.set(insertSetting.key, existingSetting);
      return existingSetting;
    }

    const id = this.currentSettingId++;
    const setting: Setting = { ...insertSetting, id };
    this.settings.set(insertSetting.key, setting);
    return setting;
  }
}

import { categories, subcategories, products, testimonials, settings } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export class DatabaseStorage implements IStorage {
  async getCategories(): Promise<Category[]> {
    const cats = await db.select().from(categories);
    // Update subcategory counts
    for (const category of cats) {
      const subcats = await db.select().from(subcategories).where(eq(subcategories.categoryId, category.id));
      category.subcategoryCount = subcats.length;
    }
    return cats;
  }

  async getCategoryById(id: number): Promise<Category | undefined> {
    const [category] = await db.select().from(categories).where(eq(categories.id, id));
    return category || undefined;
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    const [newCategory] = await db
      .insert(categories)
      .values({ ...category, subcategoryCount: 0 })
      .returning();
    return newCategory;
  }

  async updateCategory(id: number, category: Partial<InsertCategory>): Promise<Category | undefined> {
    const [updatedCategory] = await db
      .update(categories)
      .set(category)
      .where(eq(categories.id, id))
      .returning();
    return updatedCategory || undefined;
  }

  async deleteCategory(id: number): Promise<boolean> {
    const result = await db.delete(categories).where(eq(categories.id, id));
    return (result.rowCount || 0) > 0;
  }

  async getSubcategoriesByCategoryId(categoryId: number): Promise<Subcategory[]> {
    const subcats = await db.select().from(subcategories).where(eq(subcategories.categoryId, categoryId));
    // Update product counts
    for (const subcategory of subcats) {
      const prods = await db.select().from(products).where(eq(products.subcategoryId, subcategory.id));
      subcategory.productCount = prods.length;
    }
    return subcats;
  }

  async getSubcategoryById(id: number): Promise<Subcategory | undefined> {
    const [subcategory] = await db.select().from(subcategories).where(eq(subcategories.id, id));
    return subcategory || undefined;
  }

  async createSubcategory(subcategory: InsertSubcategory): Promise<Subcategory> {
    const [newSubcategory] = await db
      .insert(subcategories)
      .values({ ...subcategory, productCount: 0 })
      .returning();
    return newSubcategory;
  }

  async updateSubcategory(id: number, subcategory: Partial<InsertSubcategory>): Promise<Subcategory | undefined> {
    const [updatedSubcategory] = await db
      .update(subcategories)
      .set(subcategory)
      .where(eq(subcategories.id, id))
      .returning();
    return updatedSubcategory || undefined;
  }

  async deleteSubcategory(id: number): Promise<boolean> {
    const result = await db.delete(subcategories).where(eq(subcategories.id, id));
    return (result.rowCount || 0) > 0;
  }

  async getProductsBySubcategoryId(subcategoryId: number): Promise<Product[]> {
    return await db.select().from(products).where(eq(products.subcategoryId, subcategoryId));
  }

  async getProductById(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product || undefined;
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const [newProduct] = await db
      .insert(products)
      .values(product)
      .returning();
    return newProduct;
  }

  async updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product | undefined> {
    const [updatedProduct] = await db
      .update(products)
      .set(product)
      .where(eq(products.id, id))
      .returning();
    return updatedProduct || undefined;
  }

  async deleteProduct(id: number): Promise<boolean> {
    const result = await db.delete(products).where(eq(products.id, id));
    return (result.rowCount || 0) > 0;
  }

  async getTestimonials(): Promise<Testimonial[]> {
    return await db.select().from(testimonials);
  }

  async getTestimonialById(id: number): Promise<Testimonial | undefined> {
    const [testimonial] = await db.select().from(testimonials).where(eq(testimonials.id, id));
    return testimonial || undefined;
  }

  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const [newTestimonial] = await db
      .insert(testimonials)
      .values(testimonial)
      .returning();
    return newTestimonial;
  }

  async updateTestimonial(id: number, testimonial: Partial<InsertTestimonial>): Promise<Testimonial | undefined> {
    const [updatedTestimonial] = await db
      .update(testimonials)
      .set(testimonial)
      .where(eq(testimonials.id, id))
      .returning();
    return updatedTestimonial || undefined;
  }

  async deleteTestimonial(id: number): Promise<boolean> {
    const result = await db.delete(testimonials).where(eq(testimonials.id, id));
    return (result.rowCount || 0) > 0;
  }

  async getSetting(key: string): Promise<Setting | undefined> {
    const [setting] = await db.select().from(settings).where(eq(settings.key, key));
    return setting || undefined;
  }

  async setSetting(setting: InsertSetting): Promise<Setting> {
    const [newSetting] = await db
      .insert(settings)
      .values(setting)
      .onConflictDoUpdate({
        target: settings.key,
        set: { value: setting.value }
      })
      .returning();
    return newSetting;
  }
}

export const storage = new DatabaseStorage();
