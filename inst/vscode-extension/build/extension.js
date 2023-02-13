"use strict";var it=Object.create;var G=Object.defineProperty;var st=Object.getOwnPropertyDescriptor;var at=Object.getOwnPropertyNames;var ct=Object.getPrototypeOf,pt=Object.prototype.hasOwnProperty;var ut=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports),lt=(t,e)=>{for(var o in e)G(t,o,{get:e[o],enumerable:!0})},J=(t,e,o,r)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of at(e))!pt.call(t,n)&&n!==o&&G(t,n,{get:()=>e[n],enumerable:!(r=st(e,n))||r.enumerable});return t};var w=(t,e,o)=>(o=t!=null?it(ct(t)):{},J(e||!t||!t.__esModule?G(o,"default",{value:t,enumerable:!0}):o,t)),dt=t=>J(G({},"__esModule",{value:!0}),t);var Ue=ut((to,Me)=>{var Q=require("util"),_t=require("path"),I=require("child_process").spawn,_=function(){},Z="HKLM",_e="HKCU",Se="HKCR",Te="HKU",xe="HKCC",Pe=[Z,_e,Se,Te,xe],Ae="REG_SZ",Ce="REG_MULTI_SZ",Ie="REG_EXPAND_SZ",ke="REG_DWORD",Oe="REG_QWORD",De="REG_BINARY",be="REG_NONE",Ne=[Ae,Ce,Ie,ke,Oe,De,be],St="",Tt=/(\\[a-zA-Z0-9_\s]+)*/,xt=/^(HKEY_LOCAL_MACHINE|HKEY_CURRENT_USER|HKEY_CLASSES_ROOT|HKEY_USERS|HKEY_CURRENT_CONFIG)(.*)$/,Le=/^(.*)\s(REG_SZ|REG_MULTI_SZ|REG_EXPAND_SZ|REG_DWORD|REG_QWORD|REG_BINARY|REG_NONE)\s+([^\s].*)$/;function M(t,e){if(!(this instanceof M))return new M(t,e);Error.captureStackTrace(this,M),this.__defineGetter__("name",function(){return M.name}),this.__defineGetter__("message",function(){return t}),this.__defineGetter__("code",function(){return e})}Q.inherits(M,Error);function k(t){var e={stdout:"",stderr:""};return t.stdout.on("data",function(o){e.stdout+=o.toString()}),t.stderr.on("data",function(o){e.stderr+=o.toString()}),e}function O(t,e,o){var r=o.stdout.trim(),n=o.stderr.trim(),a=Q.format(`%s command exited with code %d:
%s
%s`,t,e,r,n);return new M(a,e)}function Pt(t){if(t=="x64")return"64";if(t=="x86")return"32";throw new Error("illegal architecture: "+t+" (use x86 or x64)")}function D(t,e){e&&t.push("/reg:"+Pt(e))}function b(){return process.platform==="win32"?_t.join(process.env.windir,"system32","reg.exe"):"REG"}function F(t,e,o,r,n,a,i){if(!(this instanceof F))return new F(t,e,o,r,n,a,i);var s=t,p=e,c=o,l=r,d=n,g=a,u=i;this.__defineGetter__("host",function(){return s}),this.__defineGetter__("hive",function(){return p}),this.__defineGetter__("key",function(){return c}),this.__defineGetter__("name",function(){return l}),this.__defineGetter__("type",function(){return d}),this.__defineGetter__("value",function(){return g}),this.__defineGetter__("arch",function(){return u})}Q.inherits(F,Object);function m(t){if(!(this instanceof m))return new m(t);var e=t||{},o=""+(e.host||""),r=""+(e.hive||Z),n=""+(e.key||""),a=e.arch||null;if(this.__defineGetter__("host",function(){return o}),this.__defineGetter__("hive",function(){return r}),this.__defineGetter__("key",function(){return n}),this.__defineGetter__("path",function(){return(o.length==0?"":"\\\\"+o+"\\")+r+n}),this.__defineGetter__("arch",function(){return a}),this.__defineGetter__("parent",function(){var i=n.lastIndexOf("\\");return new m({host:this.host,hive:this.hive,key:i==-1?"":n.substring(0,i),arch:this.arch})}),Pe.indexOf(r)==-1)throw new Error("illegal hive specified.");if(!Tt.test(n))throw new Error("illegal key specified.");if(a&&a!="x64"&&a!="x86")throw new Error("illegal architecture specified (use x86 or x64)")}m.HKLM=Z;m.HKCU=_e;m.HKCR=Se;m.HKU=Te;m.HKCC=xe;m.HIVES=Pe;m.REG_SZ=Ae;m.REG_MULTI_SZ=Ce;m.REG_EXPAND_SZ=Ie;m.REG_DWORD=ke;m.REG_QWORD=Oe;m.REG_BINARY=De;m.REG_NONE=be;m.REG_TYPES=Ne;m.DEFAULT_VALUE=St;m.prototype.values=function(e){if(typeof e!="function")throw new TypeError("must specify a callback");var o=["QUERY",this.path];D(o,this.arch);var r=I(b(),o,{cwd:void 0,env:process.env,stdio:["ignore","pipe","pipe"]}),n="",a=this,i=null,s=k(r);return r.on("close",function(p){if(!i)if(p!==0)_("process exited with code "+p),e(O("QUERY",p,s),null);else{for(var c=[],l=[],d=n.split(`
`),g=0,u=0,h=d.length;u<h;u++){var f=d[u].trim();f.length>0&&(_(f),g!=0&&c.push(f),++g)}for(var u=0,h=c.length;u<h;u++){var E=Le.exec(c[u]),S,x,v;E&&(S=E[1].trim(),x=E[2].trim(),v=E[3],l.push(new F(a.host,a.hive,a.key,S,x,v,a.arch)))}e(null,l)}}),r.stdout.on("data",function(p){n+=p.toString()}),r.on("error",function(p){i=p,e(p)}),this};m.prototype.keys=function(e){if(typeof e!="function")throw new TypeError("must specify a callback");var o=["QUERY",this.path];D(o,this.arch);var r=I(b(),o,{cwd:void 0,env:process.env,stdio:["ignore","pipe","pipe"]}),n="",a=this,i=null,s=k(r);return r.on("close",function(p){i||p!==0&&(_("process exited with code "+p),e(O("QUERY",p,s),null))}),r.stdout.on("data",function(p){n+=p.toString()}),r.stdout.on("end",function(){for(var p=[],c=[],l=n.split(`
`),d=0,g=l.length;d<g;d++){var u=l[d].trim();u.length>0&&(_(u),p.push(u))}for(var d=0,g=p.length;d<g;d++){var h=xt.exec(p[d]),f,E;h&&(f=h[1],E=h[2],E&&E!==a.key&&c.push(new m({host:a.host,hive:a.hive,key:E,arch:a.arch})))}e(null,c)}),r.on("error",function(p){i=p,e(p)}),this};m.prototype.get=function(e,o){if(typeof o!="function")throw new TypeError("must specify a callback");var r=["QUERY",this.path];e==""?r.push("/ve"):r=r.concat(["/v",e]),D(r,this.arch);var n=I(b(),r,{cwd:void 0,env:process.env,stdio:["ignore","pipe","pipe"]}),a="",i=this,s=null,p=k(n);return n.on("close",function(c){if(!s)if(c!==0)_("process exited with code "+c),o(O("QUERY",c,p),null);else{for(var l=[],d=null,g=a.split(`
`),u=0,h=0,f=g.length;h<f;h++){var E=g[h].trim();E.length>0&&(_(E),u!=0&&l.push(E),++u)}var S=l[l.length-1]||"",x=Le.exec(S),v,y,A;x&&(v=x[1].trim(),y=x[2].trim(),A=x[3],d=new F(i.host,i.hive,i.key,v,y,A,i.arch)),o(null,d)}}),n.stdout.on("data",function(c){a+=c.toString()}),n.on("error",function(c){s=c,o(c)}),this};m.prototype.set=function(e,o,r,n){if(typeof n!="function")throw new TypeError("must specify a callback");if(Ne.indexOf(o)==-1)throw Error("illegal type specified.");var a=["ADD",this.path];e==""?a.push("/ve"):a=a.concat(["/v",e]),a=a.concat(["/t",o,"/d",r,"/f"]),D(a,this.arch);var i=I(b(),a,{cwd:void 0,env:process.env,stdio:["ignore","pipe","pipe"]}),s=null,p=k(i);return i.on("close",function(c){s||(c!==0?(_("process exited with code "+c),n(O("ADD",c,p,null))):n(null))}),i.stdout.on("data",function(c){_(""+c)}),i.on("error",function(c){s=c,n(c)}),this};m.prototype.remove=function(e,o){if(typeof o!="function")throw new TypeError("must specify a callback");var r=e?["DELETE",this.path,"/f","/v",e]:["DELETE",this.path,"/f","/ve"];D(r,this.arch);var n=I(b(),r,{cwd:void 0,env:process.env,stdio:["ignore","pipe","pipe"]}),a=null,i=k(n);return n.on("close",function(s){a||(s!==0?(_("process exited with code "+s),o(O("DELETE",s,i),null)):o(null))}),n.stdout.on("data",function(s){_(""+s)}),n.on("error",function(s){a=s,o(s)}),this};m.prototype.clear=function(e){if(typeof e!="function")throw new TypeError("must specify a callback");var o=["DELETE",this.path,"/f","/va"];D(o,this.arch);var r=I(b(),o,{cwd:void 0,env:process.env,stdio:["ignore","pipe","pipe"]}),n=null,a=k(r);return r.on("close",function(i){n||(i!==0?(_("process exited with code "+i),e(O("DELETE",i,a),null)):e(null))}),r.stdout.on("data",function(i){_(""+i)}),r.on("error",function(i){n=i,e(i)}),this};m.prototype.erase=m.prototype.clear;m.prototype.destroy=function(e){if(typeof e!="function")throw new TypeError("must specify a callback");var o=["DELETE",this.path,"/f"];D(o,this.arch);var r=I(b(),o,{cwd:void 0,env:process.env,stdio:["ignore","pipe","pipe"]}),n=null,a=k(r);return r.on("close",function(i){n||(i!==0?(_("process exited with code "+i),e(O("DELETE",i,a),null)):e(null))}),r.stdout.on("data",function(i){_(""+i)}),r.on("error",function(i){n=i,e(i)}),this};m.prototype.create=function(e){if(typeof e!="function")throw new TypeError("must specify a callback");var o=["ADD",this.path,"/f"];D(o,this.arch);var r=I(b(),o,{cwd:void 0,env:process.env,stdio:["ignore","pipe","pipe"]}),n=null,a=k(r);return r.on("close",function(i){n||(i!==0?(_("process exited with code "+i),e(O("ADD",i,a),null)):e(null))}),r.stdout.on("data",function(i){_(""+i)}),r.on("error",function(i){n=i,e(i)}),this};m.prototype.keyExists=function(e){return this.values(function(o,r){if(o)return o.code==1?e(null,!1):e(o);e(null,!0)}),this};m.prototype.valueExists=function(e,o){return this.get(e,function(r,n){if(r)return r.code==1?o(null,!1):o(r);o(null,!0)}),this};Me.exports=m});var Ot={};lt(Ot,{activate:()=>kt});module.exports=dt(Ot);var z=w(require("vscode"));var C=require("vscode"),T=w(require("vscode"));var q="app.R",ft=/^([\w|\s]+)([\.[\w|^\.]*]*)$/i;function j(t){if(t==="")return{valid:!0,name:q};let e=t.match(ft);if(e===null)return{valid:!1,msg:`Invalid app name: ${t}.`};let[o,r,n]=e;return(n===""||n===".")&&(n=".R"),r?n!==".R"?{valid:!1,msg:`Invalid file extension: ${n}. Extension needs to be .R`}:(r=r.replaceAll(" ","-"),{valid:!0,name:`${r}${n}`}):{valid:!1,msg:`Invalid app name: ${t}. Make sure to only use numbers and letters. Spaces will be converted to dashes.`}}var ee=new TextEncoder().encode("");async function te(){let t=await C.window.showOpenDialog({canSelectFolders:!0,canSelectFiles:!0,title:"Choose location for Shiny app",openLabel:"Choose app folder or file",canSelectMany:!1,filters:{"R scripts":["R","r"]}});if(!t)return;let e=t[0],r=(await T.workspace.fs.stat(e)).type===T.FileType.Directory?await mt(e):e;!r||T.commands.executeCommand("vscode.openWith",r,"shinyuieditor.appFile")}async function mt(t){let e=(await C.workspace.fs.readDirectory(t)).filter(([i,s])=>s===T.FileType.File).map(([i,s])=>i),o=await C.window.showInputBox({prompt:"Enter file name for new app",placeHolder:q,validateInput(i){let s=j(i);return s.valid?e.includes(s.name)?{message:`Run the editor on existing app: ${s.name}.`,severity:T.InputBoxValidationSeverity.Info}:{message:`Run the template chooser to build new app: ${s.name}.`,severity:T.InputBoxValidationSeverity.Info}:{message:s.msg,severity:T.InputBoxValidationSeverity.Error}}});if(!o)return;let r=j(o);if(!r.valid){T.window.showErrorMessage(`Error processing requested file name: ${o}. Try with a different name.`);return}let n=C.Uri.joinPath(t,r.name);return e.includes(r.name)||await C.workspace.fs.writeFile(n,ee),n}var oe=w(require("path")),re=w(require("vscode")),W=require("vscode");function ht(t){let e=t.ext;return/\.R/i.test(e)}function ne(t="world"){let e=W.window.activeTextEditor;if(!e){W.window.showErrorMessage("No active file open to run ui editor on!");return}let o=oe.default.parse(e.document.fileName);if(!ht(o)){W.window.showErrorMessage(`Can't run the ui editor on the currently active file ${o.base}, needs to be a .R file.`);return}re.commands.executeCommand("vscode.openWith",e.document.uri,"shinyuieditor.appFile")}var P=w(require("vscode"));function ie(t){return typeof t=="object"&&t!==null}function se(t){return ie(t)?"path"in t:!1}var ae=gt;function gt(t,e,o){var r=null,n=null,a=function(){r&&(clearTimeout(r),n=null,r=null)},i=function(){var p=n;a(),p&&p()},s=function(){if(!e)return t.apply(this,arguments);var p=this,c=arguments,l=o&&!r;if(a(),n=function(){t.apply(p,c)},r=setTimeout(function(){if(r=null,!l){var d=n;return n=null,d()}},e),l)return n()};return s.cancel=a,s.flush=i,s}var Ze=w(require("vscode"));var N=w(require("vscode"));var vt=w(require("vscode"));async function ce({text:t,document:e}){let o=e.uri,r=new N.WorkspaceEdit,n=e.validateRange(new N.Selection(0,0,e.lineCount+1,0));r.replace(o,n,t),await N.workspace.applyEdit(r),e.save()}var L=w(require("vscode"));async function pe(t){let e=t.uri,o=new L.WorkspaceEdit,r=t.validateRange(new L.Range(0,0,1/0,1/0));o.replace(e,r,""),await L.workspace.applyEdit(o),t.save()}var U=w(require("vscode"));async function ue({appFile:t,existingEditor:e}){return e&&U.window.visibleTextEditors.includes(e)?e:await U.window.showTextDocument(t.uri,{viewColumn:U.ViewColumn.Beside,preview:!0})}async function le(t,e){let o=await t.runCmd(`print(require(${e}, quietly = TRUE))`,{verbose:!1});return o.status==="error"?{status:"error",msg:o.errorMsg}:o.values[0].includes("FALSE")?{status:"error",msg:Et(e)}:{status:"success"}}function Et(t){return`The ShinyUiEditor extension needs the \`${t}\` pkg installed. Install using \`remotes::install_github('rstudio/${t}')\` and restart the extension.`}function H(...t){return t.filter(o=>o!==void 0).reduce((o,r,n)=>(n===0?"":o+`
`)+r,"")}function de(t){return t.replace(/(?<=\\)"/g,'\\\\"').replace(/\\n/g,"\\\\n").replace(/(?<!\\)"/g,'\\"')}function fe(t){return t.replace(/^"(.*)"$/,"$1").replace(/^'(.*)'$/,"$1")}async function me(t,e){let o=de(e),r=H(`app_lines <- strsplit("${o}", "\\n")[[1]]`,"parsed <- parse(text = app_lines, keep.source = TRUE)","jsonlite::toJSON(","  shinyuieditor:::serialize_ast(parsed),","  auto_unbox = TRUE",")"),n=await t.runCmd(r,{verbose:!1,timeout_ms:5e3});if(n.status==="error")return n;try{let a=JSON.parse(n.values.reduce((i,s)=>i+`
`+s,""));return Object.keys(a).length===0?{status:"success",values:"EMPTY"}:{status:"success",values:a}}catch{return{status:"error",errorMsg:"Could not get document as json. Content is not valid json"}}}var ve=w(require("fs")),B=w(require("vscode"));var he=require("child_process");async function ge({cmd:t,args:e,verbose:o=!1,timeout_ms:r=1500}){let n=yt(o,"runShellCommand: ");return new Promise(a=>{let i={stdout:[],stderr:[]},s=(0,he.spawn)(t,e);function p(){n("Spawned")}function c(f){n("Error "+f.message),u(),a({status:"error",errorMsgs:f.message,...i})}function l(){n("Close"),u(),a({status:"success",...i})}function d(f){n(`stdout: ${f.toString()}`),i.stdout.push(f.toString())}function g(f){n(`stderr: ${f.toString()}`),i.stderr.push(f.toString())}function u(){clearTimeout(h),s.off("spawn",p),s.off("error",c),s.off("close",l),s.stdout.off("data",d),s.stderr.off("data",g)}let h=setTimeout(()=>{a({status:"error",errorMsgs:`Command, no response from run command within ${r}ms:
${t} ${e==null?void 0:e.join(" ")}`,...i}),u()},r);s.on("spawn",p),s.on("error",c),s.on("close",l),s.stdout.on("data",d),s.stderr.on("data",g)})}function yt(t,e){return o=>{t&&console.log(e+o)}}async function Ee(t){if(Rt())return await wt(t);let e=B.Uri.parse(`http://localhost:${t}`);return(await B.env.asExternalUri(e)).toString()}var ye="/usr/lib/rstudio-server/bin/rserver-url";function Rt(){return"RS_SERVER_URL"in process.env?ve.existsSync(ye):!1}async function wt(t){let e=await ge({cmd:ye,args:[String(t)]});e.status==="error"&&Error(`Failed to get Posit workbench forwarded port. Error msg:
`+e.errorMsgs);let o=process.env.RS_SERVER_URL,r=process.env.RS_SESSION_URL;if(!o||!r)throw new Error("Can't find URL for workbench.");let n=e.stdout[0];return`${o}${r.slice(1)}p/${n}/`}var Re=w(require("net"));async function we(){return new Promise(t=>{let e=Re.default.createServer();e.listen(0,()=>{var r;let o=(r=e.address)==null?void 0:r.call(e);if(typeof o=="string"||o===null)throw new Error("Failed to find a free port...");e.close(n=>t(o.port))})})}var Be=require("child_process");var We=require("fs");var $e=require("fs"),X=w(require("path")),Fe=Ue();async function Ge(){let t=process.platform,e=At(t);if(!e&&t==="win32")try{let o=new Fe({hive:Fe.HKLM,key:"\\Software\\R-Core\\R"}),r=await new Promise((n,a)=>o.get("InstallPath",(i,s)=>i===null?n(s):a(i)));e=X.default.join(r.value,"bin","R.exe")}catch{e=""}return e}function At(t){let e=":",o="";t==="win32"&&(e=";",o=".exe");let r=process.env.PATH?process.env.PATH.split(e):[];for(let n of r){let a=X.default.join(n,"R"+o);if((0,$e.existsSync)(a))return a}return""}async function He(){let t=await Ge();if(!t){let e="Cannot find R for running shinyuieditor. Make sure R is installed and/or updating the shinyuieditor extension settings option to proper to R path.";throw new Error(e)}if(!(0,We.existsSync)(t)){let e=`Path to R is invalid: ${t}. Make sure R is installed and/or updating the shinyuieditor extension settings option to proper to R path.`;throw new Error(e)}return fe(t)}async function K(t,e={}){let o=await He();if(o===void 0)throw new Error("Can't get R path");let r="";return new Promise(n=>{var x;let a=new AbortController,{signal:i}=a,s=(0,Be.spawn)(o,t,{signal:i});s.on("spawn",l),s.on("error",d),s.on("close",g),s.stdout.on("data",u),s.stderr.on("data",h);function p(v,y){r+=`${v}: ${y}`}function c(v){!e.verbose||console.log(`%c[RProc ${s.pid}] %c${v.replaceAll(/\n$/g,"").replaceAll(/\n/g,`
\u2219\u2219\u2219 `)}`,"color: orangered;","color: grey; opacity: 0.5")}function l(){c("spawned"),clearTimeout(S),n({proc:s,stop:E,getIsRunning:()=>s.exitCode===null})}function d(v){var y;c(`Error: 
${v.toString()}`),clearTimeout(S),(y=e.onError)==null||y.call(e,v)}function g(){var v;c("Closed"),clearTimeout(S),(v=e.onClose)==null||v.call(e)}function u(v){var A;let y=v.toString();c(`stdout: 
${y}`),p("out",y),(A=e.onStdout)==null||A.call(e,y)}function h(v){var A;let y=v.toString();c(`stderr: ${y}`),p("error",y),(A=e.onStderr)==null||A.call(e,y)}function f(){s.off("spawn",l),s.off("error",d),s.off("close",g),s.stdout.off("data",u),s.stderr.off("data",h)}function E(){return f(),!s.pid||!s.connected?!0:(c(`Killing R process ${s.pid}`),process.kill(s.pid))}let S=setTimeout(()=>{throw E(),new Error(`Starting backend server failed.
 Logs:
`+r)},(x=e.timeout_ms)!=null?x:5e3)})}function Ke({pathToApp:t,onCrash:e,onInitiation:o,onReady:r,onFailToStart:n,onLogs:a}){let i="0.0.0.0",s=null;async function p(){o(),c();try{let l=await we(),d=await Ee(l),g=new RegExp(`listening on .+${l}`,"i"),u=H("options(shiny.autoreload = TRUE)",`shiny::runApp(appDir = "${t}", port = ${l}, host = "${i}")`);return s=await K(["--no-save","--no-restore","--silent","-e",u],{onStderr(h){g.test(h)&&r(d.toString()),a(h.split(`
`))},onClose:e,onError:e}),!0}catch{return n(),!1}}function c(){return s===null?!0:s.stop()}return{start:p,stop:c}}var R=w(require("vscode"));var Y=w(require("vscode"));async function Ye({uri:t,position:e=new Y.Position(0,0),locations:o,multiple:r="gotoAndPeek",noResultsMessage:n}){await Y.commands.executeCommand("editor.action.goToLocations",t,e,o,r,n)}async function Ve({editor:t,snippet:e,below_line:o}){let r=t.document.validatePosition(new R.Position(o-1,1/0));await t.insertSnippet(new R.SnippetString(`
`+e),r)||R.window.showErrorMessage("Failed to add output scaffold")}function qe({editor:t,selections:e}){let o=e.map(([r,n,a,i])=>{let s=new R.Position(r-1,n-1),p=new R.Position(a-1,i);return new R.Selection(s,p)});t.selection=o[0],t.revealRange(o[0])}async function je({editor:t,input:{inputId:e}}){let o=`input$${e}`,r=o,a=t.document.getText().split(`
`),i=new RegExp(`(?<!#.*)${Ct(r)}(?=\\W)`),s=a.map((c,l)=>({line:l,match:i.exec(c)})).filter(({match:c})=>c!==null);if(s.length===0)return null;let p=s.map(({line:c,match:l})=>{var h;let d=(h=l==null?void 0:l.index)!=null?h:0,g=new R.Position(c,d),u=new R.Position(c,d+r.length);return new R.Location(t.document.uri,new R.Range(g,u))});R.window.showTextDocument(t.document),await Ye({uri:t.document.uri,locations:p,noResultsMessage:`Failed to find any current use of ${o} in server`})}function Ct(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}var{showErrorMessage:Qe}=Ze.window;function Xe({RProcess:t,document:e,sendMessage:o}){let r=!1,n=null,a,i=async()=>{let u=e.getText();if(!(n!==null&&u.includes(n))){if(!r){let f=await le(t,"shinyuieditor");if(f.status==="error")throw o({path:"BACKEND-ERROR",payload:{context:"checking for shinyuieditor package",msg:f.msg}}),Qe(f.msg),new Error(f.msg);r=!0}if(u===""){o({path:"TEMPLATE_CHOOSER",payload:"SINGLE-FILE"});return}try{let f=await me(t,u);if(f.status==="error"){o({path:"BACKEND-ERROR",payload:{context:"parsing app",msg:f.errorMsg}}),Qe(f.errorMsg);return}if(f.values==="EMPTY"){o({path:"TEMPLATE_CHOOSER",payload:"SINGLE-FILE"});return}n=u,o({path:"APP-INFO",payload:{app_type:"SINGLE-FILE",app:{script:u,ast:f.values}}})}catch(f){console.error("Failed to parse",f)}}},s=ae(i,500),p=()=>{s()},c=()=>{s.flush()},l=Ke({pathToApp:e.fileName,onInitiation:()=>{o({path:"APP-PREVIEW-STATUS",payload:"LOADING"})},onReady:u=>{o({path:"APP-PREVIEW-STATUS",payload:{url:u}})},onFailToStart:()=>{o({path:"APP-PREVIEW-CRASH",payload:"Failed to start"})},onCrash:()=>{o({path:"APP-PREVIEW-CRASH",payload:"Crashed"})},onLogs:u=>{o({path:"APP-PREVIEW-LOGS",payload:u})}}),d=async()=>(a=await ue({appFile:e,existingEditor:a}),a);return{onDocumentChanged:p,onDocumentSaved:c,onDidReceiveMessage:async u=>{if(se(u))switch(u.path){case"READY-FOR-STATE":i();return;case"UPDATED-APP":{if(u.payload.app_type==="MULTI-FILE")return;n=u.payload.app,await ce({text:u.payload.app,document:e});return}case"APP-PREVIEW-REQUEST":{l.start();return}case"APP-PREVIEW-STOP":{l.stop();return}case"APP-PREVIEW-RESTART":{l.start();return}case"ENTERED-TEMPLATE-SELECTOR":{l.stop(),await pe(e);return}case"OPEN-COMPANION-EDITOR":{await d();return}case"SHOW-APP-LINES":{qe({editor:await d(),selections:u.payload});return}case"INSERT-SNIPPET":{console.log("Insert snippet into server",u.payload),Ve({editor:await d(),...u.payload});return}case"FIND-INPUT-USES":{je({editor:await d(),input:u.payload});return}case"NODE-SELECTION":{console.log("New node selection",u.payload);return}default:console.warn("Unhandled message from client",u)}else console.log("Unknown message from webview",u)}}}function ze(t){let e=t.getText();return e.trim()===""?"empty":It.test(e)?"valid":"invalid"}var It=/shinyApp\(/;var Je="SUE_START_SIGNAL",et="SUE_END_SIGNAL";async function tt(t,e,{timeout_ms:o=1e3,verbose:r=!1}={}){let n=p=>{r&&console.log(`runRCommand: ${p}`)},a="",i=!1,s=[];return t.exitCode!==null?{status:"error",errorMsg:`Can't run R command as background R process has exited with code ${t.exitCode}.`}:new Promise(p=>{function c(h){let E=h.toString().split(`
`);n("~~~Output chunk~~~");for(let S of E){let x=S.includes(Je),v=S.includes(et),y=S.length===0;if(x){i=!0;continue}if(v){clearTimeout(g),p({status:"success",values:s}),n("Output finished"),u();break}!i||y||(n(S),a+=S+`
`,s.push(S))}}function l(h){let f=h.toString();a+=`stderr: ${f}
`,n("stderr: "+f)}function d(){p({status:"error",errorMsg:a}),u()}t.stdout.on("data",c),t.stderr.on("data",l),t.on("close",d);let g=setTimeout(()=>{p({status:"error",errorMsg:`Timeout, no response from run command within ${o}ms: ${e}
 Logs:
 ${a}`}),u()},o);function u(){t.stdout.off("data",c),t.stderr.off("data",l),t.off("close",d)}ot(`print('${Je}');${e};print('${et}')`,t)})}async function rt(){async function t(){return await K(["--silent","--slave","--no-save","--no-restore"],{timeout_ms:5e3})}let e=await t();return{...e,async runCmd(o,r){return e.getIsRunning()||(console.warn("Background R Process has crashed. Restarting..."),e.stop(),e=await t(),console.warn("Background R Process restarted")),tt(e.proc,o,r)}}}function ot(t,e){e.stdin.write(`${t}
`)}function nt(){let t="",e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";for(let o=0;o<32;o++)t+=e.charAt(Math.floor(Math.random()*e.length));return t}var V=class{constructor(e){this.context=e;this.RProcess=null;rt().then(o=>{this.RProcess=o})}static register(e){let o=new V(e);return P.window.registerCustomEditorProvider(V.viewType,o,{webviewOptions:{retainContextWhenHidden:!0}})}async resolveCustomTextEditor(e,o,r){if(ze(e)==="invalid"){let c="The active file doesn't appear to be a Shiny app. Make sure that the script is either empty or has a valid shiny app in it.";throw P.window.showErrorMessage(c),o.dispose(),new Error(c)}if(o.webview.options={enableScripts:!0},o.webview.html=this.getHtmlForWebview(o.webview),!this.RProcess)throw new Error("Don't have an R Process to pass to editor backend!");let a=Xe({RProcess:this.RProcess,document:e,sendMessage:c=>o.webview.postMessage(c)}),i=P.workspace.onDidChangeTextDocument(c=>{c.document.uri.toString()===e.uri.toString()&&a.onDocumentChanged()}),s=P.workspace.onDidSaveTextDocument(c=>{c.uri.toString()===e.uri.toString()&&a.onDocumentSaved()}),p=o.webview.onDidReceiveMessage(a.onDidReceiveMessage);o.onDidDispose(()=>{i.dispose(),s.dispose(),p.dispose()})}getHtmlForWebview(e){let o=e.asWebviewUri(P.Uri.joinPath(this.context.extensionUri,"media","build","extension-editor.js")),r=e.asWebviewUri(P.Uri.joinPath(this.context.extensionUri,"media","build","style.css")),n=nt(),a=e.cspSource;return`
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
          content="default-src 'none'; frame-src http://localhost:*/ ${a} https:; img-src ${a} data:; style-src ${e.cspSource} 'unsafe-inline'; script-src 'nonce-${n}';">

				<meta name="viewport" content="width=device-width, initial-scale=1.0">

				
				<link href="${r}" rel="stylesheet" />
				
				<title>Shiny UI Editor</title>
			</head>
			<body style="padding-inline: 0;">
				<noscript>You need to enable JavaScript to run this app.</noscript>
				<div id="root" style="height: 100vh; display: relative"></div>
				<script type="module" nonce="${n}" src="${o}"><\/script>
			</body>
			</html>`}},$=V;$.viewType="shinyuieditor.appFile";function kt(t){t.subscriptions.push($.register(t)),t.subscriptions.push(z.commands.registerCommand("shinyuieditor.startEditorOnActiveFile",ne),z.commands.registerCommand("shinyuieditor.launchEditor",te))}0&&(module.exports={activate});
