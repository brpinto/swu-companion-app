# SWU Companion

Hi there ! 👋 <br>
I am Bruno Pinto, a french mobile developer for 4 years.<br><br>
Thanks for your interest about SWU Companion, feel free to reach out to me on [Bluesky - @mrbrounch](https://bsky.app/profile/mrbrounch.bsky.social) if you have suggestions/questions about the project, or if you just want to chat about Star Wars: Unlimited 🤘

You can also reach out the community through [discussions](https://github.com/brpinto/swu-companion-app/discussions/categories/ideas)

Please note that this repository is still work in progress, thanks !

### Disclaimer

SWU Companion is an unofficial companion app for Star Wars: Unlimited. It is not affiliated with, endorsed, sponsored, or approved by Fantasy Flight Games, Asmodee, Lucasfilm Ltd., or Disney.

Star Wars: Unlimited, its logo, artwork, and card designs are the property of their respective owners. This app is intended for informational and reference purposes under fair use guidelines. If any content needs to be removed or modified, please contact us.

## Features

- Check existing cards
- Search specific cards
- Add cards to your collection
- Deck building (🚧)
- Read rules (🧭)

## Installation

Install the dependencies using `yarn` command.
First create a local `.env` file in order to put environment variables needed for the project with the following :

```bash
EXPO_PUBLIC_API_URL=http://localhost:3000
```

As SWU Companion is using its own API to request cards database, you will have to take a look at the public API repository too.

## Usage

As an application built with Expo, you can either launch the app with Expo, Android Studio or Xcode

```bash
# building with npx (brackets not needed)
npx expo run:[ios/android]

# building with yarn
yarn run [ios/android]
```

As **Android** requires a safe environment to run, you will probably need to use a tool like **ngrok** for it to work with the API we use to get cards informations :

```bash
# generate a secure URL for port 3000
ngrok http 3000
```

Just replace the `localhost:3000` URL in the `.env` file (you need to create it yourself) by the generated https forwarding URL.

If your want to build SWU Companion with Android Studio or Xcode, make sure to prebuild the app first :

```bash
# using npx or yarn
[npx/yarn] expo prebuild --platform [android/ios]
```

## Learn more

To learn more about developing with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.
