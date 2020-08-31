# CAEBO Company Hub
CS4920 Spring 2020 CAEBO-Company-Hub Project

---

# Developers:
- Isaac Prost
- Kyle Graber
- Aaron Adams
- Darien Hayes
- Steffen Schwarz

            
## READ THIS PLEASE: 

 The front-end React code is in the /CAEBO-Company-Hub/client folder. I have replicated the ideal project structure (directory wise). We want all of our components in separate folders in the components root folder (i.e. if we have a Login.js component, then create a new folder under /CAEBO-Company-Hub/client/components folder called Login.js. Name convention is capital in the filename.). With containers (clesses that will hold these components and ultimately be rendered to the DOM) do the same thing under the containers folder. Realistically we should have more component than containers. The styling files should be in the same directory with the same name as the components. We most likely will NOT have to style ur containers, as most of the styling will be done within each component.                                                                                                                                             
* The previous explanation of the file structure is very important to the project, especially when we have many people working on it. This will save us serious headache if we all just follow the name and file creation conventions. 
* If you have any detailed questions on this concern just let either Kyle or Isaac know. 
* The main server is in the root directory: /CAEBO-Company-Hub/server.js. This is our backend. It will host the React page and process GET and POST requests sent to the server. 

---

# Instructions for setting up your development environment:

1. Download git [here](https://git-scm.com/downloads)

2. Clone the Repository
        `git clone https://github.com/ucmo-cs/CAEBO-Company-Hub.git`

3. Downloading Node JS is necessary to complete any further steps. Link [here](https://nodejs.org/en/)
    
4. Install nodemon and yearn globally with:<br/>
        `npm install i nodemon -g`<br/>
        `npm install i yarn -g`
    
5. After installing these, there are more packages to install. (Run these commands in the root folder, you can install them all at once by separating each package with a space):<br/>
        `npm install express`<br/>
        `npm install mysql`<br/>
        `npm install body-parser`<br/>
        `npm install concurrently`<br/>
        `npm install redux`<br>
        `npm install react-redux`<br>
        `npm install redux-thunk`<br>
        `npm install jsonwebtoken`<br>
        `npm install jwt-decode`<br>
        `npm install classnames`<br>
        `npm install axios`<br>
        `npm install prop-types`<br>
        `npm install -g eslint`
    
6. Now navigate to the root directory of the project in a command prompt or terminal (if you want to just run the server to test API functions, just run nodemon server.js). <br/>
        `nodemon server.js`<br/>
        `yarn dev`
    
7. The node server should start and then listen on 3000. This is due to one line in the ./client/package.json The line is the proxy line at the end of the file which tells the React app to listen on 5000, which is our Node JS back end.
    
8. You'll notice the localhost:3000 url automatically opens. This is our /api/GET path for the API. 
    
9. You can play around with the API by shutting down the server, then instead running 'nodemon server.js'. Then you can type URL's such as:
   * localhost:5000/api/users -> to get all users in DB  
   * localhost:5000/api/users/<username> -> To get a specific user in DB by username  

---

# GIT Commands you will use

1. To Change Branches<br/>
        `git branch: Checks which branch you are currently in and lists all other branches`<br/>
        `git checkout branch_name: Changes your branch to branch_name`<br/>
        `git checkout -b branch_name: Creates a new branch named branch_name and switches your branch to that branch`

2.  To Commit code to Current Branch<br/>
        `git status: Checks the status of all files that you made changes to`<br/>
        `git add -A: Adds all the files you have made changes to staged to commit`<br/>
        `git commit -m "message": Commits your code with a certain message but doesnt put them in the branch so others can pull`<br/>
        `git push origin branch_name: Pushes code to the actual branch_name`

3. Pull code from the current branch<br/>
        `git pull: Pulls all of the code that is new from the branch`

