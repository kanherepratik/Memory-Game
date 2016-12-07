/**
 * Created by prateek on 07/12/16.
 */
app.controller('myCtrl', function myCtrl($scope, game) {

    
    $scope.flip = function (tile) {
        game.flip(tile);
    }

    console.log(game.grid);

    $scope.game = game;
    console.log($scope.game)
});