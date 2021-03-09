/* 
Your index.js file inside the client folder should import the main function of your application javascript,
 it should import your scss, and it should export your main function from your application javascript.
  But in order to import, where will you need to export it?
*/

import '../Client/styles/main.scss'
import {action , UI , getData , postData} from './js/app'

export {action , UI , postData , getData}