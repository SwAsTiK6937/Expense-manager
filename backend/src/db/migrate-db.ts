import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';
import { env } from '../config/env.js';

const { Pool } = pg;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function migrate() {
    console.log('🚀 Starting migration...');

    const pool = new Pool({
        connectionString: env.DATABASE_URL,
        ssl: env.DATABASE_URL?.includes('sslmode=require')
            ? { rejectUnauthorized: false }
            : undefined,
    });

    const schemaPath = path.join(__dirname, 'schema.sql');

    if (!fs.existsSync(schemaPath)) {
        throw new Error('schema.sql not found in same folder');
    }

    const sql = fs.readFileSync(schemaPath, 'utf-8');

    await pool.query(sql);
    await pool.end();

    console.log('✅ Migration completed successfully.');
    process.exit(0);
}

migrate().catch((err) => {
    console.error('❌ Migration failed:', err.message);
    process.exit(1);
});
