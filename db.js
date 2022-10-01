const homedir = require('os').homedir() // 系统默认根目录
const home = process.env.HOME || homedir // 根目录变量，优先使用
const path = require('path')
const fs = require('fs')
const dbPath = path.join(home,'.todo')

const db = {
  read(path = dbPath){
    return new Promise((resolve,reject)=>{
      fs.readFile(path,{flag:'a+'},(error,data)=>{
        if(error) return reject(error)
        let list 
        try{
          list = JSON.parse(data.toString())
        }catch(error2){
          list = []
        }
        resolve(list)
      })
    })
  },
 
  write(list,path = dbPath){
    return new Promise((resolve,reject)=>{
      const string = JSON.stringify(list)
      fs.writeFile(dbPath,string+'\n',(error)=>{
      
      if(error) reject(error)
      resolve()
    })
    })
  },

  
}

module.exports = db