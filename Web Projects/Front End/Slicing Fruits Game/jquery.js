var playing  = false ;
var score ;
var trails ; 
var fruits = ["apple","grapes","banana","cherries","mango","orange","pear","peach","watermelon"] ;
var action ;
var step ;
var id ;


$(function(){
    $("#startResetBox").click(function(){
        //If we're  playing
        if(playing == true)
        {
            //Reload the page
            location.reload() ;
        }else
        {
            //hide gameover box
            $("#gameOver").hide() ;

            //Convert to playing mode
            playing = true ;

            //Show the score box and set the score to 0
            score = 0 ;
            $("#score").html(score) ;
            $("#scoreBox").show() ;

            //Show the trails box and set the trails to 3
            trails = 3 ;

            //Chane the start button to reset button
            $("#startResetBox").html("Reset Game") ;

            //Show the left trials box
            $("#lives").show() ;

            //Add number of hearts equal to the number of trails left
            addHearts() ;

            //start the game
            beginGame() ;
        }
    })

    $("#fruit").mouseover(function(){
        //Increasing the score by one
        score++ ;

        //Show the new score int the score box
        $("#score").html(score) ;

        //play a sound
        $("#sound")[0].play() ;

        //stop Fruit
        clearInterval(action);

        //hide fruit
        $("#fruit").hide("explode","500"); //slice fruit
        
        //send new fruit
        setTimeout(beginGame,500) ;
        });






    //functions 
function addHearts()
{
    $("#lives").empty() ;
    for(i = 0 ; i < trails ; ++i)
    {
        $("#lives").append('<img src = "images/heart.png" style = "width : 16px ; height : 16px" class = "heart">') ;
    }
}

function beginGame()
{
    chooseFruit() ;
    $("#fruit").show() ;

    //Define the speed of the choosen fruit
    step = Math.round(Math.random() * 5 ) + 1

     //Move the fruit
     action = setInterval(function(){
        $("#fruit").css("top",$("#fruit").position().top + step) ;
        //Checking if the fruit is too low
        if($("#fruit").position().top > $("#fruitsBox").height()) 
        {
            if(trails > 1)
            {
                //start the game
                chooseFruit() ;

                //Decreasing the number of trials by one 
                trails-- ;

                //Showing the left trails
                addHearts() ;
            }else
            {
                //Hide lives box where the is the number of left trials
                $("#lives").hide() ;

                //Show the gameover box
                $("#gameOver").show()
                $("#finalScore").html(score) ;

                //Convert the restart button to start button
                $("#startResetBox").html("Start Game") ;

                //Stop action
                clearInterval(action) ;
                $("#fruit").hide() ;
                playing = false ;
            }
        }
    },10);
}

function chooseFruit()
{
    id = Math.round(Math.random() * 8 ) ;
    $("#fruit").css({"top" : -50 , "left" : Math.round(Math.random()*500)}) ;
    $("#fruit").attr({"src" : 'images/'+String(fruits[id])+'.png'}) ;
}
});



