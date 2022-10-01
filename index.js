const db = require('./db.js')
const inquirer = require('inquirer')

module.exports.add = async (title)=>{
    // 读取之前的任务
    const list = await db.read()
    // 添加一个任务
    list.push({title,done:false})
    // 存储任务到文件
    await db.write(list)
}

module.exports.clear = async ()=>{
  await db.write([])
}

// 询问操作
function askForAction(list,index){
  inquirer.prompt({
    type:'list',name:'action',
    message:'选择操作',
    choices:[
      {name:'退出',value:'quit'},
      {name:'已完成',value:'markAsDone'},
      {name:'未完成',value:'markAsUndone'},
      {name:'删除',value:'delete'},
      {name:'修改任务内容',value:'change'},
    ]
  }).then(answer2=>{
    switch(answer2.action){
      case 'markAsDone': 
        list[index].done = true
        db.write(list)
        break
      case 'markAsUndone': 
        list[index].done = false
        db.write(list)
        break
      case 'change': 
        inquirer.prompt({
          type:'input',
          name:'title',
          message:'任务名：',
          default:list[index].title
        }).then(answer3=>{
          list[index].title = answer3.title;
          db.write(list)
        })
        break
      case 'delete': 
        list.splice(index,1)
        db.write(list)
        break
    }
  })
} 

// 新建任务
function askForCreateTask(list){
  inquirer.prompt({
    type:'input',
    name:'title',
    message:'任务名：',
  }).then(answer3=>{
    list.push({
      title:answer3.title,
      done:false
    })
    db.write(list)
  })
}

// 打印列表
function printTask(list){
  inquirer
  .prompt({
      type:'list',
      name:'index',
      message:'请选择您想操作的任务',
      choices:[{name:'退出',value:'-1'},... list.map((task,index)=>{
        return {name:`${task.done ? '[o]' : '[_]'} ${index+1} - ${task.title}`,value:index.toString()}
      }),{name:'+ 新建任务',value:'-2'}]
    },)
  .then(answer =>{
    const index = parseInt(answer.index)
    if(index >= 0){
      // 选中任务
      askForAction(list,index)

    }else if(index === -2){
      // 新建任务
      askForCreateTask(list)
    }
  })
}

module.exports.showAll = async ()=>{
  // 读取之前的任务并打印
  const list = await db.read()
  printTask(list)
}


