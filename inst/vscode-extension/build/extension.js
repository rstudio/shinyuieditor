"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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

// src/extension.ts
var extension_exports = {};
__export(extension_exports, {
  activate: () => activate
});
module.exports = __toCommonJS(extension_exports);
var vscode11 = __toESM(require("vscode"));

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
var vscode10 = __toESM(require("vscode"));

// src/editorLogic.ts
var import_MessageToBackend = require("communication-types/src/MessageToBackend");
var import_just_debounce_it = __toESM(require("just-debounce-it"));
var vscode9 = __toESM(require("vscode"));

// src/clearAppFile.ts
var vscode3 = __toESM(require("vscode"));
async function clearAppFile(document) {
  const uri = document.uri;
  const edit = new vscode3.WorkspaceEdit();
  const uiRange = document.validateRange(
    new vscode3.Range(0, 0, Infinity, Infinity)
  );
  edit.replace(uri, uiRange, "");
  await vscode3.workspace.applyEdit(edit);
  document.save();
}

// src/extension-api-utils/openCodeCompanionEditor.ts
var vscode4 = __toESM(require("vscode"));
async function openCodeCompanionEditor({
  appFile,
  existingEditor
}) {
  const alreadyHaveOpenEditor = existingEditor && vscode4.window.visibleTextEditors.includes(existingEditor);
  const companionEditor = alreadyHaveOpenEditor ? existingEditor : await vscode4.window.showTextDocument(appFile.uri, {
    viewColumn: vscode4.ViewColumn.Beside,
    preview: true
  });
  return companionEditor;
}

// src/Python-Utils/build_python_app_parser.ts
var import_abstract_snake_tree = require("abstract-snake-tree");

// src/R-Utils/getAppInfo.ts
var import_parse_app_server_info = require("r-ast-parsing/src/parse_app_server_info");
var import_raw_R_info_to_app_info = require("r-ast-parsing/src/raw_R_info_to_app_info");
var import_is_object = require("util-functions/src/is_object");
var import_strings = require("util-functions/src/strings");
async function getRAppInfo(rProc, fileText) {
  const escapedAppText = (0, import_strings.makePortableString)(fileText);
  const parseCommand = `shinyuieditor:::safe_parse_and_serialize("${escapedAppText}")`;
  const parsedCommandOutput = await rProc.runCmd(parseCommand, {
    verbose: false,
    timeout_ms: 5e3
  });
  if (parsedCommandOutput.status === "error") {
    return parsedCommandOutput;
  }
  try {
    const output_response = JSON.parse(
      parsedCommandOutput.values.reduce((all, l) => all + "\n" + l, "")
    );
    assert_is_ast_parse_response(output_response);
    if (output_response.type === "error") {
      return {
        status: "error",
        errorMsg: output_response.msg
      };
    }
    if (Object.keys(output_response.ast).length === 0) {
      return { status: "success", values: "EMPTY" };
    }
    const raw_ast = output_response.ast;
    const parsed_info = (0, import_raw_R_info_to_app_info.raw_R_info_to_app_info)({
      app_type: "SINGLE-FILE",
      app: { ast: raw_ast, script: fileText }
    });
    const server_info = (0, import_parse_app_server_info.parse_app_server_info)(output_response.ast);
    return {
      status: "success",
      values: { parsed_info, server_info }
    };
  } catch {
    return {
      status: "error",
      errorMsg: "Something went wrong parsing app. Check to make sure your app text doesn't contain any syntax errors."
    };
  }
}
function assert_is_ast_parse_response(parse_res) {
  if ((0, import_is_object.is_object)(parse_res) && "type" in parse_res && (parse_res.type === "success" || parse_res.type === "error")) {
    return;
  }
  throw new Error(
    "Parse result does not appear to be from safe ast parse function"
  );
}
function make_cached_info_getter(document, get_info_fn) {
  let last_info_grabbed = null;
  async function get_info() {
    const current_file_version = document.version;
    if (current_file_version === (last_info_grabbed == null ? void 0 : last_info_grabbed.file_version)) {
      return { status: "success", values: last_info_grabbed.info };
    }
    const info_attempt = await get_info_fn(document.getText());
    if (info_attempt.status === "error") {
      return info_attempt;
    }
    const ast_info = info_attempt.values;
    last_info_grabbed = {
      file_version: current_file_version,
      info: ast_info
    };
    return info_attempt;
  }
  return get_info;
}

