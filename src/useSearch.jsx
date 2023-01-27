import { useState, useEffect } from 'react';

export default function useSearch(data, searchInput) {
    const [filteredData, setFilteredData] = useState([]);
    const [matchingStrings, setMatchingStrings] = useState([]);
    const [debouncedSearchInput, setDebouncedSearchInput] = useState(searchInput);

    useEffect(() => {
        // Return early if the search input is an empty string or not a string
        if (!searchInput) {
            setFilteredData([]);
            setMatchingStrings([]);
            return;
        }

        // Normalize the search input to ignore leading and trailing white space
        // and handle diacritics and special characters
        const normalizedSearchInput = searchInput
            .trim()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');

        // Set debouncedSearchInput to the normalized search input with a delay of 500 milliseconds
        // This makes sure it waits .5s before searching through the data 
        setTimeout(() => setDebouncedSearchInput(normalizedSearchInput), 500);
    }, [searchInput]);

    // Filter the data and update the filtered data and matching strings
    // All filter fields are case-insensitive
    useEffect(() => {
        let matchingStrings = [];
        const filteredData = data.filter((application) => {
            const fieldsToSkipFilter = ['description', 'company', 'id', 'salary', 'hours'];
            return Object.entries(application).some(([key, value]) => {
                if (typeof value === 'number') return false;
                if (fieldsToSkipFilter.includes(key)) return false;
                if (typeof value === 'string' && value.toLowerCase().includes(debouncedSearchInput.toLowerCase())) {
                    matchingStrings.push(value);
                    return true;
                }
                if (value instanceof Array) {
                    const matchingString = value.find(
                        (item) => typeof item === 'string' && item.toLowerCase().includes(debouncedSearchInput.toLowerCase())
                    );
                    if (matchingString) {
                        matchingStrings.push(matchingString);
                        return true;
                    }
                }
                if (value instanceof Object) {
                    let nestedMatchingStrings = [];
                    for (const [nestedKey, nestedValue] of Object.entries(value)) {
                        if ((nestedKey === "city" || nestedKey === "province") && nestedValue.toLowerCase().includes(debouncedSearchInput.toLowerCase())) {
                            nestedMatchingStrings.push(nestedValue);
                        }
                    }
                    if (nestedMatchingStrings.length > 0) {
                        matchingStrings.push(...nestedMatchingStrings);
                        return true;
                    }
                }
                return false;
            });
        });
        // Remove duplicates from array
        const uniqueMatchingStrings = [...new Set(matchingStrings)];
        setFilteredData(filteredData);
        setMatchingStrings(uniqueMatchingStrings);
    }, [debouncedSearchInput, data]);

    return { filteredData, matchingStrings };
}