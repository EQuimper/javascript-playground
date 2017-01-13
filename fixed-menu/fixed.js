(function() {
  const scrollY = () => window.pageYOffset;

  const els = document.querySelectorAll('[data-sticky]');

  // make use as global function in the dom
  window.makeSticky = el => {
    let rect = el.getBoundingClientRect();
    const offset = el.getAttribute('data-offset') || 0;
    let constraint;
    if (el.getAttribute('data-constraint')) {
      constraint = document.querySelector(el.getAttribute('data-constraint'));
    } else {
      constraint = document.body
    }
    let constraintRect = constraint.getBoundingClientRect();
    let constraintBottom = constraintRect.top + scrollY() + constraintRect.height - offset - rect.height;
    let top = rect.top + scrollY();
    let fake = document.createElement('div');
    fake.style.width = rect.width + 'px';
    fake.style.height = rect.height + 'px';

    const onScroll = function() {
      if (scrollY() > constraintBottom && el.style.position !== 'absolute') {
        el.style.position = 'absolute';
        el.style.bottom = 0;
        el.style.top = 'auto';
      } else if (scrollY() > top - offset && scrollY() < constraintBottom && el.style.position !== 'fixed') {
        el.classList.add('fixed');
        el.style.position = 'fixed';
        el.style.top = offset + 'px';
        el.style.bottom = 'auto';
        el.style.width = rect.width + 'px';
        el.parentNode.insertBefore(fake, el);
      } else if (scrollY() < top - offset && el.style.position !== 'static') {
        el.classList.remove('fixed');
        el.style.position = 'static';
        if (el.parentNode.contains(fake)) {
          el.parentNode.removeChild(fake);
        }
      }
    };

    const onResize = function() {
      el.style.width = 'auto';
      el.classList.remove('fixed');
      el.style.position = 'static';
      fake.style.diplay = 'none';
      rect = el.getBoundingClientRect();
      constraintRect = constraint.getBoundingClientRect();
      constraintBottom = constraintRect.top + scrollY() + constraintRect.height - offset - rect.height;
      top = rect.top + scrollY();
      fake.style.width = rect.width + 'px';
      fake.style.height = rect.height + 'px';
      fake.style.diplay = 'block';
      onScroll();
    };

    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onResize);
  };

  els.forEach(function(el) {
    makeSticky(el);
  });
})();