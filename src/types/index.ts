export type EditorMode = 'quick' | 'advanced';
export type QuickTab = 'content' | 'design';
export type ModalType = 'template' | 'download' | 'share' | 'fullscreen' | null;
export type ExportFormat = 'png' | 'jpg';
export type FlyerSize = 'instagram-story' | 'instagram-post' | 'facebook-post' | 'tiktok' | 'snapchat' | 'a4' | 'us-letter';

export interface FlyerDimensions {
  width: number;
  height: number;
  label: string;
}

export const FLYER_SIZES: Record<FlyerSize, FlyerDimensions> = {
  'instagram-story': { width: 1080, height: 1920, label: 'Instagram Story (1080 x 1920)' },
  'instagram-post': { width: 1080, height: 1350, label: 'Instagram Post (1080 x 1350)' },
  'facebook-post': { width: 1200, height: 630, label: 'Facebook Post (1200 x 630)' },
  'tiktok': { width: 1080, height: 1920, label: 'TikTok (1080 x 1920)' },
  'snapchat': { width: 1080, height: 1920, label: 'Snapchat (1080 x 1920)' },
  'a4': { width: 794, height: 1123, label: 'A4 Print (794 x 1123)' },
  'us-letter': { width: 816, height: 1056, label: 'US Letter (816 x 1056)' },
};

export interface FontOption {
  id: string;
  name: string;
  category: 'impactful' | 'elegant' | 'friendly' | 'utility';
  family: string;
  cssClass: string;
}

export const FONT_OPTIONS: FontOption[] = [
  { id: 'anton', name: 'Anton', category: 'impactful', family: 'Anton, sans-serif', cssClass: 'font-impactful-anton' },
  { id: 'bebas-neue', name: 'Bebas Neue', category: 'impactful', family: '"Bebas Neue", sans-serif', cssClass: 'font-impactful-bebas' },
  { id: 'oswald', name: 'Oswald', category: 'impactful', family: 'Oswald, sans-serif', cssClass: 'font-impactful-oswald' },
  { id: 'playfair', name: 'Playfair Display', category: 'elegant', family: '"Playfair Display", serif', cssClass: 'font-elegant-playfair' },
  { id: 'cormorant', name: 'Cormorant Garamond', category: 'elegant', family: '"Cormorant Garamond", serif', cssClass: 'font-elegant-cormorant' },
  { id: 'libre-baskerville', name: 'Libre Baskerville', category: 'elegant', family: '"Libre Baskerville", serif', cssClass: 'font-elegant-libre' },
  { id: 'fredoka', name: 'Fredoka', category: 'friendly', family: 'Fredoka, sans-serif', cssClass: 'font-friendly-fredoka' },
  { id: 'nunito', name: 'Nunito', category: 'friendly', family: 'Nunito, sans-serif', cssClass: 'font-friendly-nunito' },
  { id: 'space-grotesk', name: 'Space Grotesk', category: 'utility', family: '"Space Grotesk", sans-serif', cssClass: 'font-utility-space' },
  { id: 'atkinson', name: 'Atkinson Hyperlegible', category: 'utility', family: '"Atkinson Hyperlegible", sans-serif', cssClass: 'font-utility-atkinson' },
  { id: 'quattrocento', name: 'Quattrocento Sans', category: 'utility', family: '"Quattrocento Sans", sans-serif', cssClass: 'font-utility-quattrocento' },
];

export interface ColorOption {
  id: string;
  hex: string;
  name: string;
}

export const THEME_COLORS: ColorOption[] = [
  { id: 'black', hex: '#000000', name: 'Black' },
  { id: 'white', hex: '#FFFFFF', name: 'White' },
  { id: 'gray', hex: '#666666', name: 'Gray' },
  { id: 'cream', hex: '#F5F5DC', name: 'Cream' },
  { id: 'yellow', hex: '#FFD700', name: 'Yellow' },
  { id: 'orange', hex: '#FF8C00', name: 'Orange' },
  { id: 'red', hex: '#FF4444', name: 'Red' },
  { id: 'burgundy', hex: '#800020', name: 'Burgundy' },
  { id: 'pink', hex: '#FF69B4', name: 'Pink' },
  { id: 'purple', hex: '#8B008B', name: 'Purple' },
  { id: 'navy', hex: '#000080', name: 'Navy' },
  { id: 'blue', hex: '#1E90FF', name: 'Blue' },
  { id: 'teal', hex: '#008080', name: 'Teal' },
  { id: 'green', hex: '#228B22', name: 'Green' },
];

