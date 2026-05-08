import{r as d,j as e,F as g,e as b,h as j}from"./vendor-DGA4RRtu.js";import{B as v,d as w}from"./index-DkPBKVyY.js";import{g as N,a as y,f as k,R as E}from"./ResearchEmptyState-By-GQPRl.js";const R=(s,l,c)=>{const r=[];let a="";return l&&(a+=`**EXECUTIVE_SUMMARY**
${l}

`),s?(s.split(`
`).forEach(n=>{if(n.trim()===""){a+=`
`;return}n.split(" ").forEach(o=>{a.length+o.length>c?(r.push(a.trim()),a=o+" "):a+=o+" "}),a+=`

`}),a.trim()!==""&&r.push(a.trim()),r):r.length?[a]:[]},S=({research:s})=>{var f;const[l,c]=d.useState([]),[r,a]=d.useState(0),[m,n]=d.useState("");if(d.useEffect(()=>{const t=()=>{if(s){const x=window.innerWidth;let p=3500;x<640?p=1e3:x<1024&&(p=2e3),c(R(s.body,s.abstract,p)),a(0)}};return t(),window.addEventListener("resize",t),()=>window.removeEventListener("resize",t)},[s]),!s||l.length===0)return null;const i=N(s),o=y(s),h=()=>{r>=l.length-1||m||(n("flip-next"),setTimeout(()=>a(t=>t+1),300),setTimeout(()=>n(""),600))},u=()=>{r<=0||m||(n("flip-prev"),setTimeout(()=>a(t=>t-1),300),setTimeout(()=>n(""),600))};return e.jsxs("div",{className:"mx-auto w-full max-w-[1000px]",children:[e.jsxs("header",{className:"mb-6 px-5 text-center sm:mb-10 sm:px-0",children:[e.jsx("span",{className:"mb-3 inline-block rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-500",children:s.field||"General Insight"}),e.jsx("h1",{className:"text-[clamp(1.5rem,5vw,2.5rem)] font-extrabold leading-tight tracking-tight text-slate-900 text-balance",children:s.title}),e.jsxs("div",{className:"mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-500",children:[e.jsx("span",{className:"font-semibold text-slate-800",children:s.authorName||"Anonymous"}),e.jsx("span",{children:"•"}),e.jsx("time",{children:k(s)})]})]}),e.jsxs("div",{className:"mx-auto flex h-[80vh] min-h-[550px] w-full flex-col overflow-hidden border-y border-slate-200 bg-white sm:h-[650px] sm:rounded-[2rem] sm:border sm:shadow-2xl",children:[e.jsxs("div",{className:"z-10 flex w-full shrink-0 items-center justify-between border-b border-slate-50 bg-white px-6 py-4 sm:px-10",children:[e.jsx("span",{className:"text-[9px] font-bold uppercase tracking-widest text-slate-400",children:"Archive Reader"}),e.jsxs("span",{className:"text-[9px] font-bold uppercase tracking-widest text-slate-400",children:["Spread ",r+1," / ",l.length]})]}),e.jsxs("div",{className:"relative flex-1 bg-white [perspective:2500px]",children:[e.jsx("div",{className:"pointer-events-none absolute bottom-0 left-1/2 top-0 z-0 hidden w-20 -translate-x-1/2 bg-[linear-gradient(to_right,rgba(0,0,0,0)_0%,rgba(0,0,0,0.02)_50%,rgba(0,0,0,0)_100%)] sm:block"}),e.jsx("div",{className:`absolute inset-0 overflow-hidden bg-transparent px-6 py-6 sm:px-10 sm:py-8 md:px-14 ${m}`,children:e.jsx("div",{className:"h-full w-full columns-1 gap-12 sm:columns-2 sm:[column-rule:1px_solid_rgba(0,0,0,0.03)] sm:[column-fill:auto]",children:(f=l[r])==null?void 0:f.split(`

`).map((t,x)=>t.includes("**EXECUTIVE_SUMMARY**")?e.jsx("p",{className:"mb-6 break-inside-avoid text-[14px] font-bold leading-relaxed text-slate-800 sm:text-[16px]",children:t.replace("**EXECUTIVE_SUMMARY**","").trim()},x):e.jsx("p",{className:"mb-5 text-[13.5px] leading-relaxed text-slate-700 text-justify sm:text-[14.5px] sm:leading-[1.8] tracking-tight",children:t},x))})})]}),e.jsxs("div",{className:"z-10 flex shrink-0 items-center justify-between border-t border-slate-50 bg-slate-50/30 px-6 py-4",children:[e.jsxs("button",{onClick:u,disabled:r===0,className:"flex items-center gap-2 rounded-full border border-slate-100 bg-white px-5 py-2 text-[10px] font-bold text-slate-500 transition-all hover:text-teal-600 disabled:opacity-20",children:[e.jsx("i",{className:"fa-solid fa-arrow-left-long"})," ",e.jsx("span",{className:"hidden sm:inline",children:"Previous Spread"})]}),e.jsxs("button",{onClick:h,disabled:r===l.length-1,className:"flex items-center gap-2 rounded-full bg-slate-900 px-6 py-2 text-[10px] font-bold text-white shadow-md transition-all hover:bg-teal-600 disabled:opacity-20",children:[e.jsx("span",{className:"hidden sm:inline",children:"Next Spread"})," ",e.jsx("i",{className:"fa-solid fa-arrow-right-long"})]})]})]}),(i.length>0||o.length>0)&&e.jsx("div",{className:"mt-10 px-5 sm:px-0",children:e.jsxs("div",{className:"grid gap-8 border-t border-slate-100 py-10 md:grid-cols-2",children:[o.length>0&&e.jsxs("div",{children:[e.jsx("h3",{className:"mb-4 text-[10px] font-bold uppercase tracking-widest text-slate-400",children:"Keywords"}),e.jsx("div",{className:"flex flex-wrap gap-2",children:o.map(t=>e.jsxs("span",{className:"rounded-full bg-slate-100 px-3 py-1.5 text-[10px] font-medium text-slate-500",children:["#",t]},t))})]}),i.length>0&&e.jsxs("div",{children:[e.jsx("h3",{className:"mb-4 text-[10px] font-bold uppercase tracking-widest text-slate-400",children:"Scientific Sources"}),e.jsx("ol",{className:"list-inside list-decimal space-y-2 text-[11px] text-slate-500",children:i.map(t=>e.jsx("li",{children:e.jsx("a",{href:t,target:"_blank",rel:"noopener noreferrer",className:"break-all hover:text-teal-600 underline underline-offset-4 decoration-slate-200",children:t.replace(/^https?:\/\/(www\.)?/,"")})},t))})]})]})}),e.jsx("style",{dangerouslySetInnerHTML:{__html:`
        @keyframes flipPageNext {
          0% { transform: rotateY(0deg); }
          50% { transform: rotateY(-90deg); }
          50.1% { transform: rotateY(90deg); }
          100% { transform: rotateY(0deg); }
        }
        @keyframes flipPagePrev {
          0% { transform: rotateY(0deg); }
          50% { transform: rotateY(90deg); }
          50.1% { transform: rotateY(-90deg); }
          100% { transform: rotateY(0deg); }
        }
        
        .flip-next { 
          transform-origin: left center; 
          animation: flipPageNext 0.6s ease-in-out forwards; 
          transform-style: preserve-3d; 
          backface-visibility: hidden;
        }
        
        .flip-prev { 
          transform-origin: right center; 
          animation: flipPagePrev 0.6s ease-in-out forwards; 
          transform-style: preserve-3d; 
          backface-visibility: hidden;
        }

        /* Desktop: Book-like flip from the spine (center) */
        @media (min-width: 640px) {
          .flip-next, .flip-prev {
            transform-origin: center center;
          }
        }
      `}})]})},Y=()=>{const{researchId:s}=g(),[l,c]=d.useState(null),[r,a]=d.useState(!0);return d.useEffect(()=>{(async()=>{try{const n=b(w,"researches",s),i=await j(n);i.exists()&&c({id:i.id,...i.data()})}catch{}finally{a(!1)}})()},[s]),e.jsx("div",{className:"min-h-screen bg-white pb-24 transition-colors duration-300 sm:bg-slate-50/80 sm:py-8 lg:py-12",children:e.jsxs("div",{className:"mx-auto w-full max-w-[900px] sm:px-6",children:[e.jsx("nav",{className:"sticky top-0 z-40 flex w-full items-center justify-between border-b border-slate-100 bg-white/90 px-5 py-3 backdrop-blur-xl transition-all sm:static sm:mb-8 sm:border-none sm:bg-transparent sm:px-0 sm:py-0 sm:backdrop-blur-none",children:e.jsx(v,{to:"/research",label:"Library"})}),e.jsx("main",{className:"relative w-full",children:r?e.jsxs("div",{className:"flex min-h-[50vh] flex-col items-center justify-center py-[20vh] text-teal-600",children:[e.jsx("i",{className:"fa-solid fa-circle-notch fa-spin text-3xl sm:text-4xl"}),e.jsx("p",{className:"mt-5 text-[10px] font-bold uppercase tracking-widest text-slate-400 sm:text-[11px]",children:"Loading Manuscript"})]}):l?e.jsx("div",{className:"animate-in fade-in slide-in-from-bottom-4 w-full duration-700",children:e.jsx(S,{research:l})}):e.jsx("div",{className:"flex min-h-[50vh] flex-col items-center justify-center px-4 py-12",children:e.jsx(E,{message:"Document Not Found",subMessage:"This research might have been removed or the URL is incorrect."})})})]})})};export{Y as default};
