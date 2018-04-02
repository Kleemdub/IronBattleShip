//////////////////////////////////////////////////////////////////////////////
// THE INTERACTIONS /////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

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

var enemies = [
    { 
        name : "trooper",
        strenght: 1,
        health: 20,
        posX: 0,
        posY: 0,
        width:70,
        height:70
    }
];

//////////////////////////////////////////////////////////////////////////////
// The Space ////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

var body = $('body');

var spaceBg = $('.gameSpace');
var spaceHeight = 600;
var spaceWidth = 1000;

var bg1  = $('.bg1');
var bg2  = $('.bg2');
var bg1X = 0;
var bg2X = 0;

var score = 0;

// Background scrolling //////////////////////////////////////////////////////
var scrollSpeed = 40;
var gear = 10;
// var scrollSpeed = 1;
var scrollInterval;
function scrolling(scrollSpeed){
    scrollInterval = setInterval(function(scrollSpeed){
        // gear = 1;
        if(bg1X > -1000){
            bg1X -= gear;
            bg1.css({'background-position-x':bg1X});
        }
        else{
            bg1X = 0;
            bg1.css({'background-position-x':bg1X});
        }
        if(bg2X > -1000){
            bg2X -= gear*2;
            bg2.css({'background-position-x':bg2X});
        }
        else{
            bg2X = 0;
            bg2.css({'background-position-x':bg2X});
        }
        
        if(gear > 1){
            gear -= 0.2;
        }

    }, scrollSpeed);
}
// start the scrolling
// scrolling();



//////////////////////////////////////////////////////////////////////////////
// The Ship /////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

// Creation de l'instance du vaisseau ////////////////////////////////////////
var myShip = new Ship_obj(150, 150, shots);

// Init ship position ////////////////////////////////////////////////////////
myShip.ship.css({'background-position-y':-myShip.shipBgCurrent});
myShip.ship.css({'top':myShip.posY});
myShip.ship.css({'left':myShip.posX});

// Intervals for ship moves //////////////////////////////////////////////////
var shipBgInterval;
var shipPosYInterval;
var shipPosXInterval;

var ammunitions = [
    new Shots(10, 0, 0, 10, 4),
    new Shots(10, 0, 0, 10, 4),
    new Shots(10, 0, 0, 10, 4),
    new Shots(10, 0, 0, 10, 4),
    new Shots(10, 0, 0, 10, 4),
    new Shots(10, 0, 0, 10, 4)
];

var shotIdx = 0;
var currentShot = 0;
var shotHeight = 4;
var loadingShot;
var shotPosition = setInterval(function(){
    $('.armed').css({'top':myShip.posY+(myShip.height/2), 'left':myShip.posX+(myShip.width)});
}, 8);

function keybordEvents(){

    // KEYDOWN ///////////////////////////////////////////////////////////////////
    $('body').keydown(function() {
        switch(event.keyCode){
            case 32:
            ammunitions[shotIdx].arm();
                break;

            case 104:
            case 38:
                // console.log("Up");
                clearInterval(shipBgInterval);
                shipBgInterval = setInterval(function(){
                    myShip.moveBgUp();
                }, 30);

                clearInterval(shipPosYInterval);
                shipPosYInterval = setInterval(function(){
                    myShip.moveUp();
                }, 8);
                break;
            
            case 98:
            case 40:
                // console.log("Down");
                clearInterval(shipBgInterval);
                shipBgInterval = setInterval(function(){
                    myShip.moveBgDown();
                }, 30);

                clearInterval(shipPosYInterval);
                shipPosYInterval = setInterval(function(){
                    myShip.moveDown();
                }, 8);
                break;

            case 100:
            case 37:
                // console.log("Left");
                clearInterval(shipPosXInterval);
                shipPosXInterval = setInterval(function(){
                    myShip.moveLeft();
                }, 8);
                break;

            case 102:
            case 39:
                // console.log("Right");
                clearInterval(shipPosXInterval);
                shipPosXInterval = setInterval(function(){
                    myShip.moveRight();
                }, 8);
                break;
        }
        // console.log(event.keyCode);
    });

    // KEYUP /////////////////////////////////////////////////////////////////////
    $('body').keyup(function() {
        switch(event.keyCode){
            case 32:
            ammunitions[shotIdx].fire();
                break;

            case 104:
            case 38:
                // console.log("Release Up");
                clearInterval(shipBgInterval);
                clearInterval(shipPosYInterval);
                shipBgInterval = setInterval(function(){
                    myShip.releaseBgUp();
                }, 50);
                break;
            
            case 98:
            case 40:
                // console.log("Release Down");
                clearInterval(shipBgInterval);
                clearInterval(shipPosYInterval);
                shipBgInterval = setInterval(function(){
                    myShip.releaseBgDown();
                }, 50);
                break;

            case 100:
            case 37:
                clearInterval(shipPosXInterval);
                break;

            case 102:
            case 39:
                clearInterval(shipPosXInterval);
                break;
        }
        // console.log(event.keyCode);
    });
}

