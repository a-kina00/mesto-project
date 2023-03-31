import { api } from "./api.js"
import { renderLoading } from "../utils/utils.js"
import { saveNewInfoBtn } from '../utils/const.js';

export default class UserInfo {
  constructor({nameSelector, titleSelector}, {getUserInfo, setUserInfo}) {
    this._nameSelector = nameSelector
    this._titleSelector = titleSelector
    this._getUserInfo = getUserInfo
  }

  // getUser() {
  //   // return api.setServerInfo()
  //   this._getUserInfo()
  //     .then((obj) => {
  //       console.log(obj);
  //       return obj = { name: obj.name, title: obj.about }
  //     })
  // }

  getUserInfo() {
    return api.setServerInfo()
    .then((obj) => {
      return obj = {name: obj.name, title: obj.about}
    })
  }

  setUserInfo(newUserName, newUserTitle) {
    api.changeServerInfo(newUserName, newUserTitle)
    .then((result) => {
      const name = document.querySelector(this._nameSelector)
      const title = document.querySelector(this._titleSelector)

      name.textContent = result.name
      title.textContent = result.about
      //newEditPopup.close() <-- Когда сможешь перенести эту часть из UserInfo, раскомментируй
    })

    .catch((err) => {
      console.log(err);
    })

    .finally(() => {
      renderLoading(saveNewInfoBtn, false)
    })
  }
}
