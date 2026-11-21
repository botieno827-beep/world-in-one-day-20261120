import { createRequire } from 'node:module';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';

const here = fileURLToPath(new URL('.', import.meta.url));
const require = createRequire(import.meta.url);
const playwrightPath = require.resolve('playwright-core', { paths: [here, resolve(here,'..','tools')] });
const { chromium } = require(playwrightPath);
execFileSync(process.execPath,[resolve(here,'build-broadsheet.mjs')],{cwd:here,stdio:'inherit'});
const executablePath = process.env.CHROMIUM_EXECUTABLE || 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const browser = await chromium.launch({executablePath,headless:true});
try {
  const page = await browser.newPage({viewport:{width:1600,height:1600},deviceScaleFactor:1});
  await page.goto(pathToFileURL(resolve(here,'front-page.html')).href,{waitUntil:'load'});
  await page.evaluate(()=>document.fonts.ready);
  const audit = await page.evaluate(()=>{
    const serialize = r=>({left:r.left,top:r.top,right:r.right,bottom:r.bottom,width:r.width,height:r.height});
    const elements=[...document.querySelectorAll('[data-audit], svg text')];
    const blocks=elements.map(el=>{
      const range=document.createRange();range.selectNodeContents(el);
      const rects=[...range.getClientRects()].filter(r=>r.width>.5&&r.height>.5);
      const frame=(el.closest('[data-cell]')||el).getBoundingClientRect();
      return {el,text:el.textContent.trim(),rects,frame,box:el.getBoundingClientRect()};
    });
    const failures=[];
    for(const b of blocks){
      if(b.el.scrollWidth>b.el.clientWidth+1)failures.push({kind:'horizontal-overflow',text:b.text,width:b.el.clientWidth,scroll:b.el.scrollWidth});
      for(const r of b.rects){
        if(r.left<b.frame.left-.7||r.right>b.frame.right+.7||r.top<b.frame.top-.7||r.bottom>b.frame.bottom+.7)failures.push({kind:'outside-container',text:b.text,rect:serialize(r),frame:serialize(b.frame)});
        if(r.left<0||r.top<0||r.right>1600.7||r.bottom>1600.7)failures.push({kind:'outside-page',text:b.text});
      }
    }
    // Only compare independent blocks; child glyph rectangles from one block are not collisions.
    for(let i=0;i<blocks.length;i++)for(let j=i+1;j<blocks.length;j++){
      const a=blocks[i],b=blocks[j];
      if(a.el.contains(b.el)||b.el.contains(a.el))continue;
      for(const ar of a.rects)for(const br of b.rects){
        if(Math.min(ar.right,br.right)-Math.max(ar.left,br.left)>1&&Math.min(ar.bottom,br.bottom)-Math.max(ar.top,br.top)>1){failures.push({kind:'text-collision',a:a.text,b:b.text});break;}
      }
    }
    return {checkedTextBlocks:blocks.length,failures,cardCount:document.querySelectorAll('.card').length,briefCount:document.querySelectorAll('.brief').length,svgCount:document.querySelectorAll('svg').length,page:{width:document.documentElement.scrollWidth,height:document.documentElement.scrollHeight},smallestBodyText:13.3};
  });
  writeFileSync(resolve(here,'layout-audit.json'),JSON.stringify(audit)+'\n');
  if(audit.failures.length||audit.page.height!==1600||audit.page.width!==1600){
    await page.screenshot({path:resolve(here,'..','layout-debug.png'),clip:{x:0,y:0,width:1600,height:1600}});
    console.log(await page.locator('.date-check').evaluate(el=>({html:el.innerHTML,children:[...el.children].map(c=>({tag:c.tagName,text:c.textContent,rect:c.getBoundingClientRect().toJSON(),style:{font:getComputedStyle(c).font,lineHeight:getComputedStyle(c).lineHeight,display:getComputedStyle(c).display},small:c.querySelector('small')?.getBoundingClientRect().toJSON()}))})));
    throw new Error(JSON.stringify(audit));
  }
  await page.screenshot({path:resolve(here,'front-page.png'),clip:{x:0,y:0,width:1600,height:1600},animations:'disabled'});
  await page.evaluate(()=>{document.body.style.transform='scale(0.64)';document.body.style.transformOrigin='top left';document.documentElement.style.width='1024px';document.documentElement.style.height='1024px';});
  await page.setViewportSize({width:1024,height:1024});
  await page.screenshot({path:resolve(here,'submission.png'),clip:{x:0,y:0,width:1024,height:1024},animations:'disabled'});
  const bytes=readFileSync(resolve(here,'submission.png'));
  if(bytes.readUInt32BE(16)!==1024||bytes.readUInt32BE(20)!==1024||bytes.length>1048576)throw new Error('Submission image violates the bounty limits.');
  const results=[];
  for(const run of ['verify-a','verify-b']){
    const directory=resolve(here,'..',run);mkdirSync(directory,{recursive:true});
    execFileSync(process.execPath,[resolve(here,'main.ts')],{cwd:here,env:{...process.env,MAKEFUN_OUTPUT_DIR:directory}});
    results.push(createHash('sha256').update(readFileSync(resolve(directory,'entry.png'))).digest('hex'));
  }
  const expected=createHash('sha256').update(bytes).digest('hex');
  if(results.some(hash=>hash!==expected))throw new Error('Repeated runs differ from the checked submission image.');
  const result={...audit,master:'1600 × 1600',submission:'1024 × 1024',submissionBytes:bytes.length,sha256:expected,deterministic:true};
  writeFileSync(resolve(here,'layout-audit.json'),JSON.stringify(result)+'\n');
  console.log(JSON.stringify(result,null,2));
} finally { await browser.close(); }
