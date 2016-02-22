var noble = require('noble');

noble.on('stateChange', function(state) {
  if (state === 'poweredOn') {
    // Seek for peripherals broadcasting the heart rate service
    // This will pick up a Polar H7 and should pick up other ble heart rate bands
    // Will use whichever the first one discovered is if more than one are in range
    noble.startScanning(["180d"]);
  } else {
    noble.stopScanning();
  }
});

noble.on('discover', function(peripheral) {
  // Once peripheral is discovered, stop scanning
  noble.stopScanning();

  // connect to the heart rate sensor
  peripheral.connect(function(error){
    // 180d is the bluetooth service for heart rate:
    // https://developer.bluetooth.org/gatt/services/Pages/ServiceViewer.aspx?u=org.bluetooth.service.heart_rate.xml
    var serviceUUID = ["180d"];
    // 2a37 is the characteristic for heart rate measurement
    // https://developer.bluetooth.org/gatt/characteristics/Pages/CharacteristicViewer.aspx?u=org.bluetooth.characteristic.heart_rate_measurement.xml
    var characteristicUUID = ["2a37"];

    // use noble's discoverSomeServicesAndCharacteristics
    // scoped to the heart rate service and measurement characteristic
    peripheral.discoverSomeServicesAndCharacteristics(serviceUUID, characteristicUUID, function(error, services, characteristics){
      characteristics[0].notify(true, function(error){
        characteristics[0].on('data', function(data, isNotification){
          // Upon receiving data, output the BPM
          // The actual BPM data is stored in the 2nd bit in data (at array index 1)
          // Thanks Steve Daniel: http://www.raywenderlich.com/52080/introduction-core-bluetooth-building-heart-rate-monitor
          // Measurement docs here: https://developer.bluetooth.org/gatt/characteristics/Pages/CharacteristicViewer.aspx?u=org.bluetooth.characteristic.heart_rate_measurement.xml
          console.log('data is: ' + data[1]);
        });
      });
    });
  });
});
