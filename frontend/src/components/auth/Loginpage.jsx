import React from "react";
import { SideImage } from "./SideImage";
import { useForm } from "react-hook-form";
import { InputField } from "./InputField";
import { AuthFooter } from "./AuthFooter";
import { Link, useNavigate } from "react-router-dom";
import backendUrl from "../../utils/backendUrl";
import axios from "axios";
import toast from "react-hot-toast";

export const Loginpage = () => {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm();
  const loginUser = async (data) => {
    try {
      const response = await axios.post(`${backendUrl}/api/auth/login`, data, {
        withCredentials: true,
      });
      console.log("Response Api : ", response.data);
      localStorage.setItem("userInfo", JSON.stringify(response.data));
      toast.success(response.data.message);
      window.location.href = "/";
      console.log("User registered successfully:", response.data);
    } catch (error) {
      toast.error(error.response.data.error);
      console.log("api error : ", error.response.data.error);
      console.log("Error registering user axios:", error);
    }
  };

  return (
    <>
      <div className="min-w-screen min-h-screen bg-white flex items-center justify-center px-5 py-5">
        <div
          className="bg-gray-100 text-gray-500 rounded-3xl shadow-2xl w-full overflow-hidden"
          style={{ maxWidth: 1000 }}
        >
          <div className="md:flex w-full">
            <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
              <div className="text-center mb-10">
                <h1 className="font-bold text-3xl text-gray-900">LOGIN</h1>
              </div>
              <form
                noValidate
                onSubmit={handleSubmit((data) => {
                  reset();
                  loginUser(data);
                  // console.log(data);
                })}
              >
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-5">
                    <InputField
                      id="email"
                      labelName="Email Address"
                      iconName="email"
                      inputType="email"
                      placeholder="abc@example.com"
                      formHook={{
                        ...register("email", {
                          required: "Email is Required",
                          pattern: {
                            value: /\b\w+@[\w.-]+\.\w{2,4}\b/gi,
                            message: "Email not valid",
                          },
                        }),
                      }}
                      inputProps={{
                        required: true,
                      }}
                    />
                    {errors.email && (
                      <p className="text-red-500">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-12">
                    <InputField
                      id="password"
                      labelName="Password"
                      iconName="lock"
                      inputType="password"
                      placeholder="*************"
                      formHook={{
                        ...register("password", {
                          required: "password is required",
                        }),
                      }}
                      inputProps={{
                        required: true,
                      }}
                    />
                    {errors.password && (
                      <p className="text-red-500">{errors.password.message}</p>
                    )}
                  </div>
                </div>

                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-7">
                    <button className="block w-full  mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold">
                      LOGIN
                    </button>
                  </div>
                </div>
              </form>
              <div className="text-center">
                <h1 className="font-semibold">
                  Don't Have an account?{" "}
                  <Link to={"/auth/register"}>
                    <span className="underline cursor-pointer">Register</span>
                  </Link>
                </h1>
              </div>
              <div className="text-center underline mt-2">
                <a href="www.google.com"> Forgot password ? </a>
              </div>
            </div>
            <SideImage />
          </div>
        </div>
      </div>
      <AuthFooter />
    </>
  );
};
