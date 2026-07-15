import React, { useState } from 'react';
import { currencyFormat } from '../../../utils/currencyFormat';
import orderService from '../../../services/orderService';
import Loader from '../../../components/Loader/Loader';
import './OrderReview.css';

export const OrderReview = ({ token, cart, addressId, onBack, onOrderCreated }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePlaceOrder = async () => {
    if (!cart || !addressId) return;

    setLoading(true);
    setError('');

    const orderData = {
      addressId,
      cartId: cart.cartId
    };

    try {
      const response = await orderService.createOrder(orderData, token);
      const createdOrder = response.data;
      
      // Order created! Notify parent container to route to Payment
      onOrderCreated(createdOrder.orderId || createdOrder.id);
    } catch (err) {
      console.error('Failed to create order:', err);
      setError(err.response?.data?.message || 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const cartItems = cart?.items || [];
  const totalItems = cartItems.length;

  return (
    <div className="order-review-sub-layout">
      {loading && <Loader fullPage={true} message="Creating your order..." />}

      {error && <div className="review-error-alert">{error}</div>}

      <div className="review-sections-container">
        <div className="review-section">
          <h3>Review Selected Stickers ({totalItems})</h3>
          <div className="review-items-list">
            {cartItems.map((item, idx) => (
              <div key={item.cartItemId || idx} className="review-item-row">
                <span className="review-item-name">
                  {item.product?.name}{' '}
                  {item.product?.bilingualName && (
                    <span className="review-item-bilingual">({item.product.bilingualName})</span>
                  )}
                </span>
                <span className="review-item-price">{currencyFormat(item.product?.price || 0)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="review-action-section">
          <button className="review-back-btn" onClick={onBack}>
            ← Edit Delivery Address
          </button>
          <button className="review-place-order-btn" onClick={handlePlaceOrder}>
            Proceed to Payment →
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderReview;
