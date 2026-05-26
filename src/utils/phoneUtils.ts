import { parsePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js';

// Convert country code to a human-readable name using Intl.DisplayNames
const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });

export const getPhoneDetails = (phoneNumber: string) => {
  if (!phoneNumber || !isValidPhoneNumber(phoneNumber)) {
    return { isValid: false };
  }

  try {
    const parsed = parsePhoneNumber(phoneNumber);
    const countryCode = parsed.country; // e.g., 'IN', 'US'
    const dialCode = `+${parsed.countryCallingCode}`; // e.g., '+91', '+1'
    const countryName = countryCode ? regionNames.of(countryCode) : '';

    return {
      isValid: true,
      countryCode,
      dialCode,
      countryName,
      number: parsed.number // E.164 format
    };
  } catch (error) {
    return { isValid: false };
  }
};
