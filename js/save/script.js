$(document).ready(function(){
    
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

    var scrollSpeed = 40;
    
    // var scrollInterval = setInterval(function(){
    //     if(bg1X > -1000){
    //         bg1X -= 1;
    //         bg1.css({'background-position-x':bg1X});
    //     }
    //     else{
    //         bg1X = 0;
    //         bg1.css({'background-position-x':bg1X});
    //     }
    //     if(bg2X > -1000){
    //         bg2X -= 2;
    //         bg2.css({'background-position-x':bg2X});
    //     }
    //     else{
    //         bg2X = 0;
    //         bg2.css({'background-position-x':bg2X});
    //     }
        
    // }, scrollSpeed);

    //////////////////////////////////////////////////////////////////////////////
    // The Ship /////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////

    function Ship_obj(){
        this.ship = $('.spaceship');
        this.shipHeight = 150;
        this.shipWidth = 150;
        this.shipBgLimitTop = 0;
        this.shipBgLimitBottom = 1500;
        this.shipBgInit = 750;
        this.shipBgCurrent = 750;
        this.shipTopLimit = 0;
        this.shipBottomLimit = spaceHeight - this.shipHeight;
        this.shipLeftLimit = 0;
        this.shipRightLimit = spaceWidth - this.shipWidth;
        this.shipPosYinit = (spaceHeight - this.shipHeight)/2;
        this.shipPosXinit = 50;
        this.shipPosYcurrent = this.shipPosYinit;
        this.shipPosXcurrent = this.shipPosXinit;
    }

    // Creation de l'instance du vaisseau ////////////////////////////////////////
    var myShip = new Ship_obj();

    // Init ship position ////////////////////////////////////////////////////////
    myShip.ship.css({'background-position-y':-myShip.shipBgCurrent});
    myShip.ship.css({'top':myShip.shipPosYcurrent});
    myShip.ship.css({'left':myShip.shipPosXcurrent});
    
    // Intervals for ship moves //////////////////////////////////////////////////
    var shipBgInterval;
    var shipPosYInterval;
    var shipPosXInterval;

    // Ship_obj.prototype.moveRight = function(){
    //     console.log("Right");
    //     clearInterval(shipPosXInterval);
    //     var posX = this.shipPosXcurrent;
    //     var limit = this.shipRightLimit;
    //     var thisShip = this.ship;
    //     shipPosXInterval = setInterval(function(){
    //         if(posX < limit){
    //             posX += 5;
    //             thisShip.css({'left':posX});
    //         }
    //     }, 8);
    // };

    // Shots /////////////////////////////////////////////////////////////////////
    function Shots(){
        this.shot = $('.shot');
        this.html = $('<div class="shot"></div>');
        this.shotWidth = 10;
        this.shotHeight = 4;
        this.shotX = myShip.shipPosXcurrent;
        this.shotY = myShip.shipPosYcurrent;
    }

    Shots.prototype.createShot = function(){
        spaceBg.append(this.html);
        console.log(this);
        console.log("Y: " + myShip.shipPosYcurrent);
        this.shotX = myShip.shipPosXcurrent;
        this.shotY = myShip.shipPosYcurrent;
        this.shot.css({'top':this.shotX});
        this.shot.css({'left':this.shotY});
    };

    var shipShot = new Shots();

    // keyCode : up : 38 / down : 40 / left : 37 / right : 39
    // KEYDOWN ///////////////////////////////////////////////////////////////////
    $('body').keydown(function() {
        switch(event.keyCode){
            case 32:
            console.log("Shot");
            shipShot.createShot();
            break;

            case 104:
            case 38:
                console.log("Up");
                clearInterval(shipBgInterval);
                shipBgInterval = setInterval(function(){
                    if(myShip.shipBgCurrent > myShip.shipBgLimitTop){
                        myShip.shipBgCurrent -= 150;
                        myShip.ship.css({'background-position-y':-myShip.shipBgCurrent});
                    }
                }, 30);

                clearInterval(shipPosYInterval);
                shipPosYInterval = setInterval(function(){
                    if(myShip.shipPosYcurrent > myShip.shipTopLimit){
                        myShip.shipPosYcurrent -= 5;
                        myShip.ship.css({'top':myShip.shipPosYcurrent});
                    }
                }, 8);
                break;
            
            case 98:
            case 40:
                console.log("Down");
                clearInterval(shipBgInterval);
                shipBgInterval = setInterval(function(){
                    if(myShip.shipBgCurrent < myShip.shipBgLimitBottom){
                        myShip.shipBgCurrent += 150;
                        myShip.ship.css({'background-position-y':-myShip.shipBgCurrent});
                    }
                }, 30);

                clearInterval(shipPosYInterval);
                shipPosYInterval = setInterval(function(){
                    if(myShip.shipPosYcurrent < myShip.shipBottomLimit){
                        myShip.shipPosYcurrent += 5;
                        myShip.ship.css({'top':myShip.shipPosYcurrent});
                    }
                }, 8);
                break;

            case 100:
            case 37:
                console.log("Left");
                clearInterval(shipPosXInterval);
                shipPosXInterval = setInterval(function(){
                    if(myShip.shipPosXcurrent > myShip.shipLeftLimit){
                        myShip.shipPosXcurrent -= 5;
                        myShip.ship.css({'left':myShip.shipPosXcurrent});
                    }
                }, 8);
                break;

            case 102:
            case 39:
                console.log("Right");
                clearInterval(shipPosXInterval);
                shipPosXInterval = setInterval(function(){
                    if(myShip.shipPosXcurrent < myShip.shipRightLimit){
                        myShip.shipPosXcurrent += 5;
                        myShip.ship.css({'left':myShip.shipPosXcurrent});
                    }
                }, 8);
                // myShip.moveRight();
                break;
        }
        console.log(event.keyCode);
    });

    // KEYUP /////////////////////////////////////////////////////////////////////
    $('body').keyup(function() {
        switch(event.keyCode){
            case 104:
            case 38:
                console.log("Up");
                clearInterval(shipBgInterval);
                clearInterval(shipPosYInterval);
                shipBgInterval = setInterval(function(){
                    if(myShip.shipBgCurrent < myShip.shipBgInit){
                        myShip.shipBgCurrent += 150;
                        myShip.ship.css({'background-position-y':-myShip.shipBgCurrent});
                    }
                    else{
                        clearInterval(shipBgInterval);
                    }
                }, 50);
                break;
            
            case 98:
            case 40:
                console.log("Down");
                clearInterval(shipBgInterval);
                clearInterval(shipPosYInterval);
                shipBgInterval = setInterval(function(){
                    if(myShip.shipBgCurrent > myShip.shipBgInit){
                        myShip.shipBgCurrent -= 150;
                        myShip.ship.css({'background-position-y':-myShip.shipBgCurrent});
                    }
                    else{
                        clearInterval(shipBgInterval);
                    }
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






// Fonctions déplacement du vaisseau ///////////////////////
    // Ship_obj.prototype.moveUp = function(){
    //     console.log("Up");
    //     clearInterval(shipBgInterval);
    //     shipBgInterval = setInterval(function(){
    //         if(this.shipBgCurrent > this.shipBgLimitTop){
    //             this.shipBgCurrent -= 150;
    //             this.ship.css({'background-position-y':-this.shipBgCurrent});
    //         }
    //     }, 30);

    //     clearInterval(shipPosYInterval);
    //     shipPosYInterval = setInterval(function(){
    //         if(this.shipPosYcurrent > this.shipTopLimit){
    //             this.shipPosYcurrent -= 5;
    //             this.ship.css({'top':this.shipPosYcurrent});
    //         }
    //     }, 8);

    //     console.log(this);
    // };

    // Ship_obj.prototype.moveDown = function(){
    //     console.log("Down");
    //     clearInterval(shipBgInterval);
    //     shipBgInterval = setInterval(function(){
    //         if(this.shipBgCurrent < this.shipBgLimitBottom){
    //             this.shipBgCurrent += 150;
    //             this.ship.css({'background-position-y':-this.shipBgCurrent});
    //         }
    //     }, 30);

    //     clearInterval(shipPosYInterval);
    //     shipPosYInterval = setInterval(function(){
    //         if(this.shipPosYcurrent < this.shipBottomLimit){
    //             this.shipPosYcurrent += 5;
    //             this.ship.css({'top':this.shipPosYcurrent});
    //         }
    //     }, 8);
    // };

    // Ship_obj.prototype.moveLeft = function(){
    //     console.log("Left");
    //     clearInterval(shipPosXInterval);
    //     shipPosXInterval = setInterval(function(){
    //         if(this.shipPosXcurrent > this.shipLeftLimit){
    //             this.shipPosXcurrent -= 5;
    //             this.ship.css({'left':this.shipPosXcurrent});
    //         }
    //     }, 8);
    // };

    // Ship_obj.prototype.moveRight = function(){
    //     console.log("Right");
    //     clearInterval(shipPosXInterval);
    //     var limit = this.shipRightLimit;
    //     var posXTemp = this.shipPosXcurrent;
    //     var shipTemp = this.ship;
    //     shipPosXInterval = setInterval(function(){
    //         if(posXTemp < limit){
    //             posXTemp += 5;
    //             shipTemp.css({'left':posXTemp});
    //         }
    //     }, 8);
    // };

    // $('body').keydown(function() {
    //     if(event.keyCode == 38){
    //         myShip.moveUp();
    //     }
    //     else if(event.keyCode == 40){
    //         myShip.moveDown();
    //     }
    //     else if(event.keyCode == 37){
    //         myShip.moveLeft();
    //     }
    //     else if(event.keyCode == 39){
    //         myShip.moveRight();
    //     }
    //     console.log(event.keyCode);
    // });

    // $('body').keyup(function() {
    //     if(event.keyCode == 38){
    //         console.log("Up");
    //         clearInterval(shipBgInterval);
    //         clearInterval(shipPosYInterval);
    //         shipBgInterval = setInterval(function(){
    //             if(myShip.shipBgCurrent < myShip.shipBgInit){
    //                 myShip.shipBgCurrent += 150;
    //                 myShip.ship.css({'background-position-y':-myShip.shipBgCurrent});
    //             }
    //             else{
    //                 clearInterval(shipBgInterval);
    //             }
    //         }, 50);
    //     }
    //     else if(event.keyCode == 40){
    //         console.log("Down");
    //         clearInterval(shipBgInterval);
    //         clearInterval(shipPosYInterval);
    //         shipBgInterval = setInterval(function(){
    //             if(myShip.shipBgCurrent > myShip.shipBgInit){
    //                 myShip.shipBgCurrent -= 150;
    //                 myShip.ship.css({'background-position-y':-myShip.shipBgCurrent});
    //             }
    //             else{
    //                 clearInterval(shipBgInterval);
    //             }
    //         }, 50);
    //     }
    //     else if(event.keyCode == 37){
    //         clearInterval(shipPosXInterval);
    //     }
    //     else if(event.keyCode == 39){
    //         clearInterval(shipPosXInterval);
    //     }
    //     console.log(event.keyCode);
    // });





























    
    
});