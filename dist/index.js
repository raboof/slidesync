const vimeo = document.querySelector('#vimeo');

let length = 0
let numberOfSslides;

var player = new Vimeo.Player(vimeo);
player.getDuration().then(function(duration) {
  console.log('got duration', duration)
  length = duration
  Array.from(document.querySelectorAll('.slide-container img')).forEach((el, index) => {
     el.addEventListener('click', function(evt) {
      console.log('Clicked', index);
      seekToSlide(index);
      numberOfSslides = index;
    });
  })
})
player.play()

function seekToSlide(n) {
  var target = length * n / numberOfSslides;
  console.log('seeking to', target);
  player.setCurrentTime(target)
}