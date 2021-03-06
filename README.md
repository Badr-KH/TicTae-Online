# Tic-Tac Online

Tic-Tac Online is an application where users can play the famous game of tic tac toe against other human players.
This App was developed with the use of sockets to enable real-time feedback.

To access the deployed version of this application,please follow this link : https://tictac-online.herokuapp.com/

## Installation

To install Tic-tae Online on your local device. Follow the instructions below:

First make sure you are in the root directory and then run the following commands :

```bash
npm install
```

## Post-Installation

After you have installed the app, make sure to create a .env file to setup your environment variables.

Our app depends on two environment variables to run properly.
The first one is tokenSecret, and the second one is connectionString.

Set them up like shown in the following example:

```bash
tokenSecret="YOUR TOKEN SECRET GOES HERE"
connectionString="Your mongodb's connection string goes here"
```

## Run the application

Finally, after installing the application and have finished setting up your environment variables. You can run the app by running the following commands.

```bash
npm run dev
```

Please note that you won't have access to the "login with facebook" functionality.
If you would like to have that available in your local server. Please send me a message and I would be happy to explain how to set it up.

## Contributing

Spotted a bug or have noticed something not working ? Please feel free to create a new issue.
Pull requests are accepted.

## License

[MIT](https://choosealicense.com/licenses/mit/)
