import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";

const layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="min-h-[95vh]">{children}</div>
      <Footer />
    </>
  );
};

export default layout;
