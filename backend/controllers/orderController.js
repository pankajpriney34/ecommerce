const Order = require('../models/Order');
const {sendOrderEmail} =  require('../utils/sendEmail');
const Product = require('../models/Product');



exports.createOrder = async (req, res) => {
  const { customer, product } = req.body;

  // Simulate outcome based on card number or CVV
  const cardNum = customer.cardNumber;
  let status = 'approved';

  if (cardNum.startsWith('2')) status = 'declined';
  else if (cardNum.startsWith('3')) status = 'error';
  else status = 'approved';

  const dbProduct = await Product.findOne({ id: product.product.id });

  if (!dbProduct) {
    return res.status(404).json({ success: false, message: 'Product not found in DB' });
  }

  // check stock
  if (dbProduct.stock < product.quantity) {
    return res.status(400).json({ success: false, message: 'Not enough stock available' });
  }

  // reduce stock
  dbProduct.stock -= product.quantity;
  await dbProduct.save();


  try {
    const order = await Order.create({
      customer,
      product: {
        ...product.product,
        variant: product.selectedVariant,
        quantity: product.quantity
      },
      status
    });

    // const emailHtml = `
    //   <h2>Order Confirmation</h2>
    //   <p>Hi ${customer.fullName},</p>
    //   <p>Your order for <strong>${product.product.title}</strong> (Variant: ${product.selectedVariant}) has been ${status.toUpperCase()}.</p>
    //   <p>Quantity: ${product.quantity}</p>
    //   <p>Total: $${(product.product.price * product.quantity).toFixed(2)}</p>
    // `;
    // await sendOrderEmail(customer.email, `Order ${status}`, emailHtml);
    let emailSubject = '';
    let emailHtml = '';

    const total = (product.product.price * product.quantity).toFixed(2);

    switch (status) {
      case 'approved':
        emailSubject = 'Your Order Has Been Confirmed!';
        emailHtml = `
          <h2>Thank you for your order, ${customer.fullName}!</h2>
          <p>We're preparing your <strong>${product.product.title}</strong> (Variant: ${product.selectedVariant}).</p>
          <p><strong>Quantity:</strong> ${product.quantity}</p>
          <p><strong>Total:</strong> $${total}</p>
          <p>You’ll receive shipping details soon.</p>
        `;
        break;

      case 'declined':
        emailSubject = 'Payment Declined';
        emailHtml = `
          <h2>Payment Failed</h2>
          <p>Hi ${customer.fullName},</p>
          <p>Unfortunately, your payment for <strong>${product.product.title}</strong> was <strong>declined</strong>.</p>
          <p>Please double-check your card details and try again.</p>
        `;
        break;

      case 'error':
        emailSubject = 'Order Error';
        emailHtml = `
          <h2>Something Went Wrong</h2>
          <p>Hi ${customer.fullName},</p>
          <p>We encountered a technical issue while processing your order for <strong>${product.product.title}</strong>.</p>
          <p>Please try again later, or contact support if the issue continues.</p>
        `;
        break;
    }

    await sendOrderEmail(customer.email, emailSubject, emailHtml);



    res.status(201).json({ success: true, orderId: order._id, status });
  } catch (err) {
    console.error('Order failed:', err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
