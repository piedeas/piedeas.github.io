function loadConfig(path) {
    var glob = require('glob'),
        object = {},
        key;

    glob.sync('*', {cwd: path}).forEach(function(option) {
        key = option.replace(/\.js$/,'');
        object[key] = require(path + option);
    });

    return object;
}

module.exports = function(grunt) {
  var config = {
    pkg: grunt.file.readJSON('package.json'),
    // Get Paths
    js: "js/",
  };

  // Combine Config files
  grunt.util._.extend(config, loadConfig('./grunt-tasks/options/'));

  grunt.initConfig(config);

  require('load-grunt-tasks')(grunt);

  grunt.loadTasks('grunt-tasks');

  grunt.registerTask('default', ['uglify']);
  //grunt.registerTask('test', ['requirejs', 'uglify', 'sass', 'cssmin']);
};
