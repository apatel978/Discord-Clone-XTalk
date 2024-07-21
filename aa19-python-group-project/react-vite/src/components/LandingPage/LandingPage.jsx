import Navigation from "../../components/Navigation";
import './LandingPage.css';

const LandingPage = () => {
  return (<div className="landingP">
  <Navigation />
  <div className='lph1'>
      <h1>CONNECT AND CHAT TOGETHER</h1>
      </div>
    <div className="landing-page">

      <div className="text-container">
        <p>


Our platform is perfect for casual hangouts and connecting with communities all over the world. Create your personalized space to chat and create connections with old and new friends.

</p>
<p></p>
      </div>
      <div className="image-container">
        <img src="https://crosstalkappbuck.s3.us-east-2.amazonaws.com/landing2.jpg" alt="Landing" />
      </div>
    </div>
    </div>
  );
};

export default LandingPage;
