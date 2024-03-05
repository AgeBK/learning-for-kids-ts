# React + TypeScript

# Initial idea - 08/09/2023

I was watching my son do some online homework and got the idea to build a kid's website where children could improve their maths and spelling skills.

I want the user to be able to choose between either maths or spelling and either random maths questions or random images are generated/displayed which can be answered. I'm thinking of including a countdown timer and some sort of record table or a Top 10 Scores Style Table to keep track of progress.

# What I built

So, I stuck to the original idea, the user can choose either maths (addition or subtraction) or spelling. After choosing which challenge they'd like to do, a timer is displayed, showing 1 minute. The user then can start the timer and either random maths questions are presented or random images where the user must spell the name of the image. When the timer reaches zero, a final tally is presented and can be viewed in a leaderboard, which I save in local storage.

# Features

- 15 Components
- Countdown timer (changes colour each second) which can be reset.
- Live results of the current challenge.
- Top scores, which can be sorted by position (default) and by date.
- Random colours on the timer and the username.
- Audio: sounds are played for correct/incorrect answers, also, sounds at the beginning and end of a challenge.
- Uses unsplash-js API for image searches used in spelling challenges. A word is randomly selected from an array and an image search is performed.

# How it works

- 1: The user must enter a username.
- 2: When a name is entered, the user is presented with the challenge options (maths or spelling) and the timer. If maths is selected, the user can also select either addition or subtraction.
- 3: When ready, the user can click the start button. Ready, set, go is displayed (each word 1 second apart) then the timer and the first question will be displayed.
- 4: The aim for the user is to answer as many questions as possible before the timer runs out.
- 5: When the time is up, the timer stops, finished is displayed and the users' results are displayed in the records table which is saved in local storage.
