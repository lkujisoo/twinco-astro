document.addEventListener('DOMContentLoaded', () => {
  loadProducts();
});

/** 页面按当前语言注入的文案与路径（见 ProductsPage.astro） */
function strings() {
  return window.__PRODUCTS_STRINGS__ || {};
}

/** 填模板占位符：fill('共 {n} 件商品', {n: 12}) */
function fill(template, params) {
  if (!template) return '';
  return template.replace(/\{(\w+)\}/g, (m, k) => (k in params ? String(params[k]) : m));
}

async function loadProducts() {
  const s = strings();
  const params = new URLSearchParams(window.location.search);
  const categoryId = params.get('category');
  const subId = params.get('sub');
  const search = params.get('search');

  const products = window.__PRODUCTS_DATA__ || [];
  // 分类由页面按语言注入，不再 fetch 静态 json
  const categories = window.__CATEGORIES__ || [];

  let categoryName = '';
  let subName = '';
  let pageTitle = s.allProducts || '';

  if (categoryId) {
    const cat = categories.find(c => c.id === categoryId);
    if (cat) {
      categoryName = cat.name;
      pageTitle = cat.name;
      if (subId) {
        const sub = cat.subcategories.find(s2 => s2.id === subId);
        if (sub) { subName = sub.name; pageTitle = sub.name; }
      }
    }
  }
  if (search) pageTitle = fill(s.searchTitle, { q: search });

  updateBreadcrumb(categoryId, categoryName, subName);
  document.getElementById('productsTitle').textContent = pageTitle;
  document.title = `${pageTitle} | Twinco`;

  let filtered = products;
  if (categoryId) filtered = filtered.filter(p => p.category === categoryId);
  if (subId) filtered = filtered.filter(p => p.subcategory === subId);
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(p =>
      (p.name || '').toLowerCase().includes(q) ||
      (p.nameRef || '').toLowerCase().includes(q) ||
      (p.description || '').toLowerCase().includes(q)
    );
  }

  document.getElementById('productsCount').textContent = fill(s.count, { n: filtered.length });
  const grid = document.getElementById('productGrid');
  const empty = document.getElementById('productsEmpty');

  if (filtered.length === 0) {
    grid.style.display = 'none';
    empty.style.display = 'block';
    return;
  }

  grid.innerHTML = '';
  filtered.forEach((product, index) => {
    grid.appendChild(createProductCard(product, index));
  });
}

function getColorImage(product, color) {
  if (color.image) return color.image;
  const sv = product.stepVariants;
  if (sv && sv.length) {
    const ck = color.key || color.name;
    if (sv[0].colorImages && sv[0].colorImages[ck]) {
      return sv[0].colorImages[ck];
    }
    // Color not covered by the first variant (e.g. a color that only exists on
    // another step variant). Fall back to the variant/default image instead of
    // flashing the "no image" placeholder, matching the detail page behavior.
    if (sv[0].image) return sv[0].image;
  }
  return product.defaultImage || null;
}

function createProductCard(product, index) {
  const s = strings();
  const card = document.createElement('a');
  card.className = 'product-card';
  card.href = `${s.productPath || '/product'}/${product.id}`;
  card.style.animationDelay = `${index * 0.06}s`;

  const imgWrap = document.createElement('div');
  imgWrap.className = 'product-card-image';
  const img = document.createElement('img');
  img.alt = product.name;
  img.loading = 'lazy';

  const hasColors = product.colors && product.colors.length > 0;
  let initialSrc = product.defaultImage || '';
  if (!initialSrc && hasColors) initialSrc = getColorImage(product, product.colors[0]) || '';

  let placeholder = null;
  function showImage(src) {
    if (src) {
      if (placeholder) { placeholder.remove(); placeholder = null; }
      if (!img.isConnected) imgWrap.appendChild(img);
      img.style.opacity = '0';
      setTimeout(() => { img.src = src; img.style.opacity = '1'; }, 150);
    } else {
      if (img.isConnected) img.remove();
      if (!placeholder) {
        placeholder = document.createElement('div');
        placeholder.className = 'product-card-placeholder highlight-image-placeholder';
        placeholder.innerHTML = `<span>${s.imageMissing || ''}</span>`;
        imgWrap.appendChild(placeholder);
      }
    }
  }

  if (initialSrc) {
    img.src = initialSrc;
    imgWrap.appendChild(img);
  } else {
    placeholder = document.createElement('div');
    placeholder.className = 'product-card-placeholder highlight-image-placeholder';
    placeholder.innerHTML = `<span>${s.imageMissing || ''}</span>`;
    imgWrap.appendChild(placeholder);
  }
  card.appendChild(imgWrap);

  const info = document.createElement('div');
  info.className = 'product-card-info';
  const name = document.createElement('h3');
  name.className = 'product-card-name';
  name.textContent = product.name;
  const mat = document.createElement('p');
  mat.className = 'product-card-material';
  mat.textContent = product.material;
  info.appendChild(name);
  info.appendChild(mat);
  card.appendChild(info);

  if (hasColors) {
    const swatches = document.createElement('div');
    swatches.className = 'product-card-colors';
    let activeDot = null;
    product.colors.forEach((color, i) => {
      const dot = document.createElement('span');
      dot.className = 'color-dot';
      dot.style.backgroundColor = color.hex;
      dot.title = color.name;
      if (i === 0) { dot.classList.add('active'); activeDot = dot; }
      dot.addEventListener('mouseenter', () => {
        if (activeDot) activeDot.classList.remove('active');
        dot.classList.add('active');
        activeDot = dot;
        showImage(getColorImage(product, color));
      });
      swatches.appendChild(dot);
    });
    card.appendChild(swatches);
  }
  return card;
}

function updateBreadcrumb(categoryId, categoryName, subName) {
  if (categoryName) {
    const catEl = document.getElementById('breadcrumbCat');
    const catSep = document.querySelector('.breadcrumb-cat-sep');
    if (catEl && catSep) {
      catEl.textContent = categoryName;
      catEl.style.display = '';
      catSep.style.display = '';
      if (categoryId) {
        const link = document.createElement('a');
        link.href = `${strings().productsPath || '/products'}?category=${encodeURIComponent(categoryId)}`;
        link.textContent = categoryName;
        catEl.replaceWith(link);
      }
    }
  }
  if (subName) {
    const subEl = document.getElementById('breadcrumbSub');
    const subSep = document.querySelector('.breadcrumb-sub-sep');
    if (subEl && subSep) {
      subEl.textContent = subName;
      subEl.style.display = '';
      subSep.style.display = '';
    }
  }
}
