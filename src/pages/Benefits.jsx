import "../styles/benefits.css";
import Accordion from "../components/AccordionItem";

const items = [
  {
    title: "Anti-Cancer Properties",
    description:
      "Studies suggest that Red Sandalwood may possess compounds that could aid in fighting cancer.",
  },
  {
    title: "Diabetes Care & Blood Sugar Control",
    description:
      "Red Sandalwood's compounds regulate blood sugar levels, aiding those with diabetes, and enhance insulin secretion, protecting pancreatic cells.",
  },
  {
    title: "Blood Purification & Circulation Improvement",
    description:
      "Red Sandalwood purifies blood, aids fluid retention, and promotes urination, cleansing the urinary tract. Its diuretic properties remove toxins. Additionally, Red Sandalwood extract supports healthy blood circulation and nerve function.",
  },
  {
    title: "Gastritis Treatment",
    description:
      "Red Sandalwood has properties that can help treat gastritis, soothing inflammation and discomfort in the stomach lining.",
  },  
  {
    title: "Ulcer Bleeding Prevention",
    description:
      "Red Sandalwood has properties that may help prevent bleeding from ulcers, promoting healing and reducing discomfort.",
  },
  {
    title: "Antibiotic & Parasite Prevention",
    description:
      "Red Sandalwood possesses antibiotic qualities that may help prevent parasitic infections and protect against certain pathogens.",
  },
  {
    title: "Cooling Agent",
    description:
      "Red Sandalwood can be used as a cooling agent, providing relief from heat and soothing the skin.",
  },
  {
    title: "Hair Health & Growth Support",
    description:
      "Red Sandalwood isn't just for skin; it's great for hair too. It nourishes the scalp, strengthens hair follicles, and promotes growth. Regular use fights dandruff, prevents hair loss, and improves texture, leaving hair healthy and full.",
  },
  {
    title: "Inflammation Relief & Comfort",
    description:
      "Red Sandalwood calms inflammation, easing pain and discomfort. It's great for skin issues like eczema and psoriasis, soothing redness and irritation. Use it in oils, balms, or creams for relief.",
  },
  {
    title: "Eye Disease Relief",
    description:
      "Red Sandalwood is known to have benefits for eye health, potentially assisting in the treatment of certain eye diseases.",
  },
  {
    title: "Pain Reduction & First Aid",
    description:
      "Red Sandalwood acts as an ointment for treating snake bites and scorpion stings, offering initial relief and aiding recovery. Its anti-inflammatory properties also reduce pain associated with various conditions, providing soothing relief.",
  },
  {
    title: "Total Skin Care Solution",
    description:
      "Red Sandalwood is a natural skincare ingredient known for its ability to fade dark spots, even skin tone, and reduce irritation. It fights signs of aging like wrinkles, balances oily skin, and helps reduce acne with gentle exfoliation. Its detoxifying and healing properties also aid in wound recovery and scar reduction, leaving skin clearer, brighter, and more youthful.",
  },
  {
    title: "Spiritual Significance",
    description:
      "Red Sandalwood is highly regarded in many cultures for its spiritual importance. It's commonly used in rituals, ceremonies, and meditation practices to enhance focus, mindfulness, and spiritual connection.",
  },
  {
    title: "Aromatic & Soothing",
    description:
      "Red Sandalwood has a pleasant scent that helps relax and calm the mind, making it a favourite for aromatherapy. It can relieve stress, anxiety, and promote relaxation.",
  },
  {
    title: "Flavoring Agent",
    description:
      "Red sandalwood is sometimes used to give a unique taste to alcoholic drinks. Its mild, natural flavor adds something special to the beverages, making them more enjoyable.",
  },
];

function Benefit() {
  return (
    <div className="benefits-container">
      <div style={{ overflow: "hidden", fontSize:"25px" }}>
        <marquee
          behavior="scroll"
          direction="left"
          style={{ width: "100%", whiteSpace: "nowrap",  scrollamount: '10', color:'#CB625F'}}
        >
        <p>  Welcome to Red Sanders Family. A Taste of Authenticity, Straight , from the Heart wood of the Red Sanders
              Tree to Your Body.</p>
        </marquee>
      </div>
      <p className="benefits-intro">
      Red Sandalwood (Pterocarpus santalinus) is a protected species under CITES. 
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
