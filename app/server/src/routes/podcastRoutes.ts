import express from 'express';
import multer from 'multer';
import { createPodcast, getAllPodcasts , getPodcastById} from '../controllers/podcastController';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.get('/', getAllPodcasts);
router.get('/:id', getPodcastById);
router.post('/', upload.fields([{ name: 'audio' }, { name: 'image' }]), createPodcast);

export default router;
