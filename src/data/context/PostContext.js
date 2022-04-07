import React, { useEffect, useState, createContext, useRef } from 'react'
import { db } from '../Firebase'

export const PostContext = createContext()

export const PostProvider = ({ children }) => {
    const [posts, setPosts] = useState([])
    const isMounted = useRef(false)

    const fetchData = () => {
        const fetchDb = db.collection('posts').orderBy('timestamp', 'desc')
        fetchDb.onSnapshot(snapshot => {
            if (isMounted.current) {
                setPosts(snapshot.docs.map(doc => ({
                    id: doc.id,
                    post: doc.data()
                })))
            }
        })
    }

    useEffect(() => {
        isMounted.current = true
        fetchData()
        return () => (isMounted.current = false)
    }, [])

    return (
        <PostContext.Provider value={{ posts }}>
            {children}
        </PostContext.Provider>
    )
}