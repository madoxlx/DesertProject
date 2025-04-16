import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  flightFilterSchema, 
  hotelFilterSchema, 
  visaFilterSchema, 
  tripFilterSchema, 
  packageFilterSchema 
} from "@shared/schema";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";

type TabType = 'flights' | 'hotels' | 'visas' | 'trips' | 'packages';

export function FilterTabs() {
  const [activeTab, setActiveTab] = useState<TabType>('flights');

  return (
    <div>
      {/* Service Tabs */}
      <nav>
        <ul className="flex flex-wrap -mb-px border-b border-gray-200">
          <li className="mr-2">
            <button
              onClick={() => setActiveTab('flights')}
              className={`inline-block p-4 rounded-t-lg ${
                activeTab === 'flights' 
                  ? 'text-primary border-b-2 border-primary' 
                  : 'text-gray-500 hover:text-primary'
              }`}
            >
              <i className="fas fa-plane-departure mr-1"></i> Flights
            </button>
          </li>
          <li className="mr-2">
            <button
              onClick={() => setActiveTab('hotels')}
              className={`inline-block p-4 rounded-t-lg ${
                activeTab === 'hotels' 
                  ? 'text-primary border-b-2 border-primary' 
                  : 'text-gray-500 hover:text-primary'
              }`}
            >
              <i className="fas fa-hotel mr-1"></i> Hotels
            </button>
          </li>
          <li className="mr-2">
            <button
              onClick={() => setActiveTab('visas')}
              className={`inline-block p-4 rounded-t-lg ${
                activeTab === 'visas' 
                  ? 'text-primary border-b-2 border-primary' 
                  : 'text-gray-500 hover:text-primary'
              }`}
            >
              <i className="fas fa-passport mr-1"></i> Visas
            </button>
          </li>
          <li className="mr-2">
            <button
              onClick={() => setActiveTab('trips')}
              className={`inline-block p-4 rounded-t-lg ${
                activeTab === 'trips' 
                  ? 'text-primary border-b-2 border-primary' 
                  : 'text-gray-500 hover:text-primary'
              }`}
            >
              <i className="fas fa-globe-americas mr-1"></i> Trips
            </button>
          </li>
          <li className="mr-2">
            <button
              onClick={() => setActiveTab('packages')}
              className={`inline-block p-4 rounded-t-lg ${
                activeTab === 'packages' 
                  ? 'text-primary border-b-2 border-primary' 
                  : 'text-gray-500 hover:text-primary'
              }`}
            >
              <i className="fas fa-box-open mr-1"></i> Packages
            </button>
          </li>
        </ul>
      </nav>
      
      {/* Filter Content */}
      <div className="pt-4">
        {activeTab === 'flights' && <FlightFilter />}
        {activeTab === 'hotels' && <HotelFilter />}
        {activeTab === 'visas' && <VisaFilter />}
        {activeTab === 'trips' && <TripFilter />}
        {activeTab === 'packages' && <PackageFilter />}
      </div>
    </div>
  );
}

function FlightFilter() {
  const form = useForm<z.infer<typeof flightFilterSchema>>({
    resolver: zodResolver(flightFilterSchema),
    defaultValues: {
      from: "",
      to: "",
      passengers: 1,
      flightClass: "economy"
    }
  });

  function onSubmit(values: z.infer<typeof flightFilterSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <FormField
          control={form.control}
          name="from"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">From</FormLabel>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-plane-departure text-gray-400"></i>
                </div>
                <FormControl>
                  <Input 
                    placeholder="City or Airport" 
                    className="pl-10 rounded-md" 
                    {...field} 
                  />
                </FormControl>
              </div>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="to"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">To</FormLabel>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-plane-arrival text-gray-400"></i>
                </div>
                <FormControl>
                  <Input 
                    placeholder="City or Airport" 
                    className="pl-10 rounded-md" 
                    {...field} 
                  />
                </FormControl>
              </div>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">Date</FormLabel>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-calendar text-gray-400"></i>
                </div>
                <FormControl>
                  <Input 
                    type="date" 
                    className="pl-10 rounded-md" 
                    {...field} 
                  />
                </FormControl>
              </div>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="passengers"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">Passengers</FormLabel>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-user text-gray-400"></i>
                </div>
                <FormControl>
                  <Input 
                    type="number" 
                    min="1" 
                    className="pl-10 rounded-md" 
                    {...field} 
                    onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                  />
                </FormControl>
              </div>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="flightClass"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">Class</FormLabel>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-chair text-gray-400"></i>
                </div>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="pl-10 rounded-md">
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="economy">Economy</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="first">First Class</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </FormItem>
          )}
        />
        
        <div className="md:col-span-2 lg:col-span-5 flex justify-center">
          <Button 
            type="submit" 
            className="px-8 py-6 bg-primary hover:bg-blue-700 text-white rounded-full font-medium flex items-center"
          >
            <i className="fas fa-search mr-2"></i> Search Flights
          </Button>
        </div>
      </form>
    </Form>
  );
}

