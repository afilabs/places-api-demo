import BankIcon from "../assets/images/bank_icon.svg";
import BarIcon from "../assets/images/bar_icon.svg";
import GasStationIcon from "../assets/images/gas_station_icon.svg";
import GymIcon from "../assets/images/gym_icon.svg";
import LaundryIcon from "../assets/images/laundry_icon.svg";
import SchoolIcon from "../assets/images/school_icon.svg";
import SupermarketIcon from "../assets/images/supermarket_icon.svg";
import LiquorStoreIcon from "../assets/images/liquor_store_icon.svg";

import BankMarker from "../assets/images/bank_marker.svg";
import BarMarker from "../assets/images/bar_marker.svg";
import GasStationMarker from "../assets/images/gas_station_marker.svg";
import GymMarker from "../assets/images/gym_marker.svg";
import LaundryMarker from "../assets/images/laundry_marker.svg";
import SchoolMarker from "../assets/images/school_marker.svg";
import SupermarketMarker from "../assets/images/supermarket_marker.svg";
import LiquorStoreMarker from "../assets/images/liquor_store_marker.svg";

export const PLACE_TYPE_OPTIONS = [
  {
    value: "locality",
    label: "Locality",
    color: "rgba(107, 200, 0, 1)",
    bgColor: "rgba(107, 200, 0, 0.12)",
    icon: BarIcon,
  },
  {
    value: "political",
    label: "Political",
    color: "rgba(0, 137, 200, 1)",
    bgColor: "rgba(0, 137, 200, 0.12)",
    icon: GasStationIcon,
  },
  {
    value: "university",
    label: "University",
    color: "rgba(200, 190, 0, 1)",
    bgColor: "rgba(200, 190, 0, 0.12)",
    icon: SchoolIcon,
  },
  {
    value: "doctor",
    label: "Doctor",
    color: "rgba(0, 176, 200, 1)",
    bgColor: "rgba(0, 176, 200, 0.12)",
    icon: GymIcon,
  },
  {
    value: "health",
    label: "Health",
    color: "rgba(0, 148, 255, 1)",
    bgColor: "rgba(0, 148, 255, 0.12)",
    icon: GymIcon,
  },
  {
    value: "point_of_interest",
    label: "Point Of Interest",
    bgColor: "rgba(200, 96, 0, 0.12)",
    color: "rgba(200, 96, 0, 1)",
    icon: SupermarketIcon,
  },
  {
    value: "establishment",
    label: "Establishment",
    color: "rgba(255, 61, 23, 1)",
    bgColor: "rgba(255, 61, 23, 0.12)",
    icon: SchoolIcon,
  },
  {
    value: "hospital",
    label: "Hospital",
    color: "rgba(0, 127, 30, 1)",
    bgColor: "rgba(0, 127, 30, 0.12)",
    icon: SchoolIcon,
  },
  {
    valuie: "store",
    label: "Store",
    color: "rgba(255, 61, 23, 1)",
    bgColor: "rgba(255, 61, 23, 0.12)",
    icon: LiquorStoreIcon,
  },
  {
    value: "bank",
    label: "Bank",
    color: "rgba(255, 61, 23, 1)",
    bgColor: "rgba(255, 61, 23, 0.12)",
    icon: BankIcon,
  },
  {
    value: "atm",
    label: "ATM",
    color: "rgba(255, 61, 23, 1)",
    bgColor: "rgba(255, 61, 23, 0.12)",
    icon: BankIcon,
  },
  {
    value: "finance",
    label: "Finance",
    color: "rgba(255, 61, 23, 1)",
    bgColor: "rgba(255, 61, 23, 0.12)",
    icon: BankIcon,
  },
  {
    value: "clothing_store",
    label: "Cloting Store",
    color: "rgba(255, 61, 23, 1)",
    bgColor: "rgba(255, 61, 23, 0.12)",
    icon: LaundryIcon,
  },
  {
    value: "general_contractor",
    label: "General Contractor",
    color: "rgba(255, 61, 23, 1)",
    bgColor: "rgba(255, 61, 23, 0.12)",
    icon: LaundryIcon,
  },
  {
    value: "sublocality_level_1",
    label: "Sublocality Level 1",
    color: "rgba(255, 61, 23, 1)",
    bgColor: "rgba(255, 61, 23, 0.12)",
    icon: LaundryIcon,
  },
  {
    value: "sublocality",
    label: "Sublocality",
    color: "rgba(255, 61, 23, 1)",
    bgColor: "rgba(255, 61, 23, 0.12)",
    icon: LaundryIcon,
  },
];

export const PLACE_MARKERS = {
  locality: BarMarker,
  political: GasStationMarker,
  university: SchoolMarker,
  doctor: GymMarker,
  health: GymMarker,
  point_of_interest: SupermarketMarker,
  establishment: SchoolMarker,
  hospital: SchoolMarker,
  store: LiquorStoreMarker,
  bank: BankMarker,
  atm: BankMarker,
  finance: BankMarker,
  clothing_store: LaundryMarker,
  general_contractor: LaundryMarker,
  sublocality_level_1: LaundryMarker,
  sublocality: LaundryMarker,
};
