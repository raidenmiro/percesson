# Percesso

Best personal dashboard for your browser

## Technologies

- Nx Typescript
- Solid-js Qwik Nestjs Prisma Zod
- Tailwindcss daisy-ui
- Eslint-kit Changeset Reviewpad Lefhook

## Features

- Weather
- Notes
- Gmail

## Setup for development

### Clone repo

- fork

```shell
git clone git@github.com:raidenmiro/percesson.git
```

### Configure environment

- Change `env.example` to `.env`

```dotenv
PORT=3333

#
DATABASE_URL=
DATABASE_USERNAME=
DATABASE_PASSWORD=

# Unsplash
UNSPLASH_TOKEN_ACCESS=
UNSPLASH_SECRET=
UNSPLASH_URL="https://api.unsplash.com/"

# Weather
WEATHER_KEY=
WEATHER_URL="https://api.openweathermap.org/data/3.0/"
```

- Install dependency

```sh
pnpm install
```

- Run

```sh
pnpm start
```
