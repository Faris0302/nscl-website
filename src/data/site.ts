export type NavItem = { title: string; path: string; children: { name: string; path: string }[] };

// Same menu and URLs as the current nscl-website.vercel.app
export const nav: NavItem[] = [
  { title: 'Our Company', path: '/about-us', children: [
    { name: 'About Us', path: '/about-us' },
    { name: 'Our Vision & Mission', path: '/about-us#our' },
    { name: 'Our Values', path: '/about-us#our-values' },
    { name: 'Our Leadership', path: '/our-leadership' },
    { name: 'Our Journey', path: '/our-journey' },
    { name: 'Our Collaborations', path: '/our-collaboration' },
  ] },
  { title: 'Sustainability', path: '/sustainability', children: [
    { name: 'Environmental Initiatives', path: '/sustainability#Environmental' },
    { name: 'Health & Safety', path: '/health-safety' },
  ] },
  { title: 'DRI Technology', path: '/dri-technology', children: [
    { name: 'Technology Overview', path: '/dri-technology#technology' },
    { name: 'Strategic Significance', path: '/dri-technology#significance' },
    { name: 'MIDREX Process Flow', path: '/dri-technology#process' },
    { name: 'Plant Demonstration Test', path: '/dri-technology#plant' },
  ] },
  { title: 'Products', path: '/products', children: [
    { name: 'DRI Overview', path: '/products#dri' },
    { name: 'CDRI (Cold DRI)', path: '/products#cdri' },
    { name: 'HDRI (Hot DRI)', path: '/products#hdri' },
    { name: 'HBI (Hot Briquetted Iron)', path: '/products#hbi' },
  ] },
  { title: 'Projects', path: '/projects', children: [
    { name: 'Beneficiation Plant', path: '/projects#beneficiation' },
    { name: 'Pelletization Plant', path: '/projects#pelletization' },
    { name: 'Forward Integration Plant', path: '/projects#forward' },
    { name: 'Q-Engineering Services', path: '/q-engineering' },
  ] },
  { title: 'Careers', path: '/hr-careers', children: [
    { name: 'Future Of Steel', path: '/hr-careers#future-of-steel' },
    { name: 'Creating Strength', path: '/hr-careers#creating-strength' },
    { name: 'Why Work At NSCL', path: '/hr-careers#work-at-nscl' },
    { name: 'Current Job Openings', path: '/hr-careers#openings' },
    { name: 'How To Apply', path: '/hr-careers#how-to-apply' },
  ] },
];

export const contact = {
  email: 'info@nscl.com.pk',
  sales: 'sales@nscl.com.pk',
  careers: 'careers@nscl.com.pk',
  phone: '+92 21 35641607',
  head: 'Block-D, 1st Floor, Finance & Trade Centre (FTC), Main Shahrah-e-Faisal, Karachi, Sindh, Pakistan',
  plant: 'Plot DP-12, Sector 1-B, Port Qasim Industrial Zone, Bin Qasim, Karachi, Pakistan',
  headMap: { embed: 'https://www.google.com/maps?q=24.8584457,67.0522474&output=embed', link: 'https://www.google.com/maps?q=24.8584457,67.0522474' },
  plantMap: { embed: 'https://www.google.com/maps?q=24.7874375,67.3533125&output=embed', link: 'https://www.google.com/maps?q=24.7874375,67.3533125' },
};

// Form services used by the current site (same endpoints, so submissions keep arriving where they do today)
export const forms = {
  contact: 'https://formspree.io/f/xzebrvag',
  careers: { url: 'https://splitforms.com/api/submit', accessKey: 'b97d9b97e91b4bf0b1596d1fe79287a9' },
};

export const groupEntities = [
  { name: 'AlHadeed Pelletization Company Limited', url: 'https://apcl.com.pk/' },
  { name: 'AlHadeed Extraction Company Limited', url: 'https://aecl.pk/' },
  { name: 'Q Engineering Services', url: 'https://qes-peach.vercel.app/' },
];

export const social = [
  { name: 'Facebook', url: 'https://web.facebook.com/tuwairqisteelmillslimited/' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/company/national-steel-complex-limited' },
];
