# Elypt - Your Personal Finance API

## Getting Started
- Have Bun installed.
- Clone this repo.
- Install dependencies with:
    ```bash
    bun install
    ```
- Create a `.env` file with the following:
    ```json
    DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/DB_NAME?schema=public"
    ```
- Generate the Prisma artifacts:
    ```bash
    bun run prisma generate
    ```

## Development
To start the development server run:
```bash
bun run dev
```

Open http://localhost:3000/ with your browser to see the result.