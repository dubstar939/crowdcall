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
  layout: 'classic' | 'modern' | 'split' | 'overlay' | 'minimal' | 'elegant';
  defaultTitle: string;
  defaultSubtitle: string;
  defaultDate: string;
  defaultTime: string;
  defaultLocation: string;
}

export const TEMPLATES: FlyerTemplate[] = [
  {
    id: 't1', name: 'Midnight Event', category: 'events',
    bgColor: '#000000', accentColor: '#F7FF58', textPrimary: '#FFFFFF', textSecondary: '#CCCCCC',
    fontId: 'anton', layout: 'classic',
    defaultTitle: 'EVENT NAME', defaultSubtitle: 'Join us for an unforgettable night', defaultDate: 'Saturday, March 15', defaultTime: '8:00 PM', defaultLocation: 'Downtown Venue'
  },
  {
    id: 't2', name: 'Neon Party', category: 'parties',
    bgColor: '#0D1B20', accentColor: '#F7FF58', textPrimary: '#FFFFFF', textSecondary: '#AADDFF',
    fontId: 'bebas-neue', layout: 'modern',
    defaultTitle: 'PARTY NIGHT', defaultSubtitle: 'Music, Drinks & Good Vibes', defaultDate: 'Friday, April 20', defaultTime: '10:00 PM', defaultLocation: 'The Rooftop Bar'
  },
  {
    id: 't3', name: 'Flash Sale', category: 'sales',
    bgColor: '#FFFFFF', accentColor: '#FF4444', textPrimary: '#000000', textSecondary: '#666666',
    fontId: 'oswald', layout: 'split',
    defaultTitle: '50% OFF', defaultSubtitle: 'Limited Time Flash Sale', defaultDate: 'This Weekend Only', defaultTime: '9 AM - 9 PM', defaultLocation: 'All Locations'
  },
  {
    id: 't4', name: 'Game Day', category: 'sports',
    bgColor: '#14282E', accentColor: '#F7FF58', textPrimary: '#FFFFFF', textSecondary: '#AACCFF',
    fontId: 'anton', layout: 'classic',
    defaultTitle: 'GAME DAY', defaultSubtitle: 'Championship Finals', defaultDate: 'Sunday, May 12', defaultTime: '3:00 PM', defaultLocation: 'City Stadium'
  },
  {
    id: 't5', name: 'Grand Opening', category: 'food',
    bgColor: '#F5F5DC', accentColor: '#D4AF37', textPrimary: '#3D2B1F', textSecondary: '#8B7355',
    fontId: 'playfair', layout: 'elegant',
    defaultTitle: 'Grand Opening', defaultSubtitle: 'Taste the Experience', defaultDate: 'Monday, June 1', defaultTime: '11:00 AM', defaultLocation: '123 Main Street'
  },
  {
    id: 't6', name: 'Concert Live', category: 'music',
    bgColor: '#1A0033', accentColor: '#FF69B4', textPrimary: '#FFFFFF', textSecondary: '#CC88DD',
    fontId: 'bebas-neue', layout: 'overlay',
    defaultTitle: 'LIVE CONCERT', defaultSubtitle: 'Featuring Special Guests', defaultDate: 'Saturday, July 4', defaultTime: '7:00 PM', defaultLocation: 'Amphitheater'
  },
  {
    id: 't7', name: 'Sunday Service', category: 'church',
    bgColor: '#FFFFFF', accentColor: '#2ECC71', textPrimary: '#333333', textSecondary: '#666666',
    fontId: 'cormorant', layout: 'minimal',
    defaultTitle: 'Sunday Service', defaultSubtitle: 'All Are Welcome', defaultDate: 'Every Sunday', defaultTime: '10:00 AM', defaultLocation: 'Community Church'
  },
  {
    id: 't8', name: 'Fashion Week', category: 'fashion',
    bgColor: '#000000', accentColor: '#FFFFFF', textPrimary: '#FFFFFF', textSecondary: '#AAAAAA',
    fontId: 'playfair', layout: 'modern',
    defaultTitle: 'FASHION WEEK', defaultSubtitle: 'Spring/Summer Collection', defaultDate: 'Sept 15-22', defaultTime: '6:00 PM', defaultLocation: 'Runway Center'
  },
  {
    id: 't9', name: 'Open House', category: 'realestate',
    bgColor: '#FFFFFF', accentColor: '#1E90FF', textPrimary: '#2C3E50', textSecondary: '#7F8C8D',
    fontId: 'space-grotesk', layout: 'split',
    defaultTitle: 'OPEN HOUSE', defaultSubtitle: 'Luxury Living Awaits', defaultDate: 'Saturday, Oct 10', defaultTime: '1:00 - 4:00 PM', defaultLocation: '456 Oak Avenue'
  },
  {
    id: 't10', name: 'Tech Summit', category: 'tech',
    bgColor: '#0D1B20', accentColor: '#F7FF58', textPrimary: '#FFFFFF', textSecondary: '#88CCFF',
    fontId: 'space-grotesk', layout: 'modern',
    defaultTitle: 'TECH SUMMIT 2025', defaultSubtitle: 'Innovate. Connect. Grow.', defaultDate: 'Nov 20-22', defaultTime: '9:00 AM', defaultLocation: 'Convention Center'
  },
  {
    id: 't11', name: 'Birthday Bash', category: 'parties',
    bgColor: '#FF69B4', accentColor: '#FFFFFF', textPrimary: '#FFFFFF', textSecondary: '#FFE0F0',
    fontId: 'fredoka', layout: 'classic',
    defaultTitle: 'BIRTHDAY BASH', defaultSubtitle: 'Come Celebrate With Us!', defaultDate: 'Saturday, Aug 16', defaultTime: '7:00 PM', defaultLocation: 'Party Palace'
  },
  {
    id: 't12', name: 'Charity Gala', category: 'events',
    bgColor: '#800020', accentColor: '#D4AF37', textPrimary: '#FFFFFF', textSecondary: '#E8D5B7',
    fontId: 'playfair', layout: 'elegant',
    defaultTitle: 'Charity Gala', defaultSubtitle: 'An Evening of Giving', defaultDate: 'Friday, Dec 12', defaultTime: '6:30 PM', defaultLocation: 'Grand Ballroom'
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
