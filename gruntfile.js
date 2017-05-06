module.exports = function (grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        sass: {
            dev: {
                options: {
                    style: 'expanded',
                },
                files: {
                    'public/css/site.css' : 'public/scss/site.scss',
                    'public/css/creative.css' : 'public/scss/creative.scss',
                    'public/css/switchOnOff.css' : 'public/scss/switchOnOff.scss'
                }
            },
            dist: {
                options: {
                style: 'compressed',
                },
                files: {
                    'public/css/site.min.css' : 'public/scss/site.scss',
                    'public/css/creative.min.css' : 'public/scss/creative.scss',
                    'public/css/switchOnOff.min.css' : 'public/scss/switchOnOff.scss'
                }
            }
        },

        watch: {
            css: {
                files: '**/*.scss',
                tasks: ['sass']
            }
        },

        nodemon: {
            all: {
                script: 'server.js',
                options: {
                    watchedExtensions: ['js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.registerTask('default', ['nodemon','watch']);
}