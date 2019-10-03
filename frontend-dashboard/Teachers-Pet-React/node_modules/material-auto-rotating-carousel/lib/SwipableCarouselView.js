'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Carousel;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _autoPlay = require('react-swipeable-views-utils/lib/autoPlay');

var _autoPlay2 = _interopRequireDefault(_autoPlay);

var _virtualize = require('react-swipeable-views-utils/lib/virtualize');

var _virtualize2 = _interopRequireDefault(_virtualize);

var _bindKeyboard = require('react-swipeable-views-utils/lib/bindKeyboard');

var _bindKeyboard2 = _interopRequireDefault(_bindKeyboard);

var _reactSwipeableViews = require('react-swipeable-views');

var _reactSwipeableViews2 = _interopRequireDefault(_reactSwipeableViews);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var VirtualizeSwipeViews = (0, _bindKeyboard2.default)((0, _virtualize2.default)(_reactSwipeableViews2.default));
var VirtualizeAutoPlaySwipeViews = (0, _autoPlay2.default)(VirtualizeSwipeViews);

var carouselSlideRenderer = function carouselSlideRenderer(children) {
  return function (_ref) {
    var index = _ref.index,
        key = _ref.key;
    return _react2.default.cloneElement(children[(0, _util.modulo)(index, children.length)], { key: key });
  };
};

function Carousel(_ref2) {
  var children = _ref2.children,
      autoplay = _ref2.autoplay,
      other = _objectWithoutProperties(_ref2, ['children', 'autoplay']);

  var slideRenderer = carouselSlideRenderer(children);
  return autoplay ? _react2.default.createElement(VirtualizeAutoPlaySwipeViews, _extends({}, other, {
    slideRenderer: slideRenderer
  })) : _react2.default.createElement(VirtualizeSwipeViews, _extends({}, other, {
    slideRenderer: slideRenderer
  }));
}