import Footer from "../Footer/Footer";
import { Outlet, useLocation } from "react-router";
import Head from "../Header/Head";
import { useEffect, useRef } from "react";
import { useOnLoadImages } from "../../utils/hooks/useOnLoadImages";
import Loader from "../Loader/Loader";

const Layout = () => {
  const { pathname } = useLocation();
  const wrapperRef = useRef(null);
  const imagesLoaded = useOnLoadImages(wrapperRef);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="relative min-h-screen">
      <Head className="header"/>
      <div className="content mt-[var(--header-height)]">
        <div ref={wrapperRef}>
          {imagesLoaded ? (
            <Outlet />
          ) : (
            <Loader />
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
