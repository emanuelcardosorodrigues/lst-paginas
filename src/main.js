/* ============================================================
   FAQ ACCORDION
   ============================================================ */
function initAccordion() {
  const accordion = document.getElementById('faq-accordion')
  if (!accordion) return

  accordion.addEventListener('click', (e) => {
    const trigger = e.target.closest('.accordion__trigger')
    if (!trigger) return

    const item = trigger.closest('.accordion__item')
    const panel = item.querySelector('.accordion__panel')
    const isOpen = item.classList.contains('is-open')

    // Close all open items
    accordion.querySelectorAll('.accordion__item.is-open').forEach((openItem) => {
      openItem.classList.remove('is-open')
      openItem.querySelector('.accordion__trigger').setAttribute('aria-expanded', 'false')
      const openPanel = openItem.querySelector('.accordion__panel')
      openPanel.style.maxHeight = '0'
    })

    // If the clicked one was closed, open it
    if (!isOpen) {
      item.classList.add('is-open')
      trigger.setAttribute('aria-expanded', 'true')
      const inner = panel.querySelector('.accordion__panel-inner')
      panel.style.maxHeight = inner.scrollHeight + 'px'
    }
  })
}

/* ============================================================
   SMOOTH SCROLL for internal links
   ============================================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'))
      if (!target) return
      e.preventDefault()
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  })
}

/* ============================================================
   STICKY CTA — shows floating CTA after hero scrolls out
   ============================================================ */
function initStickyCTA() {
  const hero = document.querySelector('.hero')
  if (!hero) return

  const bar = document.createElement('div')
  bar.className = 'sticky-cta'
  bar.innerHTML = `
    <a href="https://pay.hotmart.com/V103826709U?off=vju7un99&checkoutMode=10&split=11&offDiscount=ESPECIALDPL&bid=1775611955624" target="_blank" rel="noopener" class="btn-cta">GARANTIR MEU ACESSO — R$ 67,04</a>
  `
  document.body.appendChild(bar)

  const style = document.createElement('style')
  style.textContent = `
    .sticky-cta {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(6, 26, 61, 0.96);
      backdrop-filter: blur(12px);
      border-top: 1px solid rgba(120,160,255,0.18);
      padding: 12px 20px;
      display: flex;
      justify-content: center;
      z-index: 999;
      transform: translateY(100%);
      transition: transform 0.35s ease;
    }
    .sticky-cta.is-visible { transform: translateY(0); }
    .sticky-cta .btn-cta {
      margin: 0;
      font-size: clamp(14px, 2.5vw, 17px);
      padding: 14px clamp(24px, 5vw, 40px);
    }
  `
  document.head.appendChild(style)

  const observer = new IntersectionObserver(
    ([entry]) => {
      bar.classList.toggle('is-visible', !entry.isIntersecting)
    },
    { threshold: 0 }
  )

  observer.observe(hero)
}

/* ============================================================
   WRAP accordion panel content on init
   ============================================================ */
function wrapAccordionPanels() {
  document.querySelectorAll('.accordion__panel').forEach((panel) => {
    const inner = document.createElement('div')
    inner.className = 'accordion__panel-inner'
    while (panel.firstChild) inner.appendChild(panel.firstChild)
    panel.appendChild(inner)
    panel.style.maxHeight = '0'
  })
}

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  wrapAccordionPanels()
  initAccordion()
  initSmoothScroll()
  initStickyCTA()
})
