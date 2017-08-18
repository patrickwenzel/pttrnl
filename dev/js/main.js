// off canvas menu
var o,
OffCanvas = {

  settings: {
    over: document.getElementById("wrapper"),
    menu: document.getElementsByClassName("menu-button")[0]
  },

  init: function() {
    o = this.settings;
    this.showMenu();
    this.closeWrap();
  },

  showMenu: function() {
    o.menu.onclick = function(e) {
      this.classList.toggle('active');
      o.over.classList.toggle("wrp--ovr");
      e.stopPropagation();
    }
  },

  closeWrap: function() {
    o.over.onclick = function(e) {
      this.classList.remove("wrp--ovr");
      o.menu.classList.remove('active');
      e.stopPropagation();
    }
  }

};

var s,
Scroll = {

  settings: {
  },

  init: function() {
    s = this.settings;
    this.scrollToo();
  },

  scrollToo: function() {

    function goscroll(element, to, duration) {
      if(duration <= 0) return;
      difference = to - (element.scrollTop + 120);
      tick = difference / duration * 10;
      setTimeout(function() {
        element.scrollTop = element.scrollTop + tick;
        if (element.scrollTop == to) return;
        goscroll(element, to, duration - 10);
      }, 0);
      return false;
    }

    // hash scroll variables
    var loc = window.location.hash;
    var clean = loc.replace("#", "");
    if(loc) {
      var goto = document.getElementById("pttr-" + clean);
      var pos = goto.offsetTop;
    } else {
      var goto;
      var pos;
    }

    // onload scroll to
    if(loc) {
      window.onload = function(e) {
        if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
          /* fix for firefox issue */
          goscroll(document.documentElement, pos, 200);
        } else {
          /* for everything else */
          goscroll(document.body, pos, 200);
        }
        e.stopPropagation();
      }
    }

    // off canvas
    var offitem = document.querySelectorAll(".side-nav ul > li");
    var offtotal = offitem.length;

    for (var y = 0; y < offtotal; y++) {
      var subtotal = offitem[y].getElementsByTagName('ul').length;
      if (subtotal > 0) {
        offitem[y].classList.add("children");
      }
      offitem[y].onclick = function(ev) {
        ev.stopPropagation();
        if (ev.target == ev.currentTarget) {
          if (this.children.length > 0) {
            this.classList.toggle("active");
            this.children[1].classList.toggle("open");
            ev.stopPropagation();
          }
        }
        var link = ev.target.getAttribute("href");
        var clean = link.replace("#", "");
        var goTo = document.getElementById("pttr-" + clean);
        var pos = goTo.offsetTop;
        if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
          goscroll(document.documentElement, pos, 200);
        } else {
          goscroll(document.body, pos, 200);
        }
      }
    }

    // scroll location
    var location = document.querySelectorAll('[id^="pttr-"]');
    var loclength = location.length;
    var links = document.querySelectorAll(".side-nav li > a");
    var timer;

    window.onscroll = function(e) {
      if(timer) {
        window.clearTimeout(timer);
      }
      // timeout fix for browser lag issue
      timer = window.setTimeout(function() {
        for(var x = 0; x < loclength; x++) {
          var pttr_id = location[x].id.replace('pttr-','');
          var pttr_top = location[x].offsetTop;
          // update hash
          if (pttr_top < window.pageYOffset + 124 && pttr_top + location[x].offsetHeight + 124) {
            window.location.hash = pttr_id;
          }
          // add class on current href
          if(links[x].getAttribute('href') == window.location.hash) {
            var current = document.querySelector(".current");
            if(current !== null) {
              current.classList.remove("current");
              current.parentElement.parentNode.classList.remove('open');
              current.parentElement.parentNode.parentNode.classList.remove('active');
            }
            links[x].classList.add('current');
            links[x].parentElement.parentNode.classList.add('open');
            links[x].parentElement.parentNode.parentNode.classList.add('active');
          }
        }
      }, 100);
    }

  }

};

var c,
Code = {

  settings: {
    btn: document.getElementsByClassName("code-btn"),
  },

  init: function() {
    c = this.settings;
    this.showCode();
  },

  showCode: function() {
    total = c.btn.length;
    for (var i = 0; i < total; i++) {
      c.btn[i].onclick = function(e) {
        this.classList.toggle("show");
        e.stopPropagation();
      }
    }
  }

};

(function() {
  OffCanvas.init();
  Scroll.init();
  Code.init();
})();
