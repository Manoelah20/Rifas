# 📋 Política de Privacidade - RifaSorte

**Última atualização: 4 de maio de 2026**

## 1. Introdução

Esta Política de Privacidade explica como a **RifaSorte** ("nós", "nossa" ou "Plataforma") coleta, usa, divulga e protege seus dados pessoais em conformidade com:

- **LGPD** - Lei Geral de Proteção de Dados Pessoais (Brasil)
- **GDPR** - General Data Protection Regulation (UE)
- Lei n.º 12.965/2014 (Marco Civil da Internet)

---

## 2. Dados Coletados

### 2.1 Dados Obrigatórios (para usar a plataforma)
```
✓ Nome completo
✓ Email
✓ Senha (hash w/ bcryptjs)
✓ Telefone (criptografado AES-256)
✓ Data de criação da conta
```

### 2.2 Dados Opcionais (para rifas e pagamentos)
```
○ Chave PIX (criptografada AES-256-GCM)
○ Imagens do prêmio
○ Endereço completeto (apenas para sorteio)
○ Informações de pagamento (token, não salvo)
```

### 2.3 Dados Coletados Automaticamente
```
◆ Endereço IP
◆ Tipo de navegador
◆ Tipo de dispositivo
◆ Histórico de acesso
◆ Logs de atividade
◆ Cookies de sessão
```

---

## 3. Como Usamos Seus Dados

| Finalidade | Base Legal | Retenção |
|-----------|-----------|----------|
| Autenticação e acesso | Contrato | Enquanto usuário ativo |
| Processamento de pagamentos | Contrato | 6 meses + exigências legais |
| Segurança e prevenção de fraude | Interesse Legítimo | 1 ano |
| Comunicações (email) | Consentimento | Enquanto subscritor |
| Melhorias no serviço | Interesse Legítimo | Anonimizado |
| Conformidade legal | Obrigação Legal | Conforme exigência |
| Pesquisa de satisfação | Consentimento | 30 dias |

---

## 4. Compartilhamento de Dados

### 4.1 NÃO Compartilhamos Seus Dados Com

❌ Terceiros para marketing
❌ Agências de publicidade
❌ Redes sociais (sem sua permissão)
❌ Empresas de análise não autorizadas

### 4.2 Compartilhamos APENAS Com

✅ **Processadores de Pagamento**
- Mercado Pago, Stripe, PayPal
- Necessário para processar pagamentos
- Vinculados por contrato de proteção de dados

✅ **Hospedagem & Cloud**
- MongoDB Atlas
- AWS (se aplicável)
- Com criptografia SSL/TLS

✅ **Autoridades Legais**
- Apenas com ordem judicial
- Conforme exigência legal

---

## 5. Segurança dos Dados

### 5.1 Proteção em Trânsito
```
🔒 TLS 1.2+ (HTTPS)
🔒 Certificado SSL válido
🔒 Verificação de domínio
```

### 5.2 Proteção em Repouso
```
🔐 AES-256-GCM (dados sensíveis)
🔐 Senhas: bcryptjs + 12 saltos
🔐 Tokens JWT com HS256
🔐 Criptografia de banco de dados
```

### 5.3 Controle de Acesso
```
🛡️ Autenticação JWT
🛡️ Rate limiting (brute force protection)
🛡️ Account lockout (5 tentativas)
🛡️ IP whitelist (MongoDB)
🛡️ Auditoria de acesso
```

### 5.4 Monitoramento
```
📊 Logs de acesso
📊 Detecção de anomalias
📊 Alertas de segurança
📊 Backup automático (6h)
```

---

## 6. Seus Direitos (LGPD/GDPR)

### 6.1 Direito de Acesso
Você tem o direito de acessar todos os seus dados pessoais a qualquer momento.

**Como solicitar:**
```
POST /api/users/export-data
```
Resposta: JSON com todos seus dados em 48 horas

### 6.2 Direito de Retificação
Você pode corrigir dados imprecisos ou incompletos.

**Como: **
```
PUT /api/users/profile
```

### 6.3 Direito de Erasure ("Direito ao Esquecimento")
Você pode solicitar a exclusão permanente de seus dados.

**Como:**
```
DELETE /api/users/account
```
⚠️ Dados de transações podem ser retidos por lei (6 anos)

### 6.4 Direito de Portabilidade
Você pode obter seus dados em formato estruturado.

**Como:**
```
GET /api/users/export-data
```

### 6.5 Direito de Oposição
Você pode se opor a certos processamentos.

**Envie email para:** privacidade@rifasorte.com

### 6.6 Direito de Restrição
Você pode solicitar que limitemos o processamento.

