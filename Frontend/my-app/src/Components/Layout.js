import Footer from './Footer';
import Header from './Header';

const Layout = (props) => {
  return (
    
    <div className="layout">
      <Header />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Raleway"></link>
      {props.children}
      <Footer />
    </div>
  );
}

export default Layout;
