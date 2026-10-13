/* ptr.js v4 (Oct 13 2026): cue restyled per deck picks 083 B (Numbered Rows, Lagoon) + 090 A (Fold-Out, Jungle). v3 behavior unchanged.
   Pull-to-refresh drop-in. Include: <script src="ptr.js" defer></script>
   Skips touches that start on canvas or [data-ptr-ignore] (3D viewers, swipe cards). */
(function(){
  var html=document.documentElement;
  html.style.overscrollBehaviorY='auto';
  if(document.body)document.body.style.overscrollBehaviorY='auto';
  var y0=null,x0=0,dx=0,d=0,T=70,ind=document.createElement('div');
  ind.setAttribute('aria-hidden','true');
  var H=-120,LAG='#0E7C86',JUN='#0B6E4F';
  ind.style.cssText='position:fixed;top:0;left:50%;z-index:99999;width:190px;margin-left:-95px;padding:8px 12px;border:1px solid #e5e5e5;border-top:3px solid '+LAG+';border-radius:0 0 10px 10px;background:#fff;box-shadow:0 4px 12px rgba(0,0,0,.12);font:600 13px/1.2 Hind,system-ui,sans-serif;color:#0a0a0a;transform:translateY('+H+'px);transform-origin:top;transition:none;pointer-events:none';
  function row(n,t){return '<div style="display:flex;align-items:center;gap:8px;padding:3px 0"><span data-n style="flex:none;width:20px;height:20px;border-radius:50%;background:'+LAG+';color:#fff;font-size:11px;display:flex;align-items:center;justify-content:center">'+n+'</span><span>'+t+'</span></div>';}
  ind.innerHTML=row(1,'Pull Down')+row(2,'Release To Refresh');
  function cue(p,ready){var n=ind.querySelectorAll('[data-n]'),r=ind.children[1];n[1].style.background=ready?JUN:'#c4c4c4';r.style.color=ready?JUN:'#737373';ind.style.borderTopColor=ready?JUN:LAG;ind.style.transform='translateY('+(H+Math.min(p,80)*1.5)+'px) scaleY('+(0.6+Math.min(p/80,1)*0.4)+')';}
  function hide(){ind.style.transform='translateY('+H+'px)';}
  function add(){document.body.appendChild(ind);}
  document.body?add():document.addEventListener('DOMContentLoaded',add);
  function inner(t){for(var e=t;e&&e!==document.body&&e!==html;e=e.parentElement){if(e.scrollTop>0)return true;}return false;}
  function top(){return (window.scrollY||html.scrollTop)<=0;}
  function ignore(t){return !!(t&&t.closest&&t.closest('canvas,[data-ptr-ignore],[data-swipe],input,textarea,select,[contenteditable],dialog[open],[aria-modal="true"],.card,.swipe,.deck'));}
  window.addEventListener('touchstart',function(e){y0=(top()&&e.touches.length===1&&!ignore(e.target)&&!inner(e.target))?e.touches[0].clientY:null;x0=e.touches[0].clientX;dx=0;d=0;},{passive:true});
  window.addEventListener('touchmove',function(e){if(y0===null)return;d=e.touches[0].clientY-y0;dx=Math.abs(e.touches[0].clientX-x0);if(dx>Math.abs(d)){y0=null;hide();return;}if(d<=0||!top()){hide();return;}var p=Math.min(d/2,90);cue(p,p>=T);},{passive:true});
  window.addEventListener('touchend',function(){if(y0===null)return;ind.style.transition='transform .2s';if(d/2>=T){cue(80,true);setTimeout(function(){var u=new URL(location.href);u.searchParams.set('v',Date.now());location.replace(u.toString());},150);}else{hide();}setTimeout(function(){ind.style.transition='none';},220);y0=null;},{passive:true});
})();
