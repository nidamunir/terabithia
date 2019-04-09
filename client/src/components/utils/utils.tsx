export const auth = {
  isSignedIn() {
    const localStorageItem = localStorage.getItem("gitHubUser") || "";
    try {
      const gitHubUser = JSON.parse(localStorageItem);
      return gitHubUser.isAuthenticated;
    } catch (err) {
      console.log(
        "Error while parsing storage item => user is not authenticated."
      );
      return false;
    }
  },
  getUser() {
    const localStorageItem = localStorage.getItem("gitHubUser") || "";
    return JSON.parse(localStorageItem);
  }
};
