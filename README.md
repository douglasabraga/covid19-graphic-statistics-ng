# Estatísticas COVID19

Este projeto foi criado com o [Angular CLI](https://github.com/angular/angular-cli) versão 13.0.4.

## Escopo

Este projeto foi desenvolvido com Angular 13 a fim de fonecer dois modos de visualização de estatísticas acerca do COVID-19.

- O primeiro modo sendo em tabela, com no mínimo 5 países, tendo como colunas o nome do país, número de infectados, número de curados e quantidade de óbitos. Possível selecionar ou não uma data específica para visualização das informações, no caso do não preenchimento, será considerado a data atual. E está disponível um botão que quando clicado atualiza os dados da tabela.

- O segundo modo é um gráfico de pizza, com apenas informações sobre 1 país. Este país pode ser escolhido pelo usuário.
- Este gráfico contém 3 índices:
  - Número de infectados;
  - Número de curados;
  - Número de óbitos.
- Possibilidade de selecionar ou não uma data específica para visualização das informações, no caso do não preenchimento, será considerado a data atual.  E está disponível um botão que quando clicado atualiza os dados do gráfico.
- O usuário pode escolher o modo de exibição da informação, a visualização de ambos os modos é responsiva, ou seja, passível de visualização em diferentes tamanhos de tela sem comprometer o layout.

## Tecnologias

- [Angular CLI 13.0.4](https://github.com/angular/angular-cli)
- [Ng Bootstrap 10.0.0](https://ng-bootstrap.github.io/#/home)
- [Bootstrap 4.5.0](https://getbootstrap.com/docs/4.5/getting-started/download/)

## Bibliotecas externas

- [Chart.js](https://www.chartjs.org/)
- [date-fns](https://date-fns.org/)

## API Externa

- [API da COVID19](https://documenter.getpostman.com/view/10808728/SzS8rjbc)

## Como instalar

- Baixe ou clone este repositório usando `https://github.com/douglasabraga/fr-front-end-challenge.git`;
- Dentro do diretório, instale as dependências usando `npm install`.

## Como executar

Execute `ng serve` ou `npm start` para executar a versão de desenvolvimento. Depois acesse `http://localhost:4200/`. O aplicativo será recarregado automaticamente se você alterar qualquer um dos arquivos de origem.

## Como compilar/construir

Execute `ng build` ou `npm run build` para buildar o projeto. Para buildar a versão de produção adicione a flag `--prod`. Os arquivos serão armazenados do diretório `dist`.

## Dúvidas
Caso há alguma dúvida em relação a este repositório, envie para douglasabraga@outlook.com.
