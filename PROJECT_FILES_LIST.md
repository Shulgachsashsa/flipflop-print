# Полный список файлов для загрузки на GitHub

## Корневые файлы
- `package.json` - зависимости проекта
- `package-lock.json` - точные версии пакетов
- `render.yaml` - конфигурация для Render
- `build.sh` - скрипт сборки
- `Dockerfile` - конфигурация Docker
- `.gitignore` - исключаемые файлы
- `.env.example` - пример переменных окружения
- `README.md` - описание проекта
- `DEPLOYMENT.md` - инструкции по деплою
- `components.json` - настройки UI компонентов
- `drizzle.config.ts` - конфигурация базы данных
- `postcss.config.js` - настройки PostCSS
- `tailwind.config.ts` - настройки Tailwind CSS
- `tsconfig.json` - настройки TypeScript
- `vite.config.ts` - настройки сборки

## Папка client/
- `client/index.html` - главный HTML файл
- `client/src/App.tsx` - главный компонент приложения
- `client/src/main.tsx` - точка входа React
- `client/src/index.css` - глобальные стили

### client/src/components/
- `client/src/components/header.tsx`
- `client/src/components/hero-section.tsx`
- `client/src/components/about-section.tsx`
- `client/src/components/catalog-section.tsx`
- `client/src/components/testimonials-section.tsx`
- `client/src/components/footer.tsx`

### client/src/components/admin/
- `client/src/components/admin/category-management.tsx`
- `client/src/components/admin/subcategory-management.tsx`
- `client/src/components/admin/product-management.tsx`
- `client/src/components/admin/product-detail-management.tsx`
- `client/src/components/admin/testimonial-management.tsx`
- `client/src/components/admin/simple-testimonial-management.tsx`

### client/src/components/ui/ (все файлы)
- `client/src/components/ui/accordion.tsx`
- `client/src/components/ui/alert-dialog.tsx`
- `client/src/components/ui/alert.tsx`
- `client/src/components/ui/aspect-ratio.tsx`
- `client/src/components/ui/avatar.tsx`
- `client/src/components/ui/badge.tsx`
- `client/src/components/ui/breadcrumb.tsx`
- `client/src/components/ui/button.tsx`
- `client/src/components/ui/calendar.tsx`
- `client/src/components/ui/card.tsx`
- `client/src/components/ui/carousel.tsx`
- `client/src/components/ui/chart.tsx`
- `client/src/components/ui/checkbox.tsx`
- `client/src/components/ui/collapsible.tsx`
- `client/src/components/ui/command.tsx`
- `client/src/components/ui/context-menu.tsx`
- `client/src/components/ui/dialog.tsx`
- `client/src/components/ui/drawer.tsx`
- `client/src/components/ui/dropdown-menu.tsx`
- `client/src/components/ui/form.tsx`
- `client/src/components/ui/hover-card.tsx`
- `client/src/components/ui/input-otp.tsx`
- `client/src/components/ui/input.tsx`
- `client/src/components/ui/label.tsx`
- `client/src/components/ui/menubar.tsx`
- `client/src/components/ui/navigation-menu.tsx`
- (остальные UI компоненты...)

### client/src/pages/
- `client/src/pages/home.tsx`
- `client/src/pages/admin.tsx`
- `client/src/pages/not-found.tsx`

### client/src/lib/
- `client/src/lib/utils.ts`
- `client/src/lib/queryClient.ts`

### client/src/hooks/
- `client/src/hooks/use-toast.ts`
- `client/src/hooks/use-mobile.tsx`

## Папка server/
- `server/index.ts` - главный файл сервера
- `server/routes.ts` - API маршруты
- `server/storage.ts` - работа с базой данных
- `server/vite.ts` - настройки Vite
- `server/db.ts` - подключение к базе данных

## Папка shared/
- `shared/schema.ts` - схемы базы данных и типы

## Важные примечания для GitHub

1. **НЕ загружайте:**
   - Папку `node_modules/`
   - Папку `dist/`
   - Файлы `.DS_Store`
   - Логи `*.log`

2. **Обязательно загрузите:**
   - `render.yaml` - без него деплой не работает
   - `build.sh` - скрипт сборки для Render
   - Все файлы кода из папок client/, server/, shared/