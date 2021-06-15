import { FaExclamationTriangle } from 'react-icons/fa';

const Unauthorized = () => {
  return (
    <div class="page">
        <body class="bg-dark text-white py-5">
             <div class="container py-5">
                  <div class="row">
                       <div class="col-md-10">
                            <h3><FaExclamationTriangle/> 403 Forbidden</h3>
                            <br/><br/><br/><br/>
                            <p>Sorry, your access is refused due to security reasons of our server and also our sensitive data.
                                <br/>
                                Please log in or contact the admin for upgrading your role.
                            </p>
                            <br/><br/><br/><br/>
                            <a class="btn btn-danger" href="/">Go Back</a>
                       </div>
                  </div>
             </div>
        </body>
    </div>
  );
}

export default Unauthorized;
