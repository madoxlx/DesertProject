import { Package } from "@shared/schema";
import { Button } from "@/components/ui/button";

interface PopularPackagesProps {
  packages: Package[];
}

export function PopularPackages({ packages }: PopularPackagesProps) {
  // If no packages data is available, use placeholder data
  const displayPackages = packages.length > 0 ? packages : [
    {
      id: 1,
      title: "Egypt Explorer",
      description: "Experience authentic culture, breathtaking landscapes, and unforgettable adventures.",
      country: "Egypt",
      days: 8,
      nights: 7,
      price: 1299,
      discountedPrice: null,
      discountPercentage: null,
      imageUrl: "https://images.unsplash.com/photo-1581008685504-7a71a2857ce3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      rating: 4.7,
      reviewCount: 238,
      isPopular: true,
      isFeatured: false,
      includedServices: ["Visit the Great Pyramids & Sphinx", "Nile cruise with full board", "All transfers & guided tours included"],
      type: "BESTSELLER",
      locations: ["Cairo", "Luxor", "Aswan"]
    },
    {
      id: 2,
      title: "Dubai Luxury",
      description: "Experience the luxury and glamour of Dubai with this exclusive city tour.",
      country: "UAE",
      days: 6,
      nights: 5,
      price: 1899,
      discountedPrice: null,
      discountPercentage: null,
      imageUrl: "https://images.unsplash.com/photo-1566066507034-8fd771957390?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      rating: 4.9,
      reviewCount: 182,
      isPopular: true,
      isFeatured: false,
      includedServices: ["Private city tour with Burj Khalifa access", "Desert safari with dinner show", "Yacht tour around Palm Jumeirah"],
      type: "LUXURY",
      locations: ["Dubai City", "Palm Jumeirah"]
    },
    {
      id: 3,
      title: "Jordan Discovery",
      description: "Discover the ancient city of Petra and experience Jordanian hospitality.",
      country: "Jordan",
      days: 7,
      nights: 6,
      price: 1499,
      discountedPrice: null,
      discountPercentage: null,
      imageUrl: "https://images.unsplash.com/photo-1607607294965-6d43c473ecaa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      rating: 4.6,
      reviewCount: 156,
      isPopular: true,
      isFeatured: false,
      includedServices: ["Guided tour of Petra with local expert", "Overnight in Bedouin camp at Wadi Rum", "Float in the Dead Sea"],
      type: "ECO-FRIENDLY",
      locations: ["Amman", "Petra", "Wadi Rum", "Dead Sea"]
    }
  ];

  return (
    <section className="bg-white py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Popular Packages</h2>
          <a href="#" className="text-primary font-medium hover:underline flex items-center">
            View all packages <i className="fas fa-arrow-right ml-2"></i>
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayPackages.map((pkg) => (
            <div key={pkg.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition group">
              <div className="relative h-64">
                <img 
                  src={pkg.imageUrl} 
                  alt={pkg.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {pkg.type && (
                  <div className="absolute top-0 right-0 m-4">
                    <span className={`
                      ${pkg.type === 'BESTSELLER' ? 'bg-yellow-400 text-gray-800' : 
                        pkg.type === 'LUXURY' ? 'bg-blue-500 text-white' : 
                        pkg.type === 'ECO-FRIENDLY' ? 'bg-green-500 text-white' : 
                        'bg-primary text-white'} 
                      font-bold text-xs px-2 py-1 rounded-full
                    `}>
                      {pkg.type}
                    </span>
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 via-black/40 to-transparent">
                  <div className="flex justify-between items-end">
                    <h3 className="font-bold text-white text-xl">{pkg.title}</h3>
                    <div className="text-white">
                      <span className="font-bold text-lg">${pkg.price}</span>
                      <span className="text-sm">/person</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(Math.floor(pkg.rating))].map((_, i) => (
                      <i key={i} className="fas fa-star"></i>
                    ))}
                    {pkg.rating % 1 !== 0 && (
                      <i className="fas fa-star-half-alt"></i>
                    )}
                    {[...Array(5 - Math.ceil(pkg.rating))].map((_, i) => (
                      <i key={i} className="far fa-star"></i>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 ml-1">({pkg.rating}/5 from {pkg.reviewCount} reviews)</span>
                </div>
                <div className="mb-4">
                  <div className="flex items-center text-gray-600 mb-2">
                    <i className="fas fa-calendar-alt text-primary mr-2"></i>
                    <span>{pkg.days} days / {pkg.nights} nights</span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-2">
                    <i className="fas fa-map-marker-alt text-primary mr-2"></i>
                    <span>{pkg.locations.join(", ")}</span>
                  </div>
                  {pkg.locations.includes("Cairo") && (
                    <div className="flex items-center text-gray-600">
                      <i className="fas fa-user-check text-primary mr-2"></i>
                      <span>Guided tour with expert Egyptologist</span>
                    </div>
                  )}
                </div>
                <ul className="mb-4 text-sm text-gray-600">
                  {pkg.includedServices.map((service, index) => (
                    <li key={index} className="flex items-start mb-1">
                      <i className="fas fa-check text-green-500 mt-1 mr-2"></i>
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full py-6 bg-primary hover:bg-blue-700 text-white rounded-lg font-medium">
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
