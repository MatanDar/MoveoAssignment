import React from 'react';
import GoogleMapReact from 'google-map-react';
import './style.css'
import RoomIcon from '@mui/icons-material/Room';


const MapPin = ({ pic }) => {
    return <RoomIcon></RoomIcon>
}

function SimpleMap(props) {
    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '75vh', width: '80vw', marginBottom: "2em" }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyCwHNBrLVCEewbxBDq5oxjoiGWmO5RGwrM" }}
                defaultCenter={{
                    lat: 32.011261,
                    lng: 34.774811
                }}
                center={{
                    lat: parseFloat(props.lat),
                    lng: parseFloat(props.lng)
                }}
                defaultZoom={11}
            >
                <MapPin
                    lat={parseFloat(props.lat)}
                    lng={parseFloat(props.lng)}
                    pic={RoomIcon}
                >

                </MapPin>
            </GoogleMapReact>
        </div>
    );
}


export default SimpleMap;