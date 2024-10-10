
import '../assets/css/navbar.css'

export default function Home() {
  return (
   <div>
         <header>
            <div className="container">
                <div className="logo">
                    <h2>telfontap.com</h2>
                </div>

                <nav>
                    <ul>
                        <li>
                            <a href="">HOME</a>
                        </li>
                        <li>
                            <a href="">ABOUT</a>
                        </li>
                        <li>
                            <a href="">CONTACT</a>
                        </li>
                        <li>
                            <a href="">RANDOM</a>
                        </li>
                    </ul>

                </nav>

                <div className="profile">
                    <div className="profile-img">
                        <div className="profile-img-cont">
                            <img src="" alt="" />
                        </div>
                    </div>
                    
                    <div className="lang">

                        <button><span>EN</span></button>
                    </div>

                    <div className="nav-button">
                        <button><span>Random</span></button>
                    </div>
                </div>
            </div>
         </header>
   </div>   
  );
}
