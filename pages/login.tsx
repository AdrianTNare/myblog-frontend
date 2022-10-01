import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { LoginCard } from "../components/LoginCard";
import { LoginNavbar } from "../components/LoginNavbar";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className="bg-base-300">
      <Head>
        <title>Login</title>
      </Head>
      <div className="px-4  mx-auto max-w-3xl overflow-auto">
       <LoginNavbar/> 
        <div className="w-full mb-20">
         <LoginCard/> 
        </div>
        <footer className="footer footer-center p-4 mt-5 bg-base-300 text-base-content">
          <div>
            <p>Copyright © 2022 - All right reserved by Adrian</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
