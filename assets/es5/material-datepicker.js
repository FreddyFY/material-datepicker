"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var dateToString = function dateToString(string, _date, i18n) {
  var timeNumber = _date.getTime();
  var monthNumber = _date.getMonth() + 1;
  var yearNumber = _date.getYear() + 1900;
  var dayNumber = _date.getDay();
  var dateNumber = _date.getDate();

  string = string.replace(/\{timestamp\}/g, timeNumber);

  string = string.replace(/\{DDDD\}/g, i18n.DDDD[dayNumber]);
  string = string.replace(/\{DDD\}/g, i18n.DDD[dayNumber]);
  string = string.replace(/\{D\}/g, i18n.D[dayNumber]);
  string = string.replace(/\{dd\}/g, ("0" + dateNumber).slice(-2));
  string = string.replace(/\{d\}/g, dateNumber);

  string = string.replace(/\{MMMM\}/g, i18n.MMMM[monthNumber - 1]);
  string = string.replace(/\{MMM\}/g, i18n.MMM[monthNumber - 1]);
  string = string.replace(/\{mm\}/g, ("0" + monthNumber).slice(-2));
  string = string.replace(/\{m\}/g, monthNumber);

  string = string.replace(/\{yyyy\}/g, ("0" + yearNumber).slice(-4));
  string = string.replace(/\{yy\}/g, ("0" + yearNumber).slice(-2));

  return string;
};

