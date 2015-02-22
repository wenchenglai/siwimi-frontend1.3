import DS from 'ember-data';

export default DS.RESTAdapter.extend({
    host: 'http://localhost:8088'
    //host: 'http://10.0.0.5:8088'
    //host: 'http://199.223.236.115:8088/xiwamirest-0.0.1',
    //namespace: 'xiwamirest-0.0.1'
    //headers: { 
    //'Content-Type': 'application/json'
    //}
});
