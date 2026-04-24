import Header from "@/components/site/Header";
import Hero from "@/components/site/Hero";
import About from "@/components/site/About";
import Leadership from "@/components/site/Leadership";
import Events from "@/components/site/Events";
import Gallery from "@/components/site/Gallery";
import Footer from "@/components/site/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <About />
        <Leadership />
        <Events />
        <Gallery />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
