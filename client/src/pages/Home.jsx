import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CallToAction, PostCard } from "../components/index";
const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  React.useEffect(() => {
    setLoading(true);
    try {
      const fetchPosts = async () => {
        const res = await fetch(`/api/post/getposts`);
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
          setLoading(false);
        }
      };
      fetchPosts();
    } catch (error) {
      setError(null);
    }
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-6 p-28  text-6xl px-3 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold lg:text-2xl mx-auto">
          Welcome to Asoh Yannick's Blog, the digital sanctuary where Software
          Developers, Software Engineers, Full-Stack developers, Backend Web
          Developers, Mobile Developers, DevOps Engineers, and IT Professionals
          converge to delve into the dynamic realm of technology, innovation,
          and problem-solving.
        </h1>
        <h2 className="text-gray-500 text-sm sm:text-sm">
          Welcome to our blog, an immersive digital realm where technology
          enthusiasts, software developers, engineers, and IT professionals
          converge to unlock the boundless possibilities of the digital
          landscape. Prepare to be captivated by a symphony of insightful
          articles, cutting-edge innovations, and practical guides that will
          empower you to thrive in the ever-evolving world of technology
        </h2>
        <h3 className="text-gray-500 text-sm sm:text-sm">
          Our team of passionate writers, researchers, and creatives have poured
          their hearts and souls into crafting compelling narratives and
          informative articles. We strive to bring you the most engaging and
          relevant pieces, ensuring that every visit to our blog is a rewarding
          and worthwhile experience.
        </h3>
        <h3 className="text-gray-500 text-sm sm:text-sm">
          But this blog is not just about us. It's about you, our valued
          readers. We believe that knowledge should be shared, ideas should be
          discussed, and communities should be built. That's why we encourage
          you to actively participate in the conversation. Leave your thoughts,
          insights, and feedback in the comments section, and let's create a
          vibrant community of like-minded individuals who share a thirst for
          knowledge and a passion for growth.
        </h3>
        <h3 className="text-gray-500 text-sm sm:text-sm">
          Whether you are an avid reader, a passionate learner, or simply
          someone seeking a little respite from the chaos of everyday life, we
          hope that our blog becomes a sanctuary for you—a place where you can
          find solace, inspiration, and a renewed sense of curiosity.
        </h3>
        <h3 className="text-gray-500 text-sm sm:text-sm">
          Thank you for choosing to be a part of our community. We are excited
          to go on this journey with you and look forward to sharing many
          enriching experiences together.
        </h3>
        <h3 className="text-gray-500 text-sm sm:text-sm">Happy reading!</h3>
        <h3 className="text-gray-500 text-sm sm:text-sm">Warm regards,</h3>
        <h3 className="text-gray-500 text-sm sm:text-sm">Asoh Yannick</h3>
        <Link
          to="/search"
          className="text-xs sm:text-sm text-teal-500 font-bold hover:underline"
        >
          view all post
        </Link>
      </div>
      <div className="p-3 bg-amber-100 dark:bg-slate-700">
        <CallToAction />
      </div>
      <div className="mx-auto p-3 flex-row gap-8 py-7">
        {posts && posts.length > 0 && (
          <div className="flex flex-row flex-wrap gap-6">
            <h2 className="text-center recent_post mx-auto font-semibold text-2xl">
              Recent Posts
            </h2>
            <div className="flex justify-center flex-wrap gap-4">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={"/search"}
              className="text-lg text-teal-500 hover:underline text-center"
            >
              View all posts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
