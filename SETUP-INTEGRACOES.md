# 🔌 Setup das Integrações — Receber leads de forma organizada

> Este guia mostra **4 opções gratuitas** pra você receber os dados dos leads que fazem o diagnóstico. Pode usar uma OU várias ao mesmo tempo (recomendado: Google Sheets + Formspree).

## 📋 O que você vai receber por lead

```
{
  stage: "intro" ou "completed",
  timestamp: "2026-05-15T22:30:00Z",
  area: "Médico esteta",
  lead: { name, whats, email },
  answers: { fat, site, "pre-vendido", "tempo-explicar", preco, incomoda, prazo },
  score: 42,
  tier: "Posicionamento Básico",
  pageUrl: "...",
  userAgent: "..."
}
```

**Importante:** o sistema envia 2 momentos:
- **`intro`** — quando preencheu o mini-form antes do quiz (mesmo que abandone)
- **`completed`** — quando terminou o quiz inteiro com score

---

## 🥇 OPÇÃO 1 (recomendada): Google Sheets + Apps Script

**Por que:** ilimitado, grátis, dados na sua planilha que você acessa do celular, totalmente customizável.

### Passo a passo (10 minutos)

#### 1. Criar a planilha

1. Acessa https://sheets.google.com e cria nova planilha
2. Nome: "CGR · Diagnósticos Fabrício"
3. Na **linha 1**, cola estes cabeçalhos:

```
Timestamp	Stage	Área	Nome	WhatsApp	Email	Score	Tier	Faturamento	Site Atual	Pré-vendidos	Tempo Explicar	Preço	Incomoda	Prazo	Page URL	User Agent
```

(Use **Tab** entre cada um pra cada virar uma coluna)

#### 2. Criar o Apps Script

1. Na planilha: **Extensões → Apps Script**
2. Apaga o código padrão e cola este:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    const lead = data.lead || {};
    const ans  = data.answers || {};

    sheet.appendRow([
      data.timestampLocal || new Date().toISOString(),
      data.stage || '',
      data.area || '',
      lead.name || '',
      lead.whats || '',
      lead.email || '',
      data.score || '',
      data.tier || '',
      ans.fat || '',
      ans.site || '',
      ans['pre-vendido'] || '',
      ans['tempo-explicar'] || '',
      ans.preco || '',
      ans.incomoda || '',
      ans.prazo || '',
      data.pageUrl || '',
      data.userAgent || ''
    ]);

    // OPCIONAL: notificar você por email quando alguém termina o quiz
    if (data.stage === 'completed') {
      const subject = `🎯 Novo diagnóstico: ${data.area} (${data.score}/100)`;
      const body = `
Novo lead completou o diagnóstico:

Nome: ${lead.name || '(não informado)'}
WhatsApp: ${lead.whats || '(não informado)'}
Email: ${lead.email || '(não informado)'}

Área: ${data.area}
Score: ${data.score}/100
Tier: ${data.tier}

Respostas:
- Faturamento: ${ans.fat}
- Site atual: ${ans.site}
- Pré-vendidos: ${ans['pre-vendido']}
- Tempo explicar valor: ${ans['tempo-explicar']}
- Sente que cobra: ${ans.preco}
- Maior incômodo: ${ans.incomoda}
- Prazo: ${ans.prazo}

Ver na planilha: ${SpreadsheetApp.getActiveSpreadsheet().getUrl()}
      `;
      MailApp.sendEmail(Session.getActiveUser().getEmail(), subject, body);
    }

    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Clica **💾 Salvar** (ícone de disquete)

#### 3. Publicar como Web App

1. Em cima, clica em **Implantar → Nova implantação**
2. Tipo: **Aplicativo da Web**
3. Configurações:
   - **Executar como:** "Eu" (você)
   - **Quem tem acesso:** "Qualquer pessoa" (mesmo sem conta Google — sites estáticos precisam disso)
4. Clica **Implantar**
5. Aprova as permissões (vai pedir acesso à planilha + email)
6. **Copia a URL** que aparece (formato: `https://script.google.com/macros/s/AKfyc.../exec`)

#### 4. Colar no site

