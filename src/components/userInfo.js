import { profilePicture } from "../utils/const.js";
import { renderLoading } from "../utils/utils.js"
import { saveNewInfoBtn } from '../utils/const.js';
import { newEditPopup } from "../modals.js";

export default class UserInfo {
  constructor({nameSelector, titleSelector}, {getUserInfo, setUserInfo}) {
    this._nameSelector = nameSelector
    this._titleSelector = titleSelector
    this._getUserInfo = getUserInfo
    this._setUserInfo = setUserInfo
  }

  getUserInfo() {
    this._getUserInfo()
    .then((obj) => {
      return this._out = obj
    })
    return this._out
  }

  setUserInfo(name, about) {
    this._setUserInfo(name, about)
    .then((result) => {

      const name = document.querySelector(this._nameSelector)
      const title = document.querySelector(this._titleSelector)

      name.textContent = result.name
      title.textContent = result.about
      profilePicture.src = result.avatar
      newEditPopup.close()
    })

    .catch((err) => {
      console.log(err);
    })

    .finally(() => {
      renderLoading(saveNewInfoBtn, false)
    })
  }
}
