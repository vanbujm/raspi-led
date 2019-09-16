"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.module = exports.LED = exports.ON = exports.OFF = void 0;

var _fs = require("fs");

var _raspiPeripheral = require("raspi-peripheral");

/*
The MIT License (MIT)

Copyright (c) Bryan Hughes <bryan@nebri.us>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
const hasLed = (0, _fs.existsSync)('/sys/class/leds/led0') && (0, _fs.existsSync)('/sys/class/leds/led0/trigger') && (0, _fs.existsSync)('/sys/class/leds/led0/brightness');
const OFF = 0;
exports.OFF = OFF;
const ON = 1;
exports.ON = ON;

class LED extends _raspiPeripheral.Peripheral {
  constructor() {
    super([]);

    if (hasLed) {
      (0, _fs.writeFileSync)('/sys/class/leds/led0/trigger', 'none');
    }
  }

  hasLed() {
    return hasLed;
  }

  read() {
    if (hasLed) {
      return parseInt((0, _fs.readFileSync)('/sys/class/leds/led0/brightness').toString(), 10) ? ON : OFF;
    }

    return OFF;
  }

  write(value) {
    this.validateAlive();

    if ([ON, OFF].indexOf(value) === -1) {
      throw new Error(`Invalid LED value ${value}`);
    }

    if (hasLed) {
      (0, _fs.writeFileSync)('/sys/class/leds/led0/brightness', value ? '1' : '0');
    }
  }

}

exports.LED = LED;
const _module = {
  createLED() {
    return new LED();
  }

};
exports.module = _module;
//# sourceMappingURL=index.js.map