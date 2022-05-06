
Megan Maley

Betsy Ding

Lab 2 Design Document
** See bottom for Lab 3 updates

For Lab 2, we decided to keep many of the original elements from our design in Lab 1. From Lab 1, we carried over the alignment and fonts of the text, including the header and list items, as well as the purple and blue theme, and the button orientation. These design choices were based on Dr. Milburn’s lecture on using only 2-3 colors, 2-3 font choices, and the Western appeal of left alignment. 

With the design from Lab 1 in mind, as well as our original interface inspirations (the Notes SignedInApp and Kaiser SignedInApp), we made several alterations: we made the background white to cultivate a cleaner UI, added a pencil emoji into the header for a whimsy touch, made the text boxes invisible, and changed the text of the button “Hide completed items/show all items” to be more concise. These various design elements were added both by copying the CSS from Lab 1 into SignedInApp.js, as well as adding additional CSS throughout Lab 2 as we deemed fit. 

After refining our code and design, testing different elements as users ourselves and using the console to troubleshoot, we were able to share our design with peers to conduct user testing. 


<table>
  <tr>
   <td><strong>Participant #</strong>
   </td>
   <td><strong>Name of Participant</strong>
   </td>
   <td><strong>Verbal Feedback Notes</strong>
   </td>
  </tr>
  <tr>
   <td><strong>1</strong>
   </td>
   <td><strong>Annie</strong>
   </td>
   <td>
<ul>

<li>Thought that it was whimsical 

<li>Would like to be more colorful

<li>Added a bunch of tasks and didn’t like the overlap of the buttons on the bottom
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>2</strong>
   </td>
   <td><strong>Mariana</strong>
   </td>
   <td>
<ul>

<li>Thought it was pretty straightforward to use

<li>Enjoyed the simplicity of the design

<li>Would like there to be more clarity when each task is saved (enter button to save instead of clicking out of the task) 

<li>Generally had a good impression of the interface
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>3</strong>
   </td>
   <td><strong>Marcos</strong>
   </td>
   <td>
<ul>

<li>Likes the minimal design

<li>Should we some signal how to edit 
<ul>
 
<li>Suggested the pencil icon
</li> 
</ul>

<li>What about long texts?

<li>Replace click to edit with “new task”

<li>Might consider visual boundary between tasks, but personal preference

<li>Likes the emoji
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>4</strong>
   </td>
   <td><strong>Michelle</strong>
   </td>
   <td>
<ul>

<li>What a fun list title and pencil 

<li>Enjoys the hover functionality

<li>A little undesirable that you have to delete placeholder

<li>No mechanism to delete items
</li>
</ul>
   </td>
  </tr>
</table>


**Challenges**: One of the biggest challenges we faced was not from the code, but from working within the git repository. Unbeknownst to us, we somehow cloned a repository with no remote connection to Github. We were confused why the changes were not reflected on github repo, but luckily we were able to resolve the issue with the help of Grutor Marcos by examining the origin of the repository and transferring the files into the correct repository connected to Github. 

Another challenge we faced was working with the plus-button to add new task items. We repeatedly got a compilation error and were unable to identify the issue for several days. We used print statements and comments to isolate the problem, and discovered that the issue was not due to our implementation, but rather mixing up the names of our handleChange function. Through this experience we learned the importance of getting new perspectives and naming functions meaningfully and properly.

We also experienced several minor challenges with the buttons used to delete items and change which items are displayed on the screen depending on completion. We resolved the issues by introducing a new state which keeps track of which data items are currently being displayed and restructuring where some of the states and handle change functions reside across components. 

**What we’re most proud of**: We spent a significant amount of time brainstorming the structure of our app before we started coding. This certainly helped both our workflow and comprehension of the class material. Nailing down the hierarchy of the components and the props between them was difficult, but the most rewarding in the end. Having a clear structure in mind allowed us to know which parts of the code and design to work on first and how to handle different elements and components and understand how props are passed onto different functions, files, and the use of states. While we worked on the code, we slowly altered our original vision of the organization of the components to fit the different functions we wrote. These are the diagrams that we created to organize our thoughts: 


![alt_text](images/image1.jpg "image_tooltip")



![alt_text](images/image2.jpg "image_tooltip")


Lab 3 Updates

Based on feedback we received in user testing and from Professor Rhodes, we moved the buttons from the bottom of the page to the top of the application.
We did this because when a lot of tasks were added, the tasks overlapped the buttons. We also adjusted the alignment of the buttons and checkboxes.

