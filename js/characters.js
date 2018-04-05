//////////////////////////////////////////////////////////////////////////////
// CHARACTERS //// CONSTRUCTORS & METHODS ///////////////////////////////////
////////////////////////////////////////////////////////////////////////////

// THE SHIP //////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

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
    this.power = 0;
}

// Animation du background du vaisseau ///////////////////////////////////////

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

// Animation de la position du vaisseau //////////////////////////////////////

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


// THE SHOTS /////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

function Shots(strenght, posX, posY, width, height){
    this.strenght = strenght;
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;
}

Shots.prototype.arm = function(){
    var thisShot = $('.armed[index='+ shotIdx +']');
    thisShot.show();
};

Shots.prototype.fire = function(){
    clearInterval(loadingShot);
    currentShot = shotIdx;

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

    // Super power //////////////////////////////////////

    if(myShip.power > 10){
        myShip.power -= 10;
        $('.powerBar .powerLevel').css({'width':myShip.power + '%'});
    }
    else if(myShip.power <= 10){
        myShip.power = 0;
        $('.powerBar').hide();
        $('.powerBar .powerLevel').css({'width':'100%'});
        myShip.ship.removeClass('power');
        ammunitions.forEach(function(oneShot){
            oneShot.strenght = 10;
        });
        $('.shot').css({'width':'10px', 'height':'4px'});
        superPower = 0;
    }
};

