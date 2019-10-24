module.exports = {
  apps : [{
    name: 'dfuse-service',
    script: 'main.js',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    instances: 2,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    cwd: "dist",
    env: {
      "NODE_ENV": "production",
      "HOST": "localhost:3000",
      "DFUSE_KEY": "server_c383bd95be5d224a891730c12e99ea55",
      "EOS_NETWORK": "mainnet"
    },
    env_development : {
       "NODE_ENV": "development",
       "HOST": "localhost:3000",
       "DFUSE_KEY": "server_c383bd95be5d224a891730c12e99ea55",
       "EOS_NETWORK": "mainnet"
    }
  }]
};
