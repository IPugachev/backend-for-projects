# Backend API

Backend приложение на Node.js с использованием Express, TypeScript, Prisma и PostgreSQL.

## Стек

- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- Docker
- Zod

---

# Установка

Клонировать репозиторий:

```bash
git clone <repository-url>
```

Перейти в папку проекта:

```bash
cd backend
```

Установить зависимости:

```bash
npm install
```

---

# Переменные окружения

Создать файл `.env` в корне проекта:

```env
PORT=3000

DATABASE_URL="postgresql://postgres:postgres@localhost:5432/backend"
```

## Формат DATABASE_URL

Общий формат:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
```

Пример:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/backend"
```

Расшифровка:

- `postgresql` — используемый тип базы данных
- `postgres` — пользователь базы данных
- `postgres` — пароль
- `localhost` — адрес сервера базы данных
- `5432` — порт PostgreSQL
- `backend` — название базы данных

---

# PostgreSQL через Docker

В проекте используется Docker для запуска PostgreSQL.

Запуск контейнера:

```bash
docker compose up -d
```

Проверить запущенные контейнеры:

```bash
docker ps
```

Остановка контейнера:

```bash
docker compose down
```

Удаление контейнера вместе с данными базы:

```bash
docker compose down -v
```

> Внимание: удаление volume удаляет все данные PostgreSQL.

---

# Prisma

## Генерация Prisma Client

После изменения Prisma схемы необходимо обновить клиент:

```bash
npx prisma generate
```

---

## Работа с миграциями

Все модели базы данных находятся в:

```
prisma/schema.prisma
```

Пример модели:

```prisma
model User {
  id    Int    @id @default(autoincrement())
  name  String
  email String @unique
}
```

После изменения схемы создать новую миграцию:

```bash
npx prisma migrate dev --name migration_name
```

Пример:

```bash
npx prisma migrate dev --name add_user_age
```

Prisma:

1. создаст SQL миграцию;
2. применит изменения к PostgreSQL;
3. обновит Prisma Client.

---

# Создание новых таблиц

Новые таблицы добавляются через модели в:

```
prisma/schema.prisma
```

Например:

```prisma
model Post {
  id      Int    @id @default(autoincrement())
  title   String
  content String?
}
```

После добавления модели:

```bash
npx prisma migrate dev --name add_posts
```

---

# Изменение существующих таблиц

Для изменения таблицы необходимо изменить модель Prisma.

Например:

Было:

```prisma
model User {
  id    Int    @id @default(autoincrement())
  name  String
  email String @unique
}
```

Добавляем поле:

```prisma
model User {
  id    Int    @id @default(autoincrement())
  name  String
  email String @unique
  age   Int?
}
```

Создаем миграцию:

```bash
npx prisma migrate dev --name add_user_age
```

---

# Просмотр базы данных

Для просмотра данных можно использовать Prisma Studio:

```bash
npx prisma studio
```

Откроется веб-интерфейс для просмотра и изменения данных.

Также можно подключиться к PostgreSQL через IDE (например WebStorm/DataGrip).

---

# Запуск проекта

Development режим:

```bash
npm run dev
```

Production режим:

Сборка:

```bash
npm run build
```

Запуск:

```bash
npm start
```

---

# Структура проекта

```
src/
├── controllers/       # обработчики HTTP запросов
├── routes/            # маршруты API
├── services/          # бизнес-логика
├── middleware/        # middleware Express
├── errors/            # пользовательские ошибки
├── lib/
│   └── prisma.ts      # Prisma Client
├── generated/
│   └── prisma/        # сгенерированный Prisma Client
└── server.ts          # запуск сервера

prisma/
├── schema.prisma      # описание базы данных
└── migrations/        # история изменений базы
```

---

# Работа с базой данных в команде

После получения проекта:

1. Установить зависимости:

```bash
npm install
```

2. Создать `.env`:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/backend"
```

3. Запустить PostgreSQL:

```bash
docker compose up -d
```

4. Применить существующие миграции:

```bash
npx prisma migrate dev
```

5. Запустить сервер:

```bash
npm run dev
```

---

# Основной workflow Prisma

При изменении базы:

```
schema.prisma
        |
        v
prisma migrate dev
        |
        v
PostgreSQL
        |
        v
prisma generate
        |
        v
Prisma Client
```

Порядок действий:

1. Изменить `schema.prisma`.
2. Создать миграцию.
3. Проверить изменения в базе.
4. Использовать обновленный Prisma Client в сервисах.
