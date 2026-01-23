/**
 * @file
 * Main JavaScript file for jfm_blog theme.
 *
 * Vanilla JavaScript only - no external dependencies.
 */

(function (Drupal) {
  'use strict';

  /**
   * Attach behaviors for jfm_blog theme.
   */
  Drupal.behaviors.jfmBlog = {
    attach: function (context, settings) {
      // Initialize theme behaviors here.
      // Example: Mobile menu toggle, smooth scrolling, etc.
      
      // Add any custom JavaScript functionality as needed.
      const mainMenu = context.querySelector('.menu--main');
      if (mainMenu) {
        // Example: Add mobile menu toggle functionality
        this.initMobileMenu(mainMenu);
      }
    },

    /**
     * Initialize mobile menu functionality.
     */
    initMobileMenu: function (menu) {
      // Add mobile menu toggle if needed.
      // This is a placeholder for future functionality.
    }
  };

})(Drupal);
