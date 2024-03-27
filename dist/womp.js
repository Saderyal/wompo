const ee=!1;let $=null,x=0;const f="$wc$",N="wc-wc",O=/<\/?$/g,D=/\s+([^\s]*?)="?$/g,I=/(<([a-z]*?-[a-z]*).*?)\/>/gs,H=/<(?<tag>script|style|textarea|title])(?!.*?<\/\k<tag>)/gi,V=/^(?:script|style|textarea|title)$/i,C=0,E=1,v=2,S=typeof global<"u",w=S?{createTreeWalker(){}}:document,y=w.createTreeWalker(w,129);class L{constructor(e,t){this.template=e,this.dependencies=t}clone(){const e=this.template.content,t=this.dependencies,s=document.importNode(e,!0);y.currentNode=s;let n=y.nextNode(),a=0,i=0,r=t[0];const c=[];for(;r!==void 0;){if(a===r.index){let d;const l=r.type;l===C?d=new P(n,n.nextSibling):l===E?d=new z(n,r):l===v&&(d=new q(n)),c.push(d),r=t[++i]}a!==r?.index&&(n=y.nextNode(),a++)}return y.currentNode=document,[s,c]}}class F{constructor(e,t){this.values=e.values,this.parts=e.parts,this.template=t}}class P{constructor(e,t){this.isNode=!0;this.isAttr=!1;this.isTag=!1;this.startNode=e,this.endNode=t}clearValue(){let e=this.startNode.nextSibling;for(;e!==this.endNode;)e.remove(),e=this.startNode.nextSibling}dispose(){this.clearValue(),this.startNode.remove(),this.endNode.remove()}}class z{constructor(e,t){this.isNode=!1;this.isAttr=!0;this.isTag=!1;this.__eventInitialized=!1;this.node=e,this.name=t.name,this.attrStructure=t.attrDynamics}updateValue(e){if(this.name==="ref"&&e.__wcRef){if(e.current=this.node,this.node._$womp){const n=this.node.onDisconnected;this.node.onDisconnected=()=>{e.current=null,n()}}return}const t=this.node._$womp;t&&this.node.updateProps(this.name,e);const s=e!==Object(e);if(e===!1)this.node.removeAttribute(this.name);else if(s&&!this.name.match(/[A-Z]/))this.node.setAttribute(this.name,e);else if(this.name==="style"){let n="";const a=Object.keys(e);for(const i of a){let r=e[i],c=i.replace(/[A-Z]/g,d=>"-"+d.toLowerCase());typeof r=="number"&&(r=`${r}px`),n+=`${c}:${r};`}this.node.setAttribute(this.name,n)}this.name==="title"&&t&&this.node.removeAttribute(this.name)}set callback(e){if(!this.__eventInitialized){const t=this.name.substring(1);this.node.addEventListener(t,this.__listener.bind(this)),this.__eventInitialized=!0}this.__callback=e}__listener(e){this.__callback&&this.__callback(e)}}class q{constructor(e){this.isNode=!1;this.isAttr=!1;this.isTag=!0;this.node=e}}class j{constructor(e){this._$wompChildren=!0;this.nodes=e}}class U{constructor(e,t){this.isArrayDependency=!0;this.dynamics=[],this.__parentDependency=t,this.addDependenciesFrom(t.startNode,e.length),this.__oldValues=k(this.dynamics,e,[])}addDependenciesFrom(e,t){let s=e,n=t;for(;n;){const a=document.createComment("?START"),i=document.createComment("?END");s.after(a),a.after(i);const r=new P(a,i);s=i,this.dynamics.push(r),n--}}checkUpdates(e){let t=e.length-this.__oldValues.length;if(t>0){let s=this.dynamics[this.dynamics.length-1]?.endNode;s||(s=this.__parentDependency.startNode),this.addDependenciesFrom(s,t)}else if(t<0)for(;t;)this.dynamics.pop().dispose(),t++;return this.__oldValues=k(this.dynamics,e,this.__oldValues),this}}const B=(o,e)=>{const{css:t}=o,{shadow:s,name:n,cssModule:a}=e,i=n,r={};let c=t;return a&&(t.includes(":host")||(c=`${s?":host":i} {display:block;} ${t}`),s||(c=c.replace(/:host/g,i)),c=c.replace(/\.(?!\d)([_a-zA-Z0-9-]+)/gm,(d,l)=>{const p=`${i}__${l}`;return r[l]=p,`.${p}`})),[c,r]},Z=o=>{let e="";const t=[],s=o.length-1;let n="",a="";for(let i=0;i<s;i++){let r=o[i];if(n&&r.includes(n)&&(n=""),a&&new RegExp(`</${a}>`)&&(a=""),n||a)e+=r+f;else{D.lastIndex=0;const c=D.exec(r);if(c){const[d,l]=c,p=d[d.length-1];n=p==='"'||p==="'"?p:"",r=r.substring(0,r.length-n.length-1);let m=`${r}${f}=`;n?m+=`${n}${f}`:m+='"0"',e+=m,t.push(l)}else{if(r.match(O)){e+=r+N;continue}H.lastIndex=0;const d=H.exec(r);d?(a=d[1],e+=r+f):e+=r+`<?${f}>`}}}return e+=o[o.length-1],e=e.replace(I,"$1></$2>"),[e,t]},K=(o,e,t)=>{const s=[];y.currentNode=o.content;let n,a=0,i=0;const r=e.length;for(;(n=y.nextNode())!==null&&s.length<r;){if(n.nodeType===1){if(n.nodeName===N.toUpperCase()){const c={type:v,index:i};s.push(c)}if(n.hasAttributes()){const c=n.getAttributeNames();for(const d of c)if(d.endsWith(f)){const l=t[a++],p=n.getAttribute(d);if(p!=="0"){const m=p.split(f);for(let u=0;u<m.length-1;u++){const h={type:E,index:i,attrDynamics:p,name:l};s.push(h)}}else{const m={type:E,index:i,name:l};s.push(m)}n.removeAttribute(d)}}if(V.test(n.tagName)){const c=n.textContent.split(f),d=c.length-1;if(d>0){n.textContent="";for(let l=0;l<d;l++)n.append(c[l],document.createComment("")),y.nextNode(),s.push({type:C,index:++i});n.append(c[d],document.createComment(""))}}}else n.nodeType===8&&n.data===`?${f}`&&s.push({type:C,index:i});i++}return s},T=o=>{const[e,t]=Z(o.parts),s=document.createElement("template");s.innerHTML=e;const n=K(s,o.parts,t);return new L(s,n)},G=(o,e)=>{if(!o||!e)return!1;const t=o.parts,s=e.parts;if(t.length!==s?.length)return!1;const n=o.values,a=e.values;for(let i=0;i<t.length;i++)if(t[i]!==s[i]||n[i]?._$wompF&&(!a[i]?._$wompF||n[i].componentName!==a[i].componentName))return!1;return!0},Y=(o,e,t)=>{const s=o!==e,n=!!t.attrStructure,i=o?._$wompChildren&&t.startNode.nextSibling!==o.nodes[0];return s||n||i},R=(o,e,t,s,n)=>{const a=e.node;let i=null;const r=o._$wompF,c=r?o.componentName:o;if(a.nodeName!==c.toUpperCase()){const d=a.getAttributeNames();if(r){const m={};for(const h of d){const g=a.getAttribute(h);m[h]=g===""?!0:g}i=new o.class,i._$initialProps=m;const u=a.childNodes;for(;u.length;)i.appendChild(u[0])}else{i=document.createElement(c);for(const m of d)i.setAttribute(m,a.getAttribute(m))}let l=t,p=s[l];for(;p?.node===a;)p.node=i,p=s[++l],p?.name&&p?.name!=="ref"&&(i._$initialProps[p.name]=n[l]);return a.replaceWith(i),i}},k=(o,e,t)=>{const s=[...e];for(let n=0;n<o.length;n++){const a=o[n],i=s[n],r=t[n];if(Y(i,r,a)){if(a.isNode){if(i===!1||i===void 0||i===null){a.clearValue();continue}if(i?._$wompHtml){const p=G(i,r);if(r===void 0||!p){const u=T(i).clone(),[h,g]=u;s[n]=new F(i,u),k(g,i.values,r?.values??r??[]);const M=a.endNode,b=a.startNode;let _=b.nextSibling;for(;_!==M;)_.remove(),_=b.nextSibling;for(_=b;h.childNodes.length;)_.after(h.childNodes[0]),_=_.nextSibling}else{const[m,u]=r.template,h=k(u,i.values,r.values);r.values=h,s[n]=r}continue}const c=i!==Object(i),d=r!==Object(r)&&r!==void 0,l=a.startNode;if(c)d?l.nextSibling?l.nextSibling.textContent=i:l.after(i):(a.clearValue(),l.after(i));else{let p=l.nextSibling,m=0,u=0;if(i._$wompChildren){const h=i.nodes;for(;u<h.length;){(!p||u===0)&&(p=l);const g=h[m];m++,p.after(g),p=p.nextSibling,u++}}else Array.isArray(i)&&(r?.isArrayDependency?s[n]=r.checkUpdates(i):(a.clearValue(),s[n]=new U(i,a)))}}else if(a.isAttr)if(a.name.startsWith("@"))a.callback=i;else{const d=a.attrStructure;if(d){const l=d.split(f);let p=i;for(let m=0;m<l.length-1;m++)l[m]=`${l[m]}${p}`,n++,p=s[n];n--,a.updateValue(l.join("").trim())}else a.updateValue(i)}else if(a.isTag)if(i._$wompLazy){const d=a.node,l=A(d);l&&(l.addSuspense?l.addSuspense(d):(l.loadingComponents=new Set,l.loadingComponents.add(d)),d.suspense=l),i().then(p=>{const m=R(p,a,n,o,e);l&&l.removeSuspense(d,m)});continue}else R(i,a,n,o,e)}}return s},J=(o,e)=>{const{generatedCSS:t,styles:s}=o.options;let n;const a=`${e.name}__styles`;return window.wompHydrationData?(n=document.createElement("link"),n.rel="stylesheet",n.href=`/${e.name}.css`):(n=document.createElement("style"),t&&(n.classList.add(a),n.textContent=t)),class extends HTMLElement{constructor(){super();this._$womp=!0;this.props={};this._$hooks=[];this._$measurePerf=!1;this._$initialProps={};this._$usesContext=!1;this._$hasBeenMoved=!1;this._$layoutEffects=[];this.__updating=!1;this.__oldValues=[];this.__isInitializing=!0;this.__connected=!1;this.__isInDOM=!1}static{this._$womp=!0}static{this.componentName=e.name}static _$getOrCreateTemplate(c){return this._$cachedTemplate||(this._$cachedTemplate=T(c)),this._$cachedTemplate}connectedCallback(){this.__isInDOM=!0,!this.__connected&&this.isConnected&&this.initElement()}disconnectedCallback(){this.__connected&&(this.__isInDOM=!1,Promise.resolve().then(()=>{if(this.__isInDOM)this._$hasBeenMoved=!0,this._$usesContext&&this.requestRender();else{this.onDisconnected();for(const c of this._$hooks)c?.cleanupFunction&&c.cleanupFunction()}}))}onDisconnected(){}initElement(){this.__ROOT=this,this.props={...this.props,...this._$initialProps,styles:s};const c=this.getAttributeNames();for(const m of c)if(!this.props.hasOwnProperty(m)){const u=this.getAttribute(m);this.props[m]=u===""?!0:u}const d=this.__ROOT.childNodes,l=[];for(;d.length;)l.push(d[0]),d[0].remove();const p=new j(l);if(this.props.children=p,e.shadow&&!this.shadowRoot&&(this.__ROOT=this.attachShadow({mode:"open"})),t){const m=n.cloneNode(!0);this.__ROOT.appendChild(m)}this.__render(),this.__isInitializing=!1,this.__connected=!0}__callComponent(){$=this,x=0;const c=o.call(this,this.props);let d=c;return(typeof c=="string"||c instanceof HTMLElement)&&(d=html`${c}`),d}__render(){const c=this.__callComponent();if(c==null){this.remove();return}const d=this.constructor;if(this.__isInitializing){const l=d._$getOrCreateTemplate(c),[p,m]=l.clone();this.__dynamics=m;const u=k(this.__dynamics,c.values,this.__oldValues);for(this.__oldValues=u,this.__isInitializing||(this.__ROOT.innerHTML="");p.childNodes.length;)this.__ROOT.appendChild(p.childNodes[0])}else{const l=k(this.__dynamics,c.values,this.__oldValues);this.__oldValues=l}for(;this._$layoutEffects.length;){const l=this._$layoutEffects.pop();l.cleanupFunction=l.callback()}}requestRender(){this.__updating||(this.__updating=!0,Promise.resolve().then(()=>{this.__render(),this.__updating=!1,this._$hasBeenMoved=!1}))}updateProps(c,d){this.props[c]!==d&&(this.props[c]=d,this.__isInitializing||this.requestRender())}}};export const useHook=()=>{const t=[$,x];return x++,t},useState=o=>{const[e,t]=useHook();if(!e)return[o,()=>{}];if(!e._$hooks.hasOwnProperty(t)){const n=t;e._$hooks[n]=[o,a=>{let i=a;const r=e._$hooks[n];typeof a=="function"&&(i=a(r[0])),i!==r[0]&&(r[0]=i,e.requestRender())}]}return e._$hooks[t]},useEffect=(o,e=null)=>{const[t,s]=useHook();if(t._$hooks.hasOwnProperty(s)){const n=t._$hooks[s];if(e!==null){for(let a=0;a<e.length;a++)if(n.dependencies[a]!==e[a]){typeof n.cleanupFunction=="function"&&n.cleanupFunction(),Promise.resolve().then(()=>{n.cleanupFunction=o(),n.dependencies=e});break}}else Promise.resolve().then(()=>{n.cleanupFunction=o(),n.dependencies=e})}else{const n={dependencies:e,callback:o,cleanupFunction:null};t._$hooks[s]=n,Promise.resolve().then(()=>{n.cleanupFunction=o()})}},useLayoutEffect=(o,e=null)=>{const[t,s]=useHook();if(t._$hooks.hasOwnProperty(s)){const n=t._$hooks[s];if(e!==null){for(let a=0;a<e.length;a++)if(n.dependencies[a]!==e[a]){typeof n.cleanupFunction=="function"&&n.cleanupFunction(),t._$layoutEffects.push(n),n.dependencies=e;break}}else t._$layoutEffects.push(n)}else{const n={dependencies:e,callback:o,cleanupFunction:null};t._$hooks[s]=n,t._$layoutEffects.push(n)}},useRef=(o=null)=>{const[e,t]=useHook();return e._$hooks.hasOwnProperty(t)||(e._$hooks[t]={current:o,__wcRef:!0}),e._$hooks[t]},useCallback=o=>{const[e,t]=useHook();return e._$hooks.hasOwnProperty(t)||(e._$hooks[t]=o),e._$hooks[t]};const Q=()=>{let o=0;return()=>{const[e,t]=useHook();return e._$hooks.hasOwnProperty(t)||(e._$hooks[t]=`:r${o}:`,o++),e._$hooks[t]}};export const useId=Q(),useMemo=(o,e)=>{const[t,s]=useHook();if(!t._$hooks.hasOwnProperty(s))t._$hooks[s]={value:o(),dependencies:e};else{const a=t._$hooks[s];for(let i=0;i<e.length;i++)if(a.dependencies[i]!==e[i]){a.dependencies=e,a.value=o();break}}return t._$hooks[s].value},useReducer=(o,e)=>{const[t,s]=useHook(),n=s;if(!t._$hooks.hasOwnProperty(n)){const r=[e,c=>{const d=t._$hooks[n][0],l=o(d,c),p=Object.keys(l);for(const u of p)if(l[u]!==d[u]){t.requestRender();break}const m={...d,...l};t._$hooks[s][0]=m}];t._$hooks[s]=r}return t._$hooks[s]},useExposed=o=>{const e=$,t=Object.keys(o);for(const s of t)e[s]=o[s]};const W=(o,e,t)=>{const[s,n]=o;e&&e.addSuspense(s),s._$hooks[n].value=null,t().then(i=>{s.requestRender(),e.removeSuspense(s),s._$hooks[n].value=i}).catch(i=>console.error(i))};export const useAsync=(o,e)=>{const[t,s]=useHook(),n=A(t);if(!t._$hooks.hasOwnProperty(s))t._$hooks[s]={dependencies:e,value:null},W([t,s],n,o);else{const a=t._$hooks[s];let i=!1;for(let r=0;r<e.length;r++)if(a.dependencies[r]!==e[r]){a.dependencies=e,i=!0;break}i&&W([t,s],n,o)}return t._$hooks[s].value};const X=()=>{let o=0;return e=>{const t=`womp-context-provider-${o}`;o++;const s=defineWomp(({children:a})=>{const r=useRef(new Set);return useExposed({subscribers:r}),r.current.forEach(c=>c.requestRender()),html`${a}`},{name:t,cssModule:!1});return{name:t,Provider:s,default:e,subscribers:new Set}}};export const createContext=X(),useContext=o=>{const[e,t]=useHook();if(e._$usesContext=!0,!e._$hooks.hasOwnProperty(t)||e._$hasBeenMoved){let n=e;const a=o.name.toUpperCase();for(;n&&n.nodeName!==a&&n!==document.body;)n instanceof ShadowRoot?n=n.host:n=n.parentNode;const i=e._$hooks[t]?.node;if(n&&n!==document.body){n.subscribers.current.add(e);const r=e.onDisconnected;e.onDisconnected=()=>{n.subscribers.current.delete(e),r()}}else i&&i.subscribers.current.delete(e);e._$hooks[t]={node:n}}const s=e._$hooks[t].node;return s?s.props.value:o.default};export function html(o,...e){const t=[],s=o.length-1;if(S)t.push(...e);else for(let n=0;n<s;n++)o[n].endsWith("</")||t.push(e[n]);return{parts:o,values:t,_$wompHtml:!0}}export const wompDefaultOptions={shadow:!1,name:"",cssModule:!0},registeredComponents={};export function defineWomp(o,e){o.css||(o.css="");const t={...wompDefaultOptions,...e||{}};if(!t.name){let a=o.name.replace(/.[A-Z]/g,i=>`${i[0]}-${i[1].toLowerCase()}`).toLowerCase();a.includes("-")||(a+="-womp"),t.name=a}o.componentName=t.name,o._$wompF=!0;const[s,n]=B(o,t);if(o.css=s,o.options={generatedCSS:s,styles:n,shadow:t.shadow},!S){const a=J(o,t);o.class=a,customElements.define(t.name,a)}return registeredComponents[t.name]=o,o}export const lazy=o=>{let e=null;async function t(){return e||(e=(await o()).default,e)}return t._$wompLazy=!0,t};const A=o=>{let e=o;for(;e&&e.nodeName!==Suspense.componentName.toUpperCase();)e.parentNode===null&&e.host?e=e.host:e=e?.parentNode;return e};export function Suspense({children:o,fallback:e}){return this.loadingComponents||(this.loadingComponents=useRef(new Set).current),this.addSuspense=t=>{this.loadingComponents.size||this.requestRender(),this.loadingComponents.add(t)},this.removeSuspense=(t,s=null)=>{if(this.loadingComponents.delete(t),s){for(let n=0;n<o.nodes.length;n++)if(o.nodes[n]===t){o.nodes[n]=s;break}}this.loadingComponents.size||this.requestRender()},this.loadingComponents.size?html`${e}`:html`${o}`}defineWomp(Suspense,{name:"womp-suspense"});//! Test events on custom components
//! Test inputs (value attribute, specifically)
//! in DEV_MODE, handle errors nicely, in PRODUCTION, only console.error
//! Add ErrorBoundary component
