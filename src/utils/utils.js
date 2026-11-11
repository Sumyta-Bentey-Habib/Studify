// ─── Design Tokens ───────────────────────────────────────────────────────────
// StudyFy Official Brand Palette
export const COLORS = {
  primary: '#176B62',        // Deep Teal
  primaryDark: '#10534D',    // Dark Teal
  background: '#F5F1E8',     // Warm Ivory
  surface: '#FFFFFF',        // White
  heading: '#263B38',        // Forest Charcoal
  secondaryText: '#71817C',  // Muted Gray
  accent: '#E6A45C',         // Warm Amber
  success: '#199B68',        // Green
  warning: '#D99A36',        // Amber
  danger: '#DC5264',         // Soft Red
  border: '#E6E8E2',         // Soft Neutral
};

// Sidebar color token mappings
export const SIDEBAR_THEME = {
  bg: '#10534D',
  active: '#176B62',
  text: '#E6E8E2',
  mutedText: '#A3B4B0',
  hover: '#176B62',
};

// SweetAlert2 brand theme defaults
export const SWAL_THEME = {
  confirmButtonColor: '#176B62',
  cancelButtonColor: '#DC5264',
  background: '#FFFFFF',
  color: '#263B38',
};

// Background colour used by FAQ & sections
export const FAQ_BG_COLOR = '#F5F1E8'; // Warm Ivory

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
