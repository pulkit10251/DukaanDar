import Product from "../../models/Product";
import CategoryLocal from "../../models/CategoryLocal";

const Pulses = new CategoryLocal(
  "Pulses",
  "https://shop.jivabhumi.com/image/cache/catalog/ProductImages/Toor_Dal_DSC5051-500x350.jpg",
  8,
  2,
  [
    new Product(
      "Arhar daal",
      "8-1",
      "https://shop.jivabhumi.com/image/cache/catalog/ProductImages/Toor_Dal_DSC5051-500x350.jpg",
      147,
      160,
      1,
      "Kg",
      "January 5,2020",
      "6-months",
      8,
      true,
    ),
    new Product(
      "Rajma",
      "8-2",
      "https://thumbs.dreamstime.com/z/red-white-color-raw-whole-speckled-chitra-rajma-kidney-beans-chitra-rajma-173260711.jpg",
      110,
      130,
      1,
      "Kg",
      "January 5, 2020",
      "6-months",
      8,
      true,
    ),
    new Product(
      "Mung Daal",
      "8-3",
      "https://thumbs.dreamstime.com/b/split-mung-bean-lentils-also-know-as-mungbean-green-moong-bean-mung-gram-vigna-radiata-green-gram-golden-gram-legumes-moong-bean-159011526.jpg",
      84,
      100,
      1,
      "Kg",
      "Feb 20, 2020",
      "6 months",
      8,
      true,
    ),
    new Product(
      "Masoor Daal",
      "8-4",
      "https://thumbs.dreamstime.com/b/whole-masoor-dal-brownish-red-color-dry-whole-masoor-dal-lentils-150927138.jpg",
      100,
      120,
      1,
      "Kg",
      "5 March,2020",
      "6 months",
      8,
      true,
    ),
  ]
);

export default Pulses;
