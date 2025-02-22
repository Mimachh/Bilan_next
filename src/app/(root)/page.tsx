import { Poppins } from "next/font/google";

import HeroBeta from "@/components/landing/hero-beta";
import BetaFeatureStat from "@/components/landing/beta-feature-stats";
import Petition from "@/components/landing/petition";
import BetaFooter from "@/components/landing/beta-footer";
import BetaNewsletter from "@/components/landing/beta-newsletter";
import About from "@/components/landing/about";
import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";


const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

const Home = async () => {
  // const deadline = new Date(1808604000000);
  return (
    <main className="">
      {/* <LoginButton asChild mode="modal">
        <Button variant="secondary" size="lg">
          Sign in
        </Button>
      </LoginButton> */}
    
      <HeroBeta />
      <BetaFeatureStat />

   
        <Petition />
        <BetaNewsletter />
        <About />

      {/*
      
      <FeatureStats />
      <EndMacron deadline={deadline} /> */}
      {/* <div className="bg-white h-32"></div> */}
      {/* <Footer /> */}
      <BetaFooter />
    </main>
  );
};

export default Home;
