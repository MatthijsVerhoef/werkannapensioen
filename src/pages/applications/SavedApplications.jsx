import { useEffect, useRef, useState } from 'react';
import ApplicationStyle from '../../components/applications/ApplicationStyle';
import './styles/Applications.css'
import ApplicationDetail from '../../components/applications/ApplicationDetails';
import ApplicationFilters from '../../components/applications/ApplicationFilters'
import { useAuthState } from 'react-firebase-hooks/auth';
import db, { auth } from '../../data/Firebase';
import NoResults from '../../components/applications/NoResults';

const SavedApplications = () => {
    const [currentUser] = useAuthState(auth)
    const [savedPosts, setSavedPosts] = useState([])
    const [activePost, setActivepost] = useState()
    const [filteredSavedPosts, setFilteredSavedPosts] = useState([])
    const isMounted = useRef(false)

    useEffect(() => {
        setFilteredSavedPosts(savedPosts)
    }, [savedPosts])

    useEffect(() => {
        if (savedPosts <= 0) {
            setActivepost(null)
        }
    }, [savedPosts])

    useEffect(() => {
        isMounted.current = true
        const fetchSavedData = () => {
            currentUser && db.collection('users').doc(currentUser.uid)
                .collection('savedposts')
                .orderBy('savedAt', 'desc')
                .onSnapshot(snapshot => {
                    if (isMounted.current) {
                        setSavedPosts(snapshot.docs.map(doc => ({
                            id: doc.id,
                            post: doc.data()
                        })))
                    }
                })
        }
        fetchSavedData()
        return () => (isMounted.current = false)
    }, [currentUser])

    return (
        <div className="page">
            <h1 className="page_title">Opgeslagen opdrachten</h1>
            <div style={{ display: 'flex' }}>
                <div className="applications_content_container">
                    <div className={activePost ? "applications_content" : "applications_content_general"}>
                        {filteredSavedPosts.length > 0 ? (
                            <>
                                {filteredSavedPosts?.map(({ id, post }) => (
                                    <ApplicationStyle key={id} activePost={activePost} setActivepost={setActivepost} description={post.description} salary={post.salary} applicationType={post.applicationType} experience={post.experience} documentId={id} companyName={post.companyName} job={post.jobTitle} placedby={post.placedby} timestamp={post.timestamp} location={post.address} type={post.applicationType} img={post.companyImg} />
                                ))}
                            </>
                        ) : (
                            <>
                                {savedPosts.length > 0 ?
                                    <NoResults description={"Geen resultaten gevonden, verander filters om meer relevante opdrachten te vinden."} />
                                    :
                                    <NoResults description={"Geen opgeslagen opdrachten gevonden, sla opdrachten op en bekijk ze hier later terug."} action={"Opdrachten zoeken"} />
                                }
                            </>
                        )}
                    </div>
                </div>
                <div className="sidebar_right">
                    <ApplicationFilters posts={savedPosts} setFilteredPosts={setFilteredSavedPosts} />
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

export default SavedApplications;
