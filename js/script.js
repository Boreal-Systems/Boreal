(function(){
'use strict';

/* ---------- Rede animada de fundo (canvas) ---------- */
var c = document.getElementById('net'), x = c.getContext('2d');
var pts = [], N = 70, mouse = {x:-999,y:-999}, scrollY = 0;
var colors = ['45,212,191','52,211,153','255,63,201']; // teal, green, pink

function resize(){ c.width = innerWidth; c.height = innerHeight; }
function init(){
  pts = [];
  for(var i=0;i<N;i++){
    pts.push({
      x: Math.random()*innerWidth,
      y: Math.random()*innerHeight,
      vx: (Math.random()-.5)*.35,
      vy: (Math.random()-.5)*.35,
      c: colors[i%3]
    });
  }
}
function step(){
  x.clearRect(0,0,c.width,c.height);
  var drift = scrollY * 0.00006; // leve deslocamento com o scroll

  for(var i=0;i<pts.length;i++){
    var p = pts[i];
    p.x += p.vx + drift;
    p.y += p.vy;
    if(p.x<0) p.x=c.width; if(p.x>c.width) p.x=0;
    if(p.y<0) p.y=c.height; if(p.y>c.height) p.y=0;

    x.beginPath();
    x.fillStyle = 'rgba('+p.c+',.8)';
    x.arc(p.x,p.y,1.6,0,Math.PI*2);
    x.fill();
  }
  for(var i=0;i<pts.length;i++){
    for(var j=i+1;j<pts.length;j++){
      var a=pts[i], b=pts[j];
      var dx=a.x-b.x, dy=a.y-b.y, d=Math.sqrt(dx*dx+dy*dy);
      if(d<140){
        x.strokeStyle = 'rgba(45,212,191,'+(0.16*(1-d/140))+')';
        x.lineWidth = 1;
        x.beginPath(); x.moveTo(a.x,a.y); x.lineTo(b.x,b.y); x.stroke();
      }
    }
  }
  requestAnimationFrame(step);
}
resize(); init(); step();
addEventListener('resize', function(){ resize(); init(); });
addEventListener('scroll', function(){ scrollY = window.scrollY; }, {passive:true});

/* ---------- Menu mobile ---------- */
var burger = document.getElementById('burger'), nav = document.getElementById('mobileNav');
if(burger && nav){
  burger.addEventListener('click', function(){
    var open = burger.getAttribute('aria-expanded') === 'true';
    burger.setAttribute('aria-expanded', String(!open));
    nav.classList.toggle('translate-x-full', open);
    document.body.style.overflow = open ? '' : 'hidden';
  });
  nav.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){
      burger.setAttribute('aria-expanded','false');
      nav.classList.add('translate-x-full');
      document.body.style.overflow = '';
    });
  });
}

/* ---------- Ano ---------- */
document.getElementById('year').textContent = new Date().getFullYear();

/* ---------- Revelar cards ao rolar a página ---------- */
var revealEls = document.querySelectorAll('.reveal');
if('IntersectionObserver' in window && revealEls.length){
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2, rootMargin: '0px 0px -8% 0px' });
  revealEls.forEach(function(el){ io.observe(el); });
} else {
  revealEls.forEach(function(el){ el.classList.add('is-visible'); });
}
})();