function HotelFilter() {
  const form = useForm<z.infer<typeof hotelFilterSchema>>({
    resolver: zodResolver(hotelFilterSchema),
    defaultValues: {
      country: "",
      city: "",
      nights: 1,
      guests: 2,
      stars: "any"
    }
  });

  function onSubmit(values: z.infer<typeof hotelFilterSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">Country</FormLabel>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-globe text-gray-400"></i>
                </div>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="pl-10 rounded-md">
                      <SelectValue placeholder="Select Country" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="egypt">Egypt</SelectItem>
                    <SelectItem value="uae">United Arab Emirates</SelectItem>
                    <SelectItem value="jordan">Jordan</SelectItem>
                    <SelectItem value="saudi">Saudi Arabia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">City</FormLabel>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-city text-gray-400"></i>
                </div>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="pl-10 rounded-md">
                      <SelectValue placeholder="Select City" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="cairo">Cairo</SelectItem>
                    <SelectItem value="dubai">Dubai</SelectItem>
                    <SelectItem value="amman">Amman</SelectItem>
                    <SelectItem value="riyadh">Riyadh</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="checkInDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">Check-in Date</FormLabel>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-calendar-check text-gray-400"></i>
                </div>
                <FormControl>
                  <Input 
                    type="date" 
                    className="pl-10 rounded-md" 
                    {...field} 
                  />
                </FormControl>
              </div>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="nights"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">Nights</FormLabel>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-moon text-gray-400"></i>
                </div>
                <FormControl>
                  <Input 
                    type="number" 
                    min="1" 
                    className="pl-10 rounded-md" 
                    {...field} 
                    onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                  />
                </FormControl>
              </div>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="guests"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">Guests</FormLabel>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-users text-gray-400"></i>
                </div>
                <FormControl>
                  <Input 
                    type="number" 
                    min="1" 
                    className="pl-10 rounded-md" 
                    {...field} 
                    onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                  />
                </FormControl>
              </div>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="stars"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">Stars</FormLabel>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-star text-gray-400"></i>
                </div>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="pl-10 rounded-md">
                      <SelectValue placeholder="Any Rating" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="any">Any Rating</SelectItem>
                    <SelectItem value="3">3+ Stars</SelectItem>
                    <SelectItem value="4">4+ Stars</SelectItem>
                    <SelectItem value="5">5 Stars</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </FormItem>
          )}
        />
        
        <div className="md:col-span-2 lg:col-span-3 flex justify-center">
          <Button 
            type="submit" 
            className="px-8 py-6 bg-primary hover:bg-blue-700 text-white rounded-full font-medium flex items-center"
          >
            <i className="fas fa-search mr-2"></i> Search Hotels
          </Button>
        </div>
      </form>
    </Form>
  );
}