export const ACCENT_COLORS: ColorOption[] = [
  { id: 'yellow', hex: '#F7FF58', name: 'Yellow' },
  { id: 'orange', hex: '#FF8C00', name: 'Orange' },
  { id: 'red', hex: '#FF4444', name: 'Red' },
  { id: 'pink', hex: '#FF69B4', name: 'Pink' },
  { id: 'purple', hex: '#9B59B6', name: 'Purple' },
  { id: 'blue', hex: '#1E90FF', name: 'Blue' },
  { id: 'teal', hex: '#008080', name: 'Teal' },
  { id: 'green', hex: '#2ECC71', name: 'Green' },
  { id: 'white', hex: '#FFFFFF', name: 'White' },
  { id: 'black', hex: '#000000', name: 'Black' },
  { id: 'gray', hex: '#999999', name: 'Gray' },
  { id: 'gold', hex: '#D4AF37', name: 'Gold' },
];

export interface TemplateCategory {
  id: string;
  name: string;
}

export const TEMPLATE_CATEGORIES: TemplateCategory[] = [
  { id: 'events', name: 'Events' },
  { id: 'parties', name: 'Parties' },
  { id: 'sales', name: 'Sales' },
  { id: 'sports', name: 'Sports' },
  { id: 'food', name: 'Food' },
  { id: 'music', name: 'Music' },
  { id: 'church', name: 'Church' },
  { id: 'fashion', name: 'Fashion' },
  { id: 'realestate', name: 'Real Estate' },
  { id: 'tech', name: 'Tech' },
];

export interface FlyerTemplate {
  id: string;
  name: string;
  category: string;
  bgColor: string;
  accentColor: string;
  textPrimary: string;
  textSecondary: string;
  fontId: string;
  layout: 'classic' | 'modern' | 'split' | 'overlay' | 'minimal' | 'elegant' | 'bold' | 'gradient' | 'geometric' | 'card' | 'banner' | 'corner';
  defaultTitle: string;
  defaultSubtitle: string;
  defaultDate: string;
  defaultTime: string;
  defaultLocation: string;
}

