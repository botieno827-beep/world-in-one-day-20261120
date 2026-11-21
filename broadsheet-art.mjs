// Original deterministic SVG illustrations. These are editorial schematics, not photographs.
import {kyivPanorama} from './scene-kyiv.mjs';
const paper = '#f6f1e7';
const ink = '#0f172a';
const red = '#b91c1c';
const gold = '#f2ae32';
const svg = (body, background = '#e7dfce') => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 180" preserveAspectRatio="none" role="img" aria-label="Editorial illustration"><rect width="480" height="180" fill="${background}"/>${body}</svg>`;
const path = (d, fill, stroke = 'none', sw = 1, extra = '') => `<path d="${d}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" ${extra}/>`;
const rect = (x, y, w, h, fill, extra = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" ${extra}/>`;
const circle = (x, y, r, fill, extra = '') => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" ${extra}/>`;
const text = (x, y, t, size = 22, fill = paper, extra = '') => `<text x="${x}" y="${y}" font-family="Arial,sans-serif" font-size="${size}" font-weight="700" fill="${fill}" ${extra}>${t}</text>`;
const line = (d, color = ink, sw = 3, extra = '') => path(d, 'none', color, Math.max(1,sw*1.25), extra);
const people = (positions, color) => positions.map(([x,y]) => circle(x,y,7,color)+path(`M${x-10} ${y+10}h20l6 36h-32Z`,color)).join('');
const stars = (cx,cy,r,fill,count=12) => Array.from({length:count},(_,i)=>{
  const a=i*2*Math.PI/count,x=cx+Math.cos(a)*r,y=cy+Math.sin(a)*r;
  const points=Array.from({length:10},(_,j)=>{const angle=-Math.PI/2+j*Math.PI/5,radius=j%2?2.3:5.6;return `${j?'L':'M'}${(x+Math.cos(angle)*radius).toFixed(2)},${(y+Math.sin(angle)*radius).toFixed(2)}`;}).join('');
  return path(points+'Z',fill);
}).join('');
const skyline = Array.from({length:28},(_,i)=>rect(i*19,111-(i*23%31),12+(i%3)*3,69, i%2 ? '#34434c':'#263740')).join('');

function bridgeScene() {
  let body = `<defs><linearGradient id="dawn" x2="0" y2="1"><stop stop-color="#132439"/><stop offset="1" stop-color="#a97449"/></linearGradient><linearGradient id="river" x2="0" y2="1"><stop stop-color="#40525b"/><stop offset="1" stop-color="#102d40"/></linearGradient><radialGradient id="blast"><stop stop-color="#ffce6d" stop-opacity=".7"/><stop offset="1" stop-color="#ed8d3c" stop-opacity="0"/></radialGradient></defs>`;
  body += rect(0,0,480,180,'url(#dawn)')+circle(308,83,85,'url(#blast)');
  body += skyline;
  // Pechersk domes and the Motherland Monument: sword and shield above the river.
  for(const [x,y] of [[330,85],[349,78],[368,88]]) body += rect(x-6,y+9,12,24,'#172c3b')+path(`M${x-9} ${y+10}Q${x-9} ${y-1} ${x} ${y-7}Q${x+9} ${y-1} ${x+9} ${y+10}Z`,'#c8a66d')+line(`M${x} ${y-7}v-9m-3 3h6`,'#d6b879',1.4);
  body += path('M418 113l3-24 6-2 4 25Z','#132a38')+circle(424,82,3,'#132a38')+line('M422 89l-8-11V49m12 40 10-12','#132a38',4)+path('M432 70h10v15h-10Z','#132a38')+rect(414,111,20,6,'#132a38');
  body += rect(0,120,480,60,'url(#river)');
  for(let i=0;i<72;i++){const x=(i*83)%480,y=126+(i*17)%51; body+=line(`M${x} ${y}h${6+i%16}`, i%4===0?'#bd9561':'#80969b',.6,'opacity=".35"');}
  // Two ends of a damaged span; no invented casualty or literal photograph.
  body += path('M0 139 207 115 226 117 239 126 232 136 215 126 0 151Z','#101d29')+path('M263 121 274 109 480 91V102L281 121 276 132Z','#101d29');
  for(const [x,top,bottom] of [[108,46,169],[373,48,132]]){
    for(let s=1;s<8;s++)body+=line(`M${x} ${top+s*3}L${x-s*13} ${139-(x-s*13)*.095}M${x} ${top+s*3}L${x+s*13} ${139-(x+s*13)*.095}`,'#b8bca9',.8);
    body+=rect(x-3,top,6,bottom-top,'#112431');
  }
  body += line('M209 117l8-4m10 6 6-8m41 1 3-8','#ffb954',2);
  for(const [x,y,r] of [[249,105,12],[247,92,17],[258,76,22],[267,55,26],[281,33,28],[304,13,35]])body+=circle(x,y,r,'#24272d','opacity=".78"');
  body+=path('M232 126l4-20 6 11 4-23 7 20 8-7 1 19Z','#f6a446')+path('M240 125l5-14 5 14Z','#ffe4a3');
  for(let i=0;i<22;i++){const x=221+(i*13)%53,y=128+(i*7)%47;body+=line(`M${x} ${y}h${4+i%12}`,i%2?'#e1a04b':'#ffc879',1.5,'opacity=".6"');}
  body+=path('M0 157l41-4 37 27H0Z','#101e2d')+rect(23,148,23,8,'#d1c8b1')+circle(27,148,2,'#eb473a')+circle(41,148,2,'#5fb8f5');
  body+=line('M15 156h16m4 1h17','#d76346',2)+line('M32 162h30','#72bde7',1);
  body+=line('M5 14Q128-8 207 46','#c6906f',.7,'stroke-dasharray="4 5" opacity=".65"')+line('M468 7Q394 12 328 59','#b7b0a2',.7,'stroke-dasharray="4 5" opacity=".65"');
  body+=rect(350,151,116,20,'#172633')+text(408,165,'DNIPRO · KYIV',11,paper,'text-anchor="middle"');
  return svg(body);
}

function cycloneScene(){
  let b=rect(0,0,480,180,'#123a49')+path('M0 0H276L262 24 251 43 231 60 221 78 193 96 190 116 167 144 143 180H0Z','#68836a')+path('M0 0H260L245 35 229 57 211 76 198 95 185 118 165 141 145 180H0Z','#435b52');
  for(let x=20;x<480;x+=35)b+=line(`M${x} 0v180`,'#456a70',.6,'opacity=".5"');
  for(let y=20;y<180;y+=30)b+=line(`M0 ${y}h480`,'#456a70',.6,'opacity=".5"');
  for(let arm=0;arm<5;arm++){
    let d='';for(let i=0;i<86;i++){const a=i*.065+arm*Math.PI*.4,r=4+i*.85;const x=274+Math.cos(a)*r*1.5,y=95+Math.sin(a)*r*.87;d+=(i?'L':'M')+x.toFixed(2)+' '+y.toFixed(2)+' ';}
    b+=line(d,'#d2e7df',12,'stroke-linecap="round" opacity=".62"')+line(d,'#eef3df',4,'opacity=".8"');
  }
  b+=circle(274,95,9,'#234f5c')+line('M291 167Q253 123 212 91T176 32','#f5c76b',2,'stroke-dasharray="5 4"');
  b+=circle(212,91,4,'#f4b355')+line('M208 88l-18-15h-60','#edc886',1)+text(37,69,'GOPALPUR',14,paper)+text(34,29,'ODISHA',20,'#eee5c5');
  b+=rect(290,146,178,25,'#edc077')+text(379,164,'LANDFALL · ~8 AM IST',13,'#18343d','text-anchor="middle"');
  return svg(b);
}

function marketScene(){
  let b=rect(0,0,480,180,'#142631');
  for(let y=23;y<165;y+=28)b+=line(`M18 ${y}H462`,'#31444b',1);
  for(let x=20;x<470;x+=44)b+=line(`M${x} 12v155`,'#263b43',1);
  const vals=[35,31,41,34,46,63,54,68,80,76,89,112,105,134,143,155];
  for(let i=0;i<vals.length;i++){const x=26+i*15,y=vals[i];b+=line(`M${x} ${y-10}v27`,'#da6255',1.3)+rect(x-4,y,8,13,i%4===0?'#7d9b87':'#df6758');}
  b+=line('M20 27 51 37 72 31 100 49 130 53 152 76 181 68 206 106 230 116 254 157','#f18b64',2.5);
  for(const [i,label,v] of [[0,'TAIPEI','−6.2%'],[1,'SEOUL','−5.2%'],[2,'TOKYO','−5.1%'],[3,'HONG KONG','−1.9%']]) b+=text(285,35+i*36,label,14,'#dacfb9')+text(461,36+i*36,v,23,'#ef8573','text-anchor="end"');
  return svg(b);
}

export function artwork(kind){
  if(kind==='kyiv')return kyivPanorama();
  if(kind==='cyclone')return cycloneScene();
  if(kind==='markets')return marketScene();
  if(kind==='climate')return svg(circle(108,99,64,'#2e86af')+path('M63 60 88 47l16 16-5 20 28 8 15 28-19 33-21 9-6-34-23-10-18-30Z','#609c68')+path('M135 51 159 69l-7 24-20-7-7-19Z','#89b67d')+path('M48 76q61-25 119 0m-116 47q57 18 115-5M108 35q-32 63 0 128m0-128q32 63 0 128','none','#abd0d1',1.3)+rect(221,59,19,73,paper,'rx="9" stroke="#b84335" stroke-width="5"')+circle(230.5,139,18,'#b84335')+rect(227,91,7,48,'#b84335')+line('M247 74h13m-13 20h13m-13 20h13','#7a5149',2)+circle(370,105,49,paper,'stroke="#203c4d" stroke-width="5"')+Array.from({length:12},(_,i)=>{const a=i*Math.PI/6;return line(`M${370+Math.cos(a)*40} ${105+Math.sin(a)*40}L${370+Math.cos(a)*44} ${105+Math.sin(a)*44}`,'#203c4d',1.7);}).join('')+line('M370 73v32l22 15','#b91c1c',5)+circle(370,105,4,'#203c4d'));
  if(kind==='europe')return svg(rect(26,35,166,96,'#25446c')+path('M26 35l166 96m0-96L26 131','none','#f2e5cd',17)+path('M26 35l166 96m0-96L26 131','none','#af3f38',6)+rect(94,35,27,96,'#eee9db')+rect(26,71,166,25,'#eee9db')+rect(100,35,15,96,'#ac352e')+rect(26,77,166,13,'#ac352e')+rect(282,35,169,96,'#274f7c')+stars(367,81,34,'#eac161')+path('M177 157q59-66 119 0','none',ink,6)+text(236,27,'100,000 EACH WAY',17,ink,'text-anchor="middle"'));
  if(kind==='poland')return svg(rect(0,117,480,63,'#9b986f')+path('M0 127q98-33 192 2t288-4v55H0Z','#7b805e')+line('M0 152q174-32 480 0','#d2c29a',2)+`<g transform="translate(130 99) rotate(8)">${path('M0 0h147l29 8-29 8H0l14-8Z','#697279')+path('M36 2 22-21h17L64 2m40 12 16 19h15l-8-19','#8c9090')}</g>`+rect(27,22,91,30,red)+text(73,43,'KH-101',17,paper,'text-anchor="middle"')+text(334,47,'POLAND',20,ink));
  if(kind==='iraq')return svg(rect(0,106,480,74,'#bc9768')+path('M0 106l65-25 48 7 64-14 88 37 60-19 155 19v28H0Z','#d3b389')+[34,186,330].map((x,i)=>`<g transform="translate(${x} ${118-i*9})">${rect(0,0,91,26,'#4d5a4f')+rect(43,-15,32,16,'#4d5a4f')+circle(20,28,9,ink)+circle(75,28,9,ink)+line('M62-18h40',ink,4)}</g>`).join('')+rect(41,27,41,10,red)+rect(41,37,41,10,paper)+rect(41,47,41,10,ink)+text(270,43,'JURF AL-SAKHAR',20,ink,'text-anchor="middle"'));
  if(kind==='strike'||kind==='berlin')return svg(rect(0,125,480,55,'#b2a88f')+people([[43,105],[91,95],[145,109],[201,93],[265,102],[326,98],[393,104],[441,94]],'#3b4344')+line('M69 130V31m333 97V31',ink,4)+rect(64,73,344,43,red)+text(236,106,kind==='strike'?'SCIOPERO':'NO TO REARMAMENT',kind==='strike'?27:21,paper,'text-anchor="middle"')+line('M81 98v25m320-28v24','#c18b67',6));
  if(kind==='nvidia')return svg(rect(0,0,480,180,'#172833')+rect(29,31,114,114,'#507264')+rect(48,49,76,77,'#172833')+text(86,97,'AI',28,'#b4d09e','text-anchor="middle"')+line('M169 42h266m-266 44h266m-266 44h266','#405157',1)+line('M174 43 211 51 235 44 271 81 309 76 334 112 361 103 397 144 437 149','#e77e69',4)+rect(256,13,165,27,'#a63e34')+text(338,33,'SEC · ACCOUNTING',14,paper,'text-anchor="middle"'));
  if(kind==='seoul')return svg(rect(67,102,341,20,'#7b887f')+path('M49 101 240 38 428 101Z','#536e6b')+rect(76,135,330,13,'#435654')+[103,161,219,277,335].map(x=>rect(x,107,22,28,'#9ba88f')).join('')+path('M199 169h169l-33-16H224Z',ink)+`<g transform="rotate(-25 309 54)">${rect(273,29,97,28,red)+rect(315,55,11,65,ink)}</g>`+text(73,36,'PARTY POLICY',15,ink));
  if(kind==='oil')return svg(rect(0,132,480,48,'#c3a57b')+circle(375,50,32,'#edc783')+path('M178 144 231 19 263 19 303 144Z','none',ink,6)+line('M190 119h104m-91-32h80m-66-35h53m-78 68 88-67m-76 34 96 59',ink,3)+rect(168,145,145,9,ink)+rect(36,36,85,16,ink)+rect(36,55,85,16,red)+rect(36,74,85,16,'#3e7557')+line('M31 32v105',ink,3)+text(376,127,'AMOSING',16,ink,'text-anchor="middle"'));
  if(kind==='japan')return svg(circle(104,77,40,'#b24c43')+rect(214,102,40,48,'#8da595')+rect(273,80,40,70,'#58786d')+rect(332,53,40,97,'#30524c')+line('M199 153h191',ink,3)+text(104,154,'OCT CPI',16,ink,'text-anchor="middle"')+text(411,45,'2.3%',29,red,'text-anchor="middle"')+text(235,177,'AUG',13,ink,'text-anchor="middle"')+text(294,177,'SEP',13,ink,'text-anchor="middle"')+text(352,177,'OCT',13,ink,'text-anchor="middle"'));
  if(kind==='cricket')return svg(rect(0,0,480,180,'#426b5a')+path('M24 180Q230-72 456 180','none','#8aaf8b',2)+path('M192 180 221 46h41l30 134Z','#d9c395')+rect(32,65,145,88,'#173f37')+text(104,83,'PHILLIPS',17,paper,'text-anchor="middle"')+text(104,135,'118',38,'#edd794','text-anchor="middle"')+line('M320 136V92m8 44V92m8 44V92m-18 0h22',paper,3)+`<g transform="rotate(34 354 90)">${rect(344,67,19,70,'#d6b989')+rect(351,35,6,34,'#deb063')}</g>`+circle(399,129,7,'#a83f34')+text(389,37,'NZ v INDIA',16,paper,'text-anchor="middle"'));
  // Every short brief receives its own custom, contextual miniature scene.
  if(kind==='talks'||kind==='envoy')return svg(path('M35 40h175v69H99l-40 26v-26H35Z','#4a7475')+path('M269 53h175v68h-33v24l-36-24H269Z',kind==='envoy'?'#4d6285':'#af5d43')+text(123,83,kind==='envoy'?'NZ':'US',30,paper,'text-anchor="middle"')+text(357,96,kind==='envoy'?'US':'IRAN',30,paper,'text-anchor="middle"'));
  if(kind==='fire'||kind==='gaza')return svg(rect(0,108,480,72,'#8e8e77')+skyline+path('M209 134l12-53 13 26 13-47 17 44 14-18 9 48Z','#cd7646')+path('M233 134l13-34 14 34Z','#f6bd62')+text(86,50,kind==='gaza'?'GAZA':'YEMEN',22,ink,'text-anchor="middle"'));
  if(kind==='sudan')return svg(path('M0 123q180-50 480 13v44H0Z','#c4a16e')+path('M0 160q260-95 480-15','none','#527b89',17)+people([[150,81],[216,91],[301,74]],'#3d4843')+rect(324,21,124,33,red)+text(386,45,'CLAIM',23,paper,'text-anchor="middle"'));
  if(kind==='crime'||kind==='health')return svg(circle(128,88,61,kind==='health'?'#779b7a':'#697f89')+path(kind==='health'?'M111 47h34v23h23v34h-23v24h-34v-24H87V70h24Z':'M89 48h77v55l-38 29-39-29Z',paper)+text(330,91,kind==='health'?'WHO':'5,590',39,ink,'text-anchor="middle"')+text(330,119,kind==='health'?'20 NOV UPDATE':'JUL–SEP DATA',17,ink,'text-anchor="middle"'));
  if(kind==='heritage')return svg(rect(92,139,296,15,'#9a7e58')+path('M174 135 195 80 190 51 222 27 258 51 249 80 274 135Z','#8e6845')+circle(224,53,13,'#d5b170')+line('M284 52h114m-27-17 27 17-27 17','#4f6e69',5)+text(352,128,'35',43,ink,'text-anchor="middle"'));
  if(kind==='somalia')return svg(rect(0,0,480,180,'#6b9eb2')+text(243,115,'★',107,paper,'text-anchor="middle"')+people([[46,120],[100,130],[385,120],[435,126]],ink));
  if(kind==='security')return svg(path('M120 26h95v73l-47 46-48-46Z','#657d8b')+path('M276 26h94v73l-47 46-47-46Z','#a38166')+line('M228 47l31 70m-31 0 31-70',red,8));
  if(kind==='dinghy')return svg(rect(0,120,480,60,'#567f8c')+path('M87 106h270l-43 39H128Z',red)+path('M170 88h112l28 18H140Z','#baad91')+`<g transform="rotate(-25 339 59)">${rect(299,32,76,21,ink)+rect(325,53,15,56,ink)}</g>`);
  if(kind==='iowa')return svg(rect(0,127,480,53,'#b5a580')+[115,191,267].map(x=>rect(x,68,56,76,'#7b8981')+line(`M${x} 83h56m-56 43h56`,'#394d4c',4)).join('')+path('M329 32h99v68h-32l-17 17v-17h-50Z',red)+text(379,77,'DOJ',24,paper,'text-anchor="middle"'));
  if(kind==='halifax')return svg(rect(0,120,480,60,'#6c8b96')+path('M98 116h274l-30 28H133Z',ink)+rect(168,73,113,44,'#d8cfb8')+line('M224 75V21',ink,3)+path('M226 23h69v37h-69Z',red)+text(261,52,'✦',29,paper,'text-anchor="middle"'));
  if(kind==='brazil')return svg(rect(0,0,480,180,'#567c58')+path('M240 25 412 90 240 155 68 90Z','#e4be66')+circle(240,90,47,'#355b79')+path('M200 77q42-10 82 23','none',paper,8));
  if(kind==='fed')return svg(path('M105 69 240 22 374 69Z','#667d78')+[130,190,250,310].map(x=>rect(x,77,25,63,'#8b9c85')).join('')+rect(109,145,266,13,ink)+line('M310 30 352 18 393 31 421 7',red,5)+text(240,115,'FED',23,ink,'text-anchor="middle"'));
  if(kind==='australia')return svg(rect(25,29,179,114,'#355579')+stars(136,87,24,paper,5)+rect(276,29,179,114,red)+text(312,76,'★',43,'#efcd73')+line('M199 159q39-32 82 0',ink,5));
  if(kind==='retail')return svg(rect(91,59,299,95,'#718176')+rect(72,32,337,31,ink)+text(241,54,'DAVID JONES',20,paper,'text-anchor="middle"')+rect(216,92,51,62,'#d5cbb2')+rect(115,83,72,42,'#b2bfac')+rect(298,83,66,42,'#b2bfac')+line('M286 143l98-89',red,8));
  if(kind==='nepal')return svg(path('M17 153 110 21 209 153Z','#9fae9b')+path('M110 21 77 68l29-9 35 10Z',paper)+rect(216,121,215,36,'#6e9275')+line('M315 126V62m15 64V62m15 64V62m-33 0h35',ink,4)+circle(383,101,10,red));
  if(kind==='aid')return svg(rect(60,46,138,108,'#be9769')+line('M128 46v108m-68-59h138','#977752',4)+path('M274 75h37V38h35v37h36v36h-36v36h-35v-36h-37Z','#557f73')+text(128,31,'€10m',25,ink,'text-anchor="middle"'));
  if(kind==='children')return svg(circle(240,73,38,'#c7a567')+path('M207 80h66l14 28h-94Z','#c7a567')+rect(190,108,100,9,ink)+circle(240,125,9,ink)+people([[71,111],[120,119],[362,111],[413,119]],'#607f7b'));
  if(kind==='ukraine')return svg(rect(42,35,122,46,'#4d8397')+rect(42,81,122,46,'#dfb45b')+rect(266,40,118,105,'#ddcfad')+line('M325 40v105m-59-75h118m-118 35h118','#99a18e',2)+circle(233,74,16,'#6d8279')+path('M214 96h39l9 58h-57Z','#6d8279'));
  throw new Error(`No illustration for ${kind}`);
}
