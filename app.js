'use strict';

const LESSONS = window.LESSONS;
const KEY = 'cesky-trener-v1';
const DAILY_GOAL = 50;
const SESSION_SIZE = 12;

// ---------- Хранилище ----------
const fresh = () => ({ xp: 0, streak: 0, last: '', today: {}, done: {}, wrong: {}, lang: '' });
let S = fresh();
try { S = Object.assign(fresh(), JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) { /* первый запуск */ }
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* приватный режим */ } };

// ---------- Язык интерфейса ----------
const detectLang = () => { const l = (navigator.language || 'ru').slice(0, 2).toLowerCase(); return window.UI[l] ? l : 'ru'; };
let lang = window.UI[S.lang] ? S.lang : detectLang();
document.documentElement.lang = lang;
function t(key, vars) {
  const s = (window.UI[lang][key] != null ? window.UI[lang][key] : window.UI.ru[key]);
  return typeof s === 'string' && vars ? s.replace(/\{(\w+)\}/g, (m, k) => (vars[k] != null ? vars[k] : m)) : s;
}
const pickLang = (map, fb) => (lang !== 'ru' && map && map[lang]) || fb;
const tUnit = name => pickLang(window.TITLES.units[name], name);
const tLesson = l => pickLang(window.TITLES.lessons[l.id], l.title);
const tDesc = l => { const m = window.TITLES.lessons[l.id]; return (lang !== 'ru' && m && m['desc' + lang[0].toUpperCase() + lang.slice(1)]) || l.desc; };
const tSet = set => pickLang(window.TITLES.vocab[set.id], set.title);
// контент на выбранном языке: что не переведено — остаётся русским
const CT = () => (lang !== 'ru' && window.CONTENT && window.CONTENT[lang]) || {};
const ruleOf = l => ((CT().lessons || {})[l.id] || {}).rule || l.rule;
const exOf = (l, i, e) => { const ov = (((CT().lessons || {})[l.id] || {}).ex || {})[i]; return ov ? Object.assign({}, e, ov) : e; };
const whyOf = (id, i) => ((CT().why || {})[id] || [])[i] || (WHY[id] && WHY[id][i]) || '';
const whyRuleOf = id => (CT().whyRule || {})[id] || WHY_RULE[id];
// слова набора с переводом на выбранный язык: [чешское, перевод, род]
const wordsOf = set => { const tr = (CT().vocab || {})[set.id]; return set.words.map(([cz, ru, g], i) => [cz, (tr && tr[i]) || ru, g]); };
let screen = 'home';
// Lingea: адрес со словом передать нельзя (поиск у них внутри страницы), поэтому слово копируем в буфер обмена
const LINGEA = 'https://www.lingea.cz/prekladac';
function toast(msg) {
  const el = h('div', { class: 'toast', role: 'status' }, msg);
  document.body.append(el); setTimeout(() => el.remove(), 3500);
}
function copyWord(q) {
  q = (q || '').trim(); if (!q) return;
  try { navigator.clipboard.writeText(q).then(() => toast(t('copied', { w: q })), () => {}); } catch (e) { /* без буфера обмена */ }
}
function setLang(l) {
  lang = l; S.lang = l; save(); document.documentElement.lang = l;
  if (screen === 'ex' && run && run.list.length) renderExercise(run.cur || run.list[0]); else home();
}
const langSwitch = () => h('div', { class: 'langs', role: 'group', 'aria-label': t('langLabel') },
  window.LANGS.map(([code, label]) => h('button', { class: 'lang' + (code === lang ? ' on' : ''), 'aria-pressed': String(code === lang), onclick: () => { if (code !== lang) { setLang(code); track('lang/' + code, 'Язык ' + label); } } }, label)));

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
const gen = g => t('gen')[g];
const plainWord = cz => cz.replace(/\s*\(.*\)/, '');
// у Seznam нет казахского: для kk всегда чешско-английский словарь
// Яндекс Переводчик (основной для казахского) и Google Translate подставляют слово прямо в адрес и знают казахский.
// Направление: чешское слово → язык интерфейса; для kk слово на кириллице считаем казахским и переводим на чешский.
const gtUrl = q => {
  const w = q.trim(), kz = lang === 'kk', cyrIn = /[Ѐ-ӿ]/.test(w);
  const sl = cyrIn ? (kz ? 'auto' : 'ru') : 'cs', tl = cyrIn ? 'cs' : (kz ? 'kk' : lang === 'ru' ? 'ru' : 'en');
  return 'https://translate.google.com/?sl=' + sl + '&tl=' + tl + '&text=' + encodeURIComponent(w) + '&op=translate';
};
const yaUrl = q => {
  const w = q.trim(), cyrIn = /[Ѐ-ӿ]/.test(w);
  return 'https://translate.yandex.com/?source_lang=' + (cyrIn ? 'kk' : 'cs') + '&target_lang=' + (cyrIn ? 'cs' : 'kk') + '&text=' + encodeURIComponent(w);
};
const seznamUrl = q => 'https://slovnik.seznam.cz/preklad/' + (lang === 'kk' ? 'cesky_anglicky' : /[а-яё]/i.test(q) ? 'rusky_cesky' : lang === 'ru' ? 'cesky_rusky' : 'cesky_anglicky') + '/' + encodeURIComponent(q.trim());

