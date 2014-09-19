'use strict';

angular.module('rentbongoApp')
  .controller('MainCtrl',['$scope', '$http', 'socket','mapService',function ($scope, $http, socket,mapService){
          $scope.awesomeThings = []; 

          var google=window.google; 

          $scope.addPlace = function(){
                var place = {
                    id: $scope.places.length +1,
                    name: $scope.newPlaceName,
                    address: $scope.newPlaceAddress
                };

                var address = place.address;
                mapService.geocodeAddress(address).then(function (location) {
                    var geocodedPlace = [location, place];
                    plotLocation([geocodedPlace]);
                    mapService.panTo(location);
                });

                $scope.places.push(place);

                $scope.newPlaceName = "";
                $scope.newPlaceAddress = "";
            }

            $scope.showPlace = function(place){
                mapService.openMarkerInfo(function(marker){
                    return marker.model.id == place.id;
                })
            };

           
                $scope.newPlaceName = "The White House";
                $scope.newPlaceAddress = "1600 Pennsylvania Ave NW, Washington";

                $scope.places = [
                    {id:1, address: '10000 Perkins Rowe Ave, Baton Rouge, LA', name: "Envoc (My Office)", logo: 'http://dl.dropboxusercontent.com/u/2857953/img/logo.png'},
                    {id:2, address: '15961 Airline Hwy, Baton Rouge, LA', name: "MMR", logo: 'http://placehold.it/380x380'},
                    {id:3, address: '302 Pinoak Street, Denham Springs, LA', name: "Where I grew up", logo: 'http://placehold.it/380x380'}
                ];

                $scope.availableTemplates = [
                    
                    'components/infowindow/infowindow.html'
                ];

                $scope.selectedTemplate = $scope.availableTemplates[0];
            
       

    

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });
  } ]);