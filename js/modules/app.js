(function () {
    var app = angular.module('orgChart', ['ngSanitize']);

    app.config(function ($httpProvider) {
        $httpProvider.defaults.headers.post = {};
    });



    app.controller('apiController', ['$http', function ($http) {
        var api = this;
        api.apis = [];
        api.apis.team1 = [];
        api.apis.team2 = [];
        api.apis.team3 = [];
        api.apis.team4 = [];
        api.apis.team5 = [];
        //var read = "{\"operation\":\"read\",\"tableName\":\"LambdaTable\",\"payload\":{\"Item\":{\"Id\":\"5\",\"name\":\"Nicholas\"}}}";
        var list = "{\"operation\":\"list\",\"tableName\":\"LambdaTable\",\"payload\":{}}";
        //var update = "{\"operation\":\"update\",\"tableName\":\"LambdaTable\",\"payload\":{\"Item\":{\"Id\":\"5\",\"name\":\"Nicholas\"}}}";
        //var create = "{\"operation\":\"create\",\"tableName\":\"LambdaTable\",\"payload\":{\"Item\":{\"Id\":\"5\",\"name\":\"blerp\"}}}";
        //var deletes = "{\"operation\":\"delete\",\"tableName\":\"LambdaTable\",\"payload\":{\"Item\":{\"Id\":\"5\",\"name\":\"Nicholas\"}}}";
        //var create = "{\"operation\":\"create\",\"tableName\":\"LambdaTable\",\"payload\":{\"Item\":{\"Id\":\"15\",\"name\":\"Bleeeeeep\",\"team\":\"team1\",\"title\":\"manager\", \"via\":\"nick@gmail.com\",\"skills\":{[{\"skill1\":\"ad\",\"skill2\":\"mobile\",\"skill3\":\"telephony\",\"skill4\":\"exchange\",\"skill5\":\"extra\"}]}}}}";



        //$http.post('https://6mgpi9zk4d.execute-api.us-east-1.amazonaws.com/prod/table', list).success(function (data) {
        //    for (i = 0; i < data.Items.length; i++) {
        //        api.apis.push(data.Items[i]);
        //    }
        //});

        $http.post('https://6mgpi9zk4d.execute-api.us-east-1.amazonaws.com/prod/table', list).success(function (data) {
            for (i = 0; i < data.Items.length; i++) {
                if (data.Items[i].team === "team1") {
                    api.apis.team1.push(data.Items[i]);
                } else if (data.Items[i].team === "team2") {
                    api.apis.team2.push(data.Items[i]);
                } else if (data.Items[i].team === "team3") {
                    api.apis.team3.push(data.Items[i]);
                } else if (data.Items[i].team === "team4") {
                    api.apis.team4.push(data.Items[i]);
                } else {
                    api.apis.team5.push(data.Items[i]);
                }
            }
        });



    } ]);


    //app.controller('orgController', ['$http', function ($http) {
    //    var org = this;
    //    org.orgs = [];
    //    var list = "{\"operation\":\"list\",\"tableName\":\"team2\",\"payload\":{}}";
    //    $http.post('https://6mgpi9zk4d.execute-api.us-east-1.amazonaws.com/prod/table', list).success(function (data) {
    //        for (i = 0; i < data.Items.length; i++) {
    //            org.orgs.push(data.Items[i]);
    //        }
    //    });

    //} ]);

    app.controller('formCtrl', ['$http', '$scope', function ($http, $scope, $httpParamSerializerJQLike) {



        this.submit = function () {

            if ($scope.skill1) { $scope.skill1 = 'ad' } else { $scope.skill1 = 'no' }
            if ($scope.skill2) { $scope.skill2 = 'mobile' } else { $scope.skill2 = 'no' }
            if ($scope.skill3) { $scope.skill3 = 'telephony' } else { $scope.skill3 = 'no' }
            if ($scope.skill4) { $scope.skill4 = 'exchange' } else { $scope.skill4 = 'no' }
            if ($scope.skill5) { $scope.skill5 = 'extra' } else { $scope.skill5 = 'no' }


            var createPerson = {
                "operation": "create",
                "tableName": "LambdaTable",
                "payload": {
                    "Item": {
                        "Id": $scope.Id,
                        "name": $scope.firstname,
                        "skills": { "0": $scope.skill1, "1": $scope.skill2, "2": $scope.skill3, "3": $scope.skill4 },
                        "team": $scope.team,
                        "title": $scope.title,
                        "via": $scope.emailaddress
                    }
                }
            }

            //if ($scope.team === "team1") {
            //    api.apis.team1.push(createPerson);
            //} else if ($scope.team === "team2") {
            //    api.apis.team2.push(createPerson);
            //} else if ($scope.team === "team3") {
            //    api.apis.team3.push(createPerson);
            //} else if ($scope.team === "team4") {
            //    api.apis.team4.push(createPerson);
            //} else {
            //    api.apis.team5.push(createPerson);
            //}

            //var create = "{\"operation\":\"create\",\"tableName\":\"LambdaTable\",\"payload\":{\"Item\":{\"Id\":\"15\",\"name\":\"Bloooooop\",\"team\":\"team1\",\"title\":\"manager\", \"via\":\"nick@gmail.com\",\"skills\":{\"0\":\"ad\",\"1\":\"mobile\",\"2\":\"telephony\",\"3\":\"exchange\",\"4\":\"extra\"}}}}";
            var create = JSON.stringify(createPerson);
            //console.log(create);
            $http.post('https://6mgpi9zk4d.execute-api.us-east-1.amazonaws.com/prod/table', create);
        }
        this.remover = function () {
            var removePerson = {
                  "operation": "delete",
                  "tableName": "LambdaTable",
                  "Key": $scope.Id
    
                }
            
            var goodbye = JSON.stringify(removePerson);
            console.log(goodbye);
            $http.post('https://6mgpi9zk4d.execute-api.us-east-1.amazonaws.com/prod/table', goodbye);
        }




    } ]);



    app.filter('changeIcon', function () {
        var exchangeIcon = '<i class="fa fa-envelope-o"></i>';
        var adIcon = '<i class="fa fa-users"></i>';
        var telephonyIcon = '<i class="fa fa-phone"></i>';
        var mobileIcon = '<i class="fa fa-mobile-phone"></i>';
        var extraIcon = '<i class="fa fa-chain"></i>';
        var blank = '';
        return function (string) {
            switch (string) {
                case 'exchange':
                    return exchangeIcon;
                    break;
                case 'ad':
                    return adIcon;
                    break;
                case 'telephony':
                    return telephonyIcon;
                    break;
                case 'mobile':
                    return mobileIcon;
                    break;
                case 'extra':
                    return extraIcon;
                    break;
                default:
                    return blank;
            }
        }
    });

    app.directive("theLegend", function () {
        return {
            restrict: "E",
            templateUrl: "/js/directives/the-legend.html"
        }
    });

    app.directive("salesDept", ['$http', function ($http) {
        return {
            restrict: "E",
            templateUrl: "/js/directives/sales-dept.html",
            controller: function () {

            },
            controllerAs: "sales"
        };
    } ]);



})();
