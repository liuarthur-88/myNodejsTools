const Service = require('node-windows').Service;

// Create a new service object
const svc = new Service({
  name: 'eVoyze FAST Shop',
  description: 'Auto-run night audit',
  // eslint-disable-next-line max-len
  script: 'C:\\Users\\asus\\Documents\\My Work\\NodeJS\\evoyze-autorun-dayend\\app\\scheduler.js',
});

// Listen for the "uninstall" event so we know when it's done.
svc.on('uninstall', function() {
  console.log('Uninstall complete.');
  console.log('The service exists: ', svc.exists);
});

// Uninstall the service.
svc.uninstall();
