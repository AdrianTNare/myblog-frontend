import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { appConfig } from "../app/config";
import { Post } from "../app/types/types";
import { HomeNavbar } from "../components/HomeNavbar";
import { HomePost } from "../components/HomePost";

const Home: NextPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const [postsPage, setPostsPage] = useState(1);

  const [hasNextPage, setHasNextPage] = useState(false);

  const [hasPrevPage, setHasPrevPage] = useState(false);

  const [pageNumberLoading, setPageNumberLoading] = useState(false);

  const getPosts = async (page: number = 1) => {
    setPageNumberLoading(true);

    try {
      const response = await fetch(
        `${appConfig.backendDomain}/posts/all?page=${page}`
      );
      const { posts, hasNext, hasPrevious } = await response.json();
      console.log("data:", posts.content);

      setPostsPage(page);
      setPosts(posts.content);
      setHasNextPage(hasNext);
      setHasPrevPage(hasPrevious);
    } catch (e: any) {
      console.log(e.message);
    }

    setPageNumberLoading(false);
  };

  const getNextPage = () => {
    const nextPage = postsPage + 1;
    getPosts(nextPage);
  };

  const getPrevPage = () => {
    const prevPage = postsPage - 1;
    getPosts(prevPage);
  };

  useEffect(() => {
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
        <div className="text-center">
          <div className="btn-group mx-auto mt-10 w-fit">
            <button
              onClick={getPrevPage}
              className="btn btn-sm"
              disabled={!hasPrevPage}
            >
              «
            </button>
            <button
              className={`btn btn-sm   ${pageNumberLoading && "loading"}`}
            >
              Page {postsPage}
            </button>
            <button
              onClick={getNextPage}
              className="btn btn-sm"
              disabled={!hasNextPage}
            >
              »
            </button>
          </div>
        </div>
        <footer className="footer footer-center p-4 mt-2 bg-base-300 text-base-content">
          <div>
            <p>© {new Date().getFullYear()} - Made by Adrian</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
