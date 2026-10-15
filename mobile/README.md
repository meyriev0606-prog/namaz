# Seynaro Mobile

Отдельный мобильный проект на Expo / React Native. Существующий сайт в корне репозитория не изменяется.

## Требования

- Node.js LTS
- Expo account для облачной сборки EAS
- Google Play Console account для публикации

## Локальный запуск

Из папки `mobile`:

```bash
npm install
npx expo start
```

## Проверка типов

```bash
npm run typecheck
```

## Android APK для тестирования

```bash
npx eas-cli build --platform android --profile preview
```

## Android App Bundle для Google Play

Перед первой сборкой создайте Expo-проект и замените `REPLACE_WITH_EXPO_PROJECT_ID` в `app.json` на настоящий ID, который выдаст команда `npx eas-cli init`.

```bash
npx eas-cli login
npx eas-cli init
npx eas-cli build --platform android --profile production
```

Production-профиль собирает файл `.aab`, подходящий для Google Play. Отправку в магазин пока не автоматизируем: сначала проверим приложение и настроим Play Console.

## Важно

Это стартовый экран. Реальные функции сайта (расчёт времени, кибла, трекер, азкары, уведомления и облачная синхронизация) будут переноситься отдельными этапами. Не публикуйте текущую заглушку как готовое приложение.
