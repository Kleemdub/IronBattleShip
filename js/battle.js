//////////////////////////////////////////////////////////////////////////////
// THE INTERACTIONS /////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

var shots = [
    { 
        indx :      0,
        strenght:  10,
        posX: 0,
        posY:0
    },
    { 
        indx :      1,
        strenght:  10,
        posX: 0,
        posY:0
    },
    { 
        indx :      2,
        strenght:  10,
        posX: 0,
        posY:0
    },
    { 
        indx :      3,
        strenght:  10,
        posX: 0,
        posY:0
    },
    { 
        indx :      4,
        strenght:  10,
        posX: 0,
        posY:0
    },
    { 
        indx :      5,
        strenght:  10,
        posX: 0,
        posY:0
    }
];

var body = $('body');

//////////////////////////////////////////////////////////////////////////////
// The Space ////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

var spaceBg = $('.gameSpace');
var spaceHeight = 600;
var spaceWidth = 1000;

var bg1  = $('.bg1');
var bg2  = $('.bg2');
var bg1X = 0;
var bg2X = 0;

// Background scrolling //////////////////////////////////////////////////////
var scrollSpeed = 40;

function scrolling(){
    var scrollInterval = setInterval(function(){
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
var myShip = new Ship_obj(150, 150);

// Init ship position ////////////////////////////////////////////////////////
myShip.ship.css({'background-position-y':-myShip.shipBgCurrent});
myShip.ship.css({'top':myShip.shipPosYcurrent});
myShip.ship.css({'left':myShip.shipPosXcurrent});

// Intervals for ship moves //////////////////////////////////////////////////
var shipBgInterval;
var shipPosYInterval;
var shipPosXInterval;

// Shots /////////////////////////////////////////////////////////////////////
// var shot = $('.shot');

var shot = new Shots(shots);
var shotIdx = 0;
var currentShot = 0;
var shotHeight = 4;
var loadingShot;
var shotPosition = setInterval(function(){
    $('.armed').css({'top':myShip.shipPosYcurrent+(myShip.height/2), 'left':myShip.shipPosXcurrent+(myShip.width)});
}, 8);


// KEYDOWN ///////////////////////////////////////////////////////////////////
$('body').keydown(function() {
    switch(event.keyCode){
        case 32:
            shot.arm();
            break;

        case 104:
        case 38:
            console.log("Up");
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
            console.log("Down");
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
            console.log("Left");
            clearInterval(shipPosXInterval);
            shipPosXInterval = setInterval(function(){
                myShip.moveLeft();
            }, 8);
            break;

        case 102:
        case 39:
            console.log("Right");
            clearInterval(shipPosXInterval);
            shipPosXInterval = setInterval(function(){
                myShip.moveRight();
            }, 8);
            break;
    }
    console.log(event.keyCode);
});

// KEYUP /////////////////////////////////////////////////////////////////////
$('body').keyup(function() {
    switch(event.keyCode){
        case 32:
            shot.fire();
            break;

        case 104:
        case 38:
            console.log("Release Up");
            clearInterval(shipBgInterval);
            clearInterval(shipPosYInterval);
            shipBgInterval = setInterval(function(){
                myShip.releaseBgUp();
            }, 50);
            break;
        
        case 98:
        case 40:
            console.log("Release Down");
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
    console.log(event.keyCode);
});






















// $(document).ready(function(){
// });