/**

  The Initial Developer of the Original Code is
  Matthieu  - http://www.programmation-facile.com/
  Portions created by the Initial Developer are Copyright (C) 2013
  the Initial Developer. All Rights Reserved.

  Contributor(s) :

 */



/**
 * Gestion de la carte du jeu
 * le niveau en cours
 * 
 * @param {[type]} size [description]
 */
Tetris.Engine = function () 
{

    // draw a single square at (x, y)
    function drawBlock( x, y ) 
    {
        ctx.fillRect( BLOCK_W * x, BLOCK_H * y, BLOCK_W - 1 , BLOCK_H - 1 );
        ctx.strokeRect( BLOCK_W * x, BLOCK_H * y, BLOCK_W - 1 , BLOCK_H - 1 );
    }

    // draws the board and the moving shape
    function render() 
    {
        // si le joueur a perdu
        if( oMap.getStatus() == true )
        {    
            //console.log("Tetris getStatus : perdu !!!");
            // effectuer un arrêt du setinterval
            return;
        }

        //console.log("render");

        ctx.clearRect( 0, 0, W, H );
        ctx.strokeStyle = 'black';

        for ( var x = 0; x < COLS; ++x ) 
        {
            for ( var y = 0; y < ROWS; ++y ) 
            {
                if ( board[ y ][ x ] ) 
                {
                    ctx.fillStyle = colors[ board[ y ][ x ] - 1 ];
                    drawBlock( x, y );
                }
            }
        }

        ctx.fillStyle = 'red';
        ctx.strokeStyle = 'black';

        for ( var y = 0; y < 4; ++y ) 
        {
            for ( var x = 0; x < 4; ++x ) 
            {
                if ( current[ y ][ x ] ) 
                {
                    ctx.fillStyle = colors[ current[ y ][ x ] - 1 ];
                    drawBlock( currentX + x, currentY + y );
                }
            }
        }
    }

    // renvoie les méthodes de la classe
    return {
        "render"         : render
    };

};// fin classe Map