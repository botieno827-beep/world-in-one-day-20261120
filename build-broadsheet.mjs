import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { stories, timeline, exclusions, datePolicy, additionalEvidence } from './news-data.mjs';
import { artwork } from './broadsheet-art.mjs';

const directory = fileURLToPath(new URL('.', import.meta.url));
const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const colors = { EUROPE: '#355d82', ASIA: '#a24636', 'MIDDLE EAST': '#91622f', AFRICA: '#497660', AMERICAS: '#855078', OCEANIA: '#317e8a', GLOBAL: '#626247' };
const expected = Array.from({length:35}, (_,i) => i+1);
if (JSON.stringify(stories.map(s => s.id)) !== JSON.stringify(expected)) throw new Error('Expected exactly 35 uniquely numbered stories.');
for (const story of stories) {
  if (story.date !== '2026-11-20' || !story.source || !new URL(story.url).hostname || !colors[story.region]) throw new Error(`Incomplete date/source/region for ${story.id}`);
}
const counts = Object.fromEntries(Object.keys(colors).map(r => [r,stories.filter(s => s.region === r).length]));
if (Object.values(counts).some(v => !v)) throw new Error('Every region must be represented.');

function metadata(story, compact = false) {
  return `<div class="meta" data-audit><span class="region" style="color:${colors[story.region]}">${escape(story.region)}</span><span class="verified ${story.status.toLowerCase()}">${story.status}</span></div>${compact?'':`<div class="place" data-audit>${escape(story.place)}</div>`}`;
}
const cardBadges = [
  ['KYIV: 3 BRIDGES HIT', 'Official count · Reuters', 'Kyiv’s three bridges hit'],
  ['CYCLONE AKVAN', 'Weather office · IMD', 'Akvan makes landfall in Odisha'],
  ['AI SELL-OFF', 'Friday closes · IMF', 'Asian stocks sink on AI fears'],
  ['COP31: NO DEAL', 'Antalya · AP'],
  ['UK–EU DEAL', 'Agreement · EU Council'],
  ['POLAND: MISSILES', 'Incursion · AP'],
  ['IRAQ: ARMY IN', 'Deployment · Reuters'],
  ['ITALY: STRIKE', 'La Repubblica'],
  ['NVIDIA: SEC PROBE', 'Sources’ account · Reuters'],
  ['SEOUL: IMPEACH BID', 'Party policy · SBS'],
  ['KENYA: OIL', 'Production drilling · The Star'],
  ['JAPAN: +2.3%', 'Headline CPI · MIC'],
  ['PHILLIPS: 118', 'Day 2 · AP'],
];
function cleanCardArt(story) {
  // Keep only the market legend; new HTML badges own all other labels.
  return artwork(story.art).replace(/<text\b[^>]*>[\s\S]*?<\/text>/g, match => {
    if (story.id === 3) return match;
    return '';
  });
}
function card(story, hero = false) {
  const [banner,caption,headline] = cardBadges[story.id-1];
  return `<article class="card ${hero?'hero':'small'}" data-cell="card-${story.id}" style="--accent:${colors[story.region]}">
    <div class="art">${cleanCardArt(story)}<span class="number" data-audit>${story.id.toString().padStart(2,'0')}</span><strong class="art-banner" data-audit>${escape(banner)}</strong><span class="art-caption" data-audit>${escape(caption)}</span></div>
    <div class="copy">${metadata(story)}<h2 data-audit>${escape(headline||story.title)}</h2><p data-audit>${escape(story.detail)}</p><div class="source" data-audit>20 NOV · ${escape(story.source)}</div></div>
  </article>`;
}
const briefDisplay = [
  ['IRAN', 'Trump sees no acceptable deal', 'AP'],
  ['SAUDI / YEMEN', 'Forces exchange fire', 'AP'],
  ['GAZA', 'Six killed, local officials say', 'AP'],
  ['SUDAN', 'RSF claims five Blue Nile gains', 'S. Tribune'],
  ['S. AFRICA', 'Quarterly murders: 5,590', 'D. Maverick'],
  ['BENIN', 'Seeks return of 35 looted objects', 'Africanews'],
  ['SOMALIA', 'Rally backs UAE envoy’s expulsion', 'Africanews'],
  ['BERLIN', 'Students march against rearmament', 'Africanews'],
  ['RUSSIA', 'Rejects NATO-like Ukraine status', 'AP'],
  ['UK', 'Dinghy vandal jailed for 15 months', 'AP'],
  ['IOWA', 'DOJ asserts emergency blast powers', 'DOJ'],
  ['CANADA', 'Halifax security forum opens', 'HFX'],
  ['BRAZIL', 'Black Consciousness Day observed', 'B3'],
  ['CHILE', 'Fed’s Cook calls for rate hikes', 'Fed'],
  ['AUSTRALIA', 'Albanese meets Xi on trade', 'ABC'],
  ['AUSTRALIA', '1,689 David Jones job notices', 'NewsWire'],
  ['NZ', 'Jackson seeks US envoy’s expulsion', 'NZ Herald'],
  ['NEPAL', 'Cricket for children’s rights', 'UNICEF'],
  ['GAZA', '€10m child-services plan launched', 'UNICEF'],
  ['GLOBAL', '20+ exchanges ring for children', 'UNICEF'],
  ['DR CONGO', 'WHO reports sustained Ebola', 'WHO'],
  ['UKRAINE', 'UNICEF warns on child casualties', 'UNICEF'],
];
function brief(story) {
  const [place,headline,source] = briefDisplay[story.id-14];
  return `<article class="brief" data-cell="brief-${story.id}"><span class="brief-number" data-audit>${story.id}</span><p class="brief-line" data-audit><strong>${escape(place)}:</strong> ${escape(headline)} <span class="brief-cite">(${escape(source)})</span></p></article>`;
}

