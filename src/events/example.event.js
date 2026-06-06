import EventEmitter from 'events';

const appEvents = new EventEmitter();

appEvents.on('user.registered', (user) => {
  // send welcome email, audit log, analytics event, etc.
});

export default appEvents;
