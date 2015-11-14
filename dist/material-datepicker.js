'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var MaterialDatepicker = (function () {
  function MaterialDatepicker(element, settings) {
    _classCallCheck(this, MaterialDatepicker);

    var defaults = {
      type: "date",

      lang: 'en',
      orientation: 'landscape',
      color: 'rgba(0, 150, 136, 1)',
      theme: 'light',
      zIndex: '100',
      position: null,
      buttons: true,
      openOn: 'click',
      closeAfterClick: true,

      date: new Date(),
      weekBegin: 'sunday',
      outputFormat: {
        date: "YYYY/MM/DD",
        month: "MMMM YYYY"
      },
      topHeaderFormat: "YYYY",
      headerFormat: {
        date: "ddd, MMM D",
        month: "MMM"
      },
      sitePickerFormat: {
        date: "MMMM YYYY",
        month: "YYYY"
      },

      onLoad: null,
      onOpen: null,
      onNewDate: null,
      outputElement: ''
    };

    this.settings = Object.assign(defaults, settings);
    moment.locale(this.settings.lang);

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

    this.element = element;
    if (typeof this.element == 'string') {
      this.element = document.querySelector('' + element);
      if (this.element == null) {
        console.warn('Material Datepicker could not initialize because, Object: "' + element + '" is not defined');
        return;
      }
    }

    var elementTag = this.element.tagName;
    var elementType = this.element.getAttribute('type');
    var elementVal = this.element.value || this.element.innerHTML;
    var newDate = moment(elementVal, this.settings.outputFormat).toDate();

    this.date = newDate;

    if (typeof this.settings.outputElement == 'string' && this.settings.outputElement != '') {
      this.settings.outputElement = document.querySelector('' + this.settings.outputElement);
    }

    this._define();
  }

  _createClass(MaterialDatepicker, [{
    key: '_define',
    value: function _define() {
      var _this = this;

      this._createElement();

      if (this.settings.openOn == 'direct') {
        this.open(this.settings.openOn);
        return;
      }

      this.element.addEventListener(this.settings.openOn, function () {
        _this.open(_this.settings.openOn);
      });

      if (this.settings.openOn != 'direct') {
        document.addEventListener('keyup', function (e) {
          if (e.keyCode == 9) {
            // TAB watch
            if (document.activeElement == _this.element) {
              _this.open();
            } else {
              _this.close();
            }
          } else {
            var elementVal = _this.element.value;
            var newDate = moment(elementVal, _this.settings.outputFormat).toDate();

            _this.newDate(newDate);
            //          this.draw();
          }
        });

        document.addEventListener('mouseup', function (e, f) {
          var isPicker = false;
          var event = e;
          for (var i = 0; i < e.path.length; i++) {
            if (e.path[i] == _this.picker) {
              isPicker = true;
              break;
            }
          }
          if (isPicker == false) {
            _this.close();
          }
        });
      }
    }
  }, {
    key: '_createElement',
    value: function _createElement(time) {
      var _this2 = this;

      var randomNumber = new Date().getTime() + Math.round(Math.random() + 2);

      this.picker = document.createElement('div');
      this.picker.setAttribute('class', 'mp-' + this.settings.type + 'picker mp-picker');
      this.picker.setAttribute('id', 'mp-' + randomNumber);
      this.picker.setAttribute('data-theme', this.settings.theme);

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
      var newStyle = '\n      #mp-' + randomNumber + '.mp-picker:not([data-theme="dark"]) .mp-picker-info {\n        background-color: ' + this.settings.color + ';\n      }\n\n      #mp-' + randomNumber + '.mp-picker .mp-picker-choose [class*="mp-picker-click"].active,\n      #mp-' + randomNumber + '.mp-picker[data-theme="dark"] .mp-picker-choose [class*="mp-picker-click"].active {\n        background-color: ' + this.settings.color + ';\n      }\n\n      #mp-' + randomNumber + '.mp-picker .mp-picker-choose [class*="mp-picker-click"].today:not(.active),\n      #mp-' + randomNumber + '.mp-picker[data-theme="dark"] .mp-picker-choose .mp-picker-choose [class*="mp-picker-click"].today:not(.active) {\n        color: ' + this.settings.color + ';\n      }\n    ';

      var containerStyle = document.createElement('style');
      containerStyle.type = 'text/css';
      containerStyle.appendChild(document.createTextNode(newStyle));
      document.querySelector('head').appendChild(containerStyle);

      this.draw();
      this.callbackOnLoad();
    }
  }, {
    key: 'draw',
    value: function draw() {
      var _this3 = this;

      var containerPickerChoose = this.picker.querySelector('.mp-picker-choose');
      containerPickerChoose.innerHTML = '';

      // write in header area
      this.picker.querySelector('.mp-info-first').innerHTML = moment(this.date).format(this.settings.topHeaderFormat);
      this.picker.querySelector('.mp-info-second').innerHTML = moment(this.date).format(this.settings.headerFormat);
      this.picker.querySelector('.mp-picker-site-this').innerHTML = moment(this.date).format(this.settings.sitePickerFormat);

      if (this.picker.querySelector('[class*="mp-picker-click"].active') != null) {
        this.picker.querySelector('[class*="mp-picker-click"].active').classList.remove('active');
      }

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
          containerPickerChooseWeekDay.setAttribute('class', 'mp-picker-header mp-picker-header-day-' + i);
          containerPickerChooseWeekDay.innerHTML = moment.weekdaysMin()[weekDay].substr(0, 1);
          containerPickerChoose.appendChild(containerPickerChooseWeekDay);
        }

        //all days
        var thisMonthLenght = this.date.getTime();
        thisMonthLenght = new Date(thisMonthLenght);
        thisMonthLenght.setDate(1);
        thisMonthLenght.setMonth(thisMonthLenght.getMonth() + 1);
        thisMonthLenght.setDate(0);
        var firstWeekDay = thisMonthLenght;
        thisMonthLenght = thisMonthLenght.getDate();
        firstWeekDay.setDate(1);
        firstWeekDay = firstWeekDay.getDay();

        var _loop = function (i, _num) {
          var containerPickerChooseDay = document.createElement('a');
          containerPickerChooseDay.setAttribute('class', 'mp-picker-choose-day');

          var boolean = i >= firstWeekDay;
          if (_this3.settings.weekBegin == 'monday') {
            boolean = i + 1 >= firstWeekDay;
          }

          if (boolean && _num <= thisMonthLenght) {
            containerPickerChooseDay.innerHTML = _num;
            containerPickerChooseDay.classList.add('mp-picker-click-' + _num);
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

        //set Today
        if (new Date().getYear() == this.date.getYear() && new Date().getMonth() == this.date.getMonth()) {
          this.picker.querySelector('.mp-picker-click-' + new Date().getDate() * 1).classList.add('today');
        } else if (this.picker.querySelector('.mp-picker-click-' + new Date().getMonth() * 1 + '.today') != null) {
          this.picker.querySelector('.mp-picker-click-' + new Date().getDate() * 1 + '.today').classList.remove('today');
        }

        this.picker.querySelector('.mp-picker-click-' + this.date.getDate() * 1).classList.add('active');
      } else if (this.settings.type == 'month') {
        var months = 12;

        var _loop2 = function (i) {
          var containerPickerChooseMonth = document.createElement('a');
          containerPickerChooseMonth.setAttribute('class', 'mp-picker-click-' + i + ' mp-picker-choose-month');
          containerPickerChooseMonth.innerHTML = moment.monthsShort('-MMM-')[i].replace('.', '');
          containerPickerChoose.appendChild(containerPickerChooseMonth);

          containerPickerChooseMonth.addEventListener('click', function () {
            var month = i;
            var nextDate = _this3.date;
            nextDate.setMonth(month);

            if (_this3.settings.openOn == 'direct') {
              _this3.newDate(nextDate);
            } else {
              _this3.newDate(nextDate, 'close');
            }
          });
        };

        for (var i = 0; i < months; i++) {
          _loop2(i);
        }

        // set today
        if (new Date().getYear() == this.date.getYear()) {
          this.picker.querySelector('.mp-picker-click-' + new Date().getMonth() * 1).classList.add('today');
        } else if (this.picker.querySelector('.mp-picker-click-' + new Date().getMonth() * 1 + '.today') != null) {
          this.picker.querySelector('.mp-picker-click-' + new Date().getMonth() * 1 + '.today').classList.remove('today');
        }

        this.picker.querySelector('.mp-picker-click-' + this.date.getMonth() * 1).classList.add('active');
      }
    }
  }, {
    key: '_siteChange',
    value: function _siteChange(direction) {
      var _this4 = this;

      var directions = { '-1': 'left', '1': 'right' };
      var directionsNot = { '-1': 'right', '1': 'left' };
      if (this.settings.type == 'date') {
        this.date.setMonth(this.date.getMonth() + direction);
      } else if (this.settings.type == 'month') {
        this.date.setYear(this.date.getYear() + 1900 + direction);
      }

      this.picker.querySelectorAll('.mp-animate')[0].classList.add('mp-animate-' + directions[direction]);
      this.picker.querySelectorAll('.mp-animate')[1].classList.add('mp-animate-' + directions[direction]);

      setTimeout(function () {
        _this4.picker.querySelectorAll('.mp-animate')[0].classList.remove('mp-animate-' + directions[direction]);
        _this4.picker.querySelectorAll('.mp-animate')[0].classList.add('mp-animate-' + directionsNot[direction]);
        _this4.picker.querySelectorAll('.mp-animate')[1].classList.remove('mp-animate-' + directions[direction]);
        _this4.picker.querySelectorAll('.mp-animate')[1].classList.add('mp-animate-' + directionsNot[direction]);

        _this4.draw();

        setTimeout(function () {
          _this4.picker.querySelectorAll('.mp-animate')[0].classList.remove('mp-animate-' + directionsNot[direction]);
          _this4.picker.querySelectorAll('.mp-animate')[1].classList.remove('mp-animate-' + directionsNot[direction]);

          _this4.newDate(_this4.date);
        }, 200);
      }, 200);
    }
  }, {
    key: 'open',
    value: function open(how) {
      if (how == 'direct' && this.element.tagName == 'DIV') {
        this.element.appendChild(this.picker);
        this.newDate(null);
        this.callbackOnOpen();
        return;
      }

      var elementTag = this.element.tagName;
      var elementType = this.element.getAttribute('type');
      var elementVal = this.element.value;

      if ((elementTag == 'INPUT' && (elementType == 'date' || elementType == 'number' || elementType == 'text') || elementTag == 'PAPER-INPUT') && elementVal != '') {
        this.date = moment(elementVal, this.settings.outputFormat).toDate();
      }

      document.body.appendChild(this.picker);
      var elementPosition = this.element.getBoundingClientRect();
      var top = elementPosition.top + elementPosition.height + 5;
      var left = elementPosition.left;
      var body = document.body.getBoundingClientRect();
      var picker = this.picker.getBoundingClientRect();

      if (left + picker.width + 50 > body.width) {
        left = left - picker.width - 5;
      }

      if (top + picker.height + 20 > body.height) {
        top = top - picker.height - elementPosition.height - 5;
      }

      this.picker.style.top = top;
      this.picker.style.left = left;
      this.picker.style.zIndex = this.settings.zIndex;
      if (this.settings.position != null) {
        this.picker.style.position = this.settings.position;
      }

      this.newDate(null);
      this.callbackOnOpen();
    }
  }, {
    key: 'close',
    value: function close() {
      this.picker && this.picker.parentNode && this.picker.parentNode.removeChild(this.picker);
    }
  }, {
    key: '_writeInElement',
    value: function _writeInElement() {
      var output = moment(this.date).format(this.settings.outputFormat);
      if (this.element.tagName == 'INPUT' && this.element.getAttribute('type') == 'text' || this.element.tagName == 'DIV' || this.element.tagName == 'PAPER-INPUT') {
        this.element.value = output;
      }

      if (this.settings.outputElement.tagName == 'SPAN' || this.settings.outputElement.tagName == 'P' || this.settings.outputElement.tagName == 'A') {
        this.settings.outputElement.innerHTML = output;
      }
    }
  }, {
    key: 'newDate',
    value: function newDate(date, value) {
      var dates = date || this.date;

      //set to 0:00:00
      dates.setMilliseconds(0);
      dates.setSeconds(0);
      dates.setMinutes(0);
      dates.setHours(0);

      this.date = dates;

      this.draw();
      this._writeInElement();

      if (value == 'close') {
        this.close();
        this.callbackOnNewDate();
      }
    }
  }, {
    key: 'callbackOnLoad',
    value: function callbackOnLoad() {
      if (typeof this.settings.onLoad == 'function') {
        this.settings.onLoad.call(this, this.date);
      }
    }
  }, {
    key: 'callbackOnOpen',
    value: function callbackOnOpen() {
      if (typeof this.settings.onOpen == 'function') {
        this.settings.onOpen.call(this, this.date);
      }
    }
  }, {
    key: 'callbackOnNewDate',
    value: function callbackOnNewDate() {
      if (typeof this.settings.onNewDate == 'function') {
        this.settings.onNewDate.call(this, this.date);
      }
    }
  }]);

  return MaterialDatepicker;
})();
