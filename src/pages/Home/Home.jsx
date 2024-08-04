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
import { useState, useEffect } from "react";
import ElecLineVertical from "../../components/Electric/ElecLineVertical";
import ElectricLineInv from "../../components/Electric/ElectricLineInv";
import ElecFlicker from "../../components/ElecContainer/ElecFlicker";

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
      threshold: 0.3,
    }
  );

  const observer_ = new IntersectionObserver(
    (text) => {
      text.forEach((t) => {
        t.target.classList.toggle("show", t.isIntersecting);
      });
    },
    {
      threshold: 0.01,
    }
  );

  setInterval(() => {
    const amp_text = document.querySelectorAll(".amp-text");
    const amp_text_down = document.querySelectorAll(".amp-text-down");
    const power_text = document.querySelectorAll(".power-text");
    const content_section = document.querySelectorAll(".content-section");
    const content_sectio = document.querySelectorAll(".content-sectio");
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
    content_sectio.forEach((t) => {
      observer_.observe(t);
    });
  }, 100);

  const [boffset, bsetOffset] = useState(); // Offset for larger screens
  const [noffset, nsetOffset] = useState(); // Offset for larger screens
  const [foffset, fsetOffset] = useState();
  const [moffset, msetOffset] = useState();
  const [soffset, ssetOffset] = useState();

  const handleResize = () => {
    const width = window.innerWidth;

    // Update offsets based on window width
    if (width <= 500) {
      ssetOffset(170); // Adjust for small screens
      nsetOffset(5);
      bsetOffset(2);
      fsetOffset(4.79);
      msetOffset(1);
    } else if (width <= 768) {
      ssetOffset(320);
      nsetOffset(3.179);
      bsetOffset(2);
      fsetOffset(4.79);
      msetOffset(1);
    } else if (width <= 1120) {
      ssetOffset(170);
      nsetOffset(3.179);
      bsetOffset(1.91);
      fsetOffset(2.98);
      msetOffset(2.5);
    } else {
      ssetOffset(170); // Default for larger screens
      nsetOffset(3.179);
      bsetOffset(1.91);
      fsetOffset(2.98);
      msetOffset(2.5);
    }
  };

  useEffect(() => {
    // Initial call to set up offsets
    handleResize();

    // Add resize listener
    window.addEventListener('resize', handleResize);

    // Clean up listener on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []); 

  // Set interval for periodic checks
  // window.addEventListener('resize', handleResize);// Adjust interval time as needed

  // Clean up interval on unmount

  return (
    <Parallax pages={noffset}>
      {/* First Page */}
      <ParallaxLayer offset={0} speed={0.1}>
        <div className="background flex flex-col items-center justify-between text-black relative min-h-screen">
          {/* Background content if any */}
        </div>
      </ParallaxLayer>
      <ParallaxLayer offset={0.02} speed={0.45} factor={1.3}>
        <img src={valleyImage} alt="Valley" className="valley-image" />
      </ParallaxLayer>
      <ParallaxLayer offset={0} speed={-0.7}>
        <div className="title-layer flex flex-col items-center justify-center min-h-screen text-center">
          <h1 className="text-8xl font-bold mb-4 text-black">
            <span className="ieee mb-5">IEEE </span>
            <span className="pes">Power & Energy Society</span>
          </h1>
          <animated.p
            style={subtitleAnimation}
            className="slogan text-4xl max-w-lg mb-32 mt-10 text-black"
          >
            <ReactTypingEffect
              className="sloganType"
              speed={100}
              eraseDelay={3000}
              typingDelay={1000}
              eraseSpeed={50}
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

      <ParallaxLayer className="mobileParal" offset={2} speed={0.8}>
        <div className="m-new-section flex flex-col text-white p-8"></div>
      </ParallaxLayer>

      {/* Second Page */}
      <ParallaxLayer offset={1} speed={0.15}>
        <div className="about-section min-h-screen flex items-center justify-center">
          <div className="about flex items-center w-full max-w-7xl mx-auto px-4 space-x-8">
            <div className="image-text flex-1 text-left flex flex-col justify-center space-y-10">
              <h1 className="amp-text text-4xl font-bold mb-4 text-white">
                Amping Up the Future
              </h1>
              <p className="amp-text-down text-lg mb-8  text-white">
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
                  stretch: soffset,
                  depth: 200,
                  modifier: moffset,
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
                <IoIosArrowDropleftCircle className="swiper-button-prev slider-arrow text-[#3175b1]" />
                <IoIosArrowDroprightCircle className="swiper-button-next slider-arrow text-[#3175b1]" />
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
            <div className="space-y-0">
              <div className="content-section mt-4 flex items-center space-x--50">
                <ElecContainer>Awareness Rally </ElecContainer>
                <ElectricLine />
                <ElecContainer>Guest Talks</ElecContainer>
                <ElectricLine />
                <ElecContainer>Field Visits</ElecContainer>
              </div>
              <div className="first-line">
                <ElecLineVertical />
              </div>

              <div className="content-section mt-4 flex items-center space-x--50">
                <ElecContainer>Camps</ElecContainer>
                <ElectricLineInv />
                <ElecContainer>Teaching Schools</ElecContainer>
                <ElectricLineInv />
                <ElecContainer>Project Exhibitions</ElecContainer>
              </div>
              <div className="second-line">
                <ElecLineVertical />
              </div>
              <div className="content-section mt-4 flex items-center space-x--50">
                <ElecContainer>Talks from different Fields</ElecContainer>
                <ElectricLine />
                <ElecContainer>Hackathons and Other Competitions</ElecContainer>
                <ElectricLine />
                <ElecContainer>National Conference</ElecContainer>
              </div>
            </div>
          </div>
        </div>
      </ParallaxLayer>

      {/* Blend Section */}
      <ParallaxLayer offset={boffset} speed={0.1}>
        <div className="blend-section absolute inset-0 bg-gradient-to-t from-[#414F38] to-[#386c5f]"></div>
      </ParallaxLayer>

      <ParallaxLayer className="mobileParal" offset={2.5} speed={0.2}>
        <div className="m-new-section m-new-new flex flex-col text-white p-8"></div>
      </ParallaxLayer>
      <ParallaxLayer className="mobileParala mt-40" offset={2.8} speed={0.1}>
        <div className="m-elec flex flex-col text-white p-8">
          <div className="content-sectio w-full">
            <ElecContainer>Awareness Rally</ElecContainer>
          </div>
          <div className="content-sectio w-full">
            <ElecLineVertical />
          </div>
          <div className="content-sectio w-full">
            <ElecContainer>Guest Talks</ElecContainer>
          </div>
          <div className="content-sectio w-full">
            <ElecLineVertical />
          </div>
          <div className="content-sectio w-full">
            <ElecContainer>Field Visits</ElecContainer>
          </div>
          <div className="content-sectio w-full">
            <ElecLineVertical />
          </div>
          <div className="content-sectio w-full">
            <ElecContainer>Camps</ElecContainer>
          </div>
          <div className="content-sectio w-full">
            <ElecLineVertical />
          </div>
          <div className="content-sectio w-full">
            <ElecContainer>Teaching Schools</ElecContainer>
          </div>
          <div className="content-sectio w-full">
            <ElecLineVertical />
          </div>
          <div className="content-sectio w-full">
            <ElecContainer>Project Exhibition</ElecContainer>
          </div>
          <div className="content-sectio w-full">
            <ElecLineVertical />
          </div>
          <div className="content-sectio w-full">
            <ElecContainer>Talks from different Fields</ElecContainer>
          </div>
          <div className="content-sectio w-full">
            <ElecLineVertical />
          </div>
          <div className="content-sectio w-full">
            <ElecContainer>Hackathons and Other Competitions</ElecContainer>
          </div>
          <div className="content-sectio w-full">
            <ElecLineVertical />
          </div>
          <div className="content-sectio w-full">
            <ElecContainer>National Conference</ElecContainer>
          </div>
        </div>
      </ParallaxLayer>
      <ParallaxLayer className="m-blend-p" offset={2} speed={0.1}>
        <div className="m-blend-section absolute inset-0 bg-gradient-to-t from-[#414F38] to-[#386c5f]"></div>
      </ParallaxLayer>
      <ParallaxLayer offset={2} speed={1}>
        <div className="flex flex-row items-end mb-12">
          <h1 className="m-power-text text-4xl font-bold ml-5">
            <span className="m-power-span">
              The Powerful Activities that light up
            </span>
            <br />
            <br />
            <span>IEEE PES</span>
          </h1>
        </div>
      </ParallaxLayer>
      {/* <ParallaxLayer className="mobileParal" offset={0.5} speed={0.11  }>
        <div className="m-new-section flex flex-col text-white p-8">
        </div>
      </ParallaxLayer> */}
      <ParallaxLayer offset={foffset}>
        <Footer></Footer>
      </ParallaxLayer>
    </Parallax>
  );
};

export default Home;
