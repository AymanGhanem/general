//Playing state
var playing = false ;

//Score
var score ;

//Counter
var counter ;

var action ;
var answer ;
document.getElementById("startResetBox").onclick = function()
{
    //If we're playing will reload the page
    if(playing == true) 
    {
        //Reload the page
        location.reload() ;
    }
    else
    {
        //hide Gameover if exisits 
        hide("gameOver") ;

        //Go to playing mode
        playing = true ;

        //Convert Start button to Reset button
        document.getElementById("startResetBox").innerHTML = "Reset Game" ;
        //set score to zero
        score = 0 ;
        document.getElementById("score").innerHTML = score ;

        //Show the remaining time box
        document.getElementById("time").innerHTML = "60" ;
        document.getElementById("timeBox").style.display = "block" ;

        //playCounter
        playCounter() ;

        //Start displaying questions with mutiple choices
        generateQA() ;
    }
}


for(i=1;i<=4;++i)
{
    document.getElementById("choice"+i).onclick = function()
    {
        if(playing)
        {
            if(this.innerHTML == answer)
            {
                score++ ;
                changeElement("score",score) ;
                hide("wrong") ;
                show("correct");
                setTimeout(function(){
                    hide("correct") ;
                },1000);
                generateQA();
            }else
            {
                hide("correct") ;
                show("wrong") ;
                setTimeout(function(){
                    hide("wrong") ;
                },1000);
            }
        }
    }
}
//Helper Functions

//1.Hide an element by passin its id
function hide(id) 
{
    document.getElementById(id).style.display = "none" ;
}

//2.Show an element by passing its id
function show(id) 
{
    document.getElementById(id).style.display = "block" ;
}

//3.Set the counter to its default initial value
function initializeCounter()
{
    counter = 60 ;
}

//4.Start Countdown
function playCounter()
{
    initializeCounter()
    action = setInterval(reduceRemainingTime,1000) ;
}

//5.Reduce counter's remaining time.
function reduceRemainingTime()
{
    counter -= 1 ;
    changeElement("time",counter)
    if(counter == 0)
    {
        stopGame() ;
    }
}

//6.change the Html of an element specified by its ID
function changeElement(id,content)
{
    document.getElementById(id).innerHTML = content ;
}

//6.Get the Html of an element specified by its ID
function getElement(id)
{
    return document.getElementById(id).innerHTML ;
}

//7.Stop the game after 60 seconds
function stopGame()
{
    changeElement("finalScore",score)
    show("gameOver") ;
    changeElement("startResetBox","Start Game") ;
    playing = false ;
    hide("timeBox") ;
    clearInterval(action) ;
}

//8.Generate Question and Answer
function generateQA()
{
    var x = 1 + Math.round(Math.random() * 9) ;
    var y = 1 + Math.round(Math.random() * 9) ;
    answer = x*y ;
    var wrongAnswer ;
    changeElement("question",x+"*"+y);
    var answers = [answer] ; 
    for(i = 0 ; i<= 3 ; ++i)
    {
        do{
            wrongAnswer = (1 + Math.round(Math.random() * 9)) * (1 + Math.round(Math.random() * 9)) ;
        }while(answers.indexOf(wrongAnswer) > -1) ;
        answers.push(wrongAnswer) ;
    }
    var positions = []
    for(i = 0 ; i < 4 ; ++i )
    {
        do
        {
            position = 1 + Math.round(Math.random() * 3) ;
        }while(positions.indexOf(position) > -1 ) ;
        changeElement("choice"+position,answers[i]) ;
        positions.push(position) ;
    }
}