import express from "express";
import cors from "cors";
import axios from "axios";
import nodemailer from "nodemailer";
import cron from "node-cron";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ------------------ EMAIL CONFIG ------------------
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Gmail
    pass: process.env.EMAIL_PASS, // App password
  },
});

// ------------------ USER PREFERENCES ------------------
let userPreferences = {}; 
// { "abc@gmail.com": { categories:["sports"], sendTime:"09:00" } }

// ------------------ AI SUMMARY (Groq) ------------------
const groqSummary = async (text) => {
  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant",
        messages: [
          { role: "user", content: `Summarize this:\n${text}` }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (e) {
    return "AI summary unavailable.";
  }
};

// --------------- BUILD EMAIL HTML -----------------
const buildNewsletterHTML = (articles) => {
  return `
    <h2>📰 Your AI-Summarized Daily News</h2>
    ${articles.map(a => `
      <div style="margin-bottom:20px;">
        <h3>${a.title}</h3>
        <p><strong>AI Summary:</strong> ${a.summary}</p>
        <a href="${a.url}" target="_blank">Read Full Article</a>
        <hr/>
      </div>
    `).join("")}
    <p style="opacity:0.6">— Sent by NewsSphere</p>
  `;
};

// ------------ FETCH NEWS + SEND EMAIL --------------
const sendDailyEmail = async (email) => {
  const prefs = userPreferences[email];
  if (!prefs || !prefs.categories.length) return;

  let finalArticles = [];

  const API_KEY = process.env.NEWS_KEY;

  for (const category of prefs.categories) {
    const res = await axios.get(
      `https://newsapi.org/v2/everything?q=${category}&pageSize=3&apiKey=${API_KEY}`
    );

    for (const article of res.data.articles) {
      const text = `${article.title}\n${article.description}`;
      const summary = await groqSummary(text);

      finalArticles.push({
        title: article.title,
        description: article.description,
        url: article.url,
        summary: summary,
      });
    }
  }

  const html = buildNewsletterHTML(finalArticles);

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your Daily News Summary",
    html,
  });

  console.log("EMAIL SENT →", email);
};

// ---------------- SETUP ROUTE ------------------
app.post("/setup-news-email", async (req, res) => {
  const { userEmail, categories, sendTime } = req.body;

  if (!userEmail) return res.status(400).json({ error: "Missing email." });

  userPreferences[userEmail] = { categories, sendTime };
  console.log("Preferences Saved →", userPreferences[userEmail]);

  // send test email immediately
  await sendDailyEmail(userEmail);

  res.json({ message: "Preferences saved and test email sent!" });
});

// ---------- CRON: CHECK EVERY MINUTE ----------
cron.schedule("* * * * *", () => {
  const now = new Date();
  const current = now.toTimeString().slice(0, 5);

  Object.entries(userPreferences).forEach(([email, prefs]) => {
    if (prefs.sendTime === current) {
      sendDailyEmail(email);
    }
  });
});

// app.get("/", (req, res) => {
//   res.send("🟢 News API Server Running Successfully!");
// });

app.listen(5000, () => console.log("🚀 Server running on port 5000"));


















// import express from "express";
// import cors from "cors";
// import axios from "axios";
// import nodemailer from "nodemailer";
// import cron from "node-cron";
// import dotenv from "dotenv";
// import { google } from "googleapis";   // ← ADDED

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json({ limit: "15mb" })); // increased for images

// // ------------------ EMAIL CONFIG ------------------
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// // ------------------ USER PREFERENCES ------------------
// let userPreferences = {};

// // ------------------ AI SUMMARY (Groq) ------------------
// const groqSummary = async (text) => {
//   try {
//     const response = await axios.post(
//       "https://api.groq.com/openai/v1/chat/completions",
//       {
//         model: "llama-3.1-8b-instant",
//         messages: [{ role: "user", content: `Summarize this:\n${text}` }],
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.GROQ_KEY}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     return response.data.choices[0].message.content;
//   } catch (e) {
//     return "AI summary unavailable.";
//   }
// };

