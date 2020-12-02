const { USER,HOST,REF,REPO,PATH } = require('./utils/automation')

module.exports = {
  apps : [{
    name: 'app',
    script: './bin/www',
    // Options reference:https://pm2.keymetrics.io/docs/usage/application-declaration/
    instances: 1,
    autorestart: true,
    watch: true,
    ignore_watch: [ // 不⽤监听的⽂件
      "node_modules","logs"
    ],
    max_memory_restart: '1G',
    "error_file": "./logs/app-err.log", // 错误⽇志⽂件
    "out_file": "./logs/app-out.log",
    "log_date_format": "YYYY-MM-DD HH:mm:ss", // 给每⾏⽇志标记⼀个时间
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],
  deploy : {
    production : {
      user : USER,
      host :HOST,
      ref: REF,
      // 远程仓库地址
      repo: REPO,
      // 指定代码拉取到服务器的⽬录
      path: PATH,
      ssh_options: "StrictHostKeyChecking=no",
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      "env": {
        "NODE_ENV": "production"
      }
    }
  }
};