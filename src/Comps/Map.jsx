import React from 'react';
import GoogleMapReact from 'google-map-react';
import './style.css'

const AnyReactComponent = ({ text }) => <div className="red-text">{text}</div>;

function SimpleMap(props) {

    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '75vh', width: '80vw' }}>
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
                <AnyReactComponent
                    lat={parseFloat(props.lat)}
                    lng={parseFloat(props.lng)}
                    text={"."}
                >
                </AnyReactComponent>

                
            </GoogleMapReact>
        </div>
    );
}


export default SimpleMap;