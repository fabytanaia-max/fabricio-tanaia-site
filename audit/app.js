/* =========================================================
   AUDIT PAGE · Quiz personalizado por área
   ========================================================= */

(function () {
  'use strict';

  // ===== Cursor (basic) =====
  const cursor = document.getElementById('cursor');
  if (cursor && window.matchMedia('(hover: hover)').matches) {
    const dot = cursor.querySelector('.cursor__dot');
    const ring = cursor.querySelector('.cursor__ring');
    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px'; dot.style.top = my + 'px';
    }, { passive: true });
    function loop() {
      rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
      requestAnimationFrame(loop);
    }
    loop();
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('is-grow'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('is-grow'));
    });
  } else if (cursor) cursor.style.display = 'none';

  document.getElementById('year').textContent = new Date().getFullYear();

  // ===== AREA from URL param =====
  const params = new URLSearchParams(location.search);
  const area = params.get('area') || 'outro';

  const AREA_INFO = {
    medico:    { label: 'Médico esteta',          icon: '⚕', emoji: '⚕️' },
    dentista:  { label: 'Dentista premium',       icon: '◈', emoji: '🦷' },
    advogado:  { label: 'Advogado especialista',  icon: '§', emoji: '⚖️' },
    consultor: { label: 'Consultor B2B',          icon: '◆', emoji: '🎯' },
    terapeuta: { label: 'Terapeuta sênior',       icon: '∞', emoji: '🧠' },
    arquiteto: { label: 'Arquiteto / Designer',   icon: '▣', emoji: '◐' },
    coach:     { label: 'Coach / Mentor',         icon: '↗', emoji: '⚡' },
    outro:     { label: 'Especialista premium',   icon: '＊', emoji: '◯' }
  };
  const info = AREA_INFO[area] || AREA_INFO.outro;

  // Update tag + title
  const tagEl = document.getElementById('auditAreaTag');
  if (tagEl) tagEl.innerHTML = `<span class="audit-area-tag__icon">${info.icon}</span> ${info.label}`;

  const titleEl = document.getElementById('auditTitle');
  if (titleEl) titleEl.innerHTML = `Diagnóstico para <em>${info.label}</em>`;

  const subEl = document.getElementById('auditSub');
  if (subEl) subEl.textContent = `7 perguntas adaptadas pra ${info.label.toLowerCase()}. 90 segundos. Sem cadastro pra começar.`;

  // ===== Quiz questions (shared, ready for area-specific tweaks via {{area}}) =====
  // 7 perguntas (área já é conhecida pela URL)
  const QUESTIONS = [
    {
      id: 'fat',
      title: 'Qual seu faturamento mensal médio?',
      sub: 'Sem julgamento. É só pra calibrar a próxima ação.',
      options: [
        { label: 'Menos de R$ 30k/mês', weight: 5,  fat: '<30k' },
        { label: 'R$ 30k – R$ 100k/mês', weight: 12, fat: '30-100k' },
        { label: 'R$ 100k – R$ 300k/mês', weight: 18, fat: '100-300k' },
        { label: 'Mais de R$ 300k/mês', weight: 22, fat: '300k+' }
      ]
    },
    {
      id: 'site',
      title: 'Como está sua presença digital hoje?',
      sub: 'Honestamente.',
      options: [
        { label: 'Não tenho site, só Instagram',           weight: 2,  pain: 'Você está invisível no momento que o cliente decide' },
        { label: 'Tenho um site básico (Wix/template)',    weight: 5,  pain: 'O site empurra cliente pra outros profissionais' },
        { label: 'Site OK, mas não me representa bem',     weight: 10, pain: 'Site funciona mas não converte percepção em valor' },
        { label: 'Site profissional e atualizado',          weight: 18, pain: 'Pode estar no nível, mas não otimizado pra cobrar mais' }
      ]
    },
    {
      id: 'pre-vendido',
      title: 'Qual % dos seus leads chegam "pré-vendidos"?',
      sub: 'Pré-vendido = quase decidido, só faltando confirmar.',
      options: [
        { label: 'Menos de 20% (chegam céticos)',           weight: 2,  pain: 'Você gasta energia convencendo em vez de fechando' },
        { label: '20–40% (interessados, mas precisam prova)', weight: 6, pain: 'Funil meio frio — perde leads que não querem se "explicar"' },
        { label: '40–70% (boa parte já decidida)',           weight: 12, pain: 'Bom posicionamento, falta otimizar o último degrau' },
        { label: 'Mais de 70% (chegam quentes)',             weight: 18, pain: 'Você já tem ativo de autoridade — ajuste fino' }
      ]
    },
    {
      id: 'tempo-explicar',
      title: 'Quanto tempo gasta explicando seu valor antes de fechar?',
      sub: 'Em média, do primeiro contato até "fechei".',
      options: [
        { label: 'Sempre preciso convencer / não fecho metade', weight: 2, pain: 'O cliente não percebe valor antes da conversa' },
        { label: 'Mais de 1 hora por lead',                     weight: 5, pain: 'Você está fazendo o trabalho que o site deveria fazer' },
        { label: '~30 minutos',                                  weight: 10, pain: 'Funciona mas não escala — você é o gargalo' },
        { label: 'Poucos minutos / cliente já chega decidido',  weight: 16, pain: 'Posicionamento já vende por você' }
      ]
    },
    {
      id: 'preco',
      title: 'Você sente que cobra o que merece?',
      sub: 'A pergunta que dói.',
      options: [
        { label: 'Cobro bem menos do que entrego',             weight: 2,  pain: 'Você está deixando muito dinheiro na mesa todo mês' },
        { label: 'Cobro razoável, mas vejo gente pior cobrando mais', weight: 6, pain: 'Posicionamento dos outros vende mais que o seu' },
        { label: 'Cobro o que considero justo',                 weight: 12, pain: 'Bom — mas tem espaço pra premium se quiser' },
        { label: 'Cobro alto e fecho com facilidade',          weight: 18, pain: 'Você está acima do mercado — site precisa sustentar isso' }
      ]
    },
    {
      id: 'incomoda',
      title: 'O que mais te incomoda hoje?',
      sub: 'Escolhe o que te tira o sono.',
      options: [
        { label: 'Parecer amador (visual fraco)',           weight: 4, pain: 'Visual amador derruba percepção antes da primeira mensagem' },
        { label: 'Lead barato / cliente que pechincha',     weight: 4, pain: 'Posicionamento atrai o público errado' },
        { label: 'Ciclo de venda longo demais',             weight: 6, pain: 'Falta de pré-venda visual no site' },
        { label: 'Baixa conversão de quem chega',           weight: 6, pain: 'A última milha do funil precisa ser refinada' },
        { label: 'Tudo isso ao mesmo tempo',                 weight: 2, pain: 'Você precisa rebootar o sistema inteiro de posicionamento' }
      ]
    },
    {
      id: 'prazo',
      title: 'Em quanto tempo precisaria desse novo posicionamento?',
      sub: 'Realista.',
      options: [
        { label: 'Pra ontem — já estou perdendo dinheiro',  weight: 0, prazo: 'urgente' },
        { label: 'Próximas 4 semanas',                        weight: 0, prazo: '4-sem' },
        { label: '60–90 dias, sem urgência',                  weight: 0, prazo: '60-90' },
        { label: 'Estou só estudando o assunto',             weight: 0, prazo: 'estudo' }
      ]
    }
  ];

  // ===== Personalized actions per area =====
  const ACTIONS = {
    medico: [
      { num: '01', title: 'Reescreva sua bio em 1 frase', body: 'Tire "especialista em..." e troque por uma promessa específica: "Faço estética facial pra mulheres 35+ que não querem parecer feitas".' },
      { num: '02', title: 'Adicione um "antes/depois" estratégico', body: 'No site/Insta destacado: 3 cases com mesma faixa de idade do seu cliente ideal. Não 30 cases aleatórios.' },
      { num: '03', title: 'Suba o preço do procedimento mais procurado em 30%', body: 'Não baixa o nível, sobe a barra. Vai filtrar o público errado e atrair quem paga sem pechinchar.' }
    ],
    dentista: [
      { num: '01', title: 'Mate sua tabela de preços do site',      body: 'Cliente premium não escolhe pelo menor preço listado. Tira tabela. Coloca "Avaliação personalizada".' },
      { num: '02', title: 'Foto profissional de você + clínica',   body: 'Mais importante que mostrar implante: mostrar a pessoa em quem o cliente vai confiar.' },
      { num: '03', title: 'Crie um "primeiro atendimento" diferenciado', body: 'Algo que justifique cobrar 2x mais já na avaliação inicial. Briefing detalhado, plano impresso, follow-up.' }
    ],
    advogado: [
      { num: '01', title: 'Pare de listar áreas genéricas',        body: 'Foca em 1-2 nichos específicos. "Direito empresarial" → "M&A para empresas familiares de 2ª geração".' },
      { num: '02', title: 'Crie um "processo de descoberta" pago', body: 'Reunião inicial paga (R$500–2k) onde você diagnostica a situação. Vira degrau intermediário.' },
      { num: '03', title: 'Publique 1 análise de caso por semana', body: 'Não conteúdo genérico — análise específica do seu nicho. Vira autoridade em 90 dias.' }
    ],
    consultor: [
      { num: '01', title: 'Defina sua "metodologia proprietária"', body: 'Dá nome ao seu processo. "O Sistema X" vende mais que "consultoria estratégica".' },
      { num: '02', title: 'Suba o preço base em 50% e ofereça pacote anual', body: 'Pacote anual pré-pago vira cliente que pensa duas vezes antes de sair. Garante caixa.' },
      { num: '03', title: 'Crie 1 case study escrito por mês',      body: 'Não LinkedIn post, case study estruturado: situação, intervenção, resultado mensurável.' }
    ],
    terapeuta: [
      { num: '01', title: 'Defina seu "perfil ideal" claramente',  body: '"Atendo executivos 35-55 com burnout pós-aquisição" vende mais que "psicologia clínica".' },
      { num: '02', title: 'Pacote de 8 sessões ao invés de avulso', body: 'Pré-pago. Filtra commitment. Reduz "no-show". Aumenta ticket médio.' },
      { num: '03', title: 'Conteúdo de autoridade no LinkedIn',     body: '1 post/semana sobre seu nicho. Não autoajuda — análise técnica. Constrói credibilidade.' }
    ],
    arquiteto: [
      { num: '01', title: 'Especialize em 1 estilo / segmento',     body: '"Casa de praia premium" ou "interiores corporativos C-level" — não "projetos diversos".' },
      { num: '02', title: 'Portfolio com 5 projetos só, super bem fotografados', body: 'Melhor 5 projetos perfeitos que 30 medianos. Qualidade fotográfica = percepção de valor.' },
      { num: '03', title: 'Cobre por hora consultiva no início',    body: 'Antes do projeto fechado, R$300-800/h de consultoria. Filtra quem é cliente real.' }
    ],
    coach: [
      { num: '01', title: 'Mate o "coaching de tudo"',              body: 'Especifica resultado: "Founders 6-9 dígitos passando a 7-9".' },
      { num: '02', title: 'Crie seu manifesto em 1 página',         body: 'Sua filosofia escrita. Quem te lê e concorda, paga. Quem lê e discorda, sai.' },
      { num: '03', title: 'Sobe o preço do programa em 100%',        body: 'Sério. Cobre R$5k → R$10k. R$10k → R$20k. Cliente premium não compra pelo menor preço.' }
    ],
    outro: [
      { num: '01', title: 'Defina seu cliente ideal em 1 frase',     body: '"Especialista em X que fatura entre Y e Z e enfrenta W." Específico vende mais.' },
      { num: '02', title: 'Mate a página "Sobre" genérica',         body: 'Reescreve como manifesto: "Eu acredito que ___. Por isso faço ___. Não atendo quem ___."' },
      { num: '03', title: 'Eleva o preço do serviço principal em 30-50%', body: 'O preço comunica. Cobre menos = pareça menos. Barreira de preço filtra cliente bom.' }
    ]
  };

  let answers = {};
  let currentIdx = 0;
  let leadInfo = null; // { name, whats, email, capturedAt }

  const stepsEl   = document.getElementById('quizSteps');
  const barEl     = document.getElementById('quizProgressBar');
  const labelEl   = document.getElementById('quizProgressLabel');
  const resultEl  = document.getElementById('quizResult');
  const introEl   = document.getElementById('quizIntro');
  const progressEl= document.getElementById('quizProgress');

  /* ===================== LEAD CAPTURE (intro) ===================== */
  const LEAD_KEY = 'cgr-fabricio-lead';

  function loadStoredLead() {
    try {
      const raw = localStorage.getItem(LEAD_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  }
  function saveLead(data) {
    try { localStorage.setItem(LEAD_KEY, JSON.stringify(data)); } catch (e) {}
  }

  // ===== Backend dispatcher =====
  // Envia dados pra TODOS os endpoints configurados (silenciosamente). Se um falha, outros podem ter sucesso.
  // Configure ABAIXO os endpoints que você quer usar. Deixe vazio se não usar.
  const BACKENDS = {
    // OPÇÃO 1 (RECOMENDADA): Google Apps Script Web App
    // Cole aqui a URL do Web App do Google Sheets + Apps Script (formato https://script.google.com/macros/s/AKfyc.../exec)
    // Setup completo: ver SETUP-INTEGRACOES.md no repo
    googleSheets: '',

    // OPÇÃO 2: Formspree (free 50 envios/mês)
    // Cole o endpoint completo: https://formspree.io/f/SEU_ID
    formspree: '',

    // OPÇÃO 3: Web3Forms (free 250 envios/mês, mais simples)
    // Cole apenas a access_key
    web3formsKey: '',

    // OPÇÃO 4: Webhook customizado (Zapier, Make, n8n self-hosted, etc.)
    webhook: ''
  };

  async function sendLeadToBackends(payload) {
    const promises = [];

    if (BACKENDS.googleSheets) {
      promises.push(
        fetch(BACKENDS.googleSheets, {
          method: 'POST',
          mode: 'no-cors', // Apps Script web apps require this
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(payload)
        }).catch(e => console.warn('GoogleSheets fail:', e))
      );
    }

    if (BACKENDS.formspree) {
      promises.push(
        fetch(BACKENDS.formspree, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(payload)
        }).catch(e => console.warn('Formspree fail:', e))
      );
    }

    if (BACKENDS.web3formsKey) {
      promises.push(
        fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({ access_key: BACKENDS.web3formsKey, ...payload })
        }).catch(e => console.warn('Web3Forms fail:', e))
      );
    }

    if (BACKENDS.webhook) {
      promises.push(
        fetch(BACKENDS.webhook, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }).catch(e => console.warn('Webhook fail:', e))
      );
    }

    if (promises.length === 0) {
      // Nenhum backend configurado — só loga
      console.log('[Audit] Lead captured (no backend configured):', payload);
      return false;
    }

    await Promise.allSettled(promises);
    return true;
  }

  // ===== Build lead payload from current state =====
  function buildPayload(stage) {
    const d = new Date();
    return {
      stage, // 'intro' (só preencheu mini-form) ou 'completed' (terminou quiz)
      timestamp: d.toISOString(),
      timestampLocal: d.toLocaleString('pt-BR'),
      area: info.label,
      areaKey: area,
      lead: leadInfo || {},
      answers: Object.fromEntries(
        Object.entries(answers).map(([k, v]) => [k, v.label || ''])
      ),
      score: stage === 'completed' ? computeScore() : null,
      tier: stage === 'completed' ? computeTier(computeScore()).label : null,
      pageUrl: location.href,
      userAgent: navigator.userAgent.slice(0, 200)
    };
  }

  function computeScore() {
    let raw = 0;
    Object.values(answers).forEach(a => { raw += (a.weight || 0); });
    return Math.min(100, Math.round((raw / 100) * 100));
  }

  function computeTier(score) {
    if (score < 25) return { key: 'critical', label: 'Posicionamento Crítico', color: '#C97171' };
    if (score < 50) return { key: 'basic',    label: 'Posicionamento Básico',  color: '#D4A276' };
    if (score < 75) return { key: 'good',     label: 'Posicionamento Consistente', color: '#C9956F' };
    return            { key: 'premium',  label: 'Posicionamento Premium', color: '#9C8B6E' };
  }

  // ===== Intro form handlers =====
  function showQuiz() {
    introEl.style.display = 'none';
    progressEl.hidden = false;
    render();
  }

  document.getElementById('quizIntroForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name  = document.getElementById('introName').value.trim();
    const whats = document.getElementById('introWhats').value.trim();
    const email = document.getElementById('introEmail').value.trim();

    if (!name) {
      document.getElementById('introName').focus();
      return;
    }

    leadInfo = { name, whats, email, capturedAt: new Date().toISOString() };
    saveLead(leadInfo);

    // Send 'intro' payload (mesmo se não terminar o quiz, lead fica registrado)
    sendLeadToBackends(buildPayload('intro'));

    showQuiz();
  });

  document.getElementById('quizIntroSkip').addEventListener('click', () => {
    showQuiz();
  });

  // Restore previous lead if any
  const stored = loadStoredLead();
  if (stored && stored.name) {
    leadInfo = stored;
    // Pre-fill silently if user re-opens quiz
    document.getElementById('introName').value  = stored.name || '';
    document.getElementById('introWhats').value = stored.whats || '';
    document.getElementById('introEmail').value = stored.email || '';
    // Auto-skip intro if name was already captured
    showQuiz();
  }

  function render() {
    if (currentIdx >= QUESTIONS.length) { showResult(); return; }
    const q = QUESTIONS[currentIdx];
    const total = QUESTIONS.length;
    barEl.style.width = ((currentIdx) / total * 100) + '%';
    labelEl.textContent = `Pergunta ${currentIdx + 1} de ${total}`;

    stepsEl.innerHTML = `
      <div class="quiz__step">
        <h3 class="quiz__q">${q.title}</h3>
        <p class="quiz__sub">${q.sub}</p>
        <div class="quiz__options">
          ${q.options.map((opt, i) => `
            <button class="quiz__option" data-idx="${i}" type="button">
              <span class="quiz__option-label">${opt.label}</span>
              <span class="quiz__option-arrow">→</span>
            </button>
          `).join('')}
        </div>
        ${currentIdx > 0 ? `<button class="quiz__back" id="quizBack">← Voltar</button>` : ''}
      </div>
    `;
    stepsEl.querySelectorAll('.quiz__option').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.idx, 10);
        const opt = q.options[idx];
        answers[q.id] = { idx, ...opt };
        currentIdx++;
        render();
        window.scrollTo({ top: document.querySelector('.quiz-wrap').offsetTop - 40, behavior: 'smooth' });
      });
    });
    const back = document.getElementById('quizBack');
    if (back) back.addEventListener('click', () => { currentIdx--; render(); });
  }

  function showResult() {
    const total = QUESTIONS.length;
    barEl.style.width = '100%';
    labelEl.textContent = 'Resultado';

    const score = computeScore();
    const tier  = computeTier(score);

    let urgency, ctaTxt;
    if (tier.key === 'critical') {
      urgency = `Como ${info.label.toLowerCase()}, você provavelmente está perdendo 30-60% das oportunidades hoje, antes mesmo da conversa começar.`;
      ctaTxt = 'Você precisa começar pelo básico. Vamos conversar pra eu te dizer onde focar primeiro — sem custo, mesmo que você não trabalhe comigo.';
    } else if (tier.key === 'basic') {
      urgency = `Como ${info.label.toLowerCase()}, você funciona, mas cobra menos do que poderia e gasta energia em cada negociação.`;
      ctaTxt = 'Tem ativo já. Falta refinar. Vamos conversar pra eu te mostrar o que ajustar primeiro — em geral 2-3 mudanças resolvem 80% do gap.';
    } else if (tier.key === 'good') {
      urgency = `Como ${info.label.toLowerCase()}, você está acima da maioria. O gap agora é entre "bom" e "premium" — onde se cobra 2-3x mais sem mais esforço.`;
      ctaTxt = 'Você já está acima do mercado. Vamos conversar pra ver se faz sentido subir pro próximo nível — pode ser ajuste fino, pode ser virada de jogo.';
    } else {
      urgency = `Como ${info.label.toLowerCase()}, você já entendeu o jogo. Provavelmente quer otimizar margem ou escalar canal de aquisição.`;
      ctaTxt = 'Você joga em outro nível. Se chegou aqui, vai ser conversa entre pares. Vamos trocar ideia.';
    }

    const allPains = Object.values(answers)
      .filter(a => a.pain)
      .sort((a, b) => (a.weight || 0) - (b.weight || 0))
      .slice(0, 3);

    document.getElementById('quizDiagnosis').innerHTML = `
      <h4>O que esse score revela:</h4>
      <p class="quiz__urgency">${urgency}</p>
      ${allPains.length > 0 ? `
        <h4>Os 3 pontos que mais pesam no seu caso:</h4>
        <ul class="quiz__pains">${allPains.map(p => `<li>${p.pain}</li>`).join('')}</ul>
      ` : ''}
    `;

    const actions = ACTIONS[area] || ACTIONS.outro;
    document.getElementById('quizActions').innerHTML = `
      <h4>3 ações personalizadas pra ${info.label.toLowerCase()}:</h4>
      <ol class="quiz__actions-list">
        ${actions.map(a => `
          <li>
            <span class="quiz__action-num">${a.num}</span>
            <div>
              <strong>${a.title}</strong>
              <p>${a.body}</p>
            </div>
          </li>
        `).join('')}
      </ol>
    `;

    document.getElementById('quizScoreNum').textContent = score;
    const fill = document.getElementById('quizScoreFill');
    fill.style.width = score + '%';
    fill.style.background = tier.color;
    const tierEl = document.getElementById('quizScoreTier');
    tierEl.textContent = tier.label;
    tierEl.style.color = tier.color;

    document.getElementById('quizCtaText').textContent = ctaTxt;

    const fatLabel  = answers.fat ? answers.fat.label : '';
    const prazoLabel= answers.prazo ? answers.prazo.label : '';
    const namePart  = (leadInfo && leadInfo.name) ? `\nNome: ${leadInfo.name}` : '';
    const waMsg = encodeURIComponent(
`Olá Fabrício! Acabei de fazer o diagnóstico no seu site.${namePart}

Área: ${info.label}
Score: ${score}/100 (${tier.label})
Faturamento: ${fatLabel}
Prazo: ${prazoLabel}

Quero conversar sobre meu posicionamento.`
    );
    document.getElementById('quizCtaBtn').href = `https://wa.me/2389554721?text=${waMsg}`;

    // Send completed payload (com todas as respostas) pra todos backends
    sendLeadToBackends(buildPayload('completed'));

    stepsEl.style.display = 'none';
    resultEl.hidden = false;
    setTimeout(() => resultEl.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
  }

  render();

  // Restart
  document.getElementById('quizRestart').addEventListener('click', () => {
    answers = {};
    currentIdx = 0;
    stepsEl.style.display = '';
    resultEl.hidden = true;
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Email-extra capture (after seeing result, ask if didn't give email)
  const emailForm = document.getElementById('quizEmailForm');
  if (emailForm) {
    emailForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('leadName').value.trim();
      const email = document.getElementById('leadEmail').value.trim();
      const status = document.getElementById('quizEmailStatus');
      if (!name || !email || !email.includes('@')) {
        status.hidden = false;
        status.textContent = 'Preencha nome e e-mail válido.';
        status.style.color = '#C97171';
        return;
      }

      // Update lead info with email
      leadInfo = Object.assign({}, leadInfo || {}, { name, email });
      saveLead(leadInfo);

      const sent = await sendLeadToBackends(buildPayload('email-followup'));

      status.hidden = false;
      if (sent) {
        status.textContent = '✓ Recebido. Diagnóstico expandido a caminho do seu e-mail.';
      } else {
        status.textContent = '✓ Recebido. (Backend não configurado — dados visíveis no console)';
      }
      status.style.color = '#C9956F';
      emailForm.reset();
    });
  }
})();
