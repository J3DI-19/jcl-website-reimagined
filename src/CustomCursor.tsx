import { useEffect, useRef } from 'react';
import { ArrowUpRight, Plus } from 'lucide-react';

type CursorMode = 'default' | 'link' | 'view' | 'explore' | 'magnetic';

const cursorInk=(accent:string)=>{
 const hex=accent.trim().match(/^#([\da-f]{6})$/i)?.[1];
 if(!hex)return '#0b0c12';
 const red=parseInt(hex.slice(0,2),16);
 const green=parseInt(hex.slice(2,4),16);
 const blue=parseInt(hex.slice(4,6),16);
 return (red*299+green*587+blue*114)/1000<145?'#f7f7f8':'#0b0c12';
};

export function CustomCursor(){
 const cursorRef=useRef<HTMLDivElement>(null);
 const ringRef=useRef<HTMLDivElement>(null);
 const dotRef=useRef<HTMLDivElement>(null);

 useEffect(()=>{
  const cursor=cursorRef.current,ring=ringRef.current,dot=dotRef.current;
  if(!cursor||!ring||!dot)return;
  const fine=window.matchMedia('(hover: hover) and (pointer: fine)');
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  let targetX=0,targetY=0,ringX=0,ringY=0,frame=0,enabled=false,visible=false;
  let magnetic:HTMLElement|null=null;
  let artwork:HTMLElement|null=null;

  const resetMagnetic=()=>{
   if(!magnetic)return;
   magnetic.style.removeProperty('--mag-x');
   magnetic.style.removeProperty('--mag-y');
   magnetic=null;
  };
  const resetArtwork=()=>{
   if(!artwork)return;
   artwork.style.removeProperty('--art-x');
   artwork.style.removeProperty('--art-y');
   artwork=null;
  };
  const hide=()=>{
   visible=false;
   cursor.classList.remove('is-visible');
   document.body.classList.remove('jcl-cursor-on');
   resetMagnetic();
   resetArtwork();
   cancelAnimationFrame(frame);frame=0;
  };
  const tick=()=>{
   frame=0;
   if(!visible)return;
   ringX+=(targetX-ringX)*.24;
   ringY+=(targetY-ringY)*.24;
   ring.style.transform=`translate3d(${ringX}px,${ringY}px,0) translate(-50%,-50%)`;
   if(Math.abs(targetX-ringX)+Math.abs(targetY-ringY)>.2)frame=requestAnimationFrame(tick);
  };
  const schedule=()=>{if(!frame)frame=requestAnimationFrame(tick)};
  const updateState=()=>{
   if(!enabled||!visible)return;
   if(targetX>=document.documentElement.clientWidth||targetY>=document.documentElement.clientHeight){hide();return}
   const element=document.elementFromPoint(targetX,targetY) as HTMLElement|null;
   if(!element||element.closest('dialog, input, textarea, select, [contenteditable="true"]')){hide();return}
   const target=element.closest<HTMLElement>('[data-cursor], a, button');
   let mode=(target?.dataset.cursor as CursorMode|undefined)??(target?'link':'default');
   if(!['default','link','view','explore','magnetic'].includes(mode))mode='link';
   cursor.dataset.mode=mode;
   const explore=element.closest<HTMLElement>('.explore');
   const hero=element.closest<HTMLElement>('.hero');
   const inLight=element.closest('.light');
   const inContact=element.closest('.contact');
   const machine=element.closest<HTMLElement>('.machine');
   cursor.dataset.surface=inLight?'light':machine?'themed':'dark';
   let accent=target?.dataset.cursorAccent||explore?.style.getPropertyValue('--explore-accent')||'#c8ff44';
   if(hero?.classList.contains('keyword-0'))accent='#bba7ff';
   if(hero?.classList.contains('keyword-2'))accent='#72ddff';
   if(inLight)accent='#13161b';
   if(inContact)accent=element.closest('.contact-button')?'#13161b':'#c8ff44';
   if(machine?.classList.contains('bold'))accent='#13161b';
   if(machine?.classList.contains('playful'))accent='#381342';
   if(machine?.classList.contains('futuristic'))accent='#72ddff';
   cursor.style.setProperty('--cursor-accent',accent);
   cursor.style.setProperty('--cursor-ink',cursorInk(accent));
   const nextMagnetic=target?.dataset.cursor==='magnetic'?target:null;
   if(nextMagnetic!==magnetic)resetMagnetic();
   if(nextMagnetic){
    magnetic=nextMagnetic;
    const rect=magnetic.getBoundingClientRect();
    const x=Math.max(-7,Math.min(7,(targetX-rect.left-rect.width/2)*.12));
    const y=Math.max(-7,Math.min(7,(targetY-rect.top-rect.height/2)*.12));
    magnetic.style.setProperty('--mag-x',`${x}px`);
    magnetic.style.setProperty('--mag-y',`${y}px`);
   }
   const nextArtwork=target?.dataset.cursor==='view'?target:null;
   if(nextArtwork!==artwork)resetArtwork();
   if(nextArtwork){
    artwork=nextArtwork;
    const rect=artwork.getBoundingClientRect();
    artwork.style.setProperty('--art-x',`${(targetX-rect.left-rect.width/2)*.018}px`);
    artwork.style.setProperty('--art-y',`${(targetY-rect.top-rect.height/2)*.018}px`);
   }
  };
  const move=(event:PointerEvent)=>{
   if(!enabled||event.pointerType!=='mouse')return;
   targetX=event.clientX;targetY=event.clientY;
   if(!visible){ringX=targetX;ringY=targetY;visible=true;cursor.classList.add('is-visible')}
   dot.style.transform=`translate3d(${targetX}px,${targetY}px,0) translate(-50%,-50%)`;
   document.body.classList.add('jcl-cursor-on');
   updateState();schedule();
  };
  const refresh=()=>{enabled=fine.matches&&!reduced.matches;if(!enabled)hide()};
  const leave=(event:PointerEvent)=>{if(!event.relatedTarget)hide()};
  const down=(event:PointerEvent)=>{if(event.pointerType==='mouse'&&visible)cursor.classList.add('is-pressed')};
  const up=()=>cursor.classList.remove('is-pressed');
  const dialog=document.querySelector('dialog');
  const dialogObserver=dialog?new MutationObserver(()=>{if(dialog.open)hide()}):null;
  if(dialog)dialogObserver?.observe(dialog,{attributes:true,attributeFilter:['open']});
  refresh();
  fine.addEventListener('change',refresh);reduced.addEventListener('change',refresh);
  window.addEventListener('pointermove',move,{passive:true});
  window.addEventListener('pointerover',move,{passive:true});
  window.addEventListener('pointerdown',down,{passive:true});
  window.addEventListener('pointerup',up,{passive:true});
  window.addEventListener('pointercancel',up,{passive:true});
  window.addEventListener('pointerout',leave,{passive:true});
  document.documentElement.addEventListener('pointerleave',hide,{passive:true});
  window.addEventListener('scroll',updateState,{passive:true});
  window.addEventListener('blur',hide);
  return()=>{
   fine.removeEventListener('change',refresh);reduced.removeEventListener('change',refresh);
   window.removeEventListener('pointermove',move);window.removeEventListener('pointerover',move);
   window.removeEventListener('pointerdown',down);window.removeEventListener('pointerup',up);
   window.removeEventListener('pointercancel',up);window.removeEventListener('pointerout',leave);
   document.documentElement.removeEventListener('pointerleave',hide);
   window.removeEventListener('scroll',updateState);window.removeEventListener('blur',hide);
   dialogObserver?.disconnect();
   hide();
  };
 },[]);

 return <div className="jcl-cursor" ref={cursorRef} data-mode="default" aria-hidden="true"><div className="jcl-cursor-dot" ref={dotRef}/><div className="jcl-cursor-ring" ref={ringRef}><span className="jcl-cursor-orbit"/><span className="jcl-cursor-action"><span className="jcl-cursor-view">VIEW <ArrowUpRight size={14}/></span><ArrowUpRight className="jcl-cursor-link" size={21}/><Plus className="jcl-cursor-explore" size={22}/></span></div></div>;
}
