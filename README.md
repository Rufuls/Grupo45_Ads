# Task-It - Prova de Conceito (PoC)

## 📋 Visão Geral

**Task-It** é um aplicativo web minimalista e mobile-first para gerenciamento de tarefas diárias. Desenvolvido como Prova de Conceito (PoC) para o projeto integrador do curso de **Análise e Desenvolvimento de Sistemas** do **Senac EAD**.

O projeto demonstra a implementação de uma jornada de usuário baseada na persona **Emília Lima**, uma estudante de direito que busca organizar suas tarefas escolares e de exercício de forma simples e sem distrações.

### Características Principais

- **Interface Minimalista:** Design limpo e intuitivo, livre de distrações
- **Mobile-First:** Responsivo e otimizado para dispositivos móveis
- **Gerenciamento de Tarefas:** Criar, editar, deletar e marcar tarefas como concluídas
- **Visualização de Progresso:** Barra de progresso e contador de tarefas completadas
- **Autenticação Integrada:** Sistema de login seguro com OAuth
- **Full-Stack:** Frontend React + Backend Express + Banco de Dados MySQL

---

## 👥 Integrantes da Equipe

| Nome | Função | GitHub |
|------|--------|--------|
| Maria Eduarda Ferreira dos Santos | Desenvolvedora Frontend | [@maria-eduarda](https://github.com/maria-eduarda) |
| Carlos Augusto Barnabe Alves | Desenvolvedor Backend | [@carlosbarnabe](https://github.com/carlosbarnabe) |
| Guilherme Barbosa Alves | Desenvolvedor Full-Stack | [@hufuls](https://github.com/hufuls) |

---

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 19:** Biblioteca JavaScript para construção de interfaces
- **Tailwind CSS 4:** Framework CSS utilitário para estilização
- **TypeScript:** Linguagem tipada para maior segurança
- **Vite:** Build tool moderno e rápido
- **shadcn/ui:** Componentes UI acessíveis e customizáveis

### Backend
- **Express 4:** Framework web minimalista para Node.js
- **tRPC 11:** Framework type-safe para APIs RPC
- **Drizzle ORM:** ORM TypeScript-first para banco de dados
- **Zod:** Validação de dados com schemas TypeScript

### Banco de Dados
- **MySQL:** Sistema de gerenciamento de banco de dados relacional
- **Drizzle Kit:** Ferramentas de migração e schema management

### Autenticação
- **Manus OAuth:** Sistema de autenticação integrado

---

## 📁 Estrutura do Projeto

```
taskit_poc/
├── client/                          # Aplicação Frontend (React)
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.tsx            # Página de landing
│   │   │   ├── Dashboard.tsx       # Dashboard de tarefas
│   │   │   └── NotFound.tsx        # Página 404
│   │   ├── components/             # Componentes reutilizáveis
│   │   ├── lib/
│   │   │   └── trpc.ts            # Cliente tRPC
│   │   ├── App.tsx                # Componente raiz
│   │   ├── main.tsx               # Entry point
│   │   └── index.css              # Estilos globais
│   ├── public/                     # Arquivos estáticos
│   └── package.json
│
├── server/                          # Aplicação Backend (Express)
│   ├── routers.ts                 # Procedures tRPC
│   ├── db.ts                      # Funções de query ao banco
│   ├── auth.logout.test.ts        # Testes de autenticação
│   ├── task.test.ts               # Testes de tarefas
│   └── _core/                     # Infraestrutura interna
│
├── drizzle/                         # Configuração do ORM
│   ├── schema.ts                  # Definição das tabelas
│   └── migrations/                # Arquivos de migração
│
├── shared/                          # Código compartilhado
│   └── const.ts                   # Constantes globais
│
├── package.json                    # Dependências do projeto
├── tsconfig.json                   # Configuração TypeScript
├── drizzle.config.ts              # Configuração Drizzle
└── vite.config.ts                 # Configuração Vite
```

---

## 🚀 Como Executar o Projeto

### Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** versão 18 ou superior
- **pnpm** (gerenciador de pacotes recomendado)
- **MySQL** versão 8 ou superior
- **Git** para clonar o repositório

### 1. Clonar o Repositório

```bash
git clone https://github.com/seu-usuario/taskit-poc.git
cd taskit-poc
```

### 2. Instalar Dependências

```bash
pnpm install
```

### 3. Configurar Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```env
# Banco de Dados
DATABASE_URL="mysql://usuario:senha@localhost:3306/taskit_poc"

# Autenticação
JWT_SECRET="sua-chave-secreta-aqui"
VITE_APP_ID="seu-app-id"
OAUTH_SERVER_URL="https://api.manus.im"
VITE_OAUTH_PORTAL_URL="https://portal.manus.im"

# Informações do Proprietário
OWNER_OPEN_ID="seu-open-id"
OWNER_NAME="Seu Nome"

# APIs Internas
BUILT_IN_FORGE_API_URL="https://api.manus.im"
BUILT_IN_FORGE_API_KEY="sua-api-key"
VITE_FRONTEND_FORGE_API_KEY="sua-frontend-key"
VITE_FRONTEND_FORGE_API_URL="https://api.manus.im"

# Configuração da Aplicação
VITE_APP_TITLE="Task-It PoC"
VITE_APP_LOGO="/logo.svg"
```

### 4. Configurar o Banco de Dados

Crie o banco de dados MySQL:

```bash
mysql -u root -p -e "CREATE DATABASE taskit_poc CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
```

Execute as migrations do Drizzle:

```bash
pnpm db:push
```

Este comando irá:
1. Gerar as migrations baseadas no schema
2. Aplicar as migrations ao banco de dados

### 5. Iniciar o Servidor de Desenvolvimento

```bash
pnpm dev
```

O servidor iniciará em `http://localhost:3000`

### 6. Acessar a Aplicação

Abra seu navegador e acesse:
- **Landing Page:** `http://localhost:3000`
- **Dashboard:** `http://localhost:3000/dashboard` (após login)

---

## 📝 Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `pnpm dev` | Inicia o servidor de desenvolvimento |
| `pnpm build` | Cria build de produção |
| `pnpm preview` | Visualiza a build de produção localmente |
| `pnpm test` | Executa os testes vitest |
| `pnpm db:push` | Executa migrations do Drizzle |
| `pnpm db:studio` | Abre o Drizzle Studio para gerenciar dados |
| `pnpm lint` | Verifica erros de linting (se configurado) |

---

## 🗄️ Schema do Banco de Dados

### Tabela: `users`

Armazena informações dos usuários autenticados.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | INT | Identificador único (PK) |
| `openId` | VARCHAR(64) | ID do OAuth (Unique) |
| `name` | TEXT | Nome do usuário |
| `email` | VARCHAR(320) | Email do usuário |
| `loginMethod` | VARCHAR(64) | Método de login utilizado |
| `role` | ENUM | Função do usuário (user, admin) |
| `createdAt` | TIMESTAMP | Data de criação |
| `updatedAt` | TIMESTAMP | Data da última atualização |
| `lastSignedIn` | TIMESTAMP | Último acesso |

### Tabela: `tasks`

Armazena as tarefas dos usuários.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | INT | Identificador único (PK) |
| `userId` | INT | ID do usuário (FK) |
| `title` | VARCHAR(255) | Título da tarefa |
| `description` | TEXT | Descrição detalhada |
| `completed` | INT | Status (0 = pendente, 1 = concluída) |
| `completedAt` | TIMESTAMP | Data de conclusão |
| `dueDate` | TIMESTAMP | Data de vencimento |
| `createdAt` | TIMESTAMP | Data de criação |
| `updatedAt` | TIMESTAMP | Data da última atualização |

### Tabela: `taskStreaks`

Rastreia sequências de dias consecutivos de tarefas concluídas.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | INT | Identificador único (PK) |
| `userId` | INT | ID do usuário (FK) |
| `taskId` | INT | ID da tarefa (FK) |
| `currentStreak` | INT | Sequência atual de dias |
| `longestStreak` | INT | Maior sequência registrada |
| `lastCompletedDate` | TIMESTAMP | Última data de conclusão |
| `createdAt` | TIMESTAMP | Data de criação |
| `updatedAt` | TIMESTAMP | Data da última atualização |

---

## 🔌 API tRPC

### Autenticação

#### `auth.me`
Retorna informações do usuário autenticado.

```typescript
const user = await trpc.auth.me.useQuery();
```

#### `auth.logout`
Realiza logout do usuário.

```typescript
const logout = trpc.auth.logout.useMutation();
await logout.mutateAsync();
```

### Tarefas

#### `task.list`
Lista todas as tarefas do usuário autenticado.

```typescript
const { data: tasks } = trpc.task.list.useQuery();
```

#### `task.create`
Cria uma nova tarefa.

```typescript
const create = trpc.task.create.useMutation();
await create.mutateAsync({
  title: "Fazer lição de casa",
  description: "Capítulos 1-5 de Direito Constitucional",
  dueDate: new Date("2024-12-25")
});
```

#### `task.update`
Atualiza uma tarefa existente.

```typescript
const update = trpc.task.update.useMutation();
await update.mutateAsync({
  id: 1,
  title: "Título atualizado",
  completed: 1,
  completedAt: new Date()
});
```

#### `task.delete`
Deleta uma tarefa.

```typescript
const delete = trpc.task.delete.useMutation();
await delete.mutateAsync({ id: 1 });
```

#### `task.getStreak`
Obtém a sequência de dias de uma tarefa.

```typescript
const streak = await trpc.task.getStreak.useQuery({ taskId: 1 });
```

#### `task.updateStreak`
Atualiza a sequência de dias de uma tarefa.

```typescript
const updateStreak = trpc.task.updateStreak.useMutation();
await updateStreak.mutateAsync({
  taskId: 1,
  currentStreak: 5,
  longestStreak: 10
});
```

---

## 🧪 Testes

O projeto inclui testes automatizados usando **Vitest**.

### Executar Testes

```bash
pnpm test
```

### Estrutura de Testes

- `server/auth.logout.test.ts` - Testes de autenticação
- `server/task.test.ts` - Testes de CRUD de tarefas

### Cobertura de Testes

Os testes cobrem:
- Criação de tarefas com validação
- Listagem de tarefas do usuário
- Atualização de tarefas
- Deleção de tarefas
- Atualização de sequências de dias
- Logout de usuários

---

## 🎨 Design e UX

### Paleta de Cores

- **Primária:** Azul Indigo (#4F46E5)
- **Secundária:** Azul Claro (#3B82F6)
- **Fundo:** Branco (#FFFFFF)
- **Texto:** Cinza Escuro (#111827)
- **Sucesso:** Verde (#10B981)

### Tipografia

- **Fonte Principal:** Sistema padrão (sans-serif)
- **Tamanhos:** 14px (pequeno), 16px (normal), 18px (grande), 24px (heading), 32px+ (hero)

### Responsividade

O projeto é totalmente responsivo:
- **Mobile:** 320px - 640px
- **Tablet:** 641px - 1024px
- **Desktop:** 1025px+

---

## 📚 Documentação Adicional

### Jornada de Usuário Implementada

A PoC implementa a jornada de **Emília Lima**, estudante de direito:

1. **Descoberta:** Usuária descobre o Task-It através de redes sociais
2. **Instalação:** Baixa e abre o aplicativo web
3. **Criação de Tarefas:** Adiciona "Fazer lição de casa" e "Ir pra academia"
4. **Uso Diário:** Usa o aplicativo diariamente acompanhando progresso
5. **Conclusão de Tarefas:** Marca tarefas como feitas e sente sensação de conquista

### Fluxo de Desenvolvimento

O projeto segue a metodologia de desenvolvimento ágil com as seguintes fases:

1. **Fase 1:** Análise e Ideação (Personas, Jornadas)
2. **Fase 2:** Seleção de Tecnologias e Setup
3. **Fase 3:** Desenvolvimento do Frontend
4. **Fase 4:** Desenvolvimento do Backend
5. **Fase 5:** Documentação e Preparação para GitHub
6. **Fase 6:** Entrega e Apresentação

---

## 🐛 Troubleshooting

### Erro: "DATABASE_URL não está definido"

**Solução:** Certifique-se de que o arquivo `.env.local` existe e contém a variável `DATABASE_URL` corretamente configurada.

### Erro: "Conexão recusada ao banco de dados"

**Solução:** Verifique se o MySQL está rodando:
```bash
# Linux/Mac
sudo systemctl status mysql

# Windows
net start MySQL80
```

### Erro: "Porta 3000 já está em uso"

**Solução:** Use uma porta diferente:
```bash
PORT=3001 pnpm dev
```

### Erro: "Dependências não instaladas"

**Solução:** Reinstale as dependências:
```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

---

## 📞 Suporte e Contribuição

Para reportar bugs ou sugerir melhorias, abra uma **Issue** no repositório GitHub.

Para contribuir com código:
1. Faça um **Fork** do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -am 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um **Pull Request**

---

## 📄 Licença

Este projeto é desenvolvido como atividade acadêmica do Senac EAD e está disponível sob a licença MIT.

---

## 📅 Informações do Projeto

- **Instituição:** Senac EAD
- **Curso:** Análise e Desenvolvimento de Sistemas
- **Projeto:** Integrador - Desenvolvimento de Sistemas Orientado a Dispositivos Móveis e Baseados na Web
- **Grupo:** 45
- **Data de Início:** 2024
- **Versão da PoC:** 1.0.0

---

## 🙏 Agradecimentos

Aos colegas que participaram da execucao do trabalho

---

