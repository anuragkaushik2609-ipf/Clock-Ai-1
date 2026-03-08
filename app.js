
// Particle canvas for splash
(function(){
  const c=document.getElementById('splash-canvas');
  if(!c)return;
  const ctx=c.getContext('2d');
  let W,H,pts=[];
  function resize(){W=c.width=innerWidth;H=c.height=innerHeight;init()}
  function init(){
    pts=[];
    for(let i=0;i<55;i++){
      pts.push({
        x:Math.random()*W,y:Math.random()*H,
        r:Math.random()*1.6+.3,
        dx:(Math.random()-.5)*.3,dy:(Math.random()-.5)*.3,
        o:Math.random()*.5+.1
      });
    }
  }
  function draw(){
    ctx.clearRect(0,0,W,H);
    // Glow blobs
    const g1=ctx.createRadialGradient(W*.5,H*.38,0,W*.5,H*.38,W*.45);
    g1.addColorStop(0,'rgba(91,155,255,.08)');g1.addColorStop(1,'transparent');
    ctx.fillStyle=g1;ctx.fillRect(0,0,W,H);
    const g2=ctx.createRadialGradient(W*.8,H*.8,0,W*.8,H*.8,W*.35);
    g2.addColorStop(0,'rgba(184,158,255,.06)');g2.addColorStop(1,'transparent');
    ctx.fillStyle=g2;ctx.fillRect(0,0,W,H);
    // Stars
    pts.forEach(p=>{
      p.x+=p.dx;p.y+=p.dy;
      if(p.x<0)p.x=W;if(p.x>W)p.x=0;
      if(p.y<0)p.y=H;if(p.y>H)p.y=0;
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(180,200,255,${p.o})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  window.addEventListener('resize',resize);
  resize();draw();
})();

window.addEventListener('DOMContentLoaded',()=>{
  setTimeout(()=>{
    const s=document.getElementById('splash');
    s.classList.add('hide');
    setTimeout(()=>s.remove(),650);
  },2600);
});



// ═══════════════════════════════════════════════
//  AIR HUNTER — MERGED APP
// ═══════════════════════════════════════════════

// ─── STORAGE ─────────────────────────────────
const LS={g:(k,d)=>{try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch{return d}},s:(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch{}}};

// ─── CHAPTER DATA ─────────────────────────────
const CHAPTERS = {
  p:[
    {id:'p1',name:'Kinematics',subtopics:['Distance & Displacement','Speed & Velocity','Acceleration','Equations of Motion','Projectile Motion','Relative Motion','Circular Motion']},
    {id:'p2',name:'Laws of Motion',subtopics:['Newton\'s 1st Law','Newton\'s 2nd Law','Newton\'s 3rd Law','Free Body Diagram','Friction','Tension & Pulley']},
    {id:'p3',name:'Work, Energy & Power',subtopics:['Work Done','Kinetic Energy','Potential Energy','Work-Energy Theorem','Power','Conservation of Energy']},
    {id:'p4',name:'Rotational Motion',subtopics:['Moment of Inertia','Torque','Angular Momentum','Rolling Motion','Theorems of MI']},
    {id:'p5',name:'Gravitation',subtopics:['Kepler\'s Laws','Universal Gravitation','Gravitational PE','Satellites','Escape Velocity']},
    {id:'p6',name:'Thermodynamics',subtopics:['Zeroth Law','1st Law','2nd Law','Carnot Engine','Heat Engines','Entropy']},
    {id:'p7',name:'Electrostatics',subtopics:['Coulomb\'s Law','Electric Field','Gauss\'s Law','Electric Potential','Capacitors']},
    {id:'p8',name:'Current Electricity',subtopics:['Ohm\'s Law','Kirchhoff\'s Laws','Wheatstone Bridge','Meter Bridge','Potentiometer']},
    {id:'p9',name:'Magnetism',subtopics:['Biot-Savart Law','Ampere\'s Law','Magnetic Force','EMI','AC Circuits']},
    {id:'p10',name:'Optics',subtopics:['Reflection','Refraction','Lens Formula','Wave Optics','Young\'s Double Slit']},
    {id:'p11',name:'Modern Physics',subtopics:['Photoelectric Effect','de Broglie','Bohr Model','Radioactivity','Nuclear Reactions']},
    {id:'p12',name:'Waves',subtopics:['Wave Motion','Sound Waves','Standing Waves','Doppler Effect','Superposition']},
  ],
  g:[
    {id:'g1',name:'Atomic Structure',subtopics:['Bohr Model','Quantum Numbers','Orbitals','Electronic Config','Aufbau Principle']},
    {id:'g2',name:'Chemical Bonding',subtopics:['Ionic Bonding','Covalent Bonding','VSEPR Theory','Hybridization','MO Theory']},
    {id:'g3',name:'States of Matter',subtopics:['Gas Laws','Ideal Gas','Real Gas','Van der Waals','Liquids & Solids']},
    {id:'g4',name:'Thermodynamics',subtopics:['Enthalpy','Entropy','Gibbs Energy','Hess\'s Law','Bond Enthalpies']},
    {id:'g5',name:'Equilibrium',subtopics:['Kc & Kp','Le Chatelier\'s Principle','Ionic Equilibrium','pH','Buffer Solutions']},
    {id:'g6',name:'Electrochemistry',subtopics:['Redox Reactions','EMF','Nernst Equation','Faraday\'s Laws','Batteries']},
    {id:'g7',name:'Organic Reactions',subtopics:['Substitution','Addition','Elimination','Named Reactions','Mechanisms']},
    {id:'g8',name:'Coordination Compounds',subtopics:['Werner Theory','Nomenclature','Crystal Field Theory','Isomerism','Stability']},
    {id:'g9',name:'Biomolecules',subtopics:['Carbohydrates','Proteins','Nucleic Acids','Lipids','Enzymes']},
    {id:'g10',name:'Surface Chemistry',subtopics:['Adsorption','Catalysis','Colloids','Emulsions','Micelles']},
  ],
  r:[
    {id:'r1',name:'Sets & Relations',subtopics:['Set Operations','Venn Diagrams','Relations','Functions','Types of Functions']},
    {id:'r2',name:'Complex Numbers',subtopics:['Algebra of Complex','Modulus & Argument','Polar Form','De Moivre\'s Theorem','Roots of Unity']},
    {id:'r3',name:'Quadratic Equations',subtopics:['Roots & Discriminant','Sum & Product of Roots','Nature of Roots','Quadratic Inequalities']},
    {id:'r4',name:'Sequences & Series',subtopics:['AP','GP','HP','Arithmetic-Geometric','Sum of Special Series']},
    {id:'r5',name:'Trigonometry',subtopics:['Trigonometric Ratios','Identities','Inverse Trig','Equations','Properties of Triangle']},
    {id:'r6',name:'Limits & Continuity',subtopics:['Limit Definition','Standard Limits','L\'Hôpital\'s Rule','Continuity','Differentiability']},
    {id:'r7',name:'Differentiation',subtopics:['Chain Rule','Product Rule','Implicit Differentiation','Parametric','Higher Derivatives']},
    {id:'r8',name:'Integration',subtopics:['Standard Forms','Substitution','By Parts','Partial Fractions','Definite Integrals']},
    {id:'r9',name:'Matrices',subtopics:['Matrix Operations','Determinants','Inverse','System of Equations','Cayley-Hamilton']},
    {id:'r10',name:'3D Geometry',subtopics:['Direction Cosines','Equation of Line','Plane','Angle Between','Distance Formulas']},
    {id:'r11',name:'Conic Sections',subtopics:['Circle','Parabola','Ellipse','Hyperbola','General Equation']},
    {id:'r12',name:'Probability',subtopics:['Classical Probability','Conditional','Bayes\' Theorem','Distributions','Expectation']},
  ]
};

// chapter names only (for test engine)
const CH_NAMES = {
  p: CHAPTERS.p.map(c=>c.name),
  g: CHAPTERS.g.map(c=>c.name),
  r: CHAPTERS.r.map(c=>c.name)
};
const SUBJ_NAMES={p:'Physics',g:'Chemistry',r:'Mathematics',all:'Full Mock'};
const SUBJ_COLORS={p:'var(--ap)',g:'var(--ag)',r:'var(--ar)',all:'var(--am)'};

// ─── PREP APP STATE ───────────────────────────
let ST = {
  tasks:    LS.g('jee2_tasks',[]),
  backlog:  LS.g('jee2_backlog',[]),
  notes:    LS.g('jee2_notes',[]),
  formulas: LS.g('jee2_formulas',[]),
  mocks:    LS.g('jee2_mocks',[]),
  revision: LS.g('jee2_revision',[]),
  streak:   LS.g('jee2_streak',{days:[],count:0}),
  scores:   LS.g('jee2_scores',{p:null,c:null,m:null}),
  chapters: LS.g('jee2_chapters',{}),
  pracSubj: 'p',
  formSubj: 'p',
  noteSubj: 'p',
  curPage:  'home',
  curSubPage:'revision',
  timerSecs:25*60,
  timerRunning:false,
  timerInt:null,
  openChapterId:null,
};
function sv(k){LS.s('jee2_'+k,ST[k])}

// ─── TEST ENGINE STATE ────────────────────────
let bank      = LS.g('jte_bank',[]);
let attempts  = LS.g('jte_attempts',[]);
let testSetup = {subj:null,chapters:[],timerMins:30};
let curSubPage2 = 'home';
let T = {qs:[],idx:0,answers:{},marked:{},timerSecs:0,timerInt:null,startTime:null,testName:'',subj:'',chapters:[],timerMins:0};

// ─── UTILS ────────────────────────────────────
const uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,5);
const today=()=>new Date().toISOString().split('T')[0];
const todayStr=()=>new Date().toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'});
const nowStr=()=>{const n=new Date();return n.toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})+' '+n.toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit',hour12:true});}
const fmtD=(d)=>{if(!d)return'';const dt=new Date(d+'T00:00:00');return dt.toLocaleDateString('en-IN',{day:'numeric',month:'short'})};
const ge=id=>document.getElementById(id);

// ─── STREAK ───────────────────────────────────
function markToday(){
  const t=today();
  if(!ST.streak.days.includes(t)){
    ST.streak.days.push(t);
    let cnt=0,d=new Date();
    while(true){const s=d.toISOString().split('T')[0];if(ST.streak.days.includes(s)){cnt++;d.setDate(d.getDate()-1)}else break;}
    ST.streak.count=cnt;sv('streak');
  }
}
function renderStreak(){
  const cal=ge('streak-cal');if(!cal)return;
  cal.innerHTML='';
  const now=new Date();
  for(let i=6;i>=0;i--){
    const d=new Date(now);d.setDate(d.getDate()-i);
    const ds=d.toISOString().split('T')[0];
    const div=document.createElement('div');
    div.className='sday '+(i===0?'today':ST.streak.days.includes(ds)?'done':'miss');
    div.textContent=d.getDate();
    cal.appendChild(div);
  }
  const sc=ge('streak-count');if(sc)sc.textContent=ST.streak.count+'d';
  const ss=ge('s-streak');if(ss)ss.textContent=ST.streak.count;
}

// ─── PAGE NAVIGATION ──────────────────────────
function showPage(p){
  document.querySelectorAll('.page').forEach(x=>x.classList.remove('on'));
  document.querySelectorAll('.bn').forEach(x=>x.classList.remove('on'));
  ge('page-'+p).classList.add('on');
  const bn=ge('bn-'+p);if(bn)bn.classList.add('on');
  ST.curPage=p;
  const fab=ge('fab');
  const fabPages=['more'];
  if(fab)fab.className='fab'+(fabPages.includes(p)?'':' hide');
  const renders={
    home:renderHome,
    practice:renderChapterList,
    more:renderMore,
    testsetup:renderTestHome
  };
  if(renders[p])renders[p]();
}

function showSubPage(sp){
  document.querySelectorAll('.subpage').forEach(x=>x.style.display='none');
  ge('sub-'+sp).style.display='block';
  ST.curSubPage=sp;
  if(sp==='backlog')renderBacklog();
  if(sp==='formulas')renderFormulas();
  if(sp==='notes')renderNotes();
  if(sp==='revision')renderRevision();
  if(sp==='mocks')renderMocks();
  if(sp==='analytics')renderAnalytics();
}

function showSubPage2(sp){
  document.querySelectorAll('.subpage2').forEach(x=>x.style.display='none');
  ge('sub2-'+sp).style.display='block';
  curSubPage2=sp;
  if(sp==='bank')renderBank();
  if(sp==='history')renderHistory();
  if(sp==='home')renderTestHome();
  if(sp==='quicktest'){qtParsedQ=[];ge('qt-json-inp').value='';ge('qt-status').style.display='none';const btn=ge('qt-start-btn');btn.style.opacity='.4';btn.style.pointerEvents='none';ge('qt-q-count').textContent='';qtSelectTimer(30);}
}

// ─── HOME ─────────────────────────────────────
function renderHome(){
  const scores=[['s-p',ST.scores.p,'%'],['s-c',ST.scores.c,'%'],['s-m',ST.scores.m,'%']];
  scores.forEach(([id,val,suf])=>{const e=ge(id);if(e)e.textContent=val!==null?(val+suf):'—'});
  renderStreak();
  ge('date-disp').textContent=new Date().toDateString().toUpperCase();
  const tw=ge('home-tasks');
  if(!ST.tasks.length){tw.innerHTML='<div class="empty"><span class="empty-icon">📋</span><span class="empty-text">Koi task nahi. Add karo!</span></div>';ge('task-count-badge').textContent='0/0';return}
  const done=ST.tasks.filter(t=>t.done).length;
  ge('task-count-badge').textContent=done+'/'+ST.tasks.length;
  tw.innerHTML=ST.tasks.map(t=>`<div class="task-item${t.done?' done':''}" onclick="toggleTask('${t.id}')"><div class="task-check">${t.done?'✓':''}</div><span class="task-name">${t.name}</span><span class="task-subj">${t.subj.slice(0,4).toUpperCase()}</span><button class="task-del" onclick="delTask(event,'${t.id}')">×</button></div>`).join('');
  const bw=ge('home-backlog');
  const hi=ST.backlog.filter(b=>b.prio==='high').slice(0,4);
  if(!hi.length){bw.innerHTML='<div class="empty"><span class="empty-icon">🎉</span><span class="empty-text">High priority backlog clear hai!</span></div>';return}
  bw.innerHTML=hi.map(b=>`<div class="bl-item ${b.prio}"><span class="badge high">HIGH</span><span class="bl-text">${b.topic}</span><span class="bl-due">${b.subj.slice(0,4)}</span></div>`).join('');
}

window.toggleTask=(id)=>{const t=ST.tasks.find(x=>x.id===id);if(t){t.done=!t.done;sv('tasks');renderHome()}}
window.delTask=(e,id)=>{e.stopPropagation();ST.tasks=ST.tasks.filter(x=>x.id!==id);sv('tasks');renderHome()}
window.saveTask=()=>{
  const n=ge('ti-name').value.trim(),s=ge('ti-subj').value;
  if(!n)return;
  ST.tasks.push({id:uid(),name:n,subj:s,done:false,addedAt:nowStr()});
  sv('tasks');closeModal('task-modal');ge('ti-name').value='';renderHome();
}
window.saveScores=()=>{
  const p=parseInt(ge('sp').value),c=parseInt(ge('sc2').value),m=parseInt(ge('sm').value);
  if(!isNaN(p))ST.scores.p=p;if(!isNaN(c))ST.scores.c=c;if(!isNaN(m))ST.scores.m=m;
  sv('scores');closeModal('score-modal');ge('sp').value='';ge('sc2').value='';ge('sm').value='';renderHome();
}

// ─── CHAPTERS ────────────────────────────────
function getSubjColor(s){return{p:'p',g:'g',r:'r'}[s]}
function getChapProgress(chId){
  const cdata=ST.chapters[chId];if(!cdata||!cdata.subtopics)return 0;
  const ch=getAllChapById(chId);if(!ch)return 0;
  const total=ch.subtopics.length;if(!total)return 0;
  const done=ch.subtopics.filter(s=>cdata.subtopics[s]).length;
  return Math.round(done/total*100);
}
function getAllChapById(id){for(const s of Object.values(CHAPTERS)){const c=s.find(x=>x.id===id);if(c)return c}return null;}
function renderChapterList(){
  const s=ST.pracSubj;const list=ge('chapter-list');if(!list)return;
  const cl=getSubjColor(s);
  list.innerHTML=CHAPTERS[s].map(ch=>{
    const prog=getChapProgress(ch.id);
    const cdata=ST.chapters[ch.id];const target=cdata?.target;
    const meta=target?`Target: ${target} days`:'Tap to open & set target';
    const col=cl==='p'?'var(--ap)':cl==='g'?'var(--ag)':'var(--ar)';
    return`<div class="ch-item ${cl}" onclick="openChapter('${ch.id}')">
      <div class="ch-dot" style="background:${col}"></div>
      <div class="ch-info"><div class="ch-name">${ch.name}</div><div class="ch-meta">${meta} · ${ch.subtopics.length} topics</div></div>
      <div class="ch-prog-wrap">
        <div class="ch-prog-num" style="color:${col}">${prog}%</div>
        <div class="ch-prog-bar"><div class="ch-prog-fill" style="width:${prog}%;background:${col}"></div></div>
      </div>
      <div class="ch-arrow">›</div>
    </div>`;
  }).join('');
}

function switchSubj(s,el2,ctx){
  const pg=ctx==='prac'?'#page-practice .chip':ctx==='form'?'#page-formulas .chip':'#page-notes .chip';
  document.querySelectorAll(pg).forEach(c=>c.classList.remove('on'));
  el2.classList.add('on');
  if(ctx==='prac'){ST.pracSubj=s;renderChapterList()}
  else if(ctx==='form'){ST.formSubj=s;renderFormulas()}
  else{ST.noteSubj=s;renderNotes()}
}
window.switchSubj=switchSubj;

function switchMoreSubj(s,ctx,el){
  if(ctx==='form'){
    document.querySelectorAll('[id^="more-fchip-"]').forEach(c=>c.classList.remove('on'));
    el.classList.add('on');
    ST.formSubj=s;renderFormulas();
  } else {
    document.querySelectorAll('[id^="more-nchip-"]').forEach(c=>c.classList.remove('on'));
    el.classList.add('on');
    ST.noteSubj=s;renderNotes();
  }
}
window.switchMoreSubj=switchMoreSubj;

function openChapter(id){
  ST.openChapterId=id;
  const ch=getAllChapById(id);if(!ch)return;
  const subj=Object.keys(CHAPTERS).find(s=>CHAPTERS[s].some(c=>c.id===id));
  const subjNames={p:'Physics',g:'Chemistry',r:'Mathematics'};
  ge('chap-name-title').textContent=ch.name;
  ge('chap-sub-title').textContent=subjNames[subj]||'';
  renderChapBody(id,ch,subj);
  const pg=ge('page-chapter');
  pg.classList.add('on');pg.scrollTop=0;
}
window.openChapter=openChapter;

function closeChapter(){ge('page-chapter').classList.remove('on');renderChapterList()}
window.closeChapter=closeChapter;

function renderChapBody(id,ch,subj){
  const cdata=ST.chapters[id]||{target:null,subtopics:{}};
  const cl=subj==='p'?'var(--ap)':subj==='g'?'var(--ag)':'var(--ar)';
  const total=ch.subtopics.length;
  const done=ch.subtopics.filter(s=>cdata.subtopics[s]).length;
  const pct=total?Math.round(done/total*100):0;
  const r=42,circ=2*Math.PI*r,offset=circ-(pct/100*circ);
  let html=`
  <div class="progress-ring-wrap">
    <svg class="ring-svg" width="100" height="100" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="${r}" fill="none" stroke="var(--b1)" stroke-width="8"/>
      <circle cx="50" cy="50" r="${r}" fill="none" stroke="${cl}" stroke-width="8"
        stroke-dasharray="${circ}" stroke-dashoffset="${offset}" stroke-linecap="round"
        transform="rotate(-90 50 50)" style="transition:stroke-dashoffset .6s ease"/>
    </svg>
    <div class="ring-info">
      <div class="ring-pct" style="color:${cl}">${pct}%</div>
      <div class="ring-label">COMPLETED</div>
      <div class="ring-fraction">${done} / ${total} topics</div>
    </div>
  </div>
  <div class="target-box">
    <div class="target-box-title">📅 Completion Target</div>`;
  if(cdata.target){
    html+=`<div class="target-display"><span class="target-display-text">🎯 ${cdata.target} days target set</span><span class="target-display-edit" onclick="editTarget('${id}')">Change</span></div>`;
  } else {
    html+=`<div class="target-row"><input class="target-inp" id="target-inp-${id}" type="number" min="1" max="365" placeholder="Days to complete (e.g. 7)"><button class="target-save" onclick="saveTarget('${id}')">Set Target</button></div>`;
  }
  html+=`</div><div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px"><span class="section-label" style="margin-bottom:0">SUBTOPICS</span><span style="font-size:11px;color:var(--txt3);font-family:var(--fm)">${done}/${total} done</span></div>`;
  ch.subtopics.forEach(sub=>{
    const isDone=!!cdata.subtopics[sub];
    html+=`<div class="subtopic-item${isDone?' done':''}" onclick="toggleSub('${id}','${sub.replace(/'/g,"\\'")}')">
      <div class="sub-check">${isDone?'✓':''}</div>
      <div class="sub-info"><div class="sub-name">${sub}</div></div>
    </div>`;
  });
  html+=`<div style="margin-top:14px"><span class="section-label">ADD CUSTOM SUBTOPIC</span>
    <div class="add-subtopic-row">
      <input class="sub-inp" id="sub-inp-${id}" placeholder="e.g. Center of Mass" autocomplete="off">
      <button class="sub-add-btn" onclick="addCustomSub('${id}')">Add</button>
    </div>
  </div>`;
  ge('chap-body').innerHTML=html;
}

window.toggleSub=(chapId,sub)=>{
  if(!ST.chapters[chapId])ST.chapters[chapId]={target:null,subtopics:{}};
  ST.chapters[chapId].subtopics[sub]=!ST.chapters[chapId].subtopics[sub];
  sv('chapters');
  const ch=getAllChapById(chapId);
  const subj=Object.keys(CHAPTERS).find(s=>CHAPTERS[s].some(c=>c.id===chapId));
  renderChapBody(chapId,ch,subj);
}
window.saveTarget=(chapId)=>{
  const inp=ge('target-inp-'+chapId);if(!inp)return;
  const days=parseInt(inp.value);if(!days||days<1){alert('Valid days daalo!');return}
  if(!ST.chapters[chapId])ST.chapters[chapId]={target:null,subtopics:{}};
  ST.chapters[chapId].target=days;sv('chapters');
  const ch=getAllChapById(chapId);
  const subj=Object.keys(CHAPTERS).find(s=>CHAPTERS[s].some(c=>c.id===chapId));
  renderChapBody(chapId,ch,subj);
}
window.editTarget=(chapId)=>{
  if(!ST.chapters[chapId])return;
  ST.chapters[chapId].target=null;sv('chapters');
  const ch=getAllChapById(chapId);
  const subj=Object.keys(CHAPTERS).find(s=>CHAPTERS[s].some(c=>c.id===chapId));
  renderChapBody(chapId,ch,subj);
}
window.addCustomSub=(chapId)=>{
  const inp=ge('sub-inp-'+chapId);if(!inp)return;
  const name=inp.value.trim();if(!name)return;
  const ch=getAllChapById(chapId);if(!ch)return;
  if(!ch.subtopics.includes(name))ch.subtopics.push(name);
  inp.value='';LS.s('jee2_custom_'+chapId,ch.subtopics);
  const subj=Object.keys(CHAPTERS).find(s=>CHAPTERS[s].some(c=>c.id===chapId));
  renderChapBody(chapId,ch,subj);
}

// ─── BACKLOG ─────────────────────────────────
function renderBacklog(){
  ['high','med','low'].forEach(p=>{
    const w=ge('bl-'+p);if(!w)return;
    const items=ST.backlog.filter(b=>b.prio===p);
    if(!items.length){w.innerHTML='<div style="padding:8px 0;font-size:11px;color:var(--txt3);font-family:var(--fm)">Nothing here ✓</div>';return}
    w.innerHTML=items.map(b=>`<div class="bl-item ${p}"><span class="badge ${p}">${p.toUpperCase()}</span><div style="flex:1;min-width:0"><span class="bl-text">${b.topic}</span>${b.addedAt?`<div style="font-size:9px;color:var(--txt3);font-family:var(--fm);margin-top:2px">🕐 ${b.addedAt}</div>`:''}</div><span class="bl-due">${b.subj.slice(0,4)}${b.due?' · '+fmtD(b.due):''}</span><button class="bl-del" onclick="delBacklog('${b.id}')">×</button></div>`).join('');
  });
  const t=ge('bl-total');if(t)t.textContent=ST.backlog.length+' PENDING';
}
window.delBacklog=(id)=>{ST.backlog=ST.backlog.filter(x=>x.id!==id);sv('backlog');renderBacklog();renderHome()}
window.saveBacklog=()=>{
  const topic=ge('bl-topic').value.trim();if(!topic){alert('Topic name daalo!');return}
  ST.backlog.push({id:uid(),topic,subj:ge('bl-subj').value,prio:ge('bl-prio').value,due:ge('bl-due').value,addedAt:nowStr()});
  sv('backlog');closeModal('bl-modal');ge('bl-topic').value='';ge('bl-due').value='';renderBacklog();renderHome();
}

// ─── FORMULAS ────────────────────────────────
function renderFormulas(){
  const w=ge('formula-list');if(!w)return;
  const items=ST.formulas.filter(f=>f.subj===ST.formSubj);
  if(!items.length){w.innerHTML='<div class="empty"><span class="empty-icon">∑</span><span class="empty-text">Koi formula nahi. Add karo!</span></div>';return}
  w.innerHTML=items.map(f=>`<div class="formula-card"><button class="fdel" onclick="delFormula('${f.id}')">×</button><div class="formula-name">${f.name}</div><div class="formula-eq">${f.eq}</div>${f.addedAt?`<div style="font-size:9px;color:var(--txt3);font-family:var(--fm);margin-top:6px">🕐 ${f.addedAt}</div>`:''}</div>`).join('');
}
window.delFormula=(id)=>{ST.formulas=ST.formulas.filter(x=>x.id!==id);sv('formulas');renderFormulas()}
window.saveFormula=()=>{
  const n=ge('fi-name').value.trim(),eq=ge('fi-eq').value.trim(),s=ge('fi-subj').value;
  if(!n||!eq){alert('Sab fields bhar!');return}
  ST.formulas.push({id:uid(),subj:s,name:n.toUpperCase(),eq,addedAt:nowStr()});
  sv('formulas');closeModal('form-modal');ge('fi-name').value='';ge('fi-eq').value='';renderFormulas();
}

// ─── NOTES ───────────────────────────────────
function renderNotes(){
  const w=ge('notes-list');if(!w)return;
  const items=ST.notes.filter(n=>n.subj===ST.noteSubj);
  if(!items.length){w.innerHTML='<div class="empty"><span class="empty-icon">📋</span><span class="empty-text">Koi note nahi. Add karo!</span></div>';return}
  w.innerHTML=items.map(n=>`<div class="note-card ${n.subj}"><button class="ndel" onclick="delNote('${n.id}')">×</button><div class="note-tag">${{p:'PHYSICS',g:'CHEMISTRY',r:'MATHEMATICS'}[n.subj]}</div><div class="note-title">${n.title}</div><div class="note-body">${n.body}</div>${n.addedAt?`<div style="font-size:9px;color:var(--txt3);font-family:var(--fm);margin-top:6px">🕐 ${n.addedAt}</div>`:''}</div>`).join('');
}
window.delNote=(id)=>{ST.notes=ST.notes.filter(x=>x.id!==id);sv('notes');renderNotes()}
window.saveNote=()=>{
  const title=ge('ni-title').value.trim(),body=ge('ni-body').value.trim(),subj=ge('ni-subj').value;
  if(!title){alert('Title chahiye!');return}
  ST.notes.push({id:uid(),subj,title,body,addedAt:nowStr()});sv('notes');closeModal('note-modal');ge('ni-title').value='';ge('ni-body').value='';renderNotes();
}

// ─── MORE PAGE ───────────────────────────────
function renderMore(){showSubPage(ST.curSubPage==='revision'||ST.curSubPage==='mocks'||ST.curSubPage==='timer'||ST.curSubPage==='analytics'||ST.curSubPage==='backlog'||ST.curSubPage==='formulas'||ST.curSubPage==='notes'?ST.curSubPage:'backlog')}

// ─── REVISION ────────────────────────────────
function renderRevision(){
  const w=ge('rev-list');if(!w)return;
  if(!ST.revision.length){w.innerHTML='<div class="empty"><span class="empty-icon">🔁</span><span class="empty-text">Koi revision topic nahi.</span></div>';return}
  const sCol={Physics:'var(--ap)',Chemistry:'var(--ag)',Mathematics:'var(--ar)'};
  w.innerHTML=ST.revision.map(r=>`<div class="rev-item"><div class="ch-dot" style="background:${sCol[r.subj]||'var(--ap)'}"></div><div class="rev-main"><div class="rev-name">${r.topic}</div><div class="rev-meta">${r.subj} · Every ${r.interval}d</div></div><button class="rev-btn${r.done?' done':''}" onclick="markRevised('${r.id}')">${r.done?'✓ Done':'Revise'}</button><button class="rev-del" onclick="delRevision('${r.id}')">×</button></div>`).join('');
}
window.markRevised=(id)=>{const r=ST.revision.find(x=>x.id===id);if(r){r.done=!r.done;sv('revision');renderRevision()}}
window.delRevision=(id)=>{ST.revision=ST.revision.filter(x=>x.id!==id);sv('revision');renderRevision()}
window.saveRevision=()=>{
  const topic=ge('ri-topic').value.trim();if(!topic){alert('Topic name daalo!');return}
  ST.revision.push({id:uid(),topic,subj:ge('ri-subj').value,interval:parseInt(ge('ri-interval').value)||1,done:false,addedAt:nowStr()});
  sv('revision');closeModal('rev-modal');ge('ri-topic').value='';renderRevision();
}

// ─── MOCKS ───────────────────────────────────
function renderMocks(){
  const list=ge('mock-list');const trend=ge('mock-trend');if(!list)return;
  if(!ST.mocks.length){list.innerHTML='<div class="empty"><span class="empty-icon">🎯</span><span class="empty-text">Koi mock result nahi.</span></div>';if(trend)trend.innerHTML='';return}
  const sorted=[...ST.mocks].sort((a,b)=>b.date.localeCompare(a.date));
  list.innerHTML=sorted.map(m=>{
    const pct=Math.round(m.score/m.total*100);
    const col=pct>=70?'var(--ag)':pct>=55?'var(--ay)':'var(--ar)';
    return`<div class="mock-row"><div class="mock-score" style="color:${col}">${m.score}</div><div class="mock-info"><div class="mock-name">${m.name}</div><div class="mock-meta">${fmtD(m.date)} · /${m.total}${m.rank?' · AIR '+m.rank:''}</div></div><button class="mock-del" onclick="delMock('${m.id}')">×</button></div>`;
  }).join('');
  if(trend&&sorted.length>0){
    trend.innerHTML='<span class="section-label" style="margin-bottom:8px;display:block">SCORE TREND</span>'+
    sorted.slice(0,5).reverse().map(m=>{const pct=Math.round(m.score/m.total*100);const col=pct>=70?'var(--ag)':pct>=55?'var(--ay)':'var(--ar)';return`<div class="pbar-row"><span class="pbar-label">${fmtD(m.date)}</span><div class="pbar-track"><div class="pbar-fill" style="width:${pct}%;background:${col}"></div></div><span class="pbar-val" style="color:${col}">${m.score}</span></div>`;}).join('');
  }
}
window.delMock=(id)=>{ST.mocks=ST.mocks.filter(x=>x.id!==id);sv('mocks');renderMocks();renderAnalytics()}
window.saveMock=()=>{
  const name=ge('mi-name').value.trim(),score=parseInt(ge('mi-score').value),total=parseInt(ge('mi-total').value)||300;
  if(!name||isNaN(score)){alert('Name aur score chahiye!');return}
  ST.mocks.push({id:uid(),name,date:ge('mi-date').value||today(),score,total,rank:ge('mi-rank').value.trim()});
  sv('mocks');closeModal('mock-modal');ge('mi-name').value='';ge('mi-score').value='';ge('mi-rank').value='';ge('mi-date').value='';renderMocks();renderAnalytics();
}

// ─── ANALYTICS ───────────────────────────────
function renderAnalytics(){
  const as=ge('an-streak');if(as)as.textContent=ST.streak.count;
  if(ST.mocks.length){
    const avg=Math.round(ST.mocks.reduce((a,m)=>a+m.score/m.total*100,0)/ST.mocks.length);
    const best=ST.mocks.reduce((a,m)=>m.score>a.score?m:a,ST.mocks[0]);
    const aa=ge('an-avg');if(aa)aa.textContent=avg+'%';
    const ab=ge('an-best');if(ab)ab.textContent=best.score;
  }
  const bars=ge('an-bars');
  if(bars){
    const sc=[{l:'Physics',v:ST.scores.p,c:'var(--ap)'},{l:'Chemistry',v:ST.scores.c,c:'var(--ag)'},{l:'Maths',v:ST.scores.m,c:'var(--ar)'}];
    bars.innerHTML=sc.map(s=>`<div class="pbar-row"><span class="pbar-label">${s.l}</span><div class="pbar-track"><div class="pbar-fill" style="width:${s.v||0}%;background:${s.c}"></div></div><span class="pbar-val" style="color:${s.c}">${s.v!==null?(s.v+'%'):'—'}</span></div>`).join('');
  }
  const ww=ge('an-weak');
  if(ww){
    const allCh=[];
    Object.values(CHAPTERS).forEach(arr=>arr.forEach(ch=>{const p=getChapProgress(ch.id);if(p<50)allCh.push({name:ch.name,prog:p})}));
    allCh.sort((a,b)=>a.prog-b.prog);
    if(!allCh.length){ww.innerHTML='<div style="color:var(--txt3);font-size:12px;font-family:var(--fm);padding:8px 0">Sab chapters theek hain! 🎉</div>';return}
    ww.innerHTML=allCh.slice(0,6).map(c=>`<div class="pbar-row"><span class="pbar-label" style="font-size:9px">${c.name.split(' ')[0]}</span><div class="pbar-track"><div class="pbar-fill" style="width:${c.prog||2}%;background:var(--ar)"></div></div><span class="pbar-val" style="color:var(--ar)">${c.prog}%</span></div>`).join('');
  }
}

// ─── POMODORO TIMER ──────────────────────────
function updateFace(){
  const f=ge('timer-face');if(!f)return;
  f.textContent=String(Math.floor(ST.timerSecs/60)).padStart(2,'0')+':'+String(ST.timerSecs%60).padStart(2,'0');
  f.className='timer-face'+(ST.timerSecs<300?' warn':'');
}
window.startTimer=()=>{if(ST.timerRunning)return;ST.timerRunning=true;ST.timerInt=setInterval(()=>{if(ST.timerSecs<=0){clearInterval(ST.timerInt);ST.timerRunning=false;ST.timerSecs=25*60;updateFace();alert('⏰ Pomodoro complete! 5 min break le!');return}ST.timerSecs--;updateFace();},1000)}
window.pauseTimer=()=>{clearInterval(ST.timerInt);ST.timerRunning=false}
window.resetTimer=(m)=>{pauseTimer();ST.timerSecs=(m||25)*60;updateFace()}

// ─── FAB ─────────────────────────────────────
window.fabAct=()=>{
  const p=ST.curPage;
  if(p==='more'){
    const sp=ST.curSubPage;
    if(sp==='backlog')openModal('bl-modal');
    else if(sp==='formulas')openModal('form-modal');
    else if(sp==='notes')openModal('note-modal');
    else if(sp==='revision')openModal('rev-modal');
    else if(sp==='mocks')openModal('mock-modal');
  }
}

// ─── MODALS ───────────────────────────────────
function openModal(id){ge(id).classList.add('on')}
function closeModal(id){ge(id).classList.remove('on')}
function overlayClose(e,id){if(e.target===ge(id))closeModal(id)}
window.openModal=openModal;window.closeModal=closeModal;window.overlayClose=overlayClose;

// ══════════════════════════════════════════════
//   TEST ENGINE FUNCTIONS
// ══════════════════════════════════════════════

// ─── TEST HOME ────────────────────────────────
function renderTestHome(){
  ge('ths-tests').textContent=attempts.length;
  ge('ths-qs').textContent=bank.length;
  ge('ths-badge').textContent=attempts.length+' tests';
  if(attempts.length){
    const scores=attempts.map(a=>a.score);
    const best=Math.max(...scores);
    const avg=Math.round(attempts.reduce((s,a)=>s+(a.correct/(a.total||1)*100),0)/attempts.length);
    ge('ths-best').textContent=best;
    ge('ths-avg').textContent=avg+'%';
  }
  const ra=ge('ths-recent');
  if(!attempts.length){ra.innerHTML='<div class="empty"><span class="empty-icon">🎯</span><span class="empty-text">Abhi tak koi test nahi diya.<br>START TEST dabao!</span></div>';return}
  const recent=[...attempts].reverse().slice(0,4);
  ra.innerHTML=recent.map(a=>{
    const pct=Math.round(a.correct/(a.total||1)*100);
    const col=pct>=70?'var(--ag)':pct>=50?'var(--ay)':'var(--ar)';
    return`<div class="attempt-item" onclick="viewAttempt('${a.id}')">
      <div class="att-score" style="color:${col}">${a.score}</div>
      <div class="att-info"><div class="att-name">${a.testName}</div><div class="att-meta">${a.date} · ${a.correct}✓ ${a.wrong}✗ · ${pct}%</div></div>
      <div style="font-size:18px;color:var(--txt3)">›</div>
    </div>`;
  }).join('');
}

// ─── SHOW TEST SETUP ──────────────────────────
// ─── TEST SETUP MODE ─────────────────────────
let setupJsonQ = [];
let setupJsonTimerMins = 30;
let activeTestMode = 'json'; // 'json' | 'bank'

function switchTestMode(m) {
  activeTestMode = m;
  ge('tmode-json-body').style.display = m === 'json' ? 'block' : 'none';
  ge('tmode-bank-body').style.display = m === 'bank' ? 'block' : 'none';
  ge('tmode-json').style.borderColor = m === 'json' ? 'var(--ap)' : 'var(--b2)';
  ge('tmode-json').style.color       = m === 'json' ? 'var(--ap)' : 'var(--txt)';
  ge('tmode-bank').style.borderColor = m === 'bank' ? 'var(--ap)' : 'var(--b2)';
  ge('tmode-bank').style.color       = m === 'bank' ? 'var(--ap)' : 'var(--txt)';
}
window.switchTestMode = switchTestMode;

window.clearSetupJson = () => {
  ge('setup-json-inp').value = '';
  setupJsonQ = [];
  ge('setup-json-status').style.display = 'none';
  ge('setup-json-count').textContent = '';
  const btn = ge('json-start-btn');
  btn.style.opacity = '.4'; btn.style.pointerEvents = 'none';
};

window.setupJsonPreview = () => {
  const raw = ge('setup-json-inp').value.trim();
  const statusEl = ge('setup-json-status');
  const btn = ge('json-start-btn');
  const countEl = ge('setup-json-count');
  setupJsonQ = [];
  btn.style.opacity = '.4'; btn.style.pointerEvents = 'none';
  countEl.textContent = '';
  if (!raw) { statusEl.style.display = 'none'; return; }
  const subj = ge('jt-subj')?.value || 'p';
  const chapter = ge('jt-chapter')?.value.trim() || 'General';
  try {
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr)) throw new Error('JSON ek array hona chahiye [...]');
    const valid = [], errors = [];
    arr.forEach((q, i) => {
      const n = i + 1, text = q.q || q.text;
      if (!text) { errors.push(`Q${n}: "q" missing`); return; }
      let opts, correct;
      if (q.options && typeof q.options === 'object' && !Array.isArray(q.options)) {
        opts = [q.options['1'], q.options['2'], q.options['3'], q.options['4']];
        correct = parseInt(q.answer || q.ans) - 1;
      } else {
        opts = [q.a||q.optA, q.b||q.optB, q.c||q.optC, q.d||q.optD];
        correct = q.ans !== undefined ? parseInt(q.ans) : (q.correct !== undefined ? parseInt(q.correct) : -1);
      }
      if (!opts[0]||!opts[1]||!opts[2]||!opts[3]) { errors.push(`Q${n}: options missing`); return; }
      if (correct < 0 || correct > 3) { errors.push(`Q${n}: answer 1-4 hona chahiye`); return; }
      valid.push({ id: uid(), subj, chapter, text: text.trim(), options: opts, correct,
        explanation: (q.exp || q.explanation || '').trim() });
    });
    if (errors.length) {
      statusEl.innerHTML = '⚠ ' + errors.slice(0,3).join(' | ') + (errors.length > 3 ? ` +${errors.length-3} aur` : '');
      statusEl.style.cssText = 'display:block;background:rgba(255,79,109,.1);border:1px solid rgba(255,79,109,.3);border-radius:8px;padding:9px 12px;margin-bottom:12px;font-size:11px;font-family:var(--fm);color:var(--ar)';
    }
    if (valid.length) {
      setupJsonQ = valid;
      if (!errors.length) {
        statusEl.innerHTML = `✅ ${valid.length} questions ready — ${chapter}`;
        statusEl.style.cssText = 'display:block;background:rgba(0,196,140,.1);border:1px solid rgba(0,196,140,.3);border-radius:8px;padding:9px 12px;margin-bottom:12px;font-size:12px;font-family:var(--fm);color:var(--ag)';
      }
      btn.style.opacity = '1'; btn.style.pointerEvents = 'auto';
      countEl.textContent = valid.length + ' questions • ' + setupJsonTimerMins + ' min';
    } else { statusEl.style.display = 'block'; }
  } catch(err) {
    statusEl.innerHTML = '❌ JSON error: ' + err.message;
    statusEl.style.cssText = 'display:block;background:rgba(255,79,109,.1);border:1px solid rgba(255,79,109,.3);border-radius:8px;padding:9px 12px;margin-bottom:12px;font-size:11px;font-family:var(--fm);color:var(--ar)';
  }
};

