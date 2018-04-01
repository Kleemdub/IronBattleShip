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

// var troopers = [
//     { 
//         strenght: 1,
//         health: 20,
//         posX: 0,
//         posY: 0,
//         width:70,
//         height:70
//     }
// ];

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
var scrollInterval;
function scrolling(){
    scrollInterval = setInterval(function(){
        if(bg1X > -1000){
            bg1X -= 1;
            bg1.css({'background-position-x':bg1X});
        }
        else{
            bg1X = 0;
            bg1.css({'background-position-x':bg1X});
        }
        if(bg2X > -1000){
            bg2X -= 2;
            bg2.css({'background-position-x':bg2X});
        }
        else{
            bg2X = 0;
            bg2.css({'background-position-x':bg2X});
        }
        
    }, scrollSpeed);
}
// start the scrolling
scrolling();



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

// Shots /////////////////////////////////////////////////////////////////////
// var shot = $('.shot');

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


//////////////////////////////////////////////////////////////////////////////
// The Enemies //////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

// var trooper = new Trooper(troopers, 1, 20, 100, 100, 70, 70);

// trooper.sayMyName();
// trooper.launch(1000, 265);

var trooperSection = [
    // new Trooper(1, 20, 1000, -70, 70, 70),
    // new Trooper(1, 20, 1000, -70, 70, 70),
    // new Trooper(1, 20, 1000, -70, 70, 70),
    // new Trooper(1, 20, 1000, -70, 70, 70),
    // new Trooper(1, 20, 1000, -70, 70, 70),
    // new Trooper(1, 20, 1000, -70, 70, 70)

    new Trooper(1, 20, 1000, -70, 0),
    new Trooper(1, 20, 1000, -70, 1),
    new Trooper(1, 20, 1000, -70, 2),
    new Trooper(1, 20, 1000, -70, 3),
    new Trooper(1, 20, 1000, -70, 4),
    new Trooper(1, 20, 1000, -70, 5)
];

var trooperIdx = 0;  

// Troopers launching
var trooperLaunching = setInterval(function(){
    if(trooperIdx < 5){
        trooperSection[trooperIdx].launch(1000, 265);
        trooperIdx += 1;
    }
    else{
        trooperSection[trooperIdx].launch(1000, 265);
        trooperIdx = 0;
    }
    
}, 1000);

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

// function trooperCollision () {
//     var hasCollided = false;

//     trooperSection.forEach(function (oneTrooper) {
//         if (collision(myShip, oneTrooper)) {
//             hasCollided = true;
//             console.log("BOOM");
//         }
//     });

//     return hasCollided;
// }

function trooperCollision (oneTrooper) {
    var hasCollided = false;
    // console.log(oneTrooper);
    
    // console.log(oneTrooper.posX);
    // console.log(oneTrooper.posY);

    if (collisionShip(myShip, oneTrooper)) {
        hasCollided = true;
        // console.log("BOOM");
    }
    // console.log(hasCollided);

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
            console.log("Index : " + oneTrooper.idx);

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

    $('body').off();

    $('.overlay').animate({'opacity':1}, 150, function(){
        $('.overlay h1').animate({'top':'240px'}, 150);
    });
}





// $(document).ready(function(){
// });