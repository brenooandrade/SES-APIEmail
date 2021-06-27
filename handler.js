'use strict';

// Carregar AWS SDK - NodeJS
var AWS = require('aws-sdk');
// Configurar região
AWS.config.update({region: 'us-east-1'});

async function EnviaEmail(destinatario, assunto, conteudo, remetente, lCopias) {
  return new Promise(async(resolve) => {
    // Parâmetros para envio do email
    var params = {
      //Destinatario e Cópias
      Destination: { 
        ToAddresses: [
          destinatario,
        ],
        CcAddresses: lCopias
      },
      //Parâmetros da mensagem
      Message: {
        Body: { 
          Html: {
          Charset: "UTF-8",
          Data: conteudo
          }
        },
        Subject: {
          Charset: 'UTF-8',
          Data: assunto
        }
        },
      Source: remetente, /* remetente */
      ReplyToAddresses: [
        remetente
      ],
    };
    // Objeto do SES
    var sendPromise = new AWS.SES({apiVersion: '2010-12-01'}).sendEmail(params).promise();
    // Acionar promise's
    await sendPromise.then(
      async function(data) {
        console.log(data.MessageId);
        resolve(data.MessageId);
      }).catch(
        function(err) {
        console.error(err, err.stack);
        resolve(err);
      });
  });
}

module.exports.APIEmail = async (event) => {
  try {
    let dadosEmail = JSON.parse(event.body);
    typeof(dadosEmail.listaCC) === 'undefined' ? dadosEmail.listaCC = [] : dadosEmail.listaCC.length > 0 ? true : dadosEmail.listaCC = [];
    let sResposta = await EnviaEmail(dadosEmail.destino, dadosEmail.assunto, dadosEmail.conteudo, dadosEmail.remetente, dadosEmail.listaCC);
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin" : "*", // Requerido para CORS permitir acesso
        "Access-Control-Allow-Credentials" : true // Requirido para cookies e authorization headers com HTTPS  
      }, 
      body: JSON.stringify(
        {
          message: `E-mail enviado com sucesso: ${sResposta}`,
          destino: dadosEmail.destino,
          copias: dadosEmail.listaCC
        },
        null,
        2
      ),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin" : "*", 
        "Access-Control-Allow-Credentials" : true 
      },  
      body: JSON.stringify(
        {
          code: "BadRequest",
          sucesso: false,
          req: event.body,
          message: `Erro ao enviar email: ${error}`
        })
    }
  }
};
