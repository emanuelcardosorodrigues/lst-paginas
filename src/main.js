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
})