// keybordEvents();


//////////////////////////////////////////////////////////////////////////////
// The Enemies //////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

var trooperSection = [
    new Trooper(1, 20, 1000, -70, 0),
    new Trooper(1, 20, 1000, -70, 1),
    new Trooper(1, 20, 1000, -70, 2),
    new Trooper(1, 20, 1000, -70, 3),
    new Trooper(1, 20, 1000, -70, 4),
    new Trooper(1, 20, 1000, -70, 5)
];

var trooperIdx = 0;  

var trooperLaunching;
// Troopers launching
function launchTroopers(){
    trooperLaunching = setInterval(function(){
        if(trooperIdx < 5){
            trooperSection[trooperIdx].launch(1000, 265);
            trooperIdx += 1;
        }
        else{
            trooperSection[trooperIdx].launch(1000, 265);
            trooperIdx = 0;
        }
        
    }, 1000);
}

// launchTroopers();

// clearInterval(trooperLaunching);


//////////////////////////////////////////////////////////////////////////////
// Collisions ///////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

function getTop (obj) {
    return obj.posY;
}

function getBottom (obj) {
    return obj.posY + obj.height;
}

function getLeft (obj) {
    return obj.posX;
}

function getRight (obj) {
    return obj.posX + obj.width;
}

function collision (objA, objB) {
    // console.log("posX : " + objB.posX);
    // console.log("posY : " + objB.posY);
    // console.log("Width : " + objB.width);
    // console.log("Height : " + objB.height);
    return  getBottom(objA) >= getTop(objB)    &&
            getTop(objA)    <= getBottom(objB) &&
            getRight(objA)  >= getLeft(objB)   &&
            getLeft(objA)   <= getRight(objB);
}

function collisionShip (objA, objB) {
    return  (getBottom(objA)-65) >= getTop(objB)    &&
            (getTop(objA)+65)    <= getBottom(objB) &&
            (getRight(objA)-35)  >= getLeft(objB)   &&
            (getLeft(objA)+35)   <= getRight(objB);
}

function trooperCollision (oneTrooper) {
    var hasCollided = false;
    
    if (collisionShip(myShip, oneTrooper)) {
        hasCollided = true;
    }

    return hasCollided;
}

function trooperExplosion(index){
    var explosion = '<div index="' + index + '" class="explosion"></div>';
    $('.explosionsLayer').append(explosion);
    explosion = $('.explosion[index='+ index +']');
    explosion.css({'left':trooperSection[index].posX-35, 'top':trooperSection[index].posY-35});
    var explosionBg = 0;
    var explosionInterval = setInterval(function(){
        explosion.css({'background-position-y':explosionBg});
        explosionBg -= 140;
        if(explosionBg <= -2380){
            clearInterval(explosionInterval);
            explosion.remove();
        }
    },60);
}

