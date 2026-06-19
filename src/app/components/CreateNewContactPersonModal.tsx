import React, { useState, useEffect } from 'react';
import svgPaths from "../imports/svg-x4vikvvhe3";

interface CreateNewContactPersonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (contactPerson: ContactPersonData) => void;
}

export interface ContactPersonData {
  name: string;
  address: string;
  address2: string;
  postalCode: string;
  city: string;
  email: string;
  phoneNumber: string;
}

export function CreateNewContactPersonModal({ isOpen, onClose, onSave }: CreateNewContactPersonModalProps) {
  const [formData, setFormData] = useState<ContactPersonData>({
    name: '',
    address: '',
    address2: '',
    postalCode: '',
    city: '',
    email: '',
    phoneNumber: '',
  });

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: '',
        address: '',
        address2: '',
        postalCode: '',
        city: '',
        email: '',
        phoneNumber: '',
      });
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleInputChange = (field: keyof ContactPersonData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (onSave) {
      onSave(formData);
    }
    onClose();
  };

  const isFormValid = formData.name.trim().length > 0;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50">
      <div className="bg-[#fafafa] rounded-[3px] shadow-[2px_2px_4px_0px_rgba(107,107,114,0.06),3px_10px_15px_0px_rgba(107,107,114,0.06)] w-[1016px] max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex flex-col items-center shrink-0 w-full">
          <div className="bg-white relative shrink-0 w-full border-b border-[#e6e6e8]">
            <div className="flex flex-col items-start px-[21px] py-[22px] w-full">
              <div className="flex items-center gap-[11px]">
                <div className="size-[24px] relative overflow-clip shrink-0">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 23.997">
                    <g>
                      <path clipRule="evenodd" d={svgPaths.p156ab980} fill="#22222C" fillRule="evenodd" />
                      <path clipRule="evenodd" d={svgPaths.p5f2db00} fill="#22222C" fillRule="evenodd" />
                      <path clipRule="evenodd" d={svgPaths.p21dbe100} fill="#22222C" fillRule="evenodd" />
                      <path clipRule="evenodd" d={svgPaths.p32762400} fill="#22222C" fillRule="evenodd" />
                      <path clipRule="evenodd" d={svgPaths.p21baca80} fill="#22222C" fillRule="evenodd" />
                      <path clipRule="evenodd" d={svgPaths.p10db3d00} fill="#22222C" fillRule="evenodd" />
                      <path clipRule="evenodd" d={svgPaths.p1df16280} fill="#22222C" fillRule="evenodd" />
                      <path clipRule="evenodd" d={svgPaths.p2228a3f0} fill="#22222C" fillRule="evenodd" />
                      <path clipRule="evenodd" d={svgPaths.p5823df0} fill="#22222C" fillRule="evenodd" />
                      <path clipRule="evenodd" d={svgPaths.p25fcb880} fill="#22222C" fillRule="evenodd" />
                    </g>
                  </svg>
                </div>
                <p className="font-['Montserrat'] font-bold text-[15px] leading-[1.3] text-[#22222c]">
                  Create new contact person assigned to the customer
                </p>
              </div>
            </div>
          </div>

          {/* Tab Header */}
          <div className="bg-white h-[58px] relative shadow-[0px_3px_3px_0px_rgba(107,107,114,0.06)] shrink-0 w-full">
            <div className="flex items-end overflow-clip h-full">
              <div className="flex gap-[30px] items-end pt-[10px] px-[20px] h-full">
                <div className="flex flex-col gap-[6px] h-[48px] items-center justify-end shrink-0">
                  <p className="font-['Montserrat'] font-semibold text-[14px] leading-[1.75] text-[#090914]">
                    New contact person
                  </p>
                  <div className="h-0 relative w-full">
                    <div className="absolute inset-[-3px_0_0_0]">
                      <svg className="block w-full h-[3px]" fill="none" preserveAspectRatio="none" viewBox="0 0 63 3">
                        <line stroke="black" strokeWidth="3" x2="63" y1="1.5" y2="1.5" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Body - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-[20px]">
            <div className="bg-white rounded-[4.383px] border border-[#e6e6e8] p-[20px]">
              <div className="flex flex-col gap-[10px]">
                {/* Name */}
                <div className="flex flex-col gap-0 w-full">
                  <label className="font-['Montserrat'] font-bold text-[14px] leading-[1.75] text-[#22222c] mb-[6px]">
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter name of contact person"
                    className="bg-white h-[48px] rounded-[5px] border border-[#d5d5d7] px-[14px] py-[8px] font-['Montserrat'] text-[14px] leading-[1.75] text-[#42424a] placeholder:text-[#6b6b72] focus:outline-none focus:border-[#42424a] transition-colors w-full"
                  />
                </div>

                {/* Address */}
                <div className="flex flex-col gap-0 w-full">
                  <label className="font-['Montserrat'] font-bold text-[14px] leading-[1.75] text-[#22222c] mb-[6px]">
                    Address
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Enter address"
                    className="bg-white h-[48px] rounded-[5px] border border-[#d5d5d7] px-[14px] py-[8px] font-['Montserrat'] text-[14px] leading-[1.75] text-[#42424a] placeholder:text-[#6b6b72] focus:outline-none focus:border-[#42424a] transition-colors w-full"
                  />
                </div>

                {/* Address 2 */}
                <div className="flex flex-col gap-0 w-full">
                  <label className="font-['Montserrat'] font-bold text-[14px] leading-[1.75] text-[#22222c] mb-[6px]">
                    Address 2
                  </label>
                  <input
                    type="text"
                    value={formData.address2}
                    onChange={(e) => handleInputChange('address2', e.target.value)}
                    placeholder="Enter address 2"
                    className="bg-white h-[48px] rounded-[5px] border border-[#d5d5d7] px-[14px] py-[8px] font-['Montserrat'] text-[14px] leading-[1.75] text-[#42424a] placeholder:text-[#6b6b72] focus:outline-none focus:border-[#42424a] transition-colors w-full"
                  />
                </div>

                {/* Postal Code and City */}
                <div className="flex gap-[22px] w-full">
                  <div className="flex-1 flex flex-col gap-0">
                    <label className="font-['Montserrat'] font-bold text-[14px] leading-[1.75] text-[#22222c] mb-[6px]">
                      Postal code
                    </label>
                    <input
                      type="text"
                      value={formData.postalCode}
                      onChange={(e) => handleInputChange('postalCode', e.target.value)}
                      className="bg-white h-[48px] rounded-[4px] border border-[#d5d5d7] px-[15px] py-[5px] font-['Montserrat'] text-[14px] leading-[1.75] text-[#42424a] focus:outline-none focus:border-[#42424a] transition-colors w-full"
                    />
                  </div>
                  <div className="flex-1 flex flex-col gap-0">
                    <label className="font-['Montserrat'] font-bold text-[14px] leading-[1.75] text-[#22222c] mb-[6px]">
                      City
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className="bg-white h-[48px] rounded-[4px] border border-[#d5d5d7] px-[15px] py-[5px] font-['Montserrat'] text-[14px] leading-[1.75] text-[#42424a] focus:outline-none focus:border-[#42424a] transition-colors w-full"
                    />
                  </div>
                </div>

                {/* Email and Phone Number */}
                <div className="flex gap-[22px] w-full">
                  <div className="flex-1 flex flex-col gap-0">
                    <label className="font-['Montserrat'] font-bold text-[14px] leading-[1.75] text-[#22222c] mb-[6px]">
                      E-mail
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="bg-white h-[48px] rounded-[4px] border border-[#d5d5d7] px-[15px] py-[5px] font-['Montserrat'] text-[14px] leading-[1.75] text-[#42424a] focus:outline-none focus:border-[#42424a] transition-colors w-full"
                    />
                  </div>
                  <div className="flex-1 flex flex-col gap-0">
                    <label className="font-['Montserrat'] font-bold text-[14px] leading-[1.75] text-[#22222c] mb-[6px]">
                      Phone number
                    </label>
                    <input
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                      className="bg-white h-[48px] rounded-[4px] border border-[#d5d5d7] px-[15px] py-[5px] font-['Montserrat'] text-[14px] leading-[1.75] text-[#42424a] focus:outline-none focus:border-[#42424a] transition-colors w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white border-t border-[#e6e6e8] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.03)] shrink-0 w-full">
          <div className="flex justify-start px-[20px] py-[15px]">
            <div className="flex gap-[20px] items-center">
              {/* PRIMARY BUTTON FIRST */}
              <button
                onClick={handleSave}
                disabled={!isFormValid}
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 'var(--font-weight-semibold)',
                  fontSize: 'var(--text-lg)',
                  lineHeight: 1.75,
                  height: 48,
                  minWidth: 100,
                  padding: '6px 20px',
                  borderRadius: 'var(--radius)',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background 0.15s, opacity 0.15s',
                  background: isFormValid ? 'var(--primary)' : 'var(--secondary)',
                  color: isFormValid ? 'var(--primary-foreground)' : 'var(--secondary-foreground)',
                  opacity: isFormValid ? 1 : 0.6,
                  cursor: isFormValid ? 'pointer' : 'not-allowed',
                }}
                onMouseEnter={e => { if (isFormValid) e.currentTarget.style.background = 'color-mix(in srgb, var(--primary) 88%, black)'; }}
                onMouseLeave={e => { if (isFormValid) e.currentTarget.style.background = 'var(--primary)'; }}
              >
                Save and create
              </button>
              {/* SECONDARY BUTTON SECOND */}
              <button
                onClick={onClose}
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 'var(--font-weight-semibold)',
                  fontSize: 'var(--text-sm)',
                  lineHeight: 1.75,
                  height: 48,
                  minWidth: 100,
                  padding: '6px 20px',
                  borderRadius: 'var(--radius)',
                  background: 'var(--card)',
                  border: '1px solid var(--border)',
                  color: 'var(--foreground)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'color-mix(in srgb, var(--border) 20%, var(--card))')}
                onMouseLeave={e => (e.currentTarget.style.background = 'var(--card)')}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}