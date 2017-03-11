var app = angular.module('app', []);
app.controller('ctrl', function($scope) {
    $scope.heading= "Team Awesome";
    $scope.selectedArea = "";

    var map = AmCharts.makeChart( "chartdiv", {
      "type": "map",
      "theme": "light",
      "colorSteps": 10,
      "dataProvider": {
        "map": "swedenLow",
        "areas": [
          {
            "id": "SE-M",
            "value": 4447100
          },
          {
            "id": "SE-O",
            "value": 4447100

          },
          {
            "id": "SE-K",
            "value": 4447100

          },
              {
                  "id": "SE-C",
                  "value": 4447100

                },
                {
                    "id": "SE-AB",
                    "value": 4447100

                  },
                  {
                      "id": "SE-I",
                      "value": 4447100

                    },
                    {
                        "id": "SE-AC",
                        "value": 4447100

                      },
                  {
                          "id": "SE-Y",
                          "value": 4447100

                        },

                        {
                            "id": "SE-BD",
                            "value": 4447100

                          }, {
                              "id": "SE-Z",
                              "value": 4447100

                            },
                            {
                                "id": "SE-S",
                                "value": 4447100

                              },
                              {
                                  "id": "SE-N",
                                  "value": 4447100

                                },
                                {
                                    "id": "SE-N",
                                    "value": 4447100

                                  },
                                  {
                                      "id": "SE-U",
                                      "value": 4447100

                                    },
                                    {
                                        "id": "SE-D",
                                        "value": 4447100

                                      },
                                  {
                                          "id": "SE-E",
                                          "value": 4447100

                                        },
                                        {
                                        "id": "SE-T",
                                        "value": 4447100

                                      },

                                      {
                                          "id": "SE-G",
                                          "value": 4447100

                                        }, {
                                            "id": "SE-W",
                                            "value": 4447100

                                          },
                                          {
                                              "id": "SE-H",
                                              "value": 4447100

                                            },
                                            {
                                                "id": "SE-F",
                                                "value": 4447100

                                              },
                                              {
                                                  "id": "SE-X",
                                                  "value": 4447100

                                                }

        ]

      },

      "areasSettings": {
        "autoZoom": true
      },

      "export": {
        "enabled": false
      }
    });

    map.addListener("clickMapObject", function (event) {
      if (event.mapObject.objectType !== "MapArea")
        return;

      $scope.$apply(function(){
          if($scope.selectedArea == area.id){
            $scope.selectedArea = "";
          }
          else{
            $scope.selectedArea = area.id;
          }
      });
    });

});


function getSelectedCounties() {
  var selected = [];
  for(var i = 0; i < map.dataProvider.areas.length; i++) {
    if(map.dataProvider.areas[i].showAsSelected)
      selected.push(map.dataProvider.areas[i].id);
  }
  return selected[0] || "";
}
