# Guia de Setup - Task-It PoC

Este documento fornece instruções passo a passo para configurar e executar o projeto **Task-It** em seu ambiente local.

---

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter os seguintes softwares instalados:

### Obrigatórios

- **Node.js** (versão 18.0.0 ou superior)
  - Download: https://nodejs.org/
  - Verificar instalação: `node --version`

- **pnpm** (gerenciador de pacotes)
  - Instalação: `npm install -g pnpm`
  - Verificar instalação: `pnpm --version`

- **MySQL** (versão 8.0 ou superior)
  - Download: https://www.mysql.com/downloads/
  - Verificar instalação: `mysql --version`

- **Git** (para clonar o repositório)
  - Download: https://git-scm.com/
  - Verificar instalação: `git --version`

### Opcionais

- **Visual Studio Code** (editor recomendado)
  - Download: https://code.visualstudio.com/
  - Extensões recomendadas:
    - ES7+ React/Redux/React-Native snippets
    - Tailwind CSS IntelliSense
    - Prettier - Code formatter
    - Thunder Client (para testar APIs)

- **MySQL Workbench** (gerenciador visual do MySQL)
  - Download: https://www.mysql.com/products/workbench/

---

## 🚀 Passo a Passo de Instalação

### Passo 1: Clonar o Repositório

```bash
git clone https://github.com/seu-usuario/taskit-poc.git
cd taskit-poc
```

### Passo 2: Instalar Dependências

```bash
pnpm install
```

Este comando irá:
- Baixar todas as dependências do projeto
- Instalar pacotes do Node.js
- Configurar o ambiente local

**Tempo estimado:** 3-5 minutos

### Passo 3: Criar Banco de Dados MySQL

#### Opção A: Usando linha de comando

```bash
# Conectar ao MySQL
mysql -u root -p

# Criar banco de dados
CREATE DATABASE taskit_poc CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# Verificar criação
SHOW DATABASES;

# Sair
EXIT;
```

#### Opção B: Usando MySQL Workbench

1. Abra o MySQL Workbench
2. Conecte-se ao servidor MySQL
3. Clique em "Create a new schema"
4. Nomeie como `taskit_poc`
5. Defina Character Set como `utf8mb4`
6. Defina Collation como `utf8mb4_unicode_ci`
7. Clique em "Apply"

### Passo 4: Configurar Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```bash
touch .env.local
```

Adicione as seguintes variáveis (substitua pelos seus valores reais):

```env
# ===== BANCO DE DADOS =====
DATABASE_URL="mysql://root:sua_senha@localhost:3306/taskit_poc"

# ===== AUTENTICAÇÃO =====
JWT_SECRET="sua-chave-secreta-super-segura-aqui-minimo-32-caracteres"
VITE_APP_ID="seu-app-id-do-manus"
OAUTH_SERVER_URL="https://api.manus.im"
VITE_OAUTH_PORTAL_URL="https://portal.manus.im"

# ===== INFORMAÇÕES DO PROPRIETÁRIO =====
OWNER_OPEN_ID="seu-open-id-do-manus"
OWNER_NAME="Seu Nome Completo"

# ===== APIS INTERNAS =====
BUILT_IN_FORGE_API_URL="https://api.manus.im"
BUILT_IN_FORGE_API_KEY="sua-api-key-do-manus"
VITE_FRONTEND_FORGE_API_KEY="sua-frontend-key-do-manus"
VITE_FRONTEND_FORGE_API_URL="https://api.manus.im"

# ===== CONFIGURAÇÃO DA APLICAÇÃO =====
VITE_APP_TITLE="Task-It PoC"
VITE_APP_LOGO="/logo.svg"

# ===== ANALYTICS (OPCIONAL) =====
VITE_ANALYTICS_ENDPOINT="https://analytics.manus.im"
VITE_ANALYTICS_WEBSITE_ID="seu-website-id"
```

**Importante:** Nunca compartilhe o arquivo `.env.local` ou suas credenciais em repositórios públicos!

### Passo 5: Executar Migrations do Banco de Dados

```bash
pnpm db:push
```

Este comando irá:
1. Gerar as migrations baseadas no schema Drizzle
2. Aplicar as migrations ao banco de dados
3. Criar as tabelas: `users`, `tasks`, `taskStreaks`

**Saída esperada:**
```
✓ Your SQL migration file ➜ drizzle/0001_blue_mikhail_rasputin.sql 🚀
✓ migrations applied successfully!
```

### Passo 6: Iniciar o Servidor de Desenvolvimento

```bash
pnpm dev
```

**Saída esperada:**
```
  VITE v5.0.0  ready in 123 ms

  ➜  Local:   http://localhost:3000/
  ➜  press h to show help
```

### Passo 7: Acessar a Aplicação

Abra seu navegador e acesse:

- **Landing Page:** http://localhost:3000
- **Dashboard:** http://localhost:3000/dashboard (após login)

---

## 🧪 Executar Testes

Para garantir que tudo está funcionando corretamente, execute os testes:

```bash
pnpm test
```

**Saída esperada:**
```
 ✓ server/auth.logout.test.ts (1 test) 5ms
 ✓ server/task.test.ts (6 tests) 194ms
 Test Files  2 passed (2)
      Tests  7 passed (7)
