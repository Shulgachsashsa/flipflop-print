# Dockerfile для альтернативного деплоя на Render
FROM node:18-alpine

WORKDIR /app

# Копируем package файлы
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код
COPY . .

# Собираем приложение
RUN npm run build

# Применяем миграции базы данных
RUN npm run db:push

# Открываем порт
EXPOSE 5000

# Запускаем приложение
CMD ["npm", "start"]