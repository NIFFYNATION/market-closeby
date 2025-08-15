// src/components/common/categoryData.js
export const categories = [
  {
    name: "Vehicles",
    image: "/imgs/vehicles.svg",
    sections: [
      {
        title: "Cars",
        items: ["Sedans", "SUVs & Crossovers", "Hatchbacks", "Coupes & Convertibles", "Luxury Cars", "Electric & Hybrid Cars"]
      },
      {
        title: "Motorcycles & Scooters",
        items: ["Street Bikes", "Cruisers & Choppers", "Sport Bikes", "Scooters & Mopeds", "Dirt Bikes & Off-road", "Tricycles (Keke Napep)"]
      },
      {
        title: "Boats & Watercraft",
        items: ["Fishing Boats", "Jet Skis", "Speedboats", "Yachts", "Canoes & Kayaks"]
      },
      {
        title: "Trucks & Buses",
        items: ["Mini Buses & Commercial Buses", "Pickup Trucks", "Heavy-Duty Trucks", "Box Trucks & Delivery Vans", "Refrigerated Trucks"]
      },
      {
        title: "Vehicle Parts & Accessories",
        items: ["Engines & Transmissions", "Wheels & Tires", "Batteries & Power Systems", "Body Parts", "Motorcycle Parts & Accessories"]
      }
    ]
  },
  {
    name: "Gadgets",
    image: "/imgs/gadgets.svg",
    sections: [
      {
        title: "Mobile Devices",
        items: ["Smartphones", "Tablets", "Smartwatches", "Fitness Trackers"]
      },
      {
        title: "Wearable Tech",
        items: ["VR Headsets", "Smart Glasses", "Smart Rings"]
      },
      {
        title: "Gaming Gadgets",
        items: ["Handheld Consoles", "Gaming Accessories", "Gamepads & Controllers"]
      },
      {
        title: "Accessories",
        items: ["Phone Cases", "Screen Protectors", "Chargers & Power Banks", "Bluetooth Trackers"]
      }
    ]
  },
  {
    name: "Electronics",
    image: "/imgs/tv.svg",
    sections: [
      {
        title: "TV & Video",
        items: ["Smart TVs", "LED & OLED TVs", "Projectors", "TV Accessories"]
      },
      {
        title: "Audio",
        items: ["Home Theater Systems", "Bluetooth Speakers", "Headphones", "Soundbars"]
      },
      {
        title: "Computing",
        items: ["Laptops", "Desktops", "Monitors", "Printers & Scanners", "Computer Accessories"]
      },
      {
        title: "Cameras & Photography",
        items: ["Digital Cameras", "DSLRs", "Lenses", "Camera Accessories"]
      }
    ]
  },
  {
    name: "Home & Kitchen",
    image: "/imgs/blender.svg",
    sections: [
      {
        title: "Kitchen Appliances",
        items: ["Microwaves", "Blenders & Mixers", "Gas Cookers", "Electric Kettles", "Refrigerators"]
      },
      {
        title: "Home Appliances",
        items: ["Air Conditioners", "Washing Machines", "Fans", "Water Heaters", "Vacuum Cleaners"]
      },
      {
        title: "Furniture & Decor",
        items: ["Sofas", "Beds & Mattresses", "Tables & Chairs", "Wall Art", "Curtains & Blinds"]
      },
      {
        title: "Home Improvement",
        items: ["Lighting", "Tools & Hardware", "Cleaning Supplies", "Paint & Wall Treatments"]
      }
    ]
  },
  {
    name: "Health & Beauty",
    image: "/imgs/cream.svg",
    sections: [
      {
        title: "Personal Care",
        items: ["Skincare", "Haircare", "Shaving & Grooming", "Oral Care"]
      },
      {
        title: "Makeup & Fragrance",
        items: ["Makeup", "Perfumes", "Deodorants", "Makeup Tools"]
      },
      {
        title: "Health Equipment",
        items: ["Thermometers", "Blood Pressure Monitors", "Massagers", "Weighing Scales"]
      },
      {
        title: "Vitamins & Supplements",
        items: ["Multivitamins", "Herbal Supplements", "Weight Management"]
      }
    ]
  },
  {
    name: "Fashion",
    image: "/imgs/fashion.svg",
    sections: [
      {
        title: "Men's Fashion",
        items: ["T-Shirts", "Shirts", "Trousers & Jeans", "Shoes", "Watches", "Bags"]
      },
      {
        title: "Women's Fashion",
        items: ["Dresses", "Tops & Blouses", "Skirts", "Shoes", "Jewelry", "Handbags"]
      },
      {
        title: "Kids & Teens",
        items: ["Boys' Clothing", "Girls' Clothing", "Kids' Footwear", "School Bags"]
      },
      {
        title: "Accessories",
        items: ["Sunglasses", "Caps & Hats", "Belts", "Scarves"]
      }
    ]
  },
  {
    name: "Baby, Kids & Toys",
    image: "/imgs/baby-kids.svg",
    sections: [
      {
        title: "Baby Essentials",
        items: ["Diapers", "Baby Food", "Wipes", "Baby Bath & Skin"]
      },
      {
        title: "Nursery",
        items: ["Cots & Cribs", "High Chairs", "Strollers", "Baby Carriers"]
      },
      {
        title: "Toys & Games",
        items: ["Educational Toys", "Action Figures", "Dolls", "Puzzles", "Outdoor Toys"]
      }
    ]
  },
  {
    name: "Jobs",
    image: "/imgs/jobs.svg",
    sections: [
      {
        title: "Job Categories",
        items: ["IT & Software", "Sales & Marketing", "Customer Service", "Construction", "Education", "Healthcare"]
      },
      {
        title: "Employment Types",
        items: ["Full-time", "Part-time", "Internships", "Contract", "Remote Jobs"]
      }
    ]
  },
  {
    name: "Animals & Pets",
    image: "/imgs/pets.svg",
    sections: [
      {
        title: "Pets for Sale",
        items: ["Dogs", "Cats", "Birds", "Fish", "Rabbits", "Reptiles"]
      },
      {
        title: "Pet Supplies",
        items: ["Pet Food", "Toys & Treats", "Pet Beds", "Leashes & Collars", "Cages & Aquariums"]
      },
      {
        title: "Pet Services",
        items: ["Grooming", "Training", "Veterinary Services"]
      }
    ]
  }
];

// Delivery Options Data
export const deliveryDayOptions = [
  { value: "same-day", label: "Same Day Delivery" },
  { value: "next-day", label: "Next Day Delivery" },
  { value: "2-3-days", label: "2-3 Days" },
  { value: "3-5-days", label: "3-5 Days" },
  { value: "5-7-days", label: "5-7 Days" },
  { value: "1-2-weeks", label: "1-2 Weeks" },
  { value: "2-4-weeks", label: "2-4 Weeks" },
  { value: "pickup-only", label: "Pickup Only" }
];

export const productConditionOptions = [
  { value: "new", label: "New" },
  { value: "like-new", label: "Like New" },
  { value: "excellent", label: "Excellent" },
  { value: "good", label: "Good" },
  { value: "fair", label: "Fair" },
  { value: "poor", label: "Poor" },
  { value: "for-parts", label: "For Parts/Not Working" }
];