function sparkles(index){
    var sparkle = '<div index="' + index + '" class="sparkle"></div>';
    $('.explosionsLayer').append(sparkle);
    sparkle = $('.sparkle[index='+ index +']');
    sparkle.css({'left':trooperSection[index].posX-70, 'top':trooperSection[index].posY});
    var sparkleBg = 0;
    var sparkleInterval = setInterval(function(){
        sparkleBg -= 70;
        sparkle.css({'background-position-y':sparkleBg});
        if(sparkleBg <= -350){
            clearInterval(sparkleInterval);
            sparkle.remove();
        }
    },30);
}

function shotCollision (oneShot) {
    var hasCollided = false;

    trooperSection.forEach(function (oneTrooper) {
        if (collision(oneShot, oneTrooper)) {
            hasCollided = true;
            // console.log("HIT!");
            // console.log("Index : " + oneTrooper.idx);

            if(oneTrooper.receiveDamage(oneShot) <= 0){
                var thisTrooper = $('.trooper[index='+ oneTrooper.idx +']');
                thisTrooper.css({'bottom':2000});
                
                thisTrooper.stop();
                thisTrooper.css({'left': 1000, 'top': -70, 'background-position-y':0, 'background-position-x':0}).hide();
                
                trooperExplosion(oneTrooper.idx);

                oneTrooper.posX = 1000;
                oneTrooper.posY = -70;
                oneTrooper.health = 20;

                increaseScore(oneTrooper.health);
            }
            else{
                sparkles(oneTrooper.idx);
                var thisTrooper = $('.trooper[index='+ oneTrooper.idx +']');
                thisTrooper.addClass('damagedEnemy');
                setTimeout(function(){
                    thisTrooper.removeClass('damagedEnemy');
                }, 100);
            }
        }
    });
    return hasCollided;
}

function increaseScore(nb){
    score += nb;
    $('.score').html(score + ' PTS');;
}

function gameOver(){
    // console.log("game over");

    clearInterval(trooperLaunching);
    clearInterval(scrollInterval);
    clearInterval(hexagonLaunching);
    clearInterval(heartLaunching);
    
    $('body').off();

    $('.overlay').animate({'opacity':1}, 150, function(){
        $('.overlay h2').animate({'top':'260px'}, 150);
    });
}

//////////////////////////////////////////////////////////////////////////////
// LANCEMENT DU JEU /////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

$('.startBtn').click(function(){

    scrolling(scrollSpeed);
    

    $('.startLayer').animate({'top':-800}, 300, function(){

        // myShip.ship.css({'background-position-y':-myShip.shipBgCurrent});
        // myShip.ship.css({'top':myShip.posY});
        // myShip.ship.css({'left':myShip.posX});

        myShip.ship.animate({'left':300}, 1000, function(){
            myShip.posX = 300;
            keybordEvents();
            setTimeout(function(){
                launchTroopers();
                launchHexagon();
                launchHeart();
            },500);
        });


    });

});

//////////////////////////////////////////////////////////////////////////////
// GOODIES //////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

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
var hexagonLaunching;

function launchHexagon(){
    hexagonLaunching = setInterval(function(){
        
        var randLaunch = Math.floor(Math.random()*2);
        var randNumber = Math.floor(Math.random()*8);
        var randPosY = (Math.floor(Math.random()*500))+50;

        // console.log(randLaunch);
        // console.log(randNumber);
        // console.log(randPosY);
        // console.log('-----------------------------');

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

// launchHexagon();


var hearts = [
    new Heart(5, 1500, -35, 0),
    new Heart(5, 1500, -35, 1),
    new Heart(5, 1500, -35, 2)
];

var heartIdx = 0;  
var heartLaunching;

function launchHeart(){
    heartLaunching = setInterval(function(){

        var randLaunch = Math.floor(Math.random()*5);
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

// launchHeart();












// $(document).ready(function(){
// });