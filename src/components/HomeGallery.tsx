import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { useState } from "react";
import { X } from "lucide-react";

const images = [
  "/galery/74006981.webp",
  "/galery/74008626-EDIT.webp",
  "/galery/74008646.webp",
  "/galery/74008710.webp",
  "/galery/74008728.webp",
  "/galery/74008750.webp",
  "/galery/74008788.webp",
  "/galery/74008834.webp",
];

export function HomeGallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section className="bg-white py-14 sm:py-18">
      <div className="container-pad">
        <SectionHeading
          eyebrow="Gallery"
          title="A visual taste."
          description="Selections from our recent private dinners, events, and seasonal menus."
        />

        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {images.map((src, idx) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="group relative aspect-square cursor-pointer overflow-hidden rounded-xl bg-gray-100"
              onClick={() => setSelectedImage(src)}
            >
              <img
                src={src}
                alt={`Gallery image ${idx + 1}`}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
          >
            <X className="h-6 w-6" />
          </button>
          <motion.img
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            src={selectedImage}
            alt="Gallery view"
            className="max-h-[90vh] max-w-full rounded-lg object-contain shadow-2xl"
          />
        </div>
      )}
    </section>
  );
}
