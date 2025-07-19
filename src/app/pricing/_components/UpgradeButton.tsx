import { Zap } from "lucide-react";
import Link from "next/link";

export default function UpgradeButton() {
  const CHEKOUT_URL ="https://codehivepayments.lemonsqueezy.com/buy/fab2bc09-421e-4203-ae51-9ca77471e61a";

  return (
    <Link
      href={CHEKOUT_URL}
      className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white 
        bg-gradient-to-r from-pink-500 to-red-600 rounded-lg 
        hover:from-pink-600 hover:to-red-700 transition-all"
    >
      <Zap className="w-5 h-5" />
      Upgrade to Pro
    </Link>
  );
}