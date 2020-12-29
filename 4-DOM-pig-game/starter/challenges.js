/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundscores, activePlayer, prevDice;

init();

document.querySelector('.btn-roll').addEventListener('click', function(){
    var dice = Math.floor(Math.random() * 6)+1;
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png'
    console.log('dice is '+ dice + ' and prev Dice is '+prevDice);
    if(dice === 6 && prevDice === 6){
        scores[activePlayer] = 0;
        document.getElementById('current-' + activePlayer).textContent = '0';
    }else if(dice !== 1){
        roundScore += dice;
        document.getElementById('current-'+activePlayer).textContent = roundScore;
    }else{
        console.log('dice came out as '+ dice)
        prevDice = 0;
        togglePlayer();
    }
    prevDice = dice;
});

document.querySelector('.btn-hold').addEventListener('click', function(){
    var finalScore = 30;
    scores[activePlayer] += roundScore;
    document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
    var input = document.querySelector('.final-score').value;
    //Undefined, null, 0  or "" are coerced to False
    if(input){
        finalScore = input;
    }
    console.log(finalScore);
    
    if(scores[activePlayer] >= finalScore){
        document.getElementById('name-' + activePlayer).textContent = 'Winner';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.btn-roll').disabled = true;
        document.querySelector('.btn-hold').disabled = true;
    }else {
        togglePlayer();
    }
});

document.querySelector('.btn-new').addEventListener('click', init);

function togglePlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.dice').style.display = 'none';
    prevDice = 0;
}

function init(){
    scores=[0,0];
    roundScore=0;
    activePlayer = 0;
    prevDice = 0;

    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    
    document.querySelector('.btn-roll').disabled = false;
    document.querySelector('.btn-hold').disabled = false;
}
/*dice = Math.floor(Math.random * 6)+1;

document.querySelector('#current-' + activePlayer).textContent = disc;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

var x = document.querySelector('#score-0').textContent;
console.log(x);

//To access css class we use dot inside query selector's parenthesis
document.querySelector('.dice').style.display = 'none';*/