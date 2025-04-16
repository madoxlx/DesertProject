import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

type PricingType = "booking" | "percentage" | "amount";

export function PackageEditor() {
  const [pricingType, setPricingType] = useState<PricingType>("booking");
  const [selectedHotel, setSelectedHotel] = useState<string>("");
  
  return (
    <div className="space-y-8">
      <section className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold mb-4">Basic Information</h2>
        <div className="space-y-4">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="package-name">Package Name</Label>
              <Input id="package-name" placeholder="Enter package name" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="overview">Overview</Label>
              <Textarea 
                id="overview" 
                placeholder="Provide a detailed overview of the package" 
                rows={5}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="base-price">Base Price ($)</Label>
                <Input id="base-price" type="number" placeholder="0.00" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="end-date">End Date</Label>
                <Input id="end-date" type="date" />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold mb-4">Pricing</h2>
        
        <div className="space-y-6">
          <RadioGroup value={pricingType} onValueChange={(value) => setPricingType(value as PricingType)}>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="booking" id="pricing-booking" />
                <Label htmlFor="pricing-booking">Per Booking</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="percentage" id="pricing-percentage" />
                <Label htmlFor="pricing-percentage">Per Percentage</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="amount" id="pricing-amount" />
                <Label htmlFor="pricing-amount">Per Amount</Label>
              </div>
            </div>
          </RadioGroup>
          
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left">Age Category</th>
                  <th className="px-4 py-3 text-left">
                    {pricingType === "percentage" ? "Percentage (%)" : pricingType === "amount" ? "Amount ($)" : "Booking Price ($)"}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="px-4 py-3">Adult</td>
                  <td className="px-4 py-3">
                    <Input placeholder="0" type="number" />
                  </td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-3">Child</td>
                  <td className="px-4 py-3">
                    <Input placeholder="0" type="number" />
                  </td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-3">Infant</td>
                  <td className="px-4 py-3">
                    <Input placeholder="0" type="number" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <Button variant="secondary" className="flex items-center gap-2">
            <i className="fas fa-plus"></i>
            Add Pricing Rule
          </Button>
        </div>
      </section>
      
      <section className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold mb-4">Gallery</h2>
        
        <div className="flex flex-wrap gap-4">
          <Button variant="outline" className="flex items-center gap-2">
            <i className="fas fa-plus"></i>
            Add Images to Gallery
          </Button>
          
          <Button variant="outline" className="flex items-center gap-2">
            <i className="fas fa-image"></i>
            Main Image
          </Button>
        </div>
        
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {/* Gallery preview placeholders */}
          {[1, 2, 3].map((item) => (
            <div 
              key={item}
              className="aspect-square bg-gray-200 rounded-md flex items-center justify-center text-gray-400"
            >
              <i className="fas fa-image text-3xl"></i>
            </div>
          ))}
        </div>
      </section>
      
      <section className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold mb-4">Hotel & Rooms</h2>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="hotel-select">Select Hotel</Label>
            <Select value={selectedHotel} onValueChange={setSelectedHotel}>
              <SelectTrigger>
                <SelectValue placeholder="Select a hotel" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hotel-1">Grand Hotel Cairo</SelectItem>
                <SelectItem value="hotel-2">Luxury Resort Dubai</SelectItem>
                <SelectItem value="hotel-3">Petra View Hotel</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-gray-500 mt-1">These rooms change when hotel selection changes</p>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-medium">Available Rooms</h3>
            
            <div className="space-y-3">
              {["Standard Room", "Deluxe Room", "Suite"].map((room, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Checkbox id={`room-${index}`} />
                  <Label htmlFor={`room-${index}`}>{room}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      <section className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold mb-4">Include / Exclude</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {["Breakfast", "Lunch", "Dinner", "Wifi", "Airport Transfer", "Local Guide", 
            "Entrance Fees", "Breakfast", "Lunch"].map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Checkbox id={`include-${index}`} />
              <Label htmlFor={`include-${index}`}>{item}</Label>
            </div>
          ))}
        </div>
      </section>
      
      <div className="flex justify-end gap-3">
        <Button variant="outline">Cancel</Button>
        <Button>Save Package</Button>
      </div>
    </div>
  );
}