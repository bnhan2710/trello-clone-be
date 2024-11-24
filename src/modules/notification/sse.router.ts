import { Router } from "express";
const router = Router();
import { Notification } from "../../orm/entities/Notification";
import connection from "../../configs/database.connect";
import { sendNotification, sseHandler } from "./sse.handler";
router.post("/", async (req, res) => {
    const { message } = req.body;
  
    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }
  
    try {
      const notification = new Notification();
      notification.message = message;
  
      await connection.getRepository(Notification).save(notification);
      sendNotification(message); 
      res.status(201).json({ message: "Notification created successfully", notification });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

router.get("/sse", sseHandler);

router.get("/", async (req, res) => {
    try {
        const notifications = await connection.getRepository(Notification).find();
      res.json(notifications);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

export default router;