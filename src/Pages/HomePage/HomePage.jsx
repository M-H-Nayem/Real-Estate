import { FaHome } from 'react-icons/fa';
import Banner from '../../Components/Banner/Banner';
import Slider from '../../Components/Slider/SliderSection';
import AdvertisementSection from '../../Components/Advertisement/AdvertisementSection';
import LatestUserReviews from '../../Components/LatestUserReviews/LatestUserReviews';
import HowItWorks from '../../Components/HowItWorks/HowItWorks';
import TopRatedAgents from '../../Components/TopRatedAgents/TopRatedAgents';
import FAQSection from '../../Components/FAQ/FAQSection';
import WhyChooseUs from '../../Components/WhyChoseUs/WhyChooseUs';

const HomePage = () => {
    return (
        <div>
            <title>Home</title>
            <Banner></Banner>
            <Slider></Slider>
            <AdvertisementSection></AdvertisementSection>
            <TopRatedAgents></TopRatedAgents>
            <LatestUserReviews></LatestUserReviews>
            <WhyChooseUs></WhyChooseUs>
            <HowItWorks></HowItWorks>
            <FAQSection></FAQSection>
        </div>
    );
};

export default HomePage;