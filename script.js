(function () {
  'use strict';

  // Menu data: exactly as supplied in the restaurant's menu file.
  var MENU = [
    ['Chicken', [['Kadai Chicken', 14], ['Afghani Chicken', 14], ['Dum Ka Chicken', 14], ['Butter Chicken', 14], ['Black Pepper Chicken', 14], ['Talawa Chicken', 12]]],
    ['Sea Food', [['Fish Tikka', 15], ['Fish Fry', 15], ['Shrimp Black Pepper Lemon', 18], ['Shrimp Masala Fry', 18]]],
    ['Soup', [['Maragh', 20], ['Paya', 15]]],
    ['Rice', [['Chicken Mandi', 17.99], ['Mutton Zaffrani Biryani', 20], ['Fish Mandi', 22.99], ['Mutton Mandi', 24.99], ['Zaffrani Chicken Biryani', 15], ['Plain Rice', 3.99], ['Zeera Rice', 7.99]]],
    ['Appetizers', [['Chicken Tikka', 10], ['Majestic Chicken', 13.99], ['Lamb Chops', 20], ['Chicken 65', 13.99], ['BBQ Platter', 25], ['Tandoori Chicken (Leg & Thigh) 2pcs', 13.99], ['Sheekh Kabab (Per Pc)', 3], ['Chicken Pakoda', 10]]],
    ['Veg', [['Khatti Dal', 6.99], ['Bhindi Masala', 10], ['Palak Paneer', 14], ['Dal Fry', 10], ['Paneer Tikka Masala', 15]]],
    ['Naan', [['Plain Naan', 2.25], ['Tawa Roti', 2.25], ['Butter Naan', 2.25], ['Garlic Naan', 2.99]]],
    ['Desserts', [['Apricot Delight (Special)', 7], ['Fruit Delight', 7], ['Rasmalai', 5], ['Gulab Jamun', 5]]],
    ['Drinks', [['Water', 2], ['Tea', 2], ['Coffee', 2], ['Mango Lassi', 4], ['Coke', 2], ['Thumbs Up', 2.99]]]
  ];

  var list = document.getElementById('menu-list');
  var tabs = document.getElementById('tabs');
  var slug = function (s) { return s.toLowerCase().replace(/\W+/g, '-'); };

  MENU.forEach(function (cat) {
    var a = document.createElement('a');
    a.href = '#' + slug(cat[0]);
    a.textContent = cat[0];
    tabs.appendChild(a);

    var sec = document.createElement('section');
    sec.id = slug(cat[0]);
    sec.className = 'cat';
    var h = document.createElement('h3');
    h.textContent = cat[0];
    var ul = document.createElement('ul');

    cat[1].forEach(function (item) {
      var li = document.createElement('li');
      var name = document.createElement('span');
      var dots = document.createElement('i');
      var price = document.createElement('b');
      name.textContent = item[0];
      price.textContent = '$' + item[1].toFixed(2);
      li.append(name, dots, price);
      ul.appendChild(li);
    });

    sec.append(h, ul);
    list.appendChild(sec);
  });

  // Highlight the category currently in view
  var links = Array.prototype.slice.call(tabs.children);
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (l) { l.classList.toggle('on', l.hash === '#' + e.target.id); });
        var on = tabs.querySelector('.on');
        if (on) tabs.scrollTo({ left: on.offsetLeft - 20, behavior: reduce ? 'auto' : 'smooth' });
      });
    }, { rootMargin: '-35% 0px -55% 0px' });
    document.querySelectorAll('.cat').forEach(function (s) { io.observe(s); });
  }

  // Mobile navigation
  var btn = document.querySelector('.burger');
  var nav = document.getElementById('nav');
  function setNav(open) {
    nav.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
  }
  btn.addEventListener('click', function () { setNav(!nav.classList.contains('open')); });
  nav.addEventListener('click', function (e) { if (e.target.closest('a')) setNav(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setNav(false); });
})();