function selectJTimer(m) {
  setupJsonTimerMins = m;
  document.querySelectorAll('[id^="jtopt-"]').forEach(el => el.classList.remove('on'));
  const el = ge('jtopt-' + m); if (el) el.classList.add('on');
  if (setupJsonQ.length) ge('setup-json-count').textContent = setupJsonQ.length + ' questions • ' + m + ' min';
}
window.selectJTimer = selectJTimer;

window.setJCustomTimer = () => {
  const v = parseInt(ge('jcustom-timer-inp').value);
  if (!v || v < 1) return;
  setupJsonTimerMins = v;
  document.querySelectorAll('[id^="jtopt-"]').forEach(el => el.classList.remove('on'));
  if (setupJsonQ.length) ge('setup-json-count').textContent = setupJsonQ.length + ' questions • ' + v + ' min';
};

window.startJsonTest = () => {
  if (!setupJsonQ.length) { alert('Pehle valid JSON paste karo!'); return; }
  const qs = [...setupJsonQ].sort(() => Math.random() - .5);
  T.qs = qs; T.idx = 0; T.answers = {}; T.marked = {};
  T.timerSecs = setupJsonTimerMins * 60; T.startTime = Date.now();
  T.subj = qs[0]?.subj || 'p';
  T.chapters = [...new Set(qs.map(q => q.chapter))];
  T.timerMins = setupJsonTimerMins;
  T.testName = T.chapters.slice(0,2).join(', ') + (T.chapters.length > 2 ? '...' : '');
  ge('main-header').style.display = 'none';
  document.querySelector('.bnav').style.display = 'none';
  document.body.style.paddingBottom = '0';
  ge('page-testactive').classList.add('on');
  renderTestQ(); startTestTimer();
};

