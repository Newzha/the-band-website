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

addLoadEvent(highlightPage);
