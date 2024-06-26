import "./Header.scss";
import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TbSearch } from "react-icons/tb";
import { CgShoppingCart } from "react-icons/cg";
import { FaUserLarge } from "react-icons/fa6";
import Search from "./Search/Search";
import Cart from "../Cart/Cart";
import { Context } from "../../utils/context";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { sendDataApi } from "../../utils/api";
const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const { cartCount, userData } = useContext(Context);
  const navigate = useNavigate();

  const userInfo = JSON.parse(localStorage?.getItem("userInfo"));

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 200) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  const userLogout = () => {
    sendDataApi(`/api/auth/logout`);
    localStorage?.removeItem("userInfo");
    window.location.href = "/";
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <>
      <header className={`main-header ${scrolled ? "sticky-header" : ""}`}>
        <div className="header-content">
          <ul className="left">
            <li onClick={() => navigate("/")}>Home</li>
            {/* <li>About</li> */}
            <Link to={"/category/666c92e2f0563829fafdebf0"}>Catergories</Link>
          </ul>
          <div className="center ">
            <Link to={"/"}>Gadget HUB</Link>
          </div>
          <div className="right">
            <TbSearch onClick={() => setShowSearch(true)} />

            <span className="cart-icon" onClick={() => setShowCart(true)}>
              <CgShoppingCart />
              {!!cartCount && <span>{cartCount}</span>}
            </span>
            <Menu as="div" className="relative ml-2 mr-2">
              <div>
                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm ">
                  <FaUserLarge />
                </MenuButton>
              </div>
              <Transition
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <MenuItems className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {userInfo && userInfo !== undefined ? (
                    <>
                      <MenuItem>
                        {({ focus }) => (
                          <Link
                            to={"/my-profile"}
                            className={classNames(
                              focus ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Your Profile
                          </Link>
                        )}
                      </MenuItem>
                      {userData?.role === "ad@min#" ? (
                        <MenuItem>
                          {({ focus }) => (
                            <Link
                              to={"/admin"}
                              className={classNames(
                                focus ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Admin
                            </Link>
                          )}
                        </MenuItem>
                      ) : null}
                      <MenuItem>
                        {({ focus }) => (
                          <Link
                            to={"/my-orders"}
                            className={classNames(
                              focus ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Your Orders
                          </Link>
                        )}
                      </MenuItem>
                      <MenuItem>
                        {({ focus }) => (
                          <div
                            onClick={userLogout}
                            className={classNames(
                              focus ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700",
                              "cursor-pointer"
                            )}
                          >
                            Log out
                          </div>
                        )}
                      </MenuItem>
                      <hr />
                      <MenuItem disabled>
                        {({ focus }) => (
                          <a
                            href="#"
                            className={classNames(
                              focus ? "bg-gray-100" : "",
                              "flex justify-center content-center  px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            👤 {userInfo.firstName} {userInfo.lastName}
                          </a>
                        )}
                      </MenuItem>
                    </>
                  ) : (
                    <MenuItem>
                      {({ focus }) => (
                        <Link
                          to={"/auth/login"}
                          className={classNames(
                            focus ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          Login
                        </Link>
                      )}
                    </MenuItem>
                  )}
                </MenuItems>
              </Transition>
            </Menu>
          </div>
        </div>
      </header>
      {showCart && <Cart setShowCart={setShowCart} />}
      {showSearch && <Search setShowSearch={setShowSearch} />}
    </>
  );
};

export default Header;
