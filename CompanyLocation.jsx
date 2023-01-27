import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api'
import './CompanyLocation.css'
import mapStyles from '../../../data/mapStyles'

const mapContainerStyle = { width: '100%', height: '100%', borderRadius: 5 }

const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    clickableIcons: false,
}

const libraries = ['places']

export default function CompanyLocation({ activeCompany }) {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries
    })

    if (!isLoaded) return

    return (
        <div className="secondFragment" style={{ padding: 5 }}>
            <div className="mapContainer">
                {activeCompany?.address?.geocode && (
                    <GoogleMap
                        zoom={11}
                        center={{ lat: Number(activeCompany.address?.geocode?.lat), lng: Number(activeCompany.address?.geocode?.lng) }}
                        options={options}
                        mapContainerStyle={mapContainerStyle}
                    >
                        <MarkerF
                            position={{ lat: Number(activeCompany.address?.geocode?.lat), lng: Number(activeCompany.address?.geocode?.lng) }}
                            icon={'/pin.svg'}
                        />
                    </GoogleMap>
                )}
            </div>
        </div>
    )
}