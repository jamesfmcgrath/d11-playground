#!/usr/bin/env node

/**
 * @file
 * Simple HTML validation script for JFM Blog theme.
 * 
 * Validates HTML output from key pages.
 */

const validator = require('html-validator');
const http = require('http');
const https = require('https');
const { URL } = require('url');

// URLs to validate
const urls = [
  'https://d11-playground.ddev.site/',
  'https://d11-playground.ddev.site/blog',
  'https://d11-playground.ddev.site/node/1'
];

/**
 * Fetch HTML from URL.
 */
async function fetchHTML(url) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const client = urlObj.protocol === 'https:' ? https : http;
    
    const options = {
      rejectUnauthorized: false // Allow self-signed certificates for local development
    };
    
    client.get(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

/**
 * Validate HTML string.
 */
async function validateHTML(html, url) {
  try {
    const result = await validator({
      data: html,
      format: 'text',
      validator: 'WHATWG'
    });
    
    const resultString = typeof result === 'string' ? result : JSON.stringify(result);
    
    if (resultString.includes('Error') || resultString.includes('error')) {
      console.error(`\n❌ Validation errors for ${url}:`);
      console.error(resultString);
      return false;
    } else {
      console.log(`✅ ${url} - Valid HTML`);
      return true;
    }
  } catch (error) {
    console.error(`\n❌ Error validating ${url}:`, error.message);
    return false;
  }
}

/**
 * Main validation function.
 */
async function main() {
  console.log('Starting HTML validation...\n');
  
  let allValid = true;
  
  for (const url of urls) {
    try {
      const html = await fetchHTML(url);
      const isValid = await validateHTML(html, url);
      
      if (!isValid) {
        allValid = false;
      }
    } catch (error) {
      console.error(`\n❌ Could not fetch ${url}:`, error.message);
      console.error('Make sure your Drupal site is running at https://d11-playground.ddev.site\n');
      allValid = false;
    }
  }
  
  console.log('\n' + '='.repeat(50));
  
  if (allValid) {
    console.log('✅ All HTML validation passed!');
    process.exit(0);
  } else {
    console.log('❌ Some HTML validation failed.');
    console.log('Review errors above and fix templates.\n');
    process.exit(1);
  }
}

// Run validation
main().catch(error => {
  console.error('Unexpected error:', error);
  process.exit(1);
});
