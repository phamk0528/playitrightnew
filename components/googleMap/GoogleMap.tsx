import React from "react";
import GoogleMapReact from "google-map-react";
import MyMarker from "./MyPlace";

const distanceToMouse = (pt: any, mp: any) => {
  if (pt && mp) {
    // return distance between the marker and mouse pointer
    return Math.sqrt(
      (pt.x - mp.x) * (pt.x - mp.x) + (pt.y - mp.y) * (pt.y - mp.y)
    );
  }
};

type Props = {
  google_api: string;
  lng: any;
  lat: any;
};

const SimpleMap = ({ google_api, lat, lng }: any) => {
  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "70vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          // remove the key if you want to fork
          key: google_api,
          language: "en",
          region: "US",
        }}
        defaultCenter={{ lat: 51.506, lng: -0.169 }}
        defaultZoom={15}
        distanceToMouse={distanceToMouse}
      >
        <MyMarker lat={lat} lng={lng} text="I12 Katong" />
      </GoogleMapReact>
    </div>
  );
};

export default SimpleMap;
