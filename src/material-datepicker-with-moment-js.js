"use strict";

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}

!function(global, factory) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = factory() : "function" == typeof define && define.amd ? define(factory) : global.moment = factory();
}(this, function() {
    function utils_hooks__hooks() {
        return hookCallback.apply(null, arguments);
    }
    function setHookCallback(callback) {
        hookCallback = callback;
    }
    function isArray(input) {
        return "[object Array]" === Object.prototype.toString.call(input);
    }
    function isDate(input) {
        return input instanceof Date || "[object Date]" === Object.prototype.toString.call(input);
    }
    function map(arr, fn) {
        var i, res = [];
        for (i = 0; i < arr.length; ++i) res.push(fn(arr[i], i));
        return res;
    }
    function hasOwnProp(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b);
    }
    function extend(a, b) {
        for (var i in b) hasOwnProp(b, i) && (a[i] = b[i]);
        return hasOwnProp(b, "toString") && (a.toString = b.toString), hasOwnProp(b, "valueOf") && (a.valueOf = b.valueOf), 
        a;
    }
    function create_utc__createUTC(input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, !0).utc();
    }
    function defaultParsingFlags() {
        return {
            empty: !1,
            unusedTokens: [],
            unusedInput: [],
            overflow: -2,
            charsLeftOver: 0,
            nullInput: !1,
            invalidMonth: null,
            invalidFormat: !1,
            userInvalidated: !1,
            iso: !1
        };
    }
    function getParsingFlags(m) {
        return null == m._pf && (m._pf = defaultParsingFlags()), m._pf;
    }
    function valid__isValid(m) {
        if (null == m._isValid) {
            var flags = getParsingFlags(m);
            m._isValid = !(isNaN(m._d.getTime()) || !(flags.overflow < 0) || flags.empty || flags.invalidMonth || flags.invalidWeekday || flags.nullInput || flags.invalidFormat || flags.userInvalidated), 
            m._strict && (m._isValid = m._isValid && 0 === flags.charsLeftOver && 0 === flags.unusedTokens.length && void 0 === flags.bigHour);
        }
        return m._isValid;
    }
    function valid__createInvalid(flags) {
        var m = create_utc__createUTC(NaN);
        return null != flags ? extend(getParsingFlags(m), flags) : getParsingFlags(m).userInvalidated = !0, 
        m;
    }
    function copyConfig(to, from) {
        var i, prop, val;
        if ("undefined" != typeof from._isAMomentObject && (to._isAMomentObject = from._isAMomentObject), 
        "undefined" != typeof from._i && (to._i = from._i), "undefined" != typeof from._f && (to._f = from._f), 
        "undefined" != typeof from._l && (to._l = from._l), "undefined" != typeof from._strict && (to._strict = from._strict), 
        "undefined" != typeof from._tzm && (to._tzm = from._tzm), "undefined" != typeof from._isUTC && (to._isUTC = from._isUTC), 
        "undefined" != typeof from._offset && (to._offset = from._offset), "undefined" != typeof from._pf && (to._pf = getParsingFlags(from)), 
        "undefined" != typeof from._locale && (to._locale = from._locale), momentProperties.length > 0) for (i in momentProperties) prop = momentProperties[i], 
        val = from[prop], "undefined" != typeof val && (to[prop] = val);
        return to;
    }
    function Moment(config) {
        copyConfig(this, config), this._d = new Date(null != config._d ? config._d.getTime() : NaN), 
        updateInProgress === !1 && (updateInProgress = !0, utils_hooks__hooks.updateOffset(this), 
        updateInProgress = !1);
    }
    function isMoment(obj) {
        return obj instanceof Moment || null != obj && null != obj._isAMomentObject;
    }
    function absFloor(number) {
        return 0 > number ? Math.ceil(number) : Math.floor(number);
    }
    function toInt(argumentForCoercion) {
        var coercedNumber = +argumentForCoercion, value = 0;
        return 0 !== coercedNumber && isFinite(coercedNumber) && (value = absFloor(coercedNumber)), 
        value;
    }
    function compareArrays(array1, array2, dontConvert) {
        var i, len = Math.min(array1.length, array2.length), lengthDiff = Math.abs(array1.length - array2.length), diffs = 0;
        for (i = 0; len > i; i++) (dontConvert && array1[i] !== array2[i] || !dontConvert && toInt(array1[i]) !== toInt(array2[i])) && diffs++;
        return diffs + lengthDiff;
    }
    function Locale() {}
    function normalizeLocale(key) {
        return key ? key.toLowerCase().replace("_", "-") : key;
    }
    function chooseLocale(names) {
        for (var j, next, locale, split, i = 0; i < names.length; ) {
            for (split = normalizeLocale(names[i]).split("-"), j = split.length, next = normalizeLocale(names[i + 1]), 
            next = next ? next.split("-") : null; j > 0; ) {
                if (locale = loadLocale(split.slice(0, j).join("-"))) return locale;
                if (next && next.length >= j && compareArrays(split, next, !0) >= j - 1) break;
                j--;
            }
            i++;
        }
        return null;
    }
    function loadLocale(name) {
        var oldLocale = null;
        if (!locales[name] && "undefined" != typeof module && module && module.exports) try {
            oldLocale = globalLocale._abbr, require("./locale/" + name), locale_locales__getSetGlobalLocale(oldLocale);
        } catch (e) {}
        return locales[name];
    }
    function locale_locales__getSetGlobalLocale(key, values) {
        var data;
        return key && (data = "undefined" == typeof values ? locale_locales__getLocale(key) : defineLocale(key, values), 
        data && (globalLocale = data)), globalLocale._abbr;
    }
    function defineLocale(name, values) {
        return null !== values ? (values.abbr = name, locales[name] = locales[name] || new Locale(), 
        locales[name].set(values), locale_locales__getSetGlobalLocale(name), locales[name]) : (delete locales[name], 
        null);
    }
    function locale_locales__getLocale(key) {
        var locale;
        if (key && key._locale && key._locale._abbr && (key = key._locale._abbr), !key) return globalLocale;
        if (!isArray(key)) {
            if (locale = loadLocale(key)) return locale;
            key = [ key ];
        }
        return chooseLocale(key);
    }
    function addUnitAlias(unit, shorthand) {
        var lowerCase = unit.toLowerCase();
        aliases[lowerCase] = aliases[lowerCase + "s"] = aliases[shorthand] = unit;
    }
    function normalizeUnits(units) {
        return "string" == typeof units ? aliases[units] || aliases[units.toLowerCase()] : void 0;
    }
    function normalizeObjectUnits(inputObject) {
        var normalizedProp, prop, normalizedInput = {};
        for (prop in inputObject) hasOwnProp(inputObject, prop) && (normalizedProp = normalizeUnits(prop), 
        normalizedProp && (normalizedInput[normalizedProp] = inputObject[prop]));
        return normalizedInput;
    }
    function makeGetSet(unit, keepTime) {
        return function(value) {
            return null != value ? (get_set__set(this, unit, value), utils_hooks__hooks.updateOffset(this, keepTime), 
            this) : get_set__get(this, unit);
        };
    }
    function get_set__get(mom, unit) {
        return mom._d["get" + (mom._isUTC ? "UTC" : "") + unit]();
    }
    function get_set__set(mom, unit, value) {
        return mom._d["set" + (mom._isUTC ? "UTC" : "") + unit](value);
    }
    function getSet(units, value) {
        var unit;
        if ("object" == typeof units) for (unit in units) this.set(unit, units[unit]); else if (units = normalizeUnits(units), 
        "function" == typeof this[units]) return this[units](value);
        return this;
    }
    function zeroFill(number, targetLength, forceSign) {
        var absNumber = "" + Math.abs(number), zerosToFill = targetLength - absNumber.length, sign = number >= 0;
        return (sign ? forceSign ? "+" : "" : "-") + Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
    }
    function addFormatToken(token, padded, ordinal, callback) {
        var func = callback;
        "string" == typeof callback && (func = function() {
            return this[callback]();
        }), token && (formatTokenFunctions[token] = func), padded && (formatTokenFunctions[padded[0]] = function() {
            return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
        }), ordinal && (formatTokenFunctions[ordinal] = function() {
            return this.localeData().ordinal(func.apply(this, arguments), token);
        });
    }
    function removeFormattingTokens(input) {
        return input.match(/\[[\s\S]/) ? input.replace(/^\[|\]$/g, "") : input.replace(/\\/g, "");
    }
    function makeFormatFunction(format) {
        var i, length, array = format.match(formattingTokens);
        for (i = 0, length = array.length; length > i; i++) formatTokenFunctions[array[i]] ? array[i] = formatTokenFunctions[array[i]] : array[i] = removeFormattingTokens(array[i]);
        return function(mom) {
            var output = "";
            for (i = 0; length > i; i++) output += array[i] instanceof Function ? array[i].call(mom, format) : array[i];
            return output;
        };
    }
    function formatMoment(m, format) {
        return m.isValid() ? (format = expandFormat(format, m.localeData()), formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format), 
        formatFunctions[format](m)) : m.localeData().invalidDate();
    }
    function expandFormat(format, locale) {
        function replaceLongDateFormatTokens(input) {
            return locale.longDateFormat(input) || input;
        }
        var i = 5;
        for (localFormattingTokens.lastIndex = 0; i >= 0 && localFormattingTokens.test(format); ) format = format.replace(localFormattingTokens, replaceLongDateFormatTokens), 
        localFormattingTokens.lastIndex = 0, i -= 1;
        return format;
    }
    function isFunction(sth) {
        return "function" == typeof sth && "[object Function]" === Object.prototype.toString.call(sth);
    }
    function addRegexToken(token, regex, strictRegex) {
        regexes[token] = isFunction(regex) ? regex : function(isStrict) {
            return isStrict && strictRegex ? strictRegex : regex;
        };
    }
    function getParseRegexForToken(token, config) {
        return hasOwnProp(regexes, token) ? regexes[token](config._strict, config._locale) : new RegExp(unescapeFormat(token));
    }
    function unescapeFormat(s) {
        return s.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(matched, p1, p2, p3, p4) {
            return p1 || p2 || p3 || p4;
        }).replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
    }
    function addParseToken(token, callback) {
        var i, func = callback;
        for ("string" == typeof token && (token = [ token ]), "number" == typeof callback && (func = function(input, array) {
            array[callback] = toInt(input);
        }), i = 0; i < token.length; i++) tokens[token[i]] = func;
    }
    function addWeekParseToken(token, callback) {
        addParseToken(token, function(input, array, config, token) {
            config._w = config._w || {}, callback(input, config._w, config, token);
        });
    }
    function addTimeToArrayFromToken(token, input, config) {
        null != input && hasOwnProp(tokens, token) && tokens[token](input, config._a, config, token);
    }
    function daysInMonth(year, month) {
        return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
    }
    function localeMonths(m) {
        return this._months[m.month()];
    }
    function localeMonthsShort(m) {
        return this._monthsShort[m.month()];
    }
    function localeMonthsParse(monthName, format, strict) {
        var i, mom, regex;
        for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), 
        i = 0; 12 > i; i++) {
            if (mom = create_utc__createUTC([ 2e3, i ]), strict && !this._longMonthsParse[i] && (this._longMonthsParse[i] = new RegExp("^" + this.months(mom, "").replace(".", "") + "$", "i"), 
            this._shortMonthsParse[i] = new RegExp("^" + this.monthsShort(mom, "").replace(".", "") + "$", "i")), 
            strict || this._monthsParse[i] || (regex = "^" + this.months(mom, "") + "|^" + this.monthsShort(mom, ""), 
            this._monthsParse[i] = new RegExp(regex.replace(".", ""), "i")), strict && "MMMM" === format && this._longMonthsParse[i].test(monthName)) return i;
            if (strict && "MMM" === format && this._shortMonthsParse[i].test(monthName)) return i;
            if (!strict && this._monthsParse[i].test(monthName)) return i;
        }
    }
    function setMonth(mom, value) {
        var dayOfMonth;
        return "string" == typeof value && (value = mom.localeData().monthsParse(value), 
        "number" != typeof value) ? mom : (dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value)), 
        mom._d["set" + (mom._isUTC ? "UTC" : "") + "Month"](value, dayOfMonth), mom);
    }
    function getSetMonth(value) {
        return null != value ? (setMonth(this, value), utils_hooks__hooks.updateOffset(this, !0), 
        this) : get_set__get(this, "Month");
    }
    function getDaysInMonth() {
        return daysInMonth(this.year(), this.month());
    }
    function checkOverflow(m) {
        var overflow, a = m._a;
        return a && -2 === getParsingFlags(m).overflow && (overflow = a[MONTH] < 0 || a[MONTH] > 11 ? MONTH : a[DATE] < 1 || a[DATE] > daysInMonth(a[YEAR], a[MONTH]) ? DATE : a[HOUR] < 0 || a[HOUR] > 24 || 24 === a[HOUR] && (0 !== a[MINUTE] || 0 !== a[SECOND] || 0 !== a[MILLISECOND]) ? HOUR : a[MINUTE] < 0 || a[MINUTE] > 59 ? MINUTE : a[SECOND] < 0 || a[SECOND] > 59 ? SECOND : a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND : -1, 
        getParsingFlags(m)._overflowDayOfYear && (YEAR > overflow || overflow > DATE) && (overflow = DATE), 
        getParsingFlags(m).overflow = overflow), m;
    }
    function warn(msg) {
        utils_hooks__hooks.suppressDeprecationWarnings === !1 && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + msg);
    }
    function deprecate(msg, fn) {
        var firstTime = !0;
        return extend(function() {
            return firstTime && (warn(msg + "\n" + new Error().stack), firstTime = !1), fn.apply(this, arguments);
        }, fn);
    }
    function deprecateSimple(name, msg) {
        deprecations[name] || (warn(msg), deprecations[name] = !0);
    }
    function configFromISO(config) {
        var i, l, string = config._i, match = from_string__isoRegex.exec(string);
        if (match) {
            for (getParsingFlags(config).iso = !0, i = 0, l = isoDates.length; l > i; i++) if (isoDates[i][1].exec(string)) {
                config._f = isoDates[i][0];
                break;
            }
            for (i = 0, l = isoTimes.length; l > i; i++) if (isoTimes[i][1].exec(string)) {
                config._f += (match[6] || " ") + isoTimes[i][0];
                break;
            }
            string.match(matchOffset) && (config._f += "Z"), configFromStringAndFormat(config);
        } else config._isValid = !1;
    }
    function configFromString(config) {
        var matched = aspNetJsonRegex.exec(config._i);
        return null !== matched ? void (config._d = new Date(+matched[1])) : (configFromISO(config), 
        void (config._isValid === !1 && (delete config._isValid, utils_hooks__hooks.createFromInputFallback(config))));
    }
    function createDate(y, m, d, h, M, s, ms) {
        var date = new Date(y, m, d, h, M, s, ms);
        return 1970 > y && date.setFullYear(y), date;
    }
    function createUTCDate(y) {
        var date = new Date(Date.UTC.apply(null, arguments));
        return 1970 > y && date.setUTCFullYear(y), date;
    }
    function daysInYear(year) {
        return isLeapYear(year) ? 366 : 365;
    }
    function isLeapYear(year) {
        return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
    }
    function getIsLeapYear() {
        return isLeapYear(this.year());
    }
    function weekOfYear(mom, firstDayOfWeek, firstDayOfWeekOfYear) {
        var adjustedMoment, end = firstDayOfWeekOfYear - firstDayOfWeek, daysToDayOfWeek = firstDayOfWeekOfYear - mom.day();
        return daysToDayOfWeek > end && (daysToDayOfWeek -= 7), end - 7 > daysToDayOfWeek && (daysToDayOfWeek += 7), 
        adjustedMoment = local__createLocal(mom).add(daysToDayOfWeek, "d"), {
            week: Math.ceil(adjustedMoment.dayOfYear() / 7),
            year: adjustedMoment.year()
        };
    }
    function localeWeek(mom) {
        return weekOfYear(mom, this._week.dow, this._week.doy).week;
    }
    function localeFirstDayOfWeek() {
        return this._week.dow;
    }
    function localeFirstDayOfYear() {
        return this._week.doy;
    }
    function getSetWeek(input) {
        var week = this.localeData().week(this);
        return null == input ? week : this.add(7 * (input - week), "d");
    }
    function getSetISOWeek(input) {
        var week = weekOfYear(this, 1, 4).week;
        return null == input ? week : this.add(7 * (input - week), "d");
    }
    function dayOfYearFromWeeks(year, week, weekday, firstDayOfWeekOfYear, firstDayOfWeek) {
        var dayOfYear, week1Jan = 6 + firstDayOfWeek - firstDayOfWeekOfYear, janX = createUTCDate(year, 0, 1 + week1Jan), d = janX.getUTCDay();
        return firstDayOfWeek > d && (d += 7), weekday = null != weekday ? 1 * weekday : firstDayOfWeek, 
        dayOfYear = 1 + week1Jan + 7 * (week - 1) - d + weekday, {
            year: dayOfYear > 0 ? year : year - 1,
            dayOfYear: dayOfYear > 0 ? dayOfYear : daysInYear(year - 1) + dayOfYear
        };
    }
    function getSetDayOfYear(input) {
        var dayOfYear = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1;
        return null == input ? dayOfYear : this.add(input - dayOfYear, "d");
    }
    function defaults(a, b, c) {
        return null != a ? a : null != b ? b : c;
    }
    function currentDateArray(config) {
        var now = new Date();
        return config._useUTC ? [ now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() ] : [ now.getFullYear(), now.getMonth(), now.getDate() ];
    }
    function configFromArray(config) {
        var i, date, currentDate, yearToUse, input = [];
        if (!config._d) {
            for (currentDate = currentDateArray(config), config._w && null == config._a[DATE] && null == config._a[MONTH] && dayOfYearFromWeekInfo(config), 
            config._dayOfYear && (yearToUse = defaults(config._a[YEAR], currentDate[YEAR]), 
            config._dayOfYear > daysInYear(yearToUse) && (getParsingFlags(config)._overflowDayOfYear = !0), 
            date = createUTCDate(yearToUse, 0, config._dayOfYear), config._a[MONTH] = date.getUTCMonth(), 
            config._a[DATE] = date.getUTCDate()), i = 0; 3 > i && null == config._a[i]; ++i) config._a[i] = input[i] = currentDate[i];
            for (;7 > i; i++) config._a[i] = input[i] = null == config._a[i] ? 2 === i ? 1 : 0 : config._a[i];
            24 === config._a[HOUR] && 0 === config._a[MINUTE] && 0 === config._a[SECOND] && 0 === config._a[MILLISECOND] && (config._nextDay = !0, 
            config._a[HOUR] = 0), config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input), 
            null != config._tzm && config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm), 
            config._nextDay && (config._a[HOUR] = 24);
        }
    }
    function dayOfYearFromWeekInfo(config) {
        var w, weekYear, week, weekday, dow, doy, temp;
        w = config._w, null != w.GG || null != w.W || null != w.E ? (dow = 1, doy = 4, weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(local__createLocal(), 1, 4).year), 
        week = defaults(w.W, 1), weekday = defaults(w.E, 1)) : (dow = config._locale._week.dow, 
        doy = config._locale._week.doy, weekYear = defaults(w.gg, config._a[YEAR], weekOfYear(local__createLocal(), dow, doy).year), 
        week = defaults(w.w, 1), null != w.d ? (weekday = w.d, dow > weekday && ++week) : weekday = null != w.e ? w.e + dow : dow), 
        temp = dayOfYearFromWeeks(weekYear, week, weekday, doy, dow), config._a[YEAR] = temp.year, 
        config._dayOfYear = temp.dayOfYear;
    }
    function configFromStringAndFormat(config) {
        if (config._f === utils_hooks__hooks.ISO_8601) return void configFromISO(config);
        config._a = [], getParsingFlags(config).empty = !0;
        var i, parsedInput, tokens, token, skipped, string = "" + config._i, stringLength = string.length, totalParsedInputLength = 0;
        for (tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [], 
        i = 0; i < tokens.length; i++) token = tokens[i], parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0], 
        parsedInput && (skipped = string.substr(0, string.indexOf(parsedInput)), skipped.length > 0 && getParsingFlags(config).unusedInput.push(skipped), 
        string = string.slice(string.indexOf(parsedInput) + parsedInput.length), totalParsedInputLength += parsedInput.length), 
        formatTokenFunctions[token] ? (parsedInput ? getParsingFlags(config).empty = !1 : getParsingFlags(config).unusedTokens.push(token), 
        addTimeToArrayFromToken(token, parsedInput, config)) : config._strict && !parsedInput && getParsingFlags(config).unusedTokens.push(token);
        getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength, string.length > 0 && getParsingFlags(config).unusedInput.push(string), 
        getParsingFlags(config).bigHour === !0 && config._a[HOUR] <= 12 && config._a[HOUR] > 0 && (getParsingFlags(config).bigHour = void 0), 
        config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem), 
        configFromArray(config), checkOverflow(config);
    }
    function meridiemFixWrap(locale, hour, meridiem) {
        var isPm;
        return null == meridiem ? hour : null != locale.meridiemHour ? locale.meridiemHour(hour, meridiem) : null != locale.isPM ? (isPm = locale.isPM(meridiem), 
        isPm && 12 > hour && (hour += 12), isPm || 12 !== hour || (hour = 0), hour) : hour;
    }
    function configFromStringAndArray(config) {
        var tempConfig, bestMoment, scoreToBeat, i, currentScore;
        if (0 === config._f.length) return getParsingFlags(config).invalidFormat = !0, void (config._d = new Date(NaN));
        for (i = 0; i < config._f.length; i++) currentScore = 0, tempConfig = copyConfig({}, config), 
        null != config._useUTC && (tempConfig._useUTC = config._useUTC), tempConfig._f = config._f[i], 
        configFromStringAndFormat(tempConfig), valid__isValid(tempConfig) && (currentScore += getParsingFlags(tempConfig).charsLeftOver, 
        currentScore += 10 * getParsingFlags(tempConfig).unusedTokens.length, getParsingFlags(tempConfig).score = currentScore, 
        (null == scoreToBeat || scoreToBeat > currentScore) && (scoreToBeat = currentScore, 
        bestMoment = tempConfig));
        extend(config, bestMoment || tempConfig);
    }
    function configFromObject(config) {
        if (!config._d) {
            var i = normalizeObjectUnits(config._i);
            config._a = [ i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond ], 
            configFromArray(config);
        }
    }
    function createFromConfig(config) {
        var res = new Moment(checkOverflow(prepareConfig(config)));
        return res._nextDay && (res.add(1, "d"), res._nextDay = void 0), res;
    }
    function prepareConfig(config) {
        var input = config._i, format = config._f;
        return config._locale = config._locale || locale_locales__getLocale(config._l), 
        null === input || void 0 === format && "" === input ? valid__createInvalid({
            nullInput: !0
        }) : ("string" == typeof input && (config._i = input = config._locale.preparse(input)), 
        isMoment(input) ? new Moment(checkOverflow(input)) : (isArray(format) ? configFromStringAndArray(config) : format ? configFromStringAndFormat(config) : isDate(input) ? config._d = input : configFromInput(config), 
        config));
    }
    function configFromInput(config) {
        var input = config._i;
        void 0 === input ? config._d = new Date() : isDate(input) ? config._d = new Date(+input) : "string" == typeof input ? configFromString(config) : isArray(input) ? (config._a = map(input.slice(0), function(obj) {
            return parseInt(obj, 10);
        }), configFromArray(config)) : "object" == typeof input ? configFromObject(config) : "number" == typeof input ? config._d = new Date(input) : utils_hooks__hooks.createFromInputFallback(config);
    }
    function createLocalOrUTC(input, format, locale, strict, isUTC) {
        var c = {};
        return "boolean" == typeof locale && (strict = locale, locale = void 0), c._isAMomentObject = !0, 
        c._useUTC = c._isUTC = isUTC, c._l = locale, c._i = input, c._f = format, c._strict = strict, 
        createFromConfig(c);
    }
    function local__createLocal(input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, !1);
    }
    function pickBy(fn, moments) {
        var res, i;
        if (1 === moments.length && isArray(moments[0]) && (moments = moments[0]), !moments.length) return local__createLocal();
        for (res = moments[0], i = 1; i < moments.length; ++i) (!moments[i].isValid() || moments[i][fn](res)) && (res = moments[i]);
        return res;
    }
    function min() {
        var args = [].slice.call(arguments, 0);
        return pickBy("isBefore", args);
    }
    function max() {
        var args = [].slice.call(arguments, 0);
        return pickBy("isAfter", args);
    }
    function Duration(duration) {
        var normalizedInput = normalizeObjectUnits(duration), years = normalizedInput.year || 0, quarters = normalizedInput.quarter || 0, months = normalizedInput.month || 0, weeks = normalizedInput.week || 0, days = normalizedInput.day || 0, hours = normalizedInput.hour || 0, minutes = normalizedInput.minute || 0, seconds = normalizedInput.second || 0, milliseconds = normalizedInput.millisecond || 0;
        this._milliseconds = +milliseconds + 1e3 * seconds + 6e4 * minutes + 36e5 * hours, 
        this._days = +days + 7 * weeks, this._months = +months + 3 * quarters + 12 * years, 
        this._data = {}, this._locale = locale_locales__getLocale(), this._bubble();
    }
    function isDuration(obj) {
        return obj instanceof Duration;
    }
    function offset(token, separator) {
        addFormatToken(token, 0, 0, function() {
            var offset = this.utcOffset(), sign = "+";
            return 0 > offset && (offset = -offset, sign = "-"), sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~offset % 60, 2);
        });
    }
    function offsetFromString(string) {
        var matches = (string || "").match(matchOffset) || [], chunk = matches[matches.length - 1] || [], parts = (chunk + "").match(chunkOffset) || [ "-", 0, 0 ], minutes = +(60 * parts[1]) + toInt(parts[2]);
        return "+" === parts[0] ? minutes : -minutes;
    }
    function cloneWithOffset(input, model) {
        var res, diff;
        return model._isUTC ? (res = model.clone(), diff = (isMoment(input) || isDate(input) ? +input : +local__createLocal(input)) - +res, 
        res._d.setTime(+res._d + diff), utils_hooks__hooks.updateOffset(res, !1), res) : local__createLocal(input).local();
    }
    function getDateOffset(m) {
        return 15 * -Math.round(m._d.getTimezoneOffset() / 15);
    }
    function getSetOffset(input, keepLocalTime) {
        var localAdjust, offset = this._offset || 0;
        return null != input ? ("string" == typeof input && (input = offsetFromString(input)), 
        Math.abs(input) < 16 && (input = 60 * input), !this._isUTC && keepLocalTime && (localAdjust = getDateOffset(this)), 
        this._offset = input, this._isUTC = !0, null != localAdjust && this.add(localAdjust, "m"), 
        offset !== input && (!keepLocalTime || this._changeInProgress ? add_subtract__addSubtract(this, create__createDuration(input - offset, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0, 
        utils_hooks__hooks.updateOffset(this, !0), this._changeInProgress = null)), this) : this._isUTC ? offset : getDateOffset(this);
    }
    function getSetZone(input, keepLocalTime) {
        return null != input ? ("string" != typeof input && (input = -input), this.utcOffset(input, keepLocalTime), 
        this) : -this.utcOffset();
    }
    function setOffsetToUTC(keepLocalTime) {
        return this.utcOffset(0, keepLocalTime);
    }
    function setOffsetToLocal(keepLocalTime) {
        return this._isUTC && (this.utcOffset(0, keepLocalTime), this._isUTC = !1, keepLocalTime && this.subtract(getDateOffset(this), "m")), 
        this;
    }
    function setOffsetToParsedOffset() {
        return this._tzm ? this.utcOffset(this._tzm) : "string" == typeof this._i && this.utcOffset(offsetFromString(this._i)), 
        this;
    }
    function hasAlignedHourOffset(input) {
        return input = input ? local__createLocal(input).utcOffset() : 0, (this.utcOffset() - input) % 60 === 0;
    }
    function isDaylightSavingTime() {
        return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
    }
    function isDaylightSavingTimeShifted() {
        if ("undefined" != typeof this._isDSTShifted) return this._isDSTShifted;
        var c = {};
        if (copyConfig(c, this), c = prepareConfig(c), c._a) {
            var other = c._isUTC ? create_utc__createUTC(c._a) : local__createLocal(c._a);
            this._isDSTShifted = this.isValid() && compareArrays(c._a, other.toArray()) > 0;
        } else this._isDSTShifted = !1;
        return this._isDSTShifted;
    }
    function isLocal() {
        return !this._isUTC;
    }
    function isUtcOffset() {
        return this._isUTC;
    }
    function isUtc() {
        return this._isUTC && 0 === this._offset;
    }
    function create__createDuration(input, key) {
        var sign, ret, diffRes, duration = input, match = null;
        return isDuration(input) ? duration = {
            ms: input._milliseconds,
            d: input._days,
            M: input._months
        } : "number" == typeof input ? (duration = {}, key ? duration[key] = input : duration.milliseconds = input) : (match = aspNetRegex.exec(input)) ? (sign = "-" === match[1] ? -1 : 1, 
        duration = {
            y: 0,
            d: toInt(match[DATE]) * sign,
            h: toInt(match[HOUR]) * sign,
            m: toInt(match[MINUTE]) * sign,
            s: toInt(match[SECOND]) * sign,
            ms: toInt(match[MILLISECOND]) * sign
        }) : (match = create__isoRegex.exec(input)) ? (sign = "-" === match[1] ? -1 : 1, 
        duration = {
            y: parseIso(match[2], sign),
            M: parseIso(match[3], sign),
            d: parseIso(match[4], sign),
            h: parseIso(match[5], sign),
            m: parseIso(match[6], sign),
            s: parseIso(match[7], sign),
            w: parseIso(match[8], sign)
        }) : null == duration ? duration = {} : "object" == typeof duration && ("from" in duration || "to" in duration) && (diffRes = momentsDifference(local__createLocal(duration.from), local__createLocal(duration.to)), 
        duration = {}, duration.ms = diffRes.milliseconds, duration.M = diffRes.months), 
        ret = new Duration(duration), isDuration(input) && hasOwnProp(input, "_locale") && (ret._locale = input._locale), 
        ret;
    }
    function parseIso(inp, sign) {
        var res = inp && parseFloat(inp.replace(",", "."));
        return (isNaN(res) ? 0 : res) * sign;
    }
    function positiveMomentsDifference(base, other) {
        var res = {
            milliseconds: 0,
            months: 0
        };
        return res.months = other.month() - base.month() + 12 * (other.year() - base.year()), 
        base.clone().add(res.months, "M").isAfter(other) && --res.months, res.milliseconds = +other - +base.clone().add(res.months, "M"), 
        res;
    }
    function momentsDifference(base, other) {
        var res;
        return other = cloneWithOffset(other, base), base.isBefore(other) ? res = positiveMomentsDifference(base, other) : (res = positiveMomentsDifference(other, base), 
        res.milliseconds = -res.milliseconds, res.months = -res.months), res;
    }
    function createAdder(direction, name) {
        return function(val, period) {
            var dur, tmp;
            return null === period || isNaN(+period) || (deprecateSimple(name, "moment()." + name + "(period, number) is deprecated. Please use moment()." + name + "(number, period)."), 
            tmp = val, val = period, period = tmp), val = "string" == typeof val ? +val : val, 
            dur = create__createDuration(val, period), add_subtract__addSubtract(this, dur, direction), 
            this;
        };
    }
    function add_subtract__addSubtract(mom, duration, isAdding, updateOffset) {
        var milliseconds = duration._milliseconds, days = duration._days, months = duration._months;
        updateOffset = null == updateOffset ? !0 : updateOffset, milliseconds && mom._d.setTime(+mom._d + milliseconds * isAdding), 
        days && get_set__set(mom, "Date", get_set__get(mom, "Date") + days * isAdding), 
        months && setMonth(mom, get_set__get(mom, "Month") + months * isAdding), updateOffset && utils_hooks__hooks.updateOffset(mom, days || months);
    }
    function moment_calendar__calendar(time, formats) {
        var now = time || local__createLocal(), sod = cloneWithOffset(now, this).startOf("day"), diff = this.diff(sod, "days", !0), format = -6 > diff ? "sameElse" : -1 > diff ? "lastWeek" : 0 > diff ? "lastDay" : 1 > diff ? "sameDay" : 2 > diff ? "nextDay" : 7 > diff ? "nextWeek" : "sameElse";
        return this.format(formats && formats[format] || this.localeData().calendar(format, this, local__createLocal(now)));
    }
    function clone() {
        return new Moment(this);
    }
    function isAfter(input, units) {
        var inputMs;
        return units = normalizeUnits("undefined" != typeof units ? units : "millisecond"), 
        "millisecond" === units ? (input = isMoment(input) ? input : local__createLocal(input), 
        +this > +input) : (inputMs = isMoment(input) ? +input : +local__createLocal(input), 
        inputMs < +this.clone().startOf(units));
    }
    function isBefore(input, units) {
        var inputMs;
        return units = normalizeUnits("undefined" != typeof units ? units : "millisecond"), 
        "millisecond" === units ? (input = isMoment(input) ? input : local__createLocal(input), 
        +input > +this) : (inputMs = isMoment(input) ? +input : +local__createLocal(input), 
        +this.clone().endOf(units) < inputMs);
    }
    function isBetween(from, to, units) {
        return this.isAfter(from, units) && this.isBefore(to, units);
    }
    function isSame(input, units) {
        var inputMs;
        return units = normalizeUnits(units || "millisecond"), "millisecond" === units ? (input = isMoment(input) ? input : local__createLocal(input), 
        +this === +input) : (inputMs = +local__createLocal(input), +this.clone().startOf(units) <= inputMs && inputMs <= +this.clone().endOf(units));
    }
    function diff(input, units, asFloat) {
        var delta, output, that = cloneWithOffset(input, this), zoneDelta = 6e4 * (that.utcOffset() - this.utcOffset());
        return units = normalizeUnits(units), "year" === units || "month" === units || "quarter" === units ? (output = monthDiff(this, that), 
        "quarter" === units ? output /= 3 : "year" === units && (output /= 12)) : (delta = this - that, 
        output = "second" === units ? delta / 1e3 : "minute" === units ? delta / 6e4 : "hour" === units ? delta / 36e5 : "day" === units ? (delta - zoneDelta) / 864e5 : "week" === units ? (delta - zoneDelta) / 6048e5 : delta), 
        asFloat ? output : absFloor(output);
    }
    function monthDiff(a, b) {
        var anchor2, adjust, wholeMonthDiff = 12 * (b.year() - a.year()) + (b.month() - a.month()), anchor = a.clone().add(wholeMonthDiff, "months");
        return 0 > b - anchor ? (anchor2 = a.clone().add(wholeMonthDiff - 1, "months"), 
        adjust = (b - anchor) / (anchor - anchor2)) : (anchor2 = a.clone().add(wholeMonthDiff + 1, "months"), 
        adjust = (b - anchor) / (anchor2 - anchor)), -(wholeMonthDiff + adjust);
    }
    function toString() {
        return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
    }
    function moment_format__toISOString() {
        var m = this.clone().utc();
        return 0 < m.year() && m.year() <= 9999 ? "function" == typeof Date.prototype.toISOString ? this.toDate().toISOString() : formatMoment(m, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]") : formatMoment(m, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]");
    }
    function moment_format__format(inputString) {
        var output = formatMoment(this, inputString || utils_hooks__hooks.defaultFormat);
        return this.localeData().postformat(output);
    }
    function from(time, withoutSuffix) {
        return this.isValid() ? create__createDuration({
            to: this,
            from: time
        }).locale(this.locale()).humanize(!withoutSuffix) : this.localeData().invalidDate();
    }
    function fromNow(withoutSuffix) {
        return this.from(local__createLocal(), withoutSuffix);
    }
    function to(time, withoutSuffix) {
        return this.isValid() ? create__createDuration({
            from: this,
            to: time
        }).locale(this.locale()).humanize(!withoutSuffix) : this.localeData().invalidDate();
    }
    function toNow(withoutSuffix) {
        return this.to(local__createLocal(), withoutSuffix);
    }
    function locale(key) {
        var newLocaleData;
        return void 0 === key ? this._locale._abbr : (newLocaleData = locale_locales__getLocale(key), 
        null != newLocaleData && (this._locale = newLocaleData), this);
    }
    function localeData() {
        return this._locale;
    }
    function startOf(units) {
        switch (units = normalizeUnits(units)) {
          case "year":
            this.month(0);

          case "quarter":
          case "month":
            this.date(1);

          case "week":
          case "isoWeek":
          case "day":
            this.hours(0);

          case "hour":
            this.minutes(0);

          case "minute":
            this.seconds(0);

          case "second":
            this.milliseconds(0);
        }
        return "week" === units && this.weekday(0), "isoWeek" === units && this.isoWeekday(1), 
        "quarter" === units && this.month(3 * Math.floor(this.month() / 3)), this;
    }
    function endOf(units) {
        return units = normalizeUnits(units), void 0 === units || "millisecond" === units ? this : this.startOf(units).add(1, "isoWeek" === units ? "week" : units).subtract(1, "ms");
    }
    function to_type__valueOf() {
        return +this._d - 6e4 * (this._offset || 0);
    }
    function unix() {
        return Math.floor(+this / 1e3);
    }
    function toDate() {
        return this._offset ? new Date(+this) : this._d;
    }
    function toArray() {
        var m = this;
        return [ m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond() ];
    }
    function toObject() {
        var m = this;
        return {
            years: m.year(),
            months: m.month(),
            date: m.date(),
            hours: m.hours(),
            minutes: m.minutes(),
            seconds: m.seconds(),
            milliseconds: m.milliseconds()
        };
    }
    function moment_valid__isValid() {
        return valid__isValid(this);
    }
    function parsingFlags() {
        return extend({}, getParsingFlags(this));
    }
    function invalidAt() {
        return getParsingFlags(this).overflow;
    }
    function addWeekYearFormatToken(token, getter) {
        addFormatToken(0, [ token, token.length ], 0, getter);
    }
    function weeksInYear(year, dow, doy) {
        return weekOfYear(local__createLocal([ year, 11, 31 + dow - doy ]), dow, doy).week;
    }
    function getSetWeekYear(input) {
        var year = weekOfYear(this, this.localeData()._week.dow, this.localeData()._week.doy).year;
        return null == input ? year : this.add(input - year, "y");
    }
    function getSetISOWeekYear(input) {
        var year = weekOfYear(this, 1, 4).year;
        return null == input ? year : this.add(input - year, "y");
    }
    function getISOWeeksInYear() {
        return weeksInYear(this.year(), 1, 4);
    }
    function getWeeksInYear() {
        var weekInfo = this.localeData()._week;
        return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
    }
    function getSetQuarter(input) {
        return null == input ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (input - 1) + this.month() % 3);
    }
    function parseWeekday(input, locale) {
        return "string" != typeof input ? input : isNaN(input) ? (input = locale.weekdaysParse(input), 
        "number" == typeof input ? input : null) : parseInt(input, 10);
    }
    function localeWeekdays(m) {
        return this._weekdays[m.day()];
    }
    function localeWeekdaysShort(m) {
        return this._weekdaysShort[m.day()];
    }
    function localeWeekdaysMin(m) {
        return this._weekdaysMin[m.day()];
    }
    function localeWeekdaysParse(weekdayName) {
        var i, mom, regex;
        for (this._weekdaysParse = this._weekdaysParse || [], i = 0; 7 > i; i++) if (this._weekdaysParse[i] || (mom = local__createLocal([ 2e3, 1 ]).day(i), 
        regex = "^" + this.weekdays(mom, "") + "|^" + this.weekdaysShort(mom, "") + "|^" + this.weekdaysMin(mom, ""), 
        this._weekdaysParse[i] = new RegExp(regex.replace(".", ""), "i")), this._weekdaysParse[i].test(weekdayName)) return i;
    }
    function getSetDayOfWeek(input) {
        var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        return null != input ? (input = parseWeekday(input, this.localeData()), this.add(input - day, "d")) : day;
    }
    function getSetLocaleDayOfWeek(input) {
        var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
        return null == input ? weekday : this.add(input - weekday, "d");
    }
    function getSetISODayOfWeek(input) {
        return null == input ? this.day() || 7 : this.day(this.day() % 7 ? input : input - 7);
    }
    function meridiem(token, lowercase) {
        addFormatToken(token, 0, 0, function() {
            return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
        });
    }
    function matchMeridiem(isStrict, locale) {
        return locale._meridiemParse;
    }
    function localeIsPM(input) {
        return "p" === (input + "").toLowerCase().charAt(0);
    }
    function localeMeridiem(hours, minutes, isLower) {
        return hours > 11 ? isLower ? "pm" : "PM" : isLower ? "am" : "AM";
    }
    function parseMs(input, array) {
        array[MILLISECOND] = toInt(1e3 * ("0." + input));
    }
    function getZoneAbbr() {
        return this._isUTC ? "UTC" : "";
    }
    function getZoneName() {
        return this._isUTC ? "Coordinated Universal Time" : "";
    }
    function moment_moment__createUnix(input) {
        return local__createLocal(1e3 * input);
    }
    function moment_moment__createInZone() {
        return local__createLocal.apply(null, arguments).parseZone();
    }
    function locale_calendar__calendar(key, mom, now) {
        var output = this._calendar[key];
        return "function" == typeof output ? output.call(mom, now) : output;
    }
    function longDateFormat(key) {
        var format = this._longDateFormat[key], formatUpper = this._longDateFormat[key.toUpperCase()];
        return format || !formatUpper ? format : (this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function(val) {
            return val.slice(1);
        }), this._longDateFormat[key]);
    }
    function invalidDate() {
        return this._invalidDate;
    }
    function ordinal(number) {
        return this._ordinal.replace("%d", number);
    }
    function preParsePostFormat(string) {
        return string;
    }
    function relative__relativeTime(number, withoutSuffix, string, isFuture) {
        var output = this._relativeTime[string];
        return "function" == typeof output ? output(number, withoutSuffix, string, isFuture) : output.replace(/%d/i, number);
    }
    function pastFuture(diff, output) {
        var format = this._relativeTime[diff > 0 ? "future" : "past"];
        return "function" == typeof format ? format(output) : format.replace(/%s/i, output);
    }
    function locale_set__set(config) {
        var prop, i;
        for (i in config) prop = config[i], "function" == typeof prop ? this[i] = prop : this["_" + i] = prop;
        this._ordinalParseLenient = new RegExp(this._ordinalParse.source + "|" + /\d{1,2}/.source);
    }
    function lists__get(format, index, field, setter) {
        var locale = locale_locales__getLocale(), utc = create_utc__createUTC().set(setter, index);
        return locale[field](utc, format);
    }
    function list(format, index, field, count, setter) {
        if ("number" == typeof format && (index = format, format = void 0), format = format || "", 
        null != index) return lists__get(format, index, field, setter);
        var i, out = [];
        for (i = 0; count > i; i++) out[i] = lists__get(format, i, field, setter);
        return out;
    }
    function lists__listMonths(format, index) {
        return list(format, index, "months", 12, "month");
    }
    function lists__listMonthsShort(format, index) {
        return list(format, index, "monthsShort", 12, "month");
    }
    function lists__listWeekdays(format, index) {
        return list(format, index, "weekdays", 7, "day");
    }
    function lists__listWeekdaysShort(format, index) {
        return list(format, index, "weekdaysShort", 7, "day");
    }
    function lists__listWeekdaysMin(format, index) {
        return list(format, index, "weekdaysMin", 7, "day");
    }
    function duration_abs__abs() {
        var data = this._data;
        return this._milliseconds = mathAbs(this._milliseconds), this._days = mathAbs(this._days), 
        this._months = mathAbs(this._months), data.milliseconds = mathAbs(data.milliseconds), 
        data.seconds = mathAbs(data.seconds), data.minutes = mathAbs(data.minutes), data.hours = mathAbs(data.hours), 
        data.months = mathAbs(data.months), data.years = mathAbs(data.years), this;
    }
    function duration_add_subtract__addSubtract(duration, input, value, direction) {
        var other = create__createDuration(input, value);
        return duration._milliseconds += direction * other._milliseconds, duration._days += direction * other._days, 
        duration._months += direction * other._months, duration._bubble();
    }
    function duration_add_subtract__add(input, value) {
        return duration_add_subtract__addSubtract(this, input, value, 1);
    }
    function duration_add_subtract__subtract(input, value) {
        return duration_add_subtract__addSubtract(this, input, value, -1);
    }
    function absCeil(number) {
        return 0 > number ? Math.floor(number) : Math.ceil(number);
    }
    function bubble() {
        var seconds, minutes, hours, years, monthsFromDays, milliseconds = this._milliseconds, days = this._days, months = this._months, data = this._data;
        return milliseconds >= 0 && days >= 0 && months >= 0 || 0 >= milliseconds && 0 >= days && 0 >= months || (milliseconds += 864e5 * absCeil(monthsToDays(months) + days), 
        days = 0, months = 0), data.milliseconds = milliseconds % 1e3, seconds = absFloor(milliseconds / 1e3), 
        data.seconds = seconds % 60, minutes = absFloor(seconds / 60), data.minutes = minutes % 60, 
        hours = absFloor(minutes / 60), data.hours = hours % 24, days += absFloor(hours / 24), 
        monthsFromDays = absFloor(daysToMonths(days)), months += monthsFromDays, days -= absCeil(monthsToDays(monthsFromDays)), 
        years = absFloor(months / 12), months %= 12, data.days = days, data.months = months, 
        data.years = years, this;
    }
    function daysToMonths(days) {
        return 4800 * days / 146097;
    }
    function monthsToDays(months) {
        return 146097 * months / 4800;
    }
    function as(units) {
        var days, months, milliseconds = this._milliseconds;
        if (units = normalizeUnits(units), "month" === units || "year" === units) return days = this._days + milliseconds / 864e5, 
        months = this._months + daysToMonths(days), "month" === units ? months : months / 12;
        switch (days = this._days + Math.round(monthsToDays(this._months)), units) {
          case "week":
            return days / 7 + milliseconds / 6048e5;

          case "day":
            return days + milliseconds / 864e5;

          case "hour":
            return 24 * days + milliseconds / 36e5;

          case "minute":
            return 1440 * days + milliseconds / 6e4;

          case "second":
            return 86400 * days + milliseconds / 1e3;

          case "millisecond":
            return Math.floor(864e5 * days) + milliseconds;

          default:
            throw new Error("Unknown unit " + units);
        }
    }
    function duration_as__valueOf() {
        return this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * toInt(this._months / 12);
    }
    function makeAs(alias) {
        return function() {
            return this.as(alias);
        };
    }
    function duration_get__get(units) {
        return units = normalizeUnits(units), this[units + "s"]();
    }
    function makeGetter(name) {
        return function() {
            return this._data[name];
        };
    }
    function weeks() {
        return absFloor(this.days() / 7);
    }
    function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
        return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
    }
    function duration_humanize__relativeTime(posNegDuration, withoutSuffix, locale) {
        var duration = create__createDuration(posNegDuration).abs(), seconds = round(duration.as("s")), minutes = round(duration.as("m")), hours = round(duration.as("h")), days = round(duration.as("d")), months = round(duration.as("M")), years = round(duration.as("y")), a = seconds < thresholds.s && [ "s", seconds ] || 1 === minutes && [ "m" ] || minutes < thresholds.m && [ "mm", minutes ] || 1 === hours && [ "h" ] || hours < thresholds.h && [ "hh", hours ] || 1 === days && [ "d" ] || days < thresholds.d && [ "dd", days ] || 1 === months && [ "M" ] || months < thresholds.M && [ "MM", months ] || 1 === years && [ "y" ] || [ "yy", years ];
        return a[2] = withoutSuffix, a[3] = +posNegDuration > 0, a[4] = locale, substituteTimeAgo.apply(null, a);
    }
    function duration_humanize__getSetRelativeTimeThreshold(threshold, limit) {
        return void 0 === thresholds[threshold] ? !1 : void 0 === limit ? thresholds[threshold] : (thresholds[threshold] = limit, 
        !0);
    }
    function humanize(withSuffix) {
        var locale = this.localeData(), output = duration_humanize__relativeTime(this, !withSuffix, locale);
        return withSuffix && (output = locale.pastFuture(+this, output)), locale.postformat(output);
    }
    function iso_string__toISOString() {
        var minutes, hours, years, seconds = iso_string__abs(this._milliseconds) / 1e3, days = iso_string__abs(this._days), months = iso_string__abs(this._months);
        minutes = absFloor(seconds / 60), hours = absFloor(minutes / 60), seconds %= 60, 
        minutes %= 60, years = absFloor(months / 12), months %= 12;
        var Y = years, M = months, D = days, h = hours, m = minutes, s = seconds, total = this.asSeconds();
        return total ? (0 > total ? "-" : "") + "P" + (Y ? Y + "Y" : "") + (M ? M + "M" : "") + (D ? D + "D" : "") + (h || m || s ? "T" : "") + (h ? h + "H" : "") + (m ? m + "M" : "") + (s ? s + "S" : "") : "P0D";
    }
    function cs__plural(n) {
        return n > 1 && 5 > n && 1 !== ~~(n / 10);
    }
    function cs__translate(number, withoutSuffix, key, isFuture) {
        var result = number + " ";
        switch (key) {
          case "s":
            return withoutSuffix || isFuture ? "pár sekund" : "pár sekundami";

          case "m":
            return withoutSuffix ? "minuta" : isFuture ? "minutu" : "minutou";

          case "mm":
            return withoutSuffix || isFuture ? result + (cs__plural(number) ? "minuty" : "minut") : result + "minutami";

          case "h":
            return withoutSuffix ? "hodina" : isFuture ? "hodinu" : "hodinou";

          case "hh":
            return withoutSuffix || isFuture ? result + (cs__plural(number) ? "hodiny" : "hodin") : result + "hodinami";

          case "d":
            return withoutSuffix || isFuture ? "den" : "dnem";

          case "dd":
            return withoutSuffix || isFuture ? result + (cs__plural(number) ? "dny" : "dní") : result + "dny";

          case "M":
            return withoutSuffix || isFuture ? "měsíc" : "měsícem";

          case "MM":
            return withoutSuffix || isFuture ? result + (cs__plural(number) ? "měsíce" : "měsíců") : result + "měsíci";

          case "y":
            return withoutSuffix || isFuture ? "rok" : "rokem";

          case "yy":
            return withoutSuffix || isFuture ? result + (cs__plural(number) ? "roky" : "let") : result + "lety";
        }
    }
    function de__processRelativeTime(number, withoutSuffix, key, isFuture) {
        var format = {
            m: [ "eine Minute", "einer Minute" ],
            h: [ "eine Stunde", "einer Stunde" ],
            d: [ "ein Tag", "einem Tag" ],
            dd: [ number + " Tage", number + " Tagen" ],
            M: [ "ein Monat", "einem Monat" ],
            MM: [ number + " Monate", number + " Monaten" ],
            y: [ "ein Jahr", "einem Jahr" ],
            yy: [ number + " Jahre", number + " Jahren" ]
        };
        return withoutSuffix ? format[key][0] : format[key][1];
    }
    function fi__translate(number, withoutSuffix, key, isFuture) {
        var result = "";
        switch (key) {
          case "s":
            return isFuture ? "muutaman sekunnin" : "muutama sekunti";

          case "m":
            return isFuture ? "minuutin" : "minuutti";

          case "mm":
            result = isFuture ? "minuutin" : "minuuttia";
            break;

          case "h":
            return isFuture ? "tunnin" : "tunti";

          case "hh":
            result = isFuture ? "tunnin" : "tuntia";
            break;

          case "d":
            return isFuture ? "päivän" : "päivä";

          case "dd":
            result = isFuture ? "päivän" : "päivää";
            break;

          case "M":
            return isFuture ? "kuukauden" : "kuukausi";

          case "MM":
            result = isFuture ? "kuukauden" : "kuukautta";
            break;

          case "y":
            return isFuture ? "vuoden" : "vuosi";

          case "yy":
            result = isFuture ? "vuoden" : "vuotta";
        }
        return result = verbalNumber(number, isFuture) + " " + result;
    }
    function verbalNumber(number, isFuture) {
        return 10 > number ? isFuture ? numbersFuture[number] : numbersPast[number] : number;
    }
    function hu__translate(number, withoutSuffix, key, isFuture) {
        var num = number;
        switch (key) {
          case "s":
            return isFuture || withoutSuffix ? "néhány másodperc" : "néhány másodperce";

          case "m":
            return "egy" + (isFuture || withoutSuffix ? " perc" : " perce");

          case "mm":
            return num + (isFuture || withoutSuffix ? " perc" : " perce");

          case "h":
            return "egy" + (isFuture || withoutSuffix ? " óra" : " órája");

          case "hh":
            return num + (isFuture || withoutSuffix ? " óra" : " órája");

          case "d":
            return "egy" + (isFuture || withoutSuffix ? " nap" : " napja");

          case "dd":
            return num + (isFuture || withoutSuffix ? " nap" : " napja");

          case "M":
            return "egy" + (isFuture || withoutSuffix ? " hónap" : " hónapja");

          case "MM":
            return num + (isFuture || withoutSuffix ? " hónap" : " hónapja");

          case "y":
            return "egy" + (isFuture || withoutSuffix ? " év" : " éve");

          case "yy":
            return num + (isFuture || withoutSuffix ? " év" : " éve");
        }
        return "";
    }
    function week(isFuture) {
        return (isFuture ? "" : "[múlt] ") + "[" + weekEndings[this.day()] + "] LT[-kor]";
    }
    function lb__processRelativeTime(number, withoutSuffix, key, isFuture) {
        var format = {
            m: [ "eng Minutt", "enger Minutt" ],
            h: [ "eng Stonn", "enger Stonn" ],
            d: [ "een Dag", "engem Dag" ],
            M: [ "ee Mount", "engem Mount" ],
            y: [ "ee Joer", "engem Joer" ]
        };
        return withoutSuffix ? format[key][0] : format[key][1];
    }
    function processFutureTime(string) {
        var number = string.substr(0, string.indexOf(" "));
        return eifelerRegelAppliesToNumber(number) ? "a " + string : "an " + string;
    }
    function processPastTime(string) {
        var number = string.substr(0, string.indexOf(" "));
        return eifelerRegelAppliesToNumber(number) ? "viru " + string : "virun " + string;
    }
    function eifelerRegelAppliesToNumber(number) {
        if (number = parseInt(number, 10), isNaN(number)) return !1;
        if (0 > number) return !0;
        if (10 > number) return number >= 4 && 7 >= number ? !0 : !1;
        if (100 > number) {
            var lastDigit = number % 10, firstDigit = number / 10;
            return eifelerRegelAppliesToNumber(0 === lastDigit ? firstDigit : lastDigit);
        }
        if (1e4 > number) {
            for (;number >= 10; ) number /= 10;
            return eifelerRegelAppliesToNumber(number);
        }
        return number /= 1e3, eifelerRegelAppliesToNumber(number);
    }
    function translateSeconds(number, withoutSuffix, key, isFuture) {
        return withoutSuffix ? "kelios sekundės" : isFuture ? "kelių sekundžių" : "kelias sekundes";
    }
    function lt__monthsCaseReplace(m, format) {
        var months = {
            nominative: "sausis_vasaris_kovas_balandis_gegužė_birželis_liepa_rugpjūtis_rugsėjis_spalis_lapkritis_gruodis".split("_"),
            accusative: "sausio_vasario_kovo_balandžio_gegužės_birželio_liepos_rugpjūčio_rugsėjo_spalio_lapkričio_gruodžio".split("_")
        }, nounCase = /D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/.test(format) ? "accusative" : "nominative";
        return months[nounCase][m.month()];
    }
    function translateSingular(number, withoutSuffix, key, isFuture) {
        return withoutSuffix ? forms(key)[0] : isFuture ? forms(key)[1] : forms(key)[2];
    }
    function special(number) {
        return number % 10 === 0 || number > 10 && 20 > number;
    }
    function forms(key) {
        return lt__units[key].split("_");
    }
    function lt__translate(number, withoutSuffix, key, isFuture) {
        var result = number + " ";
        return 1 === number ? result + translateSingular(number, withoutSuffix, key[0], isFuture) : withoutSuffix ? result + (special(number) ? forms(key)[1] : forms(key)[0]) : isFuture ? result + forms(key)[1] : result + (special(number) ? forms(key)[1] : forms(key)[2]);
    }
    function relativeWeekDay(moment, format) {
        var nominative = -1 === format.indexOf("dddd HH:mm"), weekDay = weekDays[moment.day()];
        return nominative ? weekDay : weekDay.substring(0, weekDay.length - 2) + "į";
    }
    function pl__plural(n) {
        return 5 > n % 10 && n % 10 > 1 && ~~(n / 10) % 10 !== 1;
    }
    function pl__translate(number, withoutSuffix, key) {
        var result = number + " ";
        switch (key) {
          case "m":
            return withoutSuffix ? "minuta" : "minutę";

          case "mm":
            return result + (pl__plural(number) ? "minuty" : "minut");

          case "h":
            return withoutSuffix ? "godzina" : "godzinę";

          case "hh":
            return result + (pl__plural(number) ? "godziny" : "godzin");

          case "MM":
            return result + (pl__plural(number) ? "miesiące" : "miesięcy");

          case "yy":
            return result + (pl__plural(number) ? "lata" : "lat");
        }
    }
    function ro__relativeTimeWithPlural(number, withoutSuffix, key) {
        var format = {
            mm: "minute",
            hh: "ore",
            dd: "zile",
            MM: "luni",
            yy: "ani"
        }, separator = " ";
        return (number % 100 >= 20 || number >= 100 && number % 100 === 0) && (separator = " de "), 
        number + separator + format[key];
    }
    function ru__plural(word, num) {
        var forms = word.split("_");
        return num % 10 === 1 && num % 100 !== 11 ? forms[0] : num % 10 >= 2 && 4 >= num % 10 && (10 > num % 100 || num % 100 >= 20) ? forms[1] : forms[2];
    }
    function ru__relativeTimeWithPlural(number, withoutSuffix, key) {
        var format = {
            mm: withoutSuffix ? "минута_минуты_минут" : "минуту_минуты_минут",
            hh: "час_часа_часов",
            dd: "день_дня_дней",
            MM: "месяц_месяца_месяцев",
            yy: "год_года_лет"
        };
        return "m" === key ? withoutSuffix ? "минута" : "минуту" : number + " " + ru__plural(format[key], +number);
    }
    function ru__monthsCaseReplace(m, format) {
        var months = {
            nominative: "январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь".split("_"),
            accusative: "января_февраля_марта_апреля_мая_июня_июля_августа_сентября_октября_ноября_декабря".split("_")
        }, nounCase = /D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/.test(format) ? "accusative" : "nominative";
        return months[nounCase][m.month()];
    }
    function ru__monthsShortCaseReplace(m, format) {
        var monthsShort = {
            nominative: "янв_фев_март_апр_май_июнь_июль_авг_сен_окт_ноя_дек".split("_"),
            accusative: "янв_фев_мар_апр_мая_июня_июля_авг_сен_окт_ноя_дек".split("_")
        }, nounCase = /D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/.test(format) ? "accusative" : "nominative";
        return monthsShort[nounCase][m.month()];
    }
    function ru__weekdaysCaseReplace(m, format) {
        var weekdays = {
            nominative: "воскресенье_понедельник_вторник_среда_четверг_пятница_суббота".split("_"),
            accusative: "воскресенье_понедельник_вторник_среду_четверг_пятницу_субботу".split("_")
        }, nounCase = /\[ ?[Вв] ?(?:прошлую|следующую|эту)? ?\] ?dddd/.test(format) ? "accusative" : "nominative";
        return weekdays[nounCase][m.day()];
    }
    function sl__processRelativeTime(number, withoutSuffix, key, isFuture) {
        var result = number + " ";
        switch (key) {
          case "s":
            return withoutSuffix || isFuture ? "nekaj sekund" : "nekaj sekundami";

          case "m":
            return withoutSuffix ? "ena minuta" : "eno minuto";

          case "mm":
            return result += 1 === number ? withoutSuffix ? "minuta" : "minuto" : 2 === number ? withoutSuffix || isFuture ? "minuti" : "minutama" : 5 > number ? withoutSuffix || isFuture ? "minute" : "minutami" : withoutSuffix || isFuture ? "minut" : "minutami";

          case "h":
            return withoutSuffix ? "ena ura" : "eno uro";

          case "hh":
            return result += 1 === number ? withoutSuffix ? "ura" : "uro" : 2 === number ? withoutSuffix || isFuture ? "uri" : "urama" : 5 > number ? withoutSuffix || isFuture ? "ure" : "urami" : withoutSuffix || isFuture ? "ur" : "urami";

          case "d":
            return withoutSuffix || isFuture ? "en dan" : "enim dnem";

          case "dd":
            return result += 1 === number ? withoutSuffix || isFuture ? "dan" : "dnem" : 2 === number ? withoutSuffix || isFuture ? "dni" : "dnevoma" : withoutSuffix || isFuture ? "dni" : "dnevi";

          case "M":
            return withoutSuffix || isFuture ? "en mesec" : "enim mesecem";

          case "MM":
            return result += 1 === number ? withoutSuffix || isFuture ? "mesec" : "mesecem" : 2 === number ? withoutSuffix || isFuture ? "meseca" : "mesecema" : 5 > number ? withoutSuffix || isFuture ? "mesece" : "meseci" : withoutSuffix || isFuture ? "mesecev" : "meseci";

          case "y":
            return withoutSuffix || isFuture ? "eno leto" : "enim letom";

          case "yy":
            return result += 1 === number ? withoutSuffix || isFuture ? "leto" : "letom" : 2 === number ? withoutSuffix || isFuture ? "leti" : "letoma" : 5 > number ? withoutSuffix || isFuture ? "leta" : "leti" : withoutSuffix || isFuture ? "let" : "leti";
        }
    }
    function uk__plural(word, num) {
        var forms = word.split("_");
        return num % 10 === 1 && num % 100 !== 11 ? forms[0] : num % 10 >= 2 && 4 >= num % 10 && (10 > num % 100 || num % 100 >= 20) ? forms[1] : forms[2];
    }
    function uk__relativeTimeWithPlural(number, withoutSuffix, key) {
        var format = {
            mm: "хвилина_хвилини_хвилин",
            hh: "година_години_годин",
            dd: "день_дні_днів",
            MM: "місяць_місяці_місяців",
            yy: "рік_роки_років"
        };
        return "m" === key ? withoutSuffix ? "хвилина" : "хвилину" : "h" === key ? withoutSuffix ? "година" : "годину" : number + " " + uk__plural(format[key], +number);
    }
    function uk__monthsCaseReplace(m, format) {
        var months = {
            nominative: "січень_лютий_березень_квітень_травень_червень_липень_серпень_вересень_жовтень_листопад_грудень".split("_"),
            accusative: "січня_лютого_березня_квітня_травня_червня_липня_серпня_вересня_жовтня_листопада_грудня".split("_")
        }, nounCase = /D[oD]? *MMMM?/.test(format) ? "accusative" : "nominative";
        return months[nounCase][m.month()];
    }
    function uk__weekdaysCaseReplace(m, format) {
        var weekdays = {
            nominative: "неділя_понеділок_вівторок_середа_четвер_п’ятниця_субота".split("_"),
            accusative: "неділю_понеділок_вівторок_середу_четвер_п’ятницю_суботу".split("_"),
            genitive: "неділі_понеділка_вівторка_середи_четверга_п’ятниці_суботи".split("_")
        }, nounCase = /(\[[ВвУу]\]) ?dddd/.test(format) ? "accusative" : /\[?(?:минулої|наступної)? ?\] ?dddd/.test(format) ? "genitive" : "nominative";
        return weekdays[nounCase][m.day()];
    }
    function processHoursFunction(str) {
        return function() {
            return str + "о" + (11 === this.hours() ? "б" : "") + "] LT";
        };
    }
    var hookCallback, globalLocale, momentProperties = utils_hooks__hooks.momentProperties = [], updateInProgress = !1, locales = {}, aliases = {}, formattingTokens = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g, localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, formatFunctions = {}, formatTokenFunctions = {}, match1 = /\d/, match2 = /\d\d/, match3 = /\d{3}/, match4 = /\d{4}/, match6 = /[+-]?\d{6}/, match1to2 = /\d\d?/, match1to3 = /\d{1,3}/, match1to4 = /\d{1,4}/, match1to6 = /[+-]?\d{1,6}/, matchUnsigned = /\d+/, matchSigned = /[+-]?\d+/, matchOffset = /Z|[+-]\d\d:?\d\d/gi, matchTimestamp = /[+-]?\d+(\.\d{1,3})?/, matchWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, regexes = {}, tokens = {}, YEAR = 0, MONTH = 1, DATE = 2, HOUR = 3, MINUTE = 4, SECOND = 5, MILLISECOND = 6;
    addFormatToken("M", [ "MM", 2 ], "Mo", function() {
        return this.month() + 1;
    }), addFormatToken("MMM", 0, 0, function(format) {
        return this.localeData().monthsShort(this, format);
    }), addFormatToken("MMMM", 0, 0, function(format) {
        return this.localeData().months(this, format);
    }), addUnitAlias("month", "M"), addRegexToken("M", match1to2), addRegexToken("MM", match1to2, match2), 
    addRegexToken("MMM", matchWord), addRegexToken("MMMM", matchWord), addParseToken([ "M", "MM" ], function(input, array) {
        array[MONTH] = toInt(input) - 1;
    }), addParseToken([ "MMM", "MMMM" ], function(input, array, config, token) {
        var month = config._locale.monthsParse(input, token, config._strict);
        null != month ? array[MONTH] = month : getParsingFlags(config).invalidMonth = input;
    });
    var defaultLocaleMonths = "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), defaultLocaleMonthsShort = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), deprecations = {};
    utils_hooks__hooks.suppressDeprecationWarnings = !1;
    var from_string__isoRegex = /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/, isoDates = [ [ "YYYYYY-MM-DD", /[+-]\d{6}-\d{2}-\d{2}/ ], [ "YYYY-MM-DD", /\d{4}-\d{2}-\d{2}/ ], [ "GGGG-[W]WW-E", /\d{4}-W\d{2}-\d/ ], [ "GGGG-[W]WW", /\d{4}-W\d{2}/ ], [ "YYYY-DDD", /\d{4}-\d{3}/ ] ], isoTimes = [ [ "HH:mm:ss.SSSS", /(T| )\d\d:\d\d:\d\d\.\d+/ ], [ "HH:mm:ss", /(T| )\d\d:\d\d:\d\d/ ], [ "HH:mm", /(T| )\d\d:\d\d/ ], [ "HH", /(T| )\d\d/ ] ], aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;
    utils_hooks__hooks.createFromInputFallback = deprecate("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.", function(config) {
        config._d = new Date(config._i + (config._useUTC ? " UTC" : ""));
    }), addFormatToken(0, [ "YY", 2 ], 0, function() {
        return this.year() % 100;
    }), addFormatToken(0, [ "YYYY", 4 ], 0, "year"), addFormatToken(0, [ "YYYYY", 5 ], 0, "year"), 
    addFormatToken(0, [ "YYYYYY", 6, !0 ], 0, "year"), addUnitAlias("year", "y"), addRegexToken("Y", matchSigned), 
    addRegexToken("YY", match1to2, match2), addRegexToken("YYYY", match1to4, match4), 
    addRegexToken("YYYYY", match1to6, match6), addRegexToken("YYYYYY", match1to6, match6), 
    addParseToken([ "YYYYY", "YYYYYY" ], YEAR), addParseToken("YYYY", function(input, array) {
        array[YEAR] = 2 === input.length ? utils_hooks__hooks.parseTwoDigitYear(input) : toInt(input);
    }), addParseToken("YY", function(input, array) {
        array[YEAR] = utils_hooks__hooks.parseTwoDigitYear(input);
    }), utils_hooks__hooks.parseTwoDigitYear = function(input) {
        return toInt(input) + (toInt(input) > 68 ? 1900 : 2e3);
    };
    var getSetYear = makeGetSet("FullYear", !1);
    addFormatToken("w", [ "ww", 2 ], "wo", "week"), addFormatToken("W", [ "WW", 2 ], "Wo", "isoWeek"), 
    addUnitAlias("week", "w"), addUnitAlias("isoWeek", "W"), addRegexToken("w", match1to2), 
    addRegexToken("ww", match1to2, match2), addRegexToken("W", match1to2), addRegexToken("WW", match1to2, match2), 
    addWeekParseToken([ "w", "ww", "W", "WW" ], function(input, week, config, token) {
        week[token.substr(0, 1)] = toInt(input);
    });
    var defaultLocaleWeek = {
        dow: 0,
        doy: 6
    };
    addFormatToken("DDD", [ "DDDD", 3 ], "DDDo", "dayOfYear"), addUnitAlias("dayOfYear", "DDD"), 
    addRegexToken("DDD", match1to3), addRegexToken("DDDD", match3), addParseToken([ "DDD", "DDDD" ], function(input, array, config) {
        config._dayOfYear = toInt(input);
    }), utils_hooks__hooks.ISO_8601 = function() {};
    var prototypeMin = deprecate("moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548", function() {
        var other = local__createLocal.apply(null, arguments);
        return this > other ? this : other;
    }), prototypeMax = deprecate("moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548", function() {
        var other = local__createLocal.apply(null, arguments);
        return other > this ? this : other;
    });
    offset("Z", ":"), offset("ZZ", ""), addRegexToken("Z", matchOffset), addRegexToken("ZZ", matchOffset), 
    addParseToken([ "Z", "ZZ" ], function(input, array, config) {
        config._useUTC = !0, config._tzm = offsetFromString(input);
    });
    var chunkOffset = /([\+\-]|\d\d)/gi;
    utils_hooks__hooks.updateOffset = function() {};
    var aspNetRegex = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/, create__isoRegex = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/;
    create__createDuration.fn = Duration.prototype;
    var add_subtract__add = createAdder(1, "add"), add_subtract__subtract = createAdder(-1, "subtract");
    utils_hooks__hooks.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
    var lang = deprecate("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function(key) {
        return void 0 === key ? this.localeData() : this.locale(key);
    });
    addFormatToken(0, [ "gg", 2 ], 0, function() {
        return this.weekYear() % 100;
    }), addFormatToken(0, [ "GG", 2 ], 0, function() {
        return this.isoWeekYear() % 100;
    }), addWeekYearFormatToken("gggg", "weekYear"), addWeekYearFormatToken("ggggg", "weekYear"), 
    addWeekYearFormatToken("GGGG", "isoWeekYear"), addWeekYearFormatToken("GGGGG", "isoWeekYear"), 
    addUnitAlias("weekYear", "gg"), addUnitAlias("isoWeekYear", "GG"), addRegexToken("G", matchSigned), 
    addRegexToken("g", matchSigned), addRegexToken("GG", match1to2, match2), addRegexToken("gg", match1to2, match2), 
    addRegexToken("GGGG", match1to4, match4), addRegexToken("gggg", match1to4, match4), 
    addRegexToken("GGGGG", match1to6, match6), addRegexToken("ggggg", match1to6, match6), 
    addWeekParseToken([ "gggg", "ggggg", "GGGG", "GGGGG" ], function(input, week, config, token) {
        week[token.substr(0, 2)] = toInt(input);
    }), addWeekParseToken([ "gg", "GG" ], function(input, week, config, token) {
        week[token] = utils_hooks__hooks.parseTwoDigitYear(input);
    }), addFormatToken("Q", 0, 0, "quarter"), addUnitAlias("quarter", "Q"), addRegexToken("Q", match1), 
    addParseToken("Q", function(input, array) {
        array[MONTH] = 3 * (toInt(input) - 1);
    }), addFormatToken("D", [ "DD", 2 ], "Do", "date"), addUnitAlias("date", "D"), addRegexToken("D", match1to2), 
    addRegexToken("DD", match1to2, match2), addRegexToken("Do", function(isStrict, locale) {
        return isStrict ? locale._ordinalParse : locale._ordinalParseLenient;
    }), addParseToken([ "D", "DD" ], DATE), addParseToken("Do", function(input, array) {
        array[DATE] = toInt(input.match(match1to2)[0], 10);
    });
    var getSetDayOfMonth = makeGetSet("Date", !0);
    addFormatToken("d", 0, "do", "day"), addFormatToken("dd", 0, 0, function(format) {
        return this.localeData().weekdaysMin(this, format);
    }), addFormatToken("ddd", 0, 0, function(format) {
        return this.localeData().weekdaysShort(this, format);
    }), addFormatToken("dddd", 0, 0, function(format) {
        return this.localeData().weekdays(this, format);
    }), addFormatToken("e", 0, 0, "weekday"), addFormatToken("E", 0, 0, "isoWeekday"), 
    addUnitAlias("day", "d"), addUnitAlias("weekday", "e"), addUnitAlias("isoWeekday", "E"), 
    addRegexToken("d", match1to2), addRegexToken("e", match1to2), addRegexToken("E", match1to2), 
    addRegexToken("dd", matchWord), addRegexToken("ddd", matchWord), addRegexToken("dddd", matchWord), 
    addWeekParseToken([ "dd", "ddd", "dddd" ], function(input, week, config) {
        var weekday = config._locale.weekdaysParse(input);
        null != weekday ? week.d = weekday : getParsingFlags(config).invalidWeekday = input;
    }), addWeekParseToken([ "d", "e", "E" ], function(input, week, config, token) {
        week[token] = toInt(input);
    });
    var defaultLocaleWeekdays = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), defaultLocaleWeekdaysShort = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), defaultLocaleWeekdaysMin = "Su_Mo_Tu_We_Th_Fr_Sa".split("_");
    addFormatToken("H", [ "HH", 2 ], 0, "hour"), addFormatToken("h", [ "hh", 2 ], 0, function() {
        return this.hours() % 12 || 12;
    }), meridiem("a", !0), meridiem("A", !1), addUnitAlias("hour", "h"), addRegexToken("a", matchMeridiem), 
    addRegexToken("A", matchMeridiem), addRegexToken("H", match1to2), addRegexToken("h", match1to2), 
    addRegexToken("HH", match1to2, match2), addRegexToken("hh", match1to2, match2), 
    addParseToken([ "H", "HH" ], HOUR), addParseToken([ "a", "A" ], function(input, array, config) {
        config._isPm = config._locale.isPM(input), config._meridiem = input;
    }), addParseToken([ "h", "hh" ], function(input, array, config) {
        array[HOUR] = toInt(input), getParsingFlags(config).bigHour = !0;
    });
    var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i, getSetHour = makeGetSet("Hours", !0);
    addFormatToken("m", [ "mm", 2 ], 0, "minute"), addUnitAlias("minute", "m"), addRegexToken("m", match1to2), 
    addRegexToken("mm", match1to2, match2), addParseToken([ "m", "mm" ], MINUTE);
    var getSetMinute = makeGetSet("Minutes", !1);
    addFormatToken("s", [ "ss", 2 ], 0, "second"), addUnitAlias("second", "s"), addRegexToken("s", match1to2), 
    addRegexToken("ss", match1to2, match2), addParseToken([ "s", "ss" ], SECOND);
    var getSetSecond = makeGetSet("Seconds", !1);
    addFormatToken("S", 0, 0, function() {
        return ~~(this.millisecond() / 100);
    }), addFormatToken(0, [ "SS", 2 ], 0, function() {
        return ~~(this.millisecond() / 10);
    }), addFormatToken(0, [ "SSS", 3 ], 0, "millisecond"), addFormatToken(0, [ "SSSS", 4 ], 0, function() {
        return 10 * this.millisecond();
    }), addFormatToken(0, [ "SSSSS", 5 ], 0, function() {
        return 100 * this.millisecond();
    }), addFormatToken(0, [ "SSSSSS", 6 ], 0, function() {
        return 1e3 * this.millisecond();
    }), addFormatToken(0, [ "SSSSSSS", 7 ], 0, function() {
        return 1e4 * this.millisecond();
    }), addFormatToken(0, [ "SSSSSSSS", 8 ], 0, function() {
        return 1e5 * this.millisecond();
    }), addFormatToken(0, [ "SSSSSSSSS", 9 ], 0, function() {
        return 1e6 * this.millisecond();
    }), addUnitAlias("millisecond", "ms"), addRegexToken("S", match1to3, match1), addRegexToken("SS", match1to3, match2), 
    addRegexToken("SSS", match1to3, match3);
    var token;
    for (token = "SSSS"; token.length <= 9; token += "S") addRegexToken(token, matchUnsigned);
    for (token = "S"; token.length <= 9; token += "S") addParseToken(token, parseMs);
    var getSetMillisecond = makeGetSet("Milliseconds", !1);
    addFormatToken("z", 0, 0, "zoneAbbr"), addFormatToken("zz", 0, 0, "zoneName");
    var momentPrototype__proto = Moment.prototype;
    momentPrototype__proto.add = add_subtract__add, momentPrototype__proto.calendar = moment_calendar__calendar, 
    momentPrototype__proto.clone = clone, momentPrototype__proto.diff = diff, momentPrototype__proto.endOf = endOf, 
    momentPrototype__proto.format = moment_format__format, momentPrototype__proto.from = from, 
    momentPrototype__proto.fromNow = fromNow, momentPrototype__proto.to = to, momentPrototype__proto.toNow = toNow, 
    momentPrototype__proto.get = getSet, momentPrototype__proto.invalidAt = invalidAt, 
    momentPrototype__proto.isAfter = isAfter, momentPrototype__proto.isBefore = isBefore, 
    momentPrototype__proto.isBetween = isBetween, momentPrototype__proto.isSame = isSame, 
    momentPrototype__proto.isValid = moment_valid__isValid, momentPrototype__proto.lang = lang, 
    momentPrototype__proto.locale = locale, momentPrototype__proto.localeData = localeData, 
    momentPrototype__proto.max = prototypeMax, momentPrototype__proto.min = prototypeMin, 
    momentPrototype__proto.parsingFlags = parsingFlags, momentPrototype__proto.set = getSet, 
    momentPrototype__proto.startOf = startOf, momentPrototype__proto.subtract = add_subtract__subtract, 
    momentPrototype__proto.toArray = toArray, momentPrototype__proto.toObject = toObject, 
    momentPrototype__proto.toDate = toDate, momentPrototype__proto.toISOString = moment_format__toISOString, 
    momentPrototype__proto.toJSON = moment_format__toISOString, momentPrototype__proto.toString = toString, 
    momentPrototype__proto.unix = unix, momentPrototype__proto.valueOf = to_type__valueOf, 
    momentPrototype__proto.year = getSetYear, momentPrototype__proto.isLeapYear = getIsLeapYear, 
    momentPrototype__proto.weekYear = getSetWeekYear, momentPrototype__proto.isoWeekYear = getSetISOWeekYear, 
    momentPrototype__proto.quarter = momentPrototype__proto.quarters = getSetQuarter, 
    momentPrototype__proto.month = getSetMonth, momentPrototype__proto.daysInMonth = getDaysInMonth, 
    momentPrototype__proto.week = momentPrototype__proto.weeks = getSetWeek, momentPrototype__proto.isoWeek = momentPrototype__proto.isoWeeks = getSetISOWeek, 
    momentPrototype__proto.weeksInYear = getWeeksInYear, momentPrototype__proto.isoWeeksInYear = getISOWeeksInYear, 
    momentPrototype__proto.date = getSetDayOfMonth, momentPrototype__proto.day = momentPrototype__proto.days = getSetDayOfWeek, 
    momentPrototype__proto.weekday = getSetLocaleDayOfWeek, momentPrototype__proto.isoWeekday = getSetISODayOfWeek, 
    momentPrototype__proto.dayOfYear = getSetDayOfYear, momentPrototype__proto.hour = momentPrototype__proto.hours = getSetHour, 
    momentPrototype__proto.minute = momentPrototype__proto.minutes = getSetMinute, momentPrototype__proto.second = momentPrototype__proto.seconds = getSetSecond, 
    momentPrototype__proto.millisecond = momentPrototype__proto.milliseconds = getSetMillisecond, 
    momentPrototype__proto.utcOffset = getSetOffset, momentPrototype__proto.utc = setOffsetToUTC, 
    momentPrototype__proto.local = setOffsetToLocal, momentPrototype__proto.parseZone = setOffsetToParsedOffset, 
    momentPrototype__proto.hasAlignedHourOffset = hasAlignedHourOffset, momentPrototype__proto.isDST = isDaylightSavingTime, 
    momentPrototype__proto.isDSTShifted = isDaylightSavingTimeShifted, momentPrototype__proto.isLocal = isLocal, 
    momentPrototype__proto.isUtcOffset = isUtcOffset, momentPrototype__proto.isUtc = isUtc, 
    momentPrototype__proto.isUTC = isUtc, momentPrototype__proto.zoneAbbr = getZoneAbbr, 
    momentPrototype__proto.zoneName = getZoneName, momentPrototype__proto.dates = deprecate("dates accessor is deprecated. Use date instead.", getSetDayOfMonth), 
    momentPrototype__proto.months = deprecate("months accessor is deprecated. Use month instead", getSetMonth), 
    momentPrototype__proto.years = deprecate("years accessor is deprecated. Use year instead", getSetYear), 
    momentPrototype__proto.zone = deprecate("moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779", getSetZone);
    var momentPrototype = momentPrototype__proto, defaultCalendar = {
        sameDay: "[Today at] LT",
        nextDay: "[Tomorrow at] LT",
        nextWeek: "dddd [at] LT",
        lastDay: "[Yesterday at] LT",
        lastWeek: "[Last] dddd [at] LT",
        sameElse: "L"
    }, defaultLongDateFormat = {
        LTS: "h:mm:ss A",
        LT: "h:mm A",
        L: "MM/DD/YYYY",
        LL: "MMMM D, YYYY",
        LLL: "MMMM D, YYYY h:mm A",
        LLLL: "dddd, MMMM D, YYYY h:mm A"
    }, defaultInvalidDate = "Invalid date", defaultOrdinal = "%d", defaultOrdinalParse = /\d{1,2}/, defaultRelativeTime = {
        future: "in %s",
        past: "%s ago",
        s: "a few seconds",
        m: "a minute",
        mm: "%d minutes",
        h: "an hour",
        hh: "%d hours",
        d: "a day",
        dd: "%d days",
        M: "a month",
        MM: "%d months",
        y: "a year",
        yy: "%d years"
    }, prototype__proto = Locale.prototype;
    prototype__proto._calendar = defaultCalendar, prototype__proto.calendar = locale_calendar__calendar, 
    prototype__proto._longDateFormat = defaultLongDateFormat, prototype__proto.longDateFormat = longDateFormat, 
    prototype__proto._invalidDate = defaultInvalidDate, prototype__proto.invalidDate = invalidDate, 
    prototype__proto._ordinal = defaultOrdinal, prototype__proto.ordinal = ordinal, 
    prototype__proto._ordinalParse = defaultOrdinalParse, prototype__proto.preparse = preParsePostFormat, 
    prototype__proto.postformat = preParsePostFormat, prototype__proto._relativeTime = defaultRelativeTime, 
    prototype__proto.relativeTime = relative__relativeTime, prototype__proto.pastFuture = pastFuture, 
    prototype__proto.set = locale_set__set, prototype__proto.months = localeMonths, 
    prototype__proto._months = defaultLocaleMonths, prototype__proto.monthsShort = localeMonthsShort, 
    prototype__proto._monthsShort = defaultLocaleMonthsShort, prototype__proto.monthsParse = localeMonthsParse, 
    prototype__proto.week = localeWeek, prototype__proto._week = defaultLocaleWeek, 
    prototype__proto.firstDayOfYear = localeFirstDayOfYear, prototype__proto.firstDayOfWeek = localeFirstDayOfWeek, 
    prototype__proto.weekdays = localeWeekdays, prototype__proto._weekdays = defaultLocaleWeekdays, 
    prototype__proto.weekdaysMin = localeWeekdaysMin, prototype__proto._weekdaysMin = defaultLocaleWeekdaysMin, 
    prototype__proto.weekdaysShort = localeWeekdaysShort, prototype__proto._weekdaysShort = defaultLocaleWeekdaysShort, 
    prototype__proto.weekdaysParse = localeWeekdaysParse, prototype__proto.isPM = localeIsPM, 
    prototype__proto._meridiemParse = defaultLocaleMeridiemParse, prototype__proto.meridiem = localeMeridiem, 
    locale_locales__getSetGlobalLocale("en", {
        ordinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal: function(number) {
            var b = number % 10, output = 1 === toInt(number % 100 / 10) ? "th" : 1 === b ? "st" : 2 === b ? "nd" : 3 === b ? "rd" : "th";
            return number + output;
        }
    }), utils_hooks__hooks.lang = deprecate("moment.lang is deprecated. Use moment.locale instead.", locale_locales__getSetGlobalLocale), 
    utils_hooks__hooks.langData = deprecate("moment.langData is deprecated. Use moment.localeData instead.", locale_locales__getLocale);
    var mathAbs = Math.abs, asMilliseconds = makeAs("ms"), asSeconds = makeAs("s"), asMinutes = makeAs("m"), asHours = makeAs("h"), asDays = makeAs("d"), asWeeks = makeAs("w"), asMonths = makeAs("M"), asYears = makeAs("y"), milliseconds = makeGetter("milliseconds"), seconds = makeGetter("seconds"), minutes = makeGetter("minutes"), hours = makeGetter("hours"), days = makeGetter("days"), duration_get__months = makeGetter("months"), years = makeGetter("years"), round = Math.round, thresholds = {
        s: 45,
        m: 45,
        h: 22,
        d: 26,
        M: 11
    }, iso_string__abs = Math.abs, duration_prototype__proto = Duration.prototype;
    duration_prototype__proto.abs = duration_abs__abs, duration_prototype__proto.add = duration_add_subtract__add, 
    duration_prototype__proto.subtract = duration_add_subtract__subtract, duration_prototype__proto.as = as, 
    duration_prototype__proto.asMilliseconds = asMilliseconds, duration_prototype__proto.asSeconds = asSeconds, 
    duration_prototype__proto.asMinutes = asMinutes, duration_prototype__proto.asHours = asHours, 
    duration_prototype__proto.asDays = asDays, duration_prototype__proto.asWeeks = asWeeks, 
    duration_prototype__proto.asMonths = asMonths, duration_prototype__proto.asYears = asYears, 
    duration_prototype__proto.valueOf = duration_as__valueOf, duration_prototype__proto._bubble = bubble, 
    duration_prototype__proto.get = duration_get__get, duration_prototype__proto.milliseconds = milliseconds, 
    duration_prototype__proto.seconds = seconds, duration_prototype__proto.minutes = minutes, 
    duration_prototype__proto.hours = hours, duration_prototype__proto.days = days, 
    duration_prototype__proto.weeks = weeks, duration_prototype__proto.months = duration_get__months, 
    duration_prototype__proto.years = years, duration_prototype__proto.humanize = humanize, 
    duration_prototype__proto.toISOString = iso_string__toISOString, duration_prototype__proto.toString = iso_string__toISOString, 
    duration_prototype__proto.toJSON = iso_string__toISOString, duration_prototype__proto.locale = locale, 
    duration_prototype__proto.localeData = localeData, duration_prototype__proto.toIsoString = deprecate("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", iso_string__toISOString), 
    duration_prototype__proto.lang = lang, addFormatToken("X", 0, 0, "unix"), addFormatToken("x", 0, 0, "valueOf"), 
    addRegexToken("x", matchSigned), addRegexToken("X", matchTimestamp), addParseToken("X", function(input, array, config) {
        config._d = new Date(1e3 * parseFloat(input, 10));
    }), addParseToken("x", function(input, array, config) {
        config._d = new Date(toInt(input));
    }), utils_hooks__hooks.version = "2.10.6", setHookCallback(local__createLocal), 
    utils_hooks__hooks.fn = momentPrototype, utils_hooks__hooks.min = min, utils_hooks__hooks.max = max, 
    utils_hooks__hooks.utc = create_utc__createUTC, utils_hooks__hooks.unix = moment_moment__createUnix, 
    utils_hooks__hooks.months = lists__listMonths, utils_hooks__hooks.isDate = isDate, 
    utils_hooks__hooks.locale = locale_locales__getSetGlobalLocale, utils_hooks__hooks.invalid = valid__createInvalid, 
    utils_hooks__hooks.duration = create__createDuration, utils_hooks__hooks.isMoment = isMoment, 
    utils_hooks__hooks.weekdays = lists__listWeekdays, utils_hooks__hooks.parseZone = moment_moment__createInZone, 
    utils_hooks__hooks.localeData = locale_locales__getLocale, utils_hooks__hooks.isDuration = isDuration, 
    utils_hooks__hooks.monthsShort = lists__listMonthsShort, utils_hooks__hooks.weekdaysMin = lists__listWeekdaysMin, 
    utils_hooks__hooks.defineLocale = defineLocale, utils_hooks__hooks.weekdaysShort = lists__listWeekdaysShort, 
    utils_hooks__hooks.normalizeUnits = normalizeUnits, utils_hooks__hooks.relativeTimeThreshold = duration_humanize__getSetRelativeTimeThreshold;
    var _moment__default = utils_hooks__hooks, cs__months = (_moment__default.defineLocale("bg", {
        months: "януари_февруари_март_април_май_юни_юли_август_септември_октомври_ноември_декември".split("_"),
        monthsShort: "янр_фев_мар_апр_май_юни_юли_авг_сеп_окт_ное_дек".split("_"),
        weekdays: "неделя_понеделник_вторник_сряда_четвъртък_петък_събота".split("_"),
        weekdaysShort: "нед_пон_вто_сря_чет_пет_съб".split("_"),
        weekdaysMin: "нд_пн_вт_ср_чт_пт_сб".split("_"),
        longDateFormat: {
            LT: "H:mm",
            LTS: "H:mm:ss",
            L: "D.MM.YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY H:mm",
            LLLL: "dddd, D MMMM YYYY H:mm"
        },
        calendar: {
            sameDay: "[Днес в] LT",
            nextDay: "[Утре в] LT",
            nextWeek: "dddd [в] LT",
            lastDay: "[Вчера в] LT",
            lastWeek: function() {
                switch (this.day()) {
                  case 0:
                  case 3:
                  case 6:
                    return "[В изминалата] dddd [в] LT";

                  case 1:
                  case 2:
                  case 4:
                  case 5:
                    return "[В изминалия] dddd [в] LT";
                }
            },
            sameElse: "L"
        },
        relativeTime: {
            future: "след %s",
            past: "преди %s",
            s: "няколко секунди",
            m: "минута",
            mm: "%d минути",
            h: "час",
            hh: "%d часа",
            d: "ден",
            dd: "%d дни",
            M: "месец",
            MM: "%d месеца",
            y: "година",
            yy: "%d години"
        },
        ordinalParse: /\d{1,2}-(ев|ен|ти|ви|ри|ми)/,
        ordinal: function(number) {
            var lastDigit = number % 10, last2Digits = number % 100;
            return 0 === number ? number + "-ев" : 0 === last2Digits ? number + "-ен" : last2Digits > 10 && 20 > last2Digits ? number + "-ти" : 1 === lastDigit ? number + "-ви" : 2 === lastDigit ? number + "-ри" : 7 === lastDigit || 8 === lastDigit ? number + "-ми" : number + "-ти";
        },
        week: {
            dow: 1,
            doy: 7
        }
    }), "leden_únor_březen_duben_květen_červen_červenec_srpen_září_říjen_listopad_prosinec".split("_")), cs__monthsShort = "led_úno_bře_dub_kvě_čvn_čvc_srp_zář_říj_lis_pro".split("_"), monthsShortDot = (_moment__default.defineLocale("cs", {
        months: cs__months,
        monthsShort: cs__monthsShort,
        monthsParse: function(months, monthsShort) {
            var i, _monthsParse = [];
            for (i = 0; 12 > i; i++) _monthsParse[i] = new RegExp("^" + months[i] + "$|^" + monthsShort[i] + "$", "i");
            return _monthsParse;
        }(cs__months, cs__monthsShort),
        weekdays: "neděle_pondělí_úterý_středa_čtvrtek_pátek_sobota".split("_"),
        weekdaysShort: "ne_po_út_st_čt_pá_so".split("_"),
        weekdaysMin: "ne_po_út_st_čt_pá_so".split("_"),
        longDateFormat: {
            LT: "H:mm",
            LTS: "H:mm:ss",
            L: "DD.MM.YYYY",
            LL: "D. MMMM YYYY",
            LLL: "D. MMMM YYYY H:mm",
            LLLL: "dddd D. MMMM YYYY H:mm"
        },
        calendar: {
            sameDay: "[dnes v] LT",
            nextDay: "[zítra v] LT",
            nextWeek: function() {
                switch (this.day()) {
                  case 0:
                    return "[v neděli v] LT";

                  case 1:
                  case 2:
                    return "[v] dddd [v] LT";

                  case 3:
                    return "[ve středu v] LT";

                  case 4:
                    return "[ve čtvrtek v] LT";

                  case 5:
                    return "[v pátek v] LT";

                  case 6:
                    return "[v sobotu v] LT";
                }
            },
            lastDay: "[včera v] LT",
            lastWeek: function() {
                switch (this.day()) {
                  case 0:
                    return "[minulou neděli v] LT";

                  case 1:
                  case 2:
                    return "[minulé] dddd [v] LT";

                  case 3:
                    return "[minulou středu v] LT";

                  case 4:
                  case 5:
                    return "[minulý] dddd [v] LT";

                  case 6:
                    return "[minulou sobotu v] LT";
                }
            },
            sameElse: "L"
        },
        relativeTime: {
            future: "za %s",
            past: "před %s",
            s: cs__translate,
            m: cs__translate,
            mm: cs__translate,
            h: cs__translate,
            hh: cs__translate,
            d: cs__translate,
            dd: cs__translate,
            M: cs__translate,
            MM: cs__translate,
            y: cs__translate,
            yy: cs__translate
        },
        ordinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 4
        }
    }), _moment__default.defineLocale("de", {
        months: "Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),
        monthsShort: "Jan._Febr._Mrz._Apr._Mai_Jun._Jul._Aug._Sept._Okt._Nov._Dez.".split("_"),
        weekdays: "Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split("_"),
        weekdaysShort: "So._Mo._Di._Mi._Do._Fr._Sa.".split("_"),
        weekdaysMin: "So_Mo_Di_Mi_Do_Fr_Sa".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD.MM.YYYY",
            LL: "D. MMMM YYYY",
            LLL: "D. MMMM YYYY HH:mm",
            LLLL: "dddd, D. MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[Heute um] LT [Uhr]",
            sameElse: "L",
            nextDay: "[Morgen um] LT [Uhr]",
            nextWeek: "dddd [um] LT [Uhr]",
            lastDay: "[Gestern um] LT [Uhr]",
            lastWeek: "[letzten] dddd [um] LT [Uhr]"
        },
        relativeTime: {
            future: "in %s",
            past: "vor %s",
            s: "ein paar Sekunden",
            m: de__processRelativeTime,
            mm: "%d Minuten",
            h: de__processRelativeTime,
            hh: "%d Stunden",
            d: de__processRelativeTime,
            dd: de__processRelativeTime,
            M: de__processRelativeTime,
            MM: de__processRelativeTime,
            y: de__processRelativeTime,
            yy: de__processRelativeTime
        },
        ordinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 4
        }
    }), _moment__default.defineLocale("en-au", {
        months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
        monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
        weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
        weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
        longDateFormat: {
            LT: "h:mm A",
            LTS: "h:mm:ss A",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY h:mm A",
            LLLL: "dddd, D MMMM YYYY h:mm A"
        },
        calendar: {
            sameDay: "[Today at] LT",
            nextDay: "[Tomorrow at] LT",
            nextWeek: "dddd [at] LT",
            lastDay: "[Yesterday at] LT",
            lastWeek: "[Last] dddd [at] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "in %s",
            past: "%s ago",
            s: "a few seconds",
            m: "a minute",
            mm: "%d minutes",
            h: "an hour",
            hh: "%d hours",
            d: "a day",
            dd: "%d days",
            M: "a month",
            MM: "%d months",
            y: "a year",
            yy: "%d years"
        },
        ordinalParse: /\d{1,2}(st|nd|rd|th)/,
        ordinal: function(number) {
            var b = number % 10, output = 1 === ~~(number % 100 / 10) ? "th" : 1 === b ? "st" : 2 === b ? "nd" : 3 === b ? "rd" : "th";
            return number + output;
        },
        week: {
            dow: 1,
            doy: 4
        }
    }), _moment__default.defineLocale("en-ca", {
        months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
        monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
        weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
        weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
        longDateFormat: {
            LT: "h:mm A",
            LTS: "h:mm:ss A",
            L: "YYYY-MM-DD",
            LL: "D MMMM, YYYY",
            LLL: "D MMMM, YYYY h:mm A",
            LLLL: "dddd, D MMMM, YYYY h:mm A"
        },
        calendar: {
            sameDay: "[Today at] LT",
            nextDay: "[Tomorrow at] LT",
            nextWeek: "dddd [at] LT",
            lastDay: "[Yesterday at] LT",
            lastWeek: "[Last] dddd [at] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "in %s",
            past: "%s ago",
            s: "a few seconds",
            m: "a minute",
            mm: "%d minutes",
            h: "an hour",
            hh: "%d hours",
            d: "a day",
            dd: "%d days",
            M: "a month",
            MM: "%d months",
            y: "a year",
            yy: "%d years"
        },
        ordinalParse: /\d{1,2}(st|nd|rd|th)/,
        ordinal: function(number) {
            var b = number % 10, output = 1 === ~~(number % 100 / 10) ? "th" : 1 === b ? "st" : 2 === b ? "nd" : 3 === b ? "rd" : "th";
            return number + output;
        }
    }), _moment__default.defineLocale("en-gb", {
        months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
        monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
        weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
        weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd, D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[Today at] LT",
            nextDay: "[Tomorrow at] LT",
            nextWeek: "dddd [at] LT",
            lastDay: "[Yesterday at] LT",
            lastWeek: "[Last] dddd [at] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "in %s",
            past: "%s ago",
            s: "a few seconds",
            m: "a minute",
            mm: "%d minutes",
            h: "an hour",
            hh: "%d hours",
            d: "a day",
            dd: "%d days",
            M: "a month",
            MM: "%d months",
            y: "a year",
            yy: "%d years"
        },
        ordinalParse: /\d{1,2}(st|nd|rd|th)/,
        ordinal: function(number) {
            var b = number % 10, output = 1 === ~~(number % 100 / 10) ? "th" : 1 === b ? "st" : 2 === b ? "nd" : 3 === b ? "rd" : "th";
            return number + output;
        },
        week: {
            dow: 1,
            doy: 4
        }
    }), _moment__default.defineLocale("eo", {
        months: "januaro_februaro_marto_aprilo_majo_junio_julio_aŭgusto_septembro_oktobro_novembro_decembro".split("_"),
        monthsShort: "jan_feb_mar_apr_maj_jun_jul_aŭg_sep_okt_nov_dec".split("_"),
        weekdays: "Dimanĉo_Lundo_Mardo_Merkredo_Ĵaŭdo_Vendredo_Sabato".split("_"),
        weekdaysShort: "Dim_Lun_Mard_Merk_Ĵaŭ_Ven_Sab".split("_"),
        weekdaysMin: "Di_Lu_Ma_Me_Ĵa_Ve_Sa".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "YYYY-MM-DD",
            LL: "D[-an de] MMMM, YYYY",
            LLL: "D[-an de] MMMM, YYYY HH:mm",
            LLLL: "dddd, [la] D[-an de] MMMM, YYYY HH:mm"
        },
        meridiemParse: /[ap]\.t\.m/i,
        isPM: function(input) {
            return "p" === input.charAt(0).toLowerCase();
        },
        meridiem: function(hours, minutes, isLower) {
            return hours > 11 ? isLower ? "p.t.m." : "P.T.M." : isLower ? "a.t.m." : "A.T.M.";
        },
        calendar: {
            sameDay: "[Hodiaŭ je] LT",
            nextDay: "[Morgaŭ je] LT",
            nextWeek: "dddd [je] LT",
            lastDay: "[Hieraŭ je] LT",
            lastWeek: "[pasinta] dddd [je] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "je %s",
            past: "antaŭ %s",
            s: "sekundoj",
            m: "minuto",
            mm: "%d minutoj",
            h: "horo",
            hh: "%d horoj",
            d: "tago",
            dd: "%d tagoj",
            M: "monato",
            MM: "%d monatoj",
            y: "jaro",
            yy: "%d jaroj"
        },
        ordinalParse: /\d{1,2}a/,
        ordinal: "%da",
        week: {
            dow: 1,
            doy: 7
        }
    }), "Ene._Feb._Mar._Abr._May._Jun._Jul._Ago._Sep._Oct._Nov._Dic.".split("_")), es__monthsShort = "Ene_Feb_Mar_Abr_May_Jun_Jul_Ago_Sep_Oct_Nov_Dic".split("_"), numbersPast = (_moment__default.defineLocale("es", {
        months: "Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre".split("_"),
        monthsShort: function(m, format) {
            return /-MMM-/.test(format) ? es__monthsShort[m.month()] : monthsShortDot[m.month()];
        },
        weekdays: "Domingo_Lunes_Martes_Miércoles_Jueves_Viernes_Sábado".split("_"),
        weekdaysShort: "Dom._Lun._Mar._Mié._Jue._Vie._Sáb.".split("_"),
        weekdaysMin: "Do_Lu_Ma_Mi_Ju_Vi_Sá".split("_"),
        longDateFormat: {
            LT: "H:mm",
            LTS: "H:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D [de] MMMM [de] YYYY",
            LLL: "D [de] MMMM [de] YYYY H:mm",
            LLLL: "dddd, D [de] MMMM [de] YYYY H:mm"
        },
        calendar: {
            sameDay: function() {
                return "[hoy a la" + (1 !== this.hours() ? "s" : "") + "] LT";
            },
            nextDay: function() {
                return "[mañana a la" + (1 !== this.hours() ? "s" : "") + "] LT";
            },
            nextWeek: function() {
                return "dddd [a la" + (1 !== this.hours() ? "s" : "") + "] LT";
            },
            lastDay: function() {
                return "[ayer a la" + (1 !== this.hours() ? "s" : "") + "] LT";
            },
            lastWeek: function() {
                return "[el] dddd [pasado a la" + (1 !== this.hours() ? "s" : "") + "] LT";
            },
            sameElse: "L"
        },
        relativeTime: {
            future: "en %s",
            past: "hace %s",
            s: "unos segundos",
            m: "un minuto",
            mm: "%d minutos",
            h: "una hora",
            hh: "%d horas",
            d: "un día",
            dd: "%d días",
            M: "un mes",
            MM: "%d meses",
            y: "un año",
            yy: "%d años"
        },
        ordinalParse: /\d{1,2}º/,
        ordinal: "%dº",
        week: {
            dow: 1,
            doy: 4
        }
    }), "nolla yksi kaksi kolme neljä viisi kuusi seitsemän kahdeksan yhdeksän".split(" ")), numbersFuture = [ "nolla", "yhden", "kahden", "kolmen", "neljän", "viiden", "kuuden", numbersPast[7], numbersPast[8], numbersPast[9] ], weekEndings = (_moment__default.defineLocale("fi", {
        months: "tammikuu_helmikuu_maaliskuu_huhtikuu_toukokuu_kesäkuu_heinäkuu_elokuu_syyskuu_lokakuu_marraskuu_joulukuu".split("_"),
        monthsShort: "tammi_helmi_maalis_huhti_touko_kesä_heinä_elo_syys_loka_marras_joulu".split("_"),
        weekdays: "sunnuntai_maanantai_tiistai_keskiviikko_torstai_perjantai_lauantai".split("_"),
        weekdaysShort: "su_ma_ti_ke_to_pe_la".split("_"),
        weekdaysMin: "su_ma_ti_ke_to_pe_la".split("_"),
        longDateFormat: {
            LT: "HH.mm",
            LTS: "HH.mm.ss",
            L: "DD.MM.YYYY",
            LL: "Do MMMM[ta] YYYY",
            LLL: "Do MMMM[ta] YYYY, [klo] HH.mm",
            LLLL: "dddd, Do MMMM[ta] YYYY, [klo] HH.mm",
            l: "D.M.YYYY",
            ll: "Do MMM YYYY",
            lll: "Do MMM YYYY, [klo] HH.mm",
            llll: "ddd, Do MMM YYYY, [klo] HH.mm"
        },
        calendar: {
            sameDay: "[tänään] [klo] LT",
            nextDay: "[huomenna] [klo] LT",
            nextWeek: "dddd [klo] LT",
            lastDay: "[eilen] [klo] LT",
            lastWeek: "[viime] dddd[na] [klo] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "%s päästä",
            past: "%s sitten",
            s: fi__translate,
            m: fi__translate,
            mm: fi__translate,
            h: fi__translate,
            hh: fi__translate,
            d: fi__translate,
            dd: fi__translate,
            M: fi__translate,
            MM: fi__translate,
            y: fi__translate,
            yy: fi__translate
        },
        ordinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 4
        }
    }), _moment__default.defineLocale("fr", {
        months: "janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_"),
        monthsShort: "janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"),
        weekdays: "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),
        weekdaysShort: "dim._lun._mar._mer._jeu._ven._sam.".split("_"),
        weekdaysMin: "Di_Lu_Ma_Me_Je_Ve_Sa".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[Aujourd'hui à] LT",
            nextDay: "[Demain à] LT",
            nextWeek: "dddd [à] LT",
            lastDay: "[Hier à] LT",
            lastWeek: "dddd [dernier à] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "dans %s",
            past: "il y a %s",
            s: "quelques secondes",
            m: "une minute",
            mm: "%d minutes",
            h: "une heure",
            hh: "%d heures",
            d: "un jour",
            dd: "%d jours",
            M: "un mois",
            MM: "%d mois",
            y: "un an",
            yy: "%d ans"
        },
        ordinalParse: /\d{1,2}(er|)/,
        ordinal: function(number) {
            return number + (1 === number ? "er" : "");
        },
        week: {
            dow: 1,
            doy: 4
        }
    }), "vasárnap hétfőn kedden szerdán csütörtökön pénteken szombaton".split(" ")), lt__units = (_moment__default.defineLocale("hu", {
        months: "január_február_március_április_május_június_július_augusztus_szeptember_október_november_december".split("_"),
        monthsShort: "jan_feb_márc_ápr_máj_jún_júl_aug_szept_okt_nov_dec".split("_"),
        weekdays: "vasárnap_hétfő_kedd_szerda_csütörtök_péntek_szombat".split("_"),
        weekdaysShort: "vas_hét_kedd_sze_csüt_pén_szo".split("_"),
        weekdaysMin: "v_h_k_sze_cs_p_szo".split("_"),
        longDateFormat: {
            LT: "H:mm",
            LTS: "H:mm:ss",
            L: "YYYY.MM.DD.",
            LL: "YYYY. MMMM D.",
            LLL: "YYYY. MMMM D. H:mm",
            LLLL: "YYYY. MMMM D., dddd H:mm"
        },
        meridiemParse: /de|du/i,
        isPM: function(input) {
            return "u" === input.charAt(1).toLowerCase();
        },
        meridiem: function(hours, minutes, isLower) {
            return 12 > hours ? isLower === !0 ? "de" : "DE" : isLower === !0 ? "du" : "DU";
        },
        calendar: {
            sameDay: "[ma] LT[-kor]",
            nextDay: "[holnap] LT[-kor]",
            nextWeek: function() {
                return week.call(this, !0);
            },
            lastDay: "[tegnap] LT[-kor]",
            lastWeek: function() {
                return week.call(this, !1);
            },
            sameElse: "L"
        },
        relativeTime: {
            future: "%s múlva",
            past: "%s",
            s: hu__translate,
            m: hu__translate,
            mm: hu__translate,
            h: hu__translate,
            hh: hu__translate,
            d: hu__translate,
            dd: hu__translate,
            M: hu__translate,
            MM: hu__translate,
            y: hu__translate,
            yy: hu__translate
        },
        ordinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 7
        }
    }), _moment__default.defineLocale("it", {
        months: "gennaio_febbraio_marzo_aprile_maggio_giugno_luglio_agosto_settembre_ottobre_novembre_dicembre".split("_"),
        monthsShort: "gen_feb_mar_apr_mag_giu_lug_ago_set_ott_nov_dic".split("_"),
        weekdays: "Domenica_Lunedì_Martedì_Mercoledì_Giovedì_Venerdì_Sabato".split("_"),
        weekdaysShort: "Dom_Lun_Mar_Mer_Gio_Ven_Sab".split("_"),
        weekdaysMin: "D_L_Ma_Me_G_V_S".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd, D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[Oggi alle] LT",
            nextDay: "[Domani alle] LT",
            nextWeek: "dddd [alle] LT",
            lastDay: "[Ieri alle] LT",
            lastWeek: function() {
                switch (this.day()) {
                  case 0:
                    return "[la scorsa] dddd [alle] LT";

                  default:
                    return "[lo scorso] dddd [alle] LT";
                }
            },
            sameElse: "L"
        },
        relativeTime: {
            future: function(s) {
                return (/^[0-9].+$/.test(s) ? "tra" : "in") + " " + s;
            },
            past: "%s fa",
            s: "alcuni secondi",
            m: "un minuto",
            mm: "%d minuti",
            h: "un'ora",
            hh: "%d ore",
            d: "un giorno",
            dd: "%d giorni",
            M: "un mese",
            MM: "%d mesi",
            y: "un anno",
            yy: "%d anni"
        },
        ordinalParse: /\d{1,2}º/,
        ordinal: "%dº",
        week: {
            dow: 1,
            doy: 4
        }
    }), _moment__default.defineLocale("lb", {
        months: "Januar_Februar_Mäerz_Abrëll_Mee_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),
        monthsShort: "Jan._Febr._Mrz._Abr._Mee_Jun._Jul._Aug._Sept._Okt._Nov._Dez.".split("_"),
        weekdays: "Sonndeg_Méindeg_Dënschdeg_Mëttwoch_Donneschdeg_Freideg_Samschdeg".split("_"),
        weekdaysShort: "So._Mé._Dë._Më._Do._Fr._Sa.".split("_"),
        weekdaysMin: "So_Mé_Dë_Më_Do_Fr_Sa".split("_"),
        longDateFormat: {
            LT: "H:mm [Auer]",
            LTS: "H:mm:ss [Auer]",
            L: "DD.MM.YYYY",
            LL: "D. MMMM YYYY",
            LLL: "D. MMMM YYYY H:mm [Auer]",
            LLLL: "dddd, D. MMMM YYYY H:mm [Auer]"
        },
        calendar: {
            sameDay: "[Haut um] LT",
            sameElse: "L",
            nextDay: "[Muer um] LT",
            nextWeek: "dddd [um] LT",
            lastDay: "[Gëschter um] LT",
            lastWeek: function() {
                switch (this.day()) {
                  case 2:
                  case 4:
                    return "[Leschten] dddd [um] LT";

                  default:
                    return "[Leschte] dddd [um] LT";
                }
            }
        },
        relativeTime: {
            future: processFutureTime,
            past: processPastTime,
            s: "e puer Sekonnen",
            m: lb__processRelativeTime,
            mm: "%d Minutten",
            h: lb__processRelativeTime,
            hh: "%d Stonnen",
            d: lb__processRelativeTime,
            dd: "%d Deeg",
            M: lb__processRelativeTime,
            MM: "%d Méint",
            y: lb__processRelativeTime,
            yy: "%d Joer"
        },
        ordinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 4
        }
    }), {
        m: "minutė_minutės_minutę",
        mm: "minutės_minučių_minutes",
        h: "valanda_valandos_valandą",
        hh: "valandos_valandų_valandas",
        d: "diena_dienos_dieną",
        dd: "dienos_dienų_dienas",
        M: "mėnuo_mėnesio_mėnesį",
        MM: "mėnesiai_mėnesių_mėnesius",
        y: "metai_metų_metus",
        yy: "metai_metų_metus"
    }), weekDays = "sekmadienis_pirmadienis_antradienis_trečiadienis_ketvirtadienis_penktadienis_šeštadienis".split("_"), nl__monthsShortWithDots = (_moment__default.defineLocale("lt", {
        months: lt__monthsCaseReplace,
        monthsShort: "sau_vas_kov_bal_geg_bir_lie_rgp_rgs_spa_lap_grd".split("_"),
        weekdays: relativeWeekDay,
        weekdaysShort: "Sek_Pir_Ant_Tre_Ket_Pen_Šeš".split("_"),
        weekdaysMin: "S_P_A_T_K_Pn_Š".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "YYYY-MM-DD",
            LL: "YYYY [m.] MMMM D [d.]",
            LLL: "YYYY [m.] MMMM D [d.], HH:mm [val.]",
            LLLL: "YYYY [m.] MMMM D [d.], dddd, HH:mm [val.]",
            l: "YYYY-MM-DD",
            ll: "YYYY [m.] MMMM D [d.]",
            lll: "YYYY [m.] MMMM D [d.], HH:mm [val.]",
            llll: "YYYY [m.] MMMM D [d.], ddd, HH:mm [val.]"
        },
        calendar: {
            sameDay: "[Šiandien] LT",
            nextDay: "[Rytoj] LT",
            nextWeek: "dddd LT",
            lastDay: "[Vakar] LT",
            lastWeek: "[Praėjusį] dddd LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "po %s",
            past: "prieš %s",
            s: translateSeconds,
            m: translateSingular,
            mm: lt__translate,
            h: translateSingular,
            hh: lt__translate,
            d: translateSingular,
            dd: lt__translate,
            M: translateSingular,
            MM: lt__translate,
            y: translateSingular,
            yy: lt__translate
        },
        ordinalParse: /\d{1,2}-oji/,
        ordinal: function(number) {
            return number + "-oji";
        },
        week: {
            dow: 1,
            doy: 4
        }
    }), "jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.".split("_")), nl__monthsShortWithoutDots = "jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec".split("_"), monthsNominative = (_moment__default.defineLocale("nl", {
        months: "januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december".split("_"),
        monthsShort: function(m, format) {
            return /-MMM-/.test(format) ? nl__monthsShortWithoutDots[m.month()] : nl__monthsShortWithDots[m.month()];
        },
        weekdays: "zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag".split("_"),
        weekdaysShort: "zo._ma._di._wo._do._vr._za.".split("_"),
        weekdaysMin: "Zo_Ma_Di_Wo_Do_Vr_Za".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD-MM-YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[vandaag om] LT",
            nextDay: "[morgen om] LT",
            nextWeek: "dddd [om] LT",
            lastDay: "[gisteren om] LT",
            lastWeek: "[afgelopen] dddd [om] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "over %s",
            past: "%s geleden",
            s: "een paar seconden",
            m: "één minuut",
            mm: "%d minuten",
            h: "één uur",
            hh: "%d uur",
            d: "één dag",
            dd: "%d dagen",
            M: "één maand",
            MM: "%d maanden",
            y: "één jaar",
            yy: "%d jaar"
        },
        ordinalParse: /\d{1,2}(ste|de)/,
        ordinal: function(number) {
            return number + (1 === number || 8 === number || number >= 20 ? "ste" : "de");
        },
        week: {
            dow: 1,
            doy: 4
        }
    }), _moment__default.defineLocale("nn", {
        months: "januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember".split("_"),
        monthsShort: "jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_"),
        weekdays: "sundag_måndag_tysdag_onsdag_torsdag_fredag_laurdag".split("_"),
        weekdaysShort: "sun_mån_tys_ons_tor_fre_lau".split("_"),
        weekdaysMin: "su_må_ty_on_to_fr_lø".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD.MM.YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[I dag klokka] LT",
            nextDay: "[I morgon klokka] LT",
            nextWeek: "dddd [klokka] LT",
            lastDay: "[I går klokka] LT",
            lastWeek: "[Føregåande] dddd [klokka] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "om %s",
            past: "for %s sidan",
            s: "nokre sekund",
            m: "eit minutt",
            mm: "%d minutt",
            h: "ein time",
            hh: "%d timar",
            d: "ein dag",
            dd: "%d dagar",
            M: "ein månad",
            MM: "%d månader",
            y: "eit år",
            yy: "%d år"
        },
        ordinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 4
        }
    }), "styczeń_luty_marzec_kwiecień_maj_czerwiec_lipiec_sierpień_wrzesień_październik_listopad_grudzień".split("_")), monthsSubjective = "stycznia_lutego_marca_kwietnia_maja_czerwca_lipca_sierpnia_września_października_listopada_grudnia".split("_");
    _moment__default.defineLocale("pl", {
        months: function(momentToFormat, format) {
            return "" === format ? "(" + monthsSubjective[momentToFormat.month()] + "|" + monthsNominative[momentToFormat.month()] + ")" : /D MMMM/.test(format) ? monthsSubjective[momentToFormat.month()] : monthsNominative[momentToFormat.month()];
        },
        monthsShort: "sty_lut_mar_kwi_maj_cze_lip_sie_wrz_paź_lis_gru".split("_"),
        weekdays: "niedziela_poniedziałek_wtorek_środa_czwartek_piątek_sobota".split("_"),
        weekdaysShort: "nie_pon_wt_śr_czw_pt_sb".split("_"),
        weekdaysMin: "N_Pn_Wt_Śr_Cz_Pt_So".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD.MM.YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd, D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[Dziś o] LT",
            nextDay: "[Jutro o] LT",
            nextWeek: "[W] dddd [o] LT",
            lastDay: "[Wczoraj o] LT",
            lastWeek: function() {
                switch (this.day()) {
                  case 0:
                    return "[W zeszłą niedzielę o] LT";

                  case 3:
                    return "[W zeszłą środę o] LT";

                  case 6:
                    return "[W zeszłą sobotę o] LT";

                  default:
                    return "[W zeszły] dddd [o] LT";
                }
            },
            sameElse: "L"
        },
        relativeTime: {
            future: "za %s",
            past: "%s temu",
            s: "kilka sekund",
            m: pl__translate,
            mm: pl__translate,
            h: pl__translate,
            hh: pl__translate,
            d: "1 dzień",
            dd: "%d dni",
            M: "miesiąc",
            MM: pl__translate,
            y: "rok",
            yy: pl__translate
        },
        ordinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 4
        }
    }), _moment__default.defineLocale("pt-br", {
        months: "Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro".split("_"),
        monthsShort: "Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez".split("_"),
        weekdays: "Domingo_Segunda-Feira_Terça-Feira_Quarta-Feira_Quinta-Feira_Sexta-Feira_Sábado".split("_"),
        weekdaysShort: "Dom_Seg_Ter_Qua_Qui_Sex_Sáb".split("_"),
        weekdaysMin: "Dom_2ª_3ª_4ª_5ª_6ª_Sáb".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D [de] MMMM [de] YYYY",
            LLL: "D [de] MMMM [de] YYYY [às] HH:mm",
            LLLL: "dddd, D [de] MMMM [de] YYYY [às] HH:mm"
        },
        calendar: {
            sameDay: "[Hoje às] LT",
            nextDay: "[Amanhã às] LT",
            nextWeek: "dddd [às] LT",
            lastDay: "[Ontem às] LT",
            lastWeek: function() {
                return 0 === this.day() || 6 === this.day() ? "[Último] dddd [às] LT" : "[Última] dddd [às] LT";
            },
            sameElse: "L"
        },
        relativeTime: {
            future: "em %s",
            past: "%s atrás",
            s: "poucos segundos",
            m: "um minuto",
            mm: "%d minutos",
            h: "uma hora",
            hh: "%d horas",
            d: "um dia",
            dd: "%d dias",
            M: "um mês",
            MM: "%d meses",
            y: "um ano",
            yy: "%d anos"
        },
        ordinalParse: /\d{1,2}º/,
        ordinal: "%dº"
    }), _moment__default.defineLocale("pt", {
        months: "Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro".split("_"),
        monthsShort: "Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez".split("_"),
        weekdays: "Domingo_Segunda-Feira_Terça-Feira_Quarta-Feira_Quinta-Feira_Sexta-Feira_Sábado".split("_"),
        weekdaysShort: "Dom_Seg_Ter_Qua_Qui_Sex_Sáb".split("_"),
        weekdaysMin: "Dom_2ª_3ª_4ª_5ª_6ª_Sáb".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D [de] MMMM [de] YYYY",
            LLL: "D [de] MMMM [de] YYYY HH:mm",
            LLLL: "dddd, D [de] MMMM [de] YYYY HH:mm"
        },
        calendar: {
            sameDay: "[Hoje às] LT",
            nextDay: "[Amanhã às] LT",
            nextWeek: "dddd [às] LT",
            lastDay: "[Ontem às] LT",
            lastWeek: function() {
                return 0 === this.day() || 6 === this.day() ? "[Último] dddd [às] LT" : "[Última] dddd [às] LT";
            },
            sameElse: "L"
        },
        relativeTime: {
            future: "em %s",
            past: "há %s",
            s: "segundos",
            m: "um minuto",
            mm: "%d minutos",
            h: "uma hora",
            hh: "%d horas",
            d: "um dia",
            dd: "%d dias",
            M: "um mês",
            MM: "%d meses",
            y: "um ano",
            yy: "%d anos"
        },
        ordinalParse: /\d{1,2}º/,
        ordinal: "%dº",
        week: {
            dow: 1,
            doy: 4
        }
    }), _moment__default.defineLocale("ro", {
        months: "ianuarie_februarie_martie_aprilie_mai_iunie_iulie_august_septembrie_octombrie_noiembrie_decembrie".split("_"),
        monthsShort: "ian._febr._mart._apr._mai_iun._iul._aug._sept._oct._nov._dec.".split("_"),
        weekdays: "duminică_luni_marți_miercuri_joi_vineri_sâmbătă".split("_"),
        weekdaysShort: "Dum_Lun_Mar_Mie_Joi_Vin_Sâm".split("_"),
        weekdaysMin: "Du_Lu_Ma_Mi_Jo_Vi_Sâ".split("_"),
        longDateFormat: {
            LT: "H:mm",
            LTS: "H:mm:ss",
            L: "DD.MM.YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY H:mm",
            LLLL: "dddd, D MMMM YYYY H:mm"
        },
        calendar: {
            sameDay: "[azi la] LT",
            nextDay: "[mâine la] LT",
            nextWeek: "dddd [la] LT",
            lastDay: "[ieri la] LT",
            lastWeek: "[fosta] dddd [la] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "peste %s",
            past: "%s în urmă",
            s: "câteva secunde",
            m: "un minut",
            mm: ro__relativeTimeWithPlural,
            h: "o oră",
            hh: ro__relativeTimeWithPlural,
            d: "o zi",
            dd: ro__relativeTimeWithPlural,
            M: "o lună",
            MM: ro__relativeTimeWithPlural,
            y: "un an",
            yy: ro__relativeTimeWithPlural
        },
        week: {
            dow: 1,
            doy: 7
        }
    }), _moment__default.defineLocale("ru", {
        months: ru__monthsCaseReplace,
        monthsShort: ru__monthsShortCaseReplace,
        weekdays: ru__weekdaysCaseReplace,
        weekdaysShort: "вс_пн_вт_ср_чт_пт_сб".split("_"),
        weekdaysMin: "вс_пн_вт_ср_чт_пт_сб".split("_"),
        monthsParse: [ /^янв/i, /^фев/i, /^мар/i, /^апр/i, /^ма[й|я]/i, /^июн/i, /^июл/i, /^авг/i, /^сен/i, /^окт/i, /^ноя/i, /^дек/i ],
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD.MM.YYYY",
            LL: "D MMMM YYYY г.",
            LLL: "D MMMM YYYY г., HH:mm",
            LLLL: "dddd, D MMMM YYYY г., HH:mm"
        },
        calendar: {
            sameDay: "[Сегодня в] LT",
            nextDay: "[Завтра в] LT",
            lastDay: "[Вчера в] LT",
            nextWeek: function() {
                return 2 === this.day() ? "[Во] dddd [в] LT" : "[В] dddd [в] LT";
            },
            lastWeek: function(now) {
                if (now.week() === this.week()) return 2 === this.day() ? "[Во] dddd [в] LT" : "[В] dddd [в] LT";
                switch (this.day()) {
                  case 0:
                    return "[В прошлое] dddd [в] LT";

                  case 1:
                  case 2:
                  case 4:
                    return "[В прошлый] dddd [в] LT";

                  case 3:
                  case 5:
                  case 6:
                    return "[В прошлую] dddd [в] LT";
                }
            },
            sameElse: "L"
        },
        relativeTime: {
            future: "через %s",
            past: "%s назад",
            s: "несколько секунд",
            m: ru__relativeTimeWithPlural,
            mm: ru__relativeTimeWithPlural,
            h: "час",
            hh: ru__relativeTimeWithPlural,
            d: "день",
            dd: ru__relativeTimeWithPlural,
            M: "месяц",
            MM: ru__relativeTimeWithPlural,
            y: "год",
            yy: ru__relativeTimeWithPlural
        },
        meridiemParse: /ночи|утра|дня|вечера/i,
        isPM: function(input) {
            return /^(дня|вечера)$/.test(input);
        },
        meridiem: function(hour, minute, isLower) {
            return 4 > hour ? "ночи" : 12 > hour ? "утра" : 17 > hour ? "дня" : "вечера";
        },
        ordinalParse: /\d{1,2}-(й|го|я)/,
        ordinal: function(number, period) {
            switch (period) {
              case "M":
              case "d":
              case "DDD":
                return number + "-й";

              case "D":
                return number + "-го";

              case "w":
              case "W":
                return number + "-я";

              default:
                return number;
            }
        },
        week: {
            dow: 1,
            doy: 7
        }
    }), _moment__default.defineLocale("sl", {
        months: "januar_februar_marec_april_maj_junij_julij_avgust_september_oktober_november_december".split("_"),
        monthsShort: "jan._feb._mar._apr._maj._jun._jul._avg._sep._okt._nov._dec.".split("_"),
        weekdays: "nedelja_ponedeljek_torek_sreda_četrtek_petek_sobota".split("_"),
        weekdaysShort: "ned._pon._tor._sre._čet._pet._sob.".split("_"),
        weekdaysMin: "ne_po_to_sr_če_pe_so".split("_"),
        longDateFormat: {
            LT: "H:mm",
            LTS: "H:mm:ss",
            L: "DD. MM. YYYY",
            LL: "D. MMMM YYYY",
            LLL: "D. MMMM YYYY H:mm",
            LLLL: "dddd, D. MMMM YYYY H:mm"
        },
        calendar: {
            sameDay: "[danes ob] LT",
            nextDay: "[jutri ob] LT",
            nextWeek: function() {
                switch (this.day()) {
                  case 0:
                    return "[v] [nedeljo] [ob] LT";

                  case 3:
                    return "[v] [sredo] [ob] LT";

                  case 6:
                    return "[v] [soboto] [ob] LT";

                  case 1:
                  case 2:
                  case 4:
                  case 5:
                    return "[v] dddd [ob] LT";
                }
            },
            lastDay: "[včeraj ob] LT",
            lastWeek: function() {
                switch (this.day()) {
                  case 0:
                    return "[prejšnjo] [nedeljo] [ob] LT";

                  case 3:
                    return "[prejšnjo] [sredo] [ob] LT";

                  case 6:
                    return "[prejšnjo] [soboto] [ob] LT";

                  case 1:
                  case 2:
                  case 4:
                  case 5:
                    return "[prejšnji] dddd [ob] LT";
                }
            },
            sameElse: "L"
        },
        relativeTime: {
            future: "čez %s",
            past: "pred %s",
            s: sl__processRelativeTime,
            m: sl__processRelativeTime,
            mm: sl__processRelativeTime,
            h: sl__processRelativeTime,
            hh: sl__processRelativeTime,
            d: sl__processRelativeTime,
            dd: sl__processRelativeTime,
            M: sl__processRelativeTime,
            MM: sl__processRelativeTime,
            y: sl__processRelativeTime,
            yy: sl__processRelativeTime
        },
        ordinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 7
        }
    }), _moment__default.defineLocale("sv", {
        months: "januari_februari_mars_april_maj_juni_juli_augusti_september_oktober_november_december".split("_"),
        monthsShort: "jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec".split("_"),
        weekdays: "söndag_måndag_tisdag_onsdag_torsdag_fredag_lördag".split("_"),
        weekdaysShort: "sön_mån_tis_ons_tor_fre_lör".split("_"),
        weekdaysMin: "sö_må_ti_on_to_fr_lö".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "YYYY-MM-DD",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[Idag] LT",
            nextDay: "[Imorgon] LT",
            lastDay: "[Igår] LT",
            nextWeek: "[På] dddd LT",
            lastWeek: "[I] dddd[s] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "om %s",
            past: "för %s sedan",
            s: "några sekunder",
            m: "en minut",
            mm: "%d minuter",
            h: "en timme",
            hh: "%d timmar",
            d: "en dag",
            dd: "%d dagar",
            M: "en månad",
            MM: "%d månader",
            y: "ett år",
            yy: "%d år"
        },
        ordinalParse: /\d{1,2}(e|a)/,
        ordinal: function(number) {
            var b = number % 10, output = 1 === ~~(number % 100 / 10) ? "e" : 1 === b ? "a" : 2 === b ? "a" : "e";
            return number + output;
        },
        week: {
            dow: 1,
            doy: 4
        }
    }), _moment__default.defineLocale("uk", {
        months: uk__monthsCaseReplace,
        monthsShort: "січ_лют_бер_квіт_трав_черв_лип_серп_вер_жовт_лист_груд".split("_"),
        weekdays: uk__weekdaysCaseReplace,
        weekdaysShort: "нд_пн_вт_ср_чт_пт_сб".split("_"),
        weekdaysMin: "нд_пн_вт_ср_чт_пт_сб".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD.MM.YYYY",
            LL: "D MMMM YYYY р.",
            LLL: "D MMMM YYYY р., HH:mm",
            LLLL: "dddd, D MMMM YYYY р., HH:mm"
        },
        calendar: {
            sameDay: processHoursFunction("[Сьогодні "),
            nextDay: processHoursFunction("[Завтра "),
            lastDay: processHoursFunction("[Вчора "),
            nextWeek: processHoursFunction("[У] dddd ["),
            lastWeek: function() {
                switch (this.day()) {
                  case 0:
                  case 3:
                  case 5:
                  case 6:
                    return processHoursFunction("[Минулої] dddd [").call(this);

                  case 1:
                  case 2:
                  case 4:
                    return processHoursFunction("[Минулого] dddd [").call(this);
                }
            },
            sameElse: "L"
        },
        relativeTime: {
            future: "за %s",
            past: "%s тому",
            s: "декілька секунд",
            m: uk__relativeTimeWithPlural,
            mm: uk__relativeTimeWithPlural,
            h: "годину",
            hh: uk__relativeTimeWithPlural,
            d: "день",
            dd: uk__relativeTimeWithPlural,
            M: "місяць",
            MM: uk__relativeTimeWithPlural,
            y: "рік",
            yy: uk__relativeTimeWithPlural
        },
        meridiemParse: /ночі|ранку|дня|вечора/,
        isPM: function(input) {
            return /^(дня|вечора)$/.test(input);
        },
        meridiem: function(hour, minute, isLower) {
            return 4 > hour ? "ночі" : 12 > hour ? "ранку" : 17 > hour ? "дня" : "вечора";
        },
        ordinalParse: /\d{1,2}-(й|го)/,
        ordinal: function(number, period) {
            switch (period) {
              case "M":
              case "d":
              case "DDD":
              case "w":
              case "W":
                return number + "-й";

              case "D":
                return number + "-го";

              default:
                return number;
            }
        },
        week: {
            dow: 1,
            doy: 7
        }
    });
});

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