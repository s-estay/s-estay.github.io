document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('[data-table-row-count]');

  counters.forEach((counter) => {
    const heading = counter.closest('h1, h2, h3, h4, h5, h6');
    if (!heading) {
      return;
    }

    // Find the first table that follows the heading.
    let table = heading.nextElementSibling;
    while (table && table.tagName !== 'TABLE') {
      table = table.nextElementSibling;
    }
    if (!table) {
      return;
    }

    // Data rows: all rows minus the header row(s).
    let rows;
    if (table.tBodies.length > 0) {
      rows = Array.from(table.tBodies).reduce(
        (total, tbody) => total + tbody.rows.length,
        0
      );
    } else {
      rows = Math.max(table.rows.length - 1, 0);
    }

    counter.textContent = `(${rows})`;
  });
});
