"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.markets = void 0;
var markets = [{
  sport: 'Football',
  market: {
    'Full-time result': ['Home', 'Draw', 'Away'],
    'Double chance': ['Home/Draw', 'Home/Away', 'Draw/Away'],
    'Draw no bet': ['Home', 'Away'],
    Handicap: ['Home -2.5', 'Home -2.25', 'Home -2', 'Home -1.75', 'Home -1.5', 'Home -1.25', 'Home -1', 'Home -0.75', 'Home +0.75', 'Home +1', 'Home +1.25', 'Home +1.5', 'Home +1.75', 'Home +2', 'Home +2.25', 'Away -2.5', 'Away -2.25', 'Away -2', 'Away -1.75', 'Away -1.5', 'Away -1.25', 'Away -1', 'Away -0.75', 'Away +0.75', 'Away +1', 'Away +1.25', 'Away +1.5', 'Away +1.75', 'Away +2', 'Away +2.25'],
    BTTS: ['Yes', 'No'],
    'Over goals': '0.5,0.75,1,1.25,1.5,1.75,2,2.25,2.5,2.75,3,3.25,3.5,3.75,4,4.25,4.5,4.75,5,5.25,5.5,5.75,6,6.25,6.5,6.75'.split(','),
    'Under goals': '0.5,0.75,1,1.25,1.5,1.75,2,2.25,2.5,2.75,3,3.25,3.5,3.75,4,4.25,4.5,4.75,5,5.25,5.5,5.75,6,6.25,6.5,6.75'.split(','),
    'Home Over goals': '0.5,0.75,1,1.25,1.5,1.75,2,2.25,2.5,2.75,3,3.25,3.5,3.75,4,4.25,4.5,4.75,5,5.25,5.5,5.75,6,6.25,6.5,6.75'.split(','),
    'Home Under goals': '0.5,0.75,1,1.25,1.5,1.75,2,2.25,2.5,2.75,3,3.25,3.5,3.75,4,4.25,4.5,4.75,5,5.25,5.5,5.75,6,6.25,6.5,6.75'.split(','),
    'Away Over goals': '0.5,0.75,1,1.25,1.5,1.75,2,2.25,2.5,2.75,3,3.25,3.5,3.75,4,4.25,4.5,4.75,5,5.25,5.5,5.75,6,6.25,6.5,6.75'.split(','),
    'Away Under goals': '0.5,0.75,1,1.25,1.5,1.75,2,2.25,2.5,2.75,3,3.25,3.5,3.75,4,4.25,4.5,4.75,5,5.25,5.5,5.75,6,6.25,6.5,6.75'.split(','),
    'HT result': ['Home', 'Draw', 'Away'],
    'HT Double chance': ['Home/Draw', 'Home/Away', 'Draw/Away'],
    'HT BTTS': ['Yes', 'No'],
    'HT Over goals': '0.5,0.75,1,1.25,1.5,1.75,2,2.25,2.5,2.75,3,3.25,3.5,3.75,4,4.25,4.5,4.75'.split(','),
    'HT Under goals': '0.5,0.75,1,1.25,1.5,1.75,2,2.25,2.5,2.75,3,3.25,3.5,3.75,4,4.25,4.5,4.75'.split(',')
  }
}];
exports.markets = markets;