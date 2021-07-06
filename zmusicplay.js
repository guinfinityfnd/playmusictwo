const foraudiosTag=document.querySelector(".foraudios");
const audioTag=document.querySelector(".audioes");
const songsTag=document.querySelector(".songs");
const currentTimeTag=document.querySelector(".currentTime");
// const progressBarTag=document.querySelector("#progressBar");
const currentProgressTag=document.querySelector("#currentProgress");
const previousButtonTag=document.querySelector(".previousButton");
const playButtonTag=document.querySelector(".playButton");
const pauseButtonTag=document.querySelector(".pauseButton");
const nextButtonTag=document.querySelector(".nextButton");

const musicArray=[
    {trackId:"track-1.mp3",title:"Burno Mars-Marry You"},
    {trackId:"track-2.mp3",title:"What The Fuck-HUGEL feat.Amber van Day"},
    {trackId:"track-3.mp3",title:"သူငယ်ချင်းအတွက်-Nyi Min Khine"},
    {trackId:"tack-4.mp3",title:"Phyay-Shwe Htoo & Ngwe Hmone"},
    {trackId:"track-5.mp3",title:"White Inverson-Post Malone lyric"},
    {trackId:"track-6.mp3",title:"ရယ်ရတယ်-Wai Gyi"},
];

for (let i=0;i<musicArray.length;i++){
    const trackTag=document.createElement('div');
    trackTag.addEventListener("click",()=>{
        const trackId=musicArray[i].trackId;
        audioTag.src=trackId;
        audioTag.play();//need to play audio without audio controls.
        isPlaying=true;
        updatePlayAndPauseButton();
    });
    trackTag.classList.add("trackItem");
    const title=(i+1).toString()+". "+ musicArray[i].title;
    trackTag.textContent=title;
    songsTag.append(trackTag);
};
let duration=0;
let durationTextLine="00:00";
audioTag.addEventListener("loadeddata",()=>{
    duration=Math.floor(audioTag.duration);
    durationTextLine=createMinutesAndSeconds(duration); 
});
audioTag.addEventListener("timeupdate",()=>{
    const currentTime=Math.floor(audioTag.currentTime);
    const currentTextLine=createMinutesAndSeconds(currentTime);
    const currentTextAndDurationText=currentTextLine+"/"+durationTextLine;
    //console.log(currentTextAndDurationText);
    currentTimeTag.textContent=currentTextAndDurationText;
    let css='.currentTime {color:aqua}';
    let style=document.createElement('style');
    if (style.styleSheet) {
        style.styleSheet.cssText=css;
    }else{
        style.appendChild(document.createTextNode(css));
    }
    document.getElementsByTagName('head')[0].appendChild(style);
    updateProgressBar(currentTime);
});
const updateProgressBar=(currentTime)=>{
    const currentProgressWidth=(500/duration)*currentTime;
    currentProgressTag.style.width=currentProgressWidth.toString() + "px";
}
const createMinutesAndSeconds=(totalTimes)=>{
    const minutes=Math.floor(totalTimes/60);
    const seconds=totalTimes%60;

    const minutesText=minutes<10?"0" + minutes.toString() : minutes; 
    const secondsText=seconds<10?"0" + seconds.toString() : seconds; 
    return minutesText + ":" + secondsText;
};
let currentPlayingIndex=0;
let isPlaying=false;
playButtonTag.addEventListener("click",()=>{
    isPlaying=true;
    const currentTime=Math.floor(audioTag.currentTime);
    if (currentTime===0) {
        const songIdToPlay=musicArray[currentPlayingIndex].trackId;
        audioTag.src=songIdToPlay;
        audioTag.play();
        updatePlayAndPauseButton();
    }else{
        audioTag.play();
        updatePlayAndPauseButton();
    }    
});

pauseButtonTag.addEventListener("click",()=>{
    isPlaying=false;
    audioTag.pause();
    updatePlayAndPauseButton();
});

previousButtonTag.addEventListener("click",()=>{
    if (currentPlayingIndex===0) {
        return;
    }
    currentPlayingIndex -=1;
    playSongs();
});

nextButtonTag.addEventListener("click",()=>{
    if (currentPlayingIndex===musicArray.length-1) {
        return;
    }
    currentPlayingIndex+=1;
    playSongs();
});

const playSongs=()=>{
    const songIdToPlay=musicArray[currentPlayingIndex].trackId;
    audioTag.src=songIdToPlay;
    audioTag.play();
    isPlaying=true;
    updatePlayAndPauseButton();
}

const updatePlayAndPauseButton=()=>{
    if (isPlaying) {
        playButtonTag.style.display="none";
        pauseButtonTag.style.display="inline";
    }else{
        playButtonTag.style.display="inline";
        pauseButtonTag.style.display="none";
    }
}



