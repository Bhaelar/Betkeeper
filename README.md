# Betkeeper
Betkeeper is an application that allows users keep track of their: bets, profits or losses, favourite competitions, etc.

It also implements a sort feature that lets you view your previous bets according to various sort parameters.

App can be viewed live [here](https://mybetkeeper.herokuapp.com)

## Quick Start
**Add a default.json file in config folder with the following** (Remove <> when inputting values)
```
{
    "SQL_USERNAME": "<mysql username>",
    "SQL_PASSWORD": "mysql password",
    "SQL_DATABASE": "<mysql database name>",
    "jwtSecret": "<jwt secret key>"
}
```

**Add a .env file in the root of client folder with the following** (Remove <> when inputting values)
```
REACT_APP_IMGUR_CLIENT_ID=<imgur client id>
```

**Install server dependencies**
```
npm install
```

**Install client dependencies**
```
cd client
npm install
```

**Run both Express & React from root**
```
npm run dev
```
