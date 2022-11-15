"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRpath = exports.getRPathConfigEntry = exports.getRpathFromSystem = exports.config = void 0;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const vscode = __importStar(require("vscode"));
const winreg = require("winreg");
function config() {
    return vscode.workspace.getConfiguration("r");
}
exports.config = config;
function getRfromEnvPath(platform) {
    let splitChar = ":";
    let fileExtension = "";
    if (platform === "win32") {
        splitChar = ";";
        fileExtension = ".exe";
    }
    const os_paths = process.env.PATH
        ? process.env.PATH.split(splitChar)
        : [];
    for (const os_path of os_paths) {
        const os_r_path = path_1.default.join(os_path, "R" + fileExtension);
        if ((0, fs_1.existsSync)(os_r_path)) {
            return os_r_path;
        }
    }
    return "";
}
async function getRpathFromSystem() {
    let rpath = "";
    const platform = process.platform;
    rpath || (rpath = getRfromEnvPath(platform));
    if (!rpath && platform === "win32") {
        // Find path from registry
        try {
            const key = new winreg({
                hive: winreg.HKLM,
                key: "\\Software\\R-Core\\R",
            });
            const item = await new Promise((c, e) => key.get("InstallPath", (err, result) => err === null ? c(result) : e(err)));
            rpath = path_1.default.join(item.value, "bin", "R.exe");
        }
        catch (e) {
            rpath = "";
        }
    }
    return rpath;
}
exports.getRpathFromSystem = getRpathFromSystem;
function getRPathConfigEntry(term = false) {
    const trunc = term ? "rterm" : "rpath";
    const platform = process.platform === "win32"
        ? "windows"
        : process.platform === "darwin"
            ? "mac"
            : "linux";
    return `${trunc}.${platform}`;
}
exports.getRPathConfigEntry = getRPathConfigEntry;
async function getRpath(quote = false, overwriteConfig) {
    let rpath = "";
    // try the config entry specified in the function arg:
    if (overwriteConfig) {
        rpath = config().get(overwriteConfig);
    }
    // try the os-specific config entry for the rpath:
    const configEntry = getRPathConfigEntry();
    rpath || (rpath = config().get(configEntry));
    // read from path/registry:
    rpath || (rpath = await getRpathFromSystem());
    // represent all invalid paths (undefined, '', null) as undefined:
    rpath || (rpath = undefined);
    if (!rpath) {
        // inform user about missing R path:
        void vscode.window.showErrorMessage(`Cannot find R to use for help, package installation etc. Change setting r.${configEntry} to R path.`);
    }
    else if (quote && /^[^'"].* .*[^'"]$/.exec(rpath)) {
        // if requested and rpath contains spaces, add quotes:
        rpath = `"${rpath}"`;
    }
    else if (!quote) {
        rpath = rpath.replace(/^"(.*)"$/, "$1");
        rpath = rpath.replace(/^'(.*)'$/, "$1");
    }
    else if (process.platform === "win32" && /^'.* .*'$/.exec(rpath)) {
        // replace single quotes with double quotes on windows
        rpath = rpath.replace(/^'(.*)'$/, '"$1"');
    }
    return rpath;
}
exports.getRpath = getRpath;
//# sourceMappingURL=setupRConnection.js.map