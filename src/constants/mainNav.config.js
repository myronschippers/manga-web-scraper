import Home from '../components/pages/Home/Home';
import SearchResults from '../components/pages/SearchResults/SearchResults';
import SeriesDetails from '../components/pages/SeriesDetails/SeriesDetails';

const mainNavConfig = [
  {
    name: 'Home',
    path: '/',
    showNavLink: true,
    component: Home,
  },
  // {
  //   name: 'Search',
  //   path: '/search',
  //   showNavLink: true,
  //   component: SearchResults,
  // },
  // DETAILS PAGE FOR SINGLE SERIES
  {
    name: 'Series Details',
    path: '/series-details/:id',
    showNavLink: false,
    component: SeriesDetails,
  },
];

export default mainNavConfig;