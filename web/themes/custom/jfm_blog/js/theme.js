/**
 * @file
 * Theme JavaScript for JFM Blog.
 *
 * Progressive enhancement only - site must work without JavaScript.
 * Uses vanilla JavaScript, no dependencies.
 */

(function () {
  'use strict';

  /**
   * Skip link focus management.
   *
   * When skip link is clicked, focus the target element
   * and ensure it's visible in the viewport.
   */
  function initSkipLink() {
    const skipLink = document.querySelector('.skip-link');
    if (!skipLink) {
      return;
    }

    skipLink.addEventListener('click', function (event) {
      const targetId = skipLink.getAttribute('href');
      if (!targetId || !targetId.startsWith('#')) {
        return;
      }

      const target = document.querySelector(targetId);
      if (!target) {
        return;
      }

      // Prevent default anchor behavior
      event.preventDefault();

      // Focus the target element
      target.setAttribute('tabindex', '-1');
      target.focus();

      // Remove tabindex after focus to restore normal tab order
      target.addEventListener('blur', function () {
        target.removeAttribute('tabindex');
      }, { once: true });

      // Scroll target into view if needed
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  /**
   * Smooth scroll for anchor links.
   *
   * Enhances anchor link navigation with smooth scrolling
   * if the target hash exists on the page.
   */
  function initSmoothScroll() {
    // Check if smooth scroll is supported
    if (!('scrollBehavior' in document.documentElement.style)) {
      return;
    }

    // Handle all anchor links
    document.addEventListener('click', function (event) {
      const link = event.target.closest('a[href^="#"]');
      if (!link) {
        return;
      }

      const hash = link.getAttribute('href');
      if (hash === '#' || hash === '#!') {
        return;
      }

      const target = document.querySelector(hash);
      if (!target) {
        return;
      }

      // Only enhance if it's not the skip link (handled separately)
      if (link.classList.contains('skip-link')) {
        return;
      }

      // Prevent default behavior
      event.preventDefault();

      // Update URL without jumping
      if (history.pushState) {
        history.pushState(null, null, hash);
      }

      // Scroll to target
      target.setAttribute('tabindex', '-1');
      target.focus();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Remove tabindex after focus
      target.addEventListener('blur', function () {
        target.removeAttribute('tabindex');
      }, { once: true });
    });
  }

  /**
   * Feature detection helper.
   *
   * Checks if required features are available before using them.
   */
  function hasFeature(feature) {
    switch (feature) {
      case 'querySelector':
        return typeof document.querySelector === 'function';
      case 'addEventListener':
        return typeof document.addEventListener === 'function';
      case 'classList':
        return 'classList' in document.documentElement;
      case 'scrollBehavior':
        return 'scrollBehavior' in document.documentElement.style;
      default:
        return false;
    }
  }

  /**
   * Initialize all theme functionality.
   *
   * Only runs if required features are available.
   */
  function init() {
    // Feature detection - ensure basic APIs are available
    if (!hasFeature('querySelector') || !hasFeature('addEventListener')) {
      return;
    }

    // Initialize skip link functionality
    initSkipLink();

    // Initialize smooth scroll (only if supported)
    if (hasFeature('scrollBehavior')) {
      initSmoothScroll();
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    // DOM already loaded
    init();
  }

})();
