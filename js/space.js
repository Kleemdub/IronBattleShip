//////////////////////////////////////////////////////////////////////////////
// THE LOGIC ////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
// THE SHIP /////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

function Ship_obj(height, width, shots){
    this.ship = $('.spaceship');
    // this.height = 150;
    // this.width = 150;
    this.height = height;
    this.width = width;
    this.shipBgLimitTop = 0;
    this.shipBgLimitBottom = 1500;
    this.shipBgInit = 750;
    this.shipBgCurrent = 750;
    this.shipTopLimit = -25;
    this.shipBottomLimit = spaceHeight - this.height + 25;
    this.shipLeftLimit = 0;
    this.shipRightLimit = spaceWidth - this.width;
    this.shipPosYinit = (spaceHeight - this.height)/2;
    this.shipPosXinit = -150;
    this.posY = this.shipPosYinit;
    this.posX = this.shipPosXinit;
    this.shots = shots;
    this.health = 4;
}


// Animation du background du vaisseau //////////////////////////////////////////

Ship_obj.prototype.moveBgUp = function(){
    if(this.shipBgCurrent > this.shipBgLimitTop){
        this.shipBgCurrent -= 150;
        this.ship.css({'background-position-y':-this.shipBgCurrent});
    }
};

Ship_obj.prototype.moveBgDown = function(){
    if(this.shipBgCurrent < this.shipBgLimitBottom){
        this.shipBgCurrent += 150;
        this.ship.css({'background-position-y':-this.shipBgCurrent});
    }
};

Ship_obj.prototype.releaseBgUp = function(){
    if(this.shipBgCurrent < this.shipBgInit){
        this.shipBgCurrent += 150;
        this.ship.css({'background-position-y':-this.shipBgCurrent});
    }
    else{
        clearInterval(shipBgInterval);
    }
};

Ship_obj.prototype.releaseBgDown = function(){
    if(this.shipBgCurrent > this.shipBgInit){
        this.shipBgCurrent -= 150;
        this.ship.css({'background-position-y':-this.shipBgCurrent});
    }
    else{
        clearInterval(shipBgInterval);
    }
};


// Animation de la position du vaisseau /////////////////////////////////////////

Ship_obj.prototype.moveUp = function(){
    if(this.posY > this.shipTopLimit){
        this.posY -= 5;
        this.ship.css({'top':this.posY});
    }
};

Ship_obj.prototype.moveDown = function(){
    if(this.posY < this.shipBottomLimit){
        this.posY += 5;
        this.ship.css({'top':this.posY});
    }
};

Ship_obj.prototype.moveLeft = function(){
    if(this.posX > this.shipLeftLimit){
        this.posX -= 5;
        this.ship.css({'left':this.posX});
    }
};

Ship_obj.prototype.moveRight = function(){
    if(this.posX < this.shipRightLimit){
        this.posX += 5;
        this.ship.css({'left':this.posX});
    }
};

Ship_obj.prototype.receiveDamage = function(enemy){
    if(this.health > 0){
        this.health -= enemy.strenght;
        currentHealth = this.health;
        // console.log(this.health);
        var currentLevel = 'level' + this.health;
        var previousLevel = 'level' + (this.health+1);
        $('.level').animate({'width':this.health*25+'%'}, 150, function(){
            $('.level').removeClass(previousLevel).addClass(currentLevel);
            // $('.level').removeClass('level4').addClass('level3');
            if(currentHealth <= 0){
                gameOver();
            }
        });
    }
};


//////////////////////////////////////////////////////////////////////////////
// SHOTS ////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

function Shots(strenght, posX, posY, width, height){
    // this.shots = shots;
    this.strenght = strenght;
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;
}

Shots.prototype.arm = function(){
    var thisShot = $('.armed[index='+ shotIdx +']');
    thisShot.show();
    $('.armed[index='+ shotIdx +']').show();
    // var shotHeight = 4;
    // clearInterval(loadingShot);
    // loadingShot = setInterval(function(){
    //     if(shotHeight < 40){
    //         shotHeight += 1;
    //         thisShot.css({'height':shotHeight});
    //     }
    //     else{
    //         clearInterval(loadingShot);
    //     }
        
    // },100);
    // clearInterval(loadingShot);
};

