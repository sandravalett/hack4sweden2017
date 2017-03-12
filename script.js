var app = angular.module('app', []);
app.controller('ctrl', function($scope, $http) {
    $scope.heading= "Team Awesomeness";
    $scope.selectedArea = "";
    $scope.selectedPeriod = 0;
    $scope.selectedData = {};
    $scope.showInfo = false;
    $scope.allDate = null;

    $http.get('finalData.json').success(function(data) {
      $scope.allData = data;
      $scope.makeChart();
    });
    let map = "";

    $scope.makeChart = function(){
      var areas = $scope.allData[$scope.selectedPeriod].counties.map(function(county) {
         let obj = {
           id: county.id,
           value: (county.cover.all * 100)
         };
         return obj;
       });
      map = AmCharts.makeChart( "chartdiv", {
        "type": "map",
        "theme": "light",
        "colorSteps": 10,
        "backgroundColor": "#454523",
        "dataProvider": {
          "map": "swedenLow",
          "areas": areas
        },
        "areasSettings": {
          "autoZoom": true,
          alpha: 1,
      		color: "#AACE9B",
      		colorSolid: "#51843A",
      		outlineColor: "#FFFFFF",
      		outlineAlpha: 0.5,
      		outlineThickness: 1,
      		rollOverColor: "#8BA6A9",
      		rollOverOutlineColor: "#fff",
      		selectedOutlineColor: "#fff",
      		selectedColor: "#A7CECB",
      		unlistedAreasOutlineColor: "#FFFFFF",
      		unlistedAreasOutlineAlpha: 0.5,
      		autoZoom: true
        },
        "export": {
          "enabled": false
        },
          "valueLegend": {
            "right": 10,
            "minValue": "0%",
            "maxValue": "100%"
          },
      });

      map.addListener("clickMapObject", function (event) {
        if (event.mapObject.objectType !== "MapArea")
          return;

        $scope.$apply(function(){
            if($scope.selectedArea == event.mapObject.id){
               $scope.selectedArea = "";
               $scope.setSelectedData(null);

            }
            else{
              $scope.selectedArea = event.mapObject.id;
              $scope.setSelectedData(event.mapObject.id);

            }
        });

      });
      map.addListener("homeButtonClicked",function(event){
        $scope.makeChart();
        $scope.$apply(function(){
            $scope.selectedArea = "";
            $scope.showInfo = false;
        });
      });
      map.addListener("selectedObjectChanged", function(event){
        if($scope.selectedArea != ""){
          setTimeout(function () {
            $scope.updateChart(true);
          }, 500);
        }
      });
  }

    $scope.getMonth = function(){
      let list = ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"];
      return list[$scope.selectedPeriod];
    }
    $scope.datestring = "2016 - "+$scope.getMonth();


    $scope.setSelectedData = function(id){
      if(id != undefined){
        var selectedList = $scope.allData[$scope.selectedPeriod].counties.filter(function(county){return county.id === id});
        $scope.selectedData = selectedList[0] || undefined;
        $scope.showInfo = selectedList.length > 0;
      }
      else{
        $scope.selectedData = undefined;
        $scope.showInfo = false;

      }
    }
    $scope.updateChart = function(keepZoom){
      var areas = $scope.allData[$scope.selectedPeriod].counties.map(function(county) {
         let obj = {
           id: county.id,
           value: (county.cover.all * 100),
           showAsSelected: county.id === $scope.selectedArea
             };
         return obj;
       });

      map.dataProvider.areas = areas;
      if(keepZoom){
        map.dataProvider.zoomLevel = map.zoomLevel();
        map.dataProvider.zoomLatitude = map.dataProvider.zoomLatitudeC = map.zoomLatitude();
        map.dataProvider.zoomLongitude = map.dataProvider.zoomLongitudeC = map.zoomLongitude();
      }
      // update map
      map.validateData();


      var selectedList = $scope.allData[$scope.selectedPeriod].counties.filter(function(county){return county.id === $scope.selectedArea});
      $scope.selectedData = selectedList[0];
    }
    $scope.$watch('selectedPeriod', function() {
        $scope.datestring = "2016 - "+$scope.getMonth();
        if($scope.allData != null){
          $scope.updateChart(true);

        }

    });

});
