cryptparty
---

A zero-knowledge cryptpad-inspired event invitation system.

Apologies for the poor documentation, this is a work in progress as at June 2019.

# Architecture

There are 2 pieces to this. `app/` is a frontend `create-react-app` based React app built with TypeScript. `server/` is a backend data storage app, also built with TypeScript, using `nedb` for simple storage locally on disk.

# Running locally

You need `git`, `yarn` and `node` to get this running.

On a mac, install [homebrew](https://brew.sh/). Then:

- Open Terminal
- `brew install yarn`
- Go to the directory where you want to install `cryptparty`
- `git clone https://github.com/chmac/cryptparty.git`g
- `cd cryptparty`
- `cd server`
- `yarn`
- `yarn start`
- Now open a second terminal and go to the `cryptparty` folder
- `cd app`
- `yarn`
- `yarn start`

Now you should have this running locally.
