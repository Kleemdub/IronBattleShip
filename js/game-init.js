//////////////////////////////////////////////////////////////////////////////
// GAME INIT ////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

// GLOBAL VARIABLES //////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

var body = $('body');

var spaceBg = $('.gameSpace');
var spaceHeight = 600;
var spaceWidth = 1000;

var bg1  = $('.bg1');
var bg2  = $('.bg2');
var bg1X = 0;
var bg2X = 0;

var score = 0;

var startMissile;
var startBoss;

var shotIdx = 0;
var currentShot = 0;
var shotHeight = 4;
var loadingShot;
var checkShot = false;
var superPower = 0;
var shotPosition;

var scrollSpeed = 40;
var gear = 10;

var checkInfo = false;


// INTERVALS /////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

var shipBgInterval;
var shipPosYInterval;
var shipPosXInterval;
var trooperLaunching;
var missileLaunching;
var scrollInterval;
var bossInterval;
var hexagonLaunching;
var heartLaunching;
var diamondLaunching;
// var explosionInterval;
// var sparkleInterval;

// var moveBossDown;
// var moveBossUp;
// var openEye;
// var closeEye;
// var shotMove;

// clearInterval(moveBossDown);
// clearInterval(moveBossUp);


// THE SHIP //////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

var shots = [
    { 
        indx : 0,
        strenght: 10,
        posX: 0,
        posY: 0
    },
    { 
        indx : 1,
        strenght: 10,
        posX: 0,
        posY: 0
    },
    { 
        indx : 2,
        strenght: 10,
        posX: 0,
        posY: 0
    },
    { 
        indx : 3,
        strenght: 10,
        posX: 0,
        posY: 0
    },
    { 
        indx : 4,
        strenght: 10,
        posX: 0,
        posY: 0
    },
    { 
        indx : 5,
        strenght: 10,
        posX: 0,
        posY: 0
    }
];

// Creation de l'instance du vaisseau ////////////////////////////////////////
var myShip = new Ship_obj(150, 150, shots);

// Init ship position ////////////////////////////////////////////////////////
myShip.ship.css({'background-position-y':-myShip.shipBgCurrent});
myShip.ship.css({'top':myShip.posY});
myShip.ship.css({'left':myShip.posX});


// THE SHOTS /////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

var ammunitions = [
    new Shots(10, 0, 0, 10, 4),
    new Shots(10, 0, 0, 10, 4),
    new Shots(10, 0, 0, 10, 4),
    new Shots(10, 0, 0, 10, 4),
    new Shots(10, 0, 0, 10, 4),
    new Shots(10, 0, 0, 10, 4)
];


// TROOPER ///////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

var trooperSection = [
    new Trooper(1, 20, 1000, -70, 0),
    new Trooper(1, 20, 1000, -70, 1),
    new Trooper(1, 20, 1000, -70, 2),
    new Trooper(1, 20, 1000, -70, 3),
    new Trooper(1, 20, 1000, -70, 4),
    new Trooper(1, 20, 1000, -70, 5),
    new Trooper(1, 20, 1000, -70, 6),
    new Trooper(1, 20, 1000, -70, 7),
    new Trooper(1, 20, 1000, -70, 8)
];

var trooperIdx = 0;  

function launchTroopers(){
    trooperLaunching = setInterval(function(){
        if(trooperIdx < 8){
            trooperSection[trooperIdx].launch(1000, 265);
            trooperIdx += 1;
        }
        else{
            trooperSection[trooperIdx].launch(1000, 265);
            trooperIdx = 0;
        }
        
    }, 700);
}


// MISSILE ///////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

var missileSection = [
    new Missile(1, 20, 750, -70, 0),
    new Missile(1, 20, 750, -70, 1),
    new Missile(1, 20, 750, -70, 2),
    new Missile(1, 20, 750, -70, 3),
    new Missile(1, 20, 750, -70, 4)
];

