/**
 * @file
 * Main JavaScript file for Blogstrap theme.
 */

// Import main stylesheet
import '../src/scss/main.scss';

(function (Drupal, once) {
  'use strict';

  /**
   * Initialize theme behaviors.
   */
  Drupal.behaviors.blogstrap = {
    attach: function (context, settings) {
      // Add any JavaScript behaviors here.
      
      // Example: Initialize Bootstrap tooltips
      const tooltipTriggerList = [].slice.call(
        context.querySelectorAll('[data-bs-toggle="tooltip"]')
      );
      if (typeof bootstrap !== 'undefined') {
        tooltipTriggerList.map(function (tooltipTriggerEl) {
          return new bootstrap.Tooltip(tooltipTriggerEl);
        });
      }

      // Example: Initialize Bootstrap popovers
      const popoverTriggerList = [].slice.call(
        context.querySelectorAll('[data-bs-toggle="popover"]')
      );
      if (typeof bootstrap !== 'undefined') {
        popoverTriggerList.map(function (popoverTriggerEl) {
          return new bootstrap.Popover(popoverTriggerEl);
        });
      }
    },
  };

})(Drupal, once);
