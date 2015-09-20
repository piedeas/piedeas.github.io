/*
    Start of Enchant.js Game
    Author: Matt Kluting <mkluting@gmail.com>
*/

enchant();

window.onload = function() {
    var game = new Game(320,320);
    var map = new Map(16, 16);
    var baseMap = [
            [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
            [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
            [  0,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  0,  0],
            [  0,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  0],
            [  0,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  0],
            [  0,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  0],
            [  0,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  0],
            [  0,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  0],
            [  0,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  0],
            [  0,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  0],
            [  0,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  0],
            [  0,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  0,  0],
            [  0,  2,  2,  2,  2,  2,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
            [  0,  2,  2,  2,  2,  2,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
            [  0,  2,  2,  2,  2,  2,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
            [  0,  2,  2,  2,  2,  2,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0]
        ];
    preload(game);
    setup(game);

    // Setup Map
    map.image = game.assets['res/map1.gif'];
    map.loadData(baseMap);

    game.onload = function() {

        var scene = new Scene();
        var label = new Label("Game Started!");
        var sprite = new Sprite(32,32);
        sprite.image = game.assets['res/chara1.png'];
        scene.addChild(sprite);

        var up = false;
        sprite.addEventListener('touchstart', function() {
            if(up){
                sprite.x += 10;
                sprite.y -= 20;
                sprite.scale(.5, .5);
                sprite.opacity = 1;
                up = false;
            } else {
                sprite.x += 10;
                sprite.y += 20;
                sprite.scale(2, 2);
                sprite.opacity = .5;
                up = true;
            }
                sprite.rotate(180);
        });
//        scene.addChild(map);

        // Setup Label
        label.color = "green";
        label.font = 'italic bold 22px sans-serif';
        label.x = 100;
        label.y = 100;
        scene.addChild(label);

        game.pushScene(scene);
    }
    game.start();
};

// PRELOAD RESOURCES
function preload(game) {
    game.preload('res/BG.png');

    game.preload('res/chara1.png');
    game.preload('res/map1.gif');

    // THESE ARE HERE FOR A LONGER LOADING BAR
    game.preload('res/BG1.png');
    game.preload('res/BG2.png');
    game.preload('res/BG3.png');
    game.preload('res/BG4.png');
    game.preload('res/BG5.png');
    game.preload('res/BG6.png');
    game.preload('res/BG7.png');
    game.preload('res/BG8.png');
    game.preload('res/BG9.png');
    game.preload('res/BG10.png');
    game.preload('res/BG11.png');
    game.preload('res/BG12.png');
    game.preload('res/BG13.png');
    game.preload('res/BG14.png');
    game.preload('res/BG15.png');
}


// SET UP GAME SETTINGS
function setup(game) {
    game.fps = 30;
    game.scale = 1;
}
