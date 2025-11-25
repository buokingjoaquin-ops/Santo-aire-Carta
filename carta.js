/****************************************************
 *  FILTRO GENERAL (vegano, sin gluten, etc.)
 ****************************************************/
document.addEventListener('DOMContentLoaded', function () {
  const select = document.getElementById('diet-filter');
  if (!select) return;

  // Todos los platos
  const items = document.querySelectorAll('.item');

  // Secciones grandes (Cocktail, Tapas, Platos fríos, Carnes, Vinos, etc.)
  const mainSections = document.querySelectorAll('.carta-section');

  // Subcategorías internas (Platos fríos, Platos calientes, Sopas, etc.)
  const subSections = document.querySelectorAll('.subsection');

  function aplicarFiltro() {
    const valor = (select.value || 'todas').toLowerCase();

    // 1) Mostrar / ocultar platos según la dieta
    items.forEach(item => {
      const dietAttr = (item.getAttribute('data-diet') || '').toLowerCase();

      if (valor === 'todas' || dietAttr.includes(valor)) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });

    // 2) Ocultar subcategorías sin platos visibles
    subSections.forEach(sub => {
      const visibles = sub.querySelectorAll('.item:not(.hidden)');
      sub.classList.toggle('section-hidden', visibles.length === 0);
    });

    // 3) Ocultar secciones grandes sin NINGÚN plato visible dentro
    mainSections.forEach(section => {
      const visiblesDentro = section.querySelectorAll('.item:not(.hidden)');
      section.classList.toggle('section-hidden', visiblesDentro.length === 0);
    });
  }

  select.addEventListener('change', aplicarFiltro);
  aplicarFiltro();
});









/****************************************************
 *  NAV BAR FIJA AL SCROLL
 ****************************************************/
const fixedNav = document.getElementById("cartaNavFixed");
window.addEventListener("scroll", () => {
  fixedNav.classList.toggle("active", window.scrollY > 350);
});


/****************************************************
 *  SUBFILTROS — COCTELERÍA
 ****************************************************/
document.querySelectorAll('[data-subfilter-container]').forEach(container => {
  const groupName = container.dataset.subfilterContainer; // "cocteles", etc.
  const items = document.querySelectorAll(`.item[data-group="${groupName}"]`);
  const categorySections = document.querySelectorAll(`.coctel-cat[data-group="${groupName}"]`);

  container.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-subfilter]');
    if (!btn) return;

    const value = btn.dataset.subfilter;

    container.querySelectorAll('[data-subfilter]').forEach(b =>
      b.classList.remove('is-active')
    );
    btn.classList.add('is-active');

    items.forEach(item => {
      const cats = (item.dataset.subcategory || '').split(' ');
      const match = (value === 'all') || cats.includes(value);
      item.style.display = match ? '' : 'none';
    });

    if (categorySections.length) {
      categorySections.forEach(sec => {
        const secCat = sec.dataset.subcategory || '';
        const visible = (value === 'all') || (secCat === value);
        sec.style.display = visible ? '' : 'none';
      });
    }
  });
});



/****************************************************
 *  SUBFILTROS — VINOS
 ****************************************************/
document.addEventListener('DOMContentLoaded', function () {
  const vinoChips = document.querySelectorAll('.subcat-chip[data-group="vinos"]');
  const vinoSections = document.querySelectorAll('.wine-section[data-group="vinos"]');
  const vinoItems = document.querySelectorAll('.item[data-group="vinos"]');

  vinoChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const filter = chip.dataset.filter.toLowerCase();

      vinoChips.forEach(c => c.classList.remove('is-active'));
      chip.classList.add('is-active');

      // SECCIONES COMPLETAS
      vinoSections.forEach(section => {
        const secCat = (section.dataset.subcategory || '').toLowerCase();
        section.style.display = (filter === 'all' || secCat === filter) ? '' : 'none';
      });

      // ITEMS DENTRO DE LAS SECCIONES
      vinoItems.forEach(item => {
        const itemCat = (item.dataset.subcategory || '').toLowerCase();
        item.style.display = (filter === 'all' || itemCat.includes(filter)) ? '' : 'none';
      });
    });
  });
});



/****************************************************
 * Header móvil
 ****************************************************/


document.addEventListener('DOMContentLoaded', function () {
  const miniHeader = document.getElementById('miniHeaderBar');

  function aplicarSticky() {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const y = window.scrollY || window.pageYOffset;

    if (isMobile && y > 120) {
      // SOLO EN MÓVIL se activa el modo sticky sin botón de reservas
      document.body.classList.add('is-sticky');
      if (siteHeader) {
        siteHeader.classList.add('is-hidden');
      }
    } else {
      // En escritorio, o cuando vuelves arriba, todo vuelve a la normalidad
      document.body.classList.remove('is-sticky');
      if (siteHeader) {
        siteHeader.classList.remove('is-hidden');
      }
    }
  }

  window.addEventListener('scroll', aplicarSticky);
  window.addEventListener('resize', aplicarSticky);
  aplicarSticky();
});



