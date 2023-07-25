const aws = require("aws-sdk");
const database = require("./database");
const {
  CognitoIdentityProviderClient,
  AdminAddUserToGroupCommand,
  GetGroupCommand,
  CreateGroupCommand,
} = require("@aws-sdk/client-cognito-identity-provider");
const cognitoIdentityServiceProvider = new CognitoIdentityProviderClient({});

const handler = async (event) => {
  const aws = require("aws-sdk");

  const { Parameters } = await new aws.SSM()
    .getParameters({
      Names: [
        "MONGO_USER",
        "MONGO_PW",
        "MONGO_HOST",
        "MONGO_DB",
        "DEFAULT_PASSWORD",
      ].map((secretName) => process.env[secretName]),
      WithDecryption: true,
    })
    .promise();
  // unpack values
  var parameters_dict = new Object();
  Parameters.forEach((element) => {
    parameters_dict[element.Name] = element.Value;
  });
  //console.log("evento de presignup " + JSON.stringify(event));
  const userPoolId = event.userPoolId;
  const trigger = event.triggerSource;
  const email = event.request.userAttributes.email;
  const givenName = event.request.userAttributes.given_name;
  const familyName = event.request.userAttributes.family_name;
  const emailVerified = event.request.userAttributes.email_verified;
  const identity = event.userName;
  const client = new aws.CognitoIdentityServiceProvider();
  //conectarnos a la base

  const db = database(
    `mongodb+srv://${parameters_dict[process.env.MONGO_USER]}:${
      parameters_dict[process.env.MONGO_PW]
    }@${parameters_dict[process.env.MONGO_HOST]}/${
      parameters_dict[process.env.MONGO_DB]
    }?retryWrites=true&w=majority`
  );
  //buscar usuario
  var potencial_usuario = await db.getUserByEmail(email);

  if (potencial_usuario === null)
    return Promise.reject(
      new Error(
        "El usuario no esta preregistrado con el correo " +
          email +
          ". Por favor contacta a tu administrador."
      )
    );
  //Consolidacion de cuentas sociales
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
            Password: parameters_dict[process.env.DEFAULT_PASSWORD],
            Permanent: true,
          })
          .promise();
        const groupParams = {
          GroupName:
            potencial_usuario.tipoUsuario +
            "_" +
            potencial_usuario.idCondominio,
          UserPoolId: userPoolId,
        };
        const addUserParams = {
          GroupName:
            potencial_usuario.tipoUsuario +
            "_" +
            potencial_usuario.idCondominio,
          UserPoolId: userPoolId,
          Username: newUser.User.Username,
        };
        /**
         * Check if the group exists; if it doesn't, create it.
         */
        try {
          await cognitoIdentityServiceProvider.send(
            new GetGroupCommand(groupParams)
          );
        } catch (e) {
          await cognitoIdentityServiceProvider.send(
            new CreateGroupCommand(groupParams)
          );
        }
        /**
         * Then, add the user to the group.
         */
        await cognitoIdentityServiceProvider.send(
          new AdminAddUserToGroupCommand(addUserParams)
        );

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
