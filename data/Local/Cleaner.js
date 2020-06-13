import Product from "../../models/Product";
import CategoryLocal from "../../models/CategoryLocal";

const Cleaner = new CategoryLocal(
  "Cleaner",
  "data:image/jpeg;base64,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",
  11,
  3,
  [
    new Product(
      "Lizol",
      "11-1",
      "data:image/jpeg;base64,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",
      147,
      160,
      1,
      "Kg",
      "January 5,2020",
      "6-months",
      11,
      true,
    ),
    new Product(
      "Broom",
      "11-2",
      "data:image/jpeg;base64,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",
      110,
      120,
      1,
      "Piece",
      "January 5, 2020",
      "6-months",
      11,
      true,
    ),
  ]
);

export default Cleaner;
