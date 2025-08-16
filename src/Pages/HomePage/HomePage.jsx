import { FaHome } from 'react-icons/fa';
import Banner from '../../Components/Banner/Banner';
import Slider from '../../Components/Slider/SliderSection';
import AdvertisementSection from '../../Components/Advertisement/AdvertisementSection';
import LatestUserReviews from '../../Components/LatestUserReviews/LatestUserReviews';
import HowItWorks from '../../Components/HowItWorks/HowItWorks';
import TopRatedAgents from '../../Components/TopRatedAgents/TopRatedAgents';
import FAQSection from '../../Components/FAQ/FAQSection';
import WhyChooseUs from '../../Components/WhyChoseUs/WhyChooseUs';
import Banner1 from '../../Components/Banner/Banner1';
import Feateres from '../../Components/Features/Feateres';
import Loading from '../../Components/Loading/Loading';

const HomePage = () => {
    return (
        <div>
            <title>Home</title>
            {/* <Banner></Banner> */}
            <Banner1></Banner1>
            {/* <Slider></Slider> */}
            <AdvertisementSection></AdvertisementSection>
            {/* <Loading></Loading> */}
            <Feateres></Feateres>
            <WhyChooseUs></WhyChooseUs>
            <HowItWorks></HowItWorks>
            <TopRatedAgents></TopRatedAgents>
            <LatestUserReviews></LatestUserReviews>
            <FAQSection></FAQSection>
        </div>
    );
};

export default HomePage;