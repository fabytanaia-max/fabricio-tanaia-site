/* =========================================================
   FABRÍCIO TANAIA · Interactions
   ========================================================= */

(function () {
  'use strict';

  /* ---------- Custom cursor ---------- */
  const cursor = document.getElementById('cursor');
  if (cursor && window.matchMedia('(hover: hover)').matches) {
    const dot = cursor.querySelector('.cursor__dot');
    const ring = cursor.querySelector('.cursor__ring');
    let mx = 0, my = 0;
    let rx = 0, ry = 0;

    document.addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px';
      dot.style.top  = my + 'px';
    }, { passive: true });

    function loop() {
      // Smooth ring follow
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      requestAnimationFrame(loop);
    }
    loop();

    // Hover states from data-cursor
    const growEls = document.querySelectorAll('[data-cursor="grow"], a, button');
    growEls.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('is-grow'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('is-grow'));
    });
    document.querySelectorAll('[data-cursor="play"]').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('is-play'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('is-play'));
    });

    // Hide on touch
    document.addEventListener('touchstart', () => cursor.style.display = 'none', { once: true });
  } else if (cursor) {
    cursor.style.display = 'none';
  }

  /* ---------- Scroll progress ---------- */
  const progressBar = document.getElementById('scrollProgress');
  if (progressBar) {
    const onScrollProgress = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      const pct = total > 0 ? (h.scrollTop / total) * 100 : 0;
      progressBar.style.width = pct + '%';
    };
    document.addEventListener('scroll', onScrollProgress, { passive: true });
    onScrollProgress();
  }

  /* ---------- Smooth anchor scroll with offset ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ---------- Reveal on scroll (with stagger via data-delay) ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = parseInt(entry.target.getAttribute('data-delay') || '0', 10);
          setTimeout(() => entry.target.classList.add('is-visible'), delay);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -80px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- Top bar hide on scroll down, show on scroll up ---------- */
  const topbar = document.getElementById('topbar');
  if (topbar) {
    let lastY = 0;
    let ticking = false;
    document.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y > 200 && y > lastY) {
          topbar.style.top = '-80px';
        } else {
          topbar.style.top = '1rem';
        }
        lastY = y;
        ticking = false;
      });
    }, { passive: true });
  }

  /* ---------- Year in footer ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Pause case videos when out of view (perf) ---------- */
  const caseVideos = document.querySelectorAll('.case__media video');
  if ('IntersectionObserver' in window && caseVideos.length) {
    const vio = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const v = entry.target;
        if (entry.isIntersecting) {
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      });
    }, { threshold: 0.25 });
    caseVideos.forEach(v => vio.observe(v));
  }

  /* ---------- Marquee pause on hover ---------- */
  const marquee = document.querySelector('.marquee__track');
  if (marquee) {
    marquee.parentElement.addEventListener('mouseenter', () => {
      marquee.style.animationPlayState = 'paused';
    });
    marquee.parentElement.addEventListener('mouseleave', () => {
      marquee.style.animationPlayState = 'running';
    });
  }
})();



/* =========================================================
   QUIZ FUNNEL — Diagnóstico de Autoridade Visual
   ========================================================= */
