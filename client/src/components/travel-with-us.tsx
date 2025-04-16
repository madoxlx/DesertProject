import { Button } from "./ui/button";

export function TravelWithUs() {
  return (
    <section className="w-full py-16 bg-gray-50">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-12">
        {/* Image container with badges */}
        <div className="w-full lg:w-1/2 relative">
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" 
              alt="Traveler on mountain cliff overlooking ocean" 
              className="w-full h-auto object-cover"
            />
          </div>
          
          {/* Badges */}
          <div className="absolute top-6 left-6 bg-white py-2 px-4 rounded-lg shadow-md text-center">
            <span className="text-2xl font-bold text-primary">5000+</span>
            <p className="text-sm text-gray-500">Tourists</p>
          </div>
          
          <div className="absolute top-6 right-6 bg-white py-2 px-4 rounded-lg shadow-md text-center">
            <span className="text-2xl font-bold text-primary">300+</span>
            <p className="text-sm text-gray-500">Destinations</p>
          </div>
          
          <div className="absolute bottom-6 right-6 bg-white py-2 px-4 rounded-lg shadow-md text-center">
            <span className="text-2xl font-bold text-primary">150+</span>
            <p className="text-sm text-gray-500">Hotels</p>
          </div>
        </div>
        
        {/* Text content */}
        <div className="w-full lg:w-1/2 space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Travel Any Corner of The World With Us
          </h2>
          
          <div className="space-y-4 text-gray-600">
            <p>
              Would you explore nature paradise in the world? Let's find the best destination in the world with us.
            </p>
            <p>
              We offer personalized itineraries, expert guides, and unforgettable experiences to make your travel dreams come true.
            </p>
          </div>
          
          <Button size="lg" className="mt-4">
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
}