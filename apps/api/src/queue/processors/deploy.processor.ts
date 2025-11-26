import { Worker, Job } from 'bullmq';
import IORedis from 'ioredis';

const connection = new IORedis(process.env.REDIS_URL || 'redis://localhost:6379');

export const deployWorker = new Worker(
  'deployQueue',
  async (job: Job) => {
    job.updateProgress(5);
    await new Promise((r) => setTimeout(r, 200));
    job.updateProgress(25);
    await new Promise((r) => setTimeout(r, 200));
    job.updateProgress(60);
    await new Promise((r) => setTimeout(r, 200));
    job.updateProgress(100);
    return { artifactUrl: `https://cdn.example.com/${job.id}.zip` };
  },
  { connection }
);
