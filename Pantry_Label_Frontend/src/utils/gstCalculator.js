const GST_RATE = 0.18;
const FREE_SHIPPING_THRESHOLD = 500;
const SHIPPING_CHARGE = 49;

export const gstCalculator = (subtotal) => {
  const safeSubtotal = Number(subtotal) || 0;
  const gst = safeSubtotal * GST_RATE;
  const shipping = safeSubtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_CHARGE;
  const grandTotal = safeSubtotal + gst + shipping;

  return {
    subtotal: safeSubtotal,
    gst: Math.round(gst * 100) / 100,
    shipping,
    grandTotal: Math.round(grandTotal * 100) / 100
  };
};

export default gstCalculator;
