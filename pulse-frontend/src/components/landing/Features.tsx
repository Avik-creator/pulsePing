import { Bell, Shield, Zap } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: Zap,
      title: "One-step Setup",
      description:
        "Just add one URL, and you're all set. No complex configurations, just quick and easy setup.",
    },
    {
      icon: Bell,
      title: "Flexible Notifications",
      description:
        "Get notified via Gmail when your server goes down. We'll automatically send you email alerts so you stay informed.",
    },
    {
      icon: Bell,
      title: "Automatic Health Checks",
      description:
        "We ping your server or app every 10 minutes to ensure it's up and running with a 200 OK response.",
    },
    {
      icon: Shield,
      title: "Reliability Monitoring",
      description:
        "Stay confident in your app's uptime with real-time alerts and monitoring for maximum reliability.",
    },
  ];

  return (
    <div className="p-6 md:p-12" id="features">
      <p className="text-3xl lg:text-5xl text-white font-semibold capitalize mb-10">
        What we offer
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-3xl bg-slate-800/50 border border-slate-700/50 p-6 hover:bg-slate-800/70 transition-colors"
          >
            <div className="mb-4 inline-block rounded-full bg-white/10 p-3">
              <feature.icon className="h-6 w-6 text-white" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-white">
              {feature.title}
            </h3>
            <p className="text-slate-400">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
