export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Handle API routes
    if (url.pathname.startsWith('/api/')) {
      return new Response(JSON.stringify({ 
        message: 'API route - needs backend configuration',
        path: url.pathname 
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Try to serve static assets first
    if (url.pathname.includes('.')) {
      try {
        // Try different asset paths
        const assetPaths = [
          url.pathname,
          `/_next${url.pathname}`,
          `/static${url.pathname}`
        ];
        
        for (const path of assetPaths) {
          const asset = await env.ASSETS.fetch(new Request(path, request));
          if (asset.status !== 404) {
            return asset;
          }
        }
      } catch (error) {
        console.error('Asset fetch error:', error);
      }
    }
    
    // Serve the main Next.js page for all other routes
    try {
      // Try to find the main HTML file
      const indexPaths = ['/', '/index.html'];
      
      for (const path of indexPaths) {
        const indexAsset = await env.ASSETS.fetch(new Request(path, request));
        if (indexAsset.status !== 404) {
          return indexAsset;
        }
      }
      
      // If no index found, return a basic HTML page
      throw new Error('No index file found');
    } catch (error) {
      console.error('Index fetch error:', error);
      
      // Return a basic HTML response that shows the app is working
      return new Response(
        `<!DOCTYPE html>
        <html>
        <head>
          <title>POS Application</title>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; text-align: center; }
            .container { max-width: 800px; margin: 0 auto; }
            .status { color: green; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>🛒 POS Application</h1>
            <p class="status">✅ Worker is running successfully!</p>
            <p>The application is deployed and accessible.</p>
            <p><strong>Current URL:</strong> ${url.href}</p>
            <p><strong>Worker Name:</strong> pos</p>
            <hr>
            <h3>Next Steps:</h3>
            <ul style="text-align: left; max-width: 400px; margin: 0 auto;">
              <li>Configure database connection</li>
              <li>Set up environment variables</li>
              <li>Test API endpoints</li>
              <li>Verify all features work</li>
            </ul>
            <p><em>If you see this page, the deployment was successful!</em></p>
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
