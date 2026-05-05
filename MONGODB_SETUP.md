# 🔒 Configuração do MongoDB com Segurança

## 📋 Visão Geral

Este guia configurará um **banco de dados MongoDB seguro** na nuvem usando MongoDB Atlas, com:
- ✅ Criptografia de dados em repouso
- ✅ Criptografia de dados em trânsito (SSL/TLS)
- ✅ Autenticação de usuário
- ✅ Backups automáticos
- ✅ Proteção por IP whitelist

---

## 🚀 Passo 1: Criar Conta no MongoDB Atlas

### 1.1 Acessar MongoDB Atlas
1. Acesse: https://www.mongodb.com/cloud/atlas
2. Clique em **"Start Free"** (caixa verde)
3. Escolha uma opção de login:
   - Google (recomendado)
   - GitHub
   - Criar conta nova

### 1.2 Criar Organização
1. Preencha informações básicas
2. Clique em **"Create Organization"**
3. Você será redirecionado ao dashboard

---

## 🛠️ Passo 2: Criar Cluster (Banco de Dados)

### 2.1 Iniciar Criação do Cluster
1. No dashboard, clique em **"Create"** ou **"New Project"**
2. Escolha **"Build a Database"**

### 2.2 Selecione Plano Gratuito
```
┌────────────────────────────────┐
│ FREE - Shared Resources        │  ✅ Escolha este
│ • 512 MB de armazenamento      │
│ • Sem custo                    │
│ • Backups automáticos          │
│ • Criptografia                 │
└────────────────────────────────┘
```

### 2.3 Selecione Região
- Escolha a região mais próxima: **sa-east-1 (São Paulo)** ou **us-east-1**
- Clique em **"Create"**

### 2.4 Aguarde Criação
- Processo leva 2-5 minutos
- Você receberá um e-mail de confirmação

---

## 🔐 Passo 3: Configurar Segurança

### 3.1 Criar Usuário de Banco de Dados

1. Após criação do cluster, clique na aba **"Security"**
2. Clique em **"Database Access"** (painel esquerdo)
3. Clique em **"Add New Database User"**

**Preencha:**
```
Username: rifas_user
Password: [Gere uma senha forte]
```

**Exemplo de senha segura:**
```
Rifas2024!@#$%^
```

4. Role para baixo e clique **"Add User"**

### 3.2 Configurar IP Whitelist

1. Clique em **"Network Access"** (painel esquerdo)
2. Clique em **"Add IP Address"**
3. Escolha uma opção:
   - **Desenvolvimento Local**: Clique em "Add Current IP Address"
   - **Permitir Todos Temporariamente**: Clique em "Allow Access from Anywhere"
     - ⚠️ Em produção, sempre restrinja por IP específico

4. Clique **"Confirm"**

---

## 📝 Passo 4: Obter String de Conexão

### 4.1 Copiar URI de Conexão

1. Volte à aba **"Databases"**
2. Clique em **"Connect"** (no seu cluster)
3. Escolha **"Drivers"**
4. Selecione:
   - **Driver**: Node.js
   - **Version**: 4.1 or later
5. Copie a URI (semelhante a):
```
mongodb+srv://rifas_user:PASSWORD@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

### 4.2 Substituir Credenciais

Na URI copiada, substitua:
- `PASSWORD` → pela senha que você criou
- `/?retryWrites...` → remova e adicione o nome do banco:
  `/rifas_db?retryWrites=true&w=majority`

**Resultado final:**
```
mongodb+srv://rifas_user:Rifas2024!@#$%^@cluster0.xxxxx.mongodb.net/rifas_db?retryWrites=true&w=majority
```

---

## 📄 Passo 5: Atualizar Arquivo .env

No arquivo `.env` da aplicação, atualize:

```env
# Database - MongoDB Atlas
MONGODB_URI=mongodb+srv://rifas_user:Rifas2024!@#$%^@cluster0.xxxxx.mongodb.net/rifas_db?retryWrites=true&w=majority

