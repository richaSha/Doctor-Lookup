(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Doctor = exports.Doctor = function () {
  function Doctor(name) {
    _classCallCheck(this, Doctor);

    this.patientName = name;
    this.conditionApi = "https://api.betterdoctor.com/2016-03-01/conditions?user_key=582938f24498f577e99318e6356c972d";
    this.DoctorApi = "https://api.betterdoctor.com/2016-03-01/doctors?location=37.773,-122.413,100&query=&skip=2&limit=10&user_key=";
  }

  _createClass(Doctor, [{
    key: "findConditionList",
    value: function findConditionList() {
      var self = this;
      var response = void 0;
      var request = new XMLHttpRequest();
      request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          self.conditionList(JSON.parse(this.responseText));
        }
      };
      request.open("GET", this.conditionApi, true);
      request.send();
    }
  }, {
    key: "conditionList",
    value: function conditionList(response) {
      response.data.forEach(function (data) {
        $('.conditionList').append("<option value=\"" + data.uid + "\">" + data.name + "</option>");
      });
    }
  }]);

  return Doctor;
}();

},{}],2:[function(require,module,exports){
"use strict";

var _doctorLookup = require("./../js/doctor-lookup.js");

$(document).ready(function () {
  var doctorObj = new _doctorLookup.Doctor();
  doctorObj.findConditionList();
});

},{"./../js/doctor-lookup.js":1}]},{},[2]);
