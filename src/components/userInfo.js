export default class UserInfo {
  constructor({ nameSelector, titleSelector }, { getUserInfo, setUserInfo, closePopup, renderLoading, setServerPfp }, { saveNewInfoBtn, profilePicture }) {
    this._nameSelector = nameSelector
    this._titleSelector = titleSelector
    this._getUserInfo = getUserInfo
    this._setUserInfo = setUserInfo
    this._closePopup = closePopup
    this._profilePicture = profilePicture
    this._saveNewInfoBtn = saveNewInfoBtn
    this._renderLoading = renderLoading
    this._setServerPfr = setServerPfp
    this._name = document.querySelector(this._nameSelector)
    this._title = document.querySelector(this._titleSelector)
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
        this._name.textContent = result.name
        this._title.textContent = result.about
        this._profilePicture.src = result.avatar
        this._closePopup()
      })

      .catch((err) => {
        console.log(err);
      })

      .finally(() => {
        this._renderLoading(this._saveNewInfoBtn, false)
      })
  }

  setServerPfp(src) {
    this._setServerPfr(src)
  }







}
