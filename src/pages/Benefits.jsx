import "../styles/benefits.css";
import Accordion from "../components/AccordionItem";

const items = [
  {
    title: "Diabetes Management",
    description: "Red Sandalwood contains compounds that aid in regulating blood sugar levels, making it beneficial for individuals with diabetes."
  },
  {
    title: "Gastritis Treatment",
    description: "Red Sandalwood has properties that can help treat gastritis, soothing inflammation and discomfort in the stomach lining."
  },
  {
    title: "Pain Reduction",
    description: "The anti-inflammatory properties of Red Sandalwood can help reduce pain associated with various conditions, providing relief."
  },
  {
    title: "Eye Disease Relief",
    description: "Red Sandalwood is known to have benefits for eye health, potentially assisting in the treatment of certain eye diseases."
  },
  {
    title: "Anti-Cancer Properties",
    description: "Studies suggest that Red Sandalwood may possess compounds that could aid in fighting cancer, though more research is needed in this area."
  },
  {
    title: "Blood Sugar Regulation",
    description: "Red Sandalwood components help regulate blood sugar levels, enhancing insulin secretion and protecting pancreatic cells."
  },
  {
    title: "Ulcer Bleeding Prevention",
    description: "Red Sandalwood has properties that may help prevent bleeding from ulcers, promoting healing and reducing discomfort."
  },
  {
    title: "Hair Health and Growth",
    description: "Red Sandalwood nourishes the scalp, strengthens hair follicles, and promotes hair growth, improving overall hair health."
  },
  {
    title: "Cooling Agent",
    description: "Red Sandalwood can be used as a cooling agent, providing relief from heat and soothing the skin."
  },
  {
    title: "Skin Condition Treatment",
    description: "Red Sandalwood has been traditionally used to treat various skin conditions due to its anti-inflammatory and soothing properties."
  },
  {
    title: "Inflammation Reduction",
    description: "Red Sandalwood helps decrease inflammation in the body, providing relief from pain and discomfort associated with inflammatory conditions."
  },  
  {
    title: "First-Aid Use",
    description: "Red Sandalwood can be applied as an ointment for treating snake bites and stings from scorpions, offering initial relief and aiding in recovery."
  },
  {
    title: "Aromatic and Soothing",
    description: "Red Sandalwood has a pleasant scent that helps relax and calm the mind, making it a favorite for aromatherapy. It can relieve stress, anxiety, and promote relaxation."
  },
  {
    title: "Spiritual Significance",
    description: "Red Sandalwood is highly regarded in many cultures for its spiritual importance. It's commonly used in rituals, ceremonies, and meditation practices to enhance focus, mindfulness, and spiritual connection."
  }, 
  {
    title: "Hair Health",
    description: "Red Sandalwood isn't just for skin care; it also benefits hair health. It nourishes the scalp, strengthens hair follicles, and promotes hair growth. Using red sandalwood paste or oil regularly can fight dandruff, prevent hair loss, and improve hair texture, leaving it healthy and voluminous."
  },
  {
    title: "Blood Sugar Regulation",
    description: "Red Sandalwood contains components that regulate blood sugar levels, enhancing insulin secretion and protecting pancreatic cells. This makes it helpful for managing diabetes."
  },
  {
    title: "Blood Purification",
    description: "Red Sandalwood is known for purifying the blood and aiding in fluid retention. Its diuretic properties promote urination, cleansing the urinary tract and removing toxins from the body."
  },
  {
    title: "Circulation Improvement",
    description: "Red Sandalwood extract supports healthy blood circulation and nerve function. Its benefits for the circulatory system make it popular in masks and scrubs, providing deep cleansing and rejuvenation for the skin."
  },
  {
    title: "Skin Brightening",
    description: "Red sandalwood enhances complexion and gives the skin a natural glow. Using it regularly can make your skin look more radiant and youthful."
  },
  {
    title: "Acne Treatment",
    description: "With its antimicrobial and anti-inflammatory properties, red sandalwood is effective in treating acne. It reduces bacteria on the skin and calms inflammation, helping prevent and heal acne breakouts."
  },
  {
    title: "Anti-Aging Effects",
    description: "Red sandalwood helps reduce wrinkles, fine lines, and age spots, giving you a more youthful appearance."
  },
  {
    title: "Skin Soothing and Calming",
    description: "Red sandalwood has cooling and soothing properties, making it great for calming irritated and sensitive skin. It provides relief from itchiness, redness, and discomfort."
  },
  {
    title: "Oil Balancing",
    description: "Red sandalwood helps balance oil production in the skin, making it suitable for oily and combination skin types. It controls excess oil secretion and prevents clogged pores, leading to clearer skin."
  },
  {
    title: "Skin Detoxification",
    description: "Red sandalwood cleanses the skin and removes impurities with its natural detoxifying properties. It helps eliminate toxins and pollutants, promoting healthier-looking skin."
  },
  {
    title: "Skin Lightening",
    description: "Red sandalwood fades dark spots, hyperpigmentation, and blemishes, resulting in a more even-toned complexion."
  },
  {
    title: "Anti-Inflammatory Action",
    description: "Red sandalwood soothes various skin conditions like eczema, psoriasis, and dermatitis with its anti-inflammatory properties. It calms skin irritation and reduces redness."
  },
  {
    title: "Natural Exfoliation",
    description: "Red sandalwood acts as a gentle exfoliant, removing dead skin cells and unclogging pores. Regular exfoliation with red sandalwood can improve skin texture and promote smoother skin."
  },
  {
    title: "Skin Healing",
    description: "Red sandalwood aids in the healing of wounds, cuts, and burns due to its antibacterial and antiseptic properties. It accelerates the healing process, prevents infections, and reduces scarring."
  },
  {
    title: "Antibiotic and Parasite Prevention",
    description: "Red Sandalwood possesses antibiotic qualities that may help prevent parasitic infections and protect against certain pathogens."
  },
  {
    title: "Anti-Inflammatory and Pain Relief",
    description: "Red Sandalwood has properties that reduce inflammation, helping with conditions like arthritis and muscle soreness. It can ease pain and discomfort when applied as oils, balms, or creams."
  }
];


function Benefit() {
  return (
    <div className="benefits-container">
      <p className="benefits-intro">
        These days, many people hesitate to talk about "red sandalwood" because
        it's often associated with trafficking. But red sandalwood isn't just
        about illegal trade. It actually has many health benefits that are worth
        knowing about. Have you ever wondered why red sandalwood is so
        expensive, or why it's exported to other countries? While some may know
        that it can be used to make furniture, its health benefits go beyond
        just being a material for furniture items.
      </p>
      <h2 className="section-title">Benefits of Red Sandalwood</h2>
      <Accordion items={items} />
    </div>
  );
}

export default Benefit;
