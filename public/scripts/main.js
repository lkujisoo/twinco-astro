document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initSearch();
  initLangSwitcher();
  initMegaDropdown();
  initHomeHeroSlider();
  initHeroSections();
});

function initHeader() {
  const header = document.getElementById('siteHeader');
  if (!header) return;
  let lastScrollY = 0;
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const currentY = window.scrollY;
        if (currentY > lastScrollY && currentY > 200) {
          header.classList.add('header-hidden');
          closeMegaDropdown();
          closeSearch();
        } else {
          header.classList.remove('header-hidden');
        }
        if (currentY > 100) {
          header.classList.add('header-solid');
        } else if (!header.classList.contains('header-solid-permanent')) {
          header.classList.remove('header-solid');
        }
        lastScrollY = currentY;
        ticking = false;
      });
      ticking = true;
    }
  });
}

function initSearch() {
  const toggle = document.getElementById('searchToggle');
  const overlay = document.getElementById('searchOverlay');
  const input = document.getElementById('searchInput');
  const closeBtn = document.getElementById('searchClose');
  if (!toggle || !overlay) return;
  toggle.addEventListener('click', () => {
    if (overlay.classList.contains('open')) {
      closeSearch();
    } else {
      closeMegaDropdown();
      overlay.classList.add('open');
      setTimeout(() => input.focus(), 150);
    }
  });
  closeBtn.addEventListener('click', closeSearch);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSearch();
    if (e.key === 'Enter') {
      const query = input.value.trim();
      if (query) window.location.href = `/products?search=${encodeURIComponent(query)}`;
    }
  });
}

function closeSearch() {
  const overlay = document.getElementById('searchOverlay');
  if (overlay) overlay.classList.remove('open');
}

function initLangSwitcher() {
  const switcher = document.getElementById('langSwitcher');
  if (!switcher) return;
  const toggleBtn = switcher.querySelector('.lang-toggle');
  const links = switcher.querySelectorAll('.lang-dropdown a');
  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    switcher.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', switcher.classList.contains('open'));
  });
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      links.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      switcher.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });
  document.addEventListener('click', (e) => {
    if (!switcher.contains(e.target)) {
      switcher.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

let categoriesData = null;

async function initMegaDropdown() {
  const toggle = document.getElementById('productsToggle');
  const dropdown = document.getElementById('megaDropdown');
  const subContainer = document.getElementById('megaSubcategories');
  if (!toggle || !dropdown) return;

  const wrapper = document.createElement('div');
  wrapper.className = 'mega-sub-wrapper';
  subContainer.parentNode.insertBefore(wrapper, subContainer);
  wrapper.appendChild(subContainer);
  const scrollTrack = document.createElement('div');
  scrollTrack.className = 'custom-scrollbar';
  const scrollThumb = document.createElement('div');
  scrollThumb.className = 'custom-scrollbar-thumb';
  scrollTrack.appendChild(scrollThumb);
  wrapper.appendChild(scrollTrack);

  let scrollTimer;
  function updateScrollThumb() {
    const { scrollTop, scrollHeight, clientHeight } = subContainer;
    if (scrollHeight <= clientHeight) { scrollThumb.classList.remove('visible'); return; }
    const ratio = clientHeight / scrollHeight;
    const thumbH = Math.max(24, ratio * clientHeight);
    const maxTop = clientHeight - thumbH;
    const thumbTop = (scrollTop / (scrollHeight - clientHeight)) * maxTop;
    scrollThumb.style.height = thumbH + 'px';
    scrollThumb.style.top = thumbTop + 'px';
    scrollThumb.classList.remove('fading');
    scrollThumb.classList.add('visible');
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => { scrollThumb.classList.add('fading'); scrollThumb.classList.remove('visible'); }, 1200);
  }
  subContainer.addEventListener('scroll', updateScrollThumb);

  try {
    const resp = await fetch('/data/categories.json');
    categoriesData = await resp.json();
    renderCategories(categoriesData);
  } catch (err) {
    console.warn('Categories data not loaded:', err);
  }

  toggle.addEventListener('click', () => {
    if (dropdown.classList.contains('open')) {
      closeMegaDropdown();
    } else {
      closeSearch();
      dropdown.classList.add('open');
      dropdown.setAttribute('aria-hidden', 'false');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
  });
  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target) && !toggle.contains(e.target)) closeMegaDropdown();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { closeMegaDropdown(); closeSearch(); }
  });
}

