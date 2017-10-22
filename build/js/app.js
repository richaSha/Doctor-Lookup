(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.apiKey = "582938f24498f577e99318e6356c972d";

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var apiKey = require('./../.env').apiKey;

var Doctor = exports.Doctor = function () {
  function Doctor(name) {
    _classCallCheck(this, Doctor);

    this.patientName = name;
    this.conditionApi = 'https://api.betterdoctor.com/2016-03-01/conditions?user_key=' + apiKey;
  }

  _createClass(Doctor, [{
    key: 'findConditionList',
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
    key: 'conditionList',
    value: function conditionList(response) {
      response.data.forEach(function (data) {
        $('.conditionList').append('<option value="' + data.uid + '">' + data.name + '</option>');
      });
    }
  }, {
    key: 'findDoctorList',
    value: function findDoctorList(condition) {
      var self = this;
      var doctorApi = 'https://api.betterdoctor.com/2016-03-01/doctors?location=45.5,-122.6,100&query=' + condition + '&skip=2&limit=10&user_key=' + apiKey;
      var request = new XMLHttpRequest();
      request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          self.doctorList(JSON.parse(this.responseText));
        } else if (this.readyState == 4 && this.status != 200) {
          var error = JSON.parse(this.responseText);
          $('.container-fluid').prepend('<div class="alert alert-warning alert-dismissable fade in">\n       <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>\n       ' + error.meta.message + '\n     </div>');
          $('.searchPage').removeClass('hide');
        }
      };
      request.open("GET", doctorApi, true);
      request.send();
    }
  }, {
    key: 'doctorList',
    value: function doctorList(response) {
      if (response.data.length == 0) {
        $('.container-fluid').prepend('<div class="alert alert-warning alert-dismissable fade in">\n     <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>\n     No Doctor Available\n     </div>');
        $('.searchPage').removeClass('hide');
      } else {
        response.data.forEach(function (data) {
          $('.docList').append('<div class="docInfo">\n                              <div class="docImg"><img src="' + data.profile.image_url + '"/></div>\n                              <div class="docDetail">\n                                <h4>' + data.profile.title + ' ' + data.profile.first_name + ' ' + data.profile.middle_name + ' ' + data.profile.last_name + '</h4>\n                                <h5>' + data.specialties[0].actor + '</h5>\n                              </div></div>');
          data.practices.forEach(function (data) {
            if (data.within_search_area && data.visit_address.city == "Portland") {
              if (data.accepts_new_patients) {
                $('.docDetail').append('<h5>Accepts new patients</h5>');
              }

              if (data.website) {
                $('.docDetail').append('<h5><b>Website:</b> ' + data.website + ' </h5>');
              } else {
                $('.docDetail').append('<h5><b>Website:</b> N/A </h5>');
              }

              if (data.visit_address) {
                $('.docDetail').append('<h5><b>Address:</b> ' + data.visit_address.street + ', ' + data.visit_address.city + ', ' + data.visit_address.state_long + ' ' + data.visit_address.zip + '</h5>');
              } else {
                $('.docDetail').append('<h5><b>Address:</b> N/A</h5>');
              }
              if (data.phones) {
                data.phones.forEach(function (phone) {
                  if (phone.type == "landline") {
                    $('.docDetail').append('<h5><b>Phone:</b> ' + phone.number + '</h5><hr>');
                  }
                });
              }
            }
          });
        });
      }
    }
  }]);

  return Doctor;
}();

},{"./../.env":1}],3:[function(require,module,exports){
"use strict";

var _doctorLookup = require("./../js/doctor-lookup.js");

$(document).ready(function () {
  var doctorObj = new _doctorLookup.Doctor();
  doctorObj.findConditionList();
  $(".findDoc").click(function () {
    var condition = $('.conditionList').val();
    var name = $('.name').val();
    try {
      if (condition == "non" || name == "") {
        throw "Please fill below data";
      } else {
        $('.searchPage').addClass('hide');
        doctorObj.findDoctorList(condition);
      }
    } catch (e) {
      $(".searchPage").prepend("<div class=\"alert alert-warning alert-dismissable fade in\">\n    <a href=\"#\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">&times;</a>\n    " + e + "\n  </div>");
    }
  });
});

},{"./../js/doctor-lookup.js":2}]},{},[3]);
