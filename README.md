# DISCONTINUED

I decided to stop development once @QuantumMob shipped its excellent [Dealmap](https://dealmap.io/) app first ☺️

# Happy Finder

![Animated gif showing example usage](./happy-finder.gif)

Happy Finder is a mobile app that finds food and drink deals near you based on your current location, searching through a crowd sourced list of restaurants and bars accessed through [happy-finder-server]().

**NOTE:** Currnetly supports iOS _only_.

## LOCAL SETUP

After cloning the repo and installing dependencies via `npm install`, follow the steps below to get up and running.

1. Install Xcode.
2. Clone [happy-finder-server]() and follow setup instructions, running the server locally.
3. Create `env.json`, using `env.json.ex` as a template, and fill in any missing values for your environment.
4. Start emulator by running `npm run ios`.

You should now have a running local envirnment in an iOS emulator.
