//////////////////////////////////////////////////////////////////////////////
// ENEMIES //// CONSTRUCTORS & METHODS //////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

// TROOPER ///////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

function Trooper(strenght, health, posX, posY, idx){
    this.strenght = strenght;
    this.health = health;
    this.posX = posX;
    this.posY = posY;
    this.idx = idx;
    this.width = 70;
    this.height = 70;
}

Trooper.prototype.receiveDamage = function(shot){
    this.health -= shot.strenght;
    return this.health;
};

Trooper.prototype.launch = function(x, y){
    var currentTrooper = trooperIdx;

    var thisTrooper = $('.trooper[index='+ trooperIdx +']');
    thisTrooper.css({'left': x, 'top': y}).show();

    var thisTrooperLaunch = setInterval(function(){
        trooperSection[currentTrooper].posX = parseFloat(thisTrooper.css('left'));
        trooperSection[currentTrooper].posY = parseFloat(thisTrooper.css('top'));

        if(trooperCollision (trooperSection[currentTrooper])){
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

    thisTrooper.animate({path : new $.path.bezier(trooper_path[randPath])}, 3000, function(){
        thisTrooper.css({'left': 1000, 'top': -70, 'background-position-y':0, 'background-position-x':0}).hide();
        trooperSection[currentTrooper].posX = 1000;
        trooperSection[currentTrooper].posY = -70;
        trooperSection[currentTrooper].health = 20;
    });
};


// MISSILE ///////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

function Missile(strenght, health, posX, posY, idx){
    this.strenght = strenght;
    this.health = health;
    this.posX = posX;
    this.posY = posY;
    this.idx = idx;
    this.width = 236;
    this.height = 70;
}

Missile.prototype.launch = function(x, y){
    var currentMissile = missileIdx;

    var thisMissile = $('.missile[index='+ missileIdx +']');
    thisMissile.css({'left': x, 'top': y}).show();

    var missileBgY = 0;

    var thisMissileLaunch = setInterval(function(){
        // missileSection[currentMissile].posX = parseFloat(thisMissile.css('left'));
        // missileSection[currentMissile].posY = parseFloat(thisMissile.css('top'));
        if(missileSection[currentMissile].posY <= 600){
            missileSection[currentMissile].posY += 2;
            thisMissile.css({'top': missileSection[currentMissile].posY});
            
            missileBgY -= 70;
            thisMissile.css({'background-position-y':missileBgY});
            if(missileBgY <= -1190){
                missileBgY = 0;
            }

            if(detectionShip (missileSection[currentMissile])){
                // console.log('detected');
                clearInterval(thisMissileLaunch);
                missileSection[currentMissile].fire(currentMissile);
            } 
        }
        else{
            clearInterval(thisMissileLaunch);
            missileSection[currentMissile].posY = -70;
            thisMissile.css({'top': missileSection[currentMissile].posY});
            thisMissile.hide();
        }
    }, 20);
};

Missile.prototype.fire = function(index){

    var missileBgY = 0;
    var thisMissile = $('.missile[index='+ index +']');

    var thisMissileFire = setInterval(function(){
        if(missileSection[index].posX >= -250){

            missileSection[index].posX -= 30;
            thisMissile.css({'left': missileSection[index].posX});

            missileBgY -= 70;
            thisMissile.css({'background-position-y':missileBgY});
            if(missileBgY <= -1190){
                missileBgY = 0;
            }

            if(trooperCollision (missileSection[index])){
                // console.log("CRASH");
                clearInterval(thisMissileFire);
    
                myShip.receiveDamage(missileSection[index]);
                myShip.ship.addClass('damaged');
                setTimeout(function(){
                    myShip.ship.removeClass('damaged');
                }, 400);
    
                thisMissile.hide();
                
                missileExplosion(index);

                clearInterval(thisMissileFire);
                missileSection[index].posX = 750;
                missileSection[index].posY = -70;
                thisMissile.css({'top': missileSection[index].posY});
                thisMissile.css({'left': missileSection[index].posX});
                thisMissile.hide();
            }   
        }
        else{
            clearInterval(thisMissileFire);
            missileSection[index].posX = 750;
            missileSection[index].posY = -70;
            thisMissile.css({'top': missileSection[index].posY});
            thisMissile.css({'left': missileSection[index].posX});
            thisMissile.hide();
        }
    }, 20);
};

Missile.prototype.receiveDamage = function(shot){
    // console.log("HIT!");
    this.health -= shot.strenght;
    // console.log(this.health);
    return this.health;
};


// FINAL BOSS ////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

function Boss(strenght, health, posX, posY){
    this.strenght = strenght;
    this.health = health;
    this.posX = posX;
    this.posY = posY;
    this.width = 250;
    this.height = 250;
    this.element = $('.boss');
}

function Boss_shot(strenght, posX, posY){
    this.strenght = strenght;
    this.posX = posX;
    this.posY = posY;
    this.width = 30;
    this.height = 30;
}

Boss_shot.prototype.fire = function(){
    // console.log("BOSS FIRE");
    var shotMove = setInterval(function(){
        bossShot.posX = parseFloat($('.boss-shot').css('left'));
        bossShot.posY = parseFloat($('.boss-shot').css('top'));

        if(trooperCollision (bossShot)){
        
            clearInterval(shotMove);

            myShip.receiveDamage(bossShot);
            myShip.ship.addClass('damaged');
            setTimeout(function(){
                myShip.ship.removeClass('damaged');
            }, 400);
        }
    },10);

    $('.boss-shot').removeClass('shot-init').show();
    $('.boss-shot').animate({'left':myShip.posX, 'top':myShip.posY+65}, 400, function(){
        $('.boss-shot').addClass('shot-init').hide();
        clearInterval(shotMove);
    });
};

Boss.prototype.launch = function(x, y){
    boss.posX = x;
    boss.posY = y;
    boss.element.css({'left':x, 'top':y}).show();
    boss.element.animate({'left':720}, 1000, function(){
        boss.posX = parseFloat(boss.element.css('left')) + 100;
        // boss.posX = 720;
        $('.bossBar').show();
    });

    bossInterval = setInterval(function(){
        var randAction = Math.floor(Math.random()*4);
        if(randAction == 0){
            boss.open();
        }
        else if(randAction == 1 || randAction == 2){
            bossShot.fire();
        }
        else{
            boss.move();
        }
    }, 2300);
};

Boss.prototype.open = function(){
    boss.element.css({'background-position-x':'-250px', 'background-position-y':'-1250px'});
    var eyeX = -250;
    var eyeY = -1250;
    bossInvincible = false;
    
    var openEye = setInterval(function(){
        if(eyeY > -2000){
            eyeY -= 250;
            boss.element.css({'background-position-y':eyeY});
        }
        else{
            clearInterval(openEye);
            $('.boss .eye').show();
        }
    },60);

    setTimeout(function(){
        boss.close();
    }, 1800);
};

Boss.prototype.close = function(){
    boss.element.css({'background-position-x':'-250px', 'background-position-y':'-2000px'});
    var eyeX = -250;
    var eyeY = -2000;
    bossInvincible = true;
    $('.boss .eye').hide();
    var closeEye = setInterval(function(){
        if(eyeY < -1250){
            eyeY += 250;
            boss.element.css({'background-position-y':eyeY});
        }
        else{
            clearInterval(closeEye);
            boss.element.css({'background-position-x':'0px'});
        }
    },60);
};

Boss.prototype.move = function(){
    var randY = Math.floor( (Math.random()*410) - 40);
    var moveBossDown;
    var moveBossUp;
    var bossBgY;
    var moveDown;
    if(randY > boss.posY){
        moveDown = true;
        console.log("move down");
        bossBgY = -1250;
        moveBossDown = setInterval(function(){
            if(bossBgY > -2500){
                bossBgY -= 250;
                boss.element.css({'background-position-y':bossBgY});
            }
            else{
                clearInterval(moveBossDown);
            }
        }, 20);
    }
    else{
        moveDown = false;
        console.log("move up");
        bossBgY = -1250;
        moveBossUp = setInterval(function(){
            if(bossBgY < 0){
                bossBgY += 250;
                boss.element.css({'background-position-y':bossBgY});
            }
            else{
                clearInterval(moveBossUp);
            }
        }, 20);
    }

    boss.element.animate({'top':randY}, 250, function(){

        boss.posY = parseFloat(boss.element.css('top'));

        if(moveDown == true){
            bossBgY = -2500;
            moveBossDown = setInterval(function(){
                if(bossBgY < -1250){
                    bossBgY += 250;
                    boss.element.css({'background-position-y':bossBgY});
                }
                else{
                    clearInterval(moveBossDown);

                }
            }, 20);
        }
        else{
            bossBgY = 0;
            moveBossDown = setInterval(function(){
                if(bossBgY > -1250){
                    bossBgY -= 250;
                    boss.element.css({'background-position-y':bossBgY});
                }
                else{
                    clearInterval(moveBossDown);

                }
            }, 20);
        }
    });
};

Boss.prototype.receiveDamage = function(shot){
    // console.log("HIT!");
    this.health -= shot.strenght;
    // console.log(this.health);
    return this.health;
};