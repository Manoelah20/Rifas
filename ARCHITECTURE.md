# 🏗️ Arquitetura & Estrutura do Projeto

## 📁 Estrutura de Pastas

```
rifas/
│
├── 📚 DOCUMENTAÇÃO LEGAL
│   ├── PRIVACY_POLICY.md           ← Política de Privacidade LGPD/GDPR
│   ├── TERMS_OF_USE.md             ← Termos e Condições
│   ├── PLATFORM_RULES.md           ← Regras da Plataforma
│   ├── FINAL_SUMMARY.md            ← Resumo Executivo
│   └── QUICK_SUMMARY.md            ← Guia Rápido
│
├── 📖 DOCUMENTAÇÃO TÉCNICA
│   ├── FRONTEND_INTEGRATION.md     ← Guia React
│   ├── MONGODB_SETUP.md            ← Configuração BD
│   ├── SECURITY_VERIFICATION.md    ← Testes Segurança
│   ├── IMPLEMENTATION_COMPLETE.md  ← Resumo Técnico
│   └── README.md                   ← Visão Geral
│
├── 🎨 FRONTEND (React/Vite)
│   └── src/
│       ├── components/
│       │   ├── Legal/
│       │   │   ├── TermsModal.jsx         (exemplo fornecido)
│       │   │   ├── PrivacyModal.jsx       (exemplo fornecido)
│       │   │   └── AgeVerification.jsx    (exemplo fornecido)
│       │   ├── ...outros componentes
│       │   └── Footer.jsx
│       ├── pages/
│       │   ├── Register.jsx               (atualizar com TermsModal)
│       │   ├── TermsOfUse.jsx             (novo)
│       │   ├── PrivacyPolicy.jsx          (novo)
│       │   └── PlatformRules.jsx          (novo)
│       └── services/
│           └── api.js
│
├── 🔧 BACKEND (Node.js/Express)
│   ├── backend/
│   │   │
│   │   ├── 🔒 SEGURANÇA
│   │   │   ├── middleware/
│   │   │   │   ├── auth.js                    ✅ Existente
│   │   │   │   ├── securityHeaders.js         ✅ Existente
│   │   │   │   ├── securityMonitoring.js      ✅ Existente
│   │   │   │   └── termsMiddleware.js         ✅ NOVO
│   │   │   └── utils/
│   │   │       ├── encryption.js             ✅ Existente
│   │   │       ├── logger.js                 ✅ Existente
│   │   │       └── validators.js             ✅ Existente
│   │   │
│   │   ├── 💼 LÓGICA DE NEGÓCIO
│   │   │   └── services/
│   │   │       ├── userService.js            ✅ NOVO
│   │   │       ├── raffleService.js          ✅ NOVO
│   │   │       └── auditService.js           ✅ NOVO
│   │   │
│   │   ├── 🛣️ ROTAS API
│   │   │   ├── auth.js                       ✅ Existente (melhorado)
│   │   │   ├── raffles.js                    ✅ Existente
│   │   │   ├── users.js                      ✅ Existente (melhorado)
│   │   │   ├── admin.js                      ✅ NOVO
│   │   │   └── terms.js                      ✅ NOVO
│   │   │
│   │   ├── 📊 MODELOS
│   │   │   ├── User.js                       ✅ Existente (campos novos)
│   │   │   ├── Raffle.js                     ✅ Existente
│   │   │   ├── Ticket.js                     ✅ Existente
│   │   │   └── AuditLog.js                   (usar auditService)
│   │   │
│   │   ├── ⚙️ CONFIGURAÇÃO
│   │   │   ├── config/
│   │   │   │   └── database.js               ✅ Existente
│   │   │   ├── .env                          ✅ Atualizado
│   │   │   ├── .env.example                  ✅ Existente
│   │   │   ├── server.js                     ✅ Existente
│   │   │   └── package.json                  ✅ Atualizado
│   │   │
│   │   ├── 📝 LOGS
│   │   │   └── logs/
│   │   │       ├── 2024-05-04-security.log
│   │   │       ├── 2024-05-04-auth.log
│   │   │       ├── 2024-05-04-api.log
│   │   │       └── 2024-05-04-transaction.log
│   │   │
│   │   └── 🔑 UTILITÁRIOS
│   │       └── generate-security-keys.js     ✅ Existente
│   │
│   └── 📦 DEPENDÊNCIAS
│       ├── Segurança:
│       │   ├── helmet (headers)
│       │   ├── express-rate-limit
│       │   ├── bcryptjs
│       │   ├── jsonwebtoken
│       │   ├── mongo-sanitize
│       │   ├── xss-clean
│       │   └── hpp
│       ├── BD:
│       │   ├── mongoose
│       │   └── dotenv
│       └── Utilitários:
│           ├── cors
│           ├── express-validator
│           └── nodemon (dev)
│
└── 📊 BANCO DE DADOS
    └── MongoDB Atlas
        ├── 🔐 Segurança
        │   ├── Criptografia em repouso
        │   ├── Criptografia TLS 1.2+
        │   ├── IP Whitelist
        │   ├── Autenticação de usuário
        │   └── Backups automáticos (6h)
        └── 📁 Collections
            ├── users
            │   ├── termsAccepted
            │   ├── privacyPolicyAccepted
            │   ├── platformRulesAccepted
            │   ├── ageVerified
            │   ├── marketingConsent
            │   └── ... (campos existentes)
            ├── raffles
            │   └── ... (campos existentes)
            ├── tickets
            │   └── ... (campos existentes)
            └── auditlogs (opcional)
                ├── action
                ├── userId
                ├── timestamp
                └── details
```

