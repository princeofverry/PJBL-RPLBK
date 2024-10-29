import Newest from "./components/newest";
import Data from "./data/data";

export default function Home() {
  return (
    <>
      <div className="">
        <Newest />
        <div>
          <h1>CNN</h1>
          <Data
            api={"https://api-berita-indonesia.vercel.app/cnn/teknologi/"}
          />
        </div>
        <div>
          <h1>MERDEKA</h1>
          <Data
            api={"https://api-berita-indonesia.vercel.app/merdeka/teknologi/"}
          />
        </div>
      </div>
    </>
  );
}
