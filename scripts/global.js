// global for The Band Website

function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof oldonload !== 'function') {
    window.onload = func;
  } else {
    oldonload();
    func();
  }
}

function insertAfter(newElement, targetElement) {
  var parent = targetElement.parentNode;
  if (parent.lastChild == targetElement) {
    parent.insertBefore(newElement);
  } else {
    parent.insertBefore(newElement, targetElement.nextSibling);
  }
}

function addClass(element, value) {
  if (!element.className) {
    element.className = value;
  } else {
    newClassName = element.className;
    newClassName += " ";
    newClassName += value;
    element.className = newClassName;
  }
}

function highlightPage() {
  if (!document.getElementById || !document.getElementsByTagName) {
    return false
  }
  var headers = document.getElementsByTagName('header');
  if (headers.length === 0) { return false }
  var navs = headers[0].getElementsByTagName('nav');
  if (navs.length === 0 ) { return false }
  var links = navs[0].getElementsByTagName('a');
  var linkurl;
  for (var i = 0; i < links.length; i++) {
    linkurl = links[i].getAttribute('href');
    if (window.location.href.indexOf(linkurl) !== -1) {
      addClass(links[i], 'here');
      var linktext = links[i].lastChild.nodeValue.toLocaleLowerCase();
      document.body.setAttribute('id', linktext)
    }
    
  }
}

function moveElement(elementId, final_x, final_y, interval) {
  if (!document.getElementById) { return false; }
  if (!document.getElementById(elementId)) { return false; }
  var elem = document.getElementById(elementId)
  if (elem.movement) {
    clearTimeout(elem.movement);
  }
  if (!elem.style.left) {
    elem.style.left = '0px';
  }
  if (!elem.style.top) {
    elem.style.top = '0px';
  }
  var xpos = parseInt(elem.style.left);
  var ypos = parseInt(elem.style.top);
  if (xpos == final_x && ypos == final_y) {
    return true
  }
  if (xpos < final_x) {
    var dist = Math.ceil((final_x - xpos)/10);
    xpos = xpos + dist;
  }
  if (xpos > final_x) {
    var dist = Math.ceil((xpos - final_x)/10);
    xpos = xpos - dist;
  }
  if (ypos < final_y) {
    var dist = Math.ceil((final_y - ypos)/10);
    ypos = ypos + dist;
  }
  if (ypos > final_y) {
    var dist = Math.ceil((ypos - final_y)/10);
    ypos = ypos - dist;
  }
  elem.style.left = xpos + 'px';
  elem.style.top = ypos + 'px';
  var repeat = moveElement(elementId, final_x, final_y, interval);
  elem.movement = setTimeout(repeat, interval);
}

addLoadEvent(highlightPage);
