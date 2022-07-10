import React, { useEffect } from 'react'

const { kakao } = window;

const KakaoMapScript= ()=> {
    useEffect(()=>{
        var container = document.getElementById('map');
        var options = {
          center: new kakao.maps.LatLng(37.49928974152092, 129.10692762173804),
          level: 2
        };
    
        var map = new kakao.maps.Map(container, options);
        var markerPosition  = new kakao.maps.LatLng(37.49928974152092, 129.10692762173804); 
        var marker = new kakao.maps.Marker({
          position: markerPosition
      });
      marker.setMap(map);
      // container.style.width = "700px"
      // container.style.height = '650px'; 
      map.relayout();
        }, [])
    
    
        return (
            <div id="map" className='kakaomap'></div>
        )
}

export default KakaoMapScript;