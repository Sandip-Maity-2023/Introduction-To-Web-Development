const nodemailer = require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport");

const transporter = nodemailer.createTransport(
  sendGridTransport({
    auth: {
      api_key: process.env.API_SENDGRID,
    },
  })
);

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({
        success: false,
        message: "Method Not Allowed",
      }),
    };
  }

  try {
    const { name, email, msg } = JSON.parse(event.body || "{}");

    if (!name || !email || !msg) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          success: false,
          message: "Please Provide All Fields",
        }),
      };
    }

    await transporter.sendMail({
      to: "12sandip125@gmail.com",
      from: "12sandip125@gmail.com",
      subject: "Regarding Mern Portfolio App",
      html: `
        <h5>Detail Information</h5>
        <ul>
          <li><p>Name : ${name}</p></li>
          <li><p>Email : ${email}</p></li>
          <li><p>Message : ${msg}</p></li>
        </ul>
      `,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: "Your Message Send Successfully",
      }),
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: "Send Email API Error",
      }),
    };
  }
};
