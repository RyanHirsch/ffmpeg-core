import logger from './logger';
import convert from './convert';

const infile = '/Users/ryanhirsch/src/ffmpeg-core/superman_1941_512kb.mp4';
const outfile = `/Users/ryanhirsch/src/ffmpeg-core/faux-${Date.now()}.mp3`;
const converting$ = convert(infile, outfile, '-b:a 64k');

converting$
  .map(duration => ({
    duration,
    outfile,
  }))
  .subscribe(
    ({ duration, outfile }) => logger.log('next', duration),
    (...args) => logger.error('error', args),
    (...args) => logger.log('complete!', args),
  );
