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


// THE SHIP //////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

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



//////////////////////////////////////////////////////////////////////////////
// GAME FUNCTIONS ///////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

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

function increaseScore(nb){
    score += nb;
    if(score >= 20){
        // gameWin()
    }
    $('.score').html(score + ' PTS');
}

function gameOver(){
    // console.log("game over");

    clearInterval(trooperLaunching);
    clearInterval(scrollInterval);
    clearInterval(hexagonLaunching);
    clearInterval(heartLaunching);
    clearInterval(diamondLaunching);
    clearInterval(missileLaunching);
    clearInterval(bossInterval);

    clearTimeout(startMissile);
    clearTimeout(startBoss);

    clearInterval(shipBgInterval);
    clearInterval(shipPosYInterval);
    clearInterval(shipPosXInterval);
    clearInterval(shotPosition);

    $('body').off();

    $('.overlay').animate({'opacity':1}, 400, function(){
        $('.overlay h2').animate({'top':'260px'}, 400);
        $('.gameSpace').hide();
        $('.infosLayer').hide();
    });

    setTimeout(function(){
        startEvent();
        initGame();
        $('.startLayer').animate({'top':0}, 300);
    }, 7000);
}

function gameWin(){

    clearInterval(trooperLaunching);
    clearInterval(scrollInterval);
    clearInterval(hexagonLaunching);
    clearInterval(heartLaunching);
    clearInterval(diamondLaunching);
    clearInterval(missileLaunching);
    clearInterval(bossInterval);

    clearTimeout(startMissile);
    clearTimeout(startBoss);

    clearInterval(shipBgInterval);
    clearInterval(shipPosYInterval);
    clearInterval(shipPosXInterval);
    clearInterval(shotPosition);

    $('body').off();

    $('.winner').animate({'opacity':1}, 400, function(){
        $('.container').css({'background-color':'rgb(255, 255, 255, 1)'});
        $('.winner h2').animate({'top':'100px'}, 400);
        $('.gameSpace').hide();
        $('.infosLayer').hide();
    });

    setTimeout(function(){
        startEvent();
        initGame();
        $('.startLayer').animate({'top':0}, 300);
    }, 7000);
}



//////////////////////////////////////////////////////////////////////////////
// INTERACTIONS /////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

// COLLISIONS ////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

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
    return  getBottom(objA) >= getTop(objB)    &&
            getTop(objA)    <= getBottom(objB) &&
            getRight(objA)  >= getLeft(objB)   &&
            getLeft(objA)   <= getRight(objB);
}

function collisionEye (objA, objB) {
    return  getBottom(objA) >= (getTop(objB)+144)    &&
            getTop(objA)    <= (getBottom(objB)-61) &&
            getRight(objA)  >= (getLeft(objB)-15)   &&
            getLeft(objA)   <= getRight(objB);
            
}

function collisionShip (objA, objB) {
    return  (getBottom(objA)-65) >= getTop(objB)    &&
            (getTop(objA)+65)    <= getBottom(objB) &&
            (getRight(objA)-35)  >= getLeft(objB)   &&
            (getLeft(objA)+35)   <= getRight(objB);
}

function detection (objA, objB) {
    return  (getBottom(objA)-65) >= getTop(objB)    &&
            (getTop(objA)+65)    <= getBottom(objB);
}

function detectionShip (oneMissile) {
    var hasDetected = false;
    if (detection(myShip, oneMissile)) {
        hasDetected = true;
    }
    return hasDetected;
}

function trooperCollision (oneTrooper) {
    var hasCollided = false;
    
    if (collisionShip(myShip, oneTrooper)) {
        hasCollided = true;
    }

    return hasCollided;
}

