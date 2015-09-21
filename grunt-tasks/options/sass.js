module.exports = {
  piedeas: {
    files: [
      {
        expand : true,
        cwd: 'css/scss',
        src: [ '*.scss' ],
        dest: 'css/',
        ext: '.css'
      }
    ]
  }
}