# Outros valores já estão configurados com segurança
NODE_ENV=development
JWT_SECRET=[já configurado]
ENCRYPTION_KEY=[já configurado]
```

---

## 🧪 Passo 6: Testar Conexão

### 6.1 Parar servidor anterior (se estiver rodando)
```bash
# Pressione Ctrl+C no terminal onde o backend está rodando
```

### 6.2 Iniciar backend com novo banco

```bash
cd backend
npm run dev
```

### 6.3 Verificar logs

Você deve ver:
```
✅ MongoDB Connected: cluster0.xxxxx.mongodb.net
📊 Mongoose connected to MongoDB
🔒 Database: connected
```

✅ **Se vir essas mensagens, a conexão foi bem-sucedida!**

---

## 🛡️ Recursos de Segurança Implementados

### Criptografia
| Tipo | Algoritmo | Uso |
|------|-----------|-----|
| Em Trânsito | TLS 1.2+ | Conexão MB → App |
| Em Repouso | AES-256 | Dados no DB |
| Sensíveis | AES-256-GCM | PIX, telefone, CPF |
| Senhas | bcryptjs | Hash seguro |

### Controle de Acesso
```
┌─────────────────────────────────────────┐
│ Camadas de Segurança                    │
├─────────────────────────────────────────┤
│ 1. IP Whitelist (MongoDB Atlas)         │
│ 2. Autenticação de Usuário (DB)         │
│ 3. JWT Token (API)                      │
│ 4. Rate Limiting (Proteção DDoS)        │
│ 5. Criptografia de Dados Sensíveis      │
└─────────────────────────────────────────┘
```

### Backups Automáticos
- ✅ Realizados a cada 6 horas
- ✅ Retenção de 7 dias
- ✅ Acessíveis direto do dashboard

---

## ⚠️ Instruções de Segurança em Produção

Quando estiver pronto para usar em produção:

### 1. Gerar Novas Chaves
```bash
node generate-security-keys.js
```

### 2. Atualizar .env com Valores de Produção
```env
NODE_ENV=production
# Use MongoDB Payment com plano pago
# MONGODB_URI=[URI de produção]
JWT_SECRET=[nova chave gerada]
ENCRYPTION_KEY=[nova chave gerada]
```

### 3. Segurança do MongoDB Atlas
- [ ] Criar usuário separado para produção
- [ ] Configurar IP whitelist apenas para seus servidores
- [ ] Ativar backup contínuo
- [ ] Configurar alertas de segurança
- [ ] Habilitar monitoramento de performance

### 4. Proteção da Aplicação
- [ ] HTTPS (SSL/TLS) habilitado
- [ ] CORS configurado apenas para domínios autorizados
- [ ] Variáveis sensíveis protegidas
- [ ] Logging e monitoramento ativado

---

## 🆘 Solução de Problemas

### Erro: "Connection refused"
```
❌ mongodb.net: getaddrinfo ENOTFOUND
```
**Solução:**
- Verifique se a URI está correta
- Verifique o IP whitelist (adicione seu IP)
- Verifique username/password

### Erro: "Authentication failed"
```
❌ Authentication failed against database 
```
**Solução:**
- Confirme username e password na URI
- Verifique se @ foi escrito corretamente
- Resete a senha no MongoDB Atlas

### Erro: "ENCRYPTION_KEY not set"
```
❌ ENCRYPTION_KEY is not defined
```
**Solução:**
- Execute: `node generate-security-keys.js`
- Copie a ENCRYPTION_KEY para .env

---

## 📞 Recursos Úteis

- **MongoDB Atlas Docs**: https://docs.atlas.mongodb.com/
- **Connection Strings**: https://docs.mongodb.com/manual/reference/connection-string/
- **Node.js Driver**: https://www.mongodb.com/docs/drivers/node/current/
- **Segurança MongoDB**: https://docs.mongodb.com/manual/security/

---

## ✅ Checklist de Configuração

- [ ] Conta criada no MongoDB Atlas
- [ ] Cluster criado na região correta
- [ ] Usuário de banco de dados criado
- [ ] IP whitelist configurado
- [ ] URI de conexão copiada
- [ ] .env atualizado com URI
- [ ] Backend iniciado sem erros
- [ ] Logs mostram conexão bem-sucedida
- [ ] Teste de autenticação realizado

---

**Banco de dados pronto para produção! 🎉**

Para voltar a usar MongoDB local, use: 
```
MONGODB_URI=mongodb://localhost:27017/rifas_db
```
