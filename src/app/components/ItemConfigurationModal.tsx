import { useState } from 'react';
import { X, Plus, Minus } from 'lucide-react';

interface ItemConfigurationModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemName: string;
  itemCode: string;
  defaultPrice: number;
  availableUnits: string[];
  defaultUnit: string;
  onConfirm: (config: {
    quantity: number;
    unit: string;
    price: number;
    discount: number;
  }) => void;
}

export function ItemConfigurationModal({
  isOpen,
  onClose,
  itemName,
  itemCode,
  defaultPrice,
  availableUnits,
  defaultUnit,
  onConfirm
}: ItemConfigurationModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedUnit, setSelectedUnit] = useState(defaultUnit);
  const [price, setPrice] = useState(defaultPrice);
  const [discount, setDiscount] = useState(0);

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm({
      quantity,
      unit: selectedUnit,
      price,
      discount
    });
    // Reset for next time
    setQuantity(1);
    setSelectedUnit(defaultUnit);
    setPrice(defaultPrice);
    setDiscount(0);
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(0.01, prev - 1));

  const calculateTotal = () => {
    const subtotal = quantity * price;
    const discountAmount = subtotal * (discount / 100);
    return subtotal - discountAmount;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div 
        className="relative bg-card rounded-[var(--radius-lg)] w-[480px] max-h-[90vh] overflow-auto"
        style={{ boxShadow: 'var(--elevation-sm)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: 'var(--border)' }}>
          <div>
            <h2 className="font-semibold" style={{ fontSize: 'var(--text-xl)', color: 'var(--card-foreground)' }}>
              Configure Item
            </h2>
            <p className="font-normal mt-1" style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>
              {itemName}
            </p>
            <p className="font-normal" style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>
              {itemCode}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-[var(--radius)] hover:bg-muted transition-colors"
          >
            <X className="size-5" style={{ color: 'var(--muted-foreground)' }} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Quantity */}
          <div>
            <label className="block font-bold mb-2" style={{ fontSize: 'var(--text-sm)', color: 'var(--card-foreground)' }}>
              Quantity
            </label>
            <div className="flex items-center gap-3">
              <button
                onClick={decrementQuantity}
                className="flex items-center justify-center size-10 rounded-[var(--radius)] border transition-colors hover:bg-muted"
                style={{ borderColor: 'var(--border)' }}
              >
                <Minus className="size-4" style={{ color: 'var(--foreground)' }} />
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(0.01, parseFloat(e.target.value) || 0))}
                className="flex-1 px-4 py-2 rounded-[var(--radius)] border text-center font-normal"
                style={{ 
                  fontSize: 'var(--text-base)',
                  borderColor: 'var(--border)',
                  backgroundColor: 'var(--input-background)',
                  color: 'var(--foreground)'
                }}
                step="0.01"
                min="0.01"
              />
              <button
                onClick={incrementQuantity}
                className="flex items-center justify-center size-10 rounded-[var(--radius)] border transition-colors hover:bg-muted"
                style={{ borderColor: 'var(--border)' }}
              >
                <Plus className="size-4" style={{ color: 'var(--foreground)' }} />
              </button>
            </div>
          </div>

          {/* Unit Selection */}
          <div>
            <label className="block font-bold mb-2" style={{ fontSize: 'var(--text-sm)', color: 'var(--card-foreground)' }}>
              Unit
            </label>
            <div className="grid grid-cols-3 gap-2">
              {availableUnits.map(unit => (
                <button
                  key={unit}
                  onClick={() => setSelectedUnit(unit)}
                  className={`px-4 py-2 rounded-[var(--radius)] border transition-colors font-medium ${
                    selectedUnit === unit ? 'bg-primary border-primary' : 'hover:bg-muted'
                  }`}
                  style={{ 
                    fontSize: 'var(--text-base)',
                    borderColor: selectedUnit === unit ? 'var(--primary)' : 'var(--border)',
                    backgroundColor: selectedUnit === unit ? 'var(--primary)' : 'transparent',
                    color: selectedUnit === unit ? 'var(--primary-foreground)' : 'var(--foreground)'
                  }}
                >
                  {unit}
                </button>
              ))}
            </div>
          </div>

          {/* Price */}
          <div>
            <label className="block font-bold mb-2" style={{ fontSize: 'var(--text-sm)', color: 'var(--card-foreground)' }}>
              Price per unit (kr)
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Math.max(0, parseFloat(e.target.value) || 0))}
              className="w-full px-4 py-2 rounded-[var(--radius)] border font-normal"
              style={{ 
                fontSize: 'var(--text-base)',
                borderColor: 'var(--border)',
                backgroundColor: 'var(--input-background)',
                color: 'var(--foreground)'
              }}
              step="0.01"
              min="0"
            />
          </div>

          {/* Discount */}
          <div>
            <label className="block font-bold mb-2" style={{ fontSize: 'var(--text-sm)', color: 'var(--card-foreground)' }}>
              Discount (%)
            </label>
            <input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(Math.min(100, Math.max(0, parseFloat(e.target.value) || 0)))}
              className="w-full px-4 py-2 rounded-[var(--radius)] border font-normal"
              style={{ 
                fontSize: 'var(--text-base)',
                borderColor: 'var(--border)',
                backgroundColor: 'var(--input-background)',
                color: 'var(--foreground)'
              }}
              step="1"
              min="0"
              max="100"
            />
          </div>

          {/* Total Summary */}
          <div className="pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
            <div className="flex justify-between items-center">
              <span className="font-semibold" style={{ fontSize: 'var(--text-base)', color: 'var(--card-foreground)' }}>
                Total:
              </span>
              <span className="font-bold" style={{ fontSize: 'var(--text-xl)', color: 'var(--card-foreground)' }}>
                {calculateTotal().toFixed(2)} kr
              </span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between items-center mt-2">
                <span className="font-normal" style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>
                  Subtotal:
                </span>
                <span className="font-normal line-through" style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>
                  {(quantity * price).toFixed(2)} kr
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t" style={{ borderColor: 'var(--border)' }}>
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 rounded-[var(--radius)] border transition-colors hover:bg-muted font-medium"
            style={{ 
              fontSize: 'var(--text-base)',
              borderColor: 'var(--border)',
              color: 'var(--foreground)'
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 px-4 py-2 rounded-[var(--radius)] transition-colors font-medium"
            style={{ 
              fontSize: 'var(--text-base)',
              backgroundColor: 'var(--primary)',
              color: 'var(--primary-foreground)'
            }}
          >
            Add to Sale
          </button>
        </div>
      </div>
    </div>
  );
}