# Log heart rate from a Polar H7 using node

A rudamentary example of using [Noble](https://github.com/sandeepmistry/noble) to listen to heart rate data from a Polar H7 bluetooth heart rate sensor.

`index.js` is pretty short and thoroughly commented. The code is pretty naive, it just finds the first bluetooth peripheral transmitting the bluetooth heart rate service and listens for the measurement data.

## How to use this

- [Install node](https://nodejs.org/en/download/)
- Clone this repo
- In the root directory, run `npm install` to install noble
- While wearing the Polar H7, run `node index.js`
- After a few seconds, you should see heart rate data logged into the terminal

## Notes
This _should_ function with other bluetooth heart rate sensors that broadcast the 180d service.
This does not include Fitbit Charge HR - to my knowledge the Charge HR does not broadcast the
heart rate service over bluetooth.


## Resources
Some good resources for more on listening to bluetooth heart rate:

[Introduction to Core Bluetooth: Building a Heart Rate Monitor](http://www.raywenderlich.com/52080/introduction-core-bluetooth-building-heart-rate-monitor)

[Mac Developer Library: CoreBluetooth Heart Rate Monitor](https://developer.apple.com/library/mac/samplecode/HeartRateMonitor/Introduction/Intro.html)
