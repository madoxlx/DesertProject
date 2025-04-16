import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function AboutUs() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary/80 to-primary text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">About Us</h1>
            <p className="text-xl max-w-2xl">
              Discover the story behind our passion for bringing the wonders of the Middle East to travelers around the world.
            </p>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <p className="mb-4">
                  Founded in 2010, our travel agency began with a simple mission: to showcase the authentic beauty, rich history, and vibrant cultures of the Middle East to the world. What started as a small team of passionate travel enthusiasts has grown into a leading agency specializing in curated experiences throughout the region.
                </p>
                <p className="mb-4">
                  We believe travel should be transformative, educational, and deeply respectful of local communities and environments. Our team has personally explored every destination we offer, building relationships with local guides, accommodations, and experiences that provide authentic insights into the heart of Middle Eastern cultures.
                </p>
                <p>
                  Today, we proudly serve thousands of travelers each year, helping them create memories that last a lifetime while promoting cultural understanding and sustainable tourism practices.
                </p>
              </div>
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1622145961018-74e42f6af6ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                  alt="Our team exploring historical sites"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Authenticity</h3>
                <p className="text-gray-600">
                  We believe in showcasing the real Middle East, beyond stereotypes and tourist clichés. Our experiences are designed to connect travelers with the true essence of each destination.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Sustainability</h3>
                <p className="text-gray-600">
                  We are committed to responsible tourism that preserves cultural heritage and natural environments. We partner with local businesses that share our commitment to sustainable practices.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Respect</h3>
                <p className="text-gray-600">
                  We honor the diverse cultures, traditions, and communities we work with. Our guides and partners are trained to facilitate meaningful cross-cultural exchanges.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Meet Our Leadership Team</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="mb-4 relative mx-auto w-40 h-40 overflow-hidden rounded-full">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80"
                    alt="CEO"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold">Ahmed Al-Farsi</h3>
                <p className="text-primary font-medium">Founder & CEO</p>
                <p className="mt-2 text-gray-600">
                  With over 20 years in the travel industry and a deep passion for Middle Eastern heritage.
                </p>
              </div>

              <div className="text-center">
                <div className="mb-4 relative mx-auto w-40 h-40 overflow-hidden rounded-full">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80"
                    alt="Operations Director"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold">Layla Hakim</h3>
                <p className="text-primary font-medium">Operations Director</p>
                <p className="mt-2 text-gray-600">
                  An expert in logistics and customer experience with a background in hospitality management.
                </p>
              </div>

              <div className="text-center">
                <div className="mb-4 relative mx-auto w-40 h-40 overflow-hidden rounded-full">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80"
                    alt="Head of Experience"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold">Omar Nasser</h3>
                <p className="text-primary font-medium">Head of Experience</p>
                <p className="mt-2 text-gray-600">
                  A cultural historian and experienced guide who designs our unique travel experiences.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Explore the Middle East?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Start your journey with us today and discover the magic of this incredible region.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/contact-us"
                className="px-6 py-3 bg-white text-primary font-medium rounded-md hover:bg-gray-100 transition"
              >
                Contact Us
              </a>
              <a
                href="/"
                className="px-6 py-3 bg-primary-dark text-white font-medium rounded-md border border-white hover:bg-primary-light transition"
              >
                Browse Packages
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}