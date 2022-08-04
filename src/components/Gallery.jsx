import { useState } from 'react';
import getPhotoUrl from 'get-photo-url';
import database from '../dexie';
import animation from '../assets/Ellipsis-1s-31px.svg';
import { useLiveQuery } from 'dexie-react-hooks';
import trash from '../assets/icons/trash-can.svg';
import plus from '../assets/icons/square-plus.svg';
import Modal from './Modal'

const Gallery = () => {
    const allPhoto = useLiveQuery(()=> database.gallery.reverse().toArray(), []);

    let [modal, setModal] = useState(false);

    let [photoId, setPhotoId] = useState();

    const getPhoto = async() => {
        database.gallery.add({
            url: await getPhotoUrl('#addPhotoInput')
        });
    };

    const openGeneralModal = ()=> {
        setPhotoId('');
        setModal(true);
    };

    const loadingAnimation = <div className='loading'><p>Loading</p> <img src={animation} alt="loading-animation" /></div>

    const deleteAll =  <div onClick={openGeneralModal}>
                             {modal && <Modal
                            click={()=>setModal(false)}
                            />}
                            <i className="add-photo-button" id='delete-photos'><img src={trash} alt="" /></i>
                        </div>


    const openModal = (photoId)=> {
        setPhotoId(photoId)
        setModal(true);
    }

    return(
        <>
            <input type="file" accept='image/*' name="photo" id="addPhotoInput" />
            <label htmlFor="addPhotoInput" onClick={getPhoto}>
                <i className="add-photo-button"><img src={plus} alt="" /></i>
            </label>
            
            {allPhoto?.length>0 && deleteAll}
            {modal && <div className='blur'></div>}
            {allPhoto?.length<=0 && <div id='no-pics'>No photos available <br /> Add custom photos</div>}
            <section className="gallery">
                {!allPhoto && loadingAnimation}
                {allPhoto?.map(photo => {
                    return(
                        <div className="item" key={photo.key}>
                            <img src={photo.url} alt="" className="item-image" />
                           
                            <button className="delete-button" onClick={()=>openModal(photo.key)}>Delete</button>
                        </div>
                    )
               })}
               {modal && <Modal id={photoId}
                            click={()=>setModal(false)}
                            />}
            </section>
        </> 
    )
   
}

export default Gallery