main_screen.style.display = 'none';
explanation.style.display = 'none';
thanks.style.display = 'none';

var freq = 0;
var phase;
var stat = 0;
var stars = 0;
var ID;

// Database init
var firebaseConfig = {
    apiKey: "AIzaSyBUurwFOhEiH0LQ4LL7Ca_-PPiES0msOKw",
    authDomain: "test1-eac18.firebaseapp.com",
    databaseURL: "https://test1-eac18.firebaseio.com",
    projectId: "test1-eac18",
    storageBucket: "test1-eac18.appspot.com",
    messagingSenderId: "1078451681110",
    appId: "1:1078451681110:web:9d6835a0992d7a3455c8f7",
    measurementId: "G-M3GV8JHQ22"
  };
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
db.collection('Tesi').doc('Phase').get().then((snapshot) => {
    ID = snapshot.data().yourID;
    db.collection("Tesi").doc("Phase").set({yourID: ID+1});
})
//

ctx = new AudioContext();
wave  = ctx.createPeriodicWave([0,0.5,0.5,0.5,0.5],[0,0,0,0,0]);
cwave = ctx.createPeriodicWave([0,0.5,0.5,0.5,0.5],[0,0,0,0,0]);
Osc1 = ctx.createOscillator();
Osc1.setPeriodicWave(wave);
Osc2 = ctx.createOscillator();
Osc2.setPeriodicWave(cwave);
Osc2.connect(ctx.destination);
slider_handle();

function start_exp(){
    ctx.resume();
    first_screen.style.display = 'none';
    explanation.style.display = '';
    stars = 0;
}
function start_steady(){
    explanation.style.display = 'none';
    main_screen.style.display = '';
    freq = 40*Math.exp(Math.random()*Math.log(100));
    Osc1.frequency.value = freq;
    Osc2.frequency.value = freq;
    Osc1.start();
    Osc2.start();
}
function slider_handle(){
    phase = sliderPh.value/100 * Math.PI;
    real = [0, 0.25, 0.25*Math.cos(phase),0.25*Math.cos(2*phase),0.25*Math.cos(3*phase)];
    imag = [0, 0   , 0.25*Math.sin(phase),0.25*Math.sin(2*phase),0.25*Math.sin(3*phase)];
    wave = ctx.createPeriodicWave(real,imag,{disableNormalization: true});///DBG
    Osc1.setPeriodicWave(wave);
}
function switch_handle(){
    if (stat==0){
        stat=1;
        Osc2.disconnect();
        Osc1.connect(ctx.destination);
    }
    else{
        stat=0;
        Osc1.disconnect();
        Osc2.connect(ctx.destination);
    }
}
function next(){
    freq = 20*Math.exp(Math.random()*Math.log(400));
    Osc1.frequency.value = freq;
    Osc2.frequency.value = freq;
    stars++;
    result = {
        frequency: freq,
        phase: phase
    }
    mystr = "record_" + ID + "_" + stars;
    db.collection("Tesi").doc(mystr).set(result);
    var img = document.createElement('img');
    img.src = "https://i.ibb.co/zPPwJ4B/imageedit-1-2342786752.png";
    star_container.appendChild(img);
}
function quit(){
    Osc1.stop();
    Osc2.stop();
    score.innerHTML = "Your score is: " + stars + " smiling stars!"
    main_screen.style.display = 'none';
    thanks.style.display = '';
}