function showTestSetup(){
  testSetup={subj:null,chapters:[],timerMins:30};
  bankTestSetup={subj:null,chapters:[],timerMins:30};
  activeTestMode='json';
  switchTestMode('json');
  // reset JSON mode
  ge('setup-json-inp').value='';
  setupJsonQ=[];
  ge('setup-json-status').style.display='none';
  ge('setup-json-count').textContent='';
  const jsb=ge('json-start-btn');jsb.style.opacity='.4';jsb.style.pointerEvents='none';
  selectJTimer(30);
  // reset bank mode UI
  document.querySelectorAll('.subj-card').forEach(c=>c.className='subj-card');
  ge('scard-all').className='full-mock-card';
  const bca=ge('bank-chapter-select');if(bca)bca.innerHTML='<div style="font-size:12px;color:var(--txt3);font-family:var(--fm)">← Pehle subject select karo</div>';
  const bsp=ge('bstep2-pill');if(bsp)bsp.style.opacity='.4';
  const bsb=ge('bank-start-btn');if(bsb){bsb.style.opacity='.4';bsb.style.pointerEvents='none';}
  const bsc=ge('bank-start-count');if(bsc)bsc.textContent='';
  // show question counts per subject on cards
  const pC=ge('scard-p-count'),gC=ge('scard-g-count'),rC=ge('scard-r-count');
  if(pC)pC.textContent=bank.filter(q=>q.subj==='p').length+' Qs';
  if(gC)gC.textContent=bank.filter(q=>q.subj==='g').length+' Qs';
  if(rC)rC.textContent=bank.filter(q=>q.subj==='r').length+' Qs';
  const allC=ge('scard-all-count');if(allC)allC.textContent='Teeno subjects — '+bank.length+' total questions';
  selectTimer(30);
  showSubPage2('config');
}
window.showTestSetup=showTestSetup;

