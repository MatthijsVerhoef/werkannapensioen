import { useState } from 'react';
import Select from 'react-select'
import '../../pages/account/styles.css'
import Autocomplete from '../place_application/Autocomplete';

const Extras = () => {
    const [address, setAddress] = useState("")
    const [geopoint, setGeoPoint] = useState({ lat: "", lng: "" })

    const typeOptions = [
        { value: 'Onbepaalde tijd', label: 'Onbepaalde tijd' },
        { value: 'Projectduur', label: 'Projectduur' }
    ]

    const locationOptions = [
        {value: 'Amerfsoort', label: 'Amersfoort'},
        {value: 'Utrecht', label: 'Utrecht'},
        {value: 'Vianen', label: 'Vianen'},
        {value: 'Rotterdam', label: 'Rotterdam'},
        {value: 'Maarsbergen', label: 'Maarsbergen'},
        {value: 'Leusden', label: 'Leusden'}
    ]

    return (
        <div className="account_extras">
            <h1 className="page_title" style={{ marginLeft: 0 }}>Mijn account</h1>
            <div className='account_alert_container'>
                <b>Vacature meldingen inschakelen</b>
                <p>Meldingen ontvangen over relevante vacatures? schakel vacature meldingen in en mis nooit meer iets.</p>
                <Select className="alert_select" isClearable={true} placeholder="Type vacature" options={typeOptions} />
                <Select className="alert_select" isClearable={true} placeholder="Branche" />
                <Select className="alert_select" isClearable={true} placeholder="In de buurt van" options={locationOptions} />
                <button className='enable_alerts'>Meldingen inschakelen</button>
            </div>
            <div className='video_alerts'>
                <b>Videogesprekken</b>

            </div>
        </div>
    );
};

export default Extras;
