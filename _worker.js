export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Handle API routes
    if (url.pathname.startsWith('/api/')) {
      // For now, return a simple response for API routes
      return new Response(JSON.stringify({ 
        message: 'API route - needs backend configuration',
        path: url.pathname 
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Serve static assets from the deploy directory
    if (url.pathname.includes('.')) {
      try {
        // Try to serve the file from assets
        const asset = await env.ASSETS.fetch(new Request(url.pathname, request));
        if (asset.status !== 404) {
          return asset;
        }
      } catch (error) {
        console.error('Asset fetch error:', error);
      }
    }
    
    // Serve the main Next.js HTML for all other routes
    try {
      // Return the main index.html from the build
      const indexAsset = await env.ASSETS.fetch(new Request('/', request));
      return indexAsset;
    } catch (error) {
      console.error('Index fetch error:', error);
      
      // Fallback HTML response
      return new Response(
        `<!DOCTYPE html>
        <html>
        <head>
          <title>POS Application</title>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
        </head>
        <body>
          <div id="root">
            <h1>POS Application</h1>
            <p>Loading application...</p>
            <p>If this page persists, the application may need additional configuration.</p>
          </div>
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
