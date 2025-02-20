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
import BetaFooter from "@/components/landing/beta-footer";
import CookieConsent from "@/components/global/cookie-consent";
import BetaNewsletter from "@/components/landing/beta-newsletter";
import GoogleCaptchaProvider from "@/providers/google-recaptcha-provider";
import About from "@/components/landing/about";
import ContactForm from "@/components/forms/contact-form";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

const Home = async () => {
  const deadline = new Date(1808604000000);

  return (
    <main className="">
      {/* <LoginButton asChild mode="modal">
        <Button variant="secondary" size="lg">
          Sign in
        </Button>
      </LoginButton> */}
      <HeroBeta />
      <BetaFeatureStat />
      <GoogleCaptchaProvider>
      <Petition />
      <BetaNewsletter />
      <About />
      <ContactForm />
      </GoogleCaptchaProvider>
      {/*
      
      <FeatureStats />
      <EndMacron deadline={deadline} /> */}
      {/* <div className="bg-white h-32"></div> */}
      {/* <Footer /> */}
      <BetaFooter />
      <CookieConsent variant={"small"} />
    </main>
  );
};

export default Home;
