import React, { useEffect } from 'react';
import tt from '@tomtom-international/web-sdk-maps';
import './Map.scss';
 
const Map = () => {

  useEffect(() => {
    const map = tt.map({
      key: 'XVGNGBASbRA59WTKYrsYHsLeeTZL0WqO',
      container: 'hobov-map',
      style: 'tomtom://vector/1/basic-main'
    });
    map.addControl(new tt.NavigationControl());
  }, [])

  return (
    // Important! Always set the container height explicitly
    <div id="hobov-map"></div>
  );
}

export default Map;