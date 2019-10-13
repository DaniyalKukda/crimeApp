import React from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

class MapInput extends React.Component {
    render() {
        return (
            <GooglePlacesAutocomplete
                placeholder="Search Location"
                minLength={2}
                autoFocus={true}
                returnKeyType={'search'}
                listViewDisplayed={false}
                fetchDetails={true}
                onPress={(data, details = null) => {
                    this.props.notifyChange(details.geometry.location);
                }}
                query={
                    {
                        key: "AIzaSyCAPUIrDtf9LfvQPcHj-qTtaJiLzW4uuqg",
                        language: "en"
                    }
                }
                nearbyPlacesAPI="https://maps.googleapis.com/maps/api/place/findplacefromtext/output?parameters"
                debounce={200}
            />
        )
    }
}
export default MapInput