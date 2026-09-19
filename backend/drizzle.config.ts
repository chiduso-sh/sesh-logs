import { defineConfig } from 'drizzle-kit'

// Node's built-in .env reader: copies backend/.env into process.env.
process.loadEnvFile()

const url = process.env.DATABASE_URL_UNPOOLED
if(!url){
  throw new Error("DATABASE_URL_UNPOOLED is missing: add it to backend/.env");
  
}

// drizzle-kit's instructions: what kind of database, where the schema is,
// and where to write the migration files it generates.
export default defineConfig({
  dialect: 'postgresql',
  schema: './schema.ts',
  out: './migrations',
  dbCredentials: {
    url, 
  },
})
