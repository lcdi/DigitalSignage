//Finals date calculator from Cai's code
var finalsDate = "May 1, 2017 8:00:00";
var countDown = new Date(finalsDate).getTime();
var currentDate = new Date().getTime();
var distance = countDown - currentDate;
var cDays = Math.floor(distance / (1000 * 60 * 60 * 24));
var cHours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
var cMinutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
var cSeconds = Math.floor((distance % (1000 * 60)) / 1000);
var finalsTime = cDays + " Days<br>"+ cHours + " Hours<br>" + cMinutes + " Minutes<br>Until Final Exams"; 

//Random sets of messages
var messageSets = [["How often have you thought<br> about dinner today?", "What superpower would you<br> choose and why?",  '"The secret of getting ahead<br> is getting started."<br> -Mark Twain',"37 is 11, 11 is 6, 6 is 3, 3 is 5.<br> What is 5?", ""+finalsTime+""],
				   ["Which U.S. state has the longest name?", "What do you plan on doing this summer?", "The end of the semester is approaching faster than you think; make sure you get your projects done!", '"Perseverance is not a race; it is <br> many short races one after the other." <br> -Walter Elliot, Scottish Politician', ""+finalsTime+""],
				   ["What is the longest palindrome in the English Language?", "Is a tomato a fruit or a vegetable?", "100 is 10, 10 is 3, 3 is 5.<br> What is 5?", '"Accept the challenges so that you can feel the exhiliration of victory. <br> -George S. Patton, American Soldier"', ""+finalsTime+""],
				   ["How is your work flow going? <br>Can you make it more efficient?", "Spring is here, get ready for allergies!", "Don't forget to reda the homepage carefully for announcements!", '"Do not wait to strike till the iron is hot; <br> but make it hot by striking." <br>-William Butler Yeats, Irish Poet', ""+finalsTime+""],
				   ["If you're stressed over your work, take a break. Go for a walk, meditate, or anything else tht could calm you down.", "If you take the shuttle to work, get in the haibt of leaving 15 minutes early to ensure that you'll arrive on time.", "999 is 21, 21 is 9, 9 is 4. <br> What is 4?", '"Perseverance is the hard work you do after you get tired of doing the hardwork you already did." <br>-Newt Gingrich, American politician', ""+finalsTime+""],
				   ["Admitted Students Day 1: 4/1/17", "If you have trouble falling asleep at night or can't get to bed early, try setting aside time for brief naps during the day.", '"Arriving at one goal is the <br> starting point to another." <br>-American Philosopher', "Finals are on their way; don't give up!", ""+finalsTime+""],
				   ["Don't forget to like the LCDI page on Facebook!", "Stressed? Try listening to Qualia, a one-man instrumental band known for its calm and soothing style.", '"When you reach the end of your rope, <br> tie a knot and hang on." <br>-Franklin D. Roosevelt, American President', "Make sure you're staying updated on Trello and Slack!", ""+finalsTime+""],
				   ["Need some study music? Try listening to Yiruma, a classical pianist known for his beautiful, tranquil playing.", "Don't forget to check WhenIWork to stay updated on your shifts!", '"Success is not always about greatness. It is about consistency. Consistent hard work leads to success. Greatness will come." <br>-Dwayne Johnson, American Actor', "1,001 is 8, 8 is 5, 5 is 4. <br> What is 4?", ""+finalsTime+""],
				   ["Programmers: make sure your code is neat so that other pepole can read it as easily as you can!", "Get in the habit of writing to-do lists if you aren't already. They can make your work flow seem so much simpler!", "Do you think you're getting enough sleep?", '"The first step towards success is taken when you refuse to be a captive of the environment in which you first find yourself." <br>-Mark Caine, American Writer', ""+finalsTime+""],
				   ["Don't forget to follow the LCDI on Twitter!", "Lake Chargoggagoggmanchauggagoggchaubunagungamaugg is the longest place name in the U.S. Where is it located?", "The Nintendo Switch is finally out; are you getting one?", '"There are no secrets to success. It is the result of preparation, hard work, and learning from failure." <br>-Colin Powell, American Statesmen', ""+finalsTime+""],
				   ["Admitted Students Day 2: 4/22/17", "'Nothing will work unless you do.' -Maya Angelou", "Need some new music? Try using gnoosic.com to find recommendations based on what you listen to!", "123,456 is 48, 48 is 10, 10 is 3. <br> What is 3?", ""+finalsTime+""],
				   ["Scientists stil don't know the exact reason behind why we need sleep. All we know currently is the harm of not sleeping.", "Did you know there's place in Wales with a 58-letter long name? Most of the locals can pronounce it effortlessly! ", "'Progress requires setbacks; the only way to avoid failure is not to try.' -Canadian Scientist", "'If you're walking down the right path and you're willing to keep walking, eventually you'll make progress.' -Barack Obama", ""+finalsTime+""],
				   ["When's the last time you read something for fun?", "Currently, there are over 52,000 operating wind turbines in the U.S, and this number is expected to increase in the next few decades.", "'Obstacles are those frightful things you see when you take your eyes off of your goal.' -Henry Ford, American Businessman", "'If there is no struggle, there is no progress.' -Frederick Douglass, American Author", ""+finalsTime+""],
				   ["Summer break is coming soon, have you made any plans yet?", "At the end of last year, the U.S. had installed 40 gigawatts of photovoltaic solar power, almsot double of the year before. This number is epected to go up even more in the next few decades.", "'Optimism is essential to achievement and it is also the foundation of courage and true progress.' -Nicholas M. Butler, American Philosopher", "9,000,001 is 14, 14 is 8, 8 is 5. <br> What is 5?", ""+finalsTime+""],
				   ["The world's longest tunnel is the Gotthard Base Tunnel in Switzerland, at 35.47 miles in length. That's a long time to have to say 'I can't hear you, I'm in a tunnel'!", "Have you checked Slack recently?", "'Coming together is a beginning; keeping together is progress; working together is success.' -Henry Ford, American Businessman", '"The aim of argument, or of discussion, should not be victory, but progress." -Joseph Joubert, French Writer', ""+finalsTime+""]];

//Sleep function
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
			   
//Chooses a random message set and continuously prints that while the display is on
async function showMessages()
{ 
	var i;
	var rndNum = Math.floor((Math.random()*15)+0);
	var on = true;
	while (on === true)
	{
		for (i = 0; i < 5; i++)
		{
			document.getElementById("currentMessage").innerHTML = messageSets[rndNum][i];
			await sleep(10000);
		}
	}
}

// TO DO
	//write in messages