var missileIdx = 0;

function launchMissiles(){
    missileLaunching = setInterval(function(){
        if(missileIdx < 4){
            missileSection[missileIdx].launch(750, -70);
            missileIdx += 1;
        }
        else{
            missileSection[missileIdx].launch(750, -70);
            missileIdx = 0;
        }
        
    }, 2000);
}


// FINAL BOSS ////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

var boss = new Boss(1, 200, 1000, -250);
var bossShot = new Boss_shot(1, 0, 0);

var bossInvincible = true;


// HEXAGONS //////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

var hexagons = [
    new Hexagon(5, 1500, -35, 0),
    new Hexagon(5, 1500, -35, 1),
    new Hexagon(5, 1500, -35, 2),
    new Hexagon(5, 1500, -35, 3),
    new Hexagon(5, 1500, -35, 4),
    new Hexagon(5, 1500, -35, 5),
    new Hexagon(5, 1500, -35, 6),
    new Hexagon(5, 1500, -35, 7),
    new Hexagon(5, 1500, -35, 8),
    new Hexagon(5, 1500, -35, 9),
    new Hexagon(5, 1500, -35, 10),
    new Hexagon(5, 1500, -35, 11),
    new Hexagon(5, 1500, -35, 12),
    new Hexagon(5, 1500, -35, 13),
    new Hexagon(5, 1500, -35, 14),
    new Hexagon(5, 1500, -35, 15),
    new Hexagon(5, 1500, -35, 16),
    new Hexagon(5, 1500, -35, 17),
    new Hexagon(5, 1500, -35, 18),
    new Hexagon(5, 1500, -35, 19)
];

var hexagonIdx = 0;  

function launchHexagon(){
    hexagonLaunching = setInterval(function(){
        
        var randLaunch = Math.floor(Math.random()*2);
        var randNumber = Math.floor(Math.random()*8);
        var randPosY = (Math.floor(Math.random()*500))+50;

        if(randLaunch === 0){
            var delay = 1;
            for(var i = 0; i < randNumber; i++){
                setTimeout(function(){

                    if(hexagonIdx < 19){
                        hexagons[hexagonIdx].launch(randPosY);
                        hexagonIdx += 1;
                        // console.log(hexagonIdx);
                    }
                    else{
                        hexagons[hexagonIdx].launch(randPosY);
                        hexagonIdx = 0;
                        // console.log(hexagonIdx);
                    }

                }, delay*100);

                delay += 1;
            }
        }
    }, 2000);
}


// HEARTS ////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

var hearts = [
    new Heart(5, 1500, -35, 0),
    new Heart(5, 1500, -35, 1),
    new Heart(5, 1500, -35, 2)
];

var heartIdx = 0;  

function launchHeart(){
    heartLaunching = setInterval(function(){

        var randLaunch = Math.floor(Math.random()*3);
        var randPosY = (Math.floor(Math.random()*500))+50;

        if(randLaunch === 0){
            if(heartIdx < 2){
                hearts[heartIdx].launch(randPosY);
                heartIdx += 1;
            }
            else{
                hearts[heartIdx].launch(randPosY);
                heartIdx = 0;
            }
        }
    }, 10000);
}


// DIAMONDS //////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

var diamonds = [
    new Diamond(5, 1500, -35, 0),
    new Diamond(5, 1500, -35, 1),
    new Diamond(5, 1500, -35, 2)
];

var diamondIdx = 0;  

function launchDiamond(){
    diamondLaunching = setInterval(function(){

        var randLaunch = Math.floor(Math.random()*3);
        var randPosY = (Math.floor(Math.random()*500))+50;

        if(randLaunch === 0){
            if(diamondIdx < 2){
                diamonds[diamondIdx].launch(randPosY);
                diamondIdx += 1;
            }
            else{
                diamonds[diamondIdx].launch(randPosY);
                diamondIdx = 0;
            }
        }
    }, 10000);
}


