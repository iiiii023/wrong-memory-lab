(() => {
  'use strict';

  const STORAGE = {
    experiment: 'wronglab.experiment.v1',
    analysis: 'wronglab.analysis.v1',
    records: 'wronglab.records.v1'
  };

  const STEPS = [
    { id: 'consent', label: '实验须知' },
    { id: 'baseline', label: '基线测试' },
    { id: 'grouping', label: '随机分组' },
    { id: 'study', label: '学习材料' },
    { id: 'review', label: '复习任务' },
    { id: 'waiting', label: '延迟测试' },
    { id: 'result', label: '结果记录' }
  ];

  const TOPICS = [
    { id: 'conditional', name: '条件推理', summary: '区分“如果”与“只有”带来的充分、必要条件关系。' },
    { id: 'correlation', name: '相关与因果', summary: '相关不自动意味着因果，还要考虑共同原因。' },
    { id: 'median', name: '平均数与中位数', summary: '中位数是排序后位于中间的数，偶数个数据取中间两数平均。' },
    { id: 'percentage', name: '百分比变化', summary: '变化率以原值为分母：(变化后 - 变化前) ÷ 变化前。' },
    { id: 'probability', name: '条件概率', summary: '条件概率的分母是已知条件所限定的群体。' },
    { id: 'sets', name: '集合关系', summary: '子集关系意味着一个集合中的元素都在另一个集合中。' },
    { id: 'counterexample', name: '反例判断', summary: '证明全称命题错误，只需找到一个真实的例外。' },
    { id: 'sampling', name: '样本偏差', summary: '样本来源若系统性地漏掉某些群体，结论外推就会受限。' },
    { id: 'necessity', name: '必要与充分条件', summary: '“只有 A，才 B”表示 B 成立必然有 A 成立。' },
    { id: 'combination', name: '组合计数', summary: '不考虑顺序地从 n 个对象中选 k 个，方法数为 C(n,k)。' }
  ];

  const BASELINE_QUESTIONS = [
    {
      id: 'B01', topic: 'conditional',
      question: '所有参加训练的同学都通过了考核。小林没有通过考核。下列结论必然正确的是？',
      options: ['小林参加了训练', '小林没有参加训练', '训练没有任何作用', '无法作出任何判断'],
      correct: 1
    },
    {
      id: 'B02', topic: 'correlation',
      question: '某校冰淇淋销量与溺水人数呈正相关。以下解释最合理的是？',
      options: ['冰淇淋导致溺水', '溺水导致大家买冰淇淋', '两者可能共同受到季节和气温影响', '统计数字一定存在造假'],
      correct: 2
    },
    {
      id: 'B03', topic: 'median',
      question: '五名同学的成绩由低到高为 62、70、75、80、98。中位数是多少？',
      options: ['70', '75', '77', '80'],
      correct: 1
    },
    {
      id: 'B04', topic: 'percentage',
      question: '某商品原价 80 元，现价 100 元。相对原价，价格上涨了多少？',
      options: ['20%', '25%', '30%', '80%'],
      correct: 1
    },
    {
      id: 'B05', topic: 'probability',
      question: '一个班级有 40 人，其中 25 人喜欢数学、18 人喜欢物理、16 人两者都喜欢。随机选一名喜欢数学的同学，他喜欢物理的概率是？',
      options: ['40%', '45%', '64%', '72%'],
      correct: 2
    },
    {
      id: 'B06', topic: 'sets',
      question: '若集合 A 是集合 B 的子集（A ⊂ B），下列一定正确的是？',
      options: ['A 与 B 没有公共元素', 'B 是 A 的子集', 'A 中所有元素都属于 B', 'A 与 B 完全相同'],
      correct: 2
    },
    {
      id: 'B07', topic: 'counterexample',
      question: '要反驳“所有鸟都会飞”这句话，最合适的是？',
      options: ['蝙蝠会飞', '企鹅是鸟但不会飞', '鱼不会飞', '有些飞机比鸟快'],
      correct: 1
    },
    {
      id: 'B08', topic: 'sampling',
      question: '研究者只在深夜自习室发放“大学生睡眠状况”问卷。主要问题是？',
      options: ['样本可能不能代表全体大学生', '问卷题目一定不能量化', '样本量一定超过总体', '相关分析不能计算'],
      correct: 0
    },
    {
      id: 'B09', topic: 'necessity',
      question: '“只有完成作业，才能参加活动。”根据这句话，以下一定正确的是？',
      options: ['完成作业后就一定能参加活动', '参加活动的人一定完成了作业', '没完成作业也能参加活动', '参加活动的人一定没完成作业'],
      correct: 1
    },
    {
      id: 'B10', topic: 'combination',
      question: '从 4 名同学中选出 2 名代表，不考虑顺序，共有多少种选法？',
      options: ['4', '6', '8', '12'],
      correct: 1
    }
  ];

  const REVIEW_MATERIALS = [
    {
      id: 'R01', topic: 'conditional',
      question: '如果一名学生的校园卡有效，那么他能进入图书馆。已知小周不能进入图书馆，可以推出什么？',
      answer: '小周的校园卡无效。',
      explanation: '原命题“有效 → 能进入”的逆否命题是“不能进入 → 无效”。逆否命题与原命题等价。'
    },
    {
      id: 'R02', topic: 'correlation',
      question: '研究发现，某城市空调销量越高，用电量也越高。能否直接说空调销量导致用电量增加？',
      answer: '不能只凭相关直接断定因果。',
      explanation: '高温可能同时推动空调销量和用电量。相关关系提示变量共同变化，但还要排除共同原因、反向因果等问题。'
    },
    {
      id: 'R03', topic: 'median',
      question: '一组数据为 12、18、21、25、31、40。中位数如何计算？',
      answer: '中位数是 23。',
      explanation: '偶数个数据取中间两项 21 和 25 的平均数：(21+25)÷2=23。'
    },
    {
      id: 'R04', topic: 'percentage',
      question: '某班参与率从 50% 提高到 60%，相对于原来的参与率提高了多少？',
      answer: '提高了 20%。',
      explanation: '百分比变化以原值为分母：(60−50)÷50×100%=20%，而不是直接说提高了 10 个百分点。'
    },
    {
      id: 'R05', topic: 'probability',
      question: '50 名员工中，30 人会开车，20 人会骑自行车，15 人两种都会。随机选一名会开车的人，他也会骑自行车的概率是多少？',
      answer: '50%。',
      explanation: '已知对方会开车，分母应限定为 30 人；两种都会的有 15 人，因此概率为 15÷30=50%。'
    },
    {
      id: 'R06', topic: 'sets',
      question: '如果所有社团成员都是本校学生，那么社团成员集合与学生集合是什么关系？',
      answer: '社团成员集合是本校学生集合的子集。',
      explanation: '社团中的每一个成员都属于本校学生集合，因此前者包含于后者。'
    },
    {
      id: 'R07', topic: 'counterexample',
      question: '有人提出“所有哺乳动物都生活在陆地上”。怎样用反例判断该命题？',
      answer: '可以举鲸或海豚。',
      explanation: '鲸和海豚都是哺乳动物，但生活在水中。一个真实反例即可推翻全称命题。'
    },
    {
      id: 'R08', topic: 'sampling',
      question: '只调查校图书馆读者来估计全校学生的阅读时长，主要风险是什么？',
      answer: '样本可能偏好阅读时间较多的学生。',
      explanation: '样本选择机制与阅读行为有关，得到的结果可能系统性偏高，不能直接代表全校学生。'
    },
    {
      id: 'R09', topic: 'necessity',
      question: '“只有通过体检，才能参加长跑比赛。”如果小陈成功参加了比赛，可以推出什么？',
      answer: '小陈通过了体检。',
      explanation: '“只有 A，才 B”表示 B 是 A 的充分体现；B 成立时，A 一定成立。'
    },
    {
      id: 'R10', topic: 'combination',
      question: '从 5 名候选人中选出 3 人组成小组，不考虑角色和顺序，共有几种选法？',
      answer: '10 种。',
      explanation: '组合数 C(5,3)=5!÷(3!×2!)=10。若考虑顺序，才需要使用排列。'
    }
  ];

  const DELAYED_QUESTIONS = [
    {
      id: 'D01', topic: 'conditional',
      question: '所有红色卡片都在中奖箱中。小吴手中的卡片不在中奖箱中。由此一定能推出？',
      options: ['小吴的卡片是红色', '小吴的卡片不是红色', '红色卡片一定不会中奖', '无法判断卡片颜色'],
      correct: 1
    },
    {
      id: 'D02', topic: 'correlation',
      question: '数据发现，儿童鞋码越大，阅读成绩越高。最合理的解释是？',
      options: ['鞋码直接决定阅读能力', '阅读让脚变大', '年龄可能同时影响鞋码和阅读成绩', '两个变量一定没有关系'],
      correct: 2
    },
    {
      id: 'D03', topic: 'median',
      question: '一组数据为 4、7、8、10、12、15，其中位数是多少？',
      options: ['8', '9', '10', '11'],
      correct: 1
    },
    {
      id: 'D04', topic: 'percentage',
      question: '某路线用时从 120 分钟缩短到 90 分钟。相对原来用时，下降了多少？',
      options: ['20%', '25%', '30%', '75%'],
      correct: 1
    },
    {
      id: 'D05', topic: 'probability',
      question: '100 名学生中，60 人使用手机学习，45 人使用平板学习，30 人两种都用。随机选一名使用手机学习的人，他也使用平板的概率是？',
      options: ['30%', '45%', '50%', '75%'],
      correct: 2
    },
    {
      id: 'D06', topic: 'sets',
      question: '若 C ∩ D = C，以下一定正确的是？',
      options: ['C 是 D 的子集', 'D 是 C 的子集', 'C 与 D 没有交集', 'C 与 D 完全相同'],
      correct: 0
    },
    {
      id: 'D07', topic: 'counterexample',
      question: '要反驳“所有哺乳动物都生活在陆地上”，最合适的是？',
      options: ['鲨鱼生活在水中', '鲸是哺乳动物但生活在水中', '企鹅不会飞', '有些动物既会游泳又会跑'],
      correct: 1
    },
    {
      id: 'D08', topic: 'sampling',
      question: '研究者只调查工作日白天在图书馆的人，并据此估计全校学生的每周阅读时长。最主要的问题是？',
      options: ['样本可能低估或高估不同学生群体', '百分比无法计算', '只要人数超过 30 就没有问题', '相关性一定等于因果关系'],
      correct: 0
    },
    {
      id: 'D09', topic: 'necessity',
      question: '“只有年满 18 岁，才能申请该驾照。”如果小许已经成功申请到该驾照，可以推出？',
      options: ['小许一定超过 30 岁', '小许一定已年满 18 岁', '年满 18 岁的人都已申请', '小许没有参加任何测试'],
      correct: 1
    },
    {
      id: 'D10', topic: 'combination',
      question: '从 5 名同学中选出 3 名参加座谈，不考虑顺序，共有多少种选法？',
      options: ['6', '10', '15', '60'],
      correct: 1
    }
  ];

  const DEMO_ANALYSIS = {
    isDemo: true,
    activePlannedN: 10,
    controlPlannedN: 10,
    activeValidN: 9,
    controlValidN: 10,
    activeTotalQuestions: 90,
    controlTotalQuestions: 100,
    activeWrong: 19,
    controlWrong: 33,
    activeRepeats: 6,
    controlRepeats: 14,
    experimentDate: '2026-05-18',
    delayTime: '7天',
    delayedTestStatus: 'completed'
  };

  const EMPTY_ANALYSIS = {
    isDemo: false,
    activePlannedN: null,
    controlPlannedN: null,
    activeValidN: null,
    controlValidN: null,
    activeTotalQuestions: null,
    controlTotalQuestions: null,
    activeWrong: null,
    controlWrong: null,
    activeRepeats: null,
    controlRepeats: null,
    experimentDate: '',
    delayTime: '',
    delayedTestStatus: 'pending'
  };

  const REVIEW_SECONDS = { demo: 180, formal: 300 };

  const qs = (selector, root = document) => root.querySelector(selector);
  const qsa = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  const escapeHtml = (value) => String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const round1 = (value) => Math.round(value * 10) / 10;
  const percentage = (numerator, denominator) => {
    if (!Number.isFinite(numerator) || !Number.isFinite(denominator) || denominator <= 0) return null;
    return round1((numerator / denominator) * 100);
  };
  const uniqueTopics = (answers, questions) => {
    const wrong = new Set();
    questions.forEach((item, index) => {
      if (answers[item.id] !== item.correct) wrong.add(item.topic);
    });
    return wrong;
  };
  const topicName = (id) => TOPICS.find((item) => item.id === id)?.name || id;
  const formatPercent = (value) => value === null || value === undefined ? '待填写' : value.toFixed(1) + '%';
  const formatNumber = (value) => value === null || value === undefined || value === '' ? '待填写' : Number(value).toLocaleString('zh-CN');
  const formatDateTime = (value) => {
    if (!value) return '待填写';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '待填写';
    return date.toLocaleString('zh-CN', { hour12: false });
  };
  const formatDate = (value) => {
    if (!value) return '待填写';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '待填写';
    return date.toLocaleDateString('zh-CN');
  };
  const nowIso = () => new Date().toISOString();
  const safeParse = (raw, fallback) => {
    if (!raw) return fallback;
    try { return JSON.parse(raw); } catch (error) { return fallback; }
  };
  const loadStore = (key, fallback) => {
    try { return safeParse(localStorage.getItem(key), fallback); } catch (error) { return fallback; }
  };
  const saveStore = (key, value) => {
    try { localStorage.setItem(key, JSON.stringify(value)); return true; }
    catch (error) { return false; }
  };
  const removeStore = (key) => {
    try { localStorage.removeItem(key); } catch (error) {}
  };
  const randomUnit = () => {
    if (window.crypto && typeof window.crypto.getRandomValues === 'function') {
      const values = new Uint32Array(1);
      window.crypto.getRandomValues(values);
      return values[0] / 4294967296;
    }
    return Math.random();
  };
  const randomGroup = () => randomUnit() < 0.5 ? 'recall' : 'reading';
  const groupName = (group) => group === 'recall' ? '主动回忆组' : '被动阅读组';
  const generateAnonymousId = () => {
    const date = new Date();
    const stamp = String(date.getFullYear()).slice(2)
      + String(date.getMonth() + 1).padStart(2, '0')
      + String(date.getDate()).padStart(2, '0');
    const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let suffix = '';
    for (let i = 0; i < 4; i += 1) suffix += alphabet[Math.floor(randomUnit() * alphabet.length)];
    return 'WML-' + stamp + '-' + suffix;
  };

  const createExperimentState = (mode, delayDays) => ({
    version: 1,
    mode,
    stage: 'consent',
    anonymousId: mode === 'formal' ? generateAnonymousId() : '',
    createdAt: nowIso(),
    delayDays: mode === 'formal' ? clamp(Number(delayDays) || 7, 1, 30) : 0,
    reviewDurationSec: REVIEW_SECONDS[mode] || REVIEW_SECONDS.demo,
    consent: false,
    baselineAnswers: {},
    baselineSubmitted: false,
    baselineCorrect: null,
    group: null,
    reviewStartedAt: null,
    reviewCompletedAt: null,
    reviewIndex: 0,
    reviewItems: REVIEW_MATERIALS.map((item) => ({
      id: item.id,
      recallText: '',
      revealed: false,
      completed: false,
      completedAt: null
    })),
    reviewSteps: [],
    delayedAnswers: {},
    delayedSubmitted: false,
    delayedSubmittedAt: null,
    readyAt: null,
    dueAt: null,
    result: null,
    recordSaved: false,
    updatedAt: nowIso()
  });

  let experiment = loadStore(STORAGE.experiment, null);
  let analysis = loadStore(STORAGE.analysis, null) || { ...DEMO_ANALYSIS };
  let records = loadStore(STORAGE.records, []);
  if (!Array.isArray(records)) records = [];
  let reportText = '';
  let reviewTimer = null;
  let countdownTimer = null;

  const saveExperiment = () => {
    if (!experiment) {
      removeStore(STORAGE.experiment);
      return;
    }
    experiment.updatedAt = nowIso();
    saveStore(STORAGE.experiment, experiment);
  };

  const upsertFormalRecord = () => {
    if (!experiment || experiment.mode !== 'formal' || !experiment.anonymousId) return;
    const existingIndex = records.findIndex((item) => item.anonymousId === experiment.anonymousId);
    const record = {
      anonymousId: experiment.anonymousId,
      createdAt: experiment.createdAt,
      updatedAt: nowIso(),
      group: experiment.group,
      groupLabel: experiment.group ? groupName(experiment.group) : '待分组',
      status: experiment.stage,
      stageLabel: STEPS.find((item) => item.id === experiment.stage)?.label || experiment.stage,
      baselineCorrect: experiment.baselineCorrect,
      reviewCompleted: Boolean(experiment.reviewCompletedAt),
      reviewCompletedAt: experiment.reviewCompletedAt,
      dueAt: experiment.dueAt,
      delayedTestStatus: experiment.delayedSubmitted ? 'completed' : (experiment.reviewCompletedAt ? 'pending' : 'not_started'),
      delayedSubmittedAt: experiment.delayedSubmittedAt,
      result: experiment.result,
      noDirectIdentity: true
    };
    if (existingIndex >= 0) records[existingIndex] = { ...records[existingIndex], ...record };
    else records.unshift(record);
    saveStore(STORAGE.records, records);
    renderRecords();
  };

  const exportPayload = (payload, filename, type) => {
    const blob = new Blob([payload], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 500);
  };

  const csvEscape = (value) => {
    const text = value === null || value === undefined ? '' : String(value);
    return '"' + text.replace(/"/g, '""') + '"';
  };
  const toCsv = (headers, rows) => '\uFEFF' + [headers, ...rows]
    .map((row) => row.map(csvEscape).join(','))
    .join('\r\n');

  const showToast = (message, type = 'success') => {
    const region = qs('#toast-region');
    if (!region) return;
    const toast = document.createElement('div');
    toast.className = 'toast' + (type === 'error' ? ' error' : type === 'warning' ? ' warning' : '');
    toast.textContent = message;
    region.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(8px)';
      setTimeout(() => toast.remove(), 220);
    }, 3200);
  };

  const copyText = async (text) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch (error) {}
    try {
      const area = document.createElement('textarea');
      area.value = text;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.select();
      const ok = document.execCommand('copy');
      area.remove();
      return ok;
    } catch (error) { return false; }
  };

  const stageIndex = (stage) => {
    if (stage === 'waiting' || stage === 'delayed') return 5;
    const index = STEPS.findIndex((item) => item.id === stage);
    return index < 0 ? 0 : index;
  };

  const setLabStatus = (title, detail) => {
    const titleNode = qs('#lab-status-title');
    const detailNode = qs('#lab-status-detail');
    if (titleNode) titleNode.textContent = title;
    if (detailNode) detailNode.textContent = detail;
  };

  const renderStepper = () => {
    const root = qs('#lab-stepper');
    if (!root) return;
    const current = experiment ? stageIndex(experiment.stage) : -1;
    root.innerHTML = STEPS.map((step, index) => {
      const className = index < current ? 'complete' : index === current ? 'current' : '';
      const icon = index < current ? '✓' : String(index + 1).padStart(2, '0');
      return `<li class="${className}"><span class="step-dot">${icon}</span><span>${escapeHtml(step.label)}</span></li>`;
    }).join('');
  };

  const modeChooser = () => `
    <div class="stage-kicker">实验开始</div>
    <h2 class="stage-title">选择本次运行模式</h2>
    <p class="stage-lead">即时演示用于检查完整流程；正式延迟测试会锁定测试入口，并要求真实等待预设的延迟时长。两种模式都不会收集姓名、电话或学号。</p>
    <div class="mode-grid">
      <article class="mode-card">
        <span class="mode-icon"><svg class="icon"><use href="#icon-play"></use></svg></span>
        <h2>即时演示模式</h2>
        <p>在一次浏览器会话中完成基线、分组、复习和测试。结果会明确标为即时演示，不能替代长期记忆实验。</p>
        <button class="btn btn-primary" type="button" data-action="start-demo">开始即时演示</button>
      </article>
      <article class="mode-card formal">
        <span class="mode-icon"><svg class="icon"><use href="#icon-clock"></use></svg></span>
        <h2>正式延迟测试模式</h2>
        <p>生成匿名编号并记录时间、分组和测试状态。复习完成后，延迟测试在当前浏览器中锁定到截止时间。</p>
        <label class="formal-delay-field"><span>计划延迟天数（1—30 天）</span><input id="formal-delay-days" type="number" min="1" max="30" step="1" value="7"></label>
        <button class="btn btn-primary" type="button" data-action="start-formal">创建正式实验档案</button>
      </article>
    </div>
    ${experiment && experiment.mode === 'formal' && experiment.stage !== 'result' ? `<div class="resume-panel"><div><strong>检测到未完成的正式实验</strong><p>匿名编号：${escapeHtml(experiment.anonymousId)} · 当前阶段：${escapeHtml(experiment.stage)}</p></div><button class="btn btn-secondary btn-small" type="button" data-action="resume-formal">继续实验</button></div>` : ''}
  `;

  const consentStage = () => `
    <div class="stage-kicker">第 1 步 / 共 7 步</div>
    <h2 class="stage-title">实验须知与自愿参与确认</h2>
    <p class="stage-lead">本实验用于比较两种错题复习方式。预计用时约 15—20 分钟，正式延迟测试需要按方案等待。数据仅用于课程研究，并只保存在你的当前浏览器。</p>
    <div class="info-grid">
      <div class="info-tile"><strong>实验目的</strong><p>比较主动回忆和被动阅读复习对延迟测试错误率及重复错误的影响。</p></div>
      <div class="info-tile"><strong>不收集身份信息</strong><p>不会要求姓名、电话、学号、邮箱或任何可直接识别个人的信息。</p></div>
      <div class="info-tile"><strong>你可以退出</strong><p>参与完全自愿。你可以在任何步骤停止，不会受到任何影响。</p></div>
      <div class="info-tile"><strong>数据保存方式</strong><p>当前静态网站使用 localStorage 暂存在本浏览器，不存在云端自动同步。</p></div>
    </div>
    <div class="consent-list">
      <label class="checkbox-label"><input type="checkbox" data-consent="purpose"><span>我已了解实验目的、预计耗时和数据用途。</span></label>
      <label class="checkbox-label"><input type="checkbox" data-consent="voluntary"><span>我自愿参与，并知道可以随时退出。</span></label>
      <label class="checkbox-label"><input type="checkbox" data-consent="anonymous"><span>我同意提供不含直接身份信息的匿名答题记录。</span></label>
    </div>
    <div class="stage-actions"><span class="form-message" id="consent-error" aria-live="polite"></span><button class="btn btn-primary" type="button" data-action="consent-submit" disabled>同意并进入基线测试</button></div>
  `;

  const renderOptions = (item, selected, prefix) => item.options.map((option, index) => `
    <label class="option-label">
      <input type="radio" name="${prefix}-${item.id}" value="${index}"${selected === index ? ' checked' : ''}>
      <span><strong>${String.fromCharCode(65 + index)}.</strong> ${escapeHtml(option)}</span>
    </label>
  `).join('');

  const renderQuestionCards = (questions, answers, prefix) => questions.map((item, index) => `
    <article class="question-card">
      <div class="question-head"><span class="question-number">第 ${index + 1} 题</span><span class="mini-label">${escapeHtml(topicName(item.topic))}</span></div>
      <h3>${escapeHtml(item.question)}</h3>
      <div class="option-grid">${renderOptions(item, answers[item.id], prefix)}</div>
    </article>
  `).join('');

  const answeredCount = (questions, answers) => questions.filter((item) => Object.prototype.hasOwnProperty.call(answers, item.id)).length;

  const progressMarkup = (current, total) => {
    const value = total ? Math.round((current / total) * 100) : 0;
    return `
      <div class="stage-progress">
        <div class="stage-progress-head"><span>已作答 <strong>${current} / ${total}</strong></span><span>${value}%</span></div>
        <div class="progress-track"><span style="width:${value}%"></span></div>
      </div>
    `;
  };

  const baselineStage = () => {
    const count = answeredCount(BASELINE_QUESTIONS, experiment.baselineAnswers || {});
    return `
      <div class="stage-kicker">第 2 步 / 共 7 步</div>
      <h2 class="stage-title">基线测试</h2>
      <p class="stage-lead">请独立完成下列 10 道基础逻辑与常识题。每题只有一个正确答案；提交前不会显示正确答案，也不会显示你的得分。</p>
      ${progressMarkup(count, BASELINE_QUESTIONS.length)}
      <div class="question-list" id="baseline-question-list">${renderQuestionCards(BASELINE_QUESTIONS, experiment.baselineAnswers || {}, 'baseline')}</div>
      <div class="stage-actions"><span class="form-message" id="baseline-error" aria-live="polite"></span><button class="btn btn-primary" type="button" data-action="submit-baseline"${count === BASELINE_QUESTIONS.length ? '' : ' disabled'}>提交基线测试</button></div>
    `;
  };

  const groupingStage = () => {
    const isRecall = experiment.group === 'recall';
    return `
      <div class="group-reveal">
        <span class="mini-label">随机分组已完成</span>
        <h2>你被分配到：${groupName(experiment.group)}</h2>
        <p>${isRecall ? '复习时你将先隐藏答案，独立尝试回忆，再查看正确答案和解析。' : '复习时你将直接阅读题目、正确答案和解析，并进行统一时长的阅读任务。'}</p>
        ${experiment.mode === 'formal' ? `<span class="group-code"><svg class="icon"><use href="#icon-lock"></use></svg>匿名编号：${escapeHtml(experiment.anonymousId)}</span>` : '<span class="group-code">即时演示 · 本次会话</span>'}
      </div>
      <div class="stage-actions"><button class="btn btn-primary" type="button" data-action="continue-study">进入相同学习材料</button></div>
    `;
  };

  const studyStage = () => `
    <div class="stage-kicker">第 3 步 / 共 7 步</div>
    <h2 class="stage-title">学习相同的错题材料</h2>
    <p class="stage-lead">两组将接触完全相同的 10 个知识点。此处先熟悉题型和知识主题；正确答案将在复习阶段按分组规则出现。</p>
    <div class="study-list">
      ${REVIEW_MATERIALS.map((item, index) => `<article class="study-item"><span>${String(index + 1).padStart(2, '0')}</span><div><strong>${escapeHtml(topicName(item.topic))}</strong><p>${escapeHtml(item.question)}</p></div></article>`).join('')}
    </div>
    <div class="stage-actions"><button class="btn btn-primary" type="button" data-action="continue-review">开始复习任务</button></div>
  `;

  const formatTimer = (seconds) => {
    const safe = Math.max(0, Math.floor(seconds));
    return String(Math.floor(safe / 60)).padStart(2, '0') + ':' + String(safe % 60).padStart(2, '0');
  };

  const reviewStage = () => {
    if (!experiment.reviewStartedAt) {
      return `
        <div class="stage-kicker">第 4 步 / 共 7 步</div>
        <h2 class="stage-title">准备开始统一复习</h2>
        <p class="stage-lead">两组使用相同的复习总时长：即时演示为 3 分钟，正式模式为 5 分钟。计时开始后，请连续完成 10 项任务；计时结束不会抹去已完成记录。</p>
        <div class="info-grid">
          <div class="info-tile"><strong>你的复习方式</strong><p>${experiment.group === 'recall' ? '主动回忆：先作答，再查看答案和解释。' : '被动阅读：直接阅读题目、答案和解释。'}</p></div>
          <div class="info-tile"><strong>完成记录</strong><p>每项任务点击“我已完成回忆”或“我已经阅读”后会留下时间记录。</p></div>
        </div>
        <div class="stage-actions"><button class="btn btn-primary" type="button" data-action="review-start">开始计时并进入复习</button></div>
      `;
    }

    const item = REVIEW_MATERIALS[experiment.reviewIndex];
    const itemState = experiment.reviewItems[experiment.reviewIndex];
    const isRecall = experiment.group === 'recall';
    const counter = experiment.reviewIndex + 1;
    const card = isRecall ? `
      <article class="review-card">
        <span class="mini-label">${escapeHtml(topicName(item.topic))}</span>
        <h3>${escapeHtml(item.question)}</h3>
        ${!itemState.revealed ? `
          <label class="sr-only" for="recall-answer">写下你的回忆答案</label>
          <textarea class="answer-input" id="recall-answer" placeholder="先不要看答案，写下你能回忆出的答案或关键步骤……"></textarea>
          <div class="stage-actions"><button class="btn btn-primary" type="button" data-action="recall-reveal">提交回忆并查看答案</button></div>
        ` : `
          <div class="review-answer"><strong>正确答案：</strong><p>${escapeHtml(item.answer)}</p><strong>解析：</strong><p>${escapeHtml(item.explanation)}</p></div>
          <div class="stage-actions"><button class="btn btn-primary" type="button" data-action="review-complete">我已完成回忆</button></div>
        `}
      </article>
    ` : `
      <article class="review-card passive">
        <span class="mini-label">${escapeHtml(topicName(item.topic))}</span>
        <h3>${escapeHtml(item.question)}</h3>
        <div class="review-answer"><strong>正确答案：</strong><p>${escapeHtml(item.answer)}</p><strong>解析：</strong><p>${escapeHtml(item.explanation)}</p></div>
        <div class="stage-actions"><button class="btn btn-primary" type="button" data-action="review-complete">我已经阅读</button></div>
      </article>
    `;

    return `
      <div class="stage-kicker">第 4 步 / 共 7 步</div>
      <div class="timer-band"><div class="timer-copy"><svg class="icon"><use href="#icon-clock"></use></svg><div><small>统一复习计时</small><strong>${experiment.mode === 'formal' ? '正式模式 5 分钟' : '即时演示 3 分钟'}</strong></div></div><span class="timer-value" id="review-timer">--:--</span></div>
      <div class="review-progress"><span>复习进度 <strong>${counter} / ${REVIEW_MATERIALS.length}</strong></span><span>${isRecall ? '先回忆 · 后查看' : '阅读 · 理解 · 标记完成'}</span></div>
      <div class="review-shell">${card}</div>
    `;
  };

  const delayedLockStage = () => {
    const dueAt = experiment.dueAt ? new Date(experiment.dueAt) : null;
    const dueText = dueAt ? dueAt.toLocaleString('zh-CN', { hour12: false }) : '待生成';
    return `
      <div class="delayed-lock">
        <span class="lock-icon"><svg class="icon"><use href="#icon-lock"></use></svg></span>
        <h2>延迟测试已锁定</h2>
        <p>正式实验不能在复习结束时立刻完成测试。当前入口将在计划截止时间后开放，不会通过普通倒计时冒充长期记忆实验。</p>
        <div class="countdown-grid" id="formal-countdown"><div><strong>--</strong><span>天</span></div><div><strong>--</strong><span>小时</span></div><div><strong>--</strong><span>分钟</span></div><div><strong>--</strong><span>秒</span></div></div>
        <p><strong>计划开放时间：</strong>${escapeHtml(dueText)}</p>
        <div class="stage-actions" style="justify-content:center"><button class="btn btn-secondary" type="button" data-action="export-current-json"><svg class="icon"><use href="#icon-download"></use></svg>导出当前匿名档案</button><button class="btn btn-primary" type="button" data-action="enter-delayed" disabled>等待延迟结束</button></div>
      </div>
    `;
  };

  const delayedTestStage = () => {
    const count = answeredCount(DELAYED_QUESTIONS, experiment.delayedAnswers || {});
    const immediateNote = experiment.mode === 'demo'
      ? '当前为即时演示模式，测试结果只能用于检查流程，不能作为一周后长期记忆的真实结果。'
      : '你已完成真实延迟等待。测试题与复习材料使用相同知识点，但题面与选项不同。';
    return `
      <div class="stage-kicker">第 5 步 / 共 7 步</div>
      <h2 class="stage-title">延迟测试</h2>
      <p class="stage-lead">两组使用完全相同的 10 道题。提交前不显示答案，每题只能选择一个选项。</p>
      <div class="test-warning"><svg class="icon"><use href="#icon-info"></use></svg><p>${escapeHtml(immediateNote)}</p></div>
      ${progressMarkup(count, DELAYED_QUESTIONS.length)}
      <div class="question-list">${renderQuestionCards(DELAYED_QUESTIONS, experiment.delayedAnswers || {}, 'delayed')}</div>
      <div class="stage-actions"><span class="form-message" id="delayed-error" aria-live="polite"></span><button class="btn btn-primary" type="button" data-action="submit-delayed"${count === DELAYED_QUESTIONS.length ? '' : ' disabled'}>提交并自动评分</button></div>
    `;
  };

  const resultStage = () => {
    const result = experiment.result;
    if (!result) return '<p>结果记录异常，请重置实验后重试。</p>';
    const detailRows = result.repeatDetails.map((item, index) => `
      <tr>
        <td>${index + 1}</td><td>${escapeHtml(topicName(item.topic))}</td>
        <td class="${item.baselineWrong ? 'wrong' : 'correct'}">${item.baselineWrong ? '错误' : '正确'}</td>
        <td class="${item.delayedWrong ? 'wrong' : 'correct'}">${item.delayedWrong ? '错误' : '正确'}</td>
        <td class="${item.repeated ? 'repeat' : ''}">${item.repeated ? '重复错误' : '未重复'}</td>
      </tr>
    `).join('');
    return `
      <div class="result-hero"><div><span class="mini-label">评分完成</span><h2>本次实验记录已生成</h2><p>${experiment.mode === 'formal' ? '匿名编号：' + escapeHtml(experiment.anonymousId) + ' · ' : '即时演示 · '}${groupName(experiment.group)}</p></div><div class="result-seal">完成</div></div>
      <div class="result-metrics">
        <div><span>测试总题数</span><strong>${result.total}</strong></div>
        <div><span>答错题数</span><strong>${result.wrong}</strong></div>
        <div><span>正确率</span><strong>${result.correctRate.toFixed(1)}%</strong></div>
        <div><span>重复错误</span><strong>${result.repeated}</strong></div>
      </div>
      <div class="repeat-rule"><strong>重复错误定义：</strong>只有同一知识点的基线题和延迟测试题都作答错误，才计为重复错误。该参与者本次共识别出 ${result.repeated} 个重复错误。</div>
      <table class="answer-review"><thead><tr><th>#</th><th>知识点</th><th>基线</th><th>延迟测试</th><th>判定</th></tr></thead><tbody>${detailRows}</tbody></table>
      <div class="stage-actions"><button class="btn btn-primary" type="button" data-action="export-result-json"><svg class="icon"><use href="#icon-download"></use></svg>导出本次 JSON</button><button class="btn btn-secondary" type="button" data-action="export-result-csv">导出本次 CSV</button><button class="text-button" type="button" data-action="show-reset-dialog"><svg class="icon"><use href="#icon-reset"></use></svg>重新开始</button></div>
    `;
  };

  const renderExperiment = () => {
    if (reviewTimer) window.clearInterval(reviewTimer);
    if (countdownTimer) window.clearInterval(countdownTimer);
    reviewTimer = null;
    countdownTimer = null;
    renderStepper();
    const stage = qs('#experiment-stage');
    if (!stage) return;
    if (!experiment) {
      setLabStatus('等待开始', '请先选择运行模式');
      stage.innerHTML = modeChooser();
      return;
    }
    const statusMap = {
      consent: ['知情同意', experiment.mode === 'formal' ? experiment.anonymousId : '即时演示模式'],
      baseline: ['基线测试', '提交前不会显示正确答案'],
      grouping: ['随机分组', groupName(experiment.group)],
      study: ['学习材料', '两组使用相同错题知识点'],
      review: ['复习任务', experiment.group === 'recall' ? '先回忆，再查看答案' : '阅读题目、答案与解析'],
      waiting: ['延迟测试锁定', '请在截止时间后返回当前浏览器'],
      delayed: ['延迟测试', '10 道题 · 提交后自动评分'],
      result: ['结果记录', '已完成评分与匿名导出']
    };
    const status = statusMap[experiment.stage] || ['进行中', ''];
    setLabStatus(status[0], status[1]);
    const renderers = {
      consent: consentStage,
      baseline: baselineStage,
      grouping: groupingStage,
      study: studyStage,
      review: reviewStage,
      waiting: delayedLockStage,
      delayed: delayedTestStage,
      result: resultStage
    };
    stage.innerHTML = (renderers[experiment.stage] || modeChooser)();
    if (experiment.stage === 'review' && experiment.reviewStartedAt) startReviewTimer();
    if (experiment.stage === 'waiting') startFormalCountdown();
  };

  const startReviewTimer = () => {
    const output = qs('#review-timer');
    if (!output) return;
    const update = () => {
      if (!output.isConnected) return;
      const elapsed = Math.floor((Date.now() - new Date(experiment.reviewStartedAt).getTime()) / 1000);
      const remaining = experiment.reviewDurationSec - elapsed;
      output.textContent = formatTimer(Math.max(0, remaining));
      if (remaining < 0) {
        const copy = qs('.timer-copy small');
        if (copy) copy.textContent = '已超过统一时长，可继续完成记录';
      }
    };
    update();
    reviewTimer = window.setInterval(update, 1000);
  };

  const startFormalCountdown = () => {
    const root = qs('#formal-countdown');
    const button = qs('[data-action="enter-delayed"]');
    if (!root || !button) return;
    const update = () => {
      if (!root.isConnected) return;
      const remaining = Math.max(0, new Date(experiment.dueAt).getTime() - Date.now());
      const totalSeconds = Math.floor(remaining / 1000);
      const days = Math.floor(totalSeconds / 86400);
      const hours = Math.floor((totalSeconds % 86400) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      const values = root.querySelectorAll('strong');
      if (values.length === 4) {
        values[0].textContent = days;
        values[1].textContent = String(hours).padStart(2, '0');
        values[2].textContent = String(minutes).padStart(2, '0');
        values[3].textContent = String(seconds).padStart(2, '0');
      }
      if (remaining <= 0) {
        button.disabled = false;
        button.textContent = '进入延迟测试';
      }
    };
    update();
    countdownTimer = window.setInterval(update, 1000);
  };

  const recordReviewStep = (action, itemId) => {
    experiment.reviewSteps.push({ action, itemId, at: nowIso() });
  };

  const scrollLabIntoView = () => {
    const lab = qs('#lab');
    if (lab) lab.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const completeReview = () => {
    const completedAt = nowIso();
    experiment.reviewCompletedAt = completedAt;
    experiment.readyAt = completedAt;
    if (experiment.mode === 'formal') {
      experiment.dueAt = new Date(new Date(completedAt).getTime() + experiment.delayDays * 86400000).toISOString();
      experiment.stage = 'waiting';
    } else {
      experiment.dueAt = completedAt;
      experiment.stage = 'delayed';
    }
    saveExperiment();
    upsertFormalRecord();
    renderExperiment();
    scrollLabIntoView();
  };

  const calculateResult = () => {
    const baselineWrongTopics = uniqueTopics(experiment.baselineAnswers, BASELINE_QUESTIONS);
    const delayedWrongTopics = uniqueTopics(experiment.delayedAnswers, DELAYED_QUESTIONS);
    const repeatDetails = DELAYED_QUESTIONS.map((item, index) => {
      const baselineQuestion = BASELINE_QUESTIONS[index];
      const baselineWrong = experiment.baselineAnswers[baselineQuestion.id] !== baselineQuestion.correct;
      const delayedWrong = experiment.delayedAnswers[item.id] !== item.correct;
      return {
        topic: item.topic,
        baselineWrong,
        delayedWrong,
        repeated: baselineWrong && delayedWrong && baselineWrongTopics.has(item.topic) && delayedWrongTopics.has(item.topic)
      };
    });
    const wrong = DELAYED_QUESTIONS.filter((item) => experiment.delayedAnswers[item.id] !== item.correct).length;
    const repeated = repeatDetails.filter((item) => item.repeated).length;
    return {
      total: DELAYED_QUESTIONS.length,
      correct: DELAYED_QUESTIONS.length - wrong,
      wrong,
      correctRate: round1(((DELAYED_QUESTIONS.length - wrong) / DELAYED_QUESTIONS.length) * 100),
      errorRate: round1((wrong / DELAYED_QUESTIONS.length) * 100),
      repeated,
      repeatDetails,
      baselineCorrect: BASELINE_QUESTIONS.filter((item) => experiment.baselineAnswers[item.id] === item.correct).length,
      group: experiment.group,
      anonymousId: experiment.anonymousId,
      completedAt: nowIso()
    };
  };

  const showStageError = (id, message) => {
    const node = qs('#' + id);
    if (node) node.textContent = message;
    showToast(message, 'error');
  };

  const handleExperimentClick = (action) => {
    if (action === 'start-demo') {
      experiment = createExperimentState('demo', 0);
      saveExperiment();
      renderExperiment();
      scrollLabIntoView();
      return;
    }
    if (action === 'start-formal') {
      const input = qs('#formal-delay-days');
      const days = clamp(Number(input?.value) || 7, 1, 30);
      experiment = createExperimentState('formal', days);
      saveExperiment();
      renderExperiment();
      scrollLabIntoView();
      showToast('正式实验档案已创建：' + experiment.anonymousId);
      return;
    }
    if (action === 'resume-formal') {
      renderExperiment();
      scrollLabIntoView();
      return;
    }
    if (!experiment) return;
    if (action === 'consent-submit') {
      const checks = qsa('[data-consent]');
      if (!checks.every((input) => input.checked)) {
        showStageError('consent-error', '请完成三项确认后再进入实验。');
        return;
      }
      experiment.consent = true;
      experiment.stage = 'baseline';
      saveExperiment();
      renderExperiment();
      return;
    }
    if (action === 'submit-baseline') {
      if (answeredCount(BASELINE_QUESTIONS, experiment.baselineAnswers) !== BASELINE_QUESTIONS.length) {
        showStageError('baseline-error', '请完成全部 10 道题后再提交。');
        return;
      }
      experiment.baselineCorrect = BASELINE_QUESTIONS.filter((item) => experiment.baselineAnswers[item.id] === item.correct).length;
      experiment.baselineSubmitted = true;
      experiment.group = randomGroup();
      experiment.stage = 'grouping';
      saveExperiment();
      upsertFormalRecord();
      renderExperiment();
      return;
    }
    if (action === 'continue-study') {
      experiment.stage = 'study';
      saveExperiment();
      renderExperiment();
      return;
    }
    if (action === 'continue-review') {
      experiment.stage = 'review';
      experiment.reviewIndex = 0;
      saveExperiment();
      renderExperiment();
      return;
    }
    if (action === 'review-start') {
      experiment.reviewStartedAt = nowIso();
      recordReviewStep('review_started', 'all');
      saveExperiment();
      renderExperiment();
      return;
    }
    if (action === 'recall-reveal') {
      const textarea = qs('#recall-answer');
      const value = textarea ? textarea.value.trim() : '';
      if (!value) {
        showToast('请先写下至少一条回忆内容，再查看答案。', 'warning');
        textarea?.focus();
        return;
      }
      const itemState = experiment.reviewItems[experiment.reviewIndex];
      itemState.recallText = value;
      itemState.revealed = true;
      recordReviewStep('recall_revealed', REVIEW_MATERIALS[experiment.reviewIndex].id);
      saveExperiment();
      renderExperiment();
      return;
    }
    if (action === 'review-complete') {
      const itemState = experiment.reviewItems[experiment.reviewIndex];
      itemState.completed = true;
      itemState.completedAt = nowIso();
      recordReviewStep(experiment.group === 'recall' ? 'recall_completed' : 'reading_completed', REVIEW_MATERIALS[experiment.reviewIndex].id);
      if (experiment.reviewIndex >= REVIEW_MATERIALS.length - 1) completeReview();
      else {
        experiment.reviewIndex += 1;
        saveExperiment();
        renderExperiment();
      }
      return;
    }
    if (action === 'enter-delayed') {
      if (!experiment.dueAt || new Date(experiment.dueAt).getTime() > Date.now()) {
        showToast('尚未到达计划的延迟测试时间。', 'warning');
        return;
      }
      experiment.stage = 'delayed';
      saveExperiment();
      upsertFormalRecord();
      renderExperiment();
      return;
    }
    if (action === 'submit-delayed') {
      if (answeredCount(DELAYED_QUESTIONS, experiment.delayedAnswers) !== DELAYED_QUESTIONS.length) {
        showStageError('delayed-error', '请完成全部 10 道题后再提交。');
        return;
      }
      experiment.result = calculateResult();
      experiment.delayedSubmitted = true;
      experiment.delayedSubmittedAt = nowIso();
      experiment.stage = 'result';
      saveExperiment();
      upsertFormalRecord();
      renderExperiment();
      return;
    }
    if (action === 'export-current-json') {
      if (experiment?.mode === 'formal') exportPayload(JSON.stringify(experiment, null, 2), experiment.anonymousId + '-current.json', 'application/json;charset=utf-8');
      return;
    }
    if (action === 'export-current-csv') {
      if (experiment?.mode === 'formal') {
        const payload = toCsv(['anonymousId', 'stage', 'group', 'createdAt', 'reviewCompletedAt', 'dueAt', 'delayedTestStatus'], [[experiment.anonymousId, experiment.stage, experiment.group || '', experiment.createdAt, experiment.reviewCompletedAt || '', experiment.dueAt || '', experiment.delayedSubmitted ? 'completed' : 'pending']]);
        exportPayload(payload, experiment.anonymousId + '-current.csv', 'text/csv;charset=utf-8');
      }
      return;
    }
    if (action === 'export-result-json') {
      exportPayload(JSON.stringify({ experiment: experiment.result, answers: experiment.delayedAnswers, mode: experiment.mode, anonymousId: experiment.anonymousId }, null, 2), (experiment.anonymousId || 'demo') + '-result.json', 'application/json;charset=utf-8');
      return;
    }
    if (action === 'export-result-csv') {
      const result = experiment.result;
      const rows = result.repeatDetails.map((item, index) => [index + 1, topicName(item.topic), item.baselineWrong ? 1 : 0, item.delayedWrong ? 1 : 0, item.repeated ? 1 : 0]);
      exportPayload(toCsv(['题目序号', '知识点', '基线错误', '延迟测试错误', '重复错误'], rows), (experiment.anonymousId || 'demo') + '-result.csv', 'text/csv;charset=utf-8');
      return;
    }
  };

  const handleTestChange = (input) => {
    const match = (input.name || '').match(/^(baseline|delayed)-(.+)$/);
    if (!match) return;
    const type = match[1];
    const questionId = match[2];
    if (type === 'baseline') experiment.baselineAnswers[questionId] = Number(input.value);
    if (type === 'delayed') experiment.delayedAnswers[questionId] = Number(input.value);
    saveExperiment();
    const questions = type === 'baseline' ? BASELINE_QUESTIONS : DELAYED_QUESTIONS;
    const answers = type === 'baseline' ? experiment.baselineAnswers : experiment.delayedAnswers;
    const count = answeredCount(questions, answers);
    const stage = qs('#experiment-stage');
    const progress = qs('.stage-progress', stage);
    if (progress) {
      const head = progress.querySelector('.stage-progress-head');
      const track = progress.querySelector('.progress-track span');
      if (head) head.innerHTML = '已作答 <strong>' + count + ' / ' + questions.length + '</strong>';
      if (track) track.style.width = Math.round((count / questions.length) * 100) + '%';
    }
    const button = qs('[data-action="submit-' + type + '"]');
    if (button) button.disabled = count !== questions.length;
  };

  const handleExperimentChange = (event) => {
    const target = event.target;
    if (target.matches('[data-consent]')) {
      const all = qsa('[data-consent]').every((input) => input.checked);
      const button = qs('[data-action="consent-submit"]');
      if (button) button.disabled = !all;
      const error = qs('#consent-error');
      if (error) error.textContent = '';
      return;
    }
    if (target.matches('input[type="radio"][name^="baseline-"], input[type="radio"][name^="delayed-"]')) handleTestChange(target);
  };

  const numericAnalysisKeys = [
    'activePlannedN', 'controlPlannedN', 'activeValidN', 'controlValidN',
    'activeTotalQuestions', 'controlTotalQuestions', 'activeWrong', 'controlWrong',
    'activeRepeats', 'controlRepeats'
  ];

  const hasMeaningfulAnalysis = () => {
    const hasNumber = numericAnalysisKeys.some((key) => analysis[key] !== null && analysis[key] !== '' && Number.isFinite(Number(analysis[key])));
    const hasMeta = Boolean(analysis.experimentDate || analysis.delayTime);
    return hasNumber || hasMeta;
  };

  const validateAnalysis = () => {
    const issues = [];
    const values = {};
    numericAnalysisKeys.forEach((key) => {
      const raw = analysis[key];
      if (raw === null || raw === '' || raw === undefined) {
        values[key] = null;
        return;
      }
      const number = Number(raw);
      values[key] = number;
      if (!Number.isFinite(number) || !Number.isInteger(number)) issues.push(key + ' 必须是整数。');
      if (number < 0) issues.push(key + ' 不能为负数。');
    });
    Object.entries(values).forEach(([key, value]) => {
      const max = key.includes('TotalQuestions') || key.includes('Wrong') || key.includes('Repeats') ? 1000000 : 10000;
      if (value !== null && value > max) issues.push(key + ' 超出合理范围。');
    });
    ['active', 'control'].forEach((group) => {
      const label = group === 'active' ? '主动回忆组' : '被动阅读组';
      const planned = values[group + 'PlannedN'];
      const valid = values[group + 'ValidN'];
      const total = values[group + 'TotalQuestions'];
      const wrong = values[group + 'Wrong'];
      const repeats = values[group + 'Repeats'];
      if (planned !== null && valid !== null && valid > planned) issues.push(label + '有效人数不能大于计划人数。');
      if (total !== null && total <= 0) issues.push(label + '测试总题数必须大于 0。');
      if (total !== null && wrong !== null && wrong > total) issues.push(label + '答错题数不能大于测试总题数。');
      if (wrong !== null && repeats !== null && repeats > wrong) issues.push(label + '重复错误数不能大于答错题数。');
      if (valid !== null && total !== null && valid > 0 && total < valid) issues.push(label + '测试总题数不应小于有效人数。');
    });
    const activeRate = percentage(values.activeWrong, values.activeTotalQuestions);
    const controlRate = percentage(values.controlWrong, values.controlTotalQuestions);
    return {
      valid: issues.length === 0,
      issues: Array.from(new Set(issues)),
      values,
      activeRate,
      controlRate,
      activeCorrectRate: activeRate === null ? null : round1(100 - activeRate),
      controlCorrectRate: controlRate === null ? null : round1(100 - controlRate),
      difference: activeRate === null || controlRate === null ? null : round1(controlRate - activeRate),
      repeatTotal: values.activeRepeats === null || values.controlRepeats === null ? null : values.activeRepeats + values.controlRepeats
    };
  };

  const initializeAnalysisForm = () => {
    qsa('[data-analysis]').forEach((input) => {
      const value = analysis[input.dataset.analysis];
      input.value = value === null || value === undefined ? '' : value;
    });
  };

  const sourceState = () => {
    if (analysis.isDemo) return { className: '', label: '演示数据' };
    if (!hasMeaningfulAnalysis()) return { className: 'empty', label: '等待录入' };
    return { className: 'real', label: '用户录入数据' };
  };

  const chartRow = (label, value, display, className, maxValue) => {
    const safeValue = Number.isFinite(value) ? clamp(value, 0, maxValue) : 0;
    const width = maxValue > 0 ? Math.min(100, (safeValue / maxValue) * 100) : 0;
    return `<div class="bar-row ${className}"><span class="bar-label">${escapeHtml(label)}</span><span class="bar-track"><span class="bar-fill" style="width:${width}%"></span></span><strong class="bar-value">${escapeHtml(display)}</strong></div>`;
  };

  const sampleRow = (label, planned, valid, className, maxValue) => {
    const planWidth = planned === null ? 0 : Math.min(100, (planned / maxValue) * 100);
    const validWidth = valid === null ? 0 : Math.min(100, (valid / maxValue) * 100);
    return `
      <div class="sample-row ${className}">
        <div class="sample-row-head"><span>${escapeHtml(label)}</span><strong>有效 ${valid === null ? '待填写' : valid} / 计划 ${planned === null ? '待填写' : planned}</strong></div>
        <div class="sample-track"><span class="sample-plan" style="width:${planWidth}%"></span><span class="sample-valid" style="width:${validWidth}%"></span></div>
      </div>
    `;
  };

  const updateMetric = (id, value, detail) => {
    const valueNode = qs('#' + id);
    if (valueNode) valueNode.textContent = value;
    if (detail !== undefined) {
      let detailId = id;
      if (id === 'metric-active-rate') detailId = 'metric-active-detail';
      if (id === 'metric-control-rate') detailId = 'metric-control-detail';
      if (id === 'metric-difference') detailId = 'metric-difference-detail';
      if (id === 'metric-repeat-total') detailId = 'metric-repeat-detail';
      const detailNode = qs('#' + detailId);
      if (detailNode) detailNode.textContent = detail;
    }
  };

  const renderAnalysis = () => {
    const model = validateAnalysis();
    const values = model.values;
    const status = sourceState();
    const chip = qs('#data-source-chip');
    if (chip) {
      chip.className = 'data-source-chip ' + status.className;
      chip.innerHTML = '<span></span>' + escapeHtml(status.label);
    }
    const notice = qs('#demo-notice');
    if (notice) notice.hidden = !analysis.isDemo;

    const activeRateText = formatPercent(model.activeRate);
    const controlRateText = formatPercent(model.controlRate);
    const differenceText = model.difference === null ? '待填写' : (model.difference > 0 ? '+' : '') + model.difference.toFixed(1) + '%';
    let differenceDetail = '等待两组分母有效后计算';
    if (model.difference !== null) {
      if (model.difference > 0) differenceDetail = '本次录入数据中主动回忆组错误率更低';
      else if (model.difference < 0) differenceDetail = '本次录入数据中主动回忆组错误率更高';
      else differenceDetail = '本次录入数据中两组错误率相同';
    }
    updateMetric('metric-active-rate', activeRateText, values.activeWrong === null || values.activeTotalQuestions === null ? '待填写' : values.activeWrong + ' / ' + values.activeTotalQuestions);
    updateMetric('metric-control-rate', controlRateText, values.controlWrong === null || values.controlTotalQuestions === null ? '待填写' : values.controlWrong + ' / ' + values.controlTotalQuestions);
    updateMetric('metric-difference', differenceText, differenceDetail);
    updateMetric('metric-repeat-total', model.repeatTotal === null ? '待填写' : String(model.repeatTotal), '主动 ' + (values.activeRepeats === null ? '待填写' : values.activeRepeats) + ' · 被动 ' + (values.controlRepeats === null ? '待填写' : values.controlRepeats));

    const errorChart = qs('#error-rate-chart');
    if (errorChart) errorChart.innerHTML = chartRow('主动回忆组', model.activeRate, activeRateText, '', 100) + chartRow('被动阅读组', model.controlRate, controlRateText, 'reading', 100);
    const correctChart = qs('#correct-rate-chart');
    if (correctChart) correctChart.innerHTML = chartRow('主动回忆组', model.activeCorrectRate, formatPercent(model.activeCorrectRate), 'correct', 100) + chartRow('被动阅读组', model.controlCorrectRate, formatPercent(model.controlCorrectRate), 'correct reading', 100);
    const repeatChart = qs('#repeat-chart');
    if (repeatChart) {
      const repeatMax = Math.max(values.activeRepeats || 0, values.controlRepeats || 0, 1);
      repeatChart.innerHTML = chartRow('主动回忆组', values.activeRepeats, values.activeRepeats === null ? '待填写' : String(values.activeRepeats), 'repeat', repeatMax) + chartRow('被动阅读组', values.controlRepeats, values.controlRepeats === null ? '待填写' : String(values.controlRepeats), 'repeat reading-repeat', repeatMax);
    }
    const sampleChart = qs('#sample-chart');
    if (sampleChart) {
      const sampleMax = Math.max(values.activePlannedN || 0, values.controlPlannedN || 0, values.activeValidN || 0, values.controlValidN || 0, 1);
      sampleChart.innerHTML = sampleRow('主动回忆组', values.activePlannedN, values.activeValidN, 'active', sampleMax) + sampleRow('被动阅读组', values.controlPlannedN, values.controlValidN, 'control', sampleMax) + '<div class="sample-legend"><span><i></i>计划人数</span><span><i></i>有效测试人数</span></div>';
    }
    const panel = qs('#validation-panel');
    if (panel) {
      if (model.issues.length) {
        panel.classList.add('visible');
        panel.innerHTML = '<strong>请修正以下数据问题：</strong><ul>' + model.issues.map((issue) => '<li>' + escapeHtml(issue) + '</li>').join('') + '</ul>';
      } else {
        panel.classList.remove('visible');
        panel.innerHTML = '';
      }
    }
  };

  const reportSection = (title, html, text) => ({ title, html, text });

  const buildReportModel = () => {
    const model = validateAnalysis();
    const values = model.values;
    const generatedAt = new Date();
    const isDemo = Boolean(analysis.isDemo);
    const delayedPending = analysis.delayedTestStatus !== 'completed';
    const baseTitle = '错题记忆实验室：主动回忆与被动阅读对重复错误率的影响';
    const title = (isDemo ? '【模拟数据示例，不可作为真实实验结论】' : '') + baseTitle;
    const planText = values.activePlannedN === null && values.controlPlannedN === null ? '待填写' : '主动回忆组 ' + formatNumber(values.activePlannedN) + ' 人，被动阅读组 ' + formatNumber(values.controlPlannedN) + ' 人';
    const validText = values.activeValidN === null && values.controlValidN === null ? '待填写' : '主动回忆组 ' + formatNumber(values.activeValidN) + ' 人，被动阅读组 ' + formatNumber(values.controlValidN) + ' 人';
    const dateText = analysis.experimentDate ? formatDate(analysis.experimentDate) : '待填写';
    const delayText = analysis.delayTime || '待填写';
    const activeRateText = formatPercent(model.activeRate);
    const controlRateText = formatPercent(model.controlRate);
    const differenceText = model.difference === null ? '待填写' : (model.difference > 0 ? '+' : '') + model.difference.toFixed(1) + '个百分点';
    const repeatText = model.repeatTotal === null ? '待填写' : String(model.repeatTotal);
    const activeRepeatText = values.activeRepeats === null ? '待填写' : String(values.activeRepeats);
    const controlRepeatText = values.controlRepeats === null ? '待填写' : String(values.controlRepeats);

    let discussion = '尚未获得完整的延迟测试结果，当前不能比较两组错误率。';
    let conclusion = delayedPending ? '尚未获得延迟测试结果，因此不能对主要研究假设作出结果性结论。' : '两组描述性错误率尚未形成完整比较。';
    if (model.difference !== null && !delayedPending) {
      if (model.difference > 0) {
        discussion = '在本页面录入的数据中，被动阅读组错误率减去主动回忆组错误率的差值为 ' + differenceText + '，主动回忆组错误率较低。该方向与主要研究假设一致，但当前比较仍是描述性的。';
        conclusion = '本次录入数据显示主动回忆组错误率较低，方向与主要研究假设一致。由于未进行统计显著性检验，且样本、测量与实施过程可能存在误差，不能仅凭这一差值断言两种复习方式存在因果关系或统计显著差异。';
      } else if (model.difference < 0) {
        discussion = '在本页面录入的数据中，被动阅读组错误率减去主动回忆组错误率的差值为 ' + differenceText + '，主动回忆组错误率较高。该结果与主要研究假设方向不一致，需要检查实验执行、样本特征和测量工具。';
        conclusion = '本次录入数据未呈现主要研究假设所预期的方向。该结果仍属描述性比较，不能直接判定真实总体中的因果效应。';
      } else {
        discussion = '两组错误率差值为 0 个百分点，本次录入数据中未观察到差异。';
        conclusion = '本次录入数据显示两组错误率相同，但没有显著性检验，不能据此推断总体不存在差异。';
      }
    }
    if (isDemo) {
      discussion = '当前使用模拟数据进行功能演示，不能据此评价主动回忆的真实效果。';
      conclusion = '【模拟数据示例，不可作为真实实验结论】本报告仅用于演示计算与排版流程。';
    }
    if (delayedPending) discussion += ' 当前延迟测试状态为“尚未完成”，结果区不能视为正式延迟测试结果。';
    if (model.issues.length) discussion += ' 数据校验仍存在问题：' + model.issues.join('；') + '。';

    const tableRows = [
      ['主动回忆组', formatNumber(values.activeValidN), formatNumber(values.activeTotalQuestions), formatNumber(values.activeWrong), activeRateText, activeRepeatText],
      ['被动阅读组', formatNumber(values.controlValidN), formatNumber(values.controlTotalQuestions), formatNumber(values.controlWrong), controlRateText, controlRepeatText]
    ];
    const tableHtml = `<table class="report-table"><thead><tr><th>组别</th><th>有效人数</th><th>测试总题数</th><th>答错题数</th><th>错误率</th><th>重复错误数</th></tr></thead><tbody>${tableRows.map((row) => `<tr>${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
    const sections = [
      reportSection('1. 实验名称', `<p>${escapeHtml(baseTitle)}</p>`, baseTitle),
      reportSection('2. 研究背景', '`<p>学生可能在一段时间后忘记曾经做错的题目。错题本若只经过被动阅读，可能产生“已经会了”的熟悉感，却不一定能在延迟测试中重新提取正确知识。因此，本研究比较不同复习方式是否会影响延迟测试中的重复错误率。</p>`'.split('`').join('\u0060'), '学生可能在一段时间后忘记曾经做错的题目。本研究比较不同复习方式是否会影响延迟测试中的重复错误率。'),
      reportSection('3. 三个相互独立的研究假设', '<ol><li>在其他条件相同的情况下，较短的复习间隔与较低的延迟测试错误率相关。</li><li>与仅查看正确答案相比，分析并记录错误原因能够降低后续同类题目的重复错误率。</li><li>与被动阅读相比，主动回忆复习能够降低延迟测试中的重复错误率。</li></ol>', 'H1：在其他条件相同的情况下，较短的复习间隔与较低的延迟测试错误率相关。\nH2：与仅查看正确答案相比，分析并记录错误原因能够降低后续同类题目的重复错误率。\nH3：与被动阅读相比，主动回忆复习能够降低延迟测试中的重复错误率。'),
      reportSection('4. 主要研究假设', '<p>假设三为本项目的主要研究假设：在学习材料、学习时长和测试难度相同的条件下，主动回忆复习组在延迟测试中的错误率低于被动阅读复习组。</p>', '主要研究假设（H3）：在学习材料、学习时长和测试难度相同的条件下，主动回忆复习组在延迟测试中的错误率低于被动阅读复习组。'),
      reportSection('5. 实验对象及实际样本量', '<dl class="report-definition-list"><dt>计划样本量</dt><dd>' + escapeHtml(planText) + '（计划招募 20 名学生；计划人数不代表已经招募到参与者）</dd><dt>实际有效样本量</dt><dd>' + escapeHtml(validText) + '</dd><dt>实际实验日期</dt><dd>' + escapeHtml(dateText) + '</dd></dl>', '计划样本量：' + planText + '（计划招募 20 名学生；计划人数不代表已经招募到参与者）\n实际有效样本量：' + validText + '\n实际实验日期：' + dateText),
      reportSection('6. 实验设计与变量控制', '<p>参与者先完成基线测试，再由系统随机分配到主动回忆组或被动阅读组。实验组先尝试回忆，再查看答案并订正；对照组使用相同时间阅读题目、正确答案和解析。两组接触相同知识点、相同数量的复习材料和相同的延迟测试题。</p><p>控制变量包括学习材料、学习时长、测试题数、测试难度和延迟时间。基线成绩用于定义同一知识点的重复错误，不用于筛选参与者。</p>', '参与者先完成基线测试，再由系统随机分组。实验组先尝试回忆，再查看答案并订正；对照组使用相同时间阅读题目、正确答案和解析。控制变量包括学习材料、学习时长、测试题数、测试难度和延迟时间。'),
      reportSection('7. 实验步骤', '<ol><li>完成基线测试。</li><li>系统随机分组。</li><li>两组学习相同的错题材料。</li><li>按照分组要求完成复习任务。</li><li>经过预先设定的延迟时间后完成测试。</li><li>统计并比较两组的错误率与重复错误数。</li></ol>', '1. 完成基线测试。\n2. 系统随机分组。\n3. 两组学习相同的错题材料。\n4. 按照分组要求完成复习任务。\n5. 经过预先设定的延迟时间后完成测试。\n6. 统计并比较两组的错误率与重复错误数。'),
      reportSection('8. 实验数据和错误率计算', '<p>错误率 = 答错题数 ÷ 测试总题数 × 100%。正确率 = 100% − 错误率。错误率差值 = 被动阅读组错误率 − 主动回忆组错误率。</p>' + tableHtml + '<p>错误率差值：' + escapeHtml(differenceText) + '。实际延迟时间：' + escapeHtml(delayText) + '。</p>', '错误率 = 答错题数 ÷ 测试总题数 × 100%。\n正确率 = 100% − 错误率。\n错误率差值 = 被动阅读组错误率 − 主动回忆组错误率。\n主动回忆组：错误率 ' + activeRateText + '，重复错误 ' + activeRepeatText + '。\n被动阅读组：错误率 ' + controlRateText + '，重复错误 ' + controlRepeatText + '。\n错误率差值：' + differenceText + '。\n实际延迟时间：' + delayText + '。'),
      reportSection('9. 图表结果', '<p>在线数据区已生成两组错误率柱状图、正确率对比、重复错误数对比和有效样本量图。本次录入对应的文字摘要如下：主动回忆组错误率 ' + escapeHtml(activeRateText) + '，被动阅读组错误率 ' + escapeHtml(controlRateText) + '，重复错误总数 ' + escapeHtml(repeatText) + '。' + (delayedPending ? ' <strong>尚未获得延迟测试结果。</strong>' : '') + '</p>', '主动回忆组错误率：' + activeRateText + '。\n被动阅读组错误率：' + controlRateText + '。\n重复错误总数：' + repeatText + '。\n' + (delayedPending ? '尚未获得延迟测试结果。' : '图表结果详见网页数据区。')),
      reportSection('10. 结果讨论', '<p>' + escapeHtml(discussion) + '</p>', discussion),
      reportSection('11. 研究局限性', '<p>本网站是静态页面，localStorage 只保存在当前浏览器，不能提供可靠的跨设备或跨用户云端汇总；样本量可能较小；基线题和测试题数量有限；复习任务完成度部分依赖参与者自我报告；页面只计算描述性错误率，没有内置统计显著性检验；正式延迟测试还需排除再次查找答案、外部提示和不同测试环境等干扰。</p>', '静态网站仅使用当前浏览器存储，不能跨设备自动汇总；样本量、题目数量和环境控制有限；完成度依赖自我报告；未进行统计显著性检验。'),
      reportSection('12. 实验结论', '<p class="report-callout' + (isDemo ? '' : ' real') + '">' + escapeHtml(conclusion) + '</p>', conclusion),
      reportSection('13. 后续改进建议', '<ol><li>扩大并预先说明真实招募与排除标准。</li><li>由研究者核对本机导出的匿名 JSON/CSV 记录并人工去重汇总。</li><li>增加更多等价题目，并为复习任务提供客观完成指标。</li><li>在样本量满足条件后，由课程研究者在统计软件中完成独立样本比较和效应量分析。</li><li>使用受控设备或测试环境，减少外部提示与查找答案的可能。</li></ol>', '1. 扩大并预先说明真实招募与排除标准。\n2. 由研究者核对导出的匿名 JSON/CSV 记录并人工去重汇总。\n3. 增加等价题目并提供客观完成指标。\n4. 在统计软件中完成独立样本比较和效应量分析。\n5. 使用受控测试环境，减少外部提示。')
    ];
    const intro = isDemo ? '<p class="report-callout">当前报告使用模拟数据，仅用于功能演示，不可作为真实实验结论。</p>' : '<p class="report-callout real">当前报告基于用户录入的数据生成。未填写项保留为“待填写”。</p>';
    const html = intro + sections.map((section) => `<section class="report-section-block"><h3>${escapeHtml(section.title)}</h3>${section.html}</section>`).join('');
    const text = title + '\n生成时间：' + generatedAt.toLocaleString('zh-CN', { hour12: false }) + '\n\n' + sections.map((section) => section.title + '\n' + section.text).join('\n\n');
    return { html, text, title, isDemo, generatedAt };
  };

  const syncReport = () => {
    const model = buildReportModel();
    reportText = model.text;
    const titleNode = qs('#report-paper .report-header h2');
    if (titleNode) titleNode.textContent = model.title;
    const mark = qs('#report-mark');
    if (mark) {
      mark.textContent = model.isDemo ? '演示数据' : '用户录入数据';
      mark.classList.toggle('real', !model.isDemo);
    }
    const content = qs('#report-content');
    if (content) content.innerHTML = model.html;
    const time = qs('#report-generated-at');
    if (time) time.textContent = model.generatedAt.toLocaleString('zh-CN', { hour12: false });
  };

  const renderRecords = () => {
    const count = qs('#records-count');
    if (count) count.textContent = '当前 ' + records.length + ' 条记录';
  };

  const resetExperiment = () => {
    if (reviewTimer) window.clearInterval(reviewTimer);
    if (countdownTimer) window.clearInterval(countdownTimer);
    experiment = null;
    removeStore(STORAGE.experiment);
    renderExperiment();
    scrollLabIntoView();
    showToast('当前实验已重置；本机匿名记录池未被删除。');
  };

  const handleGlobalClick = (event) => {
    const target = event.target.closest('[data-action]');
    if (!target) return;
    const action = target.dataset.action;
    const localActions = new Set([
      'start-demo', 'start-formal', 'resume-formal', 'consent-submit', 'submit-baseline',
      'continue-study', 'continue-review', 'review-start', 'recall-reveal', 'review-complete',
      'enter-delayed', 'submit-delayed', 'export-current-json', 'export-current-csv',
      'export-result-json', 'export-result-csv'
    ]);
    if (localActions.has(action)) return handleExperimentClick(action);
    if (action === 'show-reset-dialog') {
      const dialog = qs('#reset-dialog');
      if (dialog && typeof dialog.showModal === 'function') dialog.showModal();
      return;
    }
    if (action === 'clear-demo') {
      analysis = { ...EMPTY_ANALYSIS };
      saveStore(STORAGE.analysis, analysis);
      initializeAnalysisForm();
      renderAnalysis();
      syncReport();
      showToast('演示数据已清除，请录入真实汇总数据。');
      return;
    }
    if (action === 'export-records-json') {
      exportPayload(JSON.stringify({ exportedAt: nowIso(), storageNotice: '仅来自当前浏览器 localStorage', records }, null, 2), 'wronglab-records.json', 'application/json;charset=utf-8');
      return;
    }
    if (action === 'export-records-csv') {
      const rows = records.map((record) => [record.anonymousId, record.group || '', record.status, record.createdAt, record.reviewCompletedAt || '', record.dueAt || '', record.delayedTestStatus, record.result?.total || '', record.result?.wrong || '', record.result?.errorRate ?? '', record.result?.repeated ?? '']);
      exportPayload(toCsv(['匿名编号', '分组', '阶段', '创建时间', '复习完成时间', '计划测试时间', '延迟测试状态', '总题数', '答错题数', '错误率', '重复错误数'], rows), 'wronglab-records.csv', 'text/csv;charset=utf-8');
      return;
    }
    if (action === 'clear-records') {
      if (!records.length) return showToast('当前没有本机匿名记录。', 'warning');
      if (window.confirm('确认清空当前浏览器中的全部匿名实验档案？此操作不能撤销。')) {
        records = [];
        removeStore(STORAGE.records);
        renderRecords();
        showToast('本机匿名实验档案已清空。');
      }
      return;
    }
    if (action === 'generate-report') {
      syncReport();
      showToast('报告已根据当前数据重新生成。');
      return;
    }
    if (action === 'copy-report') {
      syncReport();
      copyText(reportText).then((ok) => showToast(ok ? '报告已复制到剪贴板。' : '复制失败，请手动选择报告内容。', ok ? 'success' : 'error'));
      return;
    }
    if (action === 'download-report') {
      syncReport();
      exportPayload(reportText, '错题记忆实验室-实验报告.txt', 'text/plain;charset=utf-8');
      return;
    }
    if (action === 'export-analysis-json') {
      exportPayload(JSON.stringify({ schema: 'wronglab-analysis-v1', exportedAt: nowIso(), source: analysis.isDemo ? 'demo' : 'user-input', data: analysis, calculated: validateAnalysis() }, null, 2), 'wronglab-analysis.json', 'application/json;charset=utf-8');
      return;
    }
    if (action === 'export-analysis-csv') {
      const value = validateAnalysis().values;
      const rows = [['activePlannedN', value.activePlannedN ?? ''], ['controlPlannedN', value.controlPlannedN ?? ''], ['activeValidN', value.activeValidN ?? ''], ['controlValidN', value.controlValidN ?? ''], ['activeTotalQuestions', value.activeTotalQuestions ?? ''], ['controlTotalQuestions', value.controlTotalQuestions ?? ''], ['activeWrong', value.activeWrong ?? ''], ['controlWrong', value.controlWrong ?? ''], ['activeRepeats', value.activeRepeats ?? ''], ['controlRepeats', value.controlRepeats ?? ''], ['experimentDate', analysis.experimentDate || ''], ['delayTime', analysis.delayTime || ''], ['delayedTestStatus', analysis.delayedTestStatus || ''], ['source', analysis.isDemo ? 'demo' : 'user-input']];
      exportPayload(toCsv(['字段', '值'], rows), 'wronglab-analysis.csv', 'text/csv;charset=utf-8');
      return;
    }
    if (action === 'print-report') {
      syncReport();
      document.body.classList.add('printing-report');
      window.print();
    }
  };

  const handleAnalysisInput = (event) => {
    const input = event.target.closest('[data-analysis]');
    if (!input) return;
    const key = input.dataset.analysis;
    const value = input.type === 'number' ? (input.value === '' ? null : Number(input.value)) : input.value;
    if (analysis.isDemo) {
      analysis = { ...EMPTY_ANALYSIS, isDemo: false, [key]: value };
      saveStore(STORAGE.analysis, analysis);
      initializeAnalysisForm();
      renderAnalysis();
      syncReport();
      showToast('演示数据已清除，其他字段需由你录入真实汇总值。', 'warning');
      return;
    }
    analysis[key] = value;
    saveStore(STORAGE.analysis, analysis);
    renderAnalysis();
    syncReport();
  };

  const initNavigation = () => {
    const toggle = qs('#nav-toggle');
    const nav = qs('#site-nav');
    toggle?.addEventListener('click', () => {
      const open = !nav.classList.contains('open');
      nav.classList.toggle('open', open);
      document.body.classList.toggle('nav-open', open);
      toggle.setAttribute('aria-expanded', String(open));
    });
    qsa('#site-nav a').forEach((link) => link.addEventListener('click', () => {
      nav.classList.remove('open');
      document.body.classList.remove('nav-open');
      toggle?.setAttribute('aria-expanded', 'false');
    }));
    const navLinks = qsa('.site-nav a[href^="#"]');
    const sections = navLinks.map((link) => qs(link.getAttribute('href'))).filter(Boolean);
    let ticking = false;
    const updateScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? (window.scrollY / max) * 100 : 0;
      const bar = qs('#reading-progress-bar');
      if (bar) bar.style.width = clamp(progress, 0, 100) + '%';
      let currentId = '';
      sections.forEach((section) => {
        if (section.getBoundingClientRect().top <= 150) currentId = section.id;
      });
      navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === '#' + currentId));
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    }, { passive: true });
    updateScroll();
  };

  const init = () => {
    initializeAnalysisForm();
    renderExperiment();
    renderAnalysis();
    syncReport();
    renderRecords();
    initNavigation();
    qs('#experiment-stage')?.addEventListener('change', handleExperimentChange);
    document.addEventListener('click', handleGlobalClick);
    qs('#data-form')?.addEventListener('input', handleAnalysisInput);
    qs('#data-form')?.addEventListener('change', handleAnalysisInput);
    qs('#confirm-reset-experiment')?.addEventListener('click', () => window.setTimeout(resetExperiment, 0));
    window.addEventListener('afterprint', () => document.body.classList.remove('printing-report'));
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();