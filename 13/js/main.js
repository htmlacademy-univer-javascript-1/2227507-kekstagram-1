import './util.js';
import {createPhotoDescription} from './data.js';
import './picture_editor.js';
import {addFormAction, setUserFormSubmit} from './picture_editor.js';


const PHOTOS = 25;

Array.from({length: PHOTOS}, createPhotoDescription);
addFormAction();
setUserFormSubmit();
