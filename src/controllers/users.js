const {v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const bcryptJSHasher = require("bcryptjs");
const createError = require("http-errors");
const usersModel = require("../models/users");
const commonsHelper = require("../helpers/common");
const authenticationsHelper = require("../helpers/auth");
const { findEmailInDatabase } = require("../models/users");

const usersController ={
    registerNewUserAccount: async(request,response,next)=>{
        try{
          const {email, password, fullname, role} = request.body;
          const {rows: [emailNumber]} = await usersModel.findEmailInDatabase(email);
          const passwordHash = bcryptJSHasher.hashSync(password);
          const id = uuidv4();
          if(emailNumber){
            return next(createError(403,"Email is already used"));
          };
          const data = {
                        id,
                        email,
                        password: passwordHash,
                        fullname,
                        role
                      };
          console.log(data);
          usersModel.createAnAccount(data)
          .then(
            result => commonsHelper.responseResult(response, result.rows, 201, "You have crated a New Account!") 
          )
          .catch(error => response.send(error)
          );

        }catch(error){
          console.log(error);
        }
      },

    loginUserAccount: async(request,response)=>{
        try{

          const {email, password} = request.body;
          const {rows : [userAvailable]} = await findEmailInDatabase(email);

            if(!userAvailable)
            {
              return commonsHelper.responseResult(response,null,403,"This email have not registered yet :(");
            };
            
            const validatePassword = bcryptJSHasher.compareSync(password,userAvailable.password);

            if(!validatePassword)
            {
              return commonsHelper.responseResult(response,null,403,"Password is Invalid");
            };

            delete userAvailable.password;

            const payloads = {
                              email: userAvailable.email,
                              role : userAvailable.role
                            };

            userAvailable.token = authenticationsHelper.generateNewToken(payloads);
            userAvailable.refreshToken = authenticationsHelper.generateRefreshToken(payloads);
            commonsHelper.responseResult(response,userAvailable,201,"Login are successful!");

        }catch(error){
          console.log(error);
        }
      },

    userProfile :async(request,response,next)=>{

      const email = request.payload.email
      const {rows:[userAvailable]} = await findEmailInDatabase(email)
      delete userAvailable.password;

      commonsHelper.responseResult(response,userAvailable,200);
    },

    refreshToken : (request,response)=>{
      const refreshToken = request.body.refreshToken
      const decode = jwt.verify(refreshToken, process.env.JWT_SECRET_HASH_KEY)
      const payloads ={
        email : decode.email,
        role : decode.role
      }
      const result ={
        token : authenticationsHelper.generateNewToken(payloads),
        refreshToken : authenticationsHelper.generateRefreshToken(payloads)
      }

      commonsHelper.responseResult(response,result,200);
    }
}

module.exports = usersController ;