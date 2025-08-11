import { Route, Routes } from 'react-router-dom';
import Dashboard from '../Components/Dashboard/Dashboard'
import AboutUs from '../Pages/Aboutus/AboutUs';
import ContactUs from '../Pages/ContactUs/ContactUs';
import Home from '../Pages/Home/Home';

function Router() {
    return (
        <Routes>
            <Route path="/*" element={<Dashboard />} >
                <Route path="home" element={<Home />} />
                <Route path="about" element={<AboutUs />} />
                <Route path="contact" element={<ContactUs />} />
            </Route>
        </Routes>
    );
}

export default Router;
