const Service = require('node-windows').Service;

// Create a new service object
const svc = new Service({
  name: 'eVoyze Kiosk Service ',
  description: 'Kiosk Service',
  // eslint-disable-next-line max-len
  script: 'C:\\Users\\asus\\Documents\\My Work\\NodeJS\\evoyze-autorun-dayend\\app\\scheduler.js',
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install', function() {
  svc.start();
});

svc.install();
