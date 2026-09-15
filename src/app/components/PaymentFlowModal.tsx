import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { X, RotateCcw } from 'lucide-react';
import svgPaths from "../imports/svg-cdeaem494j";
import { imgGroup } from "../imports/svg-95rba";
import Header from '../imports/Header-61-13721';
import svgPathsPayment from "../imports/svg-ll2p1tnd4y";
import svgPathsSpinner from "../imports/svg-k33k9dvofh";
import { PaymentCompletedModal } from './PaymentCompletedModal';
import { OrderDiscountModal } from './OrderDiscountModal';

type PaymentMethod = 'card' | 'cash' | 'vipps' | 'klarna' | null;

interface PaymentEntry {
  id: string;
  method: PaymentMethod;
  amount: number;
  methodLabel: string;
}

interface PaymentFlowModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalAmount: number;
  onPaymentComplete?: (payments: PaymentEntry[]) => void;
  onMenuClick?: () => void;
  isMenuOpen?: boolean;
  onProfileClick?: () => void;
  isProfileOpen?: boolean;
  currentUser?: string;
}

export function PaymentFlowModal({ isOpen, onClose, totalAmount, onPaymentComplete, onMenuClick, isMenuOpen, onProfileClick, isProfileOpen, currentUser }: PaymentFlowModalProps) {
  const { t } = useLanguage();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('card');
  const [inputAmount, setInputAmount] = useState('');
  const [payments, setPayments] = useState<PaymentEntry[]>([]);
  const [extraCashWithdrawal, setExtraCashWithdrawal] = useState(false);
  const [isPaymentCompleted, setIsPaymentCompleted] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [isDiscountModalOpen, setIsDiscountModalOpen] = useState(false);
  const [selectedPaymentId, setSelectedPaymentId] = useState<string | null>(null);

  const remainingAmount = totalAmount - payments.reduce((sum, p) => sum + p.amount, 0);

  useEffect(() => {
    if (isOpen) {
      // Reset state when modal opens
      setSelectedMethod('card');
      setInputAmount(Math.round(remainingAmount).toString());
      setPayments([]);
      setExtraCashWithdrawal(false);
      setIsPaymentCompleted(false);
      setIsProcessingPayment(false);
    }
  }, [isOpen]);

  useEffect(() => {
    // Update input amount when remaining amount changes
    if (remainingAmount > 0 && !inputAmount) {
      setInputAmount(Math.round(remainingAmount).toString());
    }
  }, [remainingAmount]);

  // Add keyboard event listener
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Only handle keyboard input when modal is open
      if (!isOpen) return;

      // Handle number keys (0-9)
      if (event.key >= '0' && event.key <= '9') {
        event.preventDefault();
        handleNumpadClick(event.key);
      }
      // Handle backspace
      else if (event.key === 'Backspace') {
        event.preventDefault();
        handleNumpadClick('backspace');
      }
      // Handle Escape to clear
      else if (event.key === 'Escape') {
        event.preventDefault();
        handleNumpadClick('C');
      }
      // Handle Enter to start payment
      else if (event.key === 'Enter') {
        event.preventDefault();
        handleStartPayment();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, inputAmount, selectedMethod]);

  if (!isOpen) return null;

  const formatCurrency = (amount: number) => {
    return Math.round(amount).toLocaleString('no-NO');
  };

  const getPaymentMethodLabel = (method: PaymentMethod): string => {
    switch (method) {
      case 'card': return t('card');
      case 'cash': return t('cash');
      case 'vipps': return t('vipps');
      case 'klarna': return t('klarna');
      default: return '';
    }
  };

  const getPaymentTitle = () => {
    switch (selectedMethod) {
      case 'card': return t('paymentCard');
      case 'cash': return t('paymentCash');
      case 'vipps': return t('paymentVipps');
      case 'klarna': return t('paymentKlarna');
      default: return t('paymentCard');
    }
  };

  const getAmountLabel = () => {
    return selectedMethod === 'card' ? t('amountOnCard') : t('amountInCash');
  };

  const handleNumpadClick = (value: string) => {
    if (value === 'C') {
      setInputAmount('');
    } else if (value === 'backspace') {
      setInputAmount(prev => prev.slice(0, -1));
    } else {
      setInputAmount(prev => prev + value);
    }
  };

  const handleQuickAmount = (amount: number) => {
    const currentAmount = parseInt(inputAmount) || 0;
    setInputAmount((currentAmount + amount).toString());
  };

  const handleStartPayment = () => {
    if (!selectedMethod) return;
    
    const amount = parseInt(inputAmount) || 0;
    if (amount <= 0) return;

    const newPayment: PaymentEntry = {
      id: Date.now().toString(),
      method: selectedMethod,
      amount,
      methodLabel: getPaymentMethodLabel(selectedMethod)
    };

    const newPayments = [...payments, newPayment];
    setPayments(newPayments);
    setInputAmount('');
    
    const newRemaining = totalAmount - newPayments.reduce((sum, p) => sum + p.amount, 0);
    
    // Just set the remaining amount in the input, don't trigger payment completion
    if (newRemaining > 0) {
      setInputAmount(Math.round(newRemaining).toString());
    }
  };

  const handleUndoPayment = (paymentId: string) => {
    setPayments(prev => prev.filter(p => p.id !== paymentId));
  };

  const handleConfirmPayment = async () => {
    if (remainingAmount > 0) return;
    
    setIsProcessingPayment(true);
    
    // Simulate payment processing (2 seconds)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessingPayment(false);
    setIsPaymentCompleted(true);
  };

  const handleApplyDiscount = (newAmount: number) => {
    if (selectedPaymentId) {
      setPayments(prevPayments => 
        prevPayments.map(payment => 
          payment.id === selectedPaymentId ? { ...payment, amount: newAmount } : payment
        )
      );
    }
  };

  const vatAmount = totalAmount * 0.25; // Assuming 25% VAT

  return (
    <div className="fixed inset-0 z-50 flex flex-col" style={{ backgroundColor: 'var(--color-background)' }}>
      {/* Header */}
      <Header 
        onMenuClick={onMenuClick || (() => {})}
        isMenuOpen={isMenuOpen}
        isPaymentMode={true}
        paymentTitle={getPaymentTitle()}
        onPaymentClose={onClose}
        onProfileClick={onProfileClick || (() => {})}
        isProfileOpen={isProfileOpen}
        currentUser={currentUser}
      />

      {/* Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left content area */}
        <div className="flex-1 bg-card overflow-y-auto">
          <div className="p-[20px]">
            {/* Payment method selection */}
            <div className="flex gap-[12px] items-end mb-[20px] flex-wrap">
              {/* Card */}
              <button
                onClick={() => setSelectedMethod('card')}
                className="flex flex-col items-center justify-center pb-[10px] pt-[20px] px-[20px] h-[110px] w-[120px] rounded-[var(--radius)] transition-all"
                style={{
                  backgroundColor: selectedMethod === 'card' ? 'var(--color-primary)' : 'var(--color-card)',
                  border: selectedMethod === 'card' ? '1.74px solid var(--color-primary)' : '1.74px solid var(--color-border)'
                }}
              >
                <div className="mb-[-7px] relative shrink-0 size-[48px]">
                  {selectedMethod === 'card' ? (
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
                      <rect fill="var(--color-primary)" height="48" rx="10" width="48" />
                      <path d={svgPaths.pba52600} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
                    </svg>
                  ) : (
                    <div className="w-full h-full" />
                  )}
                </div>
                <p style={{ 
                  color: selectedMethod === 'card' ? 'white' : 'var(--color-foreground)',
                  fontWeight: 'var(--font-weight-medium)'
                }}>
                  {t('card')}
                </p>
              </button>

              {/* Cash */}
              <button
                onClick={() => setSelectedMethod('cash')}
                className="flex flex-col items-center justify-center pb-[10px] pt-[20px] px-[20px] h-[110px] w-[120px] rounded-[var(--radius)] transition-all"
                style={{
                  backgroundColor: selectedMethod === 'cash' ? 'var(--color-primary)' : 'var(--color-card)',
                  border: selectedMethod === 'cash' ? '1.74px solid var(--color-primary)' : '1.74px solid var(--color-border)'
                }}
              >
                <div className="h-[42px] w-[44px] mb-[0px]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 35 35">
                    <path 
                      d={svgPaths.p1247000} 
                      stroke={selectedMethod === 'cash' ? 'white' : 'var(--color-secondary-foreground)'} 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2.1875" 
                    />
                    <path 
                      d={svgPaths.p2c2cd380} 
                      stroke={selectedMethod === 'cash' ? 'white' : 'var(--color-secondary-foreground)'} 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2.1875" 
                    />
                    <path 
                      d="M17.5 10.9377V7.65649" 
                      stroke={selectedMethod === 'cash' ? 'white' : 'var(--color-secondary-foreground)'} 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2.1875" 
                    />
                    <path 
                      d="M17.5 27.3441V24.0629" 
                      stroke={selectedMethod === 'cash' ? 'white' : 'var(--color-secondary-foreground)'} 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2.1875" 
                    />
                  </svg>
                </div>
                <p style={{ 
                  color: selectedMethod === 'cash' ? 'white' : 'var(--color-foreground)',
                  fontWeight: 'var(--font-weight-medium)'
                }}>
                  {t('cash')}
                </p>
              </button>

              {/* Vipps */}
              <button
                onClick={() => setSelectedMethod('vipps')}
                className="flex flex-col items-center justify-center pb-[10px] pt-[20px] px-[25px] h-[110px] w-[120px] rounded-[var(--radius)] transition-all"
                style={{
                  backgroundColor: selectedMethod === 'vipps' ? 'var(--color-primary)' : 'var(--color-card)',
                  border: selectedMethod === 'vipps' ? '1.74px solid var(--color-primary)' : '1.471px solid var(--color-border)'
                }}
              >
                <div className="h-[41px] w-[62px]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 43 29">
                    <path d={svgPaths.p393ba500} fill="#FF5B24" />
                    <path clipRule="evenodd" d={svgPaths.p1ec77580} fill="white" fillRule="evenodd" />
                  </svg>
                </div>
                <p style={{ 
                  color: selectedMethod === 'vipps' ? 'white' : 'var(--color-foreground)',
                  fontWeight: 'var(--font-weight-medium)'
                }}>
                  {t('vipps')}
                </p>
              </button>

              {/* Klarna */}
              <button
                onClick={() => setSelectedMethod('klarna')}
                className="flex flex-col items-center justify-center pb-[10px] pt-[20px] px-[25px] h-[110px] w-[120px] rounded-[var(--radius)] transition-all"
                style={{
                  backgroundColor: selectedMethod === 'klarna' ? 'var(--color-primary)' : 'var(--color-card)',
                  border: selectedMethod === 'klarna' ? '1.74px solid var(--color-primary)' : '1.471px solid var(--color-border)'
                }}
              >
                <div className="h-[42px] w-[83px]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 54.4444 27.2222">
                    <path clipRule="evenodd" d={svgPaths.p2f78ac80} fill="#FFB3C7" fillRule="evenodd" />
                    <path clipRule="evenodd" d={svgPaths.p33847600} fill="black" fillRule="evenodd" />
                    <path clipRule="evenodd" d={svgPaths.p92679b0} fill="black" fillRule="evenodd" />
                    <path clipRule="evenodd" d={svgPaths.p30c51600} fill="black" fillRule="evenodd" />
                    <path clipRule="evenodd" d={svgPaths.p1bd0cf80} fill="black" fillRule="evenodd" />
                    <path clipRule="evenodd" d={svgPaths.p14efbb00} fill="black" fillRule="evenodd" />
                    <path clipRule="evenodd" d={svgPaths.p2871300} fill="black" fillRule="evenodd" />
                    <path clipRule="evenodd" d={svgPaths.p2b3ae680} fill="black" fillRule="evenodd" />
                    <path clipRule="evenodd" d={svgPaths.p2ab01880} fill="black" fillRule="evenodd" />
                  </svg>
                </div>
                <p style={{ 
                  color: selectedMethod === 'klarna' ? 'white' : 'var(--color-foreground)',
                  fontWeight: 'var(--font-weight-medium)'
                }}>
                  {t('klarna')}
                </p>
              </button>

              {/* Show more button */}
              <button
                className="flex gap-[10px] h-[48px] items-center px-[15px] py-[5px] rounded-[var(--radius)] transition-opacity hover:opacity-80"
                style={{
                  backgroundColor: 'var(--color-card)',
                  border: '1px solid var(--color-border)'
                }}
              >
                <span style={{ fontWeight: 'var(--font-weight-semibold)' }}>{t('showMore')}</span>
                <svg className="h-[6.175px] w-[10px]" fill="none" preserveAspectRatio="none" viewBox="0 0 10 6.175">
                  <path d={svgPaths.p312e7240} fill="var(--color-foreground)" />
                </svg>
              </button>
            </div>

            {/* Extra cash withdrawal checkbox - always visible */}
            <div className="mb-[20px]">
              <div className="flex gap-[8px] items-center mb-[15px]">
                <button
                  onClick={() => setExtraCashWithdrawal(!extraCashWithdrawal)}
                  className="relative rounded-[var(--radius)] shrink-0 size-[24px] flex items-center justify-center transition-colors"
                  style={{ 
                    backgroundColor: extraCashWithdrawal ? 'var(--color-primary)' : 'var(--color-card)',
                    border: extraCashWithdrawal ? '1px solid var(--color-primary)' : '1px solid var(--color-border)'
                  }}
                >
                  {extraCashWithdrawal && (
                    <svg className="size-[16px]" fill="none" viewBox="0 0 16 16">
                      <path d="M13.3334 4L6.00002 11.3333L2.66669 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
                <label 
                  className="cursor-pointer"
                  style={{ fontSize: 'var(--text-base)' }}
                  onClick={() => setExtraCashWithdrawal(!extraCashWithdrawal)}
                >
                  {t('extraCashWithdrawal')}
                </label>
              </div>

              {/* Extra cash withdrawal input field */}
              {extraCashWithdrawal && (
                <div className="max-w-[388px]">
                  <label 
                    className="block mb-[8px]"
                    style={{ 
                      fontSize: 'var(--text-base)',
                      fontWeight: 'var(--font-weight-semibold)'
                    }}
                  >
                    {t('extraCashWithdrawal')}
                  </label>
                  <input
                    type="text"
                    placeholder={t('amountForWithdrawal')}
                    className="w-full h-[48px] px-[14px] py-[8px] rounded-[var(--radius)] bg-card transition-colors focus:outline-none"
                    style={{ 
                      border: '2px solid var(--color-border)',
                      fontSize: 'var(--text-base)'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--color-ring)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
                  />
                </div>
              )}
            </div>

            {/* Numpad section */}
            <div 
              className="bg-background border rounded-[var(--radius)] p-[20px] max-w-[620px]"
              style={{ borderColor: 'var(--color-border)' }}
            >
              <h4 className="mb-[10px]" style={{ letterSpacing: '0.5px' }}>{getAmountLabel()}</h4>

              {/* Input field */}
              <div 
                className="bg-card flex gap-[10px] h-[48px] items-center px-[14px] py-[8px] rounded-[var(--radius)] mb-[30px] max-w-[388px]"
                style={{ border: '2px solid var(--color-ring)' }}
              >
                <div className="flex-1 flex items-center">
                  <span style={{ 
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--color-secondary-foreground)'
                  }}>
                    {inputAmount || '0'}
                  </span>
                  <div className="ml-[2px] w-[1px] h-[15px] bg-primary animate-pulse" />
                </div>
                <div className="relative shrink-0 size-[14px] opacity-50">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
                    <path d={svgPaths.p1279c700} fill="var(--color-foreground)" />
                    <path d={svgPaths.p2d62f180} fill="var(--color-foreground)" />
                  </svg>
                </div>
              </div>

              {/* Numpad and quick buttons */}
              <div className="flex gap-[20px]">
                {/* Numpad buttons */}
                <div className="flex flex-col gap-[14px]">
                  <div className="flex gap-[14px]">
                    {['1', '2', '3'].map(num => (
                      <button
                        key={num}
                        onClick={() => handleNumpadClick(num)}
                        className="bg-card h-[48px] w-[120px] rounded-[var(--radius)] hover:bg-muted transition-colors"
                        style={{ 
                          border: '1px solid var(--color-border)',
                          fontWeight: 'var(--font-weight-semibold)'
                        }}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-[14px]">
                    {['4', '5', '6'].map(num => (
                      <button
                        key={num}
                        onClick={() => handleNumpadClick(num)}
                        className="bg-card h-[48px] w-[120px] rounded-[var(--radius)] hover:bg-muted transition-colors"
                        style={{ 
                          border: '1px solid var(--color-border)',
                          fontWeight: 'var(--font-weight-semibold)'
                        }}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-[14px]">
                    {['7', '8', '9'].map(num => (
                      <button
                        key={num}
                        onClick={() => handleNumpadClick(num)}
                        className="bg-card h-[48px] w-[120px] rounded-[var(--radius)] hover:bg-muted transition-colors"
                        style={{ 
                          border: '1px solid var(--color-border)',
                          fontWeight: 'var(--font-weight-semibold)'
                        }}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-[14px]">
                    <button
                      onClick={() => handleNumpadClick('C')}
                      className="bg-card h-[48px] w-[120px] rounded-[var(--radius)] hover:bg-muted transition-colors"
                      style={{ 
                        border: '1px solid var(--color-border)',
                        fontWeight: 'var(--font-weight-semibold)'
                      }}
                    >
                      C
                    </button>
                    <button
                      onClick={() => handleNumpadClick('0')}
                      className="bg-card h-[48px] w-[120px] rounded-[var(--radius)] hover:bg-muted transition-colors"
                      style={{ 
                        border: '1px solid var(--color-border)',
                        fontWeight: 'var(--font-weight-semibold)'
                      }}
                    >
                      0
                    </button>
                    <button
                      onClick={() => handleNumpadClick('backspace')}
                      className="bg-card h-[48px] w-[120px] rounded-[var(--radius)] hover:bg-muted transition-colors flex items-center justify-center"
                      style={{ border: '1px solid var(--color-border)' }}
                    >
                      <svg className="h-[14.4px] w-[18px]" fill="none" preserveAspectRatio="none" viewBox="0 0 19.0909 15.4911">
                        <path d={svgPaths.p36765300} stroke="var(--color-foreground)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.09085" />
                        <path d={svgPaths.p3374740} stroke="var(--color-foreground)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.09085" />
                        <path d={svgPaths.p17633100} stroke="var(--color-foreground)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.09085" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Quick amount buttons and Start payment */}
                <div className="flex flex-col gap-[12px]">
                  <button
                    onClick={handleStartPayment}
                    disabled={!inputAmount || parseInt(inputAmount) <= 0}
                    className="bg-primary text-primary-foreground h-[48px] px-[20px] rounded-[var(--radius)] hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ fontWeight: 'var(--font-weight-semibold)', minWidth: '160px' }}
                  >
                    {t('startPayment')}
                  </button>
                  {[100, 200, 500, 1000].map(amount => (
                    <button
                      key={amount}
                      onClick={() => handleQuickAmount(amount)}
                      className="bg-card h-[48px] px-[20px] rounded-[var(--radius)] hover:bg-muted transition-colors"
                      style={{ 
                        border: '1px solid var(--color-border)',
                        fontWeight: 'var(--font-weight-semibold)',
                        minWidth: '160px'
                      }}
                    >
                      + {amount} ,-
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div 
          className="w-[326px] shrink-0 p-[20px] border-l overflow-y-auto"
          style={{ 
            backgroundColor: 'var(--color-background)',
            borderColor: 'var(--color-border)'
          }}
        >
          <div 
            className="bg-card rounded-[var(--radius)] p-[15px]"
            style={{ boxShadow: 'var(--elevation-sm)' }}
          >
            {/* Top section: Total and Remaining */}
            <div className="flex items-start justify-between mb-[5px] w-full">
              <div className="flex flex-col items-start">
                <p style={{ 
                  fontSize: 'var(--text-base)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--color-secondary-foreground)'
                }}>
                  {t('totalToPay')}:
                </p>
                <div className="flex items-baseline" style={{ fontWeight: 'var(--font-weight-bold)' }}>
                  <span style={{ fontSize: '30px' }}>{formatCurrency(totalAmount)}</span>
                  <span style={{ fontSize: 'var(--text-2xl)' }}>,-</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <p style={{ 
                  fontSize: 'var(--text-base)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--color-muted-foreground)'
                }}>
                  {t('remainingAmount')}:
                </p>
                <div className="flex items-baseline justify-end" style={{ 
                  fontWeight: 'var(--font-weight-medium)',
                  color: 'var(--color-muted-foreground)'
                }}>
                  <span style={{ fontSize: '30px' }}>{formatCurrency(remainingAmount)}</span>
                  <span style={{ fontSize: 'var(--text-2xl)' }}>,-</span>
                </div>
              </div>
            </div>

            {/* Bottom section with VAT and payments */}
            <div className="flex flex-col items-start relative">
              <div className="flex flex-col gap-[20px] items-start justify-center relative">
                {/* VAT breakdown */}
                <div className="flex flex-col gap-[3px]" style={{ 
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-muted-foreground)'
                }}>
                  <p>({formatCurrency(totalAmount - vatAmount)})</p>
                  <p>{t('includeVat')}: {formatCurrency(vatAmount)}</p>
                </div>

                {/* Payment entries */}
                {payments.map(payment => (
                  <div key={payment.id} className="h-[48px] relative w-[255.625px]">
                    {/* Payment method label */}
                    <p 
                      className="absolute left-0 top-[14px]"
                      style={{ fontSize: 'var(--text-base)' }}
                    >
                      {payment.methodLabel}:
                    </p>
                    
                    {/* Amount */}
                    <div 
                      className="absolute flex gap-[3px] items-center left-[90px] top-[14px] w-[38px]"
                      style={{ fontSize: 'var(--text-base)' }}
                    >
                      <p>{formatCurrency(payment.amount)}</p>
                      <p>,-</p>
                    </div>
                    
                    {/* Undo button */}
                    <div className="absolute flex gap-[6px] h-[48px] items-center justify-center left-[131px] px-[10px] py-0 top-0">
                      <button
                        onClick={() => handleUndoPayment(payment.id)}
                        className="flex gap-[6px] items-center justify-center hover:opacity-80 transition-opacity"
                      >
                        <div className="relative shrink-0 size-[12px]">
                          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
                            <g clipPath="url(#clip0_payment_undo)" id="Undo">
                              <path d={svgPathsPayment.p221a1900} stroke="var(--color-primary)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.75" />
                              <path d={svgPathsPayment.p7b263c0} stroke="var(--color-primary)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.75" />
                            </g>
                            <defs>
                              <clipPath id="clip0_payment_undo">
                                <rect fill="white" height="12" width="12" />
                              </clipPath>
                            </defs>
                          </svg>
                        </div>
                        <p style={{ 
                          fontSize: 'var(--text-sm)',
                          fontWeight: 'var(--font-weight-semibold)',
                          color: 'var(--color-primary)'
                        }}>
                          {t('undo')}
                        </p>
                      </button>
                    </div>
                    
                    {/* Three-dot vertical menu */}
                    <div className="absolute flex h-[48px] items-center justify-end left-[219px] px-[10px] py-0 top-0">
                      <button 
                        onClick={() => {
                          setSelectedPaymentId(payment.id);
                          setIsDiscountModalOpen(true);
                        }}
                        className="flex items-center px-[7px] py-[2px] hover:opacity-80 transition-opacity"
                      >
                        <div className="h-[11.075px] relative shrink-0 w-[2.625px]">
                          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.625 11.0752">
                            <g id="Group">
                              <path d={svgPathsPayment.p8fcf200} fill="var(--color-secondary-foreground)" />
                              <path d={svgPathsPayment.p3c2d3880} fill="var(--color-secondary-foreground)" />
                              <path d={svgPathsPayment.p3ea37700} fill="var(--color-secondary-foreground)" />
                            </g>
                          </svg>
                        </div>
                      </button>
                    </div>
                  </div>
                ))}

                {/* Separator line - positioned absolutely */}
                {payments.length > 0 && (
                  <div className="absolute h-0 left-1/2 top-[57px] -translate-x-1/2 w-[256px]">
                    <div className="absolute inset-[-1px_0_0_0]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 256 1">
                        <line stroke="var(--color-border)" x2="256" y1="0.5" y2="0.5" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Confirm Payment Button - below the card */}
            {!isProcessingPayment && (
              <button
                onClick={handleConfirmPayment}
                disabled={remainingAmount > 0}
                className="bg-primary text-primary-foreground h-[48px] px-[20px] rounded-[var(--radius)] hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed mt-[20px] w-full"
                style={{ fontWeight: 'var(--font-weight-semibold)' }}
              >
                {t('confirmPayment')}
              </button>
            )}

            {/* Payment Processing Animation */}
            {isProcessingPayment && (
              <div className="flex gap-[51px] items-center justify-center mt-[20px]">
                <div className="inline-grid grid-cols-[max-content] grid-rows-[max-content] place-items-start relative">
                  <div className="absolute inset-[1.25%]">
                    <svg className="block size-full animate-spin" fill="none" preserveAspectRatio="none" viewBox="0 0 26.325 26.325">
                      <g id="Group 10">
                        <path 
                          clipRule="evenodd" 
                          d={svgPathsSpinner.p385dff0} 
                          fill="#CCE6FB" 
                          fillRule="evenodd" 
                        />
                        <path 
                          clipRule="evenodd" 
                          d={svgPathsSpinner.p2a286c80} 
                          fill="var(--color-primary)\" 
                          fillRule="evenodd" 
                        />
                      </g>
                    </svg>
                  </div>
                  <p 
                    className="absolute left-[37px] top-[3.5px] relative"
                    style={{ 
                      fontWeight: 'var(--font-weight-semibold)',
                      fontStyle: 'italic',
                      fontSize: '12px',
                      lineHeight: '1.75',
                      color: 'var(--color-secondary-foreground)'
                    }}
                  >
                    {t('paymentOngoing')}
                  </p>
                </div>
                <button
                  onClick={() => setIsProcessingPayment(false)}
                  className="bg-card flex h-[40px] items-center px-[13px] py-[6px] rounded-[var(--radius)] hover:opacity-80 transition-opacity"
                  style={{ border: '1px solid var(--color-border)' }}
                >
                  <p style={{ 
                    fontWeight: 'var(--font-weight-semibold)',
                    fontSize: '13px',
                    lineHeight: '1.75',
                    color: 'var(--color-secondary-foreground)'
                  }}>
                    {t('cancelPayment')}
                  </p>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Payment completed modal */}
      {isPaymentCompleted && (
        <PaymentCompletedModal
          isOpen={isPaymentCompleted}
          onConfirm={() => {
            setIsPaymentCompleted(false);
            onClose();
          }}
          totalAmount={totalAmount}
          payments={payments}
        />
      )}

      {/* Order discount modal */}
      {isDiscountModalOpen && selectedPaymentId && (() => {
        const selectedPayment = payments.find(p => p.id === selectedPaymentId);
        return selectedPayment ? (
          <OrderDiscountModal
            isOpen={isDiscountModalOpen}
            onClose={() => setIsDiscountModalOpen(false)}
            onApply={handleApplyDiscount}
            currentAmount={selectedPayment.amount}
            paymentId={selectedPayment.id}
          />
        ) : null;
      })()}
    </div>
  );
}