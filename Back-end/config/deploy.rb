lock "~> 3.11.0"

set :application, 'eagle_eyes'

set :repo_url, 'https://github.com/yuanweilin/eagle_eyes.git'
set :deploy_to, '/home/deploy/eagle_eyes'
set :keep_releases, 5

set :linked_files, %w{config/database.yml config/cable.yml .env config/master.key config/credentials.yml.enc}

set :linked_dirs, fetch(:linked_dirs, []).push('log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'public/uploads')

set :passenger_restart_with_touch, true
