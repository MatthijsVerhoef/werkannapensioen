import React, { useEffect, useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import ApplicationDetail from '../../components/applications/ApplicationDetails';
import ApplicationStyle from '../../components/applications/ApplicationStyle';
import db, { auth } from '../../data/Firebase';
import './styles/Applications.css'
import ApplicationFilters from '../../components/applications/ApplicationFilters'
import moment from 'moment'
import NoResults from '../../components/applications/NoResults';

const MyApplications = () => {
    const [currentUser] = useAuthState(auth)
    const [placedApplications, setPlacedApplications] = useState([])
    const [activePost, setActivepost] = useState()
    const [filteredPlacedPosts, setFilteredPlacedPosts] = useState([])
    const isMounted = useRef(false)

    useEffect(() => {
        setFilteredPlacedPosts(placedApplications)
    }, [placedApplications])

    useEffect(() => {
        isMounted.current = true
        const fetchPlacedPosts = () => {
            currentUser && db
                .collection('posts')
                .where('placedby', '==', currentUser.uid)
                .onSnapshot(snapshot => {
                    if (isMounted.current) {
                        setPlacedApplications(snapshot.docs.map(doc => ({
                            id: doc.id,
                            post: doc.data()
                        })))
                    }
                })
        }
        fetchPlacedPosts()
        return () => (isMounted.current = false)
    }, [currentUser])

    return (
        <div className="page">
            <h1 className="page_title">Mijn opdrachten</h1>
            <div style={{ display: 'flex' }}>
                <div className="applications_content_container">
                    <div className={activePost ? "applications_content" : "applications_content_general"}>
                        {filteredPlacedPosts.length > 0 ? (
                            <>
                                {filteredPlacedPosts?.map(({ id, post }) => (
                                    <ApplicationStyle key={id} documentId={id} activePost={activePost} setActivepost={setActivepost} salary={post.salary} applicationType={post.applicationType} experience={post.experience} job={post.jobTitle} description={post.description} img={post.companyImg} companyName={post.companyName} timestamp={moment(post.timestamp.toDate()).fromNow()} location={post.address} type={post.hours} placedby={post.placedby} />
                                ))}
                            </>
                        ) : (
                            <NoResults description={"Geen resultaten gevonden, verander filters om meer relevante opdrachten te vinden."} />
                            )}
                    </div>
                </div>
                <div className="sidebar_right">
                    <ApplicationFilters posts={placedApplications} setFilteredPosts={setFilteredPlacedPosts} />
                </div>
                {activePost ?
                    <div className="application_content_details_section">
                        <ApplicationDetail activePost={activePost} setActivepost={setActivepost} />
                    </div>
                    : null}
            </div>
        </div>
    );
};

export default MyApplications;
