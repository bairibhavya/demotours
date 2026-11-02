import React from 'react';
import {Routes,Route,useLocation,Link} from 'react-router-dom';
import {Header,Footer,ScrollToTop} from './components/Layout';
import Home from './pages/Home';
import Packages from './pages/Packages';
import PackageDetails from './pages/PackageDetails';
import Destinations from './pages/Destinations';
import About from './pages/About';
import Reviews from './pages/Reviews';
import Contact from './pages/Contact';
import Booking from './pages/Booking';
import Admin from './pages/Admin';
import {DemoNotice} from './components/UI';
const StaticInfo=({kind})=><div className="container static-info"><span className="eyebrow">THE FINE PRINT</span><h1>{kind}</h1><p>Voyage Trails is a demonstration website. Package listings, prices, customer reviews and trip examples are illustrative and do not represent a real travel agent. Contact and booking requests are stored only in the browser's local demo storage. Do not enter sensitive personal or financial information.</p><p>For a live business, replace these placeholders with verified business details, publish accurate policies, and connect a secure booking backend before collecting personal information.</p><Link to="/">Return home →</Link></div>;
export default function App(){const loc=useLocation();const admin=loc.pathname.startsWith('/admin');return <><ScrollToTop/>{!admin&&<Header overlay={loc.pathname==='/'} />}{!admin&&<main id="main-content"><Routes><Route path="/" element={<Home/>}/><Route path="/packages" element={<Packages/>}/><Route path="/packages/:slug" element={<PackageDetails/>}/><Route path="/destinations" element={<Destinations/>}/><Route path="/about" element={<About/>}/><Route path="/reviews" element={<Reviews/>}/><Route path="/contact" element={<Contact/>}/><Route path="/book/:slug" element={<Booking/>}/><Route path="/privacy" element={<StaticInfo kind="Privacy & Demo Data"/>}/><Route path="/terms" element={<StaticInfo kind="Terms & Demo Information"/>}/><Route path="*" element={<div className="container not-found"><h1>Looks like you've wandered off the map.</h1><Link className="btn btn-teal" to="/">Back to home</Link></div>}/></Routes></main>}{admin&&<Admin/>}{!admin&&<Footer/>}</>}
