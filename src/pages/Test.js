import React, { useEffect } from 'react';

const KakaoMap = () => {
  useEffect(() => {
    const existingScript = document.getElementById('kakao-map-script');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=ed218e43e083f32fc9b2e645cbee237d&autoload=false`;
      script.async = true;
      script.id = 'kakao-map-script';
      document.head.appendChild(script);

      script.onload = () => {
        window.kakao.maps.load(() => {
          const mapContainer = document.getElementById('map');
          const mapOption = {
            center: new window.kakao.maps.LatLng(33.450701, 126.570667),
            level: 3
          };
          const map = new window.kakao.maps.Map(mapContainer, mapOption);

          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
              const { latitude, longitude } = position.coords;
              const locPosition = new window.kakao.maps.LatLng(latitude, longitude);
              const message = '<div style="padding:5px;">You are here!</div>';

              const marker = new window.kakao.maps.Marker({
                map: map,
                position: locPosition
              });

              const infowindow = new window.kakao.maps.InfoWindow({
                content: message,
                removable: true
              });

              infowindow.open(map, marker);
              map.setCenter(locPosition);
            }, error => {
              console.error('Error getting geolocation: ', error);
            });
          } else {
            const locPosition = new window.kakao.maps.LatLng(33.450701, 126.570667);
            const message = 'Geolocation is not supported by this browser.';

            const marker = new window.kakao.maps.Marker({
              map: map,
              position: locPosition
            });

            const infowindow = new window.kakao.maps.InfoWindow({
              content: message,
              removable: true
            });

            infowindow.open(map, marker);
            map.setCenter(locPosition);
          }
        });
      };

      script.onerror = () => {
        console.error('Kakao Maps script could not be loaded.');
      };
    }
  }, []);

  return (
    <div id="map" style={{ width: '100%', height: '350px' }}></div>
  );
};

export default KakaoMap;
