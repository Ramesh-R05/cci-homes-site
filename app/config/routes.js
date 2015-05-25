import loadContent from '../actions/loadContent';
import homeHandler from '../components/home/home';

export default {

    home: {
        path: '/',
        method: 'get',
        handler: homeHandler,
        label: 'Home',
        action: loadContent
    }

}
