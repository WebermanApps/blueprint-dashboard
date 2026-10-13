/* Pull-to-refresh drop-in. Include: <script src="ptr.js" defer></script>
   Skips touches that start on canvas or [data-ptr-ignore] (3D viewers, swipe cards). */
(function(){
  var html=document.documentElement;
  html.style.overscrollBehaviorY='auto';
  if(document.body)document.body.style.overscrollBehaviorY='auto';
  var y0=null,d=0,T=70,ind=document.createElement('div');
  ind.setAttribute('aria-hidden','true');
  ind.style.cssText='position:fixed;top:0;left:50%;z-index:99999;width:36px;height:36px;margin-left:-18px;border-radius:50%;background:#fff;box-shadow:0 2px 8px rgba(0,0,0,.15);display:flex;align-items:center;justify-content:center;transform:translateY(-48px);transition:none;pointer-events:none';
  ind.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#333" stroke-width="2" stroke-linecap="round"><path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 3v6h-6"/></svg>';
  function add(){document.body.appendChild(ind);}
  document.body?add():document.addEventListener('DOMContentLoaded',add);
  function top(){return (window.scrollY||html.scrollTop)<=0;}
  function ignore(t){return !!(t&&t.closest&&t.closest('canvas,[data-ptr-ignore]'));}
  window.addEventListener('touchstart',function(e){y0=(top()&&e.touches.length===1&&!ignore(e.target))?e.touches[0].clientY:null;d=0;},{passive:true});
  window.addEventListener('touchmove',function(e){if(y0===null)return;d=e.touches[0].clientY-y0;if(d<=0||!top()){ind.style.transform='translateY(-48px)';return;}var p=Math.min(d/2,90);ind.style.transform='translateY('+(p-36)+'px) rotate('+(p*4)+'deg)';},{passive:true});
  window.addEventListener('touchend',function(){if(y0===null)return;ind.style.transition='transform .2s';if(d/2>=T){ind.style.transform='translateY(16px)';setTimeout(function(){location.reload();},150);}else{ind.style.transform='translateY(-48px)';}setTimeout(function(){ind.style.transition='none';},220);y0=null;},{passive:true});
})();
