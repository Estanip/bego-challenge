import bcrypt from "bcrypt";

async function encrytp(password: string) {
  try {
    const salt = await bcrypt.genSalt(10);
    password = bcrypt.hashSync(password, salt);
    return password;
  } catch (error) {
    throw new Error(error);
  }
}

async function comparePassword(userPassword: string, currentPassword: string) {
  return await bcrypt.compare(userPassword, currentPassword);
}

export { encrytp, comparePassword };