We also introduced prioritization with a drop-down menu beside the checkbox with options high, mid, and low. 
This is updated in firestore as well. We customized the menu bar to match the style of the application with blue borders and 
Avenir font.

Additionally, we've replaced the initial text "New item" in the text box with a filler "New item" that disappears when the user
clicks on the box to edit.

New User Testing

Marcos: Doesn't quite understand priority label name choices -- names should be more intuitive. He also thinks 
        the default for the show uncompleted should be flipped. Sorting by name while editing name is a little 
        annoying -- suggested creating our own sort function. 

Koby: Was pleased with the ability to hide items. Button labels should be bigger, thinks priority should be
     not set to high, or perhaps nothing at all -- introduce a no priority option. Would be nice to have a 
     confirmation button for deletion. Likes the pencil icon which signifies you can edit.

Meggie: Started by deleting everything, was easy to do. Very satisfying to hit enter to save the task item. 
Very satisfying for task items to sort automatically as we're typing. Should have a pop-up warming for deletion.
Love the pencil icon - great design choice. Sees no issues with adding multiple items. Coveneient that the delete and 
hide buttons move with the user as they scroll down. Great color scheme. 


Lab 4 Updates

Accessibility:

Keyboard accessibility video: https://youtu.be/bAf49JZbX6I
Voiceover accessibility video: https://youtu.be/EtpYchwYGUo

We enlarged the font size of the buttons, drop-down menu, and task items to be 12pt (16px), following the minimum guideline. Furthermore, we ensured that the blue, grey, and blacks we used in our design fit the specifications of contrast for easy access. We checked each shade by using the Contrast Checker tool on WebAim and made sure that large text had a ratio of 3:1 and smaller text had a ratio of 4.5:1 for color contrast.

We also spent a considerable amount of time making sure the voice-over was functional and corresponded to how a user may interact with our application. We added Aria labels in a few different spots, including the buttons (add a new item, create a new item, delete list, hide completed, delete completed) so that the voiceover not only described the button but also specified which list (by the list name) the user was interacting with.

Responsive Design:

Our application design accounts for resizing in a couple of ways. 1) As the user expands/collapses the screen, the list name moves along with it and stays centered. 2) As we played around with the responsive design, we realized the buttons at the bottom of each list moved in a weird way. We fixed this by introducing a grid structure that facilitated screen movement. 3) We also made the borders and highlighted background be responsive with the changing screen sizes.

Other Design Updates and Reflections

We decided to move all the functionality of a task list (create a new item, sorting, delete completed, etc.) to a separate component from SignedInApp. This way, the user can interact with and manipulate task lists individually. Transferring the functionality of lists from the SignedInApp component to the TaskList component proved to be challenging, as it required us to rethink the hierarchy of our app while also tweaking the code to fit this new component. Overall, a lot of the functionality between lists and task items stayed the same, it just required a bit of restructuring.
We decided to include an editable list name that operates similarly to the new task name textbox. We also added a third button that allows the user to delete the list.


As for the UI, we took inspiration from Dr. Milburn’s design principles by drawing parallels between how a user creates new items and creates a new list. We think this makes the SignedInApp more intuitive and aesthetic.

New User Testing: 

Liz: Thought this is a super useful app since there's multiple ways to sort the tasks. Really like the priority feature. 
Date seems cool but would be more helpful if she could specify due date as well. All the buttons are very accessible. Thought
That making the "hide completed/delete items" as a bit too big since they stand out more than the create new item button.
Would use this regularly in her life.

Angela: Really likes that you can choose to hide and show the completed items, since many to-do types of apps just automatically 
send things to the bottom or hide items. Also likes the ability to sort the items in different ways. One major design flaw, 
however, is the inability to add longer, multi-line tasks; i.e. the words get cut off.

Rachel: - The create a new list button needs to have some action that mimics clicking because I clicked it like 5 times thinking it didn’t do anything when it did create new lists. The user just can’t see them because they are lower on the page than the view
- I like how when I am inputting the name for the list it automatically/ immediately checks and sorts them when I am inputting
- When I click on ‘hide completed items’ when there are items I have already completed and then click ‘delete completed items’ then the button does feel like I did an action but because I can’t see it being done it doesn’t truly feel compelled. Also the “show all items’ button is still showing after I have clicked ‘delete completed items’ but the only items left are the ones showing on the list so the button for “show all items’ might needs to change back to hide completed items
- For the sort by date option I am unsure how how to go about inputing or sorting by the date because the form of putting my own date in and then applying a low, medium, high value to it doesn’t feel right. Maybe when the user clicks the sort by date option, have a format of _ _/_ _ /_ _ _ _ pop up next to the name of the task
- Lastly, there might be too many pre made lists when the user first visits the page. I suggest just starting with one and letting the user go from there
- Overall, I really like this interface because it is simple and straightforward. I was able to easily understand what was required of me. Based on the usability principles the simplicity is great, the familiarity is done well, the consistency is great, the guidance can use work on what I said above, direct feedback can also use a bit more attention in places, and good information architecture is great because it is presented as you understand my mental model

