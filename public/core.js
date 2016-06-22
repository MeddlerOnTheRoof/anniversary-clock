const MILLISECONDS_TO_SECONDS = 1000;
const MILLISECONDS_TO_MINS = MILLISECONDS_TO_SECONDS * 60;
const MILLISECONDS_TO_HOURS = MILLISECONDS_TO_MINS * 60;
const MILLISECONDS_TO_DAYS = MILLISECONDS_TO_HOURS * 24;
const MILLISECONDS_TO_WEEKS = MILLISECONDS_TO_DAYS * 7;

const pictures = [
    './imgs/background.jpg',
    './imgs/alt1.jpg',
    './imgs/alt2.jpg',
    './imgs/alt3.jpg'
];

var app = angular.module('clock', []);

app.controller('mainController', ['$scope', function($scope){
    const anniversary = new Date(2014,8,4, 16, 0, 0, 0);
    var counter = 0;

    $scope.clock;

    $scope.tick = function () {
        var today = new Date();
        var delta = today - anniversary;

        var d = Math.floor(delta / MILLISECONDS_TO_DAYS);
        delta -= d * MILLISECONDS_TO_DAYS

        var h = Math.floor(delta / MILLISECONDS_TO_HOURS);
        delta -= h * MILLISECONDS_TO_HOURS;

        var m = Math.floor(delta / MILLISECONDS_TO_MINS);
        delta -= m * MILLISECONDS_TO_MINS;

        var s = Math.floor(delta / MILLISECONDS_TO_SECONDS);

        $scope.clock = `${d} days, ${h} hours, ${m} minutes, and ${s} seconds (~${today.getFullYear() - anniversary.getFullYear()} years)`;

        $scope.anniversaryToday = today.getYear() === anniversary.getYear() &&
           today.getMonth() === anniversary.getMonth() &&
           today.getDay() === anniversary.getDay();

        counter++;
        if(counter === 90000){
            var img = document.getElementById('img'),
            style = img.currentStyle || window.getComputedStyle(img, false),
            currUrl = style.backgroundImage.slice(4, -1);

             currUrl = style.backgroundImage.slice(4, -1).replace(/"/g, "").replace("http://localhost:8642/","./");

            var ind = pictures.indexOf(currUrl);
            if (ind !== pictures.length -1){
                ind++;
            } else {
                ind = 0;
            }

            currUrl = pictures[ind].replace("./","http://localhost:8642/");

            document.getElementById('img').style.backgroundImage = `url(${currUrl})`;

            counter = 0;
        }

        // iterate through

        $scope.$apply();
    };

    $scope.anniversaryToday = false;

    setInterval($scope.tick, 500);
}]);