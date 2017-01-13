(function() {
  /*
  When click on tabs
    * We removed the class active on the tabs
    * Add class active on active tabs
    * We removed the class active on tab-content active
    * We add class active on tab-content active
  */
  const showTabs = function(a, animations) {
    if (animations === undefined) {
      animations = true;
    }
    const li = a.parentNode;
    const div = a.parentNode.parentNode.parentNode;
    // Content active
    const activeTab = div.querySelector('.tab-content.active');
    // Content to show
    const toShow = div.querySelector(a.getAttribute('href'));

    if (li.classList.contains('active')) {
      return;
    }
    // We removed the class active on the tabs
    div.querySelector('.tabs .active').classList.remove('active');
    // Add class active on active tabs
    li.classList.add('active');
    // We removed the class active on tab-content active
    // div.querySelector('.tab-content.active').classList.remove('active');
    // We add class active on tab-content active
    // div.querySelector(a.getAttribute('href')).classList.add('active');
    if (animations) {
      activeTab.classList.add('fade');
      activeTab.classList.remove('in');

      const transitionEnd = function() {
        // Add class fade on active element
        // At the end of the animation we remove class fade & active
        //    We remove class fade & active
        //    Add active class active & fade to the element need to show
        //    Add class in
        this.classList.remove('fade');
        this.classList.remove('active');
        toShow.classList.add('active');
        toShow.classList.add('fade');
        // Here we just hack the browser for get a small pause
        toShow.offsetWidth;
        toShow.classList.add('in');
        activeTab.removeEventListener('transitionend', transitionEnd);
      };

      activeTab.addEventListener('transitionend', transitionEnd);
    } else {
      toShow.classList.add('active');
      activeTab.classList.remove('active');
    }
  };

  const tabs = document.querySelectorAll('.tabs a');

  tabs.forEach(function(tab) {
    tab.addEventListener('click', function(e) {
      showTabs(this);
    });
  });
  /*
    * We take the hash from the window object
    * Add class active sur anchor with href = hash
      Remove active all other anchor
    * Show / Hide good content
  */
  const hashChange = function(e) {
     // We take the hash from the window object
    const hash = window.location.hash;
    // Find the right anchor with the hash
    const a = document.querySelector(`a[href="${hash}"]`);

    if (a !== null && !a.parentNode.classList.contains('active')) {
      showTabs(a, e !== undefined);
    }
  };

  window.addEventListener('hashchange', hashChange);
  hashChange();
})();