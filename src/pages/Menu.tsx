import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { PageShell } from "../components/PageShell";
import { SectionHeading } from "../components/SectionHeading";

const cateringMenu = {
  title: "Catering Menu",
  image: "/images/IMG_0142.jpeg",
  desc: "Designed for events, parties, corporate functions, and celebrations, featuring West African inspired cuisine with modern flair. Menus can be customized based on guest count, dietary needs, and service style.",
  note: "Minimum orders start at $750",
  sections: [
    {
      title: "Appetizers",
      items: [
        "Vegetable Spring Rolls",
        "Shrimp Tempura",
        "Beef or Vegetable Samosas",
        "Fresh Fruit Cups with honey agave",
        "Chicken Skewers",
      ],
    },
    {
      title: "Proteins",
      items: [
        "Chicken Wings (Plain, Suya, Jerk, Lemon Pepper, Peri-Peri, Sweet Chili)",
        "Salmon",
        "Garlic Butter Shrimp",
        "Oxtail",
        "Lamb Chops",
      ],
    },
    {
      title: "Sides",
      items: [
        "HG's Five-Star Mac & Cheese",
        "Roasted Asparagus",
        "Garlic Herb Sauteed String Beans",
        "Jollof Rice",
        "Fried Rice",
        "Balsamic Glazed Brussel Sprouts",
        "Candied Yams",
      ],
    },
    {
      title: "Add-Ons",
      items: [
        "Signature Dips",
        "Table Decor Set Up",
        "Beverage Service (Water, Juice, Soft Drinks)",
        "Disposable Servingware & Setup",
      ],
    },
  ],
};

const brunchMenu = {
  title: "Brunch Menu",
  desc: "Perfect for baby showers, bridal showers, birthdays, and intimate daytime gatherings.",
  sections: [
    {
      title: "Brunch Favorites",
      items: [
        "Fluffy Scrambled Eggs",
        "Herb-Roasted Breakfast Potatoes",
        "Chicken & Belgian Waffles",
        "French Toast w/ Berry Compote",
      ],
    },
    {
      title: "Proteins",
      items: [
        "Sausage",
        "Fluffy Scrambled Eggs", // Listed twice in image, maybe a mistake but I'll follow image for now or de-dupe. Wait, image says Proteins: Sausage, Fluffy Scrambled Eggs, Bacon. Favorites has Scrambled Eggs too. I will keep as is but maybe remove dupes if obvious. Actually, image has "Fluffy Scrambled Eggs" under Favorites AND Proteins. I'll keep it.
        "Bacon (Beef, Turkey, Pork)",
      ],
    },
    {
      title: "Sides & Extras",
      items: [
        "HG's Five-Star Mac & Cheese",
        "Fruit Platter",
        "Asparagus or Seasonal Vegetables",
      ],
    },
    {
      title: "Brunch Beverages",
      items: [
        "Juice Selection (Apple, Orange, Strawberry Lemonade, Cranberry)",
        "Mimosas",
        "Bottled Water",
        "Coffee & Tea Service (available upon request)",
      ],
    },
  ],
};

const privateDinnerMenu = {
  title: "Private Dinner Menu",
  desc: "Curated, multi-course West African–inspired dining experiences for intimate gatherings, anniversaries, and special occasions.",
  sections: [
    {
      title: "First Course",
      items: [
        "Cucumber Salad w/ cherry tomatoes, pickled onions, red bell pepper, fresh herbs and with House Vinaigrette",
        "Lobster Bisque",
        "Spiced Lamb Meatballs w/ Tahini Sauce",
        "Steak Crostini",
        "Jumboi Lobster Crab Cake",
      ],
    },
    {
      title: "Main Course (Choose Two)",
      items: [
        "Pan-Seared Salmon with Garlic Butter",
        "Suya-Spiced Chicken Wings or Thighs",
        "Grilled Suya Lamb Chops",
        "Sous Vide Rosemary and Thyme Steak topped with Garlic Compound Butter",
      ],
    },
    {
      title: "Sides (Choose Two)",
      items: [
        "Creamy Mac & Cheese",
        "Garlic Asparagus",
        "Honey Glazed Carrots with ginger and thyme",
        "Brocclini with Lemon Butter Sauce",
        "Garlic Herb Mashed Potatoes",
        "Jollof Rice",
        "Thai Basil Fried Rice",
      ],
    },
    {
      title: "Dessert",
      items: [
        "Apple Crumble w/ Carmel Drizzle Vanilla Bean Ice Cream",
        "Peach Cobbler",
        "Creme Brulee",
      ],
    },
  ],
  footer:
    "Menus are fully customizable. Dietary accommodations, vegetarian options, and special requests are available with advance notice. Pricing may vary based on menu selections, guest count, and service style.",
};

export default function Menu() {
  const [activeTab, setActiveTab] = useState<"catering" | "brunch" | "private">(
    "catering",
  );

  const menus = {
    catering: cateringMenu,
    brunch: brunchMenu,
    private: privateDinnerMenu,
  };

  const activeMenu = menus[activeTab];

  return (
    <PageShell>
      <section className="grain bg-hero-glow">
        <div className="container-pad py-7 sm:py-9">
          <SectionHeading
            eyebrow="Menus"
            title="Curated for every occasion."
            description="Explore our sample menus. We customize every detail to match your taste and vision."
          />

          <div className="mt-10 flex flex-wrap gap-2 sm:gap-4">
            {(["catering", "brunch", "private"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-full px-6 py-2.5 text-sm font-medium transition-all ${
                  activeTab === tab
                    ? "bg-ink-950 text-ivory-50 ring-2 ring-ink-950 ring-offset-2 ring-offset-ivory-100"
                    : "bg-white text-ink-900 shadow-sm hover:bg-ink-50"
                }`}
              >
                {tab === "catering"
                  ? "Catering"
                  : tab === "brunch"
                    ? "Brunch"
                    : "Private Dinner"}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="container-pad py-14 sm:py-18">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="card p-8 sm:p-10"
          >
            <div className="border-b border-ink-900/10 pb-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <h2 className="font-display text-3xl text-ink-950 sm:text-4xl">
                    {activeMenu.title}
                  </h2>
                  <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-900/70">
                    {activeMenu.desc}
                  </p>
                  {"note" in activeMenu && (
                    <p className="mt-4 font-medium text-gold-700">
                      {activeMenu.note}
                    </p>
                  )}
                </div>
                {"image" in activeMenu && (
                  <div className="shrink-0 lg:w-1/3">
                    <img
                      src={activeMenu.image as string}
                      alt={activeMenu.title}
                      className="aspect-[4/3] w-full rounded-xl object-cover shadow-sm sm:aspect-[3/2] lg:aspect-[4/3]"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="mt-10 grid gap-10 md:grid-cols-2">
              {activeMenu.sections.map((section) => (
                <div key={section.title}>
                  <h3 className="font-display text-xl text-ink-950">
                    {section.title}
                  </h3>
                  <ul className="mt-4 space-y-2.5">
                    {section.items.map((item, i) => (
                      <li
                        key={i}
                        className="flex gap-3 text-sm text-ink-900/80 leading-relaxed"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {"footer" in activeMenu && (
              <div className="mt-12 border-t border-ink-900/10 pt-6">
                <p className="text-sm italic text-ink-900/60">
                  {activeMenu.footer}
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </section>
    </PageShell>
  );
}
