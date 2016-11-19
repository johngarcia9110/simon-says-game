//TODO: once finished remove comment from start button disable in logic.startRound


var players = {
  computer: {
    id : 0
  },
  human : {
    id : 1
  }
};

var buttons = {
  green : document.getElementById('green'),
  red : document.getElementById('red'),
  yellow : document.getElementById('yellow'),
  blue : document.getElementById('blue'),
  start : document.getElementById('start'),
  strict : document.getElementById('strict'),
  power : document.getElementById('switch'),
  count : document.getElementById('count'),
  audio : document.getElementById('audio')
};

var game = {
  status : {
    round : 0,
    turn : 0,
    power : false,
    strict : false,
    computerSequence : [],
    humanSequence : [],
    soundNum : 0,
    soundPlayer : ''
  },
  logic : {
    startRound : function(){
      if(game.status.power === true){
        this.addStep(0);
        game.status.soundPlayer = setInterval(this.playSequence, 1000);
        //buttons.start.disabled = true;
      }else{
        console.log('You must turn the game on before you can play');
      }
    },
    playSequence : function(){
      if(game.status.soundNum < game.status.computerSequence.length){
        handlers.playSound(game.status.computerSequence[game.status.soundNum] + 'Sound');
        handlers.pressButton(game.status.computerSequence[game.status.soundNum]);
        game.status.soundNum++;
      }else{
        clearInterval(game.status.soundPlayer);
        game.status.soundNum = 0;
      }
    },
    addStep : function(player){
      if(player === 0){
        //get step to computerSequence
        game.status.round++;
        handlers.displayRound();
        var stepList = ['green', 'red', 'yellow', 'blue'];
        var randomStep = Math.floor(Math.random()* 4);
        game.status.computerSequence.push(stepList[randomStep]);
      }else{
        //get step to humanSequence
      }
    },
    replaySequence : function(){

    },
    clearSequence : function(){

    },

  }
};

var handlers = {
  init : function(){
    //set event listeners
    buttons.green.addEventListener('click', function(){

    });
    buttons.red.addEventListener('click', function(){

    });
    buttons.yellow.addEventListener('click', function(){

    });
    buttons.blue.addEventListener('click', function(){

    });
    buttons.start.addEventListener('click', function(){
      game.logic.startRound();
    });
    buttons.strict.addEventListener('click', function(){

    });
    buttons.power.addEventListener('click', function(){
        handlers.togglePower();
    });
  },
  togglePower : function(){
    game.status.power = !game.status.power;
  },
  pressButton : function(color){
    var targetButton = buttons[color];
    targetButton.classList.add('lit');
    setTimeout(function(){
      targetButton.classList.remove('lit');
    }, 500);
  },
  playSound : function(audioElement){
    document.getElementById(audioElement).play();
  },
  displayRound : function(){
    if(game.status.round < 20){
      buttons.count.innerHTML = '-' + game.status.round;
    }else{
      buttons.status.count.innerHTML = game.status.round;
    }
  },


};


var sounds = {
  green : 'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3',
  red : 'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3',
  yellow : 'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3',
  blue : 'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'

}

handlers.init();
