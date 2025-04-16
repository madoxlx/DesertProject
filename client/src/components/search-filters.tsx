import { FilterTabs } from "@/components/filter-tabs";

export function SearchFilters() {
  return (
    <section className="relative z-20 -mt-16 mb-12">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 text-gray-800 max-w-5xl mx-auto">
          <FilterTabs />
        </div>
      </div>
    </section>
  );
}