function selectSubj(s){
  testSetup.subj=s;testSetup.chapters=[];
  document.querySelectorAll('.subj-card').forEach(c=>c.className='subj-card');
  ge('scard-all').className='full-mock-card';
  if(s==='all')ge('scard-all').className='full-mock-card sel';
  else{const map={p:'sel-p',g:'sel-g',r:'sel-r'};ge('scard-'+s).className='subj-card '+map[s];}
  ge('step2-pill').style.opacity='1';
  if(s==='all'){ge('chapter-select-area').innerHTML='<div style="font-size:12px;color:var(--ag);font-family:var(--fm)">✓ Teeno subjects ke saare chapters included</div>';return}
  const cl=s==='p'?'p':s==='g'?'g':'r';
  const chips=CH_NAMES[s].map(ch=>`<div class="ch-chip" id="chip-${ch.replace(/\s/g,'_')}" onclick="toggleChapter('${ch.replace(/'/g,"\\'")}','${cl}',this)">${ch}</div>`).join('');
  ge('chapter-select-area').innerHTML=`<div style="font-size:11px;color:var(--txt3);font-family:var(--fm);margin-bottom:6px">Chapters select karo (skip karo = saare)</div><div class="chapter-chips">${chips}</div><button class="btn btn-o btn-xs" style="margin-top:10px" onclick="selectAllChapters('${s}')">Select All</button>`;
}
window.selectSubj=selectSubj;

function toggleChapter(ch,cl,el){
  if(testSetup.chapters.includes(ch)){testSetup.chapters=testSetup.chapters.filter(c=>c!==ch);el.classList.remove('on','p','g','r');}
  else{testSetup.chapters.push(ch);el.classList.add('on',cl);}
}
window.toggleChapter=toggleChapter;

function selectAllChapters(s){
  testSetup.chapters=[...CH_NAMES[s]];
  const cl=s==='p'?'p':s==='g'?'g':'r';
  document.querySelectorAll('.ch-chip').forEach(c=>{c.className='ch-chip on '+cl});
}
window.selectAllChapters=selectAllChapters;

function selectTimer(m){
  testSetup.timerMins=m;
  document.querySelectorAll('.timer-opt').forEach(t=>t.classList.remove('on'));
  const el=ge('topt-'+m);if(el)el.classList.add('on');
}
window.selectTimer=selectTimer;

function setCustomTimer(){
  const v=parseInt(ge('custom-timer-inp').value);if(!v||v<1)return;
  testSetup.timerMins=v;document.querySelectorAll('.timer-opt').forEach(t=>t.classList.remove('on'));
}
window.setCustomTimer=setCustomTimer;

// ─── START TEST ───────────────────────────────
function startTest(){
  if(!testSetup.subj){alert('Subject select karo!');return}
  let pool=[];
  if(testSetup.subj==='all'){pool=[...bank];}
  else{
    const chapFilter=testSetup.chapters.length>0?testSetup.chapters:CH_NAMES[testSetup.subj];
    pool=bank.filter(q=>q.subj===testSetup.subj && chapFilter.includes(q.chapter));
  }
  if(!pool.length){
    if(confirm('Is chapter mein koi question nahi hai!\n\nQuestion Bank mein add karo?')){showSubPage2('bank');setTimeout(()=>openAddQ(),300)}
    return;
  }
  pool=pool.sort(()=>Math.random()-.5);
  T.qs=pool;T.idx=0;T.answers={};T.marked={};
  T.timerSecs=testSetup.timerMins*60;T.startTime=Date.now();
  T.subj=testSetup.subj;T.chapters=[...testSetup.chapters];T.timerMins=testSetup.timerMins;
  const chapStr=testSetup.subj==='all'?'Full Mock':(testSetup.chapters.length?testSetup.chapters.slice(0,2).join(', ')+(testSetup.chapters.length>2?'...':''):'All Chapters');
  T.testName=SUBJ_NAMES[testSetup.subj]+' — '+chapStr;
  // show full screen test
  ge('main-header').style.display='none';
  document.querySelector('.bnav').style.display='none';
  document.body.style.paddingBottom='0';
  ge('page-testactive').classList.add('on');
  renderTestQ();startTestTimer();
}
window.startTest=startTest;

