--Readme document for Sherard Dalaguit, dalaguis@uci.edu, 89802540--

1. How many assignment points do you believe you completed (replace the *'s with your numbers)?
10

10/10
- 1/1 The ability to log overnight sleep
- 1/1 The ability to log sleepiness during the day
- 1/1 The ability to view these two categories of logged data
- 2/2 Either using a native device resource or backing up logged data (i chose backing up data)
- 2/2 Following good principles of mobile design
- 2/2 Creating a compelling app
- 1/1 A readme and demo video which explains how these features were implemented and their design rationale

2. How long, in hours, did it take you to complete this assignment?
About 7-8 hours


3. What online resources did you consult when completing this assignment? (list specific URLs)
https://stackoverflow.com/questions/46972950/ionic-make-modal-page-fit-content-height
- stackoverflow for helping with modals
https://ionicframework.com/docs/api/range
- ionic docs for helping with sleepiness level range slider
https://ionicframework.com/docs/api/card
- ionic docs for helping with history cards
https://coolors.co/palettes/trending
- coolors.co for color theme ideas


4. What classmates or other individuals did you consult as part of this assignment? What did you discuss?
n/a


5. Is there anything special we need to know in order to run your code?
not that i can think of, just ionic serve


--Aim for no more than two sentences for each of the following questions.--


6. Did you design your app with a particular type of user in mind? If so, whom?
I didn't have a particular user in mind, other than myself. I just prefer minimalist, simple apps, so that's what I tried to implement.


7. Did you design your app specifically for iOS or Android, or both?
I didn't intentionally aim for either, but looking back at my demo video, I realized I had the device set to "iPhone 14 Pro Max".
However, it should work just fine for both


8. How can a person log overnight sleep in your app? Why did you choose to support logging overnight sleep in this way?
In the home page, there is a button labeled "Log Sleep", which opens up a Sleep Modal that allows them to pick the starting and end dates/times of their sleep. I chose to support logging overnight sleep this way because it is easier to visualize and demonstrate for the demo video lol.


9. How can a person log sleepiness during the day in your app? Why did you choose to support logging sleepiness in this way?
In the home page, there is a button labeled "Log Sleepiness", which opens up a Sleepiness Modal that allows them to pick their current mood based on a slider. I chose to support logging sleepiness in this way because I saw it in one of the example videos (Thomas 2) and thought it was pretty simple to implement.


10. How can a person view the data they logged in your app? Why did you choose to support viewing logged data in this way?
In the home page, there is a button labeled "View History", which opens up a History Modal that shows one category of information at a time, depending on what the user has selected. I chose to support viewing logged data in this way because it keeps the main interface uncluttered, yet still provides quick access to the user's past records.


11. Which feature choose--using a native device resource, backing up logged data, or both?
backing up logged data


12. If you used a native device resource, what feature did you add? How does this feature change the app's experience for a user?
n/a


13. If you backed up logged data, where does it back up to?
I used Ionic Storage to save the logged data locally on the user's device. It persists in the device's storage so the data remains available across app sessions.

14. How does your app implement or follow principles of good mobile design?
My app follows good mobile design principles by using Ionic's native components for responsive layouts, intuitive navigation, and clear visual hierarchy. It minimizes clutter with different modals and segmented controls for data entry and history viewing, while storing data for persistent access, ensuring a smooth, user-friendly experience.
