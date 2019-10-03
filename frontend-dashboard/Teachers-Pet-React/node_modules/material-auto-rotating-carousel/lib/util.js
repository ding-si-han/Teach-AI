"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// modulo that supports negative numbers (so that e.g. -5 % 4 = 3)
var modulo = exports.modulo = function modulo(a, n) {
  return (a % n + n) % n;
};