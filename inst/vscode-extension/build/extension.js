"use strict";var ht=Object.create;var W=Object.defineProperty;var vt=Object.getOwnPropertyDescriptor;var _t=Object.getOwnPropertyNames;var yt=Object.getPrototypeOf,Et=Object.prototype.hasOwnProperty;var Rt=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports),St=(t,e)=>{for(var o in e)W(t,o,{get:e[o],enumerable:!0})},ie=(t,e,o,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of _t(e))!Et.call(t,r)&&r!==o&&W(t,r,{get:()=>e[r],enumerable:!(n=vt(e,r))||n.enumerable});return t};var S=(t,e,o)=>(o=t!=null?ht(yt(t)):{},ie(e||!t||!t.__esModule?W(o,"default",{value:t,enumerable:!0}):o,t)),wt=t=>ie(W({},"__esModule",{value:!0}),t);var je=Rt((Ao,He)=>{var ee=require("util"),kt=require("path"),b=require("child_process").spawn,E=function(){},te="HKLM",Oe="HKCU",Ne="HKCR",be="HKU",Ue="HKCC",Ie=[te,Oe,Ne,be,Ue],Me="REG_SZ",ke="REG_MULTI_SZ",De="REG_EXPAND_SZ",Fe="REG_DWORD",Le="REG_QWORD",$e="REG_BINARY",Ge="REG_NONE",Be=[Me,ke,De,Fe,Le,$e,Ge],Dt="",Ft=/(\\[a-zA-Z0-9_\s]+)*/,Lt=/^(HKEY_LOCAL_MACHINE|HKEY_CURRENT_USER|HKEY_CLASSES_ROOT|HKEY_USERS|HKEY_CURRENT_CONFIG)(.*)$/,We=/^(.*)\s(REG_SZ|REG_MULTI_SZ|REG_EXPAND_SZ|REG_DWORD|REG_QWORD|REG_BINARY|REG_NONE)\s+([^\s].*)$/;function L(t,e){if(!(this instanceof L))return new L(t,e);Error.captureStackTrace(this,L),this.__defineGetter__("name",function(){return L.name}),this.__defineGetter__("message",function(){return t}),this.__defineGetter__("code",function(){return e})}ee.inherits(L,Error);function U(t){var e={stdout:"",stderr:""};return t.stdout.on("data",function(o){e.stdout+=o.toString()}),t.stderr.on("data",function(o){e.stderr+=o.toString()}),e}function I(t,e,o){var n=o.stdout.trim(),r=o.stderr.trim(),s=ee.format(`%s command exited with code %d:
%s
%s`,t,e,n,r);return new L(s,e)}function $t(t){if(t=="x64")return"64";if(t=="x86")return"32";throw new Error("illegal architecture: "+t+" (use x86 or x64)")}function M(t,e){e&&t.push("/reg:"+$t(e))}function k(){return process.platform==="win32"?kt.join(process.env.windir,"system32","reg.exe"):"REG"}function G(t,e,o,n,r,s,i){if(!(this instanceof G))return new G(t,e,o,n,r,s,i);var a=t,p=e,u=o,d=n,f=r,h=s,c=i;this.__defineGetter__("host",function(){return a}),this.__defineGetter__("hive",function(){return p}),this.__defineGetter__("key",function(){return u}),this.__defineGetter__("name",function(){return d}),this.__defineGetter__("type",function(){return f}),this.__defineGetter__("value",function(){return h}),this.__defineGetter__("arch",function(){return c})}ee.inherits(G,Object);function m(t){if(!(this instanceof m))return new m(t);var e=t||{},o=""+(e.host||""),n=""+(e.hive||te),r=""+(e.key||""),s=e.arch||null;if(this.__defineGetter__("host",function(){return o}),this.__defineGetter__("hive",function(){return n}),this.__defineGetter__("key",function(){return r}),this.__defineGetter__("path",function(){return(o.length==0?"":"\\\\"+o+"\\")+n+r}),this.__defineGetter__("arch",function(){return s}),this.__defineGetter__("parent",function(){var i=r.lastIndexOf("\\");return new m({host:this.host,hive:this.hive,key:i==-1?"":r.substring(0,i),arch:this.arch})}),Ie.indexOf(n)==-1)throw new Error("illegal hive specified.");if(!Ft.test(r))throw new Error("illegal key specified.");if(s&&s!="x64"&&s!="x86")throw new Error("illegal architecture specified (use x86 or x64)")}m.HKLM=te;m.HKCU=Oe;m.HKCR=Ne;m.HKU=be;m.HKCC=Ue;m.HIVES=Ie;m.REG_SZ=Me;m.REG_MULTI_SZ=ke;m.REG_EXPAND_SZ=De;m.REG_DWORD=Fe;m.REG_QWORD=Le;m.REG_BINARY=$e;m.REG_NONE=Ge;m.REG_TYPES=Be;m.DEFAULT_VALUE=Dt;m.prototype.values=function(e){if(typeof e!="function")throw new TypeError("must specify a callback");var o=["QUERY",this.path];M(o,this.arch);var n=b(k(),o,{cwd:void 0,env:process.env,stdio:["ignore","pipe","pipe"]}),r="",s=this,i=null,a=U(n);return n.on("close",function(p){if(!i)if(p!==0)E("process exited with code "+p),e(I("QUERY",p,a),null);else{for(var u=[],d=[],f=r.split(`
`),h=0,c=0,g=f.length;c<g;c++){var l=f[c].trim();l.length>0&&(E(l),h!=0&&u.push(l),++h)}for(var c=0,g=u.length;c<g;c++){var _=We.exec(u[c]),R,x,v;_&&(R=_[1].trim(),x=_[2].trim(),v=_[3],d.push(new G(s.host,s.hive,s.key,R,x,v,s.arch)))}e(null,d)}}),n.stdout.on("data",function(p){r+=p.toString()}),n.on("error",function(p){i=p,e(p)}),this};m.prototype.keys=function(e){if(typeof e!="function")throw new TypeError("must specify a callback");var o=["QUERY",this.path];M(o,this.arch);var n=b(k(),o,{cwd:void 0,env:process.env,stdio:["ignore","pipe","pipe"]}),r="",s=this,i=null,a=U(n);return n.on("close",function(p){i||p!==0&&(E("process exited with code "+p),e(I("QUERY",p,a),null))}),n.stdout.on("data",function(p){r+=p.toString()}),n.stdout.on("end",function(){for(var p=[],u=[],d=r.split(`
`),f=0,h=d.length;f<h;f++){var c=d[f].trim();c.length>0&&(E(c),p.push(c))}for(var f=0,h=p.length;f<h;f++){var g=Lt.exec(p[f]),l,_;g&&(l=g[1],_=g[2],_&&_!==s.key&&u.push(new m({host:s.host,hive:s.hive,key:_,arch:s.arch})))}e(null,u)}),n.on("error",function(p){i=p,e(p)}),this};m.prototype.get=function(e,o){if(typeof o!="function")throw new TypeError("must specify a callback");var n=["QUERY",this.path];e==""?n.push("/ve"):n=n.concat(["/v",e]),M(n,this.arch);var r=b(k(),n,{cwd:void 0,env:process.env,stdio:["ignore","pipe","pipe"]}),s="",i=this,a=null,p=U(r);return r.on("close",function(u){if(!a)if(u!==0)E("process exited with code "+u),o(I("QUERY",u,p),null);else{for(var d=[],f=null,h=s.split(`
`),c=0,g=0,l=h.length;g<l;g++){var _=h[g].trim();_.length>0&&(E(_),c!=0&&d.push(_),++c)}var R=d[d.length-1]||"",x=We.exec(R),v,y,C;x&&(v=x[1].trim(),y=x[2].trim(),C=x[3],f=new G(i.host,i.hive,i.key,v,y,C,i.arch)),o(null,f)}}),r.stdout.on("data",function(u){s+=u.toString()}),r.on("error",function(u){a=u,o(u)}),this};m.prototype.set=function(e,o,n,r){if(typeof r!="function")throw new TypeError("must specify a callback");if(Be.indexOf(o)==-1)throw Error("illegal type specified.");var s=["ADD",this.path];e==""?s.push("/ve"):s=s.concat(["/v",e]),s=s.concat(["/t",o,"/d",n,"/f"]),M(s,this.arch);var i=b(k(),s,{cwd:void 0,env:process.env,stdio:["ignore","pipe","pipe"]}),a=null,p=U(i);return i.on("close",function(u){a||(u!==0?(E("process exited with code "+u),r(I("ADD",u,p,null))):r(null))}),i.stdout.on("data",function(u){E(""+u)}),i.on("error",function(u){a=u,r(u)}),this};m.prototype.remove=function(e,o){if(typeof o!="function")throw new TypeError("must specify a callback");var n=e?["DELETE",this.path,"/f","/v",e]:["DELETE",this.path,"/f","/ve"];M(n,this.arch);var r=b(k(),n,{cwd:void 0,env:process.env,stdio:["ignore","pipe","pipe"]}),s=null,i=U(r);return r.on("close",function(a){s||(a!==0?(E("process exited with code "+a),o(I("DELETE",a,i),null)):o(null))}),r.stdout.on("data",function(a){E(""+a)}),r.on("error",function(a){s=a,o(a)}),this};m.prototype.clear=function(e){if(typeof e!="function")throw new TypeError("must specify a callback");var o=["DELETE",this.path,"/f","/va"];M(o,this.arch);var n=b(k(),o,{cwd:void 0,env:process.env,stdio:["ignore","pipe","pipe"]}),r=null,s=U(n);return n.on("close",function(i){r||(i!==0?(E("process exited with code "+i),e(I("DELETE",i,s),null)):e(null))}),n.stdout.on("data",function(i){E(""+i)}),n.on("error",function(i){r=i,e(i)}),this};m.prototype.erase=m.prototype.clear;m.prototype.destroy=function(e){if(typeof e!="function")throw new TypeError("must specify a callback");var o=["DELETE",this.path,"/f"];M(o,this.arch);var n=b(k(),o,{cwd:void 0,env:process.env,stdio:["ignore","pipe","pipe"]}),r=null,s=U(n);return n.on("close",function(i){r||(i!==0?(E("process exited with code "+i),e(I("DELETE",i,s),null)):e(null))}),n.stdout.on("data",function(i){E(""+i)}),n.on("error",function(i){r=i,e(i)}),this};m.prototype.create=function(e){if(typeof e!="function")throw new TypeError("must specify a callback");var o=["ADD",this.path,"/f"];M(o,this.arch);var n=b(k(),o,{cwd:void 0,env:process.env,stdio:["ignore","pipe","pipe"]}),r=null,s=U(n);return n.on("close",function(i){r||(i!==0?(E("process exited with code "+i),e(I("ADD",i,s),null)):e(null))}),n.stdout.on("data",function(i){E(""+i)}),n.on("error",function(i){r=i,e(i)}),this};m.prototype.keyExists=function(e){return this.values(function(o,n){if(o)return o.code==1?e(null,!1):e(o);e(null,!0)}),this};m.prototype.valueExists=function(e,o){return this.get(e,function(n,r){if(n)return n.code==1?o(null,!1):o(n);o(null,!0)}),this};He.exports=m});var qt={};St(qt,{activate:()=>Yt});module.exports=wt(qt);var se=S(require("vscode"));var O=require("vscode"),T=S(require("vscode"));var J="app.R",Tt=/^([\w|\s]+)([\.[\w|^\.]*]*)$/i;function X(t){if(t==="")return{valid:!0,name:J};let e=t.match(Tt);if(e===null)return{valid:!1,msg:`Invalid app name: ${t}.`};let[o,n,r]=e;return(r===""||r===".")&&(r=".R"),n?r!==".R"?{valid:!1,msg:`Invalid file extension: ${r}. Extension needs to be .R`}:(n=n.replaceAll(" ","-"),{valid:!0,name:`${n}${r}`}):{valid:!1,msg:`Invalid app name: ${t}. Make sure to only use numbers and letters. Spaces will be converted to dashes.`}}var ae=new TextEncoder().encode("");async function ue(){let t=await O.window.showOpenDialog({canSelectFolders:!0,canSelectFiles:!0,title:"Choose location for Shiny app",openLabel:"Choose app folder or file",canSelectMany:!1,filters:{"R scripts":["R","r"]}});if(!t)return;let e=t[0],n=(await T.workspace.fs.stat(e)).type===T.FileType.Directory?await xt(e):e;!n||T.commands.executeCommand("vscode.openWith",n,"shinyuieditor.appFile")}async function xt(t){let e=(await O.workspace.fs.readDirectory(t)).filter(([i,a])=>a===T.FileType.File).map(([i,a])=>i),o=await O.window.showInputBox({prompt:"Enter file name for new app",placeHolder:J,validateInput(i){let a=X(i);return a.valid?e.includes(a.name)?{message:`Run the editor on existing app: ${a.name}.`,severity:T.InputBoxValidationSeverity.Info}:{message:`Run the template chooser to build new app: ${a.name}.`,severity:T.InputBoxValidationSeverity.Info}:{message:a.msg,severity:T.InputBoxValidationSeverity.Error}}});if(!o)return;let n=X(o);if(!n.valid){T.window.showErrorMessage(`Error processing requested file name: ${o}. Try with a different name.`);return}let r=O.Uri.joinPath(t,n.name);return e.includes(n.name)||await O.workspace.fs.writeFile(r,ae),r}var pe=S(require("path")),ce=S(require("vscode")),H=require("vscode");function At(t){let e=t.ext;return/\.R/i.test(e)}function de(t="world"){let e=H.window.activeTextEditor;if(!e){H.window.showErrorMessage("No active file open to run ui editor on!");return}let o=pe.default.parse(e.document.fileName);if(!At(o)){H.window.showErrorMessage(`Can't run the ui editor on the currently active file ${o.base}, needs to be a .R file.`);return}ce.commands.executeCommand("vscode.openWith",e.document.uri,"shinyuieditor.appFile")}var P=S(require("vscode"));function Pt(t){return typeof t=="object"&&t!==null}function le(t){return Pt(t)?"path"in t:!1}var fe=Ct;function Ct(t,e,o){var n=null,r=null,s=function(){n&&(clearTimeout(n),r=null,n=null)},i=function(){var p=r;s(),p&&p()},a=function(){if(!e)return t.apply(this,arguments);var p=this,u=arguments,d=o&&!n;if(s(),r=function(){t.apply(p,u)},n=setTimeout(function(){if(n=null,!d){var f=r;return r=null,f()}},e),d)return r()};return a.cancel=s,a.flush=i,a}var at=S(require("vscode"));var D=S(require("vscode"));var me=S(require("vscode"));function j({start:t,end:e}){return new me.Selection(t-1,0,e,0)}async function V({text:t,document:e,uiBounds:o={start:0,end:0},type:n}){let r=e.uri,s=new D.WorkspaceEdit;if(n==="replace"){let i=j(o);s.replace(r,i,t)}n==="insert"&&s.insert(e.uri,new D.Position(0,0),t),await D.workspace.applyEdit(s),e.save()}var F=S(require("vscode"));async function ge(t){let e=t.uri,o=new F.WorkspaceEdit,n=t.validateRange(new F.Range(0,0,1/0,1/0));o.replace(e,n,""),await F.workspace.applyEdit(o),t.save()}var $=S(require("vscode"));async function z({appFile:t,existingEditor:e}){return e&&$.window.visibleTextEditors.includes(e)?e:await $.window.showTextDocument(t.uri,{viewColumn:$.ViewColumn.Beside,preview:!0})}function he(t,e){e.selection=j(t)}async function ve(t,e){let o=await t.runCmd(`print(require(${e}, quietly = TRUE))`,{verbose:!1});return o.status==="error"?{status:"error",msg:o.errorMsg}:o.values[0].includes("FALSE")?{status:"error",msg:Ot(e)}:{status:"success"}}function Ot(t){return`The ShinyUiEditor extension needs the \`${t}\` pkg installed. Install using \`remotes::install_github('rstudio/${t}')\` and restart the extension.`}function w(...t){return t.filter(o=>o!==void 0).reduce((o,n,r)=>(r===0?"":o+`
`)+n,"")}function N(t){return t.replace(/"/g,'\\"')}function _e(t){return t.replace(/^"(.*)"$/,"$1").replace(/^'(.*)'$/,"$1")}async function ye(t,e,o){let n=await t.runCmd(`styler::style_text("${N(e)}", scope = "tokens")`,o);if(n.status==="error")throw new Error(`Failed to format new app code...
`+n.errorMsg);return n.values.reduce((r,s)=>r+`
`+s,"")}async function K(t,e){let o=Nt(t);try{let n=await e.runCmd(o,{verbose:!1});if(n.status==="error")throw new Error(`Failed to generate new ui code from tree
${n.errorMsg}`);return JSON.parse(w(...n.values))}catch(n){throw n}}function Nt(t,e=!0){let o=N(JSON.stringify(t,null,2)),n=e?"TRUE":"FALSE";return w("ui_tree <- jsonlite::fromJSON(",`  txt = "${o}",`,"  simplifyVector = FALSE",")",`new_ui_code <- shinyuieditor:::ui_tree_to_code(ui_tree, remove_namespace = ${n})`,"new_ui_code$text <- as.character(new_ui_code$text)","jsonlite::toJSON(new_ui_code, auto_unbox = TRUE)")}async function Ee(t,{uiTree:e,otherCode:{uiExtra:o,serverFunctionBody:n,serverExtra:r,serverLibraries:s}}){let{text:i,namespaces_removed:a}=await K(e,t),u=[...new Set([...s!=null?s:[],...a])].map(g=>`library(${g})`),d=["server <- function(input, output) {",n,"}"],f="ui <- "+w(...i),h=w(...u,o,"",f,"",r,"",...d,"","shinyApp(ui, server)");return await ye(t,h)}async function Re(t,e){let o=bt(e),n=await t.runCmd(o,{verbose:!1,timeout_ms:5e3});if(n.status==="error")return n;try{let r=JSON.parse(n.values.reduce((s,i)=>s+`
`+i,""));return Object.keys(r).length===0?{status:"success",values:"EMPTY"}:{status:"success",values:r}}catch{return{status:"error",errorMsg:"Could not get document as json. Content is not valid json"}}}function bt(t){let e=N(t);return w(`app_lines <- strsplit("${e}", "\\n")[[1]]`,"jsonlite::toJSON(",'  shinyuieditor:::get_file_ui_definition_info(app_lines, "SINGLE-FILE"),',"  auto_unbox = TRUE",")")}var Te=S(require("fs")),Y=S(require("vscode"));var Se=require("child_process");async function we({cmd:t,args:e,verbose:o=!1,timeout_ms:n=1500}){let r=Ut(o,"runShellCommand: ");return new Promise(s=>{let i={stdout:[],stderr:[]},a=(0,Se.spawn)(t,e);function p(){r("Spawned")}function u(l){r("Error "+l.message),c(),s({status:"error",errorMsgs:l.message,...i})}function d(){r("Close"),c(),s({status:"success",...i})}function f(l){r(`stdout: ${l.toString()}`),i.stdout.push(l.toString())}function h(l){r(`stderr: ${l.toString()}`),i.stderr.push(l.toString())}function c(){clearTimeout(g),a.off("spawn",p),a.off("error",u),a.off("close",d),a.stdout.off("data",f),a.stderr.off("data",h)}let g=setTimeout(()=>{s({status:"error",errorMsgs:`Command, no response from run command within ${n}ms:
${t} ${e==null?void 0:e.join(" ")}`,...i}),c()},n);a.on("spawn",p),a.on("error",u),a.on("close",d),a.stdout.on("data",f),a.stderr.on("data",h)})}function Ut(t,e){return o=>{t&&console.log(e+o)}}async function xe(t){if(It())return await Mt(t);let e=Y.Uri.parse(`http://localhost:${t}`);return(await Y.env.asExternalUri(e)).toString()}var Ae="/usr/lib/rstudio-server/bin/rserver-url";function It(){return"RS_SERVER_URL"in process.env?Te.existsSync(Ae):!1}async function Mt(t){let e=await we({cmd:Ae,args:[String(t)]});e.status==="error"&&Error(`Failed to get Posit workbench forwarded port. Error msg:
`+e.errorMsgs);let o=process.env.RS_SERVER_URL,n=process.env.RS_SESSION_URL;if(!o||!n)throw new Error("Can't find URL for workbench.");let r=e.stdout[0];return`${o}${n.slice(1)}p/${r}/`}var Pe=S(require("net"));async function Ce(){return new Promise(t=>{let e=Pe.default.createServer();e.listen(0,()=>{var n;let o=(n=e.address)==null?void 0:n.call(e);if(typeof o=="string"||o===null)throw new Error("Failed to find a free port...");e.close(r=>t(o.port))})})}var Ze=require("child_process");var qe=require("fs");var Ke=require("fs"),oe=S(require("path")),Ve=je();async function Ye(){let t=process.platform,e=Gt(t);if(!e&&t==="win32")try{let o=new Ve({hive:Ve.HKLM,key:"\\Software\\R-Core\\R"}),n=await new Promise((r,s)=>o.get("InstallPath",(i,a)=>i===null?r(a):s(i)));e=oe.default.join(n.value,"bin","R.exe")}catch{e=""}return e}function Gt(t){let e=":",o="";t==="win32"&&(e=";",o=".exe");let n=process.env.PATH?process.env.PATH.split(e):[];for(let r of n){let s=oe.default.join(r,"R"+o);if((0,Ke.existsSync)(s))return s}return""}async function Qe(){let t=await Ye();if(!t){let e="Cannot find R for running shinyuieditor. Make sure R is installed and/or updating the shinyuieditor extension settings option to proper to R path.";throw new Error(e)}if(!(0,qe.existsSync)(t)){let e=`Path to R is invalid: ${t}. Make sure R is installed and/or updating the shinyuieditor extension settings option to proper to R path.`;throw new Error(e)}return _e(t)}async function q(t,e={}){let o=await Qe();if(o===void 0)throw new Error("Can't get R path");let n="";return new Promise(r=>{var x;let s=new AbortController,{signal:i}=s,a=(0,Ze.spawn)(o,t,{signal:i});a.on("spawn",d),a.on("error",f),a.on("close",h),a.stdout.on("data",c),a.stderr.on("data",g);function p(v,y){n+=`${v}: ${y}`}function u(v){!e.verbose||console.log(`%c[RProc ${a.pid}] %c${v.replaceAll(/\n$/g,"").replaceAll(/\n/g,`
\u2219\u2219\u2219 `)}`,"color: orangered;","color: grey; opacity: 0.5")}function d(){u("spawned"),clearTimeout(R),r({proc:a,stop:_,getIsRunning:()=>a.exitCode===null})}function f(v){var y;u(`Error: 
${v.toString()}`),clearTimeout(R),(y=e.onError)==null||y.call(e,v)}function h(){var v;u("Closed"),clearTimeout(R),(v=e.onClose)==null||v.call(e)}function c(v){var C;let y=v.toString();u(`stdout: 
${y}`),p("out",y),(C=e.onStdout)==null||C.call(e,y)}function g(v){var C;let y=v.toString();u(`stderr: ${y}`),p("error",y),(C=e.onStderr)==null||C.call(e,y)}function l(){a.off("spawn",d),a.off("error",f),a.off("close",h),a.stdout.off("data",c),a.stderr.off("data",g)}function _(){return l(),!a.pid||!a.connected?!0:(u(`Killing R process ${a.pid}`),process.kill(a.pid))}let R=setTimeout(()=>{throw _(),new Error(`Starting backend server failed.
 Logs:
`+n)},(x=e.timeout_ms)!=null?x:5e3)})}function Je({pathToApp:t,onCrash:e,onInitiation:o,onReady:n,onFailToStart:r,onLogs:s}){let i="0.0.0.0",a=null;async function p(){o(),u();try{let d=await Ce(),f=await xe(d),h=new RegExp(`listening on .+${d}`,"i"),c=w("options(shiny.autoreload = TRUE)",`shiny::runApp(appDir = "${t}", port = ${d}, host = "${i}")`);return a=await q(["--no-save","--no-restore","--silent","-e",c],{onStderr(g){h.test(g)&&n(f.toString()),s(g.split(`
`))},onClose:e,onError:e}),!0}catch{return r(),!1}}function u(){return a===null?!0:a.stop()}return{start:p,stop:u}}function ne(t){return typeof t=="object"&&t!==null}function Xe(t){return ne(t)&&"val"in t&&["string","boolean","number"].includes(typeof t.val)}function Q(t){return ne(t)&&"val"in t&&Array.isArray(t.val)}function Bt(t,e){if(!Q(t))return!1;let{val:o}=t;return o[0].val==="<-"||o[0].val==="="?e?o[1].val===e:!0:!1}function Wt(t){return t.val[1]}function re(t){let e=[];return t.forEach(o=>{if(Bt(o)){let n=Wt(o);Xe(n)?e.push({name:String(n.val),is_output:!1,node:o}):Ht(n)&&e.push({name:n.val[2].val,is_output:!0,node:o})}if(Q(o)){let n=re(o.val);e.push(...n)}}),e}function Ht(t){if(!Q(t))return!1;let{val:e}=t;return e.length===3&&e[1].val==="output"&&typeof e[2].val=="string"}function ze(t){return t.filter(({is_output:e})=>e).reduce((e,{name:o,node:n})=>{var s;let{pos:r}=n;return r&&(e[o]=[...(s=e[o])!=null?s:[],r]),e},{})}var A=S(require("vscode"));async function et(t,e){let o=N(e),n=w(`app_lines <- strsplit("${o}", "\\n")[[1]]`,"parsed <- parse(text = app_lines, keep.source = TRUE)","jsonlite::toJSON(","  shinyuieditor:::serialize_ast(parsed),","  auto_unbox = TRUE",")"),r=await t.runCmd(n,{verbose:!1,timeout_ms:5e3});if(r.status==="error")return r;try{let s=JSON.parse(r.values.reduce((i,a)=>i+`
`+a,""));return Object.keys(s).length===0?{status:"success",values:"EMPTY"}:{status:"success",values:s}}catch{return{status:"error",errorMsg:"Could not get document as json. Content is not valid json"}}}async function tt({editor:t,output:{outputId:e},RProcess:o}){let n=t.document.getText(),r=await et(o,n),s=`output$${e}`,i=r.status==="success"&&r.values!=="EMPTY"?jt(r.values,e):rt(n,s);if(!i){A.window.showErrorMessage(`Failed to find any current use of ${s} in server`);return}nt(t,i),t.selection=i[0],t.revealRange(i[0])}async function ot({editor:t,input:{inputId:e}}){let o=`input$${e}`,n=rt(t.document.getText(),o);if(!n){A.window.showErrorMessage(`Failed to find any current use of ${o} in server`);return}nt(t,n)}function nt(t,e){t.selection=e[0],t.revealRange(e[0])}function jt(t,e){let o=re(t),r=ze(o)[e];return r?r.map(([s,i,a,p])=>{let u=new A.Position(s-1,i-1),d=new A.Position(a-1,p);return new A.Selection(u,d)}):null}function Vt(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function rt(t,e){let o=t.split(`
`),n=new RegExp(Vt(e)),r=o.map((s,i)=>({line:i,match:n.exec(s)})).filter(({match:s})=>s!==null);return r.length===0?null:r.map(({line:s,match:i})=>{var d;let a=(d=i==null?void 0:i.index)!=null?d:0,p=new A.Position(s,a),u=new A.Position(s,a+e.length);return new A.Selection(p,u)})}async function st({document:t,uiBounds:e,RProcess:o,uiTree:n}){if(!e)throw new Error("Attempting to update an app that has yet to be parsed.");let{start:r,end:s}=e,i=await K(n,o),a=`ui <- ${w(...i.text)}
`;await V({text:a,document:t,uiBounds:e,type:"replace"});let p=s-r+1,d=i.text.length-p;return{uiText:a,uiBounds:{start:r,end:s+d}}}var{showErrorMessage:it}=at.window;function ut({RProcess:t,document:e,sendMessage:o}){let n=!1,r=null,s,i,a=async()=>{let c=e.getText();if(!(r!==null&&c.includes(r))){if(!n){let l=await ve(t,"shinyuieditor");if(l.status==="error")throw o({path:"BACKEND-ERROR",payload:{context:"checking for shinyuieditor package",msg:l.msg}}),it(l.msg),new Error(l.msg);n=!0}try{let l=await Re(t,c);if(l.status==="error"){o({path:"BACKEND-ERROR",payload:{context:"parsing app",msg:l.errorMsg}}),it(l.errorMsg);return}if(l.values==="EMPTY")o({path:"TEMPLATE_CHOOSER",payload:"SINGLE-FILE"});else{let{ui_tree:_}=l.values;s=l.values.ui_bounds,o({path:"UPDATED-TREE",payload:_})}}catch(l){console.error("Failed to parse",l)}}},p=fe(a,500),u=()=>{p()},d=()=>{p.flush()},f=Je({pathToApp:e.fileName,onInitiation:()=>{o({path:"APP-PREVIEW-STATUS",payload:"LOADING"})},onReady:c=>{o({path:"APP-PREVIEW-STATUS",payload:{url:c}})},onFailToStart:()=>{o({path:"APP-PREVIEW-CRASH",payload:"Failed to start"})},onCrash:()=>{o({path:"APP-PREVIEW-CRASH",payload:"Crashed"})},onLogs:c=>{o({path:"APP-PREVIEW-LOGS",payload:c})}});return{onDocumentChanged:u,onDocumentSaved:d,onDidReceiveMessage:async c=>{if(le(c))switch(c.path){case"READY-FOR-STATE":a();return;case"TEMPLATE-SELECTION":{let g=await Ee(t,c.payload);await V({text:g,document:e,type:"insert",uiBounds:s});return}case"UPDATED-TREE":{let g=await st({document:e,uiBounds:s,RProcess:t,uiTree:c.payload});r=g.uiText,s=g.uiBounds;return}case"APP-PREVIEW-REQUEST":{f.start();return}case"APP-PREVIEW-STOP":{f.stop();return}case"APP-PREVIEW-RESTART":{f.start();return}case"ENTERED-TEMPLATE-SELECTOR":{f.stop(),await ge(e);return}case"OPEN-COMPANION-EDITOR":{i=await z({appFile:e,existingEditor:i}),s&&he(s,i);return}case"GO-TO-SERVER":{i=await z({appFile:e,existingEditor:i}),c.payload.type==="Output"?tt({editor:i,output:c.payload,RProcess:t}):ot({editor:i,input:c.payload});return}case"NODE-SELECTION":{console.log("New node selection",c.payload);return}default:console.warn("Unhandled message from client",c)}else console.log("Unknown message from webview",c)}}}function pt(t){let e=t.getText();return e.trim()===""?"empty":Kt.test(e)?"valid":"invalid"}var Kt=/shinyApp\(/;var ct="SUE_START_SIGNAL",dt="SUE_END_SIGNAL";async function lt(t,e,{timeout_ms:o=1e3,verbose:n=!1}={}){let r=p=>{n&&console.log(`runRCommand: ${p}`)},s="",i=!1,a=[];return t.exitCode!==null?{status:"error",errorMsg:`Can't run R command as background R process has exited with code ${t.exitCode}.`}:new Promise(p=>{function u(g){let _=g.toString().split(`
`);r("~~~Output chunk~~~");for(let R of _){let x=R.includes(ct),v=R.includes(dt),y=R.length===0;if(x){i=!0;continue}if(v){clearTimeout(h),p({status:"success",values:a}),r("Output finished"),c();break}!i||y||(r(R),s+=R+`
`,a.push(R))}}function d(g){let l=g.toString();s+=`stderr: ${l}
`,r("stderr: "+l)}function f(){p({status:"error",errorMsg:s}),c()}t.stdout.on("data",u),t.stderr.on("data",d),t.on("close",f);let h=setTimeout(()=>{p({status:"error",errorMsg:`Timeout, no response from run command within ${o}ms: ${e}
 Logs:
 ${s}`}),c()},o);function c(){t.stdout.off("data",u),t.stderr.off("data",d),t.off("close",f)}ft(`print('${ct}');${e};print('${dt}')`,t)})}async function mt(){async function t(){return await q(["--silent","--slave","--no-save","--no-restore"],{timeout_ms:5e3})}let e=await t();return{...e,async runCmd(o,n){return e.getIsRunning()||(console.warn("Background R Process has crashed. Restarting..."),e.stop(),e=await t(),console.warn("Background R Process restarted")),lt(e.proc,o,n)}}}function ft(t,e){e.stdin.write(`${t}
`)}function gt(){let t="",e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";for(let o=0;o<32;o++)t+=e.charAt(Math.floor(Math.random()*e.length));return t}var Z=class{constructor(e){this.context=e;this.RProcess=null;mt().then(o=>{this.RProcess=o})}static register(e){let o=new Z(e);return P.window.registerCustomEditorProvider(Z.viewType,o,{webviewOptions:{retainContextWhenHidden:!0}})}async resolveCustomTextEditor(e,o,n){if(pt(e)==="invalid"){let u="The active file doesn't appear to be a Shiny app. Make sure that the script is either empty or has a valid shiny app in it.";throw P.window.showErrorMessage(u),o.dispose(),new Error(u)}if(o.webview.options={enableScripts:!0},o.webview.html=this.getHtmlForWebview(o.webview),!this.RProcess)throw new Error("Don't have an R Process to pass to editor backend!");let s=ut({RProcess:this.RProcess,document:e,sendMessage:u=>o.webview.postMessage(u)}),i=P.workspace.onDidChangeTextDocument(u=>{u.document.uri.toString()===e.uri.toString()&&s.onDocumentChanged()}),a=P.workspace.onDidSaveTextDocument(u=>{u.uri.toString()===e.uri.toString()&&s.onDocumentSaved()}),p=o.webview.onDidReceiveMessage(s.onDidReceiveMessage);o.onDidDispose(()=>{i.dispose(),a.dispose(),p.dispose()})}getHtmlForWebview(e){let o=e.asWebviewUri(P.Uri.joinPath(this.context.extensionUri,"media","build","bundle.js")),n=e.asWebviewUri(P.Uri.joinPath(this.context.extensionUri,"media","build","bundle.css")),r=gt(),s=e.cspSource;return`
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
          content="default-src 'none'; frame-src http://localhost:*/ ${s} https:; img-src ${s} data:; style-src ${e.cspSource} 'unsafe-inline'; script-src 'nonce-${r}';">

				<meta name="viewport" content="width=device-width, initial-scale=1.0">

				
				<link href="${n}" rel="stylesheet" />
				
				<title>Shiny UI Editor</title>
			</head>
			<body style="padding-inline: 0;">
				<noscript>You need to enable JavaScript to run this app.</noscript>
				<div id="root" style="height: 100vh; display: relative"></div>
				<script nonce="${r}" src="${o}"><\/script>
			</body>
			</html>`}},B=Z;B.viewType="shinyuieditor.appFile";function Yt(t){t.subscriptions.push(B.register(t)),t.subscriptions.push(se.commands.registerCommand("shinyuieditor.startEditorOnActiveFile",de),se.commands.registerCommand("shinyuieditor.launchEditor",ue))}0&&(module.exports={activate});
