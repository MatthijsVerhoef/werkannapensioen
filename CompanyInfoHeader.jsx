import './CompanyInfoHeader.css'

export default function CompanyInfoHeader({ contentType, setContentType, activeCompany }) {
    return (
        <div className="companyProfileHeader">
            <div className='companyHeaderImageContainer'>
                <div className='companyHeaderImage' />
                <div className='overlay' />
                <div className='mainCompanyInfo'>
                    <div className='companyLogoContainer'>
                        <img alt='logo' width={45} height={45} src={activeCompany.company_image} />
                    </div>
                    <div className='companyInformation'>
                        <p>{activeCompany.company_name}</p>
                        <p>{activeCompany.branch}</p>
                    </div>
                </div>
            </div>
            <div className='companyCategories'>
                <p
                    className={contentType === 'info' ? 'activeCategory' : 'category'}
                    onClick={() => setContentType('info')}
                >
                    Informatie
                </p>
                <p
                    className={contentType === 'applications' ? 'activeCategory' : 'category'}
                    onClick={() => setContentType('applications')}
                >
                    Vacatures
                </p>
                <p className={contentType === 'iets' ? 'activeCategory' : 'category'}>Personen</p>
            </div>
        </div>
    )
}