function worldMap(){
  const data = JSON.parse(readFileSync(new URL('./world-land.json',import.meta.url),'utf8'));
  const point = ([longitude,latitude]) => [18+(longitude+180)/360*552, 9+(84-latitude)/144*218];
  let shapes='';
  for(const feature of data.features){
    const polygons=feature.geometry.type==='Polygon'?[feature.geometry.coordinates]:feature.geometry.coordinates;
    for(const polygon of polygons){
      const ring=polygon[0];
      if(Math.max(...ring.map(p=>p[1])) < -58)continue;
      shapes+=`<path d="${ring.map((p,i)=>{const [x,y]=point(p);return (i?'L':'M')+x.toFixed(1)+','+y.toFixed(1);}).join('')}Z"/>`;
    }
  }
  const pins=stories.slice(0,13).map(s=>{const [x,y]=point([s.lon,s.lat]);return {id:s.id,x,y,lx:x,ly:y};});
  // Keep pins geographically anchored, separating only their numbered labels.
  for(let pass=0;pass<200;pass++){
    for(let i=0;i<pins.length;i++)for(let j=i+1;j<pins.length;j++){
      const a=pins[i],b=pins[j];let dx=b.lx-a.lx,dy=b.ly-a.ly;let dist=Math.hypot(dx,dy);
      if(dist<29){if(dist<.01){dx=1;dy=1;dist=Math.SQRT2;}const force=(29-dist)*.51;a.lx-=dx/dist*force;a.ly-=dy/dist*force;b.lx+=dx/dist*force;b.ly+=dy/dist*force;}
    }
    for(const p of pins){p.lx=Math.min(571,Math.max(14,p.lx));p.ly=Math.min(226,Math.max(14,p.ly));}
  }
  let closest=Infinity;
  for(let i=0;i<pins.length;i++)for(let j=i+1;j<pins.length;j++)closest=Math.min(closest,Math.hypot(pins[i].lx-pins[j].lx,pins[i].ly-pins[j].ly));
  if(closest<27.5)throw new Error('Map labels collide.');
  const leaders = pins.map(p=>`<path d="M${p.x.toFixed(1)},${p.y.toFixed(1)}L${p.lx.toFixed(1)},${p.ly.toFixed(1)}" stroke="#7f1d1d" stroke-width="1.2"/><circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="2" fill="#b91c1c"/>`).join('');
  const labels=pins.map(p=>`<g><circle cx="${p.lx.toFixed(1)}" cy="${p.ly.toFixed(1)}" r="12.5" fill="#b91c1c" stroke="#111827" stroke-width="1.5"/><text x="${p.lx.toFixed(1)}" y="${(p.ly+4.5).toFixed(1)}" text-anchor="middle" fill="#ffffff" font-family="Arial" font-weight="800" font-size="13">${p.id}</text></g>`).join('');
  return `<svg viewBox="0 0 590 240" xmlns="http://www.w3.org/2000/svg" aria-label="Geographically anchored world map showing the first thirteen stories"><rect width="590" height="240" fill="#dbeafe"/><g fill="none" stroke="#b6c9dd" stroke-width=".8"><path d="M18 105H570M18 37H570M18 173H570M155 9V227M294 9V227M432 9V227"/></g><g fill="#a6baa2" stroke="#52705c" stroke-width=".6">${shapes}</g>${leaders}${labels}</svg>`;
}

