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

            $('.bossLevel').css({'width': boss.health/2 + '%'});
            // console.log(boss.health);
            if(boss.receiveDamage(oneShot) <= 0){
                increaseScore(200);
                // console.log('YOU WIN!!!');

                bossExplosion(40, 50);
                bossExplosion(100, 70);
                bossExplosion(30, 30);
                bossExplosion(120, 10);
                bossExplosion(50, 20);
                bossExplosion(80, 60);

                boss.element.hide();

                setTimeout(function(){
                    gameWin();
                }, 1500);

                
            }
        }
    }

    return hasCollided;
}


// EXPLOSIONS ////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

function shipExplosion(index1, index2){
    var explosion = '<div index="' + index1 + '" class="explosion"></div>';
    $('.explosionsLayer').append(explosion);
    explosion = $('.explosion[index='+ index1 +']');
    explosion.css({'left':myShip.posX + index1, 'top':myShip.posY + index2});
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

function bossExplosion(index1, index2){
    var explosion = '<div index="' + index1 + '" class="explosion"></div>';
    $('.explosionsLayer').append(explosion);
    explosion = $('.explosion[index='+ index1 +']');
    explosion.css({'left':boss.posX + index1, 'top':boss.posY + index2});
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


