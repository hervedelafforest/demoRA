/**

  The Initial Developer of the Original Code is
  Matthieu  - http://www.programmation-facile.com/
  Portions created by the Initial Developer are Copyright (C) 2013
  the Initial Developer. All Rights Reserved.

  Contributor(s) :

 */


/**
 * Variables globales
 */

// le moteur de rendu
var ctx;
var W = 300;
var H = 500;
var BLOCK_W;

// les objets du jeu
var oMap = null,
    oGame = null,
    oAudio = null;

// tetris
var COLS = 10, ROWS = 20;
var board = [];
var lose;
var interval;
var current; // la forme en mouvement
var currentX, currentY; // position de la forme courante
var shapes = [
    [ 1, 1, 1, 1 ],
    [ 1, 1, 1, 0,
      1 ],
    [ 1, 1, 1, 0,
      0, 0, 1 ],
    [ 1, 1, 0, 0,
      1, 1 ],
    [ 1, 1, 0, 0,
      0, 1, 1 ],
    [ 0, 1, 1, 0,
      1, 1 ],
    [ 0, 1, 0, 0,
      1, 1, 1 ]
];

// les couleurs des formes
var colors = [
    'cyan', 'orange', 'blue', 'yellow', 'red', 'green', 'purple'
];

var Tetris      = {};// contient les "classes" du jeu


/**
 * Gestion du jeu lui même
 * 
 * @param  {[type]} ) {               var state [description]
 * @return {[type]}   [description]
 */
var TETRIS = (function () 
{

    /**
     * initialisation et lancement du jeu
     * 
     * @param  {[type]} wrapper [description]
     * @param  {[type]} root    [description]
     * @return {[type]}         [description]
     */
    function init(wrapper, root) 
    {
        var canvas   = document.createElement("canvas");     
        canvas.setAttribute("width", W + "px");
        canvas.setAttribute("height", H+ "px");
        wrapper.appendChild(canvas);
        ctx  = canvas.getContext('2d');

        oAudio = new Tetris.Audio({"soundDisabled":soundDisabled});
        oMap   = new Tetris.Map();
        oGame   = new Tetris.Engine()

        // utilisation de l'audio au format mp3 ou ogg en fonction du navigateur
        var extension = Modernizr.audio.ogg ? 'ogg' : 'mp3';

        var audio_files = [
            ["winLigne", root + "audio/pop." + extension]
        ];

        load(audio_files, function() { loaded(); });
    
    }

    
    /**
     * Chargement des fichiers audio
     * 
     * @param  {[type]}   arr      [description]
     * @param  {Function} callback [description]
     * @return {[type]}            [description]
     */
    function load(arr, callback) 
    {   
        // appel larsque le chargement des fichiers est terminé
        if (arr.length === 0) 
            callback();
        else 
        { 
            var x = arr.pop();
            oAudio.load(x[0], x[1], function() { load(arr, callback); });
        }
    };
        

    /**
     * Chargement des fichiers audio terminés
     * Lancement de l'écran d'accueil du jeu
     * 
     * @return {[type]} [description]
     */
    function loaded() 
    {
        console.log("Tetris : fichiers audio chargés.");

        oMap.newGame();

        /**
         * Gestion des touches directionnelles
         * 
         * @param  {[type]} e [description]
         * @return {[type]}   [description]
         */
        document.body.onkeydown = function( e ) 
        {
            // les touches directionnelles sont prises en compte
            var keys = {
                37: 'left',
                39: 'right',
                40: 'down',
                38: 'rotate'
            };

            if ( typeof keys[ e.keyCode ] != 'undefined' ) 
            {
                oMap.keyPress( keys[ e.keyCode ] );
                oGame.render();
            }
        };


        setInterval( oGame.render, 30 );
    };


    /**
     * Permet de savoir si le son est actif ou non
     * 
     * @return {[type]} [description]
     */
    function soundDisabled() 
    {
        return localStorage["soundDisabled"] === "true";
    };
    

    // les méthodes publiques de la classe disponibles
    return {
          "init" : init
      };

}());

