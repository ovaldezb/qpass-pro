const {
  CognitoIdentityProviderClient,
  AdminAddUserToGroupCommand,
  GetGroupCommand,
  CreateGroupCommand,
} = require("@aws-sdk/client-cognito-identity-provider");
const database = require("./database");
const cognitoIdentityServiceProvider = new CognitoIdentityProviderClient({});

/**
 * @type {import('@types/aws-lambda').PostConfirmationTriggerHandler}
 */
exports.handler = async (event) => {
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
  const db = database(
    `mongodb+srv://${parameters_dict[process.env.MONGO_USER]}:${
      parameters_dict[process.env.MONGO_PW]
    }@${parameters_dict[process.env.MONGO_HOST]}/${
      parameters_dict[process.env.MONGO_DB]
    }?retryWrites=true&w=majority`
  );
  //buscar usuario

  var potencial_usuario = await db.getUserByEmail(
    event.request.userAttributes.email
  );
  console.log("usuario potencial " + JSON.stringify(potencial_usuario));
  if (potencial_usuario === null) {
    return Promise.reject(
      new Error(
        "El usuario no esta preregistrado con el correo " +
          email +
          ". Por favor contacta a tu administrador."
      )
    );
  }

  const groupParams = {
    GroupName:
      potencial_usuario.tipoUsuario + "_" + potencial_usuario.idCondominio,
    UserPoolId: event.userPoolId,
  };
  const addUserParams = {
    GroupName:
      potencial_usuario.tipoUsuario + "_" + potencial_usuario.idCondominio,
    UserPoolId: event.userPoolId,
    Username: event.userName,
  };
  /**
   * Check if the group exists; if it doesn't, create it.
   */
  try {
    await cognitoIdentityServiceProvider.send(new GetGroupCommand(groupParams));
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

  return event;
};
