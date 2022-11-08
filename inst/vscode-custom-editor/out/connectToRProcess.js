"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToRProcess = void 0;
const child_process_1 = require("child_process");
const STARTUP_TIMEOUT_MS = 5000;
const STARTUP_COMMAND = `library(shinyuieditor)`;
const findReadyToGo = />/;
function connectToRProcess({ pathToR, }) {
    let logs = "";
    let running = false;
    return new Promise((resolve) => {
        const controller = new AbortController();
        const { signal } = controller;
        const spawnedProcess = (0, child_process_1.spawn)(pathToR, ["--no-save"], { signal });
        const runCmd = (cmd, timeout_ms) => runRCommand(cmd, spawnedProcess, timeout_ms);
        function gatherLogs(type, logMsg) {
            logs += `${type}: ${logMsg}`;
        }
        spawnedProcess.stdout.on("data", (d) => {
            const logMsg = d.toString();
            gatherLogs("out", logMsg);
            if (!running && findReadyToGo.test(logMsg)) {
                resolve({
                    proc: spawnedProcess,
                    runCmd,
                });
                clearTimeout(startTimeout);
                sendMsgToProc(STARTUP_COMMAND, spawnedProcess);
                running = true;
            }
        });
        spawnedProcess.stderr.on("data", (d) => {
            gatherLogs("error", d.toString());
        });
        spawnedProcess.on("close", () => {
            console.log("Spun up R process has shut down");
        });
        // Start a timeout to call off the test if we fail to detect the server
        // startup message. This could happen if the log format is changed etc.
        const startTimeout = setTimeout(() => {
            console.error("Starting backend server failed.\n Logs:\n" + logs);
            resolve(null);
        }, STARTUP_TIMEOUT_MS);
    });
}
exports.connectToRProcess = connectToRProcess;
function sendMsgToProc(msg, proc) {
    proc.stdin.write(`${msg}\n`);
}
async function runRCommand(cmd, rProc, timeout_ms = 5000) {
    let logs = "";
    return new Promise((resolve) => {
        rProc.stdout.on("data", (d) => {
            const output = d.toString();
            logs += output + "\n";
            if (!output.includes(cmd))
                return;
            clearTimeout(startTimeout);
            resolve(output);
        });
        const startTimeout = setTimeout(() => {
            throw new Error(`Timeout, no response from run command within ${timeout_ms}ms: ${cmd}\n Logs:\n ${logs}`);
        }, timeout_ms);
        sendMsgToProc(cmd, rProc);
    });
}
//# sourceMappingURL=connectToRProcess.js.map