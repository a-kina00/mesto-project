//Не лезь Антон, она тебя сожрет
//et dixit diabolo ne vadas moron illa te devorabit et pugnavit cum UserInfo diebus et duabus noctibus et cum lucratus est daemonium signavit in atriis suis

export default class UserInfo {
  constructor({nameSelector, titleSelector}, {getUserInfo, setUserInfo, closePopup, renderLoading}, {saveNewInfoBtn, profilePicture}) {
    this._nameSelector = nameSelector
    this._titleSelector = titleSelector
    this._getUserInfo = getUserInfo
    this._setUserInfo = setUserInfo
    this._closePopup = closePopup
    this._profilePicture = profilePicture
    this._saveNewInfoBtn = saveNewInfoBtn
    this._renderLoading = renderLoading
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
}
