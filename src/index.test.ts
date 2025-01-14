/* tslint:disable:no-unused-expression */
/* eslint-disable no-new */
import { writeFileSync, readFileSync } from 'fs';
import { sysToMocksReplace } from '../__mocks__/fs';

const fs = jest.requireActual('fs');

jest.mock('fs');

let LED: any;
let ON: any;
let OFF: any;
let module: any;

const BRIGHTNESS_FILE = '/sys/class/leds/led0/brightness';
const TRIGGER_FILE = '/sys/class/leds/led0/trigger';

beforeEach(() => {
  // @ts-ignore
  writeFileSync.mockClear();
  // @ts-ignore
  readFileSync.mockClear();

  fs.closeSync(fs.openSync(sysToMocksReplace(BRIGHTNESS_FILE), 'w'));
  fs.closeSync(fs.openSync(sysToMocksReplace(TRIGGER_FILE), 'w'));

  // This module runs file checks on module load so we need to require it after we mock out the led0 files
  // eslint-disable-next-line global-require
  const { LED: LEDActual, ON: ONActual, OFF: OFFActual, module: moduleActual } = require('.');
  LED = LEDActual;
  ON = ONActual;
  OFF = OFFActual;
  module = moduleActual;
});

afterEach(() => {
  fs.unlinkSync(sysToMocksReplace(TRIGGER_FILE));
  fs.unlinkSync(sysToMocksReplace(BRIGHTNESS_FILE));
});

describe('LED', () => {
  describe('constructor', () => {
    it('initiates led0 trigger file with "none"', () => {
      new LED();
      expect(readFileSync(TRIGGER_FILE).toString()).toEqual('none');
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
      writeFileSync(BRIGHTNESS_FILE, ON);

      const statusLed = new LED();

      expect(statusLed.read()).toEqual(ON);
    });

    it('returns OFF when brightness file is 0', () => {
      writeFileSync(BRIGHTNESS_FILE, OFF);

      const statusLed = new LED();

      expect(statusLed.read()).toEqual(OFF);
    });
  });

  describe('write', () => {
    it('writes ON and OFF to brightness file', () => {
      const statusLed = new LED();

      statusLed.write(ON);

      expect(readFileSync(BRIGHTNESS_FILE).toString()).toEqual(ON.toString());

      statusLed.write(OFF);

      expect(readFileSync(BRIGHTNESS_FILE).toString()).toEqual(OFF.toString());
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
