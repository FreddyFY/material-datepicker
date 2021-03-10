"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MaterialDatepicker =
/*#__PURE__*/
function () {
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
      openOn: 'click',
      closeAfterClick: true,
      date: new Date(),
      weekBegin: 'sunday',
      outputFormat: {
        date: "YYYY/MM/DD",
        month: "MMMM YYYY"
      },
      inputFormat: {
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
      onChange: null,
      outputElement: ''
    };
    this.settings = Object.assign(defaults, settings);
    moment.locale(this.settings.lang);

    if (_typeof(this.settings.topHeaderFormat) == 'object') {
      this.settings.topHeaderFormat = this.settings.topHeaderFormat[this.settings.type];
    }

    if (_typeof(this.settings.headerFormat) == 'object') {
      this.settings.headerFormat = this.settings.headerFormat[this.settings.type];
    }

    if (_typeof(this.settings.outputFormat) == 'object') {
      this.settings.outputFormat = this.settings.outputFormat[this.settings.type];
    }

    if (_typeof(this.settings.inputFormat) == 'object') {
      this.settings.inputFormat = this.settings.outputFormat;
    }

    if (_typeof(this.settings.sitePickerFormat) == 'object') {
      this.settings.sitePickerFormat = this.settings.sitePickerFormat[this.settings.type];
    }

    this.element = element;

    if (typeof this.element == 'string') {
      this.element = document.querySelector("".concat(element));

      if (this.element == null) {
        console.warn("Material Datepicker could not initialize because, Object: \"".concat(element, "\" is not defined"));
        return;
      }
    }

    var elementTag = this.element.tagName;
    var elementType = this.element.getAttribute('type');
    var elementVal = "";

    if (elementTag == "INPUT") {
      elementVal = this.element.value;
    } else if (elementTag == "DIV" || elementTag == "A" || elementTag == "SPAN" || elementTag == "P") {
      if (this.element.children == 0) {
        elementVal = this.element.innerHTML;
      }
    } else if (elementTag == "PAPER-INPUT") {
      elementVal = this.element.value;
    }

    var valueDate = moment(elementVal, this.settings.inputFormat);
    this.date = this.settings.date;

    if (valueDate.isValid()) {
      this.date = valueDate.toDate();
    }

    if (typeof this.settings.outputElement == 'string' && this.settings.outputElement != '') {
      this.settings.outputElement = document.querySelector("".concat(this.settings.outputElement));
    }

    this._writeInElement();

    this._define();
  }

  _createClass(MaterialDatepicker, [{
    key: "_define",
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
          }
        });
        document.addEventListener('keyup', function (e) {
          var elementVal = _this.element.value;
          var newDate = moment(elementVal, _this.settings.outputFormat).toDate();

          _this.newDate(newDate, '', false);
        });
        document.addEventListener('mouseup', function (event) {
          var isPicker = false;

          var ePath = _this._getPath(event);

          if (ePath.indexOf(_this.picker) == -1) {
            _this.close();
          }
        });
      }
    }
  }, {
    key: "_createElement",
    value: function _createElement(time) {
      var _this2 = this;

      var randomNumber = new Date().getTime() + Math.round(Math.random() + 2);
      this.picker = document.createElement('div');
      this.picker.setAttribute('class', "mp-".concat(this.settings.type, "picker mp-picker"));
      this.picker.setAttribute('id', "mp-".concat(randomNumber));
      this.picker.setAttribute('data-theme', this.settings.theme);
      this.picker.setAttribute('data-orientation', this.settings.orientation);
      var containerInfo = document.createElement('div');
      containerInfo.setAttribute('class', 'mp-picker-info');
      this.picker.appendChild(containerInfo);
      var containerPicker = document.createElement('div');
      containerPicker.setAttribute('class', 'mp-picker-picker');
      this.picker.appendChild(containerPicker); //Info

      var containerInfoYear = document.createElement('span');
      containerInfoYear.setAttribute('class', 'mp-info-first');
      containerInfo.appendChild(containerInfoYear);
      var containerInfoMonth = document.createElement('span');
      containerInfoMonth.setAttribute('class', 'mp-info-second');
      containerInfo.appendChild(containerInfoMonth); //picker

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
      containerPicker.appendChild(containerPickerChoose); //styles

      var newStyle = "\n      #mp-".concat(randomNumber, ".mp-picker:not([data-theme=\"dark\"]) .mp-picker-info {\n        background-color: ").concat(this.settings.color, ";\n      }\n\n      #mp-").concat(randomNumber, ".mp-picker .mp-picker-choose [class*=\"mp-picker-click\"].active,\n      #mp-").concat(randomNumber, ".mp-picker[data-theme=\"dark\"] .mp-picker-choose [class*=\"mp-picker-click\"].active {\n        background-color: ").concat(this.settings.color, ";\n      }\n\n      #mp-").concat(randomNumber, ".mp-picker .mp-picker-choose [class*=\"mp-picker-click\"].today:not(.active),\n      #mp-").concat(randomNumber, ".mp-picker[data-theme=\"dark\"] .mp-picker-choose .mp-picker-choose [class*=\"mp-picker-click\"].today:not(.active) {\n        color: ").concat(this.settings.color, ";\n      }\n    ");
      var containerStyle = document.createElement('style');
      containerStyle.type = 'text/css';
      containerStyle.appendChild(document.createTextNode(newStyle));
      document.querySelector('head').appendChild(containerStyle);
      this.draw();
      this.callbackOnLoad();
    }
  }, {
    key: "draw",
    value: function draw() {
      var _this3 = this;

      var containerPickerChoose = this.picker.querySelector('.mp-picker-choose');
      containerPickerChoose.innerHTML = ''; // write in header area

      this.picker.querySelector('.mp-info-first').innerHTML = moment(this.date).format(this.settings.topHeaderFormat);
      this.picker.querySelector('.mp-info-second').innerHTML = moment(this.date).format(this.settings.headerFormat);
      this.picker.querySelector('.mp-picker-site-this').innerHTML = moment(this.date).format(this.settings.sitePickerFormat);

      if (this.picker.querySelector("[class*=\"mp-picker-click\"].active") != null) {
        this.picker.querySelector("[class*=\"mp-picker-click\"].active").classList.remove('active');
      }

      if (this.settings.type == 'date') {
        var maxMonthLength = 42;
        var week = 7; //weekday

        for (var i = 0; i < week; i++) {
          var weekDay = i;

          if (this.settings.weekBegin == 'monday') {
            weekDay = weekDay + 1;

            if (weekDay >= week) {
              weekDay = 0;
            }
          }

          var containerPickerChooseWeekDay = document.createElement('span');
          containerPickerChooseWeekDay.setAttribute('class', "mp-picker-header mp-picker-header-day-".concat(i));
          containerPickerChooseWeekDay.innerHTML = moment.weekdaysMin()[weekDay].substr(0, 1);
          containerPickerChoose.appendChild(containerPickerChooseWeekDay);
        } //all days


        var thisMonthLength = this.date.getTime();
        thisMonthLength = new Date(thisMonthLength);
        thisMonthLength.setDate(1);
        thisMonthLength.setMonth(thisMonthLength.getMonth() + 1);
        thisMonthLength.setDate(0);
        var firstWeekDay = thisMonthLength;
        thisMonthLength = thisMonthLength.getDate();
        firstWeekDay.setDate(1);
        firstWeekDay = firstWeekDay.getDay();
        firstWeekDay = firstWeekDay === 0 ? 7 : firstWeekDay;

        var _loop = function _loop(_num, _i) {
          if (_num > thisMonthLength) {
            num = _num;
            return "break";
          }

          var date = moment(new Date(_this3.date.toISOString()).setDate(_num)).format('D');
          var containerPickerChooseDay = document.createElement('a');
          containerPickerChooseDay.setAttribute('class', "mp-picker-choose-day");

          var _boolean = _i >= firstWeekDay;

          if (_this3.settings.weekBegin === 'monday') {
            _boolean = _i + 1 >= firstWeekDay;
          }

          if (_boolean && _num <= thisMonthLength) {
            containerPickerChooseDay.innerHTML = date;
            containerPickerChooseDay.classList.add("mp-picker-click-".concat(date));
            _num++;
          } else {
            containerPickerChooseDay.innerHTML = ' ';
            containerPickerChooseDay.classList.add('mp-empty');
          }

          containerPickerChoose.appendChild(containerPickerChooseDay);
          containerPickerChooseDay.addEventListener('click', function (event) {
            if (_this3._getPath(event)[0].classList.contains('mp-empty')) {
              num = _num;
              return;
            }

            var nextDate = moment(_this3.date).date(date * 1).toDate();

            if (_this3.settings.openOn == 'direct' || !_this3.settings.closeAfterClick) {
              _this3.newDate(nextDate);
            } else {
              _this3.newDate(nextDate, 'close');
            }
          });
          num = _num;
        };

        for (var _i = 0, num = 1; _i < maxMonthLength; _i++) {
          var _ret = _loop(num, _i);

          if (_ret === "break") break;
        }

        var dayOfMonth = moment(this.date); //set Today

        if (new Date().getYear() == this.date.getYear() && new Date().getMonth() == this.date.getMonth()) {
          this.picker.querySelector(".mp-picker-click-".concat(moment().format('D'))).classList.add('today');
        } else if (this.picker.querySelector(".mp-picker-click-".concat(new Date().getMonth() * 1, ".today")) != null) {
          this.picker.querySelector(".mp-picker-click-".concat(moment().format('D'), ".today")).classList.remove('today');
        }

        this.picker.querySelector(".mp-picker-click-".concat(moment(this.date).format('D'))).classList.add('active');
      } else if (this.settings.type == 'month') {
        var months = 12;

        var _loop2 = function _loop2(_i2) {
          var containerPickerChooseMonth = document.createElement('a');
          containerPickerChooseMonth.setAttribute('class', "mp-picker-click-".concat(_i2, " mp-picker-choose-month"));
          containerPickerChooseMonth.innerHTML = moment.monthsShort('-MMM-')[_i2].replace('.', '');
          containerPickerChoose.appendChild(containerPickerChooseMonth);
          containerPickerChooseMonth.addEventListener('click', function () {
            var month = _i2;
            var nextDate = _this3.date;
            nextDate.setMonth(month);

            if (_this3.settings.openOn == 'direct' || !_this3.settings.closeAfterClick) {
              _this3.newDate(nextDate);
            } else {
              _this3.newDate(nextDate, 'close');
            }
          });
        };

        for (var _i2 = 0; _i2 < months; _i2++) {
          _loop2(_i2);
        } // set today


        if (new Date().getYear() == this.date.getYear()) {
          this.picker.querySelector(".mp-picker-click-".concat(new Date().getMonth() * 1)).classList.add('today');
        } else if (this.picker.querySelector(".mp-picker-click-".concat(new Date().getMonth() * 1, ".today")) != null) {
          this.picker.querySelector(".mp-picker-click-".concat(new Date().getMonth() * 1, ".today")).classList.remove('today');
        }

        this.picker.querySelector(".mp-picker-click-".concat(this.date.getMonth() * 1)).classList.add('active');
      }
    }
  }, {
    key: "_siteChange",
    value: function _siteChange(direction) {
      var _this4 = this;

      var directions = {
        '-1': 'left',
        '1': 'right'
      };
      var directionsNot = {
        '-1': 'right',
        '1': 'left'
      };

      if (this.settings.type == 'date') {
        this.date = moment(this.date).add(direction, 'month').toDate();
      } else if (this.settings.type == 'month') {
        this.date = moment(this.date).add(direction, 'year').toDate();
      }

      this.picker.querySelectorAll(".mp-animate")[0].classList.add("mp-animate-".concat(directionsNot[direction]));
      this.picker.querySelectorAll(".mp-animate")[1].classList.add("mp-animate-".concat(directionsNot[direction]));
      setTimeout(function () {
        _this4.picker.querySelectorAll(".mp-animate")[0].classList.remove("mp-animate-".concat(directionsNot[direction]));

        _this4.picker.querySelectorAll(".mp-animate")[0].classList.add("mp-animate-".concat(directions[direction]));

        _this4.picker.querySelectorAll(".mp-animate")[1].classList.remove("mp-animate-".concat(directionsNot[direction]));

        _this4.picker.querySelectorAll(".mp-animate")[1].classList.add("mp-animate-".concat(directions[direction]));

        _this4.draw();

        setTimeout(function () {
          _this4.picker.querySelectorAll(".mp-animate")[0].classList.remove("mp-animate-".concat(directions[direction]));

          _this4.picker.querySelectorAll(".mp-animate")[1].classList.remove("mp-animate-".concat(directions[direction]));

          _this4.newDate(_this4.date);
        }, 200);
      }, 200);
    }
  }, {
    key: "open",
    value: function open(how) {
      if (how == 'direct' && this.element.tagName == 'DIV') {
        this.element.appendChild(this.picker);
      } else {
        var elementTag = this.element.tagName;
        var elementType = this.element.getAttribute('type');
        var elementVal = this.element.value;

        if ((elementTag == 'INPUT' && (elementType == 'date' || elementType == 'number' || elementType == 'text') || elementTag == 'PAPER-INPUT') && elementVal != '') {
          this.date = moment(elementVal, this.settings.outputFormat).toDate();
        }

        document.body.appendChild(this.picker);
        var pickerOffset = 10;

        var elementPosition = this._findTotalOffset(this.element);

        var top = elementPosition.top + elementPosition.height + pickerOffset;
        var left = elementPosition.left;
        var bodyWidth = bodyWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        var bodyHeight = bodyHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

        var picker = this._findTotalOffset(this.picker);

        if (left + picker.width + 50 > bodyWidth) {
          left = left - picker.width - pickerOffset;
        }

        if (top + picker.height + 20 > bodyHeight) {
          top = top - picker.height - elementPosition.height - pickerOffset;
        }

        this.picker.style.top = "".concat(top, "px");
        this.picker.style.left = "".concat(left, "px");
      }

      this.picker.style.zIndex = this.settings.zIndex;

      if (this.settings.position != null) {
        this.picker.style.position = this.settings.position;
      }

      this.newDate(null);
      this.callbackOnOpen();
    }
  }, {
    key: "close",
    value: function close() {
      this.picker && this.picker.parentNode && this.picker.parentNode.removeChild(this.picker);
    }
  }, {
    key: "_writeInElement",
    value: function _writeInElement() {
      var output = moment(this.date).format(this.settings.outputFormat);

      if (this.element.tagName == 'INPUT' && this.element.getAttribute('type') == 'text' || this.element.tagName == 'DIV' || this.element.tagName == 'PAPER-INPUT') {
        this.element.value = output;
      }

      if (this.settings.outputElement && this.settings.outputElement.tagName != 'INPUT') {
        this.settings.outputElement.innerHTML = output;
      }
    }
  }, {
    key: "newDate",
    value: function newDate(date, value) {
      var rewrite = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var dates = date || this.date;

      if (isNaN(dates.valueOf())) {
        dates = this.settings.date;
      } //set to 0:00:00


      dates.setMilliseconds(0);
      dates.setSeconds(0);
      dates.setMinutes(0);
      dates.setHours(0);
      this.date = dates;
      this.draw();

      if (rewrite) {
        this._writeInElement();
      }

      this.callbackOnChange();

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
  }, {
    key: "callbackOnChange",
    value: function callbackOnChange() {
      if (typeof this.settings.onChange == 'function') {
        this.settings.onChange.call(this, this.date);
      }
    }
  }, {
    key: "_findTotalOffset",
    value: function _findTotalOffset(obj) {
      var ol, ot;
      ol = ot = 0;
      var offset = obj.getBoundingClientRect();

      if (obj.offsetParent) {
        do {
          ol += obj.offsetLeft;
          ot += obj.offsetTop;
        } while (obj = obj.offsetParent);
      }

      return {
        left: ol,
        top: ot,
        height: offset.height,
        width: offset.width
      };
    }
  }, {
    key: "_getPath",
    value: function _getPath(event) {
      var path = [];
      var currentElem = event.target;

      while (currentElem) {
        path.push(currentElem);
        currentElem = currentElem.parentElement;
      }

      if (path.indexOf(window) === -1 && path.indexOf(document) === -1) {
        path.push(document);
      }

      if (path.indexOf(window) === -1) {
        path.push(window);
      }

      return path;
    }
  }]);

  return MaterialDatepicker;
}();
