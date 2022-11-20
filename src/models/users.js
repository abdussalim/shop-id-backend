const Pool = require('../config/db')

const usersModel = {
    findEmailInDatabase : (email) =>{
        return  new Promise ((resolve,reject)=> 
        Pool.query(`SELECT * FROM users WHERE email='${email}'`,(error,result)=>{
          if(!error){
            resolve(result);
          }else{
            reject(error);
          }
        })
        );
    },
    createAnAccount : (data)=>{
    const {id, email, password, fullname, role}= data;
        return  new Promise ((resolve,reject)=> 
        Pool.query(`INSERT INTO users(id,email,password,fullname,role) VALUES('${id}','${email}','${password}','${fullname}','${role}')`,(error,result)=>{
          if(!error){
            resolve(result);
          }else{
            reject(error);
          }
        })
        );
    },
    showCreatedAccount : (email) =>{
      return  new Promise ((resolve,reject)=> 
      Pool.query(`SELECT id,email,fullname,role FROM users WHERE email=${email}`,(error,result)=>{
        if(!error){
          resolve(result);
        }else{
          reject(error);
        }
      })
      );
    }
}

module.exports = usersModel;