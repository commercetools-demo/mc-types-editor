const fs = require('fs');
const path = require('path');

const rootPath = path.join(__dirname, '..');

module.exports = ({ headers }) => {
  const config = {
    hosting: {
      public: 'public',
      ignore: ['firebase.json', '**/.*', '**/node_modules/**'],
      rewrites: [
        { source: '**', destination: '/index.html' },
      ],
      headers: [
        {
          source: '**/*.@(js.map|js|css|txt|html|png)',
          headers: [
            { key: 'Cache-Control', value: 's-maxage=31536000,immutable' },
          ],
        },
        {
          source: '**',
          headers: Object.entries({
            ...headers,
            'Cache-Control': 'no-cache',
          }).map(([key, value]) => ({ key, value })),
        },
      ],
    },
  };

  const target = process.env.FIREBASE_TARGET;

  if (target) {
    config.hosting.target = target;
  }

  fs.writeFileSync(
    path.join(rootPath, 'firebase.json'),
    JSON.stringify(config, null, 2),
    { encoding: 'utf8' }
  );
};
