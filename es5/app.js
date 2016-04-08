'use strict'

var game = {};
var xcords = [0, 1, 2, 3];
var ycords = [0, 1, 2, 3];
var curPosition = [0, 0];
var bossPosition = [4, 4];
var items = [
  {
    name: 'shield',
    buff: 10
  },
  {
    name: 'bullets',
    buff: 10
  },
  {
    name: 'banana peel',
    buff: -1
  },
  {
    name: 'batteries',
    buff: 1
  },
  {
    name: 'four leaf clover',
    buff: 2
  }
]

angular.module('app', [])
  .controller('GameController', function() {
    this.characters = 'name',
    this.boss = {
      // position: function(){
      //   var randX = Math.floor(Math.random() * (4));
      //   var randY = Math.floor(Math.random() * (4));
      //   if(randX === curPosition[0] && randY === curPosition[1]){
      //     console.log('fight!');
      //   }
      //   this.bossPosition = [randX, randY]
      // },
      health: 100,
      attack: 120
    },
    this.x = xcords;
    this.y = ycords;
    this.bossPosition = bossPosition;
    this.curPosition = curPosition;
    this.getPosition = function(x, y) {
      this.boss.position();
      if(x + curPosition[0] < 0 || y + curPosition[1] < 0 || x + curPosition[0] > 4 || y + curPosition[1] > 4) {
        return console.log('you walked into a wall, you can\'t move in that direction');
      }
      this.curPosition = [curPosition[0] += x, curPosition[1] += y];
    }
  })


function Soldier(health, weaponStat, luck) {
  this.health = health;
  this.weaponStat = weaponStat;
  this.luck = luck;
}

RobotSoldier.prototype = new Soldier();

function RobotSoldier(toughness, batteryLvl){
  this.toughness = toughness;
  this.batteryLvl = batteryLvl;
}

var newRobot = new RobotSoldier(2, 13)
newRobot.health = 50;
newRobot.weaponStat = 20;
newRobot.luck = 0;
// console.log('initial robot setup, ', newRobot);

game.bossMovement = function() {
  var randX = Math.floor(Math.random() * (4));
  var randY = Math.floor(Math.random() * (4));
  if(randX === curPosition[0] && randY === curPosition[1]){
    console.log('fight!');
  }
  return
}

game.getItems = function(luck) {
  var ranNum = Math.floor(Math.random() * (10));
  if (luck) {
    ranNum = Math.floor(Math.random() * (10 - luck)) + luck;
  }
  // console.log(ranNum);
  if(ranNum < 5) {
    var iDelta = items[ranNum];
    console.log(iDelta.name);
    if(iDelta.name === 'shield') {
      newRobot.toughness += iDelta.buff;
    }
    if(iDelta.name === 'bullets') {
      newRobot.weaponStat += iDelta.buff;
    }
    if(iDelta.name === 'banana peel') {
      newRobot.batteryLvl += iDelta.buff;
    }
    if(iDelta.name === 'batteries') {
      newRobot.batteryLvl += iDelta.buff;
    }
    if(iDelta.name === 'four leaf clover') {
      newRobot.luck += iDelta.buff;
    }
  }
  // console.log('after getitems, ', newRobot);
}

game.position = function(x, y) {
  // game.getItems()

}
