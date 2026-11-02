import React,{useEffect,useMemo,useRef,useState} from 'react';
import {Link,useNavigate} from 'react-router-dom';
import {ArrowRight,Heart,MapPin,Star,Clock3,ChevronDown,Search,Minus,Plus,X,Check,ArrowUpRight} from 'lucide-react';
import {motion} from 'framer-motion';
import {DESTINATIONS} from '../data';
import {prefixMatch,rupees,clean} from '../lib/format';
export function Photo({src,fallback,alt='',className='',loading='lazy',...props}){
 const [failed,setFailed]=useState(false);
 useEffect(()=>{setFailed(false);},[src]);
 return <img {...props} src={failed?(fallback||'/images/kerala-fallback.jpg'):(src||fallback)} onError={()=>setFailed(true)} alt={alt} loading={loading} className={className}/>;
}
export function Reveal({children,className='',delay=0,...props}){
 return <motion.div {...props} className={className} initial={{opacity:0,y:25}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:0.12}} transition={{duration:.65,delay,ease:[.2,.65,.2,1]}}>{children}</motion.div>;
}
export function SectionHead({eyebrow,title,sub,action,light=false}){
 return <div className={`section-head ${light?'section-head-light':''}`}><div>{eyebrow&&<span className="eyebrow">{eyebrow}</span>}<h2>{title}</h2>{sub&&<p>{sub}</p>}</div>{action&&<div className="section-head-action">{action}</div>}</div>;
}
export function PackageCard({item,compact=false}){
 const {title,slug,image,fallback,days,nights,destination,price,rating,reviewCount,featured}=item;
 return <Link to={`/packages/${slug}`} className={`package-card ${compact?'package-card-compact':''}`}>
   <div className="package-photo-wrap"><Photo src={image} fallback={fallback} alt={`${destination} tour`} className="package-photo"/><span className="photo-top-tag">{item.badge||destination}</span><span className="card-heart" title={featured?'Featured':'Tour package'}><Heart size={16} fill={featured?'currentColor':'none'}/></span></div>
   <div className="package-card-body"><div className="package-card-sub"><span><MapPin size={13}/>{destination}</span><span><Clock3 size={13}/>{days} Days · {nights} Nights</span></div><h3>{title}</h3><div className="rating-line"><Star size={14} fill="currentColor"/> {rating} <span>({reviewCount} demo reviews)</span></div><div className="package-card-bottom"><div><strong>{rupees(price)}</strong><small>/ person</small></div><span className="card-round-arrow"><ArrowUpRight size={17}/></span></div></div>
 </Link>;
}
export function DestinationCard({destination,large=false}){
 return <Link className={`destination-card ${large?'destination-card-lg':''}`} to={`/packages?destination=${encodeURIComponent(destination.name)}`}>
   <Photo src={destination.image} fallback={destination.fallback} alt={destination.name} className="destination-card-photo"/>
   <div className="destination-card-content"><strong>{destination.name}</strong><span>{destination.tagline}</span></div><span className="destination-arrow"><ArrowRight size={17}/></span>
 </Link>;
}
export function DestinationSuggest({value,onChange,placeholder='Search destinations',onSelect,mini=false}){
 const [open,setOpen]=useState(false); const root=useRef(null);
 const matches=useMemo(()=>value.trim()?DESTINATIONS.filter(d=>prefixMatch(d.name,value)||prefixMatch(d.tagline,value)).slice(0,6):DESTINATIONS.slice(0,5),[value]);
 useEffect(()=>{const fn=e=>{if(root.current&&!root.current.contains(e.target))setOpen(false)};document.addEventListener('pointerdown',fn);return()=>document.removeEventListener('pointerdown',fn)},[]);
 return <div className={`destination-suggest ${mini?'mini':''}`} ref={root}>
   <Search size={18} className="suggest-icon"/><input aria-label="Search destinations" value={value} onChange={e=>{onChange(e.target.value);setOpen(true)}} onFocus={()=>setOpen(true)} onKeyDown={e=>{if(e.key==='Escape')setOpen(false);if(e.key==='Enter'){e.preventDefault();if(matches[0]){onSelect?.(matches[0].name);setOpen(false)}}}} autoComplete="off" placeholder={placeholder}/>{value&&<button type="button" className="suggest-clear" aria-label="Clear search" onClick={()=>{onChange('');setOpen(true)}}><X size={14}/></button>}
   {open&&<div className="suggest-menu" role="listbox"><div className="suggest-caption">{value?'Matching destinations · updates as you type':'Popular destinations'}</div>{matches.length?matches.map(d=><button key={d.id} type="button" role="option" aria-selected={clean(value)===clean(d.name)} onClick={()=>{onSelect?.(d.name);setOpen(false)}}><MapPin size={14}/><span>{d.name}</span><small>{d.region}</small></button>):<p className="suggest-empty">No matching destinations. Try a different name.</p>}</div>}
 </div>;
}
export function TravelerPicker({value,onChange}){
 const [open,setOpen]=useState(false);const ref=useRef(null);
 useEffect(()=>{const fn=e=>{if(ref.current&&!ref.current.contains(e.target))setOpen(false)};document.addEventListener('pointerdown',fn);return()=>document.removeEventListener('pointerdown',fn)},[]);
 return <div className="traveler-picker" ref={ref}><button type="button" onClick={()=>setOpen(p=>!p)} className="traveler-trigger"><strong>{value} {value===1?'Traveller':'Travellers'}</strong><small>Guests</small><ChevronDown size={15}/></button>{open&&<div className="traveler-pop"><b>Travellers</b><div><button type="button" aria-label="Decrease travellers" disabled={value<=1} onClick={()=>onChange(Math.max(1,value-1))}><Minus size={16}/></button><strong>{value}</strong><button type="button" aria-label="Increase travellers" disabled={value>=12} onClick={()=>onChange(Math.min(12,value+1))}><Plus size={16}/></button></div><button className="traveler-done" type="button" onClick={()=>setOpen(false)}>Done <Check size={14}/></button></div>}</div>;
}
export function FloatingWhatsApp(){return <a className="floating-whatsapp" href="#contact-section" onClick={e=>{const el=document.getElementById('contact-section');if(!el){return;}e.preventDefault();el.scrollIntoView({behavior:'smooth'})}} title="Contact our travel team"><ArrowUpRight size={19}/></a>}
export function EmptyState({title,description,action}){return <div className="empty-state"><Search size={30}/><h3>{title}</h3><p>{description}</p>{action}</div>}
export function Stars({rating=5}){return <span className="stars" aria-label={`${rating} out of 5 stars`}>{Array.from({length:5},(_,i)=><Star key={i} size={13} fill={i<Math.round(rating)?'currentColor':'none'}/>)}</span>}
export function DemoNotice({compact=false}){return <div className={`demo-notice ${compact?'demo-notice-compact':''}`}><strong>Demo website.</strong> Packages, prices, reviews and enquiry/booking records are illustrative. This preview does not process payments or send requests to a live travel agency.</div>}