var MaterialDatepicker = (function () {
  function MaterialDatepicker(element, settings) {
    _classCallCheck(this, MaterialDatepicker);

    var defaults = {
      type: "date",

      lang: 'en',
      orientation: 'landscape',
      primaryColor: 'rgba(0, 150, 136, 1)',
      theme: 'light',
      buttons: true,
      openOn: 'click',
      closeAfterClick: true,

      date: new Date(),
      weekBegin: 'sunday',
      outputFormat: {
        date: "{yyyy}/{mm}/{dd}",
        month: "{MMMM} {yyyy}"
      },
      topHeaderFormat: "{YYYY}",
      headerFormat: {
        date: "{DDD}, {MMM} {d}",
        month: "{MMM}"
      },
      sitePickerFormat: {
        date: "{MMMM} {yyyy}",
        month: "{yyyy}"
      },

      onLoad: '',
      onOpen: '',
      onNewDate: '',
      outputElement: ''
    };

    this.settings = Object.assign(defaults, settings);
    this.date = this.settings.date;

    if (typeof this.settings.topHeaderFormat == 'object') {
      this.settings.topHeaderFormat = this.settings.topHeaderFormat[this.settings.type];
    }

    if (typeof this.settings.headerFormat == 'object') {
      this.settings.headerFormat = this.settings.headerFormat[this.settings.type];
    }

    if (typeof this.settings.outputFormat == 'object') {
      this.settings.outputFormat = this.settings.outputFormat[this.settings.type];
    }

    if (typeof this.settings.sitePickerFormat == 'object') {
      this.settings.sitePickerFormat = this.settings.sitePickerFormat[this.settings.type];
    }

    this.i18n = lang[this.settings.lang];

    this.element = element;
    if (typeof this.element == 'string') {
      this.element = document.querySelector("" + element);
      if (this.element == null) {
        console.warn("Object is not defined");
        return;
      }
    }

    if (typeof this.settings.outputElement == 'string' && this.settings.outputElement != '') {
      this.settings.outputElement = document.querySelector("" + this.settings.outputElement);
    }

    this.define();
  }

  _createClass(MaterialDatepicker, [{
    key: "define",
    value: function define() {
      var _this = this;

      this.createElement();

      if (this.settings.openOn == 'direct') {
        this.open(this.settings.openOn);
        return;
      }

      this.element.addEventListener(this.settings.openOn, function () {
        _this.open(_this.settings.openOn);
      });
    }
  }, {
    key: "createElement",
    value: function createElement(time) {
      var _this2 = this;

      this.position = this.element.getBoundingClientRect();

      this.picker = document.createElement('div');
      this.picker.setAttribute('class', "mp-" + this.settings.type + "picker mp-picker");
      this.picker.setAttribute('data-theme', this.settings.theme);
      this.picker.setAttribute('data-orientation', this.settings.orientation);
      this.picker.style.top = this.position.top + this.position.height + 10 + 'px';
      this.picker.style.left = this.position.left + 'px';

      var containerInfo = document.createElement('div');
      containerInfo.setAttribute('class', 'mp-picker-info');
      this.picker.appendChild(containerInfo);

      var containerPicker = document.createElement('div');
      containerPicker.setAttribute('class', 'mp-picker-picker');
      this.picker.appendChild(containerPicker);

      //Info
      var containerInfoYear = document.createElement('span');
      containerInfoYear.setAttribute('class', 'mp-info-first');
      containerInfo.appendChild(containerInfoYear);

      var containerInfoMonth = document.createElement('span');
      containerInfoMonth.setAttribute('class', 'mp-info-second');
      containerInfo.appendChild(containerInfoMonth);

      //picker
      var containerPickerYear = document.createElement('div');
      containerPickerYear.setAttribute('class', 'mp-picker-site');
      containerPicker.appendChild(containerPickerYear);

      var containerPickerYearBefore = document.createElement('a');
      containerPickerYearBefore.setAttribute('class', 'mp-picker-site-before mp-picker-site-button');
      containerPickerYear.appendChild(containerPickerYearBefore);
      containerPickerYearBefore.addEventListener('click', function () {
        _this2._siteChange(-1);
      });

      var containerPickerYearThis = document.createElement('span');
      containerPickerYearThis.setAttribute('class', 'mp-picker-site-this mp-animate');
      containerPickerYear.appendChild(containerPickerYearThis);

      var containerPickerYearNext = document.createElement('a');
      containerPickerYearNext.setAttribute('class', 'mp-picker-site-next mp-picker-site-button');
      containerPickerYear.appendChild(containerPickerYearNext);
      containerPickerYearNext.addEventListener('click', function () {
        _this2._siteChange(+1);
      });

      var containerPickerChoose = document.createElement('div');
      containerPickerChoose.setAttribute('class', 'mp-picker-choose mp-animate');
      containerPicker.appendChild(containerPickerChoose);

      //styles
      var newStyle = "\n      .mp-picker:not([data-theme=\"dark\"]) .mp-picker-info {\n        background-color: " + this.settings.primaryColor + ";\n      }\n\n      .mp-picker .mp-picker-choose [class*=\"mp-picker-click\"].active,\n      .mp-picker[data-theme=\"dark\"] .mp-picker-choose [class*=\"mp-picker-click\"].active {\n        background-color: " + this.settings.primaryColor + ";\n      }\n\n      .mp-picker .mp-picker-choose [class*=\"mp-picker-click\"].today:not(.active),\n      .mp-picker[data-theme=\"dark\"] .mp-picker-choose .mp-picker-choose [class*=\"mp-picker-click\"].today:not(.active) {\n        color: " + this.settings.primaryColor + ";\n      }\n    ";

      var containerStyle = document.createElement('style');
      containerStyle.type = 'text/css';
      containerStyle.appendChild(document.createTextNode(newStyle));
      document.querySelector('head').appendChild(containerStyle);

      this._updatePicker();

      //    this.newDate();
    }
  }, {
    key: "_updatePicker",
    value: function _updatePicker() {
      var _this3 = this;

      var containerPickerChoose = this.picker.querySelector('.mp-picker-choose');
      containerPickerChoose.innerHTML = '';

      if (this.settings.type == 'date') {
        var maxMonthLength = 42;
        var week = 7;

        //weekday
        for (var i = 0; i < week; i++) {
          var weekDay = i;
          if (this.settings.weekBegin == 'monday') {
            weekDay = weekDay + 1;
            if (weekDay >= week) {
              weekDay = 0;
            }
          }

          var containerPickerChooseWeekDay = document.createElement('span');
          containerPickerChooseWeekDay.setAttribute('class', "mp-picker-header mp-picker-header-day-" + i);
          containerPickerChooseWeekDay.innerHTML = this.i18n.D[weekDay];
          containerPickerChoose.appendChild(containerPickerChooseWeekDay);
        }

        //all days
        var thisMonthLenght = this.date;
        thisMonthLenght.setDate(1);
        thisMonthLenght.setMonth(thisMonthLenght.getMonth() + 1);
        thisMonthLenght.setDate(0);
        var firstWeekDay = thisMonthLenght;
        thisMonthLenght = thisMonthLenght.getDate();
        firstWeekDay.setDate(1);
        firstWeekDay = firstWeekDay.getDay();

        var _loop = function (i, _num) {
          var containerPickerChooseDay = document.createElement('a');
          containerPickerChooseDay.setAttribute('class', "mp-picker-choose-day");

          var boolean = i >= firstWeekDay;
          if (_this3.settings.weekBegin == 'monday') {
            boolean = i + 1 >= firstWeekDay;
          }

          if (boolean && _num <= thisMonthLenght) {
            containerPickerChooseDay.innerHTML = _num;
            containerPickerChooseDay.classList.add("mp-picker-click-" + _num);
            _num++;
          } else {
            containerPickerChooseDay.innerHTML = ' ';
            containerPickerChooseDay.classList.add('mp-empty');
          }

          containerPickerChoose.appendChild(containerPickerChooseDay);

          containerPickerChooseDay.addEventListener('click', function (element) {
            if (element.path[0].classList.contains('mp-empty')) return;
            var date = _num - 1;
            var nextDate = _this3.date;
            nextDate.setDate(date);
            if (_this3.settings.openOn == 'direct') {
              _this3.newDate(nextDate);
            } else {
              _this3.newDate(nextDate, 'close');
            }
          });
          num = _num;
        };

        for (var i = 0, num = 1; i < maxMonthLength; i++) {
          _loop(i, num);
        }
      } else if (this.settings.type == 'month') {
        var months = 12;

        var _loop2 = function (i) {
          var containerPickerChooseMonth = document.createElement('a');
          containerPickerChooseMonth.setAttribute('class', "mp-picker-click-" + i + " mp-picker-choose-month");
          containerPickerChooseMonth.innerHTML = _this3.i18n.MMM[i];
          containerPickerChoose.appendChild(containerPickerChooseMonth);

          containerPickerChooseMonth.addEventListener('click', function () {
            var month = i;
            var nextDate = _this3.date;
            nextDate.setMonth(month);
            _this3.newDate(nextDate, 'close');
          });
        };

        for (var i = 0; i < months; i++) {
          _loop2(i);
        }
      }
      this.callbackOnLoad();
    }
  }, {
    key: "_siteChange",
    value: function _siteChange(direction) {
      var _this4 = this;

      var directions = { '-1': 'left', '1': 'right' };
      var directionsNot = { '-1': 'right', '1': 'left' };
      if (this.settings.type == 'date') {
        this.date.setMonth(this.date.getMonth() + direction);
      } else if (this.settings.type == 'month') {
        this.date.setYear(this.date.getYear() + 1900 + direction);
      }

      this.picker.querySelectorAll(".mp-animate")[0].classList.add("mp-animate-" + directions[direction]);
      this.picker.querySelectorAll(".mp-animate")[1].classList.add("mp-animate-" + directions[direction]);

      setTimeout(function () {
        _this4.picker.querySelectorAll(".mp-animate")[0].classList.remove("mp-animate-" + directions[direction]);
        _this4.picker.querySelectorAll(".mp-animate")[0].classList.add("mp-animate-" + directionsNot[direction]);
        _this4.picker.querySelectorAll(".mp-animate")[1].classList.remove("mp-animate-" + directions[direction]);
        _this4.picker.querySelectorAll(".mp-animate")[1].classList.add("mp-animate-" + directionsNot[direction]);

        _this4._updatePicker();

        setTimeout(function () {
          _this4.picker.querySelectorAll(".mp-animate")[0].classList.remove("mp-animate-" + directionsNot[direction]);
          _this4.picker.querySelectorAll(".mp-animate")[1].classList.remove("mp-animate-" + directionsNot[direction]);

          _this4.newDate(_this4.date);
        }, 200);
      }, 200);
    }
  }, {
    key: "open",
    value: function open(how) {
      if (how == 'direct' && this.element.tagName == 'DIV') {
        this.element.appendChild(this.picker);
        this.newDate(null);
        this.callbackOnOpen();
        return;
      }

      document.body.appendChild(this.picker);
      var top = this.position.top + this.position.height + 5;
      var left = this.position.left;
      var body = document.body.getBoundingClientRect();
      var picker = this.picker.getBoundingClientRect();

      if (left + picker.width + 50 > body.width) {
        left = left - picker.width - 5;
      }

      if (top + picker.height + 20 > body.height) {
        top = top - picker.height - this.position.height - 5;
      }

      this.picker.style.top = top;
      this.picker.style.left = left;

      this.newDate(null);
      this.callbackOnOpen();
    }
  }, {
    key: "close",
    value: function close() {
      this.picker && this.picker.parentNode && this.picker.parentNode.removeChild(this.picker);
    }
  }, {
    key: "newDate",
    value: function newDate(date, value) {
      var dates = date || this.settings.date;
      var i18n = this.i18n;
      var year = dates.getYear() + 1900 + '';
      var month = dates.getMonth();
      var day = dates.getDay();
      var datee = dates.getDate();

      this.picker.querySelector('.mp-info-first').innerHTML = year;
      this.picker.querySelector('.mp-info-second').innerHTML = dateToString(this.settings.headerFormat, dates, this.i18n);
      this.picker.querySelector('.mp-picker-site-this').innerHTML = dateToString(this.settings.sitePickerFormat, dates, this.i18n);

      if (this.picker.querySelector("[class*=\"mp-picker-click\"].active") != null) {
        this.picker.querySelector("[class*=\"mp-picker-click\"].active").classList.remove('active');
      }

      var boolean = undefined;
      if (this.settings.type == 'date') {
        boolean = new Date().getYear() == dates.getYear() && new Date().getMonth() == dates.getMonth();
        this.picker.querySelector(".mp-picker-click-" + dates.getDate() * 1).classList.add('active');
      } else if (this.settings.type == 'month') {
        boolean = new Date().getYear() == dates.getYear();
        this.picker.querySelector(".mp-picker-click-" + dates.getMonth() * 1).classList.add('active');
      }

      if (boolean) {
        this.picker.querySelector(".mp-picker-click-" + new Date().getDate() * 1).classList.add('today');
      } else if (this.picker.querySelector(".mp-picker-click-" + new Date().getMonth() * 1 + ".today") != null) {
        this.picker.querySelector(".mp-picker-click-" + new Date().getMonth() * 1 + ".today").classList.remove('today');
      }

      //set to 0:00:00
      dates.setMilliseconds(0);
      dates.setSeconds(0);
      dates.setMinutes(0);
      dates.setHours(0);

      this.date = dates;

      //write into field
      var output = dateToString(this.settings.outputFormat, dates, this.i18n);

      if (this.element.tagName == 'INPUT' && this.element.getAttribute('type') == 'text' || this.element.tagName == 'DIV') {
        this.element.value = output;
      }

      if (this.settings.outputElement.tagName == 'SPAN' || this.settings.outputElement.tagName == 'P' || this.settings.outputElement.tagName == 'A') {
        this.settings.outputElement.innerHTML = output;
      }

      if (value == 'close') {
        this.close();
        this.callbackOnNewDate();
      }
    }
  }, {
    key: "callbackOnLoad",
    value: function callbackOnLoad() {
      if (typeof this.settings.onLoad == 'function') {
        this.settings.onLoad.call(this, this.date);
      }
    }
  }, {
    key: "callbackOnOpen",
    value: function callbackOnOpen() {
      if (typeof this.settings.onOpen == 'function') {
        this.settings.onOpen.call(this, this.date);
      }
    }
  }, {
    key: "callbackOnNewDate",
    value: function callbackOnNewDate() {
      if (typeof this.settings.onNewDate == 'function') {
        this.settings.onNewDate.call(this, this.date);
      }
    }
  }]);

  return MaterialDatepicker;
})();
