import React from "react";
import { useNavigate } from "react-router-dom";

const blogs = [
  {
    title: "How to build a meaningful connection?",
    img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
    desc: "From first messages to real conversations — learn the art of bonding authentically.",
  },
  {
    title: "Top 10 dating safety tips",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
    desc: "Stay safe while you explore new connections online and offline.",
  },
  {
    title: "How Fynder matches you smarter?",
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
    desc: "Discover how our AI understands personality, interests and vibes to match better.",
  },
];

const Blog = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-20 min-h-screen bg-base-100 text-base-content flex flex-col">

      {/* Header */}
      <div className="flex items-center gap-4 px-4 py-4 border-b border-base-300 sticky top-0 bg-base-100 z-50">
        <button
          onClick={() => navigate("/landingpage")}
          className="btn btn-sm btn-ghost rounded-full"
        >
          ← Back
        </button>
        <span className="font-bold text-xl">Fynder Blog</span>
      </div>

      {/* Intro */}
      <section className="text-center px-6 md:px-28 pt-12">
        <h1 className="text-4xl md:text-5xl font-extrabold">Insights & Tips 💡</h1>
        <p className="text-lg opacity-70 max-w-2xl mx-auto mt-3">
          Stories that help you date smarter, stay safer, and grow stronger.
        </p>
      </section>

      {/* Blog Cards */}
      <section className="px-6 md:px-28 py-14 grid grid-cols-1 md:grid-cols-3 gap-8">
        {blogs.map((blog, i) => (
          <div
            key={i}
            className="rounded-2xl bg-base-200 shadow-md hover:shadow-xl transition-all"
          >
            <figure>
              <img src={blog.img} alt="blog" className="rounded-t-2xl w-full h-48 object-cover" />
            </figure>
            <div className="p-5">
              <h3 className="font-bold text-lg">{blog.title}</h3>
              <p className="text-sm opacity-75 mt-2">{blog.desc}</p>
              <button
                className="btn btn-primary btn-sm mt-4"
                onClick={() => alert(`Read more: ${blog.title}`)}
              >
                Read More →
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <div className="text-center pb-20">
        <p className="opacity-70">Want to share your story with the world?</p>
        <button
          className="btn btn-outline mt-3"
          onClick={() => alert("Coming soon!")}
        >
          Write a Blog →
        </button>
      </div>

    </div>
  );
};

export default Blog;
