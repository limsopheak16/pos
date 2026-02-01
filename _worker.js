import { getRequestContext } from '@cloudflare/next-on-pages';

export default {
  async fetch(request, env, ctx) {
    try {
      // Use the Next.js adapter to handle the request
      return getRequestContext().fetch(request, env, ctx);
    } catch (error) {
      console.error('Worker error:', error);
      
      // Return a basic response for errors
      return new Response(
        `<!DOCTYPE html>
        <html>
        <head><title>POS Application</title></head>
        <body>
          <h1>POS Application</h1>
          <p>The application is loading...</p>
          <p>If this page persists, there may be a configuration issue.</p>
        </body>
        </html>`,
        {
          status: 200,
          headers: { 'Content-Type': 'text/html' }
        }
      );
    }
  },
};
