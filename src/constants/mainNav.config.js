import Home from '../components/pages/Home/Home';
import SearchResults from '../components/pages/SearchResults/SearchResults';
import SeriesDetails from '../components/pages/SeriesDetails/SeriesDetails';
import ChapterDetails from '../components/pages/ChapterDetails/ChapterDetails';

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
  {
    name: 'Chapter Details',
    path: '/chapter-details/:id',
    showNavLink: false,
    component: ChapterDetails,
  },
];

export default mainNavConfig;