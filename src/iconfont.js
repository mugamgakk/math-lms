const Fontagon = require('fontagon');

Fontagon({
  files: [
    'src/assets/icon/**/*.svg'
  ],
  dist: 'src/icon-font',
  fontName: 'icon-font',
  style: 'css',
  classOptions: {
    baseClass: 'icon-font',
    classPrefix: 'ic'
  }
}).then((opts) => {
  console.log('done! ' ,opts)
}).catch((err) => {
  console.log('fail! ', err)
})

{/* <i class="icon-font ft-icon ic-apple"></i> */}