import '../../pages/account/styles.css'
import { IoIosStar } from "react-icons/io";
import { useState } from 'react';

const Reviews = () => {
    const [more, setMore] = useState(false)
    const [addReview, setAddReview] = useState(false)

    return (
        <div className='review_container'>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <b>Reviews (11)</b>
                <div className='review_rating'>
                    <p>4/5</p>
                    <IoIosStar style={{ paddingLeft: 6 }} size="1.5em" color='#ECBD03' />
                </div>
            </div>
            <button className='add_review' onClick={() => setAddReview(true)}>Review toevoegen</button>
            <u onClick={() => setMore(current => !current)}>{more ? "Minder laten zien" : "Meer lezen"}</u>
        </div>
    );
};

export default Reviews;
