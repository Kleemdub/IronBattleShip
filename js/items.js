//////////////////////////////////////////////////////////////////////////////
// ITEMS //// CONSTRUCTORS & METHODS ////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

// HEXAGONS //////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

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


// HEARTS ////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

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


// DIAMONS ///////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

function Diamond(value, posX, posY, idx){
    this.value = value;
    this.posX = posX;
    this.posY = posY;
    this.idx = idx;
    this.width = 35;
    this.height = 35;
}

Diamond.prototype.launch = function(posY){
    var currentDiamond = diamondIdx;

    var thisDiamond = $('.diamond[index='+ currentDiamond +']');
    thisDiamond.css({'left': 1500, 'top': posY}).show();

    var thisDiamondLaunch = setInterval(function(){
        diamonds[currentDiamond].posX = parseFloat(thisDiamond.css('left'));
        diamonds[currentDiamond].posY = parseFloat(thisDiamond.css('top'));

        if(trooperCollision (diamonds[currentDiamond])){
            clearInterval(thisDiamondLaunch);
            clearInterval(thisDiamondBgAnim);

            myShip.ship.addClass('energy');
            setTimeout(function(){
                myShip.ship.removeClass('energy');
            }, 150);

            thisDiamond.hide();

            myShip.ship.addClass('power');
            myShip.power = 100;
            $('.powerBar .powerLevel').css({'width':'100%'});
            $('.powerBar').show();

            ammunitions.forEach(function(oneShot){
                oneShot.strenght = 50;
            });
            superPower = 8;
            $('.shot').css({'width':'10px', 'height':'20px'});
        }   
    }, 10);

    var diamondBgY = 0;
    var thisDiamondBgAnim = setInterval(function(){
        thisDiamond.css({'background-position-y':diamondBgY});
        diamondBgY -= 35;
        if(diamondBgY <= -595){
            diamondBgY = 0;
        }
    }, 30);

    setTimeout(function(){
        clearInterval(thisDiamondLaunch);
        clearInterval(thisDiamondBgAnim);
    }, 8000);

    thisDiamond.animate({'left':-335}, 8000, function(){
        thisDiamond.css({'left': 1500, 'top': -35, 'background-position-y':0, 'background-position-x':0}).hide();
        diamonds[currentDiamond].posX = 1500;
        diamonds[currentDiamond].posY = -35;
    });
};