Shots.prototype.fire = function(){
    shotHeight = 4;
    // clearInterval(loadingShot);
    currentShot = shotIdx;
    // console.log(this.shots[currentShot].strenght);
    if(shotIdx < 5){
        shotIdx += 1;
    }
    else {
        shotIdx = 0;
    }
    var thisShot = $('.armed[index='+ currentShot +']');
    thisShot.removeClass('armed');
    var shotPosX = myShip.posX+(myShip.width);
    var shotPosY = myShip.posY+(myShip.height/2);
    var shotWidth = 10;
    var fireShot = setInterval(function(){
        if(shotPosX <= 1000){
            shotPosX += 10;
            shotWidth += 5;
            thisShot.css({'left':shotPosX, 'width':shotWidth});
            ammunitions[currentShot].posX = parseFloat(thisShot.css('left'));
            ammunitions[currentShot].posY = parseFloat(thisShot.css('top'));
            ammunitions[currentShot].width = parseFloat(thisShot.css('width'));
            // console.log('posX : ' + this.posX);
            // console.log('posY : ' + this.posY);
            // console.log('Width : ' + this.width);
        }
        else{
            thisShot.css({'width':10}).addClass('armed').hide();
            clearInterval(fireShot);
        }

        if(shotCollision (ammunitions[currentShot])){
            // console.log("HIT!");
            thisShot.css({'width':10}).addClass('armed').hide();
            clearInterval(fireShot);
        }

    }, 5);
};


//////////////////////////////////////////////////////////////////////////////
// ENEMIES //////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

function Enemy(enemies, strenght, health, posX, posY, width, height){
    this.enemies = enemies;
    this.strenght = strenght;
    this.health = health;
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;
}

function Trooper(strenght, health, posX, posY, idx){
    // Enemy.call(this, strenght, health, posX, posY, width, height);
    // Enemy.call(this, strenght, health, posX, posY);
    this.strenght = strenght;
    this.health = health;
    this.posX = posX;
    this.posY = posY;
    this.idx = idx;
    this.width = 70;
    this.height = 70;
    // this.troopers = troopers;
}

Trooper.prototype.receiveDamage = function(shot){
    // console.log("HIT!");
    this.health -= shot.strenght;
    // console.log(this.health);
    return this.health;
};

// Trooper.prototype = Object.create(Enemy.prototype);
// Trooper.prototype.constructor = Trooper;

var trooper_path = [
    { 
    start: {
        x: 1000,
        y: 74,
        angle: 33.117,
        length: 0.780
        },
    end: {
        x: -70,
        y: 393,
        angle: 18.449,
        length: 0.629
        }
    },

    {
    start: {
        x: 1000,
        y: 400,
        angle: 323.950,
        length: 1.049
        },
    end: {
        x: -70,
        y: 41,
        angle: 343.202,
        length: 0.221
        }
    },

    {
    start: {
        x: 1000,
        y: 174,
        angle: 27.846,
        length: 0.274
        },
    end: {
        x: -70,
        y: 238,
        angle: 310.314,
        length: 0.269
        }
    },

    {
    start: {
        x: 1000,
        y: 389,
        angle: 59.874,
        length: 0.545
        },
    end: {
        x: -70,
        y: 156,
        angle: 326.414,
        length: 0.341
        }
    },

    {
    start: {
        x: 1000,
        y: 237,
        angle: 1.948,
        length: 0.356
        },
    end: {
        x: -70,
        y: 248,
        angle: 30.882,
        length: 0.457
        }
    },

    {
    start: {
        x: 1000,
        y: 90,
        angle: 22.116,
        length: 0.378
        },
    end: {
        x: -70,
        y: 394,
        angle: 13.235,
        length: 0.417
        }
    },

    {
    start: {
        x: 1000,
        y: 419,
        angle: 326.185,
        length: 0.352
        },
    end: {
        x: -70,
        y: 202,
        angle: 39.992,
        length: 0.516
        }
    },

    {
    start: {
        x: 1000,
        y: 271,
        angle: 25.382,
        length: 0.916
        },
    end: {
        x: -70,
        y: 218,
        angle: 29.966,
        length: 0.626
        }
    },

    {
    start: {
        x: 1000,
        y: 60,
        angle: 14.954,
        length: 0.933
        },
    end: {
        x: -70,
        y: 329,
        angle: 337.873,
        length: 0.473
        }
    },

    {
    start: {
        x: 1000,
        y: 135,
        angle: 307.793,
        length: 0.294
        },
    end: {
        x: -70,
        y: 228,
        angle: 355.234,
        length: 0.349
        }
    }
];


