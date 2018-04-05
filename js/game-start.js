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

    $('.bossBar').css({'display':'none'});
    $('.bossLevel').css({'width': '100%'});

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
                // 2000
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
