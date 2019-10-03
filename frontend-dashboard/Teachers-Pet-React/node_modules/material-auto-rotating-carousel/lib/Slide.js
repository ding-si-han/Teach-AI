'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Typography = require('@material-ui/core/Typography');

var _Typography2 = _interopRequireDefault(_Typography);

var _blue = require('@material-ui/core/colors/blue');

var _blue2 = _interopRequireDefault(_blue);

var _withStyles = require('@material-ui/core/styles/withStyles');

var _withStyles2 = _interopRequireDefault(_withStyles);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var styles = {
  root: {
    backgroundColor: _blue2.default[500],
    height: '100%'
  },
  rootMobileLandscape: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row'
  },
  media: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& > *': {
      maxHeight: '100%'
    }
  },
  mediaMobile: {
    position: 'relative',
    top: '50%',
    transform: 'translateY(-50%)'
  },
  mediaMobileLandscape: {},
  mediaBackground: {
    backgroundColor: _blue2.default[700],
    height: 'calc(100% - 216px)',
    textAlign: 'center'
  },
  mediaBackgroundMobile: {
    height: 'calc(100% - 241px)'
  },
  mediaBackgroundMobileLandscape: {
    height: '100%',
    flex: '1 1',
    alignSelf: 'stretch'
  },
  text: {
    textAlign: 'center',
    maxWidth: '80%',
    margin: '0 auto',
    paddingTop: 32
  },
  textMobile: {
    paddingTop: 30,
    '& $title': {
      marginBottom: 8
    }
  },
  textMobileLandscape: {
    minWidth: 300,
    maxWidth: 'calc(50% - 48px)',
    padding: '24px 24px 128px',
    flex: '0 1',
    alignSelf: 'center',
    textAlign: 'left',
    margin: 0
  },
  title: {
    fontSize: '24px',
    fontWeight: 700,
    lineHeight: '32px',
    marginBottom: 12,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    color: '#fff'
  },
  subtitle: {
    fontSize: '15px',
    fontWeight: 400,
    lineHeight: '18px',
    margin: 0,
    color: '#fff'
  }
};

function Slide(props) {
  var _classNames, _classNames2, _classNames3, _classNames4;

  var classes = props.classes,
      media = props.media,
      mediaBackgroundStyle = props.mediaBackgroundStyle,
      subtitle = props.subtitle,
      title = props.title,
      mobile = props.mobile,
      landscape = props.landscape,
      other = _objectWithoutProperties(props, ['classes', 'media', 'mediaBackgroundStyle', 'subtitle', 'title', 'mobile', 'landscape']);

  var mobileLandscape = mobile && landscape;

  return _react2.default.createElement(
    'div',
    _extends({
      className: (0, _classnames2.default)(classes.root, (_classNames = {}, _defineProperty(_classNames, classes.rootMobile, mobile), _defineProperty(_classNames, classes.rootMobileLandscape, mobileLandscape), _classNames))
    }, other),
    _react2.default.createElement(
      'div',
      {
        className: (0, _classnames2.default)(classes.mediaBackground, (_classNames2 = {}, _defineProperty(_classNames2, classes.mediaBackgroundMobile, mobile), _defineProperty(_classNames2, classes.mediaBackgroundMobileLandscape, mobileLandscape), _classNames2)),
        style: mediaBackgroundStyle
      },
      _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(classes.media, (_classNames3 = {}, _defineProperty(_classNames3, classes.mediaMobile, mobile), _defineProperty(_classNames3, classes.mediaMobileLandscape, mobileLandscape), _classNames3)) },
        media
      )
    ),
    _react2.default.createElement(
      'div',
      {
        className: (0, _classnames2.default)(classes.text, (_classNames4 = {}, _defineProperty(_classNames4, classes.textMobile, mobile), _defineProperty(_classNames4, classes.textMobileLandscape, mobileLandscape), _classNames4))
      },
      _react2.default.createElement(
        _Typography2.default,
        { className: classes.title },
        title
      ),
      _react2.default.createElement(
        _Typography2.default,
        { className: classes.subtitle },
        subtitle
      )
    )
  );
}

Slide.propTypes = {
  /**
   * Useful to extend the style applied to components.
   */
  classes: _propTypes2.default.object.isRequired,
  /**
   * Object to display in the upper half.
   */
  media: _propTypes2.default.node.isRequired,
  /**
   * Override the inline-styles of the media container.
   */
  mediaBackgroundStyle: _propTypes2.default.object,
  /**
   * Subtitle of the slide.
   */
  subtitle: _propTypes2.default.string.isRequired,
  /**
   * Title of the slide.
   */
  title: _propTypes2.default.string.isRequired,
  /**
   * If `true`, the screen width and height is filled.
   * @ignore
   */
  mobile: _propTypes2.default.bool,
  /**
   * If `true`, slide will adjust content for wide mobile screens.
   * @ignore
   */
  landscape: _propTypes2.default.bool
};

exports.default = (0, _withStyles2.default)(styles)(Slide);