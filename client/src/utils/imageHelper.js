import PakHouse1 from "../images/pak_house_1.jpg";
import PakHouse2 from "../images/pak_house_2.jpg";
import PakHouse3 from "../images/pak_house_3.jpg";
import PakHouse4 from "../images/pak_house_4.jpg";
import PakFlat1 from "../images/pak_flat_1.jpg";
import PakFlat2 from "../images/pak_flat_2.jpg";
import PakPlot1 from "../images/pak_plot_1.jpg";
import PakCommercial1 from "../images/pak_commercial_1.jpg";

// High reliability image assets and curated Pakistan property photography
export const propertyImages = {
  // User attached luxury Pakistani houses & villas
  pakHouse1: PakHouse1,
  pakHouse2: PakHouse2,
  pakHouse3: PakHouse3,
  pakHouse4: PakHouse4,

  // User attached apartments & flats
  pakFlat1: PakFlat1,
  pakFlat2: PakFlat2,

  // User attached residential plots
  pakPlot1: PakPlot1,

  // User attached commercial plaza / building
  pakCommercial1: PakCommercial1,

  // Lahore DHA / Bahria / Gulberg
  dhaLahore: PakHouse1,
  bahriaLahore: PakHouse2,
  gulbergApartment: PakFlat2,
  
  // Islamabad / Margalla & Plots
  islamabadHouse: PakHouse3,
  dhaIslamabadPlot: PakPlot1,
  bahriaRawalpindi: PakHouse4,
  
  // Karachi Sea View & Flats
  cliftonKarachi: PakFlat1,
  seaViewFlat: PakFlat2,
  
  // Commercial Plaza
  commercialPlaza: PakCommercial1,
  multanHouse: PakHouse4,
  
  // Interiors
  interiorLiving: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
  interiorBed: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
  interiorKitchen: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80",
};

export const fallbackPropertyImage = PakHouse1;

export const handleImageError = (e, customFallback = fallbackPropertyImage) => {
  if (e && e.target) {
    e.target.onerror = null; // Prevent infinite loop
    e.target.src = customFallback;
  }
};
