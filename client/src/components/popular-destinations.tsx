import { Destination } from "@shared/schema";

interface PopularDestinationsProps {
  destinations: Destination[];
}

export function PopularDestinations({ destinations }: PopularDestinationsProps) {
  // If no destinations data is available, use placeholder data
  const displayDestinations = destinations.length > 0 ? destinations : [
    {
      id: 1,
      name: "Cairo",
      country: "Egypt",
      city: "Cairo",
      description: "Explore the ancient pyramids and rich history",
      imageUrl: "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      isPopular: true
    },
    {
      id: 2,
      name: "Dubai",
      country: "UAE",
      city: "Dubai",
      description: "Experience luxury and modern architecture",
      imageUrl: "https://images.unsplash.com/photo-1518684079-3c830dcef090?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      isPopular: true
    },
    {
      id: 3,
      name: "Petra",
      country: "Jordan",
      city: "Petra",
      description: "Discover the ancient city carved in stone",
      imageUrl: "https://images.unsplash.com/photo-1579033385971-a7bc2c6f8c46?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      isPopular: true
    },
    {
      id: 4,
      name: "Dead Sea",
      country: "Jordan",
      city: "Dead Sea",
      description: "Float in the world-famous salt-rich waters",
      imageUrl: "https://images.unsplash.com/photo-1605833556294-ea5c7a74f57d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      isPopular: true
    },
    {
      id: 5,
      name: "Luxor",
      country: "Egypt",
      city: "Luxor",
      description: "Visit the Valley of Kings and ancient temples",
      imageUrl: "https://images.unsplash.com/photo-1560611588-163f49705216?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      isPopular: true
    },
    {
      id: 6,
      name: "Riyadh",
      country: "Saudi Arabia",
      city: "Riyadh",
      description: "Discover the modern capital and rich culture",
      imageUrl: "https://images.unsplash.com/photo-1590155387686-a4a9c49588bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      isPopular: true
    }
  ];

  return (
    <section className="bg-neutral-100 py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Popular Destinations</h2>
          <a href="#" className="text-primary font-medium hover:underline flex items-center">
            Explore all destinations <i className="fas fa-arrow-right ml-2"></i>
          </a>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {displayDestinations.map((destination) => (
            <div key={destination.id} className="relative rounded-xl overflow-hidden group cursor-pointer">
              <img 
                src={destination.imageUrl} 
                alt={destination.name} 
                className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end p-3">
                <div>
                  <h3 className="text-white font-bold">{destination.name}</h3>
                  <p className="text-white opacity-90 text-sm">{destination.country}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