---

## 🔄 Fluxo de Dados - Registro de Novo Usuário

```
┌─────────────────────┐
│   Usuário acessa    │
│   /register         │
└──────────┬──────────┘
           │
           ▼
┌──────────────────────────────────┐
│  Preenche formulário             │
│  - Email                         │
│  - Senha (validada)              │
│  - Nome                          │
│  - Telefone                      │
└──────────┬───────────────────────┘
           │
           ▼
┌──────────────────────────────────────┐
│  POST /api/auth/register             │
│  1. Validar entrada                  │
│  2. Hash de senha (bcryptjs)         │
│  3. Criptografar telefone (AES-256)  │
│  4. Salvar no MongoDB                │
└──────────┬───────────────────────────┘
           │
           ▼
┌──────────────────────────────────────┐
│  Gerar JWT token + Refresh           │
│  - Valid por 7 dias                  │
│  - Refresh por 30 dias               │
└──────────┬───────────────────────────┘
           │
           ▼
┌──────────────────────────────────────┐
│  MOSTRAR MODAL DE TERMOS             │
│  (Frontend bloqueia até aceitar)     │
├──────────────────────────────────────┤
│  □ Termos de Uso                     │  → POST /api/auth/accept-terms
│  □ Política Privacidade              │  → POST /api/auth/accept-privacy-policy
│  □ Regras da Plataforma              │  → POST /api/auth/accept-platform-rules
│  □ Confirmar 18+ anos                │  → POST /api/auth/verify-age
│  □ Consentimento Marketing (opt)     │  → POST /api/auth/marketing-consent
└──────────┬───────────────────────────┘
           │
           ▼
┌── BACKEND ─────────────────────────┐
│ 1. Atualizar user.termsAccepted    │
│ 2. Registrar data/hora aceitar     │
│ 3. Rastrear IP + user agent        │
│ 4. Criar log de auditoria          │
│ 5. Enviar email de bem-vindo       │
└──────────┬───────────────────────┘
           │
           ▼
┌──────────────────────────────────────┐
│  Redirecionar para Dashboard         │
│  Usuário PRONTO PARA USAR!           │
└──────────────────────────────────────┘
```

---

## 🔐 Segurança em Camadas

```
┌─────────────────────────────────────────────────────┐
│ 1. FRONTEND (Browser)                               │
│    - HTTPS obrigatório                              │
│    - Validação de formulário                        │
│    - Proteção contra XSS                            │
│    - HttpOnly cookies para JWT                      │
└────────────┬────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────┐
│ 2. TRANSPORTE                                       │
│    - TLS 1.2+ obrigatório                           │
│    - HSTS headers                                   │
│    - Certificate pinning (produção)                 │
└────────────┬────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────┐
│ 3. AUTENTICAÇÃO (API Gateway)                       │
│    - JWT verificação                                │
│    - Rate limiting por IP                           │
│    - CORS validation                                │
│    - User-Agent verification                        │
└────────────┬────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────┐
│ 4. VALIDAÇÃO (Express Middleware)                   │
│    - Input sanitization                             │
│    - Schema validation (express-validator)          │
│    - NoSQL injection protection                     │
│    - XSS cleaning                                   │
│    - Parameter pollution prevention                 │
└────────────┬────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────┐
│ 5. AUTORIZAÇÃO (Route Protection)                   │
│    - JWT verification                               │
│    - Role-based access control (RBAC)               │
│    - User ownership verification                    │
│    - Admin checks                                   │
└────────────┬────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────┐
│ 6. SERVICE LAYER (Business Logic)                   │
│    - userService validations                        │
│    - raffleService validations                      │
│    - Password strength checks                       │
│    - PIX key validation                             │
└────────────┬────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────┐
│ 7. DATABASE LAYER                                   │
│    - Mongoose schema validation                     │
│    - Data encryption (AES-256-GCM)                  │
│    - Access control (IP whitelist)                  │
│    - Audit logging                                  │
└────────────┬────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────┐
│ 8. STORAGE (MongoDB Atlas)                          │
│    - Encrypted at rest                              │
│    - Backups automated                              │
│    - Replication enabled                            │
│    - Access logging                                 │
└─────────────────────────────────────────────────────┘
```

