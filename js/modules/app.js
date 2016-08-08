(function () {
    var app = angular.module('orgChart', ['ngSanitize']);

    app.controller('OrgController', ['$http', function ($http) {
        var org = this;
        org.people = [];
        $http.get('http://orgchart.nickguimond.ca/js/team1.json').success(function (data) {
            org.people = data;

        });
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

    app.directive("teamList", function () {
        return {
            restrict: "E",
            templateUrl: "/js/directives/team-list.html"
        }
    });

})();