```

---

## 🗄️ Gerenciar Banco de Dados

### Visualizar Dados com Drizzle Studio

```bash
pnpm db:studio
```

Este comando abrirá uma interface web para gerenciar os dados do banco de dados.

### Executar Queries SQL Customizadas

```bash
mysql -u root -p taskit_poc
```

Exemplos de queries úteis:

```sql
-- Ver todas as tarefas
SELECT * FROM tasks;

-- Ver tarefas de um usuário específico
SELECT * FROM tasks WHERE userId = 1;

-- Ver tarefas concluídas
SELECT * FROM tasks WHERE completed = 1;

-- Ver sequências de dias
SELECT * FROM taskStreaks;

-- Contar tarefas por usuário
SELECT userId, COUNT(*) as total FROM tasks GROUP BY userId;
```

---

## 🔧 Solução de Problemas

### Erro: "Cannot find module 'mysql2'"

**Causa:** Dependências não instaladas corretamente

**Solução:**
```bash
pnpm install
```

### Erro: "ECONNREFUSED 127.0.0.1:3306"

**Causa:** MySQL não está rodando

**Solução:**
```bash
# Linux/Mac
sudo systemctl start mysql

# Windows
net start MySQL80

# macOS com Homebrew
brew services start mysql
```

### Erro: "Access denied for user 'root'@'localhost'"

**Causa:** Senha do MySQL incorreta

**Solução:**
1. Verifique a senha no arquivo `.env.local`
2. Redefina a senha do MySQL:
```bash
mysql -u root
ALTER USER 'root'@'localhost' IDENTIFIED BY 'nova_senha';
FLUSH PRIVILEGES;
```

### Erro: "Database 'taskit_poc' doesn't exist"

**Causa:** Banco de dados não foi criado

**Solução:**
```bash
mysql -u root -p
CREATE DATABASE taskit_poc CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;
pnpm db:push
```

### Erro: "Porta 3000 já está em uso"

**Causa:** Outra aplicação está usando a porta 3000

**Solução:**
```bash
# Usar uma porta diferente
PORT=3001 pnpm dev

# Ou matar o processo na porta 3000
# Linux/Mac
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Erro: "TypeScript compilation failed"

**Causa:** Erros de tipo no código

**Solução:**
```bash
# Verificar erros
pnpm tsc --noEmit

# Corrigir erros manualmente ou usar:
pnpm tsc --noEmit --pretty
```

---

## 📦 Scripts Úteis

| Script | Comando | Descrição |
|--------|---------|-----------|
| Desenvolvimento | `pnpm dev` | Inicia servidor com hot reload |
| Build | `pnpm build` | Cria build de produção |
| Preview | `pnpm preview` | Visualiza build localmente |
| Testes | `pnpm test` | Executa testes vitest |
| Migrations | `pnpm db:push` | Aplica migrations |
| Studio | `pnpm db:studio` | Abre interface de dados |
| Lint | `pnpm lint` | Verifica erros (se configurado) |

---

## 🎯 Próximos Passos

Após completar o setup:

1. **Explorar o código:** Navegue pelos arquivos do projeto
2. **Entender a arquitetura:** Leia o README.md
3. **Fazer alterações:** Modifique o código e veja as mudanças em tempo real
4. **Executar testes:** Certifique-se de que tudo funciona
5. **Fazer commits:** Use `git commit` para salvar suas mudanças

---

## 📚 Recursos Adicionais

- **Documentação React:** https://react.dev
- **Documentação Tailwind:** https://tailwindcss.com/docs
- **Documentação tRPC:** https://trpc.io/docs
- **Documentação Drizzle:** https://orm.drizzle.team/docs
- **Documentação Express:** https://expressjs.com/
- **Documentação TypeScript:** https://www.typescriptlang.org/docs/

---

## 💡 Dicas Úteis

### 1. Usar pnpm ao invés de npm

O projeto usa `pnpm` por ser mais rápido e eficiente. Sempre use:
```bash
pnpm install
pnpm add package-name
pnpm remove package-name
```

### 2. Manter `.env.local` seguro

Nunca faça commit do arquivo `.env.local`:
```bash
# Já está no .gitignore, mas verifique:
cat .gitignore | grep env
```

### 3. Usar branches para desenvolvimento

```bash
git checkout -b feature/minha-feature
git commit -am "feat: adiciona minha feature"
git push origin feature/minha-feature
```

### 4. Executar testes antes de fazer commit

```bash
pnpm test
```

### 5. Manter código limpo

```bash
# Verificar erros de tipo
pnpm tsc --noEmit

# Formatar código (se prettier estiver configurado)
pnpm format
```

---

## 🆘 Precisa de Ajuda?

Se encontrar problemas durante o setup:

1. Verifique a seção "Solução de Problemas" acima
2. Consulte a documentação do projeto (README.md)
3. Abra uma Issue no GitHub
4. Entre em contato com a equipe de desenvolvimento

---

**Parabéns! Você completou o setup do Task-It PoC! 🎉**

Agora você está pronto para explorar, modificar e contribuir com o projeto.

---

*Última atualização: Dezembro de 2024*  
*Versão: 1.0.0*
