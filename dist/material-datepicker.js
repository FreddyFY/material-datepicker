"use strict";

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}

var _createClass = function() {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
            "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function(Constructor, protoProps, staticProps) {
        return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
        Constructor;
    };
}(), MaterialDatepicker = function() {
    function MaterialDatepicker(element, settings) {
        _classCallCheck(this, MaterialDatepicker);
        var defaults = {
            type: "date",
            lang: "en",
            orientation: "landscape",
            color: "rgba(0, 150, 136, 1)",
            theme: "light",
            zIndex: "100",
            buttons: !0,
            openOn: "click",
            closeAfterClick: !0,
            date: new Date(),
            weekBegin: "sunday",
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
            onLoad: "",
            onOpen: "",
            onNewDate: "",
            outputElement: ""
        };
        if (this.settings = Object.assign(defaults, settings), moment.locale(this.settings.lang), 
        "object" == typeof this.settings.topHeaderFormat && (this.settings.topHeaderFormat = this.settings.topHeaderFormat[this.settings.type]), 
        "object" == typeof this.settings.headerFormat && (this.settings.headerFormat = this.settings.headerFormat[this.settings.type]), 
        "object" == typeof this.settings.outputFormat && (this.settings.outputFormat = this.settings.outputFormat[this.settings.type]), 
        "object" == typeof this.settings.sitePickerFormat && (this.settings.sitePickerFormat = this.settings.sitePickerFormat[this.settings.type]), 
        this.element = element, "string" == typeof this.element && (this.element = document.querySelector("" + element), 
        null == this.element)) return void console.warn('Material Datepicker could not initialize because, Object: "' + element + '" is not defined');
        var elementTag = this.element.tagName, elementType = this.element.getAttribute("type"), elementVal = this.element.value;
        ("INPUT" != elementTag || "date" != elementType && "number" != elementType && "text" != elementType) && "PAPER-INPUT" != elementTag || "" == elementVal ? this.date = this.settings.date : this.date = moment(elementVal, this.settings.outputFormat).toDate(), 
        "string" == typeof this.settings.outputElement && "" != this.settings.outputElement && (this.settings.outputElement = document.querySelector("" + this.settings.outputElement)), 
        this._define();
    }
    return _createClass(MaterialDatepicker, [ {
        key: "_define",
        value: function() {
            var _this = this;
            return this._createElement(), "direct" == this.settings.openOn ? void this.open(this.settings.openOn) : void this.element.addEventListener(this.settings.openOn, function() {
                _this.open(_this.settings.openOn);
            });
        }
    }, {
        key: "_createElement",
        value: function(time) {
            var _this2 = this, randomNumber = new Date().getTime() + Math.round(Math.random() + 2);
            this.picker = document.createElement("div"), this.picker.setAttribute("class", "mp-" + this.settings.type + "picker mp-picker"), 
            this.picker.setAttribute("id", "mp-" + randomNumber), this.picker.setAttribute("data-theme", this.settings.theme);
            var containerInfo = document.createElement("div");
            containerInfo.setAttribute("class", "mp-picker-info"), this.picker.appendChild(containerInfo);
            var containerPicker = document.createElement("div");
            containerPicker.setAttribute("class", "mp-picker-picker"), this.picker.appendChild(containerPicker);
            var containerInfoYear = document.createElement("span");
            containerInfoYear.setAttribute("class", "mp-info-first"), containerInfo.appendChild(containerInfoYear);
            var containerInfoMonth = document.createElement("span");
            containerInfoMonth.setAttribute("class", "mp-info-second"), containerInfo.appendChild(containerInfoMonth);
            var containerPickerYear = document.createElement("div");
            containerPickerYear.setAttribute("class", "mp-picker-site"), containerPicker.appendChild(containerPickerYear);
            var containerPickerYearBefore = document.createElement("a");
            containerPickerYearBefore.setAttribute("class", "mp-picker-site-before mp-picker-site-button"), 
            containerPickerYear.appendChild(containerPickerYearBefore), containerPickerYearBefore.addEventListener("click", function() {
                _this2._siteChange(-1);
            });
            var containerPickerYearThis = document.createElement("span");
            containerPickerYearThis.setAttribute("class", "mp-picker-site-this mp-animate"), 
            containerPickerYear.appendChild(containerPickerYearThis);
            var containerPickerYearNext = document.createElement("a");
            containerPickerYearNext.setAttribute("class", "mp-picker-site-next mp-picker-site-button"), 
            containerPickerYear.appendChild(containerPickerYearNext), containerPickerYearNext.addEventListener("click", function() {
                _this2._siteChange(1);
            });
            var containerPickerChoose = document.createElement("div");
            containerPickerChoose.setAttribute("class", "mp-picker-choose mp-animate"), containerPicker.appendChild(containerPickerChoose);
            var newStyle = "\n      #mp-" + randomNumber + '.mp-picker:not([data-theme="dark"]) .mp-picker-info {\n        background-color: ' + this.settings.color + ";\n      }\n\n      #mp-" + randomNumber + '.mp-picker .mp-picker-choose [class*="mp-picker-click"].active,\n      #mp-' + randomNumber + '.mp-picker[data-theme="dark"] .mp-picker-choose [class*="mp-picker-click"].active {\n        background-color: ' + this.settings.color + ";\n      }\n\n      #mp-" + randomNumber + '.mp-picker .mp-picker-choose [class*="mp-picker-click"].today:not(.active),\n      #mp-' + randomNumber + '.mp-picker[data-theme="dark"] .mp-picker-choose .mp-picker-choose [class*="mp-picker-click"].today:not(.active) {\n        color: ' + this.settings.color + ";\n      }\n    ", containerStyle = document.createElement("style");
            containerStyle.type = "text/css", containerStyle.appendChild(document.createTextNode(newStyle)), 
            document.querySelector("head").appendChild(containerStyle), this._updatePicker();
        }
    }, {
        key: "_updatePicker",
        value: function() {
            var _this3 = this, containerPickerChoose = this.picker.querySelector(".mp-picker-choose");
            if (containerPickerChoose.innerHTML = "", "date" == this.settings.type) {
                for (var maxMonthLength = 42, week = 7, i = 0; week > i; i++) {
                    var weekDay = i;
                    "monday" == this.settings.weekBegin && (weekDay += 1, weekDay >= week && (weekDay = 0));
                    var containerPickerChooseWeekDay = document.createElement("span");
                    containerPickerChooseWeekDay.setAttribute("class", "mp-picker-header mp-picker-header-day-" + i), 
                    containerPickerChooseWeekDay.innerHTML = moment.weekdaysMin()[weekDay].substr(0, 1), 
                    containerPickerChoose.appendChild(containerPickerChooseWeekDay);
                }
                var thisMonthLenght = this.date.getTime();
                thisMonthLenght = new Date(thisMonthLenght), thisMonthLenght.setDate(1), thisMonthLenght.setMonth(thisMonthLenght.getMonth() + 1), 
                thisMonthLenght.setDate(0);
                var firstWeekDay = thisMonthLenght;
                thisMonthLenght = thisMonthLenght.getDate(), firstWeekDay.setDate(1), firstWeekDay = firstWeekDay.getDay();
                for (var _loop = function(i, _num) {
                    var containerPickerChooseDay = document.createElement("a");
                    containerPickerChooseDay.setAttribute("class", "mp-picker-choose-day");
                    var boolean = i >= firstWeekDay;
                    "monday" == _this3.settings.weekBegin && (boolean = i + 1 >= firstWeekDay), boolean && thisMonthLenght >= _num ? (containerPickerChooseDay.innerHTML = _num, 
                    containerPickerChooseDay.classList.add("mp-picker-click-" + _num), _num++) : (containerPickerChooseDay.innerHTML = " ", 
                    containerPickerChooseDay.classList.add("mp-empty")), containerPickerChoose.appendChild(containerPickerChooseDay), 
                    containerPickerChooseDay.addEventListener("click", function(element) {
                        if (!element.path[0].classList.contains("mp-empty")) {
                            var date = _num - 1, nextDate = _this3.date;
                            nextDate.setDate(date), "direct" == _this3.settings.openOn ? _this3.newDate(nextDate) : _this3.newDate(nextDate, "close");
                        }
                    }), num = _num;
                }, i = 0, num = 1; maxMonthLength > i; i++) _loop(i, num);
            } else if ("month" == this.settings.type) for (var months = 12, _loop2 = function(i) {
                var containerPickerChooseMonth = document.createElement("a");
                containerPickerChooseMonth.setAttribute("class", "mp-picker-click-" + i + " mp-picker-choose-month"), 
                containerPickerChooseMonth.innerHTML = moment.monthsShort("-MMM-")[i], containerPickerChoose.appendChild(containerPickerChooseMonth), 
                containerPickerChooseMonth.addEventListener("click", function() {
                    var month = i, nextDate = _this3.date;
                    nextDate.setMonth(month), _this3.newDate(nextDate, "close");
                });
            }, i = 0; months > i; i++) _loop2(i);
            this.callbackOnLoad();
        }
    }, {
        key: "_siteChange",
        value: function(direction) {
            var _this4 = this, directions = {
                "-1": "left",
                "1": "right"
            }, directionsNot = {
                "-1": "right",
                "1": "left"
            };
            "date" == this.settings.type ? this.date.setMonth(this.date.getMonth() + direction) : "month" == this.settings.type && this.date.setYear(this.date.getYear() + 1900 + direction), 
            this.picker.querySelectorAll(".mp-animate")[0].classList.add("mp-animate-" + directions[direction]), 
            this.picker.querySelectorAll(".mp-animate")[1].classList.add("mp-animate-" + directions[direction]), 
            setTimeout(function() {
                _this4.picker.querySelectorAll(".mp-animate")[0].classList.remove("mp-animate-" + directions[direction]), 
                _this4.picker.querySelectorAll(".mp-animate")[0].classList.add("mp-animate-" + directionsNot[direction]), 
                _this4.picker.querySelectorAll(".mp-animate")[1].classList.remove("mp-animate-" + directions[direction]), 
                _this4.picker.querySelectorAll(".mp-animate")[1].classList.add("mp-animate-" + directionsNot[direction]), 
                _this4._updatePicker(), setTimeout(function() {
                    _this4.picker.querySelectorAll(".mp-animate")[0].classList.remove("mp-animate-" + directionsNot[direction]), 
                    _this4.picker.querySelectorAll(".mp-animate")[1].classList.remove("mp-animate-" + directionsNot[direction]), 
                    _this4.newDate(_this4.date);
                }, 200);
            }, 200);
        }
    }, {
        key: "open",
        value: function(how) {
            if ("direct" == how && "DIV" == this.element.tagName) return this.element.appendChild(this.picker), 
            this.newDate(null), void this.callbackOnOpen();
            var elementTag = this.element.tagName, elementType = this.element.getAttribute("type"), elementVal = this.element.value;
            ("INPUT" != elementTag || "date" != elementType && "number" != elementType && "text" != elementType) && "PAPER-INPUT" != elementTag || "" == elementVal || (this.date = moment(elementVal, this.settings.outputFormat).toDate()), 
            document.body.appendChild(this.picker);
            var elementPosition = this.element.getBoundingClientRect(), top = elementPosition.top + elementPosition.height + 5, left = elementPosition.left, body = document.body.getBoundingClientRect(), picker = this.picker.getBoundingClientRect();
            left + picker.width + 50 > body.width && (left = left - picker.width - 5), top + picker.height + 20 > body.height && (top = top - picker.height - elementPosition.height - 5), 
            this.picker.style.top = top, this.picker.style.left = left, this.picker.style.zIndex = this.settings.zIndex, 
            this.newDate(null), this.callbackOnOpen();
        }
    }, {
        key: "close",
        value: function() {
            this.picker && this.picker.parentNode && this.picker.parentNode.removeChild(this.picker);
        }
    }, {
        key: "newDate",
        value: function(date, value) {
            var dates = date || this.date;
            this.picker.querySelector(".mp-info-first").innerHTML = moment(dates).format(this.settings.topHeaderFormat), 
            this.picker.querySelector(".mp-info-second").innerHTML = moment(dates).format(this.settings.headerFormat), 
            this.picker.querySelector(".mp-picker-site-this").innerHTML = moment(dates).format(this.settings.sitePickerFormat), 
            null != this.picker.querySelector('[class*="mp-picker-click"].active') && this.picker.querySelector('[class*="mp-picker-click"].active').classList.remove("active"), 
            "date" == this.settings.type ? (new Date().getYear() == dates.getYear() && new Date().getMonth() == dates.getMonth() ? this.picker.querySelector(".mp-picker-click-" + 1 * new Date().getDate()).classList.add("today") : null != this.picker.querySelector(".mp-picker-click-" + 1 * new Date().getMonth() + ".today") && this.picker.querySelector(".mp-picker-click-" + 1 * new Date().getDate() + ".today").classList.remove("today"), 
            this.picker.querySelector(".mp-picker-click-" + 1 * dates.getDate()).classList.add("active")) : "month" == this.settings.type && (new Date().getYear() == dates.getYear() ? this.picker.querySelector(".mp-picker-click-" + 1 * new Date().getMonth()).classList.add("today") : null != this.picker.querySelector(".mp-picker-click-" + 1 * new Date().getMonth() + ".today") && this.picker.querySelector(".mp-picker-click-" + 1 * new Date().getMonth() + ".today").classList.remove("today"), 
            this.picker.querySelector(".mp-picker-click-" + 1 * dates.getMonth()).classList.add("active")), 
            dates.setMilliseconds(0), dates.setSeconds(0), dates.setMinutes(0), dates.setHours(0), 
            this.date = dates;
            var output = moment(dates).format(this.settings.outputFormat);
            ("INPUT" == this.element.tagName && "text" == this.element.getAttribute("type") || "DIV" == this.element.tagName || "PAPER-INPUT" == this.element.tagName) && (this.element.value = output), 
            ("SPAN" == this.settings.outputElement.tagName || "P" == this.settings.outputElement.tagName || "A" == this.settings.outputElement.tagName) && (this.settings.outputElement.innerHTML = output), 
            "close" == value && (this.close(), this.callbackOnNewDate());
        }
    }, {
        key: "callbackOnLoad",
        value: function() {
            "function" == typeof this.settings.onLoad && this.settings.onLoad.call(this, this.date);
        }
    }, {
        key: "callbackOnOpen",
        value: function() {
            "function" == typeof this.settings.onOpen && this.settings.onOpen.call(this, this.date);
        }
    }, {
        key: "callbackOnNewDate",
        value: function() {
            "function" == typeof this.settings.onNewDate && this.settings.onNewDate.call(this, this.date);
        }
    } ]), MaterialDatepicker;
}();