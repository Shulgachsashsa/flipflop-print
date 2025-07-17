# Инструкция по загрузке проекта на GitHub

## Шаг 1: Создание репозитория на GitHub
1. Перейдите на github.com
2. Нажмите "New repository"
3. Название: `flipflop-print`
4. Описание: `Wholesale printing website with admin panel`
5. Выберите "Public"
6. Нажмите "Create repository"

## Шаг 2: Загрузка файлов проекта

### Способ 1: Через веб-интерфейс GitHub
1. В созданном репозитории нажмите "uploading an existing file"
2. Перетащите или выберите все файлы проекта из Replit
3. Важные файлы для обязательной загрузки:
   - `package.json`
   - `render.yaml`
   - `build.sh`
   - Папка `client/`
   - Папка `server/`
   - Папка `shared/`
   - `drizzle.config.ts`
   - `tailwind.config.ts`
   - `vite.config.ts`
   - `.gitignore`
   - `README.md`

### Способ 2: Создание файлов по одному
Создайте файлы в GitHub и скопируйте содержимое из Replit:

#### render.yaml
```yaml
services:
  - type: web
    name: flipflop-print
    runtime: node
    buildCommand: npm install && npm run build
    startCommand: npm start
    healthCheckPath: /
    envVars:
      - key: NODE_ENV
        value: production
      - key: DATABASE_URL
        fromDatabase:
          name: flipflop-db
          property: connectionString
    
databases:
  - name: flipflop-db
    databaseName: flipflop_print
    user: flipflop_user
```

#### build.sh
```bash
#!/bin/bash
echo "Installing dependencies..."
npm install
echo "Building client..."
npm run build
echo "Pushing database schema..."
npm run db:push
echo "Build completed successfully!"
```

## Шаг 3: Деплой на Render
1. Перейдите на render.com
2. Нажмите "New +" → "Blueprint"
3. Подключите GitHub репозиторий
4. Render автоматически найдет `render.yaml`
5. Нажмите "Create Blueprint"

## Шаг 4: Проверка деплоя
- PostgreSQL база данных создается автоматически
- Сайт будет доступен по адресу: `https://flipflop-print.onrender.com`
- Проверьте работу всех функций