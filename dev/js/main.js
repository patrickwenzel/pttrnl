(function() {
  OffCanvas();
  OffCanvasNav();
  Code();
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
      if (e.target == e.currentTarget) {
        if (this.children.length > 0) {
          this.classList.toggle("active");
          this.children[1].classList.toggle("open");
          e.stopPropagation();
        }
      }

      // add current class
      /*var current = document.querySelector(".current");
      if(current !== null) {
        current.classList.remove("current");
      }
      this.classList.add("current");*/

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

      e.stopPropagation();
    }
  }
}

// code
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
