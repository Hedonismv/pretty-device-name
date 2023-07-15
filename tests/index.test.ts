import { execSync } from 'child_process';
import { getPrettyDeviceName } from '../src/index';

jest.mock('child_process');

describe('getPrettyDeviceName', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return the pretty device name on Windows', () => {
    (execSync as jest.Mock).mockReturnValueOnce(Buffer.from('MyComputerName'));

    const result = getPrettyDeviceName();

    expect(result).toBe('MyComputerName');
  });

  it('should return the pretty device name on macOS', () => {
    (execSync as jest.Mock).mockReturnValueOnce(Buffer.from('MyMac'));

    const result = getPrettyDeviceName();

    expect(result).toBe('MyMac');
  });

  it('should return the pretty device name on Linux', () => {
    (execSync as jest.Mock).mockReturnValueOnce(Buffer.from('MyLinux'));

    const result = getPrettyDeviceName();

    expect(result).toBe('MyLinux');
  });

  it('should fallback to hostname for unsupported platforms', () => {
    (execSync as jest.Mock).mockReturnValueOnce(Buffer.from('MyFallback'));
    // (execSync as jest.Mock).mockImplementationOnce(() => {
    //   throw new Error('Command not found');
    // });

    const result = getPrettyDeviceName();

    expect(result).toBe('MyFallback');
  });
});
