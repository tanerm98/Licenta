import { MdHttp } from 'react-icons/md';
import { FaUserGraduate } from 'react-icons/fa';
import { AiOutlineFundProjectionScreen } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div>
        <div class="b-example-divider"></div>
        <div class="footer container-fluid justify-content-center text-light">
         <footer>
             <div class="row my-3 justify-content-center py-1">
                 <div class="col-11">
                     <div class="row ">
                         <div class="col-xl-8 col-md-4 col-sm-4 col-12 my-auto mx-auto a">
                             <h6 class="mb-3 mb-lg-4 bold-text "><MdHttp/><b> REST API</b></h6>
                         </div>
                         <div class="col-xl-2 col-md-4 col-sm-4 col-12 my-auto mx-auto a">
                             <h6 class="mb-3 mb-lg-4 bold-text "><AiOutlineFundProjectionScreen/><b> Bachelor's Degree Project</b></h6>
                         </div>
                         <div class="col-xl-2 col-md-4 col-sm-4 col-12">
                             <h6 class="mb-3 mb-lg-4 bold-text "><FaUserGraduate/><b><a target="_blank" href="https://www.linkedin.com/in/tanerm98/">Mustafa Taner</a></b></h6>
                         </div>
                     </div>
                 </div>
             </div>
         </footer>
        </div>
    </div>
  );
}

export default Footer;
