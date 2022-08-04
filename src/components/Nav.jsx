import instagramLogo from '../assets/logo.png';
import home from '../assets/icons/house-solid.svg';
import comment from '../assets/icons/message.svg';
import heart from '../assets/icons/heart.svg';
import compass from '../assets/icons/compass.svg';

const Nav = () => {
    return(
        <>
            <nav>
                <button>
                    <img src={instagramLogo} alt="Instagram logo" />
                </button>
                <input type="text" className='search' placeholder='search' />
                <span className="nav-links largeScreen">
                    <button>
                        {/* <i className='fas fa-home'/> */}
                        <i><img src={home} alt="" /></i>
                        
                    </button>
                    <button>
                        {/* <i className="fas fa-comment-alt"></i> */}
                        <i><img src={comment} alt="" /></i>
                    </button>
                    <button>
                    <i><img src={compass} alt="" /></i>
                        {/* <i className="fas fa-compass"></i> */}
                    </button>
                    <button>
                        <i><img src={heart} alt="" /></i>
                        {/* <i className="fas fa-heart"></i> */}
                    </button>
                </span>
            </nav>
            <span className='nav-links smallScreen slide'>
                <button>
                    <i><img src={home} alt="" /></i>
                </button>
                <button>
                    <i><img src={comment} alt="" /></i>
                </button>
                <button>
                <i><img src={compass} alt="" /></i>
                </button>
                <button>
                    <i><img src={heart} alt="" /></i>
                </button>
            </span>
        </>
        
    )
}

export default Nav