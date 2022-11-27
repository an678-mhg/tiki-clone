import React, { FC } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

interface PaymentItemProps {
  item: {
    id: number;
    icon: string;
    content: string;
  };
  paymentMethod: number;
  changePaymentMethod: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PaymentItem: FC<PaymentItemProps> = ({
  item,
  paymentMethod,
  changePaymentMethod,
}) => {
  return (
    <label htmlFor={item.content} className="flex items-center mb-5 last:mb-0">
      <div className="mr-3">
        <input
          id={item.content}
          onChange={changePaymentMethod}
          value={item.id}
          checked={paymentMethod === item.id}
          type="radio"
        />
      </div>
      <div className="w-8 h-8 flex items-center">
        <LazyLoadImage src={item.icon} effect="opacity" />
      </div>
      <span className="text-sm text-gray-500 ml-3">{item.content}</span>
    </label>
  );
};

export default PaymentItem;
