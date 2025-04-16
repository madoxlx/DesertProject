import { AdminLayout } from "@/components/admin/admin-layout";

export default function AdminDashboard() {
  return (
    <AdminLayout title="Dashboard Overview">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
              <i className="fas fa-users text-blue-600"></i>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Total Users</h3>
              <p className="text-2xl font-bold">1,248</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
              <i className="fas fa-suitcase text-green-600"></i>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Packages</h3>
              <p className="text-2xl font-bold">24</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mr-4">
              <i className="fas fa-map-marker-alt text-purple-600"></i>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Destinations</h3>
              <p className="text-2xl font-bold">42</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center mr-4">
              <i className="fas fa-star text-yellow-600"></i>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Reviews</h3>
              <p className="text-2xl font-bold">876</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <h2 className="text-xl font-bold mb-4">Recent Bookings</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">User</th>
                <th className="px-4 py-3 text-left">Package</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Amount</th>
                <th className="px-4 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((booking) => (
                <tr key={booking} className="border-t">
                  <td className="px-4 py-3">#BK-{booking.toString().padStart(4, '0')}</td>
                  <td className="px-4 py-3">User Name</td>
                  <td className="px-4 py-3">Cairo Explorer</td>
                  <td className="px-4 py-3">April 15, 2025</td>
                  <td className="px-4 py-3">$1,248</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                      Confirmed
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}