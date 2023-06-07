const { CognitoIdentityServiceProvider } = require("aws-sdk");

const handler = async (event) => {
  const userPoolId = event.userPoolId;
  const trigger = event.triggerSource;
  const email = event.request.userAttributes.email;
  const givenName = event.request.userAttributes.given_name;
  const familyName = event.request.userAttributes.family_name;
  const emailVerified = event.request.userAttributes.email_verified;
  const identity = event.userName;
  const client = new CognitoIdentityServiceProvider();

  if (trigger === "PreSignUp_ExternalProvider") {
    await client
      .listUsers({
        UserPoolId: userPoolId,
        AttributesToGet: ["email", "family_name", "given_name", "picture"],
        Filter: `email = "${email}"`,
      })
      .promise()
      .then(({ Users }) =>
        Users.sort((a, b) => (a.UserCreateDate > b.UserCreateDate ? 1 : -1))
      )
      .then((users) => (users.length > 0 ? users[0] : null))
      .then(async (user) => {
        // user with username password already exists, do nothing
        if (user) {
          return user.Username;
        }

        // user with username password does not exists, create one
        const newUser = await client
          .adminCreateUser({
            UserPoolId: userPoolId,
            Username: email,
            MessageAction: "SUPPRESS", // dont send email to user
            UserAttributes: [
              {
                Name: "given_name",
                Value: givenName,
              },
              {
                Name: "family_name",
                Value: familyName,
              },
              {
                Name: "email",
                Value: email,
              },
              {
                Name: "email_verified",
                Value: "true",
              },
              {
                Name: "picture",
                Value:
                  "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
              },
            ],
          })
          .promise();
        // gotta set the password, else user wont be able to reset it
        await client
          .adminSetUserPassword({
            UserPoolId: userPoolId,
            Username: newUser.User.Username,
            Password: process.env.DEFAULT_PASSWORD,
            Permanent: true,
          })
          .promise();

        return newUser.User.Username;
      })
      .then((username) => {
        // link external user to cognito user
        const split = identity.split("_");
        const providerValue = split.length > 1 ? split[1] : null;
        const provider = ["Google", "Facebook"].find(
          (val) => split[0].toUpperCase() === val.toUpperCase()
        );

        if (!provider || !providerValue) {
          return Promise.reject(new Error("Invalid external user"));
        }

        return client
          .adminLinkProviderForUser({
            UserPoolId: userPoolId,
            DestinationUser: {
              ProviderName: "Cognito",
              ProviderAttributeValue: username,
            },
            SourceUser: {
              ProviderName: provider,
              ProviderAttributeName: "Cognito_Subject",
              ProviderAttributeValue: providerValue,
            },
          })
          .promise();
      });
  }

  return event;
};

module.exports = {
  handler,
};
