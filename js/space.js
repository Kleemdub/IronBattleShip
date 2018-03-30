//////////////////////////////////////////////////////////////////////////////
// THE LOGIC ////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
// The Ship /////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

function Ship_obj(height, width){
    this.ship = $('.spaceship');
    // this.height = 150;
    // this.width = 150;
    this.height = height;
    this.width = width;
    this.shipBgLimitTop = 0;
    this.shipBgLimitBottom = 1500;
    this.shipBgInit = 750;
    this.shipBgCurrent = 750;
    this.shipTopLimit = 0;
    this.shipBottomLimit = spaceHeight - this.height;
    this.shipLeftLimit = 0;
    this.shipRightLimit = spaceWidth - this.width;
    this.shipPosYinit = (spaceHeight - this.height)/2;
    this.shipPosXinit = 50;
    this.shipPosYcurrent = this.shipPosYinit;
    this.shipPosXcurrent = this.shipPosXinit;
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
    if(this.shipPosYcurrent > this.shipTopLimit){
        this.shipPosYcurrent -= 5;
        this.ship.css({'top':this.shipPosYcurrent});
    }
};

Ship_obj.prototype.moveDown = function(){
    if(this.shipPosYcurrent < this.shipBottomLimit){
        this.shipPosYcurrent += 5;
        this.ship.css({'top':this.shipPosYcurrent});
    }
};

Ship_obj.prototype.moveLeft = function(){
    if(this.shipPosXcurrent > this.shipLeftLimit){
        this.shipPosXcurrent -= 5;
        this.ship.css({'left':this.shipPosXcurrent});
    }
};

Ship_obj.prototype.moveRight = function(){
    if(this.shipPosXcurrent < this.shipRightLimit){
        this.shipPosXcurrent += 5;
        this.ship.css({'left':this.shipPosXcurrent});
    }
};

function Shots(shots){
    this.shots = shots;
    this.posX = 0;
    this.posY = 0;
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
    if(shotIdx < 5){
        shotIdx += 1;
    }
    else {
        shotIdx = 0;
    }
    var thisShot = $('.armed[index='+ currentShot +']');
    thisShot.removeClass('armed');
    var shotPosX = myShip.shipPosXcurrent+(myShip.width);
    var shotPosY = myShip.shipPosYcurrent+(myShip.height/2);
    var shotWidth = 10;
    var fireShot = setInterval(function(){
        if(shotPosX <= 1000){
            shotPosX += 10;
            shotWidth += 5;
            thisShot.css({'left':shotPosX, 'width':shotWidth});
        }
        else{
            thisShot.css({'width':10}).addClass('armed').hide();
            clearInterval(fireShot);
        }
    }, 5);
    
};




// function Shots(height, width){
//     this.height = height;
//     this.width = width;
//     this.shot = $('.shot');
//     this.html = $('<div class="shot"></div>');
//     this.shotX = myShip.shipPosXcurrent;
//     this.shotY = myShip.shipPosYcurrent;
// }

// Shots.prototype.move = function(){
//     var shotPosition = setInterval(function(){
//         shot.shot.css({'top':myShip.shipPosYcurrent+(myShip.height/2), 'left':myShip.shipPosXcurrent+(myShip.width)});
//     }, 8);
// };


















// $(document).ready(function(){
// });