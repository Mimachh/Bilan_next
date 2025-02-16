import { Poppins } from "next/font/google";

import Newsletter from "@/components/landing/newsletter";
import FeatureStats from "@/components/landing/feature-stats";
import EndMacron from "@/components/landing/end-macron";
import Footer from "@/components/landing/footer";
import RootNav from "@/components/landing/nav";
import HeroBeta from "@/components/landing/hero-beta";
import BetaNav from "@/components/landing/beta-nav";
import BetaFeatureStat from "@/components/landing/beta-feature-stats";
import Petition from "@/components/landing/petition";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

const Home = async () => {
  const deadline = new Date(1808604000000);

  return (
    <main className="h-full bg-black w-full relative">
      {/* <LoginButton asChild mode="modal">
        <Button variant="secondary" size="lg">
          Sign in
        </Button>
      </LoginButton> */}

      <BetaNav />
      <HeroBeta />
      <BetaFeatureStat />
      <Petition />
      {/* <Newsletter />
      
      <FeatureStats />
      <EndMacron deadline={deadline} /> */}
      {/* <div className="bg-white h-32"></div> */}
      {/* <Footer /> */}
    </main>
  );
};

export default Home;
