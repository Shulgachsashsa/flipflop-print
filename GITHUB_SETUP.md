# Как создать проект на GitHub для деплоя на Render

## Шаг 1: Создание репозитория на GitHub
1. Зайдите на github.com
2. Нажмите "New repository"
3. Назовите репозиторий "flipflop-print"
4. Выберите "Public"
5. Нажмите "Create repository"

## Шаг 2: Создание файлов проекта

### Создайте следующие файлы и папки в репозитории:

```
flipflop-print/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── App.tsx
│   │   ├── index.css
│   │   └── main.tsx
│   └── index.html
├── server/
│   ├── index.ts
│   ├── routes.ts
│   ├── storage.ts
│   ├── vite.ts
│   └── db.ts
├── shared/
│   └── schema.ts
├── package.json
├── render.yaml
├── build.sh
├── Dockerfile
├── .gitignore
├── .env.example
├── README.md
├── DEPLOYMENT.md
├── components.json
├── drizzle.config.ts
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
└── vite.config.ts
```

## Шаг 3: Копирование файлов из Replit

1. Откройте каждый файл в Replit
2. Скопируйте содержимое
3. Создайте аналогичный файл в GitHub
4. Вставьте содержимое

## Шаг 4: Деплой на Render

1. Зайдите на render.com
2. Нажмите "New +" → "Blueprint"
3. Подключите ваш GitHub репозиторий
4. Render найдет render.yaml и автоматически настроит все

## Альтернативный способ

Если не хотите копировать файлы вручную:

1. В Replit нажмите на три точки рядом с файлами
2. Выберите "Download as zip" (если доступно)
3. Или используйте Git для загрузки в GitHub:
   - В терминале Replit: `git init`
   - `git add .`
   - `git commit -m "Initial commit"`
   - `git remote add origin https://github.com/YOUR_USERNAME/flipflop-print.git`
   - `git push -u origin main`