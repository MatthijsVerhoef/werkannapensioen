import ApplicationListView from "./ApplicationListView";

export default function CompanyApplications({ activeFilter, displayedSuggestions, searchInput, companyApplications, activeCompany }) {
    return (
        <div className="secondFragment" style={{ paddingBottom: '30px' }}>
            {activeFilter ? (
                <>
                    {activeFilter && <p>{searchInput} vacatures van {activeCompany.company_name}</p>}
                    {displayedSuggestions.map((item) => (
                        <ApplicationListView key={item.id} applicationInfo={item} />
                    ))}
                </>
            ) : (
                <>
                    <p>Vacatures van {activeCompany.company_name}</p>
                    {companyApplications.map((item) => (
                        <ApplicationListView key={item.id} applicationInfo={item} />
                    ))}
                </>
            )}
        </div>
    );
}