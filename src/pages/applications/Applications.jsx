import React, { useState, useContext, useEffect } from 'react'
import './styles/Applications.css'
import ApplicationStyle from '../../components/applications/ApplicationStyle'
import moment from 'moment'
import { PostContext } from '../../data/context/PostContext';
import ApplicationDetail from '../../components/applications/ApplicationDetails';
import ApplicationFilters from '../../components/applications/ApplicationFilters'
import NoResults from '../../components/applications/NoResults';

function ApplicationPage() {
    const { posts } = useContext(PostContext);
    const [activePost, setActivepost] = useState()
    const [filteredPosts, setFilteredPosts] = useState([])

    useEffect(() => {
        setFilteredPosts(posts)
    }, [posts])

    return (
        <div className="page">
            <h1 className="page_title">Opdrachten</h1>
            <div style={{display: 'flex'}}>
                <div className="applications_content_container">
                    <div className={activePost ? "applications_content" : "applications_content_general"}>
                        {filteredPosts.length > 0 ? (
                            <>
                                {filteredPosts?.map(({ id, post }) => (
                                    <ApplicationStyle key={id} documentId={id} job={post.jobTitle} activePost={activePost} setActivepost={setActivepost} description={post.description} salary={post.salary} applicationType={post.applicationType} experience={post.experience} img={post.companyImg} companyName={post.companyName} timestamp={moment(post.timestamp.toDate()).fromNow()} location={post.address} type={post.hours} placedby={post.placedby} />
                                ))}
                            </>
                        ) : (
                            <NoResults description={"Geen resultaten gevonden, verander filters om meer relevante opdrachten te vinden."} />
                            )}
                    </div>
                </div>
                <div className="sidebar_right">
                    <ApplicationFilters posts={posts} filteredPosts={filteredPosts} setFilteredPosts={setFilteredPosts} />
                </div>
                {activePost ?
                    <div className="application_content_details_section">
                        <ApplicationDetail activePost={activePost} setActivepost={setActivepost} />
                    </div>
                    : null}
            </div>
        </div >
    )
}

export default ApplicationPage
