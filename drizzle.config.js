import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';


module.exports = defineConfig({
  out: './drizzle',
  schema: './src/db/tables/schema.js',
  dialect: 'sqlite',
  dbCredentials: {
    url: 'file:local.db',
  },
});