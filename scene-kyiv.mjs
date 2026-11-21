// Three separately drawn crossings: an editorial schematic, not a damage photograph.
export function kyivPanorama(){
  const rect=(x,y,w,h,c,extra='')=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c}" ${extra}/>`;
  const path=(d,c,stroke='none',width=1,extra='')=>`<path d="${d}" fill="${c}" stroke="${stroke}" stroke-width="${width}" ${extra}/>`;
  const line=(d,c,w=1,extra='')=>path(d,'none',c,w,extra);
  const circle=(x,y,r,c,extra='')=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${c}" ${extra}/>`;
  let b='<defs><linearGradient id="kyiv-sky" x2="0" y2="1"><stop stop-color="#07152c"/><stop offset=".65" stop-color="#192a43"/><stop offset="1" stop-color="#ad6844"/></linearGradient><linearGradient id="kyiv-water" x2="0" y2="1"><stop stop-color="#1b4c65"/><stop offset="1" stop-color="#071e37"/></linearGradient><radialGradient id="kyiv-glow"><stop stop-color="#ffd46e" stop-opacity=".85"/><stop offset="1" stop-color="#e77b39" stop-opacity="0"/></radialGradient></defs>';
  b+=rect(0,0,480,180,'url(#kyiv-sky)');
  for(let i=0;i<36;i++)b+=circle((i*67+17)%480,4+(i*17)%64,i%4?0.6:1,'#e7e8da','opacity=".65"');
  b+=circle(245,101,73,'url(#kyiv-glow)')+circle(415,97,55,'url(#kyiv-glow)');
  for(let i=0;i<39;i++){
    const x=i*13-8,h=11+(i*19)%25,y=89-h;
    b+=rect(x,y,10+(i%2)*2,h,'#0d2038');
    if(i%3===0)b+=rect(x+3,y+7,2,3,'#d0a95c')+rect(x+7,y+14,2,3,'#b49250');
  }
  for(const [x,y] of [[325,65],[341,57],[357,66]])b+=rect(x-6,y+5,12,25,'#142b40')+path(`M${x-9} ${y+7}Q${x-9} ${y-4} ${x} ${y-10}Q${x+9} ${y-4} ${x+9} ${y+7}Z`,'#ccae6c')+line(`M${x} ${y-10}v-8m-3 3h6`,'#f3d991',1.2);
  b+=path('M371 90l3-26 7-1 4 27Z','#102239')+circle(378,59,3,'#102239')+line('M376 66l-8-11V23m12 43 10-12','#102239',4)+rect(386,48,10,15,'#102239')+rect(367,88,22,5,'#102239');
  b+=path('M0 91Q200 78 480 89V180H0Z','url(#kyiv-water)');
  for(let i=0;i<90;i++){const x=(i*79)%480,y=94+(i*23)%84;b+=line(`M${x} ${y}h${4+(i%13)}`,'#6495a2',.7,'opacity=".35"');}
  for(const [x,y,w,rise] of [[-7,125,163,23],[159,160,155,25],[328,132,162,24]]){
    const dx=w*.55,fx=x+dx,fy=y-dx*.1;
    b+=line(`M${x+8} ${y+8}Q${x+w/2} ${y-rise*2} ${x+w-8} ${y-w*.1+8}`,'#95b9c1',3);
    for(let i=1;i<9;i++){const t=i/10,px=x+w*t,deck=y-w*.1*t,arch=deck-4*rise*t*(1-t);b+=line(`M${px} ${arch}V${deck}`,'#b4c9cb',1.2);}
    b+=path(`M${x} ${y}L${fx-11} ${fy+1}l7 7L${x} ${y+7}Z`,'#a0b5b9')+path(`M${fx+10} ${fy+2}L${x+w} ${y-w*.1}v7L${fx+7} ${fy+10}Z`,'#9eafb4');
    for(const t of [.18,.82])b+=rect(x+w*t-3,y-w*t*.1+6,6,26,'#142b40');
    for(let i=5;i>=0;i--)b+=circle(fx+3+i*4,fy-12-i*14,8+i*3,'#151d2a','opacity=".85"');
    b+=path(`M${fx-11} ${fy+8}l3-24 6 9 6-20 4 20 9-8 1 23Z`,'#f4a92b')+path(`M${fx-5} ${fy+8}l6-18 5 18Z`,'#fff3a6');
    for(let i=0;i<9;i++)b+=line(`M${fx-10+(i*7)%17} ${fy+13+i*3}h${3+i%8}`,i%2?'#ffc65c':'#f09b33',1.5,'opacity=".8"');
  }
  b+=line('M172 5Q210 20 243 112M473 4Q435 29 414 98M10 8Q67 40 84 99','#ffd392',1.3,'stroke-dasharray="5 5" opacity=".8"');
  b+=path('M0 152l46-8 38 36H0Z','#08172a')+rect(19,147,24,8,'#e6dfcb')+circle(23,147,2.6,'#ef4444')+circle(38,147,2.6,'#60c4ff')+line('M12 160h13m8 3h19','#ec6654',2)+line('M37 169h25','#71c9fb',2);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 180" preserveAspectRatio="none" role="img" aria-label="Three struck Kyiv bridge crossings with smoke, fire reflections and emergency lights">${b}</svg>`;
}
