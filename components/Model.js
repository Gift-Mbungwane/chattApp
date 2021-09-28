class Model {
  uid;
  userName;
  surName;
  email;
  mobile;
  photo;
  password;
  users;
  messages;

  constructor() {}

  setUid(uid) {
    this.uid = uid;
  }

  setName(name) {
    this.userName = name;
  }
  setSurname(surname) {
    this.surName = surname;
  }

  setEmail(email) {
    this.email = email;
  }

  setMobile(mobile) {
    this.mobile = mobile;
  }

  setPhoto(photo) {
    this.photo = photo;
  }

  setPassword(password) {
    this.password = password;
  }
  setUsers(users) {
    this.users = users;
  }
  setMessages(messages) {
    this.messages = messages;
  }
}

const globalUserModel = new Model();
export default globalUserModel;