export const TEMPLATES: FlyerTemplate[] = [
  // === EVENT TEMPLATES ===
  {
    id: 't1', name: 'Midnight Glow', category: 'events',
    bgColor: '#0A0A0A', accentColor: '#F7FF58', textPrimary: '#FFFFFF', textSecondary: '#B8B8B8',
    fontId: 'anton', layout: 'classic',
    defaultTitle: 'EVENT NAME', defaultSubtitle: 'Join us for an unforgettable night', defaultDate: 'Saturday, March 15', defaultTime: '8:00 PM', defaultLocation: 'Downtown Venue'
  },
  {
    id: 't2', name: 'Neon Nights', category: 'events',
    bgColor: '#0D1B20', accentColor: '#FF69B4', textPrimary: '#FFFFFF', textSecondary: '#AADDFF',
    fontId: 'bebas-neue', layout: 'modern',
    defaultTitle: 'PARTY NIGHT', defaultSubtitle: 'Music, Drinks & Good Vibes', defaultDate: 'Friday, April 20', defaultTime: '10:00 PM', defaultLocation: 'The Rooftop Bar'
  },
  {
    id: 't3', name: 'Electric Pulse', category: 'events',
    bgColor: '#1A0033', accentColor: '#00FFFF', textPrimary: '#FFFFFF', textSecondary: '#CC88DD',
    fontId: 'oswald', layout: 'gradient',
    defaultTitle: 'ELECTRIC NIGHT', defaultSubtitle: 'Feel the Energy', defaultDate: 'Saturday, June 7', defaultTime: '9:00 PM', defaultLocation: 'Club Voltage'
  },
  {
    id: 't4', name: 'Golden Hour', category: 'events',
    bgColor: '#FFF8E7', accentColor: '#D4AF37', textPrimary: '#2C1810', textSecondary: '#8B6B4C',
    fontId: 'playfair', layout: 'elegant',
    defaultTitle: 'Gala Evening', defaultSubtitle: 'An Exclusive Affair', defaultDate: 'Friday, September 12', defaultTime: '7:00 PM', defaultLocation: 'Grand Hotel Ballroom'
  },
  
  // === PARTY TEMPLATES ===
  {
    id: 't5', name: 'Birthday Blast', category: 'parties',
    bgColor: '#FF6B6B', accentColor: '#FFE66D', textPrimary: '#FFFFFF', textSecondary: '#FFECE6',
    fontId: 'fredoka', layout: 'bold',
    defaultTitle: 'BIRTHDAY BASH', defaultSubtitle: 'Come Celebrate With Us!', defaultDate: 'Saturday, Aug 16', defaultTime: '7:00 PM', defaultLocation: 'Party Palace'
  },
  {
    id: 't6', name: 'Confetti Pop', category: 'parties',
    bgColor: '#FFFFFF', accentColor: '#FF69B4', textPrimary: '#2D2D2D', textSecondary: '#666666',
    fontId: 'nunito', layout: 'card',
    defaultTitle: 'YOU\'RE INVITED', defaultSubtitle: 'Let\'s Celebrate Together', defaultDate: 'Sunday, May 25', defaultTime: '2:00 PM', defaultLocation: '123 Celebration Ave'
  },
  {
    id: 't7', name: 'Disco Fever', category: 'parties',
    bgColor: '#2D1B4E', accentColor: '#FF69B4', textPrimary: '#FFFFFF', textSecondary: '#D4A5E8',
    fontId: 'bebas-neue', layout: 'geometric',
    defaultTitle: 'DISCO NIGHT', defaultSubtitle: 'Get Down Tonight', defaultDate: 'Saturday, July 19', defaultTime: '10:00 PM', defaultLocation: 'Studio 54'
  },
  {
    id: 't8', name: 'Tropical Vibes', category: 'parties',
    bgColor: '#00CED1', accentColor: '#FF7F50', textPrimary: '#FFFFFF', textSecondary: '#E0FFFF',
    fontId: 'fredoka', layout: 'overlay',
    defaultTitle: 'SUMMER LUUAU', defaultSubtitle: 'Beach Party Paradise', defaultDate: 'Saturday, August 9', defaultTime: '4:00 PM', defaultLocation: 'Sunset Beach'
  },
  
  // === SALES & BUSINESS TEMPLATES ===
  {
    id: 't9', name: 'Flash Sale', category: 'sales',
    bgColor: '#FFFFFF', accentColor: '#FF4444', textPrimary: '#000000', textSecondary: '#666666',
    fontId: 'oswald', layout: 'split',
    defaultTitle: '50% OFF', defaultSubtitle: 'Limited Time Flash Sale', defaultDate: 'This Weekend Only', defaultTime: '9 AM - 9 PM', defaultLocation: 'All Locations'
  },
  {
    id: 't10', name: 'Clearance Alert', category: 'sales',
    bgColor: '#FFD700', accentColor: '#000000', textPrimary: '#000000', textSecondary: '#333333',
    fontId: 'anton', layout: 'banner',
    defaultTitle: 'CLEARANCE', defaultSubtitle: 'Everything Must Go!', defaultDate: 'Final Days', defaultTime: 'While Supplies Last', defaultLocation: 'Store Wide'
  },
  {
    id: 't11', name: 'Black Friday', category: 'sales',
    bgColor: '#1A1A1A', accentColor: '#00FF00', textPrimary: '#FFFFFF', textSecondary: '#CCCCCC',
    fontId: 'bebas-neue', layout: 'bold',
    defaultTitle: 'BLACK FRIDAY', defaultSubtitle: 'Doorbusters Start at Midnight', defaultDate: 'November 29', defaultTime: '12:00 AM', defaultLocation: 'Online & In-Store'
  },
  {
    id: 't12', name: 'Spring Collection', category: 'sales',
    bgColor: '#F0FFF0', accentColor: '#FF69B4', textPrimary: '#2D5016', textSecondary: '#6B8E23',
    fontId: 'playfair', layout: 'minimal',
    defaultTitle: 'NEW ARRIVALS', defaultSubtitle: 'Spring Collection 2025', defaultDate: 'March 1 - 31', defaultTime: 'Shop Now', defaultLocation: 'Boutique & Online'
  },
  
  // === SPORTS TEMPLATES ===
  {
    id: 't13', name: 'Game Day', category: 'sports',
    bgColor: '#14282E', accentColor: '#F7FF58', textPrimary: '#FFFFFF', textSecondary: '#AACCFF',
    fontId: 'anton', layout: 'classic',
    defaultTitle: 'GAME DAY', defaultSubtitle: 'Championship Finals', defaultDate: 'Sunday, May 12', defaultTime: '3:00 PM', defaultLocation: 'City Stadium'
  },
  {
    id: 't14', name: 'Team Spirit', category: 'sports',
    bgColor: '#8B0000', accentColor: '#FFD700', textPrimary: '#FFFFFF', textSecondary: '#FFE5A0',
    fontId: 'oswald', layout: 'geometric',
    defaultTitle: 'FRIDAY NIGHT LIGHTS', defaultSubtitle: 'Varsity vs Rivals', defaultDate: 'October 18', defaultTime: '7:30 PM', defaultLocation: 'Memorial Stadium'
  },
  {
    id: 't15', name: 'Tournament', category: 'sports',
    bgColor: '#FFFFFF', accentColor: '#FF4500', textPrimary: '#1A1A1A', textSecondary: '#555555',
    fontId: 'bebas-neue', layout: 'split',
    defaultTitle: 'CHAMPIONSHIP', defaultSubtitle: 'Regional Finals', defaultDate: 'June 14-15', defaultTime: 'All Day', defaultLocation: 'Sports Complex'
  },
  
  // === FOOD & RESTAURANT TEMPLATES ===
  {
    id: 't16', name: 'Grand Opening', category: 'food',
    bgColor: '#F5F5DC', accentColor: '#D4AF37', textPrimary: '#3D2B1F', textSecondary: '#8B7355',
    fontId: 'playfair', layout: 'elegant',
    defaultTitle: 'Grand Opening', defaultSubtitle: 'Taste the Experience', defaultDate: 'Monday, June 1', defaultTime: '11:00 AM', defaultLocation: '123 Main Street'
  },
  {
    id: 't17', name: 'Food Truck', category: 'food',
    bgColor: '#FF8C00', accentColor: '#FFFFFF', textPrimary: '#FFFFFF', textSecondary: '#FFEEDD',
    fontId: 'fredoka', layout: 'banner',
    defaultTitle: 'STREET EATS', defaultSubtitle: 'Gourmet on Wheels', defaultDate: 'Daily', defaultTime: '11 AM - 8 PM', defaultLocation: 'Downtown Plaza'
  },
  {
    id: 't18', name: 'Happy Hour', category: 'food',
    bgColor: '#2C1810', accentColor: '#FFD700', textPrimary: '#FFFFFF', textSecondary: '#D4B896',
    fontId: 'cormorant', layout: 'corner',
    defaultTitle: 'HAPPY HOUR', defaultSubtitle: 'Half-Price Appetizers', defaultDate: 'Mon-Fri', defaultTime: '4-7 PM', defaultLocation: 'The Lounge'
  },
  {
    id: 't19', name: 'Brunch Club', category: 'food',
    bgColor: '#FFF5E6', accentColor: '#FF6B6B', textPrimary: '#5C4033', textSecondary: '#A0826D',
    fontId: 'nunito', layout: 'card',
    defaultTitle: 'BRUNCH TIME', defaultSubtitle: 'Weekend Specials', defaultDate: 'Sat-Sun', defaultTime: '10 AM - 2 PM', defaultLocation: 'Cafe Central'
  },
  
  // === MUSIC TEMPLATES ===
  {
    id: 't20', name: 'Concert Live', category: 'music',
    bgColor: '#1A0033', accentColor: '#FF69B4', textPrimary: '#FFFFFF', textSecondary: '#CC88DD',
    fontId: 'bebas-neue', layout: 'overlay',
    defaultTitle: 'LIVE CONCERT', defaultSubtitle: 'Featuring Special Guests', defaultDate: 'Saturday, July 4', defaultTime: '7:00 PM', defaultLocation: 'Amphitheater'
  },
  {
    id: 't21', name: 'DJ Night', category: 'music',
    bgColor: '#000000', accentColor: '#00FFFF', textPrimary: '#FFFFFF', textSecondary: '#88FFFF',
    fontId: 'oswald', layout: 'gradient',
    defaultTitle: 'DJ SPINMASTER', defaultSubtitle: 'Electronic Dance Night', defaultDate: 'Friday, August 22', defaultTime: '11:00 PM', defaultLocation: 'Pulse Club'
  },
  {
    id: 't22', name: 'Jazz Lounge', category: 'music',
    bgColor: '#2D1B4E', accentColor: '#D4AF37', textPrimary: '#FFE5B4', textSecondary: '#C9A961',
    fontId: 'playfair', layout: 'elegant',
    defaultTitle: 'JAZZ NIGHT', defaultSubtitle: 'Live Music & Cocktails', defaultDate: 'Every Thursday', defaultTime: '8:00 PM', defaultLocation: 'Blue Note Lounge'
  },
  
  // === CHURCH TEMPLATES ===
  {
    id: 't23', name: 'Sunday Service', category: 'church',
    bgColor: '#FFFFFF', accentColor: '#2ECC71', textPrimary: '#333333', textSecondary: '#666666',
    fontId: 'cormorant', layout: 'minimal',
    defaultTitle: 'Sunday Service', defaultSubtitle: 'All Are Welcome', defaultDate: 'Every Sunday', defaultTime: '10:00 AM', defaultLocation: 'Community Church'
  },
  {
    id: 't24', name: 'Youth Group', category: 'church',
    bgColor: '#4A90D9', accentColor: '#FFD700', textPrimary: '#FFFFFF', textSecondary: '#E0EEFF',
    fontId: 'nunito', layout: 'card',
    defaultTitle: 'YOUTH NIGHT', defaultSubtitle: 'Connect. Grow. Serve.', defaultDate: 'Wednesday', defaultTime: '6:30 PM', defaultLocation: 'Youth Center'
  },
  {
    id: 't25', name: 'Bible Study', category: 'church',
    bgColor: '#F5F5DC', accentColor: '#8B4513', textPrimary: '#2C1810', textSecondary: '#6B4423',
    fontId: 'libre-baskerville', layout: 'elegant',
    defaultTitle: 'BIBLE STUDY', defaultSubtitle: 'Deep Dive into Scripture', defaultDate: 'Tuesday Evening', defaultTime: '7:00 PM', defaultLocation: 'Fellowship Hall'
  },
  
  // === FASHION TEMPLATES ===
  {
    id: 't26', name: 'Fashion Week', category: 'fashion',
    bgColor: '#000000', accentColor: '#FFFFFF', textPrimary: '#FFFFFF', textSecondary: '#AAAAAA',
    fontId: 'playfair', layout: 'modern',
    defaultTitle: 'FASHION WEEK', defaultSubtitle: 'Spring/Summer Collection', defaultDate: 'Sept 15-22', defaultTime: '6:00 PM', defaultLocation: 'Runway Center'
  },
  {
    id: 't27', name: 'Boutique Sale', category: 'fashion',
    bgColor: '#FFB6C1', accentColor: '#FFFFFF', textPrimary: '#2D2D2D', textSecondary: '#555555',
    fontId: 'cormorant', layout: 'minimal',
    defaultTitle: 'SAMPLE SALE', defaultSubtitle: 'Up to 70% Off Designer Items', defaultDate: 'This Weekend', defaultTime: '10 AM - 6 PM', defaultLocation: 'Designer Outlet'
  },
  {
    id: 't28', name: 'Style Launch', category: 'fashion',
    bgColor: '#F8F8F8', accentColor: '#FF69B4', textPrimary: '#1A1A1A', textSecondary: '#666666',
    fontId: 'bebas-neue', layout: 'geometric',
    defaultTitle: 'NEW COLLECTION', defaultSubtitle: 'Fall Fashion Preview', defaultDate: 'October 5', defaultTime: '7:00 PM', defaultLocation: 'Flagship Store'
  },
  
  // === REAL ESTATE TEMPLATES ===
  {
    id: 't29', name: 'Open House', category: 'realestate',
    bgColor: '#FFFFFF', accentColor: '#1E90FF', textPrimary: '#2C3E50', textSecondary: '#7F8C8D',
    fontId: 'space-grotesk', layout: 'split',
    defaultTitle: 'OPEN HOUSE', defaultSubtitle: 'Luxury Living Awaits', defaultDate: 'Saturday, Oct 10', defaultTime: '1:00 - 4:00 PM', defaultLocation: '456 Oak Avenue'
  },
  {
    id: 't30', name: 'Just Listed', category: 'realestate',
    bgColor: '#1A365D', accentColor: '#D4AF37', textPrimary: '#FFFFFF', textSecondary: '#C9D4E8',
    fontId: 'playfair', layout: 'corner',
    defaultTitle: 'JUST LISTED', defaultSubtitle: 'Stunning Modern Home', defaultDate: 'Call Today', defaultTime: 'By Appointment', defaultLocation: 'Prime Location'
  },
  {
    id: 't31', name: 'Property Showcase', category: 'realestate',
    bgColor: '#FAF9F6', accentColor: '#2C5282', textPrimary: '#1A202C', textSecondary: '#4A5568',
    fontId: 'atkinson', layout: 'card',
    defaultTitle: 'EXCLUSIVE LISTING', defaultSubtitle: 'Waterfront Property', defaultDate: 'Contact Agent', defaultTime: 'Virtual Tours Available', defaultLocation: 'Coastal Drive'
  },
  
  // === TECH TEMPLATES ===
  {
    id: 't32', name: 'Tech Summit', category: 'tech',
    bgColor: '#0D1B20', accentColor: '#F7FF58', textPrimary: '#FFFFFF', textSecondary: '#88CCFF',
    fontId: 'space-grotesk', layout: 'modern',
    defaultTitle: 'TECH SUMMIT 2025', defaultSubtitle: 'Innovate. Connect. Grow.', defaultDate: 'Nov 20-22', defaultTime: '9:00 AM', defaultLocation: 'Convention Center'
  },
  {
    id: 't33', name: 'Startup Pitch', category: 'tech',
    bgColor: '#FFFFFF', accentColor: '#6366F1', textPrimary: '#1A1A1A', textSecondary: '#555555',
    fontId: 'atkinson', layout: 'minimal',
    defaultTitle: 'PITCH NIGHT', defaultSubtitle: 'Meet the Next Big Thing', defaultDate: 'Thursday, Sept 18', defaultTime: '6:30 PM', defaultLocation: 'Innovation Hub'
  },
  {
    id: 't34', name: 'Hackathon', category: 'tech',
    bgColor: '#1A1A2E', accentColor: '#00D9FF', textPrimary: '#FFFFFF', textSecondary: '#A0D2EB',
    fontId: 'space-grotesk', layout: 'gradient',
    defaultTitle: '48HR HACKATHON', defaultSubtitle: 'Code. Create. Compete.', defaultDate: 'October 11-13', defaultTime: 'Starts 6 PM', defaultLocation: 'Tech Campus'
  },
  
  // === ADDITIONAL SPECIALTY TEMPLATES ===
  {
    id: 't35', name: 'Charity Gala', category: 'events',
    bgColor: '#800020', accentColor: '#D4AF37', textPrimary: '#FFFFFF', textSecondary: '#E8D5B7',
    fontId: 'playfair', layout: 'elegant',
    defaultTitle: 'Charity Gala', defaultSubtitle: 'An Evening of Giving', defaultDate: 'Friday, Dec 12', defaultTime: '6:30 PM', defaultLocation: 'Grand Ballroom'
  },
  {
    id: 't36', name: 'Workshop', category: 'events',
    bgColor: '#E8F4F8', accentColor: '#008080', textPrimary: '#1A3A3A', textSecondary: '#4A7C7C',
    fontId: 'nunito', layout: 'card',
    defaultTitle: 'WORKSHOP', defaultSubtitle: 'Learn New Skills', defaultDate: 'Saturday, Nov 8', defaultTime: '10 AM - 4 PM', defaultLocation: 'Learning Center'
  },
  {
    id: 't37', name: 'Karaoke Night', category: 'music',
    bgColor: '#4B0082', accentColor: '#FF1493', textPrimary: '#FFFFFF', textSecondary: '#DDA0DD',
    fontId: 'fredoka', layout: 'bold',
    defaultTitle: 'KARAOKE NIGHT', defaultSubtitle: 'Sing Your Heart Out', defaultDate: 'Every Friday', defaultTime: '9:00 PM', defaultLocation: 'The Stage Bar'
  },
  {
    id: 't38', name: 'Fitness Class', category: 'sports',
    bgColor: '#7CB342', accentColor: '#FFFFFF', textPrimary: '#FFFFFF', textSecondary: '#DCEDC8',
    fontId: 'oswald', layout: 'banner',
    defaultTitle: 'BOOT CAMP', defaultSubtitle: 'Transform Your Body', defaultDate: 'Mon-Wed-Fri', defaultTime: '6:00 AM', defaultLocation: 'FitZone Gym'
  },
  {
    id: 't39', name: 'Art Exhibition', category: 'events',
    bgColor: '#2C2C2C', accentColor: '#FFD700', textPrimary: '#FFFFFF', textSecondary: '#CCCCCC',
    fontId: 'cormorant', layout: 'minimal',
    defaultTitle: 'ART EXHIBITION', defaultSubtitle: 'Contemporary Works', defaultDate: 'Oct 1 - Nov 15', defaultTime: 'Tue-Sun 10-6', defaultLocation: 'Gallery District'
  },
  {
    id: 't40', name: 'Networking Mixer', category: 'events',
    bgColor: '#1E3A5F', accentColor: '#FFA500', textPrimary: '#FFFFFF', textSecondary: '#B8D4E8',
    fontId: 'atkinson', layout: 'corner',
    defaultTitle: 'NETWORKING NIGHT', defaultSubtitle: 'Connect with Professionals', defaultDate: 'Thursday, Sept 25', defaultTime: '6:00 - 9:00 PM', defaultLocation: 'Business Center'
  },
];

