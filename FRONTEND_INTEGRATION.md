# 🎯 Guia de Integração - Termos e Políticas no Frontend

## 1. Estrutura de Componentes

### 1.1 Componentes Necessários

```
src/components/
├── Legal/
│   ├── TermsModal.jsx         # Modal de aceitar termos
│   ├── PrivacyModal.jsx       # Modal de política
│   ├── RulesModal.jsx         # Modal de regras
│   ├── AgeVerification.jsx    # Verificação de 18+
│   ├── MarketingConsent.jsx   # Consentimento marketing
│   └── TermsCheckbox.jsx      # Checkbox de aceitar
└── pages/
    ├── TermsOfUse.jsx         # Página completa
    ├── PrivacyPolicy.jsx      # Página completa
    └── PlatformRules.jsx      # Página completa
```

---

## 2. Fluxo de Aceitar Termos

### 2.1 Na Autenticação

```
┌─────────────────────┐
│  Usuário Registra   │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────────────┐
│  Mostrar Termos e Políticas │
│  (Modal com scroll)         │
└──────────┬──────────────────┘
           │
           ▼
┌──────────────────────────────┐
│  Pedir Consentimento:        │
│  □ Termos de Uso             │
│  □ Política de Privacidade   │
│  □ Regras da Plataforma      │
│  □ Confirmar 18+ anos        │
│  □ Consentimento Marketing   │
└──────────┬───────────────────┘
           │
           ▼
┌──────────────────────┐
│  POST /api/auth/     │
│  accept-all-terms    │
└──────────┬───────────┘
           │
           ▼
┌─────────────────────┐
│  Dashboard (logado) │
└─────────────────────┘
```

### 2.2 Na Primeira Utilização

Se usuário antigo não aceitou:
```
┌──────────────────────────────┐
│  Mostrar Banner no Topo      │
│  "Aceite termos para usar"   │
│  [Ver Termos] [Aceitar]      │
└──────────────────────────────┘
```

---

## 3. Componentes Exemplo

### 3.1 TermsModal.jsx

```jsx
import React, { useState } from 'react';
import { api } from '../services/api';

export function TermsModal({ onAccept, onCancel }) {
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState({
    terms: false,
    privacy: false,
    rules: false,
    age: false
  });

  const handleAcceptAll = async () => {
    if (!Object.values(agreed).every(v => v)) {
      alert('Você deve aceitar todos os termos');
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('/auth/accept-all-terms', {
        marketingConsent: false
      });

      if (response.data.success) {
        onAccept();
      }
    } catch (error) {
      console.error('Erro ao aceitar termos:', error);
      alert('Erro ao aceitar termos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Bem-vido à RifaSorte!</h2>

        <div className="terms-content">
          {/* Termos de Uso */}
          <section className="terms-section">
            <h3>📋 Termos de Uso</h3>
            <div className="terms-text">
              <p>Leia nossos termos completos para usar a plataforma...</p>
              <a href="/terms-of-use" target="_blank">
                Ver termos completos
              </a>
            </div>
            <label>
              <input
                type="checkbox"
                checked={agreed.terms}
                onChange={(e) =>
                  setAgreed({ ...agreed, terms: e.target.checked })
                }
              />
              Aceito os Termos de Uso
            </label>
          </section>

          {/* Política de Privacidade */}
          <section className="terms-section">
            <h3>🔒 Política de Privacidade</h3>
            <p>Suas informações são protegidas conforme LGPD...</p>
            <a href="/privacy-policy" target="_blank">
              Ver política completa
            </a>
            <label>
              <input
                type="checkbox"
                checked={agreed.privacy}
                onChange={(e) =>
                  setAgreed({ ...agreed, privacy: e.target.checked })
                }
              />
              Aceito a Política de Privacidade
            </label>
          </section>

          {/* Regras da Plataforma */}
          <section className="terms-section">
            <h3>📜 Regras da Plataforma</h3>
            <p>Conheça as regras sobre rifas permitidas...</p>
            <a href="/platform-rules" target="_blank">
              Ver regras completas
            </a>
            <label>
              <input
                type="checkbox"
                checked={agreed.rules}
                onChange={(e) =>
                  setAgreed({ ...agreed, rules: e.target.checked })
                }
              />
              Aceito as Regras da Plataforma
            </label>
          </section>

          {/* Verificação de Idade */}
          <section className="terms-section">
            <h3>✅ Verificação de Idade</h3>
            <label>
              <input
                type="checkbox"
                checked={agreed.age}
                onChange={(e) =>
                  setAgreed({ ...agreed, age: e.target.checked })
                }
              />
              Confirmo que tenho 18 anos ou mais
            </label>
          </section>
        </div>

        <div className="modal-footer">
          <button onClick={onCancel} disabled={loading} className="btn-secondary">
            Recusar
          </button>
          <button
            onClick={handleAcceptAll}
            disabled={loading || !Object.values(agreed).every(v => v)}
            className="btn-primary"
          >
            {loading ? 'Processando...' : 'Aceitar Tudo'}
          </button>
        </div>
      </div>
    </div>
  );
}
```

