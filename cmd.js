var fs = require('fs');
var crypto = require('crypto');

var config = {};

var sha1 = function(src){
  return crypto.createHash('sha1').update(text).digest('hex');
}

var hashed = function(src){
  return /[a-f0-9]{40}/.test(src);
}

if('USER' in process.env && 'PASSWORD' in process.env){

  user = process.env.USER;
  password = process.env.PASSWORD;

  if(!hashed(process.env.USER)){
    user = sha1(user)
  }

  if(!hashed(process.env.PASSWORD)){
    password = sha1(password)
  }

  config.users = {}

  config.users[user] = password

}else{

  console.log('-e USER and/or -e PASSWORD missing');
  process.exit(-1);

}

config.shell = '/bin/bash';
config.cwd = '/home/user';

fs.writeFileSync('/home/user/.tty.js/config.json', JSON.stringify(config));

require('/usr/local/lib/node_modules/tty.js/bin/tty.js');
