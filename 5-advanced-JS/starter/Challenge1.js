/*
--- Let's build a fun quiz game in the console! ---

1. Build a function constructor called Question to describe a question. A question should include:
a) question itself
b) the answers from which the player can choose the correct one (choose an adequate data structure here, array, object, etc.)
c) correct answer (I would use a number for this)

2. Create a couple of questions using the constructor

3. Store them all inside an array

4. Select one random question and log it on the console, together with the possible answers (each question should have a number) (Hint: write a method for the Question objects for this task).

5. Use the 'prompt' function to ask the user for the correct answer. The user should input the number of the correct answer such as you displayed it on Task 4.

6. Check if the answer is correct and print to the console whether the answer is correct ot nor (Hint: write another method for this).

7. Suppose this code would be a plugin for other programmers to use in their code. So make sure that all your code is private and doesn't interfere with the other programmers code (Hint: we learned a special technique to do exactly that).
*/


/*
--- Expert level ---

8. After you display the result, display the next random question, so that the game never ends (Hint: write a function for this and call it right after displaying the result)

9. Be careful: after Task 8, the game literally never ends. So include the option to quit the game if the user writes 'exit' instead of the answer. In this case, DON'T call the function from task 8.

10. Track the user's score to make the game more fun! So each time an answer is correct, add 1 point to the score (Hint: I'm going to use the power of closures for this, but you don't have to, just do this with the tools you feel more comfortable at this point).

11. Display the score in the console. Use yet another method for this.
*/



(function () {
    
    var question = function (qstn, answers, crctAnswer) {
    this.qstn = qstn;
    this.answers = answers;
    this.crctAnswer = crctAnswer;
    }

    var qstn1 = new question(
        'Best Sports in the world',
        ['Cricket','Football','Baseball'],
         1
    );

    var qstn2 = new question (
        'Best Footballer in the world',
        ['Ronaldinho','Christiano','Messi'],
        0
    );

    var qstnsArray = [qstn1, qstn2];

    
    var userScore = 0;
    var nm = true;
    while(nm){
        var n = Math.round(Math.random() * 1);
        var qs = qstnsArray[n];
        console.log(qs.qstn);
        console.log(qs.answers[0]);
        console.log(qs.answers[1]);
        console.log(qs.answers[2]);
        
        var ansByUser = window.prompt(qs.qstn);
        
        if(ansByUser === 'exit' || userScore < 0) {
            break;
        }else {
            if(ansByUser+'' === qs.crctAnswer+''){
                console.log('You are right Pal !!!!!')
                userScore += 1;
            }else {
                console.log('May be you are wrong !!!!');
                userScore -= 1;
            }
            console.log('Score ==> '+ userScore);
            console.log('========================');
            if(userScore < 0) {
                break;
            }
        }
    }
})();
//randomQuestionSelector();




