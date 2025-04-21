# GameHost - Sistema de Gerenciamento de Servidores de Jogos

Um dashboard completo para venda e gerenciamento de servidores de jogos (MTA, SAMP, Minecraft) com integração MercadoPago e Pterodactyl.

![GameHost Dashboard](https://via.placeholder.com/1200x600/ea384c/FFFFFF?text=GameHost+Dashboard)

## Funcionalidades

O GameHost oferece um sistema abrangente com:

### 🔐 Autenticação
- Login/cadastro com e-mail + senha
- JWT com controle de role (`admin` ou `cliente`)
- Armazenamento seguro de tokens com expiração

### 💳 Gestão de Saldo
- Adição de fundos via MercadoPago
- Confirmação automática de pagamentos
- Histórico completo de transações

### 🛒 Loja de Servidores
- Compra de servidores de MTA, SAMP e Minecraft
- Integração automática com Pterodactyl
- Configuração personalizada de recursos

### ⚙️ Gerenciamento de Produtos
- Painel de controle para cada servidor
- Status em tempo real (CPU, RAM, Disco)
- Opções de upgrade/downgrade e renovação automática

### 📩 Sistema de Suporte
- Abertura e gestão de tickets
- Anexos e categorização
- Interface de chat para comunicação

### 👨‍💼 Painel Administrativo
- Gestão completa de usuários e produtos
- Logs de ações e visualização de métricas
- Ferramentas administrativas avançadas

## Tecnologias Utilizadas

### Front-end
- React com TypeScript
- TailwindCSS para estilização
- shadcn/ui para componentes
- Tema escuro por padrão com cores vermelho/preto

### Back-end (a ser configurado)
- API RESTful (Node.js recomendado)
- PostgreSQL ou MongoDB para banco de dados
- Integrações:
  - MercadoPago API
  - Pterodactyl API
  - Sistema de autenticação JWT

## Configuração do Projeto

### Pré-requisitos
- Node.js 16+ e npm
- Conta no MercadoPago (para processamento de pagamentos)
- Acesso a um servidor Pterodactyl

### Instalação

```sh
# Clone o repositório
git clone <URL_DO_REPOSITORIO>

# Navegue até a pasta do projeto
cd gamehost

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

## Guia de Configuração

### Configurando o MercadoPago

1. Crie uma conta em [MercadoPago Developers](https://developers.mercadopago.com/)
2. Obtenha suas credenciais de API (Public Key e Access Token)
3. Configure as credenciais no arquivo de ambiente (.env)
4. Defina a URL de callback para receber notificações de pagamentos

### Configurando o Pterodactyl

1. Configure seu servidor Pterodactyl seguindo a [documentação oficial](https://pterodactyl.io/)
2. Gere uma API key com permissões adequadas
3. Configure a URL do servidor e a API key no arquivo de ambiente

### Ativando o Modo Admin

1. No banco de dados, defina o campo `role` do usuário para `admin`
2. Faça logout e login novamente para acessar o painel administrativo
3. O painel admin estará disponível com funcionalidades extras

## Estrutura do Projeto

```
/src
  /components      # Componentes reutilizáveis
    /layout        # Componentes de layout (Sidebar, Navbar)
    /ui            # Componentes de UI (buttons, cards, etc)
  /hooks           # Hooks personalizados
  /lib             # Utilidades e funções auxiliares
  /pages           # Páginas da aplicação
    /auth          # Páginas de autenticação
    /admin         # Páginas do painel administrativo
  /services        # Serviços de API e integrações
  /store           # Estado global (context, redux, etc)
  /types           # Definições de tipos TypeScript
```

## Contribuição

Contribuições são bem-vindas! Por favor:

1. Crie um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para detalhes.

---

Desenvolvido com ❤️ por [Seu Nome/Empresa]
