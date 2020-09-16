import {SAVE_PHONE} from '../constants/phone'

const initPhone = localStorage.getItem('phone') || ''

export default function phone (prevState = initPhone, action) {
  switch (action.type) {
    case SAVE_PHONE:
      return action.data  
    default: 
      return prevState
  }

}