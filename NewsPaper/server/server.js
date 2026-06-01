import express from "express";
import cors from "cors";
import axios from "axios";
import nodemailer from "nodemailer";
import cron from "node-cron";
import dotenv from "dotenv";
import { MongoClient, ObjectId } from "mongodb";
import { randomUUID } from "crypto";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "25mb" }));

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || "";
const MONGODB_DB = process.env.MONGODB_DB || "newsphere";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const userPreferences = {};
const memoryPosts = [];

let mongoClient = null;
let postsCollection = null;

const toPublicPost = (post) => {
  if (!post) return null;

  return {
    id: post._id?.toString?.() || post._id || post.id,
    title: post.title || "",
    content: post.content || "",
    mediaType: post.mediaType || "text",
    mediaUrl: post.mediaUrl || "",
    mediaName: post.mediaName || "",
    authorId: post.authorId || "",
    authorName: post.authorName || "Anonymous",
    authorEmail: post.authorEmail || "",
    likes: Number(post.likes || 0),
    comments: Array.isArray(post.comments) ? post.comments : [],
    createdAt: post.createdAt || new Date().toISOString(),
    updatedAt: post.updatedAt || post.createdAt || new Date().toISOString(),
  };
};

const isValidObjectId = (value) => ObjectId.isValid(value);

const getCollection = async () => {
  if (postsCollection) return postsCollection;
  if (!MONGODB_URI) return null;

  if (!mongoClient) {
    mongoClient = new MongoClient(MONGODB_URI);
    await mongoClient.connect();
    const db = mongoClient.db(MONGODB_DB);
    postsCollection = db.collection("posts");
    await postsCollection.createIndex({ createdAt: -1 });
    await postsCollection.createIndex({ authorId: 1 });
  }

  return postsCollection;
};

const listPosts = async () => {
  const collection = await getCollection();

  if (!collection) {
    return [...memoryPosts].sort(
      (left, right) => new Date(right.createdAt) - new Date(left.createdAt)
    );
  }

  const posts = await collection.find({}).sort({ createdAt: -1 }).toArray();
  return posts.map(toPublicPost);
};

const savePost = async (post) => {
  const collection = await getCollection();

  if (!collection) {
    memoryPosts.unshift(post);
    return post;
  }

  const result = await collection.insertOne(post);
  return { ...post, _id: result.insertedId };
};

const findPostById = async (id) => {
  const collection = await getCollection();

  if (!collection) {
    return memoryPosts.find((post) => post.id === id || post._id === id) || null;
  }

  if (!isValidObjectId(id)) return null;
  return collection.findOne({ _id: new ObjectId(id) });
};

const updatePostById = async (id, update) => {
  const collection = await getCollection();

  if (!collection) {
    const index = memoryPosts.findIndex((post) => post.id === id || post._id === id);
    if (index === -1) return null;

    if (update.$set) {
      memoryPosts[index] = { ...memoryPosts[index], ...update.$set };
    }

    return memoryPosts[index];
  }

  if (!isValidObjectId(id)) return null;

  await collection.updateOne({ _id: new ObjectId(id) }, update);
  return collection.findOne({ _id: new ObjectId(id) });
};

const removePostById = async (id) => {
  const collection = await getCollection();

  if (!collection) {
    const index = memoryPosts.findIndex((post) => post.id === id || post._id === id);
    if (index === -1) return false;

    memoryPosts.splice(index, 1);
    return true;
  }

  if (!isValidObjectId(id)) return false;

  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0;
};

const groqSummary = async (text) => {
  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant",
        messages: [{ role: "user", content: `Summarize this:\n${text}` }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    return "AI summary unavailable.";
  }
};

const buildNewsletterHTML = (articles) => `
  <h2>📰 Your AI-Summarized Daily News</h2>
  ${articles
    .map(
      (article) => `
        <div style="margin-bottom:20px;">
          <h3>${article.title}</h3>
          <p><strong>AI Summary:</strong> ${article.summary}</p>
          <a href="${article.url}" target="_blank" rel="noreferrer">Read Full Article</a>
          <hr/>
        </div>
      `
    )
    .join("")}
  <p style="opacity:0.6">— Sent by NewsSphere</p>
`;

