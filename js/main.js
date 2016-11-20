//TODO: add dissable buttons while it is computer's turn to prevent error

var buttons = {
  green : document.getElementById('green'),
  red : document.getElementById('red'),
  yellow : document.getElementById('yellow'),
  blue : document.getElementById('blue'),
  start : document.getElementById('start'),
  strict : document.getElementById('strict'),
  power : document.getElementById('switch'),
  count : document.getElementById('count'),
  audio : document.getElementById('audio'),
  alerts : document.getElementById('alerts')
};

var game = {
  status : {
    round : 0,
    turn : 0, // 0 = computer turn 1 = human turn
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
        if(game.status.round === 20 && game.status.turn === 0){
          buttons.alerts.innerHTML = "You Have Beat The Game!";
          return false;
        }
        buttons.alerts.innerHTML = "";
        this.addStep();
        game.status.soundPlayer = setInterval(this.playSequence, 1000);
        buttons.start.disabled = true;
      }else{
        buttons.alerts.innerHTML = " You must turn the game on to play =D ";
      }
    },
    playSequence : function(){
      handlers.disableBoard();
      if(game.status.soundNum < game.status.computerSequence.length){
        handlers.playSound(game.status.computerSequence[game.status.soundNum] + 'Sound');
        handlers.pressButton(game.status.computerSequence[game.status.soundNum]);
        game.status.soundNum++;
      }else{
        clearInterval(game.status.soundPlayer);
        game.status.soundPlayer = '';
        game.status.soundNum = 0;
        handlers.enableBoard();
      }
    },
    addStep : function(pressedColor){
      if(!game.status.power){
        return;
      }
      if(game.status.turn === 0){
        //get step to computerSequence
        game.status.round++;
        handlers.displayRound();
        var stepList = ['green', 'red', 'yellow', 'blue'];
        var randomStep = Math.floor(Math.random()* 4);
        game.status.computerSequence.push(stepList[randomStep]);

        //End computer turn
        game.status.turn = 1;
      }else if(game.status.turn === 1){
        //get step to humanSequence
        var currentStep = 0;
        game.status.humanSequence.push(pressedColor);
        if(this.validateStep(currentStep)){
        //validate length of both human and computer sequences
          if(game.status.humanSequence.length === game.status.computerSequence.length){
            if(this.checkSequencesForMatch()){
              //both sequences match
              game.status.humanSequence = [];
              game.status.turn = 0;
              game.logic.startRound();
            }else{
              //both sequences do NOT match
              if(game.status.strict){
                this.restartGame();
              }else{
                this.restartRound();
              }
            }
          }
        }else{
          if(game.status.strict){
            game.logic.restartGame();
          }else{
            game.logic.restartRound();
          }
        }
      }
    },
    checkSequencesForMatch : function(){
      for(var i = 0; i < game.status.computerSequence.length; i++){
        if(game.status.humanSequence[i] === game.status.computerSequence[i] && i === game.status.computerSequence.length -1){
          return true;
        }else if(game.status.humanSequence[i] === game.status.computerSequence[i]){
        }else{
          return false;
        }
      }
    },
    validateStep : function(currentStep){
      var computerSequenceCopy = game.status.computerSequence.slice();
      computerSequenceCopy.length = currentStep + 1;
      for(var i = 0; i < computerSequenceCopy.length; i++){
        if(game.status.humanSequence[i] === computerSequenceCopy[i]){

        }else{
          return false;
        }
      }
      return true;
    },
    replaySequence : function(){
      handlers.disableBoard();
      game.status.soundPlayer = setInterval(this.playSequence, 1000);
    },
    restartRound : function(){
      game.status.humanSequence = [];
      var container = document.getElementById('container');
      container.classList.add('ew');
      setTimeout(function(){
        container.classList.remove('ew');
        game.logic.replaySequence();
      }, 500);
    },
    clearSequence : function(){

    },
    restartGame : function(){
      buttons.alerts.innerHTML = 'you lost in strict mode the game will now reset from the start.';
      clearInterval(game.status.soundPlayer);
      buttons.count.innerHTML = '!!';
      game.status.round = 0;
      game.status.turn = 0;
      game.status.power = true;
      game.status.strict = true;
      game.status.computerSequence = [];
      game.status.humanSequence = [];
      game.status.soundNum = 0;
      game.status.soundPlayer = '';
      setTimeout(function(){
        game.logic.startRound();
        button.alerts.innerHTML = '';
    }, 2000);
    }
  }
};

var handlers = {
  init : function(){
    //set event listeners
    buttons.green.addEventListener('click', function(){
      game.logic.addStep(buttons.green.id);
      handlers.playSound('greenSound');
      handlers.pressButton('green');
    });
    buttons.red.addEventListener('click', function(){
      game.logic.addStep(buttons.red.id);
      handlers.playSound('redSound');
      handlers.pressButton('red');
    });
    buttons.yellow.addEventListener('click', function(){
      game.logic.addStep(buttons.yellow.id);
      handlers.playSound('yellowSound');
      handlers.pressButton('yellow');
    });
    buttons.blue.addEventListener('click', function(){
      game.logic.addStep(buttons.blue.id);
      handlers.playSound('blueSound');
      handlers.pressButton('blue');
    });
    buttons.start.addEventListener('click', function(){
      game.logic.startRound();
    });
    buttons.strict.addEventListener('click', function(){
      handlers.toggleStrict();
    });
    buttons.power.addEventListener('click', function(){
        handlers.togglePower();
    });
  },
  togglePower : function(){
    if(game.status.power){ // if the game is already running and the player toggles, reload the page to set the game back to an off state
      location.reload();
    }
    game.status.power = !game.status.power;
  },
  toggleStrict : function(){
    if(game.status.strict === false){
      buttons.strict.style.border = '2px solid green';
    }else{
      buttons.strict.style.border = 'none';
    }
    game.status.strict = !game.status.strict;
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
  disableBoard : function(){
    console.log('board disabled');
    buttons.green.classList.add('disabled');
    buttons.red.classList.add('disabled');
    buttons.yellow.classList.add('disabled');
    buttons.blue.classList.add('disabled');
  },
  enableBoard : function(){
    buttons.green.classList.remove('disabled');
    buttons.red.classList.remove('disabled');
    buttons.yellow.classList.remove('disabled');
    buttons.blue.classList.remove('disabled');
  }

};

handlers.init();
