import neemTea from "../assets/products/neem.png";
import orangeTea from "../assets/products/orange.png";
import puerhTea from "../assets/products/puerh.png";
import redTea from "../assets/products/red.png";
import turquoiseTea from "../assets/products/turquoise.png";

const Products = [
  {
    id: 1,
    brandName: "Jiyaba",
    image: turquoiseTea,
    name: "Redtox Water",
    price: "₹75",
    category: "Bevarage",
    size: "350 ml",
    featured: true,
    slug: "redtox-water",
    desc: "Where does this come from: this water is extracted from the roots of the red sanders plant. It's a unique process we're using to get water from red sanders roots. By drinking this water, you can enjoy additional health benefits. Additionally, the regular water used in this process is purified RO drinking water.",
  },

  {
    id: 2,
    brandName: "Jiyaba",
    image: redTea,
    name: "Redjiya",
    price: "₹100",
    category: "Bevarage",
    size: "350 ml",
    featured: true,
    slug: "red-jiya-water",
    desc: "Where does this come from: It's extracted from the roots of the red sanders plant using a special method. By drinking this water, you can enjoy extra health benefits along with a pleasant taste. Furthermore, the regular water used in this process is purified RO drinking water, and we've also added some natural sugars that are beneficial to our health.",
  },
  {
    id: 3,
    brandName: "Jiyaba",
    image: puerhTea,
    name: "Pure Red Sanders Face Powder",
    price: "₹200",
    category: "Powder",
    size: "200 gms",
    featured: true,
    slug: "red-sanders-face-powder",
    desc: "Where does this come from: It's obtained from the logs of the red sanders plant. We'll chop it into small pieces and then use machines to turn it into a fine powder. This fine powder can be applied directly to your skin by mixing it with rose water or regular water. As for its uses: it helps in preventing tanning, aging, and moisturizing the skin. It also brightens the skin tone, reduces pigmentation, fights acne, protects the skin, and soothes burns.",
  }
];

export default Products;