function VisaFilter() {
  const form = useForm<z.infer<typeof visaFilterSchema>>({
    resolver: zodResolver(visaFilterSchema),
    defaultValues: {
      country: "",
      duration: 30,
      type: "tourist",
      processingTime: "any",
      priceRange: 500
    }
  });

  function onSubmit(values: z.infer<typeof visaFilterSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-2">
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">Country</FormLabel>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fas fa-globe text-gray-400"></i>
                  </div>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="pl-10 rounded-md">
                        <SelectValue placeholder="Select Country" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="egypt">Egypt</SelectItem>
                      <SelectItem value="uae">United Arab Emirates</SelectItem>
                      <SelectItem value="jordan">Jordan</SelectItem>
                      <SelectItem value="saudi">Saudi Arabia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">Duration (days)</FormLabel>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-calendar-alt text-gray-400"></i>
                </div>
                <FormControl>
                  <Input 
                    type="number" 
                    min="1" 
                    className="pl-10 rounded-md" 
                    {...field} 
                    onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                  />
                </FormControl>
              </div>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">Type</FormLabel>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-id-card text-gray-400"></i>
                </div>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="pl-10 rounded-md">
                      <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="tourist">Tourist</SelectItem>
                    <SelectItem value="work">Work</SelectItem>
                    <SelectItem value="study">Study</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="processingTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">Processing Time</FormLabel>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-clock text-gray-400"></i>
                </div>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="pl-10 rounded-md">
                      <SelectValue placeholder="Select Processing Time" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="express">Express (1-3 days)</SelectItem>
                    <SelectItem value="standard">Standard (5-7 days)</SelectItem>
                    <SelectItem value="regular">Regular (10-14 days)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </FormItem>
          )}
        />
        
        <div className="lg:col-span-5">
          <FormField
            control={form.control}
            name="priceRange"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">Price Range</FormLabel>
                <FormControl>
                  <Slider
                    min={0}
                    max={1000}
                    step={50}
                    defaultValue={[field.value || 0]}
                    onValueChange={(values) => field.onChange(values[0])}
                    className="w-full"
                  />
                </FormControl>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>$0</span>
                  <span>$500</span>
                  <span>$1000+</span>
                </div>
              </FormItem>
            )}
          />
        </div>
        
        <div className="lg:col-span-5 flex justify-center">
          <Button 
            type="submit" 
            className="px-8 py-6 bg-primary hover:bg-blue-700 text-white rounded-full font-medium flex items-center"
          >
            <i className="fas fa-search mr-2"></i> Search Visas
          </Button>
        </div>
      </form>
    </Form>
  );
}

function TripFilter() {
  const form = useForm<z.infer<typeof tripFilterSchema>>({
    resolver: zodResolver(tripFilterSchema),
    defaultValues: {
      destination: "",
      tripType: "safari",
      days: 3,
      budget: 2500
    }
  });

  function onSubmit(values: z.infer<typeof tripFilterSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-2">
          <FormField
            control={form.control}
            name="destination"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">Destination</FormLabel>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fas fa-map-marker-alt text-gray-400"></i>
                  </div>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="pl-10 rounded-md">
                        <SelectValue placeholder="Select Destination" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="pyramids">Pyramids of Giza</SelectItem>
                      <SelectItem value="petra">Petra</SelectItem>
                      <SelectItem value="dubai">Dubai</SelectItem>
                      <SelectItem value="deadsea">Dead Sea</SelectItem>
                      <SelectItem value="luxor">Luxor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="tripType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">Trip Type</FormLabel>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-hiking text-gray-400"></i>
                </div>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="pl-10 rounded-md">
                      <SelectValue placeholder="Select Trip Type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="safari">Safari</SelectItem>
                    <SelectItem value="honeymoon">Honeymoon</SelectItem>
                    <SelectItem value="family">Family</SelectItem>
                    <SelectItem value="adventure">Adventure</SelectItem>
                    <SelectItem value="cultural">Cultural</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="days"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">Days</FormLabel>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-calendar-day text-gray-400"></i>
                </div>
                <FormControl>
                  <Input 
                    type="number" 
                    min="1" 
                    className="pl-10 rounded-md" 
                    {...field} 
                    onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                  />
                </FormControl>
              </div>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">Date</FormLabel>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-calendar text-gray-400"></i>
                </div>
                <FormControl>
                  <Input 
                    type="date" 
                    className="pl-10 rounded-md" 
                    {...field} 
                  />
                </FormControl>
              </div>
            </FormItem>
          )}
        />
        
        <div className="lg:col-span-5">
          <FormField
            control={form.control}
            name="budget"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">Budget</FormLabel>
                <FormControl>
                  <Slider
                    min={200}
                    max={5000}
                    step={100}
                    defaultValue={[field.value || 200]}
                    onValueChange={(values) => field.onChange(values[0])}
                    className="w-full"
                  />
                </FormControl>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>$200</span>
                  <span>$2500</span>
                  <span>$5000+</span>
                </div>
              </FormItem>
            )}
          />
        </div>
        
        <div className="lg:col-span-5 flex justify-center">
          <Button 
            type="submit" 
            className="px-8 py-6 bg-primary hover:bg-blue-700 text-white rounded-full font-medium flex items-center"
          >
            <i className="fas fa-search mr-2"></i> Search Trips
          </Button>
        </div>
      </form>
    </Form>
  );
}

