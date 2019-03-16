// bundle.js

/******/ (function(modules) { // webpackBootstrap
/******/    var installedModules = {};

/******/    function __webpack_require__(moduleId) {
/******/        if(installedModules[moduleId])
/******/            return installedModules[moduleId].exports;

/******/        var module = installedModules[moduleId] = {
/******/            exports: {},
/******/            id: moduleId,
/******/            loaded: false
/******/        };

/******/        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/        module.loaded = true;

/******/        return module.exports;
/******/    }

/******/    __webpack_require__.m = modules;
/******/    __webpack_require__.c = installedModules;
/******/    __webpack_require__.p = "";

/******/    return __webpack_require__(0);
/******/ })
/**********************下面是传入的数组参数*****************************************/
/******/ ([
/* 0 代表的是first.js*/
/***/ function(module, exports, __webpack_require__) {

    var second = __webpack_require__(1);

    console.log('I am First');

    second.apple();

/***/ },
/* 1 代表的是second.js*/
/***/ function(module, exports) {

    exports.apple = function () {
        console.log('I am apple')
    };

    exports.banana = function () {
        console.log('I am banana')
    };

/***/ }
/******/ ]);