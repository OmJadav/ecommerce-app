import "./Banner.scss";
import BannerImg from "../../../assets/banner-img.png";

const Banner = () => {
  return (
    <div className="hero-banner">
      <div className="content">
        <div className="text-content">
          <h1>Soon!</h1>
          <p>
            Discover the latest in electronic gadgets! Stay ahead with the
            newest trends in earbuds, headphones, smartwatches, and speakers.
            Find your perfect tech match today.
          </p>
          <div className="ctas">
            <a
              href="https://indianexpress.com/article/technology/tech-news-technology/cmf-watch-pro-first-look-8958903/"
              target="_blank"
              className="banner-cta cursor-pointer"
            >
              Read More
            </a>
            <div className="banner-cta v2">Shop Now</div>
          </div>
        </div>
        <img
          // src={BannerImg}
          // src="https://www.gonoise.com/cdn/shop/files/4_f24621b6-7c6f-41bf-a6d1-5641ac1849bb.png?v=1714033033"
          src="https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1714042964/Croma%20Assets/Communication/Wearable%20Devices/Images/303132_0_mzs6lk.png?tr=w-640"
          className="banner-img"
          alt=""
        />
      </div>
    </div>
  );
};

export default Banner;
