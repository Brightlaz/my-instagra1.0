import profileIcon from '../assets/profileIcon.svg';
import { useState} from 'react';
import getPhotoUrl from 'get-photo-url';
import database from '../dexie';
import { useLiveQuery } from 'dexie-react-hooks';
// import { DBCoreRangeType } from 'dexie';

const Bio = () => {
    // Updating Bio infomation
     const [open, setOpen] = useState(false);
    const demo_bio ={
        name: "Bright Lazarus",
        about: "Buiding an Instagram clone"
    };
    const bio = useLiveQuery(()=> database.bio.get('info' ), []);
    const updateBio = async(event) => {
        event.preventDefault();
        await database.bio.put({
            name: event.target.name.value,
            about: event.target.about.value
        }, 'info')
    };

    // Bio Edit form and button
    const editForm = (
        <form className="edit-bio-form" onSubmit={(e)=>{updateBio(e)}}>
            <input type="text" id="" name="name" placeholder="Your name" />
            <input type="text" id="" name="about" placeholder="About you" />
            <br />
            <button type='button' className="cancel-button" onClick={()=>setOpen(open => false)}>Cancel</button>
            <button type='submit'>Save</button>
        </form>
    );
    const editButton = <button onClick={()=>setOpen(open => true)}>Edit</button>;

    // Updating profile photo
    const profilePhoto = useLiveQuery(()=>database.bio.get('profilePhoto'));
    const updateProfilePhoto = async () => {
        const photo = await getPhotoUrl('#profilePhotoInput')
        await database.bio.put(photo, 'profilePhoto')
    };

    return (
        <section className="bio">
            <input type="file" accept='image/*' name="photo" id="profilePhotoInput" />
            <label htmlFor="profilePhotoInput"  onClick={updateProfilePhoto} >
              
                <div className="profile-photo" role="button" title="Click to edit photo">
                    <img src={profilePhoto ? profilePhoto : profileIcon} alt="profile" />
                </div> 
            </label>
            <div className="profile-info">
                <p className="name">{bio?.name ? bio?.name : demo_bio.name}</p>
                <p className="about">{bio?.about ? bio?.about : demo_bio.about}</p>
                {open ? editForm : editButton}
            </div>
        </section>
    )
}

export default Bio