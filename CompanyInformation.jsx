import './CompanyInformation.css'

export default function CompanyInformation({ activeCompany }) {
    return (
        <div className='secondFragment' onClick={() => console.log(activeCompany.address.city)}>
            <p>Over {activeCompany.company_name}</p>
            <div className='companyInformationContainer'>
                <p>{activeCompany.description}</p>
                <div className="companyInformationItem">
                    <b>Website</b>
                    <p style={{ color: 'var(--primary)' }}>www.Amazon.com</p>
                </div>
                <div className="companyInformationItem">
                    <b>Locatie</b>
                    <p>{activeCompany.address?.city}, {activeCompany.address?.province}, Nederland</p>
                </div>
                <div className="companyInformationItem">
                    <b>Bedrijfstak</b>
                    <p>{activeCompany.branche}</p>
                </div>
                <div className="companyInformationItem">
                    <b>Staat bekend om</b>
                    <div className='companyInformationKnownFor'>
                        {activeCompany.known_for?.map((item) => (
                            <p key={item}>{item},</p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}