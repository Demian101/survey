import React, {useRef, useState} from 'react';
import {useLoginMutation, useRegisterMutation} from "../store/api/authApi";
import {useDispatch} from "react-redux";
import {login} from "../store/reducer/authSlice";
import {useLocation, useNavigate} from "react-router-dom";

const AuthForm = () => {
    const [isLoginForm, setIsLoginForm] = useState(true);

    // 引入注册的api
    const [regFn, {error: regError}] = useRegisterMutation();
    const [loginFn, {error: loginError}] = useLoginMutation();

    const usernameInp = useRef();
    const pwdInp = useRef();
    const emailInp = useRef();

    // 获取dispatch
    const dispatch = useDispatch();

    // 获取Navigate
    const navigate = useNavigate();
    const location = useLocation();

    // console.log("authForm-->", location.state.preLocation);

    const from = location.state?.preLocation?.pathname || "/";

    const submitHandler = (e) => {
        e.preventDefault();

        // 获取用户输入的内容
        const username = usernameInp.current.value;
        const password = pwdInp.current.value;
        // 处理登录功能
        if(isLoginForm){
            console.log('登录 -->', username, password);
            loginFn({
                identifier:username,
                password
            }).then(res => {
                if(!res.error){
                  console.log('res.data.token', res.data.token)
                    dispatch(login(
                        {
                            token:res.data.token,
                            user:res.data.user
                        }
                    ));
                    // 登录成功后，需要向系统中添加一个标识，标记用户的登录状态
                    // 登录状态（布尔值，token(jwt)，用户信息）
                    // 跳转页面到之前的目录
                    navigate(from, {replace:true});
                }
            });
        }else{
            const email = emailInp.current.value;
            //console.log('注册 -->', username, password, email);
            regFn({
                username,
                password,
                email
            }).then(res => {
                if(!res.error){
                    // 注册成功
                    setIsLoginForm(true);
                }
            });
        }
    };

    return (
        // <div>
        //     <p style={{color:'red'}}>
        //         {regError && "用户名或电子邮件重复"}
        //     </p>
        //     <p style={{color:'red'}}>
        //         {loginError && "用户名或密码错误"}
        //     </p>


        //     <h2>{isLoginForm?"登录":"注册"}</h2>
        //     <form onSubmit={submitHandler}>
        //         <div>
        //             <input ref={usernameInp} type="text" placeholder={"用户名"}/>
        //         </div>
        //         {
        //             !isLoginForm &&
        //             <div>
        //                 <input ref={emailInp} type="email" placeholder={"电子邮件"}/>
        //             </div>
        //         }
        //         <div>
        //             <input ref={pwdInp} type="password" placeholder={"密码"}/>
        //         </div>
        //         <div>
        //             <button>{isLoginForm?"登录":"注册"}</button>
        //             <a href="#" onClick={
        //                 event => {
        //                     event.preventDefault();
        //                     setIsLoginForm(prevState => !prevState);
        //                 }
        //             }>
        //                 {
        //                     isLoginForm?
        //                     "没有账号？点击注册":
        //                     "已有账号？点击登录"}
        //             </a>
        //         </div>
        //     </form>
        // </div>
    <div className="antialiased bg-gradient-to-br bg-blue-jingtian to-white">
    <div className="container px-6 mx-auto">
      <div
        className="flex flex-col text-center md:text-left md:flex-row h-screen justify-evenly md:items-center"
      >
        <div className="md:w-2/3 lg:w-2/5 mx-auto md:mx-0">
          <div className="bg-white p-10 flex flex-col w-full shadow-xl rounded-xl">
            <h2 className="text-2xl font-bold text-gray-800 text-left mb-5">
              登录问卷后台
            </h2>
            <form onSubmit={submitHandler} className="w-full">
              <div id="input" className="flex flex-col w-full my-5">
                <label htmlFor="username" className="text-gray-500 mb-2"
                  >Username</label
                >
                <input
                  type="text"
                  id="username"
                  placeholder="Please insert your username"
                  ref={usernameInp}
                  className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
                />
              </div>
              <div id="input" className="flex flex-col w-full my-5">
                <label htmlFor="password" className="text-gray-500 mb-2"
                  >Password</label
                >
                <input
                  type="password"
                  id="password"
                  ref={pwdInp}
                  placeholder="Please insert your password"
                  className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
                />
              </div>
              <div id="button" className="flex flex-col w-full my-5">
                <button
                  type="submit"
                  className="w-full py-4 bg-blue-qiubo rounded-lg text-gray-600"
                >
                  <div className="flex flex-row items-center justify-center">
                    <div className="mr-2">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                        ></path>
                      </svg>
                    </div>
                    <a className="font-bold">Log in</a>
                  </div>
                </button>
                <div className="flex justify-evenly mt-5">
                  <a
                    href="#"
                    className="w-full text-center font-medium text-gray-500"
                    >Recover password!</a
                  >
                  <a
                    href="#"
                    className="w-full text-center font-medium text-gray-500"
                    >Sign up!</a
                  >
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
        );
};

export default AuthForm;