(function () {
  const root = document.getElementById('quiz');
  if (!root) return;

  const stepsEl   = document.getElementById('quizSteps');
  const barEl     = document.getElementById('quizProgressBar');
  const labelEl   = document.getElementById('quizProgressLabel');
  const resultEl  = document.getElementById('quizResult');
  const scoreNum  = document.getElementById('quizScoreNum');
  const scoreFill = document.getElementById('quizScoreFill');
  const scoreTier = document.getElementById('quizScoreTier');
  const diagEl    = document.getElementById('quizDiagnosis');
  const actionsEl = document.getElementById('quizActions');
  const ctaText   = document.getElementById('quizCtaText');
  const ctaBtn    = document.getElementById('quizCtaBtn');
  const restartBtn= document.getElementById('quizRestart');

  // ===== Quiz definition =====
  // Each option: { label, weight (impact on score 0-100, where 100 = better posicionamento), pain (text used in diagnosis) }
  const QUESTIONS = [
    {
      id: 'area',
      title: 'Qual sua área principal?',
      sub: 'Pra eu entender o jogo que você está jogando.',
      type: 'single',
      options: [
        { label: 'Médico esteta / dermatologista', weight: 0, area: 'medico' },
        { label: 'Dentista premium', weight: 0, area: 'dentista' },
        { label: 'Advogado(a) especialista', weight: 0, area: 'advogado' },
        { label: 'Consultor(a) B2B', weight: 0, area: 'consultor' },
        { label: 'Terapeuta / Psicólogo(a) sênior', weight: 0, area: 'terapeuta' },
        { label: 'Arquiteto(a) / Designer', weight: 0, area: 'arquiteto' },
        { label: 'Coach / Mentor(a)', weight: 0, area: 'coach' },
        { label: 'Outra área premium', weight: 0, area: 'outro' }
      ]
    },
    {
      id: 'fat',
      title: 'Qual seu faturamento mensal médio?',
      sub: 'Sem julgamento. É só pra calibrar a próxima ação.',
      type: 'single',
      options: [
        { label: 'Menos de R$ 30k/mês', weight: 5, fat: '<30k' },
        { label: 'R$ 30k – R$ 100k/mês', weight: 12, fat: '30-100k' },
        { label: 'R$ 100k – R$ 300k/mês', weight: 18, fat: '100-300k' },
        { label: 'Mais de R$ 300k/mês', weight: 22, fat: '300k+' }
      ]
    },
    {
      id: 'site',
      title: 'Como está seu site/presença digital hoje?',
      sub: 'Honestamente.',
      type: 'single',
      options: [
        { label: 'Não tenho site, só Instagram', weight: 2, pain: 'Você está invisível no momento que o cliente decide' },
        { label: 'Tenho um site básico (Wix/template antigo)', weight: 5, pain: 'O site empurra cliente pra outros profissionais' },
        { label: 'Site OK, mas não me representa bem', weight: 10, pain: 'Site funciona mas não converte percepção em valor' },
        { label: 'Site profissional e atualizado', weight: 18, pain: 'Pode estar no nível, mas não otimizado pra cobrar mais' }
      ]
    },
    {
      id: 'pre-vendido',
      title: 'Qual % dos seus leads chegam "pré-vendidos"?',
      sub: 'Pré-vendido = quase decidido, só faltando confirmar.',
      type: 'single',
      options: [
        { label: 'Menos de 20% (quase todos chegam céticos)', weight: 2, pain: 'Você gasta energia convencendo em vez de fechando' },
        { label: '20–40% (chegam interessados, mas precisam de prova)', weight: 6, pain: 'Funil meio frio — perde leads que não querem se "explicar"' },
        { label: '40–70% (boa parte já decidida)', weight: 12, pain: 'Bom posicionamento, falta otimizar o último degrau' },
        { label: 'Mais de 70% (quase todo mundo chega quente)', weight: 18, pain: 'Você já tem ativo de autoridade — ajuste fino só' }
      ]
    },
    {
      id: 'tempo-explicar',
      title: 'Quanto tempo você gasta explicando seu valor antes de fechar?',
      sub: 'Em média, do primeiro contato até "fechei".',
      type: 'single',
      options: [
        { label: 'Sempre preciso convencer / não fecho metade', weight: 2, pain: 'O cliente não percebe valor antes da conversa' },
        { label: 'Mais de 1 hora por lead', weight: 5, pain: 'Você está fazendo o trabalho que o site deveria fazer' },
        { label: '~30 minutos', weight: 10, pain: 'Funciona mas não escala — você é o gargalo' },
        { label: 'Poucos minutos / cliente já chega decidido', weight: 16, pain: 'Posicionamento já vende por você' }
      ]
    },
    {
      id: 'preco',
      title: 'Você sente que cobra o que merece?',
      sub: 'A pergunta que dói.',
      type: 'single',
      options: [
        { label: 'Cobro bem menos do que entrego', weight: 2, pain: 'Você está deixando muito dinheiro na mesa todo mês' },
        { label: 'Cobro razoável, mas vejo gente pior cobrando mais', weight: 6, pain: 'Posicionamento dos outros vende mais que o seu' },
        { label: 'Cobro o que considero justo', weight: 12, pain: 'Bom — mas tem espaço pra premium se quiser' },
        { label: 'Cobro alto e fecho com facilidade', weight: 18, pain: 'Você está acima do mercado — site precisa sustentar isso' }
      ]
    },
    {
      id: 'incomoda',
      title: 'O que mais te incomoda hoje?',
      sub: 'Escolhe o que te tira o sono.',
      type: 'single',
      options: [
        { label: 'Parecer amador (visual fraco)', weight: 4, pain: 'Visual amador derruba percepção antes da primeira mensagem' },
        { label: 'Lead barato / cliente que pechincha', weight: 4, pain: 'Posicionamento atrai o público errado' },
        { label: 'Ciclo de venda longo demais', weight: 6, pain: 'Falta de pré-venda visual no site' },
        { label: 'Baixa conversão de quem chega', weight: 6, pain: 'A última milha do funil precisa ser refinada' },
        { label: 'Tudo isso ao mesmo tempo', weight: 2, pain: 'Você precisa rebootar o sistema inteiro de posicionamento' }
      ]
    },
    {
      id: 'prazo',
      title: 'Em quanto tempo você precisaria desse novo posicionamento?',
      sub: 'Realista.',
      type: 'single',
      options: [
        { label: 'Pra ontem — já estou perdendo dinheiro', weight: 0, prazo: 'urgente' },
        { label: 'Próximas 4 semanas', weight: 0, prazo: '4-sem' },
        { label: '60–90 dias, sem urgência', weight: 0, prazo: '60-90' },
        { label: 'Estou só estudando o assunto', weight: 0, prazo: 'estudo' }
      ]
    }
  ];

  let answers = {};
  let currentIdx = 0;

  function render() {
    if (currentIdx >= QUESTIONS.length) {
      showResult();
      return;
    }
    const q = QUESTIONS[currentIdx];
    const total = QUESTIONS.length;
    const pct = ((currentIdx) / total) * 100;
    barEl.style.width = pct + '%';
    labelEl.textContent = `Pergunta ${currentIdx + 1} de ${total}`;

    stepsEl.innerHTML = `
      <div class="quiz__step">
        <h3 class="quiz__q">${q.title}</h3>
        <p class="quiz__sub">${q.sub}</p>
        <div class="quiz__options" role="radiogroup">
          ${q.options.map((opt, i) => `
            <button class="quiz__option" data-q-id="${q.id}" data-opt-idx="${i}" type="button">
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
        const qid = btn.dataset.qId;
        const idx = parseInt(btn.dataset.optIdx, 10);
        const q   = QUESTIONS.find(x => x.id === qid);
        const opt = q.options[idx];
        answers[qid] = { idx, ...opt };
        currentIdx++;
        render();
        // scroll into view smoothly
        root.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    const back = document.getElementById('quizBack');
    if (back) back.addEventListener('click', () => {
      currentIdx = Math.max(0, currentIdx - 1);
      render();
    });
  }

  function showResult() {
    const total = QUESTIONS.length;
    barEl.style.width = '100%';
    labelEl.textContent = `Resultado`;

    // Sum weights from answers (max ~ 92)
    let raw = 0;
    Object.values(answers).forEach(a => { raw += (a.weight || 0); });
    // Normalize to 0-100
    const score = Math.min(100, Math.round((raw / 92) * 100));

    // Tier
    let tier, tierLabel, tierColor, ctaTxt, urgency;
    if (score < 25) {
      tier = 'critical';
      tierLabel = 'Posicionamento Crítico';
      tierColor = '#C97171';
      urgency = 'Você provavelmente está perdendo 30-60% das oportunidades hoje, antes mesmo da conversa começar.';
      ctaTxt = 'Você precisa começar pelo básico. Vamos conversar pra eu te dizer onde focar primeiro — sem custo, mesmo que você não trabalhe comigo.';
    } else if (score < 50) {
      tier = 'basic';
      tierLabel = 'Posicionamento Básico';
      tierColor = '#D4A276';
      urgency = 'Você funciona, mas cobra menos do que poderia e gasta energia em cada negociação.';
      ctaTxt = 'Tem ativo já. Falta refinar. Vamos conversar pra eu te mostrar o que ajustar primeiro — em geral 2-3 mudanças resolvem 80% do gap.';
    } else if (score < 75) {
      tier = 'good';
      tierLabel = 'Posicionamento Consistente';
      tierColor = '#C9956F';
      urgency = 'Você está acima da maioria. O gap agora é entre "bom" e "premium" — onde se cobra 2-3x mais sem mais esforço.';
      ctaTxt = 'Você já está acima do mercado. Vamos conversar pra ver se faz sentido subir pro próximo nível — pode ser ajuste fino, pode ser virada de jogo.';
    } else {
      tier = 'premium';
      tierLabel = 'Posicionamento Premium';
      tierColor = '#9C8B6E';
      urgency = 'Você já entendeu o jogo. Provavelmente quer otimizar margem ou escalar canal de aquisição.';
      ctaTxt = 'Você joga em outro nível. Se chegou aqui, vai ser conversa entre pares. Vamos trocar ideia.';
    }

    // Diagnosis: pega 3 pains das respostas (maior peso primeiro? não — escolhe os mais negativos)
    const allPains = Object.values(answers)
      .filter(a => a.pain)
      .sort((a, b) => (a.weight || 0) - (b.weight || 0))
      .slice(0, 3);

    diagEl.innerHTML = `
      <h4>O que esse score revela:</h4>
      <p class="quiz__urgency">${urgency}</p>
      ${allPains.length > 0 ? `
        <h4>Os 3 pontos que mais pesam no seu caso:</h4>
        <ul class="quiz__pains">
          ${allPains.map(p => `<li>${p.pain}</li>`).join('')}
        </ul>
      ` : ''}
    `;

    // 3 ações personalizadas baseadas na area + score
    const actions = generateActions(answers, score);
    actionsEl.innerHTML = `
      <h4>3 ações que você pode aplicar hoje:</h4>
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

    // Score visual
    scoreNum.textContent = score;
    scoreFill.style.width = score + '%';
    scoreFill.style.background = tierColor;
    scoreTier.textContent = tierLabel;
    scoreTier.style.color = tierColor;

    // CTA WhatsApp pré-vendido com contexto
    ctaText.textContent = ctaTxt;

    const areaLabel = answers.area ? answers.area.label : '';
    const fatLabel  = answers.fat ? answers.fat.label : '';
    const prazoLabel= answers.prazo ? answers.prazo.label : '';
    const waMsg = encodeURIComponent(
`Olá Fabrício! Acabei de fazer o diagnóstico no seu site.

Meu score: ${score}/100 (${tierLabel})
Área: ${areaLabel}
Faturamento: ${fatLabel}
Prazo: ${prazoLabel}

Quero conversar sobre meu posicionamento.`
    );
    ctaBtn.href = `https://wa.me/2389554721?text=${waMsg}`;

    // Hide steps, show result
    stepsEl.style.display = 'none';
    resultEl.hidden = false;

    // Scroll to result
    setTimeout(() => resultEl.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
  }

  function generateActions(ans, score) {
    // 3 actions tailored to area + biggest pain
    const area = ans.area ? ans.area.area : 'outro';
    const lib = {
      medico: [
        { num: '01', title: 'Reescreva sua bio em 1 frase', body: 'Tire "especialista em..." e troque por uma promessa específica: "Faço estética facial pra mulheres 35+ que não querem parecer feitas".' },
        { num: '02', title: 'Adicione um "antes/depois" estratégico', body: 'No site/Insta destacado: 3 cases com mesma faixa de idade do seu cliente ideal. Não 30 cases aleatórios.' },
        { num: '03', title: 'Suba o preço do procedimento mais procurado em 30%', body: 'Não baixa o nível, sobe a barra. Vai filtrar o público errado e atrair quem paga sem pechinchar.' }
      ],
      dentista: [
        { num: '01', title: 'Mate sua tabela de preços do site', body: 'Cliente premium não escolhe pelo menor preço listado. Tira tabela. Coloca "Avaliação personalizada".' },
        { num: '02', title: 'Foto profissional de você + clínica', body: 'Mais importante que mostrar implante: mostrar a pessoa em quem o cliente vai confiar.' },
        { num: '03', title: 'Crie um "primeiro atendimento" diferenciado', body: 'Algo que justifique cobrar 2x mais já na avaliação inicial. Briefing detalhado, plano impresso, follow-up.' }
      ],
      advogado: [
        { num: '01', title: 'Pare de listar áreas genéricas', body: 'Foca em 1-2 nichos específicos. "Direito empresarial" → "M&A para empresas familiares de 2ª geração".' },
        { num: '02', title: 'Crie um "processo de descoberta"', body: 'Reunião inicial paga (R$500-2k) onde você diagnostica a situação. Vira degrau intermediário.' },
        { num: '03', title: 'Publica 1 análise de caso por semana', body: 'Não conteúdo genérico — análise específica do seu nicho. Vira autoridade em 90 dias.' }
      ],
      consultor: [
        { num: '01', title: 'Defina sua "metodologia proprietária"', body: 'Dá nome ao seu processo. "O Sistema X" vende mais que "consultoria estratégica".' },
        { num: '02', title: 'Suba o preço base em 50% e adiciona pacote anual', body: 'Pacote anual pré-pago vira cliente que pensa duas vezes antes de sair. Garante caixa.' },
        { num: '03', title: 'Crie 1 case study escrito por mês', body: 'Não LinkedIn post, case study estruturado: situação, intervenção, resultado mensurável.' }
      ],
      terapeuta: [
        { num: '01', title: 'Defina seu "perfil ideal" claramente', body: 'Não atende todo mundo. "Atendo executivos 35-55 com burnout pós-aquisição" vende mais que "psicologia clínica".' },
        { num: '02', title: 'Pacote de 8 sessões ao invés de avulso', body: 'Pré-pago. Filtra commitment. Reduz "no-show". Aumenta ticket médio.' },
        { num: '03', title: 'Conteúdo de autoridade no LinkedIn', body: '1 post/semana sobre seu nicho. Não autoajuda — análise técnica. Constrói credibilidade.' }
      ],
      arquiteto: [
        { num: '01', title: 'Especialize em 1 estilo / segmento', body: '"Casa de praia premium" ou "interiores corporativos C-level" — não "projetos diversos".' },
        { num: '02', title: 'Portfolio com 5 projetos só, super bem fotografados', body: 'Melhor 5 projetos perfeitos do que 30 medianos. Qualidade fotográfica = percepção de valor.' },
        { num: '03', title: 'Cobre por hora consultiva no início', body: 'Antes do projeto fechado, R$300-800/h de consultoria. Filtra quem é cliente real.' }
      ],
      coach: [
        { num: '01', title: 'Mate o "coaching de tudo"', body: 'Ninguém paga premium pra "ajudar pessoas". Especifica resultado: "Founders 6-9 dígitos passando a 7-9".' },
        { num: '02', title: 'Crie seu manifesto em 1 página', body: 'Sua filosofia escrita. Quem te lê e concorda, paga. Quem lê e discorda, sai. Filtra perfeito.' },
        { num: '03', title: 'Sobe o preço do programa em 100%', body: 'Sério. Se você cobra R$5k, vai pra R$10k. Se cobra R$10k, R$20k. O cliente premium NÃO compra pelo menor preço.' }
      ],
      outro: [
        { num: '01', title: 'Defina seu cliente ideal em 1 frase', body: 'Não "todos que precisam". "Especialista em X que fatura entre Y e Z e enfrenta W."' },
        { num: '02', title: 'Mata a página "Sobre" genérica', body: 'Reescreve como manifesto: "Eu acredito que ___. Por isso faço ___. Não atendo quem ___."' },
        { num: '03', title: 'Eleva o preço do serviço principal em 30-50%', body: 'O preço comunica. Cobre menos = pareça menos. A barreira de preço filtra cliente bom.' }
      ]
    };
    return lib[area] || lib.outro;
  }

  // Init
  render();

  // Restart
  if (restartBtn) restartBtn.addEventListener('click', () => {
    answers = {};
    currentIdx = 0;
    stepsEl.style.display = '';
    resultEl.hidden = true;
    render();
    root.scrollIntoView({ behavior: 'smooth' });
  });
})();
