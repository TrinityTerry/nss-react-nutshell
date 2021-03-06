// const baseUrl = "http://localhost:8088";
const baseUrl = "https://nss-react-nutshell.herokuapp.com";


const dbAPI = {
  getUsers() {
    return fetch(`${baseUrl}/users`).then(resp => resp.json());
  },
  getFriends(currentUserId) {
    return fetch(`${baseUrl}/friends?active_userId=${currentUserId}&_expand=user`).then(resp => resp.json());
  },
  getObjectByResource(resource, userId) {
    return fetch(
      `${baseUrl}/${resource}/?userId=${userId}&_expand=user`
    ).then(resp => resp.json());
  },
  getObjectByResourceNoExpand(resource, userId) {
    return fetch(
      `${baseUrl}/${resource}/?userId=${userId}`
    ).then(resp => resp.json());
  },
  postObjectByResource(resource, resourceObject) {
    return fetch(`${baseUrl}/${resource}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(resourceObject)
    }).then(resp => resp.json());
  },
  deleteObjectByResource(resource, id) {
    return fetch(`${baseUrl}/${resource}/${id}`, {
      method: "DELETE"
    });
  },
  putObjectByResource(resource, resourceObject) {
    return fetch(`${baseUrl}/${resource}/${resourceObject.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(resourceObject)
    }).then(resp => resp.json());
  },
  patchObjectByResource(resource, id, keyValueObj) {
    return fetch(`${baseUrl}/${resource}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(keyValueObj)
    }).then(resp => resp.json());
  },
  getMessagesExpanded() {
    return fetch(`${baseUrl}/messages?_expand=user`).then(resp => resp.json());
  },
  fetchObjectById(resource, id) {
    return fetch(`${baseUrl}/${resource}/${id}`).then(resp => resp.json());
  },
  editResource (resource, resourceObject) {
    return fetch(`${baseUrl}/${resource}/${resourceObject.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(resourceObject)
    });
  },
  searchUsers(property, query) {
    return fetch(`${baseUrl}/users?${property}_like=${query}`).then(resp => resp.json());

  },
  getItemByResource(resourse) {
    return fetch(`${baseUrl}/${resourse}`).then(resp => resp.json());
  }
};

export default dbAPI;

