import * as functions from 'firebase-functions';
import * as nodemailer from 'nodemailer';
import * as cors from 'cors';

// Configure CORS middleware to allow requests from any origin
const corsHandler = cors({origin: true});

// Configure the email transport using the
// default SMTP transport and a Gmail account.
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'pacificpropertyphotos@gmail.com',
    pass: 'qmxu snqx rfns cwxr',
  },
});

// Create and deploy the Firebase function with CORS support
export const sendContactEmail = functions.https.onRequest((req, res) => {
  corsHandler(req, res, () => {
    const {name, email, message} = req.body;

    const mailOptions = {
      from: 'pacificpropertyphotos@gmail.com',
      to: 'pacificpropertyphotos@gmail.com',
      cc: 'sorin.bucse@gmail.com',
      subject: 'Pacific Property Photos Email',
      text: `You have a new message from:
      Name: ${name}
      Email: ${email}
      Message: ${message}`,
    };

    return transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).send(error.toString());
      }
      return res.status(200).send('Email sent: ' + info.response);
    });
  });
});

// Create and deploy the Firebase function with CORS support
export const sendOrderEmail = functions.https.onRequest((req, res) => {
  corsHandler(req, res, () => {
    try {
      // Log the incoming request to verify the structure
      console.log('Received order:', req.body);

      const { customerInfo, squareFootage, cartContents } = req.body;

      // Format the cart items into a readable string
      const cartItems = cartContents
        .map((item: any) => `${item.name} - Quantity: ${item.quantity}, Price: ${item.price}`)
        .join('\n');

      // Construct the email content
      const mailOptions = {
        from: 'pacificpropertyphotos@gmail.com',
        to: 'pacificpropertyphotos@gmail.com',
        cc: 'sorin.bucse@gmail.com',
        subject: 'New Order Received - Pacific Property Photos',
        text: `You have a new order:\n
        Customer Name: ${customerInfo.Name}
        Email: ${customerInfo.Email}
        Address: ${customerInfo.Address}
        Phone: ${customerInfo.PhoneNumber}
        Date: ${customerInfo.Date}
        Time: ${customerInfo.Time}
        Best Feature: ${customerInfo.bestFeature}
        Access: ${customerInfo.propertyAccess}
        Going Live Date: ${customerInfo.liveDate}
        Garage or ADU: ${customerInfo.garageAdu}

        Cart Contents:\n${cartItems}`,
      };

      // Send the email
      return transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
          return res.status(500).send('Error sending email: ' + error.toString());
        }
        console.log('Email sent: ' + info.response);
        return res.status(200).send('Order email sent successfully: ' + info.response);
      });
    } catch (error:any) {
      console.error('Error processing order email:', error);
      return res.status(500).send('Internal Server Error: ' + error.toString());
    }
  });
});
// export const sendOrderEmail = functions.https.onRequest((req, res) => {
//   corsHandler(req, res, () => {
//     const { customerInfo, squareFootage, cartContents } = req.body;

//     if (!customerInfo || !squareFootage || !cartContents) {
//       return res.status(400).send('Missing order details');
//     }

//     const { Name, Email, Address, PhoneNumber, Date, Time } = customerInfo;

//     const orderDetails = `
//       New Order Received:
//       Name: ${Name}
//       Email: ${Email}
//       Address: ${Address}
//       Phone Number: ${PhoneNumber}
//       Date: ${Date}
//       Time: ${Time}
//       Square Footage: ${squareFootage}

//       Cart Items:
//       ${cartContents.map((item: any, index: number) => `
//         Item ${index + 1}:
//         Product Name: ${item.product.name}
//         Quantity: ${item.quantity}
//         Price: $${item.product.price}
//       `).join('')}
//     `;

//     const mailOptions = {
//       from: 'pacificpropertyphotos@gmail.com',
//       to: 'pacificpropertyphotos@gmail.com',
//       cc: 'sorin.bucse@gmail.com',  // Add recipients if needed
//       subject: 'New Order - Pacific Property Photos',
//       text: orderDetails,
//     };

//     return transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         return res.status(500).send(error.toString());
//       }
//       return res.status(200).send('Order email sent: ' + info.response);
//     });
//   });
// });
