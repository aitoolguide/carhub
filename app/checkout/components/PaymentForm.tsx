import React from 'react';
import { CreditCard } from 'lucide-react';
import { Input } from '@app/components/ui';

interface PaymentFormProps {
  paymentInfo: {
    cardNumber: string;
    expiryDate: string;
    cvc: string;
  };
  onPaymentInfoChange: (info: any) => void;
}

/**
 * A component to capture mock payment information during checkout.
 */
const PaymentForm = ({ paymentInfo, onPaymentInfoChange }: PaymentFormProps) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border">
      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <CreditCard size={20} />
        Payment Details
      </h3>
      <div className="grid grid-cols-1 gap-4">
        <Input
          type="text"
          placeholder="Card Number"
          value={paymentInfo.cardNumber}
          onChange={(e) => onPaymentInfoChange({ ...paymentInfo, cardNumber: e.target.value })}
          required
        />
        <div className="flex gap-4">
          <Input
            type="text"
            placeholder="MM/YY"
            value={paymentInfo.expiryDate}
            onChange={(e) => onPaymentInfoChange({ ...paymentInfo, expiryDate: e.target.value })}
            required
          />
          <Input
            type="text"
            placeholder="CVC"
            value={paymentInfo.cvc}
            onChange={(e) => onPaymentInfoChange({ ...paymentInfo, cvc: e.target.value })}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
