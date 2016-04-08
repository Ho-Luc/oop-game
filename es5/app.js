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
    this.message = 'none at the moment';
    this.battleMsg = ' ';
    this.characters = newRobot;
    this.x = xcords;
    this.y = ycords;
    this.bossPosition = bossPosition;
    this.curPosition = curPosition;
    this.getItems = function() {
      var ranNum = Math.floor(Math.random() * (10));
      if (newRobot.luck) {
        ranNum = Math.floor(Math.random() * (10 - newRobot.luck)) + newRobot.luck;
      }
      if(ranNum < 5) {
        var iDelta = items[ranNum];
        // console.log(iDelta.name);
        if(iDelta.name === 'shield') {
          newRobot.toughness += iDelta.buff;
          this.message = 'You found some armor and you put it on. Toughness +10';
        }
        if(iDelta.name === 'bullets') {
          newRobot.weaponStat += iDelta.buff;
          this.message = 'You found some special bullets. This will come in handy for the boss. WeaponStat +10';
        }
        if(iDelta.name === 'banana peel') {
          newRobot.batteryLvl += iDelta.buff;
          this.message = 'You slipped on a banana peel, loose 1 battery.';
        }
        if(iDelta.name === 'batteries') {
          newRobot.batteryLvl += iDelta.buff;
          this.message = 'You found some batteries, +1 battery.';
        }
        if(iDelta.name === 'four leaf clover') {
          newRobot.luck += iDelta.buff;
          this.message = 'You found a four leaf clover, \"how did this grow underground? who really knows\". Luck +2';
        }
      }
    }
    this.bossMovement = function() {
      var randX = Math.floor(Math.random() * (3));
      var randY = Math.floor(Math.random() * (3));
      if(randX === curPosition[0] && randY === curPosition[1]){
        this.message = '!!!! You\'ve encoutered the boss !!!!!'
        if(this.boss.attack >= this.characters.health + this.characters.toughness) {
          this.battleMsg = 'You ran out of bullets and your armor couldn\'t stop the boss\'s attack. YOU LOSE!!'
        }
        if(this.characters.weaponStat >= this.boss.health) {
          this.battleMsg = 'You overwhelmed the boss with your barrage of bullets. YOU WIN!!'
        }

      }
      var bossCords = [randX, randY];
      this.bossPosition = bossCords
    };
    this.boss = {
      health: 50,
      attack: 120
    };
    this.getPosition = function(x, y) {
      this.message = 'none at the moment';
      this.characters.batteryLvl -= 1;
      if(this.characters.batteryLvl === 0) {
        this.message = 'Ruh Roh! You forgot your extension cable, you lose! Refresh to play again.'
      }
      this.getItems();
      if(x + curPosition[0] < 0 || y + curPosition[1] < 0 || x + curPosition[0] > 4 || y + curPosition[1] > 4) {
        this.characters.batteryLvl += 1;
        this.message = 'You walked into a wall, you can\'t move in that direction!';
        return
      }
      this.curPosition = [curPosition[0] += x, curPosition[1] += y];
      this.bossMovement();
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

var newRobot = new RobotSoldier(20, 13)
newRobot.health = 50;
newRobot.weaponStat = 20;
newRobot.luck = 0;
