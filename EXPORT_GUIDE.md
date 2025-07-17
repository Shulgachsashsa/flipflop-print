# Экспорт проекта FlipFlop Print на GitHub

## Способ 1: Прямая загрузка через Git (Рекомендуется)

В терминале Replit выполните команды:

```bash
git init
git add .
git commit -m "Initial FlipFlop Print project"
git branch -M main
git remote add origin https://github.com/ВАШ_ПОЛЬЗОВАТЕЛЬ/flipflop-print.git
git push -u origin main
```

## Способ 2: Ручное копирование файлов

Если Git не работает, создайте файлы вручную на GitHub:

### Основные файлы для копирования:

1. **package.json** - зависимости проекта
2. **render.yaml** - конфигурация для Render
3. **build.sh** - скрипт сборки
4. **Dockerfile** - конфигурация Docker
5. **README.md** - описание проекта
6. **DEPLOYMENT.md** - инструкции по деплою
7. **.gitignore** - исключаемые файлы
8. **.env.example** - пример переменных окружения

### Папки с кодом:
- **client/** - весь фронтенд
- **server/** - весь бэкенд  
- **shared/** - общие типы

## Способ 3: Экспорт через Replit

1. В Replit откройте боковую панель
2. Найдите опцию "Download" или "Export"
3. Скачайте проект как ZIP архив
4. Распакуйте и загрузите на GitHub

## После создания репозитория на GitHub

1. Убедитесь что все файлы загружены
2. Особенно важны: `render.yaml`, `build.sh`, `package.json`
3. Переходите к деплою на Render по инструкции в DEPLOYMENT.md

## Проверка готовности

Репозиторий готов если содержит:
- Все файлы кода (client/, server/, shared/)
- Конфигурационные файлы (render.yaml, package.json)
- Документацию (README.md, DEPLOYMENT.md)