import database from '../dexie';

function Modal(props) {

    const deletePhoto = id => {
        database.gallery.delete(id);
        props.click(false);
    }

    const deleteAllPhotos = () => {
        database.gallery.clear();
        props.click(false);
    }
    
    return (
        <div className='modal'>
            <header><p  onClick={()=>props.click(false)}>X</p></header>
            <div className='body'><p>You will lose this picture permanently</p></div>
            
            <footer>
                <button type='button' className="cancel-button"  onClick={()=>props.click(false)}>Cancel</button>
                <button type='button' id='confirm-delete' onClick={()=>{return(props.id?deletePhoto(props.id):deleteAllPhotos())}}>Delete</button>
            </footer>
        </div>
    )
}

export default Modal