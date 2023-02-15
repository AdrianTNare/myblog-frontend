import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { appConfig } from "../app/config";
import { Post } from "../app/types/types";
import { HomeNavbar } from "../components/HomeNavbar";
import { HomePost } from "../components/HomePost";

const Home: NextPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await fetch(`${appConfig.backendDomain}/posts/all`);
        const data = await response.json();
        console.log("data:", data.posts.content);
        setPosts(data.posts.content);
      } catch (e: any) {
        console.log(e.message);
      }
    };
    getPosts();
  }, []);

  return (
    <div className="bg-base-300">
      <Head>
        <title>Blog Home</title>
      </Head>
      <div className="px-4 pt-5 mx-auto max-w-3xl overflow-y-visible">
        <HomeNavbar />
      </div>
      <div className="px-4 mx-auto max-w-3xl overflow-auto">
        <div className="w-full min-h-screen">
          <div className="divider mb-8">Latest Posts</div>
          {posts.map((post) => (
            <HomePost key={post.id} post={post} />
          ))}
        </div>
        <div className="btn-group mx-auto  mt-10 w-fit">
          <button className="btn btn-sm">«</button>
          <button className="btn btn-sm">Page 22</button>
          <button className="btn btn-sm">»</button>
        </div>
        <footer className="footer footer-center p-4 mt-2 bg-base-300 text-base-content">
          <div>
            <p>Copyright © 2022 - All right reserved by Adrian</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