// src/Python-Utils/build_python_app_parser.ts
async function build_python_app_parser(document) {
  const parser = (0, import_abstract_snake_tree.setup_python_parser)();
  const get_app_info = async (text) => {
    const parsed = parser.parse(text);
    const assignment_nodes = (0, import_abstract_snake_tree.get_assignment_nodes)(parsed);
    const ui_node = (0, import_abstract_snake_tree.get_ui_assignment)(assignment_nodes);
    if (!ui_node) {
      return {
        status: "error",
        errorMsg: "No UI assignment found"
      };
    }
    const ui_tree = (0, import_abstract_snake_tree.treesitter_to_ui_tree)(ui_node);
    const app_info = {
      language: "PYTHON",
      app_type: "SINGLE-FILE",
      ui_tree,
      // TODO: Make this actually work by looking at parsed tre
      known_outputs: /* @__PURE__ */ new Set(),
      app: {
        code: "",
        packages: []
      }
    };
    return {
      status: "success",
      values: {
        parsed_info: app_info
      }
    };
  };
  const getInfo = make_cached_info_getter(document, get_app_info);
  const check_if_pkgs_installed = async (pkgs) => {
    return { success: true };
  };
  return {
    getInfo,
    check_if_pkgs_installed
  };
}

// src/R-Utils/checkIfPkgAvailable.ts
async function checkIfPkgAvailable(rProc, pkg) {
  const loadingResults = await rProc.runCmd(
    `print(require(${pkg}, quietly = TRUE))`,
    {
      verbose: false
    }
  );
  if (loadingResults.status === "error") {
    return { status: "error", msg: loadingResults.errorMsg };
  }
  if (loadingResults.values[0].includes("FALSE")) {
    return { status: "error", msg: generateMissingPkgMsg(pkg) };
  }
  return { status: "success" };
}
function generateMissingPkgMsg(pkg) {
  return `The ShinyUiEditor extension needs the \`${pkg}\` pkg installed. Install using \`remotes::install_github('rstudio/${pkg}')\` and restart the extension.`;
}

// src/R-Utils/runRCommand.ts
var START_SIGNAL = "SUE_START_SIGNAL";
var END_SIGNAL = "SUE_END_SIGNAL";
async function runRCommand(rProc, cmd, { timeout_ms = 1e3, verbose = false } = {}) {
  const logger = (msg) => {
    if (verbose) {
      console.log(`runRCommand: ${msg}`);
    }
  };
  let logs = "";
  let seenStartSignal = false;
  const lines = [];
  if (rProc.exitCode !== null) {
    return {
      status: "error",
      errorMsg: `Can't run R command as background R process has exited with code ${rProc.exitCode}.`
    };
  }
  return new Promise((resolve) => {
    function listenForOutput(d) {
      const outputString = d.toString();
      const outputLines = outputString.split("\n");
      logger("~~~Output chunk~~~");
      for (const l of outputLines) {
        const isStartSignal = l.includes(START_SIGNAL);
        const isEndSignal = l.includes(END_SIGNAL);
        const emptyLine = l.length === 0;
        if (isStartSignal) {
          seenStartSignal = true;
          continue;
        }
        if (isEndSignal) {
          clearTimeout(startTimeout);
          resolve({ status: "success", values: lines });
          logger("Output finished");
          cleanup();
          break;
        }
        if (!seenStartSignal || emptyLine) {
          continue;
        }
        logger(l);
        logs += l + "\n";
        lines.push(l);
      }
    }
    function listenForStderrOutput(d) {
      const msg = d.toString();
      logs += `stderr: ${msg}
`;
      logger("stderr: " + msg);
    }
    function listenForClose() {
      resolve({
        status: "error",
        errorMsg: logs
      });
      cleanup();
    }
    rProc.stdout.on("data", listenForOutput);
    rProc.stderr.on("data", listenForStderrOutput);
    rProc.on("close", listenForClose);
    const startTimeout = setTimeout(() => {
      resolve({
        status: "error",
        errorMsg: `Timeout, no response from run command within ${timeout_ms}ms: ${cmd}
 Logs:
 ${logs}`
      });
      cleanup();
    }, timeout_ms);
    function cleanup() {
      rProc.stdout.off("data", listenForOutput);
      rProc.stderr.off("data", listenForStderrOutput);
      rProc.off("close", listenForClose);
    }
    sendMsgToProc(
      `print('${START_SIGNAL}');${cmd};print('${END_SIGNAL}')`,
      rProc
    );
  });
}

// src/R-Utils/startRProcess.ts
var import_child_process = require("child_process");

// src/R-Utils/getPathToR.ts
var import_fs2 = require("fs");
var import_strings2 = require("util-functions/src/strings");

