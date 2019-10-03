webpackHotUpdate("main",{

/***/ "./src/App.js":
/*!********************!*\
  !*** ./src/App.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return App; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! framer-motion */ "./node_modules/framer-motion/dist/framer-motion.es.js");
var _jsxFileName = "/Users/dingsihan/Desktop/react/poseAnimate/poseanimation/src/App.js";


const styles = {
  background: "blue",
  borderRadius: "50%",
  width: 150,
  height: 150,
  margin: "auto"
};
class App extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  componentDidMount() {
    setInterval(() => {
      fetch("http://localhost:5005/").then(res => res.json()).then(data => {
        this.setState({
          database: data
        });
        console.log(this.state.database);
      }).catch(console.log);
    }, 1500);
  }

  render() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 27
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(framer_motion__WEBPACK_IMPORTED_MODULE_1__["motion"].div, {
      style: styles,
      animate: {
        x: 200,
        y: 300
      },
      transition: {
        duration: 2
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 28
      },
      __self: this
    }));
  }

}

/***/ })

})
//# sourceMappingURL=main.cb0467ab44187947ee9a.hot-update.js.map