/**
 * Created by prateek on 07/12/16.
 */
app.factory('game', function() {
    var srv = {};
    var tiles = ['8-ball', 'kronos', 'baked-potato', 'dinosaur', 'rocket', 'skinny-unicorn',
        'that-guy', 'zeppelin'];

    function card(title) {
        this.title = title;
        srv.isFlipped = false;
    }

    card.prototype.flip = function() {
        this.isFlipped = !this.isFlipped;
    };

    srv.checkCard = function(name) {
        var deck = createTiles(name);

        this.grid = layout(deck);
        this.remainingPairs = name.length;

        this.flip = function(tile) {
            if (tile.isFlipped) {
                return;
            }

            tile.flip();

            if (!this.firstCard || this.secondCard) {

                if (this.secondCard) {
                    this.firstCard.flip();
                    this.secondCard.flip();
                    this.firstCard = this.secondCard = undefined;
                }

                this.firstCard = tile;

            } else {

                if (this.firstCard.title === tile.title) {
                    this.remainingPairs--;
                    if(this.remainingPairs == 0){
                        this.message = 'You win!';
                    }
                    this.firstCard = this.secondCard = undefined;
                } else {
                    this.secondCard = tile;
                    // this.message = 'You lost';
                }
            }
        }
    };


    /* Create an array with twice images of each type*/
    function createTiles(name) {
        var tile = [];
        name.forEach(function(name) {
            tile.push(new card(name));
            tile.push(new card(name));
        });

        return tile;
    }


    function layout(tileList) {
        var gridDimension = Math.sqrt(tileList.length),
            grid = [];

        for (var row = 0; row < gridDimension; row++) {
            grid[row] = [];
            for (var col = 0; col < gridDimension; col++) {
                grid[row][col] = shuffle(tileList);
            }
        }

        return grid;
    }


    function shuffle(tileList) {
        var i = Math.floor(Math.random()*tileList.length);
        return tileList.splice(i, 1)[0];
    }

    var init = function () {
         srv.checkCard(tiles);
    };
    init();
    return srv;
});