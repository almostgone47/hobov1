import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import tt from '@tomtom-international/web-sdk-maps';
import './Map.scss';
 
const Map = (props) => {
  const markerDiv = document.createElement('div');
  markerDiv.className = 'hobov-marker';
  
  useEffect(() => {
    const lat = props.rentalLocation.lat || 1;
    const lon = props.rentalLocation.lon || 1;
    console.log('MAP PROPS: ', props, 'LAT: ', lat, 'LON: ', lon)
    const map = tt.map({
      key: 'XVGNGBASbRA59WTKYrsYHsLeeTZL0WqO',
      container: 'map',
      style: 'tomtom://vector/1/basic-main',
      center: [lon, lat],
      zoom: 10
    });
    new tt.Marker({
      element: markerDiv
    }).setLngLat([lon, lat]).addTo(map);
    new tt.Popup({className: 'hobov-popup'}).setLngLat([lon, lat]).setHTML(`<p>RENT THIS PLACE</p>`).addTo(map);
    map.addControl(new tt.FullscreenControl());
    map.addControl(new tt.NavigationControl());
  }, [props])

  return (
    // Important! Always set the container height explicitly
    <div id="map"></div>
  );
}

const mapStateToProps = state => {
  return {
    rental: state.rentalData.rental,
    rentalLocation: state.rentalData.rentalLocation
  }
}

export default connect(mapStateToProps)(Map);