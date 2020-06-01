
// Your web app's Firebase configuration
var firebaseConfig = {
apiKey: "AIzaSyAjf9ZAUIeNCSIR2Uv-n1Q-Aj20Bx3TP3U",
authDomain: "covid-19-survey-48559.firebaseapp.com",
databaseURL: "https://covid-19-survey-48559.firebaseio.com",
projectId: "covid-19-survey-48559",
storageBucket: "covid-19-survey-48559.appspot.com",
messagingSenderId: "518931078177",
appId: "1:518931078177:web:97eda6f12bb5df8a911760"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


var database = firebase.database();
votesRef = database.ref('votes');

var voterCount = 0;

//submitting
document.getElementById('form').addEventListener('submit',submit);

function submit(event){
    event.preventDefault();

    var answer1 = document.getElementById('answer1').value;
    var answer2 = document.getElementById('answer2').value;
    var message = document.getElementById('message').value;
    var precautions = document.getElementById('precautions').value;
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;

    voterCount +=1;
    updateCount(voterCount);

    voteList(answer1,answer2,message,precautions,name,email);

    document.getElementById('form').reset();

    var indicate = document.getElementById('submission_indi');
    indicate.style.display = 'block';
    setTimeout(function(){
        indicate.style.display='none';
    },2500)
}

function getVotersCount(){
    var votersCountRef = database.ref('votersCount');
    votersCountRef.on("value",(data)=>{
        votersCount = data.val();
    })
}

function updateCount(count){
    database.ref('/').update({
        votersCount : count
    })
}

function voteList(answer1,answer2,message,precautions,name,email){
    var saveVotes = votesRef.push();
    saveVotes.set({
        answer1:answer1,
        answer2:answer2,
        message:message,
        precautions:precautions,
        name:name,
        email:email
    })
}