// основной словарь: для казахского — Яндекс Переводчик (у Seznam нет казахского), для остальных — Seznam Slovník
// запасной: для казахского — Google Translate, для остальных — Lingea (слово копируется в буфер обмена)
const mainUrl = q => (lang === 'kk' ? yaUrl(q) : seznamUrl(q));
const altName = () => (lang === 'kk' ? 'Google Translate' : 'Lingea');
const altProps = q => (lang === 'kk' ? { href: gtUrl(q), target: '_blank', rel: 'noopener' }
  : { href: LINGEA, target: '_blank', rel: 'noopener', onclick: () => copyWord(q) });

function vocabLesson(set) {
  const rows = wordsOf(set).map(([cz, ru, g]) =>
    '<tr><td><a href="' + mainUrl(plainWord(cz)) + '" target="_blank" rel="noopener"><b>' + esc(cz) + '</b></a>' +
    (g ? ' <small>(' + gen(g) + ')</small>' : '') + '</td><td>' + esc(ru) + '</td></tr>').join('');
  return { id: set.id, title: tSet(set), icon: set.icon, ex: [],
    rule: '<p>' + t('vocabHint') + '</p><table>' + rows + '</table>' };
}

// kind: cr = чешское → русское, rc = русское → чешское (выбор), rt = русское → чешское (вписать)
function makeVocab(set, wi, kind, fixed) {
  const [cz, ru, g] = wordsOf(set)[wi];
  const plain = plainWord(cz);
  const pool = set.words.length >= 8 ? wordsOf(set) : VOCAB.flatMap(wordsOf);
  const seen = new Set([ru, plain]);
  let others = [];
  if (fixed) others = fixed.map(cz2 => pool.find(w => w[0] === cz2) || VOCAB.flatMap(wordsOf).find(w => w[0] === cz2)).filter(Boolean);
  if (others.length !== 3) others = [];
  for (const w of others.length ? [] : shuffle(pool)) {
    const wp = plainWord(w[0]);
    if (seen.has(w[1]) || seen.has(wp)) continue;
    seen.add(w[1]); seen.add(wp); others.push(w);
    if (others.length === 3) break;
  }
  const tag = g ? ' (' + gen(g) + ')' : '';
  const why = t('whyMeans', { w: plain, r: ru, g: g ? t('whyGender', { g: gen(g) }) : '' });
  if (kind === 'cr') return { t: 'c', q: t('qMeans', { w: plain, tag }), a: ru, w: others.map(w => w[1]), vocab: plain, why, say: plain, _fixed: others.map(w => w[0]),
    opt: Object.fromEntries(others.map(w => [w[1], t('optIs', { r: w[1], w: plainWord(w[0]) })])) };
  if (kind === 'rc') return { t: 'c', q: t('qCz', { w: ru }), a: plain, w: others.map(w => plainWord(w[0])), vocab: plain, why, say: plain, _fixed: others.map(w => w[0]),
    opt: Object.fromEntries(others.map(w => [plainWord(w[0]), t('optMeans', { w: plainWord(w[0]), r: w[1] })])) };
  return { t: 'f', q: t('qWrite', { w: ru, tag }), a: [...new Set([plain, cz])], vocab: plain, why, say: plain };
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
function openVocab(set) { startSession(vocabSet(set), () => tSet(set), vocabLesson(set)); }

// ---------- Анонимная статистика (GoatCounter): заходы, «активные минуты», решённые задания ----------
// Никаких имён, ответов и текстов не отправляется; без интернета или с блокировщиком рекламы просто молчит.
const track = (path, title) => { try { if (window.goatcounter && window.goatcounter.count) window.goatcounter.count({ path, title: title || path, event: true }); } catch (e) { /* без статистики */ } };
let lastTouch = Date.now();
['pointerdown', 'keydown', 'scroll', 'touchstart'].forEach(ev => addEventListener(ev, () => { lastTouch = Date.now(); }, { passive: true }));
setInterval(() => { if (!document.hidden && Date.now() - lastTouch < 90000) track('minute', 'Активная минута'); }, 60000);

// ---------- Сообщение об ошибке ----------
const REPORT_KEY = window.REPORT_KEY || '';
async function sendReport(text, subject) {
  const res = await fetch('https://api.web3forms.com/submit', {
    method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ access_key: REPORT_KEY, subject, from_name: 'Český trenér', message: text }),
  });
  const j = await res.json();
  return !!j.success;
}
// info: { id, title, task, correct, mine }
function openReport(info) {
  const ta = h('textarea', { placeholder: t('reportPh'), maxlength: '1500', 'aria-label': t('reportAbout') });
  const contact = h('input', { type: 'text', placeholder: t('reportContactPh'), maxlength: '120', autocomplete: 'off' });
  const msg = h('p', { class: 'msg', role: 'status' });
  const send = h('button', { class: 'main', type: 'button' }, t('reportSend'));
  const close = h('button', { class: 'main sec', type: 'button', onclick: () => sheet.remove() }, t('reportClose'));
  const sheet = h('div', { class: 'sheet report', onclick: ev => { if (ev.target === sheet) sheet.remove(); } },
    h('div', {}, h('h3', {}, t('reportTitle')), h('div', { class: 'ctx' }, h('b', {}, t('reportCtx') + ': '), info.id + ' · ' + info.task),
      h('div', { style: 'font-weight:700;margin-bottom:6px' }, t('reportAbout')), ta, contact, msg, h('div', { class: 'row' }, send, close)));
  send.addEventListener('click', async () => {
    const comment = ta.value.trim();
    if (!comment) { msg.className = 'msg err'; msg.textContent = t('reportEmpty'); return; }
    send.disabled = true; msg.className = 'msg'; msg.textContent = t('reportSending');
    const text = ['Урок: ' + info.title, 'Упражнение: ' + info.id, 'Язык интерфейса: ' + lang, 'Задание: ' + info.task, ...(info.orig && info.orig !== info.task ? ['Задание (оригинал): ' + info.orig] : []),
      'Правильный ответ в приложении: ' + info.correct, 'Ответ пользователя: ' + (info.mine || '—'),
      'Комментарий: ' + comment, 'Контакт: ' + (contact.value.trim() || '—')].join('\n');
    let ok = false;
    try { ok = await sendReport(text, '[Český trenér] ' + info.id); } catch (e) { ok = false; }
    if (ok) { msg.className = 'msg ok'; msg.textContent = t('reportThanks'); ta.value = ''; ta.disabled = true; contact.disabled = true; setTimeout(() => sheet.remove(), 1800); }
    else { msg.className = 'msg err'; msg.textContent = t('reportFail'); send.disabled = false; }
  });
  document.body.append(sheet);
  setTimeout(() => ta.focus(), 50);
}

