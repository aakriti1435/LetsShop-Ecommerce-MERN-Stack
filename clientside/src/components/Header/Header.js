import React, { useEffect, useState } from "react";
import flipkartLogo from "../../images/flipkartLogo.png";
import { IoIosArrowDown, IoIosCart, IoIosSearch } from "react-icons/io";
import {
    Modal,
    MUIInput,
    MUIButton,
    DropdownMenu,
} from "../MUIComponents/MUIComponents";
import { useDispatch, useSelector } from "react-redux";
import "./Header.css";
import { login } from "../../actions/user";

function Header() {
    const [loginModal, setLoginModal] = useState(false);
    const [signup, setSignup] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const dispatch = useDispatch();

    const userLogin = () => {
        const user = { email, password };
        dispatch(login(user));
    };

    return (
        <div className="header">
            <Modal visible={loginModal} onClose={() => setLoginModal(false)}>
                <div className="authContainer">
                    <div className="row">
                        <div className="leftspace">
                            <h2>Login</h2>
                            <br />
                            <p>
                                Get access to your Orders, Wishlist and
                                Recommendations
                            </p>
                        </div>
                        <div className="rightspace">
                            <div className="loginInputContainer">
                                {/* <MUIInput
                                    type="text"
                                    label="First Name"
                                    value={firstName}
                                    onChange={(e) =>
                                        setFirstName(e.target.value)
                                    }
                                />

                                <MUIInput
                                    type="text"
                                    label="Last Name"
                                    value={lastName}
                                    onChange={(e) =>
                                        setLastName(e.target.value)
                                    }
                                /> */}

                                <MUIInput
                                    type="text"
                                    label="Email/Mobile Number"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <MUIInput
                                    type="password"
                                    label="Password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                                <MUIButton
                                    title={"LOGIN"}
                                    bgColor="#fb641b"
                                    textColor="#ffffff"
                                    style={{
                                        margin: "40px 0 20px 0",
                                    }}
                                    onClick={userLogin}
                                />
                                <p
                                    style={{
                                        textAlign: "center",
                                        fontWeight: "bold",
                                    }}
                                >
                                    OR
                                </p>
                                <MUIButton
                                    title="Request OTP"
                                    bgColor="#ffffff"
                                    textColor="#2874f0"
                                    style={{
                                        margin: "20px 0",
                                        border: "1px solid #fb641b",
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
            <div className="subHeader">
                <div className="logo">
                    <a href="">
                        <img src={flipkartLogo} className="logoimage" alt="" />
                    </a>
                </div>
                <div>
                    <div className="searchInputContainer">
                        <input
                            className="searchInput"
                            placeholder={"Search for products, brands and more"}
                        />
                        <div className="searchIconContainer">
                            <IoIosSearch
                                style={{
                                    color: "#2874f0",
                                    fontSize: "23px",
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="rightMenu">
                    <DropdownMenu
                        menu={
                            <a
                                className="loginButton"
                                onClick={() => setLoginModal(true)}
                            >
                                Login
                            </a>
                        }
                        menus={[
                            { label: "My Profile", href: "", icon: null },
                            {
                                label: "Flipkart Plus Zone",
                                href: "",
                                icon: null,
                            },
                            { label: "Orders", href: "", icon: null },
                            { label: "Wishlist", href: "", icon: null },
                            { label: "Rewards", href: "", icon: null },
                            { label: "Gift Cards", href: "", icon: null },
                        ]}
                        firstMenu={
                            <div className="firstmenu">
                                <span>New Customer?</span>
                                <a style={{ color: "#2874f0" }} href="">
                                    Sign Up
                                </a>
                            </div>
                        }
                    />
                    <DropdownMenu
                        menu={
                            <a className="more">
                                <span>More</span>
                                <IoIosArrowDown />
                            </a>
                        }
                        menus={[
                            {
                                label: "Notification Preference",
                                href: "",
                                icon: null,
                            },
                            { label: "Sell on flipkart", href: "", icon: null },
                            {
                                label: "24x7 Customer Care",
                                href: "",
                                icon: null,
                            },
                            { label: "Advertise", href: "", icon: null },
                            { label: "Download App", href: "", icon: null },
                        ]}
                    />
                    <div>
                        <a href="" className="cart">
                            <IoIosCart />
                            <span style={{ margin: "0 10px" }}>Cart</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
