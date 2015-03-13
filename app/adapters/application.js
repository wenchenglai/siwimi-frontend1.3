import DS from 'ember-data';
import ENV from '../config/environment';

export default DS.RESTAdapter.extend({
    host: ENV.apiHost
    //namespace: 'xiwamirest-0.0.1'
    //headers: { 
    //'Content-Type': 'application/json'
    //}
});
