# Desafio Coodesh 

#### Tecnologias:

Framework: Cypress

Adicionais: [Allure-Reports](<https://github.com/Shelex/cypress-allure-plugin>), [Faker.js](https://fakerjs.dev>)


## Instalação e Configuração 

### Instalação do Node JS

Realizar o download da versão recomendada através do [Link](<https://nodejs.org/en/>) 

### Instalação Cypress

Rodar o comando da sua preferência para instalar o Cypress:

```Bash
npm install cypress --save-dev
```
ou
```Bash
yarn add cypress --dev
```

## Allure-Reports

O report utilizado é um plugin desenvolvido por um terceiro: [Shelex/cypress-allure-plugin](<https://github.com/Shelex/cypress-allure-plugin>).

Necessita instalação do JAVA e configuração do JAVA_HOME nas variáveis de ambiente, após finalizado executar o comando abaixo para iniciar a instalação do plugin.

- [Java 18](<https://www.oracle.com/java/technologies/javase/jdk18-archive-downloads.html>)

- [Guia instalação JAVA_HOME variáveis de ambiente](<https://confluence.atlassian.com/confbr1/configurando-a-variavel-java_home-no-windows-933709538.html>).


- Usando npm:
```Bash
npm i -D @shelex/cypress-allure-plugin
```

- Usando yarn:
```Bash
yarn add -D @shelex/cypress-allure-plugin
```

Para ativar a gravação de resultados do Allure, basta passar a variável de ambiente `allure=true`, por exemplo:

```Bash
yarn cypress run --env allure=true
```

## Executando os testes

Após tudo instalado e devidamente configurado basta rodar os comandos no terminal para executar os testes:

Para executar em modo gráfico execute o comando abaixo:

```Bash
yarn cypress open
```

Para executar em modo headless execute o comando abaixo:

```Bash
yarn cypress run
```

Para visualizar o report do Allure, executar o comando abaixo, uma aba do navegador ira se abrir automaticamente com o report.

```Bash
yarn allure serve
```

>This is a challenge by [Coodesh](<https://coodesh.com>)
