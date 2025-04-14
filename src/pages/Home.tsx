import { useNavigate } from "react-router-dom";


const Home = () => {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen max-w-screen">
      <div className="sticky top-0 z-30 flex h-16 w-full justify-center bg-neutral-content backdrop-blur transition-shadow duration-100 print:hidden shadow-sm">
        <nav className="navbar w-full"></nav>
      </div>
      <div
        className="hero min-h-screen -mt-16"
        style={{
          backgroundImage:
            "url(https://archicgi.com/wp-content/uploads/2023/08/best-angles-for-real-estate-rendering-shots.jpg)",
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content text-neutral-content">
          <div className="max-w-lg">
            <h1 className="mb-5 text-5xl font-bold">
              Find, Visit, and Secure Your Dream Home — Hassle-Free
            </h1>
            <p className="mb-5">
              All-in-one platform for Filipinos to book property viewings, rent
              or buy homes, and avoid no-shows and late payments.
            </p>
            <button className="btn btn-primary" onClick={() => navigate("/signup")}>Get Started</button>
          </div>
        </div>
      </div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
        <section className="py-16 px-6 md:px-20">
        <h2 className="text-3xl font-bold text-center mb-10">Why Choose [Your App Name]</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            { icon: "🏘", title: "Book Property Viewings", desc: "Schedule visits with reminders and refundable deposits." },
            { icon: "💼", title: "Buy or Rent Homes Easily", desc: "Browse verified listings for sale or rent." },
            { icon: "💸", title: "Smart Payment Tracking", desc: "Stay updated with due dates and status." },
            { icon: "⭐", title: "Verified Renter Scores", desc: "Avoid no-shows and filter reliable users." },
            { icon: "📱", title: "GCash Integration", desc: "Make secure deposits and get SMS reminders." },
            { icon: "🔒", title: "Safe & Transparent", desc: "Data protection and platform accountability." }
          ].map(({ icon, title, desc }) => (
            <div key={title} className="bg-gray-100 rounded-2xl p-6 shadow hover:shadow-lg">
              <div className="text-4xl mb-4">{icon}</div>
              <h3 className="text-xl font-bold mb-2">{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </section>
        </div>
      </div>
    </div>
  );
};

export default Home;
