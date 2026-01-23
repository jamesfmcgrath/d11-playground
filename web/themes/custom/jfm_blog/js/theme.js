/**
 * @file
 * Main JavaScript file for jfm_blog theme.
 *
 * Vanilla JavaScript only - no external dependencies.
 */

(function (Drupal) {
  "use strict";

  /**
   * Attach behaviors for jfm_blog theme.
   */
  Drupal.behaviors.jfmBlog = {
    attach: function (context, settings) {
      // Initialize theme behaviors here.
      // Example: Mobile menu toggle, smooth scrolling, etc.

      // Add any custom JavaScript functionality as needed.
      const siteHeader = context.querySelector(".site-header");
      if (siteHeader) {
        // Example: Add mobile menu toggle functionality
        this.initMobileMenu(siteHeader);
      }
    },

    /**
     * Initialize mobile menu functionality.
     */
    initMobileMenu: function (header) {
      // Add mobile menu toggle if needed.
      // This is a placeholder for future functionality.
    },
  };
})(Drupal);