const sendDailyEmail = async (email) => {
  const prefs = userPreferences[email];
  if (!prefs || !prefs.categories.length) return;

  const API_KEY = process.env.NEWS_KEY;
  const finalArticles = [];

  for (const category of prefs.categories) {
    const response = await axios.get(
      `https://newsapi.org/v2/everything?q=${category}&pageSize=3&apiKey=${API_KEY}`
    );

    for (const article of response.data.articles) {
      const text = `${article.title}\n${article.description}`;
      const summary = await groqSummary(text);

      finalArticles.push({
        title: article.title,
        description: article.description,
        url: article.url,
        summary,
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

app.get("/api/posts", async (_req, res) => {
  try {
    const posts = await listPosts();
    res.json(posts.map(toPublicPost));
  } catch (error) {
    res.status(500).json({ error: "Unable to load posts." });
  }
});

app.post("/api/posts", async (req, res) => {
  try {
    const {
      title = "",
      content = "",
      mediaType = "text",
      mediaUrl = "",
      mediaName = "",
      authorId = "",
      authorName = "Anonymous",
      authorEmail = "",
    } = req.body || {};

    const trimmedTitle = String(title).trim();
    const trimmedContent = String(content).trim();

    if (!trimmedTitle && !trimmedContent && !mediaUrl) {
      return res.status(400).json({ error: "Add text, image, or video before posting." });
    }

    const createdAt = new Date().toISOString();
    const post = {
      _id: randomUUID(),
      title: trimmedTitle,
      content: trimmedContent,
      mediaType,
      mediaUrl,
      mediaName,
      authorId,
      authorName,
      authorEmail,
      likes: 0,
      comments: [],
      createdAt,
      updatedAt: createdAt,
    };

    const saved = await savePost(post);
    res.status(201).json(toPublicPost(saved));
  } catch (error) {
    res.status(500).json({ error: "Unable to create post." });
  }
});

app.post("/api/posts/:id/like", async (req, res) => {
  try {
    const post = await findPostById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found." });

    const updated = await updatePostById(req.params.id, {
      $set: {
        likes: Number(post.likes || 0) + 1,
        updatedAt: new Date().toISOString(),
      },
    });

    res.json(toPublicPost(updated || { ...post, likes: Number(post.likes || 0) + 1 }));
  } catch (error) {
    res.status(500).json({ error: "Unable to like post." });
  }
});

app.post("/api/posts/:id/comments", async (req, res) => {
  try {
    const { name = "Anonymous", text = "" } = req.body || {};
    const commentText = String(text).trim();

    if (!commentText) {
      return res.status(400).json({ error: "Comment text is required." });
    }

    const post = await findPostById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found." });

    const comment = {
      id: randomUUID(),
      name: String(name).trim() || "Anonymous",
      text: commentText,
      createdAt: new Date().toISOString(),
    };

    const comments = [...(post.comments || []), comment];
    const updated = await updatePostById(req.params.id, {
      $set: {
        comments,
        updatedAt: new Date().toISOString(),
      },
    });

    res.json(toPublicPost(updated || { ...post, comments }));
  } catch (error) {
    res.status(500).json({ error: "Unable to add comment." });
  }
});

app.delete("/api/posts/:id", async (req, res) => {
  try {
    const post = await findPostById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found." });

    const actorId = req.body?.authorId || req.query?.authorId || "";
    if (post.authorId && actorId && post.authorId !== actorId) {
      return res.status(403).json({ error: "You can only delete your own post." });
    }

    const removed = await removePostById(req.params.id);
    if (!removed) return res.status(404).json({ error: "Post not found." });

    res.json({ message: "Post deleted." });
  } catch (error) {
    res.status(500).json({ error: "Unable to delete post." });
  }
});

app.post("/setup-news-email", async (req, res) => {
  const { userEmail, categories, sendTime } = req.body;

  if (!userEmail) return res.status(400).json({ error: "Missing email." });

  userPreferences[userEmail] = { categories, sendTime };
  console.log("Preferences Saved →", userPreferences[userEmail]);

  await sendDailyEmail(userEmail);

  res.json({ message: "Preferences saved and test email sent!" });
});

cron.schedule("* * * * *", () => {
  const current = new Date().toTimeString().slice(0, 5);

  Object.entries(userPreferences).forEach(([email, prefs]) => {
    if (prefs.sendTime === current) {
      sendDailyEmail(email);
    }
  });
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok", mongo: Boolean(MONGODB_URI) });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  if (!MONGODB_URI) {
    console.warn(
      "MongoDB URI missing. Community posts will fall back to in-memory storage until MONGODB_URI is set."
    );
  }
});
