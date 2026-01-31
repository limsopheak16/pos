export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Handle static assets
    if (url.pathname.startsWith('/_next') || url.pathname.includes('.')) {
      return fetch(request);
    }
    
    // Serve the main app for all other routes
    return new Response('Next.js App - Deployment in progress', {
      headers: { 'Content-Type': 'text/html' }
    });
  },
};
