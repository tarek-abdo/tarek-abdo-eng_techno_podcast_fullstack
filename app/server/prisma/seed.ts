import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


async function main() {
  console.log('Seeding sample podcasts...');

  const data = [
    {
      title: 'The BIG Journey',
      host: 'Jane Doe',
      description: 'A podcast about software engineering careers and growth.',
      imageUrl: 'https://res.cloudinary.com/dvqhmeydt/image/upload/v1760457732/2_bs9sre.jpg',
      audioUrl: 'https://res.cloudinary.com/dvqhmeydt/video/upload/v1760455044/file_example_MP3_700KB_h4givh.mp3',
    },
    {
      title: 'Cloud Chats',
      host: 'John Smith',
      description: 'Weekly discussions on cloud infrastructure and best practices.',
      imageUrl: 'https://res.cloudinary.com/dvqhmeydt/image/upload/v1760457732/2_bs9sre.jpg',
      audioUrl: 'https://res.cloudinary.com/dvqhmeydt/video/upload/v1760515409/sample-12s_qjkkcl.mp3',
    },
    {
      title: 'Small Journey',
      host: 'Jane Doe',
      description: 'A podcast about software engineering careers and growth.',
      imageUrl: 'https://res.cloudinary.com/dvqhmeydt/image/upload/v1760457732/2_bs9sre.jpg',
      audioUrl: 'https://res.cloudinary.com/dvqhmeydt/video/upload/v1760515408/sample-9s_fq7bj8.mp3',
    },
    {
      title: 'Large Journey',
      host: 'Jane Doe',
      description: 'A podcast about software engineering careers and growth.',
      imageUrl: 'https://res.cloudinary.com/dvqhmeydt/image/upload/v1760457732/2_bs9sre.jpg',
      audioUrl: 'https://res.cloudinary.com/dvqhmeydt/video/upload/v1760515408/sample-15s_n5cqj3.mp3',
    },
    {
      title: 'First Journey',
      host: 'Jane Doe',
      description: 'A podcast about software engineering careers and growth.',
      imageUrl: 'https://res.cloudinary.com/dvqhmeydt/image/upload/v1760457732/2_bs9sre.jpg',
      audioUrl: 'https://res.cloudinary.com/dvqhmeydt/video/upload/v1760455044/file_example_MP3_700KB_h4givh.mp3',
    },
  ];

  for (const item of data) {
    await prisma.podcast.create({ data: item });
  }

  const count = await prisma.podcast.count();
  console.log(`Seed complete. Podcast count: ${count}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
