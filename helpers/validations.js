export function emailValidation(email) {
  let re = /\S+@\S+\.\S+/;
  let trimmedEmail = email.trim();
  if (!re.test(trimmedEmail) || trimmedEmail.length === 0) {
    return false;
  }
  return true;
}