export interface FlyerContent {
  title: string;
  subtitle: string;
  date: string;
  time: string;
  location: string;
  image: string | null;
  qrEnabled: boolean;
  qrUrl: string;
  footerEnabled: boolean;
  themeColorId: string;
  accentColorId: string;
  fontId: string;
  templateId: string;
  flyerSize: FlyerSize;
}

export interface FlyerState {
  content: FlyerContent;
  editorMode: EditorMode;
  quickTab: QuickTab;
  activeModal: ModalType;
  zoom: number;
  selectedElement: string | null;
  showHelp: boolean;
  toast: { message: string; visible: boolean } | null;
}

export type FlyerAction =
  | { type: 'SET_CONTENT'; payload: Partial<FlyerContent> }
  | { type: 'SET_EDITOR_MODE'; mode: EditorMode }
  | { type: 'SET_QUICK_TAB'; tab: QuickTab }
  | { type: 'SET_MODAL'; modal: ModalType }
  | { type: 'SET_ZOOM'; zoom: number }
  | { type: 'SET_SELECTED_ELEMENT'; element: string | null }
  | { type: 'SET_SHOW_HELP'; show: boolean }
  | { type: 'SET_TOAST'; toast: { message: string; visible: boolean } | null }
  | { type: 'APPLY_TEMPLATE'; template: FlyerTemplate }
  | { type: 'RESET_FLYER' };

export const initialContent: FlyerContent = {
  title: TEMPLATES[0].defaultTitle,
  subtitle: TEMPLATES[0].defaultSubtitle,
  date: TEMPLATES[0].defaultDate,
  time: TEMPLATES[0].defaultTime,
  location: TEMPLATES[0].defaultLocation,
  image: null,
  qrEnabled: false,
  qrUrl: '',
  footerEnabled: false,
  themeColorId: 'black',
  accentColorId: 'yellow',
  fontId: 'anton',
  templateId: TEMPLATES[0].id,
  flyerSize: 'instagram-post',
};