Michael: All the key functionality of a to-do list is there, so good job there. 
One thing that is a bit unclear is the checkmarks, if you put “show all items” “delete completed items” button up top, then people know what to do
And don’t forget about spacing if you can, things are a bit scrunched up like single spaced papers

Andrea:

pros:
- the hide/delete completed items tasks
- the priority ranking feature
- ability to have different types of lists
-sorted by option is handy

cons:

-not much, but I think creating a separate feature for due dates would be helpful/less confusing instead of typing the dates into the title item!

-additional idea (but not necessary) is to add in a collapse&expand feature for each of the lists that would just show the title

Lab 5 Updates:

For this lab, we focused on creating a log-in for users, list sharing, and ensuring that there is sufficient security through
firestore rules. With these new features, we still ensured that our app is accessible to all screen sizes and people with 
visual disabilities, as well as remain aesthetically pleasing using Dr. Milburn's Principles of Design. 

We decided to have a landing page that required users to log into an account or would be able to create an account before 
they can access the features of our app. To design this, we used the same Avenir font and purple, grey, and black color 
scheme as our app. We also ensured that this landing page is accessible by using a 12 pt font size or higher and colors that
fit the qualifications of contrast for vision-impaired users. 

After the user logs into their account, their name appears on the top left of the page. They also have options to sign
out and verify their accounts for security reasons. We designed this to use the same color scheme and font choice as the
rest of our app, and stuck with the left alignment, and used 2-3 fonts, keeping Dr. Milburn's Principles of Design in mind.

We decided to initiate sharing by creating an alert that would pop up when the owner clicks the share button, in which they
can type in another user's email. This alert function makes it easy for the owner to share with whomever they like, and we
designed it so that there is a grey backdrop across the entire screenpage for responsive design and aesthetic unity across the page. 

We also created buttons to indicate list sharing and to show a user's own lists and used these questions
to drive how our app would look, depending on if they are verified or unverified or if they own the document:  


If user A shares a list with user B, can user B share that list with user C?

No! We disable the share feature from shared lists that do not belong to the user. Our firebase rules also reflect this by making sure when a doc is updated, the owner doesn’t change and the sharedWith array still includes the user.

If user A shares a list with user B, can user B delete that list?

Also no! We disabled this by removing the delete button from shared lists. We also reinforced this design in our firebase rules by making sure only the doc owner can delete.

If user A shares a list with user B, does user B need to accept that sharing, or will a shared list just show up?

The shared list simply shows up, however we do give the user the option to show only their lists and hide the lists shared from other users.

Should shared lists be distinguishable in the UI from unshared lists?

Yes! We’ve distinguished owned lists from shared lists by annotating each list with the owner’s email at the top.

If user A shares a list with user B, can user B see that list if they don't have a verified email address?

No! While user A can still share a list with an unverified user, the list will not show up until user B verifies their account. We did this by having two possible queries depending on the account verification. Our firebase rules also reflect the verification designs by only allowing read and update if the user is verified.

With these new share buttons, we ensured that our app still had responsive design for different screen sizes and was easy to 
read visually. We ensured that our design was most optimal by using CSS, toggling with different ordering of the buttons 
on the interface in the actual code, and through user testing. 

Updated User Testing:

Hannah: She liked the color scheme and the structure of the website. However, she doesn’t like that you have to scroll down to see the new list added. She also noticed that long entries in the text box fields get cut off and didn’t like that.


Lily: She liked the priority feature and the idea of sharing a to do list with another person. She asked if there was an ability to leave a shared list and was disappointed that you couldn’t. Thinks the app could use some more fun colors — but we explained our design principles and color palette choice.


Lara: She found the to do lists pretty intuitive to use. She also thought sharing to do lists was cool and interesting. She seemed confused by the log in page and thought maybe we should try to differentiate a new log in from a previous. Also suggested that sorting by category might be helpful.

Overall, we enjoyed the challenge of learning how firestore rules worked, since that was most difficult part of our lab. 
We had to write several new functions, such as isSharedOnlyWithMe and stillSharedWithMe in our firestore rules to ensure 
that our app had the best security. We're glad to see everything come together and are excited to use this app in our own time. 