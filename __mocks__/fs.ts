/* eslint-disable @typescript-eslint/no-unused-vars */
import { PathLike, WriteFileOptions } from 'fs';

const fs = jest.requireActual('fs');

const { existsSync: existsSyncActual, writeFileSync: writeFileSyncActual, readFileSync: readFileSyncActual } = fs;

export const sysToMocksReplace = (path: PathLike | number) => path.toString().replace('/sys/class/leds', '__mocks__');

export const existsSync = jest.fn((path: PathLike): boolean => existsSyncActual(sysToMocksReplace(path)));

type writeFileSyncArgs = [PathLike | number, any, WriteFileOptions];

export const writeFileSync = jest.fn<void, writeFileSyncArgs>((path, data): void =>
  writeFileSyncActual(sysToMocksReplace(path), data)
);

export const readFileSync = jest.fn((path: PathLike | number): string | Buffer =>
  readFileSyncActual(sysToMocksReplace(path))
);

export default { existsSync, writeFileSync, readFileSync };
