export const rawModuleText = `# Beat 1 of 12
left-pane : {
    type : "image",
    src: "/assets/image-1.png"
}

right-pane : 
\`\`\`html
<div style="text-align: center; margin-top: auto; margin-bottom: auto;">
  <h3>Case Study on Iteration</h3>
  <p>Finding Raghav in a Dark Movie Theatre.</p>
</div>
\`\`\`

# Beat 2 of 12
left-pane : {
    type : "image",
    src: "/assets/image-2.png"
}



right-pane :
\`\`\`html
Raghav is watching a movie in a large theatre.
<p></p>
Suddenly, there is a complete power failure, and the theatre becomes completely dark.

<p></p>
After a few moments, an announcement is made:
<br>
<z-announcement>
"Please remain seated. It will take 10-15 minutes to fix the problem."
</z-announcement>
\`\`\`

# Beat 3 of 12

left-pane : {
    type : "image",
    src: "/assets/image-3.png"
}


right-pane :
\`\`\`html
Meanwhile, Tarun, Raghav's best friend, enters the theater, and he finds the room dark.
<p></p>
So he calls Raghav and asks:
<br>
<z-question>
"Raghav, in which row are you sitting? I want to sit beside you."
</z-question>
<p></p>
Raghav replies:
<z-reply>
"Tarun, I don't know my row number. I just know that I am sitting in 5th column from the aisle."
</z-reply>

\`\`\`

# Beat 4 of 12
left-pane : {
    type : "image",
    src: "/assets/image-4.png"
}


right-pane :
\`\`\`html
So Tarun decides to find Raghav himself.
<p></p>
He starts from Row 1 and checks the 5th seat to see if Raghav is sitting there.
<br>
Raghav is not there.
<p></p>
So Tarun moves to Row 2 and checks the 5th seat again.
<br>
Raghav is not there either.
<br>
<p></p>
Tarun continues doing the same thing:
<ul>
<li>Goes to Row 3. Checks the 5th seat. Raghav is not there. Moves to next row.</li>
<li>Goes to Row 4. Checks the 5th seat. Raghav is not there. Moves to next row.</li>
and so on...
</ul>
\`\`\`

# Beat 5 of 12
left-pane : {
    type : "image",
    src: "/assets/image-5.png"
}



right-pane :
\`\`\`html
While doing the same repeated action for each row, Tarun reaches row 12.
<p></p>
He checks if Raghav is there, and he finds Raghav sitting in that row.
<br>
<p></p>
So Tarun now knows, that Raghav is sitting in row 12.
<br>
He goes and sits beside Raghav. 

\`\`\`

# Beat 6 of 12
left-pane : {
    type : "text",
    content: \`<h3 style:"font-size:20; justify-content:center; align-item:center; font-style:italics, bold;">Finding Pattern</h3>\`
}


right-pane :
\`\`\`html
<h4>Overview</h4>
<p></p>
Do you see some repeated pattern in Tarun's action?
<p></p>
In each row, Tarun does the exact same thing :
<ol>
    <li>Checks if Raghav sitting in 5th seat of this row?</li>
    <li>If yes, go and sit beside him</li>
    <li>If not, then go to next row and repeat the same action</li>
</ol>
<p></p>
<z-announcement>
    This is what iteration is!
</z-announcement>
<p></p>
<b>Iteration :</b><i> Repeating certain actions again and again, until a condition is met.</i>
\`\`\`
# Beat 7 of 12
left-pane : {
    type : "text",
    content: \`<h3 style:"font-size:20; justify-content:center; align-item:center; font-style:italics, bold;">In a Nutshell</h3>\`
}

right-pane :
\`\`\`html
<h4>Summary</h4>
<p></p>
<ul>
<li><b>Iteration : </b><i>Repeating certain actions again and again, until a condition is met.</i></li>
<li><b>Condition : </b><i>If the condition is true, the iteration continues. If it becomes false, the iteration stops.</i></li>
<li><b>Repeated Actions: </b><i>The set of actions which repeat in every iteration.</i></li>
</ul>
<br>
<p></p>
Let's map the concepts learned back to the case study:
<ol>
    <li>Tarun checking in each row. - <b>Iteration</b></li>
    <li>Did Tarun find Raghav in the previous row. - <b>Condition</b></li>
    <li>Tarun checks for Raghav in each row, and update the row number in his mind. - <b>Repeated Actions</b></li>
</ol>

\`\`\`

# Beat 8 of 12
left-pane : {
    type : "text",
    content: \`<h3 style="font-size:20px; justify-content:center; align-item:center; font-style:italic; font-weight:bold;">Loops in Python</h3>\`
}


right-pane :
\`\`\`html
<h4>Iterations in Python</h4>
<p></p>
In Programming, iteration is also known as loops.
<br>
In Python, there are two ways to do iteration :
<ul>
<li><b>for loop :</b><i>Used when number of iterations is fixed.</i></li>
<li><b>while loop :</b><i>Used when number of iterations is not fixed, and iterations happens as long as some condition is correct.</i></li>
</ul>
<br>
<p></p>
<b>Construct of for loop:</b>
<pre><code class="language-python">
    for i in range(10): # repeats for 10 times
        # repeated actions
</code></pre>
<p></p>
<b>Constuct of while loop:</b>
<pre><code class="language-python">
    while(condition): # repeats as long as condition is True
        # repeated actions
</code></pre>
<p></p>
The case study was the example of while loop, because the number of iterations was not fixed, but continued till Tarun does not found Raghav.
<pre><code class="language-python">
    row_number = 1
    raghav_found = False

    while raghav_found == False:
        # Action: Check the current row
        if check_row(row_number) == "Raghav":
            raghav_found = True
        else:
            # Update: Move to the next row
            row_number = row_number + 1
</code></pre>
When the loop ends, <code>row_number</code> contains the row in which Raghav is sitting.
\`\`\`

# Beat 9 of 12
left-pane : {
    type : "text",
    content: \`<h3 style:"font-size:20; justify-content:center; align-item:center; font-style:italics, bold;">Test your Understanding</h3>\`
}

right-pane :
\`\`\`html
<h4>Question 1:</h4>
<z-mcq>
  <z-question>In Tarun's story, what represents the "Condition" that tells him to stop repeating his action?</z-question>
  <z-options>
    <z-option correct="false">When he reaches the very last row of the theater.</z-option>
    <z-option correct="true">When he sees Raghav in the row.</z-option>
    <z-option correct="false">When he checks Row 1.</z-option>
  </z-options>
  <z-explanation>Correct! Tarun will only keep looping through the rows *while* he hasn't found Raghav. Once he spots him at Row 12, the condition is met, and the loop stops!</z-explanation>
</z-mcq>
\`\`\`

# Beat 10 of 12
left-pane : {
    type : "text",
    content: \`<h3 style:"font-size:20; justify-content:center; align-item:center; font-style:italics, bold;">Test your Understanding</h3>\`
}

right-pane :
\`\`\`html
<h4>Question 2:</h4>
<z-mcq>
  <z-question>According to the case study, which of the following represents the "Repeated Action" inside Tarun's iteration?</z-question>
  <z-options>
    <z-option correct="false">Calling Raghav on the phone to ask for his row number.</z-option>
    <z-option correct="true">Checking the 5th seat for Raghav, and moving to the next row if he isn't there.</z-option>
    <z-option correct="false">Sitting down beside Raghav once he is finally found.</z-option>
  </z-options>
  <z-explanation>Correct! The repeated action is the specific block of tasks Tarun does over and over again until the condition (finding Raghav) is met.</z-explanation>
</z-mcq>
# Beat 11 of 12
left-pane : {
    type : "text",
    content: \`<h3 style:"font-size:20; justify-content:center; align-item:center; font-style:italics, bold;">Test your Understanding</h3>\`
}

right-pane :
\`\`\`html
<h4>Question 3:</h4>
<z-mcq>
  <z-question>Why the iteration in the case study is an example of <code>while</code> loop and not <code>for</code> loop?</z-question>
  <z-options>
    <z-option correct="false">Number of iterations is fixed</z-option>
    <z-option correct="true">Number of iterations is not fixed.</z-option>
    <z-option correct="false">None of the above.</z-option>
  </z-options>
  <z-explanation>Exactly! <code>while</code> loop is used, when the number of iterations is not known.</z-explanation>
</z-mcq>
\`\`\`

# Beat 12 of 12
left-pane : {
    type : "text",
    content: \`<h3 style:"font-size:20; justify-content:center; align-item:center; font-style:italics, bold;">Module Completed</h3>\`
}


right-pane :
\`\`\`html
<div style="text-align: center; margin-top: auto; margin-bottom: auto;">
  <h3>Congratulations! You completed the Module.</h3>
  <p>You learned the concepts of iteration.</p>
</div>
\`\`\`
`;
