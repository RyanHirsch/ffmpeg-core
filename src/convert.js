import Rx from 'rxjs';
import { spawn } from 'child_process';
import {
  getTime,
  getMilliseconds,
  getDuration,
} from './duration';

function convert(source, dest, options = '') {
  const args = options.split(' ').filter(x => x);
  const duration$ = Rx.Observable.fromPromise(getDuration(source));
  const progress$ = Rx.Observable.create(observer => {
    const ffmpeg = spawn('ffmpeg', ['-i', source, ...args, dest]);
    ffmpeg
      .on('error', err => {
        observer.error(err);
      })
      .on('exit', function (code) {
        if(code !== 0) {
          observer.error('exited with non-zero');
        }
      });

    ffmpeg.stdout.on('end', () => {
      observer.complete();
    });

    ffmpeg.stderr.on('data', data => {
      const progressMarker = getTime(data.toString());
      observer.next(getMilliseconds(progressMarker));
    });
  });
  return duration$.combineLatest(
    progress$,
    (total, position) => (position / total),
  );
}

export default convert;
