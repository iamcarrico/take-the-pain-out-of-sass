'use strict';

module.exports = function (grunt) {

  grunt.initConfig({
    watch: {
      options: {
        livereload: 9001
      },
      css: {
        files: ['sass/{,**/}*.scss'],
        tasks: ['compass:dev']
      },
    },

    compass: {
      options: {
        config: 'config.rb',
        bundleExec: true
      },
      dev: {
        options: {
          environment: 'development'
        }
      },
      dist: {
        options: {
          environment: 'production',
          imagesDir: 'img',
          force: true
        }
      }
    },

    imagemin: {
      dist: {
        options: {
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          cwd: 'images',
          src: ['**/*.png', '**/*.jpg'],
          dest: 'img/'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'img',
          src: '**/*.svg',
          dest: 'img-min'
        }]
      }
    },

    parallel: {
      assets: {
        grunt: true,
        tasks: ['imagemin', 'svgmin']
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-parallel');
  grunt.loadNpmTasks('grunt-svgmin');

  grunt.registerTask('deploy', [
    'parallel:assets',
    'compass:dist',
  ]);

  grunt.registerTask('default', ['watch']);
};