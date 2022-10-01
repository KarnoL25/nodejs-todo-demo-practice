// 引入commander
const program = require('commander')
const api = require('./index.js')

// 配置选项
program
  .option('-x, --xxx','xxxxxxxx')

  // command功能区 
  // 功能：添加
program
  .command('add')
  .description('添加任务')
  .action((...args)=>{
    const words = args.slice(0,-1).join(' ')
    api.add(words).then(()=>{console.log('添加成功')},()=>{console.log('添加失败')})
  })
// 功能：清除
program
  .command('clear')
  .description('清除所有任务')
  .action(()=>{
    api.clear().then(()=>{console.log('清除完毕')},()=>{console.log('清除失败')})
  })

program.parse(process.argv)

if(process.argv.length === 2){
  void api.showAll()
}
