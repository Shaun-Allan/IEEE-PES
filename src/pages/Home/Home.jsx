import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Image } from "@nextui-org/react";
import valleyImage from "../../assets/valley.png";
import valleyLayerImage from "../../assets/valley_layer.png";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { useSpring, animated } from "@react-spring/web";
import "./Home.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import slide_image1 from "../../assets/slide1.png";
import slide_image2 from "../../assets/slide2.png";
import slide_image3 from "../../assets/slide3.jpg";
import slide_image4 from "../../assets/slide4.png";
import slide_image5 from "../../assets/slide5.png";
import {
  IoIosArrowDroprightCircle,
  IoIosArrowDropleftCircle,
} from "react-icons/io";
import ElectricLine from "../../components/Electric/ElectricLine";
import ElecContainer from "../../components/ElecContainer/ElecContainer";
import ReactTypingEffect from "react-typing-effect";
import { NavLink } from "react-router-dom"; // Import NavLink component
import Footer from "../../components/Footer/Footer";

const Home = () => {
  const navigate = useNavigate();

  const subtitleAnimation = useSpring({
    from: { opacity: 0, transform: "translateY(50px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    delay: 500,
  });

  const observer = new IntersectionObserver(
    (text) => {
      text.forEach((t) => {
        t.target.classList.toggle("show", t.isIntersecting);
      });
    },
    {
      threshold: 0.5,
    }
  );

  setInterval(() => {
    const amp_text = document.querySelectorAll(".amp-text");
    const amp_text_down = document.querySelectorAll(".amp-text-down");
    const power_text = document.querySelectorAll(".power-text");
    const content_section = document.querySelectorAll(".content-section");
    amp_text.forEach((t) => {
      observer.observe(t);
    });

    amp_text_down.forEach((t) => {
      observer.observe(t);
    });

    power_text.forEach((t) => {
      observer.observe(t);
    });
    content_section.forEach((t) => {
      observer.observe(t);
    });
  }, 100);

  return (
    
    <Parallax pages={3.179}>
      {/* First Page */}
      <ParallaxLayer offset={0} speed={0.1}>
        <div className="background flex flex-col items-center justify-between text-black relative min-h-screen">
          {/* Background content if any */}
        </div>
      </ParallaxLayer>
      <ParallaxLayer offset={0.02} speed={0.45} factor={1.3}>
        <img src={valleyImage} alt="Valley" className="valley-image" />
      </ParallaxLayer>
      <ParallaxLayer offset={0} speed={-0.5}>
        <div className="title-layer flex flex-col items-center justify-center min-h-screen text-center">
          <h1 className="text-8xl font-bold mb-4 text-black">
            IEEE Power & Energy Society
          </h1>
          <animated.p
            style={subtitleAnimation}
            className="text-4xl max-w-lg mb-24 text-black"
          >
            <ReactTypingEffect 
            speed={100}
            eraseDelay={3000}
            typingDelay={1000}
            eraseSpeed={200}
            text={["SSN Student Chapter", "Generating Impact"]} 
            />
          </animated.p>

        </div>
      </ParallaxLayer>
      <ParallaxLayer offset={0} speed={0.15} factor={1.2}>
        <img
          src={valleyLayerImage}
          alt="Valley Layer"
          className="valley-layer-image"
        />
      </ParallaxLayer>

      <Button
        as={NavLink}
        to="/signup"
        variant="flat"
        color="#3175b1"
        className="animated-button z-index-400 absolute top-[calc(50%+0px)] left-1/2 transform -translate-x-1/2"
      >
        Join IEEE PES
      </Button>

      {/* Second Page */}
      <ParallaxLayer offset={1} speed={0.15}>
        <div className="about-section min-h-screen flex items-center justify-center">
          <div className="flex flex-row items-center w-full max-w-7xl mx-auto px-4 space-x-8">
            <div className="image-text flex-1 text-left flex flex-col justify-center space-y-10">
              <h1 className="amp-text text-4xl font-bold mb-4 text-white">
                Amping Up the Future
              </h1>
              <p className="amp-text-down text-lg mb-8 mr-24 text-white">
                Our mission is to be the leading provider of scientific and
                engineering information on electric power and energy for the
                betterment of society, and the preferred professional
                development source for our members.
              </p>
            </div>
            <div className="flex-1">
              <Swiper
                effect="coverflow"
                grabCursor={true}
                centeredSlides={true}
                loop={false}
                slidesPerView="auto"
                initialSlide={2}
                coverflowEffect={{
                  rotate: 0,
                  stretch: 180,
                  depth: 200,
                  modifier: 2.5,
                }}
                pagination={{ el: ".swiper-pagination", clickable: true }}
                navigation={{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                  clickable: true,
                }}
                modules={[EffectCoverflow, Pagination, Navigation]}
                className="swiper_container h-96 overflow-visible"
              >
                <SwiperSlide className="flex items-center justify-center h-full">
                  <Image
                    isBlurred
                    // isZoomed
                    alt="NextUI Fruit Image with Zoom"
                    src={slide_image1}
                    className="swiper-slide-img m-10"
                  />
                </SwiperSlide>
                <SwiperSlide className="flex items-center justify-center h-full">
                  <Image
                    isBlurred
                    // isZoomed
                    alt="NextUI Fruit Image with Zoom"
                    src={slide_image2}
                    className="swiper-slide-img m-10"
                  />
                </SwiperSlide>
                <SwiperSlide className="flex items-center justify-center h-full">
                  <Image
                    isBlurred
                    // isZoomed
                    alt="NextUI Fruit Image with Zoom"
                    src={slide_image3}
                    className="swiper-slide-img m-10 h-80 w-80 object-cover"
                  />
                </SwiperSlide>
                <SwiperSlide className="flex items-center justify-center h-full">
                  <Image
                    isBlurred
                    // isZoomed
                    alt="NextUI Fruit Image with Zoom"
                    src={slide_image4}
                    className="swiper-slide-img m-10"
                  />
                </SwiperSlide>
                <SwiperSlide className="flex items-center justify-center h-full">
                  <Image
                    isBlurred
                    // isZoomed
                    alt="NextUI Fruit Image with Zoom"
                    src={slide_image5}
                    className="swiper-slide-img m-10"
                  />
                </SwiperSlide>
                <IoIosArrowDropleftCircle className="swiper-button-prev slider-arrow text-[#3175b1] ml-10" />
                <IoIosArrowDroprightCircle className="swiper-button-next slider-arrow text-[#3175b1] mr-12" />
                <div className="swiper-pagination"></div>
              </Swiper>
            </div>
          </div>
        </div>
      </ParallaxLayer>

      {/* Third Page with Blending Effect */}
      <ParallaxLayer offset={2} speed={0.1}>
        <div className="new-section min-h-screen flex flex-col justify-start bg-[#414F38] p-8">
          <div className="flex flex-col text-white p-8">
            <div className="flex flex-row items-end mb-12">
              <h1 className="power-text text-4xl font-bold ml-5">
                The Powerful Activities that light up IEEE PES
              </h1>
            </div>
            <div className="space-y-20">
              <div className="content-section mt-4 flex items-center space-x--50">
                <ElecContainer children={"Awareness Rally"} />
                <ElectricLine />
                <ElecContainer children={"Guest Talks"} />
                <ElectricLine />
                <ElecContainer children={"Field Visits"} />
              </div>
              <div className="content-section mt-4 flex items-center space-x--50">
                <ElecContainer children={"Camps"} />
                <ElectricLine />
                <ElecContainer children={"Teaching Schools"} />
                <ElectricLine />
                <ElecContainer children={"Project Exhibition"} />
              </div>
              <div className="content-section mt-4 flex items-center space-x--50">
                <ElecContainer children={"Talks from different fields"} />
                <ElectricLine />
                <ElecContainer children={"Hackathons & other competitions"} />
                <ElectricLine />
                <ElecContainer children={"National Conference"} />
              </div>
            </div>
          </div>
        </div>
      </ParallaxLayer>

      {/* Blend Section */}
      <ParallaxLayer offset={1.91} speed={0.1}>
        <div className="blend-section blend-section h-[20vh] absolute inset-0 bg-gradient-to-t from-[#414F38] to-[#386c5f]"></div>
      </ParallaxLayer>
      <ParallaxLayer offset={2.98}>
        <Footer></Footer>
      </ParallaxLayer>
    </Parallax>
  );
};

export default Home;
