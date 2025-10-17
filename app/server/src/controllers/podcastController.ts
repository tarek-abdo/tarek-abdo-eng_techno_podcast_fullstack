import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import cloudinary from '../config/cloudinary';
import fs from 'fs';
import path from 'path';

import { setFlagsFromString } from 'v8';

const prisma = new PrismaClient();

// Validate a MongoDB ObjectId hex string (24 hex chars)
function isValidObjectId(id: string) {
  return typeof id === 'string' && /^[0-9a-fA-F]{24}$/.test(id);
}

export const getAllPodcasts = async (req: Request, res: Response) => {
  try {
    console.log("Fetching all podcasts...");
    const podcasts = await prisma.podcast.findMany();
    console.log("Podcasts fetched:", podcasts.length);
    res.status(200).json(podcasts);
  } catch (error: any) {

    console.error("Error in getAllPodcasts:", error);
    // Dev fallback: if a local seed file exists, return it so frontend can display sample data
    try {
      const fallbackPath = path.resolve(__dirname, '..', '..', 'data', 'seed-podcasts.json');
      if (fs.existsSync(fallbackPath)) {
        const raw = fs.readFileSync(fallbackPath, 'utf8');
        const parsed = JSON.parse(raw);
        console.log('Returning fallback seed data from', fallbackPath);
        return res.status(200).json(parsed);
      }
    } catch (fsErr) {
      console.error('Fallback read error:', fsErr);
    }

    res.status(500).json({ error: error.message || 'Failed to fetch podcasts' });
  }
};

export const getPodcastById = async (req:Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid podcast id format' });
    }
    const podcast = await prisma.podcast.findUnique({
      where: {
        id: id,
      },
    });

    if (!podcast) {
      return res.status(404).json({ message: 'Podcast not found' });
    }

    res.status(200).json(podcast);
  } catch (error) {
    console.error('Error fetching podcast by ID:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

export const createPodcast = async (req: Request, res: Response) => {
  try {
    const { title, host, description } = req.body;
    const audioFile = (req.files as any)?.audio?.[0];
    const imageFile = (req.files as any)?.image?.[0];

    // Upload to Cloudinary
    const audioUpload = await cloudinary.uploader.upload(audioFile.path, {
      resource_type: 'video',
    });

    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: 'image',
    });

    // Remove temp files
    fs.unlinkSync(audioFile.path);
    fs.unlinkSync(imageFile.path);

    const newPodcast = await prisma.podcast.create({
      data: {
        title,
        host,
        description,
        imageUrl: imageUpload.secure_url,
        audioUrl: audioUpload.secure_url,
      },
    });

    res.json(newPodcast);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating podcast' });
  }
};
