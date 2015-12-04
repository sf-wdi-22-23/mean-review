/*
 * SERVICES
 */

'use strict';

angular.module('myApp.services', [])
  .factory('Post', function ($window, $resource) {
    return $resource($window.location.origin + '/api/posts/:id', { id: '@id' }, {
      update: { method: 'PUT'} 
    });
  });