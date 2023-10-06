github https: https://github.com/hickamt/React-Express-Template.git

# React / Express Application Template

Quickly set up a React application with a basic ExpressJS server.

## Clone Repository

1. Click on the Green 'Code' button and copy HTTPS url
2. From your terminal (in the root directory you want to clone this to)

```bash
$ git clone https://github.com/hickamt/React-Express-Template.git
```

3. Then, login to GitHub and create a new repository
4. Give the new repo a name but leave it public and do NOT add a license (just continue)
5. Back in your terminal type the following:

```bash
$ git remote rename origin <give remote a new name>
```

```bash
$ git remote add origin <Your HTTPS GitHub Repo URL>
```

```bash
$ git branch -M main
```

```bash
$ git push -u origin main
```

## SetUp

Quickly install all dependencies for the client and server directories using:

```bash
$ npm run setup
```

## Run Developer Mode

Run the following command to initiate the development mode. This should spin up:

- React server (localhost:5173)
- Express server (localhost:5500)

```bash
$ npm run dev
```

## Other NPM Scripts

In the /package.json file there are a few other scripts that you might use or modify:

```bash
  "save": "git add . && git commit -m 'quick save'",
  "devcode": "code . && npm run dev",
  "dev": "concurrently \"npm run server\" \"npm run client\" ",
```

## Local Express Server API's

There are two api calls to choose from.

- [Local State Controller](./express_server/controllers/localStateController.js)
- [Queries Controller](./express_server/controllers/queriesController.js)

1. /localStateController: allows you to post or get a custom local theme. Currently, the .json object for themes "./express_server/local_state/state.json" is a mock-up with general key:value names. This can be used to maintain state for the Client side.

2. /queriesController: handles the Post request containing user data for the following types 'assets', 'exchanges', 'purchases', 'sales', 'remaining':

- assets: an array cryptocurrency names

```js
const assets = ["amp", "btc", ...]
```

- exchanges: an array of cryptocurrency exchanges the user has purchased cryptocurrency coins/tokens from

```js
const exchanges  = ["Binance", "KuCoin", ...]
```

- purchases: an array of purchase data objects

```js
[
  {
    purchase_id: 'f8796e52-eef6-4010-b6c0-3e87bf939781',
    reward: true,
    service: 'Coinbase',
    asset: 'grt',
    purchase_date: '2021-07-28',
    year: 2021,
    spot_price: 0.563310001374476,
    quantity: 1.75746924,
    cost_basis: 0.989999999999999,
    message: ''
  },
  {
    ...
  }
]
```

- sales: an array of sales data objects

```js
[
  {
    sales_id: "fc5d44ae-745c-4717-89dc-2c1b99ada9b9",
    service: "KuCoin",
    asset: "usdc",
    sales_date: "2021-05-18",
    year: 2021,
    spot_price: 1,
    quantity: 0.6633,
    fee: 0.00066263,
    proceeds: 0.66263737,
    actual_spot: 0.9990010101010101,
    message: "",
  },
  {
    ...
  }
];
```

- remaining: an array of the remaining quantity of coins/tokens for each asset

```js
[
  { asset: "amp", remaining: 0 },
  { asset: "bal", remaining: 0 },
  { asset: "bnb", remaining: 8.70343642860156 },
  { asset: "bond", remaining: 0 },
  { asset: "btc", remaining: 0.12628332 },
  { asset: "clv", remaining: 0 },
  { asset: "comp", remaining: 0 },
  { asset: "doge", remaining: 324.60691196 },
  { asset: "dot", remaining: 473.6851422599 },
  { asset: "eth", remaining: 2.2990129999 },
  { asset: "fet", remaining: 0 },
  { asset: "forth", remaining: 0 },
];
```

## Express Queries Endpoint Requirements

The "/express_server/controllers/queriesController.js" endpoint is a POST request. POST requests use a 'data: {}' object.

The 'queries' endpoint uses your 'query' object to distinguish between the type of data requested. Your 'query' object must be a string with one of the following values:

```js
query = "assets" | "exchanges" | "purchases" | "sales" | "remaining";
```

You can use your console to view the requested 'query' object and its format, and is helpful when debugging your api call, data response, and use of that data object on the client side.

```jsx
function yourClientQueryFunction(query) {
  return (
    axios
      // The server endpoint is: 'queries' statically coded here
      .post("http://localhost:5500/queries", {
        headers: {
          "Content-Type": "application/json",
        },
        // The data.query object is a 'string' such as 'assets' or 'purchases'
        data: {
          query: query,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw new Error(`Unable to retrieve the ${query} data from server`);
      })
  );
}
```

## Git

Create a new branch and switch to the branch

```bash
$ git checkout -b new-component-change
```

Switch to another branch

```bash
$ git checkout existing-branch-name
```

Delete a branch (AFTER MERGE)
- (Also, delete on GitHub)

```bash
# remote-branch is 'origin'
$ git push -d remote-name branch-name

# force delete with flag -D
$ git push -D remote-name branch-name
```

See the differences between last change(s)

```bash
$ git diff
```

See a log of changes (and hash values to choose from for differences)

```bash
# use 'q' to exit and 'page down' to view more
$ git log
```
## Git Pull

When you are working on another branch many changes may have occured. You should request a pull of the master/main to update your working branch.
```bash
# From your working branch: git update from main
$ git pull origin main
```

## Git Errors

When switching between branch and origin main an error like the following may occur:
```bash
Switched to branch 'main'
Your branch and 'origin/main' have diverged,
and have 2 and 1 different commits each, respectively.
  (use "git pull" to merge the remote branch into yours)
```

Resolved the issue using
```bash
# stash any changes made first
$ git stash

# fetch origin
$ git fetch origin
```
I did not have to use ```git reset -hard origin main``` and successfully completed git add . && git commit -m "message" and git push.