---

## 📱 Fluxo de API - Criar Rifa

```
CLIENTE (Frontend)
    │
    ├─ Preencher formulário
    │  - Título
    │  - Descrição
    │  - Prêmio
    │  - Números (10-10.000)
    │  - PIX ou Link pagamento
    │
    ▼
ENVIAR: POST /api/raffles
Headers:
  - Authorization: Bearer {JWT_TOKEN}
  - Content-Type: application/json
Body:
  {
    "title": "iPhone 15 Pro Max",
    "description": "...",
    "totalNumbers": 100,
    "pricePerNumber": 10.00,
    "paymentPlatform": "pix",
    "pixKey": "12345678900",
    "pixKeyType": "cpf"
  }
    │
    ▼
🛡️ BACKEND - VALIDAÇÕES
    │
    ├─ 1. Verify JWT token
    │     - Is valid?
    │     - Not expired?
    │
    ├─ 2. Rate limiting check
    │     - IP limit ok?
    │     - User limit ok?
    │
    ├─ 3. Input validation
    │     - Title: 3-100 chars
    │     - Description: 10-500 chars
    │     - Numbers: 10-10.000
    │     - Price: 0.01-999.999,99
    │
    ├─ 4. PIX validation (if PIX)
    │     - Format valid?
    │     - Type (CPF/CNPJ/email/phone)?
    │
    ├─ 5. User authorization
    │     - User is creator?
    │     - User has permission?
    │     - Account not locked?
    │
    ├─ 6. Business logic
    │     - raffleService.createRaffle()
    │     - Generate available tickets
    │     - Encrypt PIX key
    │
    └─ 7. Save to database
        - Insert raffle document
        - Insert 100 ticket documents
        - Log audit event
    │
    ▼
✅ SUCESSO
{
  "success": true,
  "message": "Rifa criada com sucesso!",
  "data": {
    "raffleId": "507f1f77bcf86cd799439011",
    "title": "iPhone 15 Pro Max",
    "totalNumbers": 100,
    "status": "active",
    "createdAt": "2024-05-04T20:30:00Z"
  }
}
    │
    ▼
CLIENTE - DASHBOARD
    Mostra: ✅ Rifa ao vivo!
           📊 0 números vendidos
           💰 R$ 0,00 arrecadado
           ⏱️  Tempo até sorteio
```

---

## 🔍 Estrutura de Logging

```
backend/logs/
│
├── 2024-05-04-security.log
│   ├── ACCOUNT_LOCKED
│   ├── SUSPICIOUS_LOGIN
│   ├── AUTHORIZATION_FAIL
│   └── DATA_ACCESS_SENSITIVE
│
├── 2024-05-04-auth.log
│   ├── LOGIN_SUCCESS (timestamp, user, IP)
│   ├── LOGIN_FAILED (timestamp, email, IP, reason)
│   ├── REGISTER (timestamp, email, IP)
│   └── PASSWORD_CHANGE (timestamp, user)
│
├── 2024-05-04-api.log
│   ├── GET /api/profile (status: 200)
│   ├── POST /api/raffles (status: 201)
│   ├── DELETE /api/account (status: 200)
│   └── ERROR /api/something (status: 500)
│
├── 2024-05-04-transaction.log
│   ├── PAYMENT_RECEIVED (ticket, value, method)
│   ├── REFUND_ISSUED (ticket, value, reason)
│   ├── PRIZE_DELIVERED (raffle, winner, date)
│   └── RAFFLE_COMPLETED (raffle, winner, value)
│
└── EXPORTS/
    ├── security-2024-05-04.json
    ├── audit-2024-04-04.json
    └── transactions-2024-04-04.json
```

---

## 🌐 Conexão com MongoDB Atlas

