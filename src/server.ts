import { app } from './app';

export async function startServer() {
  try {
    // Define PORT using environment variable or default to 3000
  const PORT = Number(process.env.PORT) || 3000; 

  // Listen on the dynamically determined port and '0.0.0.0' host
  await app.listen({ port: PORT, host: '0.0.0.0' });
  
    console.log(`Server running on port ${PORT}`);
 } catch (err) {
  app.log.error(err);
  process.exit(1);
 }
}
