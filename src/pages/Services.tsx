import { Car, UtensilsCrossed, ShoppingBag, Zap, GraduationCap, HeartPulse, Plane, Film } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    id: 1,
    name: "রাইড শেয়ারিং",
    nameEn: "Ride Sharing",
    icon: Car,
    color: "bg-primary",
    description: "যানবাহন বুক করুন"
  },
  {
    id: 2,
    name: "খাবার ডেলিভারি",
    nameEn: "Food Delivery",
    icon: UtensilsCrossed,
    color: "bg-secondary",
    description: "খাবার অর্ডার করুন"
  },
  {
    id: 3,
    name: "ই-কমার্স",
    nameEn: "E-Commerce",
    icon: ShoppingBag,
    color: "bg-accent",
    description: "কেনাকাটা করুন"
  },
  {
    id: 4,
    name: "বিল পেমেন্ট",
    nameEn: "Bill Payment",
    icon: Zap,
    color: "bg-success",
    description: "বিল পরিশোধ করুন"
  },
  {
    id: 5,
    name: "শিক্ষা",
    nameEn: "Education",
    icon: GraduationCap,
    color: "bg-blue-500",
    description: "কোর্স খুঁজুন"
  },
  {
    id: 6,
    name: "স্বাস্থ্যসেবা",
    nameEn: "Healthcare",
    icon: HeartPulse,
    color: "bg-red-500",
    description: "ডাক্তার পরামর্শ"
  },
  {
    id: 7,
    name: "ভ্রমণ",
    nameEn: "Travel",
    icon: Plane,
    color: "bg-purple-500",
    description: "টিকিট বুক করুন"
  },
  {
    id: 8,
    name: "বিনোদন",
    nameEn: "Entertainment",
    icon: Film,
    color: "bg-orange-500",
    description: "সিনেমা টিকিট"
  }
];

const featuredServices = [
  {
    id: 1,
    title: "রাইড শেয়ারিং সেবা",
    titleEn: "Ride Sharing Service",
    description: "নিরাপদ এবং সাশ্রয়ী যাতায়াত সেবা",
    descriptionEn: "Safe and affordable transportation",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=400&fit=crop",
    badge: "জনপ্রিয়"
  },
  {
    id: 2,
    title: "খাবার ডেলিভারি",
    titleEn: "Food Delivery",
    description: "আপনার প্রিয় রেস্টুরেন্ট থেকে অর্ডার করুন",
    descriptionEn: "Order from your favorite restaurants",
    image: "https://images.unsplash.com/photo-1526367790999-0150786686a2?w=800&h=400&fit=crop",
    badge: "নতুন"
  }
];

export default function Services() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold font-bengali">সেবা সমূহ</h2>
        <p className="text-sm text-muted-foreground">Services</p>
      </div>

      {/* Featured Services */}
      <div>
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <span className="font-bengali">বিশেষ সেবা</span>
          <span className="text-sm text-muted-foreground">Featured Services</span>
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {featuredServices.map((service) => (
            <Card 
              key={service.id} 
              className="overflow-hidden cursor-pointer hover:shadow-elegant transition-all group"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.titleEn}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3">
                  <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-medium font-bengali">
                    {service.badge}
                  </span>
                </div>
              </div>
              <CardContent className="p-4">
                <h4 className="font-semibold font-bengali mb-1">{service.title}</h4>
                <p className="text-sm text-muted-foreground mb-2">{service.titleEn}</p>
                <p className="text-sm font-bengali">{service.description}</p>
                <p className="text-xs text-muted-foreground">{service.descriptionEn}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* All Services Grid */}
      <div>
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <span className="font-bengali">সকল সেবা</span>
          <span className="text-sm text-muted-foreground">All Services</span>
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Card 
                key={service.id} 
                className="cursor-pointer hover:shadow-elegant transition-all group"
              >
                <CardContent className="p-6 text-center">
                  <div className={`${service.color} h-16 w-16 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="font-semibold font-bengali mb-1">{service.name}</h4>
                  <p className="text-xs text-muted-foreground mb-2">{service.nameEn}</p>
                  <p className="text-xs text-muted-foreground font-bengali">{service.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Categories */}
      <Card className="bg-gradient-primary text-primary-foreground">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-2 font-bengali">নতুন সেবা যোগ করুন</h3>
          <p className="text-sm opacity-90 mb-4">Add New Service</p>
          <p className="text-sm opacity-90 font-bengali mb-4">
            আপনার নিজের মিনি-অ্যাপ তৈরি করুন এবং লক্ষ লক্ষ ব্যবহারকারীর কাছে পৌঁছান
          </p>
          <p className="text-xs opacity-75 mb-4">
            Create your own mini-app and reach millions of users
          </p>
          <button className="bg-white text-primary px-6 py-2 rounded-lg font-medium hover:bg-white/90 transition-colors">
            আরও জানুন • Learn More
          </button>
        </CardContent>
      </Card>
    </div>
  );
}
