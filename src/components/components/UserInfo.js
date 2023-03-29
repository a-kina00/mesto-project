import { api } from "./api.js"
import { renderLoading } from "../utils/utils.js"
import { saveNewInfoBtn } from '../utils/const.js';

export default class UserInfo {
  constructor({nameSelector, titleSelector}) {
    this._nameSelector = nameSelector
    this._titleSelector = titleSelector
  }

  getUserInfo() {
    return api.setServerInfo()
    .then((obj) => {
      return obj = {name: obj.name, title: obj.about}
      // console.log(obj) //{name: obj.name, title: obj.about, as: 123}
    })
  }

  setUserInfo(newUserName, newUserTitle) {
    api.changeServerInfo(newUserName, newUserTitle)
    .then((result) => {
      const name = document.querySelector(this._nameSelector)
      const title = document.querySelector(this._titleSelector)

      name.textContent = result.name
      title.textContent = result.about
    })

    .catch((err) => {
      console.log(err);
    })

    .finally(() => {
      renderLoading(saveNewInfoBtn, false)
    })
  }
}
