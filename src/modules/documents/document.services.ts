import { prisma } from '@/lib/prisma';
import type { UploadDocumentInput } from './document.types';

export async function getDocuments() {
  return await prisma.document.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export async function getDocument(id: string) {
  return prisma.document.findUnique({
    where: {
      id,
    },
    include: {
      uploadedBy: true,
    },
  });
}

export async function getDocumentsByUserId(userId: string) {
  return prisma.document.findMany({
    where: {
      uploadedById: userId,
    },
    include: {
      uploadedBy: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export async function uploadDocument(input: UploadDocumentInput) {
  return prisma.document.create({
    data: {
      title: input.title,
      originalFileName: input.file.originalname,
      storagePath: input.file.path,
      mimeType: input.file.mimetype,
      size: input.file.size,
      uploadedById: input.userId,
      status: 'PROCESSING',
    },
  });
}
