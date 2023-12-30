module.exports = {
  name:"clear",
  description:"Clears the console(Not for standard use)",
  async execute(message, args, client){
    if(message.author.id !== '360064639175884800') return;
    return console.clear();
  }
}