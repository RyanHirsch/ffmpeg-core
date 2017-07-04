import expect from 'expect';
import logger from '../../src/logger';

function spyConsole(test) {
  expect.spyOn(console, 'log');
  expect.spyOn(console, 'error');
  test();
  expect.restoreSpies();
}

describe('logger', () => {

  it('has an error function', () => {
    expect(logger.error).toBeA('function');
  });
  it('has an log function', () => {
    expect(logger.log).toBeA('function');
  });
  it('has an debug function', () => {
    expect(logger.debug).toBeA('function');
  });
  it('uses stderr on error calls', () => {
    expect.spyOn(console, 'log');
    expect.spyOn(console, 'error');

    logger.error('ahhh!!');
    expect(console.error).toHaveBeenCalled();

    console.log.restore();
    console.error.restore();
  });
});
