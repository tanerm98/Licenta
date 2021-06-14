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
                    Measure & Monitor Performance Metrics of iOS Mobile Applications. Keep Your Software Optimized & Reliable.
                  </h1>
                  <div class="col-10 col-sm-8 col-lg-5">
                    <img src="https://www.trilliwon.com/static/b76e412b580e63416c42d8d99224c8ec/bb051/simulator.png" class="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700" height="500" loading="lazy"></img>
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
                              <li>Runs on Pull-Requests or on the main branch;</li>
                              <li>Measures performance impact of changes made by developers;</li>
                              <li>Informs developers when performance metrics are impacted;</li>
                              <li>Prevents merging slow/resource consuming new code;</li>
                              <li>Keeps history and graphs of performance tests and trends.</li>
                            </ul>
                        <br/>
                        <h2>Measured metrics</h2>
                            <ul>
                              <li>Application size (in MB) - size of .APP file that is installed on the iPhone;</li>
                              <li>Launch time - duration from open request to fully loaded main screen;</li>
                              <li>Memory usage (in MB) - RAM memory used at app launch.</li>
                            </ul>
                        <br/>
                        <h2>Measured scenarios</h2>
                        <ul>
                          <li>After installation - first app launch after installation is measured separately;</li>
                          <li>Warm launch - application was launched previously;</li>
                          <li>Cold launch - first launch after device reboot.</li>
                        </ul>
                        <br/>
                        <h2>How it works</h2>
                        <ul>
                          <li>The APP is downloaded fro Google Drive;</li>
                          <li>Size of application is computed;</li>
                          <li>iOS simulators are factory reset for a clean state;</li>
                          <li>The application is installed on the device;</li>
                          <li>A number of repeated launches is executed;</li>
                          <li>iOS logs are downloaded from the device;</li>
                          <li>Launch time is computed from start and exit logs timestamps;</li>
                          <li>Memory usage is computed for the PID of the launched application;</li>
                          <li>The average values are calculated and validated with the baselines;</li>
                          <li>Test summary is posted on the provided GitHub Pull-Request where the iOS app source code is;</li>
                          <li>Metrics are stored in a database, from where performance trends graphics can be visualized.</li>
                        </ul>
                    </p>
                  </div>
                </div>
              </div>

            <Footer />
        </div>
    )
}