const vimeo = document.querySelector('#vimeo');

let duration = 0
let numberOfSlides;

const known_points = [
  [0, 49],
  [1, 113],
  [2, 120],
  [3, 197],
  [4, 555],
  [5, 700],
  [6, 928],
  [7, 1035],
  [8, 977]
];

var player = new Vimeo.Player(vimeo);
player.getDuration()
  .then(function(_duration) {
    console.log('got duration', _duration)
    duration = _duration;

    Array.from(document.querySelectorAll('.slide-container img')).forEach((el, index) => {
      el.addEventListener('click', () => {
        console.log('Clicked', index);
        seekToSlide(index);
      });
      numberOfSlides = index;
    })
  }
);

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
  return [numberOfSlides, length];
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
