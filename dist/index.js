const vimeo = document.querySelector('#vimeo');

var length = 0
const n_slides = 57

const known_points = [
  [0, 49],
  [1, (1 * 60) + 39],
  [4, (2 * 60) + 8],
  [29, (27 * 60) + 35],
  [63, (49 * 60) + 50]
]

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

function pre(slidenr) {
  var current = [0, 0];
  for (var i = 0; i < known_points.length; i++) {
    if (known_points[i][0] > slidenr) {
      return current;
    }
    current = known_points[i];
  }
  return current;
}

function post(slidenr) {
  for (var i = 0; i < known_points.length; i++) {
    if (known_points[i][0] >= slidenr) {
      return known_points[i];
    }
  }
  return [n_slides, length];
}

function seekToSlide(slidenr) {
  const prePos = pre(slidenr);
  const postPos = post(slidenr);
  const idxRange = postPos[0] - prePos[0];
  const timeRange = postPos[1] - prePos[1];
  const idxInRange = slidenr - prePos[0];

  var target = prePos[1] + (idxRange ? timeRange * idxInRange / idxRange : 0)
  console.log('seeking to', target)
  player.setCurrentTime(target)
}
