import { useCallback, useEffect, useState } from "react";
import { TbBriefcase } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import db from "../../../data/Firebase";
import './SimilarCompanies.css'

export default function SimilarCompanies({ activeCompany }) {
    const [similarTypes, setSimilarTypes] = useState([]);
    const [similarTags, setSimilarTags] = useState([]);

    const retrieveSimilarCompanies = useCallback((field, filter, setter) => {
        if (!activeCompany.id || !activeCompany[field]) {
            return;
        }

        return db
            .collection('companies')
            .where('id', '!=', activeCompany.id)
            .where(field, filter, activeCompany[field])
            .onSnapshot((snapshot) => {
                const documents = snapshot.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }));
                setter(documents);
            });
    }, [activeCompany]);

    useEffect(() => {
        retrieveSimilarCompanies('company_type', '==', setSimilarTypes);
        retrieveSimilarCompanies('known_for', 'array-contains-any', setSimilarTags);
    }, [activeCompany, retrieveSimilarCompanies]);

    const similarCompanies = [...similarTypes, ...similarTags].reduce((acc, obj) => {
        if (!acc.find(o => o.id === obj.id)) {
            acc.push(obj);
        }
        return acc;
    }, []);

    return (
        <div className="thirdFragment">
            <div className="thridFragmentHeader">
                <TbBriefcase />
                <p>Gerelateerde bedrijven</p>
            </div>
            {
                similarCompanies.map((company) => (
                    <NavLink to={`/bedrijf/${company.id}`} className="featuredItemsContainer" key={company.id}>
                        <div className="featuredItem">
                            <div className="featuredItemCompanyLogo">
                                <img alt="company" width={23} height={23} src={company.company_image} />
                            </div>
                            <div className="featuredItemInfo">
                                <div>
                                    <p>{company.company_name}</p>
                                    <p>{company.company_type}</p>
                                </div>
                                <p>{company.branch}</p>
                            </div>
                        </div>
                    </NavLink>
                ))
            }
        </div>
    )
}