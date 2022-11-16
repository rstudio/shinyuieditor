"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// ../../node_modules/winreg/lib/registry.js
var require_registry = __commonJS({
  "../../node_modules/winreg/lib/registry.js"(exports, module2) {
    var util = require("util");
    var path2 = require("path");
    var spawn2 = require("child_process").spawn;
    var log = function() {
    };
    var HKLM = "HKLM";
    var HKCU = "HKCU";
    var HKCR = "HKCR";
    var HKU = "HKU";
    var HKCC = "HKCC";
    var HIVES = [HKLM, HKCU, HKCR, HKU, HKCC];
    var REG_SZ = "REG_SZ";
    var REG_MULTI_SZ = "REG_MULTI_SZ";
    var REG_EXPAND_SZ = "REG_EXPAND_SZ";
    var REG_DWORD = "REG_DWORD";
    var REG_QWORD = "REG_QWORD";
    var REG_BINARY = "REG_BINARY";
    var REG_NONE = "REG_NONE";
    var REG_TYPES = [REG_SZ, REG_MULTI_SZ, REG_EXPAND_SZ, REG_DWORD, REG_QWORD, REG_BINARY, REG_NONE];
    var DEFAULT_VALUE = "";
    var KEY_PATTERN = /(\\[a-zA-Z0-9_\s]+)*/;
    var PATH_PATTERN = /^(HKEY_LOCAL_MACHINE|HKEY_CURRENT_USER|HKEY_CLASSES_ROOT|HKEY_USERS|HKEY_CURRENT_CONFIG)(.*)$/;
    var ITEM_PATTERN = /^(.*)\s(REG_SZ|REG_MULTI_SZ|REG_EXPAND_SZ|REG_DWORD|REG_QWORD|REG_BINARY|REG_NONE)\s+([^\s].*)$/;
    function ProcessUncleanExitError(message, code) {
      if (!(this instanceof ProcessUncleanExitError))
        return new ProcessUncleanExitError(message, code);
      Error.captureStackTrace(this, ProcessUncleanExitError);
      this.__defineGetter__("name", function() {
        return ProcessUncleanExitError.name;
      });
      this.__defineGetter__("message", function() {
        return message;
      });
      this.__defineGetter__("code", function() {
        return code;
      });
    }
    util.inherits(ProcessUncleanExitError, Error);
    function captureOutput(child) {
      var output = { "stdout": "", "stderr": "" };
      child.stdout.on("data", function(data) {
        output["stdout"] += data.toString();
      });
      child.stderr.on("data", function(data) {
        output["stderr"] += data.toString();
      });
      return output;
    }
    function mkErrorMsg(registryCommand, code, output) {
      var stdout = output["stdout"].trim();
      var stderr = output["stderr"].trim();
      var msg = util.format("%s command exited with code %d:\n%s\n%s", registryCommand, code, stdout, stderr);
      return new ProcessUncleanExitError(msg, code);
    }
    function convertArchString(archString) {
      if (archString == "x64") {
        return "64";
      } else if (archString == "x86") {
        return "32";
      } else {
        throw new Error("illegal architecture: " + archString + " (use x86 or x64)");
      }
    }
    function pushArch(args, arch) {
      if (arch) {
        args.push("/reg:" + convertArchString(arch));
      }
    }
    function getRegExePath() {
      if (process.platform === "win32") {
        return path2.join(process.env.windir, "system32", "reg.exe");
      } else {
        return "REG";
      }
    }
    function RegistryItem(host, hive, key, name, type, value, arch) {
      if (!(this instanceof RegistryItem))
        return new RegistryItem(host, hive, key, name, type, value, arch);
      var _host = host, _hive = hive, _key = key, _name = name, _type = type, _value = value, _arch = arch;
      this.__defineGetter__("host", function() {
        return _host;
      });
      this.__defineGetter__("hive", function() {
        return _hive;
      });
      this.__defineGetter__("key", function() {
        return _key;
      });
      this.__defineGetter__("name", function() {
        return _name;
      });
      this.__defineGetter__("type", function() {
        return _type;
      });
      this.__defineGetter__("value", function() {
        return _value;
      });
      this.__defineGetter__("arch", function() {
        return _arch;
      });
    }
    util.inherits(RegistryItem, Object);
    function Registry(options) {
      if (!(this instanceof Registry))
        return new Registry(options);
      var _options = options || {}, _host = "" + (_options.host || ""), _hive = "" + (_options.hive || HKLM), _key = "" + (_options.key || ""), _arch = _options.arch || null;
      this.__defineGetter__("host", function() {
        return _host;
      });
      this.__defineGetter__("hive", function() {
        return _hive;
      });
      this.__defineGetter__("key", function() {
        return _key;
      });
      this.__defineGetter__("path", function() {
        return (_host.length == 0 ? "" : "\\\\" + _host + "\\") + _hive + _key;
      });
      this.__defineGetter__("arch", function() {
        return _arch;
      });
      this.__defineGetter__("parent", function() {
        var i = _key.lastIndexOf("\\");
        return new Registry({
          host: this.host,
          hive: this.hive,
          key: i == -1 ? "" : _key.substring(0, i),
          arch: this.arch
        });
      });
      if (HIVES.indexOf(_hive) == -1)
        throw new Error("illegal hive specified.");
      if (!KEY_PATTERN.test(_key))
        throw new Error("illegal key specified.");
      if (_arch && _arch != "x64" && _arch != "x86")
        throw new Error("illegal architecture specified (use x86 or x64)");
    }
    Registry.HKLM = HKLM;
    Registry.HKCU = HKCU;
    Registry.HKCR = HKCR;
    Registry.HKU = HKU;
    Registry.HKCC = HKCC;
    Registry.HIVES = HIVES;
    Registry.REG_SZ = REG_SZ;
    Registry.REG_MULTI_SZ = REG_MULTI_SZ;
    Registry.REG_EXPAND_SZ = REG_EXPAND_SZ;
    Registry.REG_DWORD = REG_DWORD;
    Registry.REG_QWORD = REG_QWORD;
    Registry.REG_BINARY = REG_BINARY;
    Registry.REG_NONE = REG_NONE;
    Registry.REG_TYPES = REG_TYPES;
    Registry.DEFAULT_VALUE = DEFAULT_VALUE;
    Registry.prototype.values = function values(cb) {
      if (typeof cb !== "function")
        throw new TypeError("must specify a callback");
      var args = ["QUERY", this.path];
      pushArch(args, this.arch);
      var proc = spawn2(getRegExePath(), args, {
        cwd: void 0,
        env: process.env,
        stdio: ["ignore", "pipe", "pipe"]
      }), buffer = "", self = this, error = null;
      var output = captureOutput(proc);
      proc.on("close", function(code) {
        if (error) {
          return;
        } else if (code !== 0) {
          log("process exited with code " + code);
          cb(mkErrorMsg("QUERY", code, output), null);
        } else {
          var items = [], result = [], lines = buffer.split("\n"), lineNumber = 0;
          for (var i = 0, l = lines.length; i < l; i++) {
            var line = lines[i].trim();
            if (line.length > 0) {
              log(line);
              if (lineNumber != 0) {
                items.push(line);
              }
              ++lineNumber;
            }
          }
          for (var i = 0, l = items.length; i < l; i++) {
            var match = ITEM_PATTERN.exec(items[i]), name, type, value;
            if (match) {
              name = match[1].trim();
              type = match[2].trim();
              value = match[3];
              result.push(new RegistryItem(self.host, self.hive, self.key, name, type, value, self.arch));
            }
          }
          cb(null, result);
        }
      });
      proc.stdout.on("data", function(data) {
        buffer += data.toString();
      });
      proc.on("error", function(err) {
        error = err;
        cb(err);
      });
      return this;
    };
    Registry.prototype.keys = function keys(cb) {
      if (typeof cb !== "function")
        throw new TypeError("must specify a callback");
      var args = ["QUERY", this.path];
      pushArch(args, this.arch);
      var proc = spawn2(getRegExePath(), args, {
        cwd: void 0,
        env: process.env,
        stdio: ["ignore", "pipe", "pipe"]
      }), buffer = "", self = this, error = null;
      var output = captureOutput(proc);
      proc.on("close", function(code) {
        if (error) {
          return;
        } else if (code !== 0) {
          log("process exited with code " + code);
          cb(mkErrorMsg("QUERY", code, output), null);
        }
      });
      proc.stdout.on("data", function(data) {
        buffer += data.toString();
      });
      proc.stdout.on("end", function() {
        var items = [], result = [], lines = buffer.split("\n");
        for (var i = 0, l = lines.length; i < l; i++) {
          var line = lines[i].trim();
          if (line.length > 0) {
            log(line);
            items.push(line);
          }
        }
        for (var i = 0, l = items.length; i < l; i++) {
          var match = PATH_PATTERN.exec(items[i]), hive, key;
          if (match) {
            hive = match[1];
            key = match[2];
            if (key && key !== self.key) {
              result.push(new Registry({
                host: self.host,
                hive: self.hive,
                key,
                arch: self.arch
              }));
            }
          }
        }
        cb(null, result);
      });
      proc.on("error", function(err) {
        error = err;
        cb(err);
      });
      return this;
    };
    Registry.prototype.get = function get(name, cb) {
      if (typeof cb !== "function")
        throw new TypeError("must specify a callback");
      var args = ["QUERY", this.path];
      if (name == "")
        args.push("/ve");
      else
        args = args.concat(["/v", name]);
      pushArch(args, this.arch);
      var proc = spawn2(getRegExePath(), args, {
        cwd: void 0,
        env: process.env,
        stdio: ["ignore", "pipe", "pipe"]
      }), buffer = "", self = this, error = null;
      var output = captureOutput(proc);
      proc.on("close", function(code) {
        if (error) {
          return;
        } else if (code !== 0) {
          log("process exited with code " + code);
          cb(mkErrorMsg("QUERY", code, output), null);
        } else {
          var items = [], result = null, lines = buffer.split("\n"), lineNumber = 0;
          for (var i = 0, l = lines.length; i < l; i++) {
            var line = lines[i].trim();
            if (line.length > 0) {
              log(line);
              if (lineNumber != 0) {
                items.push(line);
              }
              ++lineNumber;
            }
          }
          var item = items[items.length - 1] || "", match = ITEM_PATTERN.exec(item), name2, type, value;
          if (match) {
            name2 = match[1].trim();
            type = match[2].trim();
            value = match[3];
            result = new RegistryItem(self.host, self.hive, self.key, name2, type, value, self.arch);
          }
          cb(null, result);
        }
      });
      proc.stdout.on("data", function(data) {
        buffer += data.toString();
      });
      proc.on("error", function(err) {
        error = err;
        cb(err);
      });
      return this;
    };
    Registry.prototype.set = function set(name, type, value, cb) {
      if (typeof cb !== "function")
        throw new TypeError("must specify a callback");
      if (REG_TYPES.indexOf(type) == -1)
        throw Error("illegal type specified.");
      var args = ["ADD", this.path];
      if (name == "")
        args.push("/ve");
      else
        args = args.concat(["/v", name]);
      args = args.concat(["/t", type, "/d", value, "/f"]);
      pushArch(args, this.arch);
      var proc = spawn2(getRegExePath(), args, {
        cwd: void 0,
        env: process.env,
        stdio: ["ignore", "pipe", "pipe"]
      }), error = null;
      var output = captureOutput(proc);
      proc.on("close", function(code) {
        if (error) {
          return;
        } else if (code !== 0) {
          log("process exited with code " + code);
          cb(mkErrorMsg("ADD", code, output, null));
        } else {
          cb(null);
        }
      });
      proc.stdout.on("data", function(data) {
        log("" + data);
      });
      proc.on("error", function(err) {
        error = err;
        cb(err);
      });
      return this;
    };
    Registry.prototype.remove = function remove(name, cb) {
      if (typeof cb !== "function")
        throw new TypeError("must specify a callback");
      var args = name ? ["DELETE", this.path, "/f", "/v", name] : ["DELETE", this.path, "/f", "/ve"];
      pushArch(args, this.arch);
      var proc = spawn2(getRegExePath(), args, {
        cwd: void 0,
        env: process.env,
        stdio: ["ignore", "pipe", "pipe"]
      }), error = null;
      var output = captureOutput(proc);
      proc.on("close", function(code) {
        if (error) {
          return;
        } else if (code !== 0) {
          log("process exited with code " + code);
          cb(mkErrorMsg("DELETE", code, output), null);
        } else {
          cb(null);
        }
      });
      proc.stdout.on("data", function(data) {
        log("" + data);
      });
      proc.on("error", function(err) {
        error = err;
        cb(err);
      });
      return this;
    };
    Registry.prototype.clear = function clear(cb) {
      if (typeof cb !== "function")
        throw new TypeError("must specify a callback");
      var args = ["DELETE", this.path, "/f", "/va"];
      pushArch(args, this.arch);
      var proc = spawn2(getRegExePath(), args, {
        cwd: void 0,
        env: process.env,
        stdio: ["ignore", "pipe", "pipe"]
      }), error = null;
      var output = captureOutput(proc);
      proc.on("close", function(code) {
        if (error) {
          return;
        } else if (code !== 0) {
          log("process exited with code " + code);
          cb(mkErrorMsg("DELETE", code, output), null);
        } else {
          cb(null);
        }
      });
      proc.stdout.on("data", function(data) {
        log("" + data);
      });
      proc.on("error", function(err) {
        error = err;
        cb(err);
      });
      return this;
    };
    Registry.prototype.erase = Registry.prototype.clear;
    Registry.prototype.destroy = function destroy(cb) {
      if (typeof cb !== "function")
        throw new TypeError("must specify a callback");
      var args = ["DELETE", this.path, "/f"];
      pushArch(args, this.arch);
      var proc = spawn2(getRegExePath(), args, {
        cwd: void 0,
        env: process.env,
        stdio: ["ignore", "pipe", "pipe"]
      }), error = null;
      var output = captureOutput(proc);
      proc.on("close", function(code) {
        if (error) {
          return;
        } else if (code !== 0) {
          log("process exited with code " + code);
          cb(mkErrorMsg("DELETE", code, output), null);
        } else {
          cb(null);
        }
      });
      proc.stdout.on("data", function(data) {
        log("" + data);
      });
      proc.on("error", function(err) {
        error = err;
        cb(err);
      });
      return this;
    };
    Registry.prototype.create = function create(cb) {
      if (typeof cb !== "function")
        throw new TypeError("must specify a callback");
      var args = ["ADD", this.path, "/f"];
      pushArch(args, this.arch);
      var proc = spawn2(getRegExePath(), args, {
        cwd: void 0,
        env: process.env,
        stdio: ["ignore", "pipe", "pipe"]
      }), error = null;
      var output = captureOutput(proc);
      proc.on("close", function(code) {
        if (error) {
          return;
        } else if (code !== 0) {
          log("process exited with code " + code);
          cb(mkErrorMsg("ADD", code, output), null);
        } else {
          cb(null);
        }
      });
      proc.stdout.on("data", function(data) {
        log("" + data);
      });
      proc.on("error", function(err) {
        error = err;
        cb(err);
      });
      return this;
    };
    Registry.prototype.keyExists = function keyExists(cb) {
      this.values(function(err, items) {
        if (err) {
          if (err.code == 1) {
            return cb(null, false);
          }
          return cb(err);
        }
        cb(null, true);
      });
      return this;
    };
    Registry.prototype.valueExists = function valueExists(name, cb) {
      this.get(name, function(err, item) {
        if (err) {
          if (err.code == 1) {
            return cb(null, false);
          }
          return cb(err);
        }
        cb(null, true);
      });
      return this;
    };
    module2.exports = Registry;
  }
});

