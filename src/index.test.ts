/* tslint:disable:no-unused-expression */
/* eslint-disable no-new */
import { writeFileSync, readFileSync, existsSync } from 'fs';
import { LED, ON, OFF, module } from '.';

jest.mock('fs');

describe('LED', () => {
  beforeEach(() => {
    // @ts-ignore
    writeFileSync.mockClear();
    // @ts-ignore
    readFileSync.mockClear();
  });

  describe('constructor', () => {
    it('initiates led0 trigger file with "none"', () => {
      new LED();

      expect(writeFileSync).toBeCalledTimes(1);
      expect(writeFileSync).toBeCalledWith('/sys/class/leds/led0/trigger', 'none');
    });
  });

  describe('hasLed', () => {
    it('returns true if both trigger and brightness files exists', () => {
      const statusLed = new LED();

      expect(statusLed.hasLed()).toBeTruthy();
    });
  });

  describe('read', () => {
    it('returns ON when brightness file is an int greater than 1', () => {
      // @ts-ignore
      writeFileSync('/sys/class/leds/led0/brightness', ON);

      const statusLed = new LED();

      expect(statusLed.read()).toEqual(ON);
    });

    it('returns OFF when brightness file is 0', () => {
      writeFileSync('/sys/class/leds/led0/brightness', OFF);

      const statusLed = new LED();

      expect(statusLed.read()).toEqual(OFF);
    });
  });

  describe('write', () => {
    it('writes ON and OFF to brightness file', () => {
      const statusLed = new LED();

      statusLed.write(ON);

      expect(readFileSync('/sys/class/leds/led0/brightness')).toEqual(ON.toString());

      statusLed.write(OFF);

      expect(readFileSync('/sys/class/leds/led0/brightness')).toEqual(OFF.toString());
    });

    it('throws an error if the brightness value is not 1 or 0', () => {
      const statusLed = new LED();
      // @ts-ignore
      expect(() => statusLed.write(123)).toThrowErrorMatchingInlineSnapshot(`"Invalid LED value 123"`);
    });
  });
});

describe('module', () => {
  it('creates a LED object', () => {
    expect(module.createLED()).toBeInstanceOf(LED);
  });
});
