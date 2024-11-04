import Newest from "./components/Newest";
import Data from "./data/Data";
import GoldPrice from "./components/GoldPrice";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto py-8">
        {/* Gold Price Section */}
        <section className="mb-12">
          <GoldPrice />
        </section> 
        {/* Latest News Section */}
        <section className="mb-12">
          <Newest />
        </section>
        {/* News Grid Section */}
        <section className="grid md:grid-cols-2 gap-8 px-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
              <span className="text-red-600">CNN</span> Tech News
            </h2>
            <Data
              api={"https://api-berita-indonesia.vercel.app/cnn/teknologi/"}
            />
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
              <span className="text-blue-600">MERDEKA</span> Tech News
            </h2>
            <Data
              api={"https://api-berita-indonesia.vercel.app/merdeka/teknologi/"}
            />
          </div>
        </section>
      </main>
    </div>
  );
}