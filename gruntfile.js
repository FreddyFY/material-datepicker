var fileList = [
  'src/vendor/moment-with-locales.js',
  'tmp/javascript/material-datepicker.js',
];

module.exports = function (grunt) {
  grunt.initConfig({
    babel: {
      options: {
        presets: ['@babel/preset-env']
      },
      dist: {
        src: 'src/javascript/material-datepicker.es6',
        dest: 'tmp/javascript/material-datepicker.js'
      }
    },
    concat: {
      only: {
        options: {
          separator: ';',
        },
        files: [{
          src: fileList[1],
          dest: 'dist/material-datepicker.js'
        }]
      },
      moment_js: {
        options: {
          separator: ';',
        },
        files: [{
          src: fileList,
          dest: 'dist/material-datepicker-with-moment-js.js'
        }]
      },
    },
    uglify: {
      only: {
        files: [{
          src: 'dist/material-datepicker.js',
          dest: 'dist/material-datepicker.min.js'
        }]
      },
      moment_js: {
        files: [{
          src: 'dist/material-datepicker-with-moment-js.js',
          dest: 'dist/material-datepicker-with-moment-js.min.js'
        }]
      }
    },
    less: {
      dist: {
        src: 'src/stylesheet/main.less',
        dest: 'dist/material-datepicker.css'
      }
    },
    cssmin: {
      dist: {
        src: 'dist/material-datepicker.css',
        dest: 'dist/material-datepicker.min.css'
      }
    },
    clean: [
      'tmp/'
    ],
    watch: {
      scripts: {
        files: ['src/**/*.es6', 'src/**/*.less'],
        tasks: ['development'],
        options: {
         interrupt: true
        }
      },
      configFiles: {
        files: ["gruntfile.js"],
        options:  {
          reload: true
        }
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  
  grunt.registerTask('default', ['babel', 'concat', 'uglify', 'less', 'cssmin', 'clean']);
  grunt.registerTask('development', ['babel', 'concat', 'less', 'clean'])
};
