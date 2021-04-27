export const isUnauthorized = (statusCode) => {
    if(statusCode === 401) {
        localStorage.removeItem("accessToken");
        return true;
    } else {
        return false;
    }
}