// ---------- Озвучка ----------
// Читаем только чешский текст: без подсказок на другом языке, пометок в скобках и пояснений вроде «Формально:».
function sayText(e) {
  if (e.say) return e.say;
  const ans = e.t === 'f' ? e.a[0] : e.a;
  let txt = e.t === 'b' ? e.a[0] : (e.q && e.q.includes('___') ? e.q.replace('___', ans) : ans);
  txt = txt.replace(/^.*[=→]\s*/, '');   // «14:10 → Je čtrnáct deset» читаем только после стрелки
  txt = txt.replace(/^[^:_]{1,40}:\s+(?=\S)/, '')   // «Формально: …»
    .replace(/\([^)]*\)/g, ' ')                       // «(Adam)», «(2)», «(%)»
    .replace(/[\u0400-\u04FF]+/g, ' ')                  // остатки кириллицы
    .replace(/\s+([.,!?;:])/g, '$1').replace(/\s+/g, ' ').trim();
  return txt || String(ans);
}
let czVoice = null;
function pickVoice() {
  const vs = speechSynthesis.getVoices();
  if (vs.length) czVoice = vs.find(v => v.lang && v.lang.toLowerCase().replace('_', '-').startsWith('cs')) || null;
}
if ('speechSynthesis' in window) { pickVoice(); speechSynthesis.addEventListener && speechSynthesis.addEventListener('voiceschanged', pickVoice); }
function speak(text) {
  if (!('speechSynthesis' in window) || !text) return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'cs-CZ'; u.rate = 0.9;
  if (!czVoice) pickVoice();
  if (czVoice) u.voice = czVoice;
  // небольшая пауза после cancel(): иначе часть браузеров глотает первую фразу
  setTimeout(() => { speechSynthesis.resume(); speechSynthesis.speak(u); }, 80);
}
const speakBtn = text => h('button', { class: 'speak', 'aria-label': t('speak'), onclick: () => speak(text) }, '🔊');

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
  screen = 'home';
  const wl = wrongList();
  const goal = Math.min(100, Math.round(todayXp() / DAILY_GOAL * 100));
  const units = [];
  for (const l of LESSONS) {
    let u = units.find(u => u.name === l.unit);
    if (!u) units.push(u = { name: l.unit, items: [] });
    u.items.push(l);
  }
  const lookIn = h('input', { class: 'lookup-in', type: 'search', placeholder: t('lookupPh'), autocomplete: 'off', autocapitalize: 'off', spellcheck: 'false', enterkeyhint: 'search' });
  // одно поле: слово сразу открывается в основном словаре; если не нашлось — под полем ссылка на второй вариант с тем же словом
  const lookHint = h('div', { class: 'lk-hint', hidden: '' }, t('notFound') + ' ');
  const look = () => {
    const q = lookIn.value.trim(); if (!q) return;
    window.open(mainUrl(q), '_blank', 'noopener');
    lookHint.replaceChildren(t('notFound') + ' ', h('a', altProps(q), altName())); lookHint.hidden = false;
  };
  lookIn.addEventListener('keydown', ev => { if (ev.key === 'Enter') look(); });
  const vocabBlock = VOCAB.length ? [
    h('div', { class: 'unit' }, t('vocabUnit')),
    VOCAB.map(set => {
      const p = lessonPct(set);
      return h('button', { class: 'lesson' + (p >= 80 ? ' done' : ''), onclick: () => openVocab(set) },
        h('span', { class: 'ic' }, set.icon),
        h('span', { class: 'tx' }, h('b', {}, tSet(set)), h('small', {}, t('nWords', { n: set.words.length })), h('div', { class: 'mini' }, h('i', { style: 'width:' + p + '%' }))),
        h('span', { class: 'pct' }, S.done[set.id] ? p + '%' : ''));
    }),
  ] : null;
  mount(
    h('div', { class: 'top' },
      h('h1', {}, t('appTitle')),
      langSwitch(),
      h('div', { class: 'stats' }, h('span', { class: 'stat' }, '🔥 ' + S.streak), h('span', { class: 'stat' }, '⭐ ' + S.xp))),
    h('div', { class: 'today' },
      h('b', {}, t('goal', { n: todayXp(), max: DAILY_GOAL })),
      h('div', { class: 'bar' }, h('i', { style: 'width:' + goal + '%' }))),
    h('div', { class: 'quick' },
      h('button', { class: 'qbtn alt', disabled: wl.length ? false : 'disabled', onclick: () => startSession(reviewSet(), () => t('reviewTitle')) },
        t('myMistakes'), h('small', {}, wl.length ? t('mistakesWait', { n: wl.length }) : t('noMistakes'))),
      h('button', { class: 'qbtn', onclick: () => startSession(mixSet(), () => t('mixTitle')) },
        t('mix'), h('small', {}, t('mixSub')))),
    h('div', { class: 'lookup' }, lookIn, h('button', { class: 'lk', onclick: look, 'aria-label': t('lookupLabel') }, '🔎')),
    lookHint,
    vocabBlock,
    units.map(u => [
      h('div', { class: 'unit' }, tUnit(u.name)),
      u.items.map(l => {
        const p = lessonPct(l);
        return h('button', { class: 'lesson' + (p >= 80 ? ' done' : ''), onclick: () => openLesson(l) },
          h('span', { class: 'ic' }, l.icon),
          h('span', { class: 'tx' }, h('b', {}, tLesson(l)), h('small', {}, tDesc(l)), h('div', { class: 'mini' }, h('i', { style: 'width:' + p + '%' }))),
          h('span', { class: 'pct' }, S.done[l.id] ? p + '%' : ''));
      }),
    ]),
    h('p', { class: 'lk-hint', style: 'text-align:center;margin:20px 0 4px' }, t('statsNote')),
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
  startSession(lessonSet(l), () => tLesson(l), l);
}
function showRule(l) {
  const sheet = h('div', { class: 'sheet', onclick: ev => { if (ev.target === sheet) sheet.remove(); } },
    h('div', {}, h('h3', {}, l.icon + ' ' + (l.id.startsWith('v-') ? l.title : tLesson(l))), h('div', { html: ruleOf(l) }),
      h('button', { class: 'main', onclick: () => sheet.remove() }, t('ok'))));
  document.body.append(sheet);
}

