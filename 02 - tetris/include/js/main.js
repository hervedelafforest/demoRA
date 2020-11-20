/**

  The Initial Developer of the Original Code is
  Matthieu  - http://www.programmation-facile.com/
  Portions created by the Initial Developer are Copyright (C) 2013
  the Initial Developer. All Rights Reserved.

  Contributor(s) :

 */



document.addEventListener("DOMContentLoaded", Main, false); // appel au chargement de la page



/**
 * Fonction principale
 * Appelée au chargement de la page
 * 
 */
function Main()
{
    console.log("Main");

    var oDivGame = document.getElementById("idGameDiv");
    BLOCK_W = W / COLS, BLOCK_H = H / ROWS;  

    var oDivGame = document.getElementById("idGameDiv");

    if (Modernizr.canvas && Modernizr.localstorage && 
        Modernizr.audio && (Modernizr.audio.ogg || Modernizr.audio.mp3) )
    {
        /* window.setTimeout(function () { newGame();
                          setInterval( render, 30 ); }, 0); */
        window.setTimeout(function () { TETRIS.init(oDivGame, "./"); }, 0);
    }     
    else 
        oDivGame.innerHTML = "Désolé, un navigateur récent est nécessaire...<br /><small>" +  "(firefox 3.6+, Chrome 4+, Opera 10+ and Safari 4+)</small>";
      
}