Trooper.prototype.launch = function(x, y){
    var currentTrooper = trooperIdx;

    var thisTrooper = $('.trooper[index='+ trooperIdx +']');
    thisTrooper.css({'left': x, 'top': y}).show();

    var thisTrooperLaunch = setInterval(function(){
        trooperSection[currentTrooper].posX = parseFloat(thisTrooper.css('left'));
        trooperSection[currentTrooper].posY = parseFloat(thisTrooper.css('top'));

        if(trooperCollision (trooperSection[currentTrooper])){
            // console.log("CRASH");
            clearInterval(thisTrooperLaunch);
            clearInterval(thisTrooperBgAnim);

            myShip.receiveDamage(trooperSection[currentTrooper]);
            myShip.ship.addClass('damaged');
            setTimeout(function(){
                myShip.ship.removeClass('damaged');
            }, 400);

            thisTrooper.hide();
            
            trooperExplosion(currentTrooper);
        }   
    }, 10);

    var trooperBgY = 0;
    var thisTrooperBgAnim = setInterval(function(){
        thisTrooper.css({'background-position-y':trooperBgY});
        trooperBgY -= 70;
        if(trooperBgY <= -1190){
            trooperBgY = 0;
        }
    }, 60);

    var randPath = Math.floor(Math.random()*10);

    setTimeout(function(){
        clearInterval(thisTrooperLaunch);
        clearInterval(thisTrooperBgAnim);
    }, 4000);

    thisTrooper.animate({path : new $.path.bezier(trooper_path[randPath])}, 4000, function(){
        // clearInterval(thisTrooperLaunch);
        // clearInterval(thisTrooperBgAnim);
        thisTrooper.css({'left': 1000, 'top': -70, 'background-position-y':0, 'background-position-x':0}).hide();
        trooperSection[currentTrooper].posX = 1000;
        trooperSection[currentTrooper].posY = -70;
        trooperSection[currentTrooper].health = 20;
    });
};


//////////////////////////////////////////////////////////////////////////////
// GOODIES //////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

function Hexagon(value, posX, posY, idx){
    this.value = value;
    this.posX = posX;
    this.posY = posY;
    this.idx = idx;
    this.width = 35;
    this.height = 35;
}

Hexagon.prototype.launch = function(posY){
    var currentHexagon = hexagonIdx;

    var thisHexagon = $('.hexagon[index='+ currentHexagon +']');
    thisHexagon.css({'left': 1500, 'top': posY}).show();

    var thisHexagonLaunch = setInterval(function(){
        hexagons[currentHexagon].posX = parseFloat(thisHexagon.css('left'));
        hexagons[currentHexagon].posY = parseFloat(thisHexagon.css('top'));

        if(trooperCollision (hexagons[currentHexagon])){
            // console.log("HEXA");
            clearInterval(thisHexagonLaunch);
            clearInterval(thisHexaBgAnim);

            myShip.ship.addClass('energy');
            setTimeout(function(){
                myShip.ship.removeClass('energy');
            }, 150);

            increaseScore(5);

            thisHexagon.hide();
        }   
    }, 10);

    var hexagonBgY = 0;
    var thisHexaBgAnim = setInterval(function(){
        thisHexagon.css({'background-position-y':hexagonBgY});
        hexagonBgY -= 35;
        if(hexagonBgY <= -595){
            hexagonBgY = 0;
        }
    }, 30);

    setTimeout(function(){
        clearInterval(thisHexagonLaunch);
        clearInterval(thisHexaBgAnim);
    }, 8000);

    thisHexagon.animate({'left':-335}, 8000, function(){
        thisHexagon.css({'left': 1500, 'top': -35, 'background-position-y':0, 'background-position-x':0}).hide();
        hexagons[currentHexagon].posX = 1500;
        hexagons[currentHexagon].posY = -35;
    });
};

function Heart(value, posX, posY, idx){
    this.value = value;
    this.posX = posX;
    this.posY = posY;
    this.idx = idx;
    this.width = 35;
    this.height = 35;
}

Heart.prototype.launch = function(posY){
    var currentHeart = heartIdx;

    var thisHeart = $('.heart[index='+ currentHeart +']');
    thisHeart.css({'left': 1500, 'top': posY}).show();

    var thisHeartLaunch = setInterval(function(){
        hearts[currentHeart].posX = parseFloat(thisHeart.css('left'));
        hearts[currentHeart].posY = parseFloat(thisHeart.css('top'));

        if(trooperCollision (hearts[currentHeart])){
            // console.log("HEART");
            clearInterval(thisHeartLaunch);
            clearInterval(thisHeartBgAnim);

            myShip.ship.addClass('energy');
            setTimeout(function(){
                myShip.ship.removeClass('energy');
            }, 150);

            thisHeart.hide();

            myShip.health = 4;

            $('.level').animate({'width':'100%'}, 150, function(){
                $('.level').removeClass('level1').removeClass('level2').removeClass('level3');
                $('.level').addClass('level4');
            });
        }   
    }, 10);

    var heartBgY = 0;
    var thisHeartBgAnim = setInterval(function(){
        thisHeart.css({'background-position-y':heartBgY});
        heartBgY -= 35;
        if(heartBgY <= -595){
            heartBgY = 0;
        }
    }, 30);

    setTimeout(function(){
        clearInterval(thisHeartLaunch);
        clearInterval(thisHeartBgAnim);
    }, 8000);

    thisHeart.animate({'left':-335}, 8000, function(){
        thisHeart.css({'left': 1500, 'top': -35, 'background-position-y':0, 'background-position-x':0}).hide();
        hearts[currentHeart].posX = 1500;
        hearts[currentHeart].posY = -35;
    });
};








// $(document).ready(function(){
// });