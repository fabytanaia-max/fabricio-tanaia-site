# 🚦 CONTINUAR AQUI · Site Fabrício Tanaia

> **Para qualquer IA/agente retomando este projeto:** este é o ponto de entrada único. Leia primeiro.
>
> **Para o Fábio:** seu mapa pra retomar quando quiser.

---

## ⚡ Status em 30 segundos

**O que é:** Site portfólio do Fabrício Tanaia — designer de sites premium pra especialistas. Posicionado como serviço de "ativos de autoridade digital".

**Onde está:** No ar em **https://fabytanaia-max.github.io/fabricio-tanaia-site/**

**Stack:** HTML + CSS + JS vanilla, zero build, deploy automático via GitHub Pages.

**Estado:** Site **completo e funcional**. Funil de vendas com quiz personalizado por nicho integrado a backend de captura de leads (Web3Forms).

---

## 📁 Caminhos

```
PROJETO (código):
C:\Users\fabyt\aios\aios-core\deploy\fabricio-tanaia-site\

GITHUB:
https://github.com/fabytanaia-max/fabricio-tanaia-site

DEPLOY (produção):
https://fabytanaia-max.github.io/fabricio-tanaia-site/

DASHBOARD WEB3FORMS (leads):
Acessa via email — Web3Forms manda no email cadastrado
```

## 🔑 Configurações ativas

```
Web3Forms Access Key:
ca8c9dfd-0c28-4da2-8f68-9fa61ec0a004

WhatsApp do Fabrício:
+238 955 4721 (no formato wa.me/2389554721)

Limites Web3Forms:
250 envios/mês free (suficiente)
```

⚠️ **Web3Forms Access Key NÃO é segredo crítico** — é chave pública client-side. Se vazar, alguém pode mandar emails pra ti, mas não acessa dados anteriores. Pode rotacionar a qualquer hora em web3forms.com.

---

## ✅ O que foi feito (sessão 2026-05-15)

