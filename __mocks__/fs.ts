/* eslint-disable @typescript-eslint/no-unused-vars */
import { PathLike, WriteFileOptions } from 'fs';

interface IWriteTracker {
  [key: string]: any;
}

export const writeTracker: IWriteTracker = {};

export const existsSync = jest.fn((path: PathLike): boolean => true);

type writeFileSyncArgs = [PathLike | number, any, WriteFileOptions];

export const writeFileSync = jest.fn<void, writeFileSyncArgs>((path, data): void => {
  writeTracker[path.toString()] = data.toString();
});

export const readFileSync = jest.fn(
  (path: PathLike | number, options?: { encoding?: string | null; flag?: string } | string | null): string | Buffer => {
    return writeTracker[path.toString()];
  }
);

export default { existsSync, writeFileSync, readFileSync };
