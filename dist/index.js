"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrettyDeviceName = void 0;
const node_child_process_1 = require("node:child_process");
const node_os_1 = require("node:os");
const getPrettyDeviceName = () => {
    switch (process.platform) {
        case 'win32': {
            let computerName = '';
            try {
                const result = (0, node_child_process_1.execSync)('wmic computersystem get model')
                    .toString()
                    .trim();
                const [, computerNameLine] = result.split('\n');
                computerName = computerNameLine.trim();
            }
            catch (error) {
                console.error('Error retrieving pretty computer name:', error);
            }
            return computerName || (0, node_os_1.hostname)();
        }
        case 'darwin':
            try {
                return (0, node_child_process_1.execSync)('scutil --get ComputerName').toString().trim();
            }
            catch (error) {
                console.error('Error retrieving pretty computer name:', error);
                return (0, node_os_1.hostname)();
            }
        case 'linux':
            try {
                const prettyname = (0, node_child_process_1.execSync)('hostnamectl --pretty').toString().trim();
                return prettyname === '' ? (0, node_os_1.hostname)() : prettyname;
            }
            catch (error) {
                console.error('Error retrieving pretty computer name:', error);
                return (0, node_os_1.hostname)();
            }
        default:
            return (0, node_os_1.hostname)();
    }
};
exports.getPrettyDeviceName = getPrettyDeviceName;
//# sourceMappingURL=index.js.map