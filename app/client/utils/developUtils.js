import store from 'reduxStore/store';

if (process.env.NODE_ENV === 'development') {
    window.gstore = store;
}
