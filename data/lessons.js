// Уроки собраны по конспекту ONL3_26/27 (занятия 5.10 – 30.10).
// c(вопрос, правильный, [неправильные], подсказка)  - выбор варианта (___ = пропуск)
// f(вопрос, правильный|[варианты], подсказка)        - вписать слово (диакритику можно не ставить)
// b(перевод, фраза|[варианты], [лишние слова], подсказка) - собрать предложение из слов
const c = (q, a, w, tip) => ({ t: 'c', q, a, w, tip });
const f = (q, a, tip) => ({ t: 'f', q, a: [].concat(a), tip });
const b = (ru, a, x, tip) => ({ t: 'b', ru, a: [].concat(a), x: x || [], tip });

window.LESSONS = [

// ───────────────────────── 1. SEZNÁMENÍ ─────────────────────────
{
  id: 'byt', unit: '1. Знакомство', icon: '👋', title: 'Být: я, ты, он…',
  desc: 'jsem, jsi, je, jsme, jste, jsou',
  rule: `<p><b>být</b> (быть) — самый важный глагол:</p>
<table><tr><td>já <b>jsem</b></td><td>my <b>jsme</b></td></tr>
<tr><td>ty <b>jsi</b></td><td>vy <b>jste</b></td></tr>
<tr><td>on/ona <b>je</b></td><td>oni <b>jsou</b></td></tr></table>
<p>Местоимение часто опускают: <i>Jsem Lucie. = Já jsem Lucie. = Jmenuju se Lucie.</i></p>
<p>Откуда: <i>Jsem <b>z</b> Ukrajiny / z Kazachstánu / z Asie / z Evropy.</i></p>`,
  ex: [
    c('Já ___ Lucie.', 'jsem', ['jsi', 'je']),
    c('Ty ___ z Ukrajiny?', 'jsi', ['jsem', 'jsou']),
    c('Ona ___ z Kazachstánu.', 'je', ['jsou', 'jsem']),
    c('My ___ studenti.', 'jsme', ['jste', 'jsou']),
    c('Vy ___ z Asie?', 'jste', ['jsme', 'jsou']),
    c('On a ona ___ z Ukrajiny.', 'jsou', ['je', 'jste']),
    f('Já ___ z Kyrgyzstánu.', 'jsem'),
    f('Oni ___ z Evropy.', 'jsou'),
    f('Ona ___ z Izraele.', 'je'),
    c('— Jak se máš?  — ___', 'Dobře, a ty?', ['Těší mě.', 'Jsem z Asie.']),
    c('— Moc mě těší.  — ___', 'Taky mě těší.', ['Dobře, a ty?', 'Jsem z Asie.']),
    c('Как сказать «меня зовут Люси»?', 'Jmenuju se Lucie.', ['Jsem z Lucie.', 'Mám Lucie.']),
    b('Меня зовут Петр', ['Jmenuju se Petr', 'Já jsem Petr', 'Jsem Petr'], ['jsi', 'Petra']),
    b('Они из Украины', ['Oni jsou z Ukrajiny', 'Jsou z Ukrajiny'], ['je', 'jsem']),
    b('Я из Азии', 'Jsem z Asie', ['jsi', 'Evropy']),
  ],
},
{
  id: 'dialogy', unit: '1. Знакомство', icon: '💬', title: 'Диалоги и приглашение',
  desc: 'formálně / neformálně, nechceš jít…?',
  rule: `<p><b>ты</b> (неформально) и <b>вы</b> (формально):</p>
<p>Jak se <b>máš</b>? / Jak se <b>máte</b>?<br>Kolik <b>ti</b> je let? / Kolik <b>vám</b> je let?<br><b>Měj</b> se hezky! / <b>Mějte</b> se hezky!</p>
<p>Приглашение: <i>Nechceš jít do kina? — A kdy? — Hodí se ti to? — Ano, hodí. Těším se!</i></p>`,
  ex: [
    c('Формально: Jak se ___?', 'máte', ['máš', 'mají']),
    c('Неформально: Kolik ___ je let?', 'ti', ['vám', 'mi']),
    c('Формально: Kolik ___ je let?', 'vám', ['ti', 'mi']),
    c('Другу: ___ se hezky!', 'Měj', ['Mějte', 'Mám']),
    c('Учителю: ___ se hezky!', 'Mějte', ['Měj', 'Máte']),
    c('Nechceš ___ do kina?', 'jít', ['jdeš', 'půjdu']),
    c('A kdy se (my) ___?', 'sejdeme', ['sejdu', 'sejdete']),
    c('— Hodí se ti to?  — Ano, ___. Těším se!', 'hodí', ['hodíš', 'hodím']),
    c('Вежливо спросить дорогу: «Извините, вы не знаете, где…?»', 'Prosím vás, nevíte, kde je…?', ['Prosím vás, nevím, kde je…?', 'Prosím vás, nevíš, kde je…?']),
    b('Не хочешь пойти в кино?', 'Nechceš jít do kina', ['jdeš', 'na']),
    b('Когда встретимся?', 'Kdy se sejdeme', ['sejdu', 'jsme']),
    b('Тебе это подходит?', 'Hodí se ti to', ['vám', 'tě']),
    b('Как поживаете?', 'Jak se máte', ['máš', 'mám']),
    b('Всего хорошего (вам)!', 'Mějte se hezky', ['Měj', 'hezký']),
  ],
},
{
  id: 'vokativ', unit: '1. Знакомство', icon: '📣', title: 'Vokativ — обращение',
  desc: 'Ahoj, Petře! Dobrý den, pane Nováku',
  rule: `<p>К человеку обращаются в особой форме — <b>vokativ</b>:</p>
<p>Lucie → <i>Ahoj, Lucie!</i> · Eva → <i>Evo</i> · Jana → <i>Jano</i><br>
Adam → <i>Adame</i> · Viktor → <i>Viktore</i> · Petr → <i>Petře</i> · Jan → <i>Jane</i> · Karel → <i>Karle</i><br>
Tomáš → <i>Tomáši</i> · Alexej → <i>Alexeji</i> · Jiří → <i>Jiří</i> · Dagmar → <i>Dagmar</i> (или Dagmaro)</p>
<p>Иностранные имена часто оставляют без изменений (<i>Oleksii!</i>). Формы на -o для имён на -a (<i>Kláro, Evo</i>) — для «чешских» вариантов имён.</p>
<p>Формально: pan Novák → <i>Dobrý den, <b>pane Nováku</b></i>; paní Nováková → <i>paní Nováková</i></p>`,
  ex: [
    c('Ahoj, ___! (Adam)', 'Adame', ['Adam', 'Adama']),
    c('Ahoj, ___! (Viktor)', 'Viktore', ['Viktor', 'Viktoru']),
    c('Ahoj, ___! (Petr)', 'Petře', ['Petr', 'Petre']),
    c('Ahoj, ___! (Karel)', 'Karle', ['Karel', 'Karele']),
    c('Ahoj, ___! (Jan)', 'Jane', ['Jan', 'Jana']),
    c('Ahoj, ___! (Tomáš)', 'Tomáši', ['Tomáš', 'Tomáše']),
    c('Ahoj, ___! (Eva)', 'Evo', ['Eva', 'Evu']),
    c('Ahoj, ___! (Jana)', 'Jano', ['Jana', 'Janu']),
    c('Ahoj, ___! (Lucie)', 'Lucie', ['Lucio', 'Lucii']),
    c('Dobrý den, ___ Nováku. (pan)', 'pane', ['pan', 'pana']),
    f('Ahoj, ___! (Alexej)', 'Alexeji'),
    f('Ahoj, ___! (Klára)', 'Kláro'),
    f('Ahoj, ___! (Jiří)', 'Jiří'),
    f('Těší mě, ___. (Dagmar)', ['Dagmar', 'Dagmaro']),
  ],
},

// ───────────────────────── 2. SLOVA, ČÍSLA, RODINA ─────────────────────────
{
  id: 'rody', unit: '2. Слова, числа, семья', icon: '🧩', title: 'Род и прилагательные',
  desc: 'ten / ta / to, dobrý / dobrá / dobré',
  rule: `<p>Три рода: <b>ten</b> (м.) · <b>ta</b> (ж.) · <b>to</b> (ср.). Прилагательное меняется вслед за ним:</p>
<table><tr><td>ten film</td><td>je dobr<b>ý</b></td></tr>
<tr><td>ta polévka</td><td>je dobr<b>á</b></td></tr>
<tr><td>to dítě</td><td>je dobr<b>é</b></td></tr></table>
<p><b>dobrý</b> про вещи/еду/результат: <i>dobrá polévka</i>.<br>
<b>hodný</b> про добрый, послушный характер: <i>hodná žena, hodné dítě</i>. <i>Dobrá žena</i> — это «хороший человек» или «мастер своего дела», а не просто «милая». Про еду и вещи — только <b>dobrý</b>.</p>
<p>vlevo/vpravo/vzadu/vpředu: <i>Vzadu <b>jsou</b> dveře</i> (dveře — мн. число).</p>`,
  ex: [
    c('___ guláš je dobrý.', 'Ten', ['Ta', 'To']),
    c('___ polévka je dobrá.', 'Ta', ['Ten', 'To']),
    c('___ dítě je malé.', 'To', ['Ten', 'Ta']),
    c('Ten film je ___.', 'špatný', ['špatná', 'špatné']),
    c('Ta polévka je ___. (вкусная)', 'dobrá', ['hodná', 'dobrý']),
    c('Ta žena je ___. (добрая, милая по характеру)', 'hodná', ['hodný', 'hodné'], 'Про характер говорят hodná. «Ta žena je dobrá» чаще значит «она хороша в своём деле».'),
    c('Ten muž je ___. (сильный)', 'silný', ['silná', 'silné']),
    c('To auto je ___. (новое)', 'nové', ['nový', 'nová']),
    c('Ta holka je malá a ___.', 'hodná', ['hodný', 'hodné']),
    c('Ten dům je ___. (старомодный)', 'staromódní', ['staromódná', 'staromódné'], 'Прилагательные на -í не меняются по родам.'),
    f('Ta maminka je ___. (высокая)', 'vysoká'),
    f('To dítě je ___. (маленькое)', 'malé'),
    f('Ten pokoj je ___. (чистый)', 'čistý'),
    b('Этот гуляш вкусный', 'Ten guláš je dobrý', ['Ta', 'dobrá']),
    b('Эта женщина добрая', 'Ta žena je hodná', ['dobrá', 'Ten']),
    b('Сзади находятся двери', 'Vzadu jsou dveře', ['je', 'vpředu']),
  ],
},
{
  id: 'cisla', unit: '2. Слова, числа, семья', icon: '🔢', title: 'Числа 0–1000',
  desc: 'nula … sto … tisíc, dva/dvě',
  rule: `<p>0 nula · 1 jedna · 2 dva · 3 tři · 4 čtyři · 5 pět · 6 šest · 7 sedm · 8 osm · 9 devět · 10 deset</p>
<p>11 jedenáct · 12 dvanáct · 13 třináct · 14 čtrnáct · 15 patnáct · 16 šestnáct · 17 sedmnáct · 18 osmnáct · 19 devatenáct</p>
<p>20 dvacet · 30 třicet · 40 čtyřicet · 50 padesát · 60 šedesát · 70 sedmdesát · 80 osmdesát · 90 devadesát · 100 sto</p>
<p>21 = dvacet jedna. 2026 = dva tisíce dvacet šest. 1982 = tisíc devět set osmdesát dva.</p>
<p><b>dva</b> (м.) · <b>dvě</b> (ж., ср.). Тысяча: 1 tisíc · 2–4 tisíce.<br>Проценты: 1 procento · 2–4 procenta · 5+ procent.</p>`,
  ex: [
    c('5', 'pět', ['šest', 'sedm']),
    c('8', 'osm', ['sedm', 'devět']),
    c('pět minus čtyři se rovná ___', 'jedna', ['dvě', 'nula']),
    f('Напиши словами: 7', 'sedm'),
    f('Напиши словами: 9', 'devět'),
    f('Напиши словами: 10', 'deset'),
    f('Напиши словами: 12', 'dvanáct'),
    f('Напиши словами: 14', 'čtrnáct'),
    f('Напиши словами: 15', 'patnáct'),
    f('Напиши словами: 19', 'devatenáct'),
    f('Напиши словами: 40', 'čtyřicet'),
    f('Напиши словами: 60', 'šedesát'),
    f('Напиши словами: 100', 'sto'),
    c('___ muži (2)', 'Dva', ['Dvě', 'Dvé']),
    c('___ kávy (2)', 'Dvě', ['Dva', 'Dvé']),
    c('___ piva (2)', 'Dvě', ['Dva', 'Dvé']),
    c('2000 = dva ___', 'tisíce', ['tisíc', 'tisíci']),
    c('5 ___ (%)', 'procent', ['procenta', 'procento']),
    c('2 ___ (%)', 'procenta', ['procent', 'procento']),
    f('2026 = dva tisíce dvacet ___', 'šest'),
    f('1982 = tisíc devět set osmdesát ___', 'dva'),
    f('Напиши словами: 21', ['dvacet jedna', 'jedenadvacet']),
    f('14,90 Kč → čtrnáct ___', 'devadesát'),
  ],
},
{
  id: 'rodina', unit: '2. Слова, числа, семья', icon: '👨‍👩‍👧', title: 'Семья и возраст',
  desc: 'Kolik ti je? Je mi…, Jak se jmenuje…?',
  rule: `<p>Возраст — через дательный: <b>mi, ti, mu, jí, nám, vám, jim</b>:<br>
<i>Je <b>mi</b> 10 let. Kolik <b>ti</b> je let? Je <b>mu</b> 14 let. Je <b>jí</b> 50 (let).</i></p>
<p>děti = syn + dcera · sourozenci = bratr + sestra · rodiče = maminka + tatínek · prarodiče = babička + dědeček · vnoučata = vnuk + vnučka</p>
<p>strýc / teta · synovec / neteř · bratranec / sestřenice · zeť / snacha · tchán / tchyně · jedináček — единственный ребёнок</p>
<p>Диалог: <i>Jak se jmenuje tvoje maminka? · Kolik jí je let? · Co dělá? · Jaká je?</i></p>`,
  ex: [
    c('Kolik ___ je let? (тебе)', 'ti', ['mi', 'jí']),
    c('Je ___ 50 let. (ей)', 'jí', ['mu', 'mi']),
    c('Je ___ 14 let. (ему)', 'mu', ['jí', 'ti']),
    c('Je ___ 10 let. (мне)', 'mi', ['ti', 'mu']),
    c('syn a dcera = ___', 'děti', ['rodiče', 'sourozenci']),
    c('bratr a sestra = ___', 'sourozenci', ['děti', 'prarodiče']),
    c('maminka a tatínek = ___', 'rodiče', ['děti', 'vnoučata']),
    c('dědeček a babička = ___', 'prarodiče', ['rodiče', 'vnoučata']),
    c('Bratr mé maminky je můj ___.', 'strýc', ['synovec', 'švagr']),
    c('Dcera mého bratra je moje ___.', 'neteř', ['sestřenice', 'snacha']),
    c('Syn mého syna je můj ___.', 'vnuk', ['synovec', 'zeť']),
    c('Manžel mé dcery je můj ___.', 'zeť', ['tchán', 'vnuk']),
    c('Nemám sourozence. Jsem ___.', 'jedináček', ['důchodce', 'synovec']),
    c('Moje babička už nepracuje. Je ___.', 'v důchodu', ['v práci', 'z důchodu']),
    b('Как зовут твою маму?', ['Jak se jmenuje tvoje maminka', 'Jak se jmenuje tvá maminka', 'Jak se jmenuje tvoje máma', 'Jak se jmenuje tvá máma'], ['tvůj', 'jmenuju']),
    b('Сколько ей лет?', 'Kolik jí je let', ['mu', 'ti']),
    b('Сколько тебе лет?', 'Kolik ti je let', ['vám', 'mi']),
    b('Что он делает?', 'Co dělá', ['je', 'děláš']),
    b('Какая твоя мама?', ['Jaká je tvoje maminka', 'Jaká je tvá maminka', 'Jaká je tvoje máma', 'Jaká je tvá máma'], ['jaký', 'tvůj']),
    b('Мне 20 лет', 'Je mi dvacet let', ['jsem', 'mě']),
  ],
},
{
  id: 'cas', unit: '2. Слова, числа, семья', icon: '🕐', title: 'Время и часть дня',
  desc: 'Kolik je hodin? V kolik hodin?',
  rule: `<p><b>Kolik je hodin?</b> — Je čtrnáct deset (14:10), Je patnáct padesát (15:50). Так читают 24-часовое время официально (вокзал, ТВ, радио). 12:00 = poledne, 00:00 = půlnoc.</p>
<p>В обычной речи часто называют по-другому (<i>čtvrt na pět, půl páté</i>) — этого в вашем конспекте ещё не было.</p>
<p><b>V kolik hodin?</b> — <i>V šest ráno · v poledne · o půlnoci</i>.</p>
<p>Часть дня: ráno · dopoledne · v poledne · odpoledne · večer · v noci.<br>
Дни: <i>v pondělí, v úterý, <b>ve</b> středu, ve čtvrtek, v pátek, v sobotu, v neděli</i>.</p>
<p>Частота: 3× <b>za</b> den/týden/měsíc/rok = 3× denně/týdně/měsíčně/ročně.</p>`,
  ex: [
    c('12:00 — Kolik je hodin?', 'Je poledne.', ['Je půlnoc.', 'Je ráno.']),
    c('00:00 — Kolik je hodin?', 'Je půlnoc.', ['Je poledne.', 'Je večer.']),
    c('Vstávám ___ šest ráno.', 'v', ['o', 'za']),
    c('Jdu spát ___ půlnoci.', 'o', ['v', 'za']),
    c('Kdy odpočíváš? — Odpočívám ___ neděli ráno.', 'v', ['na', 'o']),
    c('___ středu mám češtinu.', 'Ve', ['V', 'Na']),
    c('3× ___ týden', 'za', ['na', 'v']),
    c('Obědvám ___.', 'v poledne', ['o půlnoci', 'v noci']),
    f('14:10 → Je čtrnáct ___.', 'deset'),
    f('15:50 → Je patnáct ___.', 'padesát'),
    f('20:15 → Je dvacet ___.', 'patnáct'),
    f('17:35 → Je sedmnáct ___ pět.', 'třicet'),
    f('9:20 → Je devět ___.', 'dvacet'),
    f('22:55 → Je dvacet dva padesát ___.', 'pět'),
    b('Сколько времени?', 'Kolik je hodin', ['hodina', 'kdy']),
    b('Я встаю в 6 утра', ['Vstávám v šest ráno', 'Vstávám v 6 ráno', 'Ráno vstávám v šest'], ['o', 'večer']),
    b('Я иду спать в полночь', 'Jdu spát o půlnoci', ['v', 'půlnoc']),
    b('Утром я не завтракаю', 'Ráno nesnídám', ['snídám', 'večer']),
  ],
},

// ───────────────────────── 3. SLOVESA ─────────────────────────
{
  id: 'ovat', unit: '3. Глаголы', icon: '⚙️', title: 'Глаголы на -OVAT',
  desc: 'pracovat → pracuju, pracuješ…',
  rule: `<p>-ovat → корень + <b>-uju, -uješ, -uje, -ujeme, -ujete, -ujou</b></p>
<p><i>pracovat: pracuju, pracuješ, pracuje, pracujeme, pracujete, pracujou</i><br>
В письменной речи: -uji, -uješ, -uje, -ujeme, -ujete, -<b>ují</b>.</p>
<p>studovat · tancovat · telefonovat · lyžovat · cestovat · malovat · kupovat / nakupovat · sportovat · fotografovat · procvičovat · opakovat · opravovat · milovat · kontrolovat · jmenovat se</p>`,
  ex: [
    f('Já (pracovat) ___ každý den.', ['pracuju', 'pracuji']),
    f('Ty (studovat) ___ češtinu?', 'studuješ'),
    f('On (tancovat) ___ rád.', 'tancuje'),
    f('My (nakupovat) ___ v neděli.', 'nakupujeme'),
    f('Vy (telefonovat) ___ často?', 'telefonujete'),
    f('Oni (cestovat) ___ do Prahy.', ['cestujou', 'cestují']),
    f('Já se (jmenovat) ___ Dimash.', ['jmenuju', 'jmenuji']),
    f('Ona (malovat) ___ obrazy.', 'maluje'),
    c('Ona ___ na počítači.', 'pracuje', ['pracuju', 'pracujou']),
    c('Já ___ gramatiku.', 'procvičuju', ['procvičuje', 'procvičujeme']),
    c('Oni ___ v restauraci.', 'pracujou', ['pracuje', 'pracuješ']),
    c('Já a Eliška ___ češtinu.', 'studujeme', ['studujete', 'studujou']),
    c('Ty ___ v pátek?', 'lyžuješ', ['lyžuje', 'lyžujeme']),
    c('Vy ___ každý den?', 'sportujete', ['sportuješ', 'sportujou']),
    b('Мы изучаем чешский каждый день', ['Studujeme češtinu každý den', 'Studujeme český jazyk každý den', 'Učíme se česky každý den'], ['studuju', 'učím']),
    b('Они работают на компьютере', ['Pracujou na počítači', 'Pracují na počítači'], ['pracuje', 'pracujeme']),
    b('Я часто путешествую', 'Často cestuju', ['cestuje', 'cestujeme']),
  ],
},
{
  id: 'at', unit: '3. Глаголы', icon: '🔧', title: 'Глаголы на -AT',
  desc: 'dělat → dělám, děláš, dělá…',
  rule: `<p>-at → <b>-ám, -áš, -á, -áme, -áte, -ají</b></p>
<p><i>dívat se: dívám se, díváš se, dívá se, díváme se, díváte se, dívají se</i></p>
<p>čekat (na) · hledat · odpovídat (na) · spěchat · poslouchat · zajímat se (o) · dělat · opakovat</p>
<p>Отрицание — <b>ne-</b> слитно с глаголом: <i>nedívám se</i>, <i>nečekám</i>, <i>nezajímáme se</i>.</p>
<p><b>se / si</b> стоят на втором месте в предложении: <i>Dívám se na televizi. Já se dívám na televizi. Nedívám se na televizi.</i></p>`,
  ex: [
    f('Já se ___ na televizi každý den. (dívat)', 'dívám'),
    f('Ty (čekat) ___ na kamaráda?', 'čekáš'),
    f('Ona (hledat) ___ mobil.', 'hledá'),
    f('My (poslouchat) ___ hudbu.', 'posloucháme'),
    f('Vy (odpovídat) ___ na otázku.', 'odpovídáte'),
    f('Oni (spěchat) ___ každý den.', ['spěchají', 'spěchaj']),
    f('Díváš se na televizi? — Ne, ___ se na televizi. (nedívat)', 'nedívám'),
    c('Filip se ___ o literaturu.', 'zajímá', ['zajímám', 'zajímáš']),
    c('Já a Eliška se ___ o literaturu.', 'nezajímáme', ['nezajímají', 'nezajímáte']),
    c('Klára ___ podcast každý den.', 'poslouchá', ['posloucháme', 'posloucháš']),
    c('Čekáš na kamaráda každý den? — Ne, ___ na kamaráda.', 'nečekám', ['nečeká', 'nečekáš']),
    c('Co ___? (ты делаешь)', 'děláš', ['dělám', 'dělá']),
    b('Я смотрю телевизор не каждый день', 'Nedívám se na televizi každý den', ['dívám', 'televize']),
    b('Клара слушает подкаст каждый день', 'Klára poslouchá podcast každý den', ['posloucháme', 'podcastu']),
    b('Ты ждёшь друга?', 'Čekáš na kamaráda', ['čeká', 'kamarád']),
    b('Они отвечают на вопрос', ['Odpovídají na otázku', 'Odpovídaj na otázku'], ['odpovídá', 'otázka']),
    b('Я ищу телефон', ['Hledám mobil', 'Hledám telefon'], ['hledá', 'telefonu']),
  ],
},
{
  id: 'rad', unit: '3. Глаголы', icon: '❤️', title: 'Rád / ráda / rádi',
  desc: 'Rád tancuju, nerad uklízím',
  rule: `<p><b>rád</b> (м.) · <b>ráda</b> (ж.) · <b>rádi</b> (группа парней или смешанная группа; только девушки — <b>rády</b>) + глагол: <i>Viktor <b>rád</b> tancuje. Sára <b>ráda</b> hraje karty. My <b>rádi</b> posloucháme hudbu.</i></p>
<p>Отрицание: <b>nerad, nerada, neradi</b>.</p>
<p>Вопрос: <i>Co <b>rád</b> děláš? Co <b>ráda</b> děláš?</i> · Ответ: <i>Ano, rád tancuju. / Ne, nerad tancuju.</i></p>`,
  ex: [
    c('Viktor ___ tancuje.', 'rád', ['ráda', 'rádi']),
    c('Sára ___ hraje karty.', 'ráda', ['rád', 'rádi']),
    c('My ___ posloucháme hudbu.', 'rádi', ['rád', 'ráda']),
    c('Klára ___ plave. (не любит)', 'nerada', ['nerad', 'neradi']),
    c('Já a Natálie ___ tancujeme. (не любим; я парень)', 'neradi', ['nerada', 'nerad']),
    c('Tancuješ rád? — Ne, ___ tancuju.', 'nerad', ['nerádi', 'nerada']),
    c('Co ___ děláš? (ты, девушка)', 'ráda', ['rád', 'rádi']),
    c('Co ___ děláte? (вы, парни или смешанная группа)', 'rádi', ['rád', 'ráda']),
    f('Adam ___ čte knihu. (не любит)', 'nerad'),
    f('Co ___ děláš? (ты, парень)', 'rád'),
    f('Daniel a Jakub ___ uklízejí. (не любят)', 'neradi'),
    b('Я люблю танцевать', ['Rád tancuju', 'Ráda tancuju', 'Rád tancuji', 'Ráda tancuji'], ['Ráda', 'tancuji', 'tancuje']),
    b('Мы любим слушать музыку', 'Rádi posloucháme hudbu', ['rád', 'poslouchá']),
    b('Ты любишь убираться?', ['Uklízíš rád', 'Uklízíš ráda'], ['ráda', 'uklízím']),
    b('Он не любит читать книги', ['Nerad čte knihu', 'Nerad čte knihy'], ['knihy', 'nerádi']),
    b('Она любит играть в карты', 'Ráda hraje karty', ['rád', 'hraju']),
  ],
},
{
  id: 'nepr', unit: '3. Глаголы', icon: '🌞', title: 'Режим дня, неправильные',
  desc: 'snídám, čtu, píšu, vím, spím…',
  rule: `<p>Режим дня: <b>vstávat</b> (vstávám) · <b>snídat</b> (snídám) · <b>obědvat</b> (obědvám) · <b>večeřet</b> (večeřím) · <b>uklízet</b> (uklízím) · <b>vařit</b> (vařím) · jít spát</p>
<p>Учим глагол так: 1) значение 2) infinitiv 3) форма «já» 4) «oni» (если нестандартно).</p>
<table><tr><td>spát</td><td>spím</td></tr><tr><td>číst</td><td>čtu</td></tr><tr><td>psát</td><td>píšu</td></tr><tr><td>mít</td><td>mám</td></tr><tr><td>vědět</td><td>vím (oni <b>vědí</b>)</td></tr><tr><td>plavat</td><td>plavu</td></tr><tr><td>běhat</td><td>běhám</td></tr></table>`,
  ex: [
    c('Ráno ___ kávu a omeletu. (завтракаю)', 'snídám', ['obědvám', 'večeřím']),
    c('V poledne ___ pizzu.', 'obědvám', ['snídám', 'večeřím']),
    c('Večer ___ v restauraci.', 'večeřím', ['snídám', 'obědvám']),
    c('Ráno ___ v šest. (встаю)', 'vstávám', ['uklízím', 'spím']),
    c('Jdu ___ o půlnoci.', 'spát', ['spím', 'spí']),
    c('Odpoledne ___ karty.', 'hraju', ['hraješ', 'hrají']),
    f('Večer ___ a vařím. (uklízet)', 'uklízím'),
    f('Dopoledne ___ a telefonuju. (pracovat)', ['pracuju', 'pracuji']),
    f('Čteš knihu? — Ano, ___ knihu. (číst)', 'čtu'),
    f('Ty ___ e-mail? (psát)', 'píšeš'),
    f('Já ___, kde je škola. (vědět)', 'vím'),
    f('Já ___ v noci. (spát)', 'spím'),
    f('Ona ___ každý den. (plavat)', 'plave'),
    f('Večer ___ večeři. (vařit, já)', 'vařím'),
    b('Я читаю книгу', 'Čtu knihu', ['čte', 'knihy']),
    b('Я пишу домашнее задание', ['Píšu domácí úkol', 'Píšu domácí úkoly'], ['píše', 'úkoly']),
    b('Утром я не завтракаю', 'Ráno nesnídám', ['snídám', 'v']),
    b('Вечером я убираюсь и готовлю', 'Večer uklízím a vařím', ['uklízí', 'vaří']),
  ],
},
{
  id: 'hrat', unit: '3. Глаголы', icon: '🎸', title: 'Hrát: спорт, игры, музыка',
  desc: 'hrát fotbal · hrát na kytaru',
  rule: `<p><b>hrát</b> + <b>винительный без предлога</b> — спорт и игры: <i>hrát fotbal, tenis, šachy, karty, počítačové hry</i></p>
<p><b>hrát na</b> + винительный — музыкальный инструмент: <i>hrát na kytaru, na piano / klavír, na housle, na flétnu, na bicí</i></p>
<p>hraju, hraješ, hraje, hrajeme, hrajete, hrajou (hrají)</p>`,
  ex: [
    c('Hraju ___ . (футбол)', 'fotbal', ['na fotbal', 'do fotbalu']),
    c('Rád hraju ___ .', 'šachy', ['na šachy', 'v šachy']),
    c('Hraju ___ kytaru.', 'na', ['v', 'do']),
    c('Hraješ ___ klavír?', 'na', ['v', 'do']),
    c('Odpoledne hraju ___ . (карты)', 'karty', ['na karty', 'karet']),
    c('Sára ráda hraje stolní ___ .', 'tenis', ['na tenis', 'tenisu']),
    c('Ona hraje ___ housle.', 'na', ['v', 'do']),
    f('Hraju ___ flétnu.', 'na'),
    f('Dopoledne ___ tenis. (hrát, já)', ['hraju', 'hraji']),
    f('Ty ___ šachy? (hrát)', 'hraješ'),
    b('Я играю в футбол', ['Hraju fotbal', 'Hraji fotbal'], ['na', 'hraji']),
    b('Я играю на гитаре', 'Hraju na kytaru', ['kytaru', 'hraje']),
    b('Ты играешь на пианино?', ['Hraješ na piano', 'Hraješ na klavír'], ['klavír', 'piano']),
    b('Они играют в карты', ['Hrajou karty', 'Hrají karty'], ['Hrají', 'na']),
    b('Мы любим играть в настольный теннис', 'Rádi hrajeme stolní tenis', ['rád', 'na']),
  ],
},
{
  id: 'modal', unit: '3. Глаголы', icon: '🎯', title: 'chtít, moct, muset',
  desc: 'chci, můžu, musím + infinitiv',
  rule: `<table><tr><td></td><td>chtít</td><td>moct</td><td>muset</td></tr>
<tr><td>já</td><td>chci</td><td>můžu</td><td>musím</td></tr>
<tr><td>ty</td><td>chceš</td><td>můžeš</td><td>musíš</td></tr>
<tr><td>on/ona</td><td>chce</td><td>může</td><td>musí</td></tr>
<tr><td>my</td><td>chceme</td><td>můžeme</td><td>musíme</td></tr>
<tr><td>vy</td><td>chcete</td><td>můžete</td><td>musíte</td></tr>
<tr><td>oni</td><td>chtějí</td><td>můžou</td><td>musejí</td></tr></table>
<p><b>můžu</b>, <b>můžou</b> — разговорные формы; в письменной речи <i>mohu, mohou</i>.<br>
У <b>muset</b> в 3-м лице мн. числа говорят и <i>musí</i>, и <i>musejí</i>.</p>
<p>После них — <b>infinitiv</b>: <i>Chci spát. Musím studovat.</i></p>
<p><b>nemusím</b> = не обязан (можно не…), <b>nesmím</b> = нельзя.</p>`,
  ex: [
    c('Já ___ spát dopoledne.', 'chci', ['chceme', 'chtějí']),
    c('My ___ spát dopoledne.', 'chceme', ['chci', 'chtějí']),
    c('Oni ___ vstávat pozdě.', 'chtějí', ['chce', 'chceme']),
    c('Adam nechce ___ každý den. (танцевать)', 'tancovat', ['tancuje', 'tancuju']),
    c('Musím ___ každý den.', 'studovat', ['studuju', 'studuje']),
    c('Adam ___ cvičit každý den. (не обязан)', 'nemusí', ['nechce', 'nemůže']),
    c('Já ___ jít do kina. (могу)', 'můžu', ['můžeme', 'může']),
    c('Ty ___ přijít? (можешь)', 'můžeš', ['můžu', 'můžete']),
    f('Já ___ (muset) pracovat.', 'musím'),
    f('My ___ (muset) uklízet.', 'musíme'),
    f('Ty ___ (moct) mluvit česky?', 'můžeš'),
    f('Oni ___ (muset) pracovat každý den.', ['musí', 'musejí']),
    f('Oni ___ (chtít) pozdě vstávat.', ['chtějí', 'chtěj']),
    f('Marek a Adam ___ pracovat každý den. (не обязаны)', ['nemusí', 'nemusejí']),
    b('Я хочу спать', 'Chci spát', ['chce', 'spím']),
    b('Мы должны учиться каждый день', ['Musíme studovat každý den', 'Musíme se učit každý den'], ['musím', 'studujeme']),
    b('Он не хочет танцевать', 'Nechce tancovat', ['nemusí', 'tancuje']),
    b('Ты можешь прийти?', 'Můžeš přijít', ['můžu', 'jít']),
    b('Мы не обязаны работать каждый день', 'Nemusíme pracovat každý den', ['nechceme', 'pracujeme']),
  ],
},
{
  id: 'znat', unit: '3. Глаголы', icon: '🧠', title: 'znát × vědět × umět',
  desc: 'знать человека, знать факт, уметь',
  rule: `<p><b>znát</b> + винительный — знать человека/место/вещь: <i>Znám Angelinu Jolie. Neznám českého spisovatele.</i></p>
<p><b>vědět</b> — знать информацию, факт: <i>Vím, kde je škola. Matěj ví, kde je jeho škola.</i> (vím, víš, ví, víme, víte, <b>vědí</b>)</p>
<p><b>umět</b> — уметь (навык): <i>Umím plavat. Neumím německy.</i></p>`,
  ex: [
    c('Adam ___ českého spisovatele. (не знает)', 'nezná', ['neví', 'neumí']),
    c('Matěj ___, kde je škola.', 'ví', ['zná', 'umí']),
    c('Barbora ___ hrát šachy.', 'umí', ['ví', 'zná']),
    c('Filip ___ plavat.', 'umí', ['ví', 'zná']),
    c('Já ___ Angelinu Jolie.', 'znám', ['vím', 'umím']),
    c('Ty ___, kolik je hodin?', 'víš', ['znáš', 'umíš']),
    c('My ___ vařit chutné jídlo.', 'umíme', ['víme', 'známe']),
    c('___ mluvit česky?', 'Umíš', ['Víš', 'Znáš']),
    c('Oni ___, kde je nádraží.', 'vědí', ['znají', 'umějí']),
    f('Já ___ (vědět), kde je hotel.', 'vím'),
    f('Ona ___ (umět) hrát na kytaru.', 'umí'),
    f('Znáš ten nový film? — Ne, ___ ho. (neznat)', 'neznám'),
    b('Я не умею говорить по-немецки', 'Neumím mluvit německy', ['nevím', 'neznám']),
    b('Он знает, где его школа', 'Ví, kde je jeho škola', ['zná', 'umí']),
    b('Мы умеем плавать', 'Umíme plavat', ['víme', 'známe']),
    b('Я знаю его брата', 'Znám jeho bratra', ['vím', 'bratr']),
  ],
},

// ───────────────────────── 4. AKUZATIV ─────────────────────────
{
  id: 'akuz1', unit: '4. Винительный (4. pád)', icon: '🎯', title: 'Akuzativ ед.ч.: существительные',
  desc: 'sestra → sestru, bratr → bratra',
  rule: `<p>Акузатив отвечает на <b>koho? co?</b> (Mám… Vidím… Znám… Čekám na…)</p>
<table>
<tr><td>ж. -a</td><td>→ <b>-u</b></td><td>sestra → sestru, maminka → maminku, káva → kávu</td></tr>
<tr><td>ж. -e / -ie</td><td>→ <b>-i / -ii</b></td><td>Lucie → Lucii, Amálie → Amálii, košile → košili</td></tr>
<tr><td>ж. на согласную</td><td>обычно без изменений</td><td>kancelář; имя Dagmar → Dagmar или Dagmaru</td></tr>
<tr><td>м. одуш.</td><td>→ <b>-a / -e</b></td><td>bratr → bratra, tatínek → tatínka, učitel → učitele</td></tr>
<tr><td>м. неодуш. и ср.</td><td>без изменений</td><td>dort, stůl, auto, pivo</td></tr></table>
<p>Имена: Jiří → <i>Jiřího</i> · Alexej → <i>Alexeje</i> · Oleksii → <i>Oleksiiho</i></p>
<p>Глаголы с акузативом: mít, vidět, znát, hledat, čekat na, dívat se na, kupovat, milovat, potřebovat, studovat, hrát…</p>`,
  ex: [
    c('Mám ___. (сестру)', 'sestru', ['sestra', 'sestry']),
    c('Vidím ___. (маму)', 'maminku', ['maminka', 'maminky']),
    c('Mám ___. (брата)', 'bratra', ['bratr', 'bratru']),
    c('Mám ___. (папу)', 'tatínka', ['tatínek', 'tatínku']),
    c('Mám ___. (дочь)', 'dceru', ['dcera', 'dcery']),
    c('Čekám na ___. (учителя)', 'učitele', ['učitel', 'učiteli']),
    c('Miluju ___. (кошку)', 'kočku', ['kočka', 'kočky']),
    c('Kupuju ___. (машину)', 'auto', ['auta', 'autu'], 'Средний род и неодушевлённый мужской не меняются.'),
    c('Piju ___. (кофе)', 'kávu', ['káva', 'kávy']),
    c('Čteš ___? (книгу)', 'knihu', ['kniha', 'knihy']),
    c('Mám tatínka ___. (Jiří)', 'Jiřího', ['Jiří', 'Jiřímu']),
    f('Mám tatínka ___. (Alexej)', 'Alexeje'),
    f('Jsem Marie a mám dceru ___. (Amálie)', 'Amálii'),
    f('Mám ___. (sestra)', 'sestru'),
    f('Dívám se na ___. (kamarád)', 'kamaráda'),
    b('У меня есть брат', 'Mám bratra', ['bratr', 'má']),
    b('Я вижу маму', ['Vidím maminku', 'Vidím mámu', 'Vidím mamku'], ['mámu', 'mamku', 'maminka']),
    b('Я жду учителя', 'Čekám na učitele', ['učitel', 'čeká']),
    b('Я знаю его брата', 'Znám jeho bratra', ['bratr', 'zná']),
    b('Я ищу телефон', ['Hledám telefon', 'Hledám mobil'], ['telefonu', 'hledá']),
  ],
},
{
  id: 'akuz2', unit: '4. Винительный (4. pád)', icon: '🔗', title: 'Akuzativ: мой, твой, наш…',
  desc: 'můj → mého, moje → moji',
  rule: `<table>
<tr><td></td><td>м. одуш.</td><td>ж.</td><td>м. неодуш. / ср.</td></tr>
<tr><td>můj</td><td><b>mého</b> bratra</td><td><b>moji</b> (mou) sestru</td><td>můj stůl / moje auto</td></tr>
<tr><td>tvůj</td><td><b>tvého</b></td><td><b>tvoji</b> (tvou)</td><td>tvůj / tvoje</td></tr>
<tr><td>náš</td><td><b>našeho</b></td><td><b>naši</b></td><td>náš / naše</td></tr>
<tr><td>váš</td><td><b>vašeho</b></td><td><b>vaši</b></td><td>váš / vaše</td></tr></table>
<p><b>jeho, její, jejich</b> — никогда не меняются.</p>`,
  ex: [
    c('To je můj učitel. Čekám na ___ učitele.', 'mého', ['můj', 'moji']),
    c('To je tvoje maminka. Znám ___ maminku.', 'tvoji', ['tvoje', 'tvého']),
    c('To je náš pes. Dívám se na ___ psa.', 'našeho', ['náš', 'naši']),
    c('To je naše škola. Máme rádi ___ školu.', 'naši', ['naše', 'našeho']),
    c('To je naše auto. Dívám se na ___ auto.', 'naše', ['naši', 'našeho']),
    c('To je můj stůl. Vidím ___ stůl.', 'můj', ['mého', 'moji']),
    c('To je vaše hudba. Ráda poslouchám ___ hudbu.', 'vaši', ['vaše', 'vašeho']),
    f('To je jeho káva. Potřebuju ___ kávu.', 'jeho'),
    f('To je jejich kniha. Čtu ___ knihu.', 'jejich'),
    f('To je její sestřenice. Miluju ___ sestřenici.', 'její'),
    f('To je můj tatínek. Miluju ___ tatínka.', 'mého'),
    f('To je moje babička. Miluju ___ babičku.', ['moji', 'mou']),
    b('Я смотрю на нашего пса', 'Dívám se na našeho psa', ['náš', 'naši']),
    b('Мне нужен его кофе', 'Potřebuju jeho kávu', ['jehoho', 'káva']),
    b('Я знаю твою маму', ['Znám tvoji maminku', 'Znám tvou maminku'], ['tvou', 'tvoje']),
    b('Я жду моего учителя', 'Čekám na mého učitele', ['můj', 'moji']),
  ],
},
{
  id: 'akuz3', unit: '4. Винительный (4. pád)', icon: '🎨', title: 'Akuzativ: прилагательные',
  desc: 'mladšího bratra, starou babičku',
  rule: `<table>
<tr><td>м. одуш.</td><td>-ý → <b>-ého</b></td><td>mladý pes → mladého psa</td></tr>
<tr><td>ж.</td><td>-á → <b>-ou</b></td><td>stará babička → starou babičku</td></tr>
<tr><td>м. неодуш.</td><td>без изменений</td><td>nový stůl</td></tr>
<tr><td>ср.</td><td>без изменений</td><td>nové auto</td></tr>
<tr><td>на -í</td><td>-í всегда (ж.) / -ího (м.)</td><td>mladší sestru, mladšího bratra, inteligentní kočku</td></tr></table>`,
  ex: [
    c('Mám ___ bratra. (младшего)', 'mladšího', ['mladší', 'mladšímu']),
    c('Mám ___ sestru. (старшую)', 'starší', ['staršího', 'starou']),
    c('Máš ___ psa? (молодого)', 'mladého', ['mladý', 'mladou']),
    c('Máš ___ babičku? (старую)', 'starou', ['stará', 'starého']),
    c('Máš ___ babičku? (мудрую)', 'moudrou', ['moudrá', 'moudrého']),
    c('Mám ___ kočku. (умную)', 'inteligentní', ['inteligentního', 'inteligentnou']),
    c('Mám ___ kamaráda. (хорошего)', 'dobrého', ['dobrý', 'dobrou']),
    c('Vidím ___ ženu. (красивую)', 'krásnou', ['krásná', 'krásné']),
    c('Kupuju ___ auto. (новое)', 'nové', ['nový', 'novou']),
    c('Kupuju ___ stůl. (новый)', 'nový', ['nového', 'novou']),
    f('Mám ___ sestru. (mladší)', 'mladší'),
    f('Máš ___ bratra? (starší)', 'staršího'),
    f('Znám ___ doktorku. (hodná)', 'hodnou'),
    f('Hledám ___ taxík. (levný)', 'levný'),
    b('У меня есть младший брат', 'Mám mladšího bratra', ['mladší', 'mladého']),
    b('У меня есть умная кошка', 'Mám inteligentní kočku', ['inteligentního', 'kočka']),
    b('Я знаю красивую женщину', 'Znám krásnou ženu', ['krásná', 'žena']),
    b('Мне 10 лет. У меня есть младшая сестра. Ей 7 лет', 'Je mi deset let. Mám mladší sestru. Je jí sedm let', ['mladšího', 'mu']),
  ],
},
{
  id: 'zajmena', unit: '4. Винительный (4. pád)', icon: '👤', title: 'Akuzativ: местоимения',
  desc: 'mě, tě, ho, ji, nás, vás, je',
  rule: `<table><tr><td>já → <b>mě</b></td><td>my → <b>nás</b></td></tr>
<tr><td>ty → <b>tě</b></td><td>vy → <b>vás</b></td></tr>
<tr><td>on / ono → <b>ho</b></td><td>oni / ony → <b>je</b></td></tr>
<tr><td>ona → <b>ji</b></td><td></td></tr></table>
<p>После предлога: <i>pro / na / o <b>něj</b></i> (м., ср.), <i>na <b>ni</b></i> (ж.).</p>
<p><i>Máš tu novou učebnici? — Mám <b>ji</b>. · Znáš to auto? — Znám <b>ho</b>. · Máš tři učebnice? — Mám <b>je</b>.</i></p>`,
  ex: [
    c('Máš tu novou učebnici? — Mám ___.', 'ji', ['ho', 'je']),
    c('Znáš to nové auto? — Znám ___.', 'ho', ['ji', 'je']),
    c('Máš tři nové učebnice? — Mám ___.', 'je', ['ji', 'ho']),
    c('Vidíš mě? — Ano, vidím ___.', 'tě', ['mě', 'ho']),
    c('Miluju ___. (тебя)', 'tě', ['mě', 'ji']),
    c('Čekám na ___. (на него)', 'něj', ['ho', 'ji']),
    c('Znáš moji sestru? — Ne, neznám ___.', 'ji', ['ho', 'je']),
    c('Dívám se na ___. (на нас)', 'nás', ['vás', 'je']),
    c('Máš rád ty filmy? — Mám ___ rád.', 'je', ['ho', 'ji']),
    f('Znáš Petra? — Ano, znám ___.', 'ho'),
    f('Znáš Lucii? — Ano, znám ___.', 'ji'),
    f('Vidíš nás? — Ano, vidím ___. (вас)', 'vás'),
    b('Ты видишь меня?', 'Vidíš mě', ['tě', 'ho']),
    b('Я люблю тебя', 'Miluju tě', ['mě', 'ji']),
    b('Я знаю её', 'Znám ji', ['ho', 'je']),
    b('Я жду его', 'Čekám na něj', ['ho', 'ji']),
    b('У меня они есть', 'Mám je', ['ji', 'ho']),
  ],
},
{
  id: 'akuzpl', unit: '4. Винительный (4. pád)', icon: '👥', title: 'Akuzativ мн.ч.',
  desc: 'dva studenty, dvě ženy, dvě auta',
  rule: `<table>
<tr><td>м. одуш.</td><td>-y / -e</td><td>studenti → <b>studenty</b>, kuchař → <b>kuchaře</b>, člověk → <b>lidi</b></td></tr>
<tr><td>м. неодуш.</td><td>-y / -e</td><td>dům → domy, hotel → hotely</td></tr>
<tr><td>ж.</td><td>-y / -e</td><td>žena → <b>ženy</b>, židle → <b>židle</b></td></tr>
<tr><td>ср.</td><td>-a</td><td>auto → <b>auta</b>, rajče → <b>rajčata</b></td></tr></table>
<p>Прилагательные: м. и ж. — <b>-é</b> (dva dobré kuchaře, dvě krásné ženy); ср. — <b>-á</b> (dvě moderní auta, dvě pohodlná křesla); на -í не меняются.</p>
<p><b>dva</b> — м. · <b>dvě</b> — ж. и ср.</p>`,
  ex: [
    c('Znám dva ___ studenty.', 'francouzské', ['francouzští', 'francouzských']),
    c('Vidím dvě ___ ženy. (красивые)', 'krásné', ['krásná', 'krásní']),
    c('Mám dvě ___ auta. (современные)', 'moderní', ['moderních', 'moderná']),
    c('Dvě ___ křesla. (удобные)', 'pohodlná', ['pohodlné', 'pohodlní']),
    c('Dva ___ domy. (высокие)', 'vysoké', ['vysocí', 'vysoká']),
    c('Dvě ___ lektorky. (плохие)', 'špatné', ['špatná', 'špatných']),
    c('Dva ___ kamarády. (больные)', 'nemocné', ['nemocní', 'nemocná']),
    c('Dva ___ lidi. (гениальные)', 'geniální', ['geniálních', 'geniálná']),
    c('Dva ___ kuchaře. (хорошие)', 'dobré', ['dobří', 'dobrá']),
    c('Kupuju ___. (красные помидоры)', 'červená rajčata', ['červené rajčata', 'červená rajčaty']),
    c('Hledám dvě ___ židle. (удобные)', 'pohodlné', ['pohodlná', 'pohodlní']),
    f('Mám dva ___. (kamarád)', 'kamarády'),
    f('Vidím dvě ___. (žena)', 'ženy'),
    f('Mám dvě ___. (auto)', 'auta'),
    f('Znám dva ___. (student)', 'studenty'),
    b('Я знаю двух французских студентов', 'Znám dva francouzské studenty', ['francouzští', 'studenti']),
    b('Я вижу двух красивых женщин', 'Vidím dvě krásné ženy', ['krásná', 'dva']),
    b('Я люблю спортивные машины', ['Mám rád sportovní auta', 'Mám ráda sportovní auta', 'Miluju sportovní auta'], ['auto']),
    b('Я ищу два удобных стула', 'Hledám dvě pohodlné židle', ['dva', 'pohodlná']),
    b('Я покупаю красные помидоры', 'Kupuju červená rajčata', ['červené', 'rajče']),
  ],
},

// ───────────────────────── 5. PŘEDLOŽKY A SMĚRY ─────────────────────────
{
  id: 'predl', unit: '5. Предлоги и направления', icon: '📌', title: 'Предлоги + akuzativ',
  desc: 'o, na, pro, za',
  rule: `<p>Все эти предлоги идут с винительным:</p>
<p><b>o</b>: zajímat se <b>o</b> hudbu, starat se <b>o</b> sestru<br>
<b>na</b>: čekat <b>na</b> autobus, dívat se <b>na</b> film, těšit se <b>na</b> víkend, pasta <b>na</b> zuby, výlet <b>na</b> dva dny<br>
<b>pro</b>: jídlo <b>pro</b> kočku (для кого)<br>
<b>za</b>: kupovat/prodávat <b>za</b> 1000 Kč (цена), utrácet peníze <b>za</b> nápoje, 3× <b>za</b> týden</p>`,
  ex: [
    c('Zajímám se ___ hudbu.', 'o', ['na', 'pro']),
    c('Starám se ___ mladší sestru.', 'o', ['na', 'za']),
    c('Čekám ___ autobus.', 'na', ['o', 'pro']),
    c('Dívám se ___ film.', 'na', ['o', 'do']),
    c('Těším se ___ víkend.', 'na', ['o', 'za']),
    c('Kupuju jídlo ___ kočku.', 'pro', ['na', 'za']),
    c('Utrácí peníze ___ energetické nápoje.', 'za', ['pro', 'o']),
    c('Kupuju to ___ 1000 Kč.', 'za', ['na', 'pro']),
    c('Jedu na výlet ___ dva dny. (на два дня)', 'na', ['za', 'do']),
    c('Čtyřikrát ___ rok.', 'za', ['na', 'v']),
    c('Potřebuju pastu ___ zuby.', 'na', ['pro', 'o']),
    f('Zajímáš se ___ francouzskou kulturu?', 'o'),
    f('Čekáš ___ kamaráda?', 'na'),
    f('Ten dárek je ___ maminku.', 'pro'),
    b('Я интересуюсь музыкой', 'Zajímám se o hudbu', ['na', 'hudba']),
    b('Я жду автобус', 'Čekám na autobus', ['o', 'autobusu']),
    b('Мне нужна зубная паста', 'Potřebuju pastu na zuby', ['pro', 'pasta']),
    b('Он заботится о собаке', ['Stará se o psa', 'Stará se o svého psa'], ['svého', 'na']),
  ],
},
{
  id: 'dona', unit: '5. Предлоги и направления', icon: '🧭', title: 'Kam? do / na / k + дорога',
  desc: 'jdu do obchodu, na poštu, k lékaři',
  rule: `<p><b>Kam? (куда)</b></p>
<p><b>do</b> + чего — внутрь: <i>do obchodu, do školy, do kavárny, do nemocnice, do divadla</i><br>
<b>na</b> + что — событие, активность, общественное место: <i>na koncert, na výlet, na nádraží, na poštu, na zastávku, na zahradu</i><br>
<b>k / ke</b> + кому — к человеку: <i>k lékaři, k mamince, ke kamarádovi</i></p>
<p>Дорога: <i>Prosím vás, nevíte, kde je…? · doprava · doleva · rovně · blízko · daleko · odtud asi 3 minuty pěšky · Musíte jet vlakem asi 30 minut.</i></p>`,
  ex: [
    c('Jdu ___ obchodu.', 'do', ['na', 'k']),
    c('Jdu ___ koncert.', 'na', ['do', 'k']),
    c('Jdu ___ lékaři.', 'k', ['na', 'do']),
    c('Jedu ___ nádraží.', 'na', ['do', 'k']),
    c('Jdu ___ školy.', 'do', ['na', 'k']),
    c('Jdu ___ kavárny.', 'do', ['na', 'k']),
    c('Jdu ___ poštu.', 'na', ['do', 'k']),
    c('Jdu ___ mamince.', 'k', ['na', 'do']),
    c('Jedu ___ výlet.', 'na', ['do', 'k']),
    c('Jdeme ___ divadla.', 'do', ['na', 'k']),
    c('Metro je odtud asi 3 minuty ___. (пешком)', 'pěšky', ['autem', 'vlakem']),
    c('Musíte jít ___. (направо)', 'doprava', ['doleva', 'rovně']),
    c('Musíte jít ___. (прямо)', 'rovně', ['doprava', 'doleva']),
    c('Je to daleko? — Ne, je to ___.', 'blízko', ['daleko', 'vlevo']),
    b('Извините, вы не знаете, где вокзал?', ['Prosím vás, nevíte, kde je nádraží', 'Dobrý den, nevíte, kde je nádraží', 'Promiňte, nevíte, kde je nádraží'], ['nevíš', 'nádraží?']),
    b('Вам нужно идти направо', 'Musíte jít doprava', ['jet', 'doleva']),
    b('Метро отсюда примерно 3 минуты пешком', 'Metro je odtud asi 3 minuty pěšky', ['autem', 'minut']),
    b('Остановка недалеко', ['Zastávka je blízko', 'Zastávka je tady blízko', 'Zastávka není daleko'], ['tady', 'daleko']),
  ],
},
{
  id: 'budouci', unit: '5. Предлоги и направления', icon: '🚌', title: 'Jít × jet и будущее',
  desc: 'půjdu, pojedu, autobusem, vlakem',
  rule: `<p><b>jít</b> — идти пешком · <b>jet</b> — ехать (транспорт). Транспорт — <b>творительный</b>: <i>autobusem, vlakem, autem, metrem, tramvají, šalinou</i>. Пешком = <i>pěšky</i>.</p>
<p>Будущее: <b>pů</b>-jdu · <b>po</b>-jedu</p>
<table><tr><td>půjdu, půjdeš, půjde, půjdeme, půjdete, půjdou</td></tr>
<tr><td>pojedu, pojedeš, pojede, pojedeme, pojedete, pojedou</td></tr></table>
<p>zítra · pozítří · příští týden · příští rok · za týden</p>`,
  ex: [
    c('Dnes jedu ___ do práce. (автобус)', 'autobusem', ['autobus', 'autobusu']),
    c('Jdu ___ domů.', 'pěšky', ['autem', 'vlakem']),
    c('Jedu ___ do Prahy. (поезд)', 'vlakem', ['vlak', 'pěšky']),
    c('Zítra ___ do obchodu. (я пойду, будущее время)', 'půjdu', ['pojedu', 'jdu']),
    c('Příští rok ___ do Prahy. (я поеду, будущее время)', 'pojedu', ['půjdu', 'jedu']),
    c('Koně ___ zítra vlakem do školy. (будущее время)', 'pojedou', ['půjdou', 'jedou']),
    c('Za týden ___ domů vlakem. (они, будущее время)', 'pojedou', ['půjdou', 'jedou']),
    c('Pozítří ___ do nemocnice. (он, будущее время)', 'půjde', ['pojede', 'jde']),
    c('Kam ___ autem? (ты едешь)', 'jedeš', ['jdeš', 'pojedu']),
    f('Zítra ___ do školy. (jít, já, budoucí čas)', 'půjdu'),
    f('Příští týden ___ do Prahy. (jet, já, budoucí čas)', 'pojedu'),
    f('Zítra ___ do kina. (jít, my, budoucí čas)', 'půjdeme'),
    f('___ vlakem? (jet, vy, budoucí čas)', 'Pojedete'),
    b('Завтра я пойду в магазин', 'Zítra půjdu do obchodu', ['pojedu', 'na']),
    b('На следующей неделе я поеду в Прагу на автобусе', 'Příští týden pojedu autobusem do Prahy', ['půjdu', 'autobus']),
    b('Послезавтра я пойду в больницу', 'Pozítří půjdu do nemocnice', ['pojedu', 'na']),
    b('Через неделю они поедут домой на поезде', 'Za týden pojedou domů vlakem', ['půjdou', 'vlak']),
  ],
},

// ───────────────────────── 6. ŽIVOT A NÁKUPY ─────────────────────────
{
  id: 'sesi', unit: '6. Жизнь и покупки', icon: '🪥', title: 'se / si — возвратные',
  desc: 'myje se × myje si ruce',
  rule: `<p><b>se</b> — действие на себя: <i>Maminka <b>se</b> myje.</i> (= sprchuje se, koupe se)<br>
<b>si</b> — действие «себе» + прямой объект: <i>Maminka <b>si</b> myje ruce. Oblékáš <b>si</b> tričko.</i><br>
Без se/si — действие над другим: <i>Maminka myje syna. Maminka čistí zuby synovi.</i></p>
<p>Глаголы бывают: только с se (dívat se), без se/si, и с обоими вариантами (česat, česat se, česat si).</p>`,
  ex: [
    c('Maminka ___ myje ruce.', 'si', ['se', 'ji']),
    c('Maminka ___ myje. (моется)', 'se', ['si', 'ji']),
    c('Oblékáš ___ tričko.', 'si', ['se', 'ti']),
    c('Oblékáš ___. (одеваешься)', 'se', ['si', 'ti']),
    c('Maminka ___ čistí zuby. (себе)', 'si', ['se', 'mu']),
    c('Jana ___ koupe večer.', 'se', ['si', 'ji']),
    c('Dívám ___ na televizi.', 'se', ['si', 'mi']),
    c('Maminka myje ___. (сына)', 'syna', ['si syna', 'se syna']),
    c('Já ___ sprchuju ráno.', 'se', ['si', 'mě']),
    f('Čistím ___ zuby.', 'si'),
    f('Zkusím ___ tu bílou košili.', 'si'),
    b('Я мою руки', ['Myju si ruce', 'Myji si ruce'], ['se']),
    b('Мама купает сына', 'Maminka koupe syna', ['se', 'si']),
    b('Мама принимает душ', 'Maminka se sprchuje', ['si', 'syna']),
    b('Я чищу зубы', 'Čistím si zuby', ['se', 'zubu']),
    b('Ты надеваешь футболку', 'Oblékáš si tričko', ['se', 'trička']),
  ],
},
{
  id: 'libi', unit: '6. Жизнь и покупки', icon: '😋', title: 'Líbí se mi × chutná mi × mám rád',
  desc: 'нравится / вкусно / люблю',
  rule: `<p><b>Líbí se mi</b> + что — нравится (вид, погода, музыка). Мн.ч.: <i>líbí se mi ty boty</i>.<br>
<b>Chutná mi</b> + что — вкусно (ед.) · <b>Chutnají mi</b> (мн.)<br>
<b>Mám rád</b> + кого/что (акузатив) · <i>Mám ráda rajčatovou polévku.</i></p>
<p>Кому: mi, ti, mu, jí, nám, vám, jim.<br>
<i>Mám rád čokoládovou zmrzlinu, ale ještě <b>raději</b> (= radši) mám vanilkovou.</i></p>`,
  ex: [
    c('___ se mi hezké počasí.', 'Líbí', ['Chutná', 'Mám']),
    c('___ mi vanilková zmrzlina.', 'Chutná', ['Líbí', 'Mám']),
    c('Rajčata mi ___.', 'chutnají', ['chutná', 'líbí']),
    c('Líbí se ___ tvůj kabát? (тебе)', 'ti', ['tě', 'ty']),
    c('To je Jakub. Chutná ___ pivo.', 'mu', ['jí', 'mi']),
    c('To je Sára. Chutná ___ italská kuchyně.', 'jí', ['mu', 'ji']),
    c('Máš ráda rajčatovou ___?', 'polévku', ['polévka', 'polévky']),
    c('Mám rád ___ koláč. (абрикосовый)', 'meruňkový', ['meruňková', 'meruňkového']),
    c('Mám rád čokoládovou, ale ___ mám vanilkovou.', 'ještě raději', ['více rád', 'moc rád']),
    f('Klára nemá ___ boršč.', 'ráda'),
    f('Nemáme ___ víno.', 'rádi'),
    f('To je Dimash. ___ mu malinový koláč. (chutnat)', 'Chutná'),
    b('Мне нравится хорошая погода', 'Líbí se mi hezké počasí', ['chutná', 'hezká']),
    b('Мне нравится ванильное мороженое (вкус)', 'Chutná mi vanilková zmrzlina', ['líbí', 'zmrzlinu']),
    b('Я люблю абрикосовый пирог', ['Mám rád meruňkový koláč', 'Mám ráda meruňkový koláč'], ['ráda', 'meruňkovou']),
    b('Ему нравится импрессионизм', 'Líbí se mu impresionismus', ['jí', 'chutná']),
    b('Ей нравятся её волосы', 'Líbí se jí její vlasy', ['mu', 'chutná']),
  ],
},
{
  id: 'nakup', unit: '6. Жизнь и покупки', icon: '🛍️', title: 'Покупки и одежда',
  desc: 'v obchodě, sleva, zkusím si, stojí',
  rule: `<p><b>V obchodě:</b><br>
Hledám / Potřebuju / Mám rád <b>bílou košili</b> (акузатив). · <b>Zkusím si</b> tu košili. · Kde je <b>kabinka</b>?<br>
Ta košile je mi <b>bohužel malá</b>. = Nesedí mi. · Ta černá mi <b>sedí</b>.<br>
<b>Kolik to stojí?</b> — Stojí 65 Kč. To je velmi dobrá cena. · <b>Vezmu si to!</b> · <b>Děkujeme za nákup!</b></p>
<p><b>Online:</b> akce · sleva · doprava (доставка) · heslo (пароль) · účet · přihlásit se / odhlásit se · peněženka · stránka</p>`,
  ex: [
    c('Hledám bílou ___. (рубашка)', 'košili', ['košile', 'košilu']),
    c('Ta košile je mi bohužel ___.', 'malá', ['malý', 'malé']),
    c('Ta černá mi ___. (сидит)', 'sedí', ['stojí', 'hledá']),
    c('Kolik ___ ta košile?', 'stojí', ['sedí', 'vezmu']),
    c('Zkusím ___ tu košili.', 'si', ['se', 'mi']),
    c('Kde je ___? (примерочная)', 'kabinka', ['pokladna', 'sleva']),
    c('пароль', 'heslo', ['účet', 'sleva']),
    c('скидка', 'sleva', ['doprava', 'heslo']),
    c('доставка', 'doprava', ['sleva', 'účet']),
    c('кошелёк', 'peněženka', ['pokladna', 'taška']),
    c('войти (в аккаунт)', 'přihlásit se', ['odhlásit se', 'zaplatit']),
    c('Děkujeme ___ nákup!', 'za', ['pro', 'na']),
    f('Potřebuju ___ košili. (černá)', 'černou'),
    f('Máme ___ košili. (bílá)', 'bílou'),
    b('Я ищу белую рубашку', 'Hledám bílou košili', ['bílá', 'hledá']),
    b('Мне нужна чёрная рубашка', 'Potřebuju černou košili', ['černá', 'potřebuje']),
    b('Эта рубашка мне, к сожалению, мала', 'Ta košile je mi bohužel malá', ['malý', 'ten']),
    b('Я примерю эту рубашку', ['Zkusím si tu košili', 'Zkusím si tu bílou košili'], ['bílou', 'se']),
    b('Сколько это стоит?', 'Kolik to stojí', ['sedí', 'ten']),
    b('Беру!', 'Vezmu si to', ['se', 'tu']),
  ],
},

// ───────────────────────── 7. ИЗ УЧЕБНИКА И КЛАССРУМА ─────────────────────────
{
  id: 'ze', unit: '7. Из учебника и Classroom', icon: '🔗', title: 'Союз že («что»)',
  desc: 'Vím, že… Jsem rád, že… Myslím, že…',
  rule: `<p><b>že</b> = «что» в придаточном: перед <b>že</b> всегда запятая.</p>
<p>Jsem rád, <b>že</b> bydlíš tady. · Vím, <b>že</b> Karel je ředitel. · Myslíš, <b>že</b> je to dobrý nápad? · Mám radost, <b>že</b> přijdeš.</p>
<p>Частые начала: <i>Jsem rád/ráda, že… · Vím, že… · Myslím, že… · Jsem spokojený, že… · Mám radost, že…</i></p>
<p><b>že</b> (что, связка) ≠ <b>co</b> (что? — вопрос): <i>Vím, že přijdeš.</i> / <i>Co děláš?</i></p>`,
  ex: [
    c('Jsem rád, ___ jsi tady.', 'že', ['co', 'kdo']),
    c('Vím, ___ Karel pracuje v bance.', 'že', ['co', 'jak']),
    c('Myslím, ___ je to dobrý nápad.', 'že', ['co', 'kde']),
    c('___ děláš dnes večer? (что)', 'Co', ['Že', 'Kdy']),
    c('Jsem spokojený, ___ mám novou práci.', 'že', ['co', 'kdo']),
    c('Mám radost, že ___.', 'přijdeš', ['přijít', 'přijdu']),
    c('Vím, že ___ česky.', 'umíš', ['umět', 'umím']),
    c('Где правильно стоит запятая?', 'Myslím, že je tady blízko.', ['Myslím že, je tady blízko.', 'Myslím že je, tady blízko.']),
    f('Jsem ráda, ___ tě vidím.', 'že'),
    f('Myslíš, ___ Dimash zná Prahu?', 'že'),
    f('Vím, ___ jsi doma.', 'že'),
    b('Я рад, что ты здесь', ['Jsem rád, že jsi tady', 'Jsem rád, že jsi tu'], ['co', 'jsem']),
    b('Я думаю, что это хорошая идея', 'Myslím, že je to dobrý nápad', ['co', 'dobrá']),
    b('Я знаю, что он доктор', 'Vím, že je doktor', ['co', 'jsem']),
    b('Ты рад, что мы здесь?', ['Jsi rád, že jsme tady', 'Jsi rád, že jsme tu'], ['jste', 'co']),
    b('Она довольна, что у неё есть работа', 'Je spokojená, že má práci', ['spokojený', 'práce']),
  ],
},
{
  id: 'tenhle', unit: '7. Из учебника и Classroom', icon: '👆', title: 'ten × tenhle',
  desc: 'ten muž / tenhle muž, tahle žena, tohle auto',
  rule: `<p><b>ten, ta, to</b> — «тот/этот». <b>tenhle, tahle, tohle</b> — «вот этот (здесь, рядом)».</p>
<table><tr><td>м.</td><td>ten → <b>tenhle</b> muž</td></tr>
<tr><td>ж.</td><td>ta → <b>tahle</b> žena</td></tr>
<tr><td>ср.</td><td>to → <b>tohle</b> auto</td></tr>
<tr><td>мн.</td><td>ty → <b>tyhle</b> dva telefony</td></tr></table>
<p>Склоняется только первая часть (ten), «-hle» не меняется: <i>na <b>tu</b> hezkou holku → na <b>tuhle</b> hezkou holku</i>. Винительный ж.: <b>tuhle</b>.</p>
<p><i>Kde je to tvoje nové auto? — Tady. <b>Tohle</b> auto je tvoje, nebo <b>tohle</b>?</i></p>`,
  ex: [
    c('___ muž se jmenuje Petr. (вот этот)', 'Tenhle', ['Tahle', 'Tohle']),
    c('___ žena je moje maminka. (вот эта)', 'Tahle', ['Tenhle', 'Tohle']),
    c('___ auto je moje. (вот это)', 'Tohle', ['Tenhle', 'Tahle']),
    c('___ dva telefony jsou moje. (вот эти)', 'Tyhle', ['Tenhle', 'Tahle']),
    c('Dívám se na ___ hezkou holku. (вот эту)', 'tuhle', ['tahle', 'tohle']),
    c('Čekám na ___ ženu. (вот эту)', 'tuhle', ['tahle', 'tenhle']),
    c('Máš rád ___ město? (вот этот город)', 'tohle', ['tenhle', 'tahle']),
    c('Zkusím si ___ dvě sukně. (вот эти)', 'tyhle', ['tahle', 'tuhle']),
    f('___ židle je moc pohodlná. (вот эта)', 'Tahle'),
    f('Vidím ___ auto. (вот это)', 'tohle'),
    f('Kde je ___ muž? (вот этот)', 'tenhle'),
    f('Ráda poslouchám ___ hudbu. (вот эту)', 'tuhle'),
    b('Вот эта женщина — моя мама', 'Tahle žena je moje maminka', ['Tenhle', 'tuhle']),
    b('Вот это окно большое', 'Tohle okno je velké', ['Tahle', 'velká']),
    b('Вот этот человек — мой друг', 'Tenhle člověk je můj kamarád', ['Tahle', 'moje']),
  ],
},
{
  id: 'kamdat', unit: '7. Из учебника и Classroom', icon: '📦', title: 'Куда положить? před, za, mezi, pod, nad, na',
  desc: 'dám to na stůl, pod postel, před dveře',
  rule: `<p>Вопрос <b>Kam?</b> (куда?) → предлоги места + <b>винительный</b>:</p>
<table><tr><td><b>na</b></td><td>на: <i>dám knihu na stůl</i></td></tr>
<tr><td><b>pod</b></td><td>под: <i>dám boty pod postel</i></td></tr>
<tr><td><b>před</b></td><td>перед: <i>dám auto před dům</i></td></tr>
<tr><td><b>za</b></td><td>за: <i>dám stůl za dveře</i></td></tr>
<tr><td><b>nad</b></td><td>над: <i>dám obraz nad gauč</i></td></tr>
<tr><td><b>mezi</b></td><td>между: <i>dám židli mezi stůl a okno</i></td></tr></table>
<p><b>dát</b> (положить, дать) в будущем: <i>dám, dáš, dá, dáme, dáte, dají</i>. <b>dát si</b> — взять себе (еду, напиток): <i>Dám si kávu.</i></p>`,
  ex: [
    c('Dám knihu ___ stůl. (на)', 'na', ['pod', 'mezi']),
    c('Dám boty ___ postel. (под)', 'pod', ['nad', 'na']),
    c('Dám auto ___ dům. (перед)', 'před', ['za', 'mezi']),
    c('Dám obraz ___ gauč. (над)', 'nad', ['pod', 'před']),
    c('Dám židli ___ stůl a okno. (между)', 'mezi', ['za', 'pod']),
    c('Dám stůl ___ dveře. (за)', 'za', ['před', 'nad']),
    c('Kam ___ ten stůl? (ты поставишь)', 'dáš', ['dám', 'dá']),
    c('Já ___ tu knihu na stůl.', 'dám', ['dáš', 'dají']),
    c('My ___ boty pod postel.', 'dáme', ['dáte', 'dají']),
    c('___ si kávu. (я возьму себе)', 'Dám', ['Dá', 'Dáš']),
    f('Dám knihu na ___. (stůl)', 'stůl'),
    f('Dám lampu na ___. (židle)', 'židli'),
    f('Dám boty pod ___. (postel)', 'postel'),
    f('Dáš kabát na ___? (gauč)', 'gauč'),
    b('Я положу книгу на стол', 'Dám knihu na stůl', ['stolu', 'dáš']),
    b('Он поставит стул перед окном', 'Dá židli před okno', ['okně', 'dám']),
    b('Мы положим обувь под кровать', 'Dáme boty pod postel', ['posteli', 'dám']),
  ],
},
{
  id: 'genitiv', unit: '7. Из учебника и Classroom', icon: '🏠', title: 'Genitiv ед.ч. + do, z, od, u, vedle',
  desc: 'do školy, z obchodu, od maminky, u okna',
  rule: `<p><b>Родительный падеж</b> (2. pád) после предлогов: <b>do</b> (в, внутрь) · <b>z</b> (из) · <b>od</b> (от) · <b>u</b> (у) · <b>vedle</b> (рядом) · <b>bez</b> (без) · <b>blízko</b> (близко от)</p>
<table>
<tr><td>ж. -a</td><td>→ <b>-y</b></td><td>škola → do <b>školy</b>, pošta → z <b>pošty</b>, maminka → od <b>maminky</b></td></tr>
<tr><td>ж. -ice / -e</td><td>→ <b>-e</b> (без изменений)</td><td>nemocnice → z <b>nemocnice</b>, ulice → z <b>ulice</b></td></tr>
<tr><td>м. одуш.</td><td>→ <b>-a</b></td><td>bratr → od <b>bratra</b>, učitel → od <b>učitele</b></td></tr>
<tr><td>м. неодуш.</td><td>→ <b>-u</b> (иногда -a)</td><td>obchod → do <b>obchodu</b>, park → do <b>parku</b>, most → z <b>mostu</b>; но: les → do <b>lesa</b></td></tr>
<tr><td>ср. -o</td><td>→ <b>-a</b></td><td>divadlo → do <b>divadla</b>, okno → u <b>okna</b></td></tr>
<tr><td>ср. -í / -e</td><td>без изменений</td><td>nádraží → z <b>nádraží</b>, letiště → z <b>letiště</b></td></tr></table>
<p>Предлоги <b>do, z, od, u, vedle, bez</b> всегда требуют родительного падежа.</p>`,
  ex: [
    c('Jdu do ___. (школа)', 'školy', ['škola', 'školu']),
    c('Jdu z ___. (почта)', 'pošty', ['pošta', 'poštu']),
    c('Mám dopis od ___. (maminka)', 'maminky', ['maminka', 'maminku']),
    c('Jdu z ___. (nemocnice)', 'nemocnice', ['nemocnici', 'nemocnic']),
    c('Mám dárek od ___. (bratr)', 'bratra', ['bratr', 'bratru']),
    c('Jdu od ___. (učitel)', 'učitele', ['učitel', 'učiteli']),
    c('Jdu do ___. (obchod)', 'obchodu', ['obchod', 'obchoda']),
    c('Jdu do ___. (park)', 'parku', ['park', 'parka']),
    c('Jdu z ___. (most)', 'mostu', ['most', 'mosta']),
    c('Jdeme do ___. (divadlo)', 'divadla', ['divadlo', 'divadlu']),
    c('Vracím se z ___. (nádraží)', 'nádraží', ['nádražím', 'nádražu']),
    c('Sedím vedle ___. (okno)', 'okna', ['okno', 'oknu']),
    c('Bydlím blízko ___. (nemocnice)', 'nemocnice', ['nemocnici', 'nemocnic']),
    f('Jdu do ___. (kavárna)', 'kavárny'),
    f('Jdu z ___. (knihovna)', 'knihovny'),
    f('Jdu do ___. (lékárna)', 'lékárny'),
    f('Jedu z ___. (letiště)', 'letiště'),
    f('Jsem u ___. (řeka)', 'řeky'),
    b('Я иду в школу', 'Jdu do školy', ['škola', 'na']),
    b('Я иду из магазина', 'Jdu z obchodu', ['do', 'obchod']),
    b('Письмо от мамы', ['Dopis od maminky', 'Dopis od mámy'], ['maminka', 'z']),
  ],
},
{
  id: 'email', unit: '7. Из учебника и Classroom', icon: '✉️', title: 'Неформальный e-mail',
  desc: 'Milý Petře, děkuju za e-mail… Měj se hezky!',
  rule: `<p><b>Начало:</b> <i>Ahoj, Lucie! · Ahoj, Petře! · Milá Lucie, · Milý Petře,</i> (звательный падеж!)</p>
<p><b>Середина:</b> <i>Děkuju za tvůj e-mail. · Jak se máš? · Mám se dobře. · Jsem rád/ráda, že… · Těším se na tebe / na víkend. · Napiš mi brzo.</i></p>
<p><b>Конец:</b> <i>Měj se hezky! · Ahoj! · Čau! · Pozdravuj maminku. · Tvůj Dimash / Tvoje Anna</i></p>
<p>С друзьями — <b>ty</b> (tvůj, ti, tě), не «vy».</p>`,
  ex: [
    c('Начало письма подруге Lucie:', 'Milá Lucie,', ['Milý Lucie,', 'Vážená Lucie,']),
    c('Начало письма другу Petr:', 'Milý Petře,', ['Milá Petře,', 'Milý Petr,']),
    c('Ahoj, ___! (Tomáš)', 'Tomáši', ['Tomáš', 'Tomáše']),
    c('Děkuju ___ tvůj e-mail.', 'za', ['pro', 'na']),
    c('Těším se ___ víkend.', 'na', ['o', 'za']),
    c('___ se hezky! (другу)', 'Měj', ['Mějte', 'Mám']),
    c('Napiš ___ brzo. (мне)', 'mi', ['mě', 'ti']),
    c('Pozdravuj ___. (маму)', 'maminku', ['maminka', 'maminky']),
    c('Jak se ___? (ты)', 'máš', ['máte', 'mám']),
    c('Подпись другу:', 'Tvůj Dimash', ['Váš Dimash', 'Tvoji Dimash']),
    f('Ahoj, ___! (Eva)', 'Evo'),
    f('Napíšu ___ zítra. (тебе)', 'ti'),
    b('Спасибо за твоё письмо', 'Děkuju za tvůj e-mail', ['tvoje', 'tvého']),
    b('Передавай привет маме', 'Pozdravuj maminku', ['maminka', 'Pozdravujte']),
    b('Хорошего тебе дня', ['Měj se hezky', 'Měj hezký den'], ['Mějte', 'den']),
  ],
},

];
