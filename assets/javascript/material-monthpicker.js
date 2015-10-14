/* Generated by Babel */
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var MaterialMonthpicker = (function () {
  function MaterialMonthpicker(element, settings) {
    var _this = this;

    _classCallCheck(this, MaterialMonthpicker);

    var defaults = {
      orientation: 'landscape', // landscape, portait
      primaryColor: 'rgba(0, 150, 136, 1)', //css color value
      theme: 'light', // light, dark
      date: new Date(),
      lang: 'en', // en, de, it, ..
      pickerFormat: 'mmm', // mmm, mmmm
      buttons: true };
    // boolean
    this.settings = Object.assign(defaults, settings);
    this.date = this.settings.date;

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", '../src/translations/' + this.settings.lang + '.json', true);
    var i18nn;
    xmlhttp.addEventListener("readystatechange", function () {
      if (xmlhttp.readyState == 4) {
        _this.i18n = JSON.parse(xmlhttp.responseText);
        loaded();
      }
    });
    xmlhttp.send();

    var loaded = function loaded() {
      if (typeof element == 'string') {
        _this.element = document.querySelector('#' + element);
      } else {
        _this.element = element;
      }
      _this.define();
    };
  }

  _createClass(MaterialMonthpicker, [{
    key: 'define',
    value: function define() {
      var _this2 = this;

      this.createElement();

      this.element.addEventListener('click', function () {
        _this2.open();
      });
    }
  }, {
    key: 'createElement',
    value: function createElement() {
      var _this3 = this;

      this.position = this.element.getBoundingClientRect();

      this.picker = document.createElement('div');
      this.picker.setAttribute('class', 'mp-monthpicker mp-picker');
      this.picker.setAttribute('data-theme', this.settings.theme);

      var containerInfo = document.createElement('div');
      containerInfo.setAttribute('class', 'mp-picker-info');
      this.picker.appendChild(containerInfo);

      var containerPicker = document.createElement('div');
      containerPicker.setAttribute('class', 'mp-picker-picker');
      this.picker.appendChild(containerPicker);

      //Info
      var containerInfoYear = document.createElement('span');
      containerInfoYear.setAttribute('class', 'mp-info-year mp-info-first');
      containerInfo.appendChild(containerInfoYear);

      var containerInfoMonth = document.createElement('span');
      containerInfoMonth.setAttribute('class', 'mp-info-month mp-info-second');
      containerInfo.appendChild(containerInfoMonth);

      //picker
      var containerPickerYear = document.createElement('div');
      containerPickerYear.setAttribute('class', 'mp-picker-year');
      containerPicker.appendChild(containerPickerYear);

      var containerPickerYearBefore = document.createElement('a');
      containerPickerYearBefore.setAttribute('class', 'mp-picker-year-before mp-picker-year-button');
      containerPickerYear.appendChild(containerPickerYearBefore);
      containerPickerYearBefore.addEventListener('click', function () {
        _this3.yearChange(-1);
      });

      var containerPickerYearThis = document.createElement('span');
      containerPickerYearThis.setAttribute('class', 'mp-picker-year-this mp-animate');
      containerPickerYear.appendChild(containerPickerYearThis);

      var containerPickerYearNext = document.createElement('a');
      containerPickerYearNext.setAttribute('class', 'mp-picker-year-next mp-picker-year-button');
      containerPickerYear.appendChild(containerPickerYearNext);
      containerPickerYearNext.addEventListener('click', function () {
        _this3.yearChange(+1);
      });

      var containerPickerChoose = document.createElement('div');
      containerPickerChoose.setAttribute('class', 'mp-picker-choose mp-animate');
      containerPicker.appendChild(containerPickerChoose);

      var _loop = function (i) {
        var containerPickerChooseMonth = document.createElement('a');
        containerPickerChooseMonth.setAttribute('class', 'mp-picker-choose-month-' + i);
        containerPickerChooseMonth.innerHTML = _this3.i18n[_this3.settings.pickerFormat][i];
        containerPickerChoose.appendChild(containerPickerChooseMonth);

        containerPickerChooseMonth.addEventListener('click', function () {
          var month = i;
          var nextDate = _this3.date;
          nextDate.setMonth(month);
          _this3.newDate(nextDate);
        });
      };

      for (var i = 0; i < 12; i++) {
        _loop(i);
      }
    }
  }, {
    key: 'yearChange',
    value: function yearChange(direction) {
      var _this4 = this;

      var directions = { '-1': 'left', '1': 'right' };
      var directionsNot = { '-1': 'right', '1': 'left' };
      this.date.setYear(this.date.getYear() + 1900 + direction);

      this.picker.querySelectorAll('.mp-animate')[0].classList.add('mp-animate-' + directions[direction]);
      this.picker.querySelectorAll('.mp-animate')[1].classList.add('mp-animate-' + directions[direction]);

      setTimeout(function () {
        _this4.picker.querySelectorAll('.mp-animate')[0].classList.remove('mp-animate-' + directions[direction]);
        _this4.picker.querySelectorAll('.mp-animate')[0].classList.add('mp-animate-' + directionsNot[direction]);
        _this4.picker.querySelectorAll('.mp-animate')[1].classList.remove('mp-animate-' + directions[direction]);
        _this4.picker.querySelectorAll('.mp-animate')[1].classList.add('mp-animate-' + directionsNot[direction]);

        setTimeout(function () {
          _this4.picker.querySelectorAll('.mp-animate')[0].classList.remove('mp-animate-' + directionsNot[direction]);
          _this4.picker.querySelectorAll('.mp-animate')[1].classList.remove('mp-animate-' + directionsNot[direction]);

          _this4.newDate(_this4.date);
        }, 200);
      }, 200);
    }
  }, {
    key: 'open',
    value: function open() {
      document.body.appendChild(this.picker);
      this.picker.style.top = this.position.top;
      this.picker.style.left = this.position.left;

      this.newDate();
    }
  }, {
    key: 'close',
    value: function close() {
      this.picker && this.picker.parentNode && this.picker.parentNode.removeChild(this.picker);
    }
  }, {
    key: 'newDate',
    value: function newDate(date) {
      var dates = date || this.settings.date;

      this.picker.querySelector('.mp-info-year').innerHTML = dates.getYear() + 1900;
      this.picker.querySelector('.mp-info-month').innerHTML = this.i18n.mmm[dates.getMonth()];
      this.picker.querySelector('.mp-picker-year-this').innerHTML = dates.getYear() + 1900;
      if (this.picker.querySelector('[class*="mp-picker-choose-month"].active') != null) {
        this.picker.querySelector('[class*="mp-picker-choose-month"].active').classList.remove('active');
      }
      this.picker.querySelector('.mp-picker-choose-month-' + dates.getMonth() * 1).classList.add('active');
      if (new Date().getYear() == dates.getYear()) {
        this.picker.querySelector('.mp-picker-choose-month-' + new Date().getMonth() * 1).classList.add('today');
      } else if (this.picker.querySelector('.mp-picker-choose-month-' + new Date().getMonth() * 1 + '.today') != null) {
        this.picker.querySelector('.mp-picker-choose-month-' + new Date().getMonth() * 1 + '.today').classList.remove('today');
      }

      this.date = dates;
    }
  }]);

  return MaterialMonthpicker;
})();