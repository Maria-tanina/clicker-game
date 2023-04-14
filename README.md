# Marvel clicker-game
To run the game, you need to run it on your localhost, as the system of js module export/import is used. Follow the instruction below:
1. Download the project folder.
2. Run the command below in the terminal from the root directory (this is required to download the http-server package):  
**npm i**
3. After you download the dependency package, run the following command in the terminal:  
**./node_modules/.bin/http-server -a localhost -p 8000 -c-1**
4. Open http://localhost:8000/ link that will appear in your terminal
5. Enjoy the game!

**Useful information: The registration form will open only 1 time, and will not disturb you when you reload the page. In this game you can fight with marvel characters. At each level, artifacts will drop out that will help you in the battle. Good luck!**  

**Some notes on the architecture of the application: I tried to make it scalable, "databases" with a list of characters, artifacts and rewards are used to display data.**
  ![prev](https://user-images.githubusercontent.com/107557939/231953436-7d494630-2481-41db-9421-05b0edd0b62e.jpg)
  
