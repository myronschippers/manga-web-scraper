import Home from '../components/pages/Home/Home';
import SearchResults from '../components/pages/SearchResults/SearchResults';

const mainNavConfig = [
  {
    name: 'Home',
    path: '/',
    component: Home,
  },
  {
    name: 'Search',
    path: '/search',
    component: SearchResults,
  }
];

export default mainNavConfig;