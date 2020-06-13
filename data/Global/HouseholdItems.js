import CategoryGlobal from "../../models/CategoryGlobal";
import Cleaner from "../Local/Cleaner";
import DishWasher from "../Local/DishWasher";
import Detergents from "../Local/Detergents";
import WashroomCleaner from "../Local/WashroomCleaner";

const HouseholdItems = new CategoryGlobal(
  "Household Items",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSnC_dDG1hm3y4lZPBIt5LX6OCU4MtLg_XA2JTsQaBhZxtPGtAI&usqp=CAU",
  3,
  [Cleaner, DishWasher, Detergents, WashroomCleaner]
);

export default HouseholdItems;
