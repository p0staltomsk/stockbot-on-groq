module.exports = {
  apps: [
    {
      name: 'stockbot-on-groq',
      script:
        'node_modules/.pnpm/next@14.2.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/bin/next',
      args: 'start',
      cwd: '/var/www/html/stockbot-on-groq',
      env: {
        NODE_ENV: 'production',
        PORT: 3011
      },
      instances: 1,
      exec_mode: 'fork',
      watch: false,
      autorestart: true
    }
  ]
}