// src/R-Utils/getRpathFromSystem.ts
var import_fs = require("fs");
var import_path = __toESM(require("path"));
var winreg = require("winreg");
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
  return (0, import_strings2.removeQuotes)(pathToR);
}

// src/R-Utils/startRProcess.ts
async function startRProcess(commands5, opts = {}) {
  const pathToR = await getPathToR();
  if (pathToR === void 0) {
    throw new Error("Can't get R path");
  }
  let logs = "";
  return new Promise((resolve) => {
    const controller = new AbortController();
    const { signal } = controller;
    const spawnedProcess = (0, import_child_process.spawn)(pathToR, commands5, { signal });
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

// src/R-Utils/startBackgroundRProcess.ts
async function startBackgroundRProcess() {
  async function startProc() {
    return await startRProcess(
      ["--silent", "--slave", "--no-save", "--no-restore"],
      { timeout_ms: 5e3 }
    );
  }
  let rProc = await startProc();
  return {
    ...rProc,
    async runCmd(cmd, opts) {
      if (!rProc.getIsRunning()) {
        console.warn("Background R Process has crashed. Restarting...");
        rProc.stop();
        rProc = await startProc();
        console.warn("Background R Process restarted");
      }
      return runRCommand(rProc.proc, cmd, opts);
    }
  };
}
function sendMsgToProc(msg, proc) {
  proc.stdin.write(`${msg}
`);
}

// src/R-Utils/build_R_app_parser.ts
async function build_R_app_parser(document) {
  const RProcess = await startBackgroundRProcess();
  if (!RProcess) {
    throw new Error("Don't have an R Process to pass to editor backend!");
  }
  const get_app_info = async (text) => {
    return getRAppInfo(RProcess, text);
  };
  const getInfo = make_cached_info_getter(document, get_app_info);
  const check_if_pkgs_installed = async (pkgs) => {
    const pkgsLoaded = await checkIfPkgAvailable(RProcess, pkgs);
    if (pkgsLoaded.status === "error") {
      return { success: false, msg: pkgsLoaded.msg };
    }
    return { success: true };
  };
  return {
    getInfo,
    check_if_pkgs_installed
  };
}

// src/R-Utils/startPreviewApp.ts
var import_strings3 = require("util-functions/src/strings");

// src/extension-api-utils/getRemoteSafeUrl.ts
var fs = __toESM(require("fs"));
var vscode5 = __toESM(require("vscode"));

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

// src/extension-api-utils/getRemoteSafeUrl.ts
async function getRemoteSafeUrl(local_port) {
  if (getInPositWorkbench()) {
    return await getForwardedWorkbenchUrl(local_port);
  }
  const local_uri = vscode5.Uri.parse(`http://localhost:${local_port}`);
  return (await vscode5.env.asExternalUri(local_uri)).toString();
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

// src/getFreePort.ts
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

// src/R-Utils/startPreviewApp.ts
function startPreviewApp({
  pathToApp,
  onCrash,
  onInitiation,
  onReady,
  onFailToStart,
  onLogs
}) {
  const host = "0.0.0.0";
  let appProcess = null;
  async function startApp() {
    onInitiation();
    stopApp();
    try {
      const port = await getFreePort();
      const previewAppUri = await getRemoteSafeUrl(port);
      const readyToGoRegex = new RegExp(`listening on .+${port}`, "i");
      const appStartupCommand = (0, import_strings3.collapseText)(
        `options(shiny.autoreload = TRUE)`,
        `shiny::runApp(appDir = "${pathToApp}", port = ${port}, host = "${host}")`
      );
      appProcess = await startRProcess(
        ["--no-save", "--no-restore", "--silent", "-e", appStartupCommand],
        {
          onStderr(msg) {
            if (readyToGoRegex.test(msg)) {
              onReady(previewAppUri.toString());
            }
            onLogs(msg.split("\n"));
          },
          onClose: onCrash,
          onError: onCrash
        }
      );
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

// src/selectServerReferences.ts
var import_strings4 = require("util-functions/src/strings");
var vscode7 = __toESM(require("vscode"));

// src/extension-api-utils/selectMultupleLocations.ts
var vscode6 = __toESM(require("vscode"));
async function selectMultupleLocations({
  uri,
  position = new vscode6.Position(0, 0),
  locations,
  multiple = "gotoAndPeek",
  noResultsMessage
}) {
  await vscode6.commands.executeCommand(
    "editor.action.goToLocations",
    uri,
    position,
    locations,
    multiple,
    noResultsMessage
  );
}

// src/selectServerReferences.ts
async function insert_code_snippet({
  editor,
  snippet,
  server_pos,
  where_in_server
}) {
  const INDENT_SPACES = 2;
  const [start_row, , end_row] = server_pos;
  const where_to_insert = editor.document.validatePosition(
    new vscode7.Position(
      where_in_server === "end" ? end_row - 2 : start_row - 2,
      Infinity
    )
  );
  const successfull_template_add = await editor.insertSnippet(
    new vscode7.SnippetString(
      `
  ${(0, import_strings4.indent_text_block)(snippet, INDENT_SPACES)}`
    ),
    where_to_insert
  );
  if (!successfull_template_add) {
    vscode7.window.showErrorMessage(`Failed to add output scaffold`);
  }
}
function select_app_lines({
  editor,
  selections
}) {
  const selection_objs = selections.map(
    ([start_row, start_col, end_row, end_col]) => {
      const start = new vscode7.Position(start_row - 1, start_col - 1);
      const end = new vscode7.Position(end_row - 1, end_col);
      return new vscode7.Selection(start, end);
    }
  );
  editor.selection = selection_objs[0];
  editor.revealRange(selection_objs[0]);
}
async function selectInputReferences({
  editor,
  input: { inputId }
}) {
  const fullInput = `input$${inputId}`;
  const to_find = fullInput;
  const app_text = editor.document.getText();
  const doc_lines = app_text.split("\n");
  const regex_for_output = new RegExp(
    `(?<!#.*)${escapeRegExp(to_find)}(?=\\W)`
  );
  const lines_with_output = doc_lines.map((l, i) => ({
    line: i,
    match: regex_for_output.exec(l)
  })).filter(({ match }) => match !== null);
  if (lines_with_output.length === 0)
    return null;
  const selection_locations = lines_with_output.map(({ line, match }) => {
    const startChar = (match == null ? void 0 : match.index) ?? 0;
    const searchStart = new vscode7.Position(line, startChar);
    const searchEnd = new vscode7.Position(line, startChar + to_find.length);
    return new vscode7.Location(
      editor.document.uri,
      new vscode7.Range(searchStart, searchEnd)
    );
  });
  vscode7.window.showTextDocument(editor.document);
  await selectMultupleLocations({
    uri: editor.document.uri,
    locations: selection_locations,
    noResultsMessage: `Failed to find any current use of ${fullInput} in server`
  });
}
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// src/update_app_file.ts
var vscode8 = __toESM(require("vscode"));
async function update_app_file({
  script_text,
  document
}) {
  const existing_app_text = document.getText();
  if (script_text === existing_app_text) {
    return false;
  }
  const uri = document.uri;
  const edit = new vscode8.WorkspaceEdit();
  const full_selection = document.validateRange(
    new vscode8.Selection(0, 0, document.lineCount + 1, 0)
  );
  edit.replace(uri, full_selection, script_text);
  await vscode8.workspace.applyEdit(edit);
  document.save();
  return true;
}

// src/editorLogic.ts
var { showErrorMessage } = vscode9.window;
async function editorLogic({
  language,
  document,
  sendMessage
}) {
  const app_info_getter = language === "R" ? await build_R_app_parser(document) : await build_python_app_parser(document);
  const get_app_info = app_info_getter.getInfo;
  let hasInitialized = false;
  let latestAppWrite = null;
  let codeCompanionEditor = void 0;
  const syncFileToClientState = async () => {
    const appFileText = document.getText();
    const updateWeMade = latestAppWrite !== null && appFileText.includes(latestAppWrite);
    if (updateWeMade)
      return;
    if (!hasInitialized) {
      const pkgsLoaded = await app_info_getter.check_if_pkgs_installed(
        "shinyuieditor"
      );
      if (!pkgsLoaded.success) {
        sendMessage({
          path: "BACKEND-ERROR",
          payload: {
            context: "checking for shinyuieditor package",
            msg: pkgsLoaded.msg
          }
        });
        showErrorMessage(pkgsLoaded.msg);
        throw new Error(pkgsLoaded.msg);
      }
      hasInitialized = true;
    }
    if (appFileText === "") {
      sendMessage({
        path: "TEMPLATE_CHOOSER",
        payload: "SINGLE-FILE"
      });
      return;
    }
    try {
      const appAST = await get_app_info();
      if (appAST.status === "error") {
        sendMessage({
          path: "BACKEND-ERROR",
          payload: {
            context: "parsing app",
            msg: appAST.errorMsg
          }
        });
        latestAppWrite = null;
        return;
      }
      if (appAST.values === "EMPTY") {
        sendMessage({
          path: "TEMPLATE_CHOOSER",
          payload: "SINGLE-FILE"
        });
        return;
      }
      latestAppWrite = appFileText;
      const ui_info = appAST.values.parsed_info;
      sendMessage({
        path: "APP-INFO",
        payload: ui_info
      });
    } catch (e) {
      console.error("Failed to parse", e);
    }
  };
  const syncFileToClientStateDebounced = (0, import_just_debounce_it.default)(syncFileToClientState, 500);
  const onDocumentChanged = () => {
    syncFileToClientStateDebounced();
  };
  const onDocumentSaved = () => {
    syncFileToClientStateDebounced.flush();
  };
  const previewAppInfo = startPreviewApp({
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
      appFile: document,
      existingEditor: codeCompanionEditor
    });
    return codeCompanionEditor;
  };
  const onDidReceiveMessage = async (msg) => {
    if ((0, import_MessageToBackend.isMessageToBackend)(msg)) {
      switch (msg.path) {
        case "READY-FOR-STATE":
          syncFileToClientState();
          return;
        case "UPDATED-APP": {
          if (msg.payload.app_type === "MULTI-FILE")
            return;
          const app_file_was_updated = await update_app_file({
            script_text: msg.payload.app,
            document
          });
          if (app_file_was_updated) {
            latestAppWrite = msg.payload.app;
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
        case "SHOW-APP-LINES": {
          select_app_lines({
            editor: await get_companion_editor(),
            selections: msg.payload
          });
          return;
        }
        case "INSERT-SNIPPET": {
          const appAST = await get_app_info();
          if (appAST.status === "success" && appAST.values !== "EMPTY" && appAST.values.server_info) {
            insert_code_snippet({
              editor: await get_companion_editor(),
              server_pos: appAST.values.server_info.server_pos,
              ...msg.payload
            });
          }
          return;
        }
        case "FIND-SERVER-USES": {
          if (msg.payload.type === "Input") {
            selectInputReferences({
              editor: await get_companion_editor(),
              input: msg.payload
            });
          } else {
            const appAST = await get_app_info();
            if (appAST.status === "success" && appAST.values !== "EMPTY" && appAST.values.server_info) {
              select_app_lines({
                editor: await get_companion_editor(),
                selections: appAST.values.server_info.get_output_position(
                  msg.payload.outputId
                ) ?? []
              });
            }
          }
          return;
        }
        default:
          console.warn("Unhandled message from client", msg);
      }
    } else {
      console.log("Unknown message from webview", msg);
    }
  };
  return {
    onDocumentChanged,
    onDocumentSaved,
    onDidReceiveMessage
  };
}

// src/R-Utils/appScriptStatus.ts
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
  }
  static register(context) {
    const provider = new _ShinyUiEditorProvider(context);
    const providerRegistration = vscode10.window.registerCustomEditorProvider(
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
      vscode10.window.showErrorMessage(scriptStatus.reason);
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
      sendMessage: (msg) => webviewPanel.webview.postMessage(msg)
    });
    const changeDocumentSubscription = vscode10.workspace.onDidChangeTextDocument(
      (e) => {
        if (e.document.uri.toString() === document.uri.toString()) {
          editorBackend.onDocumentChanged();
        }
      }
    );
    const saveDocumentSubscription = vscode10.workspace.onDidSaveTextDocument(
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
      vscode10.Uri.joinPath(
        this.context.extensionUri,
        "media",
        "build",
        "extension-editor.js"
      )
    );
    const styleMainUri = webview.asWebviewUri(
      vscode10.Uri.joinPath(
        this.context.extensionUri,
        "media",
        "build",
        "style.css"
      )
    );
    const nonce = getNonce();
    const cspSource = webview.cspSource;
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
				<!--
				Use a content security policy to only allow loading images from https or from our extension directory,
				and only allow scripts that have a specific nonce.
				-->
				<meta 
          http-equiv="Content-Security-Policy" 
          content="default-src 'none'; frame-src http://localhost:*/ ${cspSource} https:; img-src ${cspSource} data:; style-src ${webview.cspSource} 'unsafe-inline'; script-src 'nonce-${nonce}';">

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

// src/extension.ts
function activate(context) {
  context.subscriptions.push(ShinyUiEditorProvider.register(context));
  context.subscriptions.push(
    vscode11.commands.registerCommand(
      "shinyuieditor.startEditorOnActiveFile",
      startEditorOnActiveFile
    ),
    vscode11.commands.registerCommand("shinyuieditor.launchEditor", launchEditor)
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  activate
});
