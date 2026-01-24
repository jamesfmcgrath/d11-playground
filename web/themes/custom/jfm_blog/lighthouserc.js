module.exports = {
  ci: {
    collect: {
      // Collect Lighthouse results for these URLs
      url: [
        'https://d11-playground.ddev.site/',
        'https://d11-playground.ddev.site/blog',
        'https://d11-playground.ddev.site/node/1'
      ],
      numberOfRuns: 3,
      settings: {
        // Lighthouse settings
        preset: 'desktop',
        throttling: {
          rttMs: 40,
          throughputKbps: 10240,
          cpuSlowdownMultiplier: 1
        },
        screenEmulation: {
          mobile: false,
          width: 1350,
          height: 940,
          deviceScaleFactor: 1,
          disabled: false
        },
        formFactor: 'desktop'
      }
    },
    assert: {
      // Assertions for performance metrics
      assertions: {
        'categories:performance': ['error', {minScore: 0.9}],
        'categories:accessibility': ['error', {minScore: 1.0}],
        'categories:best-practices': ['error', {minScore: 0.9}],
        'categories:seo': ['error', {minScore: 0.9}],
        
        // Core Web Vitals
        'first-contentful-paint': ['warn', {maxNumericValue: 2000}],
        'largest-contentful-paint': ['error', {maxNumericValue: 2500}],
        'cumulative-layout-shift': ['error', {maxNumericValue: 0.1}],
        'total-blocking-time': ['warn', {maxNumericValue: 300}],
        
        // Additional metrics
        'speed-index': ['warn', {maxNumericValue: 3000}],
        'interactive': ['warn', {maxNumericValue: 3500}],
        
        // Performance budgets
        'resource-summary:stylesheet:size': ['error', {maxNumericValue: 50000}], // CSS < 50KB
        'resource-summary:script:size': ['error', {maxNumericValue: 20000}] // JS < 20KB
      }
    },
    upload: {
      target: 'temporary-public-storage'
    }
  }
};
