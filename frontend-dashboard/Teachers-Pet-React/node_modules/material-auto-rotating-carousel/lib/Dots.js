'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _materialUi = require('material-ui');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
  dot: {
    width: 8,
    height: 8,
    background: '#fff',
    margin: '0 4px',
    float: 'left',
    transition: 'all 400ms cubic-bezier(0.4, 0.0, 0.2, 1)',
    position: 'absolute'
  }
};

var Dots = function (_Component) {
  _inherits(Dots, _Component);

  function Dots(props) {
    _classCallCheck(this, Dots);

    var _this = _possibleConstructorReturn(this, (Dots.__proto__ || Object.getPrototypeOf(Dots)).call(this, props));

    _this.state = {
      previousIndex: null
    };
    return _this;
  }

  _createClass(Dots, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(_ref) {
      var _this2 = this;

      var index = _ref.index;

      if (index !== this.props.index) {
        this.setState({ previousIndex: this.props.index });
        this.timeout = setTimeout(function () {
          _this2.timeout = null;
          _this2.setState({ previousIndex: index });
        }, 450);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.timeout != null) {
        clearTimeout(this.timeout);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          count = _props.count,
          index = _props.index,
          _props$style = _props.style,
          style = _props$style === undefined ? {} : _props$style;
      var previousIndex = this.state.previousIndex;


      return _react2.default.createElement(
        'div',
        { style: _extends({}, style, { width: count * 16 }) },
        _react2.default.createElement(
          'div',
          { style: { position: 'relative' } },
          [].concat(_toConsumableArray(Array(count).keys())).map(function (i) {
            return _react2.default.createElement(_materialUi.Paper, {
              key: i,
              circle: true,
              zDepth: 0,
              style: _extends({}, styles.dot, {
                opacity: i >= Math.min(previousIndex, index) && i <= Math.max(previousIndex, index) ? 0 : 0.5,
                left: i * 16
              })
            });
          }),
          _react2.default.createElement(_materialUi.Paper, {
            zDepth: 0,
            style: _extends({}, styles.dot, {
              left: Math.min(previousIndex, index) * 16,
              width: Math.abs(previousIndex - index) * 16 + 8,
              borderRadius: 4
            })
          })
        )
      );
    }
  }]);

  return Dots;
}(_react.Component);

exports.default = Dots;


Dots.propTypes = {
  count: _react.PropTypes.number.isRequired,
  index: _react.PropTypes.number.isRequired,
  style: _react.PropTypes.object
};