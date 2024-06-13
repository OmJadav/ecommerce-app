import "./Products.scss";
import Product from "./Product/Product";
const Products = ({ innerPage, headingText }) => {
  const allProducts = [
    {
      title: 'Noise Pulse 2 Max 1.85" Display, Bluetooth Calling Smart Watch',
      thumbnail: "https://m.media-amazon.com/images/I/71Q8czKqSIL._SX679_.jpg",
      images: [
        "https://m.media-amazon.com/images/I/71Q8czKqSIL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61nAoz3GpRL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71QGrEqdLeL._SX679_.jpg",
      ],
      price: 1499,
      description:
        'Noise Pulse 2 Max 1.85" Display, Bluetooth Calling Smart Watch, 10 Days Battery, 550 NITS Brightness, Smart DND, 100 Sports Modes, Smartwatch for Men and Women (Jet Black)',
      category: "watches",
    },
    {
      title: "Noise Explorer Kids Smart Watch",
      thumbnail: "https://m.media-amazon.com/images/I/61uVE2o1IEL._SX679_.jpg",
      images: [
        "https://m.media-amazon.com/images/I/61uVE2o1IEL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71i820XL8oL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/719g5LNIkNL._SX679_.jpg",
      ],
      price: 5499,
      description:
        "Noise Explorer Kids Smart Watch with GPS Tracking, 2-Way Video & Voice Calling, Safe Zone Alert, School Mode, SOS, Habit Formation, App for Parents (Phantom Blue)",
      category: "watches",
    },
    {
      title: "Noise Origin Smart Watch",
      thumbnail: "https://m.media-amazon.com/images/I/71KkgWNagTL._SX679_.jpg",
      images: [
        "https://m.media-amazon.com/images/I/71KkgWNagTL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71veKxOYybL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71O6ifXro8L._SX679_.jpg",
        "https://m.media-amazon.com/images/I/719g5LNIkNL._SX679_.jpg",
      ],
      price: 6499,
      description:
        "Noise Origin Smart Watch Smoothest UI Experience (New Nebula UI) & EN 1 Processor, 1.46” ApexVision AMOLED Display, Stainless Steel, Contour-Cut Design, Fitness Age, Fast Charging (Midnight Black)",
      category: "watches",
    },
    {
      title: "Amazfit Balance - AI Smartwatch",
      thumbnail: "https://m.media-amazon.com/images/I/61s1286UHgL._SX679_.jpg",
      images: [
        "https://m.media-amazon.com/images/I/61s1286UHgL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/715SdbEbpoL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61Jsz3g0BfL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71USiWutK2L._SX679_.jpg",
      ],
      price: 24999,
      description:
        'Amazfit Balance - AI Smartwatch, Fitness Coach, Sleep & Health Tracker with Body Composition, 1.5" AMOLED Display, BT Calling, Alexa Built-in, Dual-Band GPS, 14-Day Battery (Lagoon) (Special Edition)',
      category: "watches",
    },
    {
      title: "Apple Watch Series 9",
      thumbnail: "https://m.media-amazon.com/images/I/7162zT9RKRL._SX679_.jpg",
      images: [
        "https://m.media-amazon.com/images/I/7162zT9RKRL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61ku8aR9zxL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/81ujc3rj2iL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61E9FqYKHZL._SX679_.jpg",
      ],
      price: 44900,
      description:
        "Apple Watch Series 9 [GPS 45mm] Smartwatch with Midnight Aluminum Case with Midnight Sport Band M/L. Fitness Tracker, Blood Oxygen & ECG Apps, Always-On Retina Display, Water Resistant",
      category: "watches",
    },
    {
      title: "Apple Watch SE (2nd Gen, 2023)",
      thumbnail: "https://m.media-amazon.com/images/I/61rTufzD1zL._SX679_.jpg",
      images: [
        "https://m.media-amazon.com/images/I/61rTufzD1zL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61zvtTqotsL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71p2TMZBlCL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71LFs6FLcEL._SX679_.jpg",
      ],
      price: 27999,
      description:
        "Apple Watch SE (2nd Gen, 2023) [GPS 40mm] Smartwatch with Midnight Aluminum Case with Midnight Sport Band S/M. Fitness & Sleep Tracker, Crash Detection, Heart Rate Monitor, Retina Display",
      category: "watches",
    },
    {
      title: "Apple Watch Ultra ",
      thumbnail: "https://m.media-amazon.com/images/I/81QDwPwAPYL._SX679_.jpg",
      images: [
        "https://m.media-amazon.com/images/I/81QDwPwAPYL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/81lQKgTMzQL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/81mik1zN55L._SX679_.jpg",
        "https://m.media-amazon.com/images/I/713qQXyv+9L._SX679_.jpg",
      ],
      price: 63990,
      description:
        "Apple Watch Ultra [GPS + Cellular 49 mm] smart watch w/Rugged Titanium Case & Black/Grey Trail Loop - M/L Fitness Tracker, Precision GPS, Action Button, Extra-Long BatteryLife, Brighter Retina Display",
      category: "watches",
    },
    {
      title: "Apple Watch Ultra 2",
      thumbnail: "https://m.media-amazon.com/images/I/71JNSeO-nbL._SX679_.jpg",
      images: [
        "https://m.media-amazon.com/images/I/71JNSeO-nbL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71Mdu94257L._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71KHprfnKVL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71Q-4X6lBhL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61CVih3UpdL._SX679_.jpg",
      ],
      price: 89900,
      description:
        "Apple Watch Ultra 2 [GPS + Cellular 49mm] Smartwatch with Rugged Titanium Case & Orange Ocean Band One Size. Fitness Tracker,Precision GPS,Action Button,Extra-Long Battery Life,Bright Retina Display",
      category: "watches",
    },
    {
      title: "Apple AirPods",
      thumbnail: "https://m.media-amazon.com/images/I/61GDJtxN3NL._SX679_.jpg",
      images: [
        "https://m.media-amazon.com/images/I/61GDJtxN3NL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61U+IquL13L._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61CVih3UpdL._SX679_.jpg",
      ],
      price: 19100,
      description:
        "Apple AirPods (3rd Generation) with Lightning Charging Case spatial audio with dynamic head tracking places sound all around you Adaptive EQ automatically tunes music to your ears",
      category: "earbuds",
    },
    {
      title: "boAt Stone 352",
      thumbnail: "https://m.media-amazon.com/images/I/81GnlIB9mFL._SX450_.jpg",
      images: [
        "https://m.media-amazon.com/images/I/81GnlIB9mFL._SX450_.jpg",
        "https://m.media-amazon.com/images/I/9128Dl8OL3L._SX450_.jpg",
        "https://m.media-amazon.com/images/I/71P6rcq6idL._SX450_.jpg",
      ],
      price: 1599,
      description:
        "boAt Stone 352 Bluetooth Speaker with 10W RMS Stereo Sound, IPX7 Water Resistance, TWS Feature, Up to 12H Total Playtime, Multi-Compatibility Modes and Type-C Charging(Vibing Blue)",
      category: "speakers",
    },
    {
      title: "boAt Partypal 50",
      thumbnail: "https://m.media-amazon.com/images/I/61bq0ILE5CL._SX679_.jpg",
      images: [
        "https://m.media-amazon.com/images/I/61bq0ILE5CL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/719a4kP4KLL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/712W3p5nk3L._SX679_.jpg",
        "https://m.media-amazon.com/images/I/6115OzTIyfL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/711It7hSItL._SX679_.jpg",
      ],
      price: 3999,
      description:
        "boAt Partypal 50(Bluetooth) 20W RMS Stereo Sound, RGB LEDs , Wireless, Auxiliary,4.5 Hrs Playback, USB, Fm Speaker - Knight Black",
      category: "speakers",
    },
    {
      title: "OnePlus Nord Buds 2r",
      thumbnail: "https://m.media-amazon.com/images/I/51oMWaW7tKL._SX679_.jpg",
      images: [
        "https://m.media-amazon.com/images/I/51oMWaW7tKL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/51Rm6la26qL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61oTsqcJ7JL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/51FVoU9tJ+L._SX679_.jpg",
      ],
      price: 1999,
      description:
        "OnePlus Nord Buds 2r True Wireless in Ear Earbuds with Mic, 12.4mm Drivers, Playback:Upto 38hr case,4-Mic Design, IP55 Rating [Deep Grey]",
      category: "earbuds",
    },
    {
      title: "realme Buds T300",
      thumbnail: "https://m.media-amazon.com/images/I/61ZEQXGTepL._SX679_.jpg",
      images: [
        "https://m.media-amazon.com/images/I/61ZEQXGTepL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71xtnSu+lhL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71jbCnynKjL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71C5xCWehoL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/6127HXUu4hL._SX679_.jpg",
      ],
      price: 2199,
      description:
        "realme Buds T300 TWS Earbuds with 40H Play time,30dB ANC, 360° Spatial Audio with Dolby Atmos, 12.4 mm Dynamic Bass Boost Driver, IP55 Water & Dust Resistant, BT v5.3 (Stylish Black)",
      category: "earbuds",
    },
    {
      title: "OnePlus Buds 3",
      thumbnail: "https://m.media-amazon.com/images/I/51LxiMjx3XL._SX679_.jpg",
      images: [
        "https://m.media-amazon.com/images/I/51LxiMjx3XL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/51QQMpbUoiL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/51Tql8xO0dL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61j2Oz3VBYL._SX679_.jpg",
      ],
      price: 5499,
      description:
        "OnePlus Buds 3 TWS in Ear Earbuds with Upto 49dB Smart Adaptive Noise Cancellation,Hi-Res Sound Quality,Sliding Volume Control,10mins for 7Hours Fast Charging with Upto 44Hrs Playback (Splendid Blue)",
      category: "earbuds",
    },
    {
      title: "JBL Go 3",
      thumbnail: "https://m.media-amazon.com/images/I/51waOv47fqL._SX569_.jpg",
      images: [
        "https://m.media-amazon.com/images/I/51waOv47fqL._SX569_.jpg",
        "https://m.media-amazon.com/images/I/51eCmida9KL._SX569_.jpg",
        "https://m.media-amazon.com/images/I/41LT0mmIJoL._SX569_.jpg",
      ],
      price: 2799,
      description:
        "JBL Go 3, Wireless Ultra Portable Bluetooth Speaker, Pro Sound, Vibrant Colors with Rugged Fabric Design, Waterproof, Type C (Without Mic, Blue)",
      category: "speakers",
    },
    {
      title: "Srhythm NC25",
      thumbnail: "https://m.media-amazon.com/images/I/61wbr2lSdJL._SX679_.jpg",
      images: [
        "https://m.media-amazon.com/images/I/61wbr2lSdJL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71E5v8lqxPL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61ctrTFEfmL._SX679_.jpg",
      ],
      price: 7399,
      description:
        "Srhythm NC25 Wireless Headphones Bluetooth 5.3,Lightweight Noise Cancelling Headset Over-Ear with Low Latency,Game Mode",
      category: "headphones",
    },
    {
      title: "Noise Two Wireless",
      thumbnail: "https://m.media-amazon.com/images/I/517lSvEVVsL._SX679_.jpg",
      images: [
        "https://m.media-amazon.com/images/I/517lSvEVVsL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/6123McrMDhL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61e9pkNmWuL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71QyfyboQ8L._SX679_.jpg",
      ],
      price: 1699,
      description:
        "Noise Two Wireless On-Ear Headphones with 50 Hours Playtime, Low Latency(up to 40ms), 4 Play Modes, Dual Pairing, BT v5.3 (Serene Blue)",
      category: "headphones",
    },
    {
      title: "Sony WH-CH520",
      thumbnail: "https://m.media-amazon.com/images/I/41lArSiD5hL._SX679_.jpg",
      images: [
        "https://m.media-amazon.com/images/I/41lArSiD5hL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/811UeUfPYdL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/91tTIC0vQML._SX679_.jpg",
        "https://m.media-amazon.com/images/I/81gqmwsufOL._SX679_.jpg",
      ],
      price: 4889,
      description:
        "Sony WH-CH520, Wireless On-Ear Bluetooth Headphones with Mic, Upto 50 Hours Playtime, DSEE Upscale, Multipoint Connectivity/Dual Pairing,Voice Assistant App Support for Mobile Phones (Black)",
      category: "headphones",
    },
    {
      title: "JBL Tune 770NC",
      thumbnail: "https://m.media-amazon.com/images/I/51cJH+eKR6L._SX679_.jpg",
      images: [
        "https://m.media-amazon.com/images/I/51cJH+eKR6L._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71hAPNe5QcL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/81nP0qWChfL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71Q1B5AOdPL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71rH4u3DRIL._SX679_.jpg",
      ],
      price: 5999,
      description:
        "JBL Tune 770NC Wireless Over Ear ANC Headphones with Mic, Upto 70 Hrs Playtime, Speedcharge, Google Fast Pair, Dual Pairing, BT 5.3 LE Audio, Customize on Headphones App (Purple)",
      category: "headphones",
    },
    {
      title: "Apple AirPods Max",
      thumbnail: "https://m.media-amazon.com/images/I/81thV7SoLZL._SX679_.jpg",
      images: [
        "https://m.media-amazon.com/images/I/81thV7SoLZL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/81IfN-Rw8uL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/915jkZ40kSL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71xPnuZZPWL._SX679_.jpg",
      ],
      price: 59990,
      description:
        "Comes with dynamic driver ,Active Noise Cancellation blocks outside noise, so you can immerse yourself in music,Transparency mode for hearing and interacting with the world around you,Spatial audio with dynamic head tracking provides theater-like sound that surrounds you",
      category: "headphones",
    },
    {
      title: "boAt Stone 1450",
      thumbnail: "https://m.media-amazon.com/images/I/71RWq2CjD-L._SX679_.jpg",
      images: [
        "https://m.media-amazon.com/images/I/71RWq2CjD-L._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71ge+hwqeRL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61JsClraf-L._SX679_.jpg",
        "https://m.media-amazon.com/images/I/716pkCNeqtL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71NKR5EGOJL._SX679_.jpg",
      ],
      price: 4990,
      description:
        "boAt Stone 1450 Portable Wireless Speaker with 40W RMS Signature Sound, RGB LEDs, TWS Feature, Multi-Compatibility Modes, IPX5 Water Resistance, EQ Modes(Black Storm)",
      category: "speakers",
    },
    {
      title: "Marshall Emberton II",
      thumbnail: "https://m.media-amazon.com/images/I/61hJmFEUMnL._SX679_.jpg",
      images: [
        "https://m.media-amazon.com/images/I/61hJmFEUMnL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61m80VG-phL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/7125lE4Uu9L._SX679_.jpg",
        "https://m.media-amazon.com/images/I/716pkCNeqtL._SX679_.jpg",
      ],
      price: 15990,
      description:
        "Marshall Emberton II Compact Portable Bluetooth Speaker with 30+ Hours of Playtime, (360° Sound), Dust & Waterproof (IP67)-Black & Steel.",
      category: "speakers",
    },
    {
      title: "Artis BT12 Classic Retro",
      thumbnail: "https://m.media-amazon.com/images/I/61721FT561L._SY450_.jpg",
      images: [
        "https://m.media-amazon.com/images/I/61721FT561L._SY450_.jpg",
        "https://m.media-amazon.com/images/I/81LglKyXSBL._SY450_.jpg",
        "https://m.media-amazon.com/images/I/81bs0Rk0RIL._SY450_.jpg",
        "https://m.media-amazon.com/images/I/81w3gK2XJEL._SY450_.jpg",
        "https://m.media-amazon.com/images/I/81qdcagX9vL._SY450_.jpg",
        "https://m.media-amazon.com/images/I/81+Gizq1e9L._SY450_.jpg",
      ],
      price: 1299,
      description:
        "Artis BT12 Classic Retro Wireless BT Speaker with FM/USB/AUX in & Hands Free Calling (5W RMS Output)",
      category: "speakers",
    },
  ];

  return (
    <div className="products-container">
      {!innerPage && <div className="sec-heading">{headingText}</div>}
      <div className="products">
        {allProducts.map((product, index) => (
          <Product key={index} product={product} />
        ))}
        {/* <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product /> */}
      </div>
    </div>
  );
};

export default Products;
