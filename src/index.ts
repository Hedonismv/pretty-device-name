import { execSync } from 'child_process';
import { hostname } from 'os';

export const getPrettyDeviceName = (): string => {
  switch (process.platform) {
    case 'win32': {
      let computerName = '';
      try {
        const result = execSync('wmic computersystem get model')
          .toString()
          .trim();
        const [, computerNameLine] = result.split('\r\n');
        computerName = computerNameLine.trim();
      } catch (error) {
        console.error('Error retrieving win32 pretty computer name:', error);
      }
      return computerName || hostname();
    }
    case 'darwin':
      try {
        return execSync('scutil --get ComputerName').toString().trim();
      } catch (error) {
        console.error('Error retrieving darwin pretty computer name:', error);
        return hostname();
      }

    case 'linux':
      try {
        const prettyname = execSync('hostnamectl --pretty').toString().trim();
        return prettyname === '' ? hostname() : prettyname;
      } catch (error) {
        console.error('Error retrieving linux pretty computer name:', error);
        return hostname();
      }
    default:
      return hostname();
  }
};
