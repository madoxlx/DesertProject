import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-gray-800 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center mb-4">
              <i className="fas fa-globe text-primary text-2xl mr-2"></i>
              <span className="text-xl font-bold">TravelEast</span>
            </div>
            <p className="mb-4 text-gray-300">
              Your gateway to extraordinary Middle Eastern experiences. Discover the wonders of the ancient and modern Middle East with us.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-primary transition">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-300 hover:text-primary transition">Flight Booking</Link></li>
              <li><Link href="#" className="text-gray-300 hover:text-primary transition">Hotel Reservation</Link></li>
              <li><Link href="#" className="text-gray-300 hover:text-primary transition">Visa Assistance</Link></li>
              <li><Link href="#" className="text-gray-300 hover:text-primary transition">Trip Planning</Link></li>
              <li><Link href="#" className="text-gray-300 hover:text-primary transition">Package Deals</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-300 hover:text-primary transition">About Us</Link></li>
              <li><Link href="/blog" className="text-gray-300 hover:text-primary transition">Travel Blog</Link></li>
              <li><Link href="/destinations" className="text-gray-300 hover:text-primary transition">Destinations</Link></li>
              <li><Link href="/terms" className="text-gray-300 hover:text-primary transition">Terms & Conditions</Link></li>
              <li><Link href="/privacy" className="text-gray-300 hover:text-primary transition">Privacy Policy</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mt-1 mr-2 text-primary"></i>
                <span className="text-gray-300">123 Travel Street, Cairo, Egypt</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-phone mr-2 text-primary"></i>
                <span className="text-gray-300">+20 123 456 7890</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-envelope mr-2 text-primary"></i>
                <span className="text-gray-300">info@traveleast.com</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-clock mr-2 text-primary"></i>
                <span className="text-gray-300">Mon-Fri: 9am - 6pm</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} TravelEast. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/terms" className="text-gray-400 hover:text-primary text-sm transition">Terms of Service</Link>
            <Link href="/privacy" className="text-gray-400 hover:text-primary text-sm transition">Privacy Policy</Link>
            <Link href="/cookies" className="text-gray-400 hover:text-primary text-sm transition">Cookie Policy</Link>
            <Link href="/faq" className="text-gray-400 hover:text-primary text-sm transition">FAQ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