const kpis = [
 ['3', 'bridges hit in Kyiv', 'REUTERS / AP · #01'],
 ['300,000+', 'sheltered for Akvan', 'ODISHA OFFICIALS · #02'],
 ['−6.2%', 'Taiwan’s Friday close', 'IMF MONITOR · #03'],
 ['100,000', 'UK–EU youth places each way', 'AGREED, NOT YET OPEN · #05'],
 ['2.3%', 'Japan October headline CPI', 'RELEASED FRIDAY · #12'],
 ['118', 'Phillips against India', 'WELLINGTON TEST · #13'],
];
const labels=['Kyiv','Gopalpur','Taipei','Antalya','Brussels','E. Poland','Jurf al-Sakhar','Italy','Nvidia / US','Seoul','Turkana','Tokyo','Wellington'];
const html=`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=1600"><title>The World in One Day — 20 November 2026</title><style>
*{box-sizing:border-box}html,body{margin:0;width:1600px;height:1600px;background:#f6f1e7;color:#172630}body{font-family:Arial,sans-serif}h1,h2,h3,p,figure{margin:0}main{width:1600px;height:1600px;padding:22px 32px;display:grid;grid-template-rows:136px 76px 28px 56px 300px 420px 370px 78px 16px;gap:10px}header{border-top:5px solid #172630;border-bottom:2px solid #172630}.topbar{height:29px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #8f968d;font-size:17px;font-weight:800;letter-spacing:1px}.topbar span:last-child{font-size:12.5px;letter-spacing:.8px}.masthead{height:76px;display:flex;align-items:center;justify-content:space-between;gap:20px}h1{font-family:Georgia,serif;font-size:79px;line-height:1;letter-spacing:-3.7px;white-space:nowrap}.edition-box{width:186px;flex:none;padding:8px 11px;border:1px solid #6d776e;text-align:center;font-size:12px;letter-spacing:1px;line-height:1.6;font-weight:bold}.deck{font-family:Georgia,serif;font-size:21px;line-height:25px}.kpis{display:grid;grid-template-columns:repeat(6,1fr);border-top:1px solid #172630;border-bottom:1px solid #172630}.kpi{padding:4px 13px;display:flex;flex-direction:column;justify-content:center;gap:3px}.kpi:first-child{padding-left:0}.kpi+.kpi{border-left:1px solid #b7b6a8}.kpi strong{font-family:Georgia,serif;font-size:33px;line-height:34px;color:#9d372d}.kpi p{font-size:15.2px;line-height:17px;font-weight:bold}.kpi small{font-size:10px;line-height:12px;letter-spacing:.4px;color:#56625e}.regions{display:flex;gap:8px;align-items:stretch}.pill{display:flex;align-items:center;padding:0 15px;font-size:12px;font-weight:bold;letter-spacing:1px;color:#fff9ed;background:var(--color);white-space:nowrap}.region-note{margin-left:auto;font-size:11px;align-self:center;font-weight:bold;color:#53655c}.timeline{display:grid;grid-template-columns:153px repeat(6,1fr);border-bottom:2px solid #172630;border-top:1px solid #a4aa9b;align-items:center;gap:14px}.timeline-title{font-family:Georgia,serif;font-weight:bold;font-size:19px;line-height:20px}.timeline-title small{font:10px Arial;letter-spacing:.7px}.tick{padding-left:10px;border-left:1px solid #a9b3a6;display:flex;flex-direction:column;gap:4px}.tick b{font-size:16px;color:#9a3d30}.tick span{font-size:12.5px;white-space:nowrap}.heroes{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}.card{border:1px solid #9ca593;background:#faf6ed;display:flex;flex-direction:column;min-width:0;min-height:0}.card .art{position:relative;flex:none;overflow:hidden}.art svg{width:100%;height:100%;display:block}.hero .art{height:151px}.small .art{height:70px}.number{position:absolute;top:8px;left:8px;font-size:16px;font-weight:800;width:33px;height:28px;background:#f6f1e7;color:#172630;text-align:center;line-height:28px;border-bottom:3px solid var(--accent)}.copy{padding:8px 12px;display:flex;flex-direction:column;flex:1;min-height:0}.meta{display:flex;align-items:center;justify-content:space-between;gap:4px;white-space:nowrap;font-size:10.5px;font-weight:bold;letter-spacing:.8px;line-height:14px}.verified{font-size:9px;padding:1px 4px;border:1px solid #bac5b2;letter-spacing:.5px;line-height:11px}.confirmed{color:#3f6651}.claim{color:#9c4930;border-color:#c99a74}.place{font-size:10px;font-weight:700;letter-spacing:.6px;margin-top:3px;color:#5a675f;line-height:12px}h2{font-family:Georgia,serif;letter-spacing:-.6px}.hero h2{font-size:29px;line-height:30px;margin:4px 0}.hero p{font-size:15.3px;line-height:18px}.source{font-size:9px;font-weight:700;color:#5e695f;letter-spacing:.3px;margin-top:auto;padding-top:5px;line-height:12px}.small h2{font-size:21px;line-height:23px;margin:4px 0}.small p{font-size:13.3px;line-height:16px}.small .copy{padding:6px 10px}.small .meta{font-size:9px;letter-spacing:.4px}.small .verified{font-size:8px}.small .source{font-size:8.2px;letter-spacing:0;padding-top:3px}.small .place{font-size:8.8px;line-height:10px}.small-cards{display:grid;grid-template-columns:repeat(5,1fr);grid-template-rows:204px 204px;gap:12px}.bottom{display:grid;grid-template-columns:38% 1fr;gap:18px;border-top:3px solid #172630;padding-top:9px;min-height:0}.section-title{font-size:16px;line-height:21px;letter-spacing:.5px;font-weight:800}.map-section{display:flex;flex-direction:column;min-height:0;padding-right:15px;border-right:1px solid #aeb6a7}.map{margin-top:6px;width:100%;height:229px}.map svg{width:100%;height:100%;display:block}.map-key{display:grid;grid-template-columns:repeat(4,1fr);gap:4px 7px;margin-top:6px;font-size:11.2px;line-height:14px}.map-key span{display:flex;gap:4px;white-space:nowrap}.map-key b{color:#9d3b30;min-width:15px}.map-note{font-size:9.5px;line-height:13px;color:#546558;margin-top:auto}.brief-section{display:flex;flex-direction:column;min-width:0;min-height:0}.briefs{margin-top:6px;display:grid;grid-auto-flow:column;grid-template-columns:1fr 1fr;grid-template-rows:repeat(11,29px);gap:0 15px;min-width:0}.brief{display:flex;align-items:center;gap:6px;border-bottom:1px solid #d4d8ca;min-width:0;height:29px}.brief-number{font-size:11px;font-weight:800;color:#9e3b32;width:16px;flex:none}.micro{width:38px;height:23px;flex:none;border:1px solid #b9c0b0}.micro svg{width:100%;height:100%;display:block}.brief-copy{min-width:0;flex:1}.brief h3{font-family:Georgia,serif;font-size:13.3px;font-weight:700;line-height:15px;white-space:nowrap;letter-spacing:-.18px}.brief-source{font-size:7.6px;line-height:10px;white-space:nowrap;letter-spacing:.1px}.brief-source>span{font-weight:800}.brief-source b{margin-left:3px}.date-check{border:2px solid #8e4232;background:#eee3cc;display:grid;grid-template-columns:156px 1fr 1fr;align-items:center;gap:16px;padding:7px 12px}.date-check .heading{font-family:Georgia,serif;font-size:25px;color:#8e342c;font-weight:bold;line-height:26px}.date-check .heading small{font:9px Arial;letter-spacing:1px;color:#374b42}.date-check h4{font-size:11px;line-height:14px;margin:0 0 3px;color:#8e342c}.date-check p{font-size:11.2px;line-height:15px}.date-check p em{font-style:normal;font-weight:bold}footer{font-size:9px;line-height:14px;letter-spacing:.65px;display:flex;justify-content:space-between;border-bottom:1px solid #8d9889}a{color:inherit}
.topbar{height:24px}.masthead{height:82px}h1{font-size:72px;line-height:82px;letter-spacing:-3px}.deck{font-size:20px;line-height:23px}.timeline-title{font-size:18px;line-height:23px}.timeline-title small{display:block;font-size:9px;line-height:12px}.hero .art{height:137px}.hero h2{font-size:28px;line-height:29px}.small .art{height:60px}.small h2{font-size:20px;line-height:21px}.small p{font-size:13px;line-height:15px}.date-check .heading{font-size:24px;line-height:28px}.date-check .heading small{display:block;font-size:8px;line-height:11px;margin-top:3px}
.timeline-title{font-size:16px;white-space:nowrap;letter-spacing:-.3px;line-height:20px}.timeline-title small{font-size:8.5px;letter-spacing:.2px}.date-check .heading{font-size:20px;line-height:24px;white-space:nowrap}.date-check .heading small{font-size:7.5px;line-height:10px;letter-spacing:.1px;white-space:normal}.art{background:#e7dfce}.art svg{overflow:hidden}
.art{padding-left:44px}.small .art{padding-left:36px}.small .number{width:25px;height:22px;line-height:22px;top:7px;left:5px;font-size:13px}.micro svg{overflow:hidden}
/* Edition 3: legibility at the 1024-pixel judging size. */
html,body{color:#111827}main{grid-template-rows:144px 76px 28px 52px 288px 428px 382px 64px 14px}.masthead{height:90px}h1{font-size:78px;line-height:90px;font-weight:900;color:#0b0f19}.deck,.kpi small,.region-note,.place,.source,.map-note,.timeline-title small,.date-check .heading small{color:#111827}.card{border-color:#758275;background:#fffcf4}.card .art{background:#e6dbc3}.card .art>svg{filter:saturate(1.42) contrast(1.14)}.card:nth-child(2n) .art-banner{background:#0f172a}.art-banner{position:absolute;top:7px;left:52px;max-width:calc(100% - 60px);padding:5px 9px;background:#b91c1c;border-radius:3px;color:#fff;font-size:22px;line-height:25px;font-weight:900;letter-spacing:.15px;white-space:nowrap}.art-caption{position:absolute;bottom:6px;left:52px;padding:3px 7px;background:#0f172a;color:#fff;border-radius:3px;font-size:12px;line-height:14px;font-weight:700;white-space:nowrap}.small-cards{grid-template-rows:208px 208px}.small .art{height:72px}.small .art-banner{left:42px;top:5px;max-width:calc(100% - 49px);font-size:16px;line-height:19px;padding:3px 6px}.small .art-caption{left:42px;bottom:4px;font-size:10.5px;line-height:12px;padding:2px 5px}.small .place{display:none}.small p{font-size:14px;line-height:16px;color:#111827}.hero p{font-size:16px;line-height:19px;color:#111827}.source{font-weight:800}.small .source{font-size:9px;line-height:11px}.number{color:#0f172a;border-bottom-color:#b91c1c;background:#fffaf0}.briefs{grid-template-rows:repeat(11,31px);gap:0 15px}.brief{height:31px;gap:7px;border-bottom-color:#adb6aa}.brief-number{font-size:17px;line-height:23px;color:#991b1b;width:21px;font-weight:900}.brief-line{font-family:Arial,sans-serif;font-size:15.1px;line-height:24px;font-weight:550;letter-spacing:-.15px;white-space:nowrap;color:#111827}.brief-line strong{font-weight:900;color:#0b0f19}.brief-cite{font-size:12px;font-weight:700;color:#111827}.map-key{font-size:12px;line-height:15px}.map-key b{color:#991b1b}.date-check{padding-top:5px;padding-bottom:5px}.date-check p{color:#111827}footer{color:#111827}
.brief-number{width:27px}
</style><main>
<header data-cell="header"><div class="topbar" data-audit><span>THE WORLD IN ONE DAY</span><span>35 STORIES • 7 REGIONS • EVERY ONE DATED FRIDAY 20 NOVEMBER 2026</span></div><div class="masthead"><h1 data-audit>Friday 20 November 2026</h1><div class="edition-box" data-audit>GLOBAL EDITION<br>VOL. XXVI · NO. 324</div></div><p class="deck" data-audit>Bridges under fire. A cyclone makes landfall. AI markets tumble. A world negotiating what comes next.</p></header>
<section class="kpis">${kpis.map(([value,label,source],i)=>`<div class="kpi" data-cell="kpi-${i}"><strong data-audit>${value}</strong><p data-audit>${label}</p><small data-audit>${source}</small></div>`).join('')}</section>
<section class="regions" data-cell="regions">${Object.entries(counts).map(([r,n])=>`<span class="pill" data-audit style="--color:${colors[r]}">${r} ${n}</span>`).join('')}<span class="region-note" data-audit>✓ CONFIRMED REPORT &nbsp; / &nbsp; CLAIM ATTRIBUTED</span></section>
<section class="timeline"><div class="timeline-title" data-audit>THE DAY IN UTC<small>EVENTS + RELEASE TIMES</small></div>${timeline.map(t=>`<div class="tick" data-cell="time-${t.story}"><b data-audit>${t.time}</b><span data-audit>${t.label}</span></div>`).join('')}</section>
<section class="heroes">${stories.slice(0,3).map(s=>card(s,true)).join('')}</section>
<section class="small-cards">${stories.slice(3,13).map(s=>card(s)).join('')}</section>
<section class="bottom"><div class="map-section"><h2 class="section-title" data-audit>WHERE IT HAPPENED</h2><div class="map">${worldMap()}</div><div class="map-key">${labels.map((l,i)=>`<span data-audit><b>${i+1}</b>${escape(l)}</span>`).join('')}</div><p class="map-note" data-audit>Pins 1–13 match the illustrated cards. Lines link displaced labels to coordinates.<br>Map: Natural Earth · schematics and illustrations are editorial, not news photographs.</p></div><div class="brief-section"><h2 class="section-title" data-audit>ALSO ON FRIDAY 20 NOVEMBER — 22 MORE STORIES</h2><div class="briefs">${stories.slice(13).map(brief).join('')}</div></div></section>
<aside class="date-check" data-cell="date-check"><div class="heading" data-audit>DATE CHECK<small>FRIDAY EVENTS / NEW RELEASES</small></div>${exclusions.map(e=>`<div><h4 data-audit>${e.date} · EXCLUDED</h4><p data-audit>${escape(e.text)}</p></div>`).join('')}</aside>
<footer data-cell="footer"><span data-audit>LOCAL EVENT DATES · DATA DATED BY FRIDAY RELEASE · FUTURE OUTCOMES EXCLUDED · SOURCES LINKED IN NEWS-DATA.MJS</span><span data-audit>ORIGINAL VECTOR ART / VERIFIED EDITORIAL BRIEF</span></footer>
</main></html>`;
writeFileSync(resolve(directory,'front-page.html'), html, 'utf8');
const audit = { edition:'2026-11-20',policy:datePolicy,storyCount:stories.length,regions:counts,stories,additionalEvidence,timeline,exclusions };
writeFileSync(resolve(directory,'date-audit.json'),JSON.stringify(audit)+'\n');
console.log(JSON.stringify({generated:'front-page.html',stories:stories.length,regions:counts,illustrations:13,typographicBriefs:22}));
