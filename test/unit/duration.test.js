import expect from 'expect';
import { getTime, getMilliseconds } from '../../src/duration';
const timings = [
  'size=     533kB time=00:00:34.09 bitrate= 128.2kbits/s speed=68.2',
  'size=    1054kB time=00:01:07.39 bitrate= 128.1kbits/s speed=67.4',
  'size=    1609kB time=00:01:42.92 bitrate= 128.1kbits/s speed=68.6',
  'size=    2169kB time=00:02:18.76 bitrate= 128.0kbits/s speed=69.4',
  'size=    2733kB time=00:02:54.86 bitrate= 128.0kbits/s speed=69.9',
  'size=    3292kB time=00:03:30.65 bitrate= 128.0kbits/s speed=70.2',
  'size=    3857kB time=00:04:06.77 bitrate= 128.0kbits/s speed=70.5',
  'size=    4424kB time=00:04:43.06 bitrate= 128.0kbits/s speed=70.7',
  'size=    4986kB time=00:05:19.08 bitrate= 128.0kbits/s speed=70.9',
  'size=    5547kB time=00:05:54.95 bitrate= 128.0kbits/s speed=  71',
  'size=    6111kB time=00:06:31.02 bitrate= 128.0kbits/s speed=71.1',
  'size=    6668kB time=00:07:06.68 bitrate= 128.0kbits/s speed=71.1',
  'size=    7229kB time=00:07:42.62 bitrate= 128.0kbits/s speed=71.2',
  'size=    7793kB time=00:08:18.73 bitrate= 128.0kbits/s speed=71.2',
  'size=    8354kB time=00:08:54.59 bitrate= 128.0kbits/s speed=71.3',
  'size=    8790kB time=00:09:22.49 bitrate= 128.0kbits/s speed=71.2',
];

describe('progress', () => {
  it('extracts the time', () => {
    const result = getTime(timings[0]);
    expect(result).toEqual('00:00:34.09');
  });
  it('computes ms from seconds', () => {
    const result = getMilliseconds('00:00:01.00');
    expect(result).toEqual(1000);
  });
  it('computes ms from partial seconds', () => {
    const result = getMilliseconds('00:00:00.10');
    expect(result).toEqual(100);
  });
});
