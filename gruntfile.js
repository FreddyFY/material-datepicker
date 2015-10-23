var fileList = [
  'assets/es5/lang.js',
  'assets/es5/lang/en.js',
  'assets/es5/lang/de.js',
  'assets/es5/lang/it.js',
  'assets/es5/material-datepicker.js',
  'assets/vendor/moment.min.js'
];

module.exports = function (grunt) {
  grunt.initConfig({
    babel: {
      dist: {
        src: 'assets/es6/material-datepicker.es6',
        dest: 'assets/es5/material-datepicker.js'
      }
    },
    uglify: {
      min: {
        files: [{
          src: fileList,
          dest: 'src/material-datepicker.min.js'
        }]
      }
    },
    less: {
      dist: {
        src: 'assets/stylesheet/main.less',
        dest: 'src/material-datepicker.css'
      }
    },
    cssmin: {
      dist: {
        src: 'src/material-datepicker.css',
        dest: 'src/material-datepicker.min.css'
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  
  grunt.registerTask('default',['babel', 'uglify', 'less', 'cssmin']);
};
