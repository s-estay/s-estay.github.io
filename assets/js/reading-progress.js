document.addEventListener('DOMContentLoaded', () => {
  const widgets = document.querySelectorAll('[data-count-linked-books="true"]');

  widgets.forEach((widget) => {
    const goal = Number(widget.getAttribute('data-goal')) || 16;
    const container = widget.closest('.blog-entry-container');
    if (!container) {
      return;
    }

    // Count books as list items that include at least one link.
    const completed = Array.from(container.querySelectorAll('li')).filter(
      (item) => item.querySelector('a[href]')
    ).length;
    const capped = Math.min(completed, goal);

    const currentEl = widget.querySelector('.reading-progress-current');
    const goalEl = widget.querySelector('.reading-progress-goal');
    const trackEl = widget.querySelector('.reading-progress-track');

    if (currentEl) {
      currentEl.textContent = String(completed);
    }
    if (goalEl) {
      goalEl.textContent = String(goal);
    }

    if (trackEl) {
      // Build one discrete pixel block per book.
      const fragment = document.createDocumentFragment();
      for (let i = 0; i < goal; i++) {
        const segment = document.createElement('div');
        segment.className = 'reading-progress-segment';
        segment.style.setProperty('--seg-index', String(i));
        if (i < capped) {
          segment.classList.add('is-filled');
        }
        fragment.appendChild(segment);
      }
      trackEl.appendChild(fragment);
    }
  });
});
