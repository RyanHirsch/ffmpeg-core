import shell from 'shelljs';
import logger from './logger';

function getDuration(file) {
  const start = Date.now();
  logger.debug(`starting getDuration for ${file}`);
  return new Promise((resolve, reject) => {
    shell.exec(`ffprobe "${file}"`, { silent: true }, (code, out, err) => {
      const elapsed = Date.now() - start;
      if(code !== 0) {
        logger.debug(`getDuration for ${file} failed after ${elapsed}ms`);
        return reject({ code, out, err });
      }
      logger.debug(`getDuration for ${file} was successful after ${elapsed}ms`);
      const [, length] = (/Duration: (\S+),\s/.exec(err));
      return resolve(getMilliseconds(length));
    });
  });
}
function getTime(str) {
  const matches = (/\s+time=(\d{2}:\d{2}:\d{2}.\d{2})\s+/).exec(str);
  if(!matches) {
    return '';
  }
  const [, time] = matches;
  return time;
}

function getMilliseconds(timestamp) {
  const matches = (/(\d{2}):(\d{2}):(\d{2}).(\d{2})/).exec(timestamp);
  if(!matches) {
    return 0;
  }
  const [, hours, minutes, seconds, partialSeconds] = matches;
  return (
    (parseInt(hours, 10) * 60 * 60) +
    (parseInt(minutes, 10) * 60) +
    (parseInt(seconds, 10)) +
    (parseFloat(`0.${partialSeconds}`))
  ) * 1000;
}

export {
  getTime,
  getMilliseconds,
  getDuration,
};
