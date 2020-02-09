import { createStore } from 'redux';
import { DesignConverterApp, initialState } from './reducer'; 
 
export const store = createStore(DesignConverterApp, initialState);
