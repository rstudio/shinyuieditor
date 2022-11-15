"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.escapeDoubleQuotes = exports.connectToRProcess = void 0;
const child_process_1 = require("child_process");
const node_process_1 = __importDefault(require("node:process"));
const STARTUP_TIMEOUT_MS = 5000;
const STARTUP_COMMAND = `library(shinyuieditor)`;
const rCallargs = ["--silent", "--slave", "--no-save", "--no-restore"];
function connectToRProcess({ pathToR, }) {
    let logs = "";
    const running = false;
    return new Promise((resolve) => {
        const controller = new AbortController();
        const { signal } = controller;
        const spawnedProcess = (0, child_process_1.spawn)(pathToR, rCallargs, { signal });
        // spawnedProcess.pid;
        const killProcess = () => {
            // Process never started
            if (!spawnedProcess.pid)
                return;
            console.log("Killing backend R process", spawnedProcess.pid);
            node_process_1.default.kill(spawnedProcess.pid);
        };
        const runCmd = (cmd, timeout_ms) => runRCommand(cmd, spawnedProcess, timeout_ms);
        function gatherLogs(type, logMsg) {
            logs += `${type}: ${logMsg}`;
        }
        spawnedProcess.on("spawn", () => {
            console.log("R Process is active!");
            clearTimeout(startTimeout);
            sendMsgToProc(STARTUP_COMMAND, spawnedProcess);
            resolve({
                proc: spawnedProcess,
                runCmd,
                stop: killProcess,
            });
        });
        spawnedProcess.on("error", (d) => {
            console.log("Spun up R had error", d);
        });
        spawnedProcess.stdout.on("data", (d) => {
            gatherLogs("out", d.toString());
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
const START_SIGNAL = "SUE_START_SIGNAL";
const END_SIGNAL = "SUE_END_SIGNAL";
async function runRCommand(cmd, rProc, timeout_ms = 5000) {
    let logs = "";
    let seenNonEmptyOutput = false;
    let seenStartSignal = false;
    const lines = [];
    return new Promise((resolve) => {
        function listenForOutput(d) {
            const outputLines = d.toString().split("\n");
            for (const l of outputLines) {
                logs += l + "\n";
                if (l.includes(START_SIGNAL)) {
                    seenStartSignal = true;
                    continue;
                }
                if (!seenStartSignal) {
                    continue;
                }
                if (!seenNonEmptyOutput && l.length === 0) {
                    continue;
                }
                if (l.includes(END_SIGNAL)) {
                    clearTimeout(startTimeout);
                    resolve(lines);
                    rProc.stdout.off("data", listenForOutput);
                    break;
                }
                // If we're not seeing the start signal or the end signal then we're
                // looking at the command
                seenNonEmptyOutput = true;
                lines.push(l);
            }
        }
        rProc.stdout.on("data", listenForOutput);
        const startTimeout = setTimeout(() => {
            throw new Error(`Timeout, no response from run command within ${timeout_ms}ms: ${cmd}\n Logs:\n ${logs}`);
        }, timeout_ms);
        sendMsgToProc(`print('${START_SIGNAL}');${cmd};print('${END_SIGNAL}')`, rProc);
    });
}
function escapeDoubleQuotes(cmd) {
    return cmd.replace(/"/g, `\\"`);
}
exports.escapeDoubleQuotes = escapeDoubleQuotes;
//# sourceMappingURL=connectToRProcess.js.map