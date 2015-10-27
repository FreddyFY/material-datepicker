var fileList = [
  'src/vendor/moment-with-locales.js',
  'tmp/javascript/material-datepicker.js',
];

module.exports = function (grunt) {
  grunt.initConfig({
    babel: {
      dist: {
        src: 'src/javascript/material-datepicker.es6',
        dest: 'tmp/javascript/material-datepicker.js'
      }
    },
    uglify: {
      merge_only: {
        options: {
          beautify: true,
          mangle: false
        },
        files: [{
          src: fileList[1],
          dest: 'dist/material-datepicker.js'
        }]
      },
      merge_moment_js: {
        options: {
          beautify: true,
          mangle: false
        },
        files: [{
          src: fileList,
          dest: 'dist/material-datepicker-with-moment-js.js'
        }]
      },
      min_only: {
        files: [{
          src: 'dist/material-datepicker.js',
          dest: 'dist/material-datepicker.min.js'
        }]
      },
      min_moment_js: {
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
    ]
  });
  
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  
  grunt.registerTask('default', [
                                'babel',
                                'uglify:merge_moment_js', 'uglify:min_moment_js',
                                'uglify:merge_only', 'uglify:min_only',
                                'less', 'cssmin',
                                'clean'
                               ]);
  grunt.registerTask('development', [
    
  ])
};
