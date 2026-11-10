// ─── Design Tokens ───────────────────────────────────────────────────────────
// Primary colour palette — Modern Indigo / Slate theme (2025 trending)
export const COLORS = {
  primary:        'indigo-600',
  primaryLight:   'indigo-400',
  primaryDark:    'indigo-800',
  primaryBg:      'indigo-50',
  primaryBgLight: 'indigo-100',
  primaryText:    'indigo-700',
  primaryTextDark:'indigo-900',
  primaryBorder:  'indigo-200',
  accent:         'emerald-400',
  accentHover:    'emerald-500',
};

// Inline background colour used by FAQ (Tailwind JIT doesn't purge inline styles)
export const FAQ_BG_COLOR = '#EEF2FF'; // indigo-50

export async function uploadImageToImgBB(imageFile) {
  const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
  const formData = new FormData();
  formData.append("image", imageFile);

  const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  if (data.success) {
    return data.data.url;
  } else {
    throw new Error(data.error?.message || "Image upload failed");
  }
}
