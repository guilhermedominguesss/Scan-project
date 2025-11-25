export const formatPhoneBR = (value) => {
  if (!value) return "";
  
  // Remove non-digits
  let clean = value.replace(/\D/g, "");
  
  // Limit to 11 chars
  if (clean.length > 11) clean = clean.slice(0, 11);
  
  // Mask (00) 00000-0000
  if (clean.length > 10) {
    return `(${clean.slice(0, 2)}) ${clean.slice(2, 7)}-${clean.slice(7)}`;
  }
  
  // Mask (00) 0000-0000
  if (clean.length > 6) {
    return `(${clean.slice(0, 2)}) ${clean.slice(2, 6)}-${clean.slice(6)}`;
  }
  
  // Mask (00) 00...
  if (clean.length > 2) {
    return `(${clean.slice(0, 2)}) ${clean.slice(2)}`;
  }
  
  return clean;
};

export const validatePhoneBR = (phone) => {
  const clean = phone.replace(/\D/g, "");
  return clean.length >= 10 && clean.length <= 11;
};

export const sanitizeText = (text) => {
  if (!text) return "";
  return text.trim();
};
