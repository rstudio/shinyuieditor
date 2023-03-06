"use strict";var dt=Object.create;var $=Object.defineProperty;var ft=Object.getOwnPropertyDescriptor;var mt=Object.getOwnPropertyNames;var _t=Object.getPrototypeOf,gt=Object.prototype.hasOwnProperty;var vt=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports),ht=(t,e)=>{for(var o in e)$(t,o,{get:e[o],enumerable:!0})},ne=(t,e,o,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of mt(e))!gt.call(t,r)&&r!==o&&$(t,r,{get:()=>e[r],enumerable:!(n=ft(e,r))||n.enumerable});return t};var w=(t,e,o)=>(o=t!=null?dt(_t(t)):{},ne(e||!t||!t.__esModule?$(o,"default",{value:t,enumerable:!0}):o,t)),Et=t=>ne($({},"__esModule",{value:!0}),t);var Ve=vt((vo,He)=>{var X=require("util"),Ot=require("path"),P=require("child_process").spawn,R=function(){},z="HKLM",Ce="HKCU",Ie="HKCR",be="HKU",Oe="HKCC",ke=[z,Ce,Ie,be,Oe],De="REG_SZ",Le="REG_MULTI_SZ",Ue="REG_EXPAND_SZ",Me="REG_DWORD",Ge="REG_QWORD",Fe="REG_BINARY",$e="REG_NONE",We=[De,Le,Ue,Me,Ge,Fe,$e],kt="",Dt=/(\\[a-zA-Z0-9_\s]+)*/,Lt=/^(HKEY_LOCAL_MACHINE|HKEY_CURRENT_USER|HKEY_CLASSES_ROOT|HKEY_USERS|HKEY_CURRENT_CONFIG)(.*)$/,Be=/^(.*)\s(REG_SZ|REG_MULTI_SZ|REG_EXPAND_SZ|REG_DWORD|REG_QWORD|REG_BINARY|REG_NONE)\s+([^\s].*)$/;function k(t,e){if(!(this instanceof k))return new k(t,e);Error.captureStackTrace(this,k),this.__defineGetter__("name",function(){return k.name}),this.__defineGetter__("message",function(){return t}),this.__defineGetter__("code",function(){return e})}X.inherits(k,Error);function N(t){var e={stdout:"",stderr:""};return t.stdout.on("data",function(o){e.stdout+=o.toString()}),t.stderr.on("data",function(o){e.stderr+=o.toString()}),e}function C(t,e,o){var n=o.stdout.trim(),r=o.stderr.trim(),s=X.format(`%s command exited with code %d:
%s
%s`,t,e,n,r);return new k(s,e)}function Ut(t){if(t=="x64")return"64";if(t=="x86")return"32";throw new Error("illegal architecture: "+t+" (use x86 or x64)")}function I(t,e){e&&t.push("/reg:"+Ut(e))}function b(){return process.platform==="win32"?Ot.join(process.env.windir,"system32","reg.exe"):"REG"}function M(t,e,o,n,r,s,i){if(!(this instanceof M))return new M(t,e,o,n,r,s,i);var a=t,c=e,u=o,d=n,l=r,g=s,m=i;this.__defineGetter__("host",function(){return a}),this.__defineGetter__("hive",function(){return c}),this.__defineGetter__("key",function(){return u}),this.__defineGetter__("name",function(){return d}),this.__defineGetter__("type",function(){return l}),this.__defineGetter__("value",function(){return g}),this.__defineGetter__("arch",function(){return m})}X.inherits(M,Object);function _(t){if(!(this instanceof _))return new _(t);var e=t||{},o=""+(e.host||""),n=""+(e.hive||z),r=""+(e.key||""),s=e.arch||null;if(this.__defineGetter__("host",function(){return o}),this.__defineGetter__("hive",function(){return n}),this.__defineGetter__("key",function(){return r}),this.__defineGetter__("path",function(){return(o.length==0?"":"\\\\"+o+"\\")+n+r}),this.__defineGetter__("arch",function(){return s}),this.__defineGetter__("parent",function(){var i=r.lastIndexOf("\\");return new _({host:this.host,hive:this.hive,key:i==-1?"":r.substring(0,i),arch:this.arch})}),ke.indexOf(n)==-1)throw new Error("illegal hive specified.");if(!Dt.test(r))throw new Error("illegal key specified.");if(s&&s!="x64"&&s!="x86")throw new Error("illegal architecture specified (use x86 or x64)")}_.HKLM=z;_.HKCU=Ce;_.HKCR=Ie;_.HKU=be;_.HKCC=Oe;_.HIVES=ke;_.REG_SZ=De;_.REG_MULTI_SZ=Le;_.REG_EXPAND_SZ=Ue;_.REG_DWORD=Me;_.REG_QWORD=Ge;_.REG_BINARY=Fe;_.REG_NONE=$e;_.REG_TYPES=We;_.DEFAULT_VALUE=kt;_.prototype.values=function(e){if(typeof e!="function")throw new TypeError("must specify a callback");var o=["QUERY",this.path];I(o,this.arch);var n=P(b(),o,{cwd:void 0,env:process.env,stdio:["ignore","pipe","pipe"]}),r="",s=this,i=null,a=N(n);return n.on("close",function(c){if(!i)if(c!==0)R("process exited with code "+c),e(C("QUERY",c,a),null);else{for(var u=[],d=[],l=r.split(`
`),g=0,m=0,p=l.length;m<p;m++){var v=l[m].trim();v.length>0&&(R(v),g!=0&&u.push(v),++g)}for(var m=0,p=u.length;m<p;m++){var f=Be.exec(u[m]),S,h,E;f&&(S=f[1].trim(),h=f[2].trim(),E=f[3],d.push(new M(s.host,s.hive,s.key,S,h,E,s.arch)))}e(null,d)}}),n.stdout.on("data",function(c){r+=c.toString()}),n.on("error",function(c){i=c,e(c)}),this};_.prototype.keys=function(e){if(typeof e!="function")throw new TypeError("must specify a callback");var o=["QUERY",this.path];I(o,this.arch);var n=P(b(),o,{cwd:void 0,env:process.env,stdio:["ignore","pipe","pipe"]}),r="",s=this,i=null,a=N(n);return n.on("close",function(c){i||c!==0&&(R("process exited with code "+c),e(C("QUERY",c,a),null))}),n.stdout.on("data",function(c){r+=c.toString()}),n.stdout.on("end",function(){for(var c=[],u=[],d=r.split(`
`),l=0,g=d.length;l<g;l++){var m=d[l].trim();m.length>0&&(R(m),c.push(m))}for(var l=0,g=c.length;l<g;l++){var p=Lt.exec(c[l]),v,f;p&&(v=p[1],f=p[2],f&&f!==s.key&&u.push(new _({host:s.host,hive:s.hive,key:f,arch:s.arch})))}e(null,u)}),n.on("error",function(c){i=c,e(c)}),this};_.prototype.get=function(e,o){if(typeof o!="function")throw new TypeError("must specify a callback");var n=["QUERY",this.path];e==""?n.push("/ve"):n=n.concat(["/v",e]),I(n,this.arch);var r=P(b(),n,{cwd:void 0,env:process.env,stdio:["ignore","pipe","pipe"]}),s="",i=this,a=null,c=N(r);return r.on("close",function(u){if(!a)if(u!==0)R("process exited with code "+u),o(C("QUERY",u,c),null);else{for(var d=[],l=null,g=s.split(`
`),m=0,p=0,v=g.length;p<v;p++){var f=g[p].trim();f.length>0&&(R(f),m!=0&&d.push(f),++m)}var S=d[d.length-1]||"",h=Be.exec(S),E,F,oe;h&&(E=h[1].trim(),F=h[2].trim(),oe=h[3],l=new M(i.host,i.hive,i.key,E,F,oe,i.arch)),o(null,l)}}),r.stdout.on("data",function(u){s+=u.toString()}),r.on("error",function(u){a=u,o(u)}),this};_.prototype.set=function(e,o,n,r){if(typeof r!="function")throw new TypeError("must specify a callback");if(We.indexOf(o)==-1)throw Error("illegal type specified.");var s=["ADD",this.path];e==""?s.push("/ve"):s=s.concat(["/v",e]),s=s.concat(["/t",o,"/d",n,"/f"]),I(s,this.arch);var i=P(b(),s,{cwd:void 0,env:process.env,stdio:["ignore","pipe","pipe"]}),a=null,c=N(i);return i.on("close",function(u){a||(u!==0?(R("process exited with code "+u),r(C("ADD",u,c,null))):r(null))}),i.stdout.on("data",function(u){R(""+u)}),i.on("error",function(u){a=u,r(u)}),this};_.prototype.remove=function(e,o){if(typeof o!="function")throw new TypeError("must specify a callback");var n=e?["DELETE",this.path,"/f","/v",e]:["DELETE",this.path,"/f","/ve"];I(n,this.arch);var r=P(b(),n,{cwd:void 0,env:process.env,stdio:["ignore","pipe","pipe"]}),s=null,i=N(r);return r.on("close",function(a){s||(a!==0?(R("process exited with code "+a),o(C("DELETE",a,i),null)):o(null))}),r.stdout.on("data",function(a){R(""+a)}),r.on("error",function(a){s=a,o(a)}),this};_.prototype.clear=function(e){if(typeof e!="function")throw new TypeError("must specify a callback");var o=["DELETE",this.path,"/f","/va"];I(o,this.arch);var n=P(b(),o,{cwd:void 0,env:process.env,stdio:["ignore","pipe","pipe"]}),r=null,s=N(n);return n.on("close",function(i){r||(i!==0?(R("process exited with code "+i),e(C("DELETE",i,s),null)):e(null))}),n.stdout.on("data",function(i){R(""+i)}),n.on("error",function(i){r=i,e(i)}),this};_.prototype.erase=_.prototype.clear;_.prototype.destroy=function(e){if(typeof e!="function")throw new TypeError("must specify a callback");var o=["DELETE",this.path,"/f"];I(o,this.arch);var n=P(b(),o,{cwd:void 0,env:process.env,stdio:["ignore","pipe","pipe"]}),r=null,s=N(n);return n.on("close",function(i){r||(i!==0?(R("process exited with code "+i),e(C("DELETE",i,s),null)):e(null))}),n.stdout.on("data",function(i){R(""+i)}),n.on("error",function(i){r=i,e(i)}),this};_.prototype.create=function(e){if(typeof e!="function")throw new TypeError("must specify a callback");var o=["ADD",this.path,"/f"];I(o,this.arch);var n=P(b(),o,{cwd:void 0,env:process.env,stdio:["ignore","pipe","pipe"]}),r=null,s=N(n);return n.on("close",function(i){r||(i!==0?(R("process exited with code "+i),e(C("ADD",i,s),null)):e(null))}),n.stdout.on("data",function(i){R(""+i)}),n.on("error",function(i){r=i,e(i)}),this};_.prototype.keyExists=function(e){return this.values(function(o,n){if(o)return o.code==1?e(null,!1):e(o);e(null,!0)}),this};_.prototype.valueExists=function(e,o){return this.get(e,function(n,r){if(n)return n.code==1?o(null,!1):o(n);o(null,!0)}),this};He.exports=_});var Wt={};ht(Wt,{activate:()=>$t});module.exports=Et(Wt);var te=w(require("vscode"));var A=require("vscode"),x=w(require("vscode"));var j="app.R",yt=/^([\w|\s]+)([\.[\w|^\.]*]*)$/i;function Q(t){if(t==="")return{valid:!0,name:j};let e=t.match(yt);if(e===null)return{valid:!1,msg:`Invalid app name: ${t}.`};let[o,n,r]=e;return(r===""||r===".")&&(r=".R"),n?r!==".R"?{valid:!1,msg:`Invalid file extension: ${r}. Extension needs to be .R`}:(n=n.replaceAll(" ","-"),{valid:!0,name:`${n}${r}`}):{valid:!1,msg:`Invalid app name: ${t}. Make sure to only use numbers and letters. Spaces will be converted to dashes.`}}var re=new TextEncoder().encode("");async function se(){let t=await A.window.showOpenDialog({canSelectFolders:!0,canSelectFiles:!0,title:"Choose location for Shiny app",openLabel:"Choose app folder or file",canSelectMany:!1,filters:{"R scripts":["R","r"]}});if(!t)return;let e=t[0],n=(await x.workspace.fs.stat(e)).type===x.FileType.Directory?await Rt(e):e;n&&x.commands.executeCommand("vscode.openWith",n,"shinyuieditor.appFile")}async function Rt(t){let e=(await A.workspace.fs.readDirectory(t)).filter(([i,a])=>a===x.FileType.File).map(([i,a])=>i),o=await A.window.showInputBox({prompt:"Enter file name for new app",placeHolder:j,validateInput(i){let a=Q(i);return a.valid?e.includes(a.name)?{message:`Run the editor on existing app: ${a.name}.`,severity:x.InputBoxValidationSeverity.Info}:{message:`Run the template chooser to build new app: ${a.name}.`,severity:x.InputBoxValidationSeverity.Info}:{message:a.msg,severity:x.InputBoxValidationSeverity.Error}}});if(!o)return;let n=Q(o);if(!n.valid){x.window.showErrorMessage(`Error processing requested file name: ${o}. Try with a different name.`);return}let r=A.Uri.joinPath(t,n.name);return e.includes(n.name)||await A.workspace.fs.writeFile(r,re),r}var ie=w(require("path")),ae=w(require("vscode")),W=require("vscode");function St(t){let e=t.ext;return/\.R/i.test(e)}function ue(t="world"){let e=W.window.activeTextEditor;if(!e){W.window.showErrorMessage("No active file open to run ui editor on!");return}let o=ie.default.parse(e.document.fileName);if(!St(o)){W.window.showErrorMessage(`Can't run the ui editor on the currently active file ${o.base}, needs to be a .R file.`);return}ae.commands.executeCommand("vscode.openWith",e.document.uri,"shinyuieditor.appFile")}var T=w(require("vscode"));function ce(t){return typeof t=="object"&&t!==null}function pe(t){return ce(t)?"path"in t:!1}var le=wt;function wt(t,e,o){var n=null,r=null,s=function(){n&&(clearTimeout(n),r=null,n=null)},i=function(){var c=r;s(),c&&c()},a=function(){if(!e)return t.apply(this,arguments);var c=this,u=arguments,d=o&&!n;if(s(),r=function(){t.apply(c,u)},n=setTimeout(function(){if(n=null,!d){var l=r;return r=null,l()}},e),d)return r()};return a.cancel=s,a.flush=i,a}function de(t){return typeof t=="object"&&t!==null}function B(t){return de(t)&&"val"in t&&Array.isArray(t.val)}var L=class extends Error{constructor({message:o,cause:n}){super();this.name="AST_PARSING_ERROR",this.message=o,this.cause=n}};function xt(t,e){if(!B(t))return!1;let{val:o}=t;return o[0].val==="<-"||o[0].val==="="?e?o[1].val===e:!0:!1}function Tt(t){return t.val[1]}function Z(t){let e=[];return t.forEach(o=>{if(xt(o)){let n=Tt(o);At(n)?e.push({name:n.val[2].val,is_output:!0,node:o}):n.type==="s"&&e.push({name:n.val,is_output:!1,node:o})}if(B(o)){let n=Z(o.val);e.push(...n)}}),e}function At(t){if(!B(t))return!1;let{val:e}=t;return e.length===3&&e[1].val==="output"&&typeof e[2].val=="string"}function fe(t){return t.filter(({is_output:e})=>e).reduce((e,{name:o,node:n})=>{let{pos:r}=n;return r&&(e[o]=[...e[o]??[],r]),e},{})}function me(t){let e=t.find(({name:n,is_output:r})=>n==="server"&&!r);if(!e)throw new L({message:"No server assignment node was found in provided ast"});let{node:o}=e;if(!o.pos)throw new L({message:"No position info attached to the ui assignment node",cause:o});return o}function _e(t){let e=Z(t),o=me(e).pos,n=fe(e);return{app_type:"SINGLE-FILE",server_pos:o,get_output_position:s=>s in n?n[s]:null}}var nt=w(require("vscode"));var O=w(require("vscode"));async function ge(t){let e=t.uri,o=new O.WorkspaceEdit,n=t.validateRange(new O.Range(0,0,1/0,1/0));o.replace(e,n,""),await O.workspace.applyEdit(o),t.save()}var U=w(require("vscode"));async function ve({appFile:t,existingEditor:e}){return e&&U.window.visibleTextEditors.includes(e)?e:await U.window.showTextDocument(t.uri,{viewColumn:U.ViewColumn.Beside,preview:!0})}async function he(t,e){let o=await t.runCmd(`print(require(${e}, quietly = TRUE))`,{verbose:!1});return o.status==="error"?{status:"error",msg:o.errorMsg}:o.values[0].includes("FALSE")?{status:"error",msg:Pt(e)}:{status:"success"}}function Pt(t){return`The ShinyUiEditor extension needs the \`${t}\` pkg installed. Install using \`remotes::install_github('rstudio/${t}')\` and restart the extension.`}function H(...t){return t.filter(o=>o!==void 0).reduce((o,n,r)=>(r===0?"":o+`
`)+n,"")}function Ee(t){return t.replace(/(?<=\\)"/g,'\\\\"').replace(/\\n/g,"\\\\n").replace(/(?<!\\)"/g,'\\"')}function ye(t){return t.replace(/^"(.*)"$/,"$1").replace(/^'(.*)'$/,"$1")}async function Nt(t,e){let o=Ee(e),n=H(`app_lines <- strsplit("${o}", "\\n")[[1]]`,"parsed <- parse(text = app_lines, keep.source = TRUE)","jsonlite::toJSON(","  shinyuieditor:::serialize_ast(parsed),","  auto_unbox = TRUE",")"),r=await t.runCmd(n,{verbose:!1,timeout_ms:5e3});if(r.status==="error")return r;try{let s=JSON.parse(r.values.reduce((i,a)=>i+`
`+a,""));return Object.keys(s).length===0?{status:"success",values:"EMPTY"}:{status:"success",values:s}}catch{return{status:"error",errorMsg:"Could not get document as json. Content is not valid json"}}}function Re(t){let e=null;async function o(n){let r=t.version;if(r===e?.file_version)return{status:"success",values:e.ast};let s=await Nt(n,t.getText());return s.status==="error"||(e={file_version:r,ast:s.values}),s}return o}var xe=w(require("fs")),V=w(require("vscode"));var Se=require("child_process");async function we({cmd:t,args:e,verbose:o=!1,timeout_ms:n=1500}){let r=Ct(o,"runShellCommand: ");return new Promise(s=>{let i={stdout:[],stderr:[]},a=(0,Se.spawn)(t,e);function c(){r("Spawned")}function u(v){r("Error "+v.message),m(),s({status:"error",errorMsgs:v.message,...i})}function d(){r("Close"),m(),s({status:"success",...i})}function l(v){r(`stdout: ${v.toString()}`),i.stdout.push(v.toString())}function g(v){r(`stderr: ${v.toString()}`),i.stderr.push(v.toString())}function m(){clearTimeout(p),a.off("spawn",c),a.off("error",u),a.off("close",d),a.stdout.off("data",l),a.stderr.off("data",g)}let p=setTimeout(()=>{s({status:"error",errorMsgs:`Command, no response from run command within ${n}ms:
${t} ${e?.join(" ")}`,...i}),m()},n);a.on("spawn",c),a.on("error",u),a.on("close",d),a.stdout.on("data",l),a.stderr.on("data",g)})}function Ct(t,e){return o=>{t&&console.log(e+o)}}async function Te(t){if(It())return await bt(t);let e=V.Uri.parse(`http://localhost:${t}`);return(await V.env.asExternalUri(e)).toString()}var Ae="/usr/lib/rstudio-server/bin/rserver-url";function It(){return"RS_SERVER_URL"in process.env?xe.existsSync(Ae):!1}async function bt(t){let e=await we({cmd:Ae,args:[String(t)]});e.status==="error"&&Error(`Failed to get Posit workbench forwarded port. Error msg:
`+e.errorMsgs);let o=process.env.RS_SERVER_URL,n=process.env.RS_SESSION_URL;if(!o||!n)throw new Error("Can't find URL for workbench.");let r=e.stdout[0];return`${o}${n.slice(1)}p/${r}/`}var Pe=w(require("net"));async function Ne(){return new Promise(t=>{let e=Pe.default.createServer();e.listen(0,()=>{let o=e.address?.();if(typeof o=="string"||o===null)throw new Error("Failed to find a free port...");e.close(n=>t(o.port))})})}var Ze=require("child_process");var je=require("fs");var Ke=require("fs"),J=w(require("path")),Ye=Ve();async function qe(){let t=process.platform,e=Mt(t);if(!e&&t==="win32")try{let o=new Ye({hive:Ye.HKLM,key:"\\Software\\R-Core\\R"}),n=await new Promise((r,s)=>o.get("InstallPath",(i,a)=>i===null?r(a):s(i)));e=J.default.join(n.value,"bin","R.exe")}catch{e=""}return e}function Mt(t){let e=":",o="";t==="win32"&&(e=";",o=".exe");let n=process.env.PATH?process.env.PATH.split(e):[];for(let r of n){let s=J.default.join(r,"R"+o);if((0,Ke.existsSync)(s))return s}return""}async function Qe(){let t=await qe();if(!t){let e="Cannot find R for running shinyuieditor. Make sure R is installed and/or updating the shinyuieditor extension settings option to proper to R path.";throw new Error(e)}if(!(0,je.existsSync)(t)){let e=`Path to R is invalid: ${t}. Make sure R is installed and/or updating the shinyuieditor extension settings option to proper to R path.`;throw new Error(e)}return ye(t)}async function Y(t,e={}){let o=await Qe();if(o===void 0)throw new Error("Can't get R path");let n="";return new Promise(r=>{let s=new AbortController,{signal:i}=s,a=(0,Ze.spawn)(o,t,{signal:i});a.on("spawn",d),a.on("error",l),a.on("close",g),a.stdout.on("data",m),a.stderr.on("data",p);function c(h,E){n+=`${h}: ${E}`}function u(h){e.verbose&&console.log(`%c[RProc ${a.pid}] %c${h.replaceAll(/\n$/g,"").replaceAll(/\n/g,`
\u2219\u2219\u2219 `)}`,"color: orangered;","color: grey; opacity: 0.5")}function d(){u("spawned"),clearTimeout(S),r({proc:a,stop:f,getIsRunning:()=>a.exitCode===null})}function l(h){u(`Error: 
${h.toString()}`),clearTimeout(S),e.onError?.(h)}function g(){u("Closed"),clearTimeout(S),e.onClose?.()}function m(h){let E=h.toString();u(`stdout: 
${E}`),c("out",E),e.onStdout?.(E)}function p(h){let E=h.toString();u(`stderr: ${E}`),c("error",E),e.onStderr?.(E)}function v(){a.off("spawn",d),a.off("error",l),a.off("close",g),a.stdout.off("data",m),a.stderr.off("data",p)}function f(){return v(),!a.pid||!a.connected?!0:(u(`Killing R process ${a.pid}`),process.kill(a.pid))}let S=setTimeout(()=>{throw f(),new Error(`Starting backend server failed.
 Logs:
`+n)},e.timeout_ms??5e3)})}function Xe({pathToApp:t,onCrash:e,onInitiation:o,onReady:n,onFailToStart:r,onLogs:s}){let i="0.0.0.0",a=null;async function c(){o(),u();try{let d=await Ne(),l=await Te(d),g=new RegExp(`listening on .+${d}`,"i"),m=H("options(shiny.autoreload = TRUE)",`shiny::runApp(appDir = "${t}", port = ${d}, host = "${i}")`);return a=await Y(["--no-save","--no-restore","--silent","-e",m],{onStderr(p){g.test(p)&&n(l.toString()),s(p.split(`
`))},onClose:e,onError:e}),!0}catch{return r(),!1}}function u(){return a===null?!0:a.stop()}return{start:c,stop:u}}var y=w(require("vscode"));var K=w(require("vscode"));async function ze({uri:t,position:e=new K.Position(0,0),locations:o,multiple:n="gotoAndPeek",noResultsMessage:r}){await K.commands.executeCommand("editor.action.goToLocations",t,e,o,n,r)}async function Je({editor:t,snippet:e,below_line:o}){let n=t.document.validatePosition(new y.Position(o-1,1/0));await t.insertSnippet(new y.SnippetString(`
`+e),n)||y.window.showErrorMessage("Failed to add output scaffold")}function ee({editor:t,selections:e}){let o=e.map(([n,r,s,i])=>{let a=new y.Position(n-1,r-1),c=new y.Position(s-1,i);return new y.Selection(a,c)});t.selection=o[0],t.revealRange(o[0])}async function et({editor:t,input:{inputId:e}}){let o=`input$${e}`,n=o,s=t.document.getText().split(`
`),i=new RegExp(`(?<!#.*)${Gt(n)}(?=\\W)`),a=s.map((u,d)=>({line:d,match:i.exec(u)})).filter(({match:u})=>u!==null);if(a.length===0)return null;let c=a.map(({line:u,match:d})=>{let l=d?.index??0,g=new y.Position(u,l),m=new y.Position(u,l+n.length);return new y.Location(t.document.uri,new y.Range(g,m))});y.window.showTextDocument(t.document),await ze({uri:t.document.uri,locations:c,noResultsMessage:`Failed to find any current use of ${o} in server`})}function Gt(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}var D=w(require("vscode"));async function tt({script_text:t,document:e}){let o=e.getText();if(t===o)return!1;let n=e.uri,r=new D.WorkspaceEdit,s=e.validateRange(new D.Selection(0,0,e.lineCount+1,0));return r.replace(n,s,t),await D.workspace.applyEdit(r),e.save(),!0}var{showErrorMessage:ot}=nt.window;function rt({RProcess:t,document:e,sendMessage:o}){let n=!1,r=null,s,i=Re(e),a=async()=>{let p=e.getText();if(!(r!==null&&p.includes(r))){if(!n){let f=await he(t,"shinyuieditor");if(f.status==="error")throw o({path:"BACKEND-ERROR",payload:{context:"checking for shinyuieditor package",msg:f.msg}}),ot(f.msg),new Error(f.msg);n=!0}if(p===""){o({path:"TEMPLATE_CHOOSER",payload:"SINGLE-FILE"});return}try{let f=await i(t);if(f.status==="error"){o({path:"BACKEND-ERROR",payload:{context:"parsing app",msg:f.errorMsg}}),ot(f.errorMsg);return}if(f.values==="EMPTY"){o({path:"TEMPLATE_CHOOSER",payload:"SINGLE-FILE"});return}r=p,o({path:"APP-INFO",payload:{app_type:"SINGLE-FILE",app:{script:p,ast:f.values}}})}catch(f){console.error("Failed to parse",f)}}},c=le(a,500),u=()=>{c()},d=()=>{c.flush()},l=Xe({pathToApp:e.fileName,onInitiation:()=>{o({path:"APP-PREVIEW-STATUS",payload:"LOADING"})},onReady:p=>{o({path:"APP-PREVIEW-STATUS",payload:{url:p}})},onFailToStart:()=>{o({path:"APP-PREVIEW-CRASH",payload:"Failed to start"})},onCrash:()=>{o({path:"APP-PREVIEW-CRASH",payload:"Crashed"})},onLogs:p=>{o({path:"APP-PREVIEW-LOGS",payload:p})}}),g=async()=>(s=await ve({appFile:e,existingEditor:s}),s);return{onDocumentChanged:u,onDocumentSaved:d,onDidReceiveMessage:async p=>{if(pe(p))switch(p.path){case"READY-FOR-STATE":a();return;case"UPDATED-APP":{if(p.payload.app_type==="MULTI-FILE")return;await tt({script_text:p.payload.app,document:e})&&(r=p.payload.app);return}case"APP-PREVIEW-REQUEST":{l.start();return}case"APP-PREVIEW-STOP":{l.stop();return}case"APP-PREVIEW-RESTART":{l.start();return}case"ENTERED-TEMPLATE-SELECTOR":{l.stop(),await ge(e);return}case"OPEN-COMPANION-EDITOR":{await g();return}case"SHOW-APP-LINES":{ee({editor:await g(),selections:p.payload});return}case"INSERT-SNIPPET":{console.log("Insert snippet into server",p.payload),Je({editor:await g(),...p.payload});return}case"FIND-SERVER-USES":{if(p.payload.type==="Input")et({editor:await g(),input:p.payload});else{let v=await i(t);if(v.status==="success"&&v.values!=="EMPTY"){let f=_e(v.values);ee({editor:await g(),selections:f.get_output_position(p.payload.outputId)??[]})}}return}case"NODE-SELECTION":{console.log("New node selection",p.payload);return}default:console.warn("Unhandled message from client",p)}else console.log("Unknown message from webview",p)}}}function st(t){let e=t.getText();return e.trim()===""?"empty":Ft.test(e)?"valid":"invalid"}var Ft=/shinyApp\(/;var it="SUE_START_SIGNAL",at="SUE_END_SIGNAL";async function ut(t,e,{timeout_ms:o=1e3,verbose:n=!1}={}){let r=c=>{n&&console.log(`runRCommand: ${c}`)},s="",i=!1,a=[];return t.exitCode!==null?{status:"error",errorMsg:`Can't run R command as background R process has exited with code ${t.exitCode}.`}:new Promise(c=>{function u(p){let f=p.toString().split(`
`);r("~~~Output chunk~~~");for(let S of f){let h=S.includes(it),E=S.includes(at),F=S.length===0;if(h){i=!0;continue}if(E){clearTimeout(g),c({status:"success",values:a}),r("Output finished"),m();break}!i||F||(r(S),s+=S+`
`,a.push(S))}}function d(p){let v=p.toString();s+=`stderr: ${v}
`,r("stderr: "+v)}function l(){c({status:"error",errorMsg:s}),m()}t.stdout.on("data",u),t.stderr.on("data",d),t.on("close",l);let g=setTimeout(()=>{c({status:"error",errorMsg:`Timeout, no response from run command within ${o}ms: ${e}
 Logs:
 ${s}`}),m()},o);function m(){t.stdout.off("data",u),t.stderr.off("data",d),t.off("close",l)}ct(`print('${it}');${e};print('${at}')`,t)})}async function pt(){async function t(){return await Y(["--silent","--slave","--no-save","--no-restore"],{timeout_ms:5e3})}let e=await t();return{...e,async runCmd(o,n){return e.getIsRunning()||(console.warn("Background R Process has crashed. Restarting..."),e.stop(),e=await t(),console.warn("Background R Process restarted")),ut(e.proc,o,n)}}}function ct(t,e){e.stdin.write(`${t}
`)}function lt(){let t="",e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";for(let o=0;o<32;o++)t+=e.charAt(Math.floor(Math.random()*e.length));return t}var q=class{constructor(e){this.context=e;this.RProcess=null;pt().then(o=>{this.RProcess=o})}static register(e){let o=new q(e);return T.window.registerCustomEditorProvider(q.viewType,o,{webviewOptions:{retainContextWhenHidden:!0}})}async resolveCustomTextEditor(e,o,n){if(st(e)==="invalid"){let u="The active file doesn't appear to be a Shiny app. Make sure that the script is either empty or has a valid shiny app in it.";throw T.window.showErrorMessage(u),o.dispose(),new Error(u)}if(o.webview.options={enableScripts:!0},o.webview.html=this.getHtmlForWebview(o.webview),!this.RProcess)throw new Error("Don't have an R Process to pass to editor backend!");let s=rt({RProcess:this.RProcess,document:e,sendMessage:u=>o.webview.postMessage(u)}),i=T.workspace.onDidChangeTextDocument(u=>{u.document.uri.toString()===e.uri.toString()&&s.onDocumentChanged()}),a=T.workspace.onDidSaveTextDocument(u=>{u.uri.toString()===e.uri.toString()&&s.onDocumentSaved()}),c=o.webview.onDidReceiveMessage(s.onDidReceiveMessage);o.onDidDispose(()=>{i.dispose(),a.dispose(),c.dispose()})}getHtmlForWebview(e){let o=e.asWebviewUri(T.Uri.joinPath(this.context.extensionUri,"media","build","extension-editor.js")),n=e.asWebviewUri(T.Uri.joinPath(this.context.extensionUri,"media","build","style.css")),r=lt(),s=e.cspSource;return`
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
          content="default-src 'none'; frame-src http://localhost:*/ ${s} https:; img-src ${s} data:; style-src ${e.cspSource} 'unsafe-inline'; script-src 'nonce-${r}';">

				<meta name="viewport" content="width=device-width, initial-scale=1.0">

				
				<link href="${n}" rel="stylesheet" />
				
				<title>Shiny UI Editor</title>
			</head>
			<body style="padding-inline: 0;">
				<noscript>You need to enable JavaScript to run this app.</noscript>
				<div id="root" style="height: 100vh; display: relative"></div>
				<script type="module" nonce="${r}" src="${o}"></script>
			</body>
			</html>`}},G=q;G.viewType="shinyuieditor.appFile";function $t(t){t.subscriptions.push(G.register(t)),t.subscriptions.push(te.commands.registerCommand("shinyuieditor.startEditorOnActiveFile",ue),te.commands.registerCommand("shinyuieditor.launchEditor",se))}0&&(module.exports={activate});
