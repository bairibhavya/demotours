export const rupees = value => `₹${new Intl.NumberFormat('en-IN',{maximumFractionDigits:0}).format(Number(value)||0)}`;
export const slugify = str => String(str||'').toLowerCase().trim().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
export const clean = value => String(value||'').normalize('NFKD').toLocaleLowerCase('en-IN').trim();
export function prefixMatch(value, query){
 const q=clean(query); if(!q)return true;
 const words=clean(value).split(/[^a-z0-9]+/).filter(Boolean);
 return clean(value).startsWith(q)||words.some(word=>word.startsWith(q));
}
const viteEnv = import.meta.env || {};
export const demoPhone = viteEnv.VITE_CONTACT_PHONE || '+91 90000 00000';
export const demoEmail = viteEnv.VITE_CONTACT_EMAIL || 'hello@example.com';
export const demoWhatsApp = (viteEnv.VITE_CONTACT_WHATSAPP || '919000000000').replace(/\D/g,'');
export const waLink = message => `https://wa.me/${demoWhatsApp}?text=${encodeURIComponent(message)}`;
export const shortDate = value => {if(!value)return 'Not scheduled'; const d=new Date(`${value}T12:00:00`);return Number.isNaN(d.getTime())?'Not scheduled':d.toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'});};
