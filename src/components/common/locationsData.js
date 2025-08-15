// src/components/common/locationsData.js
export const statesAndCities = [
  {
    name: "Lagos State",
    cities: [
      "Agege", "Ajeromi-Ifelodun", "Alimosho", "Amuwo-Odofin", "Apapa", "Badagry",
      "Epe", "Eti-Osa", "Ibeju-Lekki", "Ifako-Ijaiye", "Ikeja", "Ikorodu", "Kosofe",
      "Lagos Island", "Lagos Mainland", "Mushin", "Ojo", "Oshodi-Isolo", "Shomolu", "Surulere"
    ]
  },
  {
    name: "Abia State",
    cities: ["Aba North", "Aba South", "Arochukwu", "Bende", "Ikwuano", "Isiala Ngwa North", "Isiala Ngwa South", "Isuikwuato", "Obi Ngwa", "Ohafia", "Osisioma", "Ugwunagbo", "Ukwa East", "Ukwa West", "Umuahia North", "Umuahia South", "Umu Nneochi"]
  },
  {
    name: "Abuja (FCT)",
    cities: ["Abaji", "Bwari", "Gwagwalada", "Kuje", "Kwali", "Municipal Area Council"]
  },
  {
    name: "Oyo State",
    cities: ["Ibadan North", "Ibadan North-East", "Ibadan North-West", "Ibadan South-East", "Ibadan South-West", "Ibarapa Central", "Ibarapa East", "Ibarapa North", "Ido", "Irepo", "Iseyin", "Itesiwaju", "Iwajowa", "Kajola", "Lagelu", "Ogbomoso North", "Ogbomoso South", "Ogo Oluwa", "Olorunsogo", "Oluyole", "Ona Ara", "Orelope", "Ori Ire", "Oyo East", "Oyo West", "Saki East", "Saki West", "Surulere"]
  },
  {
    name: "Kano State",
    cities: ["Ajingi", "Albasu", "Bagwai", "Bebeji", "Bichi", "Bunkure", "Dala", "Dambatta", "Dawakin Kudu", "Dawakin Tofa", "Doguwa", "Fagge", "Gabasawa", "Garko", "Garun Mallam", "Gaya", "Gezawa", "Gwale", "Gwarzo", "Kabo", "Kano Municipal", "Karaye", "Kibiya", "Kiru", "Kumbotso", "Kunchi", "Kura", "Madobi", "Makoda", "Minjibir", "Nasarawa", "Rano", "Rimin Gado", "Rogo", "Shanono", "Sumaila", "Takai", "Tarauni", "Tofa", "Tsanyawa", "Tudun Wada", "Ungogo", "Warawa", "Wudil"]
  }
  // Add more states as needed
];

// Shipping Region Options for delivery
export const shippingRegionOptions = [
  { value: "lagos-mainland", label: "Lagos Mainland", deliveryFee: 1500 },
  { value: "lagos-island", label: "Lagos Island", deliveryFee: 2000 },
  { value: "lagos-suburbs", label: "Lagos Suburbs", deliveryFee: 2500 },
  { value: "abuja", label: "Abuja (FCT)", deliveryFee: 3000 },
  { value: "oyo-state", label: "Oyo State", deliveryFee: 3500 },
  { value: "kano-state", label: "Kano State", deliveryFee: 4000 },
  { value: "southwest-nigeria", label: "Southwest Nigeria", deliveryFee: 4500 },
  { value: "southeast-nigeria", label: "Southeast Nigeria", deliveryFee: 5000 },
  { value: "northcentral-nigeria", label: "North Central Nigeria", deliveryFee: 5500 },
  { value: "northeast-nigeria", label: "Northeast Nigeria", deliveryFee: 6000 },
  { value: "northwest-nigeria", label: "Northwest Nigeria", deliveryFee: 6000 },
  { value: "southsouth-nigeria", label: "South South Nigeria", deliveryFee: 5500 },
  { value: "nationwide", label: "Nationwide Delivery", deliveryFee: 7000 }
];
