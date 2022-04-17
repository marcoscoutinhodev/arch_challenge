# Desafio da Arch
## 
## Instalação

Precisa do NodeJs:16, MongoDb e Redis instalado
Caso queira usar o docker é só criar os containers com os comandos abaixo
  - docker run -d -p 27017:27017 --name mongodb_arch_challenge mongo:4.4.13
  - docker run -d -p 6379:6379 --name redis_arch_challenge redis:alpine

Caso use na maquina local, lembre-se de usar a porta padrão do Mongo(27017) e do Redis(6379) ou alterar no codigo

Abra 3 terminais para ter acesso aos logs e rode os projetos
```sh
cd transaction-api
yarn && yarn start
cd balance-api
yarn && yarn start
cd api-gateway
yarn && yarn start
```

As requisições devem ser feitas para 127.0.0.1:4000
 POST /transaction
  - Dados que precisam ser enviados no corpo da requisição {
    "accountId": NUMBER,
    "transactionType": STRING ("deb" ou "cred")
    "transactionAmount": NUMBER,
    "transactionDate": STRING (precisa ser uma data valida)
  }
 
 GET /balance/ACCOUNT-ID
