 //mn_sec_04 program
 const burst = new mojs.Burst({
  left: 0,
  top: 0,
  //radius: { 4: 100 },
  opacity: {1 : 0},
  rotate:{ 0 : 90 },
  angle: 15,
  children: {
    shape: 'line',
    radius: 5,
    scale: 1,
    stroke: { '#006DB7' : '#fff' }, //'#FCB416',
    strokeDasharray: '100%',
    strokeDashoffset: { '-100%': '100%' },
    duration: 500,
    easing: 'quad.out',
  },
});
const bubbles = new mojs.Burst({
  left: 0, 
  top: 0,
  radius:   28,
  count:    3,
  timeline: { delay: 30 },
  children: {
    stroke:       '#006DB7',
    fill:         'none',
    scale:        1,
    strokeWidth:  { 4: 0 },
    radius:       { 0 : 'rand(6, 10)' },
    degreeShift:  'rand(-50, 50)',
    duration:     500,
    delay:        'rand(0, 250)',
  }
});

// const btn_bubble = document.getElementsByClassName('.btn_bubble');
// btn_bubble.addEventListener('click', function (e) {
//   burst.tune({ x: e.pageX, y: e.pageY }).replay();
// });

const btn_bubble = $('.btn_bubble');
btn_bubble.on('click', function (e) { //mousemove
  burst.tune({ x: e.pageX, y: e.pageY }).generate().replay();
  bubbles.tune({ x: e.pageX, y: e.pageY }).generate().replay();
});


