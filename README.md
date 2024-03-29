# videoask-custom-provider
This custom React provider provides an easy way to integrate VideoAsk interactive videos into your React applications. With this, you can effortlessly embed VideoAsk elements and handle events within your React components.

## Installation

You can install the VideoAsk React Custom Provider via npm or yarn:

```bash
npm install @altmind-digital/videoask-custom-provider

or 

yarn add @altmind-digital/videoask-custom-provider
```

## Usage
To use the VideoAsk React Custom Provider, simply import it into your React component and call it:

```bash
  const videoAskConfig = {
    kind: 'widget',
    // eslint-disable-next-line max-len
    url: `https://www.videoask.com/[YOURVIDEOID]?YOURCUSTOMVARIABLES`,
    options: {
      widgetType: 'VideoThumbnailExtraLarge',
      text: '',
      backgroundColor: '#7E3DD4',
      position: 'bottom-right',
      dismissible: true,
      videoPosition: 'center center',
    },
  };

  <VideoAskContextProvider
    config={videoAskConfig}
    callbacks={{ onCloseWidget, onMessage }}
  >
    <ShowWidget />
  </VideoAskContextProvider>
```

```bash
import { useContext, useEffect } from 'react';
import { VideoAskContext } from '@altmind-digital/videoask-custom-provider';

const ShowWidget = () => {
  const { showWidget } = useContext(VideoAskContext);
  useEffect(() => showWidget(), [showWidget]);
  return null;
};

export default ShowWidget;
```

## Features
- Easy Integration: Quickly embed VideoAsk elements into your React components.
- Event Handling: Handle events such as form submissions and button clicks from your VideoAsk video.
- Customization: Customize the appearance and behavior of your VideoAsk video directly from your React components.

## Documentation
For detailed documentation on the usage and available options of the VideoAsk React Custom Hook, refer to the official [documentation](https://www.videoask.com/help/embed/360059030911-embed-a-videoask-widget).

## Contributing
Contributions are welcome! If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request on the GitHub repository.

## License
This project is licensed under the MIT License - see the [LICENSE](https://github.com/altMindInc/videoask-custom-provider/blob/main/LICENSE) file for details.
