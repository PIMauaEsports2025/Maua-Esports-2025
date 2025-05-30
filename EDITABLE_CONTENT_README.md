# Sistema de Edição de Conteúdo - Mauá E-Sports

## Como usar o painel de edição

### Acesso ao Painel
Para acessar o painel de edição, navegue até `/admin` ou importe o componente `EditSiteInfo` em qualquer página administrativa.

### Funcionalidades

#### 1. **Abas de Edição**
O painel está organizado em 5 abas principais:
- **Home**: Editar textos da página inicial
- **Sobre**: Editar informações sobre a equipe
- **Times**: Editar descrições das equipes
- **Campeonatos**: Editar informações dos campeonatos
- **Contato**: Editar textos da página de contato

#### 2. **Campos Editáveis**

**Home:**
- Título e descrição do Hero
- Título e parágrafos da seção "Quem Somos"
- Descrições da seção Games

**Sobre:**
- Título e texto "Como Começamos"
- Missão, Visão e Valores

**Times:**
- Título e descrição do Hero
- Título da seção de equipes
- Título e parágrafos da descrição final

**Campeonatos:**
- Título e descrição da página

**Contato:**
- Título e descrição da página
- Título da seção FAQ

#### 3. **Como Editar**

1. Acesse o painel de edição
2. Selecione a aba correspondente à página que deseja editar
3. Modifique os textos nos campos de entrada
4. Clique em "Salvar Alterações"
5. As alterações serão salvas no localStorage e aplicadas nas páginas correspondentes

#### 4. **Armazenamento**

Os dados são salvos localmente no navegador usando `localStorage` com a chave `siteData`. As alterações são aplicadas automaticamente quando as páginas são carregadas.

### Estrutura dos Dados

```javascript
{
  home: {
    heroTitle: string,
    heroDescription: string,
    quemSomosTitle: string,
    quemSomosText1: string,
    quemSomosText2: string,
    quemSomosText3: string,
    gamesDescription1: string,
    gamesDescription2: string
  },
  sobre: {
    comecoTitle: string,
    comecoText: string,
    missao: string,
    visao: string,
    valores: string
  },
  times: {
    heroTitle: string,
    heroDescription: string,
    sectionTitle: string,
    descriptionTitle: string,
    descriptionText1: string,
    descriptionText2: string,
    descriptionText3: string
  },
  campeonatos: {
    title: string,
    description: string
  },
  contato: {
    title: string,
    description: string,
    faqTitle: string
  }
}
```

### Integração com Páginas

Todas as páginas principais (Home, Sobre, Times, Campeonatos, Contato) foram atualizadas para consumir os dados editáveis do localStorage. Se não houver dados salvos, os valores padrão são exibidos.

### Nota sobre Imagens

Atualmente, o sistema suporta apenas edição de textos. Para editar imagens, seria necessário implementar upload de arquivos e armazenamento adequado (como AWS S3 ou similar).