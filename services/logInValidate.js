function validatePassword(inputPassword, storedPassword) {
    if (inputPassword === storedPassword) {
      return { status: 201, message: "Login successful" };
    } else {
      return { status: 404, message: "Invalid password" };
    }
  }
  
  export default validatePassword;
  