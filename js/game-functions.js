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
    $('body').keydown(function(event) {
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
    $('body').keyup(function(event) {
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

    // clearInterval(moveBossDown);
    // clearInterval(moveBossUp);
    // clearInterval(openEye);
    // clearInterval(closeEye);
    // clearInterval(shotMove);

    // clearInterval(sparkleInterval);
    // clearInterval(explosionInterval);

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
    }, 5000);
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

    // clearInterval(moveBossDown);
    // clearInterval(moveBossUp);
    // clearInterval(openEye);
    // clearInterval(closeEye);
    // clearInterval(shotMove);

    // clearInterval(sparkleInterval);
    // clearInterval(explosionInterval);

    $('body').off();

    $('.winner p').html('<span class="gris">YOUR SCORE : </span>' + score + 'PTS');

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