// ---------- Сессия ----------
let run = null;

function startSession(items, title, lesson) {
  if (!items.length) return home();
  run = { title, lesson, list: items.map(x => ({ ...x, retry: false, res: null })), total: items.length, solved: 0, firstTry: 0, xp: 0, mistakes: 0, cur: null };
  renderExercise(run.list[0]);
}

// следующий вопрос без ответа: сначала дальше по списку, потом с начала; ответили на всё — итоги
function next() {
  const n = run.list.length, i = run.list.indexOf(run.cur);
  for (let k = 1; k <= n; k++) {
    const it = run.list[(i + k) % n];
    if (!it.res) return renderExercise(it);
  }
  finish();
}

function renderExercise(item) {
  screen = 'ex';
  run.cur = item;
  // при смене языка словарные вопросы пересобираем (те же слова и те же неверные варианты)
  if (item.e.vocab && item.lang !== lang) {
    const set = VOCAB.find(x => x.id === item.l.id);
    const [wi, kind] = String(item.i).split(':');
    if (set) { item.e = makeVocab(set, +wi, kind, item.e._fixed); item.l = vocabLesson(set); }
  }
  item.lang = lang;
  const { l } = item;
  const e = exOf(l, item.i, item.e);
  let checked = false;
  let getAnswer, restore = () => {}, isReady = () => false;
  const body = h('div', { class: 'ex' });
  const footBox = h('div', {});
  const foot = h('div', { class: 'foot' }, footBox);
  const btn = h('button', { class: 'main', disabled: 'disabled' }, t('check'));
  footBox.append(btn);

  let inlineBtn = null;   // кнопка «Проверить» прямо под полем ввода — видна над клавиатурой
  const setReady = ok => { for (const b of [btn, inlineBtn]) if (b) { if (ok) b.removeAttribute('disabled'); else b.setAttribute('disabled', 'disabled'); } };

  // --- выбор варианта ---
  if (e.t === 'c') {
    let sel = null;
    const opts = shuffle([e.a, ...e.w]);
    const btns = opts.map(o => h('button', { class: 'opt', onclick: () => { if (checked) return; sel = o; btns.forEach(b => b.classList.toggle('sel', b === btnOf(o))); setReady(true); } }, o));
    const btnOf = o => btns[opts.indexOf(o)];
    const parts = e.q.split('___');
    body.append(h('div', { class: 'kind' }, e.q.includes('___') ? t('kindBlank') : t('kindPick')),
      h('div', { class: 'q' }, h('span', {}, parts.length > 1 ? [parts[0], h('span', { class: 'blank' }, ' '), parts[1]] : e.q)),
      h('div', { class: 'opts' }, btns));
    getAnswer = () => ({ ok: sel === e.a, mine: sel, show: e.a, say: e.q.includes('___') ? e.q.replace('___', e.a) : e.a, mark: ok => btns.forEach(b => { if (b.textContent === e.a) b.classList.add('right'); else if (b.textContent === sel && !ok) b.classList.add('wrong'); }) });
    isReady = () => sel != null;
    restore = res => { sel = res.pick >= 0 ? e.w[res.pick] : e.a; btns.forEach(b => b.classList.toggle('sel', b.textContent === sel)); };
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
    body.append(h('div', { class: 'kind' }, t('kindType')),
      h('div', { class: 'q' }, h('span', {}, parts.length > 1 ? [parts[0], h('span', { class: 'blank' }, ' '), parts[1]] : e.q)),
      input, chars,
      inlineBtn = h('button', { class: 'main inline', type: 'button', disabled: 'disabled', onclick: () => btn.click() }, t('check')));
    if (!item.res) { foot.classList.add('pre'); setTimeout(() => input.focus(), 50); }   // кнопка проверки — под полем, нижняя панель появится с результатом
    // тап по пустому месту опускает клавиатуру
    body.addEventListener('click', ev => { if (ev.target === body || ev.target.classList.contains('kind') || ev.target.classList.contains('q')) input.blur(); });
    getAnswer = () => {
      const val = clean(input.value);
      const exact = e.a.some(a => clean(a) === val);
      const loose = !exact && e.a.some(a => strip(clean(a)) === strip(val));
      return { ok: exact || loose, loose, mine: input.value.trim(), show: e.a[0], say: e.q.replace('___', e.a[0]), mark: ok => input.classList.add(ok ? 'right' : 'wrong') };
    };
    isReady = () => input.value.trim().length > 0;
    restore = res => { input.value = res.mine; };
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
    body.append(h('div', { class: 'kind' }, t('kindBuild')),
      h('div', { class: 'q' }, h('span', {}, e.ru)),
      area, bank);
    draw();
    getAnswer = () => {
      const got = clean(chosen.map(t => t.w).join(' '));
      const ok = e.a.some(a => clean(a) === got);
      return { ok, mine: chosen.map(t => t.w).join(' '), show: e.a[0] + '.', say: e.a[0], mark: ok2 => area.classList.add(ok2 ? 'right' : 'wrong') };
    };
    isReady = () => chosen.length > 0;
    restore = res => {
      for (const w of res.mine.split(/\s+/).filter(Boolean)) { const tl = tiles.find(x => !x.used && x.w === w); if (tl) { tl.used = true; chosen.push(tl); } }
      draw();
    };
  }

  btn.addEventListener('click', () => {
    if (checked) { next(); return; }
    if (!isReady()) return;
    settle(getAnswer(), true);
  });

  function settle(r, fresh) {
    checked = true;
    if (inlineBtn) inlineBtn.hidden = true;
    if (document.activeElement && document.activeElement.blur) document.activeElement.blur();   // клавиатура опускается сама
    r.say = sayText(item.e);   // озвучка строится из исходного упражнения: на любом языке читается один и тот же чешский текст
    r.mark(r.ok);
    const id = exId(l, item.i);
    if (fresh) {
    if (r.ok) {
      if (!item.retry) { run.firstTry++; run.xp += 10; if (S.wrong[id]) { S.wrong[id]--; if (S.wrong[id] <= 0) delete S.wrong[id]; } }
      else run.xp += 3;
      run.solved++;
    } else {
      run.mistakes++;
      S.wrong[id] = Math.min((S.wrong[id] || 0) + 1, 5);
      run.list.push({ ...item, retry: true, res: null });
    }
    save();
    track(r.ok ? 'exercise/ok' : 'exercise/wrong', r.ok ? 'Задание: верно' : 'Задание: ошибка');
    item.res = { ok: r.ok, loose: r.loose, mine: r.mine, pick: e.t === 'c' ? (r.mine === e.a ? -1 : e.w.indexOf(r.mine)) : -1 };
    }
    const whyText = e.vocab ? [e.why, e.opt && e.opt[r.mine]].filter(Boolean).join(' ') : whyOf(l.id, item.i);
    const whyBox = whyText ? h('div', { class: 'why', hidden: r.ok ? '' : null },
      !r.ok ? h('div', {}, t('yourAnswer'), h('b', {}, r.mine || '—')) : null,
      h('div', {}, '💡 ' + whyText),
      !e.vocab && whyRuleOf(l.id) ? h('div', {}, t('ruleLabel') + whyRuleOf(l.id)) : null) : null;
    foot.className = 'foot ' + (r.ok ? 'ok' : 'bad');
    footBox.replaceChildren(
      h('div', { class: 'fb' },
        h('strong', {}, r.ok ? [t('good'), pick(['👍', '🎉', '💪', '✨'])] : t('bad')),
        r.ok && r.loose ? h('div', {}, t('looseOk'), h('b', {}, r.show)) : null,
        !r.ok ? h('div', {}, t('correct'), h('b', {}, r.show)) : null,
        !r.ok && e.tip ? h('div', { class: 'tip' }, '💡 ' + e.tip) : null,
        r.ok && whyBox ? h('div', { class: 'tip' }, h('a', { onclick: () => { whyBox.hidden = !whyBox.hidden; } }, t('why'))) : null,
        whyBox,
        e.vocab ? h('div', { class: 'tip' }, h('a', { href: mainUrl(e.vocab), target: '_blank', rel: 'noopener' }, '🔎 ' + e.vocab + t('inSeznam')), ' · ',
          h('a', altProps(e.vocab), altName())) : null,
        !r.ok ? h('div', { class: 'tip' }, h('a', { onclick: () => showRule(l) }, t('openRule'))) : null,
        REPORT_KEY ? h('div', { class: 'tip' }, h('a', { onclick: () => openReport({
          id: e.vocab ? l.id + ' · ' + e.vocab + ' (' + item.i + ')' : exId(l, item.i), title: l.title,
          task: (e.t === 'b' ? e.ru : e.q) || '', orig: (item.e.t === 'b' ? item.e.ru : item.e.q) || '', correct: r.show, mine: r.mine }) }, t('reportBtn'))) : null),
      h('div', { style: 'display:flex;gap:10px' },
        h('button', { class: 'speak', style: 'height:auto;width:56px;flex:none', 'aria-label': t('speak'), onclick: () => speak(r.say) }, '🔊'),
        h('div', { style: 'flex:1' }, btn)));
    btn.textContent = t('nextBtn');
    btn.removeAttribute('disabled');
    if (fresh) speak(r.say);
  }

  const pct = Math.round(run.solved / run.total * 100);
  mount(
    h('div', { class: 'head' },
      h('button', { class: 'x', 'aria-label': t('exit'), onclick: () => { if (confirm(t('exitConfirm'))) { speechSynthesis && speechSynthesis.cancel(); home(); } } }, '✕'),
      h('div', { class: 'bar' }, h('i', { style: 'width:' + pct + '%' })),
      langSwitch(),
      h('button', { class: 'help', 'aria-label': t('rule'), onclick: () => showRule(l) }, '?')),
    questionNav(item), body, foot);
  // ответ уже дан, а язык сменили: показываем тот же результат без повторного зачёта
  if (item.res) { restore(item.res); settle(getAnswer(), false); }
}
const pick = a => a[Math.floor(Math.random() * a.length)];

