const MOBILE_MAX = 980;
const SLIDE_SCROLL = 800;

const initScrollControls = () => {
  const icon = document.querySelector('.scroll-icon');
  const topButton = document.querySelector('.scroll-top');
  if (!icon || !topButton) return;

  const delay = 500;
  const step = 100;
  let remaining = delay;

  window.setInterval(() => {
    if (remaining > 0) remaining = Math.max(0, remaining - step);
    icon.classList.toggle('is-scrolling', remaining > 0);
  }, step);

  const atEnd = () =>
    window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 1;

  const render = () => {
    const end = atEnd();
    const mobile = window.innerWidth <= MOBILE_MAX;
    if (end) icon.style.display = 'none';
    else icon.style.removeProperty('display');
    topButton.style.display = end && !mobile ? 'flex' : 'none';
  };

  icon.addEventListener('click', () => {
    window.scrollBy({ top: 1000, behavior: 'smooth' });
  });

  topButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener(
    'scroll',
    () => {
      remaining = delay;
      icon.classList.add('is-scrolling');
      render();
    },
    { passive: true }
  );
  window.addEventListener('resize', render);
  render();
};

const initDesktopSlider = () => {
  const root = document.querySelector('[data-desktop-slider]');
  if (!root) return;

  const spacer = root.querySelector('[data-pin-spacer]');
  const pin = root.querySelector('[data-pin]');
  const subtitle = root.querySelector('[data-subtitle]');
  const slides = [...root.querySelectorAll('[data-slide]')];
  const count = slides.length;
  const distance = count * SLIDE_SCROLL;
  const presentations = slides.map((slide) => slide.dataset.presentation || '');
  const mobileQuery = window.matchMedia(`(max-width: ${MOBILE_MAX}px)`);

  if (!spacer || !pin || count === 0) return;

  spacer.style.position = 'relative';
  pin.style.width = '100%';
  pin.style.height = '100vh';

  const applyProgress = (progress) => {
    const p = Math.min(1, Math.max(0, progress));
    let active = 0;

    slides.forEach((slide, i) => {
      if (i === 0) {
        slide.style.removeProperty('transform');
        slide.style.removeProperty('opacity');
        return;
      }
      const local = p * count - i;
      const t = Math.min(1, Math.max(0, local));
      slide.style.transform = `translate(${100 * (1 - t)}%, 0%)`;
      slide.style.opacity = String(t);
      if (local > 0) active = i;
    });

    slides.forEach((slide, i) => {
      let z = i;
      if (i === active) z = 99;
      else if (i > active) z = -i;
      slide.style.zIndex = String(z);
      slide.classList.toggle('active', i === active);
    });

    if (subtitle) subtitle.textContent = presentations[active] || '';
  };

  const update = () => {
    if (mobileQuery.matches) {
      pin.style.position = '';
      pin.style.top = '';
      pin.style.left = '';
      return;
    }

    const start = spacer.getBoundingClientRect().top + window.scrollY;
    const y = window.scrollY;

    if (y < start) {
      pin.style.position = 'relative';
      pin.style.top = '0px';
      pin.style.left = '0px';
      pin.style.width = '100%';
      applyProgress(0);
      return;
    }

    if (y >= start + distance) {
      pin.style.position = 'absolute';
      pin.style.top = `${distance}px`;
      pin.style.left = '0px';
      pin.style.width = '100%';
      applyProgress(1);
      return;
    }

    pin.style.position = 'fixed';
    pin.style.top = '0px';
    pin.style.left = '0px';
    pin.style.width = '100%';
    applyProgress((y - start) / distance);
  };

  let frame = 0;
  const requestUpdate = () => {
    if (frame) return;
    frame = window.requestAnimationFrame(() => {
      frame = 0;
      update();
    });
  };

  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);
  mobileQuery.addEventListener('change', requestUpdate);
  update();
};

const initMobileSlider = () => {
  const root = document.querySelector('[data-mobile-slider]');
  if (!root) return;

  const list = root.querySelector('.slick-list');
  const track = root.querySelector('.slick-track');
  const prev = root.querySelector('.slick-prev');
  const next = root.querySelector('.slick-next');
  if (!list || !track || !prev || !next) return;

  const originals = [...track.querySelectorAll('.mobile-slide')];
  const count = originals.length;
  if (count === 0) return;

  const firstClone = originals[0].cloneNode(true);
  const lastClone = originals[count - 1].cloneNode(true);
  firstClone.setAttribute('aria-hidden', 'true');
  lastClone.setAttribute('aria-hidden', 'true');
  track.insertBefore(lastClone, originals[0]);
  track.appendChild(firstClone);

  root.querySelectorAll('img').forEach((img) => {
    img.draggable = false;
  });

  const slides = [...track.querySelectorAll('.mobile-slide')];
  const dots = [...root.querySelectorAll('.slick-dots li')];
  let current = 1;
  let width = 0;
  let dragging = false;
  let startX = 0;
  let delta = 0;

  const setTransition = (on) => {
    track.style.transition = on ? 'transform 500ms ease' : 'none';
  };

  const move = (animate) => {
    width = list.clientWidth;
    if (!width) return;
    slides.forEach((slide, i) => {
      slide.style.left = `${i * width}px`;
    });
    setTransition(animate);
    track.style.transform = `translate3d(${-current * width}px, 0, 0)`;
    const active = (current - 1 + count) % count;
    dots.forEach((dot, i) => dot.classList.toggle('slick-active', i === active));
  };

  const go = (index) => {
    current = index;
    move(true);
  };

  track.addEventListener('transitionend', (event) => {
    if (event.target !== track || event.propertyName !== 'transform') return;
    if (current === 0) {
      current = count;
      move(false);
    } else if (current === count + 1) {
      current = 1;
      move(false);
    }
  });

  next.addEventListener('click', () => go(current + 1));
  prev.addEventListener('click', () => go(current - 1));
  dots.forEach((dot, i) => {
    dot.querySelector('button')?.addEventListener('click', () => go(i + 1));
  });

  list.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    dragging = true;
    startX = event.clientX;
    delta = 0;
    setTransition(false);
    list.setPointerCapture?.(event.pointerId);
  });

  list.addEventListener('pointermove', (event) => {
    if (!dragging || !width) return;
    delta = event.clientX - startX;
    track.style.transform = `translate3d(${-current * width + delta}px, 0, 0)`;
  });

  const endDrag = () => {
    if (!dragging) return;
    dragging = false;
    if (width && Math.abs(delta) > width / 5) go(current + (delta < 0 ? 1 : -1));
    else move(true);
    delta = 0;
  };

  list.addEventListener('pointerup', endDrag);
  list.addEventListener('pointercancel', endDrag);
  window.addEventListener('resize', () => move(false));
  move(false);
};

if (!window.__portfolioInit) {
  window.__portfolioInit = true;
  initScrollControls();
  initDesktopSlider();
  initMobileSlider();
}
