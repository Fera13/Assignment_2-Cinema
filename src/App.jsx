import { MyNavBar } from "./Componants/MyNavBar";
import { GetAllMovies } from "./AllMovies";
import { ViewMoreInfo } from "./ViewMoreInfo";
import "./index.css";
import { Routes, Route } from "react-router-dom";
import { DisplaySeats } from "./DisplaySeats";
import { Footer } from "./Componants/Footer";

export default function App() {
  return (
    <div className="App">
      <MyNavBar />
      <main>
        <Routes>
          <Route path="/" element={<GetAllMovies />} />
          <Route path="viewMore/:id" element={<ViewMoreInfo />} />
          <Route path="viewSeats/:id" element={<DisplaySeats />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