function exitTestScreen(){
  ge('main-header').style.display='';
  document.querySelector('.bnav').style.display='';
  document.body.style.paddingBottom='';
  ge('page-testactive').classList.remove('on');
}

// ─── TEST TIMER ───────────────────────────────
function startTestTimer(){
  clearInterval(T.timerInt);
  updateTimerDisplay();
  T.timerInt=setInterval(()=>{T.timerSecs--;updateTimerDisplay();if(T.timerSecs<=0){clearInterval(T.timerInt);submitTest();}},1000);
}
function updateTimerDisplay(){
  const el=ge('test-timer');if(!el)return;
  const m=Math.floor(T.timerSecs/60),s=T.timerSecs%60;
  el.textContent=String(m).padStart(2,'0')+':'+String(s).padStart(2,'0');
  el.className='test-timer-display'+(T.timerSecs<=300?' danger':T.timerSecs<=600?' warn':'');
}

// ─── RENDER QUESTION ─────────────────────────
function renderTestQ(){
  const q=T.qs[T.idx];const area=ge('test-q-area');
  const answered=Object.keys(T.answers).length;
  const cl=SUBJ_COLORS[q.subj]||'var(--ap)';
  ge('test-prog-label').textContent='Q '+(T.idx+1)+' of '+T.qs.length;
  ge('test-prog-fill').style.width=(answered/T.qs.length*100)+'%';
  renderNavDots();
  const LABS=['A','B','C','D'];const sel=T.answers[T.idx];
  area.innerHTML=`
    <div class="test-q-num">QUESTION ${T.idx+1} OF ${T.qs.length}</div>
    <div class="test-q-badges">
      <span class="badge" style="background:rgba(79,138,255,.1);color:${cl}">${SUBJ_NAMES[q.subj]||q.subj}</span>
      <span class="badge y">${q.chapter}</span>
    </div>
    <div class="test-q-text">${q.text}</div>
    ${q.options.map((o,i)=>`<button class="test-opt${sel===i?' selected':''}" onclick="selectAnswer(${i})"><div class="opt-label">${LABS[i]}</div><div class="opt-text">${o}</div></button>`).join('')}
    <div style="margin-top:12px;display:flex;gap:8px">
      <button class="btn btn-y btn-xs" onclick="toggleMark(${T.idx})" style="${T.marked[T.idx]?'border-color:var(--ay);color:var(--ay)':''}">${T.marked[T.idx]?'🔖 Marked':'🔖 Mark for Review'}</button>
      <button class="btn btn-o btn-xs" onclick="clearAnswer(${T.idx})">✕ Clear</button>
    </div>`;
  area.scrollTop=0;
  ge('test-next-btn').textContent=T.idx===T.qs.length-1?'Finish ✓':'Next →';
}

function selectAnswer(i){T.answers[T.idx]=i;renderTestQ()}
function clearAnswer(idx){delete T.answers[idx];renderTestQ()}
function toggleMark(idx){T.marked[idx]=!T.marked[idx];renderTestQ()}
window.selectAnswer=selectAnswer;window.clearAnswer=clearAnswer;window.toggleMark=toggleMark;

function nextQ(){if(T.idx<T.qs.length-1){T.idx++;renderTestQ();}else confirmSubmit()}
window.nextQ=nextQ;

function renderNavDots(){
  const wrap=ge('test-nav-dots');if(!wrap)return;
  wrap.innerHTML=T.qs.map((_,i)=>{
    let cls='q-dot';
    if(i===T.idx)cls+=' current';
    else if(T.marked[i])cls+=' marked';
    else if(T.answers[i]!==undefined)cls+=' answered';
    return`<div class="${cls}" onclick="jumpToQ(${i})">${i+1}</div>`;
  }).join('');
  const cur=wrap.children[T.idx];if(cur)cur.scrollIntoView({behavior:'smooth',inline:'center',block:'nearest'});
}
function jumpToQ(i){T.idx=i;renderTestQ()}
window.jumpToQ=jumpToQ;

// ─── SUBMIT TEST ──────────────────────────────
function confirmSubmit(){
  const un=T.qs.length-Object.keys(T.answers).length;
  ge('confirm-msg').textContent=un>0?`${un} questions unattempted hain. Pakka submit karna hai?`:'Sab questions attempt kiye. Submit karo?';
  ge('confirm-overlay').classList.add('on');
}
function closeConfirm(){ge('confirm-overlay').classList.remove('on')}
window.closeConfirm=closeConfirm;

function submitTest(){
  closeConfirm();clearInterval(T.timerInt);
  const timeTaken=Math.round((Date.now()-T.startTime)/1000);
  let score=0,correct=0,wrong=0,skip=0;
  const review=T.qs.map((q,i)=>{
    const ans=T.answers[i];let result='skip';
    if(ans===undefined)skip++;
    else if(ans===q.correct){score+=4;correct++;result='correct';}
    else{score-=1;wrong++;result='wrong';}
    return{q,ans,result,idx:i};
  });
  const attempt={id:uid(),testName:T.testName,date:nowStr(),subj:T.subj,chapters:T.chapters,score,correct,wrong,skip,total:T.qs.length,timerMins:T.timerMins,timeTaken,review,maxScore:T.qs.length*4};
  attempts.push(attempt);LS.s('jte_attempts',attempts);
  exitTestScreen();
  showTestResult(attempt);
}
window.submitTest=submitTest;

// ─── SHOW RESULT ─────────────────────────────
function showTestResult(a){
  ge('page-testresult').classList.add('on');
  ge('result-title-hdr').textContent='Test Result';
  ge('result-sub-hdr').textContent=a.testName;
  const pct=Math.round(a.correct/a.total*100);
  const grade=pct>=90?'🏆 Excellent!':pct>=75?'⭐ Very Good':pct>=60?'👍 Good':pct>=45?'📚 Keep Practicing':'💪 Needs More Work';
  const stars=pct>=90?'⭐⭐⭐':pct>=70?'⭐⭐':pct>=50?'⭐':'';
  const timeFmt=a.timeTaken>60?Math.floor(a.timeTaken/60)+'m '+a.timeTaken%60+'s':a.timeTaken+'s';
  let html=`
  <div class="result-hero">
    <div class="result-stars">${stars}</div>
    <div class="result-score-big"><span class="${a.score>=0?'pos':'neg'}">${a.score}</span></div>
    <div class="result-out-of">out of ${a.maxScore} marks</div>
    <div class="result-grade" style="margin-top:10px">${grade}</div>
    <div style="font-size:12px;color:var(--txt3);font-family:var(--fm);margin-top:4px">${a.date} · ${timeFmt}</div>
  </div>
  <div style="padding:16px">
  <div class="result-stat-grid">
    <div class="rst"><span class="rst-lbl">CORRECT</span><div class="rst-val" style="color:var(--ag)">${a.correct}</div></div>
    <div class="rst"><span class="rst-lbl">WRONG</span><div class="rst-val" style="color:var(--ar)">${a.wrong}</div></div>
    <div class="rst"><span class="rst-lbl">SKIPPED</span><div class="rst-val" style="color:var(--ay)">${a.skip}</div></div>
    <div class="rst"><span class="rst-lbl">ACCURACY</span><div class="rst-val">${pct}%</div></div>
  </div>
  <div style="display:flex;gap:8px;margin-bottom:16px">
    <button class="btn btn-v btn-full" onclick="reattemptTest('${a.id}')">🔁 Reattempt</button>
  </div>
  <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px"><span class="section-label" style="margin:0">📊 ANSWER REVIEW</span></div>`;
  a.review.forEach((r,i)=>{
    const LABS=['A','B','C','D'];
    const userAns=r.ans!==undefined?LABS[r.ans]:'—';
    const corrAns=LABS[r.q.correct];
    html+=`<div class="ans-review-item ${r.result}">
      <div class="ari-top">
        <span class="badge ${r.result==='correct'?'g':r.result==='wrong'?'r':'y'}">${r.result==='correct'?'✓ +4':r.result==='wrong'?'✗ −1':'— 0'}</span>
        <span class="badge y">${r.q.chapter}</span>
        <span style="font-size:10px;font-family:var(--fm);color:var(--txt3)">Q${i+1}</span>
      </div>
      <div class="ari-q">${r.q.text}</div>
      <div class="ari-ans">
        <span style="color:var(--txt3)">Your: <span style="color:${r.result==='correct'?'var(--ag)':r.result==='wrong'?'var(--ar)':'var(--ay)'}">${userAns}</span></span>
        <span style="color:var(--txt3)">Correct: <span style="color:var(--ag)">${corrAns}) ${r.q.options[r.q.correct]}</span></span>
      </div>
      ${r.q.explanation?`<div style="margin-top:8px;font-size:11px;color:var(--txt2);background:var(--s3);padding:8px 10px;border-radius:8px;line-height:1.6">💡 ${r.q.explanation}</div>`:''}
    </div>`;
  });
  html+='</div>';
  ge('result-body').innerHTML=html;
  ge('result-body').scrollTop=0;
}

function closeTestResult(){
  ge('page-testresult').classList.remove('on');
  showPage('testsetup');
}
window.closeTestResult=closeTestResult;

function reattemptTest(id){
  const a=attempts.find(x=>x.id===id);if(!a)return;
  T.qs=a.review.map(r=>r.q).sort(()=>Math.random()-.5);
  T.idx=0;T.answers={};T.marked={};
  T.timerSecs=a.timerMins*60;T.startTime=Date.now();
  T.subj=a.subj;T.chapters=a.chapters;T.timerMins=a.timerMins;T.testName=a.testName+' (Reattempt)';
  ge('page-testresult').classList.remove('on');
  ge('main-header').style.display='none';
  document.querySelector('.bnav').style.display='none';
  document.body.style.paddingBottom='0';
  ge('page-testactive').classList.add('on');
  renderTestQ();startTestTimer();
}
window.reattemptTest=reattemptTest;

function viewAttempt(id){const a=attempts.find(x=>x.id===id);if(!a)return;showTestResult(a)}
window.viewAttempt=viewAttempt;

function deleteAttempt(id){
  if(!confirm('Ye attempt delete karo?'))return;
  attempts=attempts.filter(x=>x.id!==id);LS.s('jte_attempts',attempts);renderHistory();renderTestHome();
}
window.deleteAttempt=deleteAttempt;

// ─── HISTORY ─────────────────────────────────
function renderHistory(){
  const body=ge('history-list');if(!body)return;
  if(!attempts.length){body.innerHTML='<div class="empty"><span class="empty-icon">📊</span><span class="empty-text">Abhi tak koi test nahi diya.</span></div>';return}
  const sorted=[...attempts].reverse();
  body.innerHTML=sorted.map(a=>{
    const pct=Math.round(a.correct/a.total*100);
    const col=pct>=70?'var(--ag)':pct>=50?'var(--ay)':'var(--ar)';
    return`<div class="attempt-item" onclick="viewAttempt('${a.id}')">
      <div class="att-score" style="color:${col}">${a.score}</div>
      <div class="att-info"><div class="att-name">${a.testName}</div><div class="att-meta">${a.date} · ${a.correct}✓ ${a.wrong}✗ · ${pct}%</div></div>
      <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px">
        <button class="btn btn-p btn-xs" onclick="event.stopPropagation();reattemptTest('${a.id}')">🔁</button>
        <button class="btn btn-r btn-xs" onclick="event.stopPropagation();deleteAttempt('${a.id}')">🗑</button>
      </div>
    </div>`;
  }).join('');
}

// ─── QUESTION BANK ────────────────────────────
// ─── QUESTION BANK ────────────────────────────
let bankFilter = 'all';
let bankChapterFilter = 'all'; // chapter name or 'all'