// кнопки внизу поднимаются над экранной клавиатурой
if (window.visualViewport) {
  const lift = () => {
    const f = document.querySelector('.foot'); if (!f) return;
    const vv = window.visualViewport, off = window.innerHeight - vv.height - vv.offsetTop;
    f.style.transform = off > 80 ? 'translateY(' + (-off) + 'px)' : '';
  };
  window.visualViewport.addEventListener('resize', lift);
  window.visualViewport.addEventListener('scroll', lift);
}

// Листание между всеми вопросами сессии (отвеченными и нет)
function questionNav(cur) {
  const i = run.list.indexOf(cur), n = run.list.length;
  const go = d => () => renderExercise(run.list[i + d]);
  return h('div', { class: 'qnav' },
    h('button', { 'aria-label': t('prevQ'), disabled: i > 0 ? false : 'disabled', onclick: go(-1) }, '‹'),
    h('span', {}, (i + 1) + ' / ' + n),
    h('button', { 'aria-label': t('nextQ'), disabled: i < n - 1 ? false : 'disabled', onclick: go(1) }, '›'));
}

// ---------- Итоги ----------
function finish() {
  screen = 'fin';
  const acc = Math.round(run.firstTry / run.total * 100);
  addXp(run.xp);
  track('session-done/' + (run.lesson ? run.lesson.id : 'mix-or-review'), 'Сессия завершена');
  if (run.lesson) {
    const d = S.done[run.lesson.id] || { best: 0, times: 0 };
    d.best = Math.max(d.best, acc); d.times++;
    S.done[run.lesson.id] = d; save();
  }
  const emoji = acc >= 90 ? '🏆' : acc >= 70 ? '🎉' : acc >= 50 ? '💪' : '📚';
  const msg = acc >= 90 ? t('resGreat') : acc >= 70 ? t('resGood') : acc >= 50 ? t('resOk') : t('resLow');
  mount(h('div', { class: 'result' },
    h('div', { class: 'big' }, emoji),
    h('h2', {}, msg),
    h('div', { style: 'color:var(--muted)' }, typeof run.title === 'function' ? run.title() : run.title),
    h('div', { class: 'nums' },
      h('div', {}, h('b', {}, '+' + run.xp), h('small', {}, 'XP')),
      h('div', {}, h('b', {}, acc + '%'), h('small', {}, t('firstTry'))),
      h('div', {}, h('b', {}, '🔥 ' + S.streak), h('small', {}, t('streakDays')))),
    h('button', { class: 'main', onclick: home }, t('cont')),
    run.mistakes ? h('p', { style: 'color:var(--muted);font-size:15px' }, t('savedMistakes')) : null));
}

home();

if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}
