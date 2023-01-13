# Canal + Code Challenge

## Set up

To start the project locally, run the following commands:

```sh
npm i
npm start
```

## Architecture

The project uses the same architecture (modules, controllers, components) as the full demo of the rx-player.

## Additional Libraries

Mui is used to provide basic components

## Styling

All styling is done through the sx prop of the Mui components, and the theme colors are defined in src/theme.js

## Features

The following features were implemented:

- Stream playing with rx-player
- Custom controls:
  -- Play/Pause button
  -- Time indicator with duration formatting
  -- Progress bar with time selection
  -- Fullscreen button
- Scenes list display and specific scene jump action
- Crew members list display

## Limitations and next steps

The `sh /scene/{timecode} ` endpoint is returning a relative path for the image property in the response from the API. Therefore, a background image cannot be set as intended in the Scene component.

Also, an index is used as a key in the map function to identify each crew member as the API returns the same id for them all.

When the video ends, the page needs to be reloaded in order to play the video again.

The next steps could be the implementation of a proper state management system, a responsive design as well as a better semantic for the Mui components
