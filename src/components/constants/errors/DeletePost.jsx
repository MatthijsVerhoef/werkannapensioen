import { db } from '../../../data/Firebase'
import '../styles/DeletePost.css'

function DeletePostWarning({ setConfirm, activePost, confirm, currentUser, placedBy }) {

    const deletePost = () => {
        if (placedBy === currentUser.uid) {
            db
                .collection('posts')
                .doc(activePost)
                .delete()
                .then(() => {
                    db
                        .collection('users')
                        .doc(currentUser.uid)
                        .collection('savedposts')
                        .doc(activePost)
                        .delete()
                })
                setConfirm(false)
        } else {
            console.log("Er is iets misgegaan, probeer het later opnieuw")
        }
    }

    return (
        <>
            {confirm ?
                <>
                    <div className="blur" onClick={() => setConfirm(false)}></div>
                    <div className="infoWindow" onClick={() => console.log(placedBy)}>
                        <h2>Opdracht verwijderen</h2>
                        <p>Weet u zeker dat u deze opdracht wilt verwijderen? Dit kan in de toekomst niet meer worden ongedaan.</p>
                        <div className="infoWindowActions">
                            <button className="unFollow" onClick={() => deletePost()}>Verwijderen</button>
                            <button className="cancel" onClick={() => setConfirm(false)}>Annuleren</button>
                        </div>
                    </div>
                </>
                : null}
        </>
    )
}

export default DeletePostWarning
