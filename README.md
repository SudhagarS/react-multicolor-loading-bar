# react-colored-loading-bar

Here is the [Demo](http://charts-demo.argick.com.s3-website.ap-south-1.amazonaws.com/).

## Installation

```bash
npm install --save react-multicolor-loading-bar
```

## Example Usage

```jsx
import React from 'react'
import Loadingbar from 'react-multicolor-loading-bar'

const App = () => {
  return (
    <div>
      <Loadingbar
        colors={[darkBlue, darkOrange, darkBlue, lightOrange]}
        height={5}
        cycleDurationInMs={200}
        positionAtTop={true}
      ></Loadingbar>
    </div>
  )
}

export default App
```

## Props

Below are the props you can pass to the Component to customize its behaviour.

| Prop                                | Type            | Default          | description |
| ----------------------------------- | --------------- | ---------------- | ----------- |
| colors                              | string[]        | -                | Colors codes to fill the loading bar with |
| height                              | number          | -                | Height of the bar |
| cycleDurationInMs                   | number          | -                | How soon you want to the bar to complete one cycle |
| positionAtTop                       | boolean         | -                | Whether to stick the bar at the top of the page |


## License

[ISC licensed](./LICENSE)
