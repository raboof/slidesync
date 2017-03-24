const vimeo = document.querySelector('#vimeo');

var length = 0
const n_slides = 57

var player = new Vimeo.Player(vimeo);
player.getDuration().then(function(duration) {
  console.log('got duration', duration)
  length = duration
  const images = document.querySelectorAll('.slide-container img')
  for (var i = 0; i < images.length; i++) {
    const j = i;
    images[i].addEventListener('click', function(evt) {
      console.log('Clicked', j)
      seekToSlide(j);
    })
  }
})
player.play()

function seekToSlide(n) {
  var target = length * n / n_slides
  console.log('seeking to', target)
  player.setCurrentTime(target)
}
