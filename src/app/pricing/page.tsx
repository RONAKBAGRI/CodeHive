import { currentUser } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../convex/_generated/api";
import ProPlanView from "./_components/ProPlanView";
import NavigationHeader from "@/components/NavigationHeader";
import { ENTERPRISE_FEATURES, FEATURES } from "./_constants";
import { Star } from "lucide-react";
import FeatureCategory from "./_components/FeatureCategory";
import FeatureItem from "./_components/FeatureItem";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import UpgradeButton from "./_components/UpgradeButton";
import LoginButton from "@/components/LoginButton";

async function PricingPage() {
  const user = await currentUser();
  const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  const convexUser = await convex.query(api.users.getUser, {
    userId: user?.id || "",
  });

  if (convexUser?.isPro) return <ProPlanView />;

  return (
    <div
      className="relative min-h-screen bg-gradient-to-b from-orange-800 to-gray-600">
      <NavigationHeader />

      {/* main content */}

      <main className="relative pt-32 pb-24 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Hero   */}
          <div className="text-center mb-24">
            <div className="relative inline-block">
              <div className="absolute -inset-px bg-gradient-to-r from-blue-500 to-purple-500 blur-xl opacity-10" />
              <h1
                className="relative text-5xl md:text-6xl lg:text-7xl font-semibold bg-gradient-to-r
               from-gray-100 to-gray-300 text-transparent bg-clip-text mb-8"
              >
                Power Up Your Coding <br />
                Workflow
              </h1>
            </div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Connect with passionate coders like you — collaborate, learn, and code without limits.
            </p>
          </div>

          {/* Enterprise Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
            {ENTERPRISE_FEATURES.map((feature) => (
              <div
                key={feature.label}
                className="group relative bg-gray-800/60 rounded-2xl p-6 hover:transform hover:scale-[1.02] transition-all duration-300"
              >
                <div className="relative">
                  <div
                    className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 
                  flex items-center justify-center mb-4 ring-1 ring-gray-800/60 group-hover:ring-blue-500/20"
                  >
                    <feature.icon className="w-6 h-6 text-yellow-200" />
                  </div>

                  <h3 className="text-lg font-medium text-white mb-2">{feature.label}</h3>
                  <p className="text-gray-400">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Pricing Card */}

          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative bg-gray-800/60 backdrop-blur-xl rounded-2xl shadow-lg overflow-hidden">
              {/* Glow border */}
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-blue-500/20 blur opacity-20 pointer-events-none" />

              {/* Top and bottom gradient lines */}
              <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
              <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

              <div className="relative p-6 sm:p-10 md:p-14">
                {/* Header Section */}
                <div className="text-center mb-10">
                  <div className="inline-flex items-center justify-center p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 ring-1 ring-gray-700 mb-6">
                    <Star className="w-8 h-8 text-yellow-200" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
                    One-Time Pro Upgrade
                  </h2>
                  <div className="flex items-baseline justify-center gap-2 mb-4">
                    <span className="text-2xl text-gray-400">₹</span>
                    <span className="text-6xl font-semibold bg-gradient-to-r from-gray-100 to-gray-300 text-transparent bg-clip-text">
                      499
                    </span>
                    <span className="text-xl text-gray-400">one-time</span>
                  </div>
                  <p className="text-gray-400 text-lg max-w-xl mx-auto">
                    Upgrade to Pro for the complete CodeHive experience
                  </p>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 gap-10 mb-12">
                  <FeatureCategory label="Development">
                    {FEATURES.development.map((feature, idx) => (
                      <FeatureItem key={idx}>{feature}</FeatureItem>
                    ))}
                  </FeatureCategory>

                  <FeatureCategory label="Collaboration">
                    {FEATURES.collaboration.map((feature, idx) => (
                      <FeatureItem key={idx}>{feature}</FeatureItem>
                    ))}
                  </FeatureCategory>
                </div>

                {/* CTA */}
                <div className="flex justify-center">
                  <SignedIn>
                    <UpgradeButton />
                  </SignedIn>
                  <SignedOut>
                    <LoginButton />
                  </SignedOut>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
export default PricingPage;