function shotCollision (oneShot) {
    var hasCollided = false;

    trooperSection.forEach(function (oneTrooper) {
        if (collision(oneShot, oneTrooper)) {
            hasCollided = true;

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

    missileSection.forEach(function (oneMissile) {
        if (collision(oneShot, oneMissile)) {
            hasCollided = true;
            // console.log("HIT!");
            // console.log("Index : " + oneTrooper.idx);

            if(oneMissile.receiveDamage(oneShot) <= 0){
                var thisMissile = $('.missile[index='+ oneMissile.idx +']');

                thisMissile.css({'left': 750, 'top': -70, 'background-position-y':0, 'background-position-x':0}).hide();
                
                missileExplosion(oneMissile.idx);

                oneMissile.posX = 750;
                oneMissile.posY = -70;
                oneMissile.health = 20;

                increaseScore(oneMissile.health);
            }
            else{
                // sparkles();
                var thisMissile = $('.missile[index='+ oneMissile.idx +']');
                thisMissile.addClass('damagedEnemy');
                setTimeout(function(){
                    thisMissile.removeClass('damagedEnemy');
                }, 100);
            }
        }
    });

    if (collision(oneShot, boss)) {
        hasCollided = true;
        sparklesBoss(oneShot);
    }
    
    if (collisionEye(oneShot, boss)) {

        if(bossInvincible == false){
            hasCollided = true;
            // console.log('HIT EYE');
            $('.boss .eye').addClass('damagedEye');
            setTimeout(function(){
                $('.boss .eye').removeClass('damagedEye');
            }, 100);

            boss.health -= oneShot.strenght;
            console.log(boss.health);
            if(boss.health <= 00){
                console.log('YOU WIN!!!');
                gameWin();
            }
        }
    }

    return hasCollided;
}


// EXPLOSIONS ////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

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

function missileExplosion(index){
    var explosion = '<div index="' + index + '" class="explosion"></div>';
    $('.explosionsLayer').append(explosion);
    explosion = $('.explosion[index='+ index +']');
    explosion.css({'left':missileSection[index].posX, 'top':missileSection[index].posY-35});
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

function sparklesBoss(oneShot){
    var sparkle = '<div class="sparkle"></div>';
    $('.explosionsLayer').append(sparkle);
    sparkle = $('.sparkle');
    sparkle.css({'left':boss.posX - 40, 'top':oneShot.posY - 40});
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


//////////////////////////////////////////////////////////////////////////////
// GAME START ///////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

// INITIALISATION ////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

function initGame(){

    bg1X = 0;
    bg2X = 0;
    score = 0;
    $('.score').html(score + ' PTS');

    $('.container').css({'background-color':'rgb(255, 255, 255, 0)'});
    $('.gameSpace').show();
    $('.infosLayer').show();
    $('.overlay').css({'opacity':0});
    $('.overlay h2').css({'top':'600px'});
    $('.winner').css({'opacity':0});
    $('.winner h2').css({'top':'620px'});

    $('.level').stop();
    $('.level').css({'width':'100%', 'opacity':1});
    $('.level').removeClass('level1').removeClass('level2').removeClass('level3').removeClass('level0');
    $('.level').addClass('level4');

    myShip.ship.css({'background-position-y':-750});
    myShip.posY = 225;
    myShip.posX = -150;
    // myShip.ship.css({'top':'225px'});
    $('.spaceship').css({'top':'225px'});
    myShip.ship.css({'left':'-150px'});
    myShip.ship.removeClass('power');
    myShip.health = 4;
    myShip.power = 0;

    ammunitions.forEach(function(oneShot){
        oneShot.strenght = 10;
    });

    $('.shot').css({'display':'none', 'width':'10px', 'height':'4px'}).addClass('armed');

    superPower = 0;

    bossInvincible = true;

    $('.boss').css({'display':'none', 'left':'1000px', 'top':'-250px'});
    $('.boss').css({'background-position-y':'-1250px', 'background-position-x':'0px'});
    $('.boss .eye').css({'display':'none'});
    boss.posX = 1000;
    boss.posY = -250;
    boss.health = 200;

    $('.powerBar').css({'display':'none'});
}


// START BUTTONS /////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

$('.info-btn').click(function(){
    if(checkInfo === false){
        // $(this).slideUp(300);
        $('.startLayer h1').animate({'padding-top':'80px', 'padding-bottom':'10px'}, 300);
        $('.info-block').animate({'margin-top':'30px'}, 300);
        checkInfo = true;
    }
    else{
        // $('.info-btn').slideDown(300);
        $('.startLayer h1').animate({'padding-top':'185px', 'padding-bottom':'40px'}, 300);
        $('.info-block').animate({'margin-top':'130px'}, 300);
        checkInfo = false;
    }
});

$('.info-close').click(function(){
    $('.info-btn').trigger('click');
});

$('.startBtn').click(function(){

    if(checkInfo == true){
        $('.info-btn').trigger('click');
    }
    
    $('body').off();

    shotPosition = setInterval(function(){
        $('.armed').css({'top':myShip.posY+(myShip.height/2) - superPower, 'left':myShip.posX+(myShip.width)});
        $('.shot-init').css({'top':boss.posY + 125, 'left':boss.posX -60});
        bossShot.posX = boss.posX -60;
        bossShot.posY = boss.posY + 125;
    }, 8);

    scrolling(scrollSpeed);
    
    $('.startLayer').animate({'top':-800}, 700, function(){
        
        myShip.ship.animate({'left':300}, 1000, function(){
            myShip.posX = 300;
            keybordEvents();
            setTimeout(function(){
                launchTroopers();
                launchHexagon();
                launchHeart();
                launchDiamond();

                startMissile = setTimeout(function(){
                    launchMissiles();
                    clearInterval(trooperLaunching);
                }, 25000);

                startBoss = setTimeout(function(){
                    boss.launch(1000, 175);
                    clearInterval(missileLaunching);
                }, 50000);

            },500);
        });
    });
});


// LANCEMENT DU JEU //////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

function startEvent(){
    $('body').keydown(function() {
        switch(event.keyCode){
            case 13:
                $('.startBtn').trigger('click');
                break;
    
            case 73:
                $('.info-btn').trigger('click');
                break;
        }
    });
}

startEvent();
