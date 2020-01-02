const API_AI_TOKEN = 'a8c4983c1fa5404ba0e9a8972435046c';
const apiAiClient = require('apiai')(API_AI_TOKEN);

const FACEBOOK_ACCESS_TOKEN = 'EAAirmrH49xQBAJcZAltIUXCTx08AQPgpYyLB1mpRx3Ry9jjRex1ujdvHYTPNKUykRDhIrNLpZBdkhF7I40F5gxqgB7aQyywV7hqRK03qkgTujgY6ZBalbFBIeyipB6At6XASjBpY9Iny0ElyiMRFSx9CSyJ0ZBkWgR71MxDZBboOEMHZB5lMBbVWTd9YgUbMAZD';
const request = require('request');


const sendTextMessage = (senderId, text) => {
  request({
    url: 'https://graph.facebook.com/v5.0/me/messages',
    qs: {access_token: FACEBOOK_ACCESS_TOKEN},
    method: 'POST',
    json: {
      recipient: {id : senderId},
      message: {text},
    }
  });
};

module.exports = (event) => {
  const senderId = event.sender.id;
  const message = event.message.text;

  const apiaiSession = apiAiClient.textRequest(message, {sessionId: 'Luty-bot'});
  
  apiaiSession.on('response', (response) => {
    const result = response.result.fulfillment.speech;

    sendTextMessage(senderId, result);
  });

  apiaiSession.on('error', error => console.log('error'));
  apiaiSession.end();
};