// src/extension.ts
var extension_exports = {};
__export(extension_exports, {
  activate: () => activate
});
module.exports = __toCommonJS(extension_exports);

// ../communication-types/src/index.ts
function isRecord(value) {
  return typeof value === "object" && value !== null;
}
function isMessageFromClient(x) {
  if (!isRecord(x))
    return false;
  return "path" in x;
}

// src/shinyuieditor_extension.ts
var vscode2 = __toESM(require("vscode"));

// src/string-utils.ts
function collapseText(...textLines) {
  return textLines.reduce((all, l, i) => (i === 0 ? "" : all + "\n") + l, "");
}
function escapeDoubleQuotes(cmd) {
  return cmd.replace(/"/g, `\\"`);
}

// src/R-Utils/generateUpdatedUiCode.ts
async function generateUpdatedUiCode(uiTree, RProc) {
  const rCommand = buildGeneratingCommand(uiTree);
  try {
    const generatedUiCode = await RProc.runCmd(rCommand, { verbose: false });
    return JSON.parse(collapseText(...generatedUiCode));
  } catch (e) {
    throw new Error("Failed to generate new ui code from tree");
  }
}
function buildGeneratingCommand(uiTree, removeNamespace = true) {
  const jsonifiedTree = escapeDoubleQuotes(JSON.stringify(uiTree, null, 2));
  const removeNamespaceArg = removeNamespace ? "TRUE" : "FALSE";
  return collapseText(
    `ui_tree <- jsonlite::fromJSON(`,
    `  txt = "${jsonifiedTree}",`,
    `  simplifyVector = FALSE`,
    `)`,
    `new_ui_code <- shinyuieditor:::ui_tree_to_code(ui_tree, remove_namespace = ${removeNamespaceArg})`,
    `new_ui_code$text <- as.character(new_ui_code$text)`,
    `jsonlite::toJSON(new_ui_code, auto_unbox = TRUE)`
  );
}

// src/R-Utils/getRProcess.ts
var import_child_process = require("child_process");
var import_node_process = __toESM(require("process"));

// src/R-Utils/runRCommand.ts
var START_SIGNAL = "SUE_START_SIGNAL";
var END_SIGNAL = "SUE_END_SIGNAL";
function makeLogger(verbose, prefix) {
  return (msg) => {
    if (verbose) {
      console.log(prefix + msg);
    }
  };
}
async function runRCommand(rProc, cmd, { timeout_ms = 500, verbose = false } = {}) {
  const logger = makeLogger(verbose, "runRCommand: ");
  let logs = "";
  let seenNonEmptyOutput = false;
  let seenStartSignal = false;
  const lines = [];
  return new Promise((resolve) => {
    function listenForOutput(d) {
      const outputLines = d.toString().split("\n");
      for (const l of outputLines) {
        logs += l + "\n";
        logger(l);
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
          logger("Output finished");
          rProc.stdout.off("data", listenForOutput);
          break;
        }
        seenNonEmptyOutput = true;
        lines.push(l);
      }
    }
    rProc.stdout.on("data", listenForOutput);
    const startTimeout = setTimeout(() => {
      throw new Error(
        `Timeout, no response from run command within ${timeout_ms}ms: ${cmd}
 Logs:
 ${logs}`
      );
    }, timeout_ms);
    sendMsgToProc(
      `print('${START_SIGNAL}');${cmd};print('${END_SIGNAL}')`,
      rProc
    );
  });
}

// src/R-Utils/setupRConnection.ts
var import_fs = require("fs");
var import_path = __toESM(require("path"));
var vscode = __toESM(require("vscode"));
var winreg = require_registry();
function config() {
  return vscode.workspace.getConfiguration("r");
}
function getRfromEnvPath(platform) {
  let splitChar = ":";
  let fileExtension = "";
  if (platform === "win32") {
    splitChar = ";";
    fileExtension = ".exe";
  }
  const os_paths = process.env.PATH ? process.env.PATH.split(splitChar) : [];
  for (const os_path of os_paths) {
    const os_r_path = import_path.default.join(os_path, "R" + fileExtension);
    if ((0, import_fs.existsSync)(os_r_path)) {
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
    try {
      const key = new winreg({
        hive: winreg.HKLM,
        key: "\\Software\\R-Core\\R"
      });
      const item = await new Promise(
        (c, e) => key.get(
          "InstallPath",
          (err, result) => err === null ? c(result) : e(err)
        )
      );
      rpath = import_path.default.join(item.value, "bin", "R.exe");
    } catch (e) {
      rpath = "";
    }
  }
  return rpath;
}
function getRPathConfigEntry(term = false) {
  const trunc = term ? "rterm" : "rpath";
  const platform = process.platform === "win32" ? "windows" : process.platform === "darwin" ? "mac" : "linux";
  return `${trunc}.${platform}`;
}
async function getRpath(quote = false, overwriteConfig) {
  let rpath = "";
  if (overwriteConfig) {
    rpath = config().get(overwriteConfig);
  }
  const configEntry = getRPathConfigEntry();
  rpath || (rpath = config().get(configEntry));
  rpath || (rpath = await getRpathFromSystem());
  rpath || (rpath = void 0);
  if (!rpath) {
    void vscode.window.showErrorMessage(
      `Cannot find R to use for help, package installation etc. Change setting r.${configEntry} to R path.`
    );
  } else if (quote && /^[^'"].* .*[^'"]$/.exec(rpath)) {
    rpath = `"${rpath}"`;
  } else if (!quote) {
    rpath = rpath.replace(/^"(.*)"$/, "$1");
    rpath = rpath.replace(/^'(.*)'$/, "$1");
  } else if (process.platform === "win32" && /^'.* .*'$/.exec(rpath)) {
    rpath = rpath.replace(/^'(.*)'$/, '"$1"');
  }
  return rpath;
}

// src/R-Utils/getRProcess.ts
var STARTUP_TIMEOUT_MS = 5e3;
var STARTUP_COMMAND = `library(shinyuieditor)`;
var rCallargs = ["--silent", "--slave", "--no-save", "--no-restore"];
function connectToRProcess({
  pathToR
}) {
  let logs = "";
  return new Promise((resolve) => {
    const controller = new AbortController();
    const { signal } = controller;
    const spawnedProcess = (0, import_child_process.spawn)(pathToR, rCallargs, { signal });
    const killProcess = () => {
      if (!spawnedProcess.pid)
        return;
      console.log("Killing backend R process", spawnedProcess.pid);
      import_node_process.default.kill(spawnedProcess.pid);
    };
    const runCmd = (cmd, opts) => runRCommand(spawnedProcess, cmd, opts);
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
        stop: killProcess
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
      console.log("Spun up R process has shut down. Logs:", logs);
    });
    const startTimeout = setTimeout(() => {
      console.error("Starting backend server failed.\n Logs:\n" + logs);
      resolve(null);
    }, STARTUP_TIMEOUT_MS);
  });
}
async function getRProcess() {
  const rPath = await getRpath();
  if (rPath === void 0) {
    throw new Error("Can't get R path");
  }
  const RProc = await connectToRProcess({ pathToR: rPath });
  if (RProc === null) {
    throw new Error("R process failed to start :(");
  }
  return RProc;
}
function sendMsgToProc(msg, proc) {
  proc.stdin.write(`${msg}
`);
}

// src/R-Utils/parseAppFile.ts
async function getAppFile(fileText, RProcess) {
  const parseCommand = buildParseCommand(fileText);
  const parsedCommandOutput = await RProcess.runCmd(parseCommand);
  try {
    const parsedAppInfo = JSON.parse(
      parsedCommandOutput.reduce((all, l) => all + "\n" + l, "")
    );
    return parsedAppInfo;
  } catch {
    throw new Error(
      "Could not get document as json. Content is not valid json"
    );
  }
}
function buildParseCommand(appText) {
  const escapedAppText = escapeDoubleQuotes(appText);
  return collapseText(
    `app_lines <- strsplit("${escapedAppText}", "\\n")[[1]]`,
    `jsonlite::toJSON(`,
    `  shinyuieditor:::get_file_ui_definition_info(app_lines, "single-file"),`,
    `  auto_unbox = TRUE`,
    `)`
  );
}

// src/util.ts
function getNonce() {
  let text = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

// src/shinyuieditor_extension.ts
var _ShinyUiEditorProvider = class {
  constructor(context) {
    this.context = context;
    this.RProcess = null;
    this.uiBounds = null;
    this.sendMessage = null;
    getRProcess().then((rProc) => {
      this.RProcess = rProc;
    });
    console.log("extension constructor()!");
  }
  static register(context) {
    const provider = new _ShinyUiEditorProvider(context);
    const providerRegistration = vscode2.window.registerCustomEditorProvider(
      _ShinyUiEditorProvider.viewType,
      provider
    );
    return providerRegistration;
  }
  async resolveCustomTextEditor(document, webviewPanel, _token) {
    console.log("Editor window is opened!", document.fileName);
    webviewPanel.webview.options = { enableScripts: true };
    webviewPanel.webview.html = this.getHtmlForWebview(webviewPanel.webview);
    const changeDocumentSubscription = vscode2.workspace.onDidChangeTextDocument(
      (e) => {
        if (e.document.uri.toString() === document.uri.toString()) {
          console.log("New text file in view!");
        }
      }
    );
    webviewPanel.onDidDispose(() => {
      changeDocumentSubscription.dispose();
      console.log("Editor window closed");
    });
    webviewPanel.webview.onDidReceiveMessage((e) => {
      if (isMessageFromClient(e)) {
        console.log("Message from client!", e);
        switch (e.path) {
          case "READY-FOR-STATE": {
            if (!this.RProcess) {
              return;
            }
            getAppFile(document.getText(), this.RProcess).then((parsedApp) => {
              var _a;
              this.uiBounds = parsedApp.ui_bounds;
              (_a = this.sendMessage) == null ? void 0 : _a.call(this, {
                path: "UPDATED-TREE",
                payload: parsedApp.ui_tree
              });
            });
            return;
          }
          case "UPDATED-TREE": {
            const uiTree = e.payload;
            if (!this.RProcess) {
              return;
            }
            generateUpdatedUiCode(uiTree, this.RProcess).then((uiCode) => {
              console.log("New ui text", uiCode);
              if (!this.uiBounds)
                throw new Error("Ui Bounds are missing, something went wrong");
              this.updateAppUI(document, this.uiBounds, uiCode);
            });
            return;
          }
          default: {
            console.warn("Unhandled message from client", e);
          }
        }
      } else {
        console.log("Unknown message from webview", e);
      }
    });
    this.sendMessage = (msg) => webviewPanel.webview.postMessage(msg);
  }
  getHtmlForWebview(webview) {
    const scriptUri = webview.asWebviewUri(
      vscode2.Uri.joinPath(
        this.context.extensionUri,
        "media",
        "build",
        "bundle.js"
      )
    );
    const styleMainUri = webview.asWebviewUri(
      vscode2.Uri.joinPath(
        this.context.extensionUri,
        "media",
        "build",
        "bundle.css"
      )
    );
    const nonce = getNonce();
    return `
			<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<script>
				// This is needed for various older packages that require the global
				// object to be defined because it typically was with older bundlers like
				// webpack
				var global = window;
			  <\/script>
				<!--
				Use a content security policy to only allow loading images from https or from our extension directory,
				and only allow scripts that have a specific nonce.
				-->
				<meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src ${webview.cspSource} data:; style-src ${webview.cspSource} 'unsafe-inline'; script-src 'nonce-${nonce}';">

				<meta name="viewport" content="width=device-width, initial-scale=1.0">

				
				<link href="${styleMainUri}" rel="stylesheet" />
				
				<title>Shiny UI Editor</title>
			</head>
			<body>
				<noscript>You need to enable JavaScript to run this app.</noscript>
				<div id="root" style="height: 100vh; display: relative"></div>
				<script nonce="${nonce}" src="${scriptUri}"><\/script>
			</body>
			</html>`;
  }
  updateAppUI(document, { start, end }, uiCode) {
    const uiRange = new vscode2.Range(start - 1, 0, end, 0);
    const edit = new vscode2.WorkspaceEdit();
    const newUiText = `ui <- ${collapseText(...uiCode.text)}
`;
    edit.replace(document.uri, uiRange, newUiText);
    vscode2.workspace.applyEdit(edit);
    const oldUiNumLines = end - start + 1;
    const newUiNumLines = uiCode.text.length;
    const uiNumLinesDiff = newUiNumLines - oldUiNumLines;
    const newBounds = {
      start,
      end: end - uiNumLinesDiff
    };
    return newBounds;
  }
};
var ShinyUiEditorProvider = _ShinyUiEditorProvider;
ShinyUiEditorProvider.viewType = "shinyUiEditor.appFile";

// src/extension.ts
function activate(context) {
  context.subscriptions.push(ShinyUiEditorProvider.register(context));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  activate
});
//# sourceMappingURL=extension.js.map
