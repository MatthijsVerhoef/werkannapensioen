import { Avatar } from '@mui/material';
import { TbFiles, TbInfoCircle, TbSearch } from 'react-icons/tb';
import './SearchCompanyApplications.css';
import { useEffect, useRef, useState } from 'react';

export default function SearchCompanyApplications({ setActiveFilter, setDisplayedSuggestions, filteredSuggestions, searchInput, setSearchInput, companyApplications, currentUser, activeCompany }) {
    const { company_name } = activeCompany;
    const [showSuggsetions, setShowSuggestions] = useState(false);
    const inputRef = useRef(null)

    // Set focus to input field when the div 'grayInput' class is clicked
    const setFocus = () => {
        inputRef.current.focus()
    }

    useEffect(() => {
        if (!searchInput) {
            setShowSuggestions(false);
        }
    }, [searchInput])

    return (
        <div className="secondFragment" style={{ padding: 20 }}>
            <div className="searchFragmentInput">
                <Avatar className="companyProfileAvatar" src={currentUser.photoUrl} />
                <div className="grayInput" onClick={setFocus}>
                    <TbFiles />
                    <input
                        placeholder={`Zoek door ${companyApplications.length} vacatures van ${company_name}...`}
                        onChange={(e) => { setSearchInput(e.target.value); setShowSuggestions(true); }}
                        value={searchInput}
                        ref={inputRef}
                    />
                    {showSuggsetions &&
                        <div className="applicationSearchSuggestionsContainer" onClick={e => e.stopPropagation()}>
                            {filteredSuggestions.matchingStrings.map(item => (
                                <p key={item} onClick={() => { setSearchInput(item); setShowSuggestions(false); }}>
                                    {item}
                                </p>
                            ))}
                        </div>
                    }
                </div>
                <button className="filterCompanyApplications" onClick={() => { setActiveFilter(true); setDisplayedSuggestions(filteredSuggestions.filteredData); setShowSuggestions(false) }}>
                    <TbSearch />
                </button>
            </div>
            <div className="divider" style={{ width: '100%', margin: '20px 0' }} />
            <div className="searchCompanyApplicationSuggestions">
                <div className="infoSuggestion">
                    <span>Help</span>
                    <TbInfoCircle size='16px' />
                </div>
                <div className="suggestion">React</div>
                <div className="suggestion">Google Analytics</div>
                <div className="suggestion">Python</div>
                <div className="suggestion">Backend</div>
                <div className="suggestion">Amersfoort</div>
            </div>
        </div>
    );
}