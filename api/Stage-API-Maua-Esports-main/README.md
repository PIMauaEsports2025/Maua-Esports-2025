# API de Treinos e Modalidades

Esta API é uma implementação simples em Node.js para testes, que expõe três endpoints principais para gerenciamento de dados de treinos e modalidades. Os dados padrão são carregados de dois arquivos JSON locais e são armazenados em memória, sendo resetados para os valores padrão a cada 24 horas.

> **Observação:** Se você preferir utilizar a API sem precisar fazer todo o processo de instalação e configuração, você pode utilizá-la através da URL: [https://API-Esports.lcstuber.net/](https://API-Esports.lcstuber.net/)<br><br>**NOTA:** Para o desenvolvimento do Projeto Integrador do do Mauá Esports não é para criar uma API nova, apenas utilize esse link acima!

---

## Funcionalidades

- **GET /trains/all**  
  Retorna a lista de treinos, permitindo filtrar por:
  - `StartTimestamp>` (maior que um valor informado)
  - `StartTimestamp<` (menor que um valor informado)
  - `Status` (status exato do treino)

- **GET /modality/all**  
  Retorna as modalidades, com opção de filtrar por `Tag`.

- **PATCH /modality**  
  Atualiza o campo `ScheduledTrainings` de uma modalidade. Antes da atualização, o endpoint valida as expressões CRON dos campos `Start` e `End` para garantir que estão no formato correto de 6 campos (segundos, minutos, horas, dia do mês, mês e dia da semana).

- **Autenticação**  
  Todas as rotas exigem um header `Authorization` com o token Bearer:  
  ```
  Authorization: Bearer frontendmauaesports
  ```

- **Reset Automático**  
  A cada 24 horas, os dados em memória são resetados para os valores padrão definidos nos arquivos JSON.

---

## Pré-requisitos

- Node.js (versão 12 ou superior)
- npm (Node Package Manager)

---

## Instalação

1. **Clone ou baixe o repositório**  
   Certifique-se de que os arquivos `defaultTrains.json` e `defaultModalities.json` estão na mesma pasta do arquivo `index.js`.

2. **Instale as dependências**  
   Abra o terminal na pasta do projeto e execute:
   ```bash
   npm install express body-parser dotenv
   ```

---

## Execução

Para iniciar a API, execute o comando:
```bash
node index.js
```
Por padrão, o servidor será iniciado na porta `3000`. Você pode alterar a porta definindo a variável de ambiente `PORT`.

---

## Endpoints

### Autenticação

Todas as requisições devem incluir o seguinte header:
```
Authorization: Bearer frontendmauaesports
```

### GET /trains/all

Retorna uma lista de treinos. São aceitos os seguintes parâmetros de consulta:

- **StartTimestamp>**: Filtra os treinos cujo `StartTimestamp` é maior que o valor informado.
- **StartTimestamp<**: Filtra os treinos cujo `StartTimestamp` é menor que o valor informado.
- **Status**: Filtra os treinos pelo status exato informado.

#### Exemplo de Requisição

```
GET /trains/all?StartTimestamp>=1724000000000&Status=RUNNING
```

---

### GET /modality/all

Retorna todas as modalidades. Aceita o parâmetro de consulta opcional:

- **Tag**: Se informado, retorna apenas as modalidades cujo `Tag` corresponde ao valor passado.

#### Exemplo de Requisição

```
GET /modality/all?Tag=LOLA
```

---

### PATCH /modality

Atualiza a propriedade `ScheduledTrainings` de uma modalidade. O corpo da requisição deve conter os seguintes campos:

- **_id**: Identificador da modalidade.
- **ScheduledTrainings**: Array de objetos contendo os campos `Start` e `End` em formato CRON (6 campos).

A API valida se os campos `Start` e `End` possuem um formato válido de CRON (segundos, minutos, horas, dia do mês, mês e dia da semana).

#### Exemplo de Corpo de Requisição

```json
{
  "_id": "64124b9114a24f13c339bb21",
  "ScheduledTrainings": [
    {
      "Start": "0 00 20 * * 2",
      "End": "0 00 23 * * 2"
    },
    {
      "Start": "0 00 20 * * 3",
      "End": "0 00 23 * * 3"
    },
    {
      "Start": "0 00 20 * * 4",
      "End": "0 00 23 * * 4"
    }
  ]
}
```

#### Exemplo de Resposta

```json
{ "message": "Item updated" }
```

---

## Reset dos Dados

Os dados são armazenados em memória e resetados para os valores padrão definidos nos arquivos `defaultTrains.json` e `defaultModalities.json` a cada 24 horas. Isso garante que a API retorne sempre os dados iniciais para fins de teste.

---

## Considerações Finais

Esta API é ideal para testes e demonstrações, utilizando dados locais sem conexão com um banco de dados. Sinta-se à vontade para expandir e modificar conforme suas necessidades.

---

## Licença

Este projeto é fornecido "no estado em que se encontra", sem garantia expressa ou implícita. Modifique e utilize conforme necessário.

---

Agora você tem um README completo para orientar a instalação, execução e utilização da API.