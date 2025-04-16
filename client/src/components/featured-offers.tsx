import { Package } from "@shared/schema";
import { Button } from "@/components/ui/button";

interface FeaturedOffersProps {
  offers: Package[];
}

export function FeaturedOffers({ offers }: FeaturedOffersProps) {
  // If no offers data is available, use placeholder data
  const displayOffers = offers.length > 0 ? offers : [
    {
      id: 1,
      title: "Cairo & Luxor Package",
      description: "Explore the pyramids and ancient temples on this exclusive tour package.",
      country: "Egypt",
      days: 8,
      nights: 7,
      price: 1200,
      discountedPrice: 960,
      discountPercentage: 20,
      imageUrl: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      rating: 4.5,
      reviewCount: 128,
      isPopular: false,
      isFeatured: true,
      includedServices: [],
      type: "BESTSELLER",
      locations: ["Cairo", "Luxor"]
    },
    {
      id: 2,
      title: "Dubai City Tour",
      description: "Experience the luxury and glamour of Dubai with this exclusive city tour.",
      country: "UAE",
      days: 5,
      nights: 4,
      price: 1500,
      discountedPrice: 1275,
      discountPercentage: 15,
      imageUrl: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      rating: 5.0,
      reviewCount: 205,
      isPopular: false,
      isFeatured: true,
      includedServices: [],
      type: "",
      locations: ["Dubai City", "Palm Jumeirah"]
    },
    {
      id: 3,
      title: "Petra Adventure",
      description: "Discover the ancient city of Petra and experience Jordanian hospitality.",
      country: "Jordan",
      days: 4,
      nights: 3,
      price: 850,
      discountedPrice: null,
      discountPercentage: null,
      imageUrl: "https://images.unsplash.com/photo-1579033385971-a7bc2c6f8c46?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      rating: 4.0,
      reviewCount: 89,
      isPopular: false,
      isFeatured: true,
      includedServices: [],
      type: "NEW",
      locations: ["Petra"]
    },
    {
      id: 4,
      title: "Red Sea Resort",
      description: "Relax and enjoy the beautiful beaches of the Red Sea in this all-inclusive resort.",
      country: "Egypt",
      days: 8,
      nights: 7,
      price: 1100,
      discountedPrice: null,
      discountPercentage: null,
      imageUrl: "https://images.unsplash.com/photo-1570213489059-0aac6626d401?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      rating: 4.5,
      reviewCount: 176,
      isPopular: false,
      isFeatured: true,
      includedServices: [],
      type: "POPULAR",
      locations: ["Red Sea"]
    }
  ];

  return (
    <section className="bg-white py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Featured Offers</h2>
          <a href="#" className="text-primary font-medium hover:underline flex items-center">
            View all <i className="fas fa-arrow-right ml-2"></i>
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayOffers.map((offer) => (
            <div key={offer.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
              <div className="relative">
                {(offer.discountPercentage || offer.type) && (
                  <span className={`absolute top-2 right-2 ${
                    offer.discountPercentage ? 'bg-red-500' : 
                    offer.type === 'NEW' ? 'bg-green-500' : 
                    offer.type === 'POPULAR' ? 'bg-blue-500' : 
                    'bg-yellow-500'
                  } text-white text-xs font-bold px-2 py-1 rounded-full`}>
                    {offer.discountPercentage ? `${offer.discountPercentage}% OFF` : offer.type}
                  </span>
                )}
                <img 
                  src={offer.imageUrl} 
                  alt={offer.title} 
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center text-sm text-gray-500 mb-1">
                  <i className="fas fa-map-marker-alt text-primary mr-1"></i> {offer.country}
                  <span className="mx-2">•</span>
                  <span>{offer.nights} nights</span>
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{offer.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{offer.description}</p>
                <div className="flex items-center mb-3">
                  <div className="flex text-yellow-400">
                    {[...Array(Math.floor(offer.rating))].map((_, i) => (
                      <i key={i} className="fas fa-star"></i>
                    ))}
                    {offer.rating % 1 !== 0 && (
                      <i className="fas fa-star-half-alt"></i>
                    )}
                    {[...Array(5 - Math.ceil(offer.rating))].map((_, i) => (
                      <i key={i} className="far fa-star"></i>
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 ml-1">({offer.reviewCount} reviews)</span>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    {offer.discountedPrice ? (
                      <>
                        <span className="text-gray-400 line-through text-sm">${offer.price}</span>
                        <span className="text-primary font-bold ml-1">${offer.discountedPrice}</span>
                      </>
                    ) : (
                      <span className="text-primary font-bold">${offer.price}</span>
                    )}
                  </div>
                  <Button variant="ghost" className="text-primary hover:text-blue-700 font-medium">
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
