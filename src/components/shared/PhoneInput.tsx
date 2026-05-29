import React, { forwardRef, useState } from 'react';
import { PhoneInput as ReactInternationalPhone } from 'react-international-phone';
import 'react-international-phone/style.css';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

interface PhoneInputProps {
  value: string;
  onChange: (value: string | undefined) => void;
  required?: boolean;
  className?: string;
  placeholder?: string;
  onValidationChange?: (isValid: boolean) => void;
  onCountryDataChange?: (data: { countryCode?: string; dialCode?: string; countryName?: string }) => void;
}

const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ value, onChange, required = false, className = '', placeholder = 'Mobile Number*', onValidationChange, onCountryDataChange }, ref) => {
    const [touched, setTouched] = useState(false);
    
    const handleChange = (val: string, meta: any) => {
      onChange(val);
      
      let valid = false;
      let countryCode: string | undefined;
      let dialCode: string | undefined;
      let countryName: string | undefined;

      try {
        const phoneNumber = parsePhoneNumberFromString(val);
        if (phoneNumber) {
          valid = phoneNumber.isValid();
          countryCode = phoneNumber.country;
          dialCode = phoneNumber.countryCallingCode ? `+${phoneNumber.countryCallingCode}` : undefined;
          
          if (countryCode) {
            try {
              const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
              countryName = regionNames.of(countryCode) || countryCode;
            } catch (e) {
              countryName = meta?.country?.name || countryCode;
            }
          }
        }
      } catch (e) {
        // Ignore
      }

      if (onValidationChange) {
        onValidationChange(valid);
      }

      if (onCountryDataChange) {
        onCountryDataChange({ countryCode, dialCode, countryName });
      }
    };

    const handleBlur = () => {
      setTouched(true);
    };

    const isValid = () => {
      if (!value) return !required;
      try {
         const ph = parsePhoneNumberFromString(value);
         return ph ? ph.isValid() : false;
      } catch(e) { return false; }
    };

    const showError = touched && !isValid();
    const errorId = `phone-error-${placeholder.replace(/[^a-z0-9]/gi, '-').toLowerCase()}`;

    return (
      <div className={`w-full relative ${className}`}>
        <div className={`flex bg-slate-50 border rounded-lg overflow-visible focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all ${showError ? 'border-red-500 focus-within:ring-red-500 focus-within:border-red-500' : 'border-slate-200'}`}>
          <div className="flex-1 PhoneInputWrapper w-full">
            <ReactInternationalPhone
              defaultCountry="in"
              value={value}
              onChange={(val, meta) => handleChange(val, meta)}
              className="w-full flex"
              inputClassName={`w-full !border-none !bg-transparent !px-4 !py-3 !outline-none !text-base focus:!ring-0`}
              countrySelectorStyleProps={{
                buttonClassName: '!border-none !bg-white !px-3 !h-full !rounded-l-lg !border-r !border-slate-200',
                dropdownStyleProps: { className: '!z-50 !shadow-xl !rounded-xl !border-slate-200' }
              }}
              inputProps={{
                onBlur: handleBlur,
                required: required,
                placeholder: placeholder,
                ref: ref,
                'aria-invalid': showError,
                'aria-describedby': showError ? errorId : undefined,
              }}
            />
          </div>
        </div>
        {showError && (
          <p id={errorId} className="text-red-500 text-xs mt-1">
            {value ? 'Please enter a valid phone number for the selected country.' : 'Phone number is required.'}
          </p>
        )}
      </div>
    );
  }
);

PhoneInput.displayName = 'PhoneInput';

export default PhoneInput;
