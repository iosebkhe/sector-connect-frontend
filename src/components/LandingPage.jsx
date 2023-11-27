import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <h1 className="text-3xl font-bold mb-2 text-white text-center">Welcome to  <span className="text-[#7747ff]">sector connect</span></h1>
      <p className=" font-normal mb-4 text-center text-white">Click the button below to see the form</p>
      <Link to="/user-form" className="bg-[#7747ff] text-xl w-max m-auto px-6 py-2 rounded text-white font-normal">Fill / Edit Form</Link>
    </div>
  );
};

export default LandingPage;