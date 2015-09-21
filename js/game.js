/*
    Start of Enchant.js Game
    Author: Matt Kluting <mkluting@gmail.com>
*/

enchant();
var highScore = 0;

window.onload = function() {
    var game = new Game(320,440);
    preload(game);
    setup(game);
    game.onload = function() {

        var scene = new SceneGame();
        game.pushScene(scene);
    }
    game.start();

    var SceneGame = Class.create(Scene, {
        initialize: function() {
          var game, label, bg, character, iceGroup;

          Scene.apply(this);
          game = Game.instance;
          label = new Label('SCORE<br/>0');
          bg = new Sprite(320,440);
          bg.image = game.assets['res/BG.png'];

          character = new Penguin();
          character.x = game.width/2 - character.width/2;
          character.y = 280;
          this.penguin = character;

          iceGroup = new Group();
          this.iceGroup = iceGroup;

          label.x = 9;
          label.y = 32;
          label.color = 'white';
          label.font = '16px strong';
          label.textAlign = 'center';
          label._style.textShadow = "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black";
          this.scoreLabel = label;

          this.addChild(bg);
          this.addChild(iceGroup);
          this.addChild(character);
          this.addChild(label);
          this.addEventListener(Event.TOUCH_START,this.handleTouchControl);

          // Ice
          this.generateIceTimer = 0;
          this.addEventListener(Event.ENTER_FRAME, this.update);

          this.score = 0;
          this.scoreTimer = 0;
        },
        setScore: function(value) {
          this.score = value;
          this.scoreLabel.text = 'SCORE<br/>'+this.score;
        },
        handleTouchControl: function(e) {
          var laneWidth, lane;
          laneWidth = 320/3;
          lane = Math.floor(e.x/laneWidth);
          lane = Math.max(Math.min(2, lane), 0);
          this.penguin.switchToLaneNumber(lane);
        },
        update: function(e) {
          this.scoreTimer += e.elapsed * 0.001;
          if(this.scoreTimer >= 0.5) {
            this.setScore(this.score + 1);
            this.scoreTimer -= 0.5;
          }
          this.generateIceTimer += e.elapsed * 0.001;
          if (this.generateIceTimer >= 0.5) {
            var ice;
            this.generateIceTimer -= .5;
            ice = new Ice(Math.floor(Math.random()*3));
            this.iceGroup.addChild(ice);
          }

          for( var i = this.iceGroup.childNodes.length - 1; i >= 0; i--) {
            var ice;
            ice = this.iceGroup.childNodes[i];
            if(ice.intersect(this.penguin)) {
              this.iceGroup.removeChild(ice);
              if(this.score > highScore){
                  highScore = this.score;
              }
              game.replaceScene(new SceneGameOver(this.score, highScore));
              break;
            }
          }

        }
    });

    var SceneGameOver = Class.create(Scene, {
      initialize: function(score, highscore) {
          var gameOverLabel, scoreLabel;
          Scene.apply(this);
          this.backgroundColor = 'black';

          gameOverLabel = new Label("GAME OVER<br><br>Tap to Restart");
          gameOverLabel.x = 8;
          gameOverLabel.y = 128;
          gameOverLabel.color = 'white';
          gameOverLabel.font = '32px strong';
          gameOverLabel.textAlign = 'center';

          scoreLabel = new Label("SCORE<br>" + score);
          scoreLabel.x = 9;
          scoreLabel.y = 32;
          scoreLabel.color = 'white';
          scoreLabel.font = '16px strong';
          scoreLabel.textAlign = 'center';

          highscoreLabel = new Label("HIGHSCORE<br>" + highscore);
          highscoreLabel.x = 9;
          highscoreLabel.y = 72;
          highscoreLabel.color = 'red';
          highscoreLabel.font = '16px strong';
          highscoreLabel.textAlign = 'center';

          this.addChild(gameOverLabel);
          this.addChild(scoreLabel);
          this.addChild(highscoreLabel);

          this.addEventListener(Event.TOUCH_START, this.touchToRestart);
      },
      touchToRestart: function(e) {
        var game = Game.instance;
        game.replaceScene(new SceneGame());
      }
    });

    var Penguin = Class.create(Sprite, {
      initialize: function() {
        Sprite.apply(this, [30,43]);
        this.image = Game.instance.assets['res/penguinSheet.png'];
        this.animationDuration = 0;
        this.addEventListener(Event.ENTER_FRAME, this.updateAnimation);
      },
      updateAnimation: function(e) {
        this.animationDuration += e.elapsed * 0.001;
        if ( this.animationDuration >= .25 ) {
          this.frame = (this.frame + 1) % 2;
          this.animationDuration -= 0.25;
        }
      },
      switchToLaneNumber: function(lane) {
        var targetX = 160 - this.width/2 + (lane-1)*90;
        this.x = targetX;
      }
    });

    var Ice = Class.create(Sprite, {
      initialize: function(lane) {
        Sprite.apply(this, [48,49]);
        this.image = Game.instance.assets['res/Ice.png'];
        this.rotationSpeed = 0;
        this.setLane(lane);
        this.addEventListener(Event.ENTER_FRAME, this.update);
      },
      setLane: function(lane) {
        var game, distance;
        game = Game.instance;
        distance = 90;

        this.rotationSpeed = Math.random() * 100 - 50;

        this.x = game.width/2 - this.width/2 + (lane - 1) * distance;
        this.y = this.height;
        this.rotation = Math.floor( Math.random() * 360);
      },
      update: function(e) {
        var ySpeed, game;
        game = Game.instance;
        ySpeed = 300;

        this.y += ySpeed * e.elapsed * 0.001;
        this.rotation += this.rotationSpeed * e.elapsed * 0.001;
        if(this.y > game.height) {
          this.parentNode.removeChild(this);
        }
      }
    });
};

// PRELOAD RESOURCES
function preload(game) {
    game.preload('res/BG.png');
    game.preload('res/penguinSheet.png');
    game.preload('res/Ice.png');

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
