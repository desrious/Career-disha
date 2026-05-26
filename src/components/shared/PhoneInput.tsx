import React, { forwardRef, useState, useEffect } from 'react';
import ReactPhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { Phone } from 'lucide-react';
import { isPossiblePhoneNumber } from 'react-phone-number-input';
import { parsePhoneNumber } from 'libphonenumber-js';

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
    
    // Validate and extract country data on change
    const handleChange = (val: string | undefined) => {
      onChange(val);
      
      const valid = val ? isPossiblePhoneNumber(val) : false;
      if (onValidationChange) {
        onValidationChange(valid);
      }

      if (onCountryDataChange) {
        if (valid && val) {
          try {
            const phoneNumber = parsePhoneNumber(val);
            if (phoneNumber) {
              const countryCode = phoneNumber.country;
              const dialCode = phoneNumber.countryCallingCode;
              
              let countryName: string = countryCode || '';
              if (countryCode) {
                try {
                  const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
                  countryName = regionNames.of(countryCode) || countryCode;
                } catch (e) {
                  // Ignore
                }
              }

              onCountryDataChange({
                countryCode,
                dialCode: `+${dialCode}`,
                countryName
              });
            }
          } catch (e) {
             onCountryDataChange({ countryCode: undefined, dialCode: undefined, countryName: undefined });
          }
        } else {
          onCountryDataChange({ countryCode: undefined, dialCode: undefined, countryName: undefined });
        }
      }
    };

    const handleBlur = () => {
      setTouched(true);
    };

    const isValid = value ? isPossiblePhoneNumber(value) : !required;
    const showError = touched && !isValid;

    return (
      <div className={`w-full relative ${className}`}>
        <div className={`flex bg-slate-50 border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-all ${showError ? 'border-red-500 focus-within:ring-red-500 focus-within:border-red-500' : 'border-slate-200'}`}>
          <div className="px-4 py-3 bg-white border-r border-slate-200 flex items-center justify-center text-slate-400">
            <Phone className="w-5 h-5" />
          </div>
          <div className="flex-1 PhoneInputWrapper">
            <ReactPhoneInput
              international
              defaultCountry="IN"
              value={value}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full flex"
              numberInputProps={{
                className: 'w-full px-4 py-3 bg-transparent outline-none border-none',
                required: required,
                placeholder: placeholder,
                ref: ref
              }}
            />
          </div>
        </div>
        {showError && (
          <p className="text-red-500 text-xs mt-1 absolute -bottom-5 left-0">
            Please enter a valid phone number.
          </p>
        )}
      </div>
    );
  }
);

PhoneInput.displayName = 'PhoneInput';

export default PhoneInput;