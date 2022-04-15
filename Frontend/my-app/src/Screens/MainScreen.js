import Footer from '../Components/Footer';
import Header from '../Components/Header';

import { Link } from 'react-router-dom';

import { AiOutlineLogin } from 'react-icons/ai';
import { TiUserAddOutline } from 'react-icons/ti';

export default function MainScreen() {
    return(
        <div class="page">
            <Header />

              <div class="container col-xxl-8 px-1 py-1">
                <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
                  <h1 class="display-5 fw-bold lh-1 mb-3 justify-content-md-center">
                    Find the best service for your car. Promote your auto-business.
                  </h1>
                  <div class="col-10 col-sm-8 col-lg-5">
                    <img src="https://media.istockphoto.com/vectors/vector-icons-logos-for-car-repair-and-maintenance-and-oil-change-car-vector-id1329383374?b=1&k=20&m=1329383374&s=612x612&w=0&h=AP6JWL761oHlaZWsyuGoX0QZl6hEbVx7S7UteQCxx94=" class="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700" height="500" loading="lazy"></img>
                    <br/><br/><br/>
                    <div class="d-grid gap-2 d-md-flex justify-content-md-center">
                      <button type="button" class="btn btn-outline-secondary btn-lg px-4"><Link to={"/login"}> <AiOutlineLogin/> Login </Link></button>
                      <button type="button" class="btn btn-outline-secondary btn-lg px-4"><Link to={"/register"}> <TiUserAddOutline/> Register </Link></button>
                    </div>
                  </div>
                  <div class="col-lg-7">
                    <br/>
                    <p class="lead">
                        <h2>Why it's cool</h2>
                            <ul>
                              <li>Hosting the best car repair & tuning shops in your country;</li>
                              <li>Transparent prices and labour time;</li>
                              <li>Easy labour & parts cost approximation;</li>
                              <li>Real feedback from other clients;</li>
                              <li>List your own business and communicate with clients.</li>
                            </ul>
                        <br/>
                        <h2>How it works - for a car owner</h2>
                        <ul>
                          <li>Reggister as a new user;</li>
                          <li>Register your cars;</li>
                          <li>Input the desired operation on your car;</li>
                          <li>Set filters like budget, rating & service proximity;</li>
                          <li>Choose a car service based on rating and reviews;</li>
                          <li>Communicate online with the service;</li>
                          <li>Make an appointment and be on time!</li>
                        </ul>
                        <h2>How it works - for a service owner</h2>
                        <ul>
                            <li>Reggister as a new user;</li>
                            <li>Register your business;</li>
                            <li>Input the working hours, labour time & prices and executed operations;</li>
                            <li>Communicate online with the clients;</li>
                            <li>Setup appointments and do a great work!</li>
                        </ul>
                    </p>
                  </div>
                </div>
              </div>

            <Footer />
        </div>
    )
}