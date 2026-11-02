import React, {createContext,useContext,useEffect,useMemo,useState} from 'react';
import {INITIAL_PACKAGES,INITIAL_TESTIMONIALS} from '../data';
const KEY='voyage-trails-demo-v3';
const clone = value => JSON.parse(JSON.stringify(value));
const defaultState = () => ({packages:clone(INITIAL_PACKAGES),testimonials:clone(INITIAL_TESTIMONIALS),enquiries:[],bookings:[],settings:{companyName:'Voyage Trails',tagline:'Curated journeys. Unforgettable memories.'}});
function initialState(){
 try{const stored=JSON.parse(localStorage.getItem(KEY));return stored&&Array.isArray(stored.packages)&&Array.isArray(stored.bookings)&&Array.isArray(stored.enquiries)?stored:defaultState();}
 catch{return defaultState();}
}
const StoreContext=createContext(null);
export function StoreProvider({children}){
 const [state,setState]=useState(initialState);
 useEffect(()=>{try{localStorage.setItem(KEY,JSON.stringify(state));}catch(e){console.warn('Demo browser storage unavailable',e);}},[state]);
 const api=useMemo(()=>({
  ...state,
  addEnquiry:(input)=>{const item={...input,id:crypto.randomUUID(),createdAt:new Date().toISOString(),status:'New'};setState(s=>({...s,enquiries:[item,...s.enquiries]}));return item;},
  addBooking:(input)=>{const item={...input,id:crypto.randomUUID(),createdAt:new Date().toISOString(),status:'Requested'};setState(s=>({...s,bookings:[item,...s.bookings]}));return item;},
  updateEnquiry:(id,patch)=>setState(s=>({...s,enquiries:s.enquiries.map(x=>x.id===id?{...x,...patch}:x)})),
  updateBooking:(id,patch)=>setState(s=>({...s,bookings:s.bookings.map(x=>x.id===id?{...x,...patch}:x)})),
  savePackage:(p)=>setState(s=>({...s,packages:s.packages.some(x=>x.id===p.id)?s.packages.map(x=>x.id===p.id?p:x):[p,...s.packages]})),
  deletePackage:(id)=>setState(s=>({...s,packages:s.packages.filter(x=>x.id!==id)})),
  toggleFavorite:(id)=>setState(s=>({...s,packages:s.packages.map(x=>x.id===id?{...x,featured:!x.featured}:x)})),
  saveSettings:(patch)=>setState(s=>({...s,settings:{...s.settings,...patch}})),
  resetDemo:()=>setState(defaultState()),
 }),[state]);
 return <StoreContext.Provider value={api}>{children}</StoreContext.Provider>;
}
export function useStore(){const val=useContext(StoreContext);if(!val)throw Error('StoreProvider is missing');return val;}
