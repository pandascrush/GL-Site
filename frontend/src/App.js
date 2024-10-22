import "./App.css";
import Insights from "./Landingpage/Insights/Insights";
import Aboutus from "./Landingpage/Aboutus/Aboutus";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Credentials from "./Landingpage/Credentials/Credentials";
import Menubar from "./Landingpage/Menubar/Menubar";
import Footer from "./Landingpage/Footer/Footer";
import Footercard from "./Landingpage/Footercard/Footercard";
import AboutKggl from "./Aboutsection/AboutKggl/AboutKggl";
import Mission from "./Aboutsection/Mission/Mission";
import Banner from "./Landingpage/Banner/Banner";
import Ourservices from "./Landingpage/Ourservices/Ourservices";
import Whygeniuslabs from "./Aboutsection/Whygeniuslabs/Whygeniuslabs";
import Teamfeatures from "./HRRecruitment/Teamfeatures/Teamfeatures";
import Bannerhr from "./HRRecruitment/Recruitment/Bannerhr/Bannerhr";
import Aboutpagehr from "./HRRecruitment/Recruitment/Aboutpage/Aboutpage";
import Sectors from "./HRRecruitment/Recruitment/Sectors/Sectors";
import Clientpage from "./HRRecruitment/Recruitment/Clientpage/Clientpage";
import Corevalues from "./HRRecruitment/Recruitment/Corevalues/Corevalues";
import { Evolution } from "./Aboutsection/Evolution/Evolution";
import Discover from "./HRRecruitment/Discover/Discover";
import Sapbanner from "./Sap/Sapbanner/Sapbanner";
import Sapimplementation from "./Sap/Sapimplementation/Sapimplementation";
import Hanacloud from "./Sap/Hanacloud/Hanacloud";
import Methodology from "./Sap/Methodology/Methodology";
import Greenfield from "./Sap/Greenfield/Greenfield";
import Newimplement from "./Sap/Newimplement/Newimplement";
import Contactpage from "./Landingpage/Contactpage/Contactpage";
import Contactsap from "./Sap/Contactsap/Contactsap";
import Hrfooter from "./HRRecruitment/Hrfooter/Hrfooter";
import Footerabout from "./Aboutsection/Footerabout/Footerabout";
import DMBanner from "./DigitalMarketing/DMBanner";
import Dmservice from "./DigitalMarketing/Dmservice/Dmservice";
import Adoptdm from "./DigitalMarketing/Adoptdm/Adoptdm";
import Dmcontact from "./DigitalMarketing/Dmcontact/Dmcontact";
import Footerdm from "./DigitalMarketing/Footerdm/Footerdm";
import Sapmenubar from "./Sap/Sapmenubar/Sapmenubar";
import Menubardm from "./DigitalMarketing/Menubardm/Menubardm";
import Hrmenubar from "./HRRecruitment/Hrmenubar/Hrmenubar";
import BannerIT from "./IT/BannerIT/BannerIT";
import Itfooter from "./IT/ITFooter/Itfooter";
import Dmblogview from "./DigitalMarketing/DMblogview/Dmblogview";
import Dmblog from "./DigitalMarketing/Dmblog/Dmblog";
import Sapblogview from "./Sap/Sapblogview/Sapblogview";
import Contactpages from "./Landingpage/Contactpages/Contactpages";
import Blogviewed from "./Landingpage/Blogviewed/Blogviewed";
import Blogit from "./IT/Blogit/Blogit";
import Autopopup from "./Landingpage/Autopopup/Autopopup";
import CRM from "./IT/CRM/CRM";
import LMS from "./IT/LMS/LMS";
import Demobook from "./IT/Demobook/Demobook";
import Techstack from "./IT/Techstack/Techstack";
import Contactformit from "./IT/Contactformit/Contactformit";
import Crmdemobook from "./IT/Demobook/Crmdemobook";
import CRMSolutions from "./IT/CRMSolutions/CRMSolutions";
import ITMenubar from "./IT/ITMenubar/ITMenubar";
import Dynamicblog from "./Landingpage/Dynamicblog/Dynamicblog";
import Errorpage from "./Landingpage/Errorpage/Errorpage";
import Loginpage from "./Landingpage/Loginpage/Loginpage";
import BlogDisplay from "./Landingpage/BlogDisplay/BlogDisplay";
import BlogUpdate from "./Landingpage/BlogDisplay/BlogUpdate";
import EditorBlog from "./Landingpage/Editorblog/Editorblog";
import Blogupdation from "./Landingpage/Blogupdation/Blogupdation";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={[
              <Menubar />,
              <Banner />,
              <Aboutus />,
              <Ourservices />,
              <Credentials />,
              <Insights />,
              <Contactpages />,
              <Footercard />,
              <Footer />,
              <Autopopup />,
            ]}
          />
          <Route
            path="/aboutus"
            element={[
              <Menubar />,
              <AboutKggl />,
              <Evolution />,
              <Mission />,
              <Whygeniuslabs />,
              <Footercard />,
              <Footerabout />,
            ]}
          />
          <Route
            path="/HR_Consultancy"
            element={[
              <Hrmenubar />,
              <Bannerhr />,
              <Aboutpagehr />,
              <Teamfeatures />,
              <Sectors />,
              <Clientpage />,
              <Corevalues />,
              <Discover />,
              <Footercard />,
              <Hrfooter />,
              <Autopopup />,
            ]}
          />
          <Route
            path="/blogs"
            element={[<Menubar />, <Blogviewed />, <Footercard />, <Footer />]}
          />
          <Route
            path="/imp"
            element={[
              <Sapimplementation />,
              <Hanacloud />,
              <Methodology />,
              <Greenfield />,
              <Newimplement />,
              <Contactsap />,
            ]}
          />
          <Route
            path="/contact"
            element={[<Menubar />, <Contactpage />, <Footercard />, <Footer />]}
          />
          <Route
            path="/SAP_Services_Consultancy"
            element={[<Sapmenubar />, <Sapbanner />, <Autopopup />]}
          />
          <Route
            path="/IT_Services"
            element={[<ITMenubar />, <BannerIT />, <Autopopup />]}
          />
          <Route
            path="/Digital_Marketing_Consultancy"
            element={[
              <Menubardm />,
              <DMBanner />,
              <Dmservice />,
              <Adoptdm />,
              <Dmblog />,
              <Dmcontact />,
              <Footercard />,
              <Footerdm />,
              <Autopopup />,
            ]}
          />
          <Route path="/Digital_Marketing_Blog/:id" element={<Dmblogview />} />
          <Route path="/Sap_blog/:id" element={[<Menubar />,<Sapblogview />,<Footercard />,<Footer />]} />
          <Route
            path="/IT_Blog/:id"
            element={[<Menubar />, <Blogit />, <Footercard />, <Footer />]}
          />
          <Route
            path="/crm"
            element={[
              <CRM />,
              <CRMSolutions />,
              <Crmdemobook />,
              <Techstack />,
              <Contactformit />,
              <Footercard />,
              <Itfooter />,
            ]}
          />
          <Route
            path="/lms"
            element={[
              <LMS />,
              <Demobook />,
              <Techstack />,
              <Contactformit />,
              <Footercard />,
              <Itfooter />,
            ]}
          />
          {/* <Route path='/Sap_blog1' element={<Sapblogview1/>}/> */}
          <Route path="/Blog_login" element={<Loginpage />} />
          <Route path="/Dynamic_blog" element={<Dynamicblog />} />
          <Route path="/bl" element={<BlogDisplay />} />
          <Route path="*" element={<Errorpage />} />
          <Route path="/blog-update" element={<BlogUpdate />} />
          <Route path="/BlogEditor/:id" element={<EditorBlog/>}/>
          <Route path="/UpdateBlog/:id/:userid" element={<Blogupdation/>}/>
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