**Envie email para:** privacidade@rifasorte.com

---

## 7. Retenção de Dados

| Tipo de Dado | Período | Motivo |
|-------------|---------|--------|
| Perfil de usuário | Enquanto ativo | Manutenção da conta |
| Senhas hasheadas | Enquanto ativo | Autenticação |
| Chaves PIX | Enquanto rifa ativa | Funcionalidade |
| Transações | 6 anos | Conformidade fiscal |
| Logs de acesso | 90 dias | Segurança |
| Logs de auditoria | 2 anos | Conformidade |
| Dados após exclusão | 30 dias | Recuperação |

---

## 8. Cookies e Rastreamento

### 8.1 Cookies Essenciais
```
sessionid     - Manter você logado
token_jwt     - Autenticação
csrf_token    - Proteção contra CSRF
```
**Sempre ativados** - Necessários para funcionamento

### 8.2 Cookies de Análise
```
analytics_id  - Google Analytics
performance   - Medição de performance
```
**Requer** - Seu consentimento explícito

### 8.3 Como Desativar
- Chrome: Configurações → Privacidade → Cookies
- Firefox: Preferências → Privacidade → Cookies
- Safari: Preferências → Privacidade → Gerenciar dados do site

---

## 9. Dados de Terceiros

### 9.1 Informações Compartilhadas por Outros
Se outro usuário compartilha seus dados (ex: email em rifa), nós:
- Não usamos para marketing
- Não compartilhamos com terceiros
- Apagamos quando rifa é concluída
- Oferecemos opt-out

---

## 10. Conformidade LGPD

### 10.1 Princípios LGPD Implementados
✅ Transparência
✅ Finalidade declarada
✅ Adequação
✅ Necessidade
✅ Livre acesso
✅ Qualidade dos dados
✅ Segurança
✅ Prevenção

### 10.2 Encarregado de Dados (DPO)
```
Nome: [Seu nome/responsável]
Email: dpo@rifasorte.com
Telefone: +55 (11) 98765-4321
```

---

## 11. Transferências Internacionais

Se seus dados são transferidos para fora do Brasil:

✅ **Segurança equivalente** - Aplicamos proteções iguais
✅ **Contrato de proteção** - Todas as transferências possuem
✅ **Aviso** - Notificamos se há mudanças

---

## 12. Direitos da Criança

👶 **Menores de 18 anos:**
- Precisam de consentimento dos pais/responsáveis
- NÃO processamos dados de menores de 13 anos
- Links para denunciar abuso

---

## 13. Alterações nesta Política

Podemos atualizar esta política. Você será notificado por:
- Email (para mudanças significativas)
- Aviso na plataforma (30 dias de antecedência)
- Seu consentimento será solicitado se necessário

---

## 14. Entre em Contato

### 14.1 Dúvidas Sobre Privacidade
```
Email: privacidade@rifasorte.com
Telefone: +55 (11) 98765-4321
Endereço: [Seu endereço]
```

### 14.2 Reclamações
Se não estiver satisfeito, você pode reclamar à:

**AUTORIDADE NACIONAL DE PROTEÇÃO DE DADOS (ANPD)**
```
Email: ouvidoria@anpd.gov.br
Portal: www.gov.br/cidadania/pt-br/acesso-a-informacao/anpd
Telefone: (61) 3879-8400
```

### 14.3 GDPR Supervisory Authority (para UE)
```
Lista: https://edpb.ec.europa.eu/about-edpb/board/members_en
```

---

## 15. Compromissos de Segurança

### 15.1 Certificações Target
- [ ] ISO/IEC 27001 (Segurança da Informação)
- [ ] ISO/IEC 27701 (Privacy Management)
- [ ] SOC 2 Type II (em processo)

### 15.2 Auditorias
- ✅ Auditoria anual de segurança
- ✅ Penetration testing (semestral)
- ✅ Verificação de conformidade LGPD (anual)

---

## 16. Glossário

| Termo | Significado |
|------|---------|
| **Dados Pessoais** | Qualquer informação que identifica você |
| **Processamento** | Qualquer operação com seus dados |
| **Controlador** | RifaSorte (quem decide o que fazer com dados) |
| **Processador** | MongoDB Atlas, Stripe (que processa para nós) |
| **Consentimento** | Sua permissão clara e informada |
| **Interesse Legítimo** | Nosso interesse que não prejudica seus direitos |

---

**✅ Você tem direitos. Nós respeitamos sua privacidade.**

*Última versão: 4 de maio de 2026*
*Próxima revisão: 4 de maio de 2027*
