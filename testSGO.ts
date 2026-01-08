// Test script to verify SGO table connection
import { supabase } from './supabaseClient';

async function testSGOConnection() {
    console.log('🧪 Testing SGO Table Connection...\n');

    try {
        // Test 1: Count total records
        console.log('📊 Test 1: Counting total records...');
        const { count, error: countError } = await supabase
            .from('SGO')
            .select('*', { count: 'exact', head: true });

        if (countError) {
            console.error('❌ Count Error:', countError);
        } else {
            console.log(`✅ Total records in SGO table: ${count}`);
        }

        // Test 2: Fetch first 5 records
        console.log('\n📊 Test 2: Fetching first 5 records...');
        const { data, error } = await supabase
            .from('SGO')
            .select('*')
            .limit(5);

        if (error) {
            console.error('❌ Fetch Error:', error);
            console.error('Error details:', {
                message: error.message,
                details: error.details,
                hint: error.hint,
                code: error.code
            });
        } else {
            console.log(`✅ Fetched ${data?.length || 0} records`);
            if (data && data.length > 0) {
                console.log('\n📋 Sample record:');
                console.log(JSON.stringify(data[0], null, 2));

                console.log('\n📋 Available columns:');
                console.log(Object.keys(data[0]).join(', '));
            } else {
                console.log('⚠️ No data returned from SGO table');
            }
        }

        // Test 3: Check nm_status values
        console.log('\n📊 Test 3: Checking nm_status distribution...');
        const { data: statusData, error: statusError } = await supabase
            .from('SGO')
            .select('nm_status');

        if (statusError) {
            console.error('❌ Status Error:', statusError);
        } else {
            const statusCounts: Record<string, number> = {};
            statusData?.forEach(item => {
                const status = item.nm_status || 'NULL';
                statusCounts[status] = (statusCounts[status] || 0) + 1;
            });
            console.log('✅ Status distribution:');
            console.log(statusCounts);
        }

    } catch (err) {
        console.error('💥 Unexpected error:', err);
    }
}

// Run the test
testSGOConnection();

export default testSGOConnection;
