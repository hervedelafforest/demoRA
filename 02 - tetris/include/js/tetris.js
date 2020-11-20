/**

  The Initial Developer of the Original Code is
  Matthieu  - http://www.programmation-facile.com/
  Portions created by the Initial Developer are Copyright (C) 2013
  the Initial Developer. All Rights Reserved.

  Contributor(s) :

 */


console.log("Tetris Lancement du jeu.");

/**
 * Gestion de la carte du jeu
 * le niveau en cours
 * 
 * @param {[type]} size [description]
 */
Tetris.Map = function () 
{

    /**
     * Création d'une nouvelle forme
     * qui descend
     * 
     * @return {[type]} [description]
     */
    function newShape() 
    {
        var id = Math.floor( Math.random() * shapes.length );
        var shape = shapes[ id ]; // la couleur de la forme

        current = [];
        for ( var y = 0; y < 4; ++y ) 
        {
            current[ y ] = [];

            for ( var x = 0; x < 4; ++x ) 
            {
                var i = 4 * y + x;

                if ( typeof shape[ i ] != 'undefined' && shape[ i ] )
                    current[ y ][ x ] = id + 1;
                else 
                    current[ y ][ x ] = 0;
            }
        }

        // position de la forme
        currentX = 5;
        currentY = 0;
    }


    /**
     * efface l'écran de jeu
     * 
     * @return {[type]} [description]
     */
    function init() 
    {
        for ( var y = 0; y < ROWS; ++y ) 
        {
            board[ y ] = [];

            for ( var x = 0; x < COLS; ++x ) 
            {
                board[ y ][ x ] = 0;
            }
        }
    }


    /**
     * Renvoie l'état de la partie.
     * Si le joueur a perdu ou non
     * 
     * @return {[type]} [description]
     */
    function getStatus() 
    {
        if (lose) 
            return true;

        return false;
    }


    /**
     * Mouvement vers le bas d'une forme
     * Création des nouvelles formes
     * Efface les lignes lorsque c'est gagné
     * 
     * @return {[type]} [description]
     */
    function tick() 
    {
        if ( valid( 0, 1 ) )
            ++currentY;
        // if the element settled
        else 
        {
            freeze();
            clearLines();

            // si le joueur a perdu
            if (lose) 
            {
                console.log("Tetris : perdu !!!");

                
                dialog("Vous avez perdu !!! \nFin de la partie.");
                clearInterval(interval);

                // newGame();
                return false;
            }
            else
                newShape();
        }
    }


    /**
     * Affiche un message à l'écran du joueur
     * 
     * @param  {[type]} text [description]
     * @return {[type]}      [description]
     */
    function dialog(text) 
    {
        ctx.fillStyle = "#00C5DF";// couleur du texte
        ctx.font      = "Bold 25px Arial";
        
        var width = ctx.measureText(text).width,
            x     = 10,
            y     =  50;        
        //ctx.fillText(text, x, (map.height * 10) + 8);

        var nSpace = 30;
        addTextBackground(ctx, x, y, width+20, 70, '#fff' ); 
        addMultiLineText(text, x+20, y+30, nSpace, width, ctx);
    }


    /**
     * Arrêt de la descente de la forme
     * La positionne sur l'écran de jeu
     * 
     * @return {[type]} [description]
     */
    function freeze() 
    {
        for ( var y = 0; y < 4; ++y ) 
        {
            for ( var x = 0; x < 4; ++x ) 
            {
                if ( current[ y ][ x ] )
                    board[ y + currentY ][ x + currentX ] = current[ y ][ x ];
            }
        }
    }


    /**
     * Rotation de la forme
     * 
     * @param  {[type]} current [description]
     * @return {[type]}         [description]
     */
    function rotate( current ) 
    {
        var newCurrent = [];

        for ( var y = 0; y < 4; ++y ) 
        {
            newCurrent[ y ] = [];

            for ( var x = 0; x < 4; ++x ) 
            {
                newCurrent[ y ][ x ] = current[ 3 - x ][ y ];
            }
        }

        return newCurrent;
    }


    /**
     * Vérifie les lignes complètes
     * puis suppression
     * 
     * @return {[type]} [description]
     */
    function clearLines() 
    {
        for ( var y = ROWS - 1; y >= 0; --y ) 
        {
            var rowFilled = true;
            for ( var x = 0; x < COLS; ++x ) 
            {
                if ( board[ y ][ x ] == 0 ) 
                {
                    rowFilled = false;
                    break;
                }
            }

            // si lignes complètes
            if ( rowFilled ) 
            {
                oAudio.play("winLigne");// une ligne disparait

                for ( var yy = y; yy > 0; --yy ) 
                {
                    for ( var x = 0; x < COLS; ++x ) 
                    {
                        board[ yy ][ x ] = board[ yy - 1 ][ x ];
                    }
                }
                ++y;
            }
        }
    }


    /**
     * Lorsqu'une touche est appuyée par le joueur
     * 
     * @param  {[type]} key [description]
     * @return {[type]}     [description]
     */
    function keyPress( key ) 
    {
        // gestion des déplacements de la forme et de la rotation
        switch ( key ) 
        {
            case 'left':
                if ( valid( -1 ) )
                    --currentX;
                break;

            case 'right':
                if ( valid( 1 ) )
                    ++currentX;
                break;

            case 'down':
                if ( valid( 0, 1 ) )
                    ++currentY;
                break;

            case 'rotate':
                var rotated = rotate( current );

                if ( valid( 0, 0, rotated ) )
                    current = rotated;
                break;
        }
    }

    
    /**
     * Vérifie si la forme peut être déplacée
     * 
     * @param  {[type]} offsetX    [description]
     * @param  {[type]} offsetY    [description]
     * @param  {[type]} newCurrent [description]
     * @return {[type]}            [description]
     */
    function valid( offsetX, offsetY, newCurrent ) 
    {
        offsetX = offsetX || 0;
        offsetY = offsetY || 0;
        offsetX = currentX + offsetX;
        offsetY = currentY + offsetY;
        newCurrent = newCurrent || current;

        for ( var y = 0; y < 4; ++y ) 
        {
            for ( var x = 0; x < 4; ++x ) 
            {
                if ( newCurrent[ y ][ x ] ) 
                {
                    if ( typeof board[ y + offsetY ] == 'undefined'
                      || typeof board[ y + offsetY ][ x + offsetX ] == 'undefined'
                      || board[ y + offsetY ][ x + offsetX ]
                      || x + offsetX < 0
                      || y + offsetY >= ROWS
                      || x + offsetX >= COLS ) 
                    {
                        if (offsetY == 1) 
                            lose = true; // lose if the current shape at the top row when checked
                       
                        return false;
                    }
                }
            }
        }
        return true;
    }


    /**
     * Lancement d'une nouvelle partie
     * 
     * @return {[type]} [description]
     */
    function newGame() 
    {
        clearInterval(interval);
        init();
        newShape();
        lose = false;
        interval = setInterval( tick, 250 );
    };


    // renvoie les méthodes publiques de la classe
    return {
        "newGame"         : newGame,
        "getStatus"       : getStatus,
        "dialog"          : dialog,
        "keyPress"        : keyPress
    };

};// fin classe Map