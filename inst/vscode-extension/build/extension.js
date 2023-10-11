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
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// ../../node_modules/winreg/lib/registry.js
var require_registry = __commonJS({
  "../../node_modules/winreg/lib/registry.js"(exports, module2) {
    var util = require("util");
    var path2 = require("path");
    var spawn3 = require("child_process").spawn;
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
      var proc = spawn3(getRegExePath(), args, {
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
      var proc = spawn3(getRegExePath(), args, {
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
      var proc = spawn3(getRegExePath(), args, {
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
      var proc = spawn3(getRegExePath(), args, {
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
      var proc = spawn3(getRegExePath(), args, {
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
      var proc = spawn3(getRegExePath(), args, {
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
      var proc = spawn3(getRegExePath(), args, {
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
      var proc = spawn3(getRegExePath(), args, {
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
var vscode10 = __toESM(require("vscode"));

// src/commands/launchEditor.ts
var import_vscode = require("vscode");
var vscode = __toESM(require("vscode"));

// src/commands/appFileUtils.ts
var defaultAppName = "app.R";
var nameRootRegex = /^([\w|\s]+)([\.[\w|^\.]*]*)$/i;
function validateAppFileName(fileName) {
  if (fileName === "") {
    return {
      valid: true,
      name: defaultAppName
    };
  }
  const nameRoot = fileName.match(nameRootRegex);
  if (nameRoot === null) {
    return {
      valid: false,
      msg: `Invalid app name: ${fileName}.`
    };
  }
  let [full, base, extension] = nameRoot;
  if (extension === "" || extension === ".") {
    extension = ".R";
  }
  if (!base) {
    return {
      valid: false,
      msg: `Invalid app name: ${fileName}. Make sure to only use numbers and letters. Spaces will be converted to dashes.`
    };
  }
  if (extension !== ".R") {
    return {
      valid: false,
      msg: `Invalid file extension: ${extension}. Extension needs to be .R`
    };
  }
  base = base.replaceAll(" ", "-");
  return {
    valid: true,
    name: `${base}${extension}`
  };
}
var emptyAppContent = new TextEncoder().encode("");

// src/commands/launchEditor.ts
async function launchEditor() {
  const uri = await import_vscode.window.showOpenDialog({
    canSelectFolders: true,
    canSelectFiles: true,
    title: "Choose location for Shiny app",
    openLabel: "Choose app folder or file",
    canSelectMany: false,
    filters: {
      "R scripts": ["R", "r"]
    }
  });
  if (!uri)
    return;
  const selection = uri[0];
  const isDirectory = (await vscode.workspace.fs.stat(selection)).type === vscode.FileType.Directory;
  const newAppFile = isDirectory ? await getAppFileFromDirectory(selection) : selection;
  if (!newAppFile) {
    return;
  }
  vscode.commands.executeCommand(
    "vscode.openWith",
    newAppFile,
    "shinyuieditor.appFile"
  );
}
async function getAppFileFromDirectory(appDir) {
  const existingFilesInFolder = (await import_vscode.workspace.fs.readDirectory(appDir)).filter(([_, type]) => type === vscode.FileType.File).map(([name, _]) => name);
  const nameForFile = await import_vscode.window.showInputBox({
    prompt: "Enter file name for new app",
    placeHolder: defaultAppName,
    validateInput(inputName) {
      const validatedName2 = validateAppFileName(inputName);
      if (!validatedName2.valid) {
        return {
          message: validatedName2.msg,
          severity: vscode.InputBoxValidationSeverity.Error
        };
      }
      if (existingFilesInFolder.includes(validatedName2.name)) {
        return {
          message: `Run the editor on existing app: ${validatedName2.name}.`,
          severity: vscode.InputBoxValidationSeverity.Info
        };
      }
      return {
        message: `Run the template chooser to build new app: ${validatedName2.name}.`,
        severity: vscode.InputBoxValidationSeverity.Info
      };
    }
  });
  if (!nameForFile) {
    return;
  }
  const validatedName = validateAppFileName(nameForFile);
  if (!validatedName.valid) {
    vscode.window.showErrorMessage(
      `Error processing requested file name: ${nameForFile}. Try with a different name.`
    );
    return;
  }
  const newAppFile = import_vscode.Uri.joinPath(appDir, validatedName.name);
  const alreadyExists = existingFilesInFolder.includes(validatedName.name);
  if (!alreadyExists) {
    await import_vscode.workspace.fs.writeFile(newAppFile, emptyAppContent);
  }
  return newAppFile;
}

// src/commands/startEditorOnActiveFile.ts
var vscode2 = __toESM(require("vscode"));
var import_vscode2 = require("vscode");
function startEditorOnActiveFile(name = "world") {
  const activeEditor = import_vscode2.window.activeTextEditor;
  if (!activeEditor) {
    import_vscode2.window.showErrorMessage("No active file open to run ui editor on!");
    return;
  }
  vscode2.commands.executeCommand(
    "vscode.openWith",
    activeEditor.document.uri,
    "shinyuieditor.appFile"
  );
}

// src/shinyuieditor_extension.ts
var vscode9 = __toESM(require("vscode"));

// src/appScriptStatus.ts
function getLanguageMode(lang_id) {
  if (lang_id === "python")
    return "PYTHON";
  if (lang_id === "r")
    return "R";
  return "OTHER";
}
function appScriptStatus(document) {
  const lang = getLanguageMode(document.languageId);
  if (lang === "OTHER")
    return {
      status: "invalid",
      reason: "The editor currently only supports R and Python."
    };
  const scriptText = document.getText();
  if (scriptText.trim() === "") {
    return {
      status: "empty",
      lang
    };
  }
  return lang === "R" ? checkIfValidRShinyScript(scriptText) : checkIfValidPyShinyScript(scriptText);
}
function checkIfValidRShinyScript(script) {
  if (RShinyAppCommandRegex.test(script)) {
    return { status: "valid", lang: "R" };
  }
  return {
    status: "invalid",
    reason: "Script doesn't appear to be a shiny app. Please start with a template or add a shinyApp() call."
  };
}
var RShinyAppCommandRegex = /shinyApp\(/;
function checkIfValidPyShinyScript(script) {
  if (script.includes("from shiny")) {
    return { status: "valid", lang: "PYTHON" };
  }
  return {
    status: "invalid",
    reason: "Script doesn't appear to be a shiny app. Please start with a template or make sure you're importing shiny."
  };
}

// ../communication-types/src/isRecord.ts
function isRecord(value) {
  return typeof value === "object" && value !== null;
}

// ../communication-types/src/MessageToBackend.ts
function isMessageToBackend(x) {
  if (!isRecord(x))
    return false;
  return "path" in x;
}

// ../../node_modules/just-debounce-it/index.mjs
var functionDebounce = debounce;
function debounce(fn, wait, callFirst) {
  var timeout = null;
  var debouncedFn = null;
  var clear = function() {
    if (timeout) {
      clearTimeout(timeout);
      debouncedFn = null;
      timeout = null;
    }
  };
  var flush = function() {
    var call = debouncedFn;
    clear();
    if (call) {
      call();
    }
  };
  var debounceWrapper = function() {
    if (!wait) {
      return fn.apply(this, arguments);
    }
    var context = this;
    var args = arguments;
    var callNow = callFirst && !timeout;
    clear();
    debouncedFn = function() {
      fn.apply(context, args);
    };
    timeout = setTimeout(function() {
      timeout = null;
      if (!callNow) {
        var call = debouncedFn;
        debouncedFn = null;
        return call();
      }
    }, wait);
    if (callNow) {
      return debouncedFn();
    }
  };
  debounceWrapper.cancel = clear;
  debounceWrapper.flush = flush;
  return debounceWrapper;
}

// src/editorLogic.ts
var vscode8 = __toESM(require("vscode"));

// src/startProcess.ts
var import_child_process = require("child_process");
async function startProcess(path_to_executable, commands4, opts = {}) {
  let logs = "";
  return new Promise((resolve) => {
    const controller = new AbortController();
    const { signal } = controller;
    const spawnedProcess = (0, import_child_process.spawn)(path_to_executable, commands4, { signal });
    spawnedProcess.on("spawn", onSpawn);
    spawnedProcess.on("error", onError);
    spawnedProcess.on("close", onClose);
    spawnedProcess.stdout.on("data", onStdout);
    spawnedProcess.stderr.on("data", onStderr);
    function gatherLogs(type, logMsg) {
      logs += `${type}: ${logMsg}`;
    }
    function eventLog(msg) {
      if (!opts.verbose)
        return;
      console.log(
        `%c[RProc ${spawnedProcess.pid}] %c${msg.replaceAll(/\n$/g, "").replaceAll(/\n/g, "\n\u2219\u2219\u2219 ")}`,
        "color: orangered;",
        "color: grey; opacity: 0.5"
      );
    }
    function onSpawn() {
      eventLog(`spawned`);
      clearTimeout(startTimeout);
      resolve({
        proc: spawnedProcess,
        stop,
        getIsRunning: () => spawnedProcess.exitCode === null
      });
    }
    function onError(d) {
      var _a;
      eventLog(`Error: 
${d.toString()}`);
      clearTimeout(startTimeout);
      (_a = opts.onError) == null ? void 0 : _a.call(opts, d);
    }
    function onClose() {
      var _a;
      eventLog(`Closed`);
      clearTimeout(startTimeout);
      (_a = opts.onClose) == null ? void 0 : _a.call(opts);
    }
    function onStdout(d) {
      var _a;
      const msg = d.toString();
      eventLog(`stdout: 
${msg}`);
      gatherLogs("out", msg);
      (_a = opts.onStdout) == null ? void 0 : _a.call(opts, msg);
    }
    function onStderr(d) {
      var _a;
      const msg = d.toString();
      eventLog(`stderr: ${msg}`);
      gatherLogs("error", msg);
      (_a = opts.onStderr) == null ? void 0 : _a.call(opts, msg);
    }
    function cleanupListeners() {
      spawnedProcess.off("spawn", onSpawn);
      spawnedProcess.off("error", onError);
      spawnedProcess.off("close", onClose);
      spawnedProcess.stdout.off("data", onStdout);
      spawnedProcess.stderr.off("data", onStderr);
    }
    function stop() {
      cleanupListeners();
      if (!spawnedProcess.pid || !spawnedProcess.connected) {
        return true;
      }
      eventLog(`Killing R process ${spawnedProcess.pid}`);
      return process.kill(spawnedProcess.pid);
    }
    const startTimeout = setTimeout(() => {
      stop();
      throw new Error("Starting backend server failed.\n Logs:\n" + logs);
    }, opts.timeout_ms ?? 5e3);
  });
}

// src/Python-Utils/get_path_to_python.ts
var vscode3 = __toESM(require("vscode"));
async function getPathToPython() {
  var _a;
  const pythonAPI = vscode3.extensions.getExtension("ms-python.python");
  if (!pythonAPI) {
    throw new Error("Python extension needed for previewing Python apps");
  }
  const execution_details = await pythonAPI.exports.environment.getExecutionDetails(
    (_a = vscode3.window.activeTextEditor) == null ? void 0 : _a.document.uri
  );
  return execution_details.execCommand.join(" ");
}

// src/app-preview/get_python_app_startup_info.ts
async function getPythonAppStartupInfo({
  pathToApp,
  port,
  host
}) {
  const listen_for_ready_regex = new RegExp(
    `application startup complete.`,
    "i"
  );
  return {
    path_to_executable: await getPathToPython(),
    startup_cmds: [
      `-m`,
      `shiny`,
      `run`,
      `--port`,
      `${port}`,
      `--host`,
      host,
      `--reload`,
      pathToApp.replace(/([\\"])/g, "\\$1")
    ],
    get_is_ready: (msg) => listen_for_ready_regex.test(msg)
  };
}

// ../util-functions/src/strings.ts
function collapseText(...textLines) {
  const cleanLines = textLines.filter((l) => l !== void 0);
  return cleanLines.reduce((all, l, i) => (i === 0 ? "" : all + "\n") + l, "");
}
function removeQuotes(x) {
  return x.replace(/^"(.*)"$/, "$1").replace(/^'(.*)'$/, "$1");
}

// src/R-Utils/getPathToR.ts
var import_fs2 = require("fs");

// src/R-Utils/getRpathFromSystem.ts
var import_fs = require("fs");
var import_path = __toESM(require("path"));
var winreg = require_registry();
async function getRpathFromSystem() {
  const platform = process.platform;
  let rpath = getRfromEnvPath(platform);
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

// src/R-Utils/getPathToR.ts
async function getPathToR() {
  const pathToR = await getRpathFromSystem();
  if (!pathToR) {
    const errMsg = `Cannot find R for running shinyuieditor. Make sure R is installed and/or updating the shinyuieditor extension settings option to proper to R path.`;
    throw new Error(errMsg);
  }
  if (!(0, import_fs2.existsSync)(pathToR)) {
    const errMsg = `Path to R is invalid: ${pathToR}. Make sure R is installed and/or updating the shinyuieditor extension settings option to proper to R path.`;
    throw new Error(errMsg);
  }
  return removeQuotes(pathToR);
}

// src/app-preview/get_r_app_startup_info.ts
async function getRAppStartupInfo({
  pathToApp,
  port,
  host
}) {
  const listen_for_ready_regex = new RegExp(`listening on .+${port}`, "i");
  const pathToR = await getPathToR();
  return {
    path_to_executable: pathToR,
    startup_cmds: [
      "--no-save",
      "--no-restore",
      "--silent",
      "-e",
      collapseText(
        `options(shiny.autoreload = TRUE)`,
        `shiny::runApp(appDir = "${pathToApp}", port = ${port}, host = "${host}")`
      )
    ],
    get_is_ready: (msg) => listen_for_ready_regex.test(msg)
  };
}

// src/app-preview/getRemoteSafeUrl.ts
var fs = __toESM(require("fs"));
var vscode4 = __toESM(require("vscode"));

// src/extension-api-utils/runShellCommand.ts
var import_child_process2 = require("child_process");
async function runShellCommand({
  cmd,
  args,
  verbose = false,
  timeout_ms = 1500
}) {
  const logger = makeLogger(verbose, "runShellCommand: ");
  return new Promise((resolve) => {
    const output = { stdout: [], stderr: [] };
    const spawnedProcess = (0, import_child_process2.spawn)(cmd, args);
    function onSpawn() {
      logger("Spawned");
    }
    function onError(e) {
      logger("Error " + e.message);
      cleanup();
      resolve({ status: "error", errorMsgs: e.message, ...output });
    }
    function onClose() {
      logger("Close");
      cleanup();
      resolve({ status: "success", ...output });
    }
    function onStdout(d) {
      logger(`stdout: ${d.toString()}`);
      output.stdout.push(d.toString());
    }
    function onStderr(d) {
      logger(`stderr: ${d.toString()}`);
      output.stderr.push(d.toString());
    }
    function cleanup() {
      clearTimeout(startTimeout);
      spawnedProcess.off("spawn", onSpawn);
      spawnedProcess.off("error", onError);
      spawnedProcess.off("close", onClose);
      spawnedProcess.stdout.off("data", onStdout);
      spawnedProcess.stderr.off("data", onStderr);
    }
    const startTimeout = setTimeout(() => {
      resolve({
        status: "error",
        errorMsgs: `Command, no response from run command within ${timeout_ms}ms:
${cmd} ${args == null ? void 0 : args.join(
          " "
        )}`,
        ...output
      });
      cleanup();
    }, timeout_ms);
    spawnedProcess.on("spawn", onSpawn);
    spawnedProcess.on("error", onError);
    spawnedProcess.on("close", onClose);
    spawnedProcess.stdout.on("data", onStdout);
    spawnedProcess.stderr.on("data", onStderr);
  });
}
function makeLogger(verbose, prefix) {
  return (msg) => {
    if (verbose) {
      console.log(prefix + msg);
    }
  };
}

// src/app-preview/getRemoteSafeUrl.ts
async function getRemoteSafeUrl(local_port) {
  if (getInPositWorkbench()) {
    return await getForwardedWorkbenchUrl(local_port);
  }
  const local_uri = vscode4.Uri.parse(`http://localhost:${local_port}`);
  return (await vscode4.env.asExternalUri(local_uri)).toString();
}
var WORKBENCH_URL_FORWARDING_BINARY = "/usr/lib/rstudio-server/bin/rserver-url";
function getInPositWorkbench() {
  const env_variables_exist = "RS_SERVER_URL" in process.env;
  if (!env_variables_exist)
    return false;
  const forwarding_binary_exists = fs.existsSync(
    WORKBENCH_URL_FORWARDING_BINARY
  );
  return forwarding_binary_exists;
}
async function getForwardedWorkbenchUrl(local_port) {
  const port_forward_cmd_output = await runShellCommand({
    cmd: WORKBENCH_URL_FORWARDING_BINARY,
    args: [String(local_port)]
  });
  if (port_forward_cmd_output.status === "error") {
    Error(
      "Failed to get Posit workbench forwarded port. Error msg:\n" + port_forward_cmd_output.errorMsgs
    );
  }
  const server_url = process.env["RS_SERVER_URL"];
  const session_url = process.env["RS_SESSION_URL"];
  if (!server_url || !session_url) {
    throw new Error("Can't find URL for workbench.");
  }
  const forwarded_port = port_forward_cmd_output.stdout[0];
  return `${server_url}${session_url.slice(1)}p/${forwarded_port}/`;
}

// src/app-preview/get_app_startup_info.ts
async function getAppStartupInfo(language, app_loc_info) {
  const [previewAppUri, startup_info] = await Promise.all([
    getRemoteSafeUrl(app_loc_info.port),
    language === "R" ? getRAppStartupInfo(app_loc_info) : getPythonAppStartupInfo(app_loc_info)
  ]);
  return {
    ...startup_info,
    previewAppUri
  };
}

// src/app-preview/getFreePort.ts
var import_net = __toESM(require("net"));
async function getFreePort() {
  return new Promise((res) => {
    const srv = import_net.default.createServer();
    srv.listen(0, () => {
      var _a;
      const serverAddress = (_a = srv.address) == null ? void 0 : _a.call(srv);
      if (typeof serverAddress === "string" || serverAddress === null) {
        throw new Error("Failed to find a free port...");
      }
      srv.close((err) => res(serverAddress.port));
    });
  });
}

// src/app-preview/startPreviewApp.ts
function startPreviewApp({
  language,
  pathToApp,
  onCrash,
  onInitiation,
  onReady,
  onFailToStart,
  onLogs
}) {
  let appProcess = null;
  async function startApp() {
    onInitiation();
    stopApp();
    try {
      const { path_to_executable, startup_cmds, get_is_ready, previewAppUri } = await getAppStartupInfo(language, {
        host: "0.0.0.0",
        pathToApp,
        port: await getFreePort()
      });
      appProcess = await startProcess(path_to_executable, startup_cmds, {
        onStderr(msg) {
          if (get_is_ready(msg)) {
            onReady(previewAppUri);
          }
          onLogs(msg.split("\n"));
        },
        onClose: onCrash,
        onError: onCrash
      });
      return true;
    } catch {
      onFailToStart();
      return false;
    }
  }
  function stopApp() {
    if (appProcess === null) {
      return true;
    }
    return appProcess.stop();
  }
  return {
    start: startApp,
    stop: stopApp
  };
}

// src/extension-api-utils/clearAppFile.ts
var vscode5 = __toESM(require("vscode"));
async function clearAppFile(document) {
  const uri = document.uri;
  const edit = new vscode5.WorkspaceEdit();
  const uiRange = document.validateRange(
    new vscode5.Range(0, 0, Infinity, Infinity)
  );
  edit.replace(uri, uiRange, "");
  await vscode5.workspace.applyEdit(edit);
  document.save();
}

// src/extension-api-utils/openCodeCompanionEditor.ts
var vscode6 = __toESM(require("vscode"));
async function openCodeCompanionEditor({
  document,
  existingEditor
}) {
  const alreadyHaveOpenEditor = existingEditor && vscode6.window.visibleTextEditors.includes(existingEditor);
  const companionEditor = alreadyHaveOpenEditor ? existingEditor : await vscode6.window.showTextDocument(document.uri, {
    viewColumn: vscode6.ViewColumn.Beside,
    preview: true
  });
  return companionEditor;
}

// src/extension-api-utils/update_app_file.ts
var vscode7 = __toESM(require("vscode"));
async function updateAppFile({
  script_text,
  document
}) {
  const existing_app_text = document.getText();
  if (script_text === existing_app_text) {
    return false;
  }
  const uri = document.uri;
  const edit = new vscode7.WorkspaceEdit();
  const full_selection = document.validateRange(
    new vscode7.Selection(0, 0, document.lineCount + 1, 0)
  );
  edit.replace(uri, full_selection, script_text);
  await vscode7.workspace.applyEdit(edit);
  document.save();
  return true;
}

// src/editorLogic.ts
var { showErrorMessage } = vscode8.window;
async function editorLogic({
  language,
  document,
  sendMessage,
  convertFilePaths
}) {
  let hasInitialized = false;
  let latestAppWrite = null;
  let codeCompanionEditor = void 0;
  let previous_parsed_info;
  async function initializeUiEditor() {
  }
  function requestTemplateChooser() {
    sendMessage({
      path: "TEMPLATE_CHOOSER",
      payload: "PLEASE"
    });
  }
  const syncFileToClientState = async () => {
    const appFileText = document.getText();
    const updateWeMade = latestAppWrite !== null && appFileText.includes(latestAppWrite);
    if (updateWeMade)
      return;
    if (!hasInitialized) {
      await initializeUiEditor();
      sendMessage({
        path: "CHECKIN",
        payload: {
          language,
          server_aware: true,
          app_preview: true,
          // Create webview friendly url for the tree-sitter wasm file and send over
          path_to_ts_wasm: convertFilePaths("tree-sitter.wasm")
        }
      });
      hasInitialized = true;
    }
    if (appFileText === "") {
      requestTemplateChooser();
      return;
    }
    try {
      latestAppWrite = appFileText;
      sendMessage({
        path: "APP-SCRIPT-TEXT",
        payload: {
          language,
          app_script: appFileText
        }
      });
    } catch (e) {
      console.error("Failed to parse", e);
    }
  };
  const syncFileToClientStateDebounced = functionDebounce(syncFileToClientState, 500);
  const onDocumentChanged = () => {
    syncFileToClientStateDebounced();
  };
  const onDocumentSaved = () => {
    syncFileToClientStateDebounced.flush();
  };
  const previewAppInfo = startPreviewApp({
    language,
    pathToApp: document.fileName,
    onInitiation: () => {
      sendMessage({
        path: "APP-PREVIEW-STATUS",
        payload: "LOADING"
      });
    },
    onReady: (url) => {
      sendMessage({
        path: "APP-PREVIEW-STATUS",
        payload: { url }
      });
    },
    onFailToStart: () => {
      sendMessage({
        path: "APP-PREVIEW-CRASH",
        payload: "Failed to start"
      });
    },
    onCrash: () => {
      sendMessage({
        path: "APP-PREVIEW-CRASH",
        payload: "Crashed"
      });
    },
    onLogs: (logs) => {
      sendMessage({
        path: "APP-PREVIEW-LOGS",
        payload: logs
      });
    }
  });
  const get_companion_editor = async () => {
    codeCompanionEditor = await openCodeCompanionEditor({
      document,
      existingEditor: codeCompanionEditor
    });
    return codeCompanionEditor;
  };
  const onDidReceiveMessage = async (msg) => {
    if (isMessageToBackend(msg)) {
      switch (msg.path) {
        case "READY-FOR-STATE":
          syncFileToClientState();
          return;
        case "UPDATED-APP": {
          const app_file_was_updated = await updateAppFile({
            script_text: msg.payload.app_script,
            document
          });
          if (app_file_was_updated) {
            latestAppWrite = msg.payload.app_script;
          }
          return;
        }
        case "APP-PREVIEW-REQUEST": {
          previewAppInfo.start();
          return;
        }
        case "APP-PREVIEW-STOP": {
          previewAppInfo.stop();
          return;
        }
        case "APP-PREVIEW-RESTART": {
          previewAppInfo.start();
          return;
        }
        case "ENTERED-TEMPLATE-SELECTOR": {
          previewAppInfo.stop();
          await clearAppFile(document);
          return;
        }
        case "OPEN-COMPANION-EDITOR": {
          await get_companion_editor();
          return;
        }
        case "INSERT-SNIPPET": {
          const snippet = msg.payload.snippet;
          const insert_at = msg.payload.insert_at;
          if (typeof insert_at === "string") {
            throw new Error("Need snippet location for insertion");
          }
          const editor = await get_companion_editor();
          const successfull_template_add = await editor.insertSnippet(
            new vscode8.SnippetString(snippet),
            new vscode8.Position(insert_at.row, insert_at.column)
          );
          if (!successfull_template_add) {
            vscode8.window.showErrorMessage(`Failed to add output scaffold`);
          }
          return;
        }
        default:
          console.warn("Unhandled message from client", msg);
      }
    } else {
      console.warn("Unknown message from webview", msg);
    }
  };
  return {
    onDocumentChanged,
    onDocumentSaved,
    onDidReceiveMessage
  };
}

// src/shinyuieditor_extension.ts
var _ShinyUiEditorProvider = class {
  constructor(context) {
    this.context = context;
  }
  static register(context) {
    const provider = new _ShinyUiEditorProvider(context);
    const providerRegistration = vscode9.window.registerCustomEditorProvider(
      _ShinyUiEditorProvider.viewType,
      provider,
      {
        webviewOptions: {
          // Make it so the app stays alive if it's not the main tab, avoids
          // unneccesary refreshes. May be worth removing this in favor of cold
          // startups everytime tab is focused if memory usage etc becomes an
          // issue
          retainContextWhenHidden: true
        }
      }
    );
    return providerRegistration;
  }
  /**
   * Called when an instance of the custom editor is opened.
   *
   * The `document` arg will correspond to the associated app.R or ui.R file for this editor view.
   * By keeping logic in here we will ensure we don't get mixed up when we have multiple editor windows open.
   */
  async resolveCustomTextEditor(document, webviewPanel, _token) {
    const scriptStatus = appScriptStatus(document);
    if (scriptStatus.status === "invalid") {
      vscode9.window.showErrorMessage(scriptStatus.reason);
      webviewPanel.dispose();
      throw new Error(scriptStatus.reason);
    }
    webviewPanel.webview.options = {
      enableScripts: true
    };
    webviewPanel.webview.html = this.getHtmlForWebview(webviewPanel.webview);
    const editorBackend = await editorLogic({
      language: scriptStatus.lang,
      document,
      sendMessage: (msg) => webviewPanel.webview.postMessage(msg),
      convertFilePaths: (file_path) => webviewPanel.webview.asWebviewUri(
        vscode9.Uri.joinPath(this.context.extensionUri, "media", file_path)
      ).toString()
    });
    const changeDocumentSubscription = vscode9.workspace.onDidChangeTextDocument(
      (e) => {
        if (e.document.uri.toString() === document.uri.toString()) {
          editorBackend.onDocumentChanged();
        }
      }
    );
    const saveDocumentSubscription = vscode9.workspace.onDidSaveTextDocument(
      (savedDocument) => {
        if (savedDocument.uri.toString() === document.uri.toString()) {
          editorBackend.onDocumentSaved();
        }
      }
    );
    const onMessageSubscription = webviewPanel.webview.onDidReceiveMessage(
      editorBackend.onDidReceiveMessage
    );
    webviewPanel.onDidDispose(() => {
      changeDocumentSubscription.dispose();
      saveDocumentSubscription.dispose();
      onMessageSubscription.dispose();
    });
  }
  /**
   * Get the static html used for the editor webviews.
   */
  getHtmlForWebview(webview) {
    const scriptUri = webview.asWebviewUri(
      vscode9.Uri.joinPath(
        this.context.extensionUri,
        "media",
        "build",
        "extension-editor.js"
      )
    );
    const styleMainUri = webview.asWebviewUri(
      vscode9.Uri.joinPath(
        this.context.extensionUri,
        "media",
        "build",
        "style.css"
      )
    );
    const nonce = getNonce();
    return (
      /* html */
      `
			<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<script>
				// This is needed for various older packages that require the global
				// object to be defined because it typically was with older bundlers like
				// webpack
				var global = window;
			  </script>
				
				<meta name="viewport" content="width=device-width, initial-scale=1.0">

				
				<link href="${styleMainUri}" rel="stylesheet" />
				
				<title>Shiny UI Editor</title>
			</head>
			<body style="padding-inline: 0;">
				<noscript>You need to enable JavaScript to run this app.</noscript>
				<div id="root" style="height: 100vh; display: relative"></div>
				<script type="module" nonce="${nonce}" src="${scriptUri}"></script>
			</body>
			</html>`
    );
  }
};
var ShinyUiEditorProvider = _ShinyUiEditorProvider;
ShinyUiEditorProvider.viewType = "shinyuieditor.appFile";
function getNonce() {
  let text = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

// src/extension.ts
function activate(context) {
  context.subscriptions.push(ShinyUiEditorProvider.register(context));
  context.subscriptions.push(
    vscode10.commands.registerCommand(
      "shinyuieditor.startEditorOnActiveFile",
      startEditorOnActiveFile
    ),
    vscode10.commands.registerCommand("shinyuieditor.launchEditor", launchEditor)
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  activate
});
//# sourceMappingURL=extension.js.map
