export const generateMessage = (entity: string) => ({
  AlreadyExists: `${entity} already exists!`,
  NotFound: `${entity} not found!`,
  FailedToCreate: `Failed to create ${entity}!`,
  FailedToUpdate: `Failed to update ${entity}!`,
  FailedToDelete: `Failed to delete ${entity}!`,
});

export const message = {
  USER: {
    ...generateMessage("User"),
    NotLoggedIn: "User not logged in!",
    INVALID_USER: "Invalid user",
  },
};
