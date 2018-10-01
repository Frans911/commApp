import { HomePage } from "../pages/home/home";

 const pages: Array<{ icon: any, title: string, component: any }> = [
    { icon: 'home', title: 'Home', component: HomePage },
    // { icon: 'calendar', title: 'Events', component: 'ViewEventPage' },
    // { icon: 'clipboard', title: 'Reports', component: 'ListPage' },
    // { icon: 'git-network', title: 'Suggestions', component: 'SuggestionPage' },
    // { icon: 'globe', title: 'Jobs/Vacancies', component: 'ViewjobsPage' },
    // { icon: 'flag', title: 'Report Member', component: 'ReportuserPage' },
    { icon: 'contact', title: 'Contact Us', component: 'ContactusPage' },
    { icon: 'help', title: 'About', component: 'AboutPage' },
    {icon: 'log-in',title: 'Sign In', component: 'LoginPage'}
  ];


 export const sideMenuObj = pages; 
// this.pages = [
//     { icon: 'home', title: 'Home', component: HomePage },
//     { icon: 'calendar', title: 'Events', component: 'ViewEventPage' },
//     { icon: 'clipboard', title: 'Reports', component: 'ListPage' },
//     { icon: 'git-network', title: 'Suggestions', component: 'SuggestionPage' },
//     { icon: 'globe', title: 'Jobs/Vacancies', component: 'ViewjobsPage' },
//     { icon: 'flag', title: 'Report Member', component: 'ReportuserPage' },
//     { icon: 'contact', title: 'Contact Us', component: 'ContactusPage' },
//     { icon: 'help', title: 'About', component: 'AboutPage' }
//   ];