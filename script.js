const filterButtons = document.querySelectorAll(".filter");
const productCards = document.querySelectorAll(".product-card");
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    const filter = button.dataset.filter;
    productCards.forEach(card => {
      card.classList.toggle("hidden", filter !== "Tümü" && card.dataset.category !== filter);
    });
  });
});
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
menuToggle.addEventListener("click", () => nav.classList.toggle("open"));
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => nav.classList.remove("open")));
document.getElementById("year").textContent = new Date().getFullYear();

// Üst bölüm: otomatik ve elle kontrol edilen slayt
(() => {
  const slider = document.querySelector('.hero-slider');
  if (!slider) return;
  const slides = [...slider.querySelectorAll('.slide')];
  const dots = [...slider.querySelectorAll('.slide-dot')];
  let current = 0;
  let timer;
  const show = index => {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === current);
      slide.setAttribute('aria-hidden', i === current ? 'false' : 'true');
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === current);
      dot.setAttribute('aria-current', i === current ? 'true' : 'false');
    });
  };
  const start = () => {
    clearInterval(timer);
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      timer = setInterval(() => show(current + 1), 4000);
    }
  };
  slider.querySelector('.slide-prev').addEventListener('click', () => {show(current - 1);start();});
  slider.querySelector('.slide-next').addEventListener('click', () => {show(current + 1);start();});
  dots.forEach((dot, i) => dot.addEventListener('click', () => {show(i);start();}));
  slider.addEventListener('mouseenter', () => clearInterval(timer));
  slider.addEventListener('mouseleave', start);
  slider.addEventListener('focusin', () => clearInterval(timer));
  slider.addEventListener('focusout', e => {if (!slider.contains(e.relatedTarget)) start();});
  document.addEventListener('visibilitychange', () => {if (document.hidden) clearInterval(timer); else start();});
  start();
})();

// İki test videosundan aynı anda yalnızca seçili olanı oynat.
(()=>{const buttons=[...document.querySelectorAll('.video-tab')];const videos=[document.getElementById('heroVideo1'),document.getElementById('heroVideo2')];buttons.forEach((b,i)=>b.addEventListener('click',()=>{videos.forEach((v,j)=>{if(!v)return;v.hidden=i!==j;if(i!==j)v.pause();else v.play().catch(()=>{});});buttons.forEach((x,j)=>{x.classList.toggle('active',i===j);x.setAttribute('aria-pressed',String(i===j));});}));})();
