import React from 'react';
import styled from 'styled-components'
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng
} from 'react-places-autocomplete'

function Autocomplete({ address, setAddress, setGeoPoint }) {

    const handleSelect = async value => {
        const results = await geocodeByAddress(value)
        const latLng = await getLatLng(results[0])
        setAddress(value)
        setGeoPoint(latLng)
    }

    return (
        <div>
            <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect} >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>
                        <Input {...getInputProps({ placeholder: "Locatie" })} />
                        <div>
                            {loading ? <div>...Aan het laden</div> : null}
                            {suggestions.map((suggestion) => {
                                const style = {
                                    backgroundColor: suggestion.active ? "#f1f1f1" : "#fff",
                                }
                                return <SuggestionsContainer key={suggestion.id} {...getSuggestionItemProps(suggestion, { style })}>{suggestion.description}</SuggestionsContainer>
                            })}
                        </div>
                    </div>
                )}
            </PlacesAutocomplete>
        </div>
    )
}

export default Autocomplete

const SuggestionsContainer = styled.div`
    border: 1px solid #B3B3B3;
    width: 100%;
    height: 36px;
    cursor: pointer;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding-left: 10px;
    font-weight: 500;
    font-size: 15px;
`

const Input = styled.input`
    margin-top: 2%;
    height: 46px;
    box-sizing: border-box;
    padding-left: 10px;
    border-radius: 2px;
    border: 1.5px solid #B3B3B3;
    width: 100%;
`