function renderBank(){
  const list = ge('bank-list');
  const statsEl = ge('bank-stats');
  const chRow = ge('bfilt-chapter-row');
  if(!list) return;

  // Filter by subject
  let bySubj = bankFilter === 'all' ? bank : bank.filter(q => q.subj === bankFilter);

  // Build chapter chips for selected subject
  if(chRow){
    if(bankFilter === 'all'){
      chRow.innerHTML = '';
      bankChapterFilter = 'all';
    } else {
      const chapters = [...new Set(bySubj.map(q => q.chapter))].sort();
      if(chapters.length > 1){
        chRow.innerHTML = `<div class="ch-chip on ${bankFilter}" id="bcfilt-all" onclick="setBankChapterFilter('all',this)">All Chapters</div>` +
          chapters.map(ch => `<div class="ch-chip" id="bcfilt-${ch.replace(/\s/g,'_')}" onclick="setBankChapterFilter('${ch.replace(/'/g,"\\'")}',this)">${ch}</div>`).join('');
      } else { chRow.innerHTML = ''; bankChapterFilter = 'all'; }
    }
  }

  // Filter by chapter
  let items = bankChapterFilter === 'all' ? bySubj : bySubj.filter(q => q.chapter === bankChapterFilter);

  if(statsEl) statsEl.textContent = `${items.length} questions ${bankFilter!=='all'?'· '+{p:'Physics',g:'Chemistry',r:'Maths'}[bankFilter]:'total'}${bankChapterFilter!=='all'?' · '+bankChapterFilter:''}`;

  if(!items.length){
    list.innerHTML = '<div class="empty"><span class="empty-icon">📚</span><span class="empty-text">Koi question nahi hai.<br>+ Add se question add karo.</span></div>';
    return;
  }

  const LABS = ['A','B','C','D'];
  const SNAMES = {p:'Physics',g:'Chemistry',r:'Maths'};

  // Group by chapter
  const grouped = {};
  items.forEach(q => { if(!grouped[q.chapter]) grouped[q.chapter] = []; grouped[q.chapter].push(q); });

  list.innerHTML = Object.entries(grouped).map(([ch, qs]) => `
    <div style="margin-bottom:16px">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
        <div style="display:flex;align-items:center;gap:8px">
          <span class="badge ${qs[0].subj}">${SNAMES[qs[0].subj]}</span>
          <span style="font-size:13px;font-weight:700;color:var(--txt2)">${ch}</span>
        </div>
        <span style="font-size:10px;font-family:var(--fm);color:var(--txt3)">${qs.length} Qs</span>
      </div>
      ${qs.map(q => `
        <div class="qbank-item ${q.subj}" style="position:relative;padding-right:40px">
          <div class="qi-top"><span class="badge y" style="font-size:9px">${q.chapter}</span></div>
          <div class="qi-text">${q.text.length>130?q.text.slice(0,130)+'...':q.text}</div>
          <div class="qi-ans">✅ ${LABS[q.correct]}) ${q.options[q.correct]}</div>
          ${q.addedAt?`<div style="font-size:9px;color:var(--txt3);font-family:var(--fm);margin-top:4px">🕐 ${q.addedAt}</div>`:''}
          <button onclick="deleteQ('${q.id}')" style="position:absolute;top:10px;right:10px;background:rgba(255,79,109,.15);border:1px solid rgba(255,79,109,.3);color:var(--ar);width:28px;height:28px;border-radius:8px;font-size:15px;display:flex;align-items:center;justify-content:center;cursor:pointer">🗑</button>
        </div>`).join('')}
    </div>`).join('');
}

function setBankFilter(f, el){
  bankFilter = f;
  bankChapterFilter = 'all';
  document.querySelectorAll('[id^="bfilt-"]').forEach(c => c.className = 'ch-chip');
  el.className = 'ch-chip on ' + (f === 'all' ? 'p' : f);
  renderBank();
}
window.setBankFilter = setBankFilter;

function setBankChapterFilter(ch, el){
  bankChapterFilter = ch;
  document.querySelectorAll('[id^="bcfilt-"]').forEach(c => { c.className = 'ch-chip'; });
  el.className = 'ch-chip on ' + bankFilter;
  renderBank();
}
window.setBankChapterFilter = setBankChapterFilter;

function deleteQ(id){
  if(!confirm('Question delete karo?')) return;
  bank = bank.filter(q => q.id !== id);
  LS.s('jte_bank', bank);
  renderBank();
  renderTestHome();
}
window.deleteQ = deleteQ;

// ─── BANK SE TEST ────────────────────────────
let bankTestSetup = { subj: null, chapters: [], timerMins: 30 };

