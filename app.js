'use strict';

const LESSONS = window.LESSONS;
const KEY = 'cesky-trener-v1';
const DAILY_GOAL = 50;
const SESSION_SIZE = 12;

// ---------- Хранилище ----------
const fresh = () => ({ xp: 0, streak: 0, last: '', today: {}, done: {}, wrong: {} });
let S = fresh();
try { S = Object.assign(fresh(), JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) { /* первый запуск */ }
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* приватный режим */ } };

const dayKey = (d = new Date()) => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
const todayXp = () => S.today[dayKey()] || 0;

function addXp(n) {
  const k = dayKey();
  S.xp += n;
  S.today = { [k]: (S.today[k] || 0) + n };
  if (S.last !== k) {
    const y = new Date(); y.setDate(y.getDate() - 1);
    S.streak = S.last === dayKey(y) ? S.streak + 1 : 1;
    S.last = k;
  }
  save();
}
// если пропущен день — серия сгорает (проверяем при открытии)
(function checkStreak() {
  const y = new Date(); y.setDate(y.getDate() - 1);
  if (S.last && S.last !== dayKey() && S.last !== dayKey(y)) { S.streak = 0; save(); }
})();

// ---------- Утилиты ----------
const $app = document.getElementById('app');
function h(tag, attrs, ...kids) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs || {})) {
    if (k === 'class') el.className = v;
    else if (k === 'html') el.innerHTML = v;
    else if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
    else if (v !== false && v != null) el.setAttribute(k, v);
  }
  for (const kid of kids.flat(Infinity)) if (kid != null && kid !== false) el.append(kid.nodeType ? kid : document.createTextNode(kid));
  return el;
}
function mount(...nodes) { $app.replaceChildren(...nodes.flat(Infinity).filter(Boolean)); window.scrollTo(0, 0); }
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const strip = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '');
const clean = s => s.toLowerCase().replace(/[.,!?;:«»"“”„]/g, ' ').replace(/\s+/g, ' ').trim();
const exId = (lesson, i) => lesson.id + '/' + i;
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

// ---------- Словарь (слова из Classroom и учебника, перевод сверен с Seznam Slovník) ----------
const VOCAB = window.VOCAB || [];
const WHY = window.WHY || {};
const WHY_RULE = window.WHY_RULE || {};
const GENDER = { m: 'м.', 'ž': 'ж.', s: 'ср.', pl: 'мн.', 'm/ž': 'м./ж.' };
const plainWord = cz => cz.replace(/\s*\(.*\)/, '');
const seznamUrl = q => 'https://slovnik.seznam.cz/preklad/' + (/[а-яё]/i.test(q) ? 'rusky_cesky' : 'cesky_rusky') + '/' + encodeURIComponent(q.trim());

function vocabLesson(set) {
  const rows = set.words.map(([cz, ru, g]) =>
    '<tr><td><a href="' + seznamUrl(plainWord(cz)) + '" target="_blank" rel="noopener"><b>' + esc(cz) + '</b></a>' +
    (g ? ' <small>(' + GENDER[g] + ')</small>' : '') + '</td><td>' + esc(ru) + '</td></tr>').join('');
  return { id: set.id, title: set.title, icon: set.icon, ex: [],
    rule: '<p>Нажми на слово, чтобы открыть его в Seznam Slovník.</p><table>' + rows + '</table>' };
}

// kind: cr = чешское → русское, rc = русское → чешское (выбор), rt = русское → чешское (вписать)
function makeVocab(set, wi, kind) {
  const [cz, ru, g] = set.words[wi];
  const plain = plainWord(cz);
  const pool = set.words.length >= 8 ? set.words : VOCAB.flatMap(s => s.words);
  const seen = new Set([ru, plain]);
  const others = [];
  for (const w of shuffle(pool)) {
    const wp = plainWord(w[0]);
    if (seen.has(w[1]) || seen.has(wp)) continue;
    seen.add(w[1]); seen.add(wp); others.push(w);
    if (others.length === 3) break;
  }
  const tag = g ? ' (' + GENDER[g] + ')' : '';
  const why = '«' + plain + '» значит «' + ru + '»' + (g ? ' (' + GENDER[g] + ' род)' : '') + '.';
  if (kind === 'cr') return { t: 'c', q: 'Что значит «' + plain + '»' + tag + '?', a: ru, w: others.map(w => w[1]), vocab: plain, why,
    opt: Object.fromEntries(others.map(w => [w[1], 'Вариант «' + w[1] + '» — это по-чешски «' + plainWord(w[0]) + '».'])) };
  if (kind === 'rc') return { t: 'c', q: 'Как по-чешски «' + ru + '»?', a: plain, w: others.map(w => plainWord(w[0])), vocab: plain, why,
    opt: Object.fromEntries(others.map(w => [plainWord(w[0]), 'Слово «' + plainWord(w[0]) + '» значит «' + w[1] + '».'])) };
  return { t: 'f', q: 'Напиши по-чешски: ' + ru + tag, a: [...new Set([plain, cz])], vocab: plain, why };
}
function vocabItem(set, wi, kind) {
  return { e: makeVocab(set, wi, kind), l: vocabLesson(set), i: wi + ':' + kind };
}
function vocabSet(set) {
  const L = vocabLesson(set);
  const weak = [];
  for (const [key, n] of Object.entries(S.wrong)) {
    if (!key.startsWith(set.id + '/')) continue;
    const [wi, kind] = key.slice(set.id.length + 1).split(':');
    if (set.words[+wi]) weak.push({ wi: +wi, kind, n });
  }
  weak.sort((a, b) => b.n - a.n);
  const used = new Set(weak.slice(0, 5).map(x => x.wi));
  const fresh = shuffle(set.words.map((_, wi) => wi).filter(wi => !used.has(wi)));
  const kinds = ['cr', 'rc', 'rt'];
  const items = [...weak.slice(0, 5).map(x => vocabItem(set, x.wi, x.kind)),
    ...fresh.slice(0, SESSION_SIZE - used.size).map((wi, k) => vocabItem(set, wi, kinds[k % 3]))];
  return shuffle(items);
}
function openVocab(set) { startSession(vocabSet(set), set.title, vocabLesson(set)); }

// ---------- Озвучка ----------
function speak(text) {
  if (!('speechSynthesis' in window) || !text) return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'cs-CZ'; u.rate = 0.9;
  const v = speechSynthesis.getVoices().find(v => v.lang && v.lang.toLowerCase().startsWith('cs'));
  if (v) u.voice = v;
  speechSynthesis.speak(u);
}
const speakBtn = text => h('button', { class: 'speak', 'aria-label': 'Озвучить', onclick: () => speak(text) }, '🔊');

// ---------- Главная ----------
function lessonPct(l) {
  const d = S.done[l.id];
  return d ? d.best : 0;
}
function wrongList() {
  const out = [];
  for (const l of LESSONS) l.ex.forEach((e, i) => { const n = S.wrong[exId(l, i)]; if (n) out.push({ lesson: l, i, n, e }); });
  for (const set of VOCAB) {
    for (const [key, n] of Object.entries(S.wrong)) {
      if (!key.startsWith(set.id + '/')) continue;
      const [wi, kind] = key.slice(set.id.length + 1).split(':');
      if (set.words[+wi]) out.push({ lesson: vocabLesson(set), i: wi + ':' + kind, n, e: makeVocab(set, +wi, kind) });
    }
  }
  return out.sort((a, b) => b.n - a.n);
}

function home() {
  const wl = wrongList();
  const goal = Math.min(100, Math.round(todayXp() / DAILY_GOAL * 100));
  const units = [];
  for (const l of LESSONS) {
    let u = units.find(u => u.name === l.unit);
    if (!u) units.push(u = { name: l.unit, items: [] });
    u.items.push(l);
  }
  const lookIn = h('input', { class: 'lookup-in', type: 'search', placeholder: 'Перевести слово…', autocomplete: 'off', autocapitalize: 'off', spellcheck: 'false', enterkeyhint: 'search' });
  const look = () => { const q = lookIn.value.trim(); if (q) window.open(seznamUrl(q), '_blank', 'noopener'); };
  lookIn.addEventListener('keydown', ev => { if (ev.key === 'Enter') look(); });
  const vocabBlock = VOCAB.length ? [
    h('div', { class: 'unit' }, 'Слова (из учебника и Classroom)'),
    VOCAB.map(set => {
      const p = lessonPct(set);
      return h('button', { class: 'lesson' + (p >= 80 ? ' done' : ''), onclick: () => openVocab(set) },
        h('span', { class: 'ic' }, set.icon),
        h('span', { class: 'tx' }, h('b', {}, set.title), h('small', {}, set.words.length + ' слов'), h('div', { class: 'mini' }, h('i', { style: 'width:' + p + '%' }))),
        h('span', { class: 'pct' }, S.done[set.id] ? p + '%' : ''));
    }),
  ] : null;
  mount(
    h('div', { class: 'top' },
      h('h1', {}, 'Český trenér'),
      h('div', { class: 'stats' }, h('span', { class: 'stat' }, '🔥 ' + S.streak), h('span', { class: 'stat' }, '⭐ ' + S.xp))),
    h('div', { class: 'today' },
      h('b', {}, 'Цель на сегодня: ' + todayXp() + ' / ' + DAILY_GOAL + ' XP'),
      h('div', { class: 'bar' }, h('i', { style: 'width:' + goal + '%' }))),
    h('div', { class: 'quick' },
      h('button', { class: 'qbtn alt', disabled: wl.length ? false : 'disabled', onclick: () => startSession(reviewSet(), 'Работа над ошибками') },
        '🎯 Мои ошибки', h('small', {}, wl.length ? wl.length + ' упражн. ждут повтора' : 'пока ошибок нет')),
      h('button', { class: 'qbtn', onclick: () => startSession(mixSet(), 'Микс') },
        '🔀 Микс', h('small', {}, 'случайно из всех тем'))),
    h('div', { class: 'lookup' }, lookIn, h('button', { class: 'lk', onclick: look, 'aria-label': 'Найти в Seznam Slovník' }, '🔎 Seznam')),
    vocabBlock,
    units.map(u => [
      h('div', { class: 'unit' }, u.name),
      u.items.map(l => {
        const p = lessonPct(l);
        return h('button', { class: 'lesson' + (p >= 80 ? ' done' : ''), onclick: () => openLesson(l) },
          h('span', { class: 'ic' }, l.icon),
          h('span', { class: 'tx' }, h('b', {}, l.title), h('small', {}, l.desc), h('div', { class: 'mini' }, h('i', { style: 'width:' + p + '%' }))),
          h('span', { class: 'pct' }, S.done[l.id] ? p + '%' : ''));
      }),
    ]),
  );
}

// ---------- Подбор упражнений ----------
function lessonSet(l) {
  const items = l.ex.map((e, i) => ({ e, l, i }));
  // сначала то, что раньше не получалось
  const w = items.filter(x => S.wrong[exId(l, x.i)]);
  const rest = shuffle(items.filter(x => !S.wrong[exId(l, x.i)]));
  return shuffle([...w, ...rest].slice(0, SESSION_SIZE));
}
function reviewSet() {
  return shuffle(wrongList().slice(0, SESSION_SIZE).map(x => ({ e: x.e, l: x.lesson, i: x.i })));
}
function mixSet() {
  const started = LESSONS.filter(l => S.done[l.id]);
  const pool = (started.length ? started : LESSONS).flatMap(l => l.ex.map((e, i) => ({ e, l, i })));
  return shuffle(pool).slice(0, SESSION_SIZE);
}

// ---------- Урок: старт ----------
function openLesson(l) {
  startSession(lessonSet(l), l.title, l);
}
function showRule(l) {
  const sheet = h('div', { class: 'sheet', onclick: ev => { if (ev.target === sheet) sheet.remove(); } },
    h('div', {}, h('h3', {}, l.icon + ' ' + l.title), h('div', { html: l.rule }),
      h('button', { class: 'main', onclick: () => sheet.remove() }, 'Понятно')));
  document.body.append(sheet);
}

// ---------- Сессия ----------
let run = null;

function startSession(items, title, lesson) {
  if (!items.length) return home();
  run = { title, lesson, queue: items.map(x => ({ ...x, retry: false })), total: items.length, solved: 0, firstTry: 0, xp: 0, mistakes: 0 };
  next();
}

function next() {
  if (!run.queue.length) return finish();
  renderExercise(run.queue[0]);
}

function renderExercise(item) {
  const { e, l } = item;
  let checked = false;
  let getAnswer, isReady = () => false, onReady = () => {};
  const body = h('div', { class: 'ex' });
  const footBox = h('div', {});
  const foot = h('div', { class: 'foot' }, footBox);
  const btn = h('button', { class: 'main', disabled: 'disabled' }, 'Проверить');
  footBox.append(btn);

  const setReady = ok => { if (ok) btn.removeAttribute('disabled'); else btn.setAttribute('disabled', 'disabled'); };

  // --- выбор варианта ---
  if (e.t === 'c') {
    let sel = null;
    const opts = shuffle([e.a, ...e.w]);
    const btns = opts.map(o => h('button', { class: 'opt', onclick: () => { if (checked) return; sel = o; btns.forEach(b => b.classList.toggle('sel', b === btnOf(o))); setReady(true); } }, o));
    const btnOf = o => btns[opts.indexOf(o)];
    const parts = e.q.split('___');
    body.append(h('div', { class: 'kind' }, e.q.includes('___') ? 'Выбери пропущенное' : 'Выбери ответ'),
      h('div', { class: 'q' }, h('span', {}, parts.length > 1 ? [parts[0], h('span', { class: 'blank' }, ' '), parts[1]] : e.q)),
      h('div', { class: 'opts' }, btns));
    getAnswer = () => ({ ok: sel === e.a, mine: sel, show: e.a, say: e.q.includes('___') ? e.q.replace('___', e.a) : e.a, mark: ok => btns.forEach(b => { if (b.textContent === e.a) b.classList.add('right'); else if (b.textContent === sel && !ok) b.classList.add('wrong'); }) });
    isReady = () => sel != null;
  }

  // --- вписать ---
  if (e.t === 'f') {
    const input = h('input', { class: 'ans', type: 'text', autocomplete: 'off', autocapitalize: 'off', autocorrect: 'off', spellcheck: 'false', enterkeyhint: 'done' });
    input.addEventListener('input', () => setReady(input.value.trim().length > 0));
    input.addEventListener('keydown', ev => { if (ev.key === 'Enter' && input.value.trim()) btn.click(); });
    const chars = h('div', { class: 'chars' }, [...'áčďéěíňóřšťúůýž'].map(ch => h('button', { type: 'button', onmousedown: ev => ev.preventDefault(), onclick: () => {
      if (checked) return;
      const s = input.selectionStart ?? input.value.length;
      input.value = input.value.slice(0, s) + ch + input.value.slice(input.selectionEnd ?? s);
      input.setSelectionRange(s + 1, s + 1); input.focus(); setReady(true);
    } }, ch)));
    const parts = e.q.split('___');
    body.append(h('div', { class: 'kind' }, 'Впиши слово'),
      h('div', { class: 'q' }, h('span', {}, parts.length > 1 ? [parts[0], h('span', { class: 'blank' }, ' '), parts[1]] : e.q)),
      input, chars);
    setTimeout(() => input.focus(), 50);
    getAnswer = () => {
      const val = clean(input.value);
      const exact = e.a.some(a => clean(a) === val);
      const loose = !exact && e.a.some(a => strip(clean(a)) === strip(val));
      return { ok: exact || loose, loose, mine: input.value.trim(), show: e.a[0], say: e.q.replace('___', e.a[0]), mark: ok => input.classList.add(ok ? 'right' : 'wrong') };
    };
    isReady = () => input.value.trim().length > 0;
  }

  // --- собрать предложение ---
  if (e.t === 'b') {
    const words = e.a[0].split(/\s+/).filter(Boolean).map(w => w.replace(/[.,!?]$/, ''));
    // слова основного ответа (с повторами) + слова из других вариантов и лишние, без дублей
    const bankWords = [...words];
    for (const w of [...e.a.slice(1).flatMap(a => a.split(/\s+/).map(w => w.replace(/[.,!?]$/, ''))), ...e.x]) if (w && !bankWords.includes(w)) bankWords.push(w);
    const lower = w => (/[A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]/.test(w.slice(1)) ? w : w[0].toLowerCase() + w.slice(1));
    const tiles = shuffle(bankWords.map((w, k) => ({ w, k, used: false })));
    const chosen = [];
    const area = h('div', { class: 'build-ans' });
    const bank = h('div', { class: 'bank' });
    const draw = () => {
      area.replaceChildren(...chosen.map(t => h('button', { class: 'tile', onclick: () => { if (checked) return; t.used = false; chosen.splice(chosen.indexOf(t), 1); draw(); } }, display(t.w))));
      bank.replaceChildren(...tiles.map(t => h('button', { class: 'tile' + (t.used ? ' used' : ''), onclick: () => { if (checked || t.used) return; t.used = true; chosen.push(t); draw(); } }, display(t.w))));
      setReady(chosen.length > 0);
    };
    // имена собственные оставляем с заглавной, остальное с маленькой — порядок слов не подсказываем
    const display = w => (words[0] === w || e.a.some(a => a.split(/\s+/)[0].replace(/[.,!?]$/, '') === w)) ? lower(w) : w;
    body.append(h('div', { class: 'kind' }, 'Переведи на чешский'),
      h('div', { class: 'q' }, h('span', {}, e.ru)),
      area, bank);
    draw();
    getAnswer = () => {
      const got = clean(chosen.map(t => t.w).join(' '));
      const ok = e.a.some(a => clean(a) === got);
      return { ok, mine: chosen.map(t => t.w).join(' '), show: e.a[0] + '.', say: e.a[0], mark: ok2 => area.classList.add(ok2 ? 'right' : 'wrong') };
    };
    isReady = () => chosen.length > 0;
  }

  btn.addEventListener('click', () => {
    if (checked) { run.queue.shift(); next(); return; }
    if (!isReady()) return;
    checked = true;
    const r = getAnswer();
    r.mark(r.ok);
    const id = exId(l, item.i);
    if (r.ok) {
      if (!item.retry) { run.firstTry++; run.xp += 10; if (S.wrong[id]) { S.wrong[id]--; if (S.wrong[id] <= 0) delete S.wrong[id]; } }
      else run.xp += 3;
      run.solved++;
    } else {
      run.mistakes++;
      S.wrong[id] = Math.min((S.wrong[id] || 0) + 1, 5);
      run.queue.push({ ...item, retry: true });
    }
    save();
    const whyText = e.vocab ? [e.why, e.opt && e.opt[r.mine]].filter(Boolean).join(' ') : (WHY[l.id] && WHY[l.id][item.i]) || '';
    const whyBox = whyText ? h('div', { class: 'why', hidden: r.ok ? '' : null },
      !r.ok ? h('div', {}, 'Твой ответ: ', h('b', {}, r.mine || '—')) : null,
      h('div', {}, '💡 ' + whyText),
      !e.vocab && WHY_RULE[l.id] ? h('div', {}, '📘 Правило: ' + WHY_RULE[l.id]) : null) : null;
    foot.className = 'foot ' + (r.ok ? 'ok' : 'bad');
    footBox.replaceChildren(
      h('div', { class: 'fb' },
        h('strong', {}, r.ok ? ['Správně! ', pick(['👍', '🎉', '💪', '✨'])] : 'Ошибка'),
        r.ok && r.loose ? h('div', {}, 'Правильно, но с диакритикой: ', h('b', {}, r.show)) : null,
        !r.ok ? h('div', {}, 'Правильно: ', h('b', {}, r.show)) : null,
        !r.ok && e.tip ? h('div', { class: 'tip' }, '💡 ' + e.tip) : null,
        r.ok && whyBox ? h('div', { class: 'tip' }, h('a', { onclick: () => { whyBox.hidden = !whyBox.hidden; } }, '💡 Почему так?')) : null,
        whyBox,
        e.vocab ? h('div', { class: 'tip' }, h('a', { href: seznamUrl(e.vocab), target: '_blank', rel: 'noopener' }, '🔎 ' + e.vocab + ' в Seznam Slovník')) : null,
        !r.ok ? h('div', { class: 'tip' }, h('a', { onclick: () => showRule(l) }, '📘 Открыть правило')) : null),
      h('div', { style: 'display:flex;gap:10px' },
        h('button', { class: 'speak', style: 'height:auto;width:56px;flex:none', 'aria-label': 'Озвучить', onclick: () => speak(r.say) }, '🔊'),
        h('div', { style: 'flex:1' }, btn)));
    btn.textContent = 'Дальше';
    btn.removeAttribute('disabled');
    speak(r.say);
  });

  const pct = Math.round(run.solved / run.total * 100);
  mount(
    h('div', { class: 'head' },
      h('button', { class: 'x', 'aria-label': 'Выйти', onclick: () => { if (confirm('Выйти? Прогресс этой сессии не сохранится.')) { speechSynthesis && speechSynthesis.cancel(); home(); } } }, '✕'),
      h('div', { class: 'bar' }, h('i', { style: 'width:' + pct + '%' })),
      h('button', { class: 'help', 'aria-label': 'Правило', onclick: () => showRule(l) }, '?')),
    body, foot);
}
const pick = a => a[Math.floor(Math.random() * a.length)];

// ---------- Итоги ----------
function finish() {
  const acc = Math.round(run.firstTry / run.total * 100);
  addXp(run.xp);
  if (run.lesson) {
    const d = S.done[run.lesson.id] || { best: 0, times: 0 };
    d.best = Math.max(d.best, acc); d.times++;
    S.done[run.lesson.id] = d; save();
  }
  const emoji = acc >= 90 ? '🏆' : acc >= 70 ? '🎉' : acc >= 50 ? '💪' : '📚';
  const msg = acc >= 90 ? 'Отлично!' : acc >= 70 ? 'Хорошо!' : acc >= 50 ? 'Неплохо, повтори ещё' : 'Ошибки — это нормально, они запомнятся';
  mount(h('div', { class: 'result' },
    h('div', { class: 'big' }, emoji),
    h('h2', {}, msg),
    h('div', { style: 'color:var(--muted)' }, run.title),
    h('div', { class: 'nums' },
      h('div', {}, h('b', {}, '+' + run.xp), h('small', {}, 'XP')),
      h('div', {}, h('b', {}, acc + '%'), h('small', {}, 'с первого раза')),
      h('div', {}, h('b', {}, '🔥 ' + S.streak), h('small', {}, 'дней подряд'))),
    h('button', { class: 'main', onclick: home }, 'Продолжить'),
    run.mistakes ? h('p', { style: 'color:var(--muted);font-size:15px' }, 'Ошибки сохранены — они вернутся в «Мои ошибки».') : null));
}

home();

if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}
