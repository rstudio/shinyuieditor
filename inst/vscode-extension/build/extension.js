"use strict";var st=Object.create;var B=Object.defineProperty;var at=Object.getOwnPropertyDescriptor;var ct=Object.getOwnPropertyNames;var ut=Object.getPrototypeOf,pt=Object.prototype.hasOwnProperty;var lt=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports),dt=(t,e)=>{for(var o in e)B(t,o,{get:e[o],enumerable:!0})},oe=(t,e,o,r)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of ct(e))!pt.call(t,n)&&n!==o&&B(t,n,{get:()=>e[n],enumerable:!(r=at(e,n))||r.enumerable});return t};var T=(t,e,o)=>(o=t!=null?st(ut(t)):{},oe(e||!t||!t.__esModule?B(o,"default",{value:t,enumerable:!0}):o,t)),ft=t=>oe(B({},"__esModule",{value:!0}),t);var Be=lt((po,Ge)=>{var X=require("util"),xt=require("path"),O=require("child_process").spawn,R=function(){},z="HKLM",Pe="HKCU",Ae="HKCR",Ce="HKU",Oe="HKCC",be=[z,Pe,Ae,Ce,Oe],Ue="REG_SZ",Me="REG_MULTI_SZ",ke="REG_EXPAND_SZ",De="REG_DWORD",Ie="REG_QWORD",Ne="REG_BINARY",Fe="REG_NONE",Le=[Ue,Me,ke,De,Ie,Ne,Fe],Pt="",At=/(\\[a-zA-Z0-9_\s]+)*/,Ct=/^(HKEY_LOCAL_MACHINE|HKEY_CURRENT_USER|HKEY_CLASSES_ROOT|HKEY_USERS|HKEY_CURRENT_CONFIG)(.*)$/,$e=/^(.*)\s(REG_SZ|REG_MULTI_SZ|REG_EXPAND_SZ|REG_DWORD|REG_QWORD|REG_BINARY|REG_NONE)\s+([^\s].*)$/;function F(t,e){if(!(this instanceof F))return new F(t,e);Error.captureStackTrace(this,F),this.__defineGetter__("name",function(){return F.name}),this.__defineGetter__("message",function(){return t}),this.__defineGetter__("code",function(){return e})}X.inherits(F,Error);function b(t){var e={stdout:"",stderr:""};return t.stdout.on("data",function(o){e.stdout+=o.toString()}),t.stderr.on("data",function(o){e.stderr+=o.toString()}),e}function U(t,e,o){var r=o.stdout.trim(),n=o.stderr.trim(),i=X.format(`%s command exited with code %d:
%s
%s`,t,e,r,n);return new F(i,e)}function Ot(t){if(t=="x64")return"64";if(t=="x86")return"32";throw new Error("illegal architecture: "+t+" (use x86 or x64)")}function M(t,e){e&&t.push("/reg:"+Ot(e))}function k(){return process.platform==="win32"?xt.join(process.env.windir,"system32","reg.exe"):"REG"}function $(t,e,o,r,n,i,s){if(!(this instanceof $))return new $(t,e,o,r,n,i,s);var a=t,u=e,c=o,f=r,d=n,g=i,p=s;this.__defineGetter__("host",function(){return a}),this.__defineGetter__("hive",function(){return u}),this.__defineGetter__("key",function(){return c}),this.__defineGetter__("name",function(){return f}),this.__defineGetter__("type",function(){return d}),this.__defineGetter__("value",function(){return g}),this.__defineGetter__("arch",function(){return p})}X.inherits($,Object);function m(t){if(!(this instanceof m))return new m(t);var e=t||{},o=""+(e.host||""),r=""+(e.hive||z),n=""+(e.key||""),i=e.arch||null;if(this.__defineGetter__("host",function(){return o}),this.__defineGetter__("hive",function(){return r}),this.__defineGetter__("key",function(){return n}),this.__defineGetter__("path",function(){return(o.length==0?"":"\\\\"+o+"\\")+r+n}),this.__defineGetter__("arch",function(){return i}),this.__defineGetter__("parent",function(){var s=n.lastIndexOf("\\");return new m({host:this.host,hive:this.hive,key:s==-1?"":n.substring(0,s),arch:this.arch})}),be.indexOf(r)==-1)throw new Error("illegal hive specified.");if(!At.test(n))throw new Error("illegal key specified.");if(i&&i!="x64"&&i!="x86")throw new Error("illegal architecture specified (use x86 or x64)")}m.HKLM=z;m.HKCU=Pe;m.HKCR=Ae;m.HKU=Ce;m.HKCC=Oe;m.HIVES=be;m.REG_SZ=Ue;m.REG_MULTI_SZ=Me;m.REG_EXPAND_SZ=ke;m.REG_DWORD=De;m.REG_QWORD=Ie;m.REG_BINARY=Ne;m.REG_NONE=Fe;m.REG_TYPES=Le;m.DEFAULT_VALUE=Pt;m.prototype.values=function(e){if(typeof e!="function")throw new TypeError("must specify a callback");var o=["QUERY",this.path];M(o,this.arch);var r=O(k(),o,{cwd:void 0,env:process.env,stdio:["ignore","pipe","pipe"]}),n="",i=this,s=null,a=b(r);return r.on("close",function(u){if(!s)if(u!==0)R("process exited with code "+u),e(U("QUERY",u,a),null);else{for(var c=[],f=[],d=n.split(`
`),g=0,p=0,h=d.length;p<h;p++){var l=d[p].trim();l.length>0&&(R(l),g!=0&&c.push(l),++g)}for(var p=0,h=c.length;p<h;p++){var E=$e.exec(c[p]),w,S,v;E&&(w=E[1].trim(),S=E[2].trim(),v=E[3],f.push(new $(i.host,i.hive,i.key,w,S,v,i.arch)))}e(null,f)}}),r.stdout.on("data",function(u){n+=u.toString()}),r.on("error",function(u){s=u,e(u)}),this};m.prototype.keys=function(e){if(typeof e!="function")throw new TypeError("must specify a callback");var o=["QUERY",this.path];M(o,this.arch);var r=O(k(),o,{cwd:void 0,env:process.env,stdio:["ignore","pipe","pipe"]}),n="",i=this,s=null,a=b(r);return r.on("close",function(u){s||u!==0&&(R("process exited with code "+u),e(U("QUERY",u,a),null))}),r.stdout.on("data",function(u){n+=u.toString()}),r.stdout.on("end",function(){for(var u=[],c=[],f=n.split(`
`),d=0,g=f.length;d<g;d++){var p=f[d].trim();p.length>0&&(R(p),u.push(p))}for(var d=0,g=u.length;d<g;d++){var h=Ct.exec(u[d]),l,E;h&&(l=h[1],E=h[2],E&&E!==i.key&&c.push(new m({host:i.host,hive:i.hive,key:E,arch:i.arch})))}e(null,c)}),r.on("error",function(u){s=u,e(u)}),this};m.prototype.get=function(e,o){if(typeof o!="function")throw new TypeError("must specify a callback");var r=["QUERY",this.path];e==""?r.push("/ve"):r=r.concat(["/v",e]),M(r,this.arch);var n=O(k(),r,{cwd:void 0,env:process.env,stdio:["ignore","pipe","pipe"]}),i="",s=this,a=null,u=b(n);return n.on("close",function(c){if(!a)if(c!==0)R("process exited with code "+c),o(U("QUERY",c,u),null);else{for(var f=[],d=null,g=i.split(`
`),p=0,h=0,l=g.length;h<l;h++){var E=g[h].trim();E.length>0&&(R(E),p!=0&&f.push(E),++p)}var w=f[f.length-1]||"",S=$e.exec(w),v,y,A;S&&(v=S[1].trim(),y=S[2].trim(),A=S[3],d=new $(s.host,s.hive,s.key,v,y,A,s.arch)),o(null,d)}}),n.stdout.on("data",function(c){i+=c.toString()}),n.on("error",function(c){a=c,o(c)}),this};m.prototype.set=function(e,o,r,n){if(typeof n!="function")throw new TypeError("must specify a callback");if(Le.indexOf(o)==-1)throw Error("illegal type specified.");var i=["ADD",this.path];e==""?i.push("/ve"):i=i.concat(["/v",e]),i=i.concat(["/t",o,"/d",r,"/f"]),M(i,this.arch);var s=O(k(),i,{cwd:void 0,env:process.env,stdio:["ignore","pipe","pipe"]}),a=null,u=b(s);return s.on("close",function(c){a||(c!==0?(R("process exited with code "+c),n(U("ADD",c,u,null))):n(null))}),s.stdout.on("data",function(c){R(""+c)}),s.on("error",function(c){a=c,n(c)}),this};m.prototype.remove=function(e,o){if(typeof o!="function")throw new TypeError("must specify a callback");var r=e?["DELETE",this.path,"/f","/v",e]:["DELETE",this.path,"/f","/ve"];M(r,this.arch);var n=O(k(),r,{cwd:void 0,env:process.env,stdio:["ignore","pipe","pipe"]}),i=null,s=b(n);return n.on("close",function(a){i||(a!==0?(R("process exited with code "+a),o(U("DELETE",a,s),null)):o(null))}),n.stdout.on("data",function(a){R(""+a)}),n.on("error",function(a){i=a,o(a)}),this};m.prototype.clear=function(e){if(typeof e!="function")throw new TypeError("must specify a callback");var o=["DELETE",this.path,"/f","/va"];M(o,this.arch);var r=O(k(),o,{cwd:void 0,env:process.env,stdio:["ignore","pipe","pipe"]}),n=null,i=b(r);return r.on("close",function(s){n||(s!==0?(R("process exited with code "+s),e(U("DELETE",s,i),null)):e(null))}),r.stdout.on("data",function(s){R(""+s)}),r.on("error",function(s){n=s,e(s)}),this};m.prototype.erase=m.prototype.clear;m.prototype.destroy=function(e){if(typeof e!="function")throw new TypeError("must specify a callback");var o=["DELETE",this.path,"/f"];M(o,this.arch);var r=O(k(),o,{cwd:void 0,env:process.env,stdio:["ignore","pipe","pipe"]}),n=null,i=b(r);return r.on("close",function(s){n||(s!==0?(R("process exited with code "+s),e(U("DELETE",s,i),null)):e(null))}),r.stdout.on("data",function(s){R(""+s)}),r.on("error",function(s){n=s,e(s)}),this};m.prototype.create=function(e){if(typeof e!="function")throw new TypeError("must specify a callback");var o=["ADD",this.path,"/f"];M(o,this.arch);var r=O(k(),o,{cwd:void 0,env:process.env,stdio:["ignore","pipe","pipe"]}),n=null,i=b(r);return r.on("close",function(s){n||(s!==0?(R("process exited with code "+s),e(U("ADD",s,i),null)):e(null))}),r.stdout.on("data",function(s){R(""+s)}),r.on("error",function(s){n=s,e(s)}),this};m.prototype.keyExists=function(e){return this.values(function(o,r){if(o)return o.code==1?e(null,!1):e(o);e(null,!0)}),this};m.prototype.valueExists=function(e,o){return this.get(e,function(r,n){if(r)return r.code==1?o(null,!1):o(r);o(null,!0)}),this};Ge.exports=m});var kt={};dt(kt,{activate:()=>Mt});module.exports=ft(kt);var te=T(require("vscode"));var C=require("vscode"),_=T(require("vscode"));var q="app.R",mt=/^([\w|\s]+)([\.[\w|^\.]*]*)$/i;function J(t){if(t==="")return{valid:!0,name:q};let e=t.match(mt);if(e===null)return{valid:!1,msg:`Invalid app name: ${t}.`};let[o,r,n]=e;return(n===""||n===".")&&(n=".R"),r?n!==".R"?{valid:!1,msg:`Invalid file extension: ${n}. Extension needs to be .R`}:(r=r.replaceAll(" ","-"),{valid:!0,name:`${r}${n}`}):{valid:!1,msg:`Invalid app name: ${t}. Make sure to only use numbers and letters. Spaces will be converted to dashes.`}}var re=new TextEncoder().encode("");async function ne(){let t=await C.window.showOpenDialog({canSelectFolders:!0,canSelectFiles:!0,title:"Choose location for Shiny app",openLabel:"Choose app folder or file",canSelectMany:!1,filters:{"R scripts":["R","r"]}});if(!t)return;let e=t[0],r=(await _.workspace.fs.stat(e)).type===_.FileType.Directory?await ht(e):e;!r||_.commands.executeCommand("vscode.openWith",r,"shinyuieditor.appFile")}async function ht(t){let e=(await C.workspace.fs.readDirectory(t)).filter(([s,a])=>a===_.FileType.File).map(([s,a])=>s),o=await C.window.showInputBox({prompt:"Enter file name for new app",placeHolder:q,validateInput(s){let a=J(s);return a.valid?e.includes(a.name)?{message:`Run the editor on existing app: ${a.name}.`,severity:_.InputBoxValidationSeverity.Info}:{message:`Run the template chooser to build new app: ${a.name}.`,severity:_.InputBoxValidationSeverity.Info}:{message:a.msg,severity:_.InputBoxValidationSeverity.Error}}});if(!o)return;let r=J(o);if(!r.valid){_.window.showErrorMessage(`Error processing requested file name: ${o}. Try with a different name.`);return}let n=C.Uri.joinPath(t,r.name);return e.includes(r.name)||await C.workspace.fs.writeFile(n,re),n}var ie=T(require("path")),se=T(require("vscode")),W=require("vscode");function gt(t){let e=t.ext;return/\.R/i.test(e)}function ae(t="world"){let e=W.window.activeTextEditor;if(!e){W.window.showErrorMessage("No active file open to run ui editor on!");return}let o=ie.default.parse(e.document.fileName);if(!gt(o)){W.window.showErrorMessage(`Can't run the ui editor on the currently active file ${o.base}, needs to be a .R file.`);return}se.commands.executeCommand("vscode.openWith",e.document.uri,"shinyuieditor.appFile")}var P=T(require("vscode"));function vt(t){return typeof t=="object"&&t!==null}function ce(t){return vt(t)?"path"in t:!1}var ue=Et;function Et(t,e,o){var r=null,n=null,i=function(){r&&(clearTimeout(r),n=null,r=null)},s=function(){var u=n;i(),u&&u()},a=function(){if(!e)return t.apply(this,arguments);var u=this,c=arguments,f=o&&!r;if(i(),n=function(){t.apply(u,c)},r=setTimeout(function(){if(r=null,!f){var d=n;return n=null,d()}},e),f)return n()};return a.cancel=i,a.flush=s,a}var Je=T(require("vscode"));var D=T(require("vscode"));var pe=T(require("vscode"));function H({start:t,end:e}){return new pe.Selection(t-1,0,e,0)}async function K({text:t,document:e,uiBounds:o={start:0,end:0},type:r}){let n=e.uri,i=new D.WorkspaceEdit;if(r==="replace"){let s=H(o);i.replace(n,s,t)}r==="insert"&&i.insert(e.uri,new D.Position(0,0),t),await D.workspace.applyEdit(i),e.save()}var I=T(require("vscode"));async function le(t){let e=t.uri,o=new I.WorkspaceEdit,r=t.validateRange(new I.Range(0,0,1/0,1/0));o.replace(e,r,""),await I.workspace.applyEdit(o),t.save()}var L=T(require("vscode"));async function de({appFile:t,existingEditor:e}){return e&&L.window.visibleTextEditors.includes(e)?e:await L.window.showTextDocument(t.uri,{viewColumn:L.ViewColumn.Beside,preview:!0})}function fe(t,e){e.selection=H(t)}async function me(t,e){let o=await t.runCmd(`print(require(${e}, quietly = TRUE))`,{verbose:!1});return o.status==="error"?{status:"error",msg:o.errorMsg}:o.values[0].includes("FALSE")?{status:"error",msg:yt(e)}:{status:"success"}}function yt(t){return`The ShinyUiEditor extension needs the \`${t}\` pkg installed. Install using \`remotes::install_github('rstudio/${t}')\` and restart the extension.`}function x(...t){return t.filter(o=>o!==void 0).reduce((o,r,n)=>(n===0?"":o+`
`)+r,"")}function N(t){return t.replace(/"/g,'\\"')}function he(t){return t.replace(/^"(.*)"$/,"$1").replace(/^'(.*)'$/,"$1")}async function ge(t,e,o){let r=await t.runCmd(`styler::style_text("${N(e)}", scope = "tokens")`,o);if(r.status==="error")throw new Error(`Failed to format new app code...
`+r.errorMsg);return r.values.reduce((n,i)=>n+`
`+i,"")}async function j(t,e){let o=Rt(t);try{let r=await e.runCmd(o,{verbose:!1});if(r.status==="error")throw new Error(`Failed to generate new ui code from tree
${r.errorMsg}`);return JSON.parse(x(...r.values))}catch(r){throw r}}function Rt(t,e=!0){let o=N(JSON.stringify(t,null,2)),r=e?"TRUE":"FALSE";return x("ui_tree <- jsonlite::fromJSON(",`  txt = "${o}",`,"  simplifyVector = FALSE",")",`new_ui_code <- shinyuieditor:::ui_tree_to_code(ui_tree, remove_namespace = ${r})`,"new_ui_code$text <- as.character(new_ui_code$text)","jsonlite::toJSON(new_ui_code, auto_unbox = TRUE)")}async function ve(t,{uiTree:e,otherCode:{uiExtra:o,serverFunctionBody:r,serverExtra:n,serverLibraries:i}}){let{text:s,namespaces_removed:a}=await j(e,t),c=[...new Set([...i!=null?i:[],...a])].map(h=>`library(${h})`),f=["server <- function(input, output) {",r,"}"],d="ui <- "+x(...s),g=x(...c,o,"",d,"",n,"",...f,"","shinyApp(ui, server)");return await ge(t,g)}async function Ee(t,e){let o=wt(e),r=await t.runCmd(o,{verbose:!1});if(r.status==="error")return r;try{let n=JSON.parse(r.values.reduce((i,s)=>i+`
`+s,""));return Object.keys(n).length===0?{status:"success",values:"EMPTY"}:{status:"success",values:n}}catch{return{status:"error",errorMsg:"Could not get document as json. Content is not valid json"}}}function wt(t){let e=N(t);return x(`app_lines <- strsplit("${e}", "\\n")[[1]]`,"jsonlite::toJSON(",'  shinyuieditor:::get_file_ui_definition_info(app_lines, "SINGLE-FILE"),',"  auto_unbox = TRUE",")")}var we=T(require("fs")),Y=T(require("vscode"));var ye=require("child_process");async function Re({cmd:t,args:e,verbose:o=!1,timeout_ms:r=1500}){let n=Tt(o,"runShellCommand: ");return new Promise(i=>{let s={stdout:[],stderr:[]},a=(0,ye.spawn)(t,e);function u(){n("Spawned")}function c(l){n("Error "+l.message),p(),i({status:"error",errorMsgs:l.message,...s})}function f(){n("Close"),p(),i({status:"success",...s})}function d(l){n(`stdout: ${l.toString()}`),s.stdout.push(l.toString())}function g(l){n(`stderr: ${l.toString()}`),s.stderr.push(l.toString())}function p(){clearTimeout(h),a.off("spawn",u),a.off("error",c),a.off("close",f),a.stdout.off("data",d),a.stderr.off("data",g)}let h=setTimeout(()=>{i({status:"error",errorMsgs:`Command, no response from run command within ${r}ms:
${t} ${e==null?void 0:e.join(" ")}`,...s}),p()},r);a.on("spawn",u),a.on("error",c),a.on("close",f),a.stdout.on("data",d),a.stderr.on("data",g)})}function Tt(t,e){return o=>{t&&console.log(e+o)}}async function Te(t){if(console.log("process info",process.env),_t())return console.log("We're in workbench!"),await St(t);console.log("We are not in workbench");let e=Y.Uri.parse(`http://localhost:${t}`);return(await Y.env.asExternalUri(e)).toString()}var _e="/usr/lib/rstudio-server/bin/rserver-url";function _t(){return"RS_SERVER_URL"in process.env?we.existsSync(_e):!1}function V(){let t=process.env.RS_SERVER_URL,e=process.env.RS_SESSION_URL;return t&&e?`${t}${e.slice(1)}`:""}async function St(t){let e=await Re({cmd:_e,args:[String(t)]});if(e.status==="error"&&Error(`Failed to get Posit workbench forwarded port. Error msg:
`+e.errorMsgs),!V())throw new Error("Can't find URL for workbench.");let r=e.stdout[0];return`${V()}p/${r}`}var Se=T(require("net"));async function xe(){return new Promise(t=>{let e=Se.default.createServer();e.listen(0,()=>{var r;let o=(r=e.address)==null?void 0:r.call(e);if(typeof o=="string"||o===null)throw new Error("Failed to find a free port...");e.close(n=>t(o.port))})})}var Ye=require("child_process");var je=require("fs");var He=require("fs"),ee=T(require("path")),We=Be();async function Ke(){let t=process.platform,e=bt(t);if(!e&&t==="win32")try{let o=new We({hive:We.HKLM,key:"\\Software\\R-Core\\R"}),r=await new Promise((n,i)=>o.get("InstallPath",(s,a)=>s===null?n(a):i(s)));e=ee.default.join(r.value,"bin","R.exe")}catch{e=""}return e}function bt(t){let e=":",o="";t==="win32"&&(e=";",o=".exe");let r=process.env.PATH?process.env.PATH.split(e):[];for(let n of r){let i=ee.default.join(n,"R"+o);if((0,He.existsSync)(i))return i}return""}async function Ve(){let t=await Ke();if(!t){let e="Cannot find R for running shinyuieditor. Make sure R is installed and/or updating the shinyuieditor extension settings option to proper to R path.";throw new Error(e)}if(!(0,je.existsSync)(t)){let e=`Path to R is invalid: ${t}. Make sure R is installed and/or updating the shinyuieditor extension settings option to proper to R path.`;throw new Error(e)}return he(t)}async function Q(t,e={}){let o=await Ve();if(o===void 0)throw new Error("Can't get R path");let r="";return new Promise(n=>{var S;let i=new AbortController,{signal:s}=i,a=(0,Ye.spawn)(o,t,{signal:s});a.on("spawn",f),a.on("error",d),a.on("close",g),a.stdout.on("data",p),a.stderr.on("data",h);function u(v,y){r+=`${v}: ${y}`}function c(v){!e.verbose||console.log(`%c[RProc ${a.pid}] %c${v.replaceAll(/\n$/g,"").replaceAll(/\n/g,`
\u2219\u2219\u2219 `)}`,"color: orangered;","color: grey; opacity: 0.5")}function f(){c("spawned"),clearTimeout(w),n({proc:a,stop:E,getIsRunning:()=>a.exitCode===null})}function d(v){var y;c(`Error: 
${v.toString()}`),clearTimeout(w),(y=e.onError)==null||y.call(e,v)}function g(){var v;c("Closed"),clearTimeout(w),(v=e.onClose)==null||v.call(e)}function p(v){var A;let y=v.toString();c(`stdout: 
${y}`),u("out",y),(A=e.onStdout)==null||A.call(e,y)}function h(v){var A;let y=v.toString();c(`stderr: ${y}`),u("error",y),(A=e.onStderr)==null||A.call(e,y)}function l(){a.off("spawn",f),a.off("error",d),a.off("close",g),a.stdout.off("data",p),a.stderr.off("data",h)}function E(){return l(),!a.pid||!a.connected?!0:(c(`Killing R process ${a.pid}`),process.kill(a.pid))}let w=setTimeout(()=>{throw E(),new Error(`Starting backend server failed.
 Logs:
`+r)},(S=e.timeout_ms)!=null?S:5e3)})}function Qe({pathToApp:t,onCrash:e,onInitiation:o,onReady:r,onFailToStart:n,onLogs:i}){let s="0.0.0.0",a=null;async function u(){o(),c();try{let f=await xe(),d=await Te(f),g=new RegExp(`listening on .+${f}`,"i"),p=x("options(shiny.autoreload = TRUE)",`shiny::runApp(appDir = "${t}", port = ${f}, host = "${s}")`);return a=await Q(["--no-save","--no-restore","--silent","-e",p],{onStderr(h){g.test(h)&&r(d.toString()),i(h.split(`
`))},onClose:e,onError:e}),!0}catch{return n(),!1}}function c(){return a===null?!0:a.stop()}return{start:u,stop:c}}async function Ze({document:t,uiBounds:e,RProcess:o,uiTree:r}){if(!e)throw new Error("Attempting to update an app that has yet to be parsed.");let{start:n,end:i}=e,s=await j(r,o),a=`ui <- ${x(...s.text)}
`;await K({text:a,document:t,uiBounds:e,type:"replace"});let u=i-n+1,f=s.text.length-u;return{uiText:a,uiBounds:{start:n,end:i+f}}}var{showErrorMessage:qe}=Je.window;function Xe({RProcess:t,document:e,sendMessage:o}){let r=!1,n=null,i,s,a=async()=>{let p=e.getText();if(!(n!==null&&p.includes(n))){if(!r){let l=await me(t,"shinyuieditor");if(l.status==="error")throw o({path:"BACKEND-ERROR",payload:{context:"checking for shinyuieditor package",msg:l.msg}}),qe(l.msg),new Error(l.msg);r=!0}try{let l=await Ee(t,p);if(l.status==="error"){o({path:"BACKEND-ERROR",payload:{context:"parsing app",msg:l.errorMsg}}),qe(l.errorMsg);return}if(l.values==="EMPTY")o({path:"TEMPLATE_CHOOSER",payload:"SINGLE-FILE"});else{let{ui_tree:E}=l.values;i=l.values.ui_bounds,o({path:"UPDATED-TREE",payload:E})}}catch(l){console.error("Failed to parse",l)}}},u=ue(a,500),c=()=>{u()},f=()=>{u.flush()},d=Qe({pathToApp:e.fileName,onInitiation:()=>{o({path:"APP-PREVIEW-STATUS",payload:"LOADING"})},onReady:p=>{o({path:"APP-PREVIEW-STATUS",payload:{url:p}})},onFailToStart:()=>{o({path:"APP-PREVIEW-CRASH",payload:"Failed to start"})},onCrash:()=>{o({path:"APP-PREVIEW-CRASH",payload:"Crashed"})},onLogs:p=>{o({path:"APP-PREVIEW-LOGS",payload:p})}});return{onDocumentChanged:c,onDocumentSaved:f,onDidReceiveMessage:async p=>{if(ce(p))switch(p.path){case"READY-FOR-STATE":a();return;case"TEMPLATE-SELECTION":{let h=await ve(t,p.payload);await K({text:h,document:e,type:"insert",uiBounds:i});return}case"UPDATED-TREE":{let h=await Ze({document:e,uiBounds:i,RProcess:t,uiTree:p.payload});n=h.uiText,i=h.uiBounds;return}case"APP-PREVIEW-REQUEST":{d.start();return}case"APP-PREVIEW-STOP":{d.stop();return}case"APP-PREVIEW-RESTART":{d.start();return}case"ENTERED-TEMPLATE-SELECTOR":{d.stop(),await le(e);return}case"OPEN-COMPANION-EDITOR":{s=await de({appFile:e,existingEditor:s}),i&&fe(i,s);return}case"NODE-SELECTION":{console.log("New node selection",p.payload);return}default:console.warn("Unhandled message from client",p)}else console.log("Unknown message from webview",p)}}}function ze(t){let e=t.getText();return e.trim()===""?"empty":Ut.test(e)?"valid":"invalid"}var Ut=/shinyApp\(/;var et="SUE_START_SIGNAL",tt="SUE_END_SIGNAL";async function ot(t,e,{timeout_ms:o=1e3,verbose:r=!1}={}){let n=u=>{r&&console.log(`runRCommand: ${u}`)},i="",s=!1,a=[];return t.exitCode!==null?{status:"error",errorMsg:`Can't run R command as background R process has exited with code ${t.exitCode}.`}:new Promise(u=>{function c(h){let E=h.toString().split(`
`);n("~~~Output chunk~~~");for(let w of E){let S=w.includes(et),v=w.includes(tt),y=w.length===0;if(S){s=!0;continue}if(v){clearTimeout(g),u({status:"success",values:a}),n("Output finished"),p();break}!s||y||(n(w),i+=w+`
`,a.push(w))}}function f(h){let l=h.toString();i+=`stderr: ${l}
`,n("stderr: "+l)}function d(){u({status:"error",errorMsg:i}),p()}t.stdout.on("data",c),t.stderr.on("data",f),t.on("close",d);let g=setTimeout(()=>{u({status:"error",errorMsg:`Timeout, no response from run command within ${o}ms: ${e}
 Logs:
 ${i}`}),p()},o);function p(){t.stdout.off("data",c),t.stderr.off("data",f),t.off("close",d)}rt(`print('${et}');${e};print('${tt}')`,t)})}async function nt(){async function t(){return await Q(["--silent","--slave","--no-save","--no-restore"],{timeout_ms:5e3})}let e=await t();return{...e,async runCmd(o,r){return e.getIsRunning()||(console.warn("Background R Process has crashed. Restarting..."),e.stop(),e=await t(),console.warn("Background R Process restarted")),ot(e.proc,o,r)}}}function rt(t,e){e.stdin.write(`${t}
`)}function it(){let t="",e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";for(let o=0;o<32;o++)t+=e.charAt(Math.floor(Math.random()*e.length));return t}var Z=class{constructor(e){this.context=e;this.RProcess=null;nt().then(o=>{this.RProcess=o})}static register(e){let o=new Z(e);return P.window.registerCustomEditorProvider(Z.viewType,o,{webviewOptions:{retainContextWhenHidden:!0}})}async resolveCustomTextEditor(e,o,r){if(ze(e)==="invalid"){let c="The active file doesn't appear to be a Shiny app. Make sure that the script is either empty or has a valid shiny app in it.";throw P.window.showErrorMessage(c),o.dispose(),new Error(c)}if(o.webview.options={enableScripts:!0},o.webview.html=this.getHtmlForWebview(o.webview),!this.RProcess)throw new Error("Don't have an R Process to pass to editor backend!");let i=Xe({RProcess:this.RProcess,document:e,sendMessage:c=>o.webview.postMessage(c)}),s=P.workspace.onDidChangeTextDocument(c=>{c.document.uri.toString()===e.uri.toString()&&i.onDocumentChanged()}),a=P.workspace.onDidSaveTextDocument(c=>{c.uri.toString()===e.uri.toString()&&i.onDocumentSaved()}),u=o.webview.onDidReceiveMessage(i.onDidReceiveMessage);o.onDidDispose(()=>{s.dispose(),a.dispose(),u.dispose()})}getHtmlForWebview(e){let o=e.asWebviewUri(P.Uri.joinPath(this.context.extensionUri,"media","build","bundle.js")),r=e.asWebviewUri(P.Uri.joinPath(this.context.extensionUri,"media","build","bundle.css")),n=it(),i=e.cspSource,s=V();return`
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
				<meta 
          http-equiv="Content-Security-Policy" 
          content="default-src 'none'; frame-src http://localhost:*/ ${s?`${s}*`:""} ${i} https:; img-src ${i} data:; style-src ${e.cspSource} 'unsafe-inline'; script-src 'nonce-${n}';">

				<meta name="viewport" content="width=device-width, initial-scale=1.0">

				
				<link href="${r}" rel="stylesheet" />
				
				<title>Shiny UI Editor</title>
			</head>
			<body style="padding-inline: 0;">
				<noscript>You need to enable JavaScript to run this app.</noscript>
				<div id="root" style="height: 100vh; display: relative"></div>
				<script nonce="${n}" src="${o}"><\/script>
			</body>
			</html>`}},G=Z;G.viewType="shinyuieditor.appFile";function Mt(t){t.subscriptions.push(G.register(t)),t.subscriptions.push(te.commands.registerCommand("shinyuieditor.startEditorOnActiveFile",ae),te.commands.registerCommand("shinyuieditor.launchEditor",ne))}0&&(module.exports={activate});
