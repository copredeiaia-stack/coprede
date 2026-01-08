import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

// Load env
const envPath = path.resolve(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');
const env: Record<string, string> = {};
envContent.split('\n').forEach(line => {
    const [key, val] = line.split('=');
    if (key && val) env[key.trim()] = val.trim();
});

const supabaseUrl = env.VITE_SUPABASE_URL;
const supabaseKey = env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    fs.writeFileSync('debug_output.txt', 'Missing credentials in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
    const logs: string[] = [];
    const log = (msg: string) => {
        console.log(msg);
        logs.push(msg);
    };

    log(`Testing URL: ${supabaseUrl}`);
    log(`Key length: ${supabaseKey.length}`);

    // Attempt 1
    log('\n--- Attempt 1: "Newmonitor" ---');
    const { data: data1, error: error1 } = await supabase.from('Newmonitor').select('*').limit(5);
    if (error1) log(`Error: ${error1.message} (Code: ${error1.code})`);
    else log(`Success. Rows: ${data1?.length}`);
    if (data1 && data1.length > 0) log(`Sample Ticket: ${JSON.stringify(data1[0].ticket || data1[0].idEvento || 'N/A')}`);

    // Attempt 2
    log('\n--- Attempt 2: "newmonitor" ---');
    const { data: data2, error: error2 } = await supabase.from('newmonitor').select('*').limit(5);
    if (error2) log(`Error: ${error2.message}`);
    else log(`Success. Rows: ${data2?.length}`);

    fs.writeFileSync('debug_output.txt', logs.join('\n'));
}

testConnection();
