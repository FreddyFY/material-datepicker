# material-datepicker

## Usage

Include the JavaScript file and Stylesheet in your html page.

```html
  <link rel="stylesheet" type="text/css" href="https://rawgit.com/FreddyFY/material-datepicker/master/src/material-datepicker.css">
  <script type="text/javascript" src="https://rawgit.com/FreddyFY/material-datepicker/master/src/material-datepicker.js"></script>

```

In its simplest case, Material-Picker can be initialised with a single line of Javascript.
You will probably also specify some options while applying the plugin.

```js
var monthpicker = new MaterialDatepicker('input');
var monthpicker = new MaterialDatepicker('input', {
  lang: 'de',
  orientation: 'portrait',
});
```

## Options

* **type** *(default: "date")* *[string]* - Datepicker["date"], Monthpicker["month"]
* **lang** *(default: "en")* *[string]* - Language
* **orientation** *(default: "landscape")* *[string]* - Orientation of the picker: portait or landscape
* **primaryColor** *(default: "#80cbc4")* *[string]* - Color of the picker; Html color values
* **theme** *(default: "light")* *[string]* - Theme of the picker: light or dark
* **openOn** *(default: "click")* *[string]* - How to open the picker: Click-events or 'direct'
* **closeAfterClick** *(default: true)* *[string]* - Close the picker after choose a date or not

* **date** *(default: today or string inside input)* *[type: Date Object]* - The initial date of the Picker
* **weekBegin** *(default: "sunday")* *[string]* - Beginning weekday of the week: sunday or monday
* **outputFormat** *(default: date "{yyyy}/{mm}/{dd}"; month "{MMMM} {yyyy}")* *[string]* - Date-format of the output [inside a input or OutputElement]: Uppercase is a string, Lowercase is a number
* **topHeaderFormat** *(default: "{YYYY}")* *[string]* - Date-format of the output [inside a input or OutputElement]: Uppercase is a string, Lowercase is a number
* **headerFormat** *(default: date "{DD}, {MMM} {d}"; month "{MMMM}")* *[string]* - Date Format in the header bar
* **sitePickerFormat** *(default: date "{MMMM} {yyyy}"; month "{yyyy}")* *[string]* - Date Format in the site picker bar

* **onLoad** *(default: none)* *[function]* - Function called when picker is loaded
* **onOpen** *(default: none)* *[function]* - Function called when picker is open
* **onNewDate** *(default: none)* *[function]* - Function called when new Date is picked
* **outputElement** *(default: none)* *[string or Object]* - Returns the date inside a SPAN-tag, P-tag or A-Tag


#### Format 
|                            | Token              |Output                                   |
| --------------------------:| ------------------ | --------------------------------------- |
| Month                      | M                  | 1 2 ... 11 12                           |
|                            | Mo                 | 1st 2nd ... 11th 12th                   |
|                            | MM                 | 01 02 ... 11 12                         |
|                            | MMM                | Jan Feb ... Nov Dec                     |
|                            | MMMM               | January February ... November December  |
| Quarter                    | Q                  | 1 2 3 4                                 |
| Day of Month               | D                  | 1 2 ... 30 31                           |
|                            | Do                 | 1st 2nd ... 30th 31st                   |
|                            | DD                 | 01 02 ... 30 31                         |
| Day of Year                | DDD                | 1 2 ... 364 365                         |
|                            | DDDo               | 1st 2nd ... 364th 365th                 |
|                            | DDDD               | 001 002 ... 364 365                     |
| Day of Week                | d                  | 0 1 ... 5 6                             |
|                            | do                 | 0th 1st ... 5th 6th                     |
|                            | dd                 | Su Mo ... Fr Sa                         |
|                            | ddd                | Sun Mon ... Fri Sat                     |
|                            | dddd               | Sunday Monday ... Friday Saturday       |
| Day of Week (Locale)       | e                  | 0 1 ... 5 6                             |
| Day of Week (ISO)          | E                  | 1 2 ... 6 7                             |
| Week of Year               | w                  | 1 2 ... 52 53                           |
|                            | wo                 | 1st 2nd ... 52nd 53rd                   |
|                            | ww                 | 01 02 ... 52 53                         |
| Week of Year (ISO)         | W                  | 1 2 ... 52 53                           |
|                            | Wo                 | 1st 2nd ... 52nd 53rd                   |
|                            | WW                 | 01 02 ... 52 53                         |
| Year                       | YY                 | 70 71 ... 29 30                         |
|                            | YYYY               | 1970 1971 ... 2029 2030                 |
| Week Year                  | gg                 | 70 71 ... 29 30                         |
|                            | gggg               | 1970 1971 ... 2029 2030                 |
| Week Year (ISO)            | GG                 | 70 71 ... 29 30                         |
|                            | GGGG               | 1970 1971 ... 2029 2030                 |
| AM/PM                      | A                  | AM PM                                   |
|                            | a                  | am pm                                   |
| Hour                       | H                  | 0 1 ... 22 23                           |
|                            | HH                 | 00 01 ... 22 23                         |
|                            | h                  | 1 2 ... 11 12                           |
|                            | hh                 | 01 02 ... 11 12                         |
| Minute                     | m                  | 0 1 ... 58 59                           |
|                            | mm                 | 00 01 ... 58 59                         |
| Second                     | s                  | 0 1 ... 58 59                           |
|                            | ss                 | 00 01 ... 58 59                         |
| Fractional Second          | S                  | 0 1 ... 8 9                             |
|                            | SS                 | 00 01 ... 98 99                         |
|                            | SSS                | 000 001 ... 998 999                     |
|                            | SSSS ... SSSSSSSSS | 000[0..] 001[0..] ... 998[0..] 999[0..] |
| Timezone                   | z or zz            | EST CST ... MST PST                     |
|                            | Z                  | -07:00 -06:00 ... +06:00 +07:00         |
|                            | ZZ                 | -0700 -0600 ... +0600 +0700             |
| Unix Timestamp             | X                  | 1360013296                              |
| Unix Millisecond Timestamp | x                  | 1360013296123                           |

*source: http://momentjs.com/docs/#/displaying/format/ 23.10.2015*

### Example
```js
var monthpicker = new MaterialDatepicker('input', {
  lang: 'de',
  orientation: 'portrait',
  theme: 'dark',
  primary-color: 'red',
  date: new Date(861999834000),
  outputFormat: '{d} - {mm} - {yyyy} - {timestamp}',
  outputElment: '.month',
  onNewDate: function() {
               alert('New Date!!')
             }
});
```


## API

`.open()`

`.close()`

`.newDate( new Date(861999834000) )` set new Date

`.date` returns the current date

`.element` returns the choosen element

`.picker` returns the picker element



## Screenshots
### Material Monthpicker

![alt tag](https://raw.githubusercontent.com/FreddyFY/material-datepicker/master/links/images/screenshots/png/monthpicker-landscape.png)
![alt tag](https://raw.githubusercontent.com/FreddyFY/material-datepicker/master/links/images/screenshots/png/monthpicker-dark.png)
![alt tag](https://raw.githubusercontent.com/FreddyFY/material-datepicker/master/links/images/screenshots/png/monthpicker-portrait.png)
![alt tag](https://raw.githubusercontent.com/FreddyFY/material-datepicker/master/links/images/screenshots/png/monthpicker-primary.png)