function PackageFilter() {
  const form = useForm<z.infer<typeof packageFilterSchema>>({
    resolver: zodResolver(packageFilterSchema),
    defaultValues: {
      country: "",
      nights: 5,
      type: "luxury",
      includedServices: ["flight", "hotel", "transfers"],
      priceRange: 5000
    }
  });

  function onSubmit(values: z.infer<typeof packageFilterSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">Country</FormLabel>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-globe text-gray-400"></i>
                </div>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="pl-10 rounded-md">
                      <SelectValue placeholder="Select Country" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="egypt">Egypt</SelectItem>
                    <SelectItem value="uae">United Arab Emirates</SelectItem>
                    <SelectItem value="jordan">Jordan</SelectItem>
                    <SelectItem value="saudi">Saudi Arabia</SelectItem>
                    <SelectItem value="turkey">Turkey</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="nights"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">Nights</FormLabel>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-moon text-gray-400"></i>
                </div>
                <FormControl>
                  <Input 
                    type="number" 
                    min="1" 
                    className="pl-10 rounded-md" 
                    {...field} 
                    onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                  />
                </FormControl>
              </div>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">Type</FormLabel>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-tag text-gray-400"></i>
                </div>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="pl-10 rounded-md">
                      <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="luxury">Luxury</SelectItem>
                    <SelectItem value="budget">Budget</SelectItem>
                    <SelectItem value="adventure">Adventure</SelectItem>
                    <SelectItem value="family">Family</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </FormItem>
          )}
        />
        
        <div className="md:col-span-2 lg:col-span-3">
          <FormLabel className="block text-sm font-medium text-gray-700 mb-1">Included Services</FormLabel>
          <div className="grid grid-cols-3 gap-2">
            {["flight", "hotel", "transfers", "meals", "guide", "activities"].map((service) => (
              <FormField
                key={service}
                control={form.control}
                name="includedServices"
                render={({ field }) => {
                  return (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(service)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...(field.value || []), service])
                              : field.onChange(
                                  field.value?.filter(
                                    (value) => value !== service
                                  ) || []
                                )
                          }}
                        />
                      </FormControl>
                      <FormLabel className="text-sm text-gray-700">
                        {service.charAt(0).toUpperCase() + service.slice(1)}
                      </FormLabel>
                    </FormItem>
                  )
                }}
              />
            ))}
          </div>
        </div>
        
        <div className="md:col-span-2 lg:col-span-3">
          <FormField
            control={form.control}
            name="priceRange"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">Price Range</FormLabel>
                <FormControl>
                  <Slider
                    min={500}
                    max={10000}
                    step={500}
                    defaultValue={[field.value || 500]}
                    onValueChange={(values) => field.onChange(values[0])}
                    className="w-full"
                  />
                </FormControl>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>$500</span>
                  <span>$5000</span>
                  <span>$10000+</span>
                </div>
              </FormItem>
            )}
          />
        </div>
        
        <div className="md:col-span-2 lg:col-span-3 flex justify-center">
          <Button 
            type="submit" 
            className="px-8 py-6 bg-primary hover:bg-blue-700 text-white rounded-full font-medium flex items-center"
          >
            <i className="fas fa-search mr-2"></i> Search Packages
          </Button>
        </div>
      </form>
    </Form>
  );
}