// // --------------- BUILD EMAIL HTML -----------------
// const buildNewsletterHTML = (articles) => {
//   return `
//     <h2>📰 Your AI-Summarized Daily News</h2>
//     ${articles
//       .map(
//         (a) => `
//       <div style="margin-bottom:20px;">
//         <h3>${a.title}</h3>
//         <p><strong>AI Summary:</strong> ${a.summary}</p>
//         <a href="${a.url}" target="_blank">Read Full Article</a>
//         <hr/>
//       </div>
//     `
//       )
//       .join("")}
//     <p style="opacity:0.6">— Sent by NewsSphere</p>
//   `;
// };

// // ------------ FETCH NEWS + SEND EMAIL --------------
// const sendDailyEmail = async (email) => {
//   const prefs = userPreferences[email];
//   if (!prefs || !prefs.categories.length) return;

//   let finalArticles = [];
//   const API_KEY = process.env.NEWS_KEY;

//   for (const category of prefs.categories) {
//     const res = await axios.get(
//       `https://newsapi.org/v2/everything?q=${category}&pageSize=3&apiKey=${API_KEY}`
//     );

//     for (const article of res.data.articles) {
//       const text = `${article.title}\n${article.description}`;
//       const summary = await groqSummary(text);

//       finalArticles.push({
//         title: article.title,
//         description: article.description,
//         url: article.url,
//         summary: summary,
//       });
//     }
//   }

//   const html = buildNewsletterHTML(finalArticles);

//   await transporter.sendMail({
//     from: process.env.EMAIL_USER,
//     to: email,
//     subject: "Your Daily News Summary",
//     html,
//   });

//   console.log("EMAIL SENT →", email);
// };

// // ---------------- SETUP ROUTE ------------------
// app.post("/setup-news-email", async (req, res) => {
//   const { userEmail, categories, sendTime } = req.body;

//   if (!userEmail) return res.status(400).json({ error: "Missing email." });

//   userPreferences[userEmail] = { categories, sendTime };
//   console.log("Preferences Saved →", userPreferences[userEmail]);

//   await sendDailyEmail(userEmail);

//   res.json({ message: "Preferences saved and test email sent!" });
// });

// // ---------- CRON: CHECK EVERY MINUTE ----------
// cron.schedule("* * * * *", () => {
//   const now = new Date();
//   const current = now.toTimeString().slice(0, 5);

//   Object.entries(userPreferences).forEach(([email, prefs]) => {
//     if (prefs.sendTime === current) {
//       sendDailyEmail(email);
//     }
//   });
// });


// // ======================================================
// // 🚀🚀 CAMERA + GOOGLE DRIVE UPLOAD API (NEWLY ADDED)
// // ======================================================

// // Setup Google Drive Authentication
// const auth = new google.auth.GoogleAuth({
//   keyFile: "credentials.json",   // <-- place file beside server.js
//   scopes: ["https://www.googleapis.com/auth/drive.file"],
// });

// // Upload Photo Route
// app.post("/upload-photo", async (req, res) => {
//   try {
//     const { image } = req.body;

//     if (!image) return res.status(400).json({ error: "No image received" });

//     const driveClient = await auth.getClient();
//     const drive = google.drive({ version: "v3", auth: driveClient });

//     // Convert base64 → buffer
//     const buffer = Buffer.from(
//       image.replace(/^data:image\/\w+;base64,/, ""),
//       "base64"
//     );

//     // Upload to Drive
//     const file = await drive.files.create({
//       requestBody: {
//         name: `photo-${Date.now()}.jpg`,
//         mimeType: "image/jpeg",
//       },
//       media: {
//         mimeType: "image/jpeg",
//         body: buffer,
//       },
//     });

//     // Make file public
//     await drive.permissions.create({
//       fileId: file.data.id,
//       requestBody: { role: "reader", type: "anyone" },
//     });

//     const fileUrl = `https://drive.google.com/uc?id=${file.data.id}`;

//     res.json({ success: true, fileUrl });
//   } catch (err) {
//     console.error("UPLOAD ERROR:", err);
//     res.status(500).json({ success: false, error: "Upload failed" });
//   }
// });

// // ======================================================
// // END CAMERA SECTION
// // ======================================================

// app.listen(5000, () => console.log("🚀 Server running on port 5000"));
