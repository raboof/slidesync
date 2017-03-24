page = require('webpage').create();
page.viewportSize = {
  width: 1600,
  height: 1200
};

function renderPages(page, pagenr) {
  page.render('slide' + pagenr + '.png');
  if (page.evaluate(function(){return Reveal.isLastSlide();})) {
    phantom.exit();
  } else {
    page.evaluateJavaScript('Reveal.next()');
    setTimeout(function() { 
      renderPages(page, pagenr + 1);
    }, 400);
  }
}

page.open('http://slides.com/sdrasner/generateny/embed?postMessageEvents=true', function() {
  page.evaluate(function(){Reveal.configure({controls: false, transition: 'none'})});
  page.evaluateJavaScript('Reveal.configure({fragments: false})');
  setTimeout(function() { 
    renderPages(page, 1);
  }, 1500);
})