1. Abre `audit/app.js`
2. Procura a linha:
   ```js
   googleSheets: '',
   ```
3. Cola sua URL:
   ```js
   googleSheets: 'https://script.google.com/macros/s/AKfyc.../exec',
   ```
4. `git add . && git commit -m "config: google sheets backend" && git push`

#### 5. Pronto 🎉

Agora cada vez que alguém preencher o quiz:
- Aparece linha nova na planilha
- Você recebe email no Gmail (se ativou) com resumo

---

## 🥈 OPÇÃO 2: Formspree (free 50 envios/mês)

**Por que:** super simples, recebe email automaticamente formatado.

### Setup (3 minutos)

1. Cria conta em https://formspree.io (free)
2. **+ New Form**
3. Nome: "CGR Diagnostics"
4. Email pra receber: seu@email.com
5. Copia o endpoint: `https://formspree.io/f/SEU_ID`
6. Em `audit/app.js`:
   ```js
   formspree: 'https://formspree.io/f/SEU_ID',
   ```
7. Push

**Limite:** 50 envios/mês free. Depois bloqueia até virar do mês ou pagar ($10/mês).

---

## 🥉 OPÇÃO 3: Web3Forms (free 250 envios/mês)

**Por que:** tier free maior que Formspree, mais simples ainda.

### Setup (2 minutos)

1. Acessa https://web3forms.com
2. Insere seu email → recebe a **Access Key**
3. Em `audit/app.js`:
   ```js
   web3formsKey: 'SUA_ACCESS_KEY',
   ```
4. Push

**Limite:** 250 envios/mês free. Praticamente ilimitado pra portfolio.

---

## 🛠️ OPÇÃO 4: Webhook customizado (Zapier, Make, n8n)

**Por que:** se você tem n8n self-hosted ou conta Zapier/Make, integra com qualquer coisa (Notion, Airtable, Slack, Discord, Telegram, CRM).

### Setup (varia)

1. No serviço, cria um **webhook trigger**
2. Copia a URL do webhook
3. Em `audit/app.js`:
   ```js
   webhook: 'https://hooks.zapier.com/hooks/catch/.../',
   ```
4. Push

---

## 💪 Recomendação combinada

Pra ter o melhor dos mundos, ative **2 backends**:

```js
const BACKENDS = {
  // Storage estruturado: histórico completo na planilha
  googleSheets: 'https://script.google.com/macros/s/AKfyc.../exec',

  // Notificação rápida: email instantâneo
  formspree: 'https://formspree.io/f/SEU_ID',

  web3formsKey: '',
  webhook: ''
};
```

Resultado:
- Cada lead vai pra **planilha** (histórico completo)
- E pro **seu email** instantaneamente (notificação)
- Se um falha, o outro garante

---

## 🐛 Como testar

Depois de configurar:

1. Abre `https://fabytanaia-max.github.io/fabricio-tanaia-site/audit/?area=medico` em modo anônimo (Ctrl+Shift+N)
2. Preenche o mini-form com nome+whats fictícios → "Começar diagnóstico"
3. Responde as 7 perguntas
4. Vê resultado
5. Confirma:
   - Planilha tem 2 linhas novas (uma "intro", outra "completed")
   - Email chegou (se Formspree configurado)

## 🆘 Se algo der errado

- **Apps Script não envia:** verifica que publicou como "Aplicativo da Web", "Quem tem acesso = Qualquer pessoa"
- **Formspree não chega:** primeiro envio pode pedir confirmação no email cadastrado
- **CORS error no console:** Apps Script usa `mode: 'no-cors'` no fetch — não dá erro mas você não vê resposta. É normal, dados chegam mesmo assim.
- **Apps Script chega mas linha vazia:** verifica os nomes dos campos nas variáveis (case-sensitive)

## 🔒 Privacidade

- Os dados ficam **só nos serviços que você configurar** (Google, Formspree, Web3Forms, etc.)
- Lead vê o resultado dele localmente, mesmo se backend falhar
- localStorage do browser guarda o lead pra não pedir 2x
- **Recomendação:** adiciona uma linha pequena no rodapé do audit page mencionando que dados vão pra Google Sheets/etc, em conformidade com LGPD.
