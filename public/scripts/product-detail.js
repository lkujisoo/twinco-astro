/** 页面按当前语言注入的文案（见 ProductDetailPage.astro） */
function ds() {
  return window.__DETAIL_STRINGS__ || {};
}

/** 填模板占位符 */
function dsFill(template, params) {
  if (!template) return '';
  return template.replace(/\{(\w+)\}/g, (m, k) => (k in params ? String(params[k]) : m));
}

document.addEventListener('DOMContentLoaded', () => {
  const colors = window.__PRODUCT_COLORS__ || [];
  const defaultImage = window.__DEFAULT_IMAGE__ || '';
  const hasAccessories = window.__HAS_ACCESSORIES__ || false;
  const stepVariants = window.__STEP_VARIANTS__ || [];
  const addons = window.__ADDONS__ || [];
  const mainImageEl = document.getElementById('detailMainImage');
  const thumbsEl = document.getElementById('detailThumbs');
  const colorsContainer = document.getElementById('detailColors');
  const colorLabel = document.getElementById('detailColorLabel');
  const stepLabel = document.getElementById('detailStepLabel');

  const modelEl = document.getElementById('specModel');
  const dimEl = document.getElementById('specDimensions');
  const loadEl = document.getElementById('specMaxLoad');

  const gridVariants = window.__GRID_VARIANTS__ || null;

  let activeVariantIdx = 0;
  let activeColorIndex = 0;
  let wheelsActive = false;
  let handrailActive = false;
  const activeAddonKeys = new Set();
  const thumbButtons = [];

  const COLOR_KEY_ALIASES = {
    Black: ['黑色'],
    White: ['白色'],
    Silver: ['银色'],
    Grey: ['灰色'],
    Gray: ['灰色'],
    'Dark grey': ['深灰色', '深灰'],
    'Dark gray': ['深灰色', '深灰'],
    'Light grey': ['浅灰色', '浅灰'],
    'Light gray': ['浅灰色', '浅灰'],
    Brown: ['棕色', '咖啡色'],
    Blue: ['蓝色'],
    Red: ['红色'],
    Yellow: ['黄色'],
    Green: ['绿色'],
  };

  function colorKeyCandidates(color) {
    if (!color) return [];
    const raw = [color.key, color.name, color.sku].filter(Boolean);
    const expanded = raw.flatMap((key) => [key, ...(COLOR_KEY_ALIASES[key] || [])]);
    return [...new Set(expanded)];
  }

  function lookupColorMap(map, color) {
    if (!map || !color) return null;
    for (const key of colorKeyCandidates(color)) {
      if (Object.prototype.hasOwnProperty.call(map, key)) return map[key];
    }
    return null;
  }

  function getAddonKey() {
    if (activeAddonKeys.size === 0) return '';
    return [...activeAddonKeys].sort().join('');
  }

  function resolveAddonImage(variant) {
    const key = getAddonKey();
    if (key && variant && variant.addonImages && variant.addonImages[key]) {
      return variant.addonImages[key];
    }
    return null;
  }

  function resolveAddonSku(variant) {
    const key = getAddonKey();
    return variant.sku + key;
  }

  function getVariantImage(variantIdx, colorIdx) {
    const variant = stepVariants[variantIdx];
    if (!variant) return null;
    if (colors.length && variant.colorImages) {
      const color = colors[colorIdx];
      const mappedImage = lookupColorMap(variant.colorImages, color);
      if (mappedImage) return mappedImage;
      return variant.image;
    }
    if (colors.length && colors[colorIdx] && colors[colorIdx].image) {
      return colors[colorIdx].image;
    }
    return variant.image;
  }

  function getImageForColor(color) {
    if (stepVariants.length > 0) {
      const img = getVariantImage(activeVariantIdx, activeColorIndex);
      if (img) return img;
    }
    if (wheelsActive && handrailActive && color.imageBoth) return color.imageBoth;
    if (wheelsActive && color.imageWheels) return color.imageWheels;
    if (handrailActive && color.imageHandrail) return color.imageHandrail;
    return color.image;
  }

  function getSkuForColor(colorIdx) {
    const color = colors[colorIdx];
    if (!color) return '';
    if (stepVariants.length > 0) {
      const variant = stepVariants[activeVariantIdx];
      const mappedSku = variant && lookupColorMap(variant.colorSkus, color);
      if (mappedSku) {
        return mappedSku;
      }
    }
    return color.sku || '';
  }

  function buildColorLabel(colorIdx) {
    const color = colors[colorIdx];
    if (!color) return '';
    let label = color.name;
    const sku = getSkuForColor(colorIdx);
    if (sku) label += ` · ${sku}`;
    if (color.ral) label += ` · ${color.ral}`;
    return label;
  }

  function refreshColorLabel() {
    if (colorLabel && colors.length) colorLabel.textContent = buildColorLabel(activeColorIndex);
  }

  function setMainImage(src) {
    const mainImg = mainImageEl.querySelector('img');
    let placeholder = mainImageEl.querySelector('.detail-main-placeholder');
    if (src) {
      if (placeholder) placeholder.remove();
      if (mainImg) {
        mainImg.style.opacity = '0';
        setTimeout(() => { mainImg.src = src; mainImg.style.opacity = '1'; mainImg.style.display = ''; }, 200);
      }
    } else {
      if (mainImg) mainImg.style.display = 'none';
      if (!placeholder) {
        placeholder = document.createElement('div');
        placeholder.className = 'detail-main-placeholder highlight-image-placeholder';
        placeholder.innerHTML = `<span>${ds().imagePending || ''}</span>`;
        mainImageEl.appendChild(placeholder);
      }
    }
  }

  function refreshThumbnailsForVariant(variantIdx) {
    if (!colors.length) return;
    thumbButtons.forEach((btn, i) => {
      const newSrc = getVariantImage(variantIdx, i);
      const img = btn.querySelector('img');
      const ph = btn.querySelector('.detail-thumb-placeholder');
      if (newSrc) {
        if (img) {
          if (img.src !== newSrc) img.src = newSrc;
        } else {
          if (ph) ph.remove();
          const tImg = document.createElement('img');
          tImg.src = newSrc;
          tImg.alt = colors[i].name;
          btn.appendChild(tImg);
        }
      } else {
        if (img) img.remove();
        if (!ph) {
          const newPh = document.createElement('div');
          newPh.className = 'detail-thumb-placeholder highlight-image-placeholder';
          newPh.innerHTML = `<span>${ds().imageMissing || ''}</span>`;
          btn.appendChild(newPh);
        }
      }
    });
  }

  function variantHasColor(variantIdx, colorIdx) {
    const variant = stepVariants[variantIdx];
    if (!variant || !variant.colorImages) return true;
    const color = colors[colorIdx];
    return !!lookupColorMap(variant.colorImages, color);
  }

  function syncColorsForVariant(variantIdx) {
    if (!colors.length || !colorsContainer) return;
    const dots = colorsContainer.querySelectorAll('.detail-color-dot');
    let firstVisible = -1;
    dots.forEach((dot, i) => {
      const has = variantHasColor(variantIdx, i);
      dot.style.display = has ? '' : 'none';
      if (has && firstVisible < 0) firstVisible = i;
    });
    thumbButtons.forEach((t, i) => {
      const has = variantHasColor(variantIdx, i);
      t.style.display = has ? '' : 'none';
    });
    if (!variantHasColor(variantIdx, activeColorIndex) && firstVisible >= 0) {
      selectColor(firstVisible);
    }
  }

  function applyVariant(idx, persist) {
    const variant = stepVariants[idx];
    if (!variant) return;
    if (persist) syncColorsForVariant(idx);
    const addonImg = resolveAddonImage(variant);
    const src = addonImg || (colors.length ? getVariantImage(idx, activeColorIndex) : variant.image);
    setMainImage(src);
    refreshThumbnailsForVariant(idx);
    const displaySku = addons.length > 0 ? resolveAddonSku(variant) : variant.sku;
    if (persist) {
      if (modelEl) modelEl.textContent = displaySku;
      if (dimEl) dimEl.textContent = variant.dimensions;
      if (loadEl && variant.maxLoad) loadEl.textContent = variant.maxLoad;
    }
    if (stepLabel) stepLabel.textContent = displaySku;
    if (colorLabel && colors.length) {
      const tempIdx = activeVariantIdx;
      activeVariantIdx = idx;
      colorLabel.textContent = buildColorLabel(activeColorIndex);
      if (!persist) activeVariantIdx = tempIdx;
    }
  }

  if (gridVariants) initGridVariants();
  else if (stepVariants.length > 0) initStepVariants();
  initOptionProducts();
  initModelFilters();
  if (stepVariants.length > 0 && colors.length) syncColorsForVariant(0);
  if (addons.length > 0) initAddons();

  function initModelFilters() {
    const toggles = document.getElementById('modelFilterToggles');
    const results = document.getElementById('modelFilterResults');
    const clearBtn = document.getElementById('modelFilterClear');
    const summary = document.getElementById('modelFilterSummary');
    if (!toggles || !results) return;

    const filterBtns = Array.from(toggles.querySelectorAll('.model-filter-btn'));
    const cards = Array.from(results.querySelectorAll('.model-result-card'));
    const activeFilters = new Set();

    function updateSummary(visibleCount) {
      if (!summary) return;
      summary.textContent = activeFilters.size
        ? dsFill(ds().filterSummaryMatch, { n: visibleCount })
        : dsFill(ds().filterSummaryAllCount, { n: cards.length });
    }

    function applyFilters() {
      let visibleCount = 0;
      cards.forEach(card => {
        const tags = (card.dataset.tags || '').split(',').filter(Boolean);
        const isVisible = activeFilters.size === 0 || tags.some(tag => activeFilters.has(tag));
        card.classList.toggle('is-hidden', !isVisible);
        if (!isVisible) card.classList.remove('active');
        if (isVisible) visibleCount += 1;
      });
      updateSummary(visibleCount);
      if (clearBtn) clearBtn.hidden = activeFilters.size === 0;
    }

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.filter;
        if (!key) return;
        const isPressed = btn.getAttribute('aria-pressed') === 'true';
        btn.setAttribute('aria-pressed', String(!isPressed));
        btn.classList.toggle('active', !isPressed);
        if (isPressed) activeFilters.delete(key);
        else activeFilters.add(key);
        applyFilters();
      });
    });

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        activeFilters.clear();
        filterBtns.forEach(btn => {
          btn.classList.remove('active');
          btn.setAttribute('aria-pressed', 'false');
        });
        applyFilters();
      });
    }

    cards.forEach(card => {
      card.addEventListener('click', () => {
        if (card.classList.contains('is-hidden')) return;
        cards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');

        const image = card.dataset.image;
        const sku = card.dataset.sku;
        const dimensions = card.dataset.dimensions;
        if (image) setMainImage(image);
        if (sku && modelEl) modelEl.textContent = sku;
        if (dimensions && dimEl) dimEl.textContent = dimensions;
      });
    });

    applyFilters();
  }

  function initAddons() {
    const addonToggles = document.getElementById('addonToggles');
    if (!addonToggles) return;
    addonToggles.querySelectorAll('.addon-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.addon;
        const isPressed = btn.getAttribute('aria-pressed') === 'true';
        btn.setAttribute('aria-pressed', !isPressed);
        btn.classList.toggle('active');
        if (isPressed) activeAddonKeys.delete(key);
        else activeAddonKeys.add(key);
        applyVariant(activeVariantIdx, true);
      });
    });
  }

  function initStepVariants() {
    const toggles = document.getElementById('stepVariantToggles');
    if (!toggles) return;
    const btns = toggles.querySelectorAll('.step-variant-btn');

    btns.forEach(btn => {
      const idx = parseInt(btn.dataset.index);
      btn.addEventListener('mouseenter', () => applyVariant(idx, false));
      btn.addEventListener('mouseleave', () => applyVariant(activeVariantIdx, false));
      btn.addEventListener('click', () => {
        activeVariantIdx = idx;
        btns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        applyVariant(idx, true);
      });
    });
  }

  function initGridVariants() {
    if (!gridVariants) return;
    const table = document.getElementById('gridVariantTable');
    if (!table) return;
    const cells = table.querySelectorAll('.grid-variant-cell');
    const gCells = gridVariants.cells;

    cells.forEach(btn => {
      const cellIdx = parseInt(btn.dataset.index);
      const cell = gCells[cellIdx];
      if (!cell) return;

      btn.addEventListener('mouseenter', () => {
        setMainImage(cell.image);
        if (stepLabel) stepLabel.textContent = cell.sku;
      });
      btn.addEventListener('mouseleave', () => {
        const active = gCells[activeVariantIdx];
        if (active) {
          setMainImage(active.image);
          if (stepLabel) stepLabel.textContent = active.sku;
        }
      });
      btn.addEventListener('click', () => {
        activeVariantIdx = cellIdx;
        cells.forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        setMainImage(cell.image);
        if (stepLabel) stepLabel.textContent = cell.sku;
        if (modelEl) modelEl.textContent = cell.sku;
        if (dimEl) dimEl.textContent = cell.dimensions || '';
        if (loadEl && cell.maxLoad) loadEl.textContent = cell.maxLoad;
      });
    });

    if (gCells[0]) {
      setMainImage(gCells[0].image);
    }
  }

  function initOptionProducts() {
    document.querySelectorAll('[data-option-product]').forEach(section => {
      const mainImg = section.querySelector('[data-option-main-image]');
      const label = section.querySelector('[data-option-active-label]');
      const choices = Array.from(section.querySelectorAll('[data-option-choice]'));

      function selectChoice(choice) {
        const image = choice.dataset.image;
        const text = choice.dataset.label;
        if (mainImg && image) mainImg.src = image;
        if (label && text) label.textContent = text;
        choices.forEach(item => {
          const isActive = item.dataset.image === image;
          item.classList.toggle('active', isActive);
        });
      }

      choices.forEach(choice => {
        choice.addEventListener('mouseenter', () => selectChoice(choice));
        choice.addEventListener('focus', () => selectChoice(choice));
        choice.addEventListener('click', () => selectChoice(choice));
      });
    });
  }

  if (!colors.length && !stepVariants.length) { initAccordions(); return; }
  if (!colors.length) { initAccordions(); return; }

  function selectColor(index) {
    activeColorIndex = index;
    const color = colors[index];
    const src = getImageForColor(color);
    setMainImage(src);

    colorsContainer.querySelectorAll('.detail-color-dot').forEach(d => d.classList.remove('active'));
    colorsContainer.children[index].classList.add('active');

    colorLabel.textContent = buildColorLabel(index);

    thumbButtons.forEach((t, i) => {
      t.classList.toggle('active', i === index);
    });
  }

  colors.forEach((color, i) => {
    const dot = document.createElement('span');
    dot.className = 'detail-color-dot';
    dot.style.backgroundColor = color.hex;
    dot.title = color.name;
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('mouseenter', () => selectColor(i));
    colorsContainer.appendChild(dot);
  });

  colors.forEach((color, i) => {
    const thumbSrc = stepVariants.length > 0
      ? getVariantImage(activeVariantIdx, i)
      : color.image;
    const thumb = document.createElement('button');
    thumb.className = `detail-thumb ${i === 0 ? 'active' : ''}`;
    if (thumbSrc) {
      const tImg = document.createElement('img');
      tImg.src = thumbSrc;
      tImg.alt = color.name;
      thumb.appendChild(tImg);
    } else {
      const ph = document.createElement('div');
      ph.className = 'detail-thumb-placeholder highlight-image-placeholder';
      ph.innerHTML = `<span>${ds().imageMissing || ''}</span>`;
      thumb.appendChild(ph);
    }
    thumb.addEventListener('mouseenter', () => selectColor(i));
    thumbsEl.appendChild(thumb);
    thumbButtons.push(thumb);
  });

  if (colors[0]) {
    colorLabel.textContent = buildColorLabel(0);
  }

  if (hasAccessories) {
    const toggles = document.getElementById('accessoryToggles');
    if (toggles) {
      toggles.querySelectorAll('.accessory-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const acc = btn.dataset.accessory;
          const isPressed = btn.getAttribute('aria-pressed') === 'true';
          btn.setAttribute('aria-pressed', !isPressed);
          btn.classList.toggle('active');
          if (acc === 'wheels') wheelsActive = !isPressed;
          if (acc === 'handrail') handrailActive = !isPressed;
          if (acc === 'both') { wheelsActive = !isPressed; handrailActive = !isPressed; }
          selectColor(activeColorIndex);
        });
      });
    }
  }

  initAccordions();
});

function initAccordions() {
  document.querySelectorAll('.info-accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const body = header.nextElementSibling;
      const isOpen = body.classList.contains('open');
      body.classList.toggle('open');
      header.setAttribute('aria-expanded', !isOpen);
    });
  });
}
