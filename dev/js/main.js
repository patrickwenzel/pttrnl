(function() {
  OffCanvas();
  OffCanvasNav();
  Code();
  scrollStart();
  ScrollLoc();
})();

// off canvas menu
function OffCanvas() {
  var over = document.getElementById("wrapper");
  var menu = document.getElementsByClassName("menu-button")[0];
  menu.onclick = function(e) {
    this.classList.toggle('active');
    over.classList.toggle("wrp--ovr");
    e.stopPropagation();
  }
  over.onclick = function(e) {
    this.classList.remove("wrp--ovr");
    menu.classList.remove('active');
    e.stopPropagation();
  }

}

// scrollto pattern
function scrollTo(element, to, duration) {
    if (duration <= 0) return;
    var difference = to - (element.scrollTop + 120);
    var perTick = difference / duration * 10;
    setTimeout(function() {
      element.scrollTop = element.scrollTop + perTick;
      if (element.scrollTop === to) return;
      scrollTo(element, to, duration - 10);
    }, 0);
    return false;
}

// scrollto on start
function scrollStart() {
  if(window.location.hash) {
    var loc = window.location.hash;
    var clean = loc.replace("#", "");
    var goTo = document.getElementById("pttr-" + clean);
    var pos = goTo.offsetTop;
    window.onload = function(e) {
      if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
        /* fix for firefox issue */
        scrollTo(document.documentElement, pos, 200);
      } else {
        /* for everything else */
        scrollTo(document.body, pos, 200);
      }
      e.stopPropagation();
    }
  }
}

// off canvas nav
function OffCanvasNav() {
  var offitem = document.querySelectorAll(".side-nav ul > li");
  var offtotal = offitem.length;
  for (var y = 0; y < offtotal; y++) {
    var subtotal = offitem[y].getElementsByTagName('ul').length;
    if (subtotal > 0) {
      offitem[y].classList.add("children");
    }
    offitem[y].onclick = function(e) {
      e.preventDefault();
      if (e.target == e.currentTarget) {
        if (this.children.length > 0) {
          this.classList.toggle("active");
          this.children[1].classList.toggle("open");
          e.stopPropagation();
        }
      }
      // scroll to hash
      var link = e.target.getAttribute("href");
      var clean = link.replace("#", "");
      var goTo = document.getElementById("pttr-" + clean);
      var pos = goTo.offsetTop;

      if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
        /* fix for firefox issue */
        scrollTo(document.documentElement, pos, 200);
      } else {
        /* for everything else */
        scrollTo(document.body, pos, 200);
      }
    }
  }
}

function ScrollLoc() {
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

function Code() {
  var code_btn = document.getElementsByClassName("code-btn");
  var ctotal = code_btn.length;
  for (var i = 0; i < ctotal; i++) {
    code_btn[i].onclick = function(e) {
      this.classList.toggle("show");
      e.stopPropagation();
    }
  }
}
