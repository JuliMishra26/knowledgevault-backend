import { Router, type Request, type Response } from 'express';
import { authenticated } from '../auth/auth.middleware';
import { upload } from './document.middleware';
import * as documentService from './document.services';

const router = Router();

router.post(
  '/documents',
  authenticated,
  upload.single('file'),
  async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          message: 'PDF file is required',
        });
      }

      const document = await documentService.uploadDocument({
        title: req.body.title,
        file: req.file,
        userId: req.user!.id,
      });

      return res.status(201).json(document);
    } catch (error) {
      return res.status(500).json({
        message: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
);
router.get('/documents', () => {});

export default router;
