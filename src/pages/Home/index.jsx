import './styles/home.css';
import playIcon from '../../assets/play.svg';
import {useNavigate} from "react-router-dom"


function Home({isLoggedIn}) {
    const navigate = useNavigate();
    return <>
        <div className="home-container">
            <div className="logo-movie" >

            </div>
            <button 
                className="home-btn" 
                onClick={() => {
                    isLoggedIn ? navigate('/new') : navigate('/accounts/login')
                }}
            >
                <img className="play" src={playIcon} alt="play_icon"/>
                Get started
            </button>
        </div>
        {/* list of movies here */}

    </>
}

export default Home;