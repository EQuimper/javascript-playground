/*
* When button is click in class .spoiler
  * Add class .visible to the next element
  * Hide the button
 */
(function () {
  const spoilerEls = document.querySelectorAll('.spoiler');

  const createSpoilerButton = function (el) {
    // we create the span with the class .spoiler-content
    const span = document.createElement('span');
    // use className cause no class before
    span.className = 'spoiler-content';
    span.innerHTML = el.innerHTML;
    // we create the button
    const button = document.createElement('button');
    button.textContent = 'Show spoiler';
    // add element to the dom
    el.innerHTML = '';
    el.appendChild(button);
    el.appendChild(span);
    // listener
    button.addEventListener('click', function () {
      console.log(this);
      this.parentNode.removeChild(this);
      // use classList cause class already exist
      span.classList.add('visible');
    });
  };

  spoilerEls.forEach(function(el) {
    createSpoilerButton(el);
  });
})();