function selectBankSubj(s){
  bankTestSetup.subj = s;
  bankTestSetup.chapters = [];
  document.querySelectorAll('.subj-card').forEach(c => c.className = 'subj-card');
  ge('scard-all').className = 'full-mock-card';
  if(s === 'all') {
    ge('scard-all').className = 'full-mock-card sel';
  } else {
    const map = {p:'sel-p', g:'sel-g', r:'sel-r'};
    ge('scard-'+s).className = 'subj-card ' + map[s];
  }

  const pill = ge('bstep2-pill');
  const area = ge('bank-chapter-select');
  const btn  = ge('bank-start-btn');
  const countEl = ge('bank-start-count');

  if(s === 'all'){
    if(pill) pill.style.opacity = '1';
    const total = bank.length;
    if(area) area.innerHTML = `<div style="font-size:12px;color:var(--ag);font-family:var(--fm);padding:4px 0">✓ Teeno subjects ke saare ${total} questions included</div>`;
    const n = bank.length;
    if(n){ btn.style.opacity='1'; btn.style.pointerEvents='auto'; countEl.textContent = n+' questions available'; }
    else { btn.style.opacity='.4'; btn.style.pointerEvents='none'; countEl.textContent = 'Bank mein koi question nahi!'; }
    return;
  }

  // Get chapters in bank for this subject
  const subjQs = bank.filter(q => q.subj === s);
  const chapters = [...new Set(subjQs.map(q => q.chapter))].sort();
  if(pill) pill.style.opacity = '1';

  if(!chapters.length){
    if(area) area.innerHTML = `<div style="font-size:12px;color:var(--ar);font-family:var(--fm);">❌ Is subject ke koi questions bank mein nahi hain. Pehle add karo.</div>`;
    btn.style.opacity='.4'; btn.style.pointerEvents='none'; countEl.textContent='';
    return;
  }

  const cl = s;
  if(area) area.innerHTML = `
    <div style="font-size:11px;color:var(--txt3);font-family:var(--fm);margin-bottom:8px">Chapters choose karo (skip = saare ${subjQs.length} questions)</div>
    <div style="display:flex;flex-wrap:wrap;gap:7px;margin-bottom:10px">
      ${chapters.map(ch => {
        const cnt = subjQs.filter(q=>q.chapter===ch).length;
        return `<div class="ch-chip" id="btest-chip-${ch.replace(/[\s\/]/g,'_')}" onclick="toggleBankChapter('${ch.replace(/'/g,"\\'")}','${cl}',this)">${ch} <span style="font-size:9px;opacity:.7">(${cnt})</span></div>`;
      }).join('')}
    </div>
    <button class="btn btn-o btn-xs" onclick="selectAllBankChapters('${s}')" style="font-size:11px">✓ Sab Select</button>`;

  // update count
  updateBankTestCount();
}
window.selectBankSubj = selectBankSubj;

function toggleBankChapter(ch, cl, el){
  if(bankTestSetup.chapters.includes(ch)){
    bankTestSetup.chapters = bankTestSetup.chapters.filter(c => c !== ch);
    el.className = 'ch-chip';
  } else {
    bankTestSetup.chapters.push(ch);
    el.className = 'ch-chip on ' + cl;
  }
  updateBankTestCount();
}
window.toggleBankChapter = toggleBankChapter;

function selectAllBankChapters(s){
  const subjQs = bank.filter(q => q.subj === s);
  const chapters = [...new Set(subjQs.map(q => q.chapter))];
  bankTestSetup.chapters = [...chapters];
  document.querySelectorAll('[id^="btest-chip-"]').forEach(el => { el.className = 'ch-chip on ' + s; });
  updateBankTestCount();
}
window.selectAllBankChapters = selectAllBankChapters;

function updateBankTestCount(){
  const btn = ge('bank-start-btn');
  const countEl = ge('bank-start-count');
  if(!bankTestSetup.subj || bankTestSetup.subj === 'all'){
    const n = bank.length;
    if(n){ btn.style.opacity='1'; btn.style.pointerEvents='auto'; countEl.textContent=n+' questions'; }
    else { btn.style.opacity='.4'; btn.style.pointerEvents='none'; countEl.textContent=''; }
    return;
  }
  const chaps = bankTestSetup.chapters.length
    ? bankTestSetup.chapters
    : [...new Set(bank.filter(q=>q.subj===bankTestSetup.subj).map(q=>q.chapter))];
  const n = bank.filter(q => q.subj===bankTestSetup.subj && chaps.includes(q.chapter)).length;
  if(n){ btn.style.opacity='1'; btn.style.pointerEvents='auto'; countEl.textContent=n+' questions available'; }
  else { btn.style.opacity='.4'; btn.style.pointerEvents='none'; countEl.textContent='Ye chapters mein koi question nahi'; }
}

window.startBankTest = () => {
  if(!bankTestSetup.subj){ alert('Pehle subject choose karo!'); return; }
  let pool;
  if(bankTestSetup.subj === 'all'){
    pool = [...bank];
  } else {
    const chaps = bankTestSetup.chapters.length
      ? bankTestSetup.chapters
      : [...new Set(bank.filter(q=>q.subj===bankTestSetup.subj).map(q=>q.chapter))];
    pool = bank.filter(q => q.subj===bankTestSetup.subj && chaps.includes(q.chapter));
  }
  if(!pool.length){ alert('Koi question nahi mila!'); return; }
  pool = pool.sort(()=>Math.random()-.5);
  T.qs=pool; T.idx=0; T.answers={}; T.marked={};
  T.timerSecs=testSetup.timerMins*60; T.startTime=Date.now();
  T.subj=bankTestSetup.subj; T.chapters=[...new Set(pool.map(q=>q.chapter))];
  T.timerMins=testSetup.timerMins;
  T.testName=({p:'Physics',g:'Chemistry',r:'Maths',all:'Full Mock'}[bankTestSetup.subj])
    +' — '+(bankTestSetup.chapters.length ? bankTestSetup.chapters.slice(0,2).join(', ')+(bankTestSetup.chapters.length>2?'...':'') : 'All Chapters');
  ge('main-header').style.display='none';
  document.querySelector('.bnav').style.display='none';
  document.body.style.paddingBottom='0';
  ge('page-testactive').classList.add('on');
  renderTestQ(); startTestTimer();
};


function openAddQ(){bulkQueue=[];updateBulkUI();switchAddTab('manual');openModal('addq-modal')}
window.openAddQ=openAddQ;

function switchAddTab(t){
  ge('tab-manual-body').style.display=t==='manual'?'block':'none';
  ge('tab-bulk-body').style.display=t==='bulk'?'block':'none';
  ge('tab-ai-body').style.display=t==='ai'?'block':'none';
  ['manual','bulk','ai'].forEach(id=>{
    const el=ge('tab-'+id);if(!el)return;
    el.style.borderColor=t===id?'var(--ap)':'var(--b2)';
    el.style.color=t===id?'var(--ap)':'var(--txt)';
  });
}
window.switchAddTab=switchAddTab;

// ─── BULK QUEUE ───────────────────────────────
let bulkQueue=[];

function updateBulkUI(){
  const n=bulkQueue.length;
  ge('bulk-counter').textContent=n;
  ge('bulk-save-count').textContent=n;
  const btn=ge('bulk-save-btn');
  if(n>0){btn.style.opacity='1';btn.style.pointerEvents='auto';}
  else{btn.style.opacity='.4';btn.style.pointerEvents='none';}
  const preview=ge('bulk-queue-preview');
  if(!n){preview.innerHTML='';return;}
  const LABS=['A','B','C','D'];
  preview.innerHTML=bulkQueue.map((q,i)=>`
    <div style="display:flex;align-items:center;gap:8px;background:var(--s2);border-radius:8px;padding:8px 10px;margin-bottom:6px;border-left:3px solid var(--ap)">
      <span style="font-size:11px;font-family:var(--fm);color:var(--ap);flex-shrink:0">Q${i+1}</span>
      <span style="font-size:12px;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--txt2)">${q.text.slice(0,60)}${q.text.length>60?'...':''}</span>
      <span style="font-size:10px;font-family:var(--fm);color:var(--ag);flex-shrink:0">Ans:${LABS[q.correct]}</span>
      <button onclick="removeBulkQ(${i})" style="background:none;color:var(--txt3);font-size:16px;opacity:.6;flex-shrink:0">×</button>
    </div>`).join('');
}

window.addToBulkQueue=()=>{
  const chapter=ge('bq-chapter').value.trim();
  const text=ge('bq-text').value.trim();
  const oa=ge('bq-oa').value.trim(),ob=ge('bq-ob').value.trim();
  const oc=ge('bq-oc').value.trim(),od=ge('bq-od').value.trim();
  if(!chapter){alert('Chapter name daalo!');ge('bq-chapter').focus();return;}
  if(!text||!oa||!ob||!oc||!od){alert('Question aur saare options bhar!');return;}
  bulkQueue.push({
    id:uid(),
    subj:ge('bq-subj').value,
    chapter,text,
    options:[oa,ob,oc,od],
    correct:parseInt(ge('bq-ans').value),
    explanation:ge('bq-exp').value.trim()
  });
  // clear only question fields, keep subject+chapter
  ['bq-text','bq-oa','bq-ob','bq-oc','bq-od','bq-exp'].forEach(id=>{const e=ge(id);if(e)e.value='';});
  ge('bq-ans').value='0';
  updateBulkUI();
  ge('bq-text').focus();
}

window.removeBulkQ=(i)=>{bulkQueue.splice(i,1);updateBulkUI();}

window.saveBulkQ=()=>{
  if(!bulkQueue.length){alert('Queue khaali hai!');return;}
  const at=nowStr();
  bulkQueue.forEach(q=>q.addedAt=at);
  bank.push(...bulkQueue);
  LS.s('jte_bank',bank);
  const count=bulkQueue.length;
  bulkQueue=[];
  updateBulkUI();
  closeModal('addq-modal');
  renderBank();renderTestHome();
  alert(`✅ ${count} questions bank mein save ho gaye!`);
}

function saveManualQ(){
  const text=ge('q-text-inp').value.trim();const oa=ge('q-oa').value.trim();const ob=ge('q-ob').value.trim();
  const oc=ge('q-oc').value.trim();const od=ge('q-od').value.trim();const chapter=ge('q-chapter').value.trim();
  if(!text||!oa||!ob||!oc||!od||!chapter){alert('Sab fields bhar!');return}
  bank.push({id:uid(),subj:ge('q-subj').value,chapter,text,options:[oa,ob,oc,od],correct:parseInt(ge('q-ans').value),explanation:ge('q-exp').value.trim(),addedAt:nowStr()});
  LS.s('jte_bank',bank);closeModal('addq-modal');
  ['q-text-inp','q-oa','q-ob','q-oc','q-od','q-exp','q-chapter'].forEach(id=>{const e=ge(id);if(e)e.value=''});
  renderBank();renderTestHome();alert('✅ Question saved!');
}
window.saveManualQ=saveManualQ;

// ─── AI GENERATE ──────────────────────────────
// ─── JSON IMPORT ─────────────────────────────
let jsonParsedQ = [];

function toggleJsonPaste(){
  const area = ge('json-paste-area');
  area.style.display = area.style.display==='none' ? 'block' : 'none';
}
window.toggleJsonPaste = toggleJsonPaste;

function clearJsonPaste(){
  ge('json-paste-inp').value='';
  jsonParsedQ=[];
  ge('json-error').style.display='none';
  ge('json-preview').style.display='none';
  const btn=ge('json-import-btn');
  btn.style.opacity='.4';btn.style.pointerEvents='none';
  ge('json-import-count').textContent='0';
}
window.clearJsonPaste=clearJsonPaste;

function copyJsonTemplate(){
  const t=`[
  {
    "q": "A ball is thrown vertically upward with velocity 20 m/s. Time to reach max height?",
    "options": { "1": "1 s", "2": "2 s", "3": "3 s", "4": "4 s" },
    "answer": 2,
    "exp": "v=u-gt => 0=20-10t => t=2s (optional)"
  }
]`;
  navigator.clipboard.writeText(t).then(()=>alert('✅ Template copy ho gaya!')).catch(()=>alert('Manually copy karo:\n'+t));
}
window.copyJsonTemplate = copyJsonTemplate;

function parseAndPreviewJson(raw){
  const errBox = ge('json-error');
  const preview = ge('json-preview');
  const previewList = ge('json-preview-list');
  const countEl = ge('json-preview-count');
  const importBtn = ge('json-import-btn');
  const importCount = ge('json-import-count');
  errBox.style.display='none'; preview.style.display='none';
  jsonParsedQ=[];
  importBtn.style.opacity='.4'; importBtn.style.pointerEvents='none';

  const subj = (ge('ji-subj')?.value || 'p');
  const chapter = (ge('ji-chapter')?.value.trim() || '');

  try{
    const arr = JSON.parse(raw);
    if(!Array.isArray(arr)) throw new Error('JSON ek array hona chahiye: [...]');
    const errors=[], valid=[];
    arr.forEach((q,i)=>{
      const n=i+1;
      const text = q.q || q.text;
      if(!text) {errors.push(`Q${n}: "q" field missing`);return;}
      // New format: options object {1,2,3,4} + answer 1-4
      let opts, correct;
      if(q.options && typeof q.options === 'object' && !Array.isArray(q.options)){
        opts = [q.options['1'],q.options['2'],q.options['3'],q.options['4']];
        correct = parseInt(q.answer||q.ans) - 1; // 1-4 → 0-3
      } else {
        // old format fallback: a,b,c,d + ans 0-3
        opts = [q.a||q.optA, q.b||q.optB, q.c||q.optC, q.d||q.optD];
        correct = q.ans!==undefined ? parseInt(q.ans) : (q.correct!==undefined ? parseInt(q.correct) : -1);
      }
      if(!opts[0]||!opts[1]||!opts[2]||!opts[3]) {errors.push(`Q${n}: options missing`);return;}
      if(correct<0||correct>3) {errors.push(`Q${n}: answer must be 1-4`);return;}
      valid.push({id:uid(), subj, chapter: chapter||'General',
        text:text.trim(), options:opts, correct,
        explanation:(q.exp||q.explanation||'').trim(),
        addedAt: nowStr()});
    });

    if(errors.length){
      errBox.innerHTML='<b>⚠ Kuch errors hain:</b><br>'+errors.slice(0,5).join('<br>')+(errors.length>5?`<br>...aur ${errors.length-5} aur`:'');
      errBox.style.display='block';
    }
    if(!valid.length){jsonParsedQ=[];return;}
    jsonParsedQ=valid;

    const LABS=['1','2','3','4'];
    previewList.innerHTML=valid.slice(0,5).map(q=>`
      <div style="background:var(--s2);border-radius:8px;padding:9px 11px;margin-bottom:6px;border-left:3px solid var(--ap)">
        <div style="font-size:12px;color:var(--txt2)">${q.text.slice(0,90)}${q.text.length>90?'...':''}</div>
        <div style="font-size:10px;font-family:var(--fm);color:var(--ag);margin-top:3px">✅ ${LABS[q.correct]}) ${q.options[q.correct].slice(0,30)}</div>
      </div>`).join('')+(valid.length>5?`<div style="font-size:11px;color:var(--txt3);font-family:var(--fm);padding:6px 0">...aur ${valid.length-5} aur questions</div>`:'');
    countEl.textContent=valid.length+' valid questions';
    importCount.textContent=valid.length;
    preview.style.display='block';
    importBtn.style.opacity='1'; importBtn.style.pointerEvents='auto';
  }catch(err){
    errBox.textContent='❌ JSON parse error: '+err.message;
    errBox.style.display='block';
  }
}

window.loadJsonFile=(e)=>{
  const file=e.target.files[0]; if(!file)return;
  const reader=new FileReader();
  reader.onload=(ev)=>{ parseAndPreviewJson(ev.target.result); };
  reader.readAsText(file);
  e.target.value='';
}

// live parse on paste
document.addEventListener('DOMContentLoaded',()=>{
  document.addEventListener('input',(e)=>{
    if(e.target.id==='json-paste-inp') parseAndPreviewJson(e.target.value.trim());
  });
});

window.importJsonQ=()=>{
  if(!jsonParsedQ.length){alert('Pehle valid JSON daalo!');return;}
  const at=nowStr();
  jsonParsedQ.forEach(q=>q.addedAt=at);
  bank.push(...jsonParsedQ);
  LS.s('jte_bank',bank);
  const count=jsonParsedQ.length;
  jsonParsedQ=[];
  closeModal('addq-modal');
  renderBank(); renderTestHome();
  alert(`✅ ${count} questions successfully bank mein import ho gaye!`);
}



// ─── BACKUP & RESTORE ────────────────────────
window.exportBackup=()=>{
  const data={
    version:1,
    exportedAt:new Date().toISOString(),
    prepData:{
      tasks:    LS.g('jee2_tasks',[]),
      backlog:  LS.g('jee2_backlog',[]),
      notes:    LS.g('jee2_notes',[]),
      formulas: LS.g('jee2_formulas',[]),
      mocks:    LS.g('jee2_mocks',[]),
      revision: LS.g('jee2_revision',[]),
      streak:   LS.g('jee2_streak',{days:[],count:0}),
      scores:   LS.g('jee2_scores',{p:null,c:null,m:null}),
      chapters: LS.g('jee2_chapters',{}),
    },
    testData:{
      bank:     LS.g('jte_bank',[]),
      attempts: LS.g('jte_attempts',[]),
    }
  };
  // add custom subtopics
  const customs={};
  Object.values(CHAPTERS).forEach(arr=>arr.forEach(ch=>{
    const c=LS.g('jee2_custom_'+ch.id,null);
    if(c)customs[ch.id]=c;
  }));
  data.customSubtopics=customs;

  const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url;
  a.download='JEE_Mission2027_Backup_'+new Date().toISOString().split('T')[0]+'.json';
  a.click();URL.revokeObjectURL(url);
}

window.importBackup=(e)=>{
  const file=e.target.files[0];if(!file)return;
  const reader=new FileReader();
  reader.onload=(ev)=>{
    try{
      const data=JSON.parse(ev.target.result);
      if(!data.version||!data.prepData){alert('❌ Invalid backup file!');return}
      if(!confirm('Ye restore kar dega aur current data replace ho jayega. Pakka?'))return;
      const p=data.prepData;
      if(p.tasks)    LS.s('jee2_tasks',p.tasks);
      if(p.backlog)  LS.s('jee2_backlog',p.backlog);
      if(p.notes)    LS.s('jee2_notes',p.notes);
      if(p.formulas) LS.s('jee2_formulas',p.formulas);
      if(p.mocks)    LS.s('jee2_mocks',p.mocks);
      if(p.revision) LS.s('jee2_revision',p.revision);
      if(p.streak)   LS.s('jee2_streak',p.streak);
      if(p.scores)   LS.s('jee2_scores',p.scores);
      if(p.chapters) LS.s('jee2_chapters',p.chapters);
      const t=data.testData;
      if(t){
        if(t.bank)     LS.s('jte_bank',t.bank);
        if(t.attempts) LS.s('jte_attempts',t.attempts);
      }
      if(data.customSubtopics){
        Object.entries(data.customSubtopics).forEach(([id,subs])=>LS.s('jee2_custom_'+id,subs));
      }
      alert('✅ Data restore ho gaya! App reload ho raha hai...');
      location.reload();
    }catch(err){alert('❌ File read error: '+err.message);}
  };
  reader.readAsText(file);
  e.target.value='';
}

window.exportPDF=()=>{
  const scores=LS.g('jee2_scores',{p:null,c:null,m:null});
  const tasks=LS.g('jee2_tasks',[]);
  const backlog=LS.g('jee2_backlog',[]);
  const notes=LS.g('jee2_notes',[]);
  const formulas=LS.g('jee2_formulas',[]);
  const mocks=LS.g('jee2_mocks',[]);
  const streak=LS.g('jee2_streak',{days:[],count:0});
  const chapData=LS.g('jee2_chapters',{});
  const testAttempts=LS.g('jte_attempts',[]);

  // Compute chapter progress
  const chapProgress=[];
  Object.values(CHAPTERS).forEach(arr=>arr.forEach(ch=>{
    const cd=chapData[ch.id];
    if(!cd||!cd.subtopics)return;
    const total=ch.subtopics.length;
    const done=ch.subtopics.filter(s=>cd.subtopics[s]).length;
    if(done>0)chapProgress.push({name:ch.name,done,total,pct:Math.round(done/total*100)});
  }));

  const now=new Date().toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'});

  const html=`<!DOCTYPE html><html><head><meta charset="UTF-8">
  <title>AIR Hunter — Backup Report</title>
  <style>
    body{font-family:'Segoe UI',sans-serif;background:#fff;color:#111;padding:32px;max-width:800px;margin:0 auto;font-size:14px}
    h1{font-size:26px;font-weight:900;color:#4f8aff;margin-bottom:2px}
    .sub{font-size:12px;color:#888;margin-bottom:28px}
    h2{font-size:14px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;color:#4f8aff;border-bottom:2px solid #e8ecff;padding-bottom:6px;margin:24px 0 12px}
    .grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:8px}
    .stat{background:#f5f7ff;border-radius:10px;padding:12px 14px;border-left:3px solid #4f8aff}
    .stat-lbl{font-size:10px;letter-spacing:1px;color:#888;text-transform:uppercase}
    .stat-val{font-size:22px;font-weight:800;color:#4f8aff;margin-top:2px}
    table{width:100%;border-collapse:collapse;margin-bottom:8px}
    th{background:#f5f7ff;font-size:11px;letter-spacing:1px;color:#888;text-transform:uppercase;padding:8px 10px;text-align:left}
    td{padding:8px 10px;border-bottom:1px solid #f0f0f0;font-size:13px}
    tr:last-child td{border-bottom:none}
    .badge{display:inline-block;padding:2px 8px;border-radius:4px;font-size:10px;font-weight:700}
    .badge-high{background:#ffe0e6;color:#e03555}
    .badge-med{background:#fff5cc;color:#b38a00}
    .badge-low{background:#d4f7ee;color:#008060}
    .badge-p{background:#e8ecff;color:#4f8aff}
    .badge-g{background:#d4f7ee;color:#008060}
    .badge-r{background:#ffe0e6;color:#e03555}
    .note-box{background:#f9f9ff;border-left:3px solid #4f8aff;padding:10px 12px;margin-bottom:8px;border-radius:0 8px 8px 0}
    .note-title{font-weight:700;font-size:13px;margin-bottom:3px}
    .note-body{font-size:12px;color:#555;line-height:1.6}
    .prog-bar{background:#eee;border-radius:4px;height:6px;width:100%;margin-top:4px}
    .prog-fill{background:#4f8aff;height:6px;border-radius:4px}
    @media print{body{padding:16px}}
  </style></head><body>
  <h1>🎯 AIR Hunter</h1>
  <div class="sub">Backup Report · Generated on ${now}</div>

  <h2>📊 Subject Accuracy</h2>
  <div class="grid">
    <div class="stat"><div class="stat-lbl">Physics</div><div class="stat-val" style="color:#4f8aff">${scores.p!==null?scores.p+'%':'—'}</div></div>
    <div class="stat"><div class="stat-lbl">Chemistry</div><div class="stat-val" style="color:#00c48c">${scores.c!==null?scores.c+'%':'—'}</div></div>
    <div class="stat"><div class="stat-lbl">Maths</div><div class="stat-val" style="color:#ff4f6d">${scores.m!==null?scores.m+'%':'—'}</div></div>
    <div class="stat"><div class="stat-lbl">Streak</div><div class="stat-val" style="color:#ffb800">${streak.count}🔥</div></div>
  </div>

  ${chapProgress.length?`<h2>📐 Chapter Progress</h2>
  <table><thead><tr><th>Chapter</th><th>Progress</th><th>Done</th></tr></thead><tbody>
  ${chapProgress.map(c=>`<tr><td>${c.name}</td><td><div class="prog-bar"><div class="prog-fill" style="width:${c.pct}%"></div></div><span style="font-size:11px;color:#888">${c.pct}%</span></td><td>${c.done}/${c.total}</td></tr>`).join('')}
  </tbody></table>`:''}

  ${tasks.length?`<h2>✅ Today's Tasks (${tasks.filter(t=>t.done).length}/${tasks.length} done)</h2>
  <table><thead><tr><th>Task</th><th>Subject</th><th>Status</th></tr></thead><tbody>
  ${tasks.map(t=>`<tr><td>${t.name}</td><td>${t.subj}</td><td>${t.done?'✅ Done':'⏳ Pending'}</td></tr>`).join('')}
  </tbody></table>`:''}

  ${backlog.length?`<h2>🗂 Backlog (${backlog.length} items)</h2>
  <table><thead><tr><th>Topic</th><th>Subject</th><th>Priority</th></tr></thead><tbody>
  ${backlog.map(b=>`<tr><td>${b.topic}</td><td>${b.subj}</td><td><span class="badge badge-${b.prio}">${b.prio.toUpperCase()}</span></td></tr>`).join('')}
  </tbody></table>`:''}

  ${formulas.length?`<h2>∑ Formulas (${formulas.length})</h2>
  <table><thead><tr><th>Subject</th><th>Name</th><th>Formula</th></tr></thead><tbody>
  ${formulas.map(f=>`<tr><td><span class="badge badge-${f.subj}">${{p:'Physics',g:'Chemistry',r:'Maths'}[f.subj]}</span></td><td>${f.name}</td><td><b>${f.eq}</b></td></tr>`).join('')}
  </tbody></table>`:''}

  ${notes.length?`<h2>📋 Notes (${notes.length})</h2>
  ${notes.map(n=>`<div class="note-box"><div class="note-title">${n.title} <span class="badge badge-${n.subj}" style="margin-left:6px">${{p:'Physics',g:'Chemistry',r:'Maths'}[n.subj]}</span></div><div class="note-body">${n.body||'—'}</div></div>`).join('')}`:''}

  ${mocks.length?`<h2>🎯 Mock Test Scores (${mocks.length})</h2>
  <table><thead><tr><th>Test</th><th>Date</th><th>Score</th><th>%</th></tr></thead><tbody>
  ${[...mocks].sort((a,b)=>b.date.localeCompare(a.date)).map(m=>`<tr><td>${m.name}</td><td>${m.date}</td><td>${m.score}/${m.total}</td><td>${Math.round(m.score/m.total*100)}%</td></tr>`).join('')}
  </tbody></table>`:''}

  ${testAttempts.length?`<h2>📊 Test Engine History (${testAttempts.length} attempts)</h2>
  <table><thead><tr><th>Test</th><th>Date</th><th>Score</th><th>Correct</th><th>Wrong</th><th>%</th></tr></thead><tbody>
  ${[...testAttempts].reverse().map(a=>`<tr><td>${a.testName}</td><td>${a.date}</td><td>${a.score}</td><td style="color:#00a876">${a.correct}✓</td><td style="color:#e03555">${a.wrong}✗</td><td>${Math.round(a.correct/a.total*100)}%</td></tr>`).join('')}
  </tbody></table>`:''}

  <div style="margin-top:32px;font-size:11px;color:#aaa;text-align:center;border-top:1px solid #eee;padding-top:12px">
    AIR Hunter — Backup generated on ${now} · Keep grinding! 💪
  </div>
  </body></html>`;

  const blob=new Blob([html],{type:'text/html'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url;
  a.download='JEE_Mission2027_Report_'+new Date().toISOString().split('T')[0]+'.html';
  a.click();URL.revokeObjectURL(url);
}


// ─── QUICK TEST ──────────────────────────────
let qtParsedQ = [];
let qtTimerMins = 30;

window.copyQtTemplate = () => {
  const t = `[
  {
    "q": "A body starts from rest with acceleration 2 m/s². Distance in 5s?",
    "options": { "1": "10 m", "2": "20 m", "3": "25 m", "4": "50 m" },
    "answer": 3
  }
]`;
  navigator.clipboard.writeText(t)
    .then(() => alert('✅ Template copy ho gaya!'))
    .catch(() => alert('Manually copy karo:\n' + t));
};

window.clearQtJson = () => {
  ge('qt-json-inp').value = '';
  qtParsedQ = [];
  ge('qt-status').style.display = 'none';
  const btn = ge('qt-start-btn');
  btn.style.opacity = '.4'; btn.style.pointerEvents = 'none';
  ge('qt-q-count').textContent = '';
};

window.qtJsonPreview = () => {
  const raw = ge('qt-json-inp').value.trim();
  const statusEl = ge('qt-status');
  const btn = ge('qt-start-btn');
  const countEl = ge('qt-q-count');
  qtParsedQ = [];
  btn.style.opacity = '.4'; btn.style.pointerEvents = 'none';
  countEl.textContent = '';
  if (!raw) { statusEl.style.display = 'none'; return; }
  try {
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr)) throw new Error('JSON ek array hona chahiye: [...]');
    const valid = []; const errors = [];
    arr.forEach((q, i) => {
      const n = i + 1;
      const text = q.q || q.text;
      if (!text)    { errors.push(`Q${n}: "q" field missing`); return; }
      if (!q.chapter) { errors.push(`Q${n}: "chapter" missing`); return; }
      if (!['p','g','r'].includes(q.subj)) { errors.push(`Q${n}: subj must be "p","g","r"`); return; }
      const a = q.a||q.optA, b = q.b||q.optB, c = q.c||q.optC, d = q.d||q.optD;
      if (!a||!b||!c||!d) { errors.push(`Q${n}: options a,b,c,d missing`); return; }
      const ans = q.ans !== undefined ? parseInt(q.ans) : (q.correct !== undefined ? parseInt(q.correct) : -1);
      if (ans < 0 || ans > 3) { errors.push(`Q${n}: "ans" 0-3 hona chahiye`); return; }
      valid.push({ id: uid(), subj: q.subj, chapter: q.chapter.trim(),
        text: text.trim(), options: [a,b,c,d], correct: ans,
        explanation: (q.exp || q.explanation || '').trim() });
    });
    if (errors.length) {
      statusEl.innerHTML = '<b>⚠ Kuch errors:</b> ' + errors.slice(0,3).join(' | ') + (errors.length > 3 ? ` +${errors.length-3} aur` : '');
      statusEl.style.cssText = 'display:block;background:rgba(255,79,109,.1);border:1px solid rgba(255,79,109,.3);border-radius:8px;padding:9px 12px;margin-bottom:12px;font-size:11px;font-family:var(--fm);color:var(--ar)';
    }
    if (valid.length) {
      qtParsedQ = valid;
      if (!errors.length) {
        statusEl.innerHTML = `✅ ${valid.length} questions ready — ab test shuru karo!`;
        statusEl.style.cssText = 'display:block;background:rgba(0,196,140,.1);border:1px solid rgba(0,196,140,.3);border-radius:8px;padding:9px 12px;margin-bottom:12px;font-size:12px;font-family:var(--fm);color:var(--ag)';
      }
      btn.style.opacity = '1'; btn.style.pointerEvents = 'auto';
      countEl.textContent = valid.length + ' questions • ' + qtTimerMins + ' min timer';
    } else {
      statusEl.style.display = 'block';
    }
  } catch(err) {
    statusEl.innerHTML = '❌ JSON error: ' + err.message;
    statusEl.style.cssText = 'display:block;background:rgba(255,79,109,.1);border:1px solid rgba(255,79,109,.3);border-radius:8px;padding:9px 12px;margin-bottom:12px;font-size:11px;font-family:var(--fm);color:var(--ar)';
  }
};

function qtSelectTimer(m) {
  qtTimerMins = m;
  document.querySelectorAll('[id^="qtopt-"]').forEach(el => el.classList.remove('on'));
  const el = ge('qtopt-' + m); if (el) el.classList.add('on');
  if (qtParsedQ.length) ge('qt-q-count').textContent = qtParsedQ.length + ' questions • ' + m + ' min timer';
}
window.qtSelectTimer = qtSelectTimer;

window.qtSetCustomTimer = () => {
  const v = parseInt(ge('qt-custom-timer').value);
  if (!v || v < 1) return;
  qtTimerMins = v;
  document.querySelectorAll('[id^="qtopt-"]').forEach(el => el.classList.remove('on'));
  if (qtParsedQ.length) ge('qt-q-count').textContent = qtParsedQ.length + ' questions • ' + v + ' min timer';
};

window.startQuickTest = () => {
  if (!qtParsedQ.length) { alert('Pehle valid JSON paste karo!'); return; }
  // shuffle questions
  const qs = [...qtParsedQ].sort(() => Math.random() - .5);
  // reuse existing test engine — just set T directly, don't touch bank
  T.qs = qs; T.idx = 0; T.answers = {}; T.marked = {};
  T.timerSecs = qtTimerMins * 60; T.startTime = Date.now();
  T.subj = qs[0]?.subj || 'p';
  T.chapters = [...new Set(qs.map(q => q.chapter))];
  T.timerMins = qtTimerMins;
  T.testName = '⚡ Quick Test — ' + T.chapters.slice(0,2).join(', ') + (T.chapters.length > 2 ? '...' : '');
  // hide nav, show full screen test
  ge('main-header').style.display = 'none';
  document.querySelector('.bnav').style.display = 'none';
  document.body.style.paddingBottom = '0';
  ge('page-testactive').classList.add('on');
  renderTestQ(); startTestTimer();
};

window.clearAllData=()=>{
  if(!confirm('Sab data delete ho jayega. Pakka?'))return;
  ['jee2_tasks','jee2_backlog','jee2_notes','jee2_formulas','jee2_mocks','jee2_revision','jee2_streak','jee2_scores','jee2_chapters'].forEach(k=>localStorage.removeItem(k));
  location.reload();
}

// ─── LOAD CUSTOM SUBTOPICS ───────────────────
function loadCustomSubtopics(){
  Object.values(CHAPTERS).forEach(arr=>arr.forEach(ch=>{const custom=LS.g('jee2_custom_'+ch.id,null);if(custom&&Array.isArray(custom))ch.subtopics=custom;}));
}

// ─── INIT ────────────────────────────────────
window.addEventListener('DOMContentLoaded',()=>{
  loadCustomSubtopics();markToday();showPage('home');updateFace();
});
