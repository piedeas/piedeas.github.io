//cssmin config
module.exports = {
  piedeas: {
    options : {
      keepSpecialComments: 0
    },
    files: [
      {
        expand: true,
        cwd: 'css',
        src: [ '*.css', '!*.min.css'],
        dest: 'css',
        ext: '.min.css'
      }
    ]
  }
}
