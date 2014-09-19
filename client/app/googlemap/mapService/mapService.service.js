'use strict';

angular.module('rentbongoApp')
  .service('mapService',['$q', '$http', '$templateCache', '$interpolate', function($q, $http, $templateCache, $interpolate) {


            var geocoder;
            var map;
            var myMarkers = [];
            var google = window.google;
            var geoCache = {};
            
           //otherway round
            this.loadMarkers = function(url, params,options) {
                var _this = this;
                if(!url) return;
                $http.get(url, { params: params, cache: true }).success(function(data) {
                        angular.forEach(data,function(value){
                            var marker = _this.createMarker(value.geocode, null, google.maps.Animation.DROP);

                
                        _this.createInfoBox(marker, options, value);

                        myMarkers.push(marker);

                        });
                        });
                      }; 



            this.openMarkerInfo = function(fnFindMarker) {
                if (!myMarkers.length)
                    return;

                var currentMarker = myMarkers.filter(function(marker) {
                    return fnFindMarker(marker);
                });

                if(currentMarker.length == 0)
                    return;

                this.closeInfoWindows();
                this.panTo(currentMarker[0].getPosition());
                currentMarker[0].InfoBox.open(map, currentMarker[0]);
            };

            this.panTo = function(latLng){
                map.panTo(latLng);
            };

            

             this.initMap = function(mapId, options) {
                map = new google.maps.Map(mapId, options);
            }

            this.clearMap = function() {
                this.closeInfoWindows();
                angular.forEach(myMarkers, function(marker, key) {
                    marker.setMap(null);
                });
                myMarkers = [];
            };

            this.closeInfoWindows = function() {
                angular.forEach(myMarkers, function(marker, key) {
                    if (marker.InfoBox)
                        marker.InfoBox.close();
                });
            };

            this.convertToGoogleLatLng = function(lat, lng) {
                return new google.maps.LatLng(lat, lng);
            };


            this.createMarker = function(googleLatLng, icon,animation) {
                
                var optMap = {
                    map: map,
                    position:new google.maps.LatLng(googleLatLng[0],googleLatLng[1]),
                };
                if (icon)
                    optMap.icon = icon;

                if (animation)
                    optMap.animation = animation;

                var marker = new google.maps.Marker(optMap);

                return marker;
            };

            this.geocodeAddress = function(address) {
                var deferred = $q.defer();

                if (geoCache[address]) {
                    deferred.resolve(geoCache[address]);
                }
                else {
                    if (angular.isUndefined(geocoder)) {
                        geocoder = new google.maps.Geocoder();
                    }

                    geocoder.geocode({
                        'address': address
                    }, geocodeCallback);
                }

                function geocodeCallback(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
                            if (results && results[0] && results[0].geometry && results[0].geometry.viewport) {
                                geoCache[address] = results[0].geometry.location;
                                deferred.resolve(geoCache[address]);
                            }
                        }
                        else {
                            deferred.reject("No results found");
                        }
                    }
                    else {
                        deferred.reject("Geocode was not successful for the following reason: " + status);
                    }
                };

                return deferred.promise;
            };

            this.createPolygon = function(points) {
                var invisColor = "#000000";
                var outlineColor = "#0ABA02";

                points = points.map(function(latLong) {
                    return new google.maps.LatLng(latLong[0], latLong[1]);
                }); // Construct the polygon

                var polygon = new google.maps.Polygon({
                    paths: points,
                    strokeColor: outlineColor,
                    strokeOpacity: 1,
                    strokeWeight: 2,
                    fillColor: invisColor,
                    fillOpacity: 0.1
                });

                polygon.setMap(map);
            };

            this.createInfoBox= function (marker, infoBoxTemplate, model) {
                var _this=this;

                $http.get(infoBoxTemplate, {
                    cache: $templateCache
                }).success(function(tplContent) {
                    var compiledTemplate = $interpolate(tplContent)(model);
                    var myOptions = {
                        content: compiledTemplate,
                        disableAutoPan: false,
                        maxWidth: 0,
                        pixelOffset: new google.maps.Size(-250, -400),
                        zIndex: null,
                        closeBoxURL: "http://themes.layero.com/grahawp/wp-content/themes/graha/images/close-map.png",
                        infoBoxClearance: new google.maps.Size(1, 1),
                        isHidden: false,
                        pane: "floatPane",
                        enableEventPropagation: false
                    };
                    // end example code for custom infobox
                    var ib = new InfoBox(myOptions);

                    marker.InfoBox = ib;

                    marker.model = model;

                    google.maps.event.addListener(marker, "click", function(e) {
                        _this.closeInfoWindows();
                          ib.open(map, this);
                        _this.panTo(this.getPosition());
                    });
                });
            }

    


  }]);
