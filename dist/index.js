const video = document.querySelector('video');

['loadstart','progress','suspend','abort','error','emptied','stalled','loadedmetadata','loadeddata','canplay','canplaythrough','playing','waiting','seeking','seeked','ended','durationchange','play','pause','ratechange','resize','volumechange']
.forEach(ev => {
  video.addEventListener(ev, (e) => {
    console.log(e.type, e);
  }, false)
});

video.addEventListener('timeupdate', e => {
  console.log(e.target.currentTime);
});


console.log(video)