---

## 4. Integração no Register.jsx

```jsx
import { TermsModal } from '../components/Legal/TermsModal';

export function Register() {
  const [showTerms, setShowTerms] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  // ... outras logics ...

  const handleRegister = async () => {
    if (!termsAccepted) {
      setShowTerms(true);
      return;
    }

    // Continuar com registro...
  };

  return (
    <div>
      {showTerms && (
        <TermsModal
          onAccept={() => {
            setShowTerms(false);
            setTermsAccepted(true);
            handleRegister();
          }}
          onCancel={() => setShowTerms(false)}
        />
      )}

      {/* Formulário de registro */}
      {/* ... */}
    </div>
  );
}
```

---

## 5. Páginas de Termos Completos

### 5.1 TermsOfUse.jsx

```jsx
import React, { useState, useEffect } from 'react';
import { MarkdownView } from '../components/MarkdownView';
import termsContent from '../../TERMS_OF_USE.md';

export function TermsOfUse() {
  return (
    <div className="legal-page">
      <div className="legal-header">
        <h1>⚖️ Termos de Uso</h1>
        <p>Leia atentamente antes de usar nossa plataforma</p>
      </div>

      <div className="legal-content">
        <MarkdownView content={termsContent} />
      </div>

      <div className="legal-footer">
        <p>Versão 1.0 - Última atualização: 4 de maio de 2026</p>
        <a href="/auth/register">Voltar ao Registro</a>
      </div>
    </div>
  );
}
```

### 5.2 PrivacyPolicy.jsx

Similar a TermsOfUse, mas com conteúdo de privacidade

### 5.3 PlatformRules.jsx

Similar a TermsOfUse, mas com regras da plataforma

---

## 6. Rotas no React Router

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// ... outros imports ...

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Públicas (sem login) */}
        <Route path="/terms-of-use" element={<TermsOfUse />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/platform-rules" element={<PlatformRules />} />

        {/* Autenticadas */}
        <Route path="/dashboard" element={<Dashboard />} />
        {/* ... */}
      </Routes>
    </BrowserRouter>
  );
}
```

---

## 7. API Calls

### 7.1 Aceitar Termos Individuais

```javascript
// Aceitar Termos de Uso
await api.post('/auth/accept-terms');

// Aceitar Política de Privacidade
await api.post('/auth/accept-privacy-policy');

// Aceitar Regras da Plataforma
await api.post('/auth/accept-platform-rules');

// Verificar Idade
await api.post('/auth/verify-age', { confirmed: true });

// Consentimento de Marketing
await api.post('/auth/marketing-consent', { agreed: false });
```

### 7.2 Aceitar Tudo de Uma Vez

```javascript
const response = await api.post('/auth/accept-all-terms', {
  marketingConsent: false
});

// Response:
// {
//   success: true,
//   message: 'Todos os termos e políticas foram aceitos',
//   data: {
//     allAccepted: true,
//     acceptedAt: '2024-05-04T...'
//   }
// }
```

### 7.3 Ver Status de Aceitar

```javascript
const response = await api.get('/auth/acceptance-status');