### 1. Refresh editorial premium completo
- **Paleta:** dark warm (preto-marrom #0E0A07) + ivory (#F2EBDC) + bronze/champagne (#C9956F)
- **Tipografia:** Fraunces (serif moderna) + Manrope (sans) + JetBrains Mono
- **Visual identity:**
  - Hero cinematográfico com kinetic type
  - Portrait com ring conic gradient girando
  - Aurora animada (3 luzes flutuantes)
  - Grain de filme
  - Custom cursor (dot + ring com easing)
  - Scroll progress bar
  - Top bar pílula com hide-on-scroll

### 2. Aplicação dos 8 frameworks "billion-dollar" (Hormozi/Godin/Cardone/Belfort/Brunson/Kennedy/Vee/Robbins)
- **Hero tagline** Kennedy-style: "Sites premium em 21 dias úteis. Você cobra mais ou eu refaço até sentir orgulho de mostrar."
- **Storytelling 5 elementos Godin** (seção "Sua história · agora")
  - Status quo → External → Internal → Philosophical → Change
- **SVM específico** com 8 nichos (era genérico "negócios locais")
- **Oferta Hormozi Grand Slam:**
  - Núcleo: Site Premium Sob Medida (7 itens)
  - 3 Bônus: Briefing Posicionamento (R$2k) + Pacote WhatsApp Pré-vendido (R$800) + Suporte 60d (R$1.5k)
  - Garantia condicional: "14 dias do go-live, refaço sem custo"
  - Time delay: 21 dias úteis
  - Esforço: 2 reuniões totais
- **Depoimentos** como cenários ilustrativos (Carolina M., Rafael T., Ana P.) com marcador "Cenário ilustrativo"
- **CTAs variadas** (3 tipos diferentes ao longo da página)

### 3. Quiz Funnel inteligente (substituiu form simples)
- **Home:** seletor de 8 cards (1 por nicho)
- **Página dedicada `/audit/?area=NICHO`** com quiz personalizado
- **7 perguntas** adaptadas por área:
  1. Faturamento mensal
  2. Como está sua presença digital
  3. % de leads pré-vendidos
  4. Tempo gasto explicando valor
  5. Sentimento sobre preço cobrado
  6. O que mais te incomoda
  7. Prazo de necessidade
- **Score 0-100 com 4 tiers:**
  - <25: Posicionamento Crítico
  - 25-50: Posicionamento Básico
  - 50-75: Posicionamento Consistente
  - 75-100: Posicionamento Premium
- **Diagnóstico personalizado** com:
  - Frase de urgência específica do tier + área
  - 3 pontos críticos (extraídos das respostas)
  - 3 ações específicas POR NICHO (8 nichos × 3 ações = 24 ações curadas)
- **CTA WhatsApp pré-vendido** com mensagem auto-construída incluindo nome, área, score, tier, faturamento, prazo

### 4. Lead capture híbrida (mini-form + post-quiz)
- **Mini-form ANTES** do quiz: Nome (obrigatório) + WhatsApp (opcional) + Email (opcional)
- **Botão "Pular · responder anônimo"** — não força
- **localStorage** lembra dados (não pede 2x)
- **3 estágios** capturados:
  - `intro` (preencheu mini-form)
  - `completed` (terminou quiz)
  - `email-followup` (deu email após resultado)

### 5. Backend Web3Forms integrado
- Sistema **multi-backend** (suporta Google Sheets + Formspree + Web3Forms + Webhook)
- Atualmente ativo: **Web3Forms** (key `ca8c9dfd-...`)
- Email formatado legível enviado a cada lead
- Doc completa em `SETUP-INTEGRACOES.md` com 4 opções

### 6. Estrutura de arquivos final

```
fabricio-tanaia-site/
├── index.html              ~500 linhas — landing page principal
├── styles.css              ~2500 linhas — design system completo
├── app.js                  ~145 linhas — interactions (cursor, scroll, reveal, etc.)
├── audit/
│   ├── index.html          Página dedicada do diagnóstico
│   └── app.js              Quiz funnel + backend dispatcher
├── assets/
│   ├── perfil-fabricio.webp
│   ├── exemplo-dom-winner.mp4
│   ├── exemplo-samsung.mp4
│   ├── exemplo-studio.mp4
│   ├── favicon-16/32/512.png
│   └── apple-touch-icon.png
├── favicon.ico
├── README.md
└── SETUP-INTEGRACOES.md    Guia de 4 backends gratuitos
```

---

## 🎯 Como funciona o funil (fluxo completo)

```
1. Lead chega na home (https://fabytanaia-max.github.io/fabricio-tanaia-site/)
   └─ Vê hero cinematográfico, marquee, manifesto, frase âncora, processo, trabalhos, oferta, depoimentos

2. Role até "Diagnóstico personalizado"
   └─ Vê 8 cards de nichos

3. Clica no nicho → vai pra /audit/?area=medico (por exemplo)

4. Mini-form aparece:
   - Nome (obrigatório)
   - WhatsApp (opcional)
   - Email (opcional)
   - Botão "Começar diagnóstico" OU "Pular · anônimo"

5. Se preencheu → ENVIA "intro" payload pro Web3Forms
   └─ Você recebe email: "📋 Lead capturado: Médico esteta (preencheu mini-form)"

6. Quiz começa (7 perguntas, uma por vez, com botões grandes)

7. Score calculado, tier definido, resultado mostrado:
   - Score visual 0-100 + barra colorida
   - Frase de urgência personalizada
   - 3 pontos que mais pesam
   - 3 ações específicas pra área
   - Email-followup opcional
   - CTA WhatsApp com mensagem pré-construída

8. ENVIA "completed" payload pro Web3Forms
   └─ Você recebe email: "🎯 Diagnóstico completo: Médico esteta (45/100 · Posicionamento Básico)"
   └─ Email tem todos os dados: respostas + score + lead info

9. Lead clica "Conversar no WhatsApp"
   └─ Abre WhatsApp já com mensagem pré-vendida:
      "Olá Fabrício! Acabei de fazer o diagnóstico no seu site.
       Nome: ...
       Área: Médico esteta
       Score: 45/100 (Posicionamento Básico)
       Faturamento: R$ 30k – R$ 100k/mês
       Prazo: Próximas 4 semanas
       Quero conversar sobre meu posicionamento."
```

---

## ⏳ O que ficou pendente / pra futuro

### Curto prazo (Fabrício pode fazer sozinho)
- [ ] **Trocar depoimentos ilustrativos por reais** quando tiver clientes
  - Editar `index.html` na seção `<section id="depoimentos">`
  - Remover atributo `<span>Cenário ilustrativo · ...</span>`
- [ ] **Confirmar/ajustar valores** dos bônus (R$2k + R$800 + R$1.5k)
- [ ] **Confirmar/ajustar prazo** (21 dias úteis) e garantia (14 dias)

### Médio prazo (precisa decisão)
- [ ] **Adicionar logos de clientes** (precisa material)
- [ ] **Adicionar métricas reais** dos cases (Dom Winner, Samsung, Studio Bella)
- [ ] **Considerar adicionar Google Sheets** como backend redundante (Web3Forms só tem 250/mês free)
- [ ] **Página individual por case** com antes/depois detalhado

### Longo prazo (estratégia)
- [ ] **Newsletter** (capturar leads que não estão prontos)
- [ ] **Blog/artigos** alimentando autoridade no LinkedIn
- [ ] **Email automation** após captura (sequência de nutrição)
- [ ] **Domínio próprio** (custar ~R$50/ano `.com.br`)
- [ ] **Considerar mover de GitHub Pages pra Cloudflare Pages** (Vercel não pode comercial no plano free; Cloudflare permite)

### Dúvidas estratégicas em aberto
- Manter texto "Cabo Verde" no portrait? (pode ser asset OU passivo dependendo do mercado-alvo)
- Adicionar versão em inglês? (mercado europeu/EUA paga mais)
- Criar "Diagnóstico Premium" pago como upsell? (R$200-500 com hora de consultoria)

---

## 🛠️ Comandos úteis

```powershell
# Ir pro projeto
cd C:\Users\fabyt\aios\aios-core\deploy\fabricio-tanaia-site

# Servidor local (Python)
python -m http.server 8000
# Abre: http://localhost:8000

# Validar JS
node -c app.js
node -c audit/app.js

# Deploy (auto via GitHub Pages quando push pra main)
git add .
git commit -m "descrição"
git push

# Ver deploys recentes
gh run list --limit 5
```

---

## 📚 Pra IA: ordem de leitura sugerida

Se você acabou de chegar:

1. **Este arquivo** ← você está aqui
2. **`SETUP-INTEGRACOES.md`** — entenda o sistema de backends
3. **`README.md`** — overview rápido
4. **`index.html`** — estrutura visual da home
5. **`audit/index.html`** + **`audit/app.js`** — quiz funnel
6. **`styles.css`** — design system completo

Princípios pra manter:
- **Nunca quebre** o "data-cursor" attribute (custom cursor depende dele)
- **Mantenha** o sistema multi-backend (não remove suporte a Google Sheets/Formspree mesmo se só Web3Forms está ativo)
- **Não use** mais que 1 H1 por página
- **Cuidado** com o hero — animações fininhas, fácil de quebrar
- **Mobile-first**: testar em <480px, 720px, 980px

---

## 🐛 Issues conhecidos / gotchas

- **Vercel free não permite comercial** — se um dia migrar pra Vercel, precisa Pro ($20/mês)
- **GitHub Pages free permite comercial** — solução atual está OK
- **Web3Forms 250/mês** — se viralizar, considera Google Sheets (ilimitado)
- **Cache do GitHub Pages** — após push, demora 60-90s pra propagar globalmente
- **Service Worker:** não tem (não é PWA)
- **Vídeos de cases (~83MB total):** podem ser lentos em mobile 3G; considerar comprimir ou lazy-load
- **`localStorage` do quiz** lembra lead → testar em incógnito ou limpar `cgr-fabricio-lead`

---

## 💬 Pra Fábio retomar

Da próxima vez, abre o terminal e cola:

```
Continuar projeto site Fabrício Tanaia. Leia
C:\Users\fabyt\aios\aios-core\deploy\fabricio-tanaia-site\CONTINUAR.md
e me diga o estado atual + próximos 3 passos.
```

Ou simplesmente:

```
Continuar site Fabrício. Lê CONTINUAR.md no projeto.
```

---

**Última atualização:** 2026-05-15 22:35 (sessão antes de fechar)

**Última URL deployada:** https://fabytanaia-max.github.io/fabricio-tanaia-site/

**Último commit:** `b4485cc` — config(web3forms): chave configurada + payload formatado pra email legivel
