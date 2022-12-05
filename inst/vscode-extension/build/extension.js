"use strict";var Xe=Object.create;var B=Object.defineProperty;var ze=Object.getOwnPropertyDescriptor;var et=Object.getOwnPropertyNames;var tt=Object.getPrototypeOf,ot=Object.prototype.hasOwnProperty;var rt=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports),nt=(t,e)=>{for(var o in e)B(t,o,{get:e[o],enumerable:!0})},re=(t,e,o,r)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of et(e))!ot.call(t,n)&&n!==o&&B(t,n,{get:()=>e[n],enumerable:!(r=ze(e,n))||r.enumerable});return t};var w=(t,e,o)=>(o=t!=null?Xe(tt(t)):{},re(e||!t||!t.__esModule?B(o,"default",{value:t,enumerable:!0}):o,t)),it=t=>re(B({},"__esModule",{value:!0}),t);var De=rt((Wt,Oe)=>{var z=require("util"),lt=require("path"),U=require("child_process").spawn,E=function(){},ee="HKLM",ge="HKCU",ve="HKCR",Ee="HKU",ye="HKCC",Re=[ee,ge,ve,Ee,ye],Te="REG_SZ",we="REG_MULTI_SZ",_e="REG_EXPAND_SZ",Se="REG_DWORD",xe="REG_QWORD",Pe="REG_BINARY",Ae="REG_NONE",Ce=[Te,we,_e,Se,xe,Pe,Ae],dt="",ft=/(\\[a-zA-Z0-9_\s]+)*/,mt=/^(HKEY_LOCAL_MACHINE|HKEY_CURRENT_USER|HKEY_CLASSES_ROOT|HKEY_USERS|HKEY_CURRENT_CONFIG)(.*)$/,Ue=/^(.*)\s(REG_SZ|REG_MULTI_SZ|REG_EXPAND_SZ|REG_DWORD|REG_QWORD|REG_BINARY|REG_NONE)\s+([^\s].*)$/;function F(t,e){if(!(this instanceof F))return new F(t,e);Error.captureStackTrace(this,F),this.__defineGetter__("name",function(){return F.name}),this.__defineGetter__("message",function(){return t}),this.__defineGetter__("code",function(){return e})}z.inherits(F,Error);function O(t){var e={stdout:"",stderr:""};return t.stdout.on("data",function(o){e.stdout+=o.toString()}),t.stderr.on("data",function(o){e.stderr+=o.toString()}),e}function D(t,e,o){var r=o.stdout.trim(),n=o.stderr.trim(),i=z.format(`%s command exited with code %d:
%s
%s`,t,e,r,n);return new F(i,e)}function ht(t){if(t=="x64")return"64";if(t=="x86")return"32";throw new Error("illegal architecture: "+t+" (use x86 or x64)")}function b(t,e){e&&t.push("/reg:"+ht(e))}function N(){return process.platform==="win32"?lt.join(process.env.windir,"system32","reg.exe"):"REG"}function G(t,e,o,r,n,i,s){if(!(this instanceof G))return new G(t,e,o,r,n,i,s);var a=t,c=e,p=o,f=r,l=n,g=i,u=s;this.__defineGetter__("host",function(){return a}),this.__defineGetter__("hive",function(){return c}),this.__defineGetter__("key",function(){return p}),this.__defineGetter__("name",function(){return f}),this.__defineGetter__("type",function(){return l}),this.__defineGetter__("value",function(){return g}),this.__defineGetter__("arch",function(){return u})}z.inherits(G,Object);function d(t){if(!(this instanceof d))return new d(t);var e=t||{},o=""+(e.host||""),r=""+(e.hive||ee),n=""+(e.key||""),i=e.arch||null;if(this.__defineGetter__("host",function(){return o}),this.__defineGetter__("hive",function(){return r}),this.__defineGetter__("key",function(){return n}),this.__defineGetter__("path",function(){return(o.length==0?"":"\\\\"+o+"\\")+r+n}),this.__defineGetter__("arch",function(){return i}),this.__defineGetter__("parent",function(){var s=n.lastIndexOf("\\");return new d({host:this.host,hive:this.hive,key:s==-1?"":n.substring(0,s),arch:this.arch})}),Re.indexOf(r)==-1)throw new Error("illegal hive specified.");if(!ft.test(n))throw new Error("illegal key specified.");if(i&&i!="x64"&&i!="x86")throw new Error("illegal architecture specified (use x86 or x64)")}d.HKLM=ee;d.HKCU=ge;d.HKCR=ve;d.HKU=Ee;d.HKCC=ye;d.HIVES=Re;d.REG_SZ=Te;d.REG_MULTI_SZ=we;d.REG_EXPAND_SZ=_e;d.REG_DWORD=Se;d.REG_QWORD=xe;d.REG_BINARY=Pe;d.REG_NONE=Ae;d.REG_TYPES=Ce;d.DEFAULT_VALUE=dt;d.prototype.values=function(e){if(typeof e!="function")throw new TypeError("must specify a callback");var o=["QUERY",this.path];b(o,this.arch);var r=U(N(),o,{cwd:void 0,env:process.env,stdio:["ignore","pipe","pipe"]}),n="",i=this,s=null,a=O(r);return r.on("close",function(c){if(!s)if(c!==0)E("process exited with code "+c),e(D("QUERY",c,a),null);else{for(var p=[],f=[],l=n.split(`
`),g=0,u=0,m=l.length;u<m;u++){var T=l[u].trim();T.length>0&&(E(T),g!=0&&p.push(T),++g)}for(var u=0,m=p.length;u<m;u++){var h=Ue.exec(p[u]),y,x,v;h&&(y=h[1].trim(),x=h[2].trim(),v=h[3],f.push(new G(i.host,i.hive,i.key,y,x,v,i.arch)))}e(null,f)}}),r.stdout.on("data",function(c){n+=c.toString()}),r.on("error",function(c){s=c,e(c)}),this};d.prototype.keys=function(e){if(typeof e!="function")throw new TypeError("must specify a callback");var o=["QUERY",this.path];b(o,this.arch);var r=U(N(),o,{cwd:void 0,env:process.env,stdio:["ignore","pipe","pipe"]}),n="",i=this,s=null,a=O(r);return r.on("close",function(c){s||c!==0&&(E("process exited with code "+c),e(D("QUERY",c,a),null))}),r.stdout.on("data",function(c){n+=c.toString()}),r.stdout.on("end",function(){for(var c=[],p=[],f=n.split(`
`),l=0,g=f.length;l<g;l++){var u=f[l].trim();u.length>0&&(E(u),c.push(u))}for(var l=0,g=c.length;l<g;l++){var m=mt.exec(c[l]),T,h;m&&(T=m[1],h=m[2],h&&h!==i.key&&p.push(new d({host:i.host,hive:i.hive,key:h,arch:i.arch})))}e(null,p)}),r.on("error",function(c){s=c,e(c)}),this};d.prototype.get=function(e,o){if(typeof o!="function")throw new TypeError("must specify a callback");var r=["QUERY",this.path];e==""?r.push("/ve"):r=r.concat(["/v",e]),b(r,this.arch);var n=U(N(),r,{cwd:void 0,env:process.env,stdio:["ignore","pipe","pipe"]}),i="",s=this,a=null,c=O(n);return n.on("close",function(p){if(!a)if(p!==0)E("process exited with code "+p),o(D("QUERY",p,c),null);else{for(var f=[],l=null,g=i.split(`
`),u=0,m=0,T=g.length;m<T;m++){var h=g[m].trim();h.length>0&&(E(h),u!=0&&f.push(h),++u)}var y=f[f.length-1]||"",x=Ue.exec(y),v,R,A;x&&(v=x[1].trim(),R=x[2].trim(),A=x[3],l=new G(s.host,s.hive,s.key,v,R,A,s.arch)),o(null,l)}}),n.stdout.on("data",function(p){i+=p.toString()}),n.on("error",function(p){a=p,o(p)}),this};d.prototype.set=function(e,o,r,n){if(typeof n!="function")throw new TypeError("must specify a callback");if(Ce.indexOf(o)==-1)throw Error("illegal type specified.");var i=["ADD",this.path];e==""?i.push("/ve"):i=i.concat(["/v",e]),i=i.concat(["/t",o,"/d",r,"/f"]),b(i,this.arch);var s=U(N(),i,{cwd:void 0,env:process.env,stdio:["ignore","pipe","pipe"]}),a=null,c=O(s);return s.on("close",function(p){a||(p!==0?(E("process exited with code "+p),n(D("ADD",p,c,null))):n(null))}),s.stdout.on("data",function(p){E(""+p)}),s.on("error",function(p){a=p,n(p)}),this};d.prototype.remove=function(e,o){if(typeof o!="function")throw new TypeError("must specify a callback");var r=e?["DELETE",this.path,"/f","/v",e]:["DELETE",this.path,"/f","/ve"];b(r,this.arch);var n=U(N(),r,{cwd:void 0,env:process.env,stdio:["ignore","pipe","pipe"]}),i=null,s=O(n);return n.on("close",function(a){i||(a!==0?(E("process exited with code "+a),o(D("DELETE",a,s),null)):o(null))}),n.stdout.on("data",function(a){E(""+a)}),n.on("error",function(a){i=a,o(a)}),this};d.prototype.clear=function(e){if(typeof e!="function")throw new TypeError("must specify a callback");var o=["DELETE",this.path,"/f","/va"];b(o,this.arch);var r=U(N(),o,{cwd:void 0,env:process.env,stdio:["ignore","pipe","pipe"]}),n=null,i=O(r);return r.on("close",function(s){n||(s!==0?(E("process exited with code "+s),e(D("DELETE",s,i),null)):e(null))}),r.stdout.on("data",function(s){E(""+s)}),r.on("error",function(s){n=s,e(s)}),this};d.prototype.erase=d.prototype.clear;d.prototype.destroy=function(e){if(typeof e!="function")throw new TypeError("must specify a callback");var o=["DELETE",this.path,"/f"];b(o,this.arch);var r=U(N(),o,{cwd:void 0,env:process.env,stdio:["ignore","pipe","pipe"]}),n=null,i=O(r);return r.on("close",function(s){n||(s!==0?(E("process exited with code "+s),e(D("DELETE",s,i),null)):e(null))}),r.stdout.on("data",function(s){E(""+s)}),r.on("error",function(s){n=s,e(s)}),this};d.prototype.create=function(e){if(typeof e!="function")throw new TypeError("must specify a callback");var o=["ADD",this.path,"/f"];b(o,this.arch);var r=U(N(),o,{cwd:void 0,env:process.env,stdio:["ignore","pipe","pipe"]}),n=null,i=O(r);return r.on("close",function(s){n||(s!==0?(E("process exited with code "+s),e(D("ADD",s,i),null)):e(null))}),r.stdout.on("data",function(s){E(""+s)}),r.on("error",function(s){n=s,e(s)}),this};d.prototype.keyExists=function(e){return this.values(function(o,r){if(o)return o.code==1?e(null,!1):e(o);e(null,!0)}),this};d.prototype.valueExists=function(e,o){return this.get(e,function(r,n){if(r)return r.code==1?o(null,!1):o(r);o(null,!0)}),this};Oe.exports=d});var Pt={};nt(Pt,{activate:()=>xt});module.exports=it(Pt);var oe=w(require("vscode"));var C=require("vscode"),_=w(require("vscode"));var J="app.R",st=/^([\w|\s]+)([\.[\w|^\.]*]*)$/i;function X(t){if(t==="")return{valid:!0,name:J};let e=t.match(st);if(e===null)return{valid:!1,msg:`Invalid app name: ${t}.`};let[o,r,n]=e;return(n===""||n===".")&&(n=".R"),r?n!==".R"?{valid:!1,msg:`Invalid file extension: ${n}. Extension needs to be .R`}:(r=r.replaceAll(" ","-"),{valid:!0,name:`${r}${n}`}):{valid:!1,msg:`Invalid app name: ${t}. Make sure to only use numbers and letters. Spaces will be converted to dashes.`}}var ne=new TextEncoder().encode("");async function ie(){let t=await C.window.showOpenDialog({canSelectFolders:!0,canSelectFiles:!0,title:"Choose location for Shiny app",openLabel:"Choose app folder or file",canSelectMany:!1,filters:{"R scripts":["R","r"]}});if(!t)return;let e=t[0],r=(await _.workspace.fs.stat(e)).type===_.FileType.Directory?await at(e):e;!r||_.commands.executeCommand("vscode.openWith",r,"shinyUiEditor.appFile")}async function at(t){let e=(await C.workspace.fs.readDirectory(t)).filter(([s,a])=>a===_.FileType.File).map(([s,a])=>s),o=await C.window.showInputBox({prompt:"Enter file name for new app",placeHolder:J,validateInput(s){let a=X(s);return a.valid?e.includes(a.name)?{message:`Run the editor on existing app: ${a.name}.`,severity:_.InputBoxValidationSeverity.Info}:{message:`Run the template chooser to build new app: ${a.name}.`,severity:_.InputBoxValidationSeverity.Info}:{message:a.msg,severity:_.InputBoxValidationSeverity.Error}}});if(!o)return;let r=X(o);if(!r.valid){_.window.showErrorMessage(`Error processing requested file name: ${o}. Try with a different name.`);return}let n=C.Uri.joinPath(t,r.name);return e.includes(r.name)||await C.workspace.fs.writeFile(n,ne),n}var se=w(require("path")),ae=w(require("vscode")),W=require("vscode");function pt(t){let e=t.ext;return/\.R/i.test(e)}function pe(t="world"){let e=W.window.activeTextEditor;if(!e){W.window.showErrorMessage("No active file open to run ui editor on!");return}let o=se.default.parse(e.document.fileName);if(!pt(o)){W.window.showErrorMessage(`Can't run the ui editor on the currently active file ${o.base}, needs to be a .R file.`);return}ae.commands.executeCommand("vscode.openWith",e.document.uri,"shinyUiEditor.appFile")}var P=w(require("vscode"));function ct(t){return typeof t=="object"&&t!==null}function ce(t){return ct(t)?"path"in t:!1}var ue=ut;function ut(t,e,o){var r=null,n=null,i=function(){r&&(clearTimeout(r),n=null,r=null)},s=function(){var c=n;i(),c&&c()},a=function(){if(!e)return t.apply(this,arguments);var c=this,p=arguments,f=o&&!r;if(i(),n=function(){t.apply(c,p)},r=setTimeout(function(){if(r=null,!f){var l=n;return n=null,l()}},e),f)return n()};return a.cancel=i,a.flush=s,a}var Qe=w(require("vscode"));var I=w(require("vscode"));var le=w(require("vscode"));function H({start:t,end:e}){return new le.Selection(t-1,0,e,0)}async function K({text:t,document:e,uiBounds:o={start:0,end:0},type:r}){let n=e.uri,i=new I.WorkspaceEdit;if(r==="replace"){let s=H(o);i.replace(n,s,t)}r==="insert"&&i.insert(e.uri,new I.Position(0,0),t),await I.workspace.applyEdit(i),e.save()}var M=w(require("vscode"));async function de(t){let e=t.uri,o=new M.WorkspaceEdit,r=t.validateRange(new M.Range(0,0,1/0,1/0));o.replace(e,r,""),await M.workspace.applyEdit(o),t.save()}var L=w(require("vscode"));async function fe({appFile:t,existingEditor:e}){return e&&L.window.visibleTextEditors.includes(e)?e:await L.window.showTextDocument(t.uri,{viewColumn:L.ViewColumn.Beside,preview:!0})}function me(t,e){e.selection=H(t)}var Me=require("child_process");var Ne=require("fs"),te=w(require("path")),j=w(require("vscode"));function S(...t){return t.filter(o=>o!==void 0).reduce((o,r,n)=>(n===0?"":o+`
`)+r,"")}function k(t){return t.replace(/"/g,'\\"')}function he(t){return t.replace(/^"(.*)"$/,"$1").replace(/^'(.*)'$/,"$1")}var be=De();function gt(t){let e=":",o="";t==="win32"&&(e=";",o=".exe");let r=process.env.PATH?process.env.PATH.split(e):[];for(let n of r){let i=te.default.join(n,"R"+o);if((0,Ne.existsSync)(i))return i}return""}async function vt(){let t=process.platform,e=gt(t);if(!e&&t==="win32")try{let o=new be({hive:be.HKLM,key:"\\Software\\R-Core\\R"}),r=await new Promise((n,i)=>o.get("InstallPath",(s,a)=>s===null?n(a):i(s)));e=te.default.join(r.value,"bin","R.exe")}catch{e=""}return e}function Et(){return`rpath.${process.platform==="win32"?"windows":process.platform==="darwin"?"mac":"linux"}`}async function Ie(){let t=Et(),e=j.workspace.getConfiguration("r").get(t);return e||(e=await vt()),e||j.window.showErrorMessage(`Cannot find R for running shinyuieditor. Make sure R is installed and/or updating the r.${t} config option to proper to R path.`),he(e)}async function V(t,e={}){let o=await Ie();if(o===void 0)throw new Error("Can't get R path");let r="";return new Promise(n=>{var x;let i=new AbortController,{signal:s}=i,a=(0,Me.spawn)(o,t,{signal:s});a.on("spawn",f),a.on("error",l),a.on("close",g),a.stdout.on("data",u),a.stderr.on("data",m);function c(v,R){r+=`${v}: ${R}`}function p(v){!e.verbose||console.log(`%c[RProc ${a.pid}] %c${v.replaceAll(/\n$/g,"").replaceAll(/\n/g,`
\u2219\u2219\u2219 `)}`,"color: orangered;","color: grey; opacity: 0.5")}function f(){p("spawned"),clearTimeout(y),n({proc:a,stop:h})}function l(v){var R;p(`Error: 
${v.toString()}`),clearTimeout(y),(R=e.onError)==null||R.call(e,v)}function g(){var v;p("Closed"),clearTimeout(y),(v=e.onClose)==null||v.call(e)}function u(v){var A;let R=v.toString();p(`stdout: 
${R}`),c("out",R),(A=e.onStdout)==null||A.call(e,R)}function m(v){var A;let R=v.toString();p(`stderr: ${R}`),c("error",R),(A=e.onStderr)==null||A.call(e,R)}function T(){a.off("spawn",f),a.off("error",l),a.off("close",g),a.stdout.off("data",u),a.stderr.off("data",m)}function h(){return T(),!a.pid||!a.connected?!0:(p(`Killing R process ${a.pid}`),process.kill(a.pid))}let y=setTimeout(()=>{throw h(),new Error(`Starting backend server failed.
 Logs:
`+r)},(x=e.timeout_ms)!=null?x:5e3)})}async function ke(){let t=await V(["--silent","--slave","--no-save","--no-restore"],{timeout_ms:5e3});return{...t,runCmd:(e,o)=>Y(t.proc,e,o)}}function Fe(t,e){e.stdin.write(`${t}
`)}var Le="SUE_START_SIGNAL",Ge="SUE_END_SIGNAL";function yt(t,e){return o=>{t&&console.log(e+o)}}async function Y(t,e,{timeout_ms:o=1e3,verbose:r=!1}={}){let n=yt(r,"runRCommand: "),i="",s=!1,a=!1,c=[];return new Promise(p=>{function f(m){let h=m.toString().split(`
`);n("~~~Output chunk~~~");for(let y of h){if(i+=y+`
`,n(y),y.includes(Le)){a=!0;continue}if(!!a&&!(!s&&y.length===0)){if(y.includes(Ge)){clearTimeout(u),p(c),n("Output finished"),g();break}s=!0,c.push(y)}}}function l(m){n("stderr: "+m.toString())}function g(){t.stdout.off("data",f),t.stderr.off("data",l)}t.stdout.on("data",f),t.stderr.on("data",l);let u=setTimeout(()=>{throw g(),new Error(`Timeout, no response from run command within ${o}ms: ${e}
 Logs:
 ${i}`)},o);Fe(`print('${Le}');${e};print('${Ge}')`,t)})}async function $e(t,e){return(await Y(t.proc,`print(require(${e}, quietly = TRUE))`,{verbose:!1}))[0].includes("FALSE")?{status:"error",msg:Rt(e)}:{status:"success"}}function Rt(t){return`The ShinyUiEditor extension needs the \`${t}\` pkg installed. Install using \`remotes::install_github('rstudio/${t}')\` and restart the extension.`}async function Be(t,e,o){return(await t.runCmd(`styler::style_text("${k(e)}", scope = "tokens")`,o)).reduce((n,i)=>n+`
`+i,"")}async function Q(t,e){let o=Tt(t);try{let r=await e.runCmd(o,{verbose:!1});return JSON.parse(S(...r))}catch{throw new Error("Failed to generate new ui code from tree")}}function Tt(t,e=!0){let o=k(JSON.stringify(t,null,2)),r=e?"TRUE":"FALSE";return S("ui_tree <- jsonlite::fromJSON(",`  txt = "${o}",`,"  simplifyVector = FALSE",")",`new_ui_code <- shinyuieditor:::ui_tree_to_code(ui_tree, remove_namespace = ${r})`,"new_ui_code$text <- as.character(new_ui_code$text)","jsonlite::toJSON(new_ui_code, auto_unbox = TRUE)")}async function We(t,{uiTree:e,otherCode:{uiExtra:o,serverFunctionBody:r,serverExtra:n,serverLibraries:i}}){let{text:s,namespaces_removed:a}=await Q(e,t),p=[...new Set([...i!=null?i:[],...a])].map(m=>`library(${m})`),f=["server <- function(input, output) {",r,"}"],l="ui <- "+S(...s),g=S(...p,o,"",l,"",n,"",...f,"","shinyApp(ui, server)");return await Be(t,g)}async function He(t,e){let o=wt(t),r=await e.runCmd(o);try{let n=JSON.parse(r.reduce((i,s)=>i+`
`+s,""));return Object.keys(n).length===0?"EMPTY":n}catch{throw new Error("Could not get document as json. Content is not valid json")}}function wt(t){let e=k(t);return S(`app_lines <- strsplit("${e}", "\\n")[[1]]`,"jsonlite::toJSON(",'  shinyuieditor:::get_file_ui_definition_info(app_lines, "single-file"),',"  auto_unbox = TRUE",")")}var Z=w(require("vscode"));var Ke=w(require("net"));async function je(){return new Promise(t=>{let e=Ke.default.createServer();e.listen(0,()=>{var r;let o=(r=e.address)==null?void 0:r.call(e);if(typeof o=="string"||o===null)throw new Error("Failed to find a free port...");e.close(n=>t(o.port))})})}function Ve({pathToApp:t,onCrash:e,onInitiation:o,onReady:r,onFailToStart:n,onLogs:i}){let s="0.0.0.0",a=null;async function c(){o(),p();try{let f=await je(),l=await Z.env.asExternalUri(Z.Uri.parse(`http://localhost:${f}`)),g=new RegExp(`listening on .+${f}`,"i"),u=S("options(shiny.autoreload = TRUE)",`shiny::runApp(appDir = "${t}", port = ${f}, host = "${s}")`);return a=await V(["--no-save","--no-restore","--silent","-e",u],{onStderr(m){g.test(m)&&r(l.toString()),i(m.split(`
`))},onClose:e,onError:e}),!0}catch{return n(),!1}}function p(){return a===null?!0:a.stop()}return{start:c,stop:p}}async function Ye({document:t,uiBounds:e,RProcess:o,uiTree:r}){if(!e)throw new Error("Attempting to update an app that has yet to be parsed.");let{start:n,end:i}=e,s=await Q(r,o),a=`ui <- ${S(...s.text)}
`;await K({text:a,document:t,uiBounds:e,type:"replace"});let c=i-n+1,f=s.text.length-c;return{uiText:a,uiBounds:{start:n,end:i+f}}}var{showErrorMessage:_t}=Qe.window;function Ze({RProcess:t,document:e,sendMessage:o}){let r=!1,n=null,i,s,a=async()=>{let u=e.getText();if(n!==null&&u.includes(n))return;if(!r){let h=await $e(t,"shinyuieditor");if(h.status==="error")throw o({path:"BACKEND-ERROR",payload:h.msg}),_t(h.msg),new Error(h.msg);r=!0}let T=await He(u,t);if(T==="EMPTY")o({path:"TEMPLATE_CHOOSER",payload:"SINGLE-FILE"});else{let{ui_tree:h}=T;i=T.ui_bounds,o({path:"UPDATED-TREE",payload:h})}},c=ue(a,500),p=()=>{c()},f=()=>{c.flush()},l=Ve({pathToApp:e.fileName,onInitiation:()=>{o({path:"APP-PREVIEW-STATUS",payload:"LOADING"})},onReady:u=>{o({path:"APP-PREVIEW-STATUS",payload:{url:u}})},onFailToStart:()=>{o({path:"APP-PREVIEW-CRASH",payload:"Failed to start"})},onCrash:()=>{o({path:"APP-PREVIEW-CRASH",payload:"Crashed"})},onLogs:u=>{o({path:"APP-PREVIEW-LOGS",payload:u})}});return{onDocumentChanged:p,onDocumentSaved:f,onDidReceiveMessage:async u=>{if(ce(u))switch(u.path){case"READY-FOR-STATE":a();return;case"TEMPLATE-SELECTION":{let m=await We(t,u.payload);await K({text:m,document:e,type:"insert",uiBounds:i});return}case"UPDATED-TREE":{let m=await Ye({document:e,uiBounds:i,RProcess:t,uiTree:u.payload});n=m.uiText,i=m.uiBounds;return}case"APP-PREVIEW-REQUEST":{l.start();return}case"APP-PREVIEW-STOP":{l.stop();return}case"APP-PREVIEW-RESTART":{l.start();return}case"ENTERED-TEMPLATE-SELECTOR":{l.stop(),await de(e);return}case"OPEN-COMPANION-EDITOR":{s=await fe({appFile:e,existingEditor:s}),i&&me(i,s);return}case"NODE-SELECTION":{console.log("New node selection",u.payload);return}default:console.warn("Unhandled message from client",u)}else console.log("Unknown message from webview",u)}}}function qe(t){let e=t.getText();return e.trim()===""?"empty":St.test(e)?"valid":"invalid"}var St=/shinyApp\(/;function Je(){let t="",e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";for(let o=0;o<32;o++)t+=e.charAt(Math.floor(Math.random()*e.length));return t}var q=class{constructor(e){this.context=e;this.RProcess=null;ke().then(o=>{this.RProcess=o})}static register(e){let o=new q(e);return P.window.registerCustomEditorProvider(q.viewType,o,{webviewOptions:{retainContextWhenHidden:!0}})}async resolveCustomTextEditor(e,o,r){if(qe(e)==="invalid"){let p="The active file doesn't appear to be a Shiny app. Make sure that the script is either empty or has a valid shiny app in it.";throw P.window.showErrorMessage(p),o.dispose(),new Error(p)}if(o.webview.options={enableScripts:!0},o.webview.html=this.getHtmlForWebview(o.webview),!this.RProcess)throw new Error("Don't have an R Process to pass to editor backend!");let i=Ze({RProcess:this.RProcess,document:e,sendMessage:p=>o.webview.postMessage(p)}),s=P.workspace.onDidChangeTextDocument(p=>{p.document.uri.toString()===e.uri.toString()&&i.onDocumentChanged()}),a=P.workspace.onDidSaveTextDocument(p=>{p.uri.toString()===e.uri.toString()&&i.onDocumentSaved()}),c=o.webview.onDidReceiveMessage(i.onDidReceiveMessage);o.onDidDispose(()=>{s.dispose(),a.dispose(),c.dispose()})}getHtmlForWebview(e){let o=e.asWebviewUri(P.Uri.joinPath(this.context.extensionUri,"media","build","bundle.js")),r=e.asWebviewUri(P.Uri.joinPath(this.context.extensionUri,"media","build","bundle.css")),n=Je(),i=e.cspSource;return`
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
          content="default-src 'none'; frame-src http://localhost:*/ ${i} https:; img-src ${i} data:; style-src ${e.cspSource} 'unsafe-inline'; script-src 'nonce-${n}';">

				<meta name="viewport" content="width=device-width, initial-scale=1.0">

				
				<link href="${r}" rel="stylesheet" />
				
				<title>Shiny UI Editor</title>
			</head>
			<body style="padding-inline: 0;">
				<noscript>You need to enable JavaScript to run this app.</noscript>
				<div id="root" style="height: 100vh; display: relative"></div>
				<script nonce="${n}" src="${o}"><\/script>
			</body>
			</html>`}},$=q;$.viewType="shinyUiEditor.appFile";function xt(t){t.subscriptions.push($.register(t)),t.subscriptions.push(oe.commands.registerCommand("shinyUiEditor.startEditorOnActiveFile",pe),oe.commands.registerCommand("shinyUiEditor.launchEditor",ie))}0&&(module.exports={activate});