// Response:
// {
//   success: true,
//   data: {
//     termsAccepted: true,
//     termsAcceptedAt: '2024-05-04T...',
//     privacyPolicyAccepted: true,
//     ageVerified: true,
//     allRequired: {
//       completed: true,
//       required: ['termsAccepted', 'privacyPolicyAccepted', 'ageVerified']
//     }
//   }
// }
```

---

## 8. CSS Sugerido

```css
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 8px;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  padding: 30px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}

.terms-section {
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.terms-section h3 {
  margin-bottom: 10px;
  color: #333;
}

.terms-section label {
  display: flex;
  align-items: center;
  margin-top: 10px;
  cursor: pointer;
}

.terms-section input[type="checkbox"] {
  margin-right: 10px;
  cursor: pointer;
}

.legal-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px;
}

.legal-header {
  text-align: center;
  margin-bottom: 40px;
}

.legal-content {
  background: white;
  padding: 30px;
  border-radius: 8px;
  line-height: 1.6;
}

.legal-footer {
  text-align: center;
  margin-top: 30px;
  color: #666;
}
```

---

## 9. Verificação de Aceitar em Checkouts

```jsx
// Em PaymentSystem.jsx ou similares

export function PaymentPage() {
  const [acceptanceStatus, setAcceptanceStatus] = useState(null);

  useEffect(() => {
    checkAcceptanceStatus();
  }, []);

  const checkAcceptanceStatus = async () => {
    try {
      const response = await api.get('/auth/acceptance-status');
      setAcceptanceStatus(response.data.data);
    } catch (error) {
      console.error('Erro ao verificar aceitar:', error);
    }
  };

  if (!acceptanceStatus?.allRequired?.completed) {
    return (
      <div className="alert-banner">
        <p>⚠️ Você precisa aceitar os termos antes de prosseguir</p>
        <a href="/terms-of-use">Ver Termos</a>
        <button onClick={() => /* mostrar new modal terms */}>
          Aceitar Agora
        </button>
      </div>
    );
  }

  // Continuar com pagamento...
  return <PaymentForm />;
}
```

---

## 10. Atualizações de Termos

Quando atualizar termos:

1. **Versionamento:**
   ```javascript
   // Em termsMiddleware.js
   const TERMS_VERSION = '1.1';
   ```

2. **Pedir novo aceitar:**
   ```javascript
   if (user.termsVersion < TERMS_VERSION) {
     // Mostrar modal de nova aceitar
   }
   ```

3. **Migração de usuários:**
   ```bash
   # Script para carregar usuários com termos antigos
   db.users.updateMany(
     { termsVersion: { $lt: 1.1 } },
     { $set: { termsAccepted: false } }
   );
   ```

---

## 11. Conformidade LGPD/GDPR

Checklist para cada aceitar:

- ✅ Consentimento voluntário e informado
- ✅ Rastreamento de quando foi aceito
- ✅ IP do usuário registrado
- ✅ Versão do documento aceito
- ✅ Possibilidade de revogar consentimento
- ✅ Logs auditáveis
- ✅ Permitir export de dados

---

## 12 Estrutura do Banco de Dados

No `User` model, adicione:

```javascript
// Aceitações
termsAccepted: Boolean
termsAcceptedAt: Date
privacyPolicyAccepted: Boolean
privacyPolicyAcceptedAt: Date
platformRulesAccepted: Boolean
platformRulesAcceptedAt: Date

// Verificações
ageVerified: Boolean
ageVerifiedAt: Date
emailVerified: Boolean

// Marketing
marketingConsent: Boolean
marketingConsentAt: Date

// Versões (para futuras atualizações)
termsVersion: String (default: '1.0')
privacyPolicyVersion: String (default: '1.0')
platformRulesVersion: String (default: '1.0')
```

---

## 13. Testes

```
✅ Usuário novo vê modal de termos
✅ Não pode usar app sem aceitar
✅ Pode recusar e deletar conta
✅ Pode ler completo antes de aceitar
✅ Aceitar um por um funciona
✅ Aceitar tudo de uma vez funciona
✅ Status é exibido corretamente
✅ Logs de auditoria são criados
✅ Consentimento de marketing é opcional
```

---

**🎯 Implementação completa de termos legais!**
