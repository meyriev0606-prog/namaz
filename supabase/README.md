# Настройка облачных Push-уведомлений

Эта папка содержит схему Supabase для приложения «Намаз».

## 1. Создать проект Supabase
1. Откройте https://supabase.com/dashboard и создайте проект.
2. В проекте откройте **SQL Editor → New query**.
3. Скопируйте содержимое файла `schema.sql`, вставьте в редактор и нажмите **Run**.
4. В **Authentication → Providers → Anonymous Sign-Ins** убедитесь, что Anonymous sign-ins включены.

## 2. Настроить ключи
В **Project Settings → API** (или **Connect**) найдите:
- Project URL
- Publishable key (или legacy anon/public key)

Project URL и publishable/anon key предназначены для клиентского приложения и будут встроены в `subscribe.html` / `index.html`. Это не service-role key.

В GitHub → Settings → Secrets and variables → Actions добавьте:
- `SUPABASE_URL` = Project URL
- `SUPABASE_SERVICE_ROLE_KEY` = secret/service_role key (только GitHub Secret, не вставлять в сайт и не отправлять в чат)

Не публикуйте service-role key. Он обходит Row Level Security.

## 3. Что хранит таблица
Каждая установка приложения хранится отдельной строкой `public.prayer_devices`: подписка Push, координаты, часовой пояс, город и настройки напоминаний. RLS разрешает клиенту читать и изменять только собственную строку. Серверная рассылка использует service-role key из GitHub Secrets.

## Важно
Пока проект Supabase не создан и URL/публичный ключ не настроены в клиентском коде, облачная синхронизация не активируется. Текущая тестовая подписка и старый одиночный сценарий не удаляются этой схемой.
