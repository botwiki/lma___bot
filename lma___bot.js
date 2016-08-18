var path = require('path'),
    config = require(path.join(__dirname, 'config.js')),
    Twit = require('twit'),
    T = new Twit(config.twitter),
    user_stream = T.stream('user');

user_stream.on('message', function (msg) {
  if (msg.event !== 'unblock' && (msg.source && msg.source.id_str !== config.twitter.bot_user_id_str)){
/*  console.log(msg); */
    console.log('Event: ' + msg.event);
    if (msg.source){
      console.log('Source: @' + msg.source.screen_name);
    }

    var block_user_id;

    if (msg.target && msg.target.id_str === config.twitter.bot_user_id_str){
      block_user_id = msg.source.id_str;
      block_user_screen_name = msg.source.screen_name;
    }
    else if (msg.in_reply_to_user_id_str && msg.in_reply_to_user_id_str === config.twitter.bot_user_id_str){
      block_user_id = msg.user.id_str;
      block_user_screen_name = msg.user.screen_name;
    }

    if (block_user_id){
      T.post('blocks/create', { user_id: block_user_id }, function (err, data, response) {
        if (!err){
          console.log('Blocked @' + block_user_screen_name + '!');
        }
        else{
          console.log('Error!');
          console.log(err);
        }
      });      
    }
  }
})
