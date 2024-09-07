
var scorePoints = 0 ;
function afficherQuiz(data,pos) {
    const quizContainer = document.getElementById('quiz_container');
    var add100 = document.getElementById("addScore") ;
    var pass = 0 ;
    data.quiz.forEach((item, index) => {
          if(pos==index){
            let labelQuestion = document.getElementById("label_question") ;
            labelQuestion.innerText =pos+1 +" ) "+item.question ; 
            document.getElementById("check_answer").addEventListener("click",(e)=>{
            var inputAnswer = document.getElementById("answer");
            let verify_answer = document.getElementById("verify_answer") ;
            for(elt of item.answers){
              //check if the input value == correct answers in the json file
              if(inputAnswer.value.trim().toLowerCase()==elt.toLowerCase()){
                //check the position of the correct answer
                if(item.answers.indexOf(elt) == item.correct_answer){
                    //in the correct answer case => go to  the next question
                    pos+=1 ;
                    scorePoints+=100 ;
                    next_question()
                    function next_question(){
                        //clear the quiz container and display the next question
                        verify_answer.innerText = "" ; 
                        inputAnswer.value = "" ;
                        inputAnswer.style.borderColor="inherit" 
                        labelQuestion.innerText = "" ; 
                        options.innerText = "";
                        afficherQuiz(data,pos) ;
                        checkScorePoints(scorePoints);
                        add100.style.cssText ="display:block;color:#41d6a2" ;
                        add100.classList ="animate__animated animate__fadeOutUp"
                        add100.innerText = "+100" ;
                        verify_answer.style.color = "#41d6a2" ; 
                        verify_answer.innerHTML = "Correct Answer , Great ! <i class='fa-solid fa-face-laugh-wink'></i>" ; 
                        setTimeout(() => {
                          add100.classList="" ;
                          add100.style.display="";
                          verify_answer.innerHTML = "" ;
                        }, 1000);
                  }
                }else{
                  if(pass==0){
                    inputAnswer.classList = " animate__animated animate__headShake" ;
                    scorePoints-=100 ;
                    checkScorePoints(scorePoints);
                    document.getElementById("score").innerText =scorePoints ;
                    verify_answer.style.color = "red" ; 
                    add100.style.cssText ="display:block;color:red" ;
                    add100.innerText = "-100" ;
                    add100.classList ="animate__animated animate__fadeOutDown";
                        setTimeout(() => {
                          add100.classList="" ;
                          add100.style.display=""
                        }, 1000);
                    inputAnswer.style.borderColor="Red"
                    verify_answer.innerHTML = "Wrong Answer <i class='fa-solid fa-face-sad-tear'></i>" ;
                    setTimeout(() => {
                      inputAnswer.classList = ""
                    }, 2000);
                    pass+=1 ;
                  }
                }
              }
            }
          })
          let options = document.getElementById("response_elements") ;
          //generate each element of the questions in li element , with json data
          item.answers.forEach(e=>{
            let li = document.createElement('p') ;
            li.classList.add("draggable") ; 
            li.innerText =  e ;
            options.appendChild(li) ;
        })
        }else if(pos>19){
          //check if the user finish all the questions , show a win message
          document.getElementById("quiz_container").style.display= "none" ; 
          let congratulationDiv = document.getElementById("congratulations") ; 
          congratulationDiv.classList = "animate__animated animate__fadeInDownBig ";
          congratulationDiv.innerHTML = "CONGRATULATIONS ! <i class='fa-solid fa-trophy'></i><br>SCORE:"+scorePoints ;
        }else if(pos<0){
          // if the user comeback to the - last index(-1) , show the last index (0)
          pos = 0; 
          afficherQuiz(data,pos)
        }
    });
  }
function checkScorePoints(scorePoints){
  if(scorePoints<0){
    document.getElementById("score").style.color="Red"
    document.getElementById("score").innerText =scorePoints ;
  }else{
    document.getElementById("score").style.color="green"
    document.getElementById("score").innerText =scorePoints ;
  }
}
var start_button  = document.getElementById("start_button") ;
var quiz_container = document.getElementById("quiz_container") ;
start_button.addEventListener("click",()=>{
    quiz_container.style.display = "block" ;
    quiz_container.classList = "animate__animated animate__bounceInDown" ;
    start_button.style.display = "none " ;
    afficherQuiz
})
async function fetchData() {
    try {
        //getting data from the Apache server in a Localhost 
      const response = await fetch('questions.json');
      if (!response.ok) {
        throw new Error('erreur lors de la transmission');
      }
      const quizData = await response.json();
      let pos = 0;
      afficherQuiz(quizData,pos);
    } catch (error) {
      console.error(error);
    }
  }
  window.onload = fetchData;
  let inputAnswer = document.getElementById("answer").value ;
  document.getElementById("answer").innerHTML ="<i class='fa-solid fa-hand'></i>"