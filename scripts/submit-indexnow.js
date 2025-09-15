#!/usr/bin/env node

/**
 * Script to submit all pages to IndexNow
 * Usage: node scripts/submit-indexnow.js
 */

const BASE_URL = 'https://haydenbi.com';

async function submitToIndexNow() {
  try {
    console.log('🚀 Starting IndexNow submission...');
    
    const response = await fetch(`${BASE_URL}/api/indexnow`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        key: 'submit-all-pages'
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('✅ IndexNow submission completed:');
    console.log('📊 Response:', result);
    
    if (result.totalUrls !== undefined) {
      console.log(`📊 Total URLs: ${result.totalUrls}`);
    }
    if (result.successfulBatches !== undefined) {
      console.log(`✅ Successful batches: ${result.successfulBatches}`);
    }
    
    if (result.results) {
      console.log('\n📋 Batch results:');
      result.results.forEach((batch, index) => {
        console.log(`  Batch ${index + 1}: ${batch.success ? '✅' : '❌'} (${batch.urls.length} URLs)`);
      });
    }
    
  } catch (error) {
    console.error('❌ Error submitting to IndexNow:', error.message);
    process.exit(1);
  }
}

async function previewUrls() {
  try {
    console.log('👀 Previewing URLs to be submitted...');
    
    const response = await fetch(`${BASE_URL}/api/indexnow`);
    const result = await response.json();
    
    console.log(`📊 Total URLs: ${result.totalUrls}`);
    console.log('\n🔗 URLs to be submitted:');
    result.urls.forEach((url, index) => {
      console.log(`  ${index + 1}. ${url}`);
    });
    
  } catch (error) {
    console.error('❌ Error previewing URLs:', error.message);
  }
}

// Main execution
const args = process.argv.slice(2);
const command = args[0];

if (command === 'preview') {
  previewUrls();
} else if (command === 'submit' || !command) {
  submitToIndexNow();
} else {
  console.log('Usage:');
  console.log('  node scripts/submit-indexnow.js         # Submit all pages');
  console.log('  node scripts/submit-indexnow.js preview # Preview URLs only');
  console.log('  node scripts/submit-indexnow.js submit  # Submit all pages');
}