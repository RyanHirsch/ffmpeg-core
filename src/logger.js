import debugLogger from 'debug';
const name = 'ffmpeg-core';

const log = debugLogger(`${name}:log`);
log.log = console.log.bind(console); // eslint-disable-line no-console

const debug = debugLogger(`${name}:debug`);
debug.log = console.log.bind(console); // eslint-disable-line no-console

const error = debugLogger(`${name}:error`);

const logger = {
  debug,
  log,
  error,
};

export default logger;
