import Footer from "../landingpage/utils/footer";
function AboutUs() {
  const iconStyle = { width: "40px", height: "40px" };
  const handleEmailClick = (email) => {
    window.open(`mailto:${email}`);
  };
  const handleSocialClick = (url) => {
    window.open(url, "_blank");
  };
  const getcolor = () => {
    if (localStorage.getItem("darkmode") === "yes") {
      return "text-light";
    }
    return "text-dark";
  };
  const TeamMemberCard = ({
    name,
    role,
    description,
    email,
    github,
    instagram,
  }) => {
    return (
      <div className="col-md-12 mb-4">
        <div className="card bg-light border-dark text-center">
          <div className="card-body">
            <h2 className="card-title">{name}</h2>
            <p className="card-text">
              <b>{role}</b>
            </p>
            <p>{description}</p>
            <div className="mt-3">
              {/* Email button */}
              <button className="mr-3" onClick={() => handleEmailClick(email)}>
                <img
                  src="https://img.icons8.com/color/48/000000/gmail-new.png"
                  alt="Gmail"
                  className="email-logo border-0"
                  style={iconStyle}
                />
              </button>
              {/* GitHub button */}
              <button onClick={() => handleSocialClick(github)}>
                <img
                  src="https://github.com/fluidicon.png"
                  alt="GitHub"
                  className="github-logo img-fluid border-0"
                  style={iconStyle}
                />
              </button>
              {/* Instagram button */}
              <button
                className="ml-3"
                onClick={() => handleSocialClick(instagram)}
              >
                <img
                  src="https://img.icons8.com/color/48/000000/instagram-new.png"
                  alt="Instagram"
                  className="instagram-logo border-0"
                  style={iconStyle}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-12 text-center">
            <h1 className="text-primary">
              <span className={`${getcolor()}`}>
                <b>About</b>
              </span>
              <span className={`${getcolor()}`}>
                {" "}
                <b>Us</b>
              </span>
            </h1>
            <p className={`${getcolor()}`}>
              <b>Meet our amazing team! Together we made it possible.</b>
            </p>
          </div>
        </div>

        <div className="row">
          <TeamMemberCard
            name="V Naga Sai Rahul"
            role="FRONTEND & BACKEND"
            description="Hello, I have handled server-side logic and Forntend to backend connectivity."
            email="nagasairahulvudumula@gmail.com"
            github="https://github.com/Rahul21sai"
            instagram="https://instagram.com/_naga_sai_rahul_?igshid=MzMyNGUyNmU2YQ=="
            handleEmailClick={handleEmailClick}
            handleSocialClick={handleSocialClick}
            iconStyle={iconStyle}
          />

          <TeamMemberCard
            name="U Nithin"
            role="BACKEND"
            description="Hey everyone, I have helped in architecting core backend structures, implementing algorithms, and troubleshooting to maintain high-performance server operations using the MERN technologies."
            email="upparanithin0608@gmail.com"
            github="https://github.com/NithinUppara2003”"
            instagram=""
            handleEmailClick={handleEmailClick}
            handleSocialClick={handleSocialClick}
            iconStyle={iconStyle}
          />

          <TeamMemberCard
            name="Shaik Mohammed Abdul Kareem"
            role="FRONTEND"
            description="Hello there, I gave my best to build user-friendly interfaces with HTML, Bootstrap, and MERN technologies, focusing on responsiveness and accessibility for an engaging user experience."
            email="abdulkareem16505@gmail.com"
            github="https://github.com/smd-abdulkareem"
            instagram="https://instagram.com/smd_abdulkareem?igshid=OGQ5ZDc2ODk2ZA"
            iconStyle={iconStyle}
          />

          <TeamMemberCard
            name="K.SriJanaki"
            role="FRONTEND"
            description="Hey everyone, I helped in making dynamic features using React.js, collaborating with designers to translate concepts into code for visually appealing and interactive web applications."
            email="srijanaki.katabathina@gmail.com"
            github="https://github.com/srijanaki-k"
            instagram=""
            iconStyle={iconStyle}
          />

          <TeamMemberCard
            name="C Jaya Surya"
            role="FRONTEND"
            description="Hello, I have helped in bringing creative concepts using MERN frontend technologies, excelling in state management with required tools for cutting-edge and competitive frontend development."
            email="jayasurya.21bce9582@vitapstudent.ac.in"
            github="https://github.com/jayasurya9582"
            instagram="https://instagram.com/_jaya_surya_18?igshid=OGQ5ZDc2ODk2ZA=="
            handleEmailClick={handleEmailClick}
            handleSocialClick={handleSocialClick}
            iconStyle={iconStyle}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AboutUs;