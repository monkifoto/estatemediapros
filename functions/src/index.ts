/* eslint-disable @typescript-eslint/no-explicit-any */
import * as functions from "firebase-functions";
import * as nodemailer from "nodemailer";
import * as cors from "cors";

// Enable CORS
const corsHandler = cors({origin: true});

// Load email credentials from Firebase environment variables
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: functions.config().email.user,
    pass: functions.config().email.pass,
  },
});

// Send Contact Email
export const sendContactEmail = functions.https.onRequest(async (req, res) => {
  corsHandler(req, res, async () => {
    try {
      const {name, email, message} = req.body;

      const mailOptions = {
        from: functions.config().email.user,
        to: "seattlerealestatephoto@gmail.com",
        cc: "sorin.bucse@gmail.com",
        subject: "Pacific Property Photos Email",
        text: `You have a new message from:
        Name: ${name}
        Email: ${email}
        Message: ${message}`,
      };

      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent:", info.response);
      res.status(200).send("Contact email sent successfully.");
    } catch (error: any) {
      console.error("Error sending email:", error);
      res.status(500).send("Error sending email: " + error.toString());
    }
  });
});

// Send Order Email
export const sendOrderEmail = functions.https.onRequest(async (req, res) => {
  corsHandler(req, res, async () => {
    try {
      console.log("Received order:", req.body);
      const {customerInfo, squareFootage, cartContents} = req.body;

      const cartItems = cartContents
        .map(
          (item: any) => `${item.name} - Quantity: ${item.quantity},
           Price: ${item.price}`
        )
        .join("\n");

      const mailOptions = {
        from: functions.config().email.user,
        to: "seattlerealestatephoto@gmail.com",
        cc: "sorin.bucse@gmail.com",
        subject: "New Order Received - Pacific Property Photos",
        text: `You have a new order:\n
        Customer Name: ${customerInfo.name}
        Email: ${customerInfo.email}
        Address: ${customerInfo.address}
        Square Footage: ${squareFootage}
        Phone: ${customerInfo.phoneNumber}
        Date: ${customerInfo.date}
        Time: ${customerInfo.time}
        Best Feature: ${customerInfo.bestFeature}
        Access: ${customerInfo.propertyAccess}
        Going Live Date: ${customerInfo.liveDate}
        Garage or ADU: ${customerInfo.garageAdu}

        Cart Contents:\n${cartItems}`,
      };

      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent:", info.response);
      res.status(200).send("Order email sent successfully.");
    } catch (error: any) {
      console.error("Error processing order email:", error);
      res.status(500).send("Internal Server Error: " + error.toString());
    }
  });
});


// /* eslint-disable @typescript-eslint/no-explicit-any */
// import * as functions from "firebase-functions";
// import * as nodemailer from "nodemailer";
// import * as cors from "cors";

// // Configure CORS middleware to allow requests from any origin
// const corsHandler = cors({origin: true});

// // Configure the email transport using the
// // default SMTP transport and a Gmail account.
// const transporter = nodemailer.createTransport({
//   service: "Gmail",
//   auth: {
//     user: "pacificpropertyphotos@gmail.com",
//     pass: "qmxu snqx rfns cwxr",
//   },
// });

// // Create and deploy the Firebase function with CORS support
// export const sendContactEmail = functions.https.onRequest((req, res) => {
//   corsHandler(req, res, () => {
//     const {name, email, message} = req.body;

//     const mailOptions = {
//       from: "pacificpropertyphotos@gmail.com",
//       to: "pacificpropertyphotos@gmail.com",
//       cc: "sorin.bucse@gmail.com",
//       subject: "Pacific Property Photos Email",
//       text: `You have a new message from:
//       Name: ${name}
//       Email: ${email}
//       Message: ${message}`,
//     };

//     return transporter.sendMail(mailOptions,
//       (error: Error | null, info: any) => {
//         if (error) {
//           console.error("Error sending email:", error);
//           return res.status(500).send("Error sending email: " +
//             error.toString());
//         }
//         console.log("Email sent: " + info.response);
//         return res.status(200).send("Order email sent successfully: " +
//           info.response);
//       });
//   });
// });

// // Create and deploy the Firebase function with CORS support
// export const sendOrderEmail = functions.https.onRequest((req, res) => {
//   corsHandler(req, res, () => {
//     try {
//       // Log the incoming request to verify the structure
//       console.log("Received order:", req.body);

//       const {customerInfo, squareFootage, cartContents} = req.body;

//       // Format the cart items into a readable string
//       const cartItems = cartContents
//         .map((item: any) => `${item.name} - Quantity: ${item.quantity},
//          Price: ${item.price}`)
//         .join("\n");

//       // Construct the email content
//       const mailOptions = {
//         from: "pacificpropertyphotos@gmail.com",
//         to: "pacificpropertyphotos@gmail.com",
//         cc: "sorin.bucse@gmail.com",
//         subject: "New Order Received - Pacific Property Photos",
//         text: `You have a new order:\n
//         Customer Name: ${customerInfo.name}
//         Email: ${customerInfo.email}
//         Address: ${customerInfo.address}
//         Square Footage: ${squareFootage}
//         Phone: ${customerInfo.phoneNumber}
//         Date: ${customerInfo.date}
//         Time: ${customerInfo.time}
//         Best Feature: ${customerInfo.bestFeature}
//         Access: ${customerInfo.propertyAccess}
//         Going Live Date: ${customerInfo.liveDate}
//         Garage or ADU: ${customerInfo.garageAdu}

//         Cart Contents:\n${cartItems}`,
//       };

//       // Send the email
//       return transporter.sendMail(mailOptions,
//         (error: Error | null, info: any) => {
//           if (error) {
//             console.error("Error sending email:", error);
//             return res.status(500).send("Error sending email: " +
//               error.toString());
//           }
//           console.log("Email sent: " + info.response);
//           return res.status(200).send("Order email sent successfully: " +
//             info.response);
//         });
//     } catch (error:any) {
//       console.error("Error processing order email:", error);
//       return res.status(500).send("Internal Server Error: "
//  + error.toString());
//     }
//   });
// });
