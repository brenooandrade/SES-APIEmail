## Objetivo:
Lambda Function para disparo de e-mail, utiliza o framework Serverless para criar a Endpoint na API Gateway, recebendo o payload contendo os dados do e-mail via POST e acionando AWS SES para envio.

## Pré-requisitos:
###⚠️**Necessário ter uma conta na AWS**
###⚠️**Necessário ter o framework "Serverless" em sua estação de trabalho e sua conta na AWS configurada**
###⚠️**Necessário ter o serviço AWS SES (Amazon Simple Email Service) habilitado**

#### 1. Habilite o serviço em sua conta da AWS e crie um Support Case solicitando a virada de sua conta para Production, caso contrário, enquanto você estiver em modo SandBox será preciso verificar todos os e-mails destinatários**

#### 2. Crie um usuário no IAM para ser utilizado no Framework Serverless, anexe as polítics do IAM referente aos serviços API Gateway, Lambda, Amazon SES e demais serviços que você queira utilizar

#### 3. Utilize o comando **serverless create --template aws-nodejs** para configurar o Serverless Framework

#### 4. Crie uma role no IAM concedendo direitos de acesso ao serviço SES "AmazonSESFullAccess" 

#### 5. Utilize o comando "serverless deploy -s dev" para subir a Lambda function gerando um POST Endpoint no API Gateway

#### 6. Teste a chamada para envio do e-mail utilizando o seguinte payload de exemplo:

!<script src="https://gist.github.com/brenooandrade/51146ff2dc71c1140b55e85dd5e3f05e.js"></script>




