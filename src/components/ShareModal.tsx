import { useState } from 'react';
import { X, Copy, Check } from 'lucide-react';
import { useFlyer } from '@/store/flyerStore';

const PLATFORMS = [
  { id: 'instagram', name: 'Instagram', icon: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  )},
  { id: 'facebook', name: 'Facebook', icon: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )},
  { id: 'tiktok', name: 'TikTok', icon: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.2a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.83a8.23 8.23 0 0 0 4.83 1.55V6.93a4.85 4.85 0 0 1-1.07-.24z" />
    </svg>
  )},
  { id: 'snapchat', name: 'Snapchat', icon: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.206 1c.577 0 3.267.326 4.88 4.673.255.676.344 1.52.17 2.365-.158.775-.515 1.468-.9 2.03 1.03.544 2.567 1.058 4.118.383.253-.113.545.03.638.295.093.264-.04.556-.293.67-1.71.77-2.665 2.048-3.26 3.22-.166.33-.3.635-.412.903-.372.89-.24 1.683.08 2.28.583 1.103 1.83 1.783 3.074 1.783.374 0 .578.39.39.697-.195.318-.597.487-1.024.487-.326 0-.62-.13-.83-.35-.323-.34-.72-.553-1.138-.553-.21 0-.42.06-.61.174-.41.246-.893.38-1.39.38-.5 0-.99-.137-1.41-.39-.19-.114-.4-.174-.61-.174-.42 0-.815.213-1.138.553-.21.22-.504.35-.83.35-.427 0-.83-.17-1.024-.487-.188-.307.016-.697.39-.697 1.244 0 2.49-.68 3.074-1.783.32-.597.452-1.39.08-2.28-.112-.268-.246-.573-.412-.903-.595-1.172-1.55-2.45-3.26-3.22-.253-.114-.386-.406-.293-.67.093-.265.385-.408.638-.295 1.55.675 3.088.16 4.118-.383-.385-.562-.742-1.255-.9-2.03-.174-.845-.085-1.69.17-2.365C8.527 1.326 11.217 1 11.794 1h.412z" />
    </svg>
  )},
  { id: 'x', name: 'X', icon: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )},
  { id: 'messenger', name: 'Messenger', icon: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.03 2 11c0 2.76 1.36 5.23 3.5 6.86V22l4.09-2.24c.78.15 1.6.24 2.41.24 5.52 0 10-4.03 10-9s-4.48-9-10-9zm1.12 11.93l-2.56-2.74-5 2.74 5.5-5.82 2.56 2.74 4.94-2.74-5.44 5.82z" />
    </svg>
  )},
  { id: 'whatsapp', name: 'WhatsApp', icon: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )},
];

export default function ShareModal() {
  const { state, dispatch } = useFlyer();
  const [copied, setCopied] = useState(false);
  const shareUrl = typeof window !== 'undefined' ? window.location.href : 'https://crowdcall.app';

  const handleShare = async (platform: string) => {
    const text = `Check out my flyer: ${state.content.title}`;
    const url = shareUrl;

    const shareData: ShareData = {
      title: state.content.title,
      text,
      url,
    };

    if (navigator.share && navigator.canShare?.(shareData)) {
      try {
        await navigator.share(shareData);
        dispatch({ type: 'SET_MODAL', modal: null });
        return;
      } catch {
        // User cancelled or share failed, fall through to URL sharing
      }
    }

    // Fallback: open platform-specific share URLs
    const encodedUrl = encodeURIComponent(url);
    const encodedText = encodeURIComponent(text);
    const shareUrls: Record<string, string> = {
      instagram: `https://www.instagram.com/`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      tiktok: `https://www.tiktok.com/`,
      snapchat: `https://www.snapchat.com/scan?attachmentUrl=${encodedUrl}`,
      x: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      messenger: `https://www.facebook.com/dialog/send?link=${encodedUrl}&app_id=123456789`,
      whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
    dispatch({ type: 'SET_MODAL', modal: null });
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      dispatch({ type: 'SET_TOAST', toast: { message: 'Link copied to clipboard', visible: true } });
      setTimeout(() => dispatch({ type: 'SET_TOAST', toast: null }), 2000);
    } catch {
      // Fallback
      const input = document.createElement('input');
      input.value = shareUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}
      onClick={() => dispatch({ type: 'SET_MODAL', modal: null })}
    >
      <div
        className="bg-white rounded-2xl w-[480px] max-w-[95vw] p-6 animate-in fade-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-1">
          <div>
            <h2 className="text-xl font-bold">Share Your Flyer</h2>
            <p className="text-xs text-[#666666] mt-0.5">Choose how you want to share</p>
          </div>
          <button
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F5F5F5] transition-colors"
            onClick={() => dispatch({ type: 'SET_MODAL', modal: null })}
          >
            <X size={20} />
          </button>
        </div>

        {/* Platform Grid */}
        <div className="grid grid-cols-4 gap-4 py-5">
          {PLATFORMS.map((platform) => (
            <button
              key={platform.id}
              className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-[#F7FF58] transition-all group"
              onClick={() => handleShare(platform.id)}
            >
              <div className="w-14 h-14 rounded-full bg-[#EEEEEE] group-hover:bg-[#F7FF58] flex items-center justify-center transition-all">
                {platform.icon}
              </div>
              <span className="text-2xs font-medium">{platform.name}</span>
            </button>
          ))}
          {/* Copy Link */}
          <button
            className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-[#F7FF58] transition-all group"
            onClick={handleCopyLink}
          >
            <div className="w-14 h-14 rounded-full bg-[#EEEEEE] group-hover:bg-[#F7FF58] flex items-center justify-center transition-all">
              {copied ? <Check size={22} className="text-[#4CAF50]" /> : <Copy size={22} />}
            </div>
            <span className="text-2xs font-medium">{copied ? 'Copied!' : 'Copy Link'}</span>
          </button>
        </div>

        {/* Copy Link Input */}
        <div className="border-t border-[#EEEEEE] pt-4">
          <div className="flex gap-2">
            <input
              className="input-field flex-1 text-xs bg-[#F5F5F5]"
              value={shareUrl}
              readOnly
            />
            <button
              className="btn-secondary px-4 py-2 text-xs"
              onClick={handleCopyLink}
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
