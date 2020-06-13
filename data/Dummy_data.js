import Shop from "../models/Shop";
import PersonalCare from "./Global/PersonalCare";
import Groceries from "./Global/Groceries";
import HouseholdItems from "./Global/HouseholdItems";
import DairyAndBreakfast from "./Global/DairyAndBreakfast";
import InstantFoodAndSnacks from "./Global/InstantFoodandSnacks";

const ShopData = [
  new Shop(
    "15C5GS",
    "Gupta Store",
    "Pawan Gupta",
    "https://images.jdmagicbox.com/comp/delhi/d5/011pxx11.xx11.160520183410.t7d5/catalogue/vipin-store-rohini-sector-15-delhi-general-stores-bml6z1.jpg?clr=",
    "https://s3.amazonaws.com/newpay1site/blog/wp-content/uploads/2019/07/blog-image-for-5th-July-1024x683.jpg",
    "C-block sector-15",
    "Hello Friends ! Welcome to Gupta Store. You will find all the products of daily usage like Rice, pulses, Masala, Oil and other items",
    [
      PersonalCare,
      Groceries,
      HouseholdItems,
      DairyAndBreakfast,
      InstantFoodAndSnacks,
    ],
    "Open except Monday",
    "11:00",
    "21:30",
    "13:30 to 17:00",
  ),
  new Shop(
    "G7745X",
    "Naman Poojan Samagri",
    "Kundan Sharma",
    "",
    "",
    "G Block sector-15",
    "hehe",
    [],
    "Everyday",
    "8:00",
    "21:30",
    "14:00 to 17:00"
  ),
];

export default ShopData;
