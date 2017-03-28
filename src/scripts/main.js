import Monster from './Monster';

const charmander = new Monster('小火龍', './dist/img/charmander.png', 100, '火系');
const squirtle = new Monster('傑尼龜', './dist/img/squirtle.png', 100, '水系');
const bulbasaur = new Monster('妙花種子', './dist/img/bulbasaur.png', 100, '草系');

const cyndaquil = new Monster('火球鼠', './dist/img/cyndaquil.png', 100, '火系');
const totodile = new Monster('小鋸鱷', './dist/img/totodile.png', 100, '水系');
const chikorita = new Monster('菊草葉', './dist/img/chikorita.png', 100, '草系');

const monsters = [charmander, squirtle, bulbasaur];
const competitors = [cyndaquil, totodile, chikorita];

let myHP = 3, cpHP = 3;

const btnStart = document.getElementById('#start');
btnStart.addEventListener('click',play);


function play(){
	let myChoice;
	let competitorChoice;
	let winner;

	while(!(winner = checkWinner())) {
		if(winner){
			alert(`勝負已分，獲勝的是${winner}選手`);
			reStart();
		}

		myChoice = parseInt(prompt('小治，請問你要派出哪隻神奇寶貝呢（請輸入數字）？ -------- 0 小火龍 1 傑尼龜 2 妙蛙種子'));
		competitorChoice = Math.floor(Math.random() * 3);

		if((myChoice < 0) || (myChoice >= 3)){
			alert('請輸入正確數字喔！');
			continue;
		} else if(!(monsters[myChoice].isAlive())) {
			alert(`${monsters[myChoice].getName()} 已經失去戰鬥能力，無法指派`);
			continue;
		}

		while(!(competitors[competitorChoice].isAlive())){
			competitorChoice = Math.floor(Math.random() * 3);
		}

		if(monsters[myChoice].isAlive()){
			switch(myChoice) {
				case 0:
					if(competitorChoice === 0){
						pk(myChoice, competitorChoice, 'tie');
						showView(myChoice, competitorChoice);
					} else if(competitorChoice === 1) {
						pk(myChoice, competitorChoice, 'lose');
						showView(myChoice, competitorChoice);
					} else {
						pk(myChoice, competitorChoice, 'win');
						showView(myChoice, competitorChoice);
					}
					break;
				case 1:
					if(competitorChoice === 0){
						pk(myChoice, competitorChoice, 'win');
						showView(myChoice, competitorChoice);
					} else if(competitorChoice === 1) {
						pk(myChoice, competitorChoice, 'tie');
						showView(myChoice, competitorChoice);
					} else {
						pk(myChoice, competitorChoice, 'lose');
						showView(myChoice, competitorChoice);
					}
					break;
				case 2:
					if(competitorChoice === 0){
						pk(myChoice, competitorChoice, 'lose');
						showView(myChoice, competitorChoice);
					} else if(competitorChoice === 1) {
						pk(myChoice, competitorChoice, 'win');
						showView(myChoice, competitorChoice);
					} else {
						pk(myChoice, competitorChoice, 'tie');
						showView(myChoice, competitorChoice);
					}
					break;
			}

		} else {
			alert(`${monsters[myChoice].getName()} 已失去戰鬥能力！`);
		}

	}
}

function pk(myChoice, cpChocie, result) {
	switch(result) {
		case 'win':
			monsters[myChoice].setHurt(5);
			competitors[cpChocie].setHurt(50);
			checkAlive(myChoice, cpChocie);
			showView(myChoice, cpChocie);
			break;
		case 'lose':
			monsters[myChoice].setHurt(50);
			competitors[cpChocie].setHurt(5);
			checkAlive(myChoice, cpChocie);
			showView(myChoice, cpChocie);
			break;
		case 'tie':
			monsters[myChoice].setHurt(30);
			competitors[cpChocie].setHurt(30);
			checkAlive(myChoice, cpChocie);
			showView(myChoice, cpChocie);
			break;
	}
}

function checkAlive(myChoice, cpChocie) {
	if(!(monsters[myChoice].isAlive())){
		myHP -= 1;
	}
	if(!(competitors[cpChocie].isAlive())){
		cpHP -= 1;
	}
}

function showView(myChoice, cpChocie) {

}

function checkWinner() {
	if(myHP === 0 && cpHP === 0) {
		return '小治和小帽';
	} else if(myHP <== 0) {
		return '小帽';
	} else if(cpHP <== 0) {
		return '小治(你)'
	}	else {
		return false;
	}

}

function reStart() {
	if(confirm('重新載入再完一次?')){
		window.location.reload()
	} else {
		alert('在此處暫歇');
	}
}