import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "iamdk353@gmail.com",
    pass: "dptsdopkakibavky",
  },
});

function sendThroughGmail(user, { place }) {
  const mailOptions = {
    from: "iamdk353@gmail.com",
    to: user,
    subject: "Emergency alert",
    html: `
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Accident Alert</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f9;
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
      }
      h1 {
        color: #333;
        text-align: center;
      }
      .button-container {
        display: flex;
        justify-content: center;
        margin-top: 20px;
      }
      .btn {
        padding: 1rem 2rem;
        background-color: black;
        color: white;
        text-decoration: none;
        border-radius: 1rem;
        font-size: 1rem;
        font-weight: bold;
        display: inline-block;
        transition: background-color 0.3s ease;
      }
      .btn:hover {
        background-color: #333;
      }
    </style>
  </head>
  <body>
    <div>
      <h1>Accident Detected at ${place}</h1>
      <div class="button-container">
        <a href="http://localhost:5173/accident" class="btn">More Details</a>
      </div>
    </div>
  </body>
</html>

    `,
  };
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject("error in mailing");
      }
      resolve("sent message successfully");
    });
  });
}

const sendEmails = async (users, { place, img }) => {
  try {
    const results = await Promise.all(
      users.map((user) => sendThroughGmail(user, { place, img }))
    );
  } catch (error) {}
};

export default sendEmails;