```
┌────────────────────────────────────┐
│  APLICAÇÃO                         │
│  (Node.js/Express)                 │
└─────────┬──────────────────────────┘
          │ mongoose driver
          │ mongodb+srv://user:pass@cluster
          ▼
┌────────────────────────────────────┐
│  INTERNET (TLS 1.2+)               │
│  ================================   │
│  Conexão criptografada             │
│  Verificação de certificado        │
└─────────┬──────────────────────────┘
          │
          ▼
┌────────────────────────────────────┐
│  MONGODB ATLAS (Nuvem)             │
├────────────────────────────────────┤
│                                    │
│  SERVIDOR:                         │
│  Region: sa-east-1 (São Paulo)     │
│  Tier: M0 (free ou pago)           │
│                                    │
│  SEGURANÇA:                        │
│  • IP Whitelist: [seu IP]          │
│  • Auth: user/pass                 │
│  • Criptografia: em repouso        │
│  • Backups: automáticos (6h)       │
│                                    │
│  DATABASE:                         │
│  • rifas_db (produção)             │
│    ├── users                       │
│    ├── raffles                     │
│    ├── tickets                     │
│    └── auditlogs                   │
│                                    │
└────────────────────────────────────┘
```

---

## 📊 Relatório de Segurança - Exemplo

```
┌──────────────────────────────────────────────────┐
│  SECURITY REPORT - Últimos 7 dias                │
├──────────────────────────────────────────────────┤
│                                                  │
│  AUTENTICAÇÃO                                    │
│  ├─ Total de tentativas: 5.432                  │
│  ├─ Logins bem-sucedidos: 4.800 (88%)           │
│  ├─ Logins falhados: 632 (12%)                  │
│  ├─ Account lockouts: 18                        │
│  └─ Novos usuários: 234                         │
│                                                  │
│  SEGURANÇA                                       │
│  ├─ Suspeitas detectadas: 3 (resolvidas)        │
│  ├─ Rate limit violations: 42                   │
│  ├─ SQL injection attempts: 0 (bloqueadas)      │
│  ├─ XSS attempts: 0 (bloqueadas)                │
│  └─ Acessos a dados sensíveis: 156              │
│                                                  │
│  CONFORMIDADE                                    │
│  ├─ LGPD compliance: 100%                       │
│  ├─ GDPR compliance: 100%                       │
│  ├─ Termos aceitos: 234/234 (novos)             │
│  └─ Privacy policy aceita: 234/234              │
│                                                  │
│  TRANSAÇÕES                                      │
│  ├─ Total de pagamentos: 1.234                  │
│  ├─ Valor total: R$ 12.340,00                   │
│  ├─ Taxa de sucesso: 99.2%                      │
│  └─ Reembolsos: 10 (refunds)                    │
│                                                  │
│  SISTEMA                                         │
│  ├─ Uptime: 99.8%                               │
│  ├─ Tempo médio resposta: 145ms                 │
│  ├─ Erro 5xx: 3 (resolvidos)                    │
│  └─ Backups: 28/28 (100%)                       │
│                                                  │
│  STATUS: ✅ TUDO OK                             │
│                                                  │
└──────────────────────────────────────────────────┘
```

---

## 🚀 Plano de Implementação

```
SEMANA 1 - SETUP
┌─────────────────────────────────┐
│ ✅ Dia 1: MongoDB Atlas OK      │
│ ✅ Dia 2: Backend rodando ok    │
│ ✅ Dia 3: Frontend integrado    │
│ ✅ Dia 4: Testes de fluxo       │
│ ✅ Dia 5: Correções             │
└─────────────────────────────────┘

SEMANA 2 - MELHORIAS
┌─────────────────────────────────┐
│ □ Email de bem-vindo            │
│ □ 2FA (opcional)                │
│ □ Recuperação de senha          │
│ □ Notificações de rifa          │
│ □ Dashboard melhorado           │
└─────────────────────────────────┘

SEMANA 3 - PRODUÇÃO
┌─────────────────────────────────┐
│ □ Certificado SSL               │
│ □ Domínio real                  │
│ □ Deploy em servidor            │
│ □ Configurar backup automático  │
│ □ Monitoramento 24/7            │
└─────────────────────────────────┘

SEMANA 4 - LANÇAMENTO
┌─────────────────────────────────┐
│ □ Testes finais                 │
│ □ Marketing inicial             │
│ □ Beta testers                  │
│ □ Lançamento oficial            │
│ □ Suporte ativo                 │
└─────────────────────────────────┘
```

---

**🎯 Arquitetura pronta para escalabilidade e segurança!**
