import { ReactComponent as BankIcon } from '../Assets/images/bank_icon.svg';
import { ReactComponent as BarIcon } from '../Assets/images/bar_icon.svg';
import { ReactComponent as GasStationIcon } from '../Assets/images/gas_station_icon.svg';
import { ReactComponent as GymIcon } from '../Assets/images/gym_icon.svg';
import { ReactComponent as LaundryIcon } from '../Assets/images/laundry_icon.svg';
import { ReactComponent as SchoolIcon } from '../Assets/images/school_icon.svg';
import { ReactComponent as SupermarketIcon } from '../Assets/images/supermarket_icon.svg';
import { ReactComponent as LiquorStoreIcon } from '../Assets/images/liquor_store_icon.svg';
import { ReactComponent as CafeIcon } from '../Assets/images/cafe_icon.svg';
import { ReactComponent as RestaurantIcon } from '../Assets/images/restaurant_icon.svg';

import { ReactComponent as BankMarker } from '../Assets/images/bank_marker.svg';
import { ReactComponent as CafeMarker } from '../Assets/images/cafe_marker.svg';
import { ReactComponent as BarMarker } from '../Assets/images/bar_marker.svg';
import { ReactComponent as GasStationMarker } from '../Assets/images/gas_station_marker.svg';
import { ReactComponent as GymMarker } from '../Assets/images/gym_marker.svg';
import { ReactComponent as LaundryMarker } from '../Assets/images/laundry_marker.svg';
import { ReactComponent as SchoolMarker } from '../Assets/images/school_marker.svg';
import { ReactComponent as SupermarketMarker } from '../Assets/images/supermarket_marker.svg';
import { ReactComponent as LiquorStoreMarker } from '../Assets/images/liquor_store_marker.svg';
import { ReactComponent as RestaurantMarker } from '../Assets/images/restaurant_marker.svg';

export const PLACE_TYPES = {
  accounting: { label: 'Accounting', dropdownIcon: BankIcon, markerIcon: BankMarker },
  atm: { label: 'ATM', dropdownIcon: BankIcon, markerIcon: BankMarker },
  bank: { label: 'Bank', dropdownIcon: BankIcon, markerIcon: BankMarker },
  bar: { label: 'Bar', dropdownIcon: BarIcon, markerIcon: BarMarker },
  night_club: { label: 'Night Club', dropdownIcon: BarIcon, markerIcon: BarMarker },
  cafe: { label: 'Cafe', dropdownIcon: CafeIcon, markerIcon: CafeMarker },
  bakery: { label: 'Bakery', dropdownIcon: CafeIcon, markerIcon: CafeMarker },
  gas_station: { label: 'Gas Station', dropdownIcon: GasStationIcon, markerIcon: GasStationMarker },
  gym: { label: 'Gym', dropdownIcon: GymIcon, markerIcon: GymMarker },
  laundry: { label: 'Laundry', dropdownIcon: LaundryIcon, markerIcon: LaundryMarker },
  liquor_store: { label: 'Liquor Store', dropdownIcon: LiquorStoreIcon, markerIcon: LiquorStoreMarker },
  primary_school: { label: 'Primary School', dropdownIcon: SchoolIcon, markerIcon: SchoolMarker },
  school: { label: 'School', dropdownIcon: SchoolIcon, markerIcon: SchoolMarker },
  secondary_school: { label: 'Secondary School', dropdownIcon: SchoolIcon, markerIcon: SchoolMarker },
  university: { label: 'University', dropdownIcon: SchoolIcon, markerIcon: SchoolMarker },
  supermarket: { label: 'Supermarket', dropdownIcon: SupermarketIcon, markerIcon: SupermarketMarker },
  convenience_store: { label: 'Convenience Store', dropdownIcon: SupermarketIcon, markerIcon: SupermarketMarker },
  meal_delivery: { label: 'Meal Delivery', dropdownIcon: RestaurantIcon, markerIcon: RestaurantMarker },
  meal_takeaway: { label: 'Meal Takeaway', dropdownIcon: RestaurantIcon, markerIcon: RestaurantMarker },
  restaurant: { label: 'Restaurant', dropdownIcon: RestaurantIcon, markerIcon: RestaurantMarker },
};

export const PLACE_TYPE_OPTIONS = Object.keys(PLACE_TYPES).map((key) => ({
  value: key,
  label: PLACE_TYPES[key].label,
  icon: PLACE_TYPES[key].dropdownIcon,
}));
