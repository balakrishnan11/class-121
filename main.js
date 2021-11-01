function setup() {
  canvas = createCanvas(210, 210);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier('MobileNet',modelLoaded);
}
function draw(){
  image(video,0,0,210,210);
  classifier.classify(video,gotResults);
}
function modelLoaded(){
    console.log("Model Loaded Successfully!");
}
var previous_result = '';
function gotResults(error,results){
  if(error){
    console.error(error);
  }
  else{
    if((results[0].confidence > 0.5) && (previous_result != results[0].label)){
      console.log(results);
      previous_result = results[0].label;
      var synth = window.speechSynthesis;
      speak_data = 'Object Detected Is - ' + results[0].label;
      var utterThis = new SpeechSynthesisUtterance(speak_data);
      synth.speak(utterThis);

      document.getElementById("result_object_label").innerHTML = results[0].label;
      document.getElementById("result_object_Confidence").innerHTML = results[0].confidence.toFixed(3);
    }
  }
}