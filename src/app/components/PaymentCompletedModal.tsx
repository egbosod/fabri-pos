import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import svgPaths from '../imports/svg-wzc97443n2';
import { Search } from 'lucide-react';

interface PaymentCompletedModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  totalAmount: number;
  payments?: Array<{ amount: number }>;
}

export function PaymentCompletedModal({ isOpen, onConfirm, totalAmount, payments = [] }: PaymentCompletedModalProps) {
  const { t } = useLanguage();
  const [printReceipt, setPrintReceipt] = useState<'vanlig' | 'a4' | null>('vanlig');
  const [digitalReceipt, setDigitalReceipt] = useState<'email' | 'sms' | null>(null);
  const [exchangeSlip, setExchangeSlip] = useState(false);
  const [exchangeSlipQuantity, setExchangeSlipQuantity] = useState(1);
  const [emailValue, setEmailValue] = useState('knut.knutsen@gmail.com');
  const [smsValue, setSmsValue] = useState('908 874 95');

  if (!isOpen) return null;

  // Calculate change to return (if customer paid more than total)
  const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);
  const changeToReturn = totalPaid - totalAmount;

  const formatCurrency = (amount: number) => {
    return Math.round(amount).toLocaleString('no-NO');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div 
        className="bg-card flex flex-col gap-[20px] px-[32px] py-[32px] rounded-[var(--radius)] max-w-[483px] w-full"
        style={{ boxShadow: 'var(--elevation-md)' }}
      >
        {/* Success Icon and Title */}
        <div className="flex flex-col gap-[10px] items-center justify-center">
          <div className="relative shrink-0 size-[75px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 75 75">
              <g id="Group 80">
                <circle 
                  cx="37.5" 
                  cy="37.5" 
                  fill="white" 
                  id="Ellipse 3" 
                  r="35.7143" 
                  stroke="#268647" 
                  strokeWidth="3.57143" 
                />
                <g id="Fading checkmark">
                  <path 
                    d={svgPaths.p11355ce8} 
                    id="Vector 5" 
                    stroke="#268647" 
                    strokeLinecap="round" 
                    strokeWidth="5.60516" 
                  />
                </g>
              </g>
            </svg>
          </div>
          <div className="flex flex-col gap-[5px] items-center justify-center">
            <p style={{ 
              fontWeight: 'var(--font-weight-bold)',
              lineHeight: '1.3',
              fontSize: '20px',
              color: 'var(--color-secondary-foreground)',
              textAlign: 'center'
            }}>
              {t('paymentCompleted')}
            </p>
            {changeToReturn > 0 && (
              <p style={{ 
                fontWeight: 'var(--font-weight-semibold)',
                lineHeight: '1.3',
                fontSize: 'var(--text-base)',
                color: '#268647',
                textAlign: 'center'
              }}>
                {t('customerChangeReturn')}: {formatCurrency(changeToReturn)},-
              </p>
            )}
          </div>
        </div>

        {/* Separator */}
        <div className="h-[1px] w-full" style={{ backgroundColor: 'var(--color-border)' }} />

        {/* Receipt Options Grid */}
        <div className="grid grid-cols-2 gap-[20px]">
          {/* Print Receipt */}
          <div className="flex flex-col gap-[12px]">
            <p style={{ 
              fontWeight: 'var(--font-weight-bold)',
              fontSize: 'var(--text-base)',
              lineHeight: '1.75',
              color: 'var(--color-secondary-foreground)'
            }}>
              {t('printReceipt')}
            </p>
            
            {/* Vanlig Toggle */}
            <button
              onClick={() => setPrintReceipt(printReceipt === 'vanlig' ? null : 'vanlig')}
              className="flex items-center gap-[12px] h-[56px] px-[16px] rounded-[var(--radius)] transition-colors"
              style={{ 
                backgroundColor: 'var(--color-card)',
                border: '1px solid var(--color-border)'
              }}
            >
              <div className="h-[26px] w-[48px] relative">
                <div 
                  className="absolute inset-[15%_0_15%_2.7%] rounded-[125px] transition-colors"
                  style={{ backgroundColor: printReceipt === 'vanlig' ? '#86cbfd' : '#989899' }}
                />
                <div 
                  className="absolute rounded-[125px] border-[1.5px] border-solid shadow-[0px_1.25px_2.5px_0px_rgba(0,0,0,0.27)] transition-all size-[26px]"
                  style={{ 
                    backgroundColor: printReceipt === 'vanlig' ? 'var(--color-primary)' : 'white',
                    borderColor: printReceipt === 'vanlig' ? 'var(--color-primary)' : '#d5d5d7',
                    left: printReceipt === 'vanlig' ? '22px' : '0',
                    top: '0'
                  }}
                />
              </div>
              <p style={{ 
                fontSize: 'var(--text-base)', 
                color: 'var(--color-secondary-foreground)',
                fontWeight: 'var(--font-weight-medium)'
              }}>
                {t('regular')}
              </p>
            </button>

            {/* A4 Toggle */}
            <button
              onClick={() => setPrintReceipt(printReceipt === 'a4' ? null : 'a4')}
              className="flex items-center gap-[12px] h-[56px] px-[16px] rounded-[var(--radius)] transition-colors"
              style={{ 
                backgroundColor: 'var(--color-card)',
                border: '1px solid var(--color-border)'
              }}
            >
              <div className="h-[26px] w-[48px] relative">
                <div 
                  className="absolute inset-[15%_0_15%_2.7%] rounded-[125px] transition-colors"
                  style={{ backgroundColor: printReceipt === 'a4' ? '#86cbfd' : '#989899' }}
                />
                <div 
                  className="absolute rounded-[125px] border-[1.5px] border-solid shadow-[0px_1.25px_2.5px_0px_rgba(0,0,0,0.27)] transition-all size-[26px]"
                  style={{ 
                    backgroundColor: printReceipt === 'a4' ? 'var(--color-primary)' : 'white',
                    borderColor: printReceipt === 'a4' ? 'var(--color-primary)' : '#d5d5d7',
                    left: printReceipt === 'a4' ? '22px' : '0',
                    top: '0'
                  }}
                />
              </div>
              <p style={{ 
                fontSize: 'var(--text-base)', 
                color: 'var(--color-secondary-foreground)',
                fontWeight: 'var(--font-weight-medium)'
              }}>
                {t('a4Paper')}
              </p>
            </button>
          </div>

          {/* Digital Receipt */}
          <div className="flex flex-col gap-[12px]">
            <p style={{ 
              fontWeight: 'var(--font-weight-bold)',
              fontSize: 'var(--text-base)',
              lineHeight: '1.75',
              color: 'var(--color-secondary-foreground)'
            }}>
              {t('digitalReceipt')}
            </p>

            {/* Email Toggle with Input */}
            <div className="flex flex-col">
              <button
                onClick={() => setDigitalReceipt(digitalReceipt === 'email' ? null : 'email')}
                className="flex items-center gap-[12px] h-[56px] px-[16px] transition-colors"
                style={{ 
                  backgroundColor: digitalReceipt === 'email' ? '#f0f9ff' : 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: digitalReceipt === 'email' ? 'var(--radius) var(--radius) 0 0' : 'var(--radius)',
                  borderBottom: digitalReceipt === 'email' ? 'none' : '1px solid var(--color-border)'
                }}
              >
                <div className="h-[26px] w-[48px] relative">
                  <div 
                    className="absolute inset-[15%_0_15%_2.7%] rounded-[125px] transition-colors"
                    style={{ backgroundColor: digitalReceipt === 'email' ? '#86cbfd' : '#989899' }}
                  />
                  <div 
                    className="absolute rounded-[125px] border-[1.5px] border-solid shadow-[0px_1.25px_2.5px_0px_rgba(0,0,0,0.27)] transition-all size-[26px]"
                    style={{ 
                      backgroundColor: digitalReceipt === 'email' ? 'var(--color-primary)' : 'white',
                      borderColor: digitalReceipt === 'email' ? 'var(--color-primary)' : '#d5d5d7',
                      left: digitalReceipt === 'email' ? '22px' : '0',
                      top: '0'
                    }}
                  />
                </div>
                <p style={{ 
                  fontSize: 'var(--text-base)', 
                  color: 'var(--color-secondary-foreground)',
                  fontWeight: 'var(--font-weight-medium)'
                }}>
                  {t('email')}
                </p>
              </button>
              
              {/* Email Input Field */}
              {digitalReceipt === 'email' && (
                <div 
                  className="flex flex-col items-start px-[15px] py-[15px]"
                  style={{ 
                    backgroundColor: '#fafafa',
                    borderLeft: '1px solid var(--color-border)',
                    borderRight: '1px solid var(--color-border)',
                    borderBottom: '1px solid var(--color-border)',
                    borderRadius: '0 0 var(--radius) var(--radius)',
                    paddingLeft: '77px'
                  }}
                >
                  <input
                    type="email"
                    value={emailValue}
                    onChange={(e) => setEmailValue(e.target.value)}
                    className="h-[48px] px-[14px] py-[8px] rounded-[var(--radius)] w-[254px] focus:outline-none focus:ring-2 focus:ring-primary/20"
                    style={{ 
                      backgroundColor: 'white',
                      border: '1px solid var(--color-border)',
                      fontSize: 'var(--text-base)',
                      color: 'var(--color-secondary-foreground)'
                    }}
                    placeholder="example@email.com"
                  />
                </div>
              )}
            </div>

            {/* SMS Toggle with Input */}
            <div className="flex flex-col">
              <button
                onClick={() => setDigitalReceipt(digitalReceipt === 'sms' ? null : 'sms')}
                className="flex items-center gap-[12px] h-[56px] px-[16px] transition-colors"
                style={{ 
                  backgroundColor: digitalReceipt === 'sms' ? '#f0f9ff' : 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: digitalReceipt === 'sms' ? 'var(--radius) var(--radius) 0 0' : 'var(--radius)',
                  borderBottom: digitalReceipt === 'sms' ? 'none' : '1px solid var(--color-border)'
                }}
              >
                <div className="h-[26px] w-[48px] relative">
                  <div 
                    className="absolute inset-[15%_0_15%_2.7%] rounded-[125px] transition-colors"
                    style={{ backgroundColor: digitalReceipt === 'sms' ? '#86cbfd' : '#989899' }}
                  />
                  <div 
                    className="absolute rounded-[125px] border-[1.5px] border-solid shadow-[0px_1.25px_2.5px_0px_rgba(0,0,0,0.27)] transition-all size-[26px]"
                    style={{ 
                      backgroundColor: digitalReceipt === 'sms' ? 'var(--color-primary)' : 'white',
                      borderColor: digitalReceipt === 'sms' ? 'var(--color-primary)' : '#d5d5d7',
                      left: digitalReceipt === 'sms' ? '22px' : '0',
                      top: '0'
                    }}
                  />
                </div>
                <p style={{ 
                  fontSize: 'var(--text-base)', 
                  color: 'var(--color-secondary-foreground)',
                  fontWeight: 'var(--font-weight-medium)'
                }}>
                  SMS
                </p>
              </button>
              
              {/* SMS Input Field */}
              {digitalReceipt === 'sms' && (
                <div 
                  className="flex flex-col items-start px-[15px] py-[15px]"
                  style={{ 
                    backgroundColor: '#fafafa',
                    borderLeft: '1px solid var(--color-border)',
                    borderRight: '1px solid var(--color-border)',
                    borderBottom: '1px solid var(--color-border)',
                    borderRadius: '0 0 var(--radius) var(--radius)',
                    paddingLeft: '77px'
                  }}
                >
                  <input
                    type="tel"
                    value={smsValue}
                    onChange={(e) => setSmsValue(e.target.value)}
                    className="h-[48px] px-[14px] py-[8px] rounded-[var(--radius)] w-[254px] focus:outline-none focus:ring-2 focus:ring-primary/20"
                    style={{ 
                      backgroundColor: 'white',
                      border: '1px solid var(--color-border)',
                      fontSize: 'var(--text-base)',
                      color: 'var(--color-secondary-foreground)'
                    }}
                    placeholder="000 000 00"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Seller Section */}
        <div className="flex flex-col gap-[8px]">
          <p style={{ 
            fontWeight: 'var(--font-weight-bold)',
            fontSize: 'var(--text-base)',
            lineHeight: '1.75',
            color: 'var(--color-secondary-foreground)'
          }}>
            {t('sellerOnSale')}
          </p>
          <div 
            className="bg-card flex gap-[10px] h-[48px] items-center px-[14px] py-[8px] rounded-[var(--radius)] relative"
            style={{ border: '1px solid var(--color-border)' }}
          >
            <p style={{ 
              fontSize: 'var(--text-base)',
              color: 'var(--color-secondary-foreground)',
              flex: '1 1 0%'
            }}>
              9988: Ola Nordmann
            </p>
            <Search className="size-[18px] opacity-50" style={{ color: 'var(--color-secondary-foreground)' }} />
          </div>
        </div>

        {/* Exchange Slip Section */}
        <div className="flex flex-col gap-[12px]">
          <p style={{ 
            fontWeight: 'var(--font-weight-bold)',
            fontSize: 'var(--text-base)',
            lineHeight: '1.75',
            color: 'var(--color-secondary-foreground)'
          }}>
            {t('exchangeSlip')}
          </p>

          {/* Exchange Slip Toggle */}
          <button
            onClick={() => setExchangeSlip(!exchangeSlip)}
            className="flex items-center gap-[12px] h-[56px] px-[16px] rounded-[var(--radius)] transition-colors"
            style={{ 
              backgroundColor: 'var(--color-card)',
              border: '1px solid var(--color-border)'
            }}
          >
            <div className="h-[26px] w-[48px] relative">
              <div 
                className="absolute inset-[15%_0_15%_2.7%] rounded-[125px] transition-colors"
                style={{ backgroundColor: exchangeSlip ? '#86cbfd' : '#989899' }}
              />
              <div 
                className="absolute rounded-[125px] border-[1.5px] border-solid shadow-[0px_1.25px_2.5px_0px_rgba(0,0,0,0.27)] transition-all size-[26px]"
                style={{ 
                  backgroundColor: exchangeSlip ? 'var(--color-primary)' : 'white',
                  borderColor: exchangeSlip ? 'var(--color-primary)' : '#d5d5d7',
                  left: exchangeSlip ? '22px' : '0',
                  top: '0'
                }}
              />
            </div>
            <p style={{ 
              fontSize: 'var(--text-base)', 
              color: 'var(--color-secondary-foreground)',
              fontWeight: 'var(--font-weight-medium)'
            }}>
              {t('printExchangeSlip')}
            </p>
          </button>

          {/* Exchange Slip Quantity Counter */}
          {exchangeSlip && (
            <div className="flex items-center justify-center gap-[12px] h-[56px] px-[16px] py-[12px]">
              <button
                onClick={() => setExchangeSlipQuantity(Math.max(1, exchangeSlipQuantity - 1))}
                className="flex items-center justify-center size-[40px] rounded-[var(--radius)] transition-colors hover:opacity-80"
                style={{ 
                  backgroundColor: 'var(--color-card)',
                  border: '1px solid var(--color-border)'
                }}
              >
                <span style={{ fontSize: '20px', color: 'var(--color-secondary-foreground)' }}>−</span>
              </button>
              
              <input
                type="text"
                value={exchangeSlipQuantity}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  if (!isNaN(val) && val > 0) {
                    setExchangeSlipQuantity(val);
                  }
                }}
                className="flex items-center justify-center size-[40px] text-center rounded-[var(--radius)] focus:outline-none"
                style={{ 
                  backgroundColor: 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                  fontSize: 'var(--text-base)',
                  color: 'var(--color-secondary-foreground)',
                  fontWeight: 'var(--font-weight-medium)'
                }}
              />
              
              <button
                onClick={() => setExchangeSlipQuantity(exchangeSlipQuantity + 1)}
                className="flex items-center justify-center size-[40px] rounded-[var(--radius)] transition-colors hover:opacity-80"
                style={{ 
                  backgroundColor: 'var(--color-card)',
                  border: '1px solid var(--color-border)'
                }}
              >
                <span style={{ fontSize: '20px', color: 'var(--color-secondary-foreground)' }}>+</span>
              </button>
            </div>
          )}
        </div>

        {/* Confirm Button */}
        <button
          onClick={onConfirm}
          className="bg-primary text-primary-foreground flex h-[48px] items-center justify-center min-w-[100px] px-[20px] py-[6px] rounded-[var(--radius)] w-full hover:opacity-90 transition-opacity"
        >
          <p style={{ 
            fontWeight: 'var(--font-weight-semibold)',
            fontSize: '15px',
            textAlign: 'center'
          }}>
            {t('confirm')}
          </p>
        </button>
      </div>
    </div>
  );
}