function closeMegaDropdown() {
  const dropdown = document.getElementById('megaDropdown');
  const toggle = document.getElementById('productsToggle');
  if (!dropdown) return;
  dropdown.classList.remove('open');
  dropdown.setAttribute('aria-hidden', 'true');
  toggle.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

/* PLACEHOLDER_RENDER */

function renderCategories(data) {
  const container = document.getElementById('megaCategories');
  if (!container) return;
  container.innerHTML = '';
  data.forEach((cat) => {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.textContent = cat.name;
    btn.addEventListener('click', () => {
      container.querySelectorAll('button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderSubcategories(cat);
    });
    li.appendChild(btn);
    container.appendChild(li);
  });
}

function renderSubcategories(category) {
  const container = document.getElementById('megaSubcategories');
  if (!category.subcategories || category.subcategories.length === 0) {
    container.innerHTML = '<p class="mega-hint">暂无子分类</p>';
    return;
  }
  const grid = document.createElement('div');
  grid.className = 'mega-sub-grid';
  category.subcategories.forEach(sub => {
    const item = document.createElement('a');
    item.className = 'mega-sub-item';
    item.href = `/products?category=${encodeURIComponent(category.id)}&sub=${encodeURIComponent(sub.id)}`;
    const thumb = document.createElement('div');
    thumb.className = 'mega-sub-thumb';
    if (sub.thumbnail) {
      const img = document.createElement('img');
      img.src = sub.thumbnail;
      img.alt = sub.name;
      img.loading = 'lazy';
      thumb.appendChild(img);
    } else {
      thumb.textContent = sub.name.charAt(0);
    }
    const name = document.createElement('div');
    name.className = 'mega-sub-name';
    name.textContent = sub.name;
    item.appendChild(thumb);
    item.appendChild(name);
    grid.appendChild(item);
  });
  container.innerHTML = '';
  container.appendChild(grid);
}

function initHomeHeroSlider() {
  const slider = document.getElementById('homeHeroSlider');
  if (!slider) return;

  const slides = Array.from(slider.querySelectorAll('.home-hero-slide'));
  const dots = Array.from(document.querySelectorAll('[data-hero-dot]'));
  const prev = document.querySelector('[data-hero-prev]');
  const next = document.querySelector('[data-hero-next]');
  if (slides.length <= 1) return;

  let activeIndex = 0;
  let timer = null;
  const interval = 6000;

  function showSlide(index) {
    activeIndex = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === activeIndex;
      slide.classList.toggle('active', isActive);
      slide.setAttribute('aria-hidden', String(!isActive));
    });
    dots.forEach((dot, dotIndex) => {
      const isActive = dotIndex === activeIndex;
      dot.classList.toggle('active', isActive);
      dot.setAttribute('aria-current', String(isActive));
    });
  }

  function restartTimer() {
    window.clearInterval(timer);
    timer = window.setInterval(() => showSlide(activeIndex + 1), interval);
  }

  prev?.addEventListener('click', () => {
    showSlide(activeIndex - 1);
    restartTimer();
  });
  next?.addEventListener('click', () => {
    showSlide(activeIndex + 1);
    restartTimer();
  });
  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      showSlide(Number(dot.dataset.heroDot));
      restartTimer();
    });
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      showSlide(activeIndex - 1);
      restartTimer();
    }
    if (event.key === 'ArrowRight') {
      showSlide(activeIndex + 1);
      restartTimer();
    }
  });

  restartTimer();
}

function initHeroSections() {
  const sections = document.querySelectorAll('.hero-section');
  if (!sections.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('in-view');
    });
  }, { threshold: 0.25 });
  sections.forEach(section => observer.observe(section));
}
