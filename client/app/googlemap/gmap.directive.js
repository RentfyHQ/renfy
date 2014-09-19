'use strict';

angular.module('rentbongoApp')
  .directive('gmap',['mapService',function (mapService) {
    return {
      template: '<div id="map"></div>',
      restrict: 'EA',
      replace:true,
      controller:'MainCtrl',
      link:function ($scope, $element,$attributes) {
      	  var mapOptions = {
                    zoom: 13,
                    draggable: true,
                    center: mapService.convertToGoogleLatLng(-6.82349, 39.26951),
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };

        mapService.initMap($element[0],mapOptions);

        mapService.loadMarkers($attributes.url,$attributes.param,$scope.selectedTemplate);